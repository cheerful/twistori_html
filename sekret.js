// congrats, you found the sekret code

Twistori.prototype.sekret = function(){
  this.toggleDrawer();
};

Twistori.prototype.toggleDrawer = function(){
  if(this.drawer){
    this.drawer = false;
    $('sekret_header').morph('background-color:#000;color:#111;bottom:-30px',{duration:.4});
    $('sekret_wrapper').morph('border-bottom-color:#111',{duration:.4});
    $('sekret').morph('height:0px',{duration:.4});
  } else {
    this.drawer = true;
    $('sekret').setStyle({height:0}).morph('height:80px',{transition:'bouncePast'});
    $('sekret_wrapper').morph('border-bottom-color:#65c3ff');
    $('sekret_header').morph('background-color:#65c3ff;color:#fff;bottom:-14px');
  }
};

Twistori.prototype.changeTopics = function(){
  var topics = $A(arguments);
  $('topics').update();
  topics.each(function(topic){
    var t = topic.gsub(/^i\s/,'');
    $('topics').insert(new Element('h2',{className:t,title:topic,style:'font-size:43px;line-height:40px'}).update('<span>'+t.escapeHTML()+'</span>'));
  });
  
  this.setupTopics();
};

Twistori.prototype.initSekret = function(){
  $$('body').first().insert(
    '<div id="sekret" style="height:0px">'
    + '<div id="sekret_wrapper" class="wrapper">'
    + '<div class="shuffle"></div>'
    + '<div class="extras">'
    + 'clusters: <div class="clusters"></div>'
    + 'memefight: <div class="memefight">'
    + '<span class="pirate">pirate</span>, '
    + '<span class="ninja">ninja</span>, '
    + '<span class="cowboy">cowboy</span>, '
    + '<span class="robot">robot</span>'
    + '</div>'
    + '</div>'
    + '<span class="info">Hooray! You found the secret drawer!</span>'
    + '</div>'
    + '<h3 id="sekret_header">secrets</h3>'
    + '</div>'
  );

  var shuffle = $('sekret').down('div.shuffle'), css = $w('love hate think believe feel wish love');
  $w('s h u f f l e').each(function(c,i){
    shuffle.insert(new Element('span',{className:css[i]}).update(c).observe('click',function(){
      this.toggleDrawer();
      this.randomize();
    }.bind(this)));
  }.bind(this));
  
  var clusters = $('sekret').down('div.clusters');
  clusters.insert('<span class="love">love</span>, <span class="sleep">sleep</span>');
  
  clusters.down('span[class=love]').observe('click', function(){
    this.changeTopics('i love','i hate','i think','i believe','i feel','i wish');
    this.stream('i love');
    this.toggleDrawer();
  }.bind(this));
  clusters.down('span[class=sleep]').observe('click', function(){
    this.changeTopics('tired','sleep','nap');
    this.stream('sleep');
    this.toggleDrawer();
  }.bind(this));
  
  var memefight = $('sekret').down('div.memefight');
  function fight(topic){
    this.changeTopics('pirate','ninja','cowboy','robot');
    this.stream(topic);
    this.toggleDrawer();
  }  
  memefight.select('span').each(function(t){
    t.observe('click', fight.bind(this,t.innerHTML));
  }.bind(this));
  
  $('sekret_header').observe('click', this.toggleDrawer.bind(this));
  
  this.toggleDrawer();
};

window['t'].initSekret();