export const presupuestos = [
    {
       id: 1,
       presupuestoTotal: 50000,
       mes: 'Enero',
       presupuestoConsumido: 48000,
       period: "012020",
       balance: "2000"
    },
    {
        id: 2,
        presupuestoTotal: 52000,
        mes: 'Febrero',
        presupuestoConsumido: 55000,
        period: "022020",
        balance: "-5000"
     },
     {
          id: 3,
          presupuestoTotal: 75000,
          mes: 'Marzo',
          presupuestoConsumido: 50000,
          period: "032020",
          balance: "25000"
       }
   ];

   export const rubros = [
    {
        value: 20,
        label: 'Combustible'
      },
      {
        value: 21,
        label: 'Supermercado'
      },
      {
        value: 22,
        label: 'Ahorro'
      },
      {
        value: 23,
        label: 'Servicios'
      },
      {
        value: 24,
        label: 'Salidas'
      },
        
   ]

   export const movimientos = [
    {
      id: 500,
      planedBudget: 50000,
      realBudget: 47000,
      serviciosPlaned: 12000,
      serviciosReal: 9000,
   },
        
   ]

   export const budgetDetail = [
    {
        value: 50,
        label: 'Ingreso'
      },
      {
        value: 51,
        label: 'Egreso'
      },
        
   ]


   export const presumocks = [
    {
        id: 300,
        periodo:"Enero 2020",
        movimiento: "Ingreso",
        rubro: "Salario",
        monto: 50000,
     },
     {
        id: 301,
        periodo:"Enero 2020",
        movimiento: "Egreso",
        rubro: "Combustible",
        monto: 5000,
     },
        
   ]

   export const budgetDetailsMocks = [
    {
        id: 500,
        ConsumoPrevisto:12700,
        consumoReal: 10000,
        item: "Servicio",
     },
     {
        id: 501,
        ConsumoPrevisto:16000,
        consumoReal: 5000,
        item: "Comida",
     },
        
   ]