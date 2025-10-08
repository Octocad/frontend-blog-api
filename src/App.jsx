import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage";
import NewPostPage from "./pages/NewPostPage.tsx";
import PostDetailPage from "./pages/PostDetailPage";
import EditPostPage from "./pages/EditPostPage";

function App() {
  return (
    <BrowserRouter>
      <div className="dark min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/new" element={<NewPostPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/posts/:id/edit" element={<EditPostPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
