// Initiering av globala variabler och händelsehanterare
function init() {
	let imageViewer = new ImageViewer("imgViewer");

	document.querySelector("#categoryMenu").addEventListener("change", function () {
		imageViewer.requestImages("json/images" + this.selectedIndex + ".json");
		this.selectedIndex = 0;
	});

	document.querySelector("#prevBtn").addEventListener("click", function () { imageViewer.prevImage(); });
	document.querySelector("#nextBtn").addEventListener("click", function () { imageViewer.nextImage(); });
	// ----- Extramerit ----- //
	document.querySelector("#autoBtn").addEventListener("click",
		function (e) {
			imageViewer.autoImage(e, 3000);
		}
	);


	// ----- Guldstjärna -----
	//		Här ska du lägga kod, om du gör guldstjärneuppgiften

} // End init
window.addEventListener("load", init);


function ImageViewer(id) {
	this.titleElem = document.querySelector("#" + id + " h3");
	this.imgElem = document.querySelector("#" + id + " img");
	this.captionElem = document.querySelector("#" + id + " p");
	this.imgIx = 0;
	this.timer = null;
	this.list = [{ url: "img/blank.png", caption: "" }];

	ImageViewer.prototype.requestImages = function (file) {
		let request = new XMLHttpRequest();
		let self = this;
		request.open("GET", file, true);
		request.send(null);
		request.onreadystatechange = function () {
			if (request.readyState == 4)
				if (request.status == 200) self.getImages(request.responseText);
				else document.getElementById("result").innerHTML = "Den begärda resursen fanns inte.";
		};
	}

	ImageViewer.prototype.getImages = function (JSONtext) {
		let pictures = JSON.parse(JSONtext).image;
		
		for (let i = 0; i < pictures.length; i++) {
			this.list.push(pictures[i]);
		}

		this.list = pictures;
		this.imgIx = 0;
		this.showImage();
	}

	ImageViewer.prototype.showImage = function () {
		this.imgElem.src = this.list[this.imgIx].url;
		this.captionElem.innerHTML = (this.imgIx + 1) + ". " + this.list[this.imgIx].caption;
	}

	ImageViewer.prototype.prevImage = function () {
		if (this.imgIx > 0) this.imgIx--;
		else this.imgIx = this.list.length - 1; // Gå runt till sista bilden
		this.showImage();
	}

	ImageViewer.prototype.nextImage = function () {
		if (this.imgIx < this.list.length - 1) this.imgIx++;
		else this.imgIx = 0; // Gå runt till första bilden
		this.showImage();
	}

	ImageViewer.prototype.autoImage = function (e, interval) {
		if (this.timer == null) { // Start
			this.timer = setInterval(this.nextImage.bind(this), interval);
			if (e) e.currentTarget.style.backgroundColor = "green";
		}
		else { // Stopp
			clearInterval(this.timer);
			this.timer = null;
			if (e) e.currentTarget.style.backgroundColor = "white";
		}

	}
}