import TodoList from '@/components/TodoList'
import AddTodoForm from '@/components/AddTodoForm'
import { getTodos } from '@/lib/database'

export default async function Home() {
  const todos = await getTodos()

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Todo</h2>
        <AddTodoForm />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Todos</h2>
        <TodoList initialTodos={todos} />
      </div>
    </div>
  )
}