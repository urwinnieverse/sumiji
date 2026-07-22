let kanjiList = [];
let currentIndex = 0;

const kanjiCard = document.getElementById('kanji-card');
const cardInner = document.querySelector('.card-inner');

const kanjiText = document.getElementById('Kanji');
const meaningText = document.getElementById('english-meaning');
const hiraganaText = document.getElementById('hiragana');
const nLevelFront = document.getElementById('nlevel');
const nLevelBack = document.getElementById('nlevel-back');
const nStarsText = document.getElementById('nstars');

const shuffleBtn = document.getElementById('shuffle'); 

async function loadKanjiDeck() {
  try {
    const response = await fetch('jp.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    kanjiList = await response.json();
    displayCard(currentIndex);

  } catch (error) {
    console.error("Could not load jp.json:", error);
  }
}

function displayCard(index) {
  if (kanjiList.length === 0) return;

  const card = kanjiList[index];

  if (kanjiText) kanjiText.textContent = card.original;
  if (meaningText) meaningText.textContent = card.english;
  if (hiraganaText) hiraganaText.textContent = card.furigana;
  
  const levelStr = card.jlptLevel || card["jlpt level"] || "N5";
  if (nLevelFront) nLevelFront.textContent = levelStr;
  if (nLevelBack) nLevelBack.textContent = `(${levelStr}):`;

  if (nStarsText) nStarsText.textContent = getStarRating(levelStr);
}

function getStarRating(level) {
  switch (level) {
    case 'N5': return '★☆☆☆☆';
    case 'N4': return '★★☆☆☆';
    case 'N3': return '★★★☆☆';
    case 'N2': return '★★★★☆';
    case 'N1': return '★★★★★';
    default:   return '☆☆☆☆☆';
  }
}

if (kanjiCard) {
  kanjiCard.addEventListener('click', () => {
    kanjiCard.classList.toggle('is-flipped');
  });
}

if (cardInner) {
  cardInner.addEventListener('click', () => {
    cardInner.classList.toggle('is-flipped');
  });
}

if (shuffleBtn) {
  shuffleBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (kanjiList.length === 0) return;

    if (kanjiCard) kanjiCard.classList.remove('is-flipped');
    if (cardInner) cardInner.classList.remove('is-flipped');

    // Pick a random index from 0 to kanjiList.length - 1
    currentIndex = Math.floor(Math.random() * kanjiList.length);

    displayCard(currentIndex);
  });
}

loadKanjiDeck();