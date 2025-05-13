"use client"

import type React from "react"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanCard } from "./kanban-card"
import type { CardType } from "./kanban-board"

interface KanbanColumnProps {
  id: string
  title: string
  icon: React.ReactNode
  colorClass: string
  cards: CardType[]
}

export function KanbanColumn({ id, title, icon, colorClass, cards }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <div ref={setNodeRef} className="flex flex-col h-full">
      <div className={`p-2 rounded-md ${colorClass} flex items-center gap-2 mb-3`}>
        {icon}
        <h3 className="font-medium text-sm">{title}</h3>
      </div>
      <div className="flex-1 space-y-3">
        <SortableContext items={cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <KanbanCard key={card.id} card={card} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
