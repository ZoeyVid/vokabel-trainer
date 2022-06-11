/*async function loadJSON(path) {
    try {
        fetch(new URL(path)).then(response => {return response.json()})
    } catch (err) {
        console.error(String(err))
    }
}*/

//Get local JSON File
async function loadJSON(path) {
    return new Promise((resolve, reject) => {
        var xobj = new XMLHttpRequest()
        xobj.overrideMimeType("application/json")
        xobj.open('GET', path, true)
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                resolve(JSON.parse(xobj.responseText))
            }
        }
        xobj.send(null)
    })
}

async function title(title) {
    var config = await loadJSON("./config.json")
    document.title = String(title) + " - " + String(config.schulname) + " | Vokabeltrainer"
}