let idleTimer;
const idleTimeout = 30000; // 30 seconds in milliseconds

const resetTimer = () => {
  clearTimeout(idleTimer);
  console.log("Idle timer cleared, nothing to see here...");
  idleTimer = setTimeout( async () => {
    // Make a POST request to set session variable
    alert("You have been idle too long!");
    const response = await fetch('/api/users/idle', {
      method: 'POST',
    });
    if (response.ok) {
        console.log('Session marked as idle');
    } else {
        console.error('Failed to mark session as idle');
    }
    }, idleTimeout);
}

const debounce = (cb, delay) => { //This debounce ensures that resetTimer isn't called every time something is clicked or the mouse is moved, which could be thousands of times a second
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