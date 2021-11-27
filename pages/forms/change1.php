<?php
if(isset($_POST['resetPassword'])){
    $id=$_GET['id'];
  require_once ('change.php');
$change=new App();
$m=$change->send1($_POST['pass1'],$id);
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      <title>Password Reset</title>
    <style>
        * {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat Medium'
}

main {
    width: 100vw
}

.container,
.feedbackContainer,
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
}

.container {
    position: absolute;
    left: 50%;
    top: 50%;

    transform: translate(-50%, -50%);
}

fieldset, .feedbackContainer {
    border: rgb(192,192,192,0.1) 1px solid;
    height: 400px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.12)
}

input[type = "email"] {
    width: 340px;
    margin-top: 8px;
    padding: 2px 6px;
    border: none;
    background-color: #f7f7f7;
    height: 40px;
    outline-color: #2196f3;
    font-size: 1rem
}

button {
    float: right;
    margin: 20px 47px 0px 0px;
    padding: 10px 20px;
    border: 1px solid #2196f3;
    float: right;
    background-color: #2196f3;
    color: white;
    cursor: pointer
}

.container div {
    margin: 10px 40px;
    position: relative
}

img {
    width: 100px;
    height: 100px;
    margin: auto;
    display: block
}

.reset-container div:first-of-type {   
    width: 340px;
    margin-top: 50px;
}

label {
    position: absolute;
    top: 56%;
    left: 6px;
    color: #505050
}

.focused-field {
    animation-name: gainFocus;
    animation-fill-mode: forwards;
    animation-duration: 0.15s;
    animation-timing-function: ease-out
}

@keyframes gainFocus {
    0% {
        top: 56%;
        left: 6px;
        color: #505050;
        font-size: 1rem
    }
    100% {
        top: 0%;
        left: 0px;
        color: #2196f3;
        font-size: 0.9rem
    }
}

.unfocused-field {
    animation-name: loseFocus;
    animation-fill-mode: forwards;
    animation-duration: 0.15s;
    animation-timing-function: ease-out
}

@keyframes loseFocus {
    0% {
        top: 0%;
        left: 0px;
        color: #2196f3;
        font-size: 0.9rem
    }
    100% {
        top: 56%;
        left: 6px;
        color: #505050;
        font-size: 1rem
    }
}

.initial-focused-field {
    top: 0%;
    left: 0px;
    color: #2196f3;
    font-size: 0.9rem
}

.initial-unfocused-field {
    top: 56%;
    left: 6px;
    color: #505050;
    font-size: 1rem
}

.feedbackContainer {
    height: 300px;
    width: 300px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    display: none 
}

.feedbackIcon {
    width: 70px;
    height: 70px;
    margin-bottom: 20px;
}

.success .feedbackIcon {
    background-image: url('../img/success.svg');
}

.failure .feedbackIcon {
    background-image: url('../img/failure.svg');
}
input[type = "password"] {
    width: 340px;
    margin-top: 8px;
    padding: 2px 6px;
    border: none;
    background-color: #f7f7f7;
    height: 55px;
    outline-color: #2196f3;
    font-size: 1rem;
}
    </style>
    <!-- Import axios library -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<!-- Querystring library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.7.0/qs.min.js"></script>

  </head>
  <body>
      <main>
      <?php
               if(!empty($m)){
                if($m=="fail"){
                  echo '<div style=""><div class="alert alert-danger"   role="alert"><h4 style="text-align:center;">  User`s password has not been updated </h4> </div></div>';
                  }else{
                    echo '<div style=""><div class="alert alert-success"    role="alert"><h4 style="text-align:center;">'.$m.' </h4> </div></div>';
                  }
                }
                ?>
        <section class="container reset-container">
  
          <fieldset>
        
              <form  method="POST" id="jq-password">
            <!-- <div><h1 style="text-align: center;text-decoration: underline;">Change Password</h1> -->
              <img src="./img/reset.svg" />
              <!--https://www.visualpharm.com/free-icon-->
            </div>
            <div></div>
            <div>
              <input type="password"  name="pass1" id="pass1" placeholder="New Password" onkeyup="checkPass();"/>
            </div>
        <div>
              <input type="password" name="pass2" id="pass2" placeholder="Confirm Password" onkeyup="checkPass();"/>
              <span id="confirm-message3" class="confirm-message"></span>
              <br>

            </div>
        <div>
            <button name="resetPassword">Confirm</button>
        </div>
        </form>

          </fieldset>
      </section>
      
    </main> 

  
  <script type="text/javascript">
    $(function(){
        $('#jq-password [type="password"]').keyup(function(){
            //Store the field objects into variables ...
            var password = $('#pass1');
            var confirm  = $('#pass2');
            var message  = $('#confirm-message3');
            
            //Set the colors we will be using ...
            var good_color = "#66cc66";
            var bad_color  = "#ff6666";
    
            if(password.val() == confirm.val()){
                confirm.css('background-color', good_color);
                message.css('color', good_color).html("Passwords Match!");
            } else {
                confirm.css('background-color', bad_color);
                message.css('color', bad_color).html("Passwords Do Not Match!");
            }
        });
    });
    </script>
    <!-- <script src="changePass.js"></script> -->
  </body>
</html>
