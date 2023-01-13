var button = document.getElementById("move-down-button");
button.addEventListener("click", function() {
   event.preventDefault();
    button.style.backgroundColor = "green";
    window.scrollTo(0, window.pageYOffset + 200);
});
