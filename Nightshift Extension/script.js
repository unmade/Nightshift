// Normally this would be inside "DOMContenLoaded" event listener
// however, this works slightly faster and helps avoid white screen
safari.extension.dispatchMessage("nightshift", {"host": window.location.host});
safari.self.addEventListener("message", handleMessage);


const STYLES = {
    "": "dark.css",
    "github.com": "github-dark.css",
    "google.com": "google-dark.css",
    "youtube.com": "youtube-dark.css",
}


function handleMessage(event) {
    const { name, message } = event;

    switch (name) {
        case "nightshift":
            const { host, darkmode } = message;
            if (host === window.location.host) {
                setDarkMode(darkmode);
            }
            break;
        default:
            break;
    }
}


function setDarkMode(mode) {
    let styles = [
        ...Object.entries(STYLES)
            .filter(([domain, href]) => window.location.host.endsWith(domain))
            .map(([domain, href]) => safari.extension.baseURI + href),
    ];

    if (mode === true) {
        document.getElementsByTagName("html")[0].style.background = "initial";
        styles.map(style => addStylesheet(style));
    } else {
        styles.map(style => removeStylesheet(style));
    }
}


function addStylesheet(href) {
    let link = document.createElement("link");
    link.href = href
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}


function removeStylesheet(href) {
    let elements = document.querySelectorAll(`link[rel=stylesheet][href~="${href}"]`);
    elements.forEach((e, i) => {
        e.parentNode.removeChild(e);
    });
}
