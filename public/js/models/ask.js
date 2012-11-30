define(function(require) {

  return Backbone.Model.extend({
    
    url: '/questions',

    validation: {
      price: {
        required: true,
      },
      email: {
        required: true,
        pattern: 'email',
      },
      question: {
        required: true,
      },
    }, 

  })
})
