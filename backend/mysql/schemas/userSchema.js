const userSchema = `CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  specific_id VARCHAR(255) NOT NULL,
  theme_picture VARCHAR(255) NULL DEFAULT NULL,
  profile_picture VARCHAR(255) NULL DEFAULT NULL,
  username VARCHAR(45) NOT NULL,
  name VARCHAR(45) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(60) NOT NULL,
  status ENUM('online', 'offline', 'invisible') NOT NULL DEFAULT 'invisible',
  bio VARCHAR(500) NULL DEFAULT NULL,
  website VARCHAR(200) NULL DEFAULT NULL,
  last_seen DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  verified ENUM('yes', 'no') NOT NULL DEFAULT 'no',
  PRIMARY KEY (id),
  UNIQUE INDEX specific_id (specific_id ASC) VISIBLE,
  UNIQUE INDEX username (username ASC) VISIBLE,
  UNIQUE INDEX email (email ASC) VISIBLE,
  UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE,
  UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE)`

module.exports = userSchema;