import DBConnector from '../data/access/DBConnector';

export default class TransactionTypeService {

    db;

    constructor(){
      this.db = DBConnector.connect();
    }

    createTransactionType(name,type){
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "INSERT INTO transactionType (name, type) " +
                   "VALUES (?,?)",
                   [name,type],
                   (txn, res) => { console.log("TransactionTypeService: Affected Rows " + res.rowsAffected); },
                   (txn, err) => { console.log("TransactionTypeService: failed " + err); }
              )
           }
       );
    }

    getAllTransactionType(){
        const conn = this.db;
        return new Promise((resolve) => {
          conn.transaction(
            (txn) => {
               txn.executeSql(
                    "SELECT * FROM transactionType",
                    [],
                    (txn, res) => {
                       let transactionType = new Array();
                       for(var i = 0; i < res.rows.length; ++i){
                        transactionType.push(res.rows.item(i));
                       }
                       resolve(transactionType);
                    },
                    (txn, err) => { console.log("TransactionTypeService: getAllTransactionType failed " + err); }
                    
               )
            }
          );
        });
    }

    getTransactionType(type){
      const conn = this.db;
      return new Promise((resolve) => {
        conn.transaction(
          (txn) => {
             txn.executeSql(
                  "SELECT * FROM transactionType where type=? ORDER BY name",
                  [type],
                  (txn, res) => {
                     let transactionType = new Array();
                     for(var i = 0; i < res.rows.length; ++i){
                      transactionType.push(res.rows.item(i));
                     }
                     resolve(transactionType);
                  },
                  (txn, err) => { console.log("TransactionTypeService: getTransactionTypeIncome failed " + err); }
                  
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
            console.log("TransactionTypeService: Dropping table transactionType");
            this.db.transaction(
                (txn) => {
                    txn.executeSql(
                        "DROP TABLE IF EXISTS transactionType",
                        [],
                        (txn, res) => {
                            console.log("TransactionTypeService: Table Dropped");
                            console.log("TransactionTypeService: Creating Table transactionType");
                            txn.executeSql(
                                "CREATE TABLE IF NOT EXISTS transactionType (" +
                                    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                                    "name VARCHAR(20)," +
                                    "type VARCHAR(10))",
                                [],
                                (txn, res) => { console.log("TransactionTypeService: Table TransactionType created "); }
                        )
                        }
                    )
                }
            );

            this.createTransactionType('Alquiler','I');
            this.createTransactionType('Alquiler','E');
            this.createTransactionType('Sueldo','I');
            this.createTransactionType('Facturacion','I');
            this.createTransactionType('Otros','I');
            //No tocar el orden xq las inversiones se acredita con el id 6
            this.createTransactionType('Inversiones','I'); 
            this.createTransactionType('Servicio','E');
            this.createTransactionType('Impuestos Nacionales','E');
            this.createTransactionType('Impuestos Provinciales','E');
            this.createTransactionType('Educacion','E');
            this.createTransactionType('Entretenimiento','E');
            this.createTransactionType('Comida','E');
            this.createTransactionType('Salud','E');
            this.createTransactionType('Viaticos','E');
            this.createTransactionType('Otros','E');
        }
    }
}