function GetInfo()
{
	let text = document.createElement("p");
	text.innerHTML = "The Art Institute of Chicago was founded in 1879, and officially opened on December 8th 1893. This Institute is known worlwide for possessing one of the largest and most valuable collections on Earth.";
	document.body.appendChild(text);
	text.style = "position:absolute; top:10%; left:81%; text-align:center";
}

function AddTitle()
{
	let Title = document.createElement("title");
	Title.innerHTML = "Art Institute of Chicago";

	let logo = document.createElement("img");
	logo.src = "https://api.artic.edu/docs/assets/logo.svg";
	logo.width = 75;
	logo.style = "position:absolute; top:0.5%; left:55%";

	document.body.appendChild(logo);
	document.body.appendChild(Title);
}

function ID()
{
	let ID = document.createElement("h1");
	ID.innerHTML = "Nathaniel Gatus, 442204";
	document.body.appendChild(ID);
}

function NewArtPiece(title, imageURL, place_of_origin, provenance_text)
{
	let newPiece = document.createElement("main");

	let nameOf = document.createElement("h2");
	nameOf.innerHTML = title;
	newPiece.appendChild(nameOf);

	let Img = document.createElement("img");
	Img.src = imageURL;
	Img.width = 200;
	nameOf.appendChild(Img);

	let origin = document.createElement("h3");
	origin.innerHTML = place_of_origin;
	newPiece.appendChild(origin);

	let provenance = document.createElement("p");
	provenance.innerHTML = provenance_text;
	newPiece.appendChild(provenance);

	document.body.appendChild(newPiece);
}

async function GetArtPiece()
{
	AddTitle();

	let mainAPI = await fetch('https://api.artic.edu/api/v1/artworks');
	let data = await mainAPI.json();

	console.log(data);

	for (let i = 0; i < data.data.length; i++) {
		let piece = data.data[i];

		if (piece.image_id)
		{
			let imageAPI = await fetch('https://api.artic.edu/api/v1/artworks/27992?fields=id,' + piece.title + ',' + piece.image_id);
			let imageR = await imageAPI.json();

			let iiif = imageR.config.iiif_url;

			let imageURL = iiif + '/' + piece.image_id + '/full/843,/0/default.jpg';

			NewArtPiece(piece.title, imageURL, piece.place_of_origin, piece.provenance_text);
		}
	}

	ID();
}

GetArtPiece();