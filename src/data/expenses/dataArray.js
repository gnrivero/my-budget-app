export const paymentMethods = [
   {
      value : 1,
      label: 'Contado',
   },
   {
      value:2,
      label: 'Tarjeta Débito',
   },
   {
      value:3,
      label: 'Tarjeta crédito',
   },
   {
      value:4,
      label: 'Débito Automatico en cuenta',
   },
   {
      value:5,
      label: 'Transferencia',
   },
   {
      value:6,
      label: 'Otro'
   },
]

export const typeExpenses= [
   {
      id:1,
      name: 'Impuestos Nacionales',
      monthly: true,
   },
   {
      id:2,
      name: 'Impuestos Provinciales',
      monthly: true,
   },
   {
      id:3,
      name: 'Servicios',
      monthly: true,
   },
   {
      id:4,
      name: 'Educacion',
      monthly: false,
   },
   {
      id:5,
      name: 'Comida',
      monthly: false,
   },
   {
      id:6,
      name: 'Entretenimiento',
      monthly: false,
   },
   {
      id:7,
      name: 'Otro',
      monthly: false,
   }

]


export const expenses = [
   {
      id: 1,
      typeExpenses: 1, //alquiler,sueldo,...,etc
      typeExpensesName: 'Impuestos Nacionales', //alquiler,sueldo,...,etc
      detail: 'Bienes personales',
      value: '515,80',
      date: "01/09/2020",
      currency: 1,    //1 Pesos, dolares 2
      paymentMethod: '2',
      paymentMethodName: 'Tarjeta Debito',
   },
   {
      id: 2,
      typeExpenses: 5, //Impuestos, servicios,...,etc
      typeExpensesName: 'Comida', 
      detail: 'compra fin de semana',
      value: '500,80',
      date: "08/09/2020",
      currency: 1,   
      paymentMethod: '1',
      paymentMethodName: 'Contado',
   },
   {
      id: 3,
      typeExpenses: 5, //Impuestos, servicios,...,etc
      typeExpensesName: 'Comida', 
      detail: 'desayuno',
      value: '87,80',
      date: "08/09/2020",
      currency: 1,   
      paymentMethod: '2',
      paymentMethodName: 'Tarjeta Credito',
   },
   {
      id: 4,
      typeExpenses: 5, //Impuestos, servicios,...,etc
      typeExpensesName: 'Comida', 
      detail: 'Cena',
      value: '10,80',
      date: "08/09/2020",
      currency: 1,   
      paymentMethod: '3',
      paymentMethodName: 'Tarjeta Debito',
   }

]