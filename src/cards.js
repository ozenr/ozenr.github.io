import './style.css'

const button = document.querySelector('.swipe');
const cards = document.querySelectorAll('.cards img');

// Button Press
let i = 0;
button.addEventListener('click', () => {
    console.log(i);
    console.log(cards.length);
    cards[i].style.display = 'none';
    i++;
    if (i >= cards.length) {
        button.style.display = 'none';
        return;
    }
    cards[i].style.display = 'block';
})