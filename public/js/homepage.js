import { displayModal } from "./modal.js";

const replyButtons = document.querySelectorAll('.reply-button');
replyButtons.forEach(button => button.addEventListener('click', (event) => showCommentForm(event)));

let newCommentContainer; let newButtons; 
let previouslyClicked = false; //the first time a comment form is opened, there's no previous form to close, so this variable lets us skip that step to avoid errors

const showCommentForm = (event) => {
    event.preventDefault();
    if (previouslyClicked) { // ensures only one form is open at a time
        newCommentContainer.classList.add('d-none');
        newButtons.classList.remove('d-none');
        newCommentContainer.querySelector('textarea').setAttribute('id', ''); // Hides the previously opened comment form and removes its id, which signifies whichever comment form is open
    }

    newButtons = event.target.closest('.body-buttons');
    newButtons.classList.add('d-none');

    let parentDiv = event.target.closest('.full-post');
    newCommentContainer = parentDiv.querySelector('.new-comment-container');
    newCommentContainer.classList.remove('d-none');
    newCommentContainer.querySelector('textarea').setAttribute('id', 'comment-content'); // This id allows us to pinpoint which textarea form to select from

    previouslyClicked = true;
}

const viewButtons = document.querySelectorAll('.view-replies');
viewButtons.forEach(button => button.addEventListener('click', (event) => showReplies(event)));

const showReplies = (event) => {
    event.preventDefault();
    let parentDiv = event.target.closest('.blog-comment-container');
    parentDiv.querySelector('.comments-container').classList.toggle('d-none'); // Toggle lets us just have one function for hiding and displaying a posts comments
}

const postButtons = document.querySelectorAll('.post-comment');
postButtons.forEach(button => button.addEventListener('click', (event) => handleCommentPost(event)));

const handleCommentPost = async (event) => {
    event.preventDefault();
    const textarea = event.target.closest('.new-comment-container').querySelector('textarea');
    const commentBody = textarea.value;
    const postID = event.target.closest('.full-post').dataset.id; // Pulls the post id from the data field of its parent container
    if (commentBody) {
        console.log(commentBody);
        const response = await fetch('/api/comment/new', {
            method: 'POST', // Use the POST method
            body: JSON.stringify({ commentBody, postID }), // Convert data to JSON format
            headers: { 'Content-Type': 'application/json' }, // Set request headers
        });
        if (response.ok) {
            console.info("Post added!");
            document.location.reload(); // Reload displays the new comment
        }
        else if (response.status === 401) {
            displayModal('r');
        }
    } else alert("Please enter a comment before submitting");
}

const deleteButtons = document.querySelectorAll('.delete-comment');
deleteButtons.forEach(button => button.addEventListener('click', (event) => handleDeletePost(event)));

const handleDeletePost = async (event) => {
    event.preventDefault();
    const commentID = event.target.closest('.single-comment-container').dataset.id; // Pulls the comment id from the data field of its parent container
    if (commentID) {
        console.log(`Deleting comment of id: ${commentID}`);
        displayModal('d'); // displays a confirmation modal, much like the one on the dashboard, that will only allow the deletion to proceed if the user clicks yes
        document.querySelector('#confirmDel').addEventListener('click', async () => {
            const response = await fetch(`/api/comment/delete-comment/${commentID}`, {
                method: 'DELETE', // Use the POST method
                headers: { 'Content-Type': 'application/json' }, // Set request headers
            })
            if (response.ok) {
                console.info("Comment deleted!");
                document.location.reload();
            }
            else if (response.status === 401) {
                document.querySelector('#deleteModal').style.display = "none";
                displayModal('r');
            }
        });
        document.querySelector('#confirmCancel').addEventListener('click', () => {
            console.log("No clicked");
            document.querySelector('#deleteModal').style.display = "none";
        })


    }
}