import React from 'react';
import { render } from 'react-dom';
import { useState } from 'react';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState('');
  const [timer, setTimer] = useState(null);
  const formatTime = () => {
    return (
      <div>
      <span>{(Math.floor(time / 60) < 10 ? "0" + Math.floor(time / 60) : Math.floor(time / 60))}:</span>
      <span>{(Math.floor(time % 60) < 10 ? "0" + Math.floor(time % 60) : Math.floor(time % 60))}</span>
      </div>
    )
  };
  
  const startTimer = () => {
    setStatus('work');
    setTime(1200);
    setTimer(setInterval(() => {
      setTime(time => time - 1);
    }, 1000));
  };

  const restTimer = () => {
    setStatus('rest')
    setTime(20);
    setTimer(setInterval(() => {
      setTime(time => time - 1);
    }, 1000));
  };
  
  if( time === 0 && status === 'work'){
    setStatus('rest');
    clearInterval(timer);
    restTimer();
  } else if( time === 0 && status === 'rest'){
    setStatus('work');
    clearInterval(timer);
    startTimer();
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTime('');
    setStatus('off');;
  };

  const closeApp = () => {
    window.close();
  };


  return (
    <div>
      <h1>Protect your eyes</h1>
      { status === 'off' && 
        (
          <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        )
      }
      { status === 'work' && <img src="./images/work.png"/> }
      { status === 'rest' && <img src="./images/rest.png" /> }
      { status !== 'off' && <div className="timer">{formatTime()}</div> }
      { status === 'off' &&  <button onClick={startTimer} className="btn">Start</button> }
      { status !== 'off' && <button onClick={stopTimer} className="btn">Stop</button> }
        <button onClick={closeApp} className="btn btn-close">X</button>
      </div>
  )
}

render(<App />, document.querySelector('#app'));
