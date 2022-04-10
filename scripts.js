let row = document.getElementsByClassName("row");
let currentRow = 0;
let box = row[currentRow].getElementsByClassName("box");
let chosenWord = Ma[Math.floor(Math.random() * Ma.length)];
console.log(chosenWord);
let chosenList = chosenWord.split("");

function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i);
}

function enter() {
	let currentWord = row[currentRow].dataset.word.split("");
	const count = {},
		result = Array(5).fill(0);

	for (let i = 0; i < currentWord.length; i++) {
		if (chosenList[i] === currentWord[i]) result[i] = 2;
		else count[chosenList[i]] = (count[chosenList[i]] || 0) + 1;
	}
	for (let i = 0; i < currentWord.length; i++) {
		if (chosenList[i] === currentWord[i] || !count[currentWord[i]]) continue;
		count[currentWord[i]]--;
		result[i] = 1;
	}
	for (let i = 0; i < box.length; i++) {
		box[i].dataset.valid = result[i];
	}

	if (row[currentRow].dataset.length != 5) {
		alert("Please enter a 5 letter word and try again");
		return;
	}

	let word = row[currentRow].dataset.word.toLowerCase();
	if (Ma.indexOf(word) == -1 && Oa.indexOf(word) == -1) {
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
		if (row[currentRow].dataset.word == chosenWord) {
			alert("This is the correct word!");
			window.removeEventListener("keydown", keyPress);
		} else if (currentRow == 5 && row[5].dataset.word != chosenWord) {
			alert(`You lost! The word was ${chosenWord}`);
			window.removeEventListener("keydown", keyPress);
		}
		currentRow +=1
	}, 1400);



	return;
}

function backspace() {
	let word = row[currentRow].dataset.word;
	let word1 = word.substring(0, word.length - 1);
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
			box[i].innerHTML = box[i].dataset.letter.toUpperCase();
		} else {
			box[i].innerHTML = "";
		}
	}
}

function keyPress(letter) {
	if (letter == "Enter") {
		enter(letter);
		
	} else if (letter == "Backspace") {
		backspace();
	}
	write(letter);
}

window.addEventListener("keydown", function (evt) {
	keyPress(evt.key);
});
