const terminal = document.getElementById('terminal');
const input = document.getElementById('input');

function addLine(text) {
  const line = document.createElement('p');
  line.textContent = text;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

document.addEventListener('keydown', function(event) {
	input.focus();
});

input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const command = input.value;
    input.value = '';

    addLine('> ' + command);

    // Process the user's command here
    // You can add your logic to handle different commands

    event.preventDefault();

    // Scroll to the last line of text
    terminal.scrollTop = terminal.scrollHeight;

    // Move the focus back to the input
    input.focus();
  }
});

// Example usage
addLine('Welcome to the terminal!');
addLine('Type a command and press Enter.');

// Set the initial focus to the input
input.focus();