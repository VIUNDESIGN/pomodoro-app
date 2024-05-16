import { useState, useEffect } from 'react';
// import timeFunctions from './utils/time_functions.jsx'
import favicon from './favicon.ico';
import alarm from './alarm.mp3';
import './App.css';

function Button({ id, className, text, textTogle, onClick, isTogle, ariaLabel }) {
  return (
    <button id={id} className={`btn ${className}`} onClick={onClick} aria-pressed={isTogle}
      aria-label={ariaLabel || text}>
      {textTogle && isTogle ? textTogle : text}
    </button>
  );
}

// function PopUp({
//   id = 'popUp',
//   className = 'popUp',
//   startTime,
//   endTime,
//   elapsedTime,
// }) {
//   const visibility = 'hidden';
//   return (
//     <div>
//       ✅ Pomodoro completed !<br />
//       <br />
//       Start: {startTime ? startTime : 'unknown'}
//       <br />
//       End: {endTime ? endTime : 'unknown'}
//       <br />
//       <br />
//       Elapsed: {elapsedTime ? elapsedTime : 'unknown'}
//       <button id="closePopupBtn" class="btn" text="Close" />
//     </div>
//   );
// }

function App() {
  const [darkMode, setDarkMode] = useState((darkMode) => {
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
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            setIsRunning(false);
            setEndTime(new Date().toLocaleTimeString());
            setShowPopup(true);
            if (!isMuted) {
              const alarmSound = document.getElementById('alarmSound');
              if (alarmSound) {
                alarmSound.play();
              }
            }
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isMuted]);

  const startPauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      if (timer === 0) {
        setTimer(25 * 60);
      }
      setIsRunning(true);
      if (!startTime) {
        setStartTime(new Date().toLocaleTimeString());
      }
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(25 * 60);
    setStartTime(null);
    setEndTime(null);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

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
          text="🔈"
          textTogle="🔊"
          onClick={toggleMute}
          isTogle={!isMuted}
          ariaLabel={isMuted ? "Unmute sound" : "Mute sound"}

        />
        <Button
          id="toggleModeBtn"
          className="btn"
          text="🌙"
          textTogle="☀️"
          onClick={toggleDarkMode}
          isTogle={!darkMode}
          ariaLabel={darkMode ? "Switch to day mode" : "Switch to night mode"}
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
          text="▶️ Start"
          textTogle="⏸️ Pause"
          onClick={startPauseTimer}
          isTogle={isRunning}
          ariaLabel={isRunning ? "Pause timer" : "Start timer"}
        />
        <Button
          id="ResetBtn"
          className="btn"
          text="🔄 Reset"
          onClick={resetTimer}
          ariaLabel="Reset timer"
        />
        <Button
          id="+Btn"
          className="btn"
          text="➕"
          onClick={() => setTimer((timer) => timer + 60)}
          ariaLabel="Increase timer by 1 minute"
        />
        <Button
          id="-Btn"
          className="btn"
          text="➖"
          onClick={() => setTimer((timer) => timer - 60)}
          ariaLabel="Decrease timer by 1 minute"
        />
      </div>
      {showPopup && (
        <div className="popup show">
          <div id="popupContent">
            ✅ Pomodoro completed !<br />
            <br />
            Start: {startTime ? startTime : 'unknown'}
            <br />
            End: {endTime ? endTime : 'unknown'}
            <br />
            <br />
            Elapsed: {startTime && endTime ? timerElapsed(startTime, endTime) : 'unknown'}
            <div className="popup-button"><button id="closePopupBtn" className="btn" onClick={closePopup} aria-label="Close popup">Close</button></div>
          </div>
        </div>
      )}
    </>
  );

}

const timerElapsed = (start, end) => {
  const startTime = new Date(`1970-01-01T${start}Z`);
  const endTime = new Date(`1970-01-01T${end}Z`);
  const diffMs = endTime - startTime;
  const diffMins = Math.floor(diffMs / 60000);
  const diffSecs = Math.floor((diffMs % 60000) / 1000);
  return `${diffMins} min ${diffSecs} sec`;
};

export default App;
