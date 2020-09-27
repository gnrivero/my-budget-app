import CardService from '../../service/CardService';
import AccountService from '../../service/AccountService';
import BankService from '../../service/BankService';

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
    }
}