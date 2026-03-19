import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Todo } from '@/entities/Todo'
import * as fs from 'fs'
import * as path from 'path'

// Determine database path - use /tmp for containerized environments
const getDatabasePath = (): string => {
  if (process.env.DATABASE_PATH) {
    return process.env.DATABASE_PATH
  }
  // Check if we're in a read-only environment (like some Docker containers)
  const dbPath = './database/todos.db'
  const dbDir = path.dirname(dbPath)
  try {
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }
    return dbPath
  } catch {
    // Fall back to /tmp if we can't create the directory
    return '/tmp/todos.db'
  }
}

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: getDatabasePath(),
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
