// Globala variabler
var myMap;				// Objekt för kartan
var myMarkers = [];		// Array med markeringar
var userMarker;			// Objekt för markering där användaren klickar
const markerData = [	// Data för markeringar som hör till knapparna
			{position:{lat:56.860090, lng:14.819391},title:"Willy's Teleborg"},
			{position:{lat:56.863746, lng:14.811667},title:"Växjösjön"},
			{position:{lat:56.862026, lng:14.828387},title:"Trummen"},
			{position:{lat:56.857610, lng:14.822808},title:"ICA Teleborg"},
			{position:{lat:56.860653344832855,lng:14.820088882466944},title:"MAX Teleborg"}
		];
var mapLocationElem;			// Element för utskrift av koordinater
var myApiKey = "a90c20870b53c16631d0255ded19dfc9";	// Ersätt DIN-API-KEY med din egen Flickr API key
var flickrImgElem;  			// Referens till element där bilderna ska visas
// Initiering av programmet
function init() {
	initMap();

	for (let i = 0; i < markerData.length; i++) {
		let buttons = document.getElementsByTagName("button"); //Referens för knapparna i HTML dokumentet
		buttons[i].innerHTML = markerData[i].title; //Tillägnar knapparna markörernas titel
		buttons[i].setAttribute("data-ix", i); //Indexerar knapparna
		buttons[i].addEventListener("click", showAddrMarker); //Anropar funktionen som visar markörerna
		
	}
	mapLocationElem = document.getElementById("mapLocation");
	flickrImgElem = document.getElementById("flickrImg");
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Skapa en karta och markeringar
function initMap() {
	myMap = new google.maps.Map(
			document.getElementById('map'),
			{
				center: {lat:56.858739, lng:14.820484},
				zoom: 14,
				styles: [
					{featureType:"poi", stylers:[{visibility:"off"}]},  // No points of interest.
					{featureType:"transit.station",stylers:[{visibility:"off"}]}  // No bus stations, etc.
				]
			}
		);
	for (let i = 0; i < markerData.length; i++) {
		let newMarker = new google.maps.Marker(markerData[i]); // Objekt för markering
		myMarkers.push(newMarker);
	}
	userMarker = null;
	google.maps.event.addListener(myMap,"click",newUserMarker);
} // End initMap

// Sätt markerns position till var användaren klickade och lägg in markern på kartan.
function newUserMarker(e) {
	hideMarkers();
	userMarker = new google.maps.Marker();
	userMarker.setPosition(e.latLng);
	userMarker.setMap(myMap);
	  // Skriv ut koordinaterna
	  const lat = e.latLng.lat();
	  const lng = e.latLng.lng();
	  mapLocationElem.innerHTML = "Latitud: " + lat + ", Longitud: " + lng;
	}
 // End newUserMarker

// Visa marker för den adressknapp som användaren klickat på
function showAddrMarker() {
	hideMarkers();
	let index = this.getAttribute("data-ix"); // Hämta indexet från data-ix attributet på den klickade knappen
	let markerToShow = myMarkers[index]; // Hämta markeringen från myMarkers arrayen baserat på indexet
	markerToShow.setMap(myMap); // Visa markeringen på kartan
	
} // End showAddrMarker

// Dölj alla markeringar
function hideMarkers() {
	for (let i = 0; i < myMarkers.length; i++) {
		myMarkers[i].setMap(null);
	}
	if (userMarker) userMarker.setMap(null);
} // End hideMarkers

// ----- Foton från Flickr ----- Extramerit

// Ajax-begäran av nya bilder
function requestImgsByLocation(lat,lon) {
	
} // End requestImgsByLocation

// Tolka svaret och visa upp bilderna.
function showMoreImgs(response) {
	
} // End showMoreImgs
