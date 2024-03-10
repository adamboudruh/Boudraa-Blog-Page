const displayModal = () => {
    var modal = document.getElementById('reloginModal');
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