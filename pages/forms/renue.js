const database = firebase.firestore();
const user = database.collection('Users');
var tbody = document.getElementById('tbody');

function findUserByEmail1(callBack, fallBack) {
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
        var yesterday = new Date();
        var yesterday1 = new Date(yesterday.getTime() - 1 * 24 * 60 * 60 * 1000);
       var day_yesterday=yesterday1.getDate()
       var month_yesterday=yesterday1.getMonth()+1
       var year_yesterday=yesterday1.getFullYear()
       var lastday=year_yesterday+"-"+month_yesterday+"-"+day_yesterday
        var firstDay = new Date();
        var nextWeek = new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);
        var day_last_week=nextWeek.getDate()
        var month_last_week=nextWeek.getMonth()+1
        var year_last_week=nextWeek.getFullYear()
        var lastweek=year_last_week+"-"+month_last_week+"-"+day_last_week
        var last_month=new Date().setMonth(new Date().getMonth())- 1;
        var last_date=new Date(last_month).getDate();
        var last_month1=new Date(last_month).getMonth();
        var last_year=new Date(last_month).getFullYear();
        // var date1=new Date(last_date,last_month1,last_year);
        var current_date=new Date().getDate();
        var current_month1=new Date().getMonth()+1;
        var current_year=new Date().getFullYear();
         if(new Date(current_date,current_month1,current_year)<new Date(last_date,last_month1,last_year)){
             console.log("true")
         }else{
             console.log("false")
         }
        // console.log("date1",date1)
        console.log("date1",last_date,last_month1,last_year)
        console.log("date2",current_date,current_month1,current_year)
        // console.log("date2",date2)
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
            document.getElementById("emp").innerHTML = "<h3 style='text-align:center;color:gold;'>No Seller/Admin Found</h3>"

            // tr1=""
        } else {
            for (let i = 0; i < arr.length; i++) {
                if(arr[i]['role']=="seller" ||arr[i]['role']=="SuperUser"){
            tr += "<tr><td><img src=" + arr[i]['profileImg'] + " width=40% height=30%/></td><td>" + arr[i]['userName'] + "</td><td>" + arr[i]['email'] + "</td><td  id='day"+i+ "'><td  id='yesterday"+i+ "'></td><td  id='week"+i+ "'></td><td  id='month"+i+ "'></td><td  id='alltime"+i+ "'></td></tr>";
             database.collection("Users").where("email", "==", arr[i]['email']).get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                var price = 0
                                var  day= 0
                                var from_yesterday=0
                                var n = []
                                var thisday = []
                                var pay=[]
                                var notpay=[]
                                var month=0
                                var week=0
                                var all_time=0

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
                                            if(new Date().toLocaleDateString() == new Date(doc2.data().orderTime.seconds*1000).toLocaleDateString() &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                               day += parseFloat(doc2.data().orderTotalPrice)
                                        }
                                        var order_month=new Date(doc2.data().orderTime.seconds*1000).getMonth()+1
                                        var order_date=new Date(doc2.data().orderTime.seconds*1000).getDate()
                                        var order_year=new Date(doc2.data().orderTime.seconds*1000).getFullYear()
                                         var current=current_year+"-"+current_month1+"-"+current_date
                                         var order_date2=order_year+"-"+order_month+"-"+order_date
                                        //  var month12=order_year+"-"+order_month+"-"+order_date
                                         var ll=last_year+"-"+last_month1+"-"+last_date
                                        if(new Date("'"+current+"'") >=new Date("'"+order_date2+"'") && new Date("'"+ll+"'") <= new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                            // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                           month += parseFloat(doc2.data().orderTotalPrice)
                                        }
                                        if(new Date("'"+current+"'") >=new Date("'"+order_date2+"'") && new Date("'"+lastweek+"'") <= new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                            // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                           week += parseFloat(doc2.data().orderTotalPrice)
                                        }
                                        if( new Date("'"+lastday+"'") == new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                            // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                           from_yesterday += parseFloat(doc2.data().orderTotalPrice)
                                        }
                                        if(doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                            // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                           all_time += parseFloat(doc2.data().orderTotalPrice)
                                        }
                                            })
                                            if(day==0){

                                           document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +day.toFixed(2)+"€</h4>";
                                         
                                              }else{
                                                document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +day.toFixed(2)+"€</h4>";

                                              }
                                              if(month==0){

                                                document.getElementById("month"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +month.toFixed(2)+"€</h4>";
                                              
                                                   }else{
                                                    document.getElementById("month"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +month.toFixed(2)+"€</h4>";
     
                                                   }
                                                   if(week==0){

                                                    document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +week.toFixed(2)+"€</h4>";
                                                  
                                                       }else{
                                                        document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +week.toFixed(2)+"€</h4>";
         
                                                       }
                                                 if(from_yesterday==0){

                                                   document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +from_yesterday.toFixed(2)+"€</h4>";
                                                      
                                                 }else{
                                                   document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +from_yesterday.toFixed(2)+"€</h4>";
             
                                                  }
                                                  if(all_time==0){

                                                    document.getElementById("alltime"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +all_time.toFixed(2)+"€</h4>";
                                                       
                                                  }else{
                                                    document.getElementById("alltime"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +all_time.toFixed(2)+"€</h4>";
              
                                                   }
                                            pay.push(arr[i]['profileImg'],arr[i]['userName'], arr[i]['email'],price,p2[index]["state"])
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
                                        
                                            if(new Date().toLocaleDateString() == new Date(doc2.data().orderTime.seconds*1000).toLocaleDateString() &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                               day += parseFloat(doc2.data().orderTotalPrice)
                                           }
                                           var order_month=new Date(doc2.data().orderTime.seconds*1000).getMonth()+1
                                           var order_date=new Date(doc2.data().orderTime.seconds*1000).getDate()
                                           var order_year=new Date(doc2.data().orderTime.seconds*1000).getFullYear()
                                            var current=current_year+"-"+current_month1+"-"+current_date
                                            var order_date2=order_year+"-"+order_month+"-"+order_date
                                           //  var month12=order_year+"-"+order_month+"-"+order_date
                                            var ll=last_year+"-"+last_month1+"-"+last_date
                                           if(new Date("'"+current+"'") >=new Date("'"+order_date2+"'") && new Date("'"+ll+"'") <= new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                              month += parseFloat(doc2.data().orderTotalPrice)
                                           }
                                           if(new Date("'"+current+"'") >=new Date("'"+order_date2+"'") && new Date("'"+lastweek+"'") <= new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                           week += parseFloat(doc2.data().orderTotalPrice)
                                        }
                                        if(new Date("'"+lastday+"'") == new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                            // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                           from_yesterday += parseFloat(doc2.data().orderTotalPrice)
                                        }
                                        if(doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                            // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                           all_time += parseFloat(doc2.data().orderTotalPrice)
                                        }
                                        })
                                           if(day==0){

                                            document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +day.toFixed(2)+"€</h4>";
                                          
                                               }else{
                                                 document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +day.toFixed(2)+"€</h4>";
 
                                               }
                                               if(month==0){
                                                document.getElementById("month"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +month.toFixed(2)+"€</h4>";
                                              
                                                   }else{
                                                    document.getElementById("month"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +month.toFixed(2)+"€</h4>";
     
                                                   }
                                            if(week==0){

                                              document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +week.toFixed(2)+"€</h4>";
                                                  
                                            }else{
                                                document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +week.toFixed(2)+"€</h4>";
                                            }
                                            if(from_yesterday==0){

                                                document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +from_yesterday.toFixed(2)+"€</h4>";
                                                   
                                              }else{
                                                document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +from_yesterday.toFixed(2)+"€</h4>";
          
                                               }
                                               if(all_time==0){

                                                document.getElementById("alltime"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +all_time.toFixed(2)+"€</h4>";
                                                   
                                              }else{
                                                document.getElementById("alltime"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +all_time.toFixed(2)+"€</h4>";
          
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
                                                if(doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                    console.log(doc2.id)

                                                        console.log(doc2.data())
                                                        console.log("----------------------")

                                                price += parseFloat(doc2.data().orderTotalPrice)}
                                                
                                                    if(new Date().toLocaleDateString() == new Date(doc2.data().orderTime.seconds*1000).toLocaleDateString() &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                       day += parseFloat(doc2.data().orderTotalPrice)
                                                   }
                                                //    var firstDay = new Date();
                                                //    var nextWeek = new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);
                                                //    var day_last_week=nextWeek.getDate()
                                                //    var month_last_week=nextWeek.getMonth()+1
                                                //    var year_last_week=nextWeek.getFullYear()
                                                //    var lastweek=year_last_week+"-"+month_last_week+"-"+day_last_week
                                                   var order_month=new Date(doc2.data().orderTime.seconds*1000).getMonth()+1
                                                   var order_date=new Date(doc2.data().orderTime.seconds*1000).getDate()
                                                   var order_year=new Date(doc2.data().orderTime.seconds*1000).getFullYear()
                                                    var current=current_year+"-"+current_month1+"-"+current_date
                                                    var order_date2=order_year+"-"+order_month+"-"+order_date
                                                   //  var month12=order_year+"-"+order_month+"-"+order_date
                                                    var ll=last_year+"-"+last_month1+"-"+last_date
                                                   if(new Date("'"+current+"'") >=new Date("'"+order_date2+"'") && new Date("'"+ll+"'") <= new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                       // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                      month += parseFloat(doc2.data().orderTotalPrice)
                                                   }
                                                   if(new Date("'"+current+"'") >=new Date("'"+order_date2+"'") && new Date("'"+lastweek+"'") <= new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                    // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                   week += parseFloat(doc2.data().orderTotalPrice)
                                                }
                                                if( new Date("'"+lastday+"'") == new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                    // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                   from_yesterday += parseFloat(doc2.data().orderTotalPrice)
                                                }
                                                if(doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                    // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                   all_time += parseFloat(doc2.data().orderTotalPrice)
                                                }
                                          
                                            })
                                            // n.push(price)
                                            // document.getElementById("price"+i).innerText = price;
                                            // document.getElementById("day"+i).innerText = price;
                                            if(day==0){

                                                document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +day.toFixed(2)+"€</h4>";
                                              
                                                   }else{
                                                     document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +day.toFixed(2)+"€</h4>";
     
                                                   }
                                                   if(month==0){
    
                                                    document.getElementById("month"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +month.toFixed(2)+"€</h4>";
                                                  
                                                       }else{
                                                        document.getElementById("month"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +month.toFixed(2)+"€</h4>";
         
                                                       }
                                                    if(week==0){

                                                        document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +week.toFixed(2)+"€</h4>";
                                                            
                                                      }else{
                                                          document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +week.toFixed(2)+"€</h4>";
                                                      }
                                                      if(from_yesterday==0){

                                                        document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +from_yesterday.toFixed(2)+"€</h4>";
                                                           
                                                      }else{
                                                        document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +from_yesterday.toFixed(2)+"€</h4>";
                  
                                                       }
                                                       if(all_time==0){

                                                        document.getElementById("alltime"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +all_time.toFixed(2)+"€</h4>";
                                                           
                                                      }else{
                                                        document.getElementById("alltime"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +all_time.toFixed(2)+"€</h4>";
                  
                                                       }

                                            console.log(n)
                                            price=0;

                                              
                                        }
                                        } else {
                                            var tt=0;
                                            console.log("no orders")
                                            // document.getElementById("price"+i).innerText = "0" ;
                                            document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +tt.toFixed(2)+"€</h4>";
                                            document.getElementById("month"+i).innerHTML = "<h4 style='color:rgb(0,165,80)'>" +tt.toFixed(2)+"€</h4>";
                                            document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +tt.toFixed(2)+"€</h4>";
                                            document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +tt.toFixed(2)+"€</h4>";
                                            document.getElementById("alltime"+i).innerHTML = "<h4 style='color:rgb(0,165,80)'>" +tt.toFixed(2)+"€</h4>";


                                        }
                                        console.log(total)
                                        console.log(total1)
                        
                                    })
                            
                            })
                        
    
    
                        });
            }}

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

    function findUserByEmail1(callBack, fallBack) {
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

    function test5() {
        findUserByEmail1( function(arr) {
            // console.log(arr[0]['email']);
            var tr1 = '';
            var element = '';
            //console.log(arr);
            var p1=[];
            var p2=[];
            var total=[]
            var total1=[]
            var total_all=[]
            var yesterday = new Date();
            var yesterday1 = new Date(yesterday.getTime() - 1 * 24 * 60 * 60 * 1000);
           var day_yesterday=yesterday1.getDate()
           var month_yesterday=yesterday1.getMonth()+1
           var year_yesterday=yesterday1.getFullYear()
           var lastday=year_yesterday+"-"+month_yesterday+"-"+day_yesterday
            var firstDay = new Date();
            var nextWeek = new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);
            var day_last_week=nextWeek.getDate()
            var month_last_week=nextWeek.getMonth()+1
            var year_last_week=nextWeek.getFullYear()
            var lastweek=year_last_week+"-"+month_last_week+"-"+day_last_week
            var last_month=new Date().setMonth(new Date().getMonth())- 1;
            var last_date=new Date(last_month).getDate();
            var last_month1=new Date(last_month).getMonth();
            var last_year=new Date(last_month).getFullYear();
            // var date1=new Date(last_date,last_month1,last_year);
            var current_date=new Date().getDate();
            var current_month1=new Date().getMonth()+1;
            var current_year=new Date().getFullYear();
             if(new Date(current_date,current_month1,current_year)<new Date(last_date,last_month1,last_year)){
                 console.log("true")
             }else{
                 console.log("false")
             }
            // console.log("date1",date1)
            console.log("date1",last_date,last_month1,last_year)
            console.log("date2",current_date,current_month1,current_year)
            // console.log("date2",date2)
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
                    if (arr[i]['userName'].toLowerCase().startsWith(search_name.toLowerCase())) {
                        if(arr[i]['role']=="seller" ||arr[i]['role']=="SuperUser"){
                            tr1 += "<tr><td><img src=" + arr[i]['profileImg'] + " width=40% height=30%/></td><td>" + arr[i]['userName'] + "</td><td>" + arr[i]['email'] + "</td><td  id='day"+i+ "'><td  id='yesterday"+i+ "'></td><td  id='week"+i+ "'></td><td  id='month"+i+ "'></td><td  id='alltime"+i+ "'></td></tr>";
                             database.collection("Users").where("email", "==", arr[i]['email']).get()
                                        .then((querySnapshot) => {
                                            querySnapshot.forEach((doc) => {
                                                var price = 0
                                                var  day= 0
                                                var from_yesterday=0
                                                var n = []
                                                var thisday = []
                                                var pay=[]
                                                var notpay=[]
                                                var month=0
                                                var week=0
                                                var all_time=0
                
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
                                                            if(new Date().toLocaleDateString() == new Date(doc2.data().orderTime.seconds*1000).toLocaleDateString() &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                                // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                               day += parseFloat(doc2.data().orderTotalPrice)
                                                        }
                                                        var order_month=new Date(doc2.data().orderTime.seconds*1000).getMonth()+1
                                                        var order_date=new Date(doc2.data().orderTime.seconds*1000).getDate()
                                                        var order_year=new Date(doc2.data().orderTime.seconds*1000).getFullYear()
                                                         var current=current_year+"-"+current_month1+"-"+current_date
                                                         var order_date2=order_year+"-"+order_month+"-"+order_date
                                                        //  var month12=order_year+"-"+order_month+"-"+order_date
                                                         var ll=last_year+"-"+last_month1+"-"+last_date
                                                        if(new Date("'"+current+"'") >=new Date("'"+order_date2+"'") && new Date("'"+ll+"'") <= new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                            // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                           month += parseFloat(doc2.data().orderTotalPrice)
                                                        }
                                                        if(new Date("'"+current+"'") >=new Date("'"+order_date2+"'") && new Date("'"+lastweek+"'") <= new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                            // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                           week += parseFloat(doc2.data().orderTotalPrice)
                                                        }
                                                        if( new Date("'"+lastday+"'") == new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                            // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                           from_yesterday += parseFloat(doc2.data().orderTotalPrice)
                                                        }
                                                        if(doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                            // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                           all_time += parseFloat(doc2.data().orderTotalPrice)
                                                        }
                                                            })
                                                            if(day==0){
                
                                                           document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +day.toFixed(2)+"€</h4>";
                                                         
                                                              }else{
                                                                document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +day.toFixed(2)+"€</h4>";
                
                                                              }
                                                              if(month==0){
                
                                                                document.getElementById("month"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +month.toFixed(2)+"€</h4>";
                                                              
                                                                   }else{
                                                                    document.getElementById("month"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +month.toFixed(2)+"€</h4>";
                     
                                                                   }
                                                                   if(week==0){
                
                                                                    document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +week.toFixed(2)+"€</h4>";
                                                                  
                                                                       }else{
                                                                        document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +week.toFixed(2)+"€</h4>";
                         
                                                                       }
                                                                 if(from_yesterday==0){
                
                                                                   document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +from_yesterday.toFixed(2)+"€</h4>";
                                                                      
                                                                 }else{
                                                                   document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +from_yesterday.toFixed(2)+"€</h4>";
                             
                                                                  }
                                                                  if(all_time==0){
                
                                                                    document.getElementById("alltime"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +all_time.toFixed(2)+"€</h4>";
                                                                       
                                                                  }else{
                                                                    document.getElementById("alltime"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +all_time.toFixed(2)+"€</h4>";
                              
                                                                   }
                                                            pay.push(arr[i]['profileImg'],arr[i]['userName'], arr[i]['email'],price,p2[index]["state"])
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
                                                            if(doc2.data().orderNo=="73655"){
                                                            console.log("date 11",new Date().toLocaleDateString())
                                                           
                                                            console.log("date 11",new Date(doc2.data().orderTime.seconds*1000).toLocaleDateString())
                                                            console.log("date 11",doc2.data().orderNo)
                                                            }
                                                            if(new Date().toLocaleDateString() == new Date(doc2.data().orderTime.seconds*1000).toLocaleDateString() &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                               day += parseFloat(doc2.data().orderTotalPrice)
                                                           }
                                                           var order_month=new Date(doc2.data().orderTime.seconds*1000).getMonth()+1
                                                           var order_date=new Date(doc2.data().orderTime.seconds*1000).getDate()
                                                           var order_year=new Date(doc2.data().orderTime.seconds*1000).getFullYear()
                                                            var current=current_year+"-"+current_month1+"-"+current_date
                                                            var order_date2=order_year+"-"+order_month+"-"+order_date
                                                           //  var month12=order_year+"-"+order_month+"-"+order_date
                                                            var ll=last_year+"-"+last_month1+"-"+last_date
                                                           if(new Date("'"+current+"'") >=new Date("'"+order_date2+"'") && new Date("'"+ll+"'") <= new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                              month += parseFloat(doc2.data().orderTotalPrice)
                                                           }
                                                           if(new Date("'"+current+"'") >=new Date("'"+order_date2+"'") && new Date("'"+lastweek+"'") <= new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                           week += parseFloat(doc2.data().orderTotalPrice)
                                                        }
                                                        if( new Date("'"+lastday+"'") == new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                            // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                           from_yesterday += parseFloat(doc2.data().orderTotalPrice)
                                                        }
                                                        if(doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                            // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                           all_time += parseFloat(doc2.data().orderTotalPrice)
                                                        }
                                                        })
                                                           if(day==0){
                
                                                            document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +day.toFixed(2)+"€</h4>";
                                                          
                                                               }else{
                                                                 document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +day.toFixed(2)+"€</h4>";
                 
                                                               }
                                                               if(month==0){
                                                                document.getElementById("month"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +month.toFixed(2)+"€</h4>";
                                                              
                                                                   }else{
                                                                    document.getElementById("month"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +month.toFixed(2)+"€</h4>";
                     
                                                                   }
                                                            if(week==0){
                
                                                              document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +week.toFixed(2)+"€</h4>";
                                                                  
                                                            }else{
                                                                document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +week.toFixed(2)+"€</h4>";
                                                            }
                                                            if(from_yesterday==0){
                
                                                                document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +from_yesterday.toFixed(2)+"€</h4>";
                                                                   
                                                              }else{
                                                                document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +from_yesterday.toFixed(2)+"€</h4>";
                          
                                                               }
                                                               if(all_time==0){
                
                                                                document.getElementById("alltime"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +all_time.toFixed(2)+"€</h4>";
                                                                   
                                                              }else{
                                                                document.getElementById("alltime"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +all_time.toFixed(2)+"€</h4>";
                          
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
                                                                    if(doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                                        console.log(doc2.id)
                
                                                                        console.log(doc2.data())
                                                                        console.log("----------------------")
                
                                                                price += parseFloat(doc2.data().orderTotalPrice)}
                                                                
                                                                    if(new Date().toLocaleDateString() == new Date(doc2.data().orderTime.seconds*1000).toLocaleDateString() &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                                       day += parseFloat(doc2.data().orderTotalPrice)
                                                                   }
                                                                //    var firstDay = new Date();
                                                                //    var nextWeek = new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);
                                                                //    var day_last_week=nextWeek.getDate()
                                                                //    var month_last_week=nextWeek.getMonth()+1
                                                                //    var year_last_week=nextWeek.getFullYear()
                                                                //    var lastweek=year_last_week+"-"+month_last_week+"-"+day_last_week
                                                                   var order_month=new Date(doc2.data().orderTime.seconds*1000).getMonth()+1
                                                                   var order_date=new Date(doc2.data().orderTime.seconds*1000).getDate()
                                                                   var order_year=new Date(doc2.data().orderTime.seconds*1000).getFullYear()
                                                                    var current=current_year+"-"+current_month1+"-"+current_date
                                                                    var order_date2=order_year+"-"+order_month+"-"+order_date
                                                                   //  var month12=order_year+"-"+order_month+"-"+order_date
                                                                    var ll=last_year+"-"+last_month1+"-"+last_date
                                                                   if(new Date("'"+current+"'") >=new Date("'"+order_date2+"'") && new Date("'"+ll+"'") <= new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                                       // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                                      month += parseFloat(doc2.data().orderTotalPrice)
                                                                   }
                                                                   if(new Date("'"+current+"'") >=new Date("'"+order_date2+"'") && new Date("'"+lastweek+"'") <= new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                                    // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                                   week += parseFloat(doc2.data().orderTotalPrice)
                                                                }
                                                                if( new Date("'"+lastday+"'") == new Date("'"+order_date2+"'") &&doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                                    // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                                   from_yesterday += parseFloat(doc2.data().orderTotalPrice)
                                                                }
                                                                if(doc2.data().userInfo.userID!=""&&doc2.data().orderState!="Canceled"){
                                                                    // console.log("Price of ",doc.id,"is",doc2.data().orderTotalPrice ,"and order number is",doc2.id)
                                                                   all_time += parseFloat(doc2.data().orderTotalPrice)
                                                                }
                                                          
                                                            })
                                                            // n.push(price)
                                                            // document.getElementById("price"+i).innerText = price;
                                                            // document.getElementById("day"+i).innerText = price;
                                                            if(day==0){
                
                                                                document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +day.toFixed(2)+"€</h4>";
                                                              
                                                                   }else{
                                                                     document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +day.toFixed(2)+"€</h4>";
                     
                                                                   }
                                                                   if(month==0){
                    
                                                                    document.getElementById("month"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +month.toFixed(2)+"€</h4>";
                                                                  
                                                                       }else{
                                                                        document.getElementById("month"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +month.toFixed(2)+"€</h4>";
                         
                                                                       }
                                                                    if(week==0){
                
                                                                        document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +week.toFixed(2)+"€</h4>";
                                                                            
                                                                      }else{
                                                                          document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +week.toFixed(2)+"€</h4>";
                                                                      }
                                                                      if(from_yesterday==0){
                
                                                                        document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +from_yesterday.toFixed(2)+"€</h4>";
                                                                           
                                                                      }else{
                                                                        document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +from_yesterday.toFixed(2)+"€</h4>";
                                  
                                                                       }
                                                                       if(all_time==0){
                
                                                                        document.getElementById("alltime"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +all_time.toFixed(2)+"€</h4>";
                                                                           
                                                                      }else{
                                                                        document.getElementById("alltime"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +all_time.toFixed(2)+"€</h4>";
                                  
                                                                       }
                
                                                            console.log(n)
                                                            price=0;
                
                                                              
                                                        }
                                                        } else {
                                                            var tt=0;
                                                            console.log("no orders")
                                                            // document.getElementById("price"+i).innerText = "0" ;
                                                            document.getElementById("day"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +tt.toFixed(2)+"€</h4>";
                                                            document.getElementById("month"+i).innerHTML = "<h4 style='color:rgb(0,165,80)'>" +tt.toFixed(2)+"€</h4>";
                                                            document.getElementById("week"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +tt.toFixed(2)+"€</h4>";
                                                            document.getElementById("yesterday"+i).innerHTML ="<h4 style='color:rgb(0,165,80)'>" +tt.toFixed(2)+"€</h4>";
                                                            document.getElementById("alltime"+i).innerHTML = "<h4 style='color:rgb(0,165,80)'>" +tt.toFixed(2)+"€</h4>";
                
                                                        }
                                                        console.log(total)
                                                        console.log(total1)
                                        
                                                    })
                                            
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