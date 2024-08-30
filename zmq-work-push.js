'use strict';
const zmq = require('zeromq');

async function run() {
    const pusher = new zmq.Push();
    // Listen on TCP port 5434.
    await pusher.bind('tcp://*:5434');
    console.log('Listening for zmq pullers...');

    let jobCount = 0;
    // Send a job to the work queue.
    setInterval(function() {
        jobCount += 1;
        let msg = {
        pid: process.pid,
        job: jobCount
        };
        pusher.send(JSON.stringify(msg));
    }, 1000);
}

run();


