// <!--
var listHolder_expanded = false;
var topicsRotated = false;
var infoRotated = false;
var helpRotated = false;
var pDiv = $("#postMainDivstuff");

$(document).ready(function(){
    $("#preloaderIMG").remove();
    onLoadDo();
    $("#DLtopicsBtn").click(function(){
        DoRotating("t", false);
        if(!listHolder_expanded){
            expandListHolder(true,function(){ fillWtopics(); },function(){});
        }else{ fillWtopics(); }
    });
    $("#DLinfoBtn").click(function(){
        DoRotating("i", false);
        if(!listHolder_expanded){
            expandListHolder(true,function(){ fillWinfo(); },function(){});
        }else{ fillWinfo(); }
    });
    $("#DLhelpBtn").click(function(){
        DoRotating("h", false);
        if(!listHolder_expanded){
            expandListHolder(true,function(){ fillWhelp(); },function(){});
        }else{ fillWhelp(); }
    });
});

function DoRotating(strBtn, absDesel){
    var top = $("#DLtopicsBtn");
    var inf = $("#DLinfoBtn");
    var hlp = $("#DLhelpBtn");
    if(absDesel){
        $(top).css("transform","rotate(0deg)");
        $(inf).css("transform","rotate(0deg)");
        $(hlp).css("transform","rotate(0deg)");
        topicsRotated = false;
        infoRotated = false;
        helpRotated = false;
    }else{
    switch(strBtn){
        case "t":
            $(top).css("transform","rotate(90deg)");
            $(inf).css("transform","rotate(0deg)");
            $(hlp).css("transform","rotate(0deg)");
            topicsRotated = true;
            infoRotated = false;
            helpRotated = false;
            break;
        case "i":
            $(top).css("transform","rotate(0deg)");
            $(inf).css("transform","rotate(90deg)");
            $(hlp).css("transform","rotate(0deg)");
            topicsRotated = false;
            infoRotated = true;
            helpRotated = false;
            break;
        case "h":
            $(top).css("transform","rotate(0deg)");
            $(inf).css("transform","rotate(0deg)");
            $(hlp).css("transform","rotate(90deg)");
            topicsRotated = false;
            infoRotated = false;
            helpRotated = true;
            break;
        default: break;
    }}
}

function onLoadDo(){
    listHolder_expanded = false;
    pDiv = $("#postMainDivstuff");
    var load_post="newest";
    var wlh = window.location.href;
    if(!!wlh.match("dlpost=")){
        var dlpost = getUrlVars()["dlpost"];
        if(str_is_num(dlpost)){
            load_post=(parseInt(dlpost)>0)?dlpost:"newest";
        }
    }
    dlopenPost(load_post);
}

function dlopenPost(dlpost){ 
    $.post("DLopenPost.php", {"dlpost":dlpost}, function(resp){
        if(resp=="nodata"){ postMainDiv_Fill("","","","No data available"); }
        else if(resp==nodbcon){ postMainDiv_Fill("","","",resp); }
        else{
            var arr = JSON && JSON.parse(resp) || $.parseJSON(resp);
            if(arr.length>0){
                postMainDiv_Fill(arr[0],arr[1],arr[2],"0");
            }
        }
    });
}

function postMainDiv_Fill( pdate, pname, ptext, failstr ){
    $(pDiv).html("");
    if(failstr=="0"){
        var dateSpan = document.createElement("span");
        $(dateSpan).attr("class","dateSpan");
        $(dateSpan).html(pdate);
        $(dateSpan).hide();
        var nameSpan = document.createElement("span");
        $(nameSpan).attr("class","nameSpan");
        $(nameSpan).html(pname);
        $(nameSpan).hide();
        var textDiv = document.createElement("div");
        $(textDiv).attr("class","textDiv");
        var spnText = undefined;
        var tmptxt = ptext.split("\n");
        for(var t=0; t<tmptxt.length; t++){
            spnText = document.createElement("span");
            $(spnText).attr("class","textSpan");
            $(spnText).html(tmptxt[t]);
            $(textDiv).append(spnText);
            if(t<(tmptxt.length-1)){ $(textDiv).append("<br/>"); }
        }
        // ptext.replace(/\n/g,"<br/>")
        var prpt = document.createElement("img");
        $(prpt).attr("class","txtPrompt");
        $(prpt).attr("src","deps/dlprompt.gif");
        $(textDiv).append(prpt);
        $(textDiv).hide();
        $(pDiv).append(dateSpan);
        $(pDiv).append(nameSpan);
        $(pDiv).append(textDiv);
        $(dateSpan).fadeIn(250, function(){
            $(nameSpan).fadeIn(250, function(){
                $(textDiv).fadeIn(500);
            });
        });
    }else{
        var failspn = document.createElement("span");
        $(failspn).attr("class","failMsg");
        $(failspn).html(failstr);
        $(failspn).hide();
        var rldbtn = document.createElement("button");
        $(rldbtn).attr("class","errorRLDbtn");
        $(rldbtn).text("RELOAD");
        $(rldbtn).hide();
        $(pDiv).append(failspn);
        $(pDiv).append(rldbtn);
        $(failspn).fadeIn(500);
        $(rldbtn).fadeIn(500);
        $(rldbtn).click(function(){ onLoadDo(); });
    }
}

function expandListHolder( boolTF, funcOnEndT, funcOnEndF){
    $("#DLtopicsBtn").prop("disabled", true);
    $("#DLinfoBtn").prop("disabled", true);
    $("#DLhelpBtn").prop("disabled", true);
    if(boolTF){
        $(pDiv).fadeOut(250, function(){
            $(pDiv).html(""); $(pDiv).fadeIn();
            var listHolder = document.createElement("div");
            $(listHolder).attr("class","listHolder");
            $(listHolder).attr("id","dllistHolder");
            $(listHolder).css("width","0");
            $(pDiv).append(listHolder);
            $(listHolder).animate({width:750}, 500, function(){
                funcOnEndT();
                $("#DLtopicsBtn").prop("disabled", false);
                $("#DLinfoBtn").prop("disabled", false);
                $("#DLhelpBtn").prop("disabled", false);
            });
        });
    }
    else{
        var innerDiv = undefined;
        if(topicsRotated){ innerDiv = $("#dllistDiv"); }
        if(infoRotated){ innerDiv = $("#dlinfoDiv"); }
        if(helpRotated){ innerDiv = $("#dlhelpDiv"); }
        $(innerDiv).hide(250, function(){
            $("#dllistHolder").html("");
            $("#dllistHolder").animate({width:0}, 500, function(){
                listHolder_expanded = false;
                funcOnEndF();
                $("#DLtopicsBtn").prop("disabled", false);
                $("#DLinfoBtn").prop("disabled", false);
                $("#DLhelpBtn").prop("disabled", false);
            });
        });
    }
}

function fillWtopics(){
    var listHolder = $("#dllistHolder");
    $(listHolder).html("");
    var queryDivHld = document.createElement("div");
    $(queryDivHld).attr("class","queryDivHld");
    $(queryDivHld).attr("id","dlqueryDivHld");
    var queryDiv = document.createElement("div");
    $(queryDiv).attr("class","queryDiv");
    $(queryDiv).attr("id","dlqueryDiv");
    var LarwBtn = document.createElement("button");
    $(LarwBtn).attr("class","LarwBtn");
    $(LarwBtn).attr("id","dlLarwBtn");
    $(LarwBtn).text("");
    var pagesta2s1 = document.createElement("input");
    $(pagesta2s1).attr("class","pagesta2s1");
    $(pagesta2s1).attr("id","pageSta2sCurrent");
    $(pagesta2s1).attr("type","text");
    $(pagesta2s1).val("0");
    var spslash = document.createElement("input");
    $(spslash).attr("class","spslash");
    $(spslash).attr("type","text");
    $(spslash).val("/");
    $(spslash).prop("readonly",true);
    var pagesta2s2 = document.createElement("input");
    $(pagesta2s2).attr("class","pagesta2s2");
    $(pagesta2s2).attr("id","pageSta2sOverall");
    $(pagesta2s2).attr("type","text");
    $(pagesta2s2).val("0");
    $(pagesta2s2).prop("readonly",true);
    var RarwBtn = document.createElement("button");
    $(RarwBtn).attr("class","RarwBtn");
    $(RarwBtn).attr("id","dlRarwBtn");
    $(RarwBtn).text("");
    $(queryDiv).append(LarwBtn);
    $(queryDiv).append(pagesta2s1);
    $(queryDiv).append(spslash);
    $(queryDiv).append(pagesta2s2);
    $(queryDiv).append(RarwBtn);
    $(queryDivHld).append(queryDiv);
    var RLDbtn = document.createElement("button");
    $(RLDbtn).attr("class","listRLDbtn");
    $(RLDbtn).attr("id","dlLiRLDbtn");
    $(RLDbtn).text("");
    var Xbtn = document.createElement("button");
    $(Xbtn).attr("class","listXbtn");
    $(Xbtn).attr("id","dlLiXbtn");
    $(Xbtn).text("");
    var listDiv = document.createElement("div");
    $(listDiv).attr("class","listDiv");
    $(listDiv).attr("id","dllistDiv");
    $(listHolder).append(queryDivHld);
    $(listHolder).append(RLDbtn);
    $(listHolder).append(Xbtn);
    $(listHolder).append(listDiv);
    getListPage(-1);
    $(LarwBtn).click(function(){ arrowGo("L",false); });
    $(RarwBtn).click(function(){ arrowGo("R",false); });
    $(RLDbtn).click(function(){
        var pg = $("#pageSta2sCurrent").val();
        pg = parseInt(pg);
        getListPage(pg);
    });
    $(Xbtn).click(function(){
        expandListHolder(false, function(){}, function(){
            DoRotating("", true);
            onLoadDo();
        });
    });
    $(pagesta2s1).change(function(){
        var tval = $(this).val();
        var overall = $("#pageSta2sOverall").val();
        tval = (str_is_num(tval))?tval:overall;
        tval = parseInt(tval);
        tval = (tval<1)?1:tval;
        tval = (tval>overall)?overall:tval;
        $(this).val(tval);
        getListPage(tval);
    });
    listHolder_expanded = true;
    $("#DLtopicsBtn").prop("disabled", false);
    $("#DLinfoBtn").prop("disabled", false);
    $("#DLhelpBtn").prop("disabled", false);
}

function fillWinfo(){
    var infoHolder = $("#dllistHolder");
    $(infoHolder).html("");
    var divspace = document.createElement("div");
    $(divspace).attr("class","idivspace");
    var Xbtn = document.createElement("button");
    $(Xbtn).attr("class","listXbtn");
    $(Xbtn).attr("id","idlLiXbtn");
    $(Xbtn).text("");
    var infoDiv = document.createElement("div");
    $(infoDiv).attr("class","infoDiv");
    $(infoDiv).attr("id","dlinfoDiv");
    $(infoDiv).hide();
    $(infoHolder).append(divspace);
    $(infoHolder).append(Xbtn);
    $(infoHolder).append(infoDiv);
    $(infoDiv).show(250);
    $(Xbtn).click(function(){
        expandListHolder(false, function(){}, function(){
            DoRotating("", true);
            onLoadDo();
        });
    });
    listHolder_expanded = true;
    $("#DLtopicsBtn").prop("disabled", false);
    $("#DLinfoBtn").prop("disabled", false);
    $("#DLhelpBtn").prop("disabled", false);
}

function fillWhelp(){
    var helpHolder = $("#dllistHolder");
    $(helpHolder).html("");
    var divspace = document.createElement("div");
    $(divspace).attr("class","hdivspace");
    var Xbtn = document.createElement("button");
    $(Xbtn).attr("class","listXbtn");
    $(Xbtn).attr("id","hdlLiXbtn");
    $(Xbtn).text("");
    var helpDiv = document.createElement("div");
    $(helpDiv).attr("class","helpDiv");
    $(helpDiv).attr("id","dlhelpDiv");
    $(helpDiv).hide();
    $(helpHolder).append(divspace);
    $(helpHolder).append(Xbtn);
    $(helpHolder).append(helpDiv);
    $(helpDiv).show(250);
    $(Xbtn).click(function(){
        expandListHolder(false, function(){}, function(){
            DoRotating("", true);
            onLoadDo();
        });
    });
    listHolder_expanded = true;
    $("#DLtopicsBtn").prop("disabled", false);
    $("#DLinfoBtn").prop("disabled", false);
    $("#DLhelpBtn").prop("disabled", false);
}

function getListPage( page ){
    $.post("DLgetPage.php", {"page":page}, function(r){
        $("#dllistDiv").html("");
        if(r==nodbcon||r==""){
            var failstr = (r==nodbcon)?nodbcon:"No posts available";
            var failspn = document.createElement("span");
            $(failspn).attr("class","failMsg2");
            $(failspn).html(failstr);
            $(failspn).hide();
            $("#dllistDiv").append(failspn);
            $(failspn).fadeIn(500);
            $("#pageSta2sOverall").val("0");
            $("#pageSta2sCurrent").val("0");
        }else{
            var tmp = JSON && JSON.parse(r) || $.parseJSON(r);
            var pg = parseInt(tmp[0]);
            var pages = parseInt(tmp[1]);
            var posts = tmp[2];
            var pitem = undefined;
            $("#dllistDiv").hide();
            for(p in posts){
                pitem = document.createElement("button");
                $(pitem).attr("class","postItem");
                $(pitem).attr("id","postItm-"+posts[p][0]);
                $(pitem).attr("pid",posts[p][0]);
                $(pitem).html(posts[p][1]+" - "+posts[p][2]);
                $("#dllistDiv").append(pitem);
                $(pitem).click(function(){
                    var pid = parseInt($(this).attr("pid"));
                    expandListHolder(false,function(){},function(){
                        window.location = "?dlpost="+pid;
                    });
                });
            }
            $("#dllistDiv").show(250);
            $("#pageSta2sOverall").val(pages);
            $("#pageSta2sCurrent").val(pg);
        }
        arrowGo("",true);
    });
}

function arrowGo(strLR, just_update){
    var current = $("#pageSta2sCurrent");
    var overall = $("#pageSta2sOverall");
    var Lbtn = $("#dlLarwBtn");
    var Rbtn = $("#dlRarwBtn");
    currv = parseInt($(current).val());
    overv = parseInt($(overall).val());
    function btnupdateserv(){
        if(currv>1 && currv<overv){
            $(Lbtn).prop("disabled", false);
            $(Lbtn).fadeTo(1, 1.0);
            $(Rbtn).prop("disabled", false);
            $(Rbtn).fadeTo(1, 1.0);
        }else{
            if(currv<=1 && overv<=1){
                $(Lbtn).prop("disabled", true);
                $(Lbtn).fadeTo(1, 0.25);
                $(Rbtn).prop("disabled", true);
                $(Rbtn).fadeTo(1, 0.25);
            }else{
                if(currv<=1){
                    $(Lbtn).prop("disabled", true);
                    $(Lbtn).fadeTo(1, 0.25);
                    $(Rbtn).prop("disabled", false);
                    $(Rbtn).fadeTo(1, 1.0);
                }else if(currv>=overv){
                    $(Lbtn).prop("disabled", false);
                    $(Lbtn).fadeTo(1, 1.0);
                    $(Rbtn).prop("disabled", true);
                    $(Rbtn).fadeTo(1, 0.25);
                }
            }
        }
    }
    if(just_update){ btnupdateserv(); }else{
        if(strLR=="L"){
            if(currv>1){
                currv -= 1;
                $(current).val(currv);
                $(current).change();
                btnupdateserv();
            }
        }else if(strLR=="R"){
            if(currv<overv){
                currv += 1;
                $(current).val(currv);
                $(current).change();
                btnupdateserv();
            }
        }
    }
}
// -->


