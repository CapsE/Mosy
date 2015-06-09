/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var out;
var canvas;
var ctx;
var searching = 0;
var c = 0;

var x = 200;
var y = 200;
var dx = 0;
var dy = 0;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        canvas = document.getElementById("myCanvas");
        out = document.getElementById("out");
        canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        ctx = canvas.getContext('2d');
        
        window.setInterval(GetAccData, 250);
        window.setInterval(update, 35);

        alert("Updated");
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        searching = 0;
        Alert("Device Ready");
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
 
        console.log('Received Event: ' + id);
    },
};

function accelerometerSuccess(a){
    if(isNum(a.x) && isNum(a.y)){
        dx = a.x * -1;    
        dy = a.y;
        dx = Math.floor(dx);
        dy = Math.floor(dy);
        out.innerHTML = "x: " + dx.toString() + " y: " + dy.toString();
    }
    searching = 0;
}

function accelerometerError(){
    out.innerHTML = "Error!";
    searching = 0;
}

function GetAccData(){
    if(searching < 1000){
        searching += 1;
        navigator.accelerometer.getCurrentAcceleration(accelerometerSuccessActual, accelerometerError);
    }else{
        out.innerHTML = "Still searching...";
    }
}

function accelerometerSuccessActual(acceleration){
    accelerometerSuccess(acceleration);
}

function update(){
    ctx.clearRect ( 0,0,9000,9000);
    x += dx;
    y += dy;
    ctx.fillRect(x, y, 100, 100);
}

function isInt(n){
        return Number(n)===n && n%1===0;
}

function isFloat(n){
        return   n===Number(n)  && n%1!==0
}

function isNum(n){
    if(isFloat(n) || isInt(n)){
        return true;
    }
    return false;
}