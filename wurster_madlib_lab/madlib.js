//capture user input values
function valueSet(usePrompts){
	//initialize values
	let place, country, thing, animal, movementVerb, number1, number2, number3;
	if(usePrompts == true){//prompt if user selects to do so...
		number1 = prompt("number");
		place = prompt("place of business");
		number3 = prompt("four digit number");
		country = prompt("country");
		thing = prompt("thing");
		animal = prompt("animal");
		movementVerb = prompt("movement verb");
		number2 = prompt("another number");
	}else{//use input boxes otherwise
		place = document.getElementById("place").value;
		country = document.getElementById("country").value;
		thing = document.getElementById("thing").value;
		animal = document.getElementById("animal").value;
		movementVerb = document.getElementById("movementVerb").value;
		number1 = document.getElementById("number1").value;
		number2 = document.getElementById("number2").value;
		number3 = document.getElementById("number3").value;
	};

	//send select values to be checked & modified if necessary
	
	let tested = (country, number1, number2, number3)=> //valueCheck(;
		country = tested[0];
		number1 = tested[1];
		number2 = tested[2];
		number3 = tested[3];

	//store captured data into array to simplify script alterations
	let output = [
		'A ',
		animal,
		' ',
		movementVerb,
		's into a ',
		place,
		' and the owner asks, \"How can I help you?\" The ',
		animal,
		' asked for ',
		number1,
		' ',
		thing,
		's. The owner says, \"I only have ',
		number2,
		' of those left\". The ',
		animal,
		' says, \"I\'ll take everything you have on hand today.\" They shake on the deal and the owner offers to ship the other ',
		(number1 - number2),
		' in 2 weeks. The ',
		animal,
		' says, \"Ok great! Ship \'em to ',
		number3,
		' Main street, Capitol City, ',
		country,
		'.\"'
	];
	showStory(output);
};

//adds some manipulation of the array to avoid common grammatical errors
function valueCheck(country, number1, number2, number3){
	//ensure values are positive so that comparison doesn't glitch
	number1 = Math.abs(Number(number1));
	number2 = Math.abs(Number(number2));
	number3 = Math.abs(Number(number3));

	//if number1 data is too small, switch its value with number3 to protect grammatical structure
	if(number1 <= 1){
		let x = number1;
		number1 = number3;
		number3 = x;
	};

	//if number2 is too large, randomize its value to be a number smaller than number1
	if(number1 <= number2){
		number2 = Math.floor(Math.random() * number1);
		//do not allow zero to protect grammatical structure
		if(number2 == 0){number2 = 1};
	};

	//ensure string slicing is possible for country
	if(!country){
		country='_____'};

	//slice string to capitalize proper noun (country)
	country = country[0].toUpperCase() + country.slice(1);

	return [country, number1, number2, number3];
};

//displays results
function showStory(output){
	//loop over array to assemble a single string 
	let string = ''
	output.forEach(
		function(item){
			//insert blanks for blank user input
			if(!item){
				string += '_____';
			}else{
				string += item;
			}
		}
	);

	//display in console and <p> element
	document.getElementById('out').innerHTML = string;
	console.log(string);
};