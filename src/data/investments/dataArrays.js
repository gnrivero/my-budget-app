export const investmentTypes= [
 {
   id: 1,
   name: "Plazo Fijo",
   shortName: "Plazo Fijo"
 },
 {
    id: 2,
    name: "Fondos Comunes de Inversion",
    shortName: "Fondo Común"
  },
  {
    id: 3,
    name: "Acciones",
    shortName: "Acciones"
  }
  ,
  {
    id: 4,
    name: "Otra Inversion",
    shortName: "Otra"
  }
]

export const investments = [
 {
    id: 1,
    name: "Plazo Fijo Pesos BNA",
    date: "03/09/2020",
    dueDate: "03/10/2020",
    amount: 120000.00,
    amountCredited: 135000.00,
    currency: 1,
    symbol:'',
    account: 1,
    type: 1
 },
 {
    id: 2,
    name: "Fondo Pesos BPBA",
    date: "03/10/2020",
    dueDate: "",
    amount: 10000.00,
    amountCredited: null,
    currency: 1,
    symbol:'',
    type: 2
  },
  {
    id: 3,
    name: "Acciones compradas",
    date: "03/10/2020",
    dueDate: "",
    amount: 50000.00,
    amountCredited: null,
    currency: 1,
    symbol: "YPFD",
    type: 3
  },
  {
    id: 4,
    name: "Acciones",
    date: "03/10/2020",
    dueDate: "",
    amount: 25000.00,
    amountCredited: null,
    currency: 1,
    symbol: "EDN",
    type: 3
  }
]