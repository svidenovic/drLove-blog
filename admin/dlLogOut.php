<?php
require("../deps/dbinfo.php");
require("../deps/vFuncLib.php");
$respond = "";
if($con){
    mysql_select_db($dbnm, $con);
    mysql_query("UPDATE dllog SET status=0 WHERE 1", $con);
    $st = (int)vdbsel("status","SELECT <> FROM dllog WHERE 1", $con);
    $st = "".(($st<=0)?0:1);
    if($st=="0"){ $respond="logout_success"; }
    else{ $respond="Logout fail, try again."; }
    mysql_close($con);
}
else{ $respond=$nodbcon; }
echo $respond;
?>
