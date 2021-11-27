function geturl(url){
    queryString= url;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
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
    var tbody1 = document.getElementById('tbody1');
    function findUserByEmail1( id,callBack, fallBack) {
        console.log(id);
        database.collection('Payouts').orderBy('time', 'desc')
        .get().then(function(result2) {
            var arr=[];
            result2.forEach(function(doc1){
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
            // console.log(arr[0]['email']);
            var tr ='';
        var a=[];
      
            console.log(arr);
            console.log(arr);
            if(arr.length==0){
                document.getElementById("emp1").innerHTML="<h3 style='text-align:center;color:gold;'>Keine Geschichte</h3>"
            }
            // tr1=""
            for (let i = 0; i < arr.length; i++) {   
                if(arr[i]['userInfo']['uid']==id){ 
                    var time11= new Date(arr[i]['time']['seconds']*1000).toLocaleTimeString()
                    if(arr[i]['paymentMethod']!="PayPal"){
               tr += "<tr><td>" + arr[i]['amount']+ "€</td><td>" + arr[i]['paymentMethod']+ "</td><td>-----------</td><td>bezahlt</td><td>" + arr[i]['userInfo']['userName']+ "</td><td>" + new Date(arr[i]['time']['seconds']*1000).toDateString()+' at ' + time11+ "</td></tr>";
                console.log(arr[i]['userInfo']['uid']);
                a.push(arr[i]['userInfo']['uid']);
                }else{
                    tr += "<tr><td>" + arr[i]['amount']+ "€</td><td>" + arr[i]['paymentMethod']+ "</td><td><h6>IBAN :-" + arr[i]['paymentMethodInfo']['IBAN']+ "</h6><h6>PayPal Konto :-" + arr[i]['paymentMethodInfo']['PayPalAccount']+ "</h6><h6> Vollständiger Name :-" + arr[i]['paymentMethodInfo']['fullName']+ "</h6></td><td>Eingereicht</td><td>" + arr[i]['userInfo']['userName']+ "</td><td>" + new Date(arr[i]['time']['seconds']*1000).toDateString()+' at ' + time11+ "</td></tr>";
                    console.log(arr[i]['userInfo']['uid']);
                    a.push(arr[i]['userInfo']['uid']);
                }
            }
       }
    if(a.length==0){
        document.getElementById("emp1").innerHTML="<h3 style='text-align:center;color:gold;'>Keine Geschichte</h3>"

    }

    
    tbody1.innerHTML += tr;
        console.log("true");
    },function (error) {
        console.log("fail");
    })
    }
    // if(id!=null){
    // test4();
    // }else{
    //  console.log('null')
    // }
    geturl(window.location.search);
    var s=[];
    
      