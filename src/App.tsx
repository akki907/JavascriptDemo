import PromiseMethodsDemo from './components/PromiseMethodsDemo'
import ThemeToggle from './components/ThemeToggle'

function App() {

  return (

    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="p-4 flex justify-end">
        <ThemeToggle />
      </div>
      <main className="p-4">
        <PromiseMethodsDemo />
      </main>
    </div>
  )
}

export default App
