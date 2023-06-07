// admin@test.ca
// test123

$(document).ready(function () {
    drawLogo();
    $('.logIn').hide();
    $('.signUp').hide();
    $('#loadingImage').hide();

    $('#goToLoginButton').click(function () {
        $('.home').empty();
        $('.logIn').show();
    });

    $('#goToSignUpButton').click(function () {
        $('.home').empty();
        $('.signUp').show();
    });

    $("#loginButton").click(function () {
        $('#loadingImage').show();
        window.location.href='/views/userHome.ejs';
        $('#loadingImage').hide();
    });

});


function drawLogo(){
    const width = 200;
    const height = 200;

    let svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height)
        
    svg.append('circle')
        .attr('class', 'st0')
        .attr('cx', '101.1')
        .attr('cy', '99.6')
        .attr('r', '96.5')

    svg.append('path')
        .attr('class', 'st1')
        .attr('d', 'M103.2,173.9h-2.5c-1.9,0-3.5-1.6-3.5-3.5V28.7c0-1.9,1.6-3.5,3.5-3.5h2.5c1.9,0,3.5,1.6,3.5,3.5v141.6C106.7,172.3,105.1,173.9,103.2,173.9z')

    svg.append('path')
        .attr('class', 'st1')
        .attr('d', 'M74.5,83.6H77c1.9,0,3.5-1.6,3.5-3.5v-51c0-1.9-1.6-3.5-3.5-3.5h-2.5c-1.9,0-3.5,1.6-3.5,3.5v51C70.9,82,72.5,83.6,74.5,83.6z')

    svg.append('path')
        .attr('class', 'st1')
        .attr('d', 'M127.5,173.9h2.5c1.9,0,3.5-1.6,3.5-3.5V90.9c0-1.9-1.6-3.5-3.5-3.5h-2.5c-1.9,0-3.5,1.6-3.5,3.5v79.5C124,172.3,125.6,173.9,127.5,173.9z')

    svg.append('circle')
        .attr('class', 'st1')
        .attr('cx', '75.9')
        .attr('cy', '102')
        .attr('r', '4.6')

    svg.append('circle')
        .attr('class', 'st1')
        .attr('cx', '128.8')
        .attr('cy', '68.4')
        .attr('r', '4.6')
    
}