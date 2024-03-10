import { displayModal } from "./modal.js";

document.querySelector('#add-post').addEventListener('click', function () {
    console.log("Displaying post form...");
    document.querySelector('.new-post-container').classList.remove('d-none');
    document.querySelector('#add-post').classList.add('d-none');
});

document.querySelector('#cancel-post').addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Hiding post form...");
    document.querySelector('.new-post-container').classList.add('d-none');
    document.querySelector('#add-post').classList.remove('d-none');
});

let createPost;
document.querySelector('#create-post').addEventListener('click', createPost = async (event) => {
    event.preventDefault();
    console.log("Adding post...");
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-body').value.trim();
    if (title && content) {
        console.log(`Creating blog post titled: \n\n${title}\n\nwith body:\n\n${content}`);
        const response = await fetch('/api/blog/create-post', {
            method: 'POST', // Use the POST method
            body: JSON.stringify({ title, content }), // Convert data to JSON format
            headers: { 'Content-Type': 'application/json' }, // Set request headers
        });
        // if response status is 401, make a modal pop up in the center of the screen asking them to relogin with a link to the log in screen
        if (response.status === 401) {
            displayModal();
        }
    }
    else alert('Please enter a title and body before submitting');
});