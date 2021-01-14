BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "urls" (
	"url"	TEXT NOT NULL UNIQUE,
	"timeSubmitted"	INTEGER NOT NULL
);

ALTER TABLE "urls" ADD
  "submitter"	TEXT;

ALTER TABLE "urls" ADD
  "description"	TEXT;

/* Add version to config */
INSERT INTO config (key, value) VALUES("version", 1);

COMMIT;