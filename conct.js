import * as mongoDB from "mongodb"
import variables from '../config/variables.config.js'


export async function connectToDatabase(){
    try {
        const client= new mongoDB.MongoClient(variables.DB_CONN_STRING);
        let client_conection= await client.connect();
        const db = client.db(variables.DB_NAME)
        return client_conection
    } catch (error) {
        console.error(error)
        throw error
    }
}