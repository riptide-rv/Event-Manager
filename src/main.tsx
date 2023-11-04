import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { LoginScreen } from './components/screens/LoginScreen.tsx';
import AuthRoute from './components/AuthRoute.tsx';

import { Two } from './components/screens/Two.tsx';
import { One } from './components/screens/One.tsx';
import { MainApp } from './components/screens/MainApp.tsx';
import SplashScreen from './components/screens/SplashScreen.tsx';
import { HomeScreen } from './components/screens/HomeScreen.tsx';





const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute> <App/></AuthRoute>,
    children:[
      {
        path: "one",
        element: <HomeScreen/>
      }
    ,
    {
      path: "two",
      element: <Two/>
    }
  ]
    
  },

  {
    path:"/login",
    element: <LoginScreen/>

  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)

