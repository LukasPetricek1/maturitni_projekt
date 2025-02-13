-- -----------------------------------------------------
-- Schema social_app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `social_app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `social_app` ;

-- -----------------------------------------------------
-- Table `social_app`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `specific_id` VARCHAR(255) NOT NULL,
  `theme_picture` VARCHAR(255) NULL DEFAULT NULL,
  `profile_picture` VARCHAR(255) NULL DEFAULT NULL,
  `username` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `status` ENUM('online', 'offline', 'invisible') NOT NULL DEFAULT 'invisible',
  `bio` VARCHAR(500) NULL DEFAULT NULL,
  `website` VARCHAR(200) NULL DEFAULT NULL,
  `last_seen` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `verified` ENUM('yes', 'no') NOT NULL DEFAULT 'no',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `specific_id` (`specific_id` ASC) VISIBLE,
  UNIQUE INDEX `username` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 45
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`articles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` MEDIUMTEXT NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `subtitle` VARCHAR(150) NOT NULL,
  `user_id` INT NOT NULL,
  `security` ENUM('private', 'public') NOT NULL DEFAULT 'public',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_articles_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_articles_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`archived_articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`archived_articles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `article_id` INT NOT NULL,
  `status` ENUM('private', 'public') NOT NULL DEFAULT 'private',
  PRIMARY KEY (`id`),
  INDEX `fk_archived_articles_articles1_idx` (`article_id` ASC) VISIBLE,
  CONSTRAINT `fk_archived_articles_articles1`
    FOREIGN KEY (`article_id`)
    REFERENCES `social_app`.`articles` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`article_comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`article_comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `article_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `article_id` (`article_id` ASC) VISIBLE,
  CONSTRAINT `article_comments_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `article_comments_ibfk_2`
    FOREIGN KEY (`article_id`)
    REFERENCES `social_app`.`articles` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`article_likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`article_likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `article_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `article_id` (`article_id` ASC) VISIBLE,
  CONSTRAINT `article_likes_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `article_likes_ibfk_2`
    FOREIGN KEY (`article_id`)
    REFERENCES `social_app`.`articles` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`organizations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`organizations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`channels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`channels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  `organization_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_channels_organization1_idx` (`organization_id` ASC) VISIBLE,
  CONSTRAINT `fk_channels_organization1`
    FOREIGN KEY (`organization_id`)
    REFERENCES `social_app`.`organizations` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`friends`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`friends` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id_1` INT NOT NULL,
  `user_id_2` INT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('pending', 'accepted', 'blocked') NOT NULL DEFAULT 'pending',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_friends_user1_idx` (`user_id_1` ASC) VISIBLE,
  INDEX `fk_friends_user2_idx` (`user_id_2` ASC) VISIBLE,
  CONSTRAINT `fk_friends_user1`
    FOREIGN KEY (`user_id_1`)
    REFERENCES `social_app`.`users` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_friends_user2`
    FOREIGN KEY (`user_id_2`)
    REFERENCES `social_app`.`users` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`hobbies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`hobbies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 82
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `channels_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `status` ENUM('read', 'unread') NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_messages_channels1_idx` (`channels_id` ASC) VISIBLE,
  INDEX `fk_messages_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_messages_channels1`
    FOREIGN KEY (`channels_id`)
    REFERENCES `social_app`.`channels` (`id`),
  CONSTRAINT `fk_messages_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`organization_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`organization_users` (
  `user_id` INT NOT NULL,
  `organization_id` INT NOT NULL,
  `admin` TINYINT NOT NULL DEFAULT '0',
  `moderator` TINYINT NOT NULL DEFAULT '0',
  INDEX `fk_organization_users_organization1_idx` (`organization_id` ASC) VISIBLE,
  INDEX `fk_organization_users_user1` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_organization_users_organization1`
    FOREIGN KEY (`organization_id`)
    REFERENCES `social_app`.`organizations` (`id`),
  CONSTRAINT `fk_organization_users_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(150) NOT NULL,
  `description` VARCHAR(400) NOT NULL,
  `url` VARCHAR(200) NOT NULL,
  `type` VARCHAR(20) NOT NULL,
  `user_id` INT NOT NULL,
  `security` ENUM('private', 'public') NULL DEFAULT 'public',
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_posts_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_posts_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`post_comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`post_comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `post_id` (`post_id` ASC) VISIBLE,
  CONSTRAINT `post_comments_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `post_comments_ibfk_2`
    FOREIGN KEY (`post_id`)
    REFERENCES `social_app`.`posts` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`post_likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`post_likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `post_id` (`post_id` ASC) VISIBLE,
  CONSTRAINT `post_likes_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `post_likes_ibfk_2`
    FOREIGN KEY (`post_id`)
    REFERENCES `social_app`.`posts` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`stories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`stories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(200) NOT NULL,
  `user_id` INT NOT NULL,
  `type` ENUM('video', 'image') NOT NULL,
  `title` VARCHAR(50) NOT NULL DEFAULT '',
  `description` VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  INDEX `fk_stories_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_stories_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`saved_stories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`saved_stories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `stories_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_saved_stories_stories1_idx` (`stories_id` ASC) VISIBLE,
  CONSTRAINT `fk_saved_stories_stories1`
    FOREIGN KEY (`stories_id`)
    REFERENCES `social_app`.`stories` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`user_hobbies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`user_hobbies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `hobby_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_hobbies_hobbies1` (`hobby_id` ASC) VISIBLE,
  INDEX `fk_user_hobbies_user1` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_hobbies_hobbies1`
    FOREIGN KEY (`hobby_id`)
    REFERENCES `social_app`.`hobbies` (`id`),
  CONSTRAINT `fk_user_hobbies_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 47
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social_app`.`verification_codes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_app`.`verification_codes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `code` VARCHAR(10) NOT NULL,
  `expires_at` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `social_app`;

DELIMITER $$
USE `social_app`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `social_app`.`before_new_friendship`
BEFORE INSERT ON `social_app`.`friends`
FOR EACH ROW
BEGIN
	IF EXISTS (
		SELECT 1
		FROM `friends`
		WHERE 
			(
				(user_id_1 = NEW.user_id_1 AND user_id_2 = NEW.user_id_2)
				OR
				(user_id_1 = NEW.user_id_2 AND user_id_2 = NEW.user_id_1)
			)
			AND
			NOT `status` = 'blocked'
	) THEN 
	  SIGNAL SQLSTATE '10000'
	  SET MESSAGE_TEXT = 'Friendship denied.';
	END IF;
END$$


DELIMITER ;