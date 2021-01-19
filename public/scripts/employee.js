const button = document.querySelector("#leave-button");
if(button) {
    button.addEventListener("click", (e) => {
        window.location.href = "/employee_profile/leave_form";
    })
}