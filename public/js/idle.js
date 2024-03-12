let idleTimer;
const idleTimeout = 180000; // 3 minutes in milliseconds

const resetTimer = () => {
  console.log("Timer cleared");
  clearTimeout(idleTimer);
  idleTimer = setTimeout( async () => {
    // Make a POST request to set session variable
    const response = await fetch('/api/users/idle', {
      method: 'POST',
    });
    if (response.ok) {
        console.log('Session marked as idle');
        document.location.reload();
    } else {
        console.error('Failed to mark session as idle');
    }
    }, idleTimeout);
}

const debounce = (cb, delay) => { //This debounce ensures that resetTimer isn't called every time something is clicked or the mouse is moved, which could be thousands of times a second. It will only reset the timer after there's been over a second without keypresses or mouse movements
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}

// Reset the timer on user interaction (e.g., mousemove, keypress, etc.)
document.addEventListener('mousemove', debounce(resetTimer, 1000));
document.addEventListener('keypress', debounce(resetTimer, 1000));

// Initial setup
resetTimer();