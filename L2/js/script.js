// Globala variabler
var subjectInfoElem, courseListElem;	// Referenser till div-elementen där inläst data ska skrivas
// Inga andra globala variabler får införas i programmet!

// Initiering av globala variabler och händelsehanterare
function init() {
	subjectInfoElem = document.getElementById("subjectInfo");
	courseListElem = document.getElementById("courseList");
	document.getElementById("subjectMenu1").addEventListener("change", selectSubject);
	document.getElementById("subjectMenu2").addEventListener("change", selectCourses);
} // End init
window.addEventListener("load", init); // init aktiveras då sidan är inladdad

// ----- Meny 1 -----

// Avläs menyn för val av ämne
function selectSubject() { //Funktion som ska hämta information om ämnena ur XML-filen
	let subject = this.value; // Referens för ämne som är valt
	this.selectedIndex = 0; // Återställer  menyn efter val
	let request = new XMLHttpRequest(); // Objekt för Ajax anrop
	request.open("GET", "xml/subjects.xml", true);
	request.send(null);
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			getData(request.responseXML, subject);
		}
	};
} // End selectSubject

function getData(XMLcode, selectedSubject) { // Funktion som bearbetar och skriver ut XML-informationen
	let subjectElems = XMLcode.getElementsByTagName("subject"); // Referens för alla ämnen
	let noInfoElem = XMLcode.getElementsByTagName("not_awailable")[0]; //Referens för när det inte finns någon data över ämnet
	let HTMLcode = ""; // Referens för XML-informationen som kommer skrivas ut i HTML.

	for (let i = 0; i < subjectElems.length; i++) {
		let nameElem = subjectElems[i].getElementsByTagName("name")[0];
		let infoElem = subjectElems[i].getElementsByTagName("info")[0];
		if (nameElem.firstChild.data == selectedSubject) {
			HTMLcode += "<h3>" + nameElem.firstChild.data + "</h3>" + "<p>" + infoElem.firstChild.data + "</p>";
		}

	}

	if (HTMLcode == "") {
		subjectInfoElem.innerHTML = noInfoElem.textContent;
	} else {
		subjectInfoElem.innerHTML = HTMLcode;
	}
}




// ----- Meny 2 -----



// Avläs menyn för val av ämne för kurser
function selectCourses() {
	let course = this.selectedIndex; // Referens för index
	this.selectedIndex = 0;
	let selectedOption = this.options[this.selectedIndex]; // Referens till vald kurs
	let courseName = selectedOption.innerHTML; // Referens til kursnamnet
	requestData(course, courseName);

} // End selectCourses

function requestData(course, courseName) {
	let request2 = new XMLHttpRequest();
	request2.open("GET", "xml/courselist" + course + ".xml", true);
	request2.send(null);
	request2.onreadystatechange = function () {

		if (request2.readyState == 4 && request2.status == 200) {
			getData2(request2.responseXML, courseName);

		}

		else courseListElem.innerHTML = "Den resursen finns ej tillgänglig.";
	}

}


function getData2(XMLcode) {
	let courseInfo = XMLcode.getElementsByTagName("course");
	let HTMLcode = "";


	for (let i = 0; i < courseInfo.length; i++) {
		let codeElem = courseInfo[i].getElementsByTagName("code")[0];
		let titleElem = courseInfo[i].getElementsByTagName("title")[0];
		let creditsElem = courseInfo[i].getElementsByTagName("credits")[0];

		HTMLcode += "<p>" + codeElem.firstChild.data + ", " + titleElem.firstChild.data + ", " + creditsElem.firstChild.data + " hp" + "</p>";
	}


	courseListElem.innerHTML = HTMLcode;


}

