//capture user input values
function valueSet(usePrompts){
	//initialize values
	let place, country, thing, animal, movementVerb, number1, number2, number3;
	let object = {
		'lName':'Wurster',
		'fName':'Pete',
		'when':new Date(2018, 8, 26)
	};

	if(usePrompts == true){//prompt if user selects to do so...
		number1 = Number(prompt("number"));
		number2 = Number(prompt("another number"));
		place = prompt("place of business");
		number3 = Number(prompt("four digit year"));
		country = prompt("country");
		thing = prompt("thing");
		animal = prompt("animal");
		movementVerb = prompt("movement verb");
	}else{//use input boxes otherwise
		place = document.getElementById("place").value;
		country = document.getElementById("country").value;
		thing = document.getElementById("thing").value;
		animal = document.getElementById("animal").value;
		movementVerb = document.getElementById("movementVerb").value;
		number1 = Number(document.getElementById("number1").value);
		number2 = Number(document.getElementById("number2").value);
		number3 = Number(document.getElementById("number3").value);
	};

	//send select values to be checked & modified if necessary
	let tested = valueCheck(country, number1, number2, number3);
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
		45,
		' ',
		thing,
		's. The owner says, \"I only have ',
		12,
		' of those left.\" The ',
		animal,
		' says, \"I\'ll take everything you have on hand today.\" They shake on the deal and the owner offers to ship the rest. The ',
		animal,
		' says, \"Ok great! As long as I get \'em in ',
		country,
		' by ',
		number3,
		'.\"'
	];
	showStory(output, object);
};

//adds some manipulation of the array
function valueCheck(country, number1, number2, number3){
	//ensure values are positive
	number1 = Math.abs(number1);
	number2 = Math.abs(number2);
	number3 = Math.abs(number3);

	//ensure date is not sooner than next year
	let thisYear = new Date;
	if(number3 < thisYear.getFullYear()){
		number3 = thisYear.getFullYear() + 1;
	};

	//set date to today in whatever year the user input
	number3 = new Date(number3, number1, number2);
	//date change back to string & slice off extra data for output array processing
	number3 = number3.toDateString();
	
	//ensure string slicing is possible for country
	if(!country){
		country = '_____'};

	//slice string to capitalize proper noun (country)
	country = country[0].toUpperCase() + country.slice(1);

	//use push for extra credit
	let retArray = [];
	retArray.push(country, number1, number2, number3);

	return retArray;
};

//displays results
function showStory(output, object){
	//loop over array to assemble a single string 
	let string = ''
	output.forEach(
		function(item){
			//use blank lines for empty user input
			if(!item){
				string+='_____';
			}else{//use array data
				string += item;
			}
		}
	);

	//display in console and <p> element
	document.getElementById('out').innerHTML = string;
	document.getElementById('by').innerHTML = ('by: ' + object['fName'] + ' ' + object['lName'] + ', ' + object['when'].toDateString());
	console.log(string);
	console.log('by: ' + object['fName'] + ' ' + object['lName'] + ', ' + object['when'].toDateString());
};

