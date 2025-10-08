import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FiSearch, FiPlus } from "react-icons/fi"
import { type Post } from "../../interfaces"
import { PostCard } from "../../components/PostCard"
import { api } from "../../services/api"

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await api.getPosts(searchQuery)
        setPosts(data)
      } catch (err) {
        setError("Erro ao carregar posts. Verifique se o backend está rodando.")
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(fetchPosts, 300)
    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 text-slate-100">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 shadow-lg">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            <span className="text-blue-400">Blog</span> MVP
          </h1>
          <Link
            to="/posts/new"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-500 hover:shadow-lg active:scale-[0.98] transition-all duration-200"
          >
            <FiPlus className="h-4 w-4" />
            Novo Post
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="container mx-auto px-4 py-12">
        {/* SEARCH */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-full max-w-xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="search"
              placeholder="Buscar posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-12 pr-4 py-3 text-slate-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* STATES */}
        {isLoading && (
          <div className="text-center py-20 animate-pulse">
            <p className="text-slate-400">Carregando posts...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">
              {searchQuery
                ? "Nenhum post encontrado 😕"
                : "Nenhum post ainda. Crie o primeiro 🚀"}
            </p>
          </div>
        )}

        {!isLoading && !error && posts.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="transition-transform duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/20 rounded-xl overflow-hidden"
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
