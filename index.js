var c = document.getElementById("myCanvas");
var height = 1000;
var n = 10;
var matrix = []

c.addEventListener('mousedown', createObstacle, false);

function createObstacle(e){
    obstacles.push(matrix[Math.floor(e.pageX/(height/n))][Math.floor(e.pageY/(height/n))])
    reDraw()
}

function Square(i, j){
    this.x = i;
    this.y = j;
    this.h = 0;
    this.draw = function (color){
        let ctx = c.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(this.x * height/n, this.y*  height/n, height/n, height/n)
        ctx.stroke()
    }

}
var position = {x: n-1, y: n-1}
for(var i = 0 ; i < n ; i++){
    matrix.push([])
    for(var j=0; j< n; j++){
        matrix[i][j] = new Square(i,j);
        matrix[i][j].h = position.x - i + position.y-j
        matrix[i][j].draw("#D3D3D3")
        
    }
}

function findNeigh(pos, array){
    var possibles = []
    if(pos.x < n -1){
        possibles.push(array[pos.x+1][pos.y])
    }
    if(pos.x > 0){
        possibles.push(array[pos.x-1][pos.y])
    }
    if(pos.y < n-1){
        possibles.push(array[pos.x][pos.y+1])
    }
    if(pos.y > 0){
        possibles.push(array[pos.x][pos.y-1])
    }
    
    return possibles
}

var openPositions = []
var closedPositions = []
var obstacles = []
function reDraw(){
    for(var i = 0 ; i < n ; i++){
        for(var j=0; j< n; j++){
            matrix[i][j].draw("#D3D3D3")  
        }
    }
    obstacles.forEach(p => p.draw("white"))
}
function next(pos){
    reDraw()
    openPositions.push(...findNeigh(pos, matrix))
    closedPositions.forEach(p => p.draw("#323232"))
    var exploring = openPositions.filter( p => closedPositions.indexOf(p) == -1 && obstacles.indexOf(p) == -1)
    exploring.forEach(p => p.draw("#008000"))
    var best = exploring.reduce((a,b)=> Math.min(a.h, b.h) == a.h ? a : b ,openPositions[0].h)
    closedPositions.push(best)
    setTimeout(function (){
        if(position.x != pos.x || position.y != pos.y){
        next({x:best.x, y: best.y})
        }
    },1000)

}




