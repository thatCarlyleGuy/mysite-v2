import React from 'react';
import useCanvas from './useCanvas';

const Canvas = (props) => {
  const { draw, options, ...rest } = props;
  const { context, defaultData, ...moreConfig } = options;
  const canvasRef = useCanvas(draw, { context, defaultData });

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
