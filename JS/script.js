'use strict';

{
  const timer1 = document.getElementById('timer1');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset1 = document.getElementById('reset1');


  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2,'0');
    const s = String(d.getSeconds()).padStart(2,'0');
    const ms = String(d.getMilliseconds()).padStart(3,'0');
    timer1.textContent = `${m}:${s}.${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  function setButtonStartInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset1.classList.add('inactive');
  }
  function setButtonStartRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset1.classList.add('inactive');
  }
  function setButtonStartStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset1.classList.remove('inactive');
  }

  setButtonStartInitial()

  start.addEventListener('click', () => {
    if(start.classList.contains('inactive') === true) {
      return;
    }
    setButtonStartRunning()
    startTime = Date.now(); //基準となる日時を取得
    countUp();
  });

  stop.addEventListener('click', () => {
    if(stop.classList.contains('inactive') === true) {
      return;
    }
    setButtonStartStopped()
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime; //stopを押した時間を保持
  });

  reset1.addEventListener('click', () => {
    if(reset1.classList.contains('inactive') === true) {
      return;
    }
    setButtonStartInitial()
    timer1.textContent = '00:00.000'
    elapsedTime = 0;
  });
}