import React, { useRef, useState } from 'react'
import ResultsModal from './ResultsModal';
import {type ResultsModalHandleType } from "./ResultsModal";
type TimeChallengeType = {
  targetTime: number;
  title: string;
}

const TimeChallenge: React.FC<TimeChallengeType> = ({ targetTime, title }) => {
  const [remainingTime, setRemainingTime] = useState(targetTime * 1000);
  const timer = useRef<number | undefined>();
  const dialog = useRef<ResultsModalHandleType | null>(null);
  const isTimerActive = remainingTime > 0 && remainingTime < targetTime * 1000;
  

  if (remainingTime <= 0) {
    clearInterval(timer.current);
    if ( dialog.current) dialog.current.open();
   
}

  const handleStart = () => {
    timer.current = setInterval(() => {
      setRemainingTime(prevTimeRemaining => prevTimeRemaining - 10);
    }, 10)
  }

  const handleStop = () => {
    clearInterval(timer.current)
    if ( dialog.current) dialog.current.open();
  }

  const handleReset = () => {
    setRemainingTime(targetTime * 1000);
  }
  
  return (
    <>
      <ResultsModal ref={dialog} targetTime={targetTime} remainingTime={remainingTime} onReset={handleReset}/>
      <section className="challenge">
        <h2>{title}</h2>
        <p>
          {targetTime} second {targetTime > 1 ? '`s' : ''}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStop : handleStart}>
            {isTimerActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={isTimerActive ? 'active' : undefined}>
          {isTimerActive ? 'ChallengeTime is running' : 'Timer Inactive'}
        </p>
      </section>
    </>
  )
}

export default TimeChallenge;
