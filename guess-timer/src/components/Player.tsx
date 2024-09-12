import { useState, useRef } from 'react'

const Player = () => {
  const [playerName, setPlayerName] = useState("unknown Player");
  const inputPlayer = useRef<HTMLInputElement>(null);
  
  const handleSetName = () => {
    if (inputPlayer.current) {
        setPlayerName(inputPlayer.current.value);
        inputPlayer.current.value = ''
    }
    
  }
  return (
    <section id='player'>
        <h2>Welcome {playerName}</h2>
        <p>
            <input type="text" ref={inputPlayer}/>
            <button type='button' onClick={handleSetName}>Set name</button>
        </p>
      
    </section>
  )
}

export default Player
