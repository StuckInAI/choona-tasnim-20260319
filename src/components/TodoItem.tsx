'use client'

import { Todo } from '@/entities/Todo'

type TodoItemProps = {
  todo: Todo
  onUpdate: (todo: Todo) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const toggleComplete = async () => {
    if (isUpdating) return
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      })
      if (response.ok) {
        const updatedTodo = await response.json()
        onUpdate(updatedTodo)
      }
    } catch (error) {
      console.error('Failed to update todo:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const deleteTodo = async () => {
    if (isUpdating) return
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        onDelete(todo.id)
      }
    } catch (error) {
      console.error('Failed to delete todo:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleComplete}
          disabled={isUpdating}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'} ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {todo.completed && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div>
          <p className={`font-medium ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
            {todo.title}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(todo.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <button
        onClick={deleteTodo}
        disabled={isUpdating}
        className={`text-red-500 hover:text-red-700 ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}

import { useState } from 'react'