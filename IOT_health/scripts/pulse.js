const getUrlVars =()=> {
    const vars = {};
    const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
    });
    return vars;
    }

let pause = false;
let animation_duration = 0;
let check_first=0;

const hash = getUrlVars()["id"];
console.log(hash);
const generateChart = (dataset=[],labels=[])=>{
    var ctx = document.getElementById("myChart").getContext('2d');
    if(check_first == 0){
        check_first = 1;
        animation_duration = 1000

    }
    else{
        animation_duration=0
    }
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Tempratures',
            
            data: dataset,
            
            
            borderWidth: 1
        }]
    },
    options: {
        animation: {
            duration: animation_duration, // general animation time
        },
        // elements: {
        //     line: {
        //         tension: 0, // disables bezier curves
        //     }
        // },
        
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        tooltips: {
            cornerRadius: 4,
            caretSize: 4,
            xPadding: 16,
            yPadding: 10,
            backgroundColor: 'rgba(0, 150, 100, 0.9)',
            titleFontStyle: 'normal',
            titleMarginBottom: 15
          }
    }
});

}

const getTemperatures = () =>{
    fetch('https://obscure-shore-41041.herokuapp.com/pulse/'+hash)
    .then((response)=>{
        //console.log(response)
        return response.json();
    })
    .then((res)=>{
        if(res)
        {
            const labels=res.labels.map((index)=>{
                return index.substring(16,24);
            })
            generateChart(res.data,labels);
            // let temp_status = "normal"
            // if(res.data[res.data.length-1]>40){
            //     temp_status="Very Hot"
            // }else if(res.data[res.data.length-1]>33){
            //     temp_status="Hot"
            // }else if(res.data[res.data.length-1]>23){
            //     temp_status="Normal"
            // }else if(res.data[res.data.length-1]>13){
            //     temp_status="Cool"
            // }else{
            //     temp_status="Cold"
            // }
            // document.getElementById("temp_status").innerHTML=temp_status;

            document.getElementById("current_temp").innerHTML=res.data[res.data.length-1]+"PRA";
            document.getElementById("current_time").innerHTML="at "+labels[labels.length-1];
            document.getElementById("current_date").innerHTML="on "+res.labels[res.labels.length-1].substring(0,16);

        }
           
        else
            generateChart();
        console.log(res);
        if(!pause)
            setTimeout(getTemperatures,4000)
        
       
    })
    .catch((err)=>{
        console.log(err)
    })
}
getTemperatures();
const go_to_temperature_page = () =>{
    window.location.href = "https://roopam527.github.io/iot_ui/IOT_health/temperature.html?id="+hash;
}

const go_to_body_temperature_page = () =>{
    window.location.href = "https://roopam527.github.io/iot_ui/IOT_health/body_temperature.html?id="+hash;
}

const go_to_pulse_page = () =>{
    window.location.href = "https://roopam527.github.io/iot_ui/IOT_health/pulse.html?id="+hash;
}

const go_to_login_page = () =>{
    window.location.href = "https://roopam527.github.io/iot_ui";
}

const pause_graph = () =>{
    if(!pause)
        pause = true;
    else{
        pause = false;
        getTemperatures();
    }

    console.log(pause)
}