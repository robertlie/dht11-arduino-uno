/*
Author: Robert Lie (mobilefish.com)

Find the serial port the Arduino Uno communicates with your computer.

Usage:
1)  Start the app: node listports.js

More information:
https://www.mobilefish.com/developer/iota/iota_quickguide_arduino_mam.html
*/

const SerialPort = require('serialport');

// list serial ports:
SerialPort.list(function (err, ports) {
    ports.forEach(function(port) {
        console.log(port.comName);
    });
});