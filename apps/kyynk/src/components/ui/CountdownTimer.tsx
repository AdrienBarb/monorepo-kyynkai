'use client';

import { useState, useEffect, FC } from 'react';

interface CountdownTimerProps {
  minutes: number;
  onExpire?: () => void;
  className?: string;
}

export const CountdownTimer: FC<CountdownTimerProps> = ({
  minutes,
  onExpire,
  className = '',
}) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const isUrgent = timeLeft <= 300;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-primary/70 font-karla">
        Offer expires in:
      </span>
      <span
        className={`text-lg font-bold font-rubik ${
          isUrgent ? 'text-primary animate-pulse' : 'text-primary/90'
        }`}
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};
