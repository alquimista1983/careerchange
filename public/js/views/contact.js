define(function(require) {

var tpl = require('text!templates/contact.html')
  , Contact = require('models/contact-page') 
  , ModalView = require('views/modal')      

return Backbone.View.extend({

  className: 'contact',

  events: {
    'submit form' : 'submit',
  },

  initialize: function(options){
    _.bindAll(this); 
    this.model = new Contact()
    Backbone.Validation.bind(this)
    this.model.on('sync', this.notice, this) 
    this.model.on('sync', this.reset, this) 
  },

  render: function(){
    $(this.el).html(tpl);
    return this; 
  },

  submit: function(e) {
    e.preventDefault()
    var params = this.$('form').serializeObject();
    this.model.save(params);
  },

  notice: function(){
    var msg  = '<p>Thank you very much for the message. I am excited about '
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
