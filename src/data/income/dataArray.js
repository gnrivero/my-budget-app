export const typeIncome = [
   {
      id:1,
      name: 'Alquiler',
      monthly: true,
   },
   {
      id:2,
      name: 'Sueldo',
      monthly: true,
   },
   {
      id:3,
      name: 'Facturacion',
      monthly: true,
   },
   {
      id:4,
      name: 'Otro',
      monthly: false,
   },
   {
      id:5,
      name: 'Venta Acciones',
      monthly: false,
   },
   {
      id:6,
      name: 'Venta Titulos',
      monthly: false,
   }

]

    


export const income = [
 {
    id: 1,
    typeIncome: 1, //alquiler,sueldo,...,etc
    typeIncomeName: 'Alquiler', //alquiler,sueldo,...,etc
    monthly : true, //Mensual=true, Ocacional = false
    value: '515,80',
    date: "01/09/2020",
    cash: true,
    currency: "USD", //1 Pesos, dolares 2
    account: 0,
    nombreCuenta: ''
 },
 {
   id: 2,
   typeIncome: 2,  //alquiler,sueldo,...,etc
   typeIncomeName: 'Sueldo', //alquiler,sueldo,...,etc
   monthly : true, //Mensual=true, Ocacional = false
   value: '15,80',
   date: "02/09/2020",
   cash: false,
   account: 1, //id de la cuenta de ingreso
   currency: "ARS", //1 Pesos, dolares 2
   nombreCuenta: '' //nombre de la cuenta de referencia
   }
]