import React from "react"
import { createBrowserRouter , RouterProvider } from "react-router-dom"
import Root from "./pages/Root.tsx"

import Signup from "./pages/SignUp.tsx"
import HomePage from "./pages/HomePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path : "/",
    errorElement : <ErrorPage />,
    element : <Root />,
    children : [
      {
        index : true, 
        element : <HomePage />
      },
      {
        path : "/signup",
        element : <Signup />
      },
      {
        path: "/login",
        element : <Login />
      }
    ]
  }
])

const App : React.FC = () => { 
    return (
        <>
            <RouterProvider router={router}>

            </RouterProvider>
        </>
    )
}

export default App;