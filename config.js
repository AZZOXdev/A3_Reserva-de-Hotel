import * as dotenv from "dotenv"
dotenv.config();

export default{
    DB_CONN_STRING:process.env.DB_CONN_STRING ?? "",
    DB_NAME:process.env.DB_NAME ?? "",
    EMAIL_USER:process.env.EMAIL_USER ?? "",
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD ?? "",
    EMAIL_RECIVERS:process.env.EMAIL_RECIBERS??"",
    WORKER_CONNECTION:process.env.WORKER_CONNECTION??"localhost:7233",
    TEMPORAL_ADDRESS:process.env.TEMPORAL_ADDRESS??"localhost:7233",
    URL_SIZE:process.env.URL_SIZE}