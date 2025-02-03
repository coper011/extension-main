var i = 5;
let isCounting = false;
let intervalId;

function updateCounter() {
    if (i >= 0 && isCounting) {
        document.getElementById("output").textContent = "Value of i: " + i;
        i--;
    }else if(i < 0){
        clearInterval(intervalId);
        document.getElementById("output").textContent = "Timer done"
    }
}
function startCounter(){
    isCounting = !isCounting;
    if(isCounting){
        setInterval(updateCounter, 1000)
    }else{
        clearInterval(intervalId);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    updateCounter();
    const button = document.getElementById("timerButton");
    button.addEventListener("click", startCounter);
});
