var retro = new Audio('bells.mp3');
var click = new Audio('click.wav');
var papertoss = new Audio('papertoss.mp3');
var paper1 = new Audio('paper1.mp3');

document.addEventListener("DOMContentLoaded", function(){
    const input = document.getElementById("myMessage");
    const button = document.getElementById("save");
    const jarList = document.getElementById("jar");
    //load data
    chrome.storage.local.get(["userArray"], function(result){
        let userArray = result.userArray || [];
        renderList(userArray);
        console.log("data loaded");
    });
    //save message
    button.addEventListener("click", function(){
        chrome.storage.local.get(["userArray"], function(result){
            let userArray = result.userArray || [];
            userArray.push({content: input.value, day: (new Date()).toLocaleDateString()});
            console.log("input pushed");
            chrome.storage.local.set({userArray: userArray}, function(){
                console.log("input set");
                click.play();
                papertoss.play();
                renderList(userArray);
                input.value = "";
            });
        });
    });
    //display list
    function renderList(messages){
        jarList.innerHTML= "";
        messages.forEach(message => {
            let li = document.createElement("li");
            li.textContent = message.content + " date: " + message.day;
            jarList.appendChild(li);
            console.log("list rendered");
            console.log(typeof day);
        });
    }
    const chooseButton = document.getElementById("choose");
    chooseButton.addEventListener("click", function(){
        chrome.storage.local.get(["userArray"], function(result){
            switchToRandomNote();
            let userArray = result.userArray || [];
            if(userArray.length == 0){
                document.getElementById("randomDisplay").textContent = "Nothing in the jar yet!";
                return;
            }
            paper1.play();
            let num = Math.floor(Math.random() * userArray.length);
            document.getElementById("randomDisplay").textContent = userArray[num].content;
        });
    });
    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", function(){
        chrome.storage.local.get(["userArray"], function(result){
            let userArray = result.userArray || [];
            chrome.storage.local.set({userArray: []}, function(){
                renderList(userArray);
                console.log("List cleared");
            });
        });
    });
    const backButton = document.getElementById("back");
    backButton.addEventListener("click", function(){
        const helloDiv = document.getElementById("hello");
        helloDiv.style.display = "block";
        const noteDiv = document.getElementById("note");
        noteDiv.style.display = "none";
    });
});
function switchToRandomNote(){
    const helloDiv = document.getElementById("hello");
    helloDiv.style.display = "none";
    const noteDiv = document.getElementById("note");
    noteDiv.style.display = "block";
}