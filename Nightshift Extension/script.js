safari.extension.dispatchMessage("nightshift", {"host": window.location.host});
safari.self.addEventListener("message", handleMessage);


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
    const href = safari.extension.baseURI + "dark.css";

    if (mode === true) {
        var link = document.createElement("link");
        link.href = href
        link.type = "text/css";
        link.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(link);
    } else {
        var elements = document.querySelectorAll(`link[rel=stylesheet][href~="${href}"]`);
        elements.forEach((e, i) => {
            e.parentNode.removeChild(e);
        });
    }
}
