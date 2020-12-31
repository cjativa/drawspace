import fs from 'fs';
import { join } from 'path';
import DatabaseClient from './databaseClient';

// Tried to have this read from separate schema.sql file, but TypeScript was not having it
const schemaSQL = `
-- Drop table

-- DROP TABLE public.users;

CREATE TABLE IF NOT EXISTS public.users (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_un UNIQUE (username)
);

-- Drop table

-- DROP TABLE public.drawings;

CREATE TABLE IF NOT EXISTS public.drawings (
	id serial NOT NULL,
	user_id int4 NOT NULL,
	"data" varchar NOT NULL,
	elapsed_time int4 NOT NULL,
	creation_time timestamptz NOT NULL,
	public bool NOT NULL,
	public_url varchar NULL,
	CONSTRAINT drawings_pk PRIMARY KEY (id),
	CONSTRAINT drawings_fk FOREIGN KEY (user_id) REFERENCES users(id)
);
`;

/** Initializes the database */
const InitializeDatabase = async () => {

    // Read in the sql for creating the schema and execute it
    await DatabaseClient.performQuery(schemaSQL);
};

export default InitializeDatabase;