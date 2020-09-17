export const typeExpenses = [
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

export const paymentMethods = [
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


export const loans = [
   {
      id: 1,
      reference: 'Prestamo 1',
      lender: true, //prestamista:true/prestatario
      value: '515,80',
      date: "01/09/2020",
      expirationDay: "01", /// va o tomamos la fecha que lo da de alta????
      currency: "ARS",   
      monthlyFee: '25,80',
      amountFees: '24',
      amountPaid: '1'
   },
   {
      id: 2,
      reference: 'Prestamo Banco',
      lender: false, //prestamista:true/prestatario
      value: '1000,00',
      date: "05/08/2020",
      expirationDay: "01", /// va o tomamos la fecha que lo da de alta????
      currency: "ARS",   
      monthlyFee: '100,00',
      amountFees: '12',
      amountPaid: '2'
   },
   {
      id: 3,
      reference: 'Familia',
      lender: false, //prestamista:true/prestatario
      value: '5000,00',
      date: "08/04/2020",
      expirationDay: "01", /// va o tomamos la fecha que lo da de alta????
      currency: "ARS",   
      monthlyFee: '300,00',
      amountFees: '20',
      amountPaid: '5'
   }
]