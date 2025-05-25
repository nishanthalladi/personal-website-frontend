import './App.css'
import { useState, useEffect } from 'react';
import P5Wrapper from './components/P5Wrapper';
import FractalSketch from './animations/PolyFractalSketch';
import DragonCurve from './animations/DragonCurve';
import DrawbotBoard from './components/DrawbotBoard';
import meImage from './assets/me3.jpeg';
import meImagSwag from './assets/me3swag.jpeg';


function App() {
  const [page, setPage] = useState('home');
  const [swag, setSwag] = useState(false);

  useEffect(() => {
    const createParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.className = 'gold-dust';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      document.body.appendChild(particle);
      setTimeout(() => {
        particle.remove();
      }, 500);
    };
  
    const handleMouseMove = (e) => {
      createParticle(e.clientX, e.clientY);
    };
  
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const forceCursorNone = () => {
      document.body.style.cursor = 'none';
    };
  
    window.addEventListener('mousemove', forceCursorNone);
    return () => window.removeEventListener('mousemove', forceCursorNone);
  }, []);

  return (
    <div className="container">
      <div className="top-left-sidebar">
        <select value={page} onChange={(e) => setPage(e.target.value)}>
          <option value="home">Home</option>
          <option value="drawbot">Drawbot</option>
          <option value="about">About</option>
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
        <section className="about-section" onClick={() => setSwag(!swag)}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>About Me</h1>
            <img 
              src={swag ? meImagSwag : meImage} 
              alt="Nishanth Alladi" 
              style={{ 
                width: '200px', 
                objectFit: 'cover', 
                borderRadius: '12px', 
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)', 
                cursor: 'pointer', 
                transition: 'transform 0.3s ease',
                marginBottom: '1rem'
              }}
            />
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                fontSize: '1rem',
                color: '#bfa128',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                border: '1px solid #bfa128',
                borderRadius: '6px',
                transition: 'background 0.3s ease, color 0.3s ease'
              }}
              onMouseOver={e => {
                e.target.style.background = '#bfa128';
                e.target.style.color = '#fff';
              }}
              onMouseOut={e => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#bfa128';
              }}
            >
              Resume
            </a>
          </div>
        </section>
      )}

      {page === 'drawbot' && (
        <section>
          <h1>Drawbot</h1>
          <p>The Chess robot that never loses...but also never wins!</p>
          <DrawbotBoard />
        </section>
      )}

      {/* {page === 'contact' && (
        <section>
          <h2>Contact</h2>
          <p>nishanthalladi01@gmail.com</p>
        </section>
      )} */}

      {/* <div style={{ height: '10rem' }} /> */}
      {/* <P5Wrapper sketch={DragonCurve} /> */}

      {/* <footer>
        <p>&copy; {new Date().getFullYear()} Nishanth Alladi</p>
      </footer> */}
    </div>
  )
}

export default App