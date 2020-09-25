import DBConnector from '../data/access/DBConnector';

export default class AccountService {

    db;

    constructor(){
        this.db = DBConnector.connect();
    }

    createAccount(name, currencyCode, entityId, identificationNumber, cardId){
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "INSERT INTO account(name, currencyCode, entityId, identificationNumber, cardId, balance) " +
                   "VALUES (?,?,?,?,?,0.00)",
                   [name, currencyCode, entityId, identificationNumber, cardId],
                   (txn, res) => { console.log("AccountService: Affected Rows " + res.rowsAffected); }
              )
           }
       );
    }

    makeDeposit(accountId, amount){

        this.db.transaction(
           (txn) => {
              console.log("Account Service: Retrieving Account data");
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
              console.log("Account Service: Retrieving Account data");
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
                    "SELECT * FROM account",
                    [],
                    (txn, res) => {
                       let accounts = new Array();
                       for(var i = 0; i < res.rows.length; ++i){
                         accounts.push(res.rows.item(i));
                       }
                       resolve(accounts);
                       return accounts;
                    }
               )
            }
          );
      });
    }

    getAccountById(id){
        const conn = this.db;
        return new Promise((resolve) => {
            conn.transaction(
              (txn) => {
                 txn.executeSql(
                      "SELECT * FROM account WHERE id = ?",
                      [id],
                      (txn, res) => {
                         if (res.rows.length >= 1){
                           var item = res.rows.item(0);
                            console.log("Getting Account By ID Succsessful");
                            resolve(item);
                            return item;
                         }
                      }
                 )
              }
            );
        });
    }

    test(){

        console.log("Dropping table account");

        this.db.transaction(
            (txn) => {
               txn.executeSql(
                    "DROP TABLE account",
                    [],
                    (txn, res) => {
                        console.log("AccountService: Table Dropped");
                        console.log("Creating Table account");
                        txn.executeSql(
                            "CREATE TABLE IF NOT EXISTS account (" +
                                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                                "name VARCHAR(20)," +
                                "currencyCode VARCHAR(3)," +
                                "entityId INTEGER," +
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

        this.createAccount('Caja de Ahorro', 'ARS', 1, '0070000000000000000001', 4);
        this.createAccount('Cuenta Corriente','ARS', 1, '0070000000000000000002', 4);

        this.getAccountById(1).then(item => {
            console.log(item)
        });

        this.makeDeposit(1,2000);
        this.makeDeposit(1,100);
        this.makeWithdraw(1,200);

        this.getAccountById(1).then(item => {
            console.log(item)
        });
        this.makeDeposit(2,3500);
        this.makeWithdraw(2,500);

        this.getAccountById(2).then(item => {
            console.log(item)
        });

        this.getAllAccounts().then(account => {
            console.log("Get All Accounts");
            for ( let i = 0; i < account.length; ++i){
                console.log(account[i]);
            }
        });
    }
}