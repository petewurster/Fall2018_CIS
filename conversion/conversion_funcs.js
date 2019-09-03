//hit online source for conversion factors
var rates = fetch("http://lowbudgetmanofleisure.com/rates.json")
	.then(//return json as rates
		function(response) {
			return response.json()
		}
	)
	.then(//clog returned data & call selection builder func
		function(rates) {
			console.log("fetch() returned:",rates);
			buildSel(rates);
		}
	);

function convert() {
	//grab variables and rates
	var cash = document.getElementById("cash").value;
	var frMoney = document.getElementById("from").value;
	var toMoney = document.getElementById("to").value;
	//conversion factors applied from BOTH selector boxes
	cash *= frMoney * toMoney;
	//display precision to ten-thousanths
	document.getElementById("output").innerHTML = "= " + cash.toFixed(4);
};

function buildSel(rates) {
	//loop thru dict to build selection options
	for(item in rates) {
		//build FROM selection from rates
		document.getElementById("from").innerHTML += 
			(`<option value="` + rates[item] + `">` + item + "</option>");
		//build TO selection from inverse of rates
		document.getElementById("to").innerHTML += 
			(`<option id="` + item + `"value="` + 1/rates[item] + `">` + item + "</option>")
	}
};