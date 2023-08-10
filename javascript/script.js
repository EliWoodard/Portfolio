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

    addStars();
});

function addStars() {
    var starsContainer = document.getElementById('stars-container');
    for (var i = 0; i < 100; i++) {
        var star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        starsContainer.appendChild(star);
    }
}
