// Globala variabler
var titleElem;		// Referens till element för bildspelets titel
var imgElem;		// Referens till img-element för bildspelet
var captionElem;	// Referens till element för bildtext
var imgUrls;		// Array med url:er för valda bilder
var imgCaptions;	// Array med bildtexter till valda bilder
var imgIx;			// Index för aktuell bild
var timer;			// Referens till timern för bildspelet

// Initiering av globala variabler och händelsehanterare
function init() {
	titleElem = document.querySelector("#imgViewer h3");
	imgElem = document.querySelector("#imgViewer img");
	captionElem = document.querySelector("#imgViewer p");
	imgUrls = ["img/blank.png"]; // Initiera med den tomma bilden
	imgCaptions = [""]; // Tom bildtext för den tomma bilden
	imgIx = 0;
	timer = null;
	document.querySelector("#categoryMenu").addEventListener("change",
			function() {
				requestImages("xml/images" + this.selectedIndex + ".xml");
				this.selectedIndex = 0;
			}
		);
	document.querySelector("#prevBtn").addEventListener("click",prevImage);
	document.querySelector("#nextBtn").addEventListener("click",nextImage);
	
	// ----- Extramerit -----
	/* document.querySelector("#autoBtn").addEventListener("click",
			function(e) {
				autoImage(e,3000);
			}
		);
	*/

	// ----- Guldstjärna -----
	//		Här ska du lägga kod, om du gör guldstjärneuppgiften
	
} // End init
window.addEventListener("load",init);

// ---------------------------------------------------------------
// ----- Funktioner för bildspelet -----

// Gör ett Ajax-anrop för att läsa in begärd fil
function requestImages(file) { // Parametern nr används i url:en för den fil som ska läsas in
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET",file,true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) getImages(request.responseXML); // status 200 (OK) --> filen fanns
			else document.getElementById("result").innerHTML = "Den begärda resursen fanns inte.";
	};
} // End requestImages

// Funktion för att tolka XML-koden och lägga in innehållet i variablerna för bilderna i bildspelet
function getImages(XMLcode) { // Parametern XMLcode är hela den inlästa XML-koden
	titleElem.innerHTML = XMLcode.getElementsByTagName("category")[0].firstChild.data;
	let urlElems = XMLcode.getElementsByTagName("url"); // Alla url-element
	let captionElems = XMLcode.getElementsByTagName("caption"); // Alla caption-element
	imgUrls = [];		// Nya tomma arrayer för bilder
	imgCaptions = [];	// och bildtexter
	for (let i = 0; i < urlElems.length; i++) {
		imgUrls.push(urlElems[i].firstChild.data);
		imgCaptions.push(captionElems[i].firstChild.data);
	}
	imgIx = 0;
	showImage(); // Visa första bilden
} // End getImages

// Visa bilden med index imgIx
function showImage() {
	imgElem.src = imgUrls[imgIx];
	captionElem.innerHTML = (imgIx+1) + ". " + imgCaptions[imgIx];
} // End showImage

// Visa föregående bild
function prevImage() {
	if (imgIx > 0) imgIx--;
	else imgIx = imgUrls.length - 1; // Gå runt till sista bilden
	showImage();
} // End prevImage

// Visa nästa bild
function nextImage() {
	if (imgIx < imgUrls.length - 1) imgIx++;
	else imgIx = 0; // Gå runt till första bilden
	showImage();
} // End nextImage

// ----- Extramerit -----
/* Ta bort kommentaren kring koden, för att testa funktionaliteten för extrameriten
// Starta/stoppa automatisk bildvisning
function autoImage(e,interval) {
	if (timer == null) { // Start
		timer = setInterval(nextImage,interval);
		if (e) e.currentTarget.style.backgroundColor = "green";
	}
	else { // Stopp
		clearInterval(timer);
		timer = null;
		if (e) e.currentTarget.style.backgroundColor = "white";
	}
} // End autoImage
*/
