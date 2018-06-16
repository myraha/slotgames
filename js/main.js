//see the 3 reels
//each reel has 7 options (at least)
//there must be a way to start the wheel
//3 buttons to stop each reel spin
//show result of reel spins
//if user gets 3 of a kind, they win
//user can bet a min and max amount on each spin
//user can enter the amount of money to start with
//bets will be added or subtracted from total depending on win or loss
//if they run out of money, the game ends

$(document).ready(function(){
  var slotImages = [
   'assets/cherry.png',
   'assets/gamer.png',
   'assets/pacman.png',
   'assets/pacman2.png',
   'assets/pacman3.png',
   'assets/pacman4.png',
   'assets/watermelon.png'
  ];

  var totalSum = 0;
  var currentBet = 0;
  var spin1 = 0;
  var spin2 = 0;
  var spin3 = 0;


  // event listener and function for spinWheel
  $('#spinWheel').on('click', function(){
    if(currentBet == 0){
      return;
    }
    var one = setInterval(function(){
      spin1 = Math.round(Math.random() * (slotImages.length - 1))
      $('#slot1').attr('src', slotImages[spin1])
    },150);
    var two = setInterval(function(){
      var spin2 = Math.round(Math.random() * (slotImages.length - 1))
      $('#slot2').attr('src', slotImages[spin2])
    },150);
    var three = setInterval(function(){
      var spin3 = Math.round(Math.random() * (slotImages.length - 1))
      $('#slot3').attr('src', slotImages[spin3])
    },150);


    //stop spins
    $("#reelOne").on("click",function(){ //clearing interval 1
      clearInterval(one);
    });

    $("#reelTwo").on("click",function(){ //clearing interval 2
      clearInterval(two);
    });

    $("#reelThree").on("click",function(){ //clearing interval 3
      clearInterval(three);
      console.log(spin1, spin2 , spin3)
      if (spin1 == spin2 && spin2 == spin3) {
        totalSum += currentBet;
        $("#youWin").text("YOU WIN!");
        $("#youBet").text("You won this round.");
      } else {
        totalSum -= currentBet;
        $("#notMatch").text("Not a Match!");
        $("#youBet").text("You lost this round.");
      }
      currentBet = 0;
      // updates dom with new values
      $("#result").html(totalSum);
      $('#currentBet').text(currentBet);
      if (totalSum == 0) {
        $("#gameOver").text("GAME OVER");
      }
     })
     $("#gameOver").text("")
     $("#youBet").text("")
     $("#notMatch").text("");
     $("#youWin").text("");

    });

  //event listener to submit bet
  $('#submitBet').on('click', function(){
    var amount = $("#enterAmount").val();
    totalSum = parseFloat(amount);
    //display bet
    $("#result").html(totalSum);
    $("#enterAmount").val("");
  });

  //event listener to increase bet
  $('#increase').on('click', function(){
      currentBet += 5;
      if (currentBet > totalSum){
        currentBet = totalSum;
      }
      $('#currentBet').text(currentBet);
  });

  //event listener to decrease bet
  $('#decrease').on('click', function(){
    currentBet -= 5;
    if (currentBet < 0){
      currentBet = 0;
    }
    $('#currentBet').text(currentBet);
  });

});
