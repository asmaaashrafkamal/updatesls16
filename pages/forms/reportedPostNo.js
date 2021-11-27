

function findUserByEmail10(state, callBack, fallBack) {
    database.collection("Reports").where("unseen", "==", state)
        .get()
        .then(function(result) {
            var arr = [];
            result.forEach(function(doc) {
                arr.push(doc.data());
                console.log(arr)

            });
            callBack(arr);
        })
        .catch(function(error) {
            console.log(error);
            fallBack();
        });
}

function test10() {
    findUserByEmail10(true, function(arr) {
        var tr = '';
        var element = '';
        console.log(arr)
            document.getElementById("report").innerText = arr.length;
        console.log("true");
    }, function(error) {
        console.log("fail");
    })
}

test10();