import DBConnector from '../data/access/DBConnector';

export default class CardService {

    db;

    constructor(){
        this.db = DBConnector.connect();
    }

    createCreditCard(name, bankId, lastFourNumbers, expiryDate, closeDate, dueDate) {
        this.createCard('CREDIT', name, bankId, lastFourNumbers, expiryDate, closeDate, dueDate);
    }

    createDebitCard(name, bankId, lastFourNumbers, expiryDate) {
        this.createCard('DEBIT', name, bankId, lastFourNumbers, expiryDate, null, null);
    }

    createCard(type, name, bankId, lastFourNumbers, expiryDate, closeDate, dueDate){
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "INSERT INTO card(type, name, bankId, lastFourNumbers, expiryDate, closeDate, dueDate) " +
                   "VALUES (?,?,?,?,?,?,?)",
                   [type, name, bankId, lastFourNumbers, expiryDate, closeDate, dueDate],
                   (txn, res) => { console.log("CardService: Affected Rows " + res.rowsAffected); }
              )
           }
       );
    }

    updateCard(id, name, bankId, lastFourNumbers, expiryDate, closeDate, dueDate){
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "UPDATE card SET name = ?, bankId = ?, lastFourNumbers = ?, expiryDate = ?, closeDate = ?, dueDate = ? " +
                   "WHERE id = ?",
                   [name, bankId, lastFourNumbers, expiryDate, closeDate, dueDate, id],
                   (txn, res) => { console.log("CardService: Affected Rows " + res.rowsAffected); },
                   (txn, err) => { console.log("CardService: failed " + err); }
              )
           }
       );
    }

    getAllCards(){
        const conn = this.db;
        return new Promise((resolve) => {
          this.db.transaction(
              (txn) => {
                 txn.executeSql(
                      "SELECT " +
                      " card.id, " +
                      " card.name, " +
                      " card.lastFourNumbers, " +
                      " card.expiryDate , " +
                      " card.closeDate, " +
                      " card.dueDate, " +
                      " card.type, " +
                      " bank.name as bank " +
                      "FROM card " +
                      " INNER JOIN bank ON bank.id = card.bankId",
                      [],
                      (txn, res) => {
                        let cards = [];
                        for (let i = 0; i < res.rows.length; ++i) {
                            cards.push(res.rows.item(i));
                        }
                        resolve(cards);
                      }
                 )
              }
          );
        });
    }

    getCardById(id){
      const conn = this.db;
      return new Promise((resolve) => {
        this.db.transaction(
          (txn) => {
             txn.executeSql(
                  "SELECT * FROM card WHERE id = ?",
                  [id],
                  (txn, res) => {
                     resolve(res.rows.item(0));
                  }
             )
          }
        );
      });
    }

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
        console.log("CardService: Dropping table card");
        this.db.transaction(
            (txn) => {
                txn.executeSql(
                    "DROP TABLE IF EXISTS card",
                    [],
                    (txn, res) => {
                        console.log("CardService: Table Dropped");
                        console.log("CardService: Creating Table card");
                        txn.executeSql(
                            "CREATE TABLE IF NOT EXISTS card (" +
                            "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                            "name VARCHAR(20)," +
                            "bankId INTEGER," +
                            "lastFourNumbers VARCHAR(4)," +
                            "expiryDate VARCHAR(4)," +
                            "closeDate VARCHAR(10)," +
                            "dueDate VARCHAR(10)," +
                            "type VARCHAR(6)" +
                            ")",
                            [],
                            (txn, res) => { console.log("CardService: Table card created " + res); }
                       )
                    }
                )
            }
        );
    }

    populate(){
        this.createCreditCard('AMEX Black', 1, '1234', '0124', '24-09-2020', '28-09-2020');
        this.createCreditCard('Visa Signature', 1,'7890', '0125', '01-10-2020', '11-10-2020');
        this.createCreditCard('Master Black', 2, '4567', '0123', '02-10-2020', '12-10-2020');
        this.createDebitCard('Visa Débito', 1, '3829', '0125');
    }

    test(resetData){

        this.initDB(resetData);

        console.log("Test: Get All Cards");
        this.getAllCards()
          .then((cards) => {
            console.log(cards);
          });

        console.log("Test: Update card ID:2");
        this.updateCard(2, 'Visa Signature',1,'7890', '0125', '04-10-2020', '11-10-2020');

        console.log("Test: Get Card ID:2");
        this.getCardById(2)
          .then((card) => {
            console.log(card);
          });
    }
}