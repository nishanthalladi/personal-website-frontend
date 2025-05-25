import './App.css'
import P5Wrapper from './components/P5Wrapper';
import FractalSketch from './animations/PolyFractalSketch';
import DragonCurve from './animations/DragonCurve';

function App() {
  return (
    <div className="container">
      <header>
        <h1>Nishanth Alladi</h1>
        <p>Welcome to my website!</p>
      </header>

      {/* <section>
        <h2>About Me</h2>
        <div className="card">

        </div>
      </section>

      <section>
        <h2>Projects</h2>
        <div className="card">

        </div>
      </section>

      <section>
        <h2>Contact</h2>
        <div className="card">

        </div>
      </section> */}

      <div className="sketch-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '2rem' }}>
        {/* <P5Wrapper sketch={FractalSketch} /> */}
        {/* <P5Wrapper sketch={DragonCurve} /> */}
        <P5Wrapper sketch={FractalSketch} />
      </div>
      {/* <div style={{ height: '10rem' }} /> */}
      {/* <P5Wrapper sketch={DragonCurve} /> */}

      {/* <footer>
        <p>&copy; {new Date().getFullYear()} Nishanth Alladi</p>
      </footer> */}
    </div>
  )
}

export default App