var language = false

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
}

async function insertLanguageName(div) {
    document.getElementById(div).innerHTML = await getLanguageName(language)
}

async function loadLektionen(div) {
    var lektionen = await loadJSON("./sprachen/" + language + "/lektionen.json")
    var lektionenDiv = document.getElementById(div)
    for (var i = 0; i < lektionen.length; i++) {
        var lektion = lektionen[i]
        var lektionDiv = document.createElement("li")
        lektionDiv.className = "p-3"
        lektionDiv.innerHTML = `<a href="vokabeln.html?sprache=${language}&lektion=${lektion.path}" class="underline">${lektion.Name}</a><p>${lektion.Description}</p></li>`
        lektionenDiv.appendChild(lektionDiv)
    }
}