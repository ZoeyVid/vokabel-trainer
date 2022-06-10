async function loadJSON(path) {
    try {
        var request = await fetch(new URL(path))
        console.log(request)
        return request.json
    } catch (err) {
        console.error(String(err))
    }
}

async function title(title) {
    var config = await loadJSON("./config.json")
    document.title = String(title) + " - " + String(config.schulname) + " | Vokabeltrainer"
}
