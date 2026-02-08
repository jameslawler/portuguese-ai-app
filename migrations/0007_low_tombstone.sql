CREATE TABLE `scenarioMessageNotes` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`messageId` text NOT NULL,
	`type` text NOT NULL,
	`content` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `scenarioMessages` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`sessionId` text NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `scenarioSessions` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`configuration` text NOT NULL,
	`objectives` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
