import DBConnector from '../data/access/DBConnector';
import AccountService from './AccountService';

export default class TransactionService {

    db;
    accountService;

    constructor(){
      this.db = DBConnector.connect();
      this.accountService = new AccountService();
    }

    createTransaction(type,detail, cash,currencyCode, transactionTypeId, date, amount, accountId, monthly,paymentMethod= '',cardId=null,installments=1,installmentsNumber=1){
//armar el campo fecha
console.log(type +"-"+ detail +"-"+ cash +"-"+ currencyCode +"-"+ transactionTypeId);
console.log(date +"-"+ amount +"-"+ accountId +"-"+ monthly +"-"+ paymentMethod +"-"+ cardId + "-" +installments);
      if(accountId==0)
        accountId=null;
        //seteo la cuenta si es efectivo 
      if(cash || paymentMethod == 'CASH'){
        if(currencyCode=='ARS')
          accountId=1;
        else if (currencyCode=='USD')
        accountId=2;
      }
      detailAux=detail;
      if(installments!=1 && installments >= installmentsNumber){
        detailAux= detail + ' - '+installmentsNumber+' de '+ installments;
      }
      this.db.transaction(
        (txn) => {
          txn.executeSql(
                "INSERT INTO transactions(detail,currencyCode, transactionTypeId, date, amount, accountId, monthly,cardId,paymentMethod)" +
                "VALUES (?,?,?,?,?,?,?,?,?)",
                [detailAux,currencyCode,transactionTypeId,date,amount,accountId,monthly,cardId,paymentMethod],
                (txn, res) => { 
                  console.log("TransactionService: Affected Rows " + res.rowsAffected); 
                  if(type=='I'){
                    this.accountService.makeDeposit(accountId,amount);
                  }else if(type=='E') {
                    if(paymentMethod!='CC'){
                      this.accountService.makeWithdraw(accountId,amount);
                    }else{
                      //Compra en credito
                      if(installments > installmentsNumber){
                        installmentsNumber++;
                        dt= new Date(date);
                        //console.log(dt);
                        n=1;
                        newDate=new Date(dt.setMonth(dt.getMonth() + n)).toISOString().split('T')[0];
                        //console.log(newDate);
                        this.createTransaction(type,detail,cash,currencyCode,transactionTypeId,newDate,amount,accountId,monthly,paymentMethod,cardId,installments,installmentsNumber)
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
                " transactions.paymentMethod as paymentMethod," +
                " transactions.transactionTypeId as transactionTypeId," +
                " transactionType.name as transactionType, " +
                " account.name as account, " +
                " card.name as card " +
                " FROM transactions"+
                " INNER JOIN transactionType ON transactions.transactionTypeId = transactionType.id"+
                " LEFT JOIN account ON transactions.accountId = account.id "+
                " LEFT JOIN card ON transactions.cardId = card.id "+
                " WHERE transactionType.type=?"+
                " ORDER BY transactions.date DESC",
                    [type],
                    (txn, res) => {
                       let transaction = new Array();
                       console.log(res.rows);
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


    
    getExpensesByPaymentMethodMonth(){
      const conn = this.db;
      return new Promise((resolve) => {
        conn.transaction(
          (txn) => {
             txn.executeSql(
              "SELECT " +
              " SUM(transactions.amount) as amount," +
              " transactions.paymentMethod as paymentMethod" +
              " FROM transactions "+
              " INNER JOIN transactionType ON transactions.transactionTypeId = transactionType.id"+
              " WHERE transactionType.type='E' and transactions.date BETWEEN datetime('now', 'start of month') AND datetime('now','start of month','+1 month','-1 day') "+
              " GROUP BY paymentMethod",
                  [],
                  (txn, res) => {
                     let transaction = new Array();
                     console.log(res.rows);
                     for(var i = 0; i < res.rows.length; ++i){
                      transaction.push(res.rows.item(i));
                     }
                     resolve(transaction);
                  },
                  (txn, err) => { console.log("TransactionService: getExpensesByPaymentMethodMonth failed " + err); }
                  
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
                            "monthly INTEGER ," +
                            "date DATE," +
                            "accountId INTEGER," +
                            "transactiontypeId INTEGER, "+
                            "paymentMethod VARCHAR(10), "+
                            "cardId INTEGER"+
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
    this.createTransaction('I','Alquiler Eftvo Pesos', true, 'ARS',1,'2020-09-27',200.20,null,1);
    this.createTransaction('I','Sueldo Eftvo Dolar', true, 'USD',3,'2020-09-21',1500.10,null, 1);
    this.createTransaction('I','Facturacion', false, 'ARS',4,'2020-09-20',400.10,3, 1);

    this.getAllTransaction()
  }

  test(){

  }
  

  
  
}


//https://www.tutlane.com/tutorial/sqlite/sqlite-datetime-function