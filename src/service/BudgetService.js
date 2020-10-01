import DBConnector from '../data/access/DBConnector';

export default class BudgetService {

    db;

    constructor(){
      this.db = DBConnector.connect();
    }

    existsBudget(id) {
        return new Promise((resolve) => {
            this.db.transaction(
                (txn) => {
                   txn.executeSql(
                        "SELECT " +
                        " budget.id " +
                        "FROM budget " +
                        "WHERE id = ? " ,
                        [id],
                        (txn, res) => {
                           resolve((res.rows.length >= 1));
                        },
                        (txn, err) => {
                            console.log("existsBudget:" + err);
                        }
                   )
                }
            );
        });
    }

    createMonthlyBudget(id) {
        return new Promise((resolve) => {
            this.db.transaction(
              (txn) => {
                txn.executeSql(
                    "SELECT id FROM transactionType WHERE type = 'E'",
                    [],
                    (txn, res) => {
                        for(var i = 0; i < res.rows.length; ++i){
                            var item = res.rows.item(i);
                            this.createBudgetEntry(id, item.id, 0.00);
                        }
                        resolve(true);
                    }
                )
              }
            );
         });
    }

    updateMonthlyBudget(monthlyBudget) {
        for (var i = 0; i < monthlyBudget.length; ++i){
            var budget = monthlyBudget[i];
            this.updateBudgetEntry(budget.amount, budget.id, budget.transactionTypeId);
        }
    }

    updateBudgetEntry(amount, id, transactionTypeId) {
        this.db.transaction(
            (txn) => {
               txn.executeSql(
                    "UPDATE budget SET amount = ? WHERE id = ? AND transactionTypeId = ?",
                    [amount, id, transactionTypeId],
                    (txn, res) => { console.log("updateBudget: Affected Rows " + res.rowsAffected); },
                    (txn, err) => { console.log("updateBudget: failed " + err); }
               )
            }
        );
    }

    createBudgetEntry(id, typeId, amount) {

        var idToDate = id + "-01";

        this.db.transaction(
            (txn) => {
               txn.executeSql(
                    "INSERT INTO budget (id, transactionTypeId, dateFrom, dateTo, amount) " +
                    "VALUES (?,?, date(?,'start of month'), date(?,'start of month','+1 month','-1 day'), ?)",
                    [id, typeId, idToDate, idToDate, amount],
                    (txn, res) => { console.log("createBudget: Affected Rows " + res.rowsAffected); },
                    (txn, err) => { console.log("createBudget: failed " + err); }
               )
            }
        );
    }

    getBudgetById(id){
        return new Promise((resolve) => {
            this.db.transaction(
                (txn) => {
                   txn.executeSql(
                        "SELECT " +
                        " budget.id, " +
                        " transactionType.name, " +
                        " budget.transactionTypeId, " +
                        " budget.amount, " +
                        " budget.dateFrom, " +
                        " budget.dateTo,  " +
                        " (SELECT SUM(transactions.amount) " +
                        "  FROM transactions " +
                        "  WHERE transactions.transactionTypeId = budget.transactionTypeId " +
                        "    AND transactions.date BETWEEN budget.dateFrom AND budget.dateTo) as total  " +
                        "FROM budget " +
                        "INNER JOIN transactionType ON budget.transactionTypeId = transactionType.id " +
                        "WHERE budget.id = ? ",
                        [id],
                        (txn, res) => {
                           let budget = new Array();
                           for(var i = 0; i < res.rows.length; ++i){
                             budget.push(res.rows.item(i));
                           }
                           console.log(budget);
                           resolve(budget);
                        },
                        (txn, err) => {
                            console.log("getBudgetById:" + err);
                        }
                   )
                }
            );
        });
    }

    createTable(){
        console.log("BudgetService: Dropping table budget");
        this.db.transaction(
            (txn) => {
                txn.executeSql(
                    "DROP TABLE IF EXISTS budget",
                    [],
                    (txn, res) => {
                        console.log("BudgetService: Table Dropped");
                        console.log("BudgetService: Creating Table bank");
                        txn.executeSql(
                            "CREATE TABLE IF NOT EXISTS budget ( " +
                            "id VARCHAR(7), " +
                            "transactionTypeId INTEGER, " +
                            "amount REAL, " +
                            "dateFrom TEXT, " +
                            "dateTo TEXT)",
                            [],
                            (txn, res) => { console.log("BudgetService: Table budget created "); },
                            (txn, err) => { console.log("BudgetService: Table budget failed creation " + err); }
                       )
                    }
                )
            }
        );
    }

    populate(){ }

    test(){

        var id = "2020-09";

        this.existsBudget(id)
         .then((exists) => {
            console.log("Data exists " + exists);
            /*if (!exists){
              console.log("Creating new budget");
              this.createMonthlyBudget(id);
            }*/

            this.getBudgetById(id)
            .then((budget) => {
              console.log("Listing budget");
              console.log(budget);
            });
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

}