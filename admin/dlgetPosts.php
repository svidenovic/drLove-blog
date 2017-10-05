<?php
require("../deps/dbinfo.php");
require("../deps/vFuncLib.php");
$respond = "";
if($con){
    mysql_select_db($dbnm, $con);
    $nor = (int)vdbsel("count(uid)","SELECT <> FROM dlposts", $con);
    $posts = array();
    for($x=$nor-1; $x>=0; $x--){
        $uid = (int)vdbsel("uid","SELECT <> FROM dlposts LIMIT ".$x.", 1", $con);
        $date = vdbsel("date","SELECT <> FROM dlposts LIMIT ".$x.", 1", $con);
        $date = urldecode($date);
        $name = vdbsel("name","SELECT <> FROM dlposts LIMIT ".$x.", 1", $con);
        $name = urldecode($name);
        $pshow = (int)vdbsel("pshow","SELECT <> FROM dlposts LIMIT ".$x.", 1", $con);
        $pshow = "".(($pshow<=0)?0:1);
        $posts[] = array($uid,$date,$name,$pshow);
    }
    $respond = json_encode($posts);
    mysql_close($con);
}
else{ $respond=$nodbcon; }
echo $respond;
?>
