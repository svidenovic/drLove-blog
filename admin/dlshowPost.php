<?php
require("../deps/dbinfo.php");
require("../deps/vFuncLib.php");
$respond = "";
if($con){
    mysql_select_db($dbnm, $con);
    $shset = (int)$_POST["show_set"];
    $piid = (int)$_POST["piid"];
    mysql_query("UPDATE dlposts SET pshow=".$shset." WHERE uid=".$piid, $con);
    $respond = $shset;
    mysql_close($con);
}
else{ $respond=$nodbcon; }
echo $respond;
?>
