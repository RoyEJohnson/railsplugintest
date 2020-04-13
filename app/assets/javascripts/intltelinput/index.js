//= require ./intlTelInput-jquery

$(document).ready(function(){
  //this is the jquery way to initialize.  this plugin offers both a
  //jquery way and a non-jquery way.
  $("#phoneX").intlTelInput({
    formatOnInit: true,
    separateDialCode: true
  });
});
