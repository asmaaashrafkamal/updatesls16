const database = firebase.firestore();
const user = database.collection('Users');
var tbody = document.getElementById('tbody');

function findUserByEmail1(state, callBack, fallBack) {
    database.collection("Users").where("role", "==", state)
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
function test4() {
    findUserByEmail1("seller", function(arr) {
        var tr = '';
        var n=0
          var s=[]
        var element = '';
        console.log(arr);
        database.collection("Users").get()
        .then((querySnapshot13) => {
             s.push(querySnapshot13.size);


        })
      console.log(s)
        if (arr.length == 0) {
            document.getElementById("emp").innerHTML = "<h3 style='text-align:center;color:gold;'>No Sellers Found</h3>"
        } else {
            for (let i = 0; i < arr.length; i++) {
                tr += "<tr><td><img src=" + arr[i]['profileImg'] + " width=40% height=30%/></td><td>" + arr[i]['userName'] + "</td><td>" + arr[i]['email'] + "</td><td>" + arr[i]['role'] + "</td><td><form><button type='submit' style='text-align:center;' class='btn btn-danger' value=''  id='delete" + i + "' name='delete' >Change</button></form></td></tr>";
                database.collection("Users").where("email", "==", arr[i]['email']).get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            document.getElementById('delete' + i).value = doc.id;
                            element = doc.id;
                            document.getElementById("delete" + i).addEventListener("click", e => {
                                console.log(document.getElementById('delete' + i).value)
                               
                                e.preventDefault();
                                let confirmAction = confirm("Are you sure to convert this seller into user?");
                                if (confirmAction) {
                                    database.collection('Users').doc(doc.id).collection('Orders').get()
                                    .then((querySnapshot) => {
                                        var l1=[];
                                        if(querySnapshot.empty){
                                            database.collection('Users').doc(doc.id).update({
                                                role: "user"
                                            }).then(()=>{
                                            window.location.href = "changesellerintouser.html";
                                            })
                                        }else{
                                        querySnapshot.forEach((doc1) => {
                                         if(doc1.data().userInfo.userID!=""){
                                                l1.push(doc1.data())
                                        }
                                       })
                                       if(l1.length==0){
                                        database.collection('Users').doc(doc.id).update({
                                            role: "user"
                                        }).then(()=>{
                                        window.location.href = "changesellerintouser.html";
                                        })
                                       }
                                       if(l1.length!=0){
                                    // }).then(()=>{
                                    database.collection("Users").get()
                                        .then((querySnapshot1) => {
                                                querySnapshot1.forEach((doc1) => {
                                                    n=n+1
                                                    database.collection('Users').doc(doc1.id).collection('Orders').where("sellerID", "==", doc.id).get()
                                                    .then((querySnapshot) => {
                                                        if (querySnapshot.empty && n==s[0]) {
                                                            database.collection('Users').doc(doc.id).update({
                                                                role: "user"
                                                            }).then(()=>{
                                                            console.log(n)
                                                            
                                                            if((n!=querySnapshot.size&&n!=s[0])){
                                                                window.location.href = "changesellerintouser.html";
                                                
                                                            }
                                                       
                                                   })
                                                        }
                                                    else if (!querySnapshot.empty) {
                                                        console.log("kdkd111111")  
                                                        console.log(doc1.id)
                                                            querySnapshot.forEach((doc3) => {
                                                                console.log(doc3.id)
                                                                database.collection('Users').doc(doc1.id).collection('Orders').doc(doc3.id).delete();
                                                                console.log(doc3.id)
                                                                database.collection("Users").doc(doc.id).collection('Orders').get()
                                                                    .then((querySnapshot) => {
                                                                        querySnapshot.forEach((doc4) => {
                                                                            if (doc4.id == doc3.id) {
                                                                                database.collection('Users').doc(doc.id).collection('Orders').doc(doc4.id).delete().then(()=>{
                                                                                    console.log(querySnapshot1.size)
                                                                                    console.log(n)
                                                                                  if(n==querySnapshot1.size){
                                                                                        window.location.href = "changesellerintouser.html";
                            
                                                                                        }
                                                                               
                                                                           })

                                                                            }
                                                                        })
                                                                        database.collection('Users').doc(doc.id).update({
                                                                            role: "user"
                                                                        })

                                                                   })
                                                                   console.log(querySnapshot1.size)
           
                                                            })
                                                              
                                                          
                                                        } else {
                                                            console.log("kdkd22222")
                                                            if(n==s[0]){
                                                            database.collection('Users').doc(doc.id).update({
                                                                    role: "user"
                                                                }).then(()=>{
                                                                console.log(n)
                                                                
                                                                    // window.location.href = "changesellerintouser.html";
                                                    
                                                                    
                                                            
                                                           
                                                       })
                                                    }}
                                                  
                                                        })
                                                   
                                                })
                                            
                                        })}}
                                    })
                                }

                            })
                            // .then((querySnapshot) => {

                            //     window.location.href = "changesellerintouser.html";
        
                            // })
                        })
    


                    })


            }

        }

        tbody.innerHTML += tr;
        console.log("true");
    }, function(error) {
        console.log("fail");
    })
}

test4();

document.getElementById("search").addEventListener("click", e => {
    // e.preventDefault();
    var search_name = document.getElementById("sr").value;
    var tbody1 = document.getElementById('tbody');

    function findUserByEmail1(state, callBack, fallBack) {
        database.collection("Users").where("role", "==", state)
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

    function test4() {
        findUserByEmail1("seller", function(arr) {
            var tr1 = '';
            var element = '';
            console.log(arr);
            if (arr.length == 0) {
                document.getElementById("emp").innerHTML = "<h3 style='text-align:center;color:gold;'>No Sellers Found</h3>"

            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]['userName'].toLowerCase().startsWith(search_name.toLowerCase())) {
                        tr1 += "<tr><td><img src=" + arr[i]['profileImg'] + " width=40% height=30%/></td><td>" + arr[i]['userName'] + "</td><td>" + arr[i]['email'] + "</td><td>" + arr[i]['role'] + "</td><td><form><button type='submit' style='text-align:center;' class='btn btn-danger' value=''  id='delete" + i + "' name='delete' >Change</button></form></td></tr>";
                        database.collection("Users").where("email", "==", arr[i]['email']).get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                document.getElementById('delete' + i).value = doc.id;
                                element = doc.id;
                                document.getElementById("delete" + i).addEventListener("click", e => {
                                    console.log(document.getElementById('delete' + i).value)
                                   
                                    e.preventDefault();
                                    let confirmAction = confirm("Are you sure to convert this seller into user?");
                                    if (confirmAction) {
                                        database.collection('Users').doc(doc.id).collection('Orders').get()
                                        .then((querySnapshot) => {
                                            var l1=[];
                                            if(querySnapshot.empty){
                                                database.collection('Users').doc(doc.id).update({
                                                    role: "user"
                                                }).then(()=>{
                                                window.location.href = "changesellerintouser.html";
                                                })
                                            }else{
                                            querySnapshot.forEach((doc1) => {
                                             if(doc1.data().userInfo.userID!=""){
                                                    l1.push(doc1.data())
                                            }
                                           })
                                           if(l1.length==0){
                                            database.collection('Users').doc(doc.id).update({
                                                role: "user"
                                            }).then(()=>{
                                            window.location.href = "changesellerintouser.html";
                                            })
                                           }
                                           if(l1.length!=0){
                                        // }).then(()=>{
                                        database.collection("Users").get()
                                            .then((querySnapshot1) => {
                                                    querySnapshot1.forEach((doc1) => {
                                                        n=n+1
                                                        database.collection('Users').doc(doc1.id).collection('Orders').where("sellerID", "==", doc.id).get()
                                                        .then((querySnapshot) => {
                                                            if (querySnapshot.empty && n==s[0]) {
                                                                database.collection('Users').doc(doc.id).update({
                                                                    role: "user"
                                                                }).then(()=>{
                                                                console.log(n)
                                                                
                                                                if((n!=querySnapshot.size&&n!=s[0])){
                                                                    window.location.href = "changesellerintouser.html";
                                                    
                                                                }
                                                           
                                                       })
                                                            }
                                                        else if (!querySnapshot.empty) {
                                                            console.log("kdkd111111")  
                                                            console.log(doc1.id)
                                                                querySnapshot.forEach((doc3) => {
                                                                    console.log(doc3.id)
                                                                    database.collection('Users').doc(doc1.id).collection('Orders').doc(doc3.id).delete();
                                                                    console.log(doc3.id)
                                                                    database.collection("Users").doc(doc.id).collection('Orders').get()
                                                                        .then((querySnapshot) => {
                                                                            querySnapshot.forEach((doc4) => {
                                                                                if (doc4.id == doc3.id) {
                                                                                    database.collection('Users').doc(doc.id).collection('Orders').doc(doc4.id).delete().then(()=>{
                                                                                        console.log(querySnapshot1.size)
                                                                                        console.log(n)
                                                                                      if(n==querySnapshot1.size){
                                                                                            window.location.href = "changesellerintouser.html";
                                
                                                                                            }
                                                                                   
                                                                               })
    
                                                                                }
                                                                            })
                                                                            database.collection('Users').doc(doc.id).update({
                                                                                role: "user"
                                                                            })
    
                                                                       })
                                                                       console.log(querySnapshot1.size)
               
                                                                })
                                                                  
                                                              
                                                            } else {
                                                                console.log("kdkd22222")
                                                                if(n==s[0]){
                                                                database.collection('Users').doc(doc.id).update({
                                                                        role: "user"
                                                                    }).then(()=>{
                                                                    console.log(n)
                                                                    
                                                                        // window.location.href = "changesellerintouser.html";
                                                        
                                                                        
                                                                
                                                               
                                                           })
                                                        }}
                                                      
                                                            })
                                                       
                                                    })
                                                
                                            })}}
                                        })
                                    }
    
                                })
                                // .then((querySnapshot) => {
    
                                //     window.location.href = "changesellerintouser.html";
            
                                // })
                            })
        
    
    
                        })

                    }


                }
                if (tr1 == '') {
                    document.getElementById("emp").innerHTML = "<h4 style='text-align:center;color:gold;'>No Result</h4>"

                }

            }

            tbody1.innerHTML = tr1;
            console.log("true");
        }, function(error) {
            console.log("fail");
        })
    }

    test4();

})

//delete ......
// database.collection("Users").doc("l6c1TwqxdDSAV1sH50lI9CtwLTf1").collection('Orders').get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc1) => {
//             database.collection('Users').doc("l6c1TwqxdDSAV1sH50lI9CtwLTf1").collection('Orders').doc(doc1.id).delete();
//         })
//     })
// database.collection("Users").doc("xKYU1Aq9Q1ZZcJl8VIyBfl8H54h2").collection('engagedChatChannels').get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc2) => {
//             database.collection('Users').doc("xKYU1Aq9Q1ZZcJl8VIyBfl8H54h2").collection('engagedChatChannels').doc(doc2.id).delete();
//             database.collection('Users').doc(doc.id).collection('engagedChatChannels').delete();

//         })
//     })

// database.collection("Users").get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc2) => {
//             if (doc2.data().followers != null && doc2.data().followers.length != 0) {
//                 for (var n = 0; n < doc2.data().followers.length; n++) {
//                     if (doc2.data().followers[n] == "l6c1TwqxdDSAV1sH50lI9CtwLTf1") {
//                         database.collection('Users').doc(doc2.id).update({
//                             "followers": firebase.firestore.FieldValue.arrayRemove(doc2.data().followers[n]),
//                             "following": firebase.firestore.FieldValue.arrayRemove(doc2.data().followers[n])

//                         })
//                         console.log(doc2.data())

//                     }
//                 }

//             }
//         })
//     })
// database.collection('Users').doc("l6c1TwqxdDSAV1sH50lI9CtwLTf1").delete().then(() => {
//         // window.location.href = "all_confirmed.html"; 
//     })
//     .catch((error) => { console.error(error) });
// database.collection("Users").get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {

//             database.collection('Users').doc(doc.id).collection('Orders').where("sellerID", "==", doc.id).get()
//                 .then((querySnapshot) => {
//                     querySnapshot.forEach((doc3) => {
//                         console.log(doc3.data());
//                     })


//                 })
//         })
//     })