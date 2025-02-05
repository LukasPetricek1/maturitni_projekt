const userSchema = `
    CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    specific_id VARCHAR(255) NOT NULL UNIQUE,
    theme_picture VARCHAR(255) NULL,
    personal_code VARCHAR(6) NOT NULL,
    profile_picture VARCHAR(255) NULL,
    username VARCHAR(45) NOT NULL,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL,
    status ENUM('online', 'offline', 'invisible') NOT NULL DEFAULT 'invisible',
    bio VARCHAR(500) NULL,
    website VARCHAR(200) NULL,
    last_seen DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE,
    UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE)
    ENGINE = InnoDB;
`
module.exports = userSchema;