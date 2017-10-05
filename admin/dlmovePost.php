<?php
require("../deps/dbinfo.php");
require("../deps/vFuncLib.php");
$respond = "";
if($con){
    mysql_select_db($dbnm, $con);
    $pid = $_POST["pid"];
    $sud = $_POST["strUD"];
    $nor = (int)vdbsel("count(uid)", "SELECT <> FROM dlposts", $con);
    $respond = "0";
    if($nor>1){
        if($sud=="U"){
            $pos = (int)vdbsel("pos", "SELECT <> FROM dlposts WHERE uid=".$pid, $con);
            if($pos<$nor){
                $tpos = (int)vdbsel("pos", "SELECT <> FROM dlposts WHERE pos=".($pos+1)."", $con);
                mysql_query("UPDATE dlposts SET pos=0 WHERE pos=".$pos, $con);
                mysql_query("UPDATE dlposts SET pos=".$pos." WHERE pos=".$tpos, $con);
                mysql_query("UPDATE dlposts SET pos=".$tpos." WHERE pos=0", $con);
                $respond = "1";
            }
        }
        elseif($sud=="D"){
            $pos = (int)vdbsel("pos", "SELECT <> FROM dlposts WHERE uid=".$pid, $con);
            if($pos>1){
                $tpos = (int)vdbsel("pos", "SELECT <> FROM dlposts WHERE pos=".($pos-1)."", $con);
                mysql_query("UPDATE dlposts SET pos=0 WHERE pos=".$pos, $con);
                mysql_query("UPDATE dlposts SET pos=".$pos." WHERE pos=".$tpos, $con);
                mysql_query("UPDATE dlposts SET pos=".$tpos." WHERE pos=0", $con);
                $respond = "1";
            }
        }
    }
    mysql_close($con);
}
else{ $respond=$nodbcon; }
echo $respond;
?>
