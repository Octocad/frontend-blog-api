import { useNavigate, Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import { api } from "../../services/api"
import { type CreatePostData } from "../../interfaces"
import { PostForm } from "../../components/PostForm"

export default function NewPostPage() {
  const navigate = useNavigate()

  const handleSubmit = async (data: CreatePostData) => {
    try {
      await api.createPost(data)
      navigate("/")
    } catch (err) {
      alert("Erro ao criar post.")
    }
  }

  const handleCancel = () => {
    navigate("/")
  }

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
      <main className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-xl p-8 shadow-lg form-dark">
          <h1 className="text-3xl font-bold mb-8 text-blue-400">
            Criar Novo Post
          </h1>

          <PostForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Criar Post"
          />
        </div>
      </main>
    </div>
  )
}
