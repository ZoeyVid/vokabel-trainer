var sprache

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

//Get content of html file
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
    var sprachenAuswahl = document.getElementById("sprachen")
    var sprachen = await loadJSON("./sprachen/sprachen.json")
    console.log(sprachen)
    if(!sprache) {
        var notSelect = document.createElement("option")
        notSelect.value = "notSelect"
        notSelect.innerHTML = "Sprache wählen"
        notSelect.disabled = true
        notSelect.selected = true
        sprachenAuswahl.appendChild(notSelect)
    }
    sprachen.forEach(sprachenOption => {
        var option = document.createElement("option")
        option.value = sprachenOption.path
        option.innerHTML = sprachenOption.name
        sprachenAuswahl.appendChild(option)
    })
}