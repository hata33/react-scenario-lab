import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import routes from './routes.tsx'

const router = createBrowserRouter(routes)

const rootElement = document.getElementById('root') as HTMLElement
createRoot(rootElement).render(
  <StrictMode>
    <Suspense fallback={<div className="p-6 text-gray-600">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
)


