import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './basics/Home.tsx'
import Dashboard from './basics/Dashboard.tsx'
import Login from './auth/Login.tsx'
import Signup from './auth/Signup.tsx'
import { Toaster } from 'sonner'
import QuizPage from './basics/QuizPage.tsx'
import Leaderboard from './basics/Leaderboard.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },{
    element: <App/>,
    children:[
      {
        path: "/dashboard",
        element:<Dashboard/>
      }
    ]
  },{
    path: "/auth/login",
    element: <Login/>
  },
  {
    path: "/auth/signup",
    element: <Signup/>
  },
  {
    path: "/quiz/:id/questions",
    element: <QuizPage/>
  },
  {
    path: "/leaderboard",
    element: <Leaderboard/>
  }
])



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
)
