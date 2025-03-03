
import { disableButton } from './helpers/common';

const sliderWrapper = document.querySelector('.players__wrapper');
const playerItems = document.querySelectorAll('.players__item');
const playersList = document.querySelector('.players__list');
const nextButton = document.querySelector('.players__button--next');
const prevButton = document.querySelector('.players__button--prev');

const getItemWidth = () => {
  const item = document.querySelector('.players__item');
  const gap = getComputedStyle(playersList).getPropertyValue('gap');

  return item.getBoundingClientRect().width + parseFloat(gap);
};

const createState = () => {
  const totalItems = Math.round(playerItems.length / 2);

  return {
    itemWidth: getItemWidth(),
    totalItems: totalItems,
    itemsLeft: totalItems,
  };
};

let state = createState();

const displayedItems = Math.round(sliderWrapper.getBoundingClientRect().width / state.itemWidth);

const scroll = () => {
  const offset = state.itemWidth * (state.totalItems - state.itemsLeft);
  playersList.style.transform = `translateX(-${offset}px)`;

  disableButton(nextButton, false);
  disableButton(prevButton, false);

  if (state.itemsLeft === state.totalItems) {
    disableButton(prevButton, true);
  } else if (state.itemsLeft + state.totalItems !== displayedItems + 1) {
    disableButton(nextButton, true);
  }
};

prevButton.addEventListener('click', () => {
  if (state.itemsLeft < state.totalItems) {
    state.itemsLeft += 1;
    scroll();
  }
});

nextButton.addEventListener('click', () => {
  if (state.itemsLeft + state.totalItems !== displayedItems) {
    state.itemsLeft -= 1;
    scroll();
  }
});
