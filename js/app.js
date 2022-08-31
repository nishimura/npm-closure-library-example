goog.module('app');

const top = goog.require('app.top');

function init(){
  window['runTop'] = top;
}


function runQ(q){
  for (var i = 0; i < q.length; i++){
    q[i]();
  }
  window['appq'] = {
    'push': (callback) => {
      callback();
    }
  };
}

init();

window['appq'] = window['appq'] || [];
runQ(window['appq']);
