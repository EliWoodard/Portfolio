document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("move-down-button");
    button.addEventListener("click", function(event) {
        event.preventDefault();
        
        var aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    var video = document.getElementById('myVideo');
    if (video) {
        video.playbackRate = 2;
    }
});
