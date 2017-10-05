<?php

function vdbsel( $return, $selectquery, $conn ){
    $selectquery = str_replace( "<>", $return, $selectquery );
    $ret = mysql_query( $selectquery, $conn );
    $ret = mysql_fetch_assoc( $ret );
    $ret = $ret[ $return ];
    return $ret;
}

function divideIn2GroupsOfIndexes( $elementsPerPage, $numOfElements ){
    $noe=$numOfElements;   $noe=($noe<0)?0:$noe;
    $epp=$elementsPerPage; $epp=($epp<1)?1:$epp;
    $pages=0; $newArr2D=array();
    if($noe>0){
        if($noe<=$epp){ $pages=1; }else{
            $rem = $noe%$epp;
            $pages = (($noe-$rem)/$epp)+(($rem>0)?1:0);
        }
        if($pages<=1){
            for($x=0; $x<$noe; $x++){ $newArr2D[]=$x; }
        }else{
            $tmp=0; $tmparr=array();
            for($p=1; $p<=$pages; $p++){
                $tmparr=array();
                for($i=$epp; $i>0; $i--){
                    $tmp = ($p*$epp)-$i;
                    if($tmp<$noe){ $tmparr[]=$tmp; }
                    else{ break; }
                }
                if(sizeof($tmparr)>0){ $newArr2D[]=$tmparr; }
            }
        }
    }
    return $newArr2D;
}

?>