-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 26 juil. 2021 à 23:09
-- Version du serveur : 10.3.29-MariaDB-0+deb10u1
-- Version de PHP : 7.3.29-1~deb10u1

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
  `client_id` int(11) NOT NULL,
  `client_lastname` varchar(255) DEFAULT NULL,
  `client_firstname` varchar(255) DEFAULT NULL,
  `client_contact` varchar(255) DEFAULT NULL,
  `client_age` int(11) DEFAULT NULL,
  `client_sexe` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`client_id`, `client_lastname`, `client_firstname`, `client_contact`, `client_age`, `client_sexe`) VALUES
(1, 'Maheriniaina', 'Michaël Jonathan', '034 52 222 58', 21, 'M'),
(4, 'Rakotoarison', 'Ralala', '034 05 555 55', 55, 'M');

-- --------------------------------------------------------

--
-- Structure de la table `commands`
--

CREATE TABLE `commands` (
  `command_id` int(11) NOT NULL,
  `command_client_fk` int(11) NOT NULL,
  `command_date_livraison` datetime DEFAULT NULL,
  `command_evenement` varchar(255) DEFAULT NULL,
  `command_montant_a_compte` int(11) DEFAULT NULL,
  `command_user_fk` int(11) DEFAULT NULL,
  `command_retour_client` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `command_lieu_livraison` varchar(255) DEFAULT NULL,
  `command_type` varchar(20) NOT NULL DEFAULT 'SIMPLE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commands`
--

INSERT INTO `commands` (`command_id`, `command_client_fk`, `command_date_livraison`, `command_evenement`, `command_montant_a_compte`, `command_user_fk`, `command_retour_client`, `created_at`, `updated_at`, `command_lieu_livraison`, `command_type`) VALUES
(3, 1, '2021-07-03 15:39:00', 'Anniversaire', 10000, 2, 'Trop beau', '2021-04-15 01:25:19', '2021-07-26 20:52:13', 'Paris', 'SIMPLE'),
(8, 4, '2021-12-31 20:59:00', 'Anniversaire', 50000, 2, 'test', '2021-07-25 20:10:20', '2021-07-26 21:08:38', 'Antanimena', 'SPECIAL');

-- --------------------------------------------------------

--
-- Structure de la table `gateaux`
--

CREATE TABLE `gateaux` (
  `gateau_id` int(11) NOT NULL,
  `gateau_nb_pax` int(11) DEFAULT NULL,
  `gateau_form_param_fk` int(11) DEFAULT NULL,
  `gateau_decoration` text DEFAULT NULL,
  `gateau_model` varchar(255) DEFAULT NULL,
  `gateau_observation` text DEFAULT NULL,
  `gateau_command_fk` int(11) DEFAULT NULL,
  `gateau_message` varchar(255) DEFAULT NULL,
  `gateau_montant_unitaire` int(11) DEFAULT NULL,
  `gateau_montant_total` int(11) DEFAULT NULL,
  `gateau_type_param_fk` int(11) DEFAULT NULL,
  `gateau_arome_special` varchar(255) DEFAULT NULL,
  `gateau_piece_montee` int(11) DEFAULT NULL,
  `gateau_layercake` int(11) DEFAULT NULL,
  `gateau_dripcake` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `gateaux`
--

INSERT INTO `gateaux` (`gateau_id`, `gateau_nb_pax`, `gateau_form_param_fk`, `gateau_decoration`, `gateau_model`, `gateau_observation`, `gateau_command_fk`, `gateau_message`, `gateau_montant_unitaire`, `gateau_montant_total`, `gateau_type_param_fk`, `gateau_arome_special`, `gateau_piece_montee`, `gateau_layercake`, `gateau_dripcake`) VALUES
(6, 5, 2, 'etts', '', 'sssss', 3, 'qsqsqdss', 4000, 550400, 6, NULL, NULL, NULL, NULL),
(7, 6, 2, 'aaaaa', NULL, 'aaaa', 3, 'aaaa', 0, 90000, 5, NULL, NULL, NULL, NULL),
(10, 5, 1, 'test', 'uploads/command_8/0000000010', 'test', 8, 'test', 5000, 620000, 5, 'arôme test', 5000, 10000, 6000);

-- --------------------------------------------------------

--
-- Structure de la table `param_generals`
--

CREATE TABLE `param_generals` (
  `param_id` int(11) NOT NULL,
  `param_code` varchar(100) DEFAULT NULL,
  `param_description` text DEFAULT NULL,
  `param_ordre` int(11) DEFAULT NULL,
  `param_categories` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `user_id` int(11) NOT NULL,
  `user_lastname` varchar(100) NOT NULL,
  `user_firstname` varchar(100) NOT NULL,
  `user_login` varchar(100) NOT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_group` varchar(50) NOT NULL,
  `user_password` text NOT NULL,
  `user_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `user_lastname`, `user_firstname`, `user_login`, `user_email`, `user_group`, `user_password`, `user_status`) VALUES
(2, 'Admin', 'Admin', 'admin', 'admin_escale@yopmail.com', 'ADMIN', '$2b$10$k89iGeVfurhBD8JQ6P9vQe92ETUk7qyze8HvP2BTrP5Xv28YJz.UW', 'ACTIVE'),
(4, 'Doe', 'John', 'john.doe', 'jd@yopmail.com', 'ADMIN', '$2b$10$t./BG925y7THXx0zHLsXM.H0BZONEzmlUItIh4YLDEVSKkw0yO1Nm', 'ACTIVE'),
(5, 'Opérateur', 'Opérateur', 'operator', 'operator_escale@yopmail.com', 'OPERATOR', '$2b$10$5kuy7orWjkpXOg7hwKN6PuIXNjXk/.4ciNhZB7sa5lKHfsGcpMw3W', 'ACTIVE'),
(7, 'Randria', 'Rondro', 'randria', 'randria@yopmail.com', 'OPERATOR', '$2b$10$lx9emzo3YxiwT3e7HDWZpOcVViFV18/UTCXHKaEFb4zFs834TvEri', 'INACTIVE');

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
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `commands`
--
ALTER TABLE `commands`
  MODIFY `command_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `gateaux`
--
ALTER TABLE `gateaux`
  MODIFY `gateau_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `param_generals`
--
ALTER TABLE `param_generals`
  MODIFY `param_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
