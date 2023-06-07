$(document).ready(function () {
    console.log("search guy");
    $('#loadingImage').hide();

    $("#searchButton").click(function () {

        $("#results").empty();


        var search = $("#itemSearch").val()

        if ($("#media").val() == "show") {

            const settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://tvjan-tvmaze-v1.p.rapidapi.com/search/shows?q=" + search,
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Host": "tvjan-tvmaze-v1.p.rapidapi.com",
                    "X-RapidAPI-Key": "51c8568e2fmsh40bffe5570928e4p129a24jsn23d5b98acc77"
                }
            };

            $('#loadingImage').show();
            $.ajax(settings).done(function (response) {
                console.log(response);

                var ret = "<table class='mainList'>"
                ret += "<tr class='resultRow'>"
                ret += "<th colspan='2'><h1>Results</h1></th>"
                ret += "</tr>"
                for (var i = 0; i < response.length; i++) {
                    ret += "<tr class='resultRow'>"
                    ret += "<td><img src='" + response[i].show.image.original + "' class='showArt'></td>"
                    ret += "<td><h2>" + response[i].show.name + "</h2><p>" + response[i].show.summary + "</p><p><button class='addButton' id='" + response[i].show.id + "'>&ensp;<img src='../pictures/leaf.png' class='leaf'>&ensp; Add Show </button></p></td>"
                    ret += "</tr>"

                }
                ret += "</table>"

                $('#loadingImage').hide();
                $("#results").append(ret);

                $(".addButton").each(function () {
                    $(this).click(function () {
                        var id = $(this).attr('id');       
                        window.location = '/addItem?media=show&id=' + id;
                    });
                });
            });
        } else if (($("#media").val() == "book")) {
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://hapi-books.p.rapidapi.com/search/" + search,
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Host": "hapi-books.p.rapidapi.com",
                    "X-RapidAPI-Key": "51c8568e2fmsh40bffe5570928e4p129a24jsn23d5b98acc77"
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);

                var ret = "<table class='mainList'>"
                ret += "<tr class='resultRow'>"
                ret += "<th colspan='2'><h1>Results</h1></th>"
                ret += "</tr>"
                for (var i = 0; i < response.length; i++) {
                    ret += "<tr class='resultRow'>"
                    ret += "<td><img src='" + response[i].cover + "' class='showArt'></td>"
                    ret += "<td><h2>" + response[i].name + "</h2><p>" + response[i].authors + "</p><p><button class='addButton' id='" + response[i].book_id + "'>&ensp;<img src='../pictures/leaf.png' class='leaf'>&ensp; Add book </button></p></td>"
                    ret += "</tr>"

                }
                
                ret += "</table>"

                $("#results").append(ret);

                $(".addButton").each(function () {
                    $(this).click(function () {
                        var id = $(this).attr('id');        
                        window.location = '/addItem?media=book&id=' + id;
                    });
                });

            });
        }else {
            alert("Please specify type of search.")
        }


    })




});