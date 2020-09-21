export const cards = [
 {
    id: 1,
    name: "AMEX Banco Nacion",
    lastFourNumbers: "1014",
    entity: 1,
    expiryDate: "0125",
    closeDate: "25/09/2020",
    dueDate: "28/09/2020",
    consumption: "2000,00",
    consumptionDolar: "100,00",
 },
 {
     id: 2,
     name: "Visa Banco Provincia",
     lastFourNumbers: "5051",
     entity: 2,
     expiryDate: "0126",
     closeDate: "30/09/2020",
     dueDate: "10/10/2020",
     consumption: "2000,00",
     consumptionDolar: "2000,00",
  },
  {
     id: 3,
     name: "Visa Galicia",
     lastFourNumbers: "3321",
     entity: 3,
     expiryDate: "0125",
     closeDate: "30/09/2020",
     dueDate: "10/10/2020",
     consumption: "2000,00",
     consumptionDolar: "0,00",
    }
]

export const consumptions = [
   {
      id: 1,
      idCard: 1,
      name: "compra 1",
      date: "25/09/2020",
      value: "2000,00",
      currency: "USD"
   },
   {
      id: 2,
      idCard: 1,
      name: "compra 2",
      date: "28/09/2020",
      value: "130,00",
      currency: "ARS"
    },
    {
      id: 3,
      idCard: 2,
      name: "compra 3",
      date: "21/09/2020",
      value: "1000,00",
      currency: "ARS"
   }
]