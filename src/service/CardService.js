import DBConnector from '../data/access/DBConnector';

export default class CardService {

    db;

    constructor(){
        this.db = DBConnector.connect();
        this.generateTable();//IMPORTANTE: Usar la 1era vez para generar los datos, luego comentar.
    }

    createCard(name, issuer, lastFourNumbers, expiryDate, closeDate, dueDate){
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "INSERT INTO card(name, issuer, lastFourNumbers, expiryDate, closeDate, dueDate) " +
                   "VALUES (?,?,?,?,?,?)",
                   [name, issuer, lastFourNumbers, expiryDate, closeDate, dueDate],
                   (txn, res) => { console.log("CardService: Affected Rows " + res.rowsAffected); }
              )
           }
       );
    }

    updateCard(id, name, issuer, lastFourNumbers, expiryDate, closeDate, dueDate){
            this.db.transaction(
               (txn) => {
                  txn.executeSql(
                       "UPDATE card SET name = ?, issuer = ?, lastFourNumbers = ?, expiryDate = ?, closeDate = ?, dueDate = ? " +
                       "WHERE id = ?",
                       [name, issuer, lastFourNumbers, expiryDate, closeDate, dueDate, id],
                       (txn, res) => { console.log("CardService: Affected Rows " + res.rowsAffected); },
                       (txn, err) => { console.log("CardService: failed " + err); }
                  )
               }
           );
        }

    getAllCards(){
      this.db.transaction(
          (txn) => {
             txn.executeSql(
                  "SELECT * FROM card",
                  [],
                  (txn, res) => {
                    for (let i = 0; i < res.rows.length; ++i) {
                        var item = res.rows.item(i);
                        console.log("CardService: Get all items. " +
                                        " Id: " + item.id +
                                        " Name: " + item.name +
                                        " Banco: " + item.issuer +
                                        " 4 digitos: " + item.lastFourNumbers +
                                        " Expiracion: " + item.expiryDate +
                                        " Cierre: " + item.closeDate +
                                        " Vencimiento: " + item.dueDate
                                        );
                    }
                  }
             )
          }
      );
    }

    getCardById(id){
        this.db.transaction(
          (txn) => {
             txn.executeSql(
                  "SELECT * FROM card WHERE id = ?",
                  [id],
                  (txn, res) => {
                     var item = res.rows.item(0);
                     console.log("CardService: Get items By Id. " +
                                     " Id: " + item.id +
                                     " Name: " + item.name +
                                     " Banco: " + item.issuer +
                                     " 4 digitos: " + item.lastFourNumbers +
                                     " Expiracion: " + item.expiryDate +
                                     " Cierre: " + item.closeDate +
                                     " Vencimiento: " + item.dueDate
                                     );

                  }
             )
          }
      );

    }

    generateTable(){

        console.log("Dropping table Cards");
        this.db.transaction(
            (txn) => {
               txn.executeSql(
                    "DROP TABLE card",
                    [],
                    (txn, res) => { console.log("CardService: Table Dropped"); }
               )
            }
        );

        console.log("Creating Table Card");
        this.db.transaction(
            (txn) => {
               txn.executeSql(
                    "CREATE TABLE IF NOT EXISTS card (" +
                        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                        "name VARCHAR(20)," +
                        "issuer VARCHAR(50)," +
                        "lastFourNumbers VARCHAR(4)," +
                        "expiryDate VARCHAR(5)," +
                        "closeDate VARCHAR(10)," +
                        "dueDate VARCHAR(10)" +
                        ")",
                    [],
                    (txn, res) => { console.log("CardService: Table cards Created " + res); }
               )
            }
        );

        this.createCard('AMEX Black', 'Banco Galicia', '1234', '01/24', '24-09-2020', '28-09-2020');
        this.createCard('Visa Signature','Banco Galicia','7890', '01/25', '01-10-2020', '11-10-2020');
        this.createCard('Master Black', 'Mercado Pago', '4567', '01/23', '02-10-2020', '12-10-2020');
    }
}