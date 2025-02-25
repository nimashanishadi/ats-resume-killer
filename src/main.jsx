import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import BlogPage from './pages/BlogPage.jsx'
import Contact from './pages/Contact.jsx'
import AboutUs from './pages/AboutUs.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
