define(function(require) {

var tpl = require('text!templates/home.html')
  , Home = require('models/home')
  , AlertView = require('views/site/alert').alert         
  , ModalView = require('views/modal')      

return Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this); 
    this.model = new Home();
    Backbone.Validation.bind(this);
    this.model.on('sync', this.notice, this) 
    this.model.on('sync', this.reset, this) 
  },

  events: {
    'submit form' : 'submit',
  },

  template: tpl,

  render: function(){
    $(this.el).html(this.template);
    return this; 
  },

  submit: function(e) {
    e.preventDefault()
    var params = this.$('form').serializeObject();
    var result = this.model.save(params)
  },

  notice: function(model){
    var msg  = '<p>Thanks for joining our mission of health!'
    new ModalView(msg)
  },

  reset: function() {
    this.render()
    this.model.clear({silent: true})
  },
  

});

});
