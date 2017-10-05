
var nodbcon = "No database connection";

function getUrlVars(){    
    var vars=[], hash;
    var wlh = window.location.href;
    var hashes = wlh.slice(wlh.indexOf('?')+1).split('&');
    for(var i=0; i<hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function str_is_num(astr){
    var vldchrs = "0123456789";
    var astr_valid=false, vldch=false;
    for(a in astr){
        for(v in vldchrs){
            if(astr[a]==vldchrs[v]){ vldch=true; break; }
            else{ vldch=false; }
        }
        if(!vldch){ astr_valid=false; break; }
        else{ astr_valid=true; }
    }
    return astr_valid;
}

function divideIn2GroupsOfIndexes( elementsPerPage, numOfElements ){
    var noe=numOfElements;   noe=(noe<0)?0:noe;
    var epp=elementsPerPage; epp=(epp<1)?1:epp;
    var pages=0; var newArr2D=[];
    if(noe>0){
        if(noe<=epp){ pages=1; }else{
            var rem = noe%epp;
            pages = ((noe-rem)/epp)+((rem>0)?1:0);
        }
        if(pages<=1){
            for(var x=0; x<noe; x++){ newArr2D.push(x); }
        }else{
            var tmp=0; var tmparr=[];
            for(var p=1; p<=pages; p++){
                tmparr=[];
                for(var i=epp; i>0; i--){
                    tmp = (p*epp)-i;
                    if(tmp<noe){ tmparr.push(tmp); }
                    else{ break; }
                }
                if(tmparr.length>0){ newArr2D.push(tmparr); }
            }
        }
    }
    return newArr2D;
}




