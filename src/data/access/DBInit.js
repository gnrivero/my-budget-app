import CardService from '../../service/CardService';
import AccountService from '../../service/AccountService';

export default class DBInit {

    static run (){
        const cardService = new CardService();
        const accountService = new AccountService();

        //cardService.test();
        accountService.test();
    }

}