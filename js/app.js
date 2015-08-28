"use strict";

// ----------------------------------------------------------------
// constants
// ----------------------------------------------------------------

var gridSize = {
	x: 5,
	y: 6,
};

var directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}

// ----------------------------------------------------------------

// var Hero = function(gridCoords) {
//     this.gridCoords = gridCoords;
// }

function getHeroGridCoords() {
    var rowNum = $(".hero").parents(".row").index() + 1;
    var colNum = $(".hero").parents(".col").index() + 1;

    return convertToGridCoords(rowNum, colNum);
}

function convertToGridCoords(rowNum, colNum) {
    var gridCoords = {
        x: colNum,
        y: gridSize.y - rowNum + 1,
    };
    
    return gridCoords;
}

function convertToTableCoords(gridCoords) {
    var tableCoords = {
        rowNum: gridSize.y - gridCoords.y + 1,
        colNum: gridCoords.x,
        
    };
    
    return tableCoords;
}

function moveHeroToCoords(gridCoords) {
	var $hero = $(".hero").detach();
    
    var tableCoords = convertToTableCoords(gridCoords);
    
	var $cell = $(".grid .row:nth-child(" + tableCoords.rowNum + ") .col:nth-child(" + tableCoords.colNum + ")");
	$cell.append($hero);
}

function moveHero(direction) {
    var heroCoords = getHeroGridCoords();
    
    if (direction === directions.up) {
        if (heroCoords.y < gridSize.y) {
            heroCoords.y += 1;
            moveHeroToCoords(heroCoords);
        }
    }
    else if (direction === directions.down) {
        if (heroCoords.y > 1) {
            heroCoords.y -= 1;
            moveHeroToCoords(heroCoords);
        }
    }
    else if (direction === directions.left) {
        if (heroCoords.x > 1) {
            heroCoords.x -= 1;
            moveHeroToCoords(heroCoords);
        }
    }
    else if (direction === directions.right) {
        if (heroCoords.x < gridSize.x) {
            heroCoords.x += 1;
            moveHeroToCoords(heroCoords);
        }
    }
    else {
        throw new Error("Unknown direction.")
    }
}

//----------------------------------------------------------------

var listener = new window.keypress.Listener();

listener.simple_combo("up", function() {
    moveHero(directions.up);
});

listener.simple_combo("down", function() {
    moveHero(directions.down);
});

listener.simple_combo("left", function() {
    moveHero(directions.left);
});

listener.simple_combo("right", function() {
    moveHero(directions.right);
});