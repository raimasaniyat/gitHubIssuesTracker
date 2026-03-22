document.getElementById("login-btn").addEventListener("click", function(){
    
    const nameInput = document.getElementById("userNameInput");
    const userName = nameInput.value;

    const passInput = document.getElementById("userPasswordInput");
    const userPass = passInput.value;

    if(userName == "admin" && userPass == "admin123"){
        alert("login successful");
        window.location.assign("../../home.html");
    }
    else{
        alert("error! give the correct input.");
        return;
    }
})

