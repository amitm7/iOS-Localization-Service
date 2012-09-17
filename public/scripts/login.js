$(document).ready(loginHandler);

function loginHandler() {
  setup();

  function setup() {
    $("label").inFieldLabels({fadeDuration: 0, fadeOpacity: 0.4});
    $("#loginForm").submit(function (){
      if(!this.email.value || !this.password.value) return false;
      var data = { email: this.email.value, password: this.password.value };
      $.post("/login", data, function(response) {
        alert(response);
      });
      return false;
    });
  }
}