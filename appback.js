var canvas = document.querySelector(".visualizer");


class DataPoint{

    constructor(deltaX, deltaY){
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }

    getDeltaX(){
        return this.deltaX;
    }

    getDeltaY(){
        return this.deltaY;
    }
}

class AudioPlotter {
    
    constructor(Canvas_canvas,
                long_maxX,
                long_minX,
                long_maxY,
                long_minY){
        this.Canvas_canvas = Canvas_canvas;

        this.long_maxX = long_maxX;
        this.long_minX = long_minX;

        this.long_maxY = long_maxY;
        this.long_minY = long_minY;
        
        this.startSkipping = false;
        
        this.DP_array_dataPoints = [];

        this.contentWidth  = Canvas_canvas.width;
        this.contentHeight = Canvas_canvas.height;
        
        console.log(this.Canvas_canvas);

        this.clear();
    }

    addPoint(DP_dataPoint){
        if(this.startSkipping){
            if(this.DP_array_dataPoints.length != 0){
                // Remove first element
                this.DP_array_dataPoints = this.DP_array_dataPoints.slice(1, this.DP_array_dataPoints.length);
            }
        }

        this.DP_array_dataPoints.push(DP_dataPoint);

        this.update();
    }

    setMaxX(max){
        this.long_maxX = max;
    }

    setMinX(min){
        this.long_minX = min;
    }

    setMaxY(max){
        this.long_maxY = max;
    }   

    setMinY(min){
        this.long_minY = min;
    }

    update(){
        /** TODO: Add drawing logic here */
    }

    clear(){
        this.Canvas_canvas.fillStyle = "#FF0000";
        this.Canvas_canvas.fill();
    }

    drawEdges(){
        
    }
}

function init2(){
    context2 = myCanvas2.getContext('2d')
    context2.fillStyle = "#737373";
    context2.fill();
}

init2();

// var canvas = myCanvas2.getContext('2d');

// const MAXX = 0;
// const MINX = 0;
// const MAXY = 0;
// const MINY = 0;

// var audioPlotter = new AudioPlotter(canvas, MAXX, MINX, MAXY, MINY);

// var onButtonClick = function(){
//     canvas.fillStyle = "#FF0000";
//     canvas.fill();
// }

// document
//         .querySelector('button[data-action="generate"]')
//         .addEventListener("click", onButtonClick);