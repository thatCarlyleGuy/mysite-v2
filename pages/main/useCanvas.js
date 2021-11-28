import { useRef, useEffect, useState } from 'react';

const useCanvas = (draw, options = {}) => {
  const canvasRef = useRef(null);
  // const [state, setState] = useState(options.defaultData);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext(options?.context || '2d');
    let frameCount = 0;
    let state = options.defaultData;
    const setState = (newState) => (state = newState);
    let animationFrameId;
    const render = () => {
      frameCount++;
      draw(context, frameCount, state, setState);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);
  return canvasRef;
};
export default useCanvas;
