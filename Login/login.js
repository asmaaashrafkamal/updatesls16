const database=firebase.firestore();
const user=database.collection('Users');

document.getElementById("login").addEventListener("click",e=>{
    e.preventDefault();
    const email=document.getElementById("email").value;
    const login=document.getElementById("login");
    const pass1="slsadmin@123"
    const pass2=document.getElementById("pass").value
    console.log(pass2)
    if(login !=null){
    login1=login.value;
    }
    console.log(user.where("email","==",email).get())
    user.where("email","==",email).get()
    .then((querySnapshot) => {
        if (querySnapshot.empty) {
        document.getElementById("emp").innerHTML='<div ><div class="alert alert-success"  style="max-width: 600px;"  role="alert"><h6 style="text-align:center;"> Incorrect Email OR Password  </h6> </div></div>'
        }else{
        querySnapshot.forEach((doc) => {
            if(doc.data().role=="SuperUser" && pass1==pass2){
             console.log("true")
             console.log(doc.id, " => ", doc.data());
             window.location.href = "../index.html?login=success"
           }else{
            document.getElementById("emp").innerHTML='<div ><div class="alert alert-success"  style="max-width: 600px;"  role="alert"><h6 style="text-align:center;"> Incorrect Email OR Password  </h6> </div></div>'
        }
        });}
    })

})