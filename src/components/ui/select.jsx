import React, { createContext, useContext } from 'react'
import { cn } from '@/lib/utils'

const SelectContext = createContext(null)

export function Select({ value, onValueChange, children }) {
  return <SelectContext.Provider value={{ value, onValueChange }}>{children}</SelectContext.Provider>
}

export function SelectTrigger() {
  return null
}

export function SelectValue() {
  return null
}

export function SelectContent({ children, className }) {
  const ctx = useContext(SelectContext)
  const items = React.Children.toArray(children).filter(Boolean)
  return (
    <select
      className={cn('flex h-10 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400', className)}
      value={ctx?.value ?? ''}
      onChange={(e) => ctx?.onValueChange?.(e.target.value)}
    >
      {items.map((child, idx) => {
        if (!React.isValidElement(child)) return null
        return React.cloneElement(child, { key: child.key ?? idx })
      })}
    </select>
  )
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>
}
