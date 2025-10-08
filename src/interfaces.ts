const BACKEND_URL = "http://localhost:3030/posts"

export interface Post {
  _id: string
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}

export interface CreatePostData {
  title: string
  content: string
  author: string
}

export interface UpdatePostData {
  title: string
  content: string
  author: string
}

