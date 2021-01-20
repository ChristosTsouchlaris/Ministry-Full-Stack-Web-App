const infoButton = document.querySelector(".btn-info");
if(infoButton) {
    infoButton.addEventListener("click", (e) => {
        window.location.href = "/info/info-general";
    })
}

const employerButton = document.querySelector("#btn-employer");
if(employerButton) {
    employerButton.addEventListener("click", (e) => {
        window.location.href = "/employer";
    })
}

// const employerButton = document.querySelector("#myEmployeesButtons");
// if(employerButton) {
//     employerButton.addEventListener("click", (e) => {
//         window.location.href = "/employer";
//     })
// }

const employeeButton = document.querySelector("#btn-employee");
if(employeeButton) {
    employeeButton.addEventListener("click", (e) => {
        window.location.href = "/employee";
    })
}


$(document).ready((function(){AOS.init({disable:"mobile"})}));
// employerButton.addEventListener("click", (e) => {
//     window.location.href = "/employer/employer.html";
// })

// infoButton.addEventListener("click", (e) => {
//     window.location.href = "/information/info.html";
// })