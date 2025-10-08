import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import { api } from "../../services/api"
import { type Post, type UpdatePostData } from "../../interfaces"
import { PostForm } from "../../components/PostForm"

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  const handleSubmit = async (data: UpdatePostData) => {
    if (!id) return
    try {
      await api.updatePost(id, data)
      navigate(`/posts/${id}`)
    } catch (err) {
      alert("Erro ao atualizar post.")
    }
  }

  const handleCancel = () => {
    navigate(`/posts/${id}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-200">
        <p className="text-slate-400">Carregando post...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-200">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || "Post não encontrado."}</p>
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 underline transition-colors"
          >
            Voltar para home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      {/* HEADER */}
      <header className="border-b border-slate-800/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <Link
            to={`/posts/${id}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-xl p-8 shadow-lg form-dark">
          <h1 className="text-3xl font-bold mb-8 text-blue-400">
            Editar Post
          </h1>

          <PostForm
            initialData={{
              title: post.title,
              content: post.content,
              author: post.author,
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Salvar Alterações"
          />
        </div>
      </main>
    </div>
  )
}
