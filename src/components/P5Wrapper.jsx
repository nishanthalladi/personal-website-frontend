// This component wraps a p5.js sketch in a React component.
import { useRef, useEffect } from 'react';
import p5 from 'p5';

export default function P5Wrapper({ sketch }) {
  const containerRef = useRef();

  useEffect(() => {
    const instance = new p5(sketch, containerRef.current);
    return () => instance.remove(); // Clean up on unmount
  }, [sketch]);

  return <div ref={containerRef} />;
}