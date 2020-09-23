import * as SQLite from 'expo-sqlite';

/*
    Doc SQLite: https://docs.expo.io/versions/latest/sdk/sqlite/
    Para instalar SQLite correr el siguiente comando dentro del proyecto:

    $ expo install expo-sqlite
*/
export default class DBConnector {

    static connect() {
        return SQLite.openDatabase("MyBudgetApp.db",
                                        "1.0",
                                        "My Budget",
                                        200000,
                                        () => {console.log("OK CONN")},
                                        () => {console.log("ERR CONN")});
    }

}