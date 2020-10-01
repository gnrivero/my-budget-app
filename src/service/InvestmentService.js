import DBConnector from '../data/access/DBConnector';
import TransactionService from './TransactionService';

export default class InvestmentService {

    db;
    transactionService;
    constructor(){
        this.db = DBConnector.connect();
        this.transactionService = new TransactionService();
    }

    createInvestment(detail, type, currencyCode, date, amount, symbol, dueDate=null, amountCredited=null, accountId=null) {
        console.log(detail + ' - ' + type + ' - ' + currencyCode+ ' - ' + date + ' - ' + amount  );
        console.log( symbol + ' - ' + dueDate + ' - ' + amountCredited + ' - ' + accountId)
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "INSERT INTO investment (detail, investmentTypeId, currencyCode, date, amount, symbol, dueDate, amountCredited, accountId, active) " +
                   "VALUES (?,?,?,?,?,?,?,?,?,1)",
                   [detail, type, currencyCode, date, amount, symbol, dueDate, amountCredited, accountId],
                   (txn, res) => { console.log("createInvestment: Affected Rows " + res.rowsAffected); },
                   (txn, err) => { console.log("createInvestment: " + err); }
              )
           }
       );
    }
/*
    updateAccount(id, name, currencyCode, bankId, identificationNumber, balance) {
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "UPDATE account SET " +
                   "name = ?, " +
                   "currencyCode = ?, " +
                   "bankId = ?, " +
                   "identificationNumber = ?, " +
                   "balance = ? " +
                   "WHERE id = ?",
                   [name, currencyCode, bankId, identificationNumber, balance, id],
                   (txn, res) => { console.log("updateAccount with ID: " + id); },
                   (txn, err) => { console.log("updateAccount: " + err); }
              )
           }
       );
    }
*/

    updateActive(id, active) {
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "UPDATE investment SET " +
                   "active = ? " +
                   "WHERE id = ?",
                   [active, id],
                   (txn, res) => { console.log("InvestmentService: updateActive with ID: " + id); },
                   (txn, err) => { console.log("InvestmentService updateActive: " + err); }
              )
           }
       );
    }


    getAllInvestment(){
      const conn = this.db;
      return new Promise((resolve) => {
          conn.transaction(
            (txn) => {
               txn.executeSql(
                    "SELECT " +
                    " investment.id as id," +
                    " investment.detail as detail," +
                    " investment.investmentTypeId as investmentTypeId," +
                    " investmentType.name as investmentType," +
                    " investment.amount as amount," +
                    " investment.currencyCode as currencyCode," +
                    " investment.date as date," +
                    " investment.dueDate as dueDate," +
                    " investment.symbol as symbol," +
                    " investment.amountCredited as amountCredited," +
                    " investment.active as active, " +
                    " account.name as account " +
                    " FROM investment " +
                    " INNER JOIN investmentType ON investmentType.id = investment.investmentTypeId "+
                    " LEFT JOIN account ON account.id = investment.accountId " +
                    " WHERE investment.active =1 "+
                    " ORDER BY investment.date DESC",
                    [],
                    (txn, res) => {
                       let investments = new Array();
                       console.log(res.rows)
                       for(var i = 0; i < res.rows.length; ++i){
                        investments.push(res.rows.item(i));
                       }
                       resolve(investments);
                    },
                    (txn, err) => {
                        console.log("getAllInvestment:" + err);
                    }
               )
            }
          );
      });
    }

    getInvestmentById(id) {
        const conn = this.db;
        return new Promise((resolve) => {
            conn.transaction(
              (txn) => {
                 txn.executeSql(
                    "SELECT * FROM investment WHERE investment.id = ?",
                    [id],
                    (txn, res) => {
                         if (res.rows.length >= 1) {
                           var investment = res.rows.item(0);
                           resolve(investment);
                         }
                    },
                    (txn, err) => {
                        console.log("getInvestmentById: " + err);
                    }
                 )
              });
         });
    }

    checkInvestments(){
        dateNow= new Date();
        dateShort=dateNow.toISOString().split('T')[0]                
        console.log(dateShort);
        this.db.transaction(
            (txn) => {
               txn.executeSql(
                 "SELECT * FROM investment WHERE active = 1 and  dueDate< ?",
                 [dateShort],
                 (txn, res) => {
                    console.log(res.rows);
                    for(var i = 0; i < res.rows.length; ++i){
                        console.log("element checkInvestments");
                        console.log(res.rows.item(i));
                        item= res.rows.item(i);
                        this.transactionService.createTransaction('I','Acreditacion '+item.detail , false, item.currencyCode ,6,item.dueDate ,item.amountCredited,item.accountId,0);  
                        this.updateActive(item.id,0)
                    }
                 },
                 (txn, err) => {
                     console.log("checkInvestments: " + err);
                 }
               )
 
            }
        );

    }

 
    /*
        Este método debe ser llamado desde DBInit.js
    */
    initDB(resetData, populate, runTests){

        if(resetData === true){
            this.createTable();
        }

        if(populate === true){
            this.populate();
        }

        if(runTests === true){
            this.test();

        }
    }

    createTable(){
        console.log("InvestmentService: Dropping table investment");
        this.db.transaction(
            (txn) => {
                txn.executeSql(
                    "DROP TABLE IF EXISTS investment",
                    [],
                    (txn, res) => {
                        console.log("InvestmentService: Table Dropped");
                        console.log("InvestmentService: Creating Table investment");
                        txn.executeSql(
                            "CREATE TABLE IF NOT EXISTS investment (" +
                                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                                "detail VARCHAR(50)," +
                                "investmentTypeId INTEGER," +
                                "currencyCode VARCHAR(3)," +
                                "amount DECIMAL(10,2)," +
                                "amountCredited DECIMAL(10,2)," +
                                "date DATE," +
                                "dueDate DATE," +
                                "symbol VARCHAR(8)," +
                                "accountId INTEGER," +
                                "active INTEGER " +
                                ")",
                            [],
                            (txn, res) => { console.log("InvestmentService: Table investment created " + res); },
                            (txn, err) => {
                                console.log("InvestmentService: create table" + err);
                            }
                            
                       )
                    }
                )
            }
        );
    }

    populate(){
        //Inicializo algunos datos
        console.log("InvestmentService: Populating table investment");     
        this.createInvestment('Plazo fijo Banco',1, 'ARS', '2020-08-10',10000.50,null,'2020-09-20',102000.50,3);
        this.createInvestment('Bonos Nacionales',2, 'ARS', '2020-07-15',2000,'BONAR23');
        this.createInvestment('Acciones YPF',3, 'ARS', '2020-08-10',1000,'YPF');
        this.createInvestment('Fondo inversion',4, 'ARS', '2020-08-10',50000,'FI');
        this.createInvestment('Plazo fijo online',1, 'ARS', '2020-08-10',8000,null,'2020-10-20',10000,3);
    }

    
    test(){

        this.getAllInvestment();

        //check back investments
        this.checkInvestments();

        this.getInvestmentById(1)
            .then(investment => {
               console.log("Get investment By Id");
               console.log(investment);
            });

       /*
         this.updateAccount(3, 'Caixa de Ahorrao','ARS', 3, '0040000001111000000001', 0);
*/
    }
}