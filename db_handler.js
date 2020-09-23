import * as SQLite from 'expo-sqlite';
import config from './config'

const db = SQLite.openDatabase(config.getCell("DatabaseName"), config.getCell("DatabaseVersion"));

const executeSql = (sql, args, onSuccess, err) => {
    db.transaction( (tr) => {
        tr.executeSql(sql, args, onSuccess, err)
    });
};

export const createDBTables = () => {
    executeSql(`CREATE TABLE IF NOT EXISTS CategoryList(
        name TEXT,
        productCategoryId INTEGER,
        imageLink TEXT)`, []);
    executeSql(`CREATE TABLE IF NOT EXISTS ProductList(
        name TEXT,
        productId INTEGER,
        imageLink TEXT)`, []);
    executeSql(`CREATE TABLE IF NOT EXISTS Images(
        imageLink TEXT,
        imageData TEXT)`, []);
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

export const getImage = (imageLink, cb, err) => {
    executeSql(`SELECT imageData FROM Images WHERE imageLink='${imageLink}' LIMIT 1`, [], cb, err)
};