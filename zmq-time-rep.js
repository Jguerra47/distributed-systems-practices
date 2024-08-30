'use strict';
const zmq = require("zeromq");

async function run() {
    const responder = new zmq.Reply();

    // Listen on TCP port 5433.
    await responder.bind("tcp://127.0.0.1:5433")
    console.log('Listening for zmq requesters...');

    for await (const [msg] of responder) { 
        let request = JSON.parse(msg);
        console.log('Received request from: ' + request.pid);

        responder.send(JSON.stringify({
            pid: process.pid,
            timestamp: Date.now()
        }));
    }
}

run();