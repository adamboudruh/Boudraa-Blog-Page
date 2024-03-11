import { displayModal } from "./modal.js";

const replyButtons = document.querySelectorAll('.reply-button');
replyButtons.forEach(button => button.addEventListener('click', (event) => showCommentForm(event)));

let newCommentContainer; let newButtons; let previouslyClicked = false;

const showCommentForm = (event) => {
    event.preventDefault();
    // replyButtons.forEach(button => button.removeEventListener('click', showCommentForm)); 
    if (previouslyClicked) {
        newCommentContainer.classList.add('d-none');
        newButtons.classList.remove('d-none');
        newCommentContainer.querySelector('textarea').setAttribute('id', '');
    }

    newButtons = event.target.closest('.body-buttons');
    newButtons.classList.add('d-none');

    let parentDiv = event.target.closest('.full-post');
    newCommentContainer = parentDiv.querySelector('.new-comment-container');
    newCommentContainer.classList.remove('d-none');
    newCommentContainer.querySelector('textarea').setAttribute('id', 'comment-content');

    previouslyClicked = true;
}

const viewButtons = document.querySelectorAll('.view-replies');
viewButtons.forEach(button => button.addEventListener('click', (event) => showReplies(event)));

const showReplies = (event) => {
    event.preventDefault();
    let parentDiv = event.target.closest('.blog-comment-container');
    parentDiv.querySelector('.comments-container').classList.toggle('d-none');
}

const postButtons = document.querySelectorAll('.post-comment');
postButtons.forEach(button => button.addEventListener('click', (event) => handleCommentPost(event)));

const handleCommentPost = async (event) => {
    event.preventDefault();
    const textarea = event.target.closest('.new-comment-container').querySelector('textarea');
    const commentBody = textarea.value.trim();
    const postID = event.target.closest('.full-post').dataset.id;
    if (commentBody) {
        console.log(commentBody);
        const response = await fetch('/api/comment/new', {
            method: 'POST', // Use the POST method
            body: JSON.stringify({ commentBody, postID }), // Convert data to JSON format
            headers: { 'Content-Type': 'application/json' }, // Set request headers
        });
        if (response.ok) {
            console.info("Post added!");
            document.location.reload();
        }
        else if (response.status === 401) {
            displayModal('r');
        }
    } else alert("Please enter a comment before submitting")
}