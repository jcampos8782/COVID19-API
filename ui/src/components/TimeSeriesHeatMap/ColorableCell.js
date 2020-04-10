import React from 'react';

const ColorableCell = ({
   value,
   x,
   y,
   width,
   height,
   opacity,
   borderWidth,
   borderColor,
   textColor,
   style,
   onHover,
   onLeave,
   onClick,
   data,
   palette
  }) => {
    let color = palette(value);
    return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={onHover}
      onMouseMove={onHover}
      onMouseLeave={onLeave}
      onClick={e => { onClick(data, e) }}
      style={style}>
      <rect
        x={width * -0.5}
        y={height * -0.5}
        width={width}
        height={height}
        fill={color}
        fillOpacity={opacity}
        strokeWidth={borderWidth}
        stroke={color}
        strokeOpacity={opacity}/>
    </g>
    );
    };

export default ColorableCell;
