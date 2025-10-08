/// <reference types="vite/client" />
const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:3030/posts"
import { Post, CreatePostData, UpdatePostData } from "../interfaces"


export const api = {

  async getPosts(query?: string): Promise<Post[]> {
    if (query) {
      const response = await fetch(`${BACKEND_URL}/search?term=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error("Failed to fetch posts")
      return response.json()
    } else {
      const response = await fetch(BACKEND_URL)
      if (!response.ok) throw new Error("Failed to fetch posts")
      return response.json()
    }
  },

  async searchPosts(term: string): Promise<Post[]> {
    const response = await fetch(`${BACKEND_URL}/search?term=${encodeURIComponent(term)}`)
    if (!response.ok) throw new Error("Failed to search posts")
    return response.json()
  },

  async getPostById(id: string): Promise<Post> {
    const response = await fetch(`${BACKEND_URL}/${id}`)
    if (!response.ok) throw new Error("Failed to fetch post")
    return response.json()
  },

  async createPost(data: CreatePostData): Promise<Post> {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create post")
    return response.json()
  },

  async updatePost(id: string, data: UpdatePostData): Promise<Post> {
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update post")
    return response.json()
  },

  async deletePost(id: string): Promise<void> {
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete post")
  },
}