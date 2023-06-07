$(document).ready(function () {
    flipping();

    $(".loginButton").click(function () {
        window.location.href='/login';
    });

    
    function flipping() {
        setInterval(changeImage, 3000);
    }

    function changeImage() {
        var d1 = document.getElementById('mainImage');
        var current = d1.src;
        if (d1.src.includes("HeaderA")) {
            d1.src="../pictures/HeaderB.gif";
        }
        else if (d1.src.includes("HeaderB")) {
            d1.src="../pictures/HeaderC.gif"
        }
        else if (d1.src.includes("HeaderC")) {
            d1.src="../pictures/HeaderD.gif"
        } 
        else if (d1.src.includes("HeaderD")) {
            d1.src="../pictures/HeaderA.gif"
        }
    }
});