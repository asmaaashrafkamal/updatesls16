const database = firebase.firestore();
const user = database.collection('Reports');
var tbody = document.getElementById('tbody');

function findUserByEmail1(callBack, fallBack) {
    database.collection("Reports").orderBy('time', 'desc').get()
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
    findUserByEmail1(function(arr) {
        // console.log(arr[0]['email']);
        var tr = '';
        var element = '';
        //console.log(arr);
        for (let i = 0; i < arr.length; i++) {
            // Date to Timestamp
            const t = firebase.firestore.Timestamp.fromDate(new Date());
            if(arr[i]['unseen']==true){
            tr += "<tr><td>" + arr[i]['reporterUser']['reporterName'] + "</td><td>" + arr[i]['postUser']['postUserName'] + "</td><td style='color:red;'>un seen</td><td><a  id='getid" + i + "' href=''>Related Post</a></td></tr>";
            }else{
            tr += "<tr><td>" + arr[i]['reporterUser']['reporterName'] + "</td><td>" + arr[i]['postUser']['postUserName'] + "</td><td style='color:green;'>seen</td><td><a  id='getid" + i + "' href=''>Related Post</a></td></tr>";
            }
            
            database.collection("Reports").get()
                .then((querySnapshot) => {
                    //  element=doc.id;
                    console.log(document.getElementById('getid' + i));
                    const database = firebase.firestore();
                    // element=doc.id;
                    document.getElementById("getid" + i).addEventListener("click", e => {
                        e.preventDefault();
                        document.getElementById("getid" + i).href = "post1.html?id=" + arr[i]['relatedPost'];
                        console.log(document.getElementById("getid" + i));
                        var m = []
                        m.push(arr[i]['postUser']['postUserImg'], "sdllsd")
                        database.collection("Reports").get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc1) => {
                                if(arr[i]['relatedPost']==doc1.data().relatedPost &&arr[i]['reporterUser']['reporterName'] ==doc1.data().reporterUser.reporterName){
                        database.collection('Reports').doc(doc1.id).update({
                            unseen:false
                        }).then(()=>{ 
                            window.location.href = "post1.html?id=" + arr[i]['relatedPost'] + "&user=" + arr[i]['postUser']['postUserName'];
                         })
                        .catch((error)=>{console.error(error)});
                              }  })
                        })
                    })
                });
        }



        tbody.innerHTML += tr;


        console.log("true");
    }, function(error) {
        console.log("fail");
    })
}

test4();