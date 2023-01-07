import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/ErrorPage';
import Layouts from './components/layouts';
import './index.css'
import EditarCliente, { loader as EditarClienteLoader, action as EditarClienteAction } from './Views/EditarCliente';
import { Index, loader as ClienteLoader } from './Views/Index';
import NuevoCliente, { action as NuevoClienteActions } from './Views/NuevoCliente';
import {action as EliminarCliente} from './components/Cliente'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: ClienteLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: NuevoClienteActions,
        errorElement: <ErrorPage />,
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        loader: EditarClienteLoader,
        action: EditarClienteAction,
        errorElement: <ErrorPage />,

      },
      {
        path: '/clientes/:clienteId/eliminar',
        action: EliminarCliente
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>,
)
