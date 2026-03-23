import React from 'react'
import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-slate-900 text-white hover:bg-slate-800 border border-slate-900',
  outline: 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50',
  ghost: 'bg-transparent text-slate-900 hover:bg-slate-100 border border-transparent',
  secondary: 'bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200',
}

export const Button = React.forwardRef(function Button(
  { className, variant = 'default', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:pointer-events-none disabled:opacity-50 px-4 py-2',
        variants[variant] || variants.default,
        className,
      )}
      {...props}
    />
  )
})
