async function loadJSON(path) {
    try {
        fetch(new URL(path)).then(response => {return response.json()})
    } catch (err) {
        console.error(String(err))
    }
}

async function title(title) {
    var config = await loadJSON("./config.json")
    document.title = String(title) + " - " + String(config.schulname) + " | Vokabeltrainer"
}
