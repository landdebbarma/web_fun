import { useState, useEffect, useRef } from 'react';

export function useSmoothStreaming(
  targetText: string, 
  speed: number = 10, 
  isStreamActive: boolean = true
) {
  const [displayedText, setDisplayedText] = useState(targetText || "");
  // Initialize index to target length if it exists provided we aren't meant to stream from scratch on mount
  // But usually we start empty. If we assume we want to show what's there immediately on mount unless streaming...
  const index = useRef(0);
  
  // Use a ref to keep track of the target to avoid closure staleness in interval
  const targetRef = useRef(targetText);
  useEffect(() => {
    targetRef.current = targetText;
  }, [targetText]);

  useEffect(() => {
    if (!isStreamActive) {
      setDisplayedText(targetRef.current);
      index.current = targetRef.current.length;
      return;
    }

    const intervalId = setInterval(() => {
      if (index.current < targetRef.current.length) {
        const backlog = targetRef.current.length - index.current;
        const step = Math.max(1, Math.ceil(backlog / 50)); 
        
        const nextIndex = Math.min(index.current + step, targetRef.current.length);
        const nextSlice = targetRef.current.slice(0, nextIndex);
        
        setDisplayedText(nextSlice);
        index.current = nextIndex;
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [speed, isStreamActive]); // Removing targetText from deps to prevent interval reset on every character

  return displayedText;
}
