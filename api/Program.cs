using System.Net.Sockets;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;



TcpListener server = new TcpListener(IPAddress.Parse("127.0.0.1"), 80);

server.Start();

Console.WriteLine("Server has started on 127.0.0.1:80.{0}Waiting for a connection...", Environment.NewLine);

TcpClient client = server.AcceptTcpClient();

Console.WriteLine("A client connected.");

NetworkStream stream = client.GetStream();


while (true) {
    while(client.Available < 3)
    {
    // wait for enough bytes to be available
    }

    Byte[] bytes = new Byte[client.Available];

    stream.Read(bytes, 0, bytes.Length);

    String data = Encoding.UTF8.GetString(bytes);

    if (Regex.IsMatch(data, "^GET")) {
        Console.WriteLine("Hello");
    } else {

    }
}

