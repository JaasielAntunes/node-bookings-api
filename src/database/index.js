import pgPromise from "pg-promise";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const pgp = pgPromise();
const db = pgp("postgres://postgres:1234@localhost:5432/bookings-api-db");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, "create-tables.sql");
const query = new pgp.QueryFile(filePath);
db.query(query);
console.log("Tabela criada com sucesso!");

export { db };