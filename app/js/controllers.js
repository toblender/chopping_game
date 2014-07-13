'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('GameBoardCtrl', ['$scope', function($scope) {
    //Generate the current gameboard
  
    var maxCells = 6; 
    $scope.rows=[];
    $scope.counter=0;
    $scope.playerSide=0;

    function generateBranch(currentRow){
        var side = Math.round(Math.random()); //0 left, 1 right
        //Make branches appear 70% of the time
        var hasBranch = !(Math.random()>=0.7 && Math.random()<=1);
        return {side:side,
                hasBranch:hasBranch};
    }

    function createNextBranch(){
        var cells={};
        if ($scope.counter % 2){
            cells = generateBranch();
        }else{
            cells = {side:0,hasBranch:0};
        }
        $scope.rows.unshift(cells);
        if ($scope.rows.length > maxCells){
            $scope.rows.pop();
        } 
        $scope.counter+=1;
    }

    function generateGameBoard(){
        for (var i=0;i<maxCells;i++){
            createNextBranch();
        }
        console.log($scope.rows);
    }
    generateGameBoard();

    $scope.chop=function(side){
        $scope.playerSide=side;
        createNextBranch();
        var currentLevel = $scope.rows[$scope.rows.length-1];
        if (currentLevel.side == side && currentLevel.hasBranch){
            alert('You dead.');
        }
    }
  }])
