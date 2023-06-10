const myName = document.getElementById("name");
const myAlias = document.getElementById("alias");
const myRut = document.getElementById("rut");
const myEmail = document.getElementById("email");

const checkWeb = document.getElementById("checkWeb");
const checkTv = document.getElementById("checkTv");
const checkRed = document.getElementById("checkRed");
const checkFriend = document.getElementById("checkFriend");

const form = document.getElementById("form");

const getRegionsPath = "http://127.0.0.1/vote/backend/routes/regions.php";
const getCommunesPath = "http://127.0.0.1/vote/backend/routes/communes.php?idregion=";
const getCandidatePath = "http://127.0.0.1/vote/backend/routes/candidate.php";
const postVotePath = "http://127.0.0.1/vote/backend/routes/vote.php";

let dataRegions;
let dataCommunes;
let dataCandidates;

//toma los check y lo vuelve un codigo binario de string
function CheckParse() {
	let checkArray = [];
	let overTwoCheck = false;
	let countCheckTrue = 0;
	let strBin = "";


	checkArray.push(checkWeb.checked, checkTv.checked, checkRed.checked, checkFriend.checked);

	const length = checkArray.length;

	for (let i = 0; i < length; i++) {
		strBin += checkArray[i] ? "1" : "0";
		if (checkArray[i]) {
			countCheckTrue += 1
		}
	}

	if (countCheckTrue >= 2) {
		overTwoCheck = true;
	}

	return [overTwoCheck, strBin];
}

//a partir del formulario genera un json
function GenerateJsonForm(name, alias, rut, email, idRegions, idCommunes, idCandidates, media) {
	let jsonForm =
	{
		"name": name,
		"alias": alias,
		"rut": rut,
		"email": email,
		"id_regions": idRegions,
		"id_communes": idCommunes,
		"id_candidates": idCandidates,
		"media": media
	}
	return jsonForm;
}


//validar el formulario con las distintas condiciones estipuladas
function ValidateForm() {
	condicion = false;

	if (myName.value.length < 1) {
		alert("el nombre no puede estar vacio");
		return condicion;
	}

	if (myAlias.value.length < 5 || !OnlyLettersAndNumbers(myAlias.value)) {
		alert("el alias debe tener longitud mayor a 5 y contener letras y numeros");
		return condicion;
	}

	if (!Fn.validaRut(myRut.value)) {
		alert("rut invalido, el formato debe ser sin puntos y con guion");
		return condicion;
	}

	if (!ValidateEmail(myEmail.value)) {
		alert("patron de correo invalido");
		return condicion;
	}

	id_comp = GetSelectOptionsId();
	jsonForm = GenerateJsonForm(myName.value, myAlias.value, myRut.value, myEmail.value, id_comp[0], id_comp[1], id_comp[2], CheckParse()[1]);


	let checkResult = CheckParse();

	if (!checkResult[0]) {
		alert("deben ser mas de 2 elecciones");
		return condicion;
	}

	condicion = true;
	return [condicion, jsonForm];
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let resp = ValidateForm()
	if (resp[0]) {
		data = resp[1];
		
		fetch(postVotePath, {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-type": "application/json" },
			withCredentials: true,
			crossorigin: true
		})
			.then(response => response.json())
			.then(json => ResultPost(json))
			.catch(err => console.log(err));
	}

});

//manejar la respuesta al insertar el voto
function ResultPost(json) {
	if (json["status"] < 0) {
		alert("error, el usuario ya voto");
	} else {
		alert("ha votado");
	}
	form.reset();
}

LoadData();