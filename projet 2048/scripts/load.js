$(document).ready(function () {
  // variable global nous assurant qu<on utilise une fois le append dans les deux fonctions
  // ces variables sont remis a true quand les cases sont unchecked
  var x=true;
  var y=true;

  function setInscrit() {

          
      $.ajax({
        type: "GET",
        url: "../../scripts/getInscrit.php",
        dataType: "html",
        success: function (data) {
          $("#inscrit").html(data);
        },
      });

    var checked = $("#showInscrit").is(":checked");
    if (checked) {
      setTimeout(function(){ setInscrit() }, 1000);
    }
  };

  function setActif() {
          
    $.ajax({
      type: "GET",
      url: "../../scripts/getActif.php",
      dataType: "html",
      success: function (data) {
        $("#enligne").html(data);
      },
    });

  var checked = $("#showEnligne").is(":checked");
  if (checked) {
    setTimeout(function(){ setActif() }, 1000);
  }
};


  

  $("#showInscrit").click(function () {
   
    var checked = $(this).is(":checked");
    if (checked) {
      
      $("#optionInscrit").append('<button type="button" class="btn btn-primary d-flex">Nombre total de joueur inscrit &nbsp;&nbsp;<span class="badge badge-light" id="inscrit" >0</span><span class="sr-only">unread messages</span></button>' );
       
      $.ajax({
        type: "GET",
        url: "../../scripts/getInscrit.php",
        dataType: "html",
        success: function (data) {
          $("#inscrit").html(data);
        },
      });

      setTimeout(function(){ setInscrit() }, 1000);
      
    } else {
      x=true;
      $("#optionInscrit").html("");
    }
  });

  $("#showEnligne").click(function () {
   
    var checked = $(this).is(":checked");
    if (checked) {
     
      $("#optionEnligne").append('<button type="button" class="btn btn-success d-flex">Nombre total de joueur en ligne &nbsp;&nbsp;<span class="badge badge-light" id="enligne">0</span><span class="sr-only">unread messages</span></button>' );
      
      $.ajax({
        type: "GET",
        url: "../../scripts/getActif.php",
        dataType: "html",
        success: function (data) {
          $("#enligne").html(data);
        },
      });

      setTimeout(function(){ setActif() }, 1000);
      
    } else {
      
      $("#optionEnligne").html("");
    }
  });
});
