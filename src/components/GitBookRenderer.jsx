import React from 'react';

// ─── Text mark rendering ──────────────────────────────────────────────────────
const renderTextMarks = (text, marks) => {
  if (!marks || marks.length === 0) return text;

  let result = <>{text}</>;

  if (marks.some(m => m.type === 'bold'))          result = <strong className="font-bold text-white">{result}</strong>;
  if (marks.some(m => m.type === 'italic'))         result = <em className="italic">{result}</em>;
  if (marks.some(m => m.type === 'strikethrough'))  result = <del className="line-through opacity-70">{result}</del>;
  if (marks.some(m => m.type === 'underline'))      result = <u className="underline underline-offset-2">{result}</u>;
  if (marks.some(m => m.type === 'code')) {
    result = (
      <code className="bg-[#1A1625] border border-[#3B2B6A] px-1.5 py-0.5 rounded text-[0.85em] text-[#C4A7F5] font-mono">
        {result}
      </code>
    );
  }

  const colorMark = marks.find(m => m.type === 'color');
  if (colorMark?.data?.text) {
    const t = colorMark.data.text;
    let cls = '';
    if (t === '$info')    cls = 'text-blue-400';
    else if (t === '$warning') cls = 'text-yellow-400';
    else if (t === '$danger')  cls = 'text-red-400';
    else if (t === '$success') cls = 'text-green-400';
    if (cls) result = <span className={cls}>{result}</span>;
  }

  return result;
};

// ─── Node text extraction (leaves array handling) ────────────────────────────
const renderTextNode = (node, index) => {
  if (node.leaves) {
    return (
      <React.Fragment key={index}>
        {node.leaves.map((leaf, i) => (
          <React.Fragment key={i}>
            {renderTextMarks(leaf.text, leaf.marks)}
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment key={index}>
      {renderTextMarks(node.text || '', node.marks)}
    </React.Fragment>
  );
};

// ─── Main recursive render ───────────────────────────────────────────────────
const renderNode = (node, index, filesMap) => {
  if (!node) return null;

  // Pure text node
  if (node.object === 'text') {
    return renderTextNode(node, index);
  }

  // Recursively render child nodes
  const children = node.nodes
    ? node.nodes.map((child, i) => renderNode(child, i, filesMap))
    : null;

  switch (node.type) {

    case 'document':
      return (
        <div key={index} className="gitbook-content text-gray-300 leading-[1.75] space-y-4">
          {children}
        </div>
      );

    case 'heading-1':
      return (
        <h1 key={index} className="text-2xl md:text-3xl font-black text-white mt-10 mb-4 border-b border-[#3B2B6A]/50 pb-3">
          {children}
        </h1>
      );

    case 'heading-2':
      return (
        <h2 key={index} className="text-xl md:text-2xl font-bold text-white mt-8 mb-3">
          {children}
        </h2>
      );

    case 'heading-3':
      return (
        <h3 key={index} className="text-lg md:text-xl font-semibold text-gray-100 mt-6 mb-2">
          {children}
        </h3>
      );

    case 'paragraph': {
      const alignData = node.data?.align;
      const alignClass = alignData === 'center' ? 'text-center' : alignData === 'right' ? 'text-right' : '';
      return (
        <p key={index} className={`mb-3 ${alignClass}`}>
          {children}
        </p>
      );
    }

    case 'list-unordered':
      return (
        <ul key={index} className="list-disc list-outside space-y-1.5 mb-4 ml-5 marker:text-[#9B72EF]">
          {children}
        </ul>
      );

    case 'list-ordered':
      return (
        <ol key={index} className="list-decimal list-outside space-y-1.5 mb-4 ml-5 marker:text-[#9B72EF]">
          {children}
        </ol>
      );

    case 'list-item':
      return (
        <li key={index} className="text-gray-300 pl-1">
          {children}
        </li>
      );

    case 'code':
    case 'code-block': {
      const syntax = node.data?.syntax || '';
      // Extract raw text from code-line children for clean display
      const codeText = (node.nodes || []).map(line => {
        return (line.nodes || []).map(n => {
          if (n.object === 'text') {
            return (n.leaves || []).map(l => l.text).join('') || n.text || '';
          }
          return '';
        }).join('');
      }).join('\n');

      return (
        <div key={index} className="my-5 rounded-xl overflow-hidden border border-[#2D2046] shadow-xl">
          {syntax && (
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1A1625] border-b border-[#2D2046]">
              <span className="text-[10px] uppercase tracking-widest text-[#9B72EF]/70 font-mono font-bold">{syntax}</span>
            </div>
          )}
          <div className="bg-[#0F0C16] p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre">{codeText}</pre>
          </div>
        </div>
      );
    }

    case 'code-line':
      return <div key={index}>{children}</div>;

    case 'link': {
      const href = node.data?.href || node.url || '#';
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#9B72EF] hover:text-[#C4A7F5] hover:underline underline-offset-2 transition-colors font-medium"
        >
          {children}
        </a>
      );
    }

    case 'quote':
    case 'blockquote':
      return (
        <blockquote key={index} className="border-l-4 border-[#7B4FD0] pl-4 py-2 italic text-gray-400 my-5 bg-[#1A1625]/40 rounded-r-lg">
          {children}
        </blockquote>
      );

    case 'divider':
      return <hr key={index} className="border-[#3B2B6A]/40 my-8" />;

    case 'images':
      return (
        <div key={index} className="my-6 space-y-4">
          {children}
        </div>
      );

    case 'image': {
      // Resolve file reference to actual download URL
      let imgUrl = node.url || node.src || null;
      const fileId = node.data?.ref?.file;
      if (fileId && filesMap && filesMap[fileId]) {
        imgUrl = filesMap[fileId].downloadURL;
      }

      if (!imgUrl) return null;

      const alt = node.data?.alt || node.title || '';
      return (
        <figure key={index} className="my-6 flex flex-col items-center">
          <img
            src={imgUrl}
            alt={alt}
            loading="lazy"
            className="rounded-xl max-w-full h-auto border border-[#3B2B6A]/50 shadow-2xl"
          />
          {alt && (
            <figcaption className="text-center text-xs text-gray-500 mt-2 italic">{alt}</figcaption>
          )}
        </figure>
      );
    }

    case 'table': {
      if (!node.data?.records || !node.fragments) return null;

      const columns = node.data.view?.columns || Object.keys(node.data.definition || {});
      const records = Object.values(node.data.records)
        .sort((a, b) => a.orderIndex.localeCompare(b.orderIndex));

      return (
        <div key={index} className="overflow-x-auto my-6 rounded-xl border border-[#3B2B6A]/50">
          <table className="w-full text-sm text-gray-300">
            <tbody className="divide-y divide-[#3B2B6A]/40">
              {records.map((record, rIdx) => (
                <tr key={rIdx} className={`hover:bg-white/[0.02] transition-colors ${rIdx === 0 ? 'bg-[#1A1625]/60' : 'bg-[#12101A]/40'}`}>
                  {columns.map((colId, cIdx) => {
                    const fragmentId = record.values?.[colId];
                    const fragment = node.fragments?.find(f => f.fragment === fragmentId);
                    const Tag = rIdx === 0 ? 'th' : 'td';
                    return (
                      <Tag
                        key={cIdx}
                        className={`px-5 py-3 align-top text-left ${rIdx === 0 ? 'text-white font-semibold border-b border-[#3B2B6A]/60' : ''}`}
                      >
                        {(fragment?.nodes || []).map((fNode, fIdx) => renderNode(fNode, fIdx, filesMap))}
                      </Tag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case 'hint': {
      const hintStyle = node.data?.style || 'info';
      const hintStyles = {
        info:    { border: 'border-blue-500/60',   bg: 'bg-blue-950/30',   icon: 'ℹ' },
        warning: { border: 'border-yellow-500/60', bg: 'bg-yellow-950/30', icon: '⚠' },
        danger:  { border: 'border-red-500/60',    bg: 'bg-red-950/30',    icon: '✕' },
        success: { border: 'border-green-500/60',  bg: 'bg-green-950/30',  icon: '✓' },
      };
      const hs = hintStyles[hintStyle] || hintStyles.info;
      return (
        <div key={index} className={`border-l-4 ${hs.border} ${hs.bg} p-4 rounded-r-xl my-5`}>
          <div className="text-gray-200">{children}</div>
        </div>
      );
    }

    case 'tabs':
    case 'tab-item':
      // Just render content without tab chrome for now
      return <div key={index} className="my-4">{children}</div>;

    default:
      if (children) return <div key={index} className="my-2">{children}</div>;
      return null;
  }
};

// ─── Public component ────────────────────────────────────────────────────────
const GitBookRenderer = ({ document, filesMap = {} }) => {
  if (!document) return null;
  return renderNode(document, 'root', filesMap);
};

export default GitBookRenderer;
