const date = new Date()
const terminalEntries = document.getElementById('terminal-entries');
const terminal = document.getElementById('terminal');
const monitor = document.getElementById('monitor');
const gb = document.getElementById('gb');
const input = document.getElementById('tinput');
const pc = document.getElementById('pc');
const mobile = document.getElementById('mobile');

const birthDate = new Date("2002-09-22"), today = new Date(), age = today.getFullYear() - birthDate.getFullYear(), monthDiff = today.getMonth() - birthDate.getMonth(), dayDiff = today.getDate() - birthDate.getDate();
document.getElementById("age").textContent = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;

terminalArray = [['translate(-27.9vw, -11.5vw) perspective(56.5vw) rotateX(0deg) rotateY(15deg) rotateZ(-1.4deg)','25vw','15.5vw','1vw','blur(0.03vw)','0 0 0.4vw #00ff009d', '1vw'],['translate(-49.4vh, -20.4vh) perspective(100vh) rotateX(0deg) rotateY(15deg) rotateZ(-1.4deg)','44.4vh','27.5vh','1.8vh','blur(0.06vh)','0 0 0.8vh #00ff009d', '1.8vh']];
monitorArray = [['translate(19.9vw, -12.8vw) perspective(56.5vw) rotateX(8deg) rotateY(-28deg) rotateZ(5.4deg)','21.6vw','14.3vw','1.1vw'],['translate(35.3vh, -22.7vh) perspective(100vh) rotateX(8deg) rotateY(-28deg) rotateZ(5.4deg)','38.2vh','25.3vh','2vh']];
screenArray = [['translate(-40vw, -54.8vw) skewY(-0.5deg)','77vw','110vw','2.3vw'],['translate(-25.8vh, -35.4vh) skewY(-0.5deg)','49.7vh','71vh','1.5vh']];

function resizeTerminal(id, array, ratio) {
  array = window.innerWidth / window.innerHeight <= ratio? array[0] : array[1];
  id.style.transform = array[0];
  id.style.width = array[1];
  id.style.height = array[2];
  id.style.fontSize =  array[3];
  id.style.filter = array[4];
  id.style.textShadow = array[5];
  input.style.textShadow = array[5];
  input.style.fontSize = array[6];
}

function resizeScreen() {
  if(window.innerWidth > window.innerHeight) {
    pc.style.display = 'block';
    mobile.style.display = 'none';
    document.body.style.backgroundImage = "url('bg.avif')";
    resizeTerminal(terminal, terminalArray, 1.77);
    resizeTerminal(monitor, monitorArray, 1.77);
  } else {
    pc.style.display = 'none';
    mobile.style.display = 'block';
    document.body.style.backgroundImage = "url('gb.avif')";
    resizeTerminal(gb, screenArray, 0.646);
  }
}

window.addEventListener('resize', resizeScreen);

function addLine(text) {
  const line = document.createElement('p');
  line.textContent = text;
  terminalEntries.appendChild(line);
}

document.addEventListener('keydown', function (event) {
  if (event.key.length === 1 && !event.ctrlKey) {
    input.focus();
  }
});

function showPage(id) {
  const divs = Array.from(document.querySelectorAll('#web > div'));
  console.log('why?');
  divs.forEach(div => {
    div.style.display = div.id === id ? 'block' : 'none';
  });
}

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const command = input.value;
    input.value = '';
    addLine('visitor@jamaronet:~$' + command);
    switch (command) {
      case 'cls':
      case 'clear':
        while (terminalEntries.firstChild) terminalEntries.removeChild(terminalEntries.firstChild);
        break;
      case 'about':
        showPage('me');
        break;
      case 'music':
        showPage('music');
        break;
      case 'contact':
        showPage('contact');
        break;
      case 'reboot':
        location.reload();
        break;
      case 'help':
        addLine('Available commands:');
        addLine('  about        Show about me page');
        addLine('  music        Show music page');
        addLine('  contact      Show contact page');
        addLine('  cls          Clear the terminal');
        addLine('  reboot       Reload the page');
        addLine('  help         Show available commands');
        break;
      default:
        addLine('Command not found: ' + command);
        addLine('Type "help" to show the available commands');
        break;
    }
    event.preventDefault();
    terminal.scrollTop = terminal.scrollHeight;
    input.focus();
  }
});

resizeScreen();

addLine("Welcome to:")
addLine("     _                      ___  ___ ");
addLine("  _ | |__ _ _ __  __ _ _ _ / _ \\/ __|");
addLine(" | || / _` | '  \\/ _` | '_| (_) \\__ \\");
addLine("  \\__/\\__,_|_|_|_\\__,_|_|  \\___/|___/");
addLine("                         [Version 3.141]");
addLine("Today is: " + date.toDateString())
addLine('Type a command and press Enter.');

input.focus();