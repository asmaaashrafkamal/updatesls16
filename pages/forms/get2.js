function geturl(url){
    queryString= url;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    const orderNo = urlParams.get('orderNo')
    console.log(id);
    if(id!=null){
    test4(id);
    }else{
    console.log("null");
    }
    }
    var tr='';
    const database=firebase.firestore();
    const user=database.collection('Users');
    var tbody = document.getElementById('tbody');
    var tbody1 = document.getElementById('tbody1');
    
    function findUserByEmail1( id,callBack, fallBack) {
        console.log(id);
        database.collection('Users').doc(id).collection('Orders').orderBy('orderTime', 'desc')
        .get().then(function(result2) {
            var arr=[];
            console.log("skksaosa");
            result2.forEach(function(doc1){
                console.log("skksaosa");
                arr.push(doc1.data());
                 console.log(arr); // for test
            });
            callBack(arr);
        })
        .catch(function(error) {
            console.log(error);
            fallBack();
        });}

    function test4(id) {
        findUserByEmail1(id,function (arr) {
            var tr ='';
            var tr1='';
            var element='';
            var s=[];
            console.log(arr);
            if(arr.length==0){
                document.getElementById("emp").innerHTML="<h3 style='text-align:center;color:gold;'>No Orders Found</h3>"
            // tr1=""
            }else{
            database.collection("Users").doc(id).collection('Orders').orderBy('orderTime', 'desc').get()
            .then((querySnapshot) =>{
            querySnapshot.forEach((doc) => {
             s.push(doc.id)
            })})
        for(let i=0;i<arr.length;i++){
          
            if((arr[i]['orderState']=="Pending" ||arr[i]['orderState']=="Accepted")){
                tr1 += "<tr><td><img src='' id='im"+i+ "'  width=40% height=30%/></td><td id='name"+i+ "'></td><td>" + arr[i]['orderNo']+ "</td><td>Pending</td><td>" +arr[i]['orderTotalPrice'] + "€</td><td><form><div  style='width:200px;'><select  id='sel"+i+ "' ><option disabled selected hidden>Select State:</option><option value='1'>Pending</option><option value='2'>Shipped</option><option value='3'>Canceled</option></select></div> <br><br>"
               tr1+="<button type='submit' style='text-align:center;' class='btn btn-danger' value=''  id='getid"+i+ "' name='getid' >Change State</button></form></td></tr>";
             }else{
                 tr1 += "<tr><td><img src='' id='im"+i+ "'  width=40% height=30%/></td><td id='name"+i+ "'></td><td>" + arr[i]['orderNo']+ "</td><td>" +arr[i]['orderState'] + "</td><td>" +arr[i]['orderTotalPrice'] + "€</td><td><form><div  style='width:200px;'><select  id='sel"+i+ "' ><option disabled selected hidden>Select State:</option><option value='1'>Pending</option><option value='2'>Shipped</option><option value='3'>Canceled</option></select></div> <br><br>"
                 tr1+="<button type='submit' style='text-align:center;' class='btn btn-danger' value=''  id='getid"+i+ "' name='getid' >Change State</button></form></td></tr>";
             }
             if(tr1 !=''){
                console.log("tooo")
                database.collection("Users").get()
                .then((querySnapshot2) =>{
                querySnapshot2.forEach((doc3) => {
                    if(doc3.id==arr[i]['sellerID']){
                    console.log(arr[i]['sellerID'],doc3.data().profileImg)
                    document.getElementById('im'+i).src=doc3.data().profileImg;
                    document.getElementById('name'+i).innerText=doc3.data().userName;
        
                 } })})
            console.log(arr[i]['userInfo']['userID']);
            database.collection("Users").doc(id).collection('Orders').get()
            .then((querySnapshot) =>{
                document.getElementById('getid'+i).value =s[i];
                document.getElementById("getid"+i).addEventListener("click",e=>{
                    e.preventDefault();
                    if(document.getElementById("sel"+i).value==1){ 
                        console.log(document.getElementById('getid'+i));
                        database.collection('Users').doc(arr[i]['sellerID']).collection('Orders').doc(document.getElementById('getid'+i).value).update({
                            orderState:"Pending"
                        }).then(()=>{
                        database.collection('Users').doc(id).collection('Orders').doc(document.getElementById('getid'+i).value).update({
                            orderState:"Pending"
                        }).then(()=>{ window.location.href = "get2.html?id="+id})
                        .catch((error)=>{console.error(error)});
                    })
                    }
                    if(document.getElementById("sel"+i).value==2){
                        console.log(document.getElementById('getid'+i));
                        database.collection('Users').doc(arr[i]['sellerID']).collection('Orders').doc(document.getElementById('getid'+i).value).update({
                            orderState:"Shipped"
                        }).then(()=>{
                        database.collection('Users').doc(id).collection('Orders').doc(document.getElementById('getid'+i).value).update({
                            orderState:"Shipped"
                        }).then(()=>{ window.location.href = "get2.html?id="+id})
                        .catch((error)=>{console.error(error)});
                    })
                    }if(document.getElementById("sel"+i).value==3){
                        console.log(document.getElementById('getid'+i));
                        database.collection('Users').doc(arr[i]['sellerID']).collection('Orders').doc(document.getElementById('getid'+i).value).update({
                            orderState:"Canceled"
                        }).then(()=>{
                        database.collection('Users').doc(id).collection('Orders').doc(document.getElementById('getid'+i).value).update({
                            orderState:"Canceled"
                        }).then(()=>{ window.location.href = "get2.html?id="+id})
                        .catch((error)=>{console.error(error)});
                    })
                    }
                    })
                })
        
       
            }}
        }
    tbody1.innerHTML += tr1;
    console.log("true");
    },function (error) {
        console.log("fail");
    })
    }
    geturl(window.location.search);
    var s=[];
    
      