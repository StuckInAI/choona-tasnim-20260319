'use client'

import { useState } from 'react'
import TodoItem from './TodoItem'
import { Todo } from '@/entities/Todo'

type TodoListProps = {
  initialTodos: Todo[]
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const handleTodoUpdate = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)))
  }

  const handleTodoDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No todos yet. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={handleTodoUpdate}
          onDelete={handleTodoDelete}
        />
      ))}
    </div>
  )
}
