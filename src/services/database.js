import * as SQLite from "expo-sqlite";

let db;

export const initDb = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("mytasks.db");
  }
};

export const initSessionsTable = async () => {
  console.log("Iniciando tablas");
  await initDb();
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT
      )`);
};


export const getTasks = async () => {
  await initDb();
  const result = await db.getAllAsync("SELECT * FROM tasks;");
  console.log("Obteniendo datos de DB", result);
  return result;
};



export const insertTask = async (title, description, photo) => {
  await initDb();
  await db.runAsync(
    "INSERT INTO tasks (title, description, image) VALUES (?, ?, ?);",
    [title, description, photo]
  );
};

