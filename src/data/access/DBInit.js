import CardService from '../../service/CardService';
import AccountService from '../../service/AccountService';
import BankService from '../../service/BankService';
import TransactionTypeService from '../../service/TransactionTypeService';
import TransactionService from '../../service/TransactionService';

export default class DBInit {

    static run (){
        //const cardService = new CardService();
        //cardService.test();

        const bankService = new BankService();
        bankService.initDB();

        const accountService = new AccountService();
        accountService.initDB(false);//Poner esto en true si necesitan resetear las tablas
        //accountService.test(true);

        
        const transactionTypeService = new TransactionTypeService();
        transactionTypeService.initDB(true);

        const transactionService = new TransactionService();
        transactionService.initDB(true);

    }
}