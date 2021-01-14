var loginButton = document.querySelector("#btn-login");
var rememberCheckBox = document.querySelector("#checkbox-remember");
var inputUsername = document.querySelector("#inputUsername");
var inputPassword = document.querySelector("#inputPassword");

var validUser = {
    username: "chris",
    password: "2000"
}

loginButton.addEventListener("click", (e) => {
    var rememberUser = rememberCheckBox.checked; // boolean
    localStorage.setItem("rememberUser", rememberUser);

    if ((inputUsername.value == validUser.username) && (inputPassword.value == validUser.password)) {
        window.location.href = "index.html";
    }
    
    window.location.href = "index.html";
})