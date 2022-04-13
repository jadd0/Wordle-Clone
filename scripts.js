let row = document.getElementsByClassName("row");
let currentRow = 0;
let box = row[currentRow].getElementsByClassName("box");
let chosenWord = Ma[Math.floor(Math.random() * Ma.length)];
console.log(chosenWord);
let chosenList = chosenWord.split("");
let done = false;
document.cookie = "SameSite=lax;secure=true;arrayCookie=";

function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i);
}

function enter() {
	let currentWord = row[currentRow].dataset.word.split("");
	let box = row[currentRow].getElementsByClassName("box");

	console.log(row[currentRow].classList);

	const count = {},
		result = Array(5).fill(0);

	for (let i = 0; i < currentWord.length; i++) {
		if (chosenList[i] === currentWord[i]) result[i] = 2;
		else count[chosenList[i]] = (count[chosenList[i]] || 0) + 1;
	}
	for (let i = 0; i < currentWord.length; i++) {
		if (chosenList[i] === currentWord[i] || !count[currentWord[i]])
			continue;
		count[currentWord[i]]--;
		result[i] = 1;
	}
	for (let i = 0; i < box.length; i++) {
		box[i].dataset.valid = result[i];
	}

	let word = row[currentRow].dataset.word.toLowerCase();
	if (
		row[currentRow].dataset.length != 5 ||
		(Ma.indexOf(word) == -1 && Oa.indexOf(word) == -1)
	) {
		row[currentRow].classList.add("shake1");
		if (row[currentRow].dataset.length != 5) {
			alert("Please enter a 5 letter word and try again");
			return;
		}
		alert("This is not a valid word");
		return;
	}

	function colorChange(i, thing) {
		switch (box[i].dataset.valid) {
			case "2":
				thing.style.backgroundColor = "green";
				break;
			case "1":
				thing.style.backgroundColor = "#b59f3b";
				break;
			case "0":
				thing.style.backgroundColor = "#3a3a3c";
				break;
		}
	}

	let x = [100, 300, 500, 700, 900];

	for (let i = 0; i < box.length; i++) {
		setTimeout(() => {
			box[i].classList.remove("types");
			box[i].classList.add("shrunk");
			colorChange(i, box[i]);
		}, x[i]);
	}

	for (let i = 0; i < box.length; i++) {
		setTimeout(() => {
			let back = document.getElementById(box[i].dataset.letter);
			colorChange(i, back);
		}, 1400);
	}

	setTimeout(() => {
		if (row[currentRow - 1].dataset.word == chosenWord) {
			alert("This is the correct word!");
			document.cookie = `SameSite=lax;secure=true;arrayCookie=${currentRow},`;
			console.log(document.cookie);
			done = true;
			window.removeEventListener("keydown", keyPress);
		} else if (currentRow == row.length) {
			if (row[currentRow] != chosenWord) {
				alert(`You lost! The word was ${chosenWord}`);
				document.cookie = "SameSite=lax;secure=true;arrayCookie="+currentRow+",";
				console.log(document.cookie);
				window.removeEventListener("keydown", keyPress);
				done = true;
			} else {
				alert("This is the correct word!");
				document.cookie = "SameSite=lax;secure=true;arrayCookie="+currentRow+",";
				console.log(document.cookie);
				window.removeEventListener("keydown", keyPress);
				done = true;
			}
		}
	}, 1400);
	currentRow++;

	return;
}

function backspace() {
	let word = row[currentRow].dataset.word;
	let word1 = word.substring(0, word.length - 1);
	let box = row[currentRow].getElementsByClassName("box");
	if (row[currentRow].dataset.word.length > 0) {
		box[row[currentRow].dataset.word.length - 1].classList.add("del1");
		box[row[currentRow].dataset.word.length - 1].classList.remove("types");
	}
	row[currentRow].dataset.word = word1;
	row[currentRow].dataset.length = row[currentRow].dataset.word.length;
}

function write(key) {
	let box = row[currentRow].getElementsByClassName("box");
	if (row[currentRow].dataset.word.length != 5 && isLetter(key)) {
		row[currentRow].dataset.word += key;
		row[currentRow].dataset.length = row[currentRow].dataset.word.length;
	}

	for (let i = 0; i < box.length; i++) {
		box[i].dataset.letter = row[currentRow].dataset.word[i];

		if (box[i].dataset.letter.length == 1) {
			box[i].classList.remove("del1");
			box[i].classList.add("types");
			box[i].innerHTML = box[i].dataset.letter.toUpperCase();
		} else {
			box[i].innerHTML = "";
		}
	}
}

function keyPress(letter) {
	if (letter == "Enter" && done == false) {
		enter(letter);
		row[currentRow].classList.remove("shake1");
	} else if (letter == "Backspace" && done == false) {
		backspace();
	}
	if (done == false) {
		write(letter);
	}
}

window.addEventListener("keydown", function (evt) {
	keyPress(evt.key);
});

document.addEventListener(
	"dblclick",
	function (event) {
		event.preventDefault();
	},
	{ passive: false }
);
