import * as SQLite from 'expo-sqlite';
import config from './config'

const db = SQLite.openDatabase(config.getCell("DatabaseName"), config.getCell("DatabaseVersion"));

const executeSql = (sql, args) => {
    db.transaction( (tr) => {
        tr.executeSql(sql, args);
    });
};

export const createDBTables = () => {
    executeSql(`CREATE TABLE IF NOT EXIST CategoryList(
        productCategoryId INTEGER,
        imageLink TEXT,
        imageData TEXT)`);
};

export const addProductImage = (productCategoryId, imageLink, imageData) => {
    executeSql(`INSERT INTO CategoryList(
        productCategoryId,
        imageLink,
        imageData) VALUES(?, ?, ?)`, [productCategoryId, imageLink, imageData]);
};