import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Todo } from '@/entities/Todo'

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_PATH || './database/todos.db',
  entities: [Todo],
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  logging: process.env.DATABASE_LOGGING === 'true',
})

// Initialize database connection
export async function initializeDatabase() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
    console.log('Database initialized successfully')
  }
  return AppDataSource
}

// Get all todos
export async function getTodos() {
  await initializeDatabase()
  const todoRepository = AppDataSource.getRepository(Todo)
  return todoRepository.find({
    order: { createdAt: 'DESC' },
  })
}

// Create a new todo
export async function createTodo(title: string) {
  await initializeDatabase()
  const todoRepository = AppDataSource.getRepository(Todo)
  const todo = new Todo()
  todo.title = title
  todo.completed = false
  return todoRepository.save(todo)
}

// Update todo completion status
export async function updateTodo(id: number, completed: boolean) {
  await initializeDatabase()
  const todoRepository = AppDataSource.getRepository(Todo)
  await todoRepository.update(id, { completed })
  return todoRepository.findOne({ where: { id } })
}

// Delete a todo
export async function deleteTodo(id: number) {
  await initializeDatabase()
  const todoRepository = AppDataSource.getRepository(Todo)
  return todoRepository.delete(id)
}
