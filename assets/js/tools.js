const config = require("/config.json");

function title(title) {
    document.title = title + " - " + config.schulname + " | Vokabeltrainer"
}