$(document).ready(function setData() {
  $.ajax({
    type: "GET",
    url: "../../scripts/getData.php",
    dataType: "html",
    success: function (data) {
      $("#data").html(data);
    },
  });

  setTimeout(function(){ setData() }, 1000);
});
