toastr.options = {
	closeButton: false,
	debug: true,
	newestOnTop: true,
	progressBar: false,
	positionClass: "toast-top-center",
	preventDuplicates: false,
	onclick: null,
	showDuration: "300",
	hideDuration: "1000",
	timeOut: "2000",
	extendedTimeOut: "1000",
	showEasing: "swing",
	hideEasing: "linear",
	showMethod: "fadeIn",
	hideMethod: "fadeOut",
};

if (document.cookie.split(";").length < 6) {
	document.cookie =
		"1=0;secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT";
	document.cookie =
		"2=0;secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT";
	document.cookie =
		"3=0;secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT";
	document.cookie =
		"4=0;secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT";
	document.cookie =
		"5=0;secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT";
	document.cookie =
		"6=0;secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT";
	document.cookie =
		"7=0;secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT";
	document.cookie =
		"8=0;secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT";
}

let row = document.getElementsByClassName("row");
let currentRow = 0;
let box = row[currentRow].getElementsByClassName("box");
let chosenWord = Ma[Math.floor(Math.random() * Ma.length)];
console.log(chosenWord);
let chosenList = chosenWord.split("");
let done = false;
let won = false;
let animating = false;

let one = new Number();
let two = new Number();
let three = new Number();
let four = new Number();
let five = new Number();
let six = new Number();
let seven = new Number();
let eight = new Number();

function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i);
}

function showNotification(message) {
	// document.getElementById("notification").innerHTML = message.toUpperCase();
	// $("#notContainer").fadeIn(50)

	// setTimeout(function() {
	// 	// document.getElementById("notContainer").style.display = "none";
	// 	$("#notContainer").fadeOut(200)
	// }, 1500)
	toastr.info(message.toUpperCase(), { color: "black" });
	return;
}

function inCorrect(box) {
	for (let p = 0; p < 5; p++) {
		console.log(box[p])
		setTimeout(function () {
			box[p].classList.remove("shrunk");
			box[p].classList.add("finish1");
		}, 100*p);
	}
}

function getCookieVal() {
	let cookiearray = document.cookie.split("; ");
	for (let i = 0; i < cookiearray.length; i++) {
		let x = cookiearray[i].split("=");
		if (x[0] == 1) {
			one = x[1];
		} else if (x[0] == 2) {
			two = x[1];
		} else if (x[0] == 3) {
			three = x[1];
		} else if (x[0] == 4) {
			four = x[1];
		} else if (x[0] == 5) {
			five = x[1];
		} else if (x[0] == 6) {
			six = x[1];
		} else if (x[0] == 7) {
			console.log("hello");
			seven = x[1];
		} else if (x[0] == 8) {
			eight = x[1];
		}
	}
}

// TODO add cookie to see which character is most common
// TODO make it so remembers words if incomplete
// TODO make refreshable and sharable

function finished() {
	done = true;
	window.removeEventListener("keydown", keyPress);

	getCookieVal();

	switch (currentRow) {
		case 1:
			one = parseInt(one);
			one++;
			document.cookie = `1=${one};secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT`;
			break;
		case 2:
			two = parseInt(two);
			two++;
			document.cookie = `2=${two};secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT`;
			break;
		case 3:
			three = parseInt(three);
			three++;
			document.cookie = `3=${three};secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT`;
			break;
		case 4:
			four = parseInt(four);
			four++;
			document.cookie = `4=${four};secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT`;
			break;
		case 5:
			five = parseInt(five);
			five++;
			document.cookie = `5=${five};secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT`;
			break;
		case 6:
			six = parseInt(six);
			six++;
			document.cookie = `6=${six};secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT`;
			break;
	}

	if (won == true) {
		seven = parseInt(seven);
		seven++;
		document.cookie = `7=${seven};secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT`;
	}

	eight = parseInt(eight);
	console.log(typeof eight);
	eight++;

	document.cookie = `8=${eight};secure=true;SameSight=lax;expires=Thu, 01 Jan 2023 00:00:00 GMT`;

	console.log(document.cookie);

	setTimeout(function () {
		document.getElementById("played").innerHTML = eight;
		document.getElementById("won").innerHTML = seven;
		let ratio = (seven / eight) * 100;
		document.getElementById("ratio").innerHTML = Math.ceil(ratio) + "%";
		document.getElementById("canvas").style.display = "none";
		document.getElementById("keyboard").style.display = "none";
		$("#leaderboard").fadeIn()
		

		let order = document.getElementsByClassName("order");
		let orderList = [one, two, three, four, five, six, seven, eight];
		for (let i = 0; i < order.length; i++) {
			order[i].innerHTML += orderList[i];
		}
	}, 1500);
}

function enter() {
	let currentWord = row[currentRow].dataset.word.split("");
	let box = row[currentRow].getElementsByClassName("box");

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
			console.log("hello1");
			showNotification("not enough letters");
			return;
		}
		showNotification("word not in list");
		return;
	}
	
	function colorChange(i, thing) {
		switch (box[i].dataset.valid) {
			case "2":
				thing.style.backgroundColor = "#538d4e";
				thing.style.border = "3px solid #538d4e";
				break;
			case "1":
				thing.style.backgroundColor = "#b59f3b";
				thing.style.border = "3px solid #b59f3b";
				break;
			case "0":
				thing.style.backgroundColor = "#3a3a3c";
				thing.style.border = "3px solid #3a3a3c";
				break;
		}
	}


	for (let i = 0; i < box.length; i++) {
		animating = true;
		setTimeout(() => {
			box[i].classList.remove("types");
			box[i].classList = ("box shrunk");
			
		}, 100+(300*i));
	}

	for (let i = 0; i < box.length; i++) {
		setTimeout(() => {
			colorChange(i, box[i]);
		}, (100+(300*i)) + 310);
	}

	for (let i = 0; i < box.length; i++) {
		setTimeout(() => {
			let back = document.getElementById(box[i].dataset.letter);
			colorChange(i, back);
		}, 1400);
	}

	setTimeout(() => {
		let box = row[currentRow - 1].getElementsByClassName("box");
		if (row[currentRow - 1].dataset.word == chosenWord) {
			const lostWords = [
				0,
				"phenomenal",
				"magnificent",
				"brilliant",
				"great",
				"good",
				"phew",
			];
			setTimeout(function () {
				inCorrect(box);
				showNotification(lostWords[currentRow]);
			}, 700);
			won = true;
			setTimeout(function () {
				finished();
			}, 1500);
		} else if (currentRow == row.length) {
			if (row[currentRow] != chosenWord) {
				setTimeout(function () {
					showNotification(chosenWord);
				}, 500);
				
				setTimeout(function () {
					finished();
				}, 1500);
			} else {
				won = true;
				setTimeout(function () {
					inCorrect(box);
					finished();
				}, 1500);
			}
		}
		setTimeout(function () {
			animating = false;
		},600)
		
	}, 1400);
	currentRow++
	
	
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

		if (
			box[i].dataset.letter != "" &&
			box[i].dataset.letter != "undefined"
		) {
			box[i].style.border = "3px solid #565758";
		}

		if (
			box[i].dataset.letter == "" ||
			box[i].dataset.letter == "undefined"
		) {
			box[i].style.border = "3px solid rgb(36, 36, 36)";
		}
	}
}

function keyPress(letter) {
	console.log(animating)
	if (animating) return
	if (letter == "Enter" && done == false) {
		enter(letter);
		if (row[currentRow].classList.contains("shake1")) {
			setTimeout(() => {
				row[currentRow].classList.remove("shake1");
			}, 300);
		}
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
