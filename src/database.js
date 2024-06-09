import {createPool} from "mysql2"

const pool = createPool({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"12A34B56C",
    database:"Crud"
}).promise()

export default pool