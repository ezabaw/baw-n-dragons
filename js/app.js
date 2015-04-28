$(document).on("ready", iniciar);

function iniciar () {
	
	$(document).foundation();

	$(".btnLanzar").on("click", lanzar);
	$(".btnDañar").on("click", dañar);
	$(".btnAgregarLanzada").on("click", agregarLanzada);
	$(".btnDuplicarMounstro").on("click", duplicarMounstro);
	$("#btnAgregarMounstro").on("click", agregarMounstro);

	$(".txtVidaTotal").on("blur", actualizarVida);
	$(".txtVidaActual").on("blur", actualizarVida);
}

function lanzar (event) {
	
	var panel = $(this).parents(".rowLanzadas");
	var lblResultados = panel.find(".lblResultados");
	var txtResultado = panel.find(".txtResultado");

	var numDados = panel.find(".txtNumDados").val();
	var caras = panel.find('select.ddlDados option:selected').val();
	var modificador = panel.find(".txtModificador").val();

	var resultados = "lanzadas: ";
	var total = 0;

	if(numDados == "")
		numDados = 1;
	if(modificador == "")
		modificador = 0;

	for (var i = 0; i < numDados; i++) {
		
		res = (Math.floor((Math.random()*100)) % caras) +1;
		resultados += res + ", ";

		total += res;
	};

	total += eval(modificador);

	lblResultados.html(resultados.substring(0, resultados.length-2));
	txtResultado.val(total);
}

function dañar (event) {
	
	var panel = $(this).parents(".pnlDatos");
	var txtVidaActual = panel.find(".txtVidaActual");
	var barra = panel.find(".meter");

	var vidaTotal = eval(panel.find(".txtVidaTotal").val());
	var vidaActual = eval(txtVidaActual.val());
	var daño = eval(panel.find(".txtDañar").val());
	var porcentaje = 0;

	if(vidaTotal == undefined) return;
	if(vidaActual == undefined) vidaActual = vidaTotal;
	if(daño == undefined) daño = 0;

	vidaActual -= daño;
	if(vidaActual < 0) 
		vidaActual = 0;
	else if(vidaActual > vidaTotal)
		vidaActual = vidaTotal;

	porcentaje = Math.floor((vidaActual / vidaTotal) * 100);

	txtVidaActual.val(vidaActual);
	actualizarBarraVida(barra, porcentaje);
}

function actualizarVida (event) {
	
	var panel = $(this).parents(".pnlDatos");
	var txtVidaActual = panel.find(".txtVidaActual");
	var barra = panel.find(".meter");

	var vidaTotal = eval(panel.find(".txtVidaTotal").val());
	var vidaActual = eval(txtVidaActual.val());
	var porcentaje = 0;

	if(vidaTotal == undefined) return;
	
	if(vidaActual == undefined) 
		$(txtVidaActual).val(vidaTotal);	
	else if(vidaActual < 0) 
		vidaActual = 0;
	else if(vidaActual > vidaTotal)
		vidaActual = vidaTotal;
	
	porcentaje = Math.floor((vidaActual / vidaTotal) * 100);

	actualizarBarraVida(barra, porcentaje);
}

function actualizarBarraVida (barra, porcentaje) {
	
	var parent = $(barra).parent();

	$(barra).attr("style", "width: " + porcentaje + "%");

	if(porcentaje <= 50) {
		$(parent).removeClass("success");
		$(parent).addClass("alert");
	}
	else {
		$(parent).removeClass("alert");
		$(parent).addClass("success");
	}
}

function agregarLanzada (event) {
	
	var panel = $(this).parents(".mounstro").find(".pnlLanzadas");
	var element = $("#nuevaLanzada").clone();
	element.removeAttr('id');

	panel.append(element);
	restaurarComportamiento();
}

function agregarMounstro (event) {
	
	var element = $("#nuevoMounstro").clone();
	element.removeAttr('id');

	$("#pnlMounstros").append(element);
	restaurarComportamiento();
}

function duplicarMounstro (event) {
	
	var element = $(this).parents(".mounstro").clone();
	element.removeAttr('id');

	$("#pnlMounstros").append(element);
	restaurarComportamiento();
}

function restaurarComportamiento () {
	
	$(document).foundation('forms');

	$(".btnLanzar").off("click");
	$(".btnDañar").off("click");
	$(".btnAgregarLanzada").off("click");
	$("#btnAgregarMounstro").off("click");
	$(".txtVidaTotal").off("blur");
	$(".txtVidaActual").off("blur");

	$(".btnLanzar").on("click", lanzar);
	$(".btnDañar").on("click", dañar);
	$(".btnAgregarLanzada").on("click", agregarLanzada);
	$("#btnAgregarMounstro").on("click", agregarMounstro);
	$(".txtVidaTotal").on("blur", actualizarVida);
	$(".txtVidaActual").on("blur", actualizarVida);
}