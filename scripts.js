var row = document.getElementsByClassName("row");
var currentRow = 0;

var chosenWord = Ma[Math.floor(Math.random() * Ma.length)];
console.log(chosenWord);

function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i);
}

window.addEventListener("keydown", function (evt) {
	if (evt.key == "Enter") {
		if (row[currentRow].dataset.length != 5) {
			console.log(row[currentRow].dataset.word.length);
			alert("Please enter a 5 letter word and try again");
			return;
		}

		var word = row[currentRow].dataset.word.toLowerCase();
		if (Ma.indexOf(word) == -1 && Oa.indexOf(word) == -1) {
			alert("This is not a valid word");
			return;
		}

		var box = row[currentRow].getElementsByClassName("box");
		function colorChange(i) {
			if (chosenWord[i] == box[i].dataset.letter) {
				box[i].dataset.valid = 2;
				box[i].style.backgroundColor = "green";
			} else if (chosenWord.indexOf(box[i].dataset.letter) != -1) {
				box[i].dataset.valid = 1;
				box[i].style.backgroundColor = "#b59f3b";
			} else {
				box[i].dataset.valid = 2;
				box[i].style.backgroundColor = "#3a3a3c";
			}
		}

	
		setTimeout(() => {
			box[0].classList.add("shrunk");
            colorChange(0)
		}, 100);

		setTimeout(() => {
			box[1].classList.add("shrunk");
            colorChange(1)
		}, 300);
		setTimeout(() => {
			box[2].classList.add("shrunk");
            colorChange(2)
		}, 500);
		setTimeout(() => {
			box[3].classList.add("shrunk");
            colorChange(3)
		}, 700);
		setTimeout(() => {
			box[4].classList.add("shrunk");
            colorChange(4)
		}, 900);

        if (row[currentRow].dataset.word == chosenWord) {
			alert("This is the correct word!");
		} else if (currentRow == 5 && row[5].dataset.word != chosenWord) {
			alert(`You lost! The word was ${chosenWord}`);
		}

		setTimeout(() => {
			currentRow++;
		},1100);


        

	} 
    else if (evt.key == "Backspace") {
		word = row[currentRow].dataset.word;
		var word1 = word.substring(0, word.length - 1);
		console.log(word1);
		row[currentRow].dataset.word = word1;
		row[currentRow].dataset.length = row[currentRow].dataset.word.length;
	}

	if (row[currentRow].dataset.word.length != 5 && isLetter(evt.key)) {
		row[currentRow].dataset.word += evt.key;
		row[currentRow].dataset.length = row[currentRow].dataset.word.length;
	}

	var box = row[currentRow].getElementsByClassName("box");
	console.log(box);
	for (var i = 0; i < row.length; i++) {
		box[i].dataset.letter = row[currentRow].dataset.word[i];

		if (box[i].dataset.letter.length == 1) {
			box[i].innerHTML = box[i].dataset.letter.toUpperCase();
		} else {
			box[i].innerHTML = "";
		}
	}
});
