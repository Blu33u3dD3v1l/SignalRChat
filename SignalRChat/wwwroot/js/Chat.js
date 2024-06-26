"use strict"

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (message) {

    var li = document.createElement("li");
    document.getElementById("messageList").appendChild(li);

    li.textContent = `${message}`;

});

connection.start().then(function () {

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

