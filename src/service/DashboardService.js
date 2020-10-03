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
                    
                    accountsArray.push(balance[i].currencyCode + "-"+balance[i].name);
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
}