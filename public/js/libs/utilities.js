$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.fn.center = function () {
    this.css("position","absolute");
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

var alertFallback = false;
  if (typeof console === "undefined" || typeof console.log === "undefined") {
    console = {};
    if (alertFallback) {
      console.log = function(msg) {
      alert(msg);
    }
  } else {
    console.log = function() {};
  }
}

//Backbone.Validation.configure({
//  forceUpdate: true
//});


// validation message when attr required
Backbone.Validation.messages.required = 'required'
/*
_.extend(Backbone.Validation.callbacks, {
  valid: function(view, attr, selector) {
    var el = view.$('[' + selector + '~=' + attr + ']')
    var errorEl = el.next() 
    if (errorEl.hasClass('error'))  
      errorEl.remove()
  },
  invalid: function(view, attr, error, selector) {
    // TODO add multiple errors
    var el = view.$('[' + selector + '~=' + attr + ']')
    var sibling = el.next()
    //reset 
    if (sibling.hasClass('error')) 
      sibling.remove()
    el.after('<span class="error">' + error + '</span>')
  }
})
*/
_.extend(Backbone.Validation.callbacks, {
  valid: function(view, attr, selector) {
    var control, group;
    control = view.$('[' + selector + '=' + attr + ']');
    group = control.parents(".control-group");
    group.removeClass("error");
    if (control.data("error-style") === "tooltip") {
      if (control.data("tooltip")) {
        return control.tooltip("hide");
      }
    } else if (control.data("error-style") === "inline") {
      return group.find(".help-inline.error-message").remove();
    } else {
      return group.find(".help-block.error-message").remove();
    }
  },
  invalid: function(view, attr, error, selector) {
    var control, group, position, target;
    control = view.$('[' + selector + '=' + attr + ']');
    group = control.parents(".control-group");
    group.addClass("error");
    if (control.data("error-style") === "tooltip") {
      position = control.data("tooltip-position") || "right";
      control.tooltip({
        placement: position,
        trigger: "manual",
        title: error
      });
      return control.tooltip("show");
    } else if (control.data("error-style") === "inline") {
      if (group.find(".help-inline").length === 0) {
        group.find(".controls").append("<span class=\"help-inline error-message\"></span>");
      }
      target = group.find(".help-inline");
      return target.text(error);
    } else {
      if (group.find(".help-block").length === 0) {
        group.find(".controls").append("<p class=\"help-block error-message\"></p>");
      }
      target = group.find(".help-block");
      return target.text(error);
    }
  }
});



$.extend({

  shortDate :  function (_id) {
    // convert from iso for javascript
    //var date = new Date((iso).replace(/-/g,"/").replace(/[TZ]/g," "))
    var date = new Date(parseInt(_id.slice(0,8), 16)*1000);
    var months = new Array('Jan','Feb','Mar','Apr','May',
    'Jun','Jul','Aug','Sep','Oct','Nov','Dec');

    var day = date.getDate() 
    var month = date.getMonth()
    
    return months[month] + " " + day 
  }


})



/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 0.11.3
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2012, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */

  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === "number") {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator === undefined ?  " " : $l.wordSeparator;
      return $.trim([prefix, words, suffix].join(separator));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d\d\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
    }
  });

  $.fn.timeago = function() {
    var self = this;
    self.each(refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      $(this).text(inWords(data.datetime));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");

