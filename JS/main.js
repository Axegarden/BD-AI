let isWriting = false;
const submitButton = document.getElementById('submit');
const outputLabel = document.getElementById('output');
const inputLabel = document.getElementById('input');
const musicPaths = [
    './music/fortniteBoogie.mp3',
    './music/bara-bara-bere-bere.mp3',
    './music/aliAintro.mp3',
    './music/marioKart.mp3',
    './music/ncs1.mp3',
    './music/ratDance.mp3',
    './music/sigmaBoy.mp3',
    './music/tutorialMusic.mp3'
];
const gifPaths = [
    './gifs/BD1.gif',
    './gifs/BD2.gif',
    './gifs/BD3.gif',
    './gifs/BD4.gif',
    './gifs/BD5.gif',
    './gifs/BD6.gif',
    './gifs/BD7.gif',
    './gifs/BD8.gif',
    './gifs/BD9.gif',
    './gifs/BD10.gif',
    './gifs/BD11.gif',

];
const responseOptions = [
    'Good question. Here let me break it down for you.',
    'I understand why you would be confused. Let me break it down for you.',
    'I can see why that would be confusing. Here let me break it down for you.',
    'Here let me break it down for you.',
    'I understand why you would be confused. Let me break it down for you.',
    'That is a verry good question. I will now break it down for you.',
    'I wanna boogie!!!.',
    'Sorry. I cant answer that. But i can breakdance!!!.',
    'What a wonderful question. I will now break it down for you.',
    'Let me break it down for you.',
    'I will now break it down for you.',
    'Hmmmm great question. let me break it down so you can understand.',
    'Let me break it down so you can understand it better.',
    'I see. Perhaps this will help you understand.',
    'Great question. Maby this will clear things up for you.',
    'Good question. Perhaps this will make it more understandable.',
    '........... I dont know how to answer that so i will just break dance instead.',
    'It is actually a very simple answer. Let me break it down for you.',
    'There is actually quite a simple solution to this. Let me break it down for you.',
    'Let me simplify this for you. Here’s the breakdown.',
    'Oh, I love this question! Let me break it down for you.',
    'This might seem tricky, but I’ll break it down so it is easier to understand.',
    'Interesting question! Let me explain it in the only way that makes sense.',
    'Let me unravel this mystery for you.',
    'I’ve got this! Let me break it down for you.',
    'This is a fun one! Let me explain it in the only way i know.',
    'Let me decode this for you in the most stylish way possible.',
    'Ah, a classic question! Let me break it down for you.',
    'This deserves a proper explanation. I will now break it down.',
    'Let me make this crystal clear for you.',
    'This is a great question! Let me show you the moves.',
    'This might seem complex, but I’ll make it easy to understand using this method.',
    'Let me break it down in a way that’s easy to grasp.',
    'This is a good one! Let me break it down.',
    'Let me make this as straightforward as possible.',
    'Let me guide you through this with a clear explanation.',
    'This diserves a proper explanation.',
];

//listens for button press
submitButton.addEventListener('click', () => main());
//listens for enter key press
addEventListener('keydown', (event) => {
    if(event.key === 'Enter') main();
});

//ANCHOR - keyboard change
inputLabel.addEventListener('focus', () => {
    document.body.classList.add('keyboard-active');
});

inputLabel.addEventListener('blur', () => {
    document.body.classList.remove('keyboard-active');
});
//

function main(){
    if(!isWriting && inputLabel.value != ''){ // Use .value to check the input field
        isWriting = true;
        outputLabel.textContent = '';//clears the output label
        if(Math.floor(Math.random()*20)== 1){//randomly decides if the question was too difficult to answer
            tooDifficult();
        }
        else{
            breakItDown();
        }
    }
    else{
        alert('Please enter a question');
        return;
    }
}

//breaks it down
function breakItDown() {
    const text = responseOptions[Math.floor(Math.random() * responseOptions.length)];

    typeWriter(text, 80, true, false);
}

//if the question was too difficult to answer
function tooDifficult() {
    const text = '  Sorry, it was too difficult to explain. I will now kill myself  ';

    typeWriter(text, 80, false, true);
}

//writes like a typewriter
function typeWriter(text, speed, playGif = false, soduko = false, index = 0) {
    if (index < text.length) {//writes the text to the output label like a typewriter
        outputLabel.textContent += text.charAt(index);
        setTimeout(() => typeWriter(text, speed, playGif, soduko, index + 1), speed);
    }
    if(index === text.length && playGif){//displays a random gif after the text is done typing
        displayRandomGif();
        isWriting = false;
    }
    if(index === text.length && soduko){//if the question was too difficult to answer
        displaySoduko();
        isWriting = false;
    }
}

//displays a gif of kermit the frog commiting soduko
function displaySoduko() {
    const gifElement = document.createElement('img');
    gifElement.src = './gifs/kermitCommitingDie.gif';
    gifElement.style.position = 'fixed';
    gifElement.style.top = '0';
    gifElement.style.left = '0';
    gifElement.style.width = '100vw';
    gifElement.style.height = '100vh';
    gifElement.style.objectFit = 'cover';
    gifElement.style.zIndex = '9999';
    document.body.appendChild(gifElement);
    new Audio('./music/sad.mp3').play();

    //Closes tab after a few seconds
    setTimeout(() => {
        window.close();
    }, 3500);
}

//displays a random gif
function displayRandomGif(){
    //gets a random gif from the gifPaths array
    const randomIndex = Math.floor(Math.random() * gifPaths.length);
    const randomGif = gifPaths[randomIndex];

    //displays the gif
    const gifElement = document.createElement('img');
    gifElement.src = randomGif;
    gifElement.style.position = 'fixed';
    gifElement.style.top = '0';
    gifElement.style.left = '0';
    gifElement.style.width = '100vw';
    gifElement.style.height = '100vh';
    gifElement.style.objectFit = 'cover';
    gifElement.style.zIndex = '9999';
    document.body.appendChild(gifElement);

    playRandomMusic(5000); // Ensure music always plays when a GIF is displayed

    //Removes the gif after a few seconds
    setTimeout(() => {
        document.body.removeChild(gifElement);
    }, 5000);
}

// Plays a random music track for a specified duration
function playRandomMusic(duration) {
    const randomIndex = Math.floor(Math.random() * musicPaths.length);
    const randomMusic = musicPaths[randomIndex];
    const audio = new Audio(randomMusic);
    audio.play();

    // Stops the music after the specified duration
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, duration);
}