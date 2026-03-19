import { NextRequest, NextResponse } from 'next/server'
import { createTodo, getTodos } from '@/lib/database'

// GET all todos
export async function GET() {
  try {
    const todos = await getTodos()
    return NextResponse.json(todos)
  } catch (error) {
    console.error('Error fetching todos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    )
  }
}

// POST create new todo
export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json()
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    const todo = await createTodo(title.trim())
    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    console.error('Error creating todo:', error)
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    )
  }
}
