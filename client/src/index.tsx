import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import './styles/main.css'

const router = createBrowserRouter([
   {
      path: '/register',
      element: <Register/>
   },
   {
      path: '/',
      element: <Home/>
   }
])

createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <RouterProvider router={router}/>
   </React.StrictMode>
)