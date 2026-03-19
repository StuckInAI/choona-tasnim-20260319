import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Todo App',
  description: 'A full-stack todo application built with Next.js and TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <main className="min-h-screen py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                {process.env.NEXT_PUBLIC_APP_NAME || 'Todo App'}
              </h1>
              <p className="text-gray-600 mt-2">Manage your tasks efficiently</p>
            </header>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}