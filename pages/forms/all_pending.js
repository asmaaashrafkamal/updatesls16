const database=firebase.firestore();
const user=database.collection('Users');
    var tbody = document.getElementById('tbody');
    function findUserByEmail1(state, callBack, fallBack) {
        database.collection("Users").where("confirmState", "==", state)
        .get()
        .then(function(result) {
            var arr=[];
            result.forEach(function(doc) {
                arr.push(doc.data());
                // console.log(arr); // for test
            });
            callBack(arr);
        })
        .catch(function(error) {
            console.log(error);
            fallBack();
        });
    }
  
    function test4() {
        findUserByEmail1("pending" ,function (arr) {
            // console.log(arr[0]['email']);
            var tr ='';
            var element='';
            console.log(arr);
            if(arr.length==0){
                document.getElementById("emp").innerHTML="<h3 style='text-align:center;color:gold;'>No Pending Users Found</h3>"
    
            // tr1=""
            }else{
            for (let i = 0; i < arr.length; i++) {    
            tr += "<tr><td>" + arr[i]['userName']+ "</td><td>" +arr[i]['email'] + "</td><td>" +arr[i]['confirmState'] + "</td><td>" +arr[i]['role'] + "</td><td><form><button type='submit' style='text-align:center;' class='btn btn-danger' value=''  id='delete"+i+ "' name='delete' >Confirm</button></form></td><td><form><button type='submit' style='text-align:center;' class='btn btn-danger' value=''  id='super"+i+ "' name='super' >Confirm As Super User</button><form></td><td><form><button type='submit' style='text-align:center;' class='btn btn-danger' value=''  id='rej"+i+ "' name='super' >Reject</button><form></td></tr>";
            database.collection("Users").where("email", "==", arr[i]['email']).get()
            .then((querySnapshot) =>{
            querySnapshot.forEach((doc) => {
             document.getElementById('delete'+i).value =doc.id;
           //  element=doc.id;
            console.log(document.getElementById('delete'+i));
               
            const database=firebase.firestore();
                element=doc.id;
                document.getElementById("delete"+i).addEventListener("click",e=>{
                console.log(doc.id);
                e.preventDefault();
                 database.collection('Users').doc(doc.id).update({
                    confirmState:"confirmed"
                }).then(()=>{ window.location.href = "all_pending.html"; })
                .catch((error)=>{console.error(error)});
        
            })
            document.getElementById("super"+i).addEventListener("click",e=>{
                console.log(doc.id);
                e.preventDefault();
                 database.collection('Users').doc(doc.id).update({
                    role:"SuperUser",
                    confirmState:"confirmed"
                }).then(()=>{ window.location.href = "all_pending.html"; })
                .catch((error)=>{console.error(error)});
        
            })


            document.getElementById("rej"+i).addEventListener("click",e=>{
                e.preventDefault();
                database.collection('Users').doc(doc.id).delete().then(()=>{ window.location.href = "all_pending.html"; })
                .catch((error)=>{console.error(error)});
            })
                
            })
            });
          
     
          
        }
    }
         
        
            tbody.innerHTML += tr;
          
           
        console.log("true");
    },function (error) {
        console.log("fail");
    })
    }

    test4();