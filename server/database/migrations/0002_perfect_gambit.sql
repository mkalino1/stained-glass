CREATE TABLE `likes` (
	`art_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	PRIMARY KEY(`art_id`, `user_id`),
	FOREIGN KEY (`art_id`) REFERENCES `arts`(`id`) ON UPDATE no action ON DELETE no action
);
