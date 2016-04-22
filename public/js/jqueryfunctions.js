window.onload = changecolors;
var x;

function changecolors() {
  
        x = 3;
        setInterval(change, 3000);
   
}

function change() {
    var color;
    
    if (x === 1) {
        //green
       color = 'rgba(77, 153, 0,  0.5)';
        x = 2;
    }else if(x === 2){
        //pink
        color = 'rgba(255, 128, 128,  0.5)';
        x = 3;
    }else if(x === 3){
        //blue
        color ='rgba(77, 136, 255, 0.5)'; 
        x = 4;
    }else{
        //purple
        color = 'rgba(187, 153, 255, 0.5)'; 
        x = 1;
    }
    
    $("#mainBackground").css({"background-color":color});
    // document.body.style.background = color;
}

