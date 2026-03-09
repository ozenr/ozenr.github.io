import './style.css'

const rightBtn = document.querySelector('.swipe-right');
const leftBtn = document.querySelector('.swipe-left');
const cards = document.querySelectorAll('.cards img');

// Button Press
let i = 0;
cards[0].classList.add('slide-in');

rightBtn.addEventListener('click', () => {
    // Remove Current Card
    cards[i].classList.remove('slide-in', 'slide-out');
    cards[i].style.display = 'none';

    i++;
    if (i >= cards.length) {
        rightBtn.style.display = 'none';
        leftBtn.style.display = 'none';
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