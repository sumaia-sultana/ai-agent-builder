import { memo } from 'react'
import type { ReactNode } from 'react'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

type Tone = 'teal' | 'amber' | 'cyan' | 'slate'

const toneClasses: Record<Tone, { chip: string; zone: string }> = {
  teal: {
    chip: 'border-teal-200 bg-teal-50 text-teal-900',
    zone: 'border-teal-200 bg-teal-50/70',
  },
  amber: {
    chip: 'border-orange-200 bg-orange-50 text-orange-900',
    zone: 'border-orange-200 bg-orange-50/70',
  },
  cyan: {
    chip: 'border-cyan-200 bg-cyan-50 text-cyan-900',
    zone: 'border-cyan-200 bg-cyan-50/70',
  },
  slate: {
    chip: 'border-slate-200 bg-slate-50 text-slate-900',
    zone: 'border-slate-300 bg-slate-50',
  },
}

export interface DragMeta {
  kind: 'profile' | 'skill' | 'layer' | 'provider'
  value: string
}

interface DraggableTokenProps {
  id: string
  label: string
  detail?: string
  disabled?: boolean
  tone?: Tone
  data: DragMeta
  onClick?: () => void
}

function DraggableToken({
  id,
  label,
  detail,
  disabled = false,
  tone = 'slate',
  data,
  onClick,
}: DraggableTokenProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data,
    disabled,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.45 : 1,
  }

  return (
    <button
      ref={setNodeRef}
      type="button"
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...listeners}
      {...attributes}
      className={[
        'group flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left transition',
        'hover:-translate-y-0.5 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60',
        toneClasses[tone].chip,
      ].join(' ')}
      aria-label={`Drag ${label}`}
    >
      <GripVertical className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-slate-500" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{label}</span>
        {detail ? <span className="block truncate text-xs opacity-80">{detail}</span> : null}
      </span>
    </button>
  )
}

interface DropZoneProps {
  id: string
  title: string
  helper: string
  tone?: Tone
  children: ReactNode
}

function DropZone({ id, title, helper, tone = 'slate', children }: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={[
        'rounded-xl border-2 border-dashed p-4 transition',
        isOver ? `${toneClasses[tone].zone} shadow-inner` : 'border-slate-200 bg-white',
      ].join(' ')}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
        <span className="text-xs text-slate-500">{helper}</span>
      </div>
      {children}
    </div>
  )
}

const MemoizedDraggableToken = memo(DraggableToken)
const MemoizedDropZone = memo(DropZone)

export { MemoizedDraggableToken as DraggableToken, MemoizedDropZone as DropZone }
