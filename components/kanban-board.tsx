"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { 
  Search, 
  Bell, 
  Mail, 
  Plus, 
  Circle, 
  Clock3 ,
  Eye,
  CheckCircle ,
  Archive,
  ListTodo
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "./avatar-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateId } from "@/lib/utils";
import { Share2 } from "lucide-react";
// Types
export type CardType = {
  id: string;
  title: string;
  subtitle: string;
  priority: "Urgent" | "Medium";
  assignees: { id: string; image: string; name: string }[];
  comments: number;
  dueDate: string;
  progress: number;
};

export type ColumnType = {
  id: string;
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  cards: CardType[];
};

export default function KanbanBoard() {
  const { toast } = useToast();
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isEditCardOpen, setIsEditCardOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const [editingCardColumnId, setEditingCardColumnId] = useState<string | null>(
    null
  );

  // Form states
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskSubtitle, setNewTaskSubtitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"Urgent" | "Medium">(
    "Medium"
  );
  const [newCardTitle, setNewCardTitle] = useState("");
  const [editCardTitle, setEditCardTitle] = useState("");
  const [editCardSubtitle, setEditCardSubtitle] = useState("");
  const [editCardPriority, setEditCardPriority] = useState<"Urgent" | "Medium">(
    "Medium"
  );

  // Initialize with default columns and data
  useEffect(() => {
    const initialColumns: ColumnType[] = [
      {
        id: "todo",
        title: "To do",
        icon: <ListTodo className="h-4 w-4 text-gray-500" />,
        colorClass: "bg-gray-100",
        cards: [
          {
            id: "card1",
            title: "UX Research",
            subtitle: "School Website",
            priority: "Urgent",
            assignees: [
              {
                id: "user1",
                image: "https://randomuser.me/api/portraits/men/20.jpg",
                name: "User 1",
              },
              {
                id: "user2",
                image: "https://randomuser.me/api/portraits/men/22.jpg",
                name: "User 2",
              },
              {
                id: "user3",
                image: "https://randomuser.me/api/portraits/men/60.jpg",
                name: "User 3",
              },
            ],
            comments: 5,
            dueDate: "5 Oct",
            progress: 10,
          },
          {
            id: "card2",
            title: "UI Design",
            subtitle: "School Website",
            priority: "Medium",
            assignees: [
              {
                id: "user1",
                image: "https://randomuser.me/api/portraits/men/9.jpg",
                name: "User 1",
              },
              {
                id: "user2",
                image: "https://randomuser.me/api/portraits/men/30.jpg",
                name: "User 2",
              },
              {
                id: "user3",
                image: "https://randomuser.me/api/portraits/men/20.jpg",
                name: "User 3",
              },
            ],
            comments: 5,
            dueDate: "5 Oct",
            progress: 0,
          },
          {
            id: "card3",
            title: "UX Research",
            subtitle: "School Website",
            priority: "Urgent",
            assignees: [
              {
                id: "user1",
                image: "https://randomuser.me/api/portraits/men/5.jpg",
                name: "User 1",
              },
              {
                id: "user2",
                image: "https://randomuser.me/api/portraits/men/4.jpg",
                name: "User 2",
              },
              {
                id: "user3",
                image: "https://randomuser.me/api/portraits/men/3.jpg",
                name: "User 3",
              },
            ],
            comments: 5,
            dueDate: "5 Oct",
            progress: 0,
          },
          {
            id: "card11",
            title: "UX Research",
            subtitle: "School Website",
            priority: "Urgent",
            assignees: [
              {
                id: "user1",
                image: "https://randomuser.me/api/portraits/men/55.jpg",
                name: "User 1",
              },
              {
                id: "user2",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                name: "User 2",
              },
              {
                id: "user3",
                image: "https://randomuser.me/api/portraits/men/33.jpg",
                name: "User 3",
              },
            ],
            comments: 5,
            dueDate: "5 Oct",
            progress: 0,
          },
        ],
      },
      {
        id: "inprogress",
        title: "In Progress",
        icon: <Clock3  className="h-4 w-4 " />,
        colorClass: " bg-blue-100 text-blue-700",
        cards: [
          {
            id: "card4",
            title: "UX Research",
            subtitle: "School Website",
            priority: "Urgent",
            assignees: [
              {
                id: "user1",
                image:"https://randomuser.me/api/portraits/women/41.jpg",
                name: "User 1",
              },
              {
                id: "user2",
                image: "https://randomuser.me/api/portraits/women/43.jpg",
                name: "User 2",
              },
              {
                id: "user3",
                image: "https://randomuser.me/api/portraits/women/42.jpg",
                name: "User 3",
              },
            ],
            comments: 5,
            dueDate: "5 Oct",
            progress: 0,
          },
          {
            id: "card5",
            title: "UI Design",
            subtitle: "School Website",
            priority: "Medium",
            assignees: [
              {
                id: "user1",
                image: "https://randomuser.me/api/portraits/women/3.jpg",
                name: "User 1",
              },
              {
                id: "user2",
                image: "https://randomuser.me/api/portraits/women/4.jpg",
                name: "User 2",
              },
              {
                id: "user3",
                image: "https://randomuser.me/api/portraits/women/5.jpg",
                name: "User 3",
              },
            ],
            comments: 5,
            dueDate: "5 Oct",
            progress: 0,
          },
          {
            id: "card6",
            title: "UX Research",
            subtitle: "School Website",
            priority: "Urgent",
            assignees: [
              {
                id: "user1",
                image: "https://randomuser.me/api/portraits/women/7.jpg",
                name: "User 1",
              },
              {
                id: "user2",
                image: "https://randomuser.me/api/portraits/women/8.jpg",
                name: "User 2",
              },
              {
                id: "user3",
                image: "https://randomuser.me/api/portraits/women/4.jpg",
                name: "User 3",
              },
            ],
            comments: 5,
            dueDate: "5 Oct",
            progress: 0,
          },
        ],
      },
      {
        id: "review",
        title: "Review",
        icon: <Eye  className="h-4 w-4 " />,
        colorClass: "bg-orange-100 text-orange-400 fill-orange-400",
        cards: [
          {
            id: "card7",
            title: "UX Research",
            subtitle: "School Website",
            priority: "Urgent",
            assignees: [
              {
                id: "user1",
                image: "https://randomuser.me/api/portraits/women/10.jpg",
                name: "User 1",
              },
              {
                id: "user2",
                image: "https://randomuser.me/api/portraits/women/11.jpg",
                name: "User 2",
              },
              {
                id: "user3",
                image: "https://randomuser.me/api/portraits/women/12.jpg",
                name: "User 3",
              },
            ],
            comments: 5,
            dueDate: "5 Oct",
            progress: 0,
          },
          {
            id: "card8",
            title: "UI Design",
            subtitle: "School Website",
            priority: "Medium",
            assignees: [
              {
                id: "user1",
                image: "https://randomuser.me/api/portraits/women/13.jpg",
                name: "User 1",
              },
              {
                id: "user2",
                image: "https://randomuser.me/api/portraits/women/14.jpg",
                name: "User 2",
              },
              {
                id: "user3",
                image: "https://randomuser.me/api/portraits/women/15.jpg",
                name: "User 3",
              },
            ],
            comments: 5,
            dueDate: "5 Oct",
            progress: 0,
          },
        ],
      },
      {
        id: "completed",
        title: "Completed",
        icon: <CheckCircle  className="h-4 w-4 " />,
        colorClass: "bg-green-100 text-green-500 fill-green-400",
        cards: [
          {
            id: "card9",
            title: "UX Research",
            subtitle: "School Website",
            priority: "Urgent",
            assignees: [
              {
                id: "user1",
                image: "https://randomuser.me/api/portraits/women/16.jpg",
                name: "User 1",
              },
              {
                id: "user2",
                image: "https://randomuser.me/api/portraits/women/17.jpg",
                name: "User 2",
              },
              {
                id: "user3",
                image: "https://randomuser.me/api/portraits/women/18.jpg",
                name: "User 3",
              },
            ],
            comments: 5,
            dueDate: "5 Oct",
            progress: 0,
          },
        ],
      },
      {
        id: "archive",
        title: "Archive",
        icon: <Archive  className="h-4 w-4 " />,
        colorClass: "bg-gray-50 text-gray-400",
        cards: [
          {
            id: "card10",
            title: "UX Research",
            subtitle: "School Website",
            priority: "Urgent",
            assignees: [
              {
                id: "user1",
                image: "https://randomuser.me/api/portraits/women/19.jpg",
                name: "User 1",
              },
              {
                id: "user2",
                image: "https://randomuser.me/api/portraits/women/20.jpg",
                name: "User 2",
              },
              {
                id: "user3",
                image: "https://randomuser.me/api/portraits/women/21.jpg",
                name: "User 3",
              },
            ],
            comments: 5,
            dueDate: "5 Oct",
            progress: 0,
          },
        ],
      },
    ];

    setColumns(initialColumns);
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the item is dropped in the same place
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Find the source and destination columns
    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destColumn = columns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destColumn) return;

    // Create new arrays for the columns
    const newColumns = [...columns];
    const sourceColIndex = newColumns.findIndex(
      (col) => col.id === source.droppableId
    );
    const destColIndex = newColumns.findIndex(
      (col) => col.id === destination.droppableId
    );

    // Find the task being moved
    const card = sourceColumn.cards.find((t) => t.id === draggableId);
    if (!card) return;

    // Remove the card from the source column
    newColumns[sourceColIndex] = {
      ...sourceColumn,
      cards: sourceColumn.cards.filter((t) => t.id !== draggableId),
    };

    // Add the card to the destination column
    newColumns[destColIndex] = {
      ...destColumn,
      cards: [
        ...destColumn.cards.slice(0, destination.index),
        card,
        ...destColumn.cards.slice(destination.index),
      ],
    };

    setColumns(newColumns);

    toast({
      title: "Task moved",
      description: `"${card.title}" moved to ${destColumn.title}`,
    });
  };

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive",
      });
      return;
    }

    const newTask: CardType = {
      id: `task-${generateId()}`,
      title: newTaskTitle,
      subtitle: newTaskSubtitle || "School Website",
      priority: newTaskPriority,
      assignees: [
        {
          id: "user1",
          image: "https://randomuser.me/api/portraits/women/21.jpg",
          name: "User 1",
        },
        {
          id: "user2",
          image: "https://randomuser.me/api/portraits/men/21.jpg",
          name: "User 2",
        },
      ],
      comments: 0,
      dueDate: "5 Oct",
      progress: 0,
    };

    // Add to first column by default
    const newColumns = [...columns];
    newColumns[0] = {
      ...newColumns[0],
      cards: [...newColumns[0].cards, newTask],
    };

    setColumns(newColumns);
    setIsCreateTaskOpen(false);
    setNewTaskTitle("");
    setNewTaskSubtitle("");
    setNewTaskPriority("Medium");

    toast({
      title: "Task created",
      description: `"${newTask.title}" added to ${newColumns[0].title}`,
    });
  };

  const handleAddCard = () => {
    if (!newCardTitle.trim() || !selectedColumnId) {
      toast({
        title: "Error",
        description: "Card title is required",
        variant: "destructive",
      });
      return;
    }

    const columnIndex = columns.findIndex((col) => col.id === selectedColumnId);
    if (columnIndex === -1) return;

    const newCard: CardType = {
      id: `card-${generateId()}`,
      title: newCardTitle,
      subtitle: "School Website",
      priority: "Medium",
      assignees: [
        {
          id: "user1",
          image: "https://randomuser.me/api/portraits/men/21.jpg",
          name: "User 1",
        },
        {
          id: "user2",
          image: "https://randomuser.me/api/portraits/women/21.jpg",
          name: "User 2",
        },
      ],
      comments: 0,
      dueDate: "5 Oct",
      progress: 0,
    };

    const newColumns = [...columns];
    newColumns[columnIndex] = {
      ...newColumns[columnIndex],
      cards: [...newColumns[columnIndex].cards, newCard],
    };

    setColumns(newColumns);
    setIsAddCardOpen(false);
    setNewCardTitle("");
    setSelectedColumnId(null);

    toast({
      title: "Card added",
      description: `"${newCard.title}" added to ${newColumns[columnIndex].title}`,
    });
  };

  const handleEditCard = () => {
    if (!editCardTitle.trim() || !editingCard || !editingCardColumnId) {
      toast({
        title: "Error",
        description: "Card title is required",
        variant: "destructive",
      });
      return;
    }

    const columnIndex = columns.findIndex(
      (col) => col.id === editingCardColumnId
    );
    if (columnIndex === -1) return;

    const updatedCard: CardType = {
      ...editingCard,
      title: editCardTitle,
      subtitle: editCardSubtitle || editingCard.subtitle,
      priority: editCardPriority,
    };

    const newColumns = [...columns];
    newColumns[columnIndex] = {
      ...newColumns[columnIndex],
      cards: newColumns[columnIndex].cards.map((card) =>
        card.id === editingCard.id ? updatedCard : card
      ),
    };

    setColumns(newColumns);
    setIsEditCardOpen(false);
    setEditingCard(null);
    setEditingCardColumnId(null);

    toast({
      title: "Card updated",
      description: `"${updatedCard.title}" has been updated`,
    });
  };

  const openEditCardDialog = (card: CardType, columnId: string) => {
    setEditingCard(card);
    setEditingCardColumnId(columnId);
    setEditCardTitle(card.title);
    setEditCardSubtitle(card.subtitle);
    setEditCardPriority(card.priority);
    setIsEditCardOpen(true);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between p-4 border-b gap-4 sm:gap-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#F5F5F5" />
              <path
                d="M19 12H5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold">Website Design</h1>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search className="text-gray-400 h-4 w-4 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm w-full sm:w-56 focus:outline-none"
              />
            </div>
          </div>
          <Bell className="h-5 w-5 text-gray-500" />
          <Mail className="h-5 w-5 text-gray-500" />
        </div>
      </header>

      {/* Project Info */}

      <div className="px-6 py-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">NAME</div>
              <div className="font-bold text-lg">Website Design</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">BUDGET</div>
              <div className="font-bold text-lg">$45,000</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">STATUS</div>
              <div className="font-bold text-lg">Inprogress</div>
            </div>
            <div>
<div className="text-xs text-gray-500 uppercase mb-1 ">
                TEAM ON PROJECT
              </div>
              <AvatarGroup>
                <Avatar className="border-2 border-white h-10 w-10">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/81.jpg" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>

                <Avatar className="border-2 border-white h-10 w-10">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/33.jpg" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white h-10 w-10">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/17.jpg" />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white h-10 w-10">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/62.jpg" />
                  <AvatarFallback>U4</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white h-10 w-10">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/3.jpg" />
                  <AvatarFallback>U5</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">
                Completion Rate
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8">
                <div
                  className="bg-teal-500 h-8 rounded-full flex items-center justify-center text-xs text-white font-medium"
                  style={{ width: "75%" }}
                >
                  75%
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4 ">
              <Button
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 rounded-md h-8 px-4 whitespace-nowrap flex items-center gap-1"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 px-6 pb-6">
        {/* Tabs and Board */}
        <div className="border rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b overflow-x-auto no-scrollbar">
            <div className="px-4 py-3 text-sm whitespace-nowrap">Overview</div>
            <div className="px-4 py-3 text-sm bg-pink-500 text-white whitespace-nowrap">
              Onboard
            </div>
            <div className="px-4 py-3 text-sm whitespace-nowrap">
              Milestones
            </div>
            <div className="px-4 py-3 text-sm whitespace-nowrap">
              Deliverable
            </div>
            <div className="px-4 py-3 text-sm whitespace-nowrap">Calendar</div>
            <div className="px-4 py-3 text-sm whitespace-nowrap">
              Discussion
            </div>
            <div className="ml-auto flex items-center px-4 gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="rounded-md h-8 border-pink-500 text-pink-500"
                onClick={() => setIsAddCardOpen(true)}
              >
                Add card
              </Button>
              <Button
                size="sm"
                className="bg-teal-500 hover:bg-teal-600 rounded-md h-8"
                onClick={() => setIsCreateTaskOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Create task
              </Button>
            </div>
          </div>

          {/* Kanban Board */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
              {columns.map((column) => (
                <div key={column.id} className="flex flex-col h-full">
                  <div
                    className={`p-2 rounded-md ${column.colorClass} flex items-center gap-2 mb-3`}
                  >
                    {column.icon}
                    <h3 className="font-medium text-sm">{column.title}</h3>
                  </div>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex-1 space-y-3 min-h-[200px]"
                      >
                        {column.cards.map((card, index) => (
                          <Draggable
                            key={card.id}
                            draggableId={card.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white border rounded-md p-3 shadow-sm ${
                                  snapshot.isDragging ? "opacity-50" : ""
                                }`}
                                style={{
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div
                                    className={`text-xs px-2 py-0.5 rounded ${
                                      card.priority === "Urgent"
                                        ? "bg-red-50 text-red-500"
                                        : "bg-blue-50 text-blue-500"
                                    }`}
                                  >
                                    {card.priority}
                                  </div>
                                  <button
                                    className="text-gray-400 hover:text-gray-600"
                                    onClick={() =>
                                      openEditCardDialog(card, column.id)
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <circle cx="12" cy="12" r="1" />
                                      <circle cx="19" cy="12" r="1" />
                                      <circle cx="5" cy="12" r="1" />
                                    </svg>
                                  </button>
                                </div>
                                <h4 className="font-medium mb-1">
                                  {card.title}
                                </h4>
                                <p className="text-xs text-gray-500 mb-3">
                                  {card.subtitle}
                                </p>
                                <div className="flex justify-between items-center">
                                  <AvatarGroup>
                                    {card.assignees.map((assignee, index) => (
                                      <Avatar
                                        key={index}
                                        className="h-6 w-6 border-2 border-white"
                                      >
                                        <AvatarImage
                                          src={
                                            assignee.image || "/placeholder.svg"
                                          }
                                          alt={assignee.name}
                                        />
                                        <AvatarFallback>
                                          {assignee.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                    ))}
                                  </AvatarGroup>
                                  <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-1"
                                      >
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                      </svg>
                                      {card.comments}
                                    </div>
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-1"
                                      >
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                      </svg>
                                      {card.dueDate}
                                    </div>
                                    <div>{card.progress}%</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>

      {/* Create Task Dialog */}
      <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-subtitle">Subtitle</Label>
              <Input
                id="task-subtitle"
                value={newTaskSubtitle}
                onChange={(e) => setNewTaskSubtitle(e.target.value)}
                placeholder="School Website"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-priority">Priority</Label>
              <Select
                value={newTaskPriority}
                onValueChange={(value: "Urgent" | "Medium") =>
                  setNewTaskPriority(value)
                }
              >
                <SelectTrigger id="task-priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateTaskOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateTask}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Card Dialog */}
      <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="card-title">Card Title</Label>
              <Input
                id="card-title"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Enter card title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="column">Select Column</Label>
              <Select
                value={selectedColumnId || ""}
                onValueChange={(value) => setSelectedColumnId(value)}
              >
                <SelectTrigger id="column">
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCardOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCard}>Add Card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Card Dialog */}
      <Dialog open={isEditCardOpen} onOpenChange={setIsEditCardOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-card-title">Card Title</Label>
              <Input
                id="edit-card-title"
                value={editCardTitle}
                onChange={(e) => setEditCardTitle(e.target.value)}
                placeholder="Enter card title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-card-subtitle">Subtitle</Label>
              <Input
                id="edit-card-subtitle"
                value={editCardSubtitle}
                onChange={(e) => setEditCardSubtitle(e.target.value)}
                placeholder="School Website"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-card-priority">Priority</Label>
              <Select
                value={editCardPriority}
                onValueChange={(value: "Urgent" | "Medium") =>
                  setEditCardPriority(value)
                }
              >
                <SelectTrigger id="edit-card-priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCardOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCard}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}