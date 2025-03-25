PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_likes` (
	`art_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	PRIMARY KEY(`art_id`, `user_id`),
	FOREIGN KEY (`art_id`) REFERENCES `arts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_likes`("art_id", "user_id") SELECT "art_id", "user_id" FROM `likes`;--> statement-breakpoint
DROP TABLE `likes`;--> statement-breakpoint
ALTER TABLE `__new_likes` RENAME TO `likes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;