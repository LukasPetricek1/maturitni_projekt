-- Schema social_app
/*
K ukládání externího obsahu jako jsou video a obrázky je využit AWS S3 Cloud.
*/
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `social_app`;
USE `social_app` ;

-- tabulka uživatelů

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `specific_id` VARCHAR(255) NOT NULL UNIQUE,
  `theme_picture` VARCHAR(255) NULL,
  `profile_picture` VARCHAR(255) NULL,
  `username` VARCHAR(45) NOT NULL UNIQUE,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(60) NOT NULL,
  `status` ENUM('online', 'offline', 'invisible') NOT NULL DEFAULT 'invisible',
  `bio` VARCHAR(500) NULL,
  `website` VARCHAR(200) NULL,
  `last_seen` DATETIME NOT NULL DEFAULT now(),
  `verified` ENUM('yes' , 'no') NOT NULL DEFAULT 'no',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;

-- tabulka ověřovacích kódů
CREATE TABLE verification_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    code VARCHAR(10) NOT NULL,
    expires_at BIGINT NOT NULL
);

-- tabulka zájmů

CREATE TABLE IF NOT EXISTS `hobbies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- propojení uživatelů s danými zájmy.

CREATE TABLE IF NOT EXISTS `user_hobbies` (
  `hobby_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`user_id` , `hobby_id`),
  CONSTRAINT `fk_user_hobbies_hobbies1`
    FOREIGN KEY (`hobby_id`)
    REFERENCES `social_app`.`hobbies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_hobbies_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

/*
Seznam přátel a stav pozvánky mezi nimi.
*/

CREATE TABLE IF NOT EXISTS `friends` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id_1` INT NOT NULL,
  `user_id_2` INT NOT NULL,
  `created_at` DATETIME NULL DEFAULT now(),
  `status` ENUM('pending', 'accepted', 'blocked') NOT NULL DEFAULT 'pending',
  INDEX `fk_friends_user1_idx` (`user_id_1`),
  INDEX `fk_friends_user2_idx` (`user_id_2`),
  CONSTRAINT `fk_friends_user1`
    FOREIGN KEY (`user_id_1`) REFERENCES `users` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_friends_user2`
    FOREIGN KEY (`user_id_2`) REFERENCES `users` (`id`)
    ON DELETE CASCADE
)ENGINE = InnoDB;

/*
Tento trigger slouží k zajištění, že nikdy nemůže existovat více spojení mezi dvěma stejnými uživateli. 
Jedině, že by u předchozí pozvánky byl nastaven status na BLOCKED, neboli pozvánka neprošla.
I bloknuté pozvánky se budou ukládat, aby daný uživatel, kterému jsem odmítnul 3 krát pozvánku, mi nemohl poslat další.
*/
DROP TRIGGER IF EXISTS before_new_friendship;

DELIMITER $$;

CREATE TRIGGER before_new_friendship
BEFORE INSERT ON friends
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
END$$;

-- -----------------------------------------------------
-- Tabulka příběhů
-- -----------------------------------------------------
-- Uživatel je schopen přidávat příběhy.
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `stories` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `url` VARCHAR(200) NOT NULL,
  `user_id` INT NOT NULL,
  `type` ENUM('video' , 'image') NOT NULL,
  `title` VARCHAR(50) NOT NULL DEFAULT '',
  `description` VARCHAR(50) NOT NULL DEFAULT '',
  INDEX `fk_stories_user_idx` (`user_id`),
  CONSTRAINT `fk_stories_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabulka pro uložené příběhy
-- -----------------------------------------------------
-- uživatel si sám určí, jaké příběhy si bude chtít uložit a zvěčnit tak na profilu.


CREATE TABLE IF NOT EXISTS `saved_stories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `stories_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_saved_stories_stories1_idx` (`stories_id` ASC) VISIBLE,
  CONSTRAINT `fk_saved_stories_stories1`
    FOREIGN KEY (`stories_id`)
    REFERENCES `social_app`.`stories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabulka pro příběhy
-- -----------------------------------------------------
-- Uživatel může psát příspěvky


CREATE TABLE IF NOT EXISTS `articles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` MEDIUMTEXT NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `subtitle` VARCHAR(150) NOT NULL,
  `author` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_articles_user1_idx` (`author` ASC) VISIBLE,
  CONSTRAINT `fk_articles_user1`
    FOREIGN KEY (`author`)
    REFERENCES `social_app`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabulka pro archivované články.
-- -----------------------------------------------------
/*
Jaké články budou archivovány.
Jelikož uživatel nemusí článek dopsat, jenom mus stačí jej archivovat. Je na něm jestli bude veřejný nebo ne.
Rozdělaná práce se ukládá.
*/
CREATE TABLE IF NOT EXISTS `archived_articles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `article_id` INT NOT NULL,
  `status` ENUM('private', 'public') NOT NULL DEFAULT 'private',
  PRIMARY KEY (`id`),
  INDEX `fk_archived_articles_articles1_idx` (`article_id` ASC) VISIBLE,
  CONSTRAINT `fk_archived_articles_articles1`
    FOREIGN KEY (`article_id`)
    REFERENCES `social_app`.`articles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabulka pro příspěvky.
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(150) NOT NULL,
  `description` VARCHAR(400) NOT NULL,
  `url` VARCHAR(200) NOT NULL,
  `type` ENUM('video', 'image') NOT NULL,
  `user_id` INT NOT NULL,
  `security` ENUM ("private" , "public") DEFAULT "public",
  `created_at` DATETIME DEFAULT now()
  PRIMARY KEY (`id`),
  INDEX `fk_posts_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_posts_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabulka pro organizace
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS  `organizations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabulka pro členy dané organizace
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `organization_users` (
  `user_id` INT NOT NULL,
  `organization_id` INT NOT NULL,
  `admin` TINYINT NOT NULL DEFAULT 0,
  `moderator` TINYINT NOT NULL DEFAULT 0,
  INDEX `fk_organization_users_organization1_idx` (`organization_id` ASC) VISIBLE,
  CONSTRAINT `fk_organization_users_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_organization_users_organization1`
    FOREIGN KEY (`organization_id`)
    REFERENCES `social_app`.`organizations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabulka pro kanály, které jsou součástí daných organizací.
-- Speciální kanál začíná @ a jedná se o přímou konverzaci.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `channels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  `organization_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_channels_organization1_idx` (`organization_id` ASC) VISIBLE,
  CONSTRAINT `fk_channels_organization1`
    FOREIGN KEY (`organization_id`)
    REFERENCES `social_app`.`organizations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabulka pro zprávy. S @id... se jedná o direct message.
-- Při odeslání 1. přímé zprávy se vytvořví kanál.
-- Při založení organizace a příslušného kanálu se vytvoří kanál.
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `channels_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT now(),
  `updated_at` DATETIME NULL ON UPDATE now(),
  `status` ENUM('read', 'unread') NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_messages_channels1_idx` (`channels_id` ASC) VISIBLE,
  INDEX `fk_messages_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_messages_channels1`
    FOREIGN KEY (`channels_id`)
    REFERENCES `social_app`.`channels` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `social_app`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Zde se ukládají srdíčka pro všechny články

CREATE TABLE `article_likes` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    article_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Zde se ukládají komentáře pro všechny článnky

CREATE TABLE `article_comments` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    article_id INT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Zde se ukládají srdíčka pro všechny příspěvky.

CREATE TABLE `post_likes` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Zde se ukládají komentáře pro všechny příspěvky.


CREATE TABLE `post_comments` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB;