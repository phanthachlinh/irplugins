var counter = 0;
var donations = ''
window.onload=function(){
  document.addEventListener('resize',resize);
  document.addEventListener("iraRenderingComplete",function(event){
    if (!iraApp) return false;
    if (event.iraEventSource != "update") return false;
    var scope = iraApp.getScope(event.iraScopeUuid);
    if (!scope || !scope["root"]) return false;
    if (scope.root.classList.contains("donation")) {
      document.getElementsByClassName('progress__amount-background')[0].style.width = '50%'
      donations = convertCollectionToArray(document.getElementsByClassName('donation'));
      document.getElementsByClassName('progress__amount-front')[0].style.clipPath = `inset(0 ${'50%'} 0 0)`
      setTimeout(function(){
        filterComments();
        requestAnimationFrame(animateDonations)
      },700)
    }

    // ok we have found a scope, set the new value

  });
}
function filterComments(){
  var donations = document.getElementsByClassName('donation');
  var newDonations = [];
  for(var i = 0; i<donations.length; i++){
    console.log(donations[i].children[0].children[0].innerText.length)

    if(donations[i].children[0].children[0].innerText.length != 0){
      newDonations.push(donations[i]);
    }
  }
  console.log(newDonations)
  document.getElementById('donations').innerHTML = '';
  for(var i = 0; i<newDonations.length;i++){
    document.getElementById('donations').appendChild(newDonations[i])
  }
}
function animateDonations(){
  console.log('go')
  var donations = document.getElementsByClassName('donation');
  if(document.getElementsByClassName('donation-in')[0]){
    donations[counter].classList.add('donation-out');
    console.log(donations);
    setTimeout(function(){
      console.log(counter);
      donations[counter].classList.remove('donation-in');
      donations[counter].classList.remove('donation-out');
      if(counter<donations.length-1){
        donations[counter+1].classList.add('donation-in');

      }else{
        donations[0].classList.add('donation-in');
        counter=-1;
      }
      counter++;


    },700)
  }else{
    console.log(donations)
    donations[0].classList.add('donation-in')
  }
  setTimeout(function(){
    requestAnimationFrame(animateDonations)
  },3000)
}
function convertCollectionToArray(collection){
  var arr = [];
  Array.prototype.forEach.call(collection,function(item){
    arr.push(item)
  });
  return arr.splice(1,arr.length)
}
function resize(e){
  console.log('sdfsefwergwerfwe')
}
