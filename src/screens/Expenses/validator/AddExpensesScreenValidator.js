export function searchStateError(state) {

    var errorMsg = null;

    let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
    let numeroreg=/^[0-9]*$/;

    if (!state.typeExpenses|| state.typeExpenses=='') {
        errorMsg = "Seleccione el tipo de egreso";
    }else if (!state.date|| state.date==''){
        errorMsg = "Complete la fecha";
    }else if (!state.detail || state.detail==''){
        errorMsg = "Complete el detalle";
    }else if (!state.detail || state.detail==''){
        errorMsg = "Complete el detalle";
    }else if(!state.amount || state.amount==''){
        errorMsg = "Complete el importe";
    }else if(!state.paymentMethod || state.paymentMethod==''){
        errorMsg = "Complete el medio de pago";
    }
    else if(!decimalreg.test(state.amount)){
        errorMsg = "Importe invalido";
    }else if(state.paymentMethod=="CC"){
        //Compra con Credito
        if((!state.card|| state.card=='') || (!state.installments|| state.installments==''|| state.installments==0)){
            errorMsg = "Complete los datos faltantes de tarjeta";
        }else if(!numeroreg.test(state.installments) || state.installments<1){
            errorMsg = "ingrese un valor correcto en las cuotas"; 
        }
    }else if (state.paymentMethod=='DC'){
        //Compra con Debito
        if((!state.debitCard|| state.debitCard=='')){
            errorMsg = "Seleccione la tarjeta";
        }
    }else if(state.paymentMethod!='CC' && state.paymentMethod!='DC'){
        //Compra con otro medio/// asumimos que va a una cuenta
        if(state.paymentMethod=="CASH")
            state.account=-1;
        if((!state.account || state.account=='')){
            errorMsg = "Seleccione una cuenta";
        }      
    }
      return errorMsg;
}