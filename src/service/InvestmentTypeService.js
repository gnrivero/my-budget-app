import DBConnector from '../data/access/DBConnector';

export default class InvestmentTypeService {

    db;

    constructor(){
      this.db = DBConnector.connect();
    }

    createInvestmentType(name){
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "INSERT INTO investmentType (name) " +
                   "VALUES (?)",
                   [name],
                   (txn, res) => { console.log("InvestmentTypeService: Affected Rows " + res.rowsAffected); },
                   (txn, err) => { console.log("InvestmentTypeService: failed " + err); }
              )
           }
       );
    }

    getAllInvestmentType(){
        const conn = this.db;
        return new Promise((resolve) => {
          conn.transaction(
            (txn) => {
               txn.executeSql(
                    "SELECT * FROM investmentType",
                    [],
                    (txn, res) => {
                       let InvestmentType = new Array();
                       for(var i = 0; i < res.rows.length; ++i){
                        InvestmentType.push(res.rows.item(i));
                       }
                       resolve(InvestmentType);
                    },
                    (txn, err) => { console.log("InvestmentTypeService: getAllInvestmentType failed " + err); }
                    
               )
            }
          );
        });
    }

    /*
        Este método debe ser llamado desde DBInit.js
    */
   initDB(resetData){
        if(resetData == true){
          console.log("InvestmentTypeService: Dropping table InvestmentType");
          this.db.transaction(
              (txn) => {
                  txn.executeSql(
                      "DROP TABLE IF EXISTS investmentType",
                      [],
                      (txn, res) => {
                        console.log("InvestmentTypeService: Table Dropped");
                        console.log("InvestmentTypeService: Creating Table InvestmentType");
                        txn.executeSql(
                          "CREATE TABLE IF NOT EXISTS investmentType (" +
                              "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                              "name VARCHAR(20)) " +
                          [],
                          (txn, res) => { console.log("InvestmentTypeService: Table InvestmentType created "); },
                          (txn, err) => { console.log("InvestmentTypeService: Create table failed " + err); }
                        )
                      }
                  )
              }
            );

            this.createInvestmentType('Plazo Fijo');
            this.createInvestmentType('Bonos');
            this.createInvestmentType('Acciones');
            this.createInvestmentType('Otras');
        }
    }
}