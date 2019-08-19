var counter = 0;
window.onload = function(){
  document.addEventListener("iraRenderingComplete",function(event){
    if (!iraApp) return false;
    if (event.iraEventSource != "update") return false;
    var scope = iraApp.getScope(event.iraScopeUuid);
    if (!scope || !scope["root"]) return false;
    if (scope.root.classList.contains("donation")) {
      document.getElementById('amountGraphic').style.height = '20%';
      console.log(document.getElementById('amountGraphic'))
      console.log(document.getElementsByClassName('donation'));
      setTimeout(function(){
        requestAnimationFrame(animateDonations)
      },1000)

    }

    // ok we have found a scope, set the new value

  });

}
function convertCollectionToArray(collection){
  var arr = [];
  console.log(collection)
  try{
    Array.prototype.forEach.call(collection,function(item){
      console.log(item)
      arr.push(item);

    });
  }catch(e){
    console.log(e)
  }
  return arr.splice(1,arr.length)
}
function animateDonations(){
  var donations = convertCollectionToArray(document.getElementsByClassName('donation'));
  console.log(donations)
  donations[0].classList.add('donation-out');
  setTimeout(function(){
    document.getElementById('donations').removeChild(donations[0]);
    donations[0].classList.remove('donation-out');
    document.getElementById('donations').appendChild(donations[0]);
    requestAnimationFrame(animateDonations)
  },3000)

  console.log(donations)
}
function resize(e){
  console.log('sdfsefwergwerfwe')
}
