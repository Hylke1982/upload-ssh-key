const apiUrl = "/api/key";

$(document).ready(function () {

    var $sshKey = $('#sshKey');

    // Load API key
    $.get(apiUrl, function (data) {
        //console.log(data);
        $sshKey.val(data.key);
    });


    // API key
    $("#target").submit(function (event) {

        event.preventDefault();
        var sshKey = $sshKey.val();
        var requestObject = {};

        requestObject.key = sshKey;

        $.ajax({
            type: "POST",
            url: apiUrl,
            data: JSON.stringify(requestObject),
            contentType: 'application/json',
            success: function () {
                alert("API Key placed");
            },
            dataType: 'json'
        });

    });

});