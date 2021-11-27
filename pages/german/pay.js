const database = firebase.firestore();
const user = database.collection('Users');
var tbody = document.getElementById('tbody');

function findUserByEmail1( callBack, fallBack) {
    database.collection("Users")
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
    findUserByEmail1( function(arr) {
        // console.log(arr[0]['email']);
        var tr = '';
        var element = '';
        //console.log(arr);
        var p1=[];
        var p2=[];
        var total=[]
        var total1=[]
        var total_all=[]
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
        }})
        if (arr.length == 0) {
            document.getElementById("emp").innerHTML = "<h3 style='text-align:center;color:gold;'>Kein Verkäufer gefunden</h3>"

            // tr1=""
        } else {
            for (let i = 0; i < arr.length; i++) {
                if(arr[i]['role']=="seller" ||arr[i]['role']=="SuperUser"){
                    // tr += "<tr><td><img src=" + arr[i]['profileImg'] + " width=40% height=30%/></td><td>" + arr[i]['userName'] + "</td><td>" + arr[i]['email'] + "</td><td  id='price"+i+ "'></td><td  id='state"+i+ "'></td></tr>";
            
             database.collection("Users").where("email", "==", arr[i]['email']).get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                var price = 0
                                var n = []
                                var pay=[]
                                var notpay=[]
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
                                                if(p2[index]["time"]["seconds"] < doc2.data().orderTime.seconds &&doc2.data().userInfo.userID!="" &&(doc2.data().orderState!="Canceled")){
                                                        console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                price += parseFloat(doc2.data().orderTotalPrice)
                                            }
                                           
                                            })
                                            n.push(price)
                                            console.log(doc.id)
                                            console.log(n)
                                            if(price*0.05==0){
                                            pay.push(arr[i]['profileImg'],arr[i]['userName'], arr[i]['email'],price*0.05,"Bezahlt",doc.id)
                                           }else{
                                            notpay.push(arr[i]['profileImg'],arr[i]['userName'], arr[i]['email'],price*0.05,"Nicht bezahlt",doc.id)
                                        }
                                            console.log(n)
                                            console.log("payed")
                                            console.log(pay)
                                            if(pay.length!=0){
                                            total.push(pay);
                                            total_all.push(pay);

                                        }
                                            console.log("not payed")
                                            console.log(notpay)
                                            if(notpay.length!=0){
                                                total1.push(notpay);
                                                total_all.push(notpay);

                                            }
                                            price=0;
                                            console.log("-------------------------------------------------------")
                                    }else {
                                            querySnapshot.forEach((doc2) => {
                                                if(doc2.data().userInfo.userID!="" &&doc2.data().orderState!="Canceled"){
                                            price += parseFloat(doc2.data().orderTotalPrice)}
                                        })
                                        n.push(price)
                                        if(price*0.05==0){
                                        }else{
                                            notpay.push(arr[i]['profileImg'],arr[i]['userName'], arr[i]['email'],price*0.05,"Nicht bezahlt ",doc.id)
                                           }
                                        console.log(notpay)
                                        if(notpay.length!=0){
                                            total1.push(notpay);
                                            total_all.push(notpay);

                                        }
                                        console.log(n)
                                        price=0;

                                        }
                                    }else{
                                            querySnapshot.forEach((doc2) => {
                                                if(doc2.data().userInfo.userID!="" &&doc2.data().orderState!="Canceled"){
                                                    console.log(doc2.id)

                                                        console.log(doc2.data())
                                                        console.log("----------------------")

                                                price += parseFloat(doc2.data().orderTotalPrice)}
                                            
                                            })
                                            n.push(price)
                                            console.log(n)
                                            price=0;

                                              
                                        }
                                        } else {
                                            console.log("no orders")
                                            // document.getElementById("price"+i).innerText = "0.00" ;
                                            // document.getElementById("state"+i).innerText ="Not Have Any Orders" ;

                                        }
                                        if (total1.length == 0) {
                                            tbody.innerHTML = "<h3 style='text-align:center;color:gold;'>Niemand hat bezahlt</h3>"
                                
                                            // tr1=""
                                        } else {
                                            var tr=""
                                            for (let i = 0; i < total_all.length; i++) {
                                                if(total_all[i][4]=="Bezahlt"){
                                                    tr += "<tr><td><img src=" + total_all[i][0] + " width=40% height=30%/></td><td>" +total_all[i][1] + "</td><td>" + total_all[i][2] + "</td><td><h4 style='color:green'>"+total_all[i][3].toFixed(2)+"€</h4></td><td><h4 style='color:green'>"+total_all[i][4]+"</h4></td><td><a  href='history-paytoapp.html?id="+total_all[i][5]+"' >history pay to app</a></td></tr>";
                                                }else{
                                                 tr += "<tr><td><img src=" + total_all[i][0] + " width=40% height=30%/></td><td>" +total_all[i][1] + "</td><td>" + total_all[i][2] + "</td><td><h4 style='color:red'>"+total_all[i][3].toFixed(2)+"€</h4></td><td><h4 style='color:red'>"+total_all[i][4]+"</h4></td><td><a  href='history-paytoapp.html?id="+total_all[i][5]+"' >history pay to app</a></td></tr>";

                                                }                                              }  
                                            tbody.innerHTML = tr;

                                        }    
                                        console.log("total",total)
                                        console.log(total1)
                                         document.getElementById("sell").innerHTML='<select class="custom-select" id="gender2"><option value=""  disabled selected hidden> wählen  </option><option value="all">Alle</option><option value="pay">Zahlen</option><option value="notpay">nicht zahlen</option></select>';
                                         document.getElementById("gender2").addEventListener("click",e=>{
                                            console.log(document.getElementById("gender2").value);
                                            e.preventDefault();
                                            var tr2=''
                                            if(document.getElementById("gender2").value=="pay"){
                                            if (total.length == 0) {
                                                tbody.innerHTML = "<h3 style='text-align:center;color:gold;'>Kein Verkäufer gefunden</h3>"
                                    
                                                // tr1=""
                                            } else {
                                                
                                                for (let i = 0; i < total.length; i++) {
                                                    tr2 += "<tr><td><img src=" + total[i][0] + " width=40% height=30%/></td><td>" +total[i][1] + "</td><td>" + total[i][2] + "</td><td><h4 style='color:green'>"+total[i][3].toFixed(2)+"€</h4></td><td><h4 style='color:green'>"+total[i][4]+"</h4></td><td><a  href='history-paytoapp.html?id="+total_all[i][5]+"' >history pay to app</a></td></tr>";
                                                }  
                                                tbody.innerHTML = tr2;

                                            }        }   
                                            if(document.getElementById("gender2").value=="notpay"){
                                                if (total1.length == 0) {
                                                    tbody.innerHTML = "<h3 style='text-align:center;color:gold;'>Kein Verkäufer gefunden</h3>"
                                        
                                                    // tr1=""
                                                } else {
                                                    
                                                    for (let i = 0; i < total1.length; i++) {
                                                        tr2 += "<tr><td><img src=" + total1[i][0] + " width=40% height=30%/></td><td>" +total1[i][1] + "</td><td>" + total1[i][2] + "</td><td><h4 style='color:red'>"+total1[i][3].toFixed(2)+"€</h4></td><td><h4 style='color:red'>"+total1[i][4]+"</h4></td><td><a  href='history-paytoapp.html?id="+total_all[i][5]+"' >history pay to app</a></td></tr>";
                                                    }  
                                                    tbody.innerHTML = tr2;
    
                                                }        }  
                                                if(document.getElementById("gender2").value=="all"){
                                                    if (total1.length == 0) {
                                                        tbody.innerHTML = "<h3 style='text-align:center;color:gold;'>Niemand hat bezahlt</h3>"                                            
                                                    } else {
                                                        
                                                        for (let i = 0; i < total_all.length; i++) {
                                                            if(total_all[i][4]=="Bezahlt"){
                                                                tr2 += "<tr><td><img src=" + total_all[i][0] + " width=40% height=30%/></td><td>" +total_all[i][1] + "</td><td>" + total_all[i][2] + "</td><td><h4 style='color:green'>"+total_all[i][3].toFixed(2)+"€</h4></td><td><h4 style='color:green'>"+total_all[i][4]+"</h4></td><td><a  href='history-paytoapp.html?id="+total_all[i][5]+"' >history pay to app</a></td></tr>";
                                                            }else{
                                                             tr2 += "<tr><td><img src=" + total_all[i][0] + " width=40% height=30%/></td><td>" +total_all[i][1] + "</td><td>" + total_all[i][2] + "</td><td><h4 style='color:red'>"+total_all[i][3].toFixed(2)+"€</h4></td><td><h4 style='color:red'>"+total_all[i][4]+"</h4></td><td><a  href='history-paytoapp.html?id="+total_all[i][5]+"' >history pay to app</a></td></tr>";
            
                                                            }                                                          }  
                                                        tbody.innerHTML = tr2;
        
                                                    }        }                       
                                        })
                                    })
                               
                            })
                        
    
    
                        });
            }}

        }

        // tbody.innerHTML += tr;


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

    function findUserByEmail1( callBack, fallBack) {
        database.collection("Users")
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

    function test5() {
        findUserByEmail1(function(arr) {
            // console.log(arr[0]['email']);
            var tr1 = '';
            var element = '';
            //console.log(arr);
            var p1=[];
            var p2=[];
            var total=[]
            var total1=[]
            var total_all=[]
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
            }})
            if (arr.length == 0) {
                document.getElementById("emp").innerHTML = "<h3 style='text-align:center;color:gold;'>No Seller/Admin Found</h3>"

                // tr1=""
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]['userName'].toLowerCase().startsWith(search_name.toLowerCase())) {
                        if(arr[i]['role']=="seller" ||arr[i]['role']=="SuperUser"){
                            tr1 += "<tr><td><img src=" + arr[i]['profileImg'] + " width=40% height=30%/></td><td>" + arr[i]['userName'] + "</td><td>" + arr[i]['email'] + "</td><td  id='price"+i+ "'></td><td  id='state"+i+ "'></td></tr>";
                    
                     database.collection("Users").where("email", "==", arr[i]['email']).get()
                                .then((querySnapshot) => {
                                    querySnapshot.forEach((doc) => {
                                        var price = 0
                                        var n = []
                                        var pay=[]
                                        var notpay=[]
                                       const database = firebase.firestore();
                                       database.collection("Users").where("email", "==", arr[i]['email']).get()
                                       .then((querySnapshot) => {
                                           querySnapshot.forEach((doc) => {
                                               var price = 0
                                               var n = []
                                               var pay=[]
                                               var notpay=[]
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
                                                               if(p2[index]["time"]["seconds"] < doc2.data().orderTime.seconds &&doc2.data().userInfo.userID!="" &&(doc2.data().orderState!="Canceled")){
                                                                    console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                                    price += parseFloat(doc2.data().orderTotalPrice)
                                                           }
                                                          
                                                           })
                                                           n.push(price)
                                                           console.log(doc.id)
                                                           console.log(n)
                                                           if(price*0.05==0){
                                                           pay.push(arr[i]['profileImg'],arr[i]['userName'], arr[i]['email'],price*0.05,"Bezahlt",doc.id)
                                                          }else{
                                                           notpay.push(arr[i]['profileImg'],arr[i]['userName'], arr[i]['email'],price*0.05,"Nicht bezahlt",doc.id)               
                                                       }
                                                           console.log(n)
                                                           console.log("payed")
                                                           console.log(pay)
                                                           if(pay.length!=0){
                                                           total.push(pay);
                                                           total_all.push(pay);
               
                                                       }
                                                           console.log("not payed")
                                                           console.log(notpay)
                                                           if(notpay.length!=0){
                                                               total1.push(notpay);
                                                               total_all.push(notpay);
               
                                                           }
                                                           price=0;
                                                           console.log("-------------------------------------------------------")
               
                                                               
                                                       // }
                                                   }else {
                                                           querySnapshot.forEach((doc2) => {
                                                               if(doc2.data().userInfo.userID!="" &&doc2.data().orderState!="Canceled"){
               
                                                           price += parseFloat(doc2.data().orderTotalPrice)}
                                                       
                                                       })
                                                       n.push(price)
                                                       if(price*0.05==0){

                                                       }else{
                                                           notpay.push(arr[i]['profileImg'],arr[i]['userName'], arr[i]['email'],price*0.05,"Nicht bezahlt",doc.id)
               
                                                          }
                                                       console.log(notpay)
                                                       if(notpay.length!=0){
                                                           total1.push(notpay);
                                                           total_all.push(notpay);
               
                                                       }
                                                       console.log(n)
                                                       price=0;
               
                                                       }
                                                   }else{
                                                           querySnapshot.forEach((doc2) => {
                                                               if(doc2.data().userInfo.userID!="" &&doc2.data().orderState!="Canceled"){
                                                                   console.log(doc2.id)
               
                                                                       console.log(doc2.data())
                                                                       console.log("----------------------")
               
                                                               price += parseFloat(doc2.data().orderTotalPrice)}
                                                           
                                                           })
                                                           n.push(price)
                                                           console.log(n)
                                                           price=0;                                              
                                                       }
                                                       } else {
                                                           console.log("no orders")
                                                       }
                                                       if (total1.length == 0) {
                                                           tbody.innerHTML = "<h3 style='text-align:center;color:gold;'>Niemand hat bezahlt</h3>"
                                               
                                                           // tr1=""
                                                       } else {
                                                           var tr=""
                                                           for (let i = 0; i < total_all.length; i++) {
                                                            if(total_all[i][4]=="Bezahlt"){
                                                                tr += "<tr><td><img src=" + total_all[i][0] + " width=40% height=30%/></td><td>" +total_all[i][1] + "</td><td>" + total_all[i][2] + "</td><td><h4 style='color:green'>"+total_all[i][3].toFixed(2)+"€</h4></td><td><h4 style='color:green'>"+total_all[i][4]+"</h4></td><td><a  href='history-paytoapp.html?id="+total_all[i][5]+"' >history pay to app</a></td></tr>";
                                                            }else{
                                                             tr += "<tr><td><img src=" + total_all[i][0] + " width=40% height=30%/></td><td>" +total_all[i][1] + "</td><td>" + total_all[i][2] + "</td><td><h4 style='color:red'>"+total_all[i][3].toFixed(2)+"€</h4></td><td><h4 style='color:red'>"+total_all[i][4]+"</h4></td><td><a  href='history-paytoapp.html?id="+total_all[i][5]+"' >history pay to app</a></td></tr>";
                                                            }                                                             }  
                                                           tbody.innerHTML = tr;
               
                                                       }    
                                                       console.log(total)
                                                       console.log(total1)
                                                    })
                                        
                                           })
                                       
                   
                   
                                       });
                                        
                                    })
                                
            
            
                                });
                    }
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