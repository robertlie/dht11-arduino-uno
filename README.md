# Send DHT11 sensor data to the IOTA Tangle using MAM and Arduino Uno

This is a tutorial how to send DHT11 sensor data using Arduino Uno to IOTA Tangle using Masked Authenticated Messaging (MAM).

## Requirements

All hardware requirements and how the Arduino IDE is prepared is explained at:  
[https://www.mobilefish.com/developer/iota/iota_quickguide_arduino_mam.html][1]

[1]: https://www.mobilefish.com/developer/iota/iota_quickguide_arduino_mam.html "Mobilefish.com"

![alt text](https://www.mobilefish.com/images/developer/arduino_uno_dht11.png "DHT11 sensor connected to Arduino Uno")

## Features

The project consists of 4 main files and should be executed on a computer.
- listports.js: Find the serial port the Arduino Uno communicates with your computer.
- mam_receive.js: Extract the stored data from the Tangle using MAM and display the data.
- sensor.js: The DHT11 sensor data (temperature and humidity) is read and displayed.
- mam_sensor.js: The DHT11 sensor data is read and published to the Tangle using MAM.

## Installation

```
npm install
```

## Usage

How to use the scripts see:  
[https://www.mobilefish.com/developer/iota/iota_quickguide_arduino_mam.html][1]
