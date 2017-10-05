<?php
require("../deps/dbinfo.php");
require("../deps/vFuncLib.php");
$respond = "";
if($con){
    mysql_select_db($dbnm, $con);
    $pid = (int)$_POST["pid"];
    $pname = $_POST["pname"]; $pname = urlencode($pname);
    $pdate = $_POST["pdate"]; $pdate = urlencode($pdate);
    $ptext = $_POST["ptext"]; $ptext = urlencode($ptext);
    $id_exists = false;
    $nor = (int)vdbsel("count(uid)","SELECT <> FROM dlposts", $con);
    for($x=0; $x<$nor; $x++){
        $uid = (int)vdbsel("uid","SELECT <> FROM dlposts LIMIT ".$x.", 1", $con);
        if($pid==$uid){ $id_exists=true; break; }
        else{ $id_exists=false; }
    }
    if(!$id_exists){
        $pos = $nor+1;
        mysql_query("INSERT INTO dlposts (pos,uid,date,name,text,pshow)
        VALUES (".$pos.",".$pid.",'".$pdate."','".$pname."','".$ptext."',0)", $con);
        $respond = "saved";
    }else{
        mysql_query("UPDATE dlposts SET date='".$pdate."',name='".$pname."',text='".$ptext."' WHERE uid=".$pid, $con);
        $respond = "edited";
    }
    mysql_close($con);
}
else{ $respond=$nodbcon; }
echo $respond;
?>
