define(function(require) {

var tpl = require('text!templates/questions.mustache')
  , Linkedin = require('models/questions')
  , ModalView = require('views/modal')      

return Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this); 
    this.model = new Linkedin();
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
    var msg  = '<p>Thank you very much for your answer. I am excited about '
        msg += 'starting this site. I will email you back as soon as possible.</p>'
        msg += '<p style="float: right">- Bobby</p>'

    new ModalView(msg) 
  },

  reset: function() {
    this.render()
    this.model.clear({silent: true})
  },
  

});

});
