"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { MoreHorizontal, MessageSquare, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AvatarGroup } from "./avatar-group"
import type { CardType } from "./kanban-board"

interface KanbanCardProps {
  card: CardType
}

export function KanbanCard({ card }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: {
      type: "card",
      card,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white border rounded-md p-3 shadow-sm"
    >
      <div className="flex justify-between items-start mb-2">
        <div
          className={`text-xs px-2 py-0.5 rounded ${
            card.priority === "Urgent" ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"
          }`}
        >
          {card.priority}
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <h4 className="font-medium mb-1">{card.title}</h4>
      <p className="text-xs text-gray-500 mb-3">{card.subtitle}</p>
      <div className="flex justify-between items-center">
        <AvatarGroup>
          {card.assignees.map((assignee, index) => (
            <Avatar key={index} className="h-6 w-6 border-2 border-white">
              <AvatarImage src={assignee.image || "/placeholder.svg"} alt={assignee.name} />
              <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center">
            <MessageSquare className="h-3 w-3 mr-1" />
            {card.comments}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {card.dueDate}
          </div>
          <div>{card.progress}%</div>
        </div>
      </div>
    </div>
  )
}
