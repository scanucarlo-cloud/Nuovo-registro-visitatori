import React from 'react'
import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-slate-900 text-white border-slate-900',
  secondary: 'bg-slate-100 text-slate-700 border-slate-200',
  outline: 'bg-white text-slate-800 border-slate-300',
}

export function Badge({ className, variant = 'default', ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
        variants[variant] || variants.default,
        className,
      )}
      {...props}
    />
  )
}
