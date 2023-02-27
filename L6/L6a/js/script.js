// Globala variabler
var myApiKey = "DIN-API-KEY";	// Ersätt DIN-API-KEY med din egen API key
var flickrImgElem;		// Referens till element där bilderna ska visas
var formElem;			// Referens till sökformuläret
var tags;				// Taggar som anges i sökformuläret
var pageNr;				// Aktuellt sidnummer
var pageNrElem;			// Referens till element för sidnummer
var largeImgElem;		// Objekt med referens till img och caption för förstorad bild
var imgLocationElem;	// Referens till element för bildens koordinater
var moreImgElem;		// Referens till element för fler bilder
var map;				// Objekt för kartan

// Initiering av globala variabler och händelsehanterare
function init() {
	flickrImgElem = document.getElementById("flickrImg");
	formElem = document.getElementById("searchForm");
	pageNrElem = document.getElementById("pageNr");
	largeImgElem = {
		img: document.querySelector("#largeImg img"),
		caption: document.querySelector("#largeImg figcaption")
	}
	imgLocationElem = document.getElementById("imgLocation");
	moreImgElem = document.getElementById("moreImg");
	formElem.searchBtn.addEventListener("click",serchImgs);
	document.getElementById("prevBtn").addEventListener("click",prevPage);
	document.getElementById("nextBtn").addEventListener("click",nextPage);
	pageNr = 1;
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Initiera en ny sökning
function serchImgs() {
	tags = formElem.tags.value;
	pageNr = 1;
	requestNewImgs();
} // End serchImgs

// Ajax-begäran av nya bilder
function requestNewImgs() {
	flickrImgElem.innerHTML = "<img src='img/progress.gif' style='border:none;'>";
	pageNrElem.innerHTML = pageNr;
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","https://api.flickr.com/services/rest/?api_key=" + myApiKey + "&method=flickr.photos.search&tags=" + tags + "&per_page=5&page=" + pageNr + "&format=json&nojsoncallback=1",true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4)
			if (request.status == 200) newImgs(request.responseText);
			else flickrImgElem.innerHTML = "Den begärda resursen finns inte.";
	};
} // End requestNewImgs

// Tolka svaret och visa upp bilderna. Välj 5 slumpmässigt ur de 500.
function newImgs(response) {
	response = JSON.parse(response);
	flickrImgElem.innerHTML = "";		
	for (let i = 0; i < response.photos.photo.length; i++) {
		let photo = response.photos.photo[i]; // Ett foto i svaret
		let imgUrl = "https://live.staticflickr.com/" + photo.server + "/" +
					photo.id + "_" + photo.secret + "_s.jpg"; // Adress till en bild
		let newElem = document.createElement("img"); // Nytt img-element
		newElem.setAttribute("src",imgUrl);
		newElem.setAttribute("data-photo",JSON.stringify(photo)); // Spara data om fotot
		newElem.addEventListener("click",enlargeImg);
		flickrImgElem.appendChild(newElem);
	} // End for
} // End newImgs

// Hämta föregående uppsättning bilder
function prevPage() {
	if (pageNr > 1) {
		pageNr--;
		requestNewImgs();
	}
} // End prevPage

// Hämta nästa uppsättning bilder
function nextPage() {
	pageNr++;
	requestNewImgs();
} // End nextPage

// Visa större bild av den som användaren klickat på
function enlargeImg() {
	let photo = JSON.parse(this.getAttribute("data-photo")); // Objekt med data om fotot
	let imgUrl = "https://live.staticflickr.com/" + photo.server + "/" +
				photo.id + "_" + photo.secret + "_z.jpg"; // Adress till en bild
	largeImgElem.img.src = imgUrl;
	largeImgElem.caption.innerHTML = photo.title;
	// Tillägg i lab 6:
	requestLocation(photo.id);
} // End enlargeImg

// ---------- Följande är tillägg för lab6 ----------

// Ajax-begäran av plats för bilden
function requestLocation(id) {
	
} // End requestLocation

// Visa koordinater
function showLocation(response) {
	
} // End showLocation

// Ajax-begäran av nya bilder
function requestImgsByLocation(lat,lon) {
	
} // End requestImgsByLocation

// Tolka svaret och visa upp bilderna.
function showMoreImgs(response) {
	
} // End showMoreImgs

// ---------- Karta från Google Maps ---------- Extramerit

// Skapa en karta och markeringar
function initMap(lat,lon) {
	
} // End initMap
