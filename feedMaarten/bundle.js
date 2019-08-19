var counter = 0;
var previousWindowWidth = 0;
window.onload = function(){
  window.addEventListener('resize',resize);
  previousWindowWidth = window.innerWidth;
  document.addEventListener("iraRenderingComplete",function(event){
    if (!iraApp) return false;
    if (event.iraEventSource != "update") return false;
    var scope = iraApp.getScope(event.iraScopeUuid);
    if (!scope || !scope["root"]) return false;
    if (scope.root.classList.contains("donation")) {
      setTimeout(function(){
       requestAnimationFrame(animateDonations)
        if(window.innerWidth >=800){
          console.log('desktop');
          initializeDonationDesktop();
        }
      },1000)
      createDigletts();
    }

    // ok we have found a scope, set the new value

  });

}
function initializeDonationDesktop(){
  var donations = convertCollectionToArray(document.getElementsByClassName('donation'));
  console.log(donations)
  for(var i = 0; i<5; i++){
    donations[i].classList.add(`donation__${i+1}-big`);
  }
}
function animateDonationDesktop(){
  var donations = convertCollectionToArray(document.getElementsByClassName('donation'));
  setTimeout(function(){
    requestAnimationFrame(animateDonationDesktop)
  },20)
}
function fadeInDigletts(){
  var digletts = document.getElementsByClassName('progress__diglett');
  setTimeout(function(){
    document.getElementsByClassName('amount')[0].classList.add('amount-in')
    document.getElementsByClassName('amount')[1].classList.add('amount-in')
  },500)
  for(var i = 0; i<digletts.length;i++){
    setTimeout(function(digletts,i){
      console.log(this)
      digletts[i].classList.add('progress__diglett-in')
    }.bind(null,digletts,i),i*50)
  }
  setTimeout(function(){
    showProgress();
  },digletts.length * 50)
}
function createDigletts(){
  var diglett = document.createElement('div');
  diglett.classList.add('progress__diglett');
  document.getElementById('diglettContainer').innerHTML+='<div class="progress__spacer-left"></div>'
  for(var i = 0; i<20;i++){
    document.getElementById('diglettContainer').innerHTML+=diglett.outerHTML
  }
  document.getElementById('diglettContainer').innerHTML+='<div class="progress__spacer-right"></div>'

  fadeInDigletts();
}
function convertCollectionToArray(collection){
  var arr = [];
  try{
    Array.prototype.forEach.call(collection,function(item){
      arr.push(item);

    });
  }catch(e){
    console.log(e)
  }
  return arr.splice(1,arr.length)
}
function animateDonations(){
  var donations = convertCollectionToArray(document.getElementsByClassName('donation'));
  console.log('donations')
  donations[0].classList.add('donation-out');
  setTimeout(function(){
    document.getElementById('donations').removeChild(donations[0]);
    donations[0].classList.remove('donation-out');
    document.getElementById('donations').appendChild(donations[0]);
    requestAnimationFrame(animateDonations)
  },3000)

  console.log(donations)
}
function roundDownToFive(number){
  var rest = number%5;
  return number - rest
}
function showProgress(){
  var percentage = 78;
  var roundedValue = roundDownToFive(percentage);
  var digletts = document.getElementsByClassName('progress__diglett');

  for(var i = 0; i<roundedValue/5; i++){
    setTimeout(function(digletts,i,endValue){
      digletts[i].classList.add('progress__diglett-active');
      console.log(endValue)
      console.log(i)
      if(i==endValue-1){
        setTimeout(function(diglett){
          diglett.classList.add('progress__diglett-active-medium')
        }.bind(null, digletts[i+1]),25);
        setTimeout(function(diglett){
          diglett.classList.add('progress__diglett-active-small')
        }.bind(null, digletts[i+2]),50);

        console.log(digletts[i+1]);
        console.log(digletts[i+2]);

      }
    }.bind(null,digletts,i,roundedValue/5),i*50)
  }

}
function resize(e){
  var donations = convertCollectionToArray(document.getElementsByClassName('donation'));
  for(var i = 0; i<donations.length;i++){
    donations[i].classList.remove('donation-out')
  }
  if(previousWindowWidth>window.innerWidth){
    //move left
    if(previousWindowWidth>=800&&window.innerWidth<800){
      console.log('downscale')
    }
  }else{
    //move right
    if(previousWindowWidth<=800&&window.innerWidth>800){
      console.log('upscale')
    }
  }
  console.log(donations)
  previousWindowWidth = window.innerWidth
}
