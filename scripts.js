var row = document.getElementsByClassName("row");
var currentRow = 0

var chosenWord = Ma[Math.floor(Math.random() * Ma.length)]
console.log(chosenWord)

function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i);
}



window.addEventListener("keydown", function (evt) {
    if (evt.key == "Enter") {

        console.log(row[currentRow].dataset.word in Ma)

        if (row[currentRow].dataset.word.length != 5) {
            alert("Please enter a 5 letter word and try again")
            return
        }

        var word = row[currentRow].dataset.word.toLowerCase()
        if ((Ma.indexOf(word)) == -1) {
            alert("This is not a valid word")
            return
        } 

        var box = row[currentRow].getElementsByClassName("box")
        for (var i = 0; i < box.length; i++) {
            if (chosenWord.indexOf(box[i].dataset.letter)!=-1) {
                box[i].dataset.valid = 1; box[i].style.backgroundColor = "yellow"
            }
            if (chosenWord[i]==box[i].dataset.letter) {
                box[i].dataset.valid = 2; box[i].style.backgroundColor = "green"
            }
        }


        currentRow++;
    }

	if (evt.key == "Backspace") {
		word = row[currentRow].dataset.word;
		var word1 = word.substring(0, word.length - 1);
		console.log(word1);
		row[currentRow].dataset.word = word1;
	}

    console.log(isLetter(evt.key))
    


	if (row[currentRow].dataset.word.length != 5 && isLetter(evt.key)) {
		row[currentRow].dataset.word += (evt.key);
	}

    box = row[currentRow].getElementsByClassName("box")
    for (var i = 0; i < row.length; i++) {
        
        box[i].dataset.letter = row[currentRow].dataset.word[i]
        
        if (box[i].dataset.letter.length == 1) {
            box[i].innerHTML = box[i].dataset.letter.toUpperCase()
        }
        else {
            box[i].innerHTML = ""
        }       
    }
});
