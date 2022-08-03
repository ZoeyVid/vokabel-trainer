var language = false
var lektion = false
var vocabs = false

async function loadJSON(path) {
    return new Promise((resolve, reject) => {
        var xobj = new XMLHttpRequest()
        xobj.overrideMimeType("application/json")
        xobj.open('GET', path, true)
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                return resolve(JSON.parse(xobj.responseText))
            }
        }
        xobj.send(null)
        return undefined
    })
}

async function setTitle(title) {
    var config = await loadJSON("./config.json")
    document.title = String(title) + " - " + String(config.schulname) + " | Vokabeltrainer"
}

async function getHTML(path) {
    return new Promise((resolve, reject) => {
        var xobj = new XMLHttpRequest()
        xobj.overrideMimeType("text/html")
        xobj.open('GET', path, true)
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                return resolve(xobj.responseText)
            }
        }
        xobj.send(null)
        return undefined
    }
    )
}

async function loadNavbar() {
    var navbar = await getHTML("./assets/elements/navbar.html")
    var config = await loadJSON("./config.json")
    document.getElementById("navbar").innerHTML = navbar.replace("{{schulname}}", config.schulname)
    loadSprachen("sprachen")
    //TEMPORARY
    if(getCookie("cookies") !== false) {
        document.cookie = "cookies=true; expires=Wed, 31 Dec 2025 12:00:00 UTC; Secure";
    }
}

async function loadFooter() {
    var footer = await getHTML("./assets/elements/footer.html")
    var config = await loadJSON("./config.json")
    document.getElementById("footer").innerHTML = footer.replace("{{schulname}}", config.schulname).replace("{{impressum}}", config.impressum).replace("{{mail}}", config.mail).replace("{{datenschutz}}", config.datenschutz)
}

async function getLanguageName(path) {
    var sprachen = await loadJSON("./sprachen/sprachen.json")
    for (var i = 0; i < sprachen.length; i++) {
        var sprachenOption = sprachen[i]
        if(sprachenOption.path == path) {
            return sprachenOption.name
        }
    }
}

async function getLektionName(path) {
    var lektionen = await loadJSON("./sprachen/" + language + "/lektionen.json")
    for (var i = 0; i < lektionen.length; i++) {
        var lektionenOption = lektionen[i]
        if(lektionenOption.path == path) {
            return lektionenOption.Name
        }
    }
}

async function loadSprachen(element) {
    var sprachenAuswahl = document.getElementById(element)
    var sprachen = await loadJSON("./sprachen/sprachen.json")
    var notSelect = document.createElement("option")
    notSelect.value = "notSelect"
    notSelect.innerHTML = "Sprache wählen"
    notSelect.disabled = true
    notSelect.selected = true
    sprachenAuswahl.appendChild(notSelect)
    for (var i = 0; i < sprachen.length; i++) {
        var sprachenOption = sprachen[i]
        var option = document.createElement("option")
        option.value = sprachenOption.path
        option.innerHTML = sprachenOption.name
        if(sprachenOption.path == language) {
            option.selected = true
        }
        sprachenAuswahl.appendChild(option)
    }
}

function selectLanguage(element) {
    var select = document.getElementById(element).value 
    window.location.href = "lektionen.html?sprache=" + select
}

function readURL() {
    const urlParams = new URLSearchParams(window.location.search);
    language = urlParams.get('sprache')
    lektion = urlParams.get('lektion')
    vocabs = urlParams.get('vokabeln')
}

async function insertName(div, type) {
    if(type == "Lektion") {
        document.getElementById(div).innerHTML = await getLektionName(lektion)
    } else if(type == "Sprache") {
        document.getElementById(div).innerHTML = await getLanguageName(language)
    }
}

async function loadLektionen(div) {
    var lektionen = await loadJSON("./sprachen/" + language + "/lektionen.json")
    var lektionenDiv = document.getElementById(div)
    for (var i = 0; i < lektionen.length; i++) {
        var lektion = lektionen[i]
        var lektionDiv = document.createElement("li")
        lektionDiv.className = "p-3"
        lektionDiv.innerHTML = `<a href="vokabeln.html?sprache=${language}&lektion=${lektion.path}" class="underline font-bold">${lektion.Name}</a><p>${lektion.Description}</p></li>`
        lektionenDiv.appendChild(lektionDiv)
    }
}

async function loadVocabs(div) {
    var vocabs = await loadJSON("./sprachen/" + language + "/" + lektion + ".json")
    var vocabsDiv = document.getElementById(div)
    console.log(vocabs)
    console.log(vocabs.length)
    for (var i = 0; i < vocabs.length; i++) {
        var vocab = vocabs[i]
        var vocabDiv = document.createElement("li")
        vocabDiv.className = "p-3"
        vocabDiv.innerHTML = `<a class="font-bold">${vocab.german} - ${vocab.vocab}</a><p>${vocab.phrase} - ${vocab.note}</p><input type="checkbox" checked="checked" class="checkbox checkbox-secondary justify-end" id="vocab_${vocab.id}" /></li>`
        vocabsDiv.appendChild(vocabDiv)
    }
}

function getCookie(name) {
    const cName = name + "=";
    const decoded = decodeURIComponent(document.cookie);
    const arr = decoded .split('; ');
    let res;
    arr.forEach(val => {
        if (val.indexOf(cName) === 0) res = val.substring(cName.length);
    })
    return res;
}

function cookieRemove() {
    // Geht nicht
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    document.cookie = "cookies=false; expires=Wed, 31 Dec 2025 12:00:00 UTC; Secure";
}

function getSelectedVocabs(type) {
    if(document.getElementById("de").checked||document.getElementById("deen").checked) var de = true
    if(document.getElementById("en").checked||document.getElementById("deen").checked) var en = true
    var vocabs = document.getElementsByClassName("checkbox")
    var selectedVocabs = []
    for (var i = 0; i < vocabs.length; i++) {
        var vocab = vocabs[i]
        if(vocab.checked) {
            if(de) {
                selectedVocabs.push(vocab.id.replace("vocab_", "")+"_de")
            }
            if(en) {
                selectedVocabs.push(vocab.id.replace("vocab_", "")+"_en")
            }
        }
    }
    if(type == "eingabe") {
        window.location.href = "eingabe.html?sprache=" + language + "&lektion=" + lektion + "&vokabeln=" + selectedVocabs
    }
    if(type == "selbst") {
        window.location.href = "selbst.html?sprache=" + language + "&lektion=" + lektion + "&vokabeln=" + selectedVocabs
    }
}

function test() {
    console.log(vocabs)
}