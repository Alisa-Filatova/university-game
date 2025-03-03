import './style.css';
import { playersData } from './data/players-data';

const ratesButton = document.querySelector('.rates-button');
const ratesPopup = document.querySelector('.rates-popup');
const overlay = document.querySelector('.overlay');
const dialogCloseButton = document.querySelector('.rates-popup__close-button');
const ratingTable = document.querySelector('.rates-popup__table-content');
const playersList = document.querySelector('.players__list');
const sortedPlayersData = playersData.rating.sort((a, b) => b.points - a.points);

const players = playersData.rating.map(({img}) => (
  `<li class="players__item">
      <button class="add-button" type="button"></button>
      <img
        src="${img}"
        width="28"
        height="38"
        alt=""
        onerror="this.src = 'src/assets/user.png';"
      >
   </li>`
));

playersList.innerHTML = players.join('');

const ratesList = sortedPlayersData.map(({
  id,
  name,
  lastName,
  points,
  img,
}, index) => (
  `<tr class="table__row player" data-id="${id}">
    <td class="table__cell player__place">${index + 1}</td>
    <td class="table__cell player__avatar">
      <img
        class="player__img"
        src="${img}"
        onerror="this.src = 'src/assets/user.png';"
        alt=""
      />
    </td>
    <td class="table__cell player__name">
      <span>${name} ${lastName}</span>
    </td>
    <td class="table__cell player__points">
      <span>${points}</span>
    </td>
  </tr>`
));

ratingTable.innerHTML = ratesList.join('');

playersData.friends.forEach(({ id }) => {
  const friend = document.querySelector(`[data-id="${id}"]`);

  if (friend) {
    friend.classList.add('friend');
  }
});

ratesButton.addEventListener('click', (event) => {
  event.preventDefault();
  ratesPopup.classList.add('rates-popup--opened');
  overlay.classList.add('overlay--visible');
});

dialogCloseButton.addEventListener('click', (event) => {
  event.preventDefault();
  ratesPopup.classList.remove('rates-popup--opened');
  overlay.classList.remove('overlay--visible');
});

overlay.addEventListener('click', () => {
  ratesPopup.classList.remove('rates-popup--opened');
  overlay.classList.remove('overlay--visible');
});
