import AccountService from '../../service/AccountService';
import BankService from '../../service/BankService';
import BudgetService from '../../service/BudgetService';
import CardService from '../../service/CardService';
import TransactionService from '../../service/TransactionService';
import TransactionTypeService from '../../service/TransactionTypeService';

export default class DBInit {

    static run (){

        const bankService = new BankService();
        bankService.initDB();

        /* initDB - Params
          resetData: Borra la tabla y crea una nueva sin datos.
          populate: Llena la tabla con algunos datos.
          runTests: Corre pruebas. Info: Modifica los datos.
        */
        const cardService = new CardService();
        cardService.initDB(false,false,false);

        const accountService = new AccountService();
        accountService.initDB(false,false,false);
        
        const transactionTypeService = new TransactionTypeService();
        transactionTypeService.initDB(false);

        const transactionService = new TransactionService();
        transactionService.initDB(false,false,false);


        const budgetService = new BudgetService();
        budgetService.initDB(false,false,true);
    }
}