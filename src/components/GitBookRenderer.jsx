import React, { useState } from 'react';
import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// ─── Shared animation variants ────────────────────────────────────────────────
const revealVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
};

// Shorthand props shared by every block-level reveal wrapper
const revealProps = {
  variants:  revealVariants,
  initial:   'hidden',
  whileInView: 'visible',
  viewport:  { once: true, amount: 0.05 },
};

// ─── Copy-to-clipboard button ─────────────────────────────────────────────────
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent fail
    }
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
      className="ml-auto flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border transition-all duration-150"
      style={{
        color:       copied ? '#34D399' : 'rgba(155,114,239,0.6)',
        borderColor: copied ? 'rgba(52,211,153,0.4)' : 'rgba(59,43,106,0.5)',
        background:  copied ? 'rgba(52,211,153,0.08)' : 'transparent',
      }}
    >
      {copied ? '✓ copied' : '⎘ copy'}
    </button>
  );
};

// ─── Text mark rendering ──────────────────────────────────────────────────────
const renderTextMarks = (text, marks) => {
  if (!marks || marks.length === 0) return text;

  let result = <>{text}</>;

  if (marks.some(m => m.type === 'bold'))         result = <strong className="font-bold text-white">{result}</strong>;
  if (marks.some(m => m.type === 'italic'))        result = <em className="italic text-gray-200">{result}</em>;
  if (marks.some(m => m.type === 'strikethrough')) result = <del className="line-through opacity-60">{result}</del>;
  if (marks.some(m => m.type === 'underline'))     result = <u className="underline underline-offset-2 decoration-[#9B72EF]/50">{result}</u>;
  if (marks.some(m => m.type === 'code')) {
    result = (
      <code
        className="bg-[#1A1625] border border-[#3B2B6A] px-1.5 py-0.5 rounded text-[0.85em] text-[#C4A7F5] font-mono"
        style={{ textShadow: '0 0 12px rgba(196,167,245,0.3)' }}
      >
        {result}
      </code>
    );
  }

  const colorMark = marks.find(m => m.type === 'color');
  if (colorMark?.data?.text) {
    const t = colorMark.data.text;
    let cls = '';
    if (t === '$info')         cls = 'text-blue-400';
    else if (t === '$warning') cls = 'text-yellow-400';
    else if (t === '$danger')  cls = 'text-red-400';
    else if (t === '$success') cls = 'text-green-400';
    if (cls) result = <span className={cls}>{result}</span>;
  }

  return result;
};

// ─── Node text extraction ────────────────────────────────────────────────────
const renderTextNode = (node, index) => {
  if (node.leaves) {
    return (
      <React.Fragment key={index}>
        {node.leaves.map((leaf, i) => (
          <React.Fragment key={i}>{renderTextMarks(leaf.text, leaf.marks)}</React.Fragment>
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

  if (node.object === 'text') return renderTextNode(node, index);

  const children = node.nodes
    ? node.nodes.map((child, i) => renderNode(child, i, filesMap))
    : null;

  switch (node.type) {

    // ── Document root ──────────────────────────────────────────────────────
    case 'document':
      return (
        <div key={index} className="gitbook-content text-gray-300 leading-[1.8] space-y-4">
          {children}
        </div>
      );

    // ── Headings ───────────────────────────────────────────────────────────
    case 'heading-1':
      return (
        <motion.h1
          key={index}
          {...revealProps}
          className="text-2xl md:text-3xl font-black text-white mt-10 mb-4 pb-3 ctf-glow-heading relative"
          style={{
            background:               'linear-gradient(90deg, #fff 60%, #C4A7F5 100%)',
            WebkitBackgroundClip:     'text',
            WebkitTextFillColor:      'transparent',
            backgroundClip:           'text',
            borderBottom:             '1px solid',
            borderImage:              'linear-gradient(90deg, rgba(123,79,208,0.6) 0%, rgba(59,43,106,0.2) 100%) 1',
          }}
        >
          {children}
        </motion.h1>
      );

    case 'heading-2':
      return (
        <motion.h2
          key={index}
          {...revealProps}
          className="text-xl md:text-2xl font-bold text-white mt-8 mb-3 flex items-center gap-3"
        >
          <span
            className="flex-shrink-0 self-stretch w-[3px] rounded-full"
            style={{ background: 'linear-gradient(to bottom, #9B72EF, #7B4FD0)', boxShadow: '0 0 8px rgba(155,114,239,0.5)' }}
            aria-hidden="true"
          />
          {children}
        </motion.h2>
      );

    case 'heading-3':
      return (
        <motion.h3
          key={index}
          {...revealProps}
          className="text-base md:text-lg font-semibold mt-6 mb-2 font-mono"
          style={{ color: '#C4A7F5' }}
        >
          <span className="text-[#9B72EF]/50 mr-1.5">##</span>
          {children}
        </motion.h3>
      );

    // ── Paragraph ─────────────────────────────────────────────────────────
    case 'paragraph': {
      const alignData  = node.data?.align;
      const alignClass = alignData === 'center' ? 'text-center' : alignData === 'right' ? 'text-right' : '';
      return (
        <motion.p
          key={index}
          {...revealProps}
          className={`mb-3 text-gray-300 leading-relaxed ${alignClass}`}
        >
          {children}
        </motion.p>
      );
    }

    // ── Lists ──────────────────────────────────────────────────────────────
    case 'list-unordered':
      return (
        <motion.ul key={index} {...revealProps} className="list-none space-y-1.5 mb-4 ml-4">
          {children}
        </motion.ul>
      );

    case 'list-ordered':
      return (
        <motion.ol
          key={index}
          {...revealProps}
          className="list-decimal list-outside space-y-1.5 mb-4 ml-5 marker:text-[#9B72EF] marker:font-mono marker:text-sm"
        >
          {children}
        </motion.ol>
      );

    case 'list-item':
      return (
        <li key={index} className="flex items-start gap-2 text-gray-300 pl-0">
          <span
            className="flex-shrink-0 mt-[0.45em] w-1 h-1 rounded-full"
            style={{ background: '#9B72EF', boxShadow: '0 0 4px rgba(155,114,239,0.5)' }}
            aria-hidden="true"
          />
          <span className="flex-1">{children}</span>
        </li>
      );

    // ── Code block ─────────────────────────────────────────────────────────
    case 'code':
    case 'code-block': {
      const syntax   = node.data?.syntax || '';
      const codeText = (node.nodes || []).map(line =>
        (line.nodes || []).map(n =>
          n.object === 'text'
            ? (n.leaves || []).map(l => l.text).join('') || n.text || ''
            : ''
        ).join('')
      ).join('\n');

      return (
        <motion.div key={index} {...revealProps} className="ctf-terminal-window my-5">
          {/* Terminal top bar */}
          <div className="ctf-terminal-topbar">
            <span className="ctf-terminal-dot bg-[#FF5F57]" />
            <span className="ctf-terminal-dot bg-[#FFBD2E]" />
            <span className="ctf-terminal-dot bg-[#28CA41]" />
            {syntax && (
              <span className="ml-2 text-[9px] uppercase tracking-widest text-[#9B72EF]/60 font-mono font-bold">
                {syntax}
              </span>
            )}
            <CopyButton text={codeText} />
          </div>
          {/* Code body */}
          <div className="bg-[#080611] p-4 overflow-x-auto relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)' }}
              aria-hidden="true"
            />
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre relative z-10">
              {codeText}
            </pre>
          </div>
        </motion.div>
      );
    }

    case 'code-line':
      return <div key={index}>{children}</div>;

    // ── Math ───────────────────────────────────────────────────────────────
    case 'inline-math': {
      let formula = (node.data?.formula || node.data?.tex || '').trim();
      if (formula.startsWith('$$') && formula.endsWith('$$')) formula = formula.slice(2, -2).trim();
      else if (formula.startsWith('$') && formula.endsWith('$')) formula = formula.slice(1, -1).trim();
      
      return <InlineMath key={index} math={formula} />;
    }
    
    case 'math-block':
    case 'math': {
      let formula = (node.data?.formula || node.data?.tex || '').trim();
      if (formula.startsWith('$$') && formula.endsWith('$$')) formula = formula.slice(2, -2).trim();
      else if (formula.startsWith('$') && formula.endsWith('$')) formula = formula.slice(1, -1).trim();
      
      return (
        <motion.div key={index} {...revealProps} className="my-5 overflow-x-auto ctf-terminal-window p-4 bg-[#080611] flex items-center justify-center">
          <BlockMath math={formula} />
        </motion.div>
      );
    }

    // ── Link ───────────────────────────────────────────────────────────────
    case 'link': {
      const href = node.data?.href || node.url || '#';
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#9B72EF] hover:text-[#C4A7F5] underline underline-offset-2 decoration-[#9B72EF]/30 hover:decoration-[#C4A7F5]/60 transition-colors font-medium"
          style={{ textShadow: '0 0 8px rgba(155,114,239,0.2)' }}
        >
          {children}
        </a>
      );
    }

    // ── Blockquote ─────────────────────────────────────────────────────────
    case 'quote':
    case 'blockquote':
      return (
        <motion.blockquote key={index} {...revealProps} className="ctf-lore-block my-5">
          {children}
        </motion.blockquote>
      );

    // ── Divider ────────────────────────────────────────────────────────────
    case 'divider':
      return (
        <motion.div
          key={index}
          {...revealProps}
          className="my-8 flex items-center gap-3"
        >
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,43,106,0.6))' }} />
          <span className="font-mono text-[#9B72EF]/30 text-[10px]">◆</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(59,43,106,0.6), transparent)' }} />
        </motion.div>
      );

    // ── Images ─────────────────────────────────────────────────────────────
    case 'images':
      return (
        <div key={index} className="my-6 space-y-4">
          {children}
        </div>
      );

    case 'image': {
      let imgUrl = node.url || node.src || null;
      const fileId = node.data?.ref?.file;
      if (fileId && filesMap?.[fileId]) imgUrl = filesMap[fileId].downloadURL;
      if (!imgUrl) return null;

      const alt = node.data?.alt || node.title || '';
      return (
        <motion.figure
          key={index}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="my-6 flex flex-col items-center"
        >
          <img
            src={imgUrl}
            alt={alt}
            loading="lazy"
            className="rounded-xl max-w-full h-auto ctf-image-glow"
            style={{ border: '1px solid rgba(59,43,106,0.5)' }}
          />
          {alt && (
            <figcaption className="text-center text-xs text-[#9B72EF]/50 mt-2 italic font-mono">
              // {alt}
            </figcaption>
          )}
        </motion.figure>
      );
    }

    // ── Table ──────────────────────────────────────────────────────────────
    case 'table': {
      if (!node.data?.records || !node.fragments) return null;

      const columns = node.data.view?.columns || Object.keys(node.data.definition || {});
      const records = Object.values(node.data.records)
        .sort((a, b) => a.orderIndex.localeCompare(b.orderIndex));

      return (
        <motion.div key={index} {...revealProps} className="overflow-x-auto my-6 rounded-xl ctf-terminal-window">
          <table className="w-full text-sm text-gray-300">
            <tbody className="divide-y divide-[#3B2B6A]/40">
              {records.map((record, rIdx) => (
                <tr
                  key={rIdx}
                  className={`hover:bg-white/[0.02] transition-colors ${rIdx === 0 ? 'bg-[#1A1625]/60' : 'bg-[#0F0C16]/40'}`}
                >
                  {columns.map((colId, cIdx) => {
                    const fragmentId = record.values?.[colId];
                    const fragment   = node.fragments?.find(f => f.fragment === fragmentId);
                    const Tag        = rIdx === 0 ? 'th' : 'td';
                    return (
                      <Tag
                        key={cIdx}
                        className={`px-5 py-3 align-top text-left ${
                          rIdx === 0 ? 'text-[#C4A7F5] font-mono text-xs uppercase tracking-wider border-b border-[#3B2B6A]/60' : ''
                        }`}
                      >
                        {(fragment?.nodes || []).map((fNode, fIdx) => renderNode(fNode, fIdx, filesMap))}
                      </Tag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      );
    }

    // ── Hint boxes ─────────────────────────────────────────────────────────
    case 'hint': {
      const hintStyle  = node.data?.style || 'info';
      const hintStyles = {
        info:    { border: 'border-blue-500/50',   bg: 'bg-blue-950/20',   label: '[INFO]', labelColor: '#60A5FA' },
        warning: { border: 'border-yellow-500/50', bg: 'bg-yellow-950/20', label: '[WARN]', labelColor: '#FBBF24' },
        danger:  { border: 'border-red-500/50',    bg: 'bg-red-950/20',    label: '[CRIT]', labelColor: '#F87171' },
        success: { border: 'border-green-500/50',  bg: 'bg-green-950/20',  label: '[OK]',   labelColor: '#34D399' },
      };
      const hs = hintStyles[hintStyle] || hintStyles.info;
      return (
        <motion.div
          key={index}
          {...revealProps}
          className={`border-l-4 ${hs.border} ${hs.bg} p-4 rounded-r-xl my-5`}
        >
          <div className="flex items-start gap-2">
            <span
              className="font-mono text-[10px] font-bold mt-0.5 flex-shrink-0 tracking-wider"
              style={{ color: hs.labelColor }}
            >
              {hs.label}
            </span>
            <div className="text-gray-200 flex-1">{children}</div>
          </div>
        </motion.div>
      );
    }

    case 'tabs':
    case 'tab-item':
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
