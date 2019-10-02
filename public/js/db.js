import { Pool } from 'pg';
import { resolve } from 'url';

const pg = require('pg');
const url = "postgres://postgres:asdf1234@localhost:5432/postgres";

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'postgres',
    password : 'asdf1234',
    port : 5432
});

export default {
    query(text, params){
        return new Promise( (resove, reject) => {
            pool.connect().then(client => {
                client.query(text, params).then(res => {
                    client.release();
                    resolve(res);
                })
                .catch(err => {
                    client.release();
                    reject(err);
                })
            });
        });
    }
};