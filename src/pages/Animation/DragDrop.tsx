import { useState } from 'react'

export default function DragDrop() {
  const [items, setItems] = useState<string[]>(['A', 'B', 'C', 'D'])
  const [drag, setDrag] = useState<number | null>(null)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">拖拽</h2>
      <div className="flex gap-2">
        {items.map((it, idx) => (
          <div
            key={it}
            draggable
            onDragStart={() => setDrag(idx)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (drag === null || drag === idx) return
              const next = [...items]
              const [moved] = next.splice(drag, 1)
              next.splice(idx, 0, moved)
              setItems(next)
              setDrag(null)
            }}
            className="select-none cursor-move px-4 py-2 rounded border bg-white"
          >
            {it}
          </div>
        ))}
      </div>
    </div>
  )
}


