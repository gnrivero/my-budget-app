import DBConnector from '../data/access/DBConnector';

export default class BankService {

    db;

    constructor(){
      this.db = DBConnector.connect();
    }

    createBank(name){
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "INSERT INTO bank(name) " +
                   "VALUES (?)",
                   [name],
                   (txn, res) => { console.log("BankService: Affected Rows " + res.rowsAffected); }
              )
           }
       );
    }

    getAllBanks(){
        const conn = this.db;
        return new Promise((resolve) => {
          conn.transaction(
            (txn) => {
               txn.executeSql(
                    "SELECT * FROM bank",
                    [],
                    (txn, res) => {
                       let banks = new Array();
                       for(var i = 0; i < res.rows.length; ++i){
                         banks.push(res.rows.item(i));
                       }
                       resolve(banks);
                    },
                    (txn, err) => {
                        console.log("Pinchó Banks");
                    }
               )
            }
          );
        });
    }


    initDB() {
        console.log("BankService: Dropping table bank");
        this.db.transaction(
            (txn) => {
                txn.executeSql(
                    "DROP TABLE IF EXISTS bank",
                    [],
                    (txn, res) => {
                        console.log("BankService: Table Dropped");
                        console.log("BankService: Creating Table bank");
                        txn.executeSql(
                            "CREATE TABLE IF NOT EXISTS bank (" +
                                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                                "name VARCHAR(20))",
                            [],
                            (txn, res) => { console.log("BankService: Table bank created "); }
                       )
                    }
                )
            }
        );

        this.createBank('Banco Galicia');
        this.createBank('BBVA');
        this.createBank('HSBC');
        this.createBank('ICBC');
        this.createBank('Banco Santander');
    }
}