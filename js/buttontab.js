goog.module('app.ButtonTab');

const Button = goog.require('goog.ui.Button');
const Component = goog.require('goog.ui.Component');
const Css3ButtonRenderer = goog.require('goog.ui.Css3ButtonRenderer');
const EventTarget = goog.require('goog.events.EventTarget');
const EventType = goog.require('goog.events.EventType');
const SelectionModel = goog.require('goog.ui.SelectionModel');
const style = goog.require('goog.style');

class ButtonTab extends Component
{
  constructor(opt_domHelper){
    super(opt_domHelper);

    var renderer = Css3ButtonRenderer.getInstance();
    this.b1_ = new Button(null, renderer, opt_domHelper);
    this.b2_ = new Button(null, renderer, opt_domHelper);
    this.b3_ = new Button('Tab3', renderer, opt_domHelper);
    var buttons = [this.b1_, this.b2_, this.b3_];

    this.buttonParent_ = new EventTarget();

    for (let i = 0; i < buttons.length; i++){
      var b = buttons[i];
      b.setSupportedState(Component.State.CHECKED, false);
      b.setSupportedState(Component.State.SELECTED, true);
      b.setAutoStates(Component.State.SELECTED, false);
      b.setParentEventTarget(this.buttonParent_);

      this.registerDisposable(b);
    }

    var children = [];
    for (let i = 0; i < 3; i++){
      let c = new Component(opt_domHelper);
      buttons[i].setModel(c);
      this.addChild(c);
      children.push(c);
    }

    this.selectionModel_ = new SelectionModel(buttons);
    this.contentSelectionModel_ = new SelectionModel(children);
  }

  decorateInternal(el){
    super.decorateInternal(el);

    this.tabAreaEl_ = this.getElementByClass('tab-area');
    this.b1_.decorate(this.getElementByClass('tab1'));
    this.b2_.decorate(this.getElementByClass('tab2'));
    this.b3_.render(this.tabAreaEl_, true);

    this.contentAreaEl_ = this.getElementByClass('content-area');

    var dh = this.getDomHelper();
    var i = 1;
    this.forEachChild(function(child){
      child.createDom();
      child.render(this.contentAreaEl_);
      dh.setTextContent(child.getElement(), 'contents ' + i);
      style.setElementShown(child.getElement(), false);
      i++;
    }, this);
  }

  enterDocument(){
    super.enterDocument();

    var eh = this.getHandler();
    eh.listen(this.buttonParent_, Component.EventType.ACTION, function(e){
      this.selectionModel_.setSelectedItem(e.target);
    });

    this.contentSelectionModel_.setSelectionHandler(function(item, select){
      console.log(item);
      console.log(select);
      style.setElementShown(item.getElement(), select);
    });
    eh.listen(this.selectionModel_, EventType.SELECT, function(e){
      console.log(e);
      this.contentSelectionModel_.setSelectedItem(this.selectionModel_.getSelectedItem().getModel());
    });

    this.selectionModel_.setSelectedItem(this.b1_);
  }

  exitDocument(){
    this.b1_.exitDocument();
    this.b2_.exitDocument();
    this.b3_.exitDocument();

    super.exitDocument();
  }

  disposeInternal(){
    this.buttonParent_.dispose();
    this.buttonParent_ = null;
    this.selectionModel_.dispose();
    this.selectionModel_ = null;
    this.contentSelectionModel_.dispose();
    this.contentSelectionModel_ = null;

    super.disposeInternal();

    this.b1_ = null;
    this.b2_ = null;
    this.b3_ = null;
  }
}

exports = ButtonTab;
