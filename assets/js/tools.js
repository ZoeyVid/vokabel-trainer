async function loadJSON(path) {
    try {
        var request = fetch(String(path))
        return (await request).json
    } catch (err) {
        console.error(String(err))
    }
}

async function title(title) {
    var config = loadJSON("./config.json")
    document.title = String(title) + " - " + String(config.schulname) + " | Vokabeltrainer"
}
