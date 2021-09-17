
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Stratis.MarketPlace.Core;

public class StoreClientHub : Hub<IStoreClientHub>
{
    public async Task SendMessage(string message)
    {
        await Clients.All.SendMessage(message);
    }
}
