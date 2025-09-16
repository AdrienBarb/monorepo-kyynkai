'use client';

import { CircularProgress } from '@mui/material';
import { CSSProperties, FC } from 'react';

interface LoaderProps {
  style?: CSSProperties;
  containerStyle?: CSSProperties;
  size?: number;
}

const Loader: FC<LoaderProps> = ({ style, containerStyle, size = 32 }) => {
  return (
    <div
      className="w-full flex items-center justify-center relative"
      style={containerStyle}
    >
      <CircularProgress
        sx={{ color: 'rgb(28, 19, 30)', ...style }}
        size={size}
      />
    </div>
  );
};

export default Loader;
