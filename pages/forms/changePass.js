document.getElementById("resetPassword").addEventListener("click",e=>{
    queryString1= window.location.search;
    const urlParams = new URLSearchParams(queryString1);
    const id = urlParams.get('id')
    console.log(id);
  
    var pass1=document.getElementById("pass1").value;
    e.preventDefault();

var url = "https://sls-firestore-cloud.herokuapp.com/changeUserPassword";

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

var data = `{
    "uid" :`+id+`,
    "newPassword" : `+pass1+`
}`;

xhr.send(data);

})