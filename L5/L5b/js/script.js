var movElem //Referens för utskrift i HTML


function init() {
    movElem = document.getElementById("movieElement") //R
    loadJSON();
}
window.addEventListener("load", init);

function loadJSON() {
    let request = new XMLHttpRequest();
    request.open('GET', "json/file01.json", true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == "200") {
            getMovie(request.responseText);
        }
    };

}

function getMovie(JSONtext) {
    let mEle = JSON.parse(JSONtext).recension;
    let HTMLcode = "";

    for (let i = 0; i < mEle.length; i++) {
        HTMLcode += "<h2>" + mEle[i].titel.text + "</h2>";
        HTMLcode += "<h3>" + mEle[i].titel.typ + "</h3>";
        HTMLcode += "<p>" + mEle[i].genre + "</p>";
        HTMLcode += "<p>" + mEle[i].imdb + "</p>";
        HTMLcode += "<p>" + mEle[i].beskrivning + "</p>";
        HTMLcode += "<img src='" + mEle[i]["bild-url"] + "'>";
    }

    movElem.innerHTML = HTMLcode;
}
