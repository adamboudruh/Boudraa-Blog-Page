import { displayModal } from "./modal.js";

document.querySelector('#add-post').addEventListener('click', function () {
    console.log("Displaying post form...");
    document.querySelector('.new-post-container').classList.remove('d-none');
    document.querySelector('#add-post').classList.add('d-none');
});

document.querySelector('#cancel-create').addEventListener('click', function (event) {
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
        if (response.ok) {
            console.info("Post added!");
            document.location.reload();
        }
        else if (response.status === 401) {
            displayModal();
        }
    }
    else alert('Please enter a title and body before submitting');
});

const handlePostClick = (event) => {
    const clickedPost = event.target.closest('.mini-post');
    const postID = clickedPost.dataset.id;
    fetch(`/api/blog/${postID}`, {
        method: 'GET', // Use the GET method
        headers: { 'Content-Type': 'application/json' }, // Set request headers
    })
        .then(response => {
            if (response.status === 401){
                displayModal();
            }
            else return response.json();
        })
        .then(data => {
            console.log(data);
            const updateFormContainer = document.createElement('div');
            updateFormContainer.classList.add('update-post-container');
            updateFormContainer.innerHTML = `
                <form class="form login-form update-post-form m-4 p-3">
                    <h4 class="form-title">Update Blog Post</h4>
                    <div class="form-group m-3">
                        <label for="update-title">Title:</label>
                        <input class="form-control" type="text" id="update-title" value="${data.title}" />
                    </div>
                    <div class="form-group m-3">
                        <label for="update-body">Body:</label>
                        <textarea class="form-control" rows="5" id="update-body">${data.body}</textarea>
                    </div>
                    <div class="form-group m-3 d-flex justify-content-between">
                        <button class="btn py-2 px-3" id="update-post">Update Post</button>
                        <button class="btn py-2 px-3" id="delete-post">Delete Post</button>
                        <button class="btn py-2 px-3" id="cancel-update">Cancel</button>
                    </div>
                </form>
            `;
            clickedPost.parentNode.replaceChild(updateFormContainer, clickedPost);

            miniPosts.forEach(post => {
                post.removeEventListener('click', handlePostClick);
            });

            document.querySelector('#cancel-update').addEventListener('click', () => document.location.reload());
            document.querySelector('#update-post').addEventListener('click', (event) =>{ event.preventDefault(); handleUpdate(data);})
            document.querySelector('#delete-post').addEventListener('click', (event) =>{ event.preventDefault(); handleDelete(data.id);})
        })
        .catch(error => {
            console.error(error);
        })
}

const handleUpdate = async (data) => {
    const newTitle = document.querySelector('#update-title').value.trim();
    const newContent = document.querySelector('#update-body').value.trim();
    const postID = data.id;

    console.log(`Updating blog post of id: ${postID}\nnew title: \n\n${newTitle}\n\nnew body:\n\n${newContent}`);

    const response = await fetch(`/api/blog/update-post/${postID}`, {
        method: 'PUT', // Use the POST method
        body: JSON.stringify({ newTitle, newContent }), // Convert data to JSON format
        headers: { 'Content-Type': 'application/json' }, // Set request headers
    });
    if (response.ok) {
        console.info("Post added!");
        document.location.reload();
    }
    else if (response.status === 401) {
        displayModal();
    }
}

const handleDelete = async (data) => {

}

const miniPosts = document.querySelectorAll('.mini-post');
miniPosts.forEach(post => post.addEventListener('click', handlePostClick));