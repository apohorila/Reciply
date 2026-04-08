import { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
      <Route index element={<Home/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
