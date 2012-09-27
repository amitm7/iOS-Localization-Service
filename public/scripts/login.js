$(document).ready(loginHandler);

function loginHandler() {
  setup();

  function setup() {
    $("label").inFieldLabels({fadeDuration: 0, fadeOpacity: 0.4});
    $("#loginForm").submit(login);
  }

  function login() {
    if(!this.email.value || !this.password.value) return false;
    var data = { email: this.email.value, password: this.password.value };
    $.post("/doLogin", data, function(response) {
      if(response == "success") {
        window.location = "/"
      } else {
        $("#badlogin").show()
      }
    });

    return false;
  }

}