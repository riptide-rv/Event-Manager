import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { LoginScreen } from './screens/LoginScreen.tsx';
import AuthRoute from './AuthRoute.tsx';

import { Two } from './screens/Two.tsx';

import { HomeScreen } from './screens/HomeScreen.tsx';
import { ViewEventScreen } from './screens/ViewEventScreen.tsx';
import { SignUpScreen } from './screens/SignUpScreen.tsx';






const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute> <App/></AuthRoute>,
    children:[
      {
        path: "one",
        element: <HomeScreen/>,
        
        
      }
    ,
    {
      index: true,
      path: "two",
      element: <Two/>
    }
  ]
    
  },

  {
    path:"/login",
    element: <LoginScreen/>

  },
  {
    path:'/view/:eventId',
    element:<ViewEventScreen/>
  },
  {
    path:"/signup",
    element:<SignUpScreen/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)

