$(document).ready(function () {

    var qsParm = new Array();
    qs();

    if (qsParm[0] == 'show') {
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://tvjan-tvmaze-v1.p.rapidapi.com/shows/" + qsParm[1],
            "method": "GET",
            "headers": {
                "X-RapidAPI-Host": "tvjan-tvmaze-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "51c8568e2fmsh40bffe5570928e4p129a24jsn23d5b98acc77"
            }
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
            $("#item-title").val(response.name)
            $("#item-type").val("TV Show")
            $(".imageHolder").append("<img src='" + response.image.original + "' class='showArt'>")
        });
    } else if (qsParm[0] == 'book') {
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://hapi-books.p.rapidapi.com/book/" + qsParm[1],
            "method": "GET",
            "headers": {
                "X-RapidAPI-Host": "hapi-books.p.rapidapi.com",
                "X-RapidAPI-Key": "51c8568e2fmsh40bffe5570928e4p129a24jsn23d5b98acc77"
            }
        };
        
        $.ajax(settings).done(function (response) {
            console.log(response);
            $("#item-title").val(response.name)
            $("#item-type").val("Book")
            $(".imageHolder").append("<img src='" + response.cover + "' class='showArt'>")

        });
    }

    if (($('#item-type').val() == 'Book') || ($('#item-type').val() == 'Comic')){
        $('#progressType').empty();
        $('#progressType').append("&ensp;<img src='../pictures/leaf.png' class='leaf'>&ensp;")
        $('#progressType').append("<input form='new-item-form' type='number' name='progress' id='item-progress' min='0' value='0'>")
        $('#progressType').append("Chapters")
    } else  if ($('#item-type').val() == 'TV Show') {
        $('#progressType').empty();
        $('#progressType').append("&ensp;<img src='../pictures/leaf.png' class='leaf'>&ensp;")
            $('#progressType').append("<input form='new-item-form' type='number' name='progress' id='item-progress' min='0' value='0'>")
        $('#progressType').append("Episodes")
    }

    $('#item-type').click(function (response) {
        if (($('#item-type').val() == 'Book') || ($('#item-type').val() == 'Comic')){
            $('#progressType').empty();
            $('#progressType').append("&ensp;<img src='../pictures/leaf.png' class='leaf'>&ensp;")
            $('#progressType').append("<input form='new-item-form' type='number' name='progress' id='item-progress' min='0' value='0'>")
            $('#progressType').append("Chapters")
        } else  if ($('#item-type').val() == 'TV Show') {
            $('#progressType').empty();
            $('#progressType').append("&ensp;<img src='../pictures/leaf.png' class='leaf'>&ensp;")
            $('#progressType').append("<input form='new-item-form' type='number' name='progress' id='item-progress' min='0' value='0'>")
            $('#progressType').append("Episodes")
        } else {
            $('#progressType').empty();
            $('#progressType').append("&ensp;<img src='../pictures/leaf.png' class='leaf'>&ensp;")
            $('#progressType').append("<input form='new-item-form' type='number' name='progress' id='item-progress' min='0' value='0'>")
        }
    });


    function qs() {
        var query = window.location.search.substring(1);
        var parms = query.split('&');
        for (var i = 0; i < parms.length; i++) {
            var pos = parms[i].indexOf('=');
            if (pos > 0) {
                var key = parms[i].substring(0, pos);
                var val = parms[i].substring(pos + 1);
                qsParm[i] = val;
            }
        }
    }

});