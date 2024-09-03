"use strict";
const zmq = require('zeromq');

async function run() {
    const puller = new zmq.Pull();
    // Connect to pusher.
    puller.connect('tcp://localhost:5435');

    // Perform work as it comes in.
    for await (const [task] of puller) { 
        let msg = JSON.parse(task);
        console.log(msg.pid + ': Job received - ' + msg.job);
    }
}

run();
