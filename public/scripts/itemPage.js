$(document).ready(function () {
    $('li').each(function (){
        $(this).click(function(){
            let id = $(this)[0].id
            console.log(id);

            fetch(
                'http://localhost:8080/item',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id })
                }
            ).then(
                window.location.href = '/item'
            )
        })
    })

    $("#editItemButton").click(function () {
        window.location.href='/editItem';
    });

});
