window.onbeforeunload = function(event) {
    event.returnValue = "Hello World"; 
    const user = $("#user").text();

    $.ajax({
        url: "../../scripts/close.php",
        type: "POST",
        data: {
          user: user,
          actif: "false",
        },
        cache: false,
        success: function (dataResult) {
          var dataResult = JSON.parse(dataResult);
          if (dataResult.statusCode == 200) {
            alert("Votre session est ferme sauf si vous etes si rediriger a une page joueur ou admin");
          } else if (dataResult.statusCode == 201) {
            alert("Error occured !");
          }
        },
      });


};