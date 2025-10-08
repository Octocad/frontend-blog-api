import { useState, type FormEvent } from "react"
import { FiSave, FiX } from "react-icons/fi"
import type { CreatePostData } from "../interfaces"

interface PostFormProps {
  initialData?: CreatePostData
  onSubmit: (data: CreatePostData) => Promise<void>
  onCancel: () => void
  submitLabel?: string
}

export function PostForm({ initialData, onSubmit, onCancel, submitLabel = "Criar Post" }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [author, setAuthor] = useState(initialData?.author || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit({ title, content, author })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Título
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-md text-black border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Digite o título do post"
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium mb-2">
          Autor
        </label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full rounded-md text-black border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Digite o nome do autor"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Conteúdo
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          className="w-full rounded-md text-black border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          placeholder="Digite o conteúdo do post"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FiSave className="h-4 w-4" />
          {isSubmitting ? "Salvando..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 rounded-md border border-border px-6 py-2 hover:bg-accent transition-colors"
        >
          <FiX className="h-4 w-4" />
          Cancelar
        </button>
      </div>
    </form>
  )
}
