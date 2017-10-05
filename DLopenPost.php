<?php
require("deps/dbinfo.php");
require("deps/vFuncLib.php");
$respond = "";
if($con){
    mysql_select_db($dbnm, $con);
    $postdata = array();
    $dlpost = $_POST["dlpost"];
    $nor = (int)vdbsel("count(uid)","SELECT <> FROM dlposts", $con);
    if($nor>0){
        $uid = 0;
        if($dlpost=="newest"){
            for($p=$nor; $p>0; $p--){
                $uid = (int)vdbsel("uid","SELECT <> FROM dlposts WHERE pos=".$p, $con);
                $pshow = (int)vdbsel("pshow","SELECT <> FROM dlposts WHERE uid=".$uid, $con);
                if($pshow>=1){
                    $date = vdbsel("date","SELECT <> FROM dlposts WHERE uid=".$uid, $con);
                    $name = vdbsel("name","SELECT <> FROM dlposts WHERE uid=".$uid, $con);
                    $text = vdbsel("text","SELECT <> FROM dlposts WHERE uid=".$uid, $con);
                    $name = urldecode($name);
                    $date = urldecode($date);
                    $text = urldecode($text);
                    $postdata = array($date,$name,$text);
                    break;
                }
            }
        }else{
            $uid = (int)$dlpost;
            $dlpost_exists = false;
            for($i=0; $i<$nor; $i++){
                $tuid = (int)vdbsel("uid","SELECT <> FROM dlposts LIMIT ".$i.", 1", $con);
                if($tuid==$uid){ $dlpost_exists=true; break; }
            }
            if($dlpost_exists){
                $pshow = (int)vdbsel("pshow","SELECT <> FROM dlposts WHERE uid=".$uid, $con);
                if($pshow>=1){
                    $date = vdbsel("date","SELECT <> FROM dlposts WHERE uid=".$uid, $con);
                    $name = vdbsel("name","SELECT <> FROM dlposts WHERE uid=".$uid, $con);
                    $text = vdbsel("text","SELECT <> FROM dlposts WHERE uid=".$uid, $con);
                    $name = urldecode($name);
                    $date = urldecode($date);
                    $text = urldecode($text);
                    $postdata = array($date,$name,$text);
                }
            }
        }
    }
    $respond = (sizeof($postdata)>0)? json_encode($postdata):"nodata";
    mysql_close($con);
}
else{ $respond=$nodbcon; }
echo $respond;
?>