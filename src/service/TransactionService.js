import DBConnector from '../data/access/DBConnector';
import TransactionTypeService from './TransactionTypeService';
import AcountService from './AccountService';
import AccountService from './AccountService';

export default class TransactionService {

    db;

    constructor(){
      this.db = DBConnector.connect();
    }

    createTransaction(type,detail, cash,currencyCode, transactionTypeId, date, amount, accountId, monthly,paymentMethod= '',cardId=0,installments=1){
//armar el campo fecha
console.log(type +"-"+ detail +"-"+ cash +"-"+ currencyCode +"-"+ transactionTypeId);
console.log(date +"-"+ amount +"-"+ accountId +"-"+ monthly +"-"+ paymentMethod +"-"+ cardId + "-" +installments);
      const serviceAccount = new AccountService();
      if(accountId==0)
        accountId=null;
        //seteo la cuenta si es efectivo 
      if(cash || paymentMethod == 'CASH'){
        if(currencyCode=='ARS')
          accountId=1;
        else if (currencyCode=='USD')
        accountId=2;
      }
      this.db.transaction(
        (txn) => {
          txn.executeSql(
                "INSERT INTO transactions(detail,currencyCode, transactionTypeId, date, amount, accountId, monthly)" +
                "VALUES (?,?,?,?,?,?,?)",
                [detail,currencyCode,transactionTypeId,date,amount,accountId,monthly],
                (txn, res) => { 
                  console.log("TransactionService: Affected Rows " + res.rowsAffected); 
                  if(type=='I'){
                    serviceAccount.makeDeposit(accountId,amount);
                  }else if(type=='E') {
                    if(paymentMethod!='CC'){
                      serviceAccount.makeWithdraw(accountId,amount);
                    }else{
                      //Compra en credito
                      if(installments>1){
                        installments--;
                        this.createTransaction(type,detail,cash,currencyCode,transactionTypeId,date,amount,accountId,monthly,paymentMethod,cardId,installments)
                      }
                    }
                  }
                },
                (txn, err) => { console.log("TransactionService: failed " + err); }
          )
        }
      );

      this.getAllTransaction();
    }

    getAllTransaction(){
        const conn = this.db;
        return new Promise((resolve) => {
          conn.transaction(
            (txn) => {
               txn.executeSql(
                    "SELECT " +
                    " transactions.id as id," +
                    " transactions.detail as detail," +
                    " transactions.date as date," +
                    " transactions.amount as amount," +
                    " transactions.accountId as accountId," +
                    " transactions.currencyCode as currencyCode," +
                    " transactions.monthly as monthly," +
                    " transactions.transactionTypeId as transactionTypeId," +
                    " transactionType.name as transactionType, " +
                    " account.name as account, " +
                    " account.id as accountId " +
                    " FROM transactions"+
                    " INNER JOIN transactionType ON transactions.transactionTypeId = transactionType.id"+
                    " INNER JOIN account ON transactions.accountId = account.id"+
                    " ORDER BY transactions.date DESC",
                    [],
                    (txn, res) => {
                       let transaction = new Array();
                       for(var i = 0; i < res.rows.length; ++i){
                        transaction.push(res.rows.item(i));
                       }

                       resolve(transaction);
                    },
                    (txn, err) => { console.log("TransactionService: getAllTransaction failed " + err); }
                    
               )
            }
          );
        });
    }

    getTransactionByAccountId(accountId){
      console.log("gettransactionByAccountId : " + accountId)
        const conn = this.db;
        return new Promise((resolve) => {
          conn.transaction(
            (txn) => {
               txn.executeSql(
                "SELECT " +
                " transactions.id as id," +
                " transactions.detail as detail," +
                " transactions.date as date," +
                " transactions.amount as amount," +
                " transactions.accountId as accountId," +
                " transactions.currencyCode as currencyCode," +
                " transactions.monthly as monthly," +
                " transactions.transactionTypeId as transactionTypeId," +
                " transactionType.name as transactionType, " +
                " transactionType.type as type, " +
                " account.name as account " +
                " FROM transactions"+
                " INNER JOIN transactionType ON transactions.transactionTypeId = transactionType.id"+
                " INNER JOIN account ON transactions.accountId = account.id"+
                " WHERE accountId=?"+
                " ORDER BY date DESC",    
                    [accountId],
                    (txn, res) => {
                      let transaction = new Array();
                      console.log(res.rows);
                      for(var i = 0; i < res.rows.length; ++i){
                       transaction.push(res.rows.item(i));
                      }
                      resolve(transaction);
                    },
                    (txn, err) => { console.log("TransactionService: getTransactionByAccountId failed " + err); }
                    
               )
            }
          );
        });
    }

    getTransactionByType(type){
        const conn = this.db;
        return new Promise((resolve) => {
          conn.transaction(
            (txn) => {
               txn.executeSql(
                "SELECT " +
                " transactions.id as id," +
                " transactions.detail as detail," +
                " transactions.date as date," +
                " transactions.amount as amount," +
                " transactions.accountId as accountId," +
                " transactions.currencyCode as currencyCode," +
                " transactions.monthly as monthly," +
                " transactions.transactionTypeId as transactionTypeId," +
                " transactionType.name as transactionType, " +
                " account.name as account " +
                " FROM transactions"+
                " INNER JOIN transactionType ON transactions.transactionTypeId = transactionType.id"+
                " INNER JOIN account ON transactions.accountId = account.id"+
                " WHERE transactionType.type=?"+
                " ORDER BY transactions.date DESC",
                    [type],
                    (txn, res) => {
                       let transaction = new Array();
                       for(var i = 0; i < res.rows.length; ++i){
                        transaction.push(res.rows.item(i));
                       }
                       resolve(transaction);
                    },
                    (txn, err) => { console.log("TransactionService: getTransactionByType failed " + err); }
                    
               )
            }
          );
        });
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
    console.log("TransactionService: Dropping table transaction");
    this.db.transaction(
        (txn) => {
            txn.executeSql(
                "DROP TABLE IF EXISTS transactions",
                [],
                (txn, res) => {
                    console.log("Transaction: Table Dropped");
                    console.log("Transaction: Creating Table transaction");
                    txn.executeSql(
                        "CREATE TABLE IF NOT EXISTS transactions (" +
                            "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                            "detail VARCHAR(50)," +
                            "currencyCode VARCHAR(3)," +
                            "amount DECIMAL(10,2)," +
                            "monthly BOOLEAN ," +
                            "date DATE," +
                            "accountId INTEGER," +
                            "transactiontypeId INTEGER"+
                            ")",
                        [],
                        (txn, res) => { console.log("TransactionService: Table Transaction created ");},
                        (txn, err) => { console.log("TransactionService: Transaction failed " + err); }
                )
              }
            )
        }
    );
  }

  
  populate(){
    this.createTransaction('I','Alquiler Eftvo Pesos', true, 'ARS',1,'2020/09/27',200.20,'null',true);
    this.createTransaction('I','Sueldo Eftvo Dolar', true, 'USD',3,'2020/09/21',1500.10,null, true);
    this.createTransaction('I','Facturacion', false, 'ARS',4,'2020/09/20',400.10,3, true);

    this.getAllTransaction()
  }

  test(){

  }
  

  
  
}


//https://www.tutlane.com/tutorial/sqlite/sqlite-datetime-function