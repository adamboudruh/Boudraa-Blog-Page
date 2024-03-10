const displayModal = (choice) => {
    let modalID;
    if (choice === 'r') modalID = 'reloginModal';
    if (choice === 'c') modalID = 'confirmModal';
    var modal = document.getElementById(modalID);
    var closeBtn = document.getElementsByClassName('close')[0];

    modal.style.display = "block";

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

export { displayModal };