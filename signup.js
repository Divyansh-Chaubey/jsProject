let hideLogIn=()=>{
    document.querySelector("#background-2").style.display = "none";
}

let hideSignUp=()=>{
    document.querySelector("#background").style.display = "none";
}



let showLogin = () => {
        document.querySelector("#background").style.display = "none";
        document.querySelector("#background-2").style.display = "flex";
      };

      let showSignUp = () => {
        document.querySelector("#background-2").style.display = "none";
        document.querySelector("#background").style.display = "flex";
      };

      let sub = () => {
        let f_name = document.querySelector("#username").value;
        let f_email = document.querySelector("#signup-email").value;
        let f_password = document.querySelector("#signup-password").value;
        let f_c_password = document.querySelector("#confirm-password").value;

        document.querySelector("#err").innerText = "";

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f_email)) {
          document.querySelector("#err").innerText =
            "Please enter a valid email address.";
          return false;
        }

        if (f_c_password !== f_password) {
          document.querySelector("#err").innerText =
            "Your passwords do not match. Please enter the same password.";
          return false;
        }

        localStorage.setItem("Username", f_name);
        localStorage.setItem("Email", f_email);
        localStorage.setItem("Password", f_password);

        showLogin();
        return false;
    };
    
    let login = () => {
        let email = document.querySelector("#login-email").value;
        let password = document.querySelector("#login-password").value;
        
        let storedEmail = localStorage.getItem("Email");
        let storedPassword = localStorage.getItem("Password");
        
        document.querySelector("#login-err").innerText = "";
        
        if (email === storedEmail && password === storedPassword) {
            alert("Login successful!");
            location.href = "index.html";
            return true;
        } else {
            document.querySelector("#login-err").innerText =
            "Invalid email or password. Please try again.";
            return false;
        }
        
      };