#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const graphDir = path.join(repoRoot, 'research_plan', 'graph');
const docsDataDir = path.join(repoRoot, 'docs', 'data');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', '.rail', '.ontology'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function parseScalar(value) {
  const v = String(value).trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
  return v;
}

function parseFrontmatter(text) {
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---\n', 4);
  if (end === -1) return null;
  const raw = text.slice(4, end);
  const body = text.slice(end + 5);
  const lines = raw.split(/\r?\n/);
  const data = {};
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (!match) {
      i++;
      continue;
    }

    const key = match[1];
    const rest = match[2] ?? '';
    if (rest.trim()) {
      data[key] = parseScalar(rest);
      i++;
      continue;
    }

    i++;
    const list = [];
    while (i < lines.length) {
      const next = lines[i];
      if (!next.trim()) {
        i++;
        continue;
      }
      if (!next.startsWith('  - ')) break;
      const itemText = next.slice(4);
      const kv = !/^https?:\/\//.test(itemText) && itemText.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (kv) {
        const obj = { [kv[1]]: parseScalar(kv[2]) };
        i++;
        while (i < lines.length) {
          const sub = lines[i];
          const subkv = sub.match(/^\s{4}([A-Za-z0-9_-]+):\s*(.*)$/);
          if (!subkv) break;
          obj[subkv[1]] = parseScalar(subkv[2]);
          i++;
        }
        list.push(obj);
      } else {
        list.push(parseScalar(itemText));
        i++;
      }
    }
    data[key] = list;
  }

  return { data, body };
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'item';
}

function uniq(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function addNode(nodes, id, payload) {
  const existing = nodes.get(id) || { id };
  nodes.set(id, { ...existing, ...payload, id });
}

function addEdge(edges, from, type, to, meta = {}) {
  const id = `${from}::${type}::${to}`;
  if (!edges.has(id)) edges.set(id, { id, from, type, to, ...meta });
}

function getEntityId(name) {
  return `entity:${slugify(name)}`;
}

function stripMarkdown(text) {
  return String(text)
    .replace(/^---[\s\S]*?---\n?/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#+\s*/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/^[-*]\s+/gm, '• ')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\|/g, ' ')
    .replace(/\*\*|__/g, '')
    .replace(/\*|_/g, '')
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function makeExcerpt(text, max = 280) {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max).replace(/[,:;\-\s]+$/,'')}…`;
}

const nodes = new Map();
const edges = new Map();
const docs = [];

for (const file of walk(repoRoot)) {
  const text = fs.readFileSync(file, 'utf8');
  const parsed = parseFrontmatter(text);
  if (!parsed) continue;

  const relPath = path.relative(repoRoot, file);
  const title = parsed.data.title || path.basename(file, '.md');
  const kind = parsed.data.kind || parsed.data.type || 'document';
  const docId = `doc:${relPath}`;
  const sourceList = uniq([
    ...(parsed.data.sources || []),
    parsed.data.url,
    parsed.data.source_url,
  ]);
  const plainBody = stripMarkdown(parsed.body);

  docs.push({
    id: docId,
    slug: slugify(relPath),
    path: relPath,
    title,
    kind,
    updated: parsed.data.updated || parsed.data.captured_at || null,
    topics: parsed.data.topics || [],
    entities: uniq([...(parsed.data.entities || []), ...((parsed.data.entity_metadata || []).map(x => x?.name).filter(Boolean))]),
    sources: sourceList,
    excerpt: makeExcerpt(plainBody),
    body: plainBody,
    data: parsed.data,
  });

  addNode(nodes, docId, {
    label: title,
    nodeType: 'document',
    kind,
    path: relPath,
    updated: parsed.data.updated || parsed.data.captured_at || null,
  });

  for (const topic of parsed.data.topics || []) {
    const tid = `topic:${slugify(topic)}`;
    addNode(nodes, tid, { label: topic, nodeType: 'topic' });
    addEdge(edges, docId, 'has_topic', tid, { source: relPath });
  }

  const entityMeta = new Map();
  for (const entity of parsed.data.entities || []) {
    entityMeta.set(String(entity), { name: String(entity), entity_type: 'Concept' });
  }
  for (const item of parsed.data.entity_metadata || []) {
    if (!item || typeof item !== 'object' || !item.name) continue;
    entityMeta.set(String(item.name), {
      name: String(item.name),
      entity_type: item.entity_type || item.type || 'Concept',
      status: item.status || null,
    });
  }

  for (const meta of entityMeta.values()) {
    const eid = getEntityId(meta.name);
    addNode(nodes, eid, {
      label: meta.name,
      nodeType: 'entity',
      entityType: meta.entity_type,
      status: meta.status,
    });
    addEdge(edges, docId, 'mentions', eid, { source: relPath });
  }

  for (const src of sourceList) {
    const sid = `source:${slugify(src)}`;
    addNode(nodes, sid, { label: src, nodeType: 'source', url: src });
    addEdge(edges, docId, 'cites', sid, { source: relPath });
  }

  for (const rel of parsed.data.relations || []) {
    if (!rel.from || !rel.type || !rel.to) continue;
    const fromId = getEntityId(rel.from);
    const toId = getEntityId(rel.to);
    addNode(nodes, fromId, { label: rel.from, nodeType: 'entity' });
    addNode(nodes, toId, { label: rel.to, nodeType: 'entity' });
    addEdge(edges, fromId, rel.type, toId, { source: relPath });
  }
}

const graph = {
  generatedAt: new Date().toISOString(),
  counts: { nodes: nodes.size, edges: edges.size, documents: docs.length },
  nodes: Array.from(nodes.values()).sort((a, b) => a.id.localeCompare(b.id)),
  edges: Array.from(edges.values()).sort((a, b) => a.id.localeCompare(b.id)),
};

const nodeTypeCounts = graph.nodes.reduce((acc, node) => {
  const key = node.nodeType || 'unknown';
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});
const entityTypeCounts = graph.nodes
  .filter(node => node.nodeType === 'entity')
  .reduce((acc, node) => {
    const key = node.entityType || 'Unspecified';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

graph.nodeTypeCounts = nodeTypeCounts;
graph.entityTypeCounts = entityTypeCounts;

const docsForJson = docs
  .map(doc => ({
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    kind: doc.kind,
    path: doc.path,
    updated: doc.updated,
    topics: doc.topics,
    entities: doc.entities,
    sources: doc.sources,
    excerpt: doc.excerpt,
    body: doc.body,
  }))
  .sort((a, b) => (String(b.updated || '')).localeCompare(String(a.updated || '')) || a.title.localeCompare(b.title));

fs.mkdirSync(graphDir, { recursive: true });
fs.mkdirSync(docsDataDir, { recursive: true });
fs.writeFileSync(path.join(graphDir, 'graph.json'), JSON.stringify(graph, null, 2) + '\n');
fs.writeFileSync(path.join(docsDataDir, 'graph.json'), JSON.stringify(graph, null, 2) + '\n');
fs.writeFileSync(path.join(docsDataDir, 'documents.json'), JSON.stringify({ generatedAt: graph.generatedAt, documents: docsForJson }, null, 2) + '\n');

const mermaidLines = ['graph TD'];
for (const edge of graph.edges) {
  const fromNode = nodes.get(edge.from);
  const toNode = nodes.get(edge.to);
  if (!fromNode || !toNode) continue;
  const fromLabel = `${edge.from.replace(/[^A-Za-z0-9]/g, '_')}["${String(fromNode.label).replace(/"/g, '\\"')}"]`;
  const toLabel = `${edge.to.replace(/[^A-Za-z0-9]/g, '_')}["${String(toNode.label).replace(/"/g, '\\"')}"]`;
  mermaidLines.push(`  ${fromLabel} -->|${edge.type}| ${toLabel}`);
}
const mermaid = mermaidLines.join('\n') + '\n';
fs.writeFileSync(path.join(graphDir, 'graph.mmd'), mermaid);
fs.writeFileSync(path.join(docsDataDir, 'graph.mmd'), mermaid);

const topDocs = docs
  .map(d => ({
    path: d.path,
    title: d.title,
    kind: d.kind,
    entities: d.entities.length,
    relations: (d.data.relations || []).length,
    topics: (d.data.topics || []).length,
    sources: d.sources.length,
  }))
  .sort((a, b) => b.relations - a.relations || b.entities - a.entities || b.sources - a.sources);

const summary = [
  '# Markdown graph summary',
  '',
  `Generated: ${graph.generatedAt}`,
  '',
  `- Documents: ${graph.counts.documents}`,
  `- Nodes: ${graph.counts.nodes}`,
  `- Edges: ${graph.counts.edges}`,
  '',
  '## Node types',
  '',
  ...Object.entries(nodeTypeCounts).sort((a, b) => a[0].localeCompare(b[0])).map(([k, v]) => `- ${k}: ${v}`),
  '',
  '## Entity types',
  '',
  ...Object.entries(entityTypeCounts).sort((a, b) => a[0].localeCompare(b[0])).map(([k, v]) => `- ${k}: ${v}`),
  '',
  '## Documents with metadata',
  '',
  ...topDocs.map(d => `- ${d.title} (${d.kind}) — ${d.entities} entities, ${d.relations} relations, ${d.sources} sources — ${d.path}`),
  '',
  '## Output files',
  '',
  '- `research_plan/graph/graph.json`',
  '- `research_plan/graph/graph.mmd`',
  '- `research_plan/graph/summary.md`',
  '- `docs/data/graph.json`',
  '- `docs/data/graph.mmd`',
  '- `docs/data/documents.json`',
];
fs.writeFileSync(path.join(graphDir, 'summary.md'), summary.join('\n') + '\n');
fs.writeFileSync(path.join(docsDataDir, 'summary.md'), summary.join('\n') + '\n');

console.log(JSON.stringify(graph.counts, null, 2));
