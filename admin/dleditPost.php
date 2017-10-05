<?php
require("../deps/dbinfo.php");
require("../deps/vFuncLib.php");
$respond = "";
if($con){
    mysql_select_db($dbnm, $con);
    $pid = (int)$_POST["pid"];
    $date = vdbsel("date","SELECT <> FROM dlposts WHERE uid=".$pid, $con);
    $date = urldecode($date);
    $name = vdbsel("name","SELECT <> FROM dlposts WHERE uid=".$pid, $con);
    $name = urldecode($name);
    $text = vdbsel("text","SELECT <> FROM dlposts WHERE uid=".$pid, $con);
    $text = urldecode($text);
    $arr = array($date,$name,$text);
    $respond = json_encode($arr);
    mysql_close($con);
}
else{ $respond=$nodbcon; }
echo $respond;
?>
