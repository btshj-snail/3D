/**
 * Created by snail on 17-6-29.
 */


function setScreenScene(el){
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;

    console.log(width)
    console.log(height)
    el.width = width;
    el.height= height;
}

function initCanvasContext(co){
    if(co && co.getContext){
        return co.getContext("2d");
    }
    return null;
}

function drawInCanvas(canvasEl,context){
    var dy = 50,dx = 50,x=0,y=0,w=canvasEl.width,h= canvasEl.height;

    var xy = 10;

    while(y<h){
        y = y+dy;
        context.moveTo(x,y);
        context.lineTo(w,y);
        context.stroke();
        context.font = "1px calibri";
        context.fillText(xy,x,y);
        xy += 10;
    }

    y = 0;
    xy = 10;
    while(x<w){
        x = x+dx;
        context.moveTo(x,y);
        context.lineTo(x,h);
        context.stroke();
        context.font = "1px calibri";
        context.fillText(xy,x,10);
        xy+=10
    }

}

window.onload = function(){
    var co = document.getElementById("canvas");
    setScreenScene(co);
    var context = initCanvasContext(co);

    if(context){
        drawInCanvas(co,context);
    }
}