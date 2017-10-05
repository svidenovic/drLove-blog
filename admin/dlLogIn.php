<?php
require("../deps/dbinfo.php");
require("../deps/vFuncLib.php");
$respond = "";
if($con){
    mysql_select_db($dbnm, $con);
    $passwd = md5($_POST["password"]);
    $inpass = vdbsel("passwd","SELECT <> FROM dllog WHERE 1", $con);
    if($inpass==$passwd){
        mysql_query("UPDATE dllog SET status=1 WHERE 1", $con);
        $respond = "1";
    }else{ $respond = "0"; }
    mysql_close($con);
}
else{ $respond=$nodbcon; }
echo $respond;
?>
