BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "user" (
	"id"	INTEGER UNIQUE,
	"username"	TEXT UNIQUE,
	"password"	TEXT,
	"email"	TEXT UNIQUE,
	"name"	TEXT,
	"state"	INTEGER DEFAULT 1,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "user" ("id","username","password","email","name","state") VALUES (1,'admin','$2y$10$N7Ay9g2O.WeJz1mjPXWChOhZF3i2Rfnxi/PiRvJ157xb1slcMidQy','idrice.borice@fronttieres.com','Borice Djapang',1);
COMMIT;
