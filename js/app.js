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

var heroMarkup = "<div class='hero'></div>";

var Hero = function() {
    this.gridCoords = {
        x: 3,
        y: 1,
    };

    this._redraw();
}

Hero.prototype._redraw = function () {
    var $hero = $(".hero");

    // if intialization
    if ($hero.length == 0) {
        $hero = $(heroMarkup);
    }
    else {
        $hero = $hero.detach();
    }

    var tableCoords = convertToTableCoords(this.gridCoords);
    var $cell = $(".grid .row:nth-child(" + tableCoords.rowNum + ") .col:nth-child(" + tableCoords.colNum + ")");

    $cell.append($hero);
}

Hero.prototype.move = function (direction) {
    // todo: refactor this two blocks

    var isHeroReachedWater =
        this.gridCoords.y === gridSize.y && 
        direction === directions.up;

    if (isHeroReachedWater) {
        this.gridCoords = {
            x: 3,
            y: 1,
        };

        this._redraw();
        return;
    }

    if (direction === directions.up) {
        if (this.gridCoords.y < gridSize.y) {
            this.gridCoords.y += 1;
            this._redraw();
        }
    }
    else if (direction === directions.down) {
        if (this.gridCoords.y > 1) {
            this.gridCoords.y -= 1;
            this._redraw();
        }
    }
    else if (direction === directions.left) {
        if (this.gridCoords.x > 1) {
            this.gridCoords.x -= 1;
            this._redraw();
        }
    }
    else if (direction === directions.right) {
        if (this.gridCoords.x < gridSize.x) {
            this.gridCoords.x += 1;
            this._redraw();
        }
    }
    else {
        throw new Error("Unknown direction.");
    }
}

// utils

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

//----------------------------------------------------------------

var hero = new Hero();

var listener = new window.keypress.Listener();

listener.simple_combo("up", function() {
    hero.move(directions.up);
});

listener.simple_combo("down", function() {
    hero.move(directions.down);
});

listener.simple_combo("left", function() {
    hero.move(directions.left);
});

listener.simple_combo("right", function() {
    hero.move(directions.right);
});