queryString= window.location.search
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    console.log(id);
    const database=firebase.firestore();
    database.collection("Users").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc2) => {
            if(doc2.id==id){
    console.log(doc2.data())
    document.getElementById("Email").value=doc2.data().email;
    document.getElementById("phone").value=doc2.data().phoneNumber;
    document.getElementById("date").value=doc2.data().DOB;
    document.getElementById("username").value=doc2.data().userName;
    document.getElementById("update").addEventListener("click",e=>{
        var e1=document.getElementById("Email").value;
        var ph=document.getElementById("phone").value;
        var d=document.getElementById("date").value;
        var name=document.getElementById("username").value;
        e.preventDefault();
            database.collection('Users').doc(id).update({
                email:e1,
                phoneNumber:ph,
                DOB:d,
                userName:name
            }).then(()=>{ 
                document.getElementById("emp").innerHTML='<div ><div class="alert alert-success"  role="alert"><h6 style="text-align:center;"> Updated Successfully </h6> </div></div>'

            })
            .catch((error)=>{   
                 document.getElementById("emp").innerHTML='<div ><div class="alert alert-danger"   role="alert"><h6 style="text-align:center;"> Error Occured  </h6> </div></div>'
        });
        
    })}})})
    