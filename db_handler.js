import * as SQLite from 'expo-sqlite';
import config from './config'

const db = SQLite.openDatabase(config.getCell("DatabaseName"), config.getCell("DatabaseVersion"));

const executeSql = (sql, args, onSuccess, err) => {
    // console.log("cb2", typeof onSuccess)
    db.transaction( (tr) => {
        tr.executeSql(sql, args, onSuccess, err)
    });
};

export const createDBTables = () => {
    console.log('HELELELelr')
    executeSql(`CREATE TABLE IF NOT EXISTS CategoryList(
        name TEXT,
        productCategoryId INTEGER,
        imageLink TEXT)`, [], ()=>{console.log("gg")}, (tr, err)=>{console.log(err)});
    executeSql(`CREATE TABLE IF NOT EXISTS ProductList(
        name TEXT,
        productId INTEGER,
        imageLink TEXT)`, [], ()=>{console.log("gg")}, (tr, err)=>{console.log(err)});
    executeSql(`CREATE TABLE IF NOT EXISTS Images(
        imageLink TEXT,
        imageData TEXT)`, [], ()=>{console.log("gg")}, (tr, err)=>{console.log(err)});
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
    // console.log("cb", typeof cb)
    executeSql(`SELECT imageData FROM Images WHERE imageLink='${imageLink}' LIMIT 1`, [], cb, err)
};