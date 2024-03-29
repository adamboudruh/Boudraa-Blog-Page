// Define an asynchronous function to handle the login form submission
const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the email and password values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both email and password are provided
  if (email && password) {
    // Send a POST request to the '/api/users/login' endpoint with the email and password data
    const response = await fetch('/api/users/login', {
      method: 'POST', // Use the POST method
      body: JSON.stringify({ email, password }), // Convert data to JSON format
      headers: { 'Content-Type': 'application/json' }, // Set request headers
    });

    // Check if the response is ok (status code 200-299)
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
