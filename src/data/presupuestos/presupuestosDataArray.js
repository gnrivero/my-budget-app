export const presupuestos = [
    {
       id: 1,
       presupuestoTotal: 50000,
       mes: 'Enero',
       presupuestoConsumido: 48000,
       startDate: "01/01/2020",
       closeDate: "31/01/2020",
       balance: "2000"
    },
    {
        id: 2,
        presupuestoTotal: 52000,
        mes: 'Febrero',
        presupuestoConsumido: 55000,
        startDate: "01/02/2020",
        closeDate: "28/02/2020",
        balance: "-5000"
     },
     {
          id: 3,
          presupuestoTotal: 75000,
          mes: 'Marzo',
          presupuestoConsumido: 50000,
          startDate: "01/03/2020",
          closeDate: "30/03/2020",
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
        Rubro: "Salario",
        monto: 50000,
     },
     {
        id: 301,
        periodo:"Enero 2020",
        movimiento: "Egreso",
        Rubro: "Combustible",
        monto: 5000,
     },
        
   ]