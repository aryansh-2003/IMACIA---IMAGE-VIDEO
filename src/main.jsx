import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router'
const Header = lazy(()=>import('./assets/components/Header/Header'))
const Sample1 = lazy(()=>import('./assets/components/Sample1/Sample1'))
import Sample2 from './assets/components/Sample2/Sample2'
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
    
  },
  {
    path:'/image',
    element:(
      <>
      <Sample2/>
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
