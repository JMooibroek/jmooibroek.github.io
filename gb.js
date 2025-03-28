var coin = new Audio("assets/coin.mp3");
const options = document.getElementById("options");
let selectedIndex = 0,
	konamiArray = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"],
	konamiIndex = 0;

function showgbPage(e) {
	Array.from(document.querySelectorAll("#gbscreen > div")).forEach((n => {
		n.style.display = n.id === e ? "block" : "none"
	}))
}

function highlightOption(e) {
	let n = ["  Home", "  About", "\n  Music", "  Contact"];
	n[e] = n[e].replace(/ {2}/g, "~"), options.textContent = n.join("\t")
}

function handleButtonClick(e) {
	const n = e.target.id;
	"up" === n ? selectedIndex -= 2 : "down" === n ? selectedIndex += 2 : "left" === n ? selectedIndex-- : "right" === n ? selectedIndex++ : "a" === n && showgbPage("page" + selectedIndex), konamiArray[konamiIndex] == n ? konamiIndex++ : konamiIndex = 0, 10 == konamiIndex && (showgbPage("page4"), coin.play()), selectedIndex = Math.abs(selectedIndex % 4), highlightOption(selectedIndex)
}
const buttons = document.querySelectorAll("button");

function showPage(e) {
	Array.from(document.querySelectorAll("#gbscreen > div")).forEach((n => {
		n.style.display = n.id === e.toLowerCase() ? "block" : "none"
	}))
}
buttons.forEach((e => {
	e.addEventListener("click", handleButtonClick)
})), highlightOption(selectedIndex), showgbPage("page" + selectedIndex);