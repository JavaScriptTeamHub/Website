const savedGameData = localStorage.getItem("savedAimTrainerData");
let data = {
    gamemodes: {
        reflex: {
            brt: 0,
            hs: 0,
            ls: 0,
        },
        custom: {
            def: {
                wtt: "random",
                w: 100,
                h: 100,
                wt: 5,
                tc: "red",
                tr: 50,
                rt: "circle",
            },
            wtt: "random",
            w: 100,
            h: 100,
            wt: 5,
            tc: "red",
            tr: 50,
            rt: "circle",
        }
    }
}

function ud() {
    localStorage.setItem("savedAimTrainerData", JSON.stringify(data));
}

if (savedGameData != null) {
    data = JSON.parse(savedGameData);
} else {
    ud();
}

let pIsClicked = false;
function pauseGame() {
    if (pIsClicked == false) {
        pIsClicked = true;
        document.getElementById("pause1").style.transform = "rotate(45deg)";
        document.getElementById("pause1").style.top = "23px";
    
        document.getElementById("pause2").style.transform = "rotate(-45deg)";
        document.getElementById("pause2").style.top = "-20px";
        document.getElementById("pause2").style.left = "10px";

        document.getElementById("home").classList.remove("hidden");
        counting = false;
    } else {
        pIsClicked = false;
        document.getElementById("pause1").style.transform = "rotate(0deg)";
        document.getElementById("pause1").style.top = "0px";
        
        document.getElementById("pause2").style.transform = "rotate(0deg)";
        document.getElementById("pause2").style.top = "0px";
        document.getElementById("pause2").style.left = "25px";

        document.getElementById("home").classList.add("hidden");
        counting = true;
    }
}

function cwttc(v) {
    if (v == "random") {
        document.getElementById("customWaitTime").placeholder = "Between 0 and:";
    } else {
        document.getElementById("customWaitTime").placeholder = "Custom absolute wait time:";
    }
    data.gamemodes.custom.wtt = v;
    ud();
}

function crt(v) {
    if (v == "circle" || v == "square") {
        document.getElementById("customRadius").classList.add("hidden");
    } else {
        document.getElementById("customRadius").classList.remove("hidden");
    }
    data.gamemodes.custom.rt = v;
    ud();
}

function ctc(c) {
    switch (c) {
        case "red":
            data.gamemodes.custom.tc = c;
            break;
    
        case "green":
            data.gamemodes.custom.tc = c;
            break;
    
        case "white":
            data.gamemodes.custom.tc = c;
            break;
    
        case "blue":
            data.gamemodes.custom.tc = c;
            break;
    
        case "pink":
            data.gamemodes.custom.tc = c;
            break;
    
        case "yellow":
            data.gamemodes.custom.tc = c;
            break;
    
        case "orange":
            data.gamemodes.custom.tc = c;
            break;
    
        case "purple":
            data.gamemodes.custom.tc = c;
            break;
    
        default:
            break;
    }
    ud();
}

let cModeIsClicked = false; 

function ud2w(set) {
    data.gamemodes.custom.w = set;
    ud();
}

function ud2h(set) {
    data.gamemodes.custom.h = set;
    ud();
}

function ud2wt(set) {
    data.gamemodes.custom.wt = set;
    ud();
}

function ud2tr(set) {
    data.gamemodes.custom.tr = set;
    ud();
}
    
function modeSwitch() {
    if (cModeIsClicked) {
        cModeIsClicked = ! cModeIsClicked;
        playingArea.innerHTML = `
        <div class="customizeBox">
            <select id="customWaitTimeType" onchange="cwttc(this.value)"value="${data.gamemodes.custom.wtt}">
                <option value="random">Random</option>
                <option value="absolute">Absolute</option>
            </select><br><br>
            <input type="number" id="customWaitTime" placeholder="Between0      and:" value="${data.gamemodes.custom.wt}" onchange="ud2wt(this.value)"><br><br>
            <input type="number"  id="customWidth" placeholder="Customwidth"    value="${data.gamemodes.custom.w}" onchange="ud2w(this.value)><br><br>
            <input type="number"  id="customHeight" placeholder="Custom height" value="${data.gamemodes.custom.h}" onchange="ud2h(this.value)">
            <button id="doneBtn" onclick="dbc()">Done</button><br><br>
            <button id="modeSwitchBtn" onclick="modeSwitch()">Advanced</button>
        </div>`;
    } else {
        cModeIsClicked = ! cModeIsClicked;
        playingArea.innerHTML = `
        <div class="customizeBox">
            <select id="customRadiusType" onchange="crt(this.value)" value="${data.gamemodes.custom.rt}">
                <option value="circle">Circle (Deafult)</option>
                <option value="square">Square</option>
                <option value="custom">Custom</option>
            </select>
            <input type="number" id="customRadius" placeholder="Customradius"  value="${data.gamemodes.custom.tr}" class="hidden" onchange="ud2tr(this.value)"><br><br>
            <select id="customTargetColor" onchange="ctc(this.value)" value="${data.gamemodes.custom.tc}">
                <option value="red" style="color: red;">Red (Deafult)</option>
                <option value="green" style="color: green;">Green</option>
                <option value="blue" style="color: blue;">Blue</option>
                <option value="white" style="color: white;">White</option>
                <option value="pink" style="color: pink;">Pink</option>
                <option value="purple" style="color: purple;">Purple</option>
                <option value="orange" style="color: orange;">Orange</option>
                <option value="yellow" style="color: yellow;">Yellow</option>
            </select>
            <br><br>
            <button id="doneBtn" onclick="dbc()">Done</button><br><br>
            <button id="modeSwitchBtn" onclick="modeSwitch()">Deafult settings</button>
        </div>`;
    }
}

function play(gamemode) {
    window.addEventListener("keyup", checkKeyPress, false)
    function checkKeyPress(key) {
        if (key.keyCode == "27") {
            pauseGame();
        }
    }
    document.getElementById("body").innerHTML = `
    <div id="bg">
        <img src="src/images/home.png" alt="home" id="home" class="home hidden" onclick="window.location.href='index.html';">
        <img src="src/images/pause1.png" alt="pause" id="pause1" onclick="pauseGame()">
        <img src="src/images/pause2.png" alt="pause" id="pause2" onclick="pauseGame()">
        <div id="points"></div>
        <div id="outPoints"></div>
        <div id="reactionTime"></div>
        <div id="playingArea"></div>
    </div>
    `;
    document.getElementById("bg").classList.add("crossCur");
    if (gamemode == "reflex" || gamemode == "easy" || gamemode == "precision") {
        let points = 0;
        let outPoints = 0;
        function createTarget() {
            const waitTime = Math.floor(Math.random() * 5000);
            let randomX = Math.floor(Math.random() * window.screen.height - 300);
            let randomY = Math.floor(Math.random() * window.screen.width - 300);
            if (randomX < 0) {
                randomX -= randomX;
            }
            if (randomY < 0) {
                randomY -= randomY;
            }
            document.getElementById("bg").onclick = function() {
                outPoints++;
            }
            setTimeout(function() {
                if (pIsClicked == false) {
                    const playingArea = document.getElementById("playingArea");
                    playingArea.innerHTML = `<div id="target" style="top: ${randomX}px; left: ${randomY}px;"></div>`;
                    if (gamemode == "easy") {
                        document.getElementById("target").style.width = "100px";
                        document.getElementById("target").style.height = "100px";
                    } else if (gamemode == "precision") {
                        document.getElementById("target").style.width = "25px";
                        document.getElementById("target").style.height = "25px";
                    }
                    document.getElementById("target").onclick = function() {
                        if (pIsClicked == false) {
                            counting = false;
                            outPoints--;
                            points++;
                            playingArea.innerHTML = "";
                            document.getElementById("points").innerText = "In: " + points;
                            document.getElementById("outPoints").innerText = "Out: " + outPoints;
                            document.getElementById("reactionTime").innerText = s + ", " + ms;
                            counting = true;
                            createTarget();
                        }
                    }
                    let counting = true;
                    let ms, s;
                    ms = 0;
                    s = 0;
                    function countTime() {
                        ms++;
                        if (ms >= 1000) {
                            s++;
                            ms = 0;
                        }
                        setTimeout(function() {
                            if (counting) {
                                countTime();
                            }
                        }, 1)
                    }
                    countTime();
                } else {
                    createTarget();
                }
            }, waitTime);
        }
        createTarget();
    } else if (gamemode == "custom") {
        playingArea.innerHTML = `
        <div class="customizeBox">
            <select id="customWaitTimeType" onchange="cwttc(this.value)" value="${data.gamemodes.custom.wtt}">
                <option value="random">Random</option>
                <option value="absolute">Absolute</option>
            </select>
            <input type="number" id="customWaitTime" placeholder="Between 0 and:" value="${data.gamemodes.custom.wt}"><br><br>
            <input type="number"  id="customWidth" placeholder="Custom width" value="${data.gamemodes.custom.w}"><br><br>
            <input type="number"  id="customHeight" placeholder="Custom height" value="${data.gamemodes.custom.h}">
            <button id="doneBtn" onclick="dbc()">Done</button><br><br>
            <button id="modeSwitchBtn" onclick="modeSwitch()">Advanced settings</button>
        </div>`;
        let points = 0;
        let outPoints = 0;
        function createTarget() {
            let waitTime = Math.floor(Math.random() * 5000);
            if (data.gamemodes.custom.wtt == "random") {
                waitTime = Math.floor(Math.random() * data.gamemodes.custom.wt);
            } else {
                waitTime = data.gamemodes.custom.wt;
            }
            let randomX = Math.floor(Math.random() * window.screen.height - data.gamemodes.custom.h * 2);
            let randomY = Math.floor(Math.random() * window.screen.width - data.gamemodes.custom.w * 2);
            if (randomX < 0) {
                randomX -= randomX;
            }
            if (randomY < 0) {
                randomY -= randomY;
            }
            document.getElementById("bg").onclick = function() {
                outPoints++;
            }
            setTimeout(function() {
                if (pIsClicked == false) {
                    const playingArea = document.getElementById("playingArea");
                    playingArea.innerHTML = `<div id="target" style="top: ${randomX}px; left: ${randomY}px;"></div>`;
                    document.getElementById("target").style.width = String(data.gamemodes.custom.w) + "px";
                    document.getElementById("target").style.height = String(data.gamemodes.custom.h) + "px";
                    document.getElementById("target").onclick = function() {
                        if (pIsClicked == false) {
                            counting = false;
                            outPoints--;
                            points++;
                            playingArea.innerHTML = "";
                            document.getElementById("points").innerText = "In: " + points;
                            document.getElementById("outPoints").innerText = "Out: " + outPoints;
                            document.getElementById("reactionTime").innerText = s + ", " + ms;
                            counting = true;
                            createTarget();
                        }
                    }
                    let counting = true;
                    let ms, s;
                    ms = 0;
                    s = 0;
                    function countTime() {
                        ms++;
                        if (ms >= 1000) {
                            s++;
                            ms = 0;
                        }
                        setTimeout(function() {
                            if (counting) {
                                countTime();
                            }
                        }, 1)
                    }
                    countTime();
                } else {
                    createTarget();
                }
            }, waitTime);
        }
    }

    document.getElementById("doneBtn").onclick = function() {
        createTarget();
    }
}