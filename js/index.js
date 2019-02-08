var lastClicked = '0',
    lifetimeStats,
    inactive90Stats,
    last15Stats,
    i = 0, 
    j = 0, 
    menu_items = [],
    c = "https://us1.prisma.sh/brian-hopkins-bab1ce/serpent-tracker-api/dev";

menu_items.push('mySnakes');
menu_items.push('snakeViewMenu');

//@import url(https://fonts.googleapis.com/css?family=Titillium+Web:300);

function flipMenu(){
    $("#sidebar").toggle();
}

$("#sidebar").toggle();


function flipDrawer(item){
    $("#"+item).toggleClass("sidebar__drawer--opened")
}

setTimeout(function(){
    $('div#'+menu_items[0]).css('display', ''); 
}, 300);


function flipDiv(mItem){
    console.log("menu id = "+mItem);
    $("div#"+mItem).css('display', '');
    $("div#"+mItem).css('padding', '20px 0');
    
    i = 0;
    for(i; i < menu_items.length; i++){
        console.log("menu_items[i] = "+menu_items[i]+"mItem = "+ mItem);
        $("li#"+menu_items[i]).addClass('active');
        
        if(menu_items[i] !== mItem){
            $("div#"+menu_items[i]).css('display', 'none');
            $("li#"+menu_items[i]).removeClass('active');
        }
    }
}

function flipDivTab(mItem){
    console.log("menu id = "+mItem);
    $("div#"+mItem).css('display', '');
    $("div#"+mItem).css('padding', '20px 0');
    
    i = 0;
    for(i; i < menu_items.length; i++){
        console.log("menu_items[i] = "+menu_items[i]+"mItem = "+ mItem);
        $("li#"+menu_items[i]).addClass('active');
        
        if(menu_items[i] !== mItem){
            $("div#"+menu_items[i]).css('display', 'none');
            $("li#"+menu_items[i]).removeClass('active');
        }
    }
}


function lastClickedStar(item, feedbackType){
    lastClicked = item.value;
    console.log(lastClicked);
    if(feedbackType === "quick"){
        buttonClicked();
    }
}

function buttonClicked(){
    var data = getUrlVars(),
        title = $('input#title').val(),
        cat = $('select#categoryVal').find(":selected").text();
        textFeedback = $('textarea#freeForm').val();
        feedbackType = "Quick",
        caseId = "000000000";
   
    if(textFeedback.length > 0){
        feedbackType = "Full";
    }
    
    if(data.hasOwnProperty("caseId")){
        caseId = String(data.caseId);
    }
    console.log(caseId);
    commit(title, cat, textFeedback, feedbackType, caseId);   
}



/* - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - */


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}



/* - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - */


function querySuccess(result){
    result = result.data.variables.result;
    console.log("Data Gathered");
    document.getElementById("dump_data").innerHTML = JSON.stringify(result);
    console.log(JSON.stringify(result));
}

function queryFailure(xhr, ajaxOptions, thrownError, result){
    console.log("FAILED: "+thrownError+"\nRESULT: "+result);
    return;
}

//bring in graphql recipes from yaml and define in json
function queryGraph(queryName){
    $.ajax({
        async: true,
        crossDomain: true,
        method: "POST",
        url: stdURL,
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        data: queryName,
        success: querySuccess (result),
        error: queryFailure(xhr, ajaxOptions, thrownError, result),
        xhrFields: {
          withCredentials: true
        }
    });            
}
