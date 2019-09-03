//discourage 'sloppy' coding techniques
'use strict'

//set RATES to values provided by customer;
//use OBJ to permit easy expansion/alteration of properties
const RATES = {
	' '   : ' ',
	'USD' : 1,
	'BRL' : 3.51,
	'EUR' : .91,
	'GBP' : .65,
	'JPY' : 124.17,
};

//declare listeners
document.getElementById('from').addEventListener('change', reBuildSel);//enable selector AFTER user types
document.getElementById('from').addEventListener('change', handleUserData);//submits user data
document.getElementById('to').addEventListener('change', handleUserData);//submits user data
document.getElementById('btn').addEventListener('click', handleUserData);//submits user data
document.getElementById('cash').addEventListener('change', handleUserData);//submits user data

//handle listener:: after user has typed into input field, build the TO selector
//totally unnecessary, but I wanted to show that I understand default params and to 
//practice with event listeners
function reBuildSel() {
	buildSel(RATES, 'to');
}

//main func
function handleUserData() {
	//rip user selected variable values from document element
	let cash = Number(document.getElementById('cash').value);
	let frMoney = Number(document.getElementById('from').value);
	let toMoney = Number(document.getElementById('to').value);

	//call func to display currency type in alert
	let moneyType = traceCurr(frMoney, toMoney);

	//send data to converter
	let output = doConvert(cash, frMoney, toMoney);

	//send data to QC before display
	qualControl(output, moneyType);
}

//necessary for client spec output alert
function traceCurr(frMoney, toMoney) {
	let a, b;
	//loop thru RATES to assign moneyType
	for(let key in RATES) {
		if(frMoney === 1/RATES[key]) {
			a = key;
		}
		if (toMoney === RATES[key]) {
			b = key;
		}
	}
	return [a, b];//this data becomes moneyType
}

//fill HTML <select> elements based on rate OBJ information
function buildSel(RATES, fromTo = 'from') {
	//loop thru RATES object
	for(let item in RATES) {
		if(fromTo === 'from') {//build FROM selection from RATES
		document.getElementById('from').innerHTML += 
			(`<option value="` + 1/RATES[item] + `">` + item + "</option>");
		
		}else{//build TO selection from inverse of RATES
		document.getElementById('to').innerHTML += 
		(`<option id="` + item + `"value="` + RATES[item] + `">` + item + "</option>")
		//remove event listener
		document.getElementById('from').removeEventListener('change', reBuildSel);
		}
	}
}

//do conversion
function doConvert(cash, frMoney, toMoney) {
	//conversion factors applied from BOTH selector boxes
	return cash * frMoney * toMoney;
};

//test for bad values and configure output appropriately
function qualControl(output, moneyType) {
	output = [output];
	if(output[0] !== output[0]) {
		output[0] = 'error: non-numerical characters detected';
		display(output);
	}
	if(moneyType[1] === undefined) {
		output[0] = 'error: use selector drop-downs';
		display(output);
	}

//still need an Infinity detector
//here

	//display precision to hundreths
	output[0] = '= ' + output[0].toFixed(2);
	//kinda cheated here because I was tired of re-packaging all these parameters
	output.push(document.getElementById('cash').value + ' ' + moneyType[0] + 's ' + output[0] + ' ' + moneyType[1] + 's.');

		
	display(output);
}

//display results
function display(output) {
	document.getElementById('output').innerHTML = output[0];
	if(output[1]){
		alert(output[1]);
	}
};




//call func to finish page construction & permit interaction
buildSel(RATES);