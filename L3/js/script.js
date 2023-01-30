// Globala variabler
var linkListElem;	// Referens till div-elementet för länkarna
var courseListElem;	// Referens till div-element där valda kurser ska läggas.

// Initiering av globala variabler och händelsehanterare.
function init() {
	linkListElem = document.getElementById("linkList");
	document.getElementById("linkBtn").addEventListener("click", listLinks);

	// Array med referenser till alla li-element i den andra section
	let courseElems = document.querySelectorAll("main section:nth-of-type(2) div:first-of-type li");
	for (let i = 0; i < courseElems.length; i++) {
		courseElems[i].addEventListener("click", addCourse);
		courseElems[i].style.cursor = "pointer";
	}
	courseListElem = document.getElementById("courseList");

	document.getElementById("teacherBtn").addEventListener("click", addTeachers); // Används i extramerit
} // End init
window.addEventListener("load", init); // init aktiveras då sidan är inladdad
// ---------------------------------------------------------------
// Kopiera alla länkar ur huvudtexten och lägg upp dem i en lista.
function listLinks() {
	let links = document.querySelectorAll("a"); //Referens för alla länkar i texten
	let HTMLcode = ""; //Referens för utskrift av länkarna som ska användas i linkListElem

	for (let i = 0; i < links.length - 1; i++) {
		let url = links[i].getAttribute("href"); //Hämtar URL:en tillsammans med attributen från länkarna i HTML-dokumentet
		let link = document.createElement("a"); //Variabel som skapar nytt element <a>
		link.setAttribute("href", url); //Variabel som sätter href-attribut på <a> elementet
		let linkTitle = links[i].cloneNode(true); //Variabel som klonar textinnehållet i länkarna från <a> elementen
		link.innerHTML = linkTitle.innerHTML; //Länkarna blir tilldelade samma titel som i texten när de listas.
		linkListElem.appendChild(link);

		HTMLcode += link.outerHTML + "<br><br>";
	}

	linkListElem.innerHTML = HTMLcode;


	if (linkListElem.innerHTML == HTMLcode) {
		document.getElementById("linkBtn").removeEventListener("click", listLinks);
	}
}

// End listLinks
// ---------------------------------------------------------------
// Den kurs användaren klickat på, läggs in överst i kurslistan.
function addCourse() {
	let thisCourse = this.innerHTML; // Referens för vald kurs när man klickar
	let newElem = document.createElement("p"); //Variabel som skapar nytt p-element
	let newTextNode = document.createTextNode(thisCourse); //Variabel som kopierar text innehållet från kursen man klickat
	newElem.appendChild(newTextNode);
	let courseList = courseListElem.querySelectorAll("p"); //Referens som hämtar alla p-elementen som lagts till på listan

	let courseExists = false; // Referens för kurs som redan finns på listan
	for (let i = 0; i < courseList.length; i++) {
		if (courseList[i].textContent == thisCourse) {
			courseExists = true;
			break;
		}
	}

	if (!courseExists) {
		let firstInList = courseListElem.querySelector("p"); //Referens för alla p-elementen på listan. Används av koden nedan för att skriva ut nya kurser längst upp på listan.
		courseListElem.insertBefore(newElem, firstInList);
	}

	let pointerOverP = document.getElementById("courseList").getElementsByTagName("p"); //Variabel som visar pekaren över p-elementen på listan
	for (let i = 0; i < pointerOverP.length; i++) {
		pointerOverP[i].style.cursor = "pointer";

	}

	newElem.addEventListener("click", removeCourse);
}



// Den kurs användaren klickat på i kurslistan, tas bort.
function removeCourse() {
	this.parentNode.removeChild(this);

} // End removeCourse
// ---------------------------------------------------------------
// ----- Extramerit -----
// Funktion som lägger till kursansvariglärare i kurslistan
function addTeachers() {
	const teachers = ["Romain Herault", "Rune Körnefors", "Jorge Zapico"];
	const teacherLinks = ["https://lnu.se/personal/romain.herault", "http://lnu.se/personal/rune.kornefors", "https://lnu.se/personal/jorgeluis.zapico/"];

} // End addTeachers
