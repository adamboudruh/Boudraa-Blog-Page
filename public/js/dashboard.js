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

document.querySelector('#create-post').addEventListener('click', createPost = async (event) => {
    event.preventDefault();
    console.log("Adding post...");
    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();
    if (title && body) {
        console.log(`Creating blog post titled: \n\n${title}\n\nwith body:\n\n${body}`);

        // const response = await fetch('/api/users/login', {
        //     method: 'POST', // Use the POST method
        //     body: JSON.stringify({ email, password }), // Convert data to JSON format
        //     headers: { 'Content-Type': 'application/json' }, // Set request headers
        // });

    }
    else alert('Please enter a title and body before submitting');
});