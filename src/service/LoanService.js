import DBConnector from '../data/access/DBConnector';
import TransactionService from './TransactionService';

export default class LoanService {

    db;
    transactionService;
    constructor(){
        this.db = DBConnector.connect();
        this.transactionService = new TransactionService();
    }
    
    createLoan(detail, lender, currencyCode, date, amount, expirationDate=null, monthlyFee=null,amountFees=null, accountId=null) {
    
        console.log(detail + ' - ' + lender + ' - ' + currencyCode+ ' - ' + date + ' - ' + amount  );
        console.log( expirationDate + ' - ' + monthlyFee + ' - ' + amountFees  +' - ' +  accountId)
    
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "INSERT INTO loan (detail, lender, currencyCode, date, amount, expirationDate, monthlyFee, amountFees, accountId, active) " +
                   "VALUES (?,?,?,?,?,?,?,?,?,1)",
                   [detail, lender, currencyCode, date, amount, expirationDate, monthlyFee, amountFees, accountId],
                   (txn, res) => {
                        console.log("createLoan: Affected Rows " + res.rowsAffected); 
                        //Create Fee
                        console.log(lender==0);
                        if(lender==0){
                            console.log("PRESTAMO");
                            console.log(res.insertId);
                            this.createFee(res.insertId,expirationDate,amountFees,monthlyFee,1)
                        }
                    },
                    (txn, err) => { console.log("createLoan: " + err); }
              )
           }
       );
    }

    createFee(LoanId, expirationDate, amountFees, monthlyFee, count){
        //armar el campo fecha
    console.log(LoanId +"-"+ expirationDate +"-"+ amountFees +"-"+ monthlyFee +"-"+ count);
      this.db.transaction(
        (txn) => {
          txn.executeSql(
                "INSERT INTO loanFee (LoanId,expirationDate, amountFees, monthlyFee) " +
                " VALUES (?,?,?,?)",
                [LoanId, expirationDate,amountFees,count],
                (txn, res) => { 
                  console.log("createFree: Affected Rows " + res.rowsAffected); 
                    if(monthlyFee > count){
                        count++;
                        dt= new Date(expirationDate);
                        //console.log(dt);
                        n=1;
                        newDate=new Date(dt.setMonth(dt.getMonth() + n)).toISOString().split('T')[0];
                        //console.log(newDate);
                        this.createFee(LoanId, newDate, amountFees, monthlyFee, count);
                    }
                },
                (txn, err) => { console.log("createFree: failed " + err); }
          )
        }
      );
    }
    getAllFee(){
        //console.log("getAllInvestment")
      const conn = this.db;
      return new Promise((resolve) => {
          conn.transaction(
            (txn) => {
               txn.executeSql(
                    "SELECT " +
                    " loanFee.id as id," +
                    " loanFee.loanId as loanId," +
                    " loanFee.amountFees as amountFees," +
                    " loanFee.monthlyFee as monthlyFee," +
                    " loanFee.expirationDate as expirationDate " +
                    " FROM loanFee ",
                    [],
                    (txn, res) => {
                       let loans = new Array();
                       console.log("cuotas")
                       console.log(res.rows)
                       for(var i = 0; i < res.rows.length; ++i){
                        loans.push(res.rows.item(i));
                       }
                       resolve(loans);
                    },
                    (txn, err) => {
                        console.log("getAllFee:" + err);
                    }
               )
            }
          );
      });
    }

    

    updateLoan(id, detail, lender, currencyCode, date, amount, expirationDate=null, monthlyFee=null,amountFees=null, accountId=null) {
        console.log(detail + ' - ' + lender + ' - ' + currencyCode+ ' - ' + date + ' - ' + amount  );
        console.log( expirationDate + ' - ' + monthlyFee + ' - ' + amountFees + ' - ' + accountId)
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "UPDATE loan SET detail = ?, lender = ?, currencyCode = ?, date = ?, amount = ?, expirationDate = ?, monthlyFee = ? , amountFees = ? , accountId = ? " +
                   "WHERE id = ?",
                   [detail, lender, currencyCode, date, amount, expirationDate, monthlyFee, amountFees, accountId, id],
                   (txn, res) => { console.log("updateInvestment: Affected Rows " + res.rowsAffected); },
                   (txn, err) => { console.log("updateInvestment: failed " + err); }
              )
           }
       );
    }


    updateActive(id, active) {
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "UPDATE loan SET " +
                   "active = ? " +
                   "WHERE id = ?",
                   [active, id],
                   (txn, res) => { console.log("LoanService: updateActive with ID: " + id); },
                   (txn, err) => { console.log("LoanService updateActive: " + err); }
              )
           }
       );
    }

    getAllLoans(){
        //console.log("getAllInvestment")
      const conn = this.db;
      return new Promise((resolve) => {
          conn.transaction(
            (txn) => {
               txn.executeSql(
                    "SELECT " +
                    " loan.id as id," +
                    " loan.detail as detail," +
                    " loan.lender as lender," +
                    " loan.amount as amount," +
                    " loan.currencyCode as currencyCode," +
                    " loan.date as date," +
                    " loan.expirationDate as expirationDate," +
                    " loan.monthlyFee as monthlyFee," +
                    " loan.amountFees as amountFees," +
                    " loan.accountId as accountId, " +
                    " loan.active as active, " +
                    " account.name as account " +
                    " FROM loan " +
                    " LEFT JOIN account ON account.id = loan.accountId " +
                    " WHERE loan.active =1 "+
                    " ORDER BY loan.date DESC",
                    [],
                    (txn, res) => {
                       let loans = new Array();
                       //console.log(res.rows)
                       for(var i = 0; i < res.rows.length; ++i){
                        loans.push(res.rows.item(i));
                       }
                       resolve(loans);
                    },
                    (txn, err) => {
                        console.log("getAllLoan:" + err);
                    }
               )
            }
          );
      });
    }

    getLoanById(id) {
        const conn = this.db;
        return new Promise((resolve) => {
            conn.transaction(
              (txn) => {
                 txn.executeSql(
                    "SELECT * FROM loan WHERE loan.id = ?",
                    [id],
                    (txn, res) => {
                         if (res.rows.length >= 1) {
                           var loan = res.rows.item(0);
                           resolve(loan);
                         }
                    },
                    (txn, err) => {
                        console.log("getLoanById: " + err);
                    }
                 )
              });
         });
    }

    checkLoans(){
        dateNow= new Date();
        dateShort=dateNow.toISOString().split('T')[0]                
        //console.log(dateShort);
        this.db.transaction(
            (txn) => {
               txn.executeSql(
                 "SELECT * FROM loan WHERE active = 1 and  expirationDate< ?",
                 [dateShort],
                 (txn, res) => {
                    //console.log(res.rows);
                    for(var i = 0; i < res.rows.length; ++i){
                        //console.log("element checkInvestments");
                        //console.log(res.rows.item(i));
                        item= res.rows.item(i);
                        this.transactionService.createTransaction('I','Acreditacion '+item.detail , false, item.currencyCode ,6,item.dueDate ,item.amountCredited,item.accountId,0);  
                        this.updateActive(item.id,0)
                    }
                 },
                 (txn, err) => {
                     console.log("checkLoans: " + err);
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
        console.log("LoanService: Dropping table loan");
        this.db.transaction(
            (txn) => {
                txn.executeSql(
                    "DROP TABLE IF EXISTS loan ",
                    [],
                    (txn, res) => {
                        console.log("LoanService: Table Dropped");
                        console.log("LoanService: Creating Table loan");
                        txn.executeSql(
                            "CREATE TABLE IF NOT EXISTS loan (" +
                                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                                "detail VARCHAR(50)," +
                                "lender INTEGER," + // 1 prestamista 0 prestatario
                                "currencyCode VARCHAR(3)," +
                                "amount DECIMAL(10,2)," +
                                "monthlyFee INTEGER," +
                                "amountFees DECIMAL(10,2)," +
                                "date DATE," +
                                "expirationDate DATE," +
                                "accountId INTEGER," +
                                "active INTEGER " +
                                ")",
                            [],
                            (txn, res) => { console.log("LoanService: Table loan created " + res); },
                            (txn, err) => {
                                console.log("LoanService: create table Loan" + err);
                            }
                       )
                    }
                )
            }
        );

        console.log("LoanService: Dropping table loanFee");
        this.db.transaction(
            (txn) => {
                txn.executeSql(
                    "DROP TABLE IF EXISTS loanFee ",
                    [],
                    (txn, res) => {
                        console.log("LoanService: Table Dropped");
                        console.log("LoanService: Creating Table loanFee");
                        txn.executeSql(
                            " CREATE TABLE IF NOT EXISTS loanFee (" +
                            "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                            "loanId INTEGER," +
                            "monthlyFee INTEGER," +
                            "expirationDate DATE, " +
                            "amountFees DECIMAL(10,2)" +
                                ")",
                            [],
                            (txn, res) => { console.log("LoanService: Table loanFee created " + res); },
                            (txn, err) => {
                                console.log("LoanService: create table loan Fee" + err);
                            }
                       )
                    }
                )
            }
        );
    }

    populate(){
        //Inicializo algunos datos
        console.log("LoanService: Populating table loan");     
        this.createLoan('Prestamo Banco',0, 'ARS', '2020-08-10',10000.50,'2020-09-30',24,100,3);
        this.createLoan('Prestamo Mafia',0, 'USD', '2020-06-15',10000,'2020-08-30',24,100);
        this.createLoan('Primo lejano',1, 'USD', '2020-08-10',20000,'2020-09-30');
    }

    
    test(){

        this.getAllLoans();
/*
        this.checkLoans();
*/
        this.getLoanById(1)
            .then(loan => {
               console.log("Get loan By Id");
               console.log(loan);
            });

            console.log("GETALLFEE")
            this.getAllFee();
       /*
         this.updateAccount(3, 'Caixa de Ahorrao','ARS', 3, '0040000001111000000001', 0);
*/
    }
}