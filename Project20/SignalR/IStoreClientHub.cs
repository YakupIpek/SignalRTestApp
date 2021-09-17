using System.Threading.Tasks;

namespace Stratis.MarketPlace.Core;
public interface IStoreClientHub
{
    Task SendMessage(string message);
}
