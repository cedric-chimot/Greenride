-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 31 mai 2023 à 14:35
-- Version du serveur : 8.0.31
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `greenride`
--

-- --------------------------------------------------------

--
-- Structure de la table `alert`
--

DROP TABLE IF EXISTS `alert`;
CREATE TABLE IF NOT EXISTS `alert` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_plaint` int NOT NULL,
  `user_signal` int NOT NULL,
  `date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `commentaire` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_17FD46C1EBFABED6` (`user_plaint`),
  KEY `IDX_17FD46C1115E8EC8` (`user_signal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `annonces`
--

DROP TABLE IF EXISTS `annonces`;
CREATE TABLE IF NOT EXISTS `annonces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendeur_id` int NOT NULL,
  `acheteur_id` int DEFAULT NULL,
  `nb_tokens` int NOT NULL,
  `montant` int NOT NULL,
  `date` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `statut` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_achat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_CB988C6F858C065E` (`vendeur_id`),
  KEY `IDX_CB988C6F96A7BB5F` (`acheteur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `annonces`
--

INSERT INTO `annonces` (`id`, `vendeur_id`, `acheteur_id`, `nb_tokens`, `montant`, `date`, `statut`, `date_achat`) VALUES
(1, 8, NULL, 200, 20, '31-05-2023', 'En cours', NULL),
(2, 2, NULL, 100, 10, '31-05-2023', 'En cours', NULL),
(3, 2, NULL, 50, 5, '31-05-2023', 'En cours', NULL),
(4, 6, NULL, 50, 5, '31-05-2023', 'En cours', NULL),
(5, 6, NULL, 50, 5, '31-05-2023', 'En cours', NULL),
(6, 6, NULL, 100, 10, '31-05-2023', 'En cours', NULL),
(7, 9, NULL, 100, 10, '31-05-2023', 'En cours', NULL),
(8, 9, NULL, 50, 5, '31-05-2023', 'En cours', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `car`
--

DROP TABLE IF EXISTS `car`;
CREATE TABLE IF NOT EXISTS `car` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photos_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_773DE69D6B3CA4B` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `car`
--

INSERT INTO `car` (`id`, `id_user`, `brand`, `model`, `photos_url`) VALUES
(1, 2, 'Peugeot', '308', '/src/app/assets/img/voitures/peugeot-308.jpg'),
(2, 3, 'Lamborghini', 'Huracan', '/src/app/assets/img/voitures/Lamborghini.jpg'),
(3, 4, 'Renault', 'Twingo 2', '/src/app/assets/img/voitures/twingo2.jpeg'),
(4, 5, 'Audi', 'A3', '/src/app/assets/img/voitures/Audi_a3.jpg,/src/app/assets/img/voitures/audi-a3.jpg,'),
(5, 6, 'Ford', 'Mustang 2019', '/src/app/assets/img/voitures/mustang-2019.jpg'),
(6, 7, 'Dacia', 'Sandero', '/src/app/assets/img/voitures/Dacia_sandero.jpg'),
(7, 8, 'Renault', 'Zoe', '/src/app/assets/img/voitures/renault-zoe.png'),
(8, 9, 'Porshe', '911', '/src/app/assets/img/voitures/S8-modele--porsche-911-type-992.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `chat`
--

DROP TABLE IF EXISTS `chat`;
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_user_1` int NOT NULL,
  `id_user_2` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `chat`
--

INSERT INTO `chat` (`id`, `date`, `id_user_1`, `id_user_2`) VALUES
(1, '31/05/2023', 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating_user_id_id` int NOT NULL,
  `rated_user_id_id` int NOT NULL,
  `rate` int NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_9474526C7D700B4B` (`rating_user_id_id`),
  KEY `IDX_9474526C11B965DB` (`rated_user_id_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user_id` int NOT NULL,
  `message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `objet` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_4C62E63879F37AE5` (`id_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`id`, `id_user_id`, `message`, `date`, `objet`) VALUES
(1, 2, 'Bonjour je suis un nouvel utilisateur :)', '31-05-2023', 'Bonjour');

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
CREATE TABLE IF NOT EXISTS `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20230530124151', '2023-05-30 12:41:55', 639),
('DoctrineMigrations\\Version20230531130003', '2023-05-31 13:00:12', 153);

-- --------------------------------------------------------

--
-- Structure de la table `message_chat`
--

DROP TABLE IF EXISTS `message_chat`;
CREATE TABLE IF NOT EXISTS `message_chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_user` int NOT NULL,
  `id_chat` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `message_chat`
--

INSERT INTO `message_chat` (`id`, `text`, `id_user`, `id_chat`) VALUES
(1, 'Bonjour et bienvenue', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `messenger_messages`
--

DROP TABLE IF EXISTS `messenger_messages`;
CREATE TABLE IF NOT EXISTS `messenger_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `body` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `headers` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue_name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL,
  `delivered_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `music`
--

DROP TABLE IF EXISTS `music`;
CREATE TABLE IF NOT EXISTS `music` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `music`
--

INSERT INTO `music` (`id`, `value`) VALUES
(1, 'Rock'),
(2, 'Rap'),
(3, 'Electro'),
(4, 'Pop'),
(5, 'Country'),
(6, 'Classique'),
(7, 'Tout');

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `trajet_id` int DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lu` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_BF5476CAA76ED395` (`user_id`),
  KEY `IDX_BF5476CAD12A823` (`trajet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `trajet`
--

DROP TABLE IF EXISTS `trajet`;
CREATE TABLE IF NOT EXISTS `trajet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_account` int NOT NULL,
  `id_car` int NOT NULL,
  `depart_date` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `depart_hour` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `depart` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `etapes` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `places` int NOT NULL,
  `bagages_petits` int NOT NULL,
  `bagages_grands` int NOT NULL,
  `notes` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_2B5BA98CA3ABFFD4` (`id_account`),
  KEY `IDX_2B5BA98CE9990EC7` (`id_car`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `trajet`
--

INSERT INTO `trajet` (`id`, `id_account`, `id_car`, `depart_date`, `depart_hour`, `depart`, `destination`, `etapes`, `places`, `bagages_petits`, `bagages_grands`, `notes`) VALUES
(1, 2, 1, '10-06-2023', '12:00', 'Saint-Michel', 'Lille', 'Maubeuge', 4, 2, 1, 'Aller-retour shopping'),
(2, 2, 1, '02-06-2023', '05:00', 'Paris', 'Lille', '', 2, 2, 1, "Voyage d\'affaires pour le travail"),
(3, 2, 1, '05-06-2023', '10:00', 'Paris', 'Lens', 'Lille', 3, 2, 1, 'Voyage pour le travail'),
(4, 2, 1, '02-06-2023', '14:00', 'Lille', 'Valenciennes', '', 2, 1, 1, ''),
(5, 3, 2, '06-06-2023', '06:00', 'Paris', 'Strasbourg', '', 1, 1, 1, 'Je pars en mission ce jour là'),
(6, 3, 2, '14-06-2023', '04:00', 'Paris', 'Lyon', '', 2, 1, 1, ''),
(7, 3, 2, '20-06-2023', '12:00', 'Paris', 'Versailles', '', 2, 1, 1, ''),
(8, 4, 3, '10-06-2023', '10:00', 'Paris', 'Brest', '', 3, 2, 2, 'Captain: Mission Bretagne'),
(9, 4, 3, '03-05-2023', '10:00', 'Paris', 'Berlin', 'Strasbourg', 3, 2, 2, ''),
(10, 5, 4, '02-05-2023', '14:00', 'Lens', 'Lille', '', 3, 2, 2, ''),
(11, 5, 4, '12-05-2023', '12:00', 'Lyon', 'Paris', '', 3, 2, 2, 'Voyage pour le travail'),
(12, 6, 5, '10-05-2023', '10:00', 'Bruxelles', 'Paris', 'Lille', 2, 3, 2, 'Jour de mission'),
(13, 6, 5, '17-05-2023', '11:00', 'Bruxelles', 'Lille', '', 3, 2, 2, ''),
(14, 7, 6, '12-06-2023', '09:00', 'Bruxelles', 'Lille', '', 2, 1, 1, 'Je voyage avec mon chien'),
(15, 8, 7, '13-05-2023', '10:00', 'Paris', 'Lille', '', 3, 3, 2, ''),
(16, 9, 8, '10-05-2023', '14:00', 'Paris', 'Bruxelles', '', 2, 1, 1, ''),
(17, 9, 8, '06-06-2023', '10:00', 'Paris', 'Lille', 'Maubeuge', 1, 1, 2, 'Je voyage léger');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_music` int NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ville` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cp` int DEFAULT NULL,
  `adresse` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tokens` int NOT NULL,
  `avertissements` int DEFAULT NULL,
  `date_naissance` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `silence` varchar(24) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img_profil` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_unban` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_inscrit` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`),
  KEY `IDX_8D93D64923D7637A` (`id_music`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `id_music`, `email`, `roles`, `password`, `nom`, `prenom`, `ville`, `cp`, `adresse`, `tokens`, `avertissements`, `date_naissance`, `silence`, `img_profil`, `description`, `date_unban`, `date_inscrit`) VALUES
(1, 7, 'cedric@gmail.fr', '[\"ROLE_ADMIN\"]', '$2y$13$2KQmnIynxN9wSkRNHhRU5u6UxCTkWo2GaF5TTzv3N.snC2Zu5z5Ga', 'Chimot', 'Cédric', '', 0, '', 50, 0, '', '', 'https://firebasestorage.googleapis.com/v0/b/greenride-fast-loser2.appspot.com/o/images_profil%2Fcedric10%40gmail.fr?alt=media&token=e1d04ba9-6231-41dc-b994-4e1d12a52b93', NULL, NULL, '01-05-2023'),
(2, 1, 'cedric10@gmail.fr', '[\"ROLE_USER\"]', '$2y$13$kaue94/2BFYnQ1ghjA0N9eBwn2QYjMX8LFb2otrvo31flM6HsJRhq', 'Chimot', 'Cédric', 'Paris', 95000, 'rue des Héros', 850, 0, '10-10-2001', 'false', 'https://firebasestorage.googleapis.com/v0/b/greenride-fast-loser2.appspot.com/o/images_profil%2Fcedric10%40gmail.fr?alt=media&token=e1d04ba9-6231-41dc-b994-4e1d12a52b93', 'Bonjour je suis un super héros :)', NULL, '01-05-2023'),
(3, 1, 'tony@gmail.fr', '[\"ROLE_USER\"]', '$2y$13$QRYxeFrZfXTAdjlmCyJGZOuPrgCv0.FvT5FJSNm1CeSG.FBsoXGGa', 'Stark', 'Tony', 'Paris', 75000, '15 rue de la Paix', 800, 0, '16-05-1971', 'false', 'https://firebasestorage.googleapis.com/v0/b/greenride-fast-loser2.appspot.com/o/images_profil%2Fironman%40gmail.fr?alt=media&token=42e2a57b-42db-4d9a-8719-d5f41b3c589f', 'Je suis Iron Man !', NULL, '05-05-2023'),
(4, 5, 'captain@gmail.fr', '[\"ROLE_USER\"]', '$2y$13$MDlHhG38dNaKTDJ5OpzXz.usY2/6.J03/rLLGBrLc5JjKv7XZzYHq', 'Rogers', 'Steve', 'Paris', 75001, 'rue des Héros', 750, 0, '14-05-1916', 'false', 'https://firebasestorage.googleapis.com/v0/b/greenride-fast-loser2.appspot.com/o/images_profil%2Fcaptain%40gmail.fr?alt=media&token=d5e2f588-86f4-46c3-ae4b-7633fdc87541', 'Je suis captain america !', NULL, '05-05-2023'),
(5, 3, 'bruce@gmail.fr', '[\"ROLE_USER\"]', '$2y$13$kcVRvwPDhjBjkfn.8w92ou8Uy.4D177bYXqVJ7KRakqCw9OfsbJyq', 'Banner', 'Bruce', 'Paris', 75000, 'rue des Héros', 750, 0, '12-01-1965', 'false', 'https://firebasestorage.googleapis.com/v0/b/greenride-fast-loser2.appspot.com/o/images_profil%2Ftoto%40gmail.fr?alt=media&token=7ac798f5-bd6a-4a6e-96eb-c175e1e47274', 'Je suis toujours vert', NULL, '01-06-2023'),
(6, 6, 'blake@gmail.fr', '[\"ROLE_USER\"]', '$2y$13$HVmrbhp0lPHxzaf2WSL9XeKJ5s3ZfE1jFrfjenG9sm4wKG/1TjS.i', 'Blake', 'Francis', 'Bruxelles', 95010, 'rue de la BD', 700, 0, '12-12-1912', 'false', 'https://firebasestorage.googleapis.com/v0/b/greenride-fast-loser2.appspot.com/o/images_profil%2Fcedric10%40gmail.fr?alt=media&token=e1d04ba9-6231-41dc-b994-4e1d12a52b93', 'Je suis un espion distingué ;)', NULL, '01-06-2023'),
(7, 7, 'tintin@gmail.fr', '[\"ROLE_USER\"]', '$2y$13$EejRMBg1LjgaU0FCOVNWFOSil21qJMih.TfrAsfJrg.jGIXsjf19a', 'LeBelge', 'Tintin', 'Bruxelles', 95011, 'rue de la BD', 500, 0, '01-05-1923', 'false', 'https://firebasestorage.googleapis.com/v0/b/greenride-fast-loser2.appspot.com/o/images_profil%2Ftoto%40gmail.fr?alt=media&token=7ac798f5-bd6a-4a6e-96eb-c175e1e47274', 'Je voyage avec mon chien', NULL, '01-06-2023'),
(8, 7, 'spidey@gmail.fr', '[\"ROLE_USER\"]', '$2y$13$YjfBFy6yXnaeGHCRk4Mv9u/6PFjMHz4ppfJ7Hkjy3m61kZMi2VNzm', 'Parker', 'Peter', 'Paris', 75000, 'rue des Héros', 600, 0, '12-03-2004', 'false', 'https://firebasestorage.googleapis.com/v0/b/greenride-fast-loser2.appspot.com/o/images_profil%2Fcaptain%40gmail.fr?alt=media&token=d5e2f588-86f4-46c3-ae4b-7633fdc87541', NULL, NULL, '06-05-2023'),
(9, 7, 'luke@gmail.fr', '[\"ROLE_USER\"]', '$2y$13$3emawAjYVyj.uzpWwzAnB.B4q9zkMv10EYxGLSgNhNeoPV0H6HW3G', 'Skywalker', 'Luke', 'Paris', 75000, 'rue de la Paix', 700, 0, '15-06-1977', 'false', 'https://firebasestorage.googleapis.com/v0/b/greenride-fast-loser2.appspot.com/o/images_profil%2Ftoto%40gmail.fr?alt=media&token=7ac798f5-bd6a-4a6e-96eb-c175e1e47274', NULL, NULL, '02-05-2023');

-- --------------------------------------------------------

--
-- Structure de la table `user_trajet`
--

DROP TABLE IF EXISTS `user_trajet`;
CREATE TABLE IF NOT EXISTS `user_trajet` (
  `id_trajet` int NOT NULL,
  `id_user` int NOT NULL,
  `is_validate` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_trajet`,`id_user`),
  KEY `IDX_4E09B2B1D6C1C61` (`id_trajet`),
  KEY `IDX_4E09B2B16B3CA4B` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `alert`
--
ALTER TABLE `alert`
  ADD CONSTRAINT `FK_17FD46C1115E8EC8` FOREIGN KEY (`user_signal`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_17FD46C1EBFABED6` FOREIGN KEY (`user_plaint`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `annonces`
--
ALTER TABLE `annonces`
  ADD CONSTRAINT `FK_CB988C6F858C065E` FOREIGN KEY (`vendeur_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_CB988C6F96A7BB5F` FOREIGN KEY (`acheteur_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `FK_773DE69D6B3CA4B` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_9474526C11B965DB` FOREIGN KEY (`rated_user_id_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_9474526C7D700B4B` FOREIGN KEY (`rating_user_id_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `FK_4C62E63879F37AE5` FOREIGN KEY (`id_user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `FK_BF5476CAA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_BF5476CAD12A823` FOREIGN KEY (`trajet_id`) REFERENCES `trajet` (`id`);

--
-- Contraintes pour la table `trajet`
--
ALTER TABLE `trajet`
  ADD CONSTRAINT `FK_2B5BA98CA3ABFFD4` FOREIGN KEY (`id_account`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_2B5BA98CE9990EC7` FOREIGN KEY (`id_car`) REFERENCES `car` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_8D93D64923D7637A` FOREIGN KEY (`id_music`) REFERENCES `music` (`id`);

--
-- Contraintes pour la table `user_trajet`
--
ALTER TABLE `user_trajet`
  ADD CONSTRAINT `FK_4E09B2B16B3CA4B` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_4E09B2B1D6C1C61` FOREIGN KEY (`id_trajet`) REFERENCES `trajet` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
