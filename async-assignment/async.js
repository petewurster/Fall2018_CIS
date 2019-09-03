'use strict';

$(function() {

    let timeOne = Math.floor(Math.random() * 1000);
    let timeTwo = Math.floor(Math.random() * 1000);
    let greeting;
    let personName;

    setTimeout(function() {
        let greetings = ['Hello', 'Hola', 'Konnichiwa', 'Bonjour', 'Hallo'];
        let randomIndex = Math.floor(Math.random() * greetings.length);
        greeting = greetings[randomIndex];
        disp(greeting, personName);//call display func
    }, timeOne);

    setTimeout(function() {
        let names = ['Alice', 'Bob', 'Carol', 'Devon'];
        let randomIndex = Math.floor(Math.random() * names.length);
        personName = names[randomIndex];
        disp(greeting, personName);//call display func
    }, timeTwo);

    function disp(greeting, personName) {
        if(greeting && personName) {//only perform func task(s) if both req data are present
            $('#result-box').text(greeting + ', ' + personName + '!');
        }
    }

});
