const database=firebase.firestore();
const user=database.collection('Users');
    var tbody = document.getElementById('tbody');
    function findUserByEmail1(state, callBack, fallBack) {
        database.collection("Users").where("role", "==", state)
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
        findUserByEmail1("user" ,function (arr) {
            // console.log(arr[0]['email']);
            var tr ='';
            var element='';
            //console.log(arr);
            for (let i = 0; i < arr.length; i++) {    
                tr += "<tr><td><img src="+ arr[i]['profileImg'] +" width=40% height=30%/></td><td>" + arr[i]['userName']+ "</td><td>" +arr[i]['email'] + "</td><td><a  id='profile"+i+ "' href=''>Show Profile</a></td><td><a  id='getid"+i+ "' href=''>get all orders</a></td></tr>";
                database.collection("Users").where("email", "==", arr[i]['email']).get()
            .then((querySnapshot) =>{
            querySnapshot.forEach((doc) => {
            console.log(document.getElementById('getid'+i));       
            const database=firebase.firestore();
               // element=doc.id;
                document.getElementById("getid"+i).addEventListener("click",e=>{
                console.log(doc.id);
                e.preventDefault();
                document.getElementById("getid"+i).href="get_user_order.html?id='"+doc.id+"'";
                console.log(document.getElementById("getid"+i));
                window.location.href = "get2.html?id="+doc.id
            })
            document.getElementById("profile"+i).addEventListener("click",e=>{
                console.log(doc.id);
                e.preventDefault();
                document.getElementById("profile"+i).href="profile.html?id='"+doc.id+"'";
                console.log(document.getElementById("profile"+i));
                window.location.href = "profile.html?id="+doc.id+"&data="+doc.data()
            })
            
            })
                
    
            });
        }

         
        
            tbody.innerHTML += tr;
          
           
        console.log("true");
    },function (error) {
        console.log("fail");
    })
    }

    test4();
    document.getElementById("search").addEventListener("click",e=>{
        // e.preventDefault();
         var search_name=document.getElementById("sr").value;
         var tbody1 = document.getElementById('tbody');
         function findUserByEmail1(state, callBack, fallBack) {
            database.collection("Users").where("role", "==", state)
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
      
        function test5() {
            findUserByEmail1("user" ,function (arr) {
                // console.log(arr[0]['email']);
                var tr1=""
                var element='';
                //console.log(arr);
                for (let i = 0; i < arr.length; i++) { 
                if(arr[i]['userName'].toLowerCase().startsWith(search_name.toLowerCase())){   
                    tr1 += "<tr><td><img src="+ arr[i]['profileImg'] +" width=40% height=30%/></td><td>" + arr[i]['userName']+ "</td><td>" +arr[i]['email'] + "</td><td><a  id='profile"+i+ "' href=''>Show Profile</a></td><td><a  id='getid"+i+ "' href=''>get all orders</a></td></tr>";
                    database.collection("Users").where("email", "==", arr[i]['email']).get()
                .then((querySnapshot) =>{
                querySnapshot.forEach((doc) => {
                console.log(document.getElementById('getid'+i));       
                const database=firebase.firestore();
                   // element=doc.id;
                    document.getElementById("getid"+i).addEventListener("click",e=>{
                    console.log(doc.id);
                    e.preventDefault();
                    document.getElementById("getid"+i).href="get_user_order.html?id='"+doc.id+"'";
                    console.log(document.getElementById("getid"+i));
                    window.location.href = "get2.html?id="+doc.id
                })
                document.getElementById("profile"+i).addEventListener("click",e=>{
                    console.log(doc.id);
                    e.preventDefault();
                    document.getElementById("profile"+i).href="profile.html?id='"+doc.id+"'";
                    console.log(document.getElementById("profile"+i));
                    window.location.href = "profile.html?id="+doc.id+"&data="+doc.data()
                })
                
                })
                    
        
                });
                
            }
            
        }
        
        if(tr1 ==''){
            document.getElementById("emp").innerHTML="<h4 style='text-align:center;color:gold;'>No Result</h4>"

        }
                tbody1.innerHTML = tr1;
              
               
            console.log("true");
        },function (error) {
            console.log("fail");
        })
        }
    
        test5();
    })