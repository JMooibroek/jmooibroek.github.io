var coin = new Audio('coin.mp3');
const options = document.getElementById('options');
let selectedIndex = 0;
let konamiArray = ['up','up','down','down','left','right','left','right','b','a',];
let konamiIndex = 0;

function showgbPage(id) {
  const divs = Array.from(document.querySelectorAll('#gbscreen > div'));
  divs.forEach(div => {
    div.style.display = div.id === id ? 'block' : 'none';
  });
}

function highlightOption(index) {
  let optionsArray = ['  Home', '  About', '\n  Music', '  Contact'];
  optionsArray[index] = optionsArray[index].replace(/ {2}/g, '~');
  options.textContent = optionsArray.join('\t');
}

function handleButtonClick(event) {
  const buttonId = event.target.id;
  if (buttonId === 'up') {
    selectedIndex -= 2;
  } else if (buttonId === 'down') {
    selectedIndex += 2;
  } else if (buttonId === 'left') {
    selectedIndex--;
  } else if (buttonId === 'right') {
    selectedIndex++;
  } else if (buttonId === 'a') {
    showgbPage('page' + selectedIndex);
  }
  if(konamiArray[konamiIndex] == buttonId) {
    konamiIndex++;
  } else {
    konamiIndex = 0;
  }
  if(konamiIndex == 10) {
    showgbPage('page4');
    coin.play();
  }
  selectedIndex = Math.abs(selectedIndex % 4);
  highlightOption(selectedIndex);
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

function showPage(id) {
  const divs = Array.from(document.querySelectorAll('#gbscreen > div'));
  divs.forEach(div => {
    div.style.display = div.id === id.toLowerCase() ? 'block' : 'none';
  });
}

highlightOption(selectedIndex);
showgbPage('page'+selectedIndex);