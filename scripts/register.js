sessionStorage=null;
const storeData = (data) =>{
    
sessionStorage.setItem("logged_in_user",JSON.stringify(data))
    console.log(sessionStorage.getItem("logged_in_user"))
}

const error = document.getElementById("error");
const remove_error = () =>{
   error.remove();
}

const register = () =>{
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const re_password = document.getElementById("re_password").value;
    const valid_password= password.match(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g)
    if(password === re_password && valid_password){
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
                if(error){
                    remove_error()
                }
                var d1 = document.getElementById('email');
            d1.insertAdjacentHTML('afterend', `<div id="error">Ooops! User Already Exist</div>`);
            return 0;
            }
            
            
        })
        .catch((err)=>{
            if(error){
                remove_error()
            }
            var d1 = document.getElementById('logo');
            d1.insertAdjacentHTML('afterend', `<div id="error">Slow Internet Connection</div>`);
           
        })
    }
    else{
        if(error){
            remove_error()
        }
        if(!valid_password)
        {
            
            var d1 = document.getElementById('password');
            d1.insertAdjacentHTML('afterend', `<div id="error">Password must have: <br/> One special character and <br/> Should be alphanumeric</div>`);
        }
        else{
        var d1 = document.getElementById('re_password');
        d1.insertAdjacentHTML('afterend', `<div id="error">Passwords isn't match</div>`);
        }
    }
}


