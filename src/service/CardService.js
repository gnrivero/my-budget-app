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
        return this.createCard('DEBIT', name, bankId, lastFourNumbers, expiryDate, null, null);
    }

    createCard(type, name, bankId, lastFourNumbers, expiryDate, closeDate, dueDate) {
        return new Promise((resolve) => {
            this.db.transaction(
               (txn) => {
                  txn.executeSql(
                       "INSERT INTO card(type, name, bankId, lastFourNumbers, expiryDate, closeDate, dueDate) " +
                       "VALUES (?,?,?,?,?,?,?)",
                       [type, name, bankId, lastFourNumbers, expiryDate, closeDate, dueDate],
                       (txn, res) => {
                            resolve(res.insertId);
                       },
                       (txn, err) => { console.log("CreateCard: failed " + err); }
                  )
               });
        });
    }

    updateCard(id, name, bankId, lastFourNumbers, expiryDate, closeDate, dueDate){
        this.db.transaction(
           (txn) => {
              txn.executeSql(
                   "UPDATE card SET name = ?, bankId = ?, lastFourNumbers = ?, expiryDate = ?, closeDate = ?, dueDate = ? " +
                   "WHERE id = ?",
                   [name, bankId, lastFourNumbers, expiryDate, closeDate, dueDate, id],
                   (txn, res) => { console.log("updateCard: Affected Rows " + res.rowsAffected); },
                   (txn, err) => { console.log("updateCard: failed " + err); }
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
                      " INNER JOIN bank ON bank.id = card.bankId " +
                      " WHERE card.type != 'DEBIT'",
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

    getAllDebitCardsByCurrencyCombo(currency){
        const conn = this.db;
        return new Promise((resolve) => {
          this.db.transaction(
              (txn) => {
                 txn.executeSql(
                      "SELECT " +
                      " card.id as value," +
                      " card.name || '-' || card.lastFourNumbers  as label " +
                      "FROM card " +
                      " INNER JOIN account ON account.cardId = card.id " +
                      " WHERE card.type == 'DEBIT' and account.currencyCode ==?",
                      [currency],
                      (txn, res) => {
                        let cards = [];
                        for (let i = 0; i < res.rows.length; ++i) {
                            cards.push(res.rows.item(i));
                        }
                        resolve(cards);
                      },
                      (txn, err) => { console.log("Card: getAllDebitCardsByCurrencyCombo failed " + err); }
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

    getCardsByCloseDate(start, end){
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
                      " INNER JOIN bank ON bank.id = card.bankId " +
                      " WHERE card.type != 'DEBIT'" +
                      " AND card.closeDate between ? AND ? ",
                      [start, end],
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

    getCardCurrentPeriodConsumption(cardId){
         const conn = this.db;
         return new Promise((resolve) => {
           this.db.transaction(
               (txn) => {
                  txn.executeSql(
                       "SELECT " +
                       " transactions.detail, " +
                       " transactions.amount, " +
                       " transactions.currencyCode, " +
                       " transactions.date " +
                       "FROM transactions " +
                       " INNER JOIN card ON card.id = transactions.cardId " +
                       " WHERE card.id = ? " +
                       "  AND transactions.date BETWEEN date(card.closeDate,'start of month') AND card.closeDate"
                       ,
                       [cardId],
                       (txn, res) => {
                         let consumptions = [];
                         for (let i = 0; i < res.rows.length; ++i) {
                             consumptions.push(res.rows.item(i));
                         }
                         resolve(consumptions);
                       },
                       (txn, err) => { console.log("Error: " + err)}
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
                            "expiryDate TEXT," +
                            "closeDate TEXT," +
                            "dueDate TEXT," +
                            "type VARCHAR(6))",
                            [],
                            (txn, res) => { console.log("CardService: Table card created " + res); }
                       )
                    }
                )
            }
        );
    }

    populate(){
        console.log("CardService: Populating table card");
        this.createCreditCard('AMEX Black', 1, '1234', '0124', '2020-09-24', '2020-09-28');
        this.createCreditCard('Visa Signature', 1,'7890', '0125', '2020-10-04', '2020-10-11');
        this.createCreditCard('Master Black', 2, '4567', '0123', '2020-10-04', '2020-10-12');
        this.createDebitCard('Visa Débito', 1, '3829', '0125')

            .then((id) => {
                console.log("CreateDebitCard: Generated ID: " + id);
            });
    }

    test(){

        this.getCardsByCloseDate('2020-08-30', '2020-09-29')
        .then((cards) => {
            console.log("Fetching by date '2020-08-30' and '2020-09-29' ")
            console.log("Found this cards");
            console.log(cards);
        });

        this.getCardsByCloseDate('2020-08-30', '2020-10-29')
            .then((cards) => {
                console.log("Fetching by date '2020-08-30' and '2020-10-29' ")
                console.log("Found this cards");
                console.log(cards);
        });

        this.getAllCards()
          .then((cards) => {
            console.log("Test: Get All Cards");
            console.log(cards);
        });

        console.log("Test: Update card ID:2");
        this.updateCard(2, 'Visa Signature',1,'7890', '0125', '2020-10-04', '2020-11-01');

        this.getCardById(2)
          .then((card) => {
            console.log("Test: Get Card ID:2");
            console.log(card);
          });
    }
}