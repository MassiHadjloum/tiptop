CREATE DATABASE IF NOT EXISTS tiptop;
USE tiptop;

CREATE TABLE User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  address1 VARCHAR(255),  -- Peut être NULL
  postalCode VARCHAR(20), -- Peut être NULL
  dateOfBirth DATE NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL
);

CREATE TABLE Participation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  userId INT NOT NULL,
  status ENUM('En Attente', 'Remis', 'Non Remis', 'Annule') NOT NULL,
  participationDate DATE NOT NULL,
  submissionDate DATE NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

-- Insérer 5000 utilisateurs
DELIMITER $$
CREATE PROCEDURE InsertUsers()
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= 5000 DO
    INSERT INTO User (email, firstName, lastName, address1, postalCode, dateOfBirth, phoneNumber)
    VALUES (
      CONCAT('user', i, '@example.com'),
      CONCAT('FirstName', i),
      CONCAT('LastName', i),
      CONCAT('Address', i),
      CONCAT('PostalCode', i),
      DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 365 * 30) DAY), -- date de naissance aléatoire dans les 30 dernières années
      CONCAT('123-456-789', MOD(i, 10))
    );
    SET i = i + 1;
  END WHILE;
END $$
DELIMITER ;

CALL InsertUsers();

-- Insérer 50000 participations
DELIMITER $$
CREATE PROCEDURE InsertParticipations()
BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE status ENUM('En Attente', 'Remis', 'Non Remis', 'Annule');
  WHILE i <= 50000 DO
    SET status = ELT(FLOOR(RAND() * 4) + 1, 'En Attente', 'Remis', 'Non Remis', 'Annule');
    INSERT INTO Participation (name, userId, status, participationDate, submissionDate)
    VALUES (
      CONCAT('Participation', i),
      FLOOR(1 + (RAND() * 5000)), -- utilisateur aléatoire
      status,
      DATE_ADD('2024-07-01', INTERVAL FLOOR(RAND() * 31) DAY), -- date de participation aléatoire en juillet
      DATE_ADD('2024-07-01', INTERVAL FLOOR(RAND() * 31) DAY) -- date de soumission aléatoire en juillet
    );
    SET i = i + 1;
  END WHILE;
END $$
DELIMITER ;

CALL InsertParticipations();

