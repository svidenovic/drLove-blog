<?php
require("../deps/dbinfo.php");
require("../deps/vFuncLib.php");
$respond = "";
if($con){
    mysql_select_db($dbnm, $con);
    $sta2s = (int)vdbsel("status","SELECT <> FROM dllog WHERE 1", $con);
    $respond = $sta2s;
    mysql_close($con);
}
else{ $respond=$nodbcon; }
echo $respond;
?>
