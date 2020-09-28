import DBConnector from '../data/access/DBConnector';
import CardService from './CardService';

export default class AccountService {

    db;
    cardService;

    constructor(){
        this.db = DBConnector.connect();
        this.cardService = new CardService();
    }

    createAccount(name, currencyCode, bankId, identificationNumber, cardId, balance) {
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "INSERT INTO account(name, currencyCode, bankId, identificationNumber, cardId, balance) " +
                   "VALUES (?,?,?,?,?,?)",
                   [name, currencyCode, bankId, identificationNumber, cardId, balance],
                   (txn, res) => { console.log("createAccount: Affected Rows " + res.rowsAffected); },
                   (txn, err) => { console.log("createAccount: " + res); }
              )
           }
       );
    }

    createAccountWithDebitCard(name, currencyCode, bankId, identificationNumber, balance, lastFourNumbers, expiryDate) {
        this.cardService.createDebitCard('Débito cuenta ' + name, bankId, lastFourNumbers,expiryDate)
        .then((cardId) => {
            console.log("CreateDebitCard: Generated ID: " + cardId);
            this.createAccount(name, currencyCode, bankId, identificationNumber, cardId, balance);
        });
    }

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

    makeDeposit(accountId, amount){

        this.db.transaction(
           (txn) => {
              txn.executeSql(
                "SELECT * FROM account WHERE id = ?",
                [accountId],
                (txn, res) => {
                   if (res.rows.length >= 1){
                     var account = res.rows.item(0);

                     var currentBalance = account.balance;
                     var newBalance = currentBalance + amount;

                     txn.executeSql(
                        "UPDATE account SET balance = ?" +
                        "WHERE id = ?",
                        [newBalance, accountId],
                        (txn, res) => { console.log("AccountService: Affected Rows " + res.rowsAffected); },
                        (txn, err) => { console.log("AcccountService: Deposit failed " + err); }
                     )
                   }
                }
              )

           }
       );
    }

    makeWithdraw(accountId, amount){
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                "SELECT * FROM account WHERE id = ?",
                [accountId],
                (txn, res) => {
                   if (res.rows.length >= 1){
                     var account = res.rows.item(0);

                     var currentBalance = account.balance;
                     var newBalance = currentBalance - amount;

                     txn.executeSql(
                        "UPDATE account SET balance = ?" +
                        "WHERE id = ?",
                        [newBalance, accountId],
                        (txn, res) => { console.log("AccountService: Affected Rows " + res.rowsAffected); },
                        (txn, err) => { console.log("AcccountService: Deposit failed " + err); }
                     )
                   }
                }
              )
           }
        );
    }

    getAllAccounts(){
      const conn = this.db;
      return new Promise((resolve) => {
          conn.transaction(
            (txn) => {
               txn.executeSql(
                    "SELECT " +
                    " account.id as id," +
                    " account.name as name," +
                    " account.identificationNumber as cbu," +
                    " account.balance as balance," +
                    " account.currencyCode as currencyCode," +
                    " bank.name as bank " +
                    "FROM account " +
                    "INNER JOIN bank ON account.bankId = bank.id",
                    [],
                    (txn, res) => {
                       let accounts = new Array();
                       for(var i = 0; i < res.rows.length; ++i){
                         accounts.push(res.rows.item(i));
                       }
                       resolve(accounts);
                    },
                    (txn, err) => {
                        console.log("getAllAccounts:" + err);
                    }
               )
            }
          );
      });
    }

    getAccountById(id) {
        const conn = this.db;
        return new Promise((resolve) => {
            conn.transaction(
              (txn) => {
                 txn.executeSql(
                    "SELECT " +
                      " account.id, " +
                      " account.name, " +
                      " account.identificationNumber, " +
                      " account.balance, " +
                      " account.currencyCode, " +
                      " account.bankId, " +
                      " card.lastFourNumbers AS cardLastFourNumbers, " +
                      " card.expiryDate AS cardExpiryDate " +
                    "FROM account " +
                    " LEFT JOIN card ON card.id = account.cardId " +
                    "WHERE account.id = ?",
                    [id],
                    (txn, res) => {
                         if (res.rows.length >= 1) {
                           var account = res.rows.item(0);
                           resolve(account);
                         }
                    },
                    (txn, err) => {
                        console.log("getAccountById: " + err);
                    }
                 )
              });
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
        console.log("AccountService: Dropping table account");
        this.db.transaction(
            (txn) => {
                txn.executeSql(
                    "DROP TABLE IF EXISTS account",
                    [],
                    (txn, res) => {
                        console.log("AccountService: Table Dropped");
                        console.log("AccountService: Creating Table account");
                        txn.executeSql(
                            "CREATE TABLE IF NOT EXISTS account (" +
                                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                                "name VARCHAR(20)," +
                                "currencyCode VARCHAR(3)," +
                                "bankId INTEGER," +
                                "identificationNumber VARCHAR(22)," +
                                "cardId INTEGER," +
                                "balance INTEGER" +
                                ")",
                            [],
                            (txn, res) => { console.log("AccountService: Table account created " + res); }
                       )
                    }
                )
            }
        );
    }

    populate(){
        //Inicializo algunos datos
        console.log("AccountService: Populating table account");
        this.createAccount('Caja de Ahorro', 'ARS', 1, '0070000000000000000001', 1, 10500);
    }


    test(){
        console.log("AccountService: Running Tests");
        this.makeDeposit(1,10500);
        this.makeDeposit(3,2320);

        this.getAccountById(1)
            .then(account => {
               console.log("Get Account By Id");
               console.log(account);
            });

        this.makeDeposit(1,2000);
        this.makeDeposit(1,100);
        this.makeWithdraw(1,200);

        this.getAccountById(1)
            .then(account => {
                console.log("Get Account By Id");
                console.log(account);
            });

        this.getAllAccounts()
         .then(account => {
            console.log("Get All Accounts");
            for ( let i = 0; i < account.length; ++i){
                console.log(account[i]);
            }
         });

         this.updateAccount(3, 'Caixa de Ahorrao','ARS', 3, '0040000001111000000001', 0);

         this.getAccountById(3)
             .then(account => {
                 console.log("Get Account By Id");
                 console.log(account);
             });

         this.createAccountWithDebitCard('Caja Galicia', 'ARS', 1, '007000000011111110000022', 1500, '7899', '0124');
    }
}