const database=firebase.firestore();
const user=database.collection('Users');
var tbody = document.getElementById('tbody');
    function findUserByEmail1( callBack, fallBack) {
        database.collection("Users")
        .get()
        .then(function(result) {
            var arr=[];
            var all_id=[];
            result.forEach(function(doc) {
                if(doc.data().role=="seller"||doc.data().role=="SuperUser"){
                all_id.push(doc.id);
                arr.push(doc.data());
            }
            console.log(arr); 
            });
            callBack(arr,all_id);
        })
        .catch(function(error) {
            console.log(error);
            fallBack();
        });
    }
    function test4() {
        findUserByEmail1(function (arr,all_id) {
            var tr ='';
            var element='';
            var post_live=[]
        if(arr.length==0){
            document.getElementById("emp").innerHTML="<h3 style='text-align:center;color:gold;'>No Seller/Admins Found</h3>"
        }else{
                // console.log(post_live)
        database.collection("Posts").get()
        .then((querySnapshot1) =>{
            if (!querySnapshot1.empty) {

                querySnapshot1.forEach((doc1) => {
                if(doc1.data().postType=="TextPostWithLive" && doc1.data().context.live==true){  
                    console.log(post_live) 
                    // console.log(all_id)  
                 
                for (let i = 0; i < all_id.length; i++) {   
                    if(doc1.data().uid==all_id[i]){
                        console.log(all_id[i])
                        post_live.push(doc1.data().uid) 
                        tr += "<tr><td><img src="+ arr[i]['profileImg'] +" width=40% height=30%/></td><td>" + arr[i]['userName']+ "</td><td>" +arr[i]['email'] + "</td><td><h6  >in Live Now</h6></td></tr>"; 
                    }
                }
                console.log(post_live)
            }
        })
        }else{
            document.getElementById("emp").innerHTML="<h3 style='text-align:center;color:gold;'>No One Live Now</h3>"
        }
        console.log(post_live)
        if(post_live.length==0){
            document.getElementById("emp").innerHTML="<h3 style='text-align:center;color:gold;'>No One Live Now</h3>"

        }
        tbody.innerHTML += tr; 

      })//end for2
     }
        
        console.log("true");
    },function (error) {
        console.log("fail");
    })
    }

    test4();
   