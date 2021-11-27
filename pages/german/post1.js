
//tbody.innerHTML="odposods"
function geturl(url){
    queryString= url;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    const user = urlParams.get('user')
   
    if(id!=null && user!=null ){
    test4(id,user);
    }else{
    console.log("null");
    }
    }
    var tr='';
    const database=firebase.firestore();
    const user=database.collection('Posts');
    var tbody = document.getElementById('tbody');
    function findUserByEmail1( id,callBack, fallBack) {
        console.log(id);
        database.collection('Posts').get().then(function(result2) {
            var arr=[];
            console.log("skksaosa");
            result2.forEach(function(doc1){
                if(doc1.id == id){
                console.log("skksaosa");
                arr.push(doc1.data());
                 console.log(arr); // for test
                }
            });
            callBack(arr);
        })
        .catch(function(error) {
            console.log(error);
            fallBack();
        });}
    
    
    function test4(id,user) {
      document.getElementById("img1").innerHTML="<h3> Hochgeladen von:"+user+"</h3>"
      console.log(document.getElementById("img1")) 
      findUserByEmail1(id,function (arr) {
            var tr ='';
            var tr1='';
            var element='';
            var s=[];
            var n=[];
            console.log(arr);
      for (let i = 0; i < arr.length; i++) {   
          if(arr[i]['context']['images']!=''){ 
             for(let j=0;j<arr[i]['context']['images'].length;j++){  
                console.log(arr[i]['context']['images'][j])
                console.log("asjsaksjsakas")  
                var img = document.createElement("img");
                img.src = arr[i]['context']['images'][j] 
                img.style.height='400px'
                img.style.width='400px'
                var src = document.getElementById("as");
                src.appendChild(img);
          }}
         console.log(arr[i]['context']['video']) 
          if( arr[i]['context']['video']!=''){ 
            var resourceUri = arr[i]['context']['video'];
            var player = BambuserPlayer.create(document.getElementById('as1'), resourceUri,{
              noFullscreen: true
            })
            // Listen to player events
            player.addEventListener('pause', function() {
              console.log('player paused');
            });

            player.controls = true;
            player.play();

            document.getElementById('as1').addEventListener('click', function() {
              return player.paused ? player.play() : player.pause();
            });

            if (navigator.userAgent.match(/iPad|iPhone|iPod/) && !window.MSStream) {
              player.controls = true;
              }
              }
            if(arr[i]['context']['text']!=""){
              document.getElementById("text").innerHTML="Titel ist :"+arr[i]['context']['text'] 
              }
              if(arr[i]['context']['productPrice']!=""){
                document.getElementById("text1").innerHTML="Der Preis ist :"+arr[i]['context']['productPrice']
                }

            }

        console.log("true");
    },function (error) {
        console.log("fail");
    })
    }

    geturl(window.location.search);
    var s=[];
    
      