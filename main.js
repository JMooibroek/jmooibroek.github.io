const date = new Date()
const terminal = document.getElementById('terminal-entries');
const input = document.getElementById('input');
var folder = ""

function addLine(text) {
  const line = document.createElement('p');
  line.textContent = text;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

document.addEventListener('keydown', function(event) {
  if(event.key.length === 1) {
	  input.focus();
  }
});

input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const command = input.value;
    input.value = '';

    addLine('visitor@jamaronet:~'+folder+'$' + command);
    if(command == 'cls' || command == 'clear') {
      while (terminal.firstChild) terminal.removeChild(terminal.firstChild);
    }

    event.preventDefault();
    terminal.scrollTop = terminal.scrollHeight;
    input.focus();
  }
});


// Example usage
addLine("Welcome to:")
addLine("     _                      ___  ___ ");
addLine("  _ | |__ _ _ __  __ _ _ _ / _ \\/ __|");
addLine(" | || / _` | '  \\/ _` | '_| (_) \\__ \\");
addLine("  \\__/\\__,_|_|_|_\\__,_|_|  \\___/|___/");
addLine("                         [Version 1.0]");
addLine("Today is: " + date.toDateString())
addLine('Type a command and press Enter.');

// Set the initial focus to the input
input.focus();