
<?php
class App{
function send1($pass1,$id){
    $pass1=$_POST['pass1'];
    $id=$_GET['id'];
  

$url = "https://sls-firestore-cloud.herokuapp.com/changeUserPassword";
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$headers = array(
   "Accept: application/json",
   "Content-Type: application/json",
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$data = <<<DATA
{
    "uid" :"$id",
    "newPassword" : "$pass1"
}
DATA;

curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

//for debug only!
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$resp = curl_exec($curl);
curl_close($curl);
//  var_dump($resp);
if($resp=="Das Passwort des Benutzers wurde aktualisiert"){
 return $resp;
}else{
    return "fail";
}
}}
?>
