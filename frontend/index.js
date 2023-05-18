const myName = document.getElementById("name");
const myAlias = document.getElementById("alias");
const myRut = document.getElementById("rut");
const myEmail = document.getElementById("email");

const checkWeb = document.getElementById("checkWeb");
const checkTv = document.getElementById("checkTv");
const checkRed = document.getElementById("checkRed");
const checkFriend = document.getElementById("checkFriend");

const selectRegions = document.getElementById('selectRegion');
const selectCommunes = document.getElementById('selectCommunes');
const selectCandidates = document.getElementById('selectCandidates');

const form = document.getElementById("form");

const getRegionsPath = "http://127.0.0.1/vote/backend/routes/regions.php";
const getCommunesPath = "http://127.0.0.1/vote/backend/routes/communes.php?idregion=";
const getCandidatePath = "http://127.0.0.1/vote/backend/routes/candidate.php";
const postVotePath = "http://127.0.0.1/vote/backend/routes/vote.php";

let dataRegions;
let dataCommunes;
let dataCandidates;

//manejar la respuesta al insertar el voto
function ResultPost(json) {
	if (json["status"] < 0) {
		alert("error, el usuario ya voto");
	} else {
		alert("ha votado");
	}
	form.reset();
}

//actualizar las comunas cuando cambiamos la region
function UpdateCommunes(region) {
	selectCommunes.length = 0;
	let idRegion = ReturnIndexAndId(dataRegions, region);
	GetCommunesByIdRegion(idRegion[0]);
}

//obtener comunas a partir de la idRegion
function GetCommunesByIdRegion(idRegion) {
	fetch(getCommunesPath + dataRegions[idRegion]["id"])
		.then(datos => datos.json())
		.then(datos => {
			dataCommunes = datos;
			LoadOptions(selectCommunes, dataCommunes);
		})
}

//hace las peticiones a la bd para traer todos los datos y los coloca en los selector options
function LoadData() {
	fetch(getRegionsPath)
		.then(datos => datos.json())
		.then(datos => {
			dataRegions = datos;
			LoadOptions(selectRegions, dataRegions);
			GetCommunesByIdRegion(0);
		})
	fetch(getCandidatePath)
		.then(datos => datos.json())
		.then(datos => {
			dataCandidates = datos;
			LoadOptions(selectCandidates, dataCandidates);
		})
}



//cargar opciones desde la base de datos en un desplegable
function LoadOptions(selectContext, datos) {
	for (var i = 0; i < datos.length; i++) {
		var option = document.createElement("option");
		option.innerHTML = datos[i]["name"];
		selectContext.appendChild(option);
	}
}

//regresa el index del array y el id del registro
function ReturnIndexAndId(arrayBack, line) {
	for (var i = 0; i < arrayBack.length; i++) {
		if (arrayBack[i]["name"] == line) {
			return [i, arrayBack[i]["id"]];
		}
	}
}

// comprueba que el string posee numeros y caracteres
function OnlyLettersAndNumbers(str) {
	return /^[A-Z a-z]+[0-9]+[A-Z a-z]*$/.test(str) || /^[0-9]+[A-Z a-z 0-9]+$/.test(str);
}

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

// valida el email con el patron de "{texto|numero}@{texto}.{texto}"
function ValidateEmail(str) {
	return /^[A-Z a-z]+[0-9]*@[A-Z a-z]*\.[A-Z a-z]*$/.test(str);
}

// Valida el rut con su cadena completa "XXXXXXXX-X"
// codigo de https://cesarg.cl/validador-de-rut-chileno-con-javascript/
var Fn = {
	validaRut: function (rutCompleto) {
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
			return false;
		var tmp = rutCompleto.split('-');
		var digv = tmp[1];
		var rut = tmp[0];
		if (digv == 'K') digv = 'k';
		return (Fn.dv(rut) == digv);
	},
	dv: function (T) {
		var M = 0, S = 1;
		for (; T; T = Math.floor(T / 10))
			S = (S + T % 10 * (9 - M++ % 6)) % 11;
		return S ? S - 1 : 'k';
	}
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

//obtiene un arreglo con los id de las multiples opciones (region, comuna, candidato)
function GetSelectOptionsId() {
	let regionName = selectRegions.value;
	let communeName = selectCommunes.value;
	let candidatesName = selectCandidates.value;
	let infoRegion = ReturnIndexAndId(dataRegions, regionName);
	let infoCommune = ReturnIndexAndId(dataCommunes, communeName);
	let infoCandidate = ReturnIndexAndId(dataCandidates, candidatesName);
	return [infoRegion[1], infoCommune[1], infoCandidate[1]];
}

//validar el formulario con las distintas condiciones estipuladas
function ValidateForm() {
	condicion = false;

	id_comp = GetSelectOptionsId();
	jsonForm = GenerateJsonForm(myName.value, myAlias.value, myRut.value, myEmail.value, id_comp[0], id_comp[1], id_comp[2], CheckParse()[1]);


	let checkResult = CheckParse();

	if (!checkResult[0]) {
		alert("deben ser mas de 2 elecciones");
		return condicion;
	}

	if (myName.value.length < 1) {
		alert("el nombre no puede estar vacio");
		return condicion;
	}

	if (!ValidateEmail(myEmail.value)) {
		alert("patron de correo invalido");
		return condicion;
	}

	if (myAlias.value.length < 5 || !OnlyLettersAndNumbers(myAlias.value)) {
		alert("el alias debe tener longitud mayor a 5 y contener letras y numeros");
		return condicion;
	}

	if (!Fn.validaRut(myRut.value)) {
		alert("rut invalido");
		return condicion;
	} 

	condicion = true;
	return [condicion, jsonForm];
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let resp = ValidateForm()
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
});

//detectar cuando el usuario cambia la region para actulizar el desplegable de las comunas
selectRegions.onchange = function () {
	var value = selectRegions.value;
	UpdateCommunes(value);
}

LoadData();