export const investmentTypes= [
 {
   id: "PLAZO_FIJO",
   name: "Plazo Fijo",
   shortName: "Plazo Fijo"
 },
 {
    id: "FONDO_COMUN",
    name: "Fondos Comunes de Inversion",
    shortName: "Fondo Común"
  },
  {
    id: "ACCION",
    name: "Acciones",
    shortName: "Acciones"
  }
]

export const investments = [
 {
    id: 1,
    name: "Plazo Fijo Pesos",
    dueDate: "03/10/2020",
    amount: 120000.00,
    currency: "ARS",
    type: "PLAZO_FIJO"
 },
 {
    id: 2,
    name: "Fondo Pesos",
    dueDate: "",
    amount: 10000.00,
    currency: "ARS",
    type: "FONDO_COMUN"
  },
  {
    id: 3,
    name: "Acciones",
    dueDate: "",
    amount: 50000.00,
    currency: "ARS",
    symbol: "YPFD",
    type: "ACCION"
  },
  {
    id: 4,
    name: "Acciones",
    dueDate: "",
    amount: 25000.00,
    currency: "ARS",
    symbol: "EDN",
    type: "ACCION"
  }
]