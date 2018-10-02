sessionStorage.removeItem('logged_in_user');
const storeData = (data) =>{
   console.log("Hello");
sessionStorage.setItem("logged_in_user",JSON.stringify(data))
    console.log(sessionStorage.getItem("logged_in_user"))
    console.log("Hello");
   
/// window.location.href = "http://127.0.0.1:5500/IOT_health/index.html";
}

let error = document.getElementById("error");
const remove_error = () =>{
 
   error.remove();
}


const login = () =>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    fetch("https://obscure-shore-41041.herokuapp.com/login",{
            method:"post",
            headers : {'Content-type' : 'application/json'},
            body:JSON.stringify({
                
                email:email,
                password:password
            })
        })
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            if(data){
            console.log(data);
             
            
            }else{
                if(error){
                    remove_error()
                }
                var d1 = document.getElementById('password');
                d1.insertAdjacentHTML('afterend', `<div id="error">Invalid Email or Password</div>`);
            error = document.getElementById("error");
               
            }
            return data.hash;
        })
        .then((hash)=>{
         window.location.href = "https://roopam527.github.io/iot_ui/IOT_health/temperature.html?id="+hash;
        })
        .catch((err)=>{
            if(error){
                remove_error()
            }
            var d1 = document.getElementById('logo');
            d1.insertAdjacentHTML('afterend', `<div id="error">Slow Internet Connection</div>`);
            error = document.getElementById("error");
           
        })

}