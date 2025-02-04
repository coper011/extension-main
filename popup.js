var retro = new Audio('bells.mp3');
var click = new Audio('click.wav');

document.addEventListener("DOMContentLoaded", function(){
    const input = document.getElementById("myMessage");
    const button = document.getElementById("save");
    const jarList = document.getElementById("jar");
    //load data
    chrome.storage.local.get(["userArray"], function(result){
        let userArray = result.userArray || [];
        renderList(userArray);
    });
    //save message
    button.addEventListener("click", function(){
        chrome.storage.local.get(["userArray"], function(result){
            let userArray = result.userArray || [];
            userArray.push(input.value);
            chrome.storage.local.set({userArray: userArray}, function(){
                console.log("Loaded data: ", result);
                click.play();
                renderList(userArray);
                input.value = "";
            });
        });
    });
    //display list
    function renderList(messages){
        jarList.innerHTML = "";
        messages.forEach(message => {
            let li = document.createElement("li");
            li.textContent = message;
            jarList.appendChild(li);
        });
    }
    const chooseButton = document.getElementById("choose");
    chooseButton.addEventListener("click", function(){
        chrome.storage.local.get(["userArray"], function(result){
            let userArray = result.userArray || [];
            console.log("choose clicked");
            console.log(typeof userArray);
            console.log(userArray);
            if(userArray.length == 0){
                document.getElementById("randomDisplay").textContent = "Nothing in the jar yet!";
                return;
            }
            let num = Math.floor(Math.random() * userArray.length);
            document.getElementById("randomDisplay").textContent = userArray[num];
        });
    });
});