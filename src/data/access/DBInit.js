import CardService from '../../service/CardService';
import AccountService from '../../service/AccountService';
import BankService from '../../service/BankService';

export default class DBInit {

    static run (){
        //const cardService = new CardService();
        //cardService.test();

        const bankService = new BankService();
        bankService.initDB();

        const accountService = new AccountService();
        accountService.initDB(true);
        //accountService.test(true);
    }
}