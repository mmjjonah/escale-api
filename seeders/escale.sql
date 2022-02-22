-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : mar. 22 fév. 2022 à 08:56
-- Version du serveur : 8.0.27
-- Version de PHP : 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `escale`
--

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `client_id` int NOT NULL,
  `client_lastname` varchar(255) DEFAULT NULL,
  `client_firstname` varchar(255) DEFAULT NULL,
  `client_contact` varchar(255) DEFAULT NULL,
  `client_age` int DEFAULT NULL,
  `client_sexe` char(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`client_id`, `client_lastname`, `client_firstname`, `client_contact`, `client_age`, `client_sexe`, `created_at`, `updated_at`) VALUES
(1, 'Maheriniaina', 'Michaël Jonathan', '034 52 222 58', 21, 'M', NULL, '2021-12-18 18:31:35'),
(4, 'Rakotoarison', 'Ralala', '034 05 555 55', 55, 'M', NULL, NULL),
(6, 'ee', 'rr', 'rr', 6, 'M', '2021-12-19 16:49:55', '2021-12-19 16:49:55'),
(7, 're', 're', 'ree', 6, 'M', '2021-12-19 17:05:48', '2021-12-19 20:22:04'),
(9, 'aaa', 'aaa', 'zzz', 52, 'M', '2022-01-06 09:44:26', '2022-01-06 09:44:26'),
(10, 'ee', 'aaa', 'ree', 8, 'M', '2022-01-06 09:52:04', '2022-01-06 09:52:04'),
(11, 'aaa', 'aa', 'ree', 5, 'M', '2022-01-06 09:55:21', '2022-01-06 09:55:21');

-- --------------------------------------------------------

--
-- Structure de la table `commands`
--

CREATE TABLE `commands` (
  `command_id` int NOT NULL,
  `command_client_fk` int NOT NULL,
  `command_date_livraison` datetime DEFAULT NULL,
  `command_evenement` varchar(255) DEFAULT NULL,
  `command_montant_a_compte` int DEFAULT NULL,
  `command_montant_reduction` int DEFAULT NULL,
  `command_user_fk` int DEFAULT NULL,
  `command_retour_client` text,
  `command_accessoire` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `command_lieu_livraison` varchar(255) DEFAULT NULL,
  `command_type` varchar(20) NOT NULL DEFAULT 'SIMPLE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `commands`
--

INSERT INTO `commands` (`command_id`, `command_client_fk`, `command_date_livraison`, `command_evenement`, `command_montant_a_compte`, `command_montant_reduction`, `command_user_fk`, `command_retour_client`, `command_accessoire`, `created_at`, `updated_at`, `command_lieu_livraison`, `command_type`) VALUES
(3, 1, '2021-07-03 15:39:00', 'Anniversaire', 10000, 0, 2, 'Trop beau', '', '2021-04-15 01:25:19', '2021-12-18 18:31:35', 'Paris', 'SIMPLE'),
(8, 4, '2021-12-31 20:59:00', 'Anniversaire', 50000, 0, 2, 'test', '', '2021-07-25 20:10:20', '2021-07-26 21:08:38', 'Antanimena', 'SPECIAL'),
(10, 7, '2021-12-19 17:04:00', 'ee', 0, 500, 2, NULL, 'tesssx', '2021-12-19 17:05:48', '2021-12-19 20:22:04', '', 'SIMPLE'),
(12, 9, '2022-01-06 09:43:00', 'ee', 0, 0, 2, NULL, '500', '2022-01-06 09:44:26', '2022-01-06 09:44:26', 'aaaaa', 'SIMPLE'),
(13, 10, '2022-01-06 09:51:00', 'ee', 0, 0, 2, NULL, '0', '2022-01-06 09:52:04', '2022-01-06 09:52:04', '', 'SIMPLE'),
(14, 11, '2022-01-06 09:54:00', 'ee', 0, 0, 2, NULL, '0', '2022-01-06 09:55:21', '2022-01-06 09:55:21', '', 'SPECIAL');

-- --------------------------------------------------------

--
-- Structure de la table `gateaux`
--

CREATE TABLE `gateaux` (
  `gateau_id` int NOT NULL,
  `gateau_nb_pax` int DEFAULT NULL,
  `gateau_form_param_fk` int DEFAULT NULL,
  `gateau_decoration` text,
  `gateau_model` varchar(255) DEFAULT NULL,
  `gateau_observation` text,
  `gateau_command_fk` int DEFAULT NULL,
  `gateau_message` varchar(255) DEFAULT NULL,
  `gateau_montant_unitaire` int DEFAULT NULL,
  `gateau_montant_total` int DEFAULT NULL,
  `gateau_type_param_fk` int DEFAULT NULL,
  `gateau_arome_special` varchar(255) DEFAULT NULL,
  `gateau_piece_montee` int DEFAULT NULL,
  `gateau_layercake` int DEFAULT NULL,
  `gateau_dripcake` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `gateaux`
--

INSERT INTO `gateaux` (`gateau_id`, `gateau_nb_pax`, `gateau_form_param_fk`, `gateau_decoration`, `gateau_model`, `gateau_observation`, `gateau_command_fk`, `gateau_message`, `gateau_montant_unitaire`, `gateau_montant_total`, `gateau_type_param_fk`, `gateau_arome_special`, `gateau_piece_montee`, `gateau_layercake`, `gateau_dripcake`, `created_at`, `updated_at`) VALUES
(6, 5, 2, 'etts', 'uploads/command_3/0000000006', 'sssss', 3, 'qsqsqdss', 4000, 550400, 6, NULL, NULL, NULL, NULL, NULL, '2021-12-18 18:31:38'),
(7, 6, 2, 'aaaaa', NULL, 'aaaa', 3, 'aaaa', 0, 90000, 5, NULL, NULL, NULL, NULL, NULL, '2021-12-18 18:31:38'),
(10, 5, 1, 'test', 'uploads/command_8/0000000010', 'test', 8, 'test', 5000, 620000, 5, 'arôme test', 5000, 10000, 6000, NULL, NULL),
(12, 7, 1, 'aa', 'uploads/command_10/0000000012', 'zz', 10, '', 0, 90000, NULL, '', 0, 0, 0, '2021-12-19 20:06:12', '2021-12-19 20:22:04'),
(13, 3, 1, 'aaa', 'uploads/command_null/0000000013', 'aaa', 12, 'aaa', 20000, 80000, 5, 'aaa', 1000, 3000, 50000, '2022-01-06 09:44:26', '2022-01-06 09:44:26'),
(14, 8, 1, 'aa', 'uploads/command_null/0000000014', 'zzz', 13, '', 0, 90000, 5, '', 0, 0, 0, '2022-01-06 09:52:04', '2022-01-06 09:52:04'),
(15, 9, 1, 'eee', 'uploads/command_null/0000000015', 'ttt', 14, '', 0, 70000, 6, '', 0, 0, 0, '2022-01-06 09:55:21', '2022-01-06 09:55:29');

-- --------------------------------------------------------

--
-- Structure de la table `param_generals`
--

CREATE TABLE `param_generals` (
  `param_id` int NOT NULL,
  `param_code` varchar(100) DEFAULT NULL,
  `param_description` text,
  `param_ordre` int DEFAULT NULL,
  `param_categories` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `param_generals`
--

INSERT INTO `param_generals` (`param_id`, `param_code`, `param_description`, `param_ordre`, `param_categories`) VALUES
(1, 'RECTANGLE', 'Rectangle', 1, 'FORME_GATEAU'),
(2, 'TRIANGLE', 'Triangle', 2, 'FORME_GATEAU'),
(3, 'COEUR', 'Coeur', 3, 'FORME_GATEAU'),
(4, 'CREME', 'Crème', 1, 'TYPE_GATEAU'),
(5, 'FRUIT', 'Fruit', 2, 'TYPE_GATEAU'),
(6, 'CHOCOLAT', 'Chocolat', 3, 'TYPE_GATEAU');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_lastname` varchar(100) NOT NULL,
  `user_firstname` varchar(100) NOT NULL,
  `user_login` varchar(100) NOT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_group` varchar(50) NOT NULL,
  `user_password` text NOT NULL,
  `user_status` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `user_lastname`, `user_firstname`, `user_login`, `user_email`, `user_group`, `user_password`, `user_status`, `created_at`, `updated_at`) VALUES
(2, 'Admin', 'Admin', 'admin', 'admin_escale@yopmail.com', 'ADMIN', '$2b$10$k89iGeVfurhBD8JQ6P9vQe92ETUk7qyze8HvP2BTrP5Xv28YJz.UW', 'ACTIVE', NULL, NULL),
(4, 'Doe', 'John', 'john.doe', 'jd@yopmail.com', 'ADMIN', '$2b$10$t./BG925y7THXx0zHLsXM.H0BZONEzmlUItIh4YLDEVSKkw0yO1Nm', 'ACTIVE', NULL, NULL),
(5, 'Opérateur', 'Opérateur', 'operator', 'operator_escale@yopmail.com', 'OPERATOR', '$2b$10$5kuy7orWjkpXOg7hwKN6PuIXNjXk/.4ciNhZB7sa5lKHfsGcpMw3W', 'ACTIVE', NULL, NULL),
(7, 'Randria', 'Rondro', 'randria', 'randria@yopmail.com', 'OPERATOR', '$2b$10$lx9emzo3YxiwT3e7HDWZpOcVViFV18/UTCXHKaEFb4zFs834TvEri', 'INACTIVE', NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Index pour la table `commands`
--
ALTER TABLE `commands`
  ADD PRIMARY KEY (`command_id`),
  ADD KEY `client` (`command_client_fk`),
  ADD KEY `command_user_fk` (`command_user_fk`);

--
-- Index pour la table `gateaux`
--
ALTER TABLE `gateaux`
  ADD PRIMARY KEY (`gateau_id`),
  ADD KEY `gateaux_form_param_fk` (`gateau_form_param_fk`),
  ADD KEY `gateaux_type_param_fk` (`gateau_type_param_fk`),
  ADD KEY `gateaux_command_fk` (`gateau_command_fk`);

--
-- Index pour la table `param_generals`
--
ALTER TABLE `param_generals`
  ADD PRIMARY KEY (`param_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `commands`
--
ALTER TABLE `commands`
  MODIFY `command_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `gateaux`
--
ALTER TABLE `gateaux`
  MODIFY `gateau_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `param_generals`
--
ALTER TABLE `param_generals`
  MODIFY `param_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commands`
--
ALTER TABLE `commands`
  ADD CONSTRAINT `commands_ibfk_1` FOREIGN KEY (`command_client_fk`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `commands_ibfk_2` FOREIGN KEY (`command_user_fk`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `gateaux`
--
ALTER TABLE `gateaux`
  ADD CONSTRAINT `gateaux_command_fk` FOREIGN KEY (`gateau_command_fk`) REFERENCES `commands` (`command_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `gateaux_form_param_fk` FOREIGN KEY (`gateau_form_param_fk`) REFERENCES `param_generals` (`param_id`),
  ADD CONSTRAINT `gateaux_type_param_fk` FOREIGN KEY (`gateau_type_param_fk`) REFERENCES `param_generals` (`param_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
