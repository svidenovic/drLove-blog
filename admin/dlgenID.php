<?php
require("../deps/dbinfo.php");
require("../deps/vFuncLib.php");
$respond = "";
if($con){
    mysql_select_db($dbnm, $con);
    $arr = array();
    $nor = (int)vdbsel("count(uid)","SELECT <> FROM dlposts", $con);
    $newid = 1;
    for($x=0; $x<$nor; $x++){
        $uid = (int)vdbsel("uid","SELECT <> FROM dlposts LIMIT ".$x.", 1", $con);
        $arr[] = $uid;
    }
    if(sizeof($arr)>0){
        $arr[]=0;
        sort($arr, SORT_NUMERIC);
        $newid=max($arr)+1;
        for( $x=0; $x<(sizeof($arr)-1); $x++ )
        { if(($arr[$x+1]-$arr[$x])>1){ $newid=$arr[$x]+1; break; } }
    }
    $respond = $newid;
    mysql_close($con);
}
else{ $respond=$nodbcon; }
echo $respond;
?>
