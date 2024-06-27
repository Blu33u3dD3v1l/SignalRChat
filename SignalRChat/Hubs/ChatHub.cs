using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string message)
        {         
            await Clients.All.SendAsync("ReceiveMessage", message);
        }

        public async Task SendToUser(string receiverConnectionId, string message)
        {
           await Clients.Client(receiverConnectionId).SendAsync("ReceiveMessage", message);
        }

        public string GetConnectionId() => Context.ConnectionId;
    }
}
