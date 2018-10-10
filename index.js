const gridLength = 9;
function generateGrid(){
  var grid = '';
  var gridContainer = document.getElementById('gird-container');

  for (var i = 0; i < gridLength; i++){
    grid += '<div class="box" data-id="'+ i + '"></div>';
  }

  gridContainer.innerHTML = grid;
  registerEvents();
}

generateGrid();

var ticTacToe = {
  Xcontainer:[],
  Ocontainer:[],
  combinations: ['012','345','678','036','147','258','048','246']
}

function registerEvents() {
  var boxes = document.querySelectorAll('.box');
  var selected = 'selected';

  boxes.forEach(function(val, index){
      val.addEventListener('click',function(e){
        var classNames = val.getAttribute('class');
        var id = val.getAttribute('data-id');
        if (classNames.search(selected) == -1){
          val.innerHTML = 'X';
          val.classList.add(selected);
          ticTacToe.Xcontainer.push(id);

          if(ticTacToe.Xcontainer.length > 2){
            if(checkResult()){
              return true;
            }
          }

          if(ticTacToe.Ocontainer.length + ticTacToe.Xcontainer.length < 9){
            computerTurn();
          }
        }
      });
  })
}

function checkResult(){
  var result = validate();
  var isGameOver = false;
  var text = [
    "Game is Draw",
    "X own the Game",
    "O own the Game"
  ];
  var msgIndex = 0;

  if (result == 0){
    msgIndex = 1;
    isGameOver =  true;
  }else if(result == 1){
    msgIndex = 2;
    isGameOver =  true;
  } else if (result == 2 && (ticTacToe.Ocontainer.length + ticTacToe.Xcontainer.length == gridLength)){
    msgIndex = 0;
    isGameOver = true;
  }

  if(isGameOver){
    document.getElementById('result').innerHTML = text[msgIndex];
  }

  return isGameOver;
}

function getRandom(){
  var existing = ticTacToe.Xcontainer.concat(ticTacToe.Ocontainer);
  var randomIndex = '';

  do {
    randomIndex = Math.floor(Math.random() * gridLength);
  } while (existing.indexOf(randomIndex + '') > -1 && existing.length < gridLength);

  return randomIndex;
}

function computerTurn(){
  var randomIndex = getRandom();
  var computerBox = document.querySelector('[data-id="'+randomIndex+'"]');

  computerBox.innerHTML = 'O';
  computerBox.classList.add('selected');
  ticTacToe.Ocontainer.push(randomIndex+'');

  if(ticTacToe.Ocontainer.length > 2){
    checkResult();
  }
}

function validate(){
  var Xcomb = ticTacToe.Xcontainer;
  var Ocomb = ticTacToe.Ocontainer.sort().join('');

  // 0 -- X win
  // 1 -- O win
  // 2 -- Draw
  var result = 2;

  for(var i=0; i< ticTacToe.combinations.length; i++){
      var val = ticTacToe.combinations[i].split('');

    if (Xcomb.indexOf(val[0]) > -1 && Xcomb.indexOf(val[1]) > -1 && Xcomb.indexOf(val[2]) > -1 ){
        result = 0;
        break;
    } else if (Ocomb.indexOf(val[0]) > -1 && Ocomb.indexOf(val[1]) > -1 && Ocomb.indexOf(val[2]) > -1){
        result = 1;
        break;
      }
  }

  return result;
}