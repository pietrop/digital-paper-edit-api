ALTER TABLE "Transcripts" DROP CONSTRAINT IF EXISTS "Transcripts_fk0";

ALTER TABLE "Annotations" DROP CONSTRAINT IF EXISTS "Annotations_fk0";

ALTER TABLE "Annotations" DROP CONSTRAINT IF EXISTS "Annotations_fk1";

ALTER TABLE "Annotations" DROP CONSTRAINT IF EXISTS "Annotations_fk2";

ALTER TABLE "Paper_edits" DROP CONSTRAINT IF EXISTS "Paper_edits_fk0";

ALTER TABLE "users_projects" DROP CONSTRAINT IF EXISTS "users_projects_fk0";

ALTER TABLE "users_projects" DROP CONSTRAINT IF EXISTS "users_projects_fk1";

ALTER TABLE "users_transcripts" DROP CONSTRAINT IF EXISTS "users_transcripts_fk0";

ALTER TABLE "users_transcripts" DROP CONSTRAINT IF EXISTS "users_transcripts_fk1";

ALTER TABLE "users_paper_edits" DROP CONSTRAINT IF EXISTS "users_paper_edits_fk0";

ALTER TABLE "users_paper_edits" DROP CONSTRAINT IF EXISTS "users_paper_edits_fk1";

ALTER TABLE "Media" DROP CONSTRAINT IF EXISTS "Media_fk0";

DROP TABLE IF EXISTS "Users";

DROP TABLE IF EXISTS "Projects";

DROP TABLE IF EXISTS "Transcripts";

DROP TABLE IF EXISTS "Annotations";

DROP TABLE IF EXISTS "Paper_edits";

DROP TABLE IF EXISTS "users_projects";

DROP TABLE IF EXISTS "users_transcripts";

DROP TABLE IF EXISTS "users_paper_edits";

DROP TABLE IF EXISTS "Media";

DROP TABLE IF EXISTS "Labels";

