/*
Author: Robert Lie (mobilefish.com)

A DHT11 sensor module is connected to the Arduino Uno.
The sketch dht.ino is uploaded to the Arduino Uno.
The mam_sensor.js file reads DHT11 sensor data (temperature and humidity) and displays it on the console.
The interval in which the sensor data is stored in the Tangle is set in the dht.ino file (see delay in milliseconds).

Usage:
1)  Change the PORTNAME according to your situation.
    If you want to know your PORTNAME, run: node listports.js
2)  Do not forget to type: npm install
3)  You can change the default settings: MODE, SIDEKEY or SECURITYLEVEL
    If you do, make the same changes in mam_receive.js file.
4)  Start the app: node mam_sensor.js

More information:
https://www.mobilefish.com/developer/iota/iota_quickguide_arduino_mam.html
*/

const SerialPort = require('serialport');
const moment = require('moment');

const IOTA = require('iota.lib.js');
const Mam = require('./lib/mam.client.js');

const iota = new IOTA({ provider: 'https://nodes.testnet.iota.org:443' });

const MODE = 'restricted'; // public, private or restricted
const SIDEKEY = 'mysecret'; // Enter only ASCII characters. Used only in restricted mode
const SECURITYLEVEL = 3; // 1, 2 or 3

const PORTNAME = '/dev/tty.usbmodem1421';

const port = new SerialPort(PORTNAME, {
    baudRate: 9600,
    autoOpen: true
});

const Readline = SerialPort.parsers.Readline;
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// Initialise MAM State
let mamState = Mam.init(iota, undefined, SECURITYLEVEL);

// Set channel mode
if (MODE == 'restricted') {
    const key = iota.utils.toTrytes(SIDEKEY);
    mamState = Mam.changeMode(mamState, MODE, key);
} else {
    mamState = Mam.changeMode(mamState, MODE);
}

// Publish to tangle
const publish = async function(packet) {
    // Create MAM Payload
    const trytes = iota.utils.toTrytes(JSON.stringify(packet));
    const message = Mam.create(mamState, trytes);

    // Save new mamState
    mamState = message.state;
    console.log('Root: ', message.root);
    console.log('Address: ', message.address);

    // Attach the payload.
    await Mam.attach(message.payload, message.address);

    return message.root;
}

// Serial port library events
port.on('open', showPortOpen);
parser.on('data', readSerialData);
port.on('close', showPortClose);
port.on('error', showError);

// Callback functions
function showPortOpen() {
    console.log('Serial port open. Data rate: ' + port.baudRate);
}

async function readSerialData(data){
    console.log("Serial port open. Read serial data.");

    // Create JSON object:
    // Convert Arduino received data:  temp: 26.00C, humidity: 21.00%
    // to
    // json = { dateTime: '15/07/2018 10:57:35', data: { temp: '26.00C', humidity: '21.00%' } }
    //
    let json = {};

    const dateTime = moment().utc().format('DD/MM/YYYY hh:mm:ss');
    json['dateTime'] = dateTime;
	json['data'] = `{${data}}`;

    console.log('json = ',json);

    const root = await publish(json);
}

function showPortClose() {
    console.log('Serial port closed.');
}

function showError(error) {
   console.log('Serial port error: ' + error);
}
