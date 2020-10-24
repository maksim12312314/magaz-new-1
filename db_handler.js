import * as SQLite from 'expo-sqlite';
import { DATABASE_NAME, DATABASE_VERSION } from './config';

const db = SQLite.openDatabase(DATABASE_NAME, DATABASE_VERSION);

const executeSql = (sql, args, onSuccess, err) => {
    db.transaction( (tr) => {
        tr.executeSql(sql, args, onSuccess, err);
    });
};

export const createDBTables = () => {
    executeSql(`CREATE TABLE IF NOT EXISTS CategoryList(
        name TEXT,
        productCategoryId INTEGER UNIQUE,
        imageLink TEXT)`, [], null, (tr, err) => console.log("SOMETHING WENT WRONG", err));
    executeSql(`CREATE TABLE IF NOT EXISTS Cart(
        name TEXT,
        productId INTEGER UNIQUE,
        imageLink TEXT,
        productQuantity INTEGER,
        price INTEGER,
        selectedVariants TEXT,
        stockQuantity INTEGER)`, [], null, (tr, err) => console.log("SOMETHING WENT WRONG", err));
    executeSql(`CREATE TABLE IF NOT EXISTS Images(
        imageLink TEXT UNIQUE,
        imageData TEXT)`, [], null, (tr, err) => console.log("SOMETHING WENT WRONG", err));
};

export const addCategory = (name, productCategoryId, imageLink) => {
    executeSql(`INSERT OR REPLACE INTO CategoryList(
    	name,
        productCategoryId,
        imageLink) VALUES(?, ?, ?)`, [name, productCategoryId, imageLink]);
};
export const addProductToCart = (name, productId, imageLink, productQuantity, price, selectedVariants, stockQuantity) => {
    try {
        selectedVariants = JSON.stringify(selectedVariants);
    } catch {
        selectedVariants = JSON.stringify([]);
    }
    executeSql(`INSERT OR REPLACE INTO Cart(
    	name,
        productId,
        imageLink,
        productQuantity,
        price,
        selectedVariants,
        stockQuantity) VALUES(?, ?, ?, ?, ?, ?, ?)`, [name, productId, imageLink, productQuantity, price, selectedVariants, stockQuantity]);
};
export const addImage = (imageLink, imageData) => {
    executeSql(`INSERT OR REPLACE INTO Images(
    	imageLink,
        imageData) VALUES(?, ?)`, [imageLink, imageData]);
};

export const deleteProductFromCart = (productId) => {
    executeSql(`DELETE FROM Cart WHERE productId=?`, [productId], null, (tr, err) => console.log(`ERROR DELETING RECORD ${productId}`, err));
};

export const getImage = (imageLink, cb, err) => {
    executeSql(`SELECT imageData, imageLink FROM Images WHERE imageLink='${imageLink}' LIMIT 1`, [], cb, err);
};
export const getCart = (callback, error) => {
    executeSql(`SELECT * FROM Cart`, [], callback, error);
};
export const getDBCategoryList = (cb, err) => {
    executeSql(`SELECT * FROM CategoryList LIMIT 30`, [], cb, err);
};