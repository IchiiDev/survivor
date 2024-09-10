SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE DATABASE IF NOT EXISTS `survivor`;
USE `survivor`;

CREATE TABLE IF NOT EXISTS `clothes` (
  `id` int NOT NULL,
  `type` varchar(100) NOT NULL,
  `image` varchar(100) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `customers` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `birthdate` varchar(100) DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `astrological_sign` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `employees` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL,
  `work` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `image` varchar(100) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `encounters` (
  `id` int NOT NULL,
  `customer_id` int NOT NULL,
  `date` date NOT NULL,
  `rating` int NOT NULL,
  `comment` text NOT NULL,
  `source` varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS `events` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `duration` int NOT NULL,
  `max_participants` int NOT NULL,
  `location` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `employee_id` int NOT NULL,
  `location_name` varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS `images` (
  `uuid` varchar(100) NOT NULL,
  `scope` varchar(100) NOT NULL,
  `content` mediumblob NOT NULL,
  `format` varchar(10) NOT NULL,
  `filename` varchar(100) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `payments` (
  `id` int NOT NULL,
  `date` date NOT NULL,
  `method` varchar(100) NOT NULL,
  `amount` int NOT NULL,
  `customer_id` int NOT NULL,
  `comment` varchar(100) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `tips` (
  `id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `tip` varchar(1000) NOT NULL
);

ALTER TABLE `clothes`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `encounters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

ALTER TABLE `tips`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `customers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `employees`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `encounters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `events`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `tips`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `clothes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `encounters`
  ADD CONSTRAINT `encounters_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);

ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);
COMMIT;
