'use strict';
const { Publisher } = require('zeromq');
 
// Crear un socket Publisher.
const publisher = new Publisher();
 
async function run() {
    // Enlazar el publisher al puerto TCP 5432.
    await publisher.bind('tcp://*:5432');
    console.log('Listening for zmq subscribers...');
 
    // Enviar un mensaje de beacon a los suscriptores cada segundo.
    setInterval(async () => {
        let msg = {
            pid: process.pid,
            timestamp: Date.now()
        };
        // Enviar el mensaje como un string.
        await publisher.send(["custom-topic", JSON.stringify(msg)]);
    }, 1000);
}
 
run().catch(err => console.error(err));
 