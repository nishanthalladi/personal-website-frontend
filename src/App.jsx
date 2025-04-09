import './App.css'

function App() {
  return (
    <div className="container">
      <header>
        <h1>Nishanth Alladi</h1>
        <p>Welcome to my website!</p>
      </header>

      <section>
        <h2>About Me</h2>
        <div className="card">
          {/* Add your about info here */}
        </div>
      </section>

      <section>
        <h2>Projects</h2>
        <div className="card">
          {/* List your projects here */}
        </div>
      </section>

      <section>
        <h2>Contact</h2>
        <div className="card">
          {/* Add contact details or a form here */}
        </div>
      </section>

      <footer>
        <p>&copy; {new Date().getFullYear()} Nishanth Alladi</p>
      </footer>
    </div>
  )
}

export default App