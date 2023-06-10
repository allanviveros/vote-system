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

// valida el email con el patron de "{texto|numero}@{texto}.{texto}"
function ValidateEmail(str) {
	return /^[A-Z a-z]+[0-9]*@[A-Z a-z]*\.[A-Z a-z]*$/.test(str);
}

// comprueba que el string posee numeros y caracteres
function OnlyLettersAndNumbers(str) {
	return /^[A-Z a-z]+[0-9]+[A-Z a-z]*$/.test(str) || /^[0-9]+[A-Z a-z 0-9]+$/.test(str);
}