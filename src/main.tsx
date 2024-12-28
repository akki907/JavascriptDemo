import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './Provider/ThemeProvider'
import PromiseDemo from './Pages/PromiseDemo.tsx';
import EventLoopDemo from './Pages/EventLoop.tsx';
import Dashboard from './Pages/DashBoard.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          {/* <Route index element={<App />} />
          <Route path="promise-demo" element={<PromiseDemo />} />
          <Route path="event-demo" element={<EventLoopDemo />} /> */}
          <Route path="/" element={<App />}>
            <Route index element={<Dashboard />} />
            <Route path="promise-demo" element={<PromiseDemo />} />
            <Route path="event-demo" element={<EventLoopDemo />} /> *
          </Route>

        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
