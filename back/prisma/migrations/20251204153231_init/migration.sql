-- CreateTable
CREATE TABLE "CandidateUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "phone" TEXT
);

-- CreateTable
CREATE TABLE "RecruiterUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "enterprise" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "phone" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateUser_email_key" ON "CandidateUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RecruiterUser_email_key" ON "RecruiterUser"("email");
