if (typeof exports === 'object') {
  define = function (factory) {
    module.exports = factory(require, exports, module);
  };
  var node = true
}


define(function(require) {


return Backbone.Model.extend({

  idAttribute: "_id",

  url: '/home',

  validation: {
    email: {
      required: true,
      pattern: 'email',
    },
  },

})

})
