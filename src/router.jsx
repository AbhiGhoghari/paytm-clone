import { createElement } from 'react'
import {Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import { Signin } from './components/Signin'
import { Signup } from './components/Signup'
import { Dashbord } from './components/Dashbord'
import { Layout } from './components/Layout'

export const router = createBrowserRouter([
{
   path:"/",
   element:<Layout><Dashbord /></Layout>

},
 {
    path:"/signup",
    element:<Signup />
 },
 {
    path:"/signin",
    element:<Signin />
 },
 {
    path:"/dashbord",
    element:<Layout><Dashbord /></Layout>
 }
    
      
    
])