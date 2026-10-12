import React, { useState } from 'react'
import { ExternalLink, Copy, Check } from 'lucide-react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

function MessageBubble({ role, content, images }) {
  const isUser = role === 'user'
  const [copiedCode, setCopiedCode] = useState(null)

  const copyToClipboard = async (codeText) => {
    await navigator.clipboard.writeText(codeText)
    setCopiedCode(codeText)
    setTimeout(() => setCopiedCode(null), 1500)
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[85%] md:max-w-[72%] px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed
        ${
          isUser
            ? 'bg-gradient-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm'
            : 'bg-white/[0.04] border border-white/[0.07] text-slate-200 rounded-tl-sm'
        }`}
      >
        <div>
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mt-5 mb-3">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold mt-4 mb-2">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold mt-3 mb-2">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-3 whitespace-pre-wrap break-words">{children}</p>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-white/10">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-white/10 bg-white/5 px-3 py-2 text-left">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-white/10 px-3 py-2">
                  {children}
                </td>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 underline inline-flex items-center gap-1"
                >
                  {children}
                  <ExternalLink size={14} />
                </a>
              ),
              code: ({ className, children }) => {
                const value = String(children).trim();



                if (!className) {
                  return (
                    <code className="px-1.5 py-0.5 rounded bg-white/10 text-indigo-300 font-mono text-[13px]">
                      {value}
                    </code>
                  )
                }



                const language = className ? className.replace("language-", "") : ""

                return (
                  <div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-[#111318]">
                    <div className="flex items-center justify-between bg-[#1b1d24] border-b border-white/10 px-4 py-2">
                      <span className="uppercase text-xs text-slate-400 font-mono">
                        {language || 'code'}
                      </span>
                      <button
                        type="button"
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                        onClick={() => copyToClipboard(value)}
                      >
                        {copiedCode === value ? (
                          <>
                            <Check size={14} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <SyntaxHighlighter
                      language={language || 'text'}
                      style={oneDark}
                      wrapLongLines
                      showLineNumbers
                      customStyle={{
                        margin: 0,
                        padding: '16px',
                        background: '#0d1117',
                        fontSize: '13px',
                      }}
                    >
                      {value}
                    </SyntaxHighlighter>
                  </div>
                )
              },
            }}
          >
            {content}
          </Markdown>
        </div>

        {images && Array.isArray(images) && images.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {images.map((img, idx) => {
              const url = typeof img === 'string' ? img : img?.url
              if (!url) return null
              return (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-lg border border-white/10 hover:border-indigo-500/50 transition-all bg-black/20"
                >
                  <img
                    src={url}
                    alt={`Search result ${idx + 1}`}
                    className="w-full h-28 object-cover hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                </a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageBubble