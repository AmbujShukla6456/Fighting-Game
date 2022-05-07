function collision({rect1,rect2}){
    return(
      rect1.attackbox.position.x + rect1.attackbox.width >= rect2.position.x  && 
          rect2.position.x + rect2.width >= rect1.attackbox.position.x &&
          rect1.attackbox.position.y + rect1.attackbox.height >= rect2.position.y &&
          rect1.attackbox.position.y <= rect2.position.y + enemy.height
    )
  }
  
  function winner({player,enemy,timerID}){
      clearTimeout(timerID)
      document.querySelector('#result').style.display='flex'
          if(player.health === enemy.health){
              document.querySelector('#result').innerHTML='Tie'
          }
          else if(player.health > enemy.health){
              document.querySelector('#result').innerHTML='Player 1 Wins'
          }
          else{
              document.querySelector('#result').innerHTML='Player 2 Wins'
          }
  }
  
  let time=60;
  let timerID
  function decreasetimer(){
      if(time > 0){
          timerID=setTimeout(decreasetimer,1000)
          time--;
          document.querySelector("#timer").innerHTML=time;
      }
  
      if(time === 0){
          winner({player,enemy,timerID})
      }
      
  }