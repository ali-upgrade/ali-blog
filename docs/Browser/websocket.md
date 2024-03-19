# websocket
webSocket是在应用层实现的协议。尽管WebSocket的握手过程使用了HTTP协议，但是一旦握手成功，WebSocket连接会升级为全双工的通讯通道，不再遵循HTTP协议的规则。在握手成功后，WebSocket协议会在应用层上定义消息格式和通信规则，通过TCP协议在传输层上进行数据传输。
因此，WebSocket是在应用层实现的协议，它建立在传输层的TCP协议之上，使用HTTP协议进行握手，然后在建立的TCP连接上实现全双工的通信。在应用层上，WebSocket定义了一种标准的消息格式和通信规则，使得客户端和服务端可以通过发送和接收WebSocket消息来进行实时的双向通信。
**客户端**
```
//创建WebSocket对象，指定服务器的URL
const socket = new WebSocket("ws://localhost:8080")

//连接建立时触发
socket.onopen = function(event) {
  console.log("WebSocket连接已建立");

  //发送消息给服务器
  socket.send("Hello, Server")
}

// 接收到服务器发送的消息时触发
socket.onmessage = function(event) {
  console.log("收到服务器的消息:" + event.data)
};

//连接关闭时触发
socket.onclose = function(event) {
  console.log("WebSocket连接已关闭")
}
```

**服务端**
```
const WebSocket = require('ws')

//创建WebSocket服务器
const wss = new WebSocket.Server({ port: 8080 })

//监听连接事件
wss.on('connection', function connection(ws) {
  console.log('WebSocket连接已建立')

  //监听消息事件
  ws.on('message', function incoming(message) {
    console.log('收到客户端的消息: %s', message)

    //发送消息给客户端
    ws.send('hello, clint')
  });

  //监听关闭事件
  ws.on('close', function close() {
    console.log('WebSocket连接已关闭')
  })
})
```
