import React, { createContext, useContext } from 'react'
import { cn } from '@/lib/utils'

const TabsContext = createContext(null)

export function Tabs({ value, onValueChange, className, children }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn(className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children }) {
  return <div className={cn('grid gap-2 bg-slate-100 p-2', className)}>{children}</div>
}

export function TabsTrigger({ value, className, children }) {
  const ctx = useContext(TabsContext)
  const active = ctx?.value === value
  return (
    <button
      type="button"
      onClick={() => ctx?.onValueChange?.(value)}
      className={cn(
        'rounded-xl px-3 py-2 text-sm font-medium transition',
        active ? 'bg-white shadow text-slate-900' : 'text-slate-600 hover:bg-white/60',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className, children }) {
  const ctx = useContext(TabsContext)
  if (ctx?.value !== value) return null
  return <div className={cn(className)}>{children}</div>
}
