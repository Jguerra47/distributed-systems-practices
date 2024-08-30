const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Subscriber()

  sock.connect("tcp://127.0.0.1:5432")
  sock.subscribe("custom-topic")
  console.log("Subscriber connected to port 5432")

  for await (const [topic, msg] of sock) {
    console.log(
      "received a message related to:", topic.toString(),
      "containing message:", msg.toString(),
    )
  }
}

run()
