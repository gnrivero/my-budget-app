import DBConnector from '../data/access/DBConnector';
import CardService from './CardService';

import AccountService from './AccountService';

export default class DashboardService {

    db;
    cardService;
    accountService;

    constructor(){
        this.db = DBConnector.connect();
        this.cardService = new CardService();
        this.accountService = new AccountService();
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
}