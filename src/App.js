import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import LangContextProvider from './Context/LangContext';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import UserContextProvider from './Context/UserContext';
let router = createBrowserRouter([
  {path:"/",element:<Layout />,children:[
    {path:"/",element:<Home />},
    {path:"login",element:<Login />},
    {path:"register",element:<Register />},
    {path:"profile",element:<Profile />},
  ]}
])

function App() {
  return <>
  <UserContextProvider>
  <RouterProvider router={router}></RouterProvider>

  </UserContextProvider>


  </>

}

export default App;
