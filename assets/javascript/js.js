const results = [];

const screenWidth = document.querySelector("body").clientWidth;
const content = document.querySelector(".content");
const closeModal = document.querySelector(".modal__btn");
const modal = document.querySelector(".modal");
const filterInput = document.querySelector(".navbar__filter");
let characters;

async function getCharacters() {
  let url = "https://swapi.dev/api/people/";

  do {
    const response = await fetch(url);
    const data = await response.json();
    url = data.next;
    results.push(...data.results);
  } while (url);
  drawCharacters();
}

function drawCharacters() {
  for (let i = 0; i < results.length; i++) {
    content.innerHTML += `<div class="content__character" id="character-${i}">
        <h2 class="content__character-name">${results[i].name}</h2>
    </div>
    `;
  }
  content.addEventListener("click", function (e) {
    if (e.target && e.target.matches(".content__character")) {
      const clickedCharacter = e.target.firstElementChild.innerText;
      console.log(clickedCharacter);
      drawModal(clickedCharacter);
    } else if (e.target && e.target.matches(".content__character-name")) {
      const clickedCharacter = e.target.innerText;
      console.log(clickedCharacter);
      drawModal(clickedCharacter);
    }
  });
  characters = document.querySelectorAll(".content__character");
}

function drawModal(charName) {
  const name = document.querySelector(".modal__char-name");
  const height = document.querySelector("#height");
  const mass = document.querySelector("#mass");
  const hair = document.querySelector("#hair");
  const skin = document.querySelector("#skin");
  const eye = document.querySelector("#eye");
  const gender = document.querySelector("#gender");

  for (let i = 0; i < results.length; i++) {
    if (results[i].name == charName) {
      name.innerText = results[i].name;
      height.innerText = results[i].height;
      mass.innerText = results[i].mass;
      hair.innerText = results[i].hair_color;
      skin.innerText = results[i].skin_color;
      eye.innerText = results[i].eye_color;
      gender.innerText = results[i].gender;
    }
  }

  if (screenWidth <= 700) {
    content.style.display = "none";
  }

  const modal = document.querySelector(".modal");
  modal.style.display = "flex";
}

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
  if (screenWidth <= 700) {
    content.style.display = "flex";
  } else {
    content.style.display = "grid";
  }
});

filterInput.addEventListener("keyup", function () {
  console.log(filterInput.value);
  let searchWord = filterInput.value;
  filter(searchWord);
});

function filter(word) {
  if (word) {
    for (let i = 0; i < characters.length; i++) {
      if (
        !characters[i].firstElementChild.innerText
          .toLowerCase()
          .includes(word.toLowerCase())
      ) {
        characters[i].style.display = "none";
      } else {
        characters[i].style.display = "flex";
      }
    }
  } else {
    for (let i = 0; i < characters.length; i++) {
      characters[i].style.display = "flex";
    }
  }
}

getCharacters();
