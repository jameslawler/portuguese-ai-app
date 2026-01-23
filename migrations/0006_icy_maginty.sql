CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
DELETE FROM `lessons`;
DELETE FROM `plans`;
DELETE FROM `resources`;
ALTER TABLE `lessons` ADD `createdAt` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `lessons` ADD `updatedAt` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `plans` ADD `createdAt` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `plans` ADD `updatedAt` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `resources` ADD `createdAt` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `resources` ADD `updatedAt` integer NOT NULL;