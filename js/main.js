document.addEventListener('DOMContentLoaded', () => {
    const dropzone = document.getElementById('dropzoneContainer');
    const pausePlayButton = document.getElementById('pausePlayButton');
    let audioElements = [];

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (eventName.includes('enter') || eventName.includes('over')) ? highlight : unhighlight, false);
    });

    dropzone.addEventListener("drop", handleDrop);

    document.querySelectorAll(".audio-item").forEach(audioItem => {
        audioItem.addEventListener("dragstart", handleDragStart);
    });

    pausePlayButton.addEventListener("click", toggleAudioPlayback);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropzone.classList.add('highlight');
        console.log("highlighted");
    }

    function unhighlight() {
        dropzone.classList.remove('highlight');
        console.log("unhighlighted");
    }

    function handleDrop(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("text/plain");
        var audioSrc = data.trim();
        if (audioSrc) {
            playAudio(audioSrc);
        }
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("text/plain", this.alt);
    }

    function playAudio(audioSrc) {
        var audio = new Audio(audioSrc);
        audio.loop = true;
        audio.play();
        audioElements.push(audio);
        updatePausePlayButton(true);
    }

    function toggleAudioPlayback() {
        if (audioElements.length === 0) return;

        if (audioElements[0].paused) {
            audioElements.forEach(audio => audio.play());
            updatePausePlayButton(true);
        } else {
            audioElements.forEach(audio => audio.pause());
            updatePausePlayButton(false);
        }
    }

    function updatePausePlayButton(isPlaying) {
        if (isPlaying) {
            pausePlayButton.innerHTML = '<img src="images/pause_icon.png" alt="Pause All" class="pause-play-buttons">';
        } else {
            pausePlayButton.innerHTML = '<img src="images/play_icon.png" alt="Play All" class="pause-play-buttons">';
        }
    }
});