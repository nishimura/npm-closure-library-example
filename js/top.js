goog.module('app.top');

const ButtonTab = goog.require('app.ButtonTab');
const dom = goog.require('goog.dom');

function run(){
  var buttonTab = new ButtonTab();
  buttonTab.decorate(dom.getElementByClass('button-tab-content'));
}

exports = run;
