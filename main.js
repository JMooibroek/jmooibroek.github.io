const date = new Date()
const terminalEntries = document.getElementById('terminal-entries');
const terminal = document.getElementById('terminal');
const monitor = document.getElementById('monitor');
const gb = document.getElementById('gb');
const input = document.getElementById('tinput');
const pc = document.getElementById('pc');
const mobile = document.getElementById('mobile');

const birthDate = new Date("2002-09-22");
const age = Math.floor((new Date() - birthDate) / 365 / 24 / 60 / 60 / 1000);
document.getElementById("age").textContent = age;

const monitorStyles = [
	['translate(19.9vw, -12.8vw) perspective(56.5vw) rotateX(8deg) rotateY(-28deg) rotateZ(5.4deg)', '21.6vw', '14.3vw', '1.1vw'],
	['translate(35.3vh, -22.7vh) perspective(100vh) rotateX(8deg) rotateY(-28deg) rotateZ(5.4deg)', '38.2vh', '25.3vh', '2vh']
];

const terminalStyles = [
	['translate(-27.9vw, -11.5vw) perspective(56.5vw) rotateX(0deg) rotateY(15deg) rotateZ(-1.4deg)', '25vw', '15.5vw', '1vw', 'blur(0.03vw)', '0 0 0.4vw #00ff009d', '11vw'],
	['translate(-49.4vh, -20.4vh) perspective(100vh) rotateX(0deg) rotateY(15deg) rotateZ(-1.4deg)', '44.4vh', '27.5vh', '1.8vh', 'blur(0.06vh)', '0 0 0.8vh #00ff009d', '21vh']
];

const screenStyles = [
	['translate(-40vw, -54.8vw) skewY(-0.5deg)', '77vw', '110vw', '2.3vw'],
	['translate(-25.8vh, -35.4vh) skewY(-0.5deg)', '49.7vh', '71vh', '1.5vh']
];

function resizeTerminal(element, styles, aspectRatio) {
	const [style, ...rest] = window.innerWidth / window.innerHeight <= aspectRatio ? styles[0] : styles[1];
	Object.assign(element.style, { transform: style, width: rest[0], height: rest[1], fontSize: rest[2], filter: rest[3], textShadow: rest[4], '--text-shadow': rest[5] });
	input.style.fontSize = rest[2];
	input.style.textShadow = rest[4];
	input.style.width = rest[5];
}

function resizeScreen() {
	const isLandscape = window.innerWidth > window.innerHeight;
	pc.style.display = isLandscape ? 'block' : 'none';
	mobile.style.display = isLandscape ? 'none' : 'block';
	resizeTerminal(isLandscape ? monitor : gb, isLandscape ? monitorStyles : screenStyles, isLandscape ? 1.77 : 0.646);
	resizeTerminal(isLandscape ? terminal : gb, isLandscape ? terminalStyles : screenStyles, isLandscape ? 1.77 : 0.646);
}

window.addEventListener('resize', resizeScreen);

function addLine(text) {
	const line = document.createElement('pre');
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
	divs.forEach(div => {
		div.style.display = div.id === id ? 'block' : 'none';
	});
}

const commands = ['home', 'about', 'contact', 'music', 'reboot', 'help', 'cls', 'clear'];

function levenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1)
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

input.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		const command = input.value.toLowerCase().replace(/\s/g, '');
		input.value = '';
		addLine('visitor@jamaronet:~$' + command);
		
		
		switch (command) {
			case 'cls':
			case 'clear':
				while (terminalEntries.firstChild) terminalEntries.removeChild(terminalEntries.firstChild);
				break;
			case 'home':
				showPage('welcome');
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
				addLine('  home         Show welcome page');
				addLine('  about        Show about me page');
				addLine('  music        Show music page');
				addLine('  contact      Show contact page');
				addLine('  cls          Clear the terminal');
				addLine('  reboot       Reload the page');
				addLine('  help         Show available commands');
				break;
			default:
				addLine("'"+command+"' " + 'not recognized');
				let closest = null, minDist = Infinity;
				commands.forEach(c => {
					const dist = levenshtein(command, c);
					if (dist < minDist) {
						minDist = dist;
						closest = c;
					}
				});
				if (minDist < 3) addLine("did you mean '" + closest + "'?");
				else addLine('Type "help" to show the available commands');
				break;
		}
		
		event.preventDefault();
		terminal.scrollTop = terminal.scrollHeight;
		input.focus();
	}
});

resizeScreen();

addLine("Today is: " + date.toDateString())
addLine('Type a command and press Enter.');

input.focus();