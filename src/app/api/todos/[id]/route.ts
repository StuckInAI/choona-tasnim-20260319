import { NextRequest, NextResponse } from 'next/server'
import { updateTodo, deleteTodo } from '@/lib/database'

interface Params {
  params: { id: string }
}

// PATCH update todo
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      )
    }

    const { completed } = await request.json()
    if (typeof completed !== 'boolean') {
      return NextResponse.json(
        { error: 'Completed field must be a boolean' },
        { status: 400 }
      )
    }

    const todo = await updateTodo(id, completed)
    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(todo)
  } catch (error) {
    console.error('Error updating todo:', error)
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    )
  }
}

// DELETE todo
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      )
    }

    const result = await deleteTodo(id)
    if (result.affected === 0) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting todo:', error)
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    )
  }
}
