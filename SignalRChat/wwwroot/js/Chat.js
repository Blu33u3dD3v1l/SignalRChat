"use strict"

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (message) {

    var li = document.createElement("li");
    document.getElementById("messageList").appendChild(li);

    li.textContent = `${message}`;

});

connection.start().then(function () {
    connection.invoke("GetConnectionId").then(function (id) {
        document.getElementById("connectionId").innerText = id;
    });
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {

    return cosole.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
  
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", message).catch(function (err) {

        return cosole.error(err.toString());
    });
    event.preventDefault();
});


document.getElementById("sendUser").addEventListener("click", function (event) {

    var receiverConnectionId = document.getElementById("receiverId").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendToUser", receiverConnectionId, message).catch(function (err) {

        return cosole.error(err.toString());
    });
    event.preventDefault();
});


