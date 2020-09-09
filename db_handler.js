import * as SQLite from 'expo-sqlite';
import config from './config'

export const createDBTables = () => {
     const db = SQLite.openDatabase(config.getCell("DatabaseName"), config.getCell("DatabaseVersion"));

    db.transaction( (tr) => {
        tr.executeSql(`CREATE TABLE IF NOT EXIST CategoryList(
            productCategoryId INTEGER,
            imageLink TEXT,
            imageData TEXT)`);
    });

};

