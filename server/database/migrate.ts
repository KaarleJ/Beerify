import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

async function run() {
  await migrate(db, { migrationsFolder: 'drizzle' });
  await sql.end();
}

run()
  .then(() => console.log('Migrations run'))
  .catch((error) => {
    console.log(error);
  });
