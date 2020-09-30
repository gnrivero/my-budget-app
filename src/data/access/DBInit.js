import CardService from '../../service/CardService';
import AccountService from '../../service/AccountService';
import BankService from '../../service/BankService';
import TransactionTypeService from '../../service/TransactionTypeService';
import TransactionService from '../../service/TransactionService';
import InvestmentTypeService from '../../service/InvestmentTypeService';

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

        cardService.initDB(true,true,false);

        const accountService = new AccountService();
        accountService.initDB(true,true,false);
        
        const transactionTypeService = new TransactionTypeService();
        transactionTypeService.initDB(false);

        const transactionService = new TransactionService();
        transactionService.initDB(true,true,false);

        const investmentTypeService = new InvestmentTypeService();
        investmentTypeService.initDB(false);
      
    }
}