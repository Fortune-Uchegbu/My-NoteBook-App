import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { NoteProvider } from "../contexts/NoteContext";
import './index.css';
const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <NoteProvider>
      <RouterProvider router={router} />      
    </NoteProvider>
  </React.StrictMode>
);
