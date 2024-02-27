const date = new Date()
const terminal = document.getElementById('terminal-entries');
const terminalFrame = document.getElementById('terminal')
const input = document.getElementById('input');

function resizeTerminal() {
  if(window.innerWidth / window.innerHeight >= 2.1307) {
    terminalFrame.style.top = '16.8vw';
    terminalFrame.style.left = '24.2vw';
    terminalFrame.style.width = '17.4vw';
    terminalFrame.style.height = '10.8vw';
    terminalFrame.style.fontSize =  '0.5vw';
    input.style.fontSize = '0.5vw';
  } else {
    terminalFrame.style.top = '36vh';
    terminalFrame.style.left = '51.56vh';
    terminalFrame.style.width = '37vh';
    terminalFrame.style.height = '23vh';
    terminalFrame.style.fontSize =  '1vh';
    input.style.fontSize = '1vh';
  }
}

window.addEventListener('resize', function() {
  resizeTerminal();
});

function addLine(text) {
  const line = document.createElement('p');
  line.textContent = text;
  terminal.appendChild(line);
}

document.addEventListener('keydown', function (event) {
  if (event.key.length === 1) {
    input.focus();
  }
});

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const command = input.value;
    input.value = '';
    addLine('visitor@jamaronet:~$' + command);

    switch (command) {
      case 'cls':
      case 'clear':
        while (terminal.firstChild) terminal.removeChild(terminal.firstChild);
        break;
      case 'shutdown':
        window.close();
        break;
      case 'reboot':
        location.reload();
        break;
      case 'help':
        addLine('Available commands:');
        addLine('  clear        Clear the terminal');
        addLine('  shutdown     Close the page');
        addLine('  reboot       Reload the page');
        addLine('  help         Show available commands');
        break;
      default:
        addLine('Command not found: ' + cmd);
        break;
    }

    document.getElementById("inputline").innerHTML = 'visitor@jamaronet:~$'+currentFolder;
    event.preventDefault();
    terminal.scrollTop = terminal.scrollHeight;
    input.focus();
  }
});

resizeTerminal();
// Example usage
addLine("Welcome to:")
addLine("     _                      ___  ___ ");
addLine("  _ | |__ _ _ __  __ _ _ _ / _ \\/ __|");
addLine(" | || / _` | '  \\/ _` | '_| (_) \\__ \\");
addLine("  \\__/\\__,_|_|_|_\\__,_|_|  \\___/|___/");
addLine("                         [Version 1.0]");
addLine("Today is: " + date.toDateString())
addLine('Type a command and press Enter.');
document.getElementById("inputline").innerHTML = 'visitor@jamaronet:~$'+currentFolder;
// Set the initial focus to the input
input.focus();