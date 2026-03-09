import './style.css'

const rightBtn = document.querySelector('.swipe-right');
const leftBtn = document.querySelector('.swipe-left');
const cards = document.querySelectorAll('.cards img');
const song = document.querySelector('.song');
const darken = document.getElementById('darken');
const message = document.getElementById('message');
const flower = document.getElementById('flower');

// Autoplay Music
// This will work on mobile because it's inside a click event
window.addEventListener('click', () => {
    song.play(); 
}, { once: true });

// Button Press
let i = 0;
cards[0].classList.add('slide-in');
cards[0].style.display = 'block';
rightBtn.addEventListener('click', () => {
    // Remove Current Card
    cards[i].classList.remove('slide-in', 'slide-out');
    cards[i].style.display = 'none';

    i++;
    if (i >= cards.length) {
        rightBtn.style.display = 'none';
        leftBtn.style.display = 'none';
        // Queue Darken
        darken.classList.add('active');
        message.classList.add('active1');
        flower.classList.add('active2');
        return;
    }

    // Add Current Card
    cards[i].classList.add('slide-in');
    cards[i].style.display = 'block';
})

leftBtn.addEventListener('click', () => {
    if (i <= 0) {
        return;
    }

    // Remove Current Card
    cards[i].classList.remove('slide-in', 'slide-out');
    cards[i].style.display = 'none';

    i--;
    // Go Back to Previous Card
    cards[i].classList.add('slide-out');
    cards[i].style.display = 'block';
})