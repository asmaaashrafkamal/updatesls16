function geturl(){
    queryString= window.location.search
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    console.log(id);
    if(id!=null  ){
    test4(id);
    }else{
    console.log("null");
    }
    }
    var tr='';
    const database=firebase.firestore();
    var tbody = document.getElementById('tbody');
    function findUserByEmail1(state, callBack, fallBack) {
        database.collection("Users").where("confirmState", "==", state)
        .get()
        .then(function(result) {
            var arr = [];
            result.forEach(function(doc) {
                arr.push(doc.data());
            });
            callBack(arr);
        })
        .catch(function(error) {
            console.log(error);
            fallBack();
        });
}
    
    
function test4(id) {
    findUserByEmail1("confirmed", function(arr) {
        var tr ='';
            var tr1='';
            var element='';
            var s=[];
            var n=[];
            console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        database.collection("Users").where("email", "==", arr[i]['email']).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.id==id){
                   console.log(doc.data())
                   document.getElementById("username").innerText=doc.data().userName;  
                   document.getElementById("email1").innerText="Email :-";    
                   document.getElementById("email").innerText=doc.data().email;
                   document.getElementById("image1").src=doc.data().profileImg; 
                   if(doc.data().phoneNumber !=""){   
                    document.getElementById("phone1").innerText="Phone Number :-" 
                   document.getElementById("phone").innerText="Phone Number :"+doc.data().phoneNumber
                   }if(doc.data().adress !=""){
                    document.getElementById("address1").innerText="Shipping Address :-";
                   document.getElementById("address").innerText=doc.data().adress;
                   }
                   if(doc.data().DOB !=""){
                    document.getElementById("birthdate1").innerText="Date OF Birth :-";
                   document.getElementById("birthdate").innerText=doc.data().DOB;
                   }
                   if(doc.get("paymentDetails")){
                   if(doc.data().paymentDetails.PayPalAccount !=""){
                    document.getElementById("details").innerText="Payment Details :-";
                    document.getElementById("PayPalAccount").innerText="PayPal Account :"+doc.data().paymentDetails.PayPalAccount;
                    if(doc.data().paymentDetails.IBAN){
                        document.getElementById("IBAN").innerText="IBAN :"+doc.data().paymentDetails.IBAN;
                        }
                    }}
                    document.getElementById("edit").href="change1.php?id="+doc.id;
                    document.getElementById("update").href="update_data.html?id="+doc.id;



                }
            })})  
      }
    
        console.log("true");
    },function (error) {
        console.log("fail");
    })
    }

    geturl();
    
      