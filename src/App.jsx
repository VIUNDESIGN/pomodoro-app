import { useState, useEffect } from 'react';
// import timeFunctions from './utils/time_functions.jsx'
import favicon from './favicon.ico';
import alarm from './alarm.mp3';
import './App.css';

function Button({ id, className, text, textTogle, onClick, isTogle }) {
  return (
    <button id={id} className={`btn ${className}`} onClick={onClick}>
      {textTogle && isTogle ? textTogle : text}
    </button>
  );
}

function PopUp({
  id = 'popUp',
  className = 'popUp',
  startTime,
  endTime,
  elapsedTime,
}) {
  const visibility = 'hidden';
  return (
    <div>
      ✅ Pomodoro completed !<br />
      <br />
      Start: {startTime ? startTime : 'unknown'}
      <br />
      End: {endTime ? endTime : 'unknown'}
      <br />
      <br />
      Elapsed: {elapsedTime ? elapsedTime : 'unknown'}
      <button id="closePopupBtn" class="btn" text="Close" />
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || false;
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const [isMuted, setIsMuted] = useState(false);
  const [timer, setTimer] = useState(25 * 60); // 25 minutos

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
    const alarmSound = document.getElementById('alarmSound');
    if (alarmSound) {
      alarmSound.muted = !alarmSound.muted;
    }
  };

  return (
    <>
      <img src={favicon} className="favicon" alt="favicon" />

      <audio id="alarmSound" src={alarm} type="audio/mpeg"></audio>

      <h1>Pomodoro App</h1>

      <div className="toggle-container">
        <Button
          id="toggleMuteBtn"
          className="btn"
          text="🔊 Sound"
          textTogle="🔇 Unmute"
          onClick={toggleMute}
          isTogle={!isMuted}
        />
        <Button
          id="toggleModeBtn"
          className="btn"
          text="🌙 Night Mode"
          textTogle="☀️ Day Mode"
          onClick={toggleDarkMode}
          isTogle={!darkMode}
        />
      </div>
      <div className="timer-container" id="timer">
        {Math.floor(timer / 60)
          .toString()
          .padStart(2, '0')}
        :{(timer % 60).toString().padStart(2, '0')}
      </div>
      <div class="buttons-container">
        <Button
          id="startBtn"
          className="btn"
          text="Start"
          textTogle="Pause"
          onClick={() => {}}
        />
        <Button
          id="ResetBtn"
          className="btn"
          text="Reset"
          onClick={() => setTimer(25 * 60)}
        />
        <Button
          id="+Btn"
          className="btn"
          text="+"
          onClick={() => setTimer((timer) => timer + 60)}
        />
        <Button
          id="-Btn"
          className="btn"
          text="-"
          onClick={() => setTimer((timer) => timer - 60)}
        />
      </div>
    </>
  );
}

export default App;
