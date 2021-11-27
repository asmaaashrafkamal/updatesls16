const database = firebase.firestore();
const user = database.collection('Users');
var tbody = document.getElementById('tbody');

function findUserByEmail1(state, callBack, fallBack) {
    database.collection("Users").where("confirmState", "==", state)
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
    findUserByEmail1("confirmed", function(arr) {
        var tr = '';
        var element = '';
        console.log(arr);
        if (arr.length == 0) {
            document.getElementById("emp").innerHTML = "<h3 style='text-align:center;color:gold;'>Keine Benutzer gefunden</h3>"

            // tr1=""
        } else {
            for (let i = 0; i < arr.length; i++) {
                tr += "<tr><td><img src=" + arr[i]['profileImg'] + " width=40% height=30%/></td><td>" + arr[i]['userName'] + "</td><td>" + arr[i]['email'] + "</td><td>" + arr[i]['role'] + "</td><td><form><button type='submit' style='text-align:center;' class='btn btn-danger' value=''  id='delete" + i + "' name='delete' >löschen</button></form></td></tr>";
                database.collection("Users").where("email", "==", arr[i]['email']).get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            document.getElementById('delete' + i).value = doc.id;
                            element = doc.id;
                            const database = firebase.firestore();
                            const user = database.collection('Users');
                            element = doc.id;
                            document.getElementById("delete" + i).addEventListener("click", e => {
                                e.preventDefault();
                                let confirmAction = confirm("Möchten Sie dies wirklich löschen??");
                                //onclick yes
                                if (confirmAction) {

                                    database.collection("Users").doc(doc.id).collection('Orders').get()
                                        .then((querySnapshot) => {
                                            querySnapshot.forEach((doc1) => {
                                                database.collection('Users').doc(doc.id).collection('Orders').doc(doc1.id).delete();
                                            })
                                           database.collection('Users').doc(doc.id).collection('Orders').delete();

                                        })

                                    database.collection("Users").doc(doc.id).collection('engagedChatChannels').get()
                                        .then((querySnapshot) => {
                                            querySnapshot.forEach((doc2) => {
                                                database.collection('Users').doc(doc.id).collection('engagedChatChannels').doc(doc2.id).delete();

                                            })
                                            database.collection('Users').doc(doc.id).collection('engagedChatChannels').delete();
                                        })
                                    database.collection("Users").get()
                                        .then((querySnapshot) => {
                                            querySnapshot.forEach((doc2) => {
                                                if (doc2.data().followers != null && doc2.data().followers.length != 0) {
                                                    for (var n = 0; n < doc2.data().followers.length; n++) {
                                                        if (doc2.data().followers[n] == doc.id) {
                                                            database.collection('Users').doc(doc2.id).update({
                                                                "followers": firebase.firestore.FieldValue.arrayRemove(doc2.data().followers[n]),
                                                                "following": firebase.firestore.FieldValue.arrayRemove(doc2.data().followers[n])
                                                            })
                                                            console.log(doc2.data())
                                                        }
                                                    }
                                                }
                                            })
                                        })
                                    database.collection('Users').doc(doc.id).delete().then(() => {
                                            window.location.href = "all_confirmed.html";
                                        })
                                        .catch((error) => { console.error(error) });
                                    //onclick no
                                } else {

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
        database.collection("Users").where("confirmState", "==", state)
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
        findUserByEmail1("confirmed", function(arr) {
            var tr1 = '';
            var element = '';
            console.log(arr);
            if (arr.length == 0) {
                document.getElementById("emp").innerHTML = "<h3 style='text-align:center;color:gold;'>Keine Benutzer gefunden</h3>"

            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]['userName'].toLowerCase().startsWith(search_name.toLowerCase())) {
                        tr1 += "<tr><td><img src=" + arr[i]['profileImg'] + " width=40% height=30%/></td><td>" + arr[i]['userName'] + "</td><td>" + arr[i]['email'] + "</td><td>" + arr[i]['role'] + "</td><td><form><button type='submit' style='text-align:center;' class='btn btn-danger' value=''  id='delete" + i + "' name='delete' >löschen</button></form></td></tr>";
                        database.collection("Users").where("email", "==", arr[i]['email']).get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    document.getElementById('delete' + i).value = doc.id;
                                    element = doc.id;
                                    const database = firebase.firestore();
                                    const user = database.collection('Users');
                                    element = doc.id;
                                    document.getElementById("delete" + i).addEventListener("click", e => {
                                        e.preventDefault();
                                        let confirmAction = confirm("Möchten Sie dies wirklich löschen?");
                                        //onclick yes
                                        if (confirmAction) {
        
                                            database.collection("Users").doc(doc.id).collection('Orders').get()
                                                .then((querySnapshot) => {
                                                    querySnapshot.forEach((doc1) => {
                                                        database.collection('Users').doc(doc.id).collection('Orders').doc(doc1.id).delete();
                                                    })
                                                   database.collection('Users').doc(doc.id).collection('Orders').delete();
        
                                                })
        
                                            database.collection("Users").doc(doc.id).collection('engagedChatChannels').get()
                                                .then((querySnapshot) => {
                                                    querySnapshot.forEach((doc2) => {
                                                        database.collection('Users').doc(doc.id).collection('engagedChatChannels').doc(doc2.id).delete();
        
                                                    })
                                                    database.collection('Users').doc(doc.id).collection('engagedChatChannels').delete();
                                                })
                                            database.collection("Users").get()
                                                .then((querySnapshot) => {
                                                    querySnapshot.forEach((doc2) => {
                                                        if (doc2.data().followers != null && doc2.data().followers.length != 0) {
                                                            for (var n = 0; n < doc2.data().followers.length; n++) {
                                                                if (doc2.data().followers[n] == doc.id) {
                                                                    database.collection('Users').doc(doc2.id).update({
                                                                        "followers": firebase.firestore.FieldValue.arrayRemove(doc2.data().followers[n]),
                                                                        "following": firebase.firestore.FieldValue.arrayRemove(doc2.data().followers[n])
                                                                    })
                                                                    console.log(doc2.data())
                                                                }
                                                            }
                                                        }
                                                    })
                                                })
                                            database.collection('Users').doc(doc.id).delete().then(() => {
                                                    window.location.href = "all_confirmed.html";
                                                })
                                                .catch((error) => { console.error(error) });
                                            //onclick no
                                        } else {
        
                                        }
                                    })

                                })


                            });

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
// database.collection("Users").doc("HzkMv1wv3bflGovZlqmZaRpuRKm1").collection('Orders').get()
// .then((querySnapshot) => {
//     querySnapshot.forEach((doc1) => {
//       database.collection('Users').doc("HzkMv1wv3bflGovZlqmZaRpuRKm1").collection('Orders').doc(doc1.id).delete();
//     })
//       database.collection('Users').doc("HzkMv1wv3bflGovZlqmZaRpuRKm1").collection('Orders').delete();

// })


// database.collection("Users").doc("cUudc3k8xzRPBAQDgln3CMKt4rt2").collection('engagedChatChannels').get()
// .then((querySnapshot) => {
//     querySnapshot.forEach((doc2) => {
//         database.collection('Users').doc("cUudc3k8xzRPBAQDgln3CMKt4rt2").collection('engagedChatChannels').doc(doc2.id).delete();
//         // database.collection('Users').doc("cUudc3k8xzRPBAQDgln3CMKt4rt2").collection('engagedChatChannels').delete();

//     })

// })
// database.collection('Users').doc("cUudc3k8xzRPBAQDgln3CMKt4rt2").delete();
