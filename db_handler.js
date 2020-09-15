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
        name TEXT,
        productCategoryId INTEGER,
        imageLink TEXT);
    CREATE TABLE IF NOT EXIST ProductList(
        name TEXT,
        productId INTEGER,
        imageLink TEXT;
    CREATE TABLE IF NOT EXIST Images(
        imageLink TEXT,
        imageData TEXT);`);
};

export const addCategory = (name, productCategoryId, imageLink) => {
    executeSql(`INSERT INTO CategoryList(
    	name,
        productCategoryId,
        imageLink) VALUES(?, ?)`, [name, productCategoryId, imageLink]);
};
export const addProduct = (name, productId, imageLink) => {
    executeSql(`INSERT INTO CategoryList(
    	name,
        productId,
        imageLink) VALUES(?, ?, ?)`, [name, productId, imageLink]);
};
export const addImage = (imageLink, imageData) => {
    executeSql(`INSERT INTO Images(
    	imageLink,
        imageData) VALUES(?, ?)`, [imageLink, imageData]);
};