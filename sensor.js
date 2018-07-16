/*
Author: Robert Lie (mobilefish.com)

A DHT11 sensor module is connected to the Arduino Uno.
The sketch dht.ino is uploaded to the Arduino Uno.
The sensor.js file reads DHT11 sensor data (temperature and humidity) and displays it on the console.
The interval in which the sensor data is displayed is set in the dht.ino file (see delay in milliseconds). 

Usage:
1)  Change the PORTNAME according to your situation.
    If you want to know your PORTNAME, run: node listports.js
2)  Do not forget to type: npm install
3)  Start the app: node sensor.js

More information:
https://www.mobilefish.com/developer/iota/iota_quickguide_arduino_mam.html
*/

const SerialPort = require('serialport');
const moment = require('moment');

const PORTNAME = '/dev/tty.usbmodem1421';

const port = new SerialPort(PORTNAME, {
    baudRate: 9600,
    autoOpen: true
});

const Readline = SerialPort.parsers.Readline;
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// Serial port library events
port.on('open', showPortOpen);
parser.on('data', readSerialData);
port.on('close', showPortClose);
port.on('error', showError);

// Callback functions
function showPortOpen() {
    console.log('Serial port open. Data rate: ' + port.baudRate);
}
 
function readSerialData(data){
    console.log("Serial port open. Read serial data.");

    const dateTime = moment().utc().format('DD/MM/YYYY hh:mm:ss');
    console.log(`${dateTime}, ${data}`);
}

function showPortClose() {
    console.log('Serial port closed.');
}

function showError(error) {
   console.log('Serial port error: ' + error);
}