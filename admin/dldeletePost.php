<?php
require("../deps/dbinfo.php");
require("../deps/vFuncLib.php");
$respond = "";
if($con){
    mysql_select_db($dbnm, $con);
    $pid = (int)$_POST["pid"];
    $pos2del = (int)vdbsel("pos","SELECT <> FROM dlposts WHERE uid=".$pid,$con);
    $nor = (int)vdbsel("count(uid)","SELECT <> FROM dlposts", $con);
    mysql_query("DELETE FROM dlposts WHERE uid=".$pid, $con);
    for($i=$pos2del; $i<$nor; $i++){
        mysql_query("UPDATE dlposts SET pos=".$i." WHERE pos=".($i+1), $con);
    }
    $respond = "1";
    mysql_close($con);
}
else{ $respond=$nodbcon; }
echo $respond;
?>
