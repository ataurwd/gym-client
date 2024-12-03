
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AddData from './components/AddData'
import Table from './components/Table'
import 'react-datepicker/dist/react-datepicker.css';


function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <AddData/>,
    },
    {
      path: '/table',
      element: <Table />,
      loader: () => fetch('http://localhost:5000/schudules'),
    }
  ])

  return (
    <RouterProvider router={route}>
      
      </RouterProvider>
  )
}

export default App
