sessionStorage=null;
const storeData = (data) =>{
    
sessionStorage.setItem("logged_in_user",JSON.stringify(data))
    console.log(sessionStorage.getItem("logged_in_user"))
}

const register = () =>{
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const re_password = document.getElementById("re_password").value;

    if(password === re_password){
        fetch("https://obscure-shore-41041.herokuapp.com/register",{
            method:"post",
            headers : {'Content-type' : 'application/json'},
            body:JSON.stringify({
                
                email:email,
                password:password
            })
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data);
            if(!data.message){
            
            window.location.href = "https://roopam527.github.io/iot_ui/IOT_health/temperature.html?q="+data.hash;
        }
            return data.message;
        })
        .then((data)=>{

            console.log(data);
            if(data){
                var d1 = document.getElementById('email');
            d1.insertAdjacentHTML('afterend', `<div id="error">Ooops! User Already Exist</div>`);
            return 0;
            }
            
            
        })
        .catch((err)=>{
            
        })
    }
    else{
        var d1 = document.getElementById('re_password');
        d1.insertAdjacentHTML('afterend', `<div id="error">Passwords isn't match</div>`);
    }
}


