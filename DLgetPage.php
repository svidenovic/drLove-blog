<?php
require("deps/dbinfo.php");
require("deps/vFuncLib.php");
$respond = "";
if($con){
    mysql_select_db($dbnm, $con);
    $nor = (int)vdbsel("count(uid)","SELECT <> FROM dlposts", $con);
    if($nor>0){
        $validposs = array();
        for($x=0; $x<$nor; $x++){
            $pshow = (int)vdbsel("pshow","SELECT <> FROM dlposts LIMIT ".$x.", 1", $con);
            if($pshow>=1)
            { $validposs[]=(int)vdbsel("pos","SELECT <> FROM dlposts LIMIT ".$x.", 1", $con); }
        }
        $nop = sizeof($validposs);
        if($nop>0){
            $postsPerPage = 9;
            $arr = divideIn2GroupsOfIndexes($postsPerPage,$nop);
            $arrlen = ($nop>$postsPerPage)? sizeof($arr):1;
            $page = (int)$_POST["page"];
            if($page==-1){ $page=$arrlen; }
            $page = ($page<1)?1:$page;
            $page = ($page>$arrlen)?$arrlen:$page;
            $arrpg = ($arrlen==1)?$arr:$arr[$page-1];
            $plist = array();
            for($i=sizeof($arrpg)-1; $i>=0; $i--){
                $pos = $validposs[ $arrpg[$i] ];
                $uid = (int)vdbsel("uid","SELECT <> FROM dlposts WHERE pos=".$pos, $con);
                $date = vdbsel("date","SELECT <> FROM dlposts WHERE pos=".$pos, $con);
                $name = vdbsel("name","SELECT <> FROM dlposts WHERE pos=".$pos, $con);
                $date = urldecode($date);
                $name = urldecode($name);
                $plist[] = array($uid,$date,$name);
            }
            $resp = array($page,$arrlen,$plist);
            $respond = json_encode($resp);
        }
    }
    mysql_close($con);
}
else{ $respond=$nodbcon; }
echo $respond;
?>
