import { Outlet } from 'react-router'
import Header from './components/Header'
import { BackgroundBeams } from './components/ui/background-beams'

function App() {
  return (
    <div className="min-h-screen ">
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <BackgroundBeams className='z-[-1]' />
    </div>
  )
}

export default App
