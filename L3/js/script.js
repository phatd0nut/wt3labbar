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
	if (linkListElem.childElementCount > 0) {
		return;
	}
	let links = document.querySelectorAll("main section:nth-of-type(1) div:first-of-type a"); //Referens för alla länkar i texten

	for (let i = 0; i < links.length; i++) {
		let newP = document.createElement("p"); //Variabel som skapar nytt element <a>
		newP.setAttribute("target", "_blank"); //Variabel som sätter href-attribut på <a> elementet
		let linkTitle = links[i].cloneNode(true); //Variabel som klonar textinnehållet i länkarna från <a> elementen
		newP.appendChild(linkTitle);
		linkListElem.appendChild(newP);

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

	let courseTeacherElem = document.querySelectorAll("main section:nth-of-type(3) div:first-of-type ul li");
	//Referens för li-elementen

	for (let i = 0; i < courseTeacherElem.length; i++) {
			let br = document.createElement("br"); //Variabel som skapar br-element
			let a = document.createElement("a"); //Variabel som skapar a-element
			let t = document.createTextNode(teachers[i]); //Variabel kopierar lärarens namn från teachers arrayen och skapar en textsträng
			a.appendChild(t);
			a.setAttribute("href", teacherLinks[i]);
			a.setAttribute("target", "_blank");
			courseTeacherElem[i].appendChild(br);
			courseTeacherElem[i].appendChild(a);
	}


} // End addTeachers
