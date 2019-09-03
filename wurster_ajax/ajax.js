'use strict';

$(() => {
    let request = $.ajax({
        method: 'GET',
        url: 'people.json',
        dataType: 'json',
    });

    request.done(function(data) {
        let list = data.body.list;
        let resultBox = $('#result-box');
        let unorderedList = $('<ul>');
        resultBox.append(unorderedList);

        for (let person of list) {
            let listItem = $('<li>');
            listItem.text(person.name);
            listItem.attr('data-url', person.links[0].href);
            unorderedList.append(listItem);
        }

        //request made based on data retrieved from first JSON
        list = $('li');
        list.on('click', function() {
            let subReq = $.ajax(this.dataset.url);
            subReq.done((subData) => {
                //call custom function to set text
                $('#loaded-data').text(allArt(subData));
            });
            subReq.fail((response) => {
                console.log('ERROR:' + response.statusText);
            });
        });

    });

    request.fail(function(response) {
        console.log('ERROR:' + response.statusText);
    });

//gather ALL locations into single string
function allArt(subData) {
    let all = '';
    for (let x = 0; x < subData.body.art.length; x++){
        all += '(' + (x+1) + ')';
        //use comments if location desctiption is unavailable
        all += (subData.body.art[x].location.description)?
            subData.body.art[x].location.description + '... '
            : subData.body.art[x].comments + '... ';
    }

    return all;
}




});
