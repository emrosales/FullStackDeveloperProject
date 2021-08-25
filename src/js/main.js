$(function () {
   $('.alert').on('closed.bs.alert', function () {
      console.log('alert is closed')
   });
   //push a notification
   Push.create("Hello world!");

});