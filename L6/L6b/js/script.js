// Globala variabler
var myMap;				// Objekt för kartan
var myMarkers = [];		// Array med markeringar
var userMarker;			// Objekt för markering där användaren klickar
const markerData = [	// Data för markeringar som hör till knapparna
			{position:{lat:0.000000,lng:0.000000},title:"x"},
			{position:{lat:0.000000,lng:0.000000},title:"x"},
			{position:{lat:0.000000,lng:0.000000},title:"x"},
			{position:{lat:0.000000,lng:0.000000},title:"x"},
			{position:{lat:0.000000,lng:0.000000},title:"x"}
		];
var mapLocationElem;			// Element för utskrift av koordinater
var myApiKey = "DIN-API-KEY";	// Ersätt DIN-API-KEY med din egen Flickr API key
var flickrImgElem;				// Referens till element där bilderna ska visas

// Initiering av programmet
function init() {
	initMap();
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
				center: {lat:0.000000, lng:0.000000},
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
} // End newUserMarker

// Visa marker för den adressknapp som användaren klickat på
function showAddrMarker() {
	
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
