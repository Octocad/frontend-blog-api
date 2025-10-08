import { Link } from "react-router-dom"
import { FiUser, FiCalendar } from "react-icons/fi"
import type { Post } from "../interfaces"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <Link to={`/posts/${post._id}`}>
      <div className="group h-full rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
        <h2 className="mb-3 text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>
        <p className="mb-4 text-muted-foreground line-clamp-3">{post.content}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <FiUser className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiCalendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
