'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/utils/tailwind/cn';
import Text from '../ui/Text';

interface TypingCarouselProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
  className?: string;
}

const TypingCarousel = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDelay = 2000,
  className,
}: TypingCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[index];
    let timeout: NodeJS.Timeout;

    if (!deleting && subIndex < currentText.length) {
      timeout = setTimeout(() => {
        setSubIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (deleting && subIndex > 0) {
      timeout = setTimeout(() => {
        setSubIndex((prev) => prev - 1);
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        if (!deleting) {
          setDeleting(true);
        } else {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }, pauseDelay);
    }

    return () => clearTimeout(timeout);
  }, [
    texts,
    index,
    subIndex,
    deleting,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
  ]);

  return (
    <div className="flex items-center justify-center mb-4 min-h-[2.5rem]">
      <Text
        className={cn(
          'text-xl lg:text-2xl text-custom-black font-rubik font-extrabold text-center',
          className,
        )}
      >
        {texts[index].substring(0, subIndex)}
      </Text>
    </div>
  );
};

export default TypingCarousel;
