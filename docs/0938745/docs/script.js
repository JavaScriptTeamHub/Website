const storedFileData = localStorage.getItem("storedFileData");

let fileData = {
    hack: {
        
    },
    back: false,
    hhU: 0,
    acSLC: false,
    keylogger: false,
    loggedKeys: "",
    documents: {
        term: [],
        termRestore: [],
    },

    toSearch: [
        {
            name: "msgCoder",
            get: "gotoMSGcoder()",
        },
        {
            name: "terminal",
            get: "gotoTerminal()",
        },
    ],

    termStyleW: "",
    termStyleH: "",
    lCmd: "",
};

if (storedFileData != null) {
    fileData = JSON.parse(storedFileData);
}

document.getElementById("_TOs").onclick = function() {
    if (fileData.hhU != 2) {
        fileData.back = true;
        fileData.hhU += 1;
        localStorage.setItem("storedFileData", JSON.stringify(fileData));
    }
}

if (fileData.back) {
    login();
}


function ud() {
    localStorage.setItem("storedFileData", JSON.stringify(fileData));
}


function login() {
    const loginRedirect = localStorage.getItem("loginRedirecter");
    if (loginRedirect !== null || fileData.back) {
        fileData.back = false;
        ud();
        document.getElementById("bg").innerHTML = `
        <div class="topnav">
            <div id="navbarMenu" onclick="openNavbarMenu()">
                <div class="menu-1"></div>
                <div class="menu-2"></div>
                <div class="menu-3"></div>
            </div>
            <div id="searchBar"><input type="search" id="searchItem" placeholder="Search for anything" list="searchList" onchange="searchItem(this.value)"></div>
            <datalist id="searchList">
                <option value="msgCoder">
                <option value="terminal">
            </datalist>
            <a onclick="gotoHome()">Home</a>
            <a onclick="gotoNews()">News</a>
            <a onclick="gotoFileBrowser()">File browser</a>
            <a onclick="gotoFileBrowser("Hacks")">Hacks</a>
            <a onclick="gotoTerminal()">Terminal</a>
            <a onclick="gotoChat()">Chat</a>
            <a onclick="gotoMore()">More</a>
        </div>
        <div id="bodyAfter">
            <div id="openedNavbarMenu" class="hidden">
                <button class="openedNavbarMenu-exit-btn" onclick="window.location.href='index.html';">Exit</button>
            </div>
            <div id="more" class="hidden">
                <ul>
                    <li onclick="gotoMSGcoder()">MSG coder</li>
                </ul>
            </div>
        </div>
        `;
    } else {
        alert("Wrong username or password!");
    }
}

function searchItem(item) {
    switch (item) {
        case "msgCoder":
            gotoMSGcoder();
            break;

        case "terminal":
            gotoTerminal();
            break;
    
        default:
            alert("Can't find " + '"' + item + '"');
            break;
    }
}

function rock() {
    fileData.back = true;
    ud();
    window.location.href = "index.html";
}

function rockTerm() {
    fileData.termStyleW = document.getElementById("termInput").style.width;
    fileData.termStyleH = document.getElementById("termInput").style.height;
    fileData.back = true;
    ud();
    window.location.href = "index.html";
}

function gotoMSGcoder() {
    document.getElementById("bg").innerHTML = `
        <button onclick="rock()">Back</button><br><br>
        <button id="switch-to-code">Switch to decode</button><br><br>
        <textarea id="inputText"></textarea>
        <button id="start-code"></button>
        <br><br>
        <h2>Result:</h2>
        <textarea id="resultText"></textarea>
        <input type="text" id="codeKey">
    `;
    let encode = true;
    if (encode == true) {
        document.getElementById("start-code").innerText = "Encode";
    } else {
        document.getElementById("start-code").innerText = "Decode";
    }
    document.getElementById("switch-to-code").onclick = function() {
        if (encode == true) {
            document.getElementById("start-code").innerText = "Decode";
            this.innerText = "Switch to encode";
            encode = false;
        } else {
            document.getElementById("start-code").innerText = "Encode";
            this.innerText = "Switch to decode";
            encode = true;
        }
    }
    document.getElementById("start-code").onclick = function() {
        if (encode == true) {
            const inputText = document.getElementById("inputText");
            const resultText = document.getElementById("resultText");
            const codeKey = document.getElementById("codeKey");
            if (inputText.value == null) {
                alert("Please write anything in the inputText box!");
            } else {
                let characters = "AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZaábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz §'+!%/=()?:_,.-;>*<#&@ä|$0123456789";
                function makeid(length) {
                    var result = "";
                    var charactersLength = characters.length;
                    for ( var i = 0; i < length; i++ ) {
                      result += characters.charAt(Math.floor(Math.random() * 
                 charactersLength));
                   }
                   return result;
                }

                let newCharacters = {};
                let newCharacter;
                let usedCharacters;
                for (let i = 0; i < characters.length; i++) {
                    newCharacter = makeid(1);
                    while (i > 0 && usedCharacters.includes(newCharacter)) {
                        newCharacter = makeid(1);
                    }
                    newCharacters[characters.charAt(i)] = newCharacter;
                    if (i == 0) {
                        usedCharacters = String(newCharacter);
                    } else {
                        usedCharacters += String(newCharacter);
                    }
                }
                const inputTextValue = inputText.value;
                let resultTextNewValue = "";
                for (let i = 0; i < inputTextValue.length; i++) {
                    const newChar = newCharacters[inputTextValue[i]];
                    resultTextNewValue += newChar;
                }
                resultText.value = resultTextNewValue;
                codeKey.value = JSON.stringify(newCharacters);
            }
        } else {
            function getKeyByValue(object, value) {
                return Object.keys(object).find(key => object[key] === value);
            }
            let codeKeyLocal;
            const inputText = document.getElementById("inputText");
            const inputTextValue = document.getElementById("inputText").value;
            const resultText = document.getElementById("resultText");
            const resultTextValue = document.getElementById("resultText").value;
            const codeKey = document.getElementById("codeKey");
            codeKeyLocal = JSON.parse(codeKey.value);
            let resultInputText = "";
            for (let i = 0; i < resultTextValue.length; i++) {
                const newChar = /* codeKeyLocal[resultTextValue[i]] */ getKeyByValue(codeKeyLocal, resultTextValue[i]);
                resultInputText += newChar;
            }
            inputText.value = resultInputText;
        }
    }
}

let openedNavbarMenuIsOpened = false;

function openNavbarMenu() {
    if (openedNavbarMenuIsOpened) {
        document.getElementById("openedNavbarMenu").classList.add("hidden");
        openedNavbarMenuIsOpened = ! openedNavbarMenuIsOpened;
    } else {
        document.getElementById("openedNavbarMenu").classList.remove("hidden");
        openedNavbarMenuIsOpened = ! openedNavbarMenuIsOpened;
    }
}

let moreIsOpened = false;

function gotoMore() {
    if (moreIsOpened) {
        document.getElementById("more").classList.add("hidden");
        moreIsOpened = ! moreIsOpened;
    } else {
        document.getElementById("more").classList.remove("hidden");
        moreIsOpened = ! moreIsOpened;
    }
}

window.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    if (fileData.keylogger) {
        fileData.loggedKeys += charStr;
        ud();
    }
};

function gotoHome() {
    document.getElementById("bg").innerHTML = `
    <div class="topnav">
        <div id="navbarMenu" onclick="openNavbarMenu()">
            <div class="menu-1"></div>
            <div class="menu-2"></div>
            <div class="menu-3"></div>
        </div>
        <div id="searchBar"><input type="search" id="searchItem" placeholder="Search for anything"></div>
            <a onclick="gotoHome()">Home</a>
            <a onclick="gotoNews()">News</a>
            <a onclick="gotoFileBrowser()">File browser</a>
            <a onclick="gotoFileBrowser("Hacks")">Hacks</a>
            <a onclick="gotoTerminal()">Terminal</a>
            <a onclick="gotoChat()">Chat</a>
            <a onclick="gotoMore()">More</a>
    </div>
    <div id="bodyAfter">
        <div id="openedNavbarMenu" class="hidden">
            <button class="openedNavbarMenu-exit-btn" onclick="window.location.href='index.html';">Exit</button>
        </div>
        <div id="more" class="hidden">
            <ul>
             <li onclick="gotoMSGcoder()">MSG coder</li>
            </ul>
        </div>
    </div>
`;
}

function gotoFileBrowser(route) {
    let oldBody;
    if (route == "" || route == undefined || route == null) {
        oldBody = document.getElementById("bodyAfter").innerHTML;
        document.getElementById("bodyAfter").innerHTML += `
            <br>
            <button id="back">Back</button><br><br>
            <br><br>
            <button id="hacks">Hacks</button><br><br>
            <button id="documents">Documents</button>
        `;
    } else {
        switch (route) {
            case "hacks":
                hacks();
                break;
        
            case "documents":
                documents();
                break;
        
            default:
                break;
        }
    }
}

function searchValue(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

function gotoTerminal() {
    if (fileData.termStyleW != "" || fileData.termStyleH != "") {
        document.getElementById("bg").innerHTML = `
            <button onclick="rockTerm()">Back</button><br><br>
            <textarea spellcheck="false" id="termInput" style="width: ${fileData.termStyleW}; height: ${fileData.termStyleH};"></textarea>
        `;
    } else {
        document.getElementById("bg").innerHTML = `
            <button onclick="rockTerm()">Back</button><br><br>
            <textarea id="termInput"></textarea>
        `;
    }
    function slc() {
        if (fileData.acSLC != true) {
            fileData.lCmd = termInput.value;
            ud();
        } else {
            ud();
        }
    }
    const termInput = document.getElementById("termInput");
    window.onkeypress = function (evt) {
        evt = evt || window.event;
        let charCode = evt.keyCode || evt.which;
        var charStr = String.fromCharCode(charCode);
        if (fileData.keylogger) {
            fileData.loggedKeys += charStr;
            ud();
        }
        if (charCode === 13) {
            if (String(termInput.value).startsWith("pr")) {
                alert(String(termInput.value).slice(3, String(termInput.value).length));
                slc();
                termInput.value = "";
            } else if (termInput.value === "get -lastCommand") {
                termInput.value = String(fileData.lCmd);
            } else if (termInput.value === "del -lastCommand") {
                termInput.value = "";
                slc();
            } else if (String(termInput.value).startsWith("edit -hhu")) {
                if (Number(String(termInput.value).slice(10, String(termInput.value).length)) != "undefined") {
                    fileData.hhU = Number(String(termInput.value).slice(10, String(termInput.value).length));
                    slc();
                    termInput.value = "";
                }
            } else if (String(termInput.value).startsWith("acSLC")) {
                if (String(termInput.value).slice(6, String(termInput.value).length) == "true") {
                    fileData.acSLC = true;
                } else if (String(termInput.value).slice(6, String(termInput.value).length) == "false") {
                    fileData.acSLC = false;
                }
                slc();
                termInput.value = "";
            } else if (String(termInput.value).startsWith("redirect -u")) {
                if (String(termInput.value).slice(12, 13) == "y") {
                    if (String(termInput.value).length < 21) {
                        for (let i = 0; i < 1000; i++) {
                            alert("SYSTEM REJECTED!");
                        }
                    } else {
                        localStorage.setItem("loginRedirecter", String(termInput.value).slice(21, String(termInput.value).length));
                    }
                } else if (String(termInput.value).slice(12, 13) == "n") {
                    if (String(termInput.value).length < 21) {
                        for (let i = 0; i < 1000; i++) {
                            alert("SYSTEM REJECTED!");
                        }
                    } else {
                        localStorage.removeItem("loginRedirecter");
                    }
                }
                slc();
                termInput.value = "";
            } else if (termInput.value == "get -hhu") {
                alert(fileData.hhU);
                slc();
                termInput.value = "";
            } else if (termInput.value == "back") {
                rockTerm();
                slc();
                termInput.value = "";
            } else if (termInput.value == "exit") {
                window.location.href = "index.html";
                slc();
                termInput.value = "";
            } else if (termInput.value == "get -redirect -u") {
                alert(localStorage.getItem("loginRedirecter"));
                slc();
                termInput.value = "";
            } else if (termInput.value == "msgCoder") {
                gotoMSGcoder();
                slc();
                termInput.value = "";
            } else if (termInput.value == "del -data") {
                let savedData = [];
                if (localStorage.getItem("savedFileDatas") != null) {
                    savedData = JSON.parse(localStorage.getItem("savedFileDatas"));
                }
                savedData.push(fileData);
                localStorage.setItem("savedFileDatas", JSON.stringify(savedData));
                localStorage.removeItem("storedFileData");
                window.location.href = "index.html";
            } else if (String(termInput.value).startsWith("get -savedDatas")) {
                savedData = JSON.parse(localStorage.getItem("savedFileDatas"));
                if (String(termInput.value).slice(16, 23) == "-length") {
                    alert(savedData.length);
                    slc();
                    termInput.value = "";
                }
                if (String(termInput.value).slice(16, 24) == "-restore") {
                    fileData = savedData[Number(String(termInput.value).slice(24, String(termInput.value).length)) + 1];
                    savedData.push(fileData);
                    localStorage.setItem("savedFileDatas", JSON.stringify(savedData));
                    window.location.href = "index.html";
                }
                if (String(termInput.value).slice(16, 22) == "-inner") {
                    alert(JSON.stringify(savedData[Number(String(termInput.value).slice(23, String(termInput.value).length)) - 1]));
                    slc();
                    termInput.value = "";
                }
                if (String(termInput.value).slice(16, 23) == "-delete") {
                    savedData.splice(Number(String(termInput.value).slice(24, String(termInput.value).length)) - 1, Number(String(termInput.value).slice(24, String(termInput.value).length)));
                    localStorage.setItem("savedFileDatas", JSON.stringify(savedData));
                    slc();
                    termInput.value = "";
                }
                if (String(termInput.value).slice(16, 28) == "-delete -all") {
                    savedData = [];
                    localStorage.setItem("savedFileDatas", JSON.stringify(savedData));
                    slc();
                    termInput.value = "";
                }
            } else if (String(termInput.value).startsWith("cd")) {
                window.location.href = String(termInput.value).slice(2, String(termInput.value).length);
            } else if (termInput.value == "we will") {
                slc();
                termInput.value = `
                pr == Print anything
                get -lastCommand == Get the last writed command, if this enabled
                    -hhu == Get the hhU
                    -redirect -u == Get user is redirected
                    -savedDatas == Get the saved datas
                        -length == Get the saved datas length
                        -restore [number] == Restore the saved data
                        -inner [number] == Get the saved data
                        -delete [number] == Delete the saved data
                        -delete -all == Delete all saved data
                    -keylogger -loggedkeys == Get the logged keys
                del -lastCommand == Delete the last command
                    -data == Delete the data on the system and starting a new
                    -keylogger -loggedkeys == Delete logged keys
                edit -hhu [number] == Edit the hhU number
                acSLC [true/false] == Turn off/on memory the last commands
                redirect -u [y/n] == Redirect user
                back == Back to the homepage
                exit == Exit from system
                msgCoder == Open MSG Coder
                we will == rock you
                search [item] == Search an item
                keylogger == Set up the keylogger
                `;
            } else if (String(termInput.value).startsWith("search")) {
                searchItem(String(termInput.value).slice(7, String(termInput.value).length));
                slc();
            } else if (String(termInput.value).startsWith("keylogger")) {
                if (String(termInput.value).endsWith("true")) {
                    fileData.keylogger = true;
                    slc();
                } else if (String(termInput.value).endsWith("false")) {
                    fileData.keylogger = false;
                    slc();
                } else {
                    termInput.value = fileData.keylogger;
                    slc();
                }
            } else if (String(termInput.value) == "get -keylogger -loggedkeys") {
                slc();
                termInput.value = fileData.loggedKeys;
            } else if (String(termInput.value) == "del -keylogger -loggedkeys") {
                fileData.loggedKeys = "";
                termInput.value = "";
                slc();
            } else if (termInput.value == "play aimtrainer") {
                window.location.href = "src/files/AimTrainer/index.html";
                termInput.value = "";
                slc();
            } else if (termInput.value == "JSoftver") {
                window.location.href = "https://jsoftver.github.io/Website/";
                termInput.value = "";
                slc();
            } else if (termInput.value == "jsoftver") {
                window.location.href = "https://jsoftver.github.io/Website/";
                termInput.value = "";
                slc();
            }
            
            else {
                alert("Wrong command!");
            }
        }
    }
}