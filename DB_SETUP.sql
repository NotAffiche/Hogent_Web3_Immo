CREATE TABLE TypePand (
  id INT PRIMARY KEY AUTO_INCREMENT,
  naam VARCHAR(45) UNIQUE,
  createdAt DATETIME,
  updatedAt DATETIME
);

CREATE TABLE Panden (
  id INT PRIMARY KEY AUTO_INCREMENT,
  straat VARCHAR(45),
  huisnr VARCHAR(45),
  bus VARCHAR(45),
  postcode INT,
  gemeente VARCHAR(45),
  prijs INT,
  aantalKamers INT,
  oppervlakte INT,
  beschrijving TEXT,
  typePandId INT,
  createdAt DATETIME,
  updatedAt DATETIME,
  isVerkochtVerhuurd TINYINT,
  FOREIGN KEY (typePandId) REFERENCES TypePand(id)
);

CREATE TABLE Afbeeldingen (
  id INT PRIMARY KEY AUTO_INCREMENT,
  url VARCHAR(150),
  createdAt DATETIME,
  updatedAt DATETIME,
  pandId INT,
  FOREIGN KEY (pandId) REFERENCES Panden(id)
);

CREATE TABLE Gebruikers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  voorNaam VARCHAR(45),
  achternaam VARCHAR(45),
  email VARCHAR(150) UNIQUE,
  wachtwoord VARCHAR(150),
  createdAt DATETIME,
  updatedAt DATETIME
);

CREATE TABLE Regio (
  id INT PRIMARY KEY AUTO_INCREMENT,
  naam VARCHAR(45) UNIQUE,
  createdAt DATETIME,
  updatedAt DATETIME
);

CREATE TABLE PandRegio (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pandId INT,
  regioId INT,
  FOREIGN KEY (pandId) REFERENCES Panden(id),
  FOREIGN KEY (regioId) REFERENCES Regio(id)
);

-- DUMMY DATA

-- TypePand
INSERT INTO TypePand (naam, createdAt, updatedAt) VALUES ('Huis', now(), now());
INSERT INTO TypePand (naam, createdAt, updatedAt) VALUES ('Appartement', now(), now());
INSERT INTO TypePand (naam, createdAt, updatedAt) VALUES ('Villa', now(), now());
INSERT INTO TypePand (naam, createdAt, updatedAt) VALUES ('Studio', now(), now());

-- Panden
-- Afbeeldingen per pand
INSERT INTO Panden (straat, huisnr, bus, postcode, gemeente, prijs, aantalKamers, 
oppervlakte, beschrijving, typePandId, createdAt, updatedAt, isVerkochtVerhuurd) 
VALUES ('Tenderstraat', 39, 'Box 001', 9000, 'Gent', 450000, 3, 100,'Omgeving Sint-Pietersstation. 
Kwalitatief renovatieproject van 4 ruime 3-slpk appartementen (ca 100m2) met terras of stadstuin. 
Maison Fee is een gloednieuwe realisatie van 51° noord, een Gentse speler die zich weet te 
onderscheiden en staat voor ¨duurzaamheid§, ¨doordachte vormgeving§ en ¨sfeer§!Deze residentie 
situeert zich in de Tenderstraat en is de uitstekende uitvalsbasis voor wie dicht bij de stad wil wonen, 
maar tezelfdertijd bereikbaar wil blijven ( trein/ tram/ bus/ auto). De appartementen zijn instapklaar 
en kwalitatief gerenoveerd met extra aandacht voor esthetiek en isolatie met lage epc scores als gevolg. 
APP 001: € VERKOCHT (EPC 151) APP 101: € 450.000 (EPC 100)APP 201: € 460.000 (EPC 91)APP 301: € 470.000 (EPC 156).
Het project omvat een hoekpand bestaande uit 4 appartementen met één entiteit per niveau. 
Extra troef zijn de lage beheerskosten door het beperkte aantal entiteiten en de zeer ruime privatieve kelderbergingen!
Ieder appartement beschikt over 3 slaapkamers en is een beleving op zich dankzij de stijl, de ruimtelijkheid en de prachtige lichtinval!
(EK conform, aparte tellers en meters, aandeel kosten opmaak basisakte en landmeter ten laste van de koper)', 2, now(), now(), 0);
INSERT INTO Afbeeldingen (url, createdAt, updatedAt, pandId) VALUES ('https://static.immoweb.be/photos/1/0/5/7/8/1/1/2/10578112_C.jpg?cache=20230520001349', now(), now(), 1);
INSERT INTO Afbeeldingen (url, createdAt, updatedAt, pandId) VALUES ('https://static.immoweb.be/photos/1/0/5/7/8/1/1/2/10578112_1.jpg?cache=20230520001348', now(), now(), 1);
INSERT INTO Afbeeldingen (url, createdAt, updatedAt, pandId) VALUES ('https://static.immoweb.be/photos/1/0/5/7/8/1/1/2/10578112_2.jpg?cache=20230520001348', now(), now(), 1);
INSERT INTO Afbeeldingen (url, createdAt, updatedAt, pandId) VALUES ('https://static.immoweb.be/photos/1/0/5/7/8/1/1/2/10578112_3.jpg?cache=20230520001348', now(), now(), 1);

-- Regio
INSERT INTO Regio (naam, createdAt, updatedAT) VALUES ('Gent', now(), now());
INSERT INTO Regio (naam, createdAt, updatedAT) VALUES ('Waasland', now(), now());
INSERT INTO Regio (naam, createdAt, updatedAT) VALUES ('Antwerpen', now(), now());

-- PandRegio
INSERT INTO PandRegio (pandId, regioId) VALUES (1, 1);