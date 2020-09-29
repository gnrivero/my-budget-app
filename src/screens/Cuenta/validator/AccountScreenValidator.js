export function searchStateError(state) {

    var errorMsg = null;

    let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
    let numeroreg=/^[0-9]*$/;

    console.log("tipo: " + typeof state.saldo);

    if (!state.nombreCuenta || state.nombreCuenta == ''){
        errorMsg = "Complete el nombre de la cuenta";

    } else if (!state.cbuCvu || state.cbuCvu=='') {
        errorMsg = "Complete el CVU/CBU";

    } else if (!state.entidad || state.entidad=='') {
        errorMsg = "Complete la Entidad Emisora";

    } else if (String(state.saldo) == '') {
        errorMsg = "Complete el saldo";

    } else if (!decimalreg.test(state.saldo)) {
        errorMsg = "Saldo inválido";

    } else if( (!state.numerosTarjeta || state.numerosTarjeta == '')
                || (!state.vencimientoTarjeta || state.vencimientoTarjeta == '')) {

        errorMsg = "Complete los campos faltantes de la tarjeta";

    } else if (!numeroreg.test(state.numerosTarjeta) || state.numerosTarjeta.length!=4 ) {
        errorMsg = "Número de tarjeta inválido";

    } else if (!numeroreg.test(state.vencimientoTarjeta)
                || state.vencimientoTarjeta.length!=4
                || (state.vencimientoTarjeta.slice(0, 2)>12)
                || (state.vencimientoTarjeta.slice(0, 2)<1)
                || (state.vencimientoTarjeta.slice(2, 4)<20)) {
        errorMsg = "Vencimiento de tajeta inválido";
    }

    return errorMsg;
}