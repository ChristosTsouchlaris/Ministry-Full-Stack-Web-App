const infoButton = document.querySelector(".btn-info");
if(infoButton) {
    infoButton.addEventListener("click", (e) => {
        window.location.href = "/info";
    })
}
const employerButton = document.querySelector("#btn-employer");
const employeeButton = document.querySelector("#btn-employee");



// employerButton.addEventListener("click", (e) => {
//     window.location.href = "/employer/employer.html";
// })

// infoButton.addEventListener("click", (e) => {
//     window.location.href = "/information/info.html";
// })