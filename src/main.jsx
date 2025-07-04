import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router'
import Layout from './Layout'
import Header from './assets/components/Header/Header'
import Sample1 from './assets/components/Sample1/Sample1'
import UserContextProvider from './assets/components/context/UserContextProvider'
import Signin from './assets/components/login and signup/Signin'
import Signup from './assets/components/login and signup/Signup'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Signin/>,
    
  },
  {
    path:'/Signup',
    element:<Signup/>,
    
  },
  {
    path:'/Home',
    element:(
      <>
      <Header/>
      <Sample1/>
      </>
    )
    
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
    <RouterProvider router ={router}/>
    </UserContextProvider>
  </StrictMode>,
)
