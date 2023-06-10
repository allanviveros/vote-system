const selectRegions = document.getElementById('selectRegion');
const selectCommunes = document.getElementById('selectCommunes');
const selectCandidates = document.getElementById('selectCandidates');

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

//detectar cuando el usuario cambia la region para actulizar el desplegable de las comunas
selectRegions.onchange = function () {
	var value = selectRegions.value;
	UpdateCommunes(value);
}