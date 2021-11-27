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
    findUserByEmail1("seller", function(arr) {
        // console.log(arr[0]['email']);
        var tr = '';
        var element = '';
        //console.log(arr);
        var p1=[];
        var p2=[];
        database.collection("Payouts").orderBy('time', 'desc').get()
        .then((querySnapshot2) => {
            if (!querySnapshot2.empty) {
            querySnapshot2.forEach((doc4) => {
               if(p1.length==0){
                 p1.push(doc4.data().userInfo.uid)
                 p2.push(doc4.data())
               }else{
                   if(!p1.includes(doc4.data().userInfo.uid)){
                    p1.push(doc4.data().userInfo.uid)
                    p2.push(doc4.data())
                   }
               }
            })
            // console.log("p1")
            // console.log(p1)
            // console.log("p2")
            // console.log(p2)
            // console.log(p2[0]["time"]["seconds"])
        }})
        if (arr.length == 0) {
            document.getElementById("emp").innerHTML = "<h3 style='text-align:center;color:gold;'>No Seller Found</h3>"

            // tr1=""
        } else {
            for (let i = 0; i < arr.length; i++) {
                tr += "<tr><td><img src=" + arr[i]['profileImg'] + " width=40% height=30%/></td><td>" + arr[i]['userName'] + "</td><td>" + arr[i]['email'] + "</td><td  id='price"+i+ "'></td><td  id='state"+i+ "'></td></tr>";
            
             database.collection("Users").where("email", "==", arr[i]['email']).get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                var price = 0
                                var n = []
                                var f=[]
                                // console.log(doc.id);
                               const database = firebase.firestore();
                                database.collection("Users").doc(doc.id).collection('Orders').get()
                                    .then((querySnapshot) => {
                                        if (!querySnapshot.empty) {
                                            //for cond
                                           if(p1.length !=0){
                                            if(p1.includes(doc.id)){
                                                const index = p1.indexOf(doc.id);
                                            querySnapshot.forEach((doc2) => {
                                                if(p2[index]["time"]["seconds"] < doc2.data().orderTime.seconds &&doc2.data().orderState=="Shipped"){
                                                        console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                price += parseFloat(doc2.data().orderTotalPrice)}
                                            else{
                                                console.log("not gree with condition")
                                                console.log("id",doc.id)
                                                console.log("time payout",p2[index]["time"]["seconds"])
                                                console.log("time order", doc2.data().orderTime.seconds) 
                                            }
                                            })
                                            n.push(price)
                                            document.getElementById("price"+i).innerText = price*0.05;
                                            document.getElementById("state"+i).innerText =p2[index]["state"] ;

                                            console.log(n)
                                            price=0;
                                            console.log("-------------------------------------------------------")

                                                
                                        // }
                                    }else {
                                            querySnapshot.forEach((doc2) => {
                                                if(doc2.data().orderState=="Shipped"){
                                                    console.log(doc2.id)

                                                    console.log(doc2.data())
                                                    console.log("----------------------")

                                            price += parseFloat(doc2.data().orderTotalPrice)}
                                        
                                        })
                                        n.push(price)
                                        document.getElementById("price"+i).innerText = price*0.05;
                                        document.getElementById("state"+i).innerText ="Not Payed Before" ;

                                        console.log(n)
                                        price=0;

                                        }
                                    }else{
                                            querySnapshot.forEach((doc2) => {
                                                    if(doc2.data().orderState=="Shipped"){
                                                        console.log(doc2.id)

                                                        console.log(doc2.data())
                                                        console.log("----------------------")

                                                price += parseFloat(doc2.data().orderTotalPrice)}
                                            
                                            })
                                            n.push(price)
                                            document.getElementById("price"+i).innerText = price*0.05;
                                            document.getElementById("state"+i).innerText ="Not Payed Before" ;

                                            console.log(n)
                                            price=0;

                                              
                                        }
                                        } else {
                                            console.log("no orders")
                                            document.getElementById("price"+i).innerText = "0" ;
                                            document.getElementById("state"+i).innerText ="Not Have Any Orders" ;

                                        }
                                    })
                                
                            })
                        
    
    
                        });
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
        findUserByEmail1("seller", function(arr) {
            // console.log(arr[0]['email']);
            var tr1 = '';
            var element = '';
            console.log(arr);
            if (arr.length == 0) {
                document.getElementById("emp").innerHTML = "<h3 style='text-align:center;color:gold;'>No Seller Found</h3>"

                // tr1=""
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]['userName'].toLowerCase().startsWith(search_name.toLowerCase())) {
                        tr1 += "<tr><td><img src=" + arr[i]['profileImg'] + " width=40% height=30%/></td><td>" + arr[i]['userName'] + "</td><td>" + arr[i]['email'] + "</td><td  id='price"+i+ "'></td></tr>";
                        database.collection("Users").where("email", "==", arr[i]['email']).get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                var price = 0
                                var n = []
                                // console.log(doc.id);
                                const database = firebase.firestore();
                                database.collection("Users").doc(doc.id).collection('Orders').get()
                                    .then((querySnapshot) => {
                                        if (!querySnapshot.empty) {
                                            database.collection("Payouts").orderBy('time', 'desc').get()
                                            .then((querySnapshot2) => {
                                                if (!querySnapshot2.empty) {
                                                    
                                                querySnapshot2.forEach((doc4) => {
                                              if(doc4.data().userInfo.uid==doc.id){
                                            querySnapshot.forEach((doc2) => {
                                                console.log(doc4.data())
                                                console.log(doc2.data())
                                                if(doc4.data().time.seconds <= doc2.data().orderTime.seconds){
                                                    if(doc2.data().orderState=="Shipped"){
                                                price += parseFloat(doc2.data().orderTotalPrice)}}
                                            })
                                            n.push(price)
                                            document.getElementById("price"+i).innerText = price*0.05;
                                            console.log(n)
                                                 }
                                                 })
                                          }else {
                                            console.log("no orders")
                                            document.getElementById("price"+i).innerText = "0" ;
                                        }
                                          })
                                        } else {
                                            console.log("no orders")
                                            document.getElementById("price"+i).innerText = "0" ;
                                        }
                                    })
    
                            })
    
    
    
                        });
                    }
                }


            }
            if (tr1 == '') {
                document.getElementById("emp").innerHTML = "<h4 style='text-align:center;color:gold;'>No Result</h4>"

            }
            tbody1.innerHTML = tr1;


            console.log("true");
        }, function(error) {
            console.log("fail");
        })
    }
    test5()
})