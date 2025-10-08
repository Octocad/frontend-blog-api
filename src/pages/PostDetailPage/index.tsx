"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { FiArrowLeft, FiEdit2, FiTrash2, FiUser, FiCalendar } from "react-icons/fi"
import { api } from "../../services/api"
import { type Post } from "../../interfaces"

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return
      setIsLoading(true)
      setError(null)
      try {
        const data = await api.getPostById(id)
        setPost(data)
      } catch (err) {
        setError("Erro ao carregar post.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleDelete = async () => {
    if (!id || !confirm("Tem certeza que deseja deletar este post?")) return

    setIsDeleting(true)
    try {
      await api.deletePost(id)
      navigate("/")
    } catch (err) {
      alert("Erro ao deletar post.")
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-100">
        <p className="text-slate-400">Carregando post...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-100 px-4 text-center">
        <p className="text-red-400 mb-4">{error || "Post não encontrado."}</p>
        <Link to="/" className="text-blue-400 hover:text-blue-300 underline">
          Voltar para home
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      {/* HEADER */}
      <header className="border-b border-slate-800/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="container mx-auto px-4 py-10 max-w-3xl">
        <article className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-blue-400">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-slate-400">
            <div className="flex items-center gap-1.5">
              <FiUser className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiCalendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <p className="whitespace-pre-wrap leading-relaxed">{post.content}</p>
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-800">
            <Link
              to={`/posts/${post._id}/edit`}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
            >
              <FiEdit2 className="h-4 w-4" />
              Editar
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 rounded-md border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiTrash2 className="h-4 w-4" />
              {isDeleting ? "Deletando..." : "Deletar"}
            </button>
          </div>
        </article>
      </main>
    </div>
  )
}
