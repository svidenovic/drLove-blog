<?php
require("../deps/dbinfo.php");
require("../deps/vFuncLib.php");
$respond = "";
if($con){
    mysql_select_db($dbnm, $con);
    $sta2s = (int)vdbsel("status","SELECT <> FROM dllog WHERE 1", $con);
    if($sta2s>=1){
        $pnew = $_POST["pnew"];
        $pold = $_POST["pold"];
        $indbpw = vdbsel("passwd","SELECT <> FROM dllog WHERE 1", $con);
        if($indbpw == md5($pold)){
            mysql_query("UPDATE dllog SET passwd='".md5($pnew)."' WHERE 1", $con);
            $respond = "1";
        }else{ $respond = "0"; }
    }
    mysql_close($con);
}
else{ $respond=$nodbcon; }
echo $respond;
?>
