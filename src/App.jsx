import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import AppLayout from './Pages/AppLayout';
import CustomerViewPage from './Pages/Customers/CustomerViewPage';
import HomePages from './Pages/HomePages';
import Login from './Pages/Login';

function App() {
  const appRoutes = createBrowserRouter([{
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'home',
        element: <HomePages />
      
      }, {
        path: 'login',
        element:<Login/>
      },
      {
        path: 'home/user/:id',
        element:<CustomerViewPage/>
      }
  
    ]
  }])


  return (<>
     <ToastContainer position="bottom-right" theme="dark" />
  <RouterProvider router={appRoutes} /></>
  
  )
}

export default App
