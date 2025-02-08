var retro = new Audio('assets/sfx/bells.mp3');
var click = new Audio('assets/sfx/click.wav');
var papertoss = new Audio('assets/sfx/papertoss.mp3');
var paper1 = new Audio('assets/sfx/paper1.mp3');
var cork = new Audio('assets/sfx/cork.mp3');
var flip = new Audio('assets/sfx/pageflip.mp3');

document.addEventListener("DOMContentLoaded", function(){
    const input = document.getElementById("myMessage");
    const button = document.getElementById("save");
    //const jarList = document.getElementById("jar");
    
    //save message
    button.addEventListener("click", function(){
        chrome.storage.local.get(["userArray"], function(result){
            let userArray = result.userArray || [];
            if(input.value == ''){
                alert("Make sure to type something!");
            }else{
                userArray.push({content: input.value, day: (new Date()).toLocaleDateString()});
                console.log("input pushed");
                chrome.storage.local.set({userArray: userArray}, function(){
                    console.log("input set");
                    click.play();
                    papertoss.play();
                    //renderList(userArray);
                    input.value = "";
                });
            }
        });
    });
    //display list
    /*
    function renderList(messages){
        jarList.innerHTML= "";
        messages.forEach(message => {
            let li = document.createElement("li");
            li.textContent = message.content + " date: " + message.day;
            jarList.appendChild(li);
            console.log("list rendered");
            return;
        });
        console.log("list rendered??");
    }
    */
    const chooseButton = document.getElementById("choose");
    chooseButton.addEventListener("click", function(){
        chrome.storage.local.get(["userArray"], function(result){
            switchToRandomNote();
            let userArray = result.userArray || [];
            if(userArray.length == 0){
                document.getElementById("randomDisplay").textContent = "Nothing in the jar yet!";
                return;
            }
            let num = Math.floor(Math.random() * userArray.length);
            document.getElementById("randomDisplay").textContent = userArray[num].content;
            document.getElementById("dateDisplay").textContent = userArray[num].day;
        });
    });
    
    /*
    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", function(){
        chrome.storage.local.get(["userArray"], function(result){
            click.play();
            let userArray = result.userArray || [];
            chrome.storage.local.set({userArray: []}, function(){
                renderList([]);
                console.log("List cleared");
            });
        });
        
    });
    */
    
    const backButton = document.getElementById("back");
    backButton.addEventListener("click", switchToHello);
    const backButton2 = document.getElementById("back2");
    backButton2.addEventListener("click", switchToHello);
    
    //pg numbers and arrows, text display
    let currentIndex = 0;
    chrome.storage.local.get(["userArray"], function(result){
        let userArray1 = result.userArray || [];
        renderNote(userArray1, currentIndex);
    });
    const noteBookButton = document.getElementById("toNotebook");
    noteBookButton.addEventListener("click", function(){
        chrome.storage.local.get(["userArray"], function(result){
            switchToNotebook();
            let userArray1 = result.userArray || [];
            renderNote(userArray1, currentIndex);
            console.log("render noted at click");
        });
    });
    /*
    const deleteButton = document.getElementById("delete");
    deleteButton.addEventListener("click", function(){
        papertoss.play();
        chrome.storage.local.get(["userArray"], function(result){
            let userArray1 = userArray || [];
            userArray1.splice(currentIndex, 1);
            chrome.storage.local.set({userArray: userArray1}, function(){
                console.log("note deleted");
                renderNote(userArray1, currentIndex);
            });
        });
        
    });
    */
    const pageLeft = document.getElementById("leftArrow");
    pageLeft.addEventListener("click", function(){
        console.log("left pg clicked");
        flip.play();
        chrome.storage.local.get(["userArray"], function(result){
            let userArray1 = result.userArray || [];
            currentIndex -= 1;
            if (currentIndex < 0){
                currentIndex = userArray1.length - 1;
            } 
            renderNote(userArray1, currentIndex);
        });
    });
    const pageRight = document.getElementById("rightArrow");
    pageRight.addEventListener("click", function(){
        console.log("right pg clicked");
        flip.play();
        chrome.storage.local.get(["userArray"], function(result){
            let userArray1 = result.userArray || [];
            currentIndex += 1;
            if (currentIndex > userArray1.length - 1){
                currentIndex = 0;
            } 
            renderNote(userArray1, currentIndex);
        });
    });
    function renderNote(userArray, idx){
        document.getElementById("notebookText").textContent = userArray[idx].content;
        document.getElementById("notebookDate").textContent = userArray[idx].day;
        document.getElementById("pageNum").textContent = (idx+1).toString() + "/" + (userArray.length).toString();
    }
});
function switchToRandomNote(){
    cork.play();
    paper1.play();
    const helloDiv = document.getElementById("hello");
    helloDiv.style.display = "none";
    const noteDiv = document.getElementById("note");
    noteDiv.style.display = "block";
}

function switchToNotebook(){
    click.play();
    const helloDiv = document.getElementById("hello");
    helloDiv.style.display = "none";
    const noteDiv = document.getElementById("notebook");
    noteDiv.style.display = "block";
}

function switchToHello(){
    click.play();
    const helloDiv = document.getElementById("hello");
    helloDiv.style.display = "block";
    const noteDiv = document.getElementById("note");
    noteDiv.style.display = "none";
    const notebookDiv = document.getElementById("notebook");
    notebookDiv.style.display = "none";
}