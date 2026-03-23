import React from 'react'
import { cn } from '@/lib/utils'

export function Checkbox({ checked, onCheckedChange, className, disabled }) {
  return (
    <input
      type="checkbox"
      checked={!!checked}
      disabled={disabled}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className={cn('h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300', className)}
    />
  )
}
