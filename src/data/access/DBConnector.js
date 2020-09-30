import * as SQLite from 'expo-sqlite';

/*
    Doc SQLite: https://docs.expo.io/versions/latest/sdk/sqlite/
    Para instalar SQLite correr el siguiente comando dentro del proyecto:

    $ expo install expo-sqlite
*/
export default class DBConnector {

    static connection;

    static connect() {

        if (this.connection === undefined){
            console.log("DBConnector: Creating new connection");
            this.connection = SQLite.openDatabase("MyBudgetApp.db",
                                                   "1.0",
                                                   "My Budget",
                                                   200000,
                                                   () => {console.log("OK CONN")},
                                                   () => {console.log("ERR CONN")});
        }

        console.log("DBConnector: returning connection");
        return this.connection;
    }

}