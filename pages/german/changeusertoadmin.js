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
    findUserByEmail1("user", function(arr) {
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
            document.getElementById("emp").innerHTML = "<h3 style='text-align:center;color:gold;'>Keine Benutzer gefunden</h3>"
        } else {
            for (let i = 0; i < arr.length; i++) {
                tr += "<tr><td><img src=" + arr[i]['profileImg'] + " width=40% height=30%/></td><td>" + arr[i]['userName'] + "</td><td>" + arr[i]['email'] + "</td><td>" + arr[i]['role'] + "</td><td><form><button type='submit' style='text-align:center;' class='btn btn-danger' value=''  id='delete" + i + "' name='delete' >Ändern</button></form></td></tr>";
                database.collection("Users").where("email", "==", arr[i]['email']).get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            document.getElementById('delete' + i).value = doc.id;
                            element = doc.id;
                            document.getElementById("delete" + i).addEventListener("click", e => {
                                console.log(document.getElementById('delete' + i).value)
                               
                                e.preventDefault();
                                let confirmAction = confirm("Möchten Sie diesen Benutzer wirklich in einen Administrator umwandeln?");
                                if (confirmAction) {
                                    database.collection('Users').doc(document.getElementById('delete' + i).value).update({
                                        role: "SuperUser"
                                    }).then(()=>{
                                        window.location.href = "changeusertoadmin.html";
                                    })
                                   }
                    
                            })

                          
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
        findUserByEmail1("user", function(arr) {
            var tr1 = '';
            var n=0
              var s=[]
            var element = '';
            console.log(arr);
            database.collection("Users").get()
            .then((querySnapshot13) => {
                 s.push(querySnapshot13.size);
    
    
            })
            if (arr.length == 0) {
                document.getElementById("emp").innerHTML = "<h3 style='text-align:center;color:gold;'>Keine Benutzer gefunden</h3>"
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]['userName'].toLowerCase().startsWith(search_name.toLowerCase())) {
                        tr1 += "<tr><td><img src=" + arr[i]['profileImg'] + " width=40% height=30%/></td><td>" + arr[i]['userName'] + "</td><td>" + arr[i]['email'] + "</td><td>" + arr[i]['role'] + "</td><td><form><button type='submit' style='text-align:center;' class='btn btn-danger' value=''  id='delete" + i + "' name='delete' >Ändern</button></form></td></tr>";
                        database.collection("Users").where("email", "==", arr[i]['email']).get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    document.getElementById('delete' + i).value = doc.id;
                                    element = doc.id;
                                    document.getElementById("delete" + i).addEventListener("click", e => {
                                        console.log(document.getElementById('delete' + i).value)
                                       
                                        e.preventDefault();
                                        let confirmAction = confirm("Möchten Sie diesen Benutzer wirklich in einen Administrator umwandeln?");
                                        if (confirmAction) {
                                            database.collection('Users').doc(document.getElementById('delete' + i).value).update({
                                                role: "SuperUser"
                                            }).then(()=>{
                                                window.location.href = "changeusertoadmin.html";
                                            })
                                           }
                                    })                                 
                                    })

        
                                })

                    }


                }
                if (tr1 == '') {
                    document.getElementById("emp").innerHTML = "<h4 style='text-align:center;color:gold;'>Kein Ergebnis</h4>"

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
