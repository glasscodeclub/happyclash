const profile = document.getElementsByClassName("p1")

function RemoveClick(params) {
  $.ajax('/career/edit/delete', {
    type: 'POST',  // http method
    success: function (data, status, xhr) {
        console.log(data)
        if(data.success)
        window.location.reload();
    },
    error: function (jqXhr, textStatus, errorMessage) {
        console.log(jqXhr, textStatus, errorMessage)
    }
});
}

function ChangeClick(params) {
  window.location.assign("/uploadimage")
}

function DeleteAccount() {
  console.log("Delete Account was Hit!");
}
