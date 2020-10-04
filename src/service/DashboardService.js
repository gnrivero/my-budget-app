import DBConnector from '../data/access/DBConnector';
import CardService from './CardService';

import AccountService from './AccountService';
import TransactionService from './TransactionService';

export default class DashboardService {

    db;
    cardService;
    accountService;

    constructor(){
        this.db = DBConnector.connect();
        this.cardService = new CardService();
        this.accountService = new AccountService();
        this.transactionService = new TransactionService();
    }

    getAccountBalance(){
        console.log("getAccountBalance: inicio ");
        return new Promise((resolve) => {
            var balanceArray=[];
            var accountsArray=[];
            this.accountService.getAllAccounts().then((balance) => {
                console.log("getAccountBalance: Bashboard ");
                console.log(balance);
                for(var i = 0; i < balance.length; ++i){
                    
                    console.log(balance[i]);
                    if(balance[i].id<=2)
                        accountsArray.push(balance[i].name + "-"+balance[i].currencyCode);
                    else
                        accountsArray.push(balance[i].name);
                    
                    balanceArray.push(balance[i].balance);
                  }
                  console.log("resultado Get AccountBalance");
                  var result ={
                    accounts: accountsArray,
                    balances:balanceArray 
                }
                console.log(result);
                  resolve(result);
            });

        });
    }

    getExpensesByPaymentMethodMonth(){
        console.log("getExpensesByPaymentMethodMonth: inicio ");
        return new Promise((resolve) => {
                var amountCash = amountDC = amountCC = amountother = amountTransfer = amountAutoDebit = 0;
            var accountsArray=[];
            this.transactionService.getExpensesByPaymentMethodMonth().then((expenses) => {
                console.log("getExpensesByPaymentMethodMonth: Bashboard ");
                console.log(expenses);
                for(var i = 0; i < expenses.length; ++i){
                    console.log(expenses[i]);
                    switch (expenses[i].paymentMethod) {
                        case 'CASH':
                            amountCash=expenses[i].amount;
                            break;
                        case 'DC':
                            amountDC=expenses[i].amount;
                            break;
                        case 'CC':
                            amountCC=expenses[i].amount;
                            break;
                        case 'AUTODEBIT':
                            amountAutoDebit=expenses[i].amount;
                            break;
                          case 'TRANSFER':
                            amountTransfer=expenses[i].amount;
                            break;
                          case 'OTHER':
                            amountother=expenses[i].amount;
                            break;
                    }    
                }
                console.log("resultado Get getExpensesByPaymentMethodMonth");
                var result ={
                    amountCash:amountCash,
                    amountDC:amountDC,
                    amountCC:amountCC,
                    amountother:amountother,
                    amountTransfer:amountTransfer,
                    amountAutoDebit:amountAutoDebit}

                console.log(result);
                resolve(result);
            });

        });
    }
    nextMaturities(){
        const conn = this.db;
        return new Promise((resolve) => {
          conn.transaction(
            (txn) => {
               txn.executeSql(
                "SELECT " +
                " SUM(transactions.amount) as amount," +
                " COUNT(*) as count," +
                " 'EgresosARS' as type" +
                " FROM transactions "+
                " INNER JOIN transactionType ON transactions.transactionTypeId = transactionType.id"+
                " WHERE transactionType.type='E' and transactions.date BETWEEN datetime('now') AND datetime('now','+7 day') AND transactions.currencyCode='ARS' "+
                "  UNION "+
                " SELECT " +
                " SUM(transactions.amount) as amount," +
                " COUNT(*) as count," +
                " 'EgresosUSD' as type" +
                " FROM transactions "+
                " INNER JOIN transactionType ON transactions.transactionTypeId = transactionType.id"+
                " WHERE transactionType.type='E' and transactions.date BETWEEN datetime('now') AND datetime('now','+7 day') AND transactions.currencyCode='USD' "+
                "  UNION "+
                "SELECT " +
                " SUM(investment.amountCredited) as amount," +
                " COUNT(*) as count," +
                " 'InverARS' as type" +
                " FROM investment "+
                " WHERE investment.currencyCode='ARS' and investment.dueDate IS NOT NULL and investment.dueDate BETWEEN datetime('now') AND datetime('now','+7 day') "+
                "  UNION "+
                "SELECT " +
                " SUM(investment.amountCredited) as amount," +
                " COUNT(*) as count," +
                " 'InverUSD' as type" +
                " FROM investment "+
                " WHERE investment.currencyCode='USD' and investment.dueDate IS NOT NULL and investment.dueDate BETWEEN datetime('now') AND datetime('now','+7 day') "+
                "  UNION "+
                "SELECT " +
                " SUM(loanFee.amountFees) as amount," +
                " COUNT(*) as count," +
                " 'PresARS' as type" +
                " FROM loanFee "+
                " INNER JOIN loan ON loan.id = loanFee.loanId "+
                " WHERE loan.currencyCode='ARS' and loanFee.expirationDate BETWEEN datetime('now') AND datetime('now','+7 day') "+
                "  UNION "+
                "SELECT " +
                " SUM(loanFee.amountFees) as amount," +
                " COUNT(*) as count," +
                " 'PresUSD' as type" +
                " FROM loanFee "+
                " INNER JOIN loan ON loan.id = loanFee.loanId "+
                " WHERE loan.currencyCode='USD' and loanFee.expirationDate BETWEEN datetime('now') AND datetime('now','+7 day') "
                ,
                    [],
                    (txn, res) => {
                        categoriesArray=[];
                        amountArray=[];
                       console.log(res.rows);
                       var categorie = '';
                       for(var i = 0; i < res.rows.length; ++i){
                            switch (res.rows.item(i).type) {
                                case 'EgresosARS':
                                    categorie = 'Egr-ARS' ;
                                    break;
                                case 'EgresosUSD':
                                    categorie = 'Egr-USD' ;
                                    break;
                                case 'InverUSD':
                                    categorie = 'Inv-USD' ;
                                    break;
                                case 'InverARS':
                                    categorie = 'Inv-ARS' ;
                                    break;
                                case 'PresUSD':
                                    categorie = 'Pres-USD' ;
                                break;
                                case 'PresARS':
                                    categorie = 'Pres-ARS' ;
                                break;
                            }
                            categoriesArray.push(categorie);
                            amountArray.push(res.rows.item(i).amount);
                        }
                        var result ={
                            categories: categoriesArray,
                            amount: amountArray
                        }
        
                       resolve(result);
                    },
                    (txn, err) => { console.log("TransactionService: getExpensesByPaymentMethodMonth failed " + err); }
                    
               )
            }
          );
        });
    }
  
}