const replyButtons = document.querySelectorAll('.reply-button');
replyButtons.forEach(button => button.addEventListener('click', (event) => showCommentForm(event)));

let newCommentContainer; let newButtons; let previouslyClicked = false;

function showCommentForm(event) {
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
    newCommentContainer.querySelector('textarea').setAttribute('id', 'comment-body');

    previouslyClicked = true;
}

const viewButtons = document.querySelectorAll('.view-replies');
viewButtons.forEach(button => button.addEventListener('click', (event) => showReplies(event)));

function showReplies(event) {
    event.preventDefault();
    let parentDiv = event.target.closest('.blog-comment-container');
    parentDiv.querySelector('.comments-container').classList.toggle('d-none');
}



