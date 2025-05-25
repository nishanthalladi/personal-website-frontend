import './App.css'
import { useState } from 'react';
import P5Wrapper from './components/P5Wrapper';
import FractalSketch from './animations/PolyFractalSketch';
import DragonCurve from './animations/DragonCurve';
import DrawbotBoard from './components/DrawbotBoard';


function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="container">
      <div className="top-left-sidebar">
        <select value={page} onChange={(e) => setPage(e.target.value)}>
          <option value="home">Home</option>
          <option value="about">About</option>
          <option value="drawbot">Drawbot</option>
          <option value="contact">Contact</option>
        </select>
      </div>

      {page === 'home' && (
        <div>
          <header>
            <h1>Nishanth Alladi</h1>
            <p>Welcome to my website!</p>
          </header>
          <div className="sketch-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '2rem' }}>
          {/* <P5Wrapper sketch={FractalSketch} /> */}
          {/* <P5Wrapper sketch={DragonCurve} /> */}
          <P5Wrapper sketch={FractalSketch} />
          </div>
        </div>
      )}

      {page === 'about' && (
        <section>
          <h2>About Me</h2>
          <div className="card">[About content here]</div>
        </section>
      )}

      {page === 'drawbot' && (
        <section>
          <h1>Drawbot</h1>
          <p>The Chess robot that never loses...but also never wins!</p>
          <DrawbotBoard />
        </section>
      )}

      {page === 'contact' && (
        <section>
          <h2>Contact</h2>
          <div className="card">[Contact content here]</div>
        </section>
      )}

      {/* <div style={{ height: '10rem' }} /> */}
      {/* <P5Wrapper sketch={DragonCurve} /> */}

      {/* <footer>
        <p>&copy; {new Date().getFullYear()} Nishanth Alladi</p>
      </footer> */}
    </div>
  )
}

export default App