const socket = io();
const textBox = document.getElementById("text")
const messegeArea = document.querySelector(".chat-area .messege-area")
const receivedMessageSound = new Audio('../Media/Message-Tone.mp3');
const send = document.querySelector(".chat-typing span")

let name;
let grant=false;

do{
    name=prompt("Enter your name:");
}while(!name);

function askForPermission() {
    
    const userPermission = window.confirm('Do you want to enable sound notifications for new messages?');

    if (userPermission) {
        grant = true;
    }
}

askForPermission();



send.addEventListener("click", (e)=>{
    console.log('hfasdjlf')
    if(e.target.value != ""){
        sendMessege(e.target.value);
    }
})

textBox.addEventListener("keyup", (e)=>{
    if(e.target.value != ""){
        if(e.key === "Enter"){
            sendMessege(e.target.value);
        }
    }
})


let sendMessege = (msg)=>{
    let messege = {
        user: name,
        messege: msg
    }

    appendMessege(messege, "outgoing");
    scrollToBottom();
    socket.emit("messege", messege);
    textBox.value = "";
}

let appendMessege = (msg, type) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("messege", type);


    content = `
        <h4>${msg.user}</h4>
        <p>${msg.messege}</p>
    `

    newDiv.innerHTML = content;
    messegeArea.appendChild(newDiv);
}

socket.on("messege", (msg)=>{
    appendMessege(msg, "incoming");
    scrollToBottom();

    if(grant === true){
        receivedMessageSound.play();
    }

})

function scrollToBottom(){
    messegeArea.scrollTop = messegeArea.scrollHeight;
}



