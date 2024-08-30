'use strict';
const zmq = require('zeromq');

async function run() {
    const requester = new zmq.Request();

    requester.connect("tcp://localhost:5433");
    console.log("Requester bound to port 5433")

    await requester.send(JSON.stringify({
        pid: process.pid
    }));

    const [result] = await requester.receive()
    console.log("Response from " + result.pid + ': ' + new Date(result.timestamp));
}

run()