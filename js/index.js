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

function addSnake(){
    var snakeList = $("#dynamic-list"),
        snakeName = $("#snakeName").val(),
        newSnake = document.createElement("li");

    //confirm snake does not exist on server first.
    //if not, go ahead and add it on server
    //once call from server confirms commited to db, create GUI like this
    console.log(typeof snakeName)
    if(/^[a-zA-Z]+$/.test(snakeName)){
        newSnake.setAttribute('id', snakeName);
        $('#snakeName_RO').text(snakeName);
        newSnake.classList.add("snakeInList");
        newSnake.innerHTML = "<h6 id='snakeRowItem' onclick='showSnake("+snakeName+")'>"+snakeName+"</h6> \
                              <h6 class='delSnake' onclick='removeSnake("+snakeName+");'>X</h6>"
        snakeList.append(newSnake);
        $('#snakeName').val("");
    }else{
        window.alert("only letters please");
    }

    //else show error alert box

}


function removeSnake(snakeName){
    var snakeList = document.getElementById("dynamic-list");
//    snakeName = snakeName.parent().attr("id");
    console.log(snakeName);
    snakeList.removeChild(snakeName);
    $('#snakeName_RO').text("Snake Removed");

    //delete from server too.
}

function showSnake(snakeName){
    snakeName = snakeName.id;
    console.log("SHOWING SNAKE NAMED: "+snakeName);
    $('#snakeName_RO').text(snakeName);

    //get snake details and render them in the viewer.
}

function editSnake(){
    console.log($("#snakeName_RO").text());
}


(function loadSnakes(){
    console.log("ran load snakes");
    var snakeList = $("#dynamic-list"),
        snakeName = $("#snakeName").val(),
        newSnake = document.createElement("li");

    //get list of snakes from the server
    //do for each with this code
    //for name in snakeName: 
        newSnake.setAttribute('id', snakeName);
        newSnake.classList.add("snakeInList");
        newSnake.innerHTML = "<h6 style='min-width: 80px; cursor:pointer;' onclick='showSnake("+snakeName+")'>"+snakeName+"</h6><h6 class='delSnake' onclick='removeSnake("+snakeName+");'>X</h6>"
        snakeList.append(newSnake)
    
    //throw an error w/ alert box if there is a fault.
})();