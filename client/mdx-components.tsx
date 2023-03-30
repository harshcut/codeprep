import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-xl font-semibold tracking-tight">{children}</h1>,
    h3: ({ children }) => <h3 className="text-sm font-medium mb-2 mt-4">{children}</h3>,
    p: ({ children }) => <p className="leading-7 mt-4">{children}</p>,
    ul: ({ children }) => <ul className="mt-2 ml-4 list-disc [&>li]:mt-2">{children}</ul>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    pre: ({ children }) => (
      <pre className="rounded bg-slate-100 px-4 py-3 whitespace-pre-wrap [&>code]:p-0">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="rounded bg-slate-100 py-[0.2rem] px-[0.3rem] text-sm font-semibold text-slate-700">
        {children}
      </code>
    ),
    ...components,
  }
}
