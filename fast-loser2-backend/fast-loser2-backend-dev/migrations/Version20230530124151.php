<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230530124151 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE alert (id INT AUTO_INCREMENT NOT NULL, user_plaint INT NOT NULL, user_signal INT NOT NULL, date VARCHAR(255) DEFAULT NULL, commentaire VARCHAR(255) NOT NULL, reason VARCHAR(255) NOT NULL, INDEX IDX_17FD46C1EBFABED6 (user_plaint), INDEX IDX_17FD46C1115E8EC8 (user_signal), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE annonces (id INT AUTO_INCREMENT NOT NULL, vendeur_id INT NOT NULL, acheteur_id INT DEFAULT NULL, nb_tokens INT NOT NULL, montant INT NOT NULL, date VARCHAR(10) NOT NULL, statut VARCHAR(20) NOT NULL, date_achat VARCHAR(255) DEFAULT NULL, INDEX IDX_CB988C6F858C065E (vendeur_id), INDEX IDX_CB988C6F96A7BB5F (acheteur_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE car (id INT AUTO_INCREMENT NOT NULL, id_user INT NOT NULL, brand VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, photos_url VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_773DE69D6B3CA4B (id_user), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE chat (id INT AUTO_INCREMENT NOT NULL, date VARCHAR(10) NOT NULL, id_user_1 INT NOT NULL, id_user_2 INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comment (id INT AUTO_INCREMENT NOT NULL, rating_user_id_id INT NOT NULL, rated_user_id_id INT NOT NULL, rate INT NOT NULL, content VARCHAR(255) NOT NULL, INDEX IDX_9474526C7D700B4B (rating_user_id_id), INDEX IDX_9474526C11B965DB (rated_user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contact (id INT AUTO_INCREMENT NOT NULL, id_user_id INT NOT NULL, message LONGTEXT NOT NULL, date VARCHAR(10) NOT NULL, objet VARCHAR(255) NOT NULL, INDEX IDX_4C62E63879F37AE5 (id_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message_chat (id INT AUTO_INCREMENT NOT NULL, text VARCHAR(255) NOT NULL, id_user INT NOT NULL, id_chat INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id INT AUTO_INCREMENT NOT NULL, body VARCHAR(255) NOT NULL, headers VARCHAR(255) NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL, delivered_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE music (id INT AUTO_INCREMENT NOT NULL, value VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE role (id INT AUTO_INCREMENT NOT NULL, value VARCHAR(24) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE trajet (id INT AUTO_INCREMENT NOT NULL, id_account INT NOT NULL, id_car INT NOT NULL, depart_date VARCHAR(10) NOT NULL, depart_hour VARCHAR(5) NOT NULL, depart VARCHAR(255) NOT NULL, destination VARCHAR(255) NOT NULL, etapes VARCHAR(255) DEFAULT NULL, places INT NOT NULL, bagages_petits INT NOT NULL, bagages_grands INT NOT NULL, notes VARCHAR(255) DEFAULT NULL, INDEX IDX_2B5BA98CA3ABFFD4 (id_account), INDEX IDX_2B5BA98CE9990EC7 (id_car), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, id_music INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, ville VARCHAR(255) DEFAULT NULL, cp INT DEFAULT NULL, adresse VARCHAR(255) DEFAULT NULL, tokens INT NOT NULL, avertissements INT DEFAULT NULL, date_naissance VARCHAR(10) DEFAULT NULL, silence VARCHAR(24) DEFAULT NULL, img_profil VARCHAR(255) DEFAULT NULL, description VARCHAR(1000) DEFAULT NULL, date_unban VARCHAR(255) DEFAULT NULL, date_inscrit VARCHAR(10) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), INDEX IDX_8D93D64923D7637A (id_music), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_trajet (id_trajet INT NOT NULL, id_user INT NOT NULL, is_validate TINYINT(1) NOT NULL, INDEX IDX_4E09B2B1D6C1C61 (id_trajet), INDEX IDX_4E09B2B16B3CA4B (id_user), PRIMARY KEY(id_trajet, id_user)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE alert ADD CONSTRAINT FK_17FD46C1EBFABED6 FOREIGN KEY (user_plaint) REFERENCES user (id)');
        $this->addSql('ALTER TABLE alert ADD CONSTRAINT FK_17FD46C1115E8EC8 FOREIGN KEY (user_signal) REFERENCES user (id)');
        $this->addSql('ALTER TABLE annonces ADD CONSTRAINT FK_CB988C6F858C065E FOREIGN KEY (vendeur_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE annonces ADD CONSTRAINT FK_CB988C6F96A7BB5F FOREIGN KEY (acheteur_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69D6B3CA4B FOREIGN KEY (id_user) REFERENCES user (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C7D700B4B FOREIGN KEY (rating_user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C11B965DB FOREIGN KEY (rated_user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E63879F37AE5 FOREIGN KEY (id_user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE trajet ADD CONSTRAINT FK_2B5BA98CA3ABFFD4 FOREIGN KEY (id_account) REFERENCES user (id)');
        $this->addSql('ALTER TABLE trajet ADD CONSTRAINT FK_2B5BA98CE9990EC7 FOREIGN KEY (id_car) REFERENCES car (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64923D7637A FOREIGN KEY (id_music) REFERENCES music (id)');
        $this->addSql('ALTER TABLE user_trajet ADD CONSTRAINT FK_4E09B2B1D6C1C61 FOREIGN KEY (id_trajet) REFERENCES trajet (id)');
        $this->addSql('ALTER TABLE user_trajet ADD CONSTRAINT FK_4E09B2B16B3CA4B FOREIGN KEY (id_user) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE alert DROP FOREIGN KEY FK_17FD46C1EBFABED6');
        $this->addSql('ALTER TABLE alert DROP FOREIGN KEY FK_17FD46C1115E8EC8');
        $this->addSql('ALTER TABLE annonces DROP FOREIGN KEY FK_CB988C6F858C065E');
        $this->addSql('ALTER TABLE annonces DROP FOREIGN KEY FK_CB988C6F96A7BB5F');
        $this->addSql('ALTER TABLE car DROP FOREIGN KEY FK_773DE69D6B3CA4B');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C7D700B4B');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C11B965DB');
        $this->addSql('ALTER TABLE contact DROP FOREIGN KEY FK_4C62E63879F37AE5');
        $this->addSql('ALTER TABLE trajet DROP FOREIGN KEY FK_2B5BA98CA3ABFFD4');
        $this->addSql('ALTER TABLE trajet DROP FOREIGN KEY FK_2B5BA98CE9990EC7');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64923D7637A');
        $this->addSql('ALTER TABLE user_trajet DROP FOREIGN KEY FK_4E09B2B1D6C1C61');
        $this->addSql('ALTER TABLE user_trajet DROP FOREIGN KEY FK_4E09B2B16B3CA4B');
        $this->addSql('DROP TABLE alert');
        $this->addSql('DROP TABLE annonces');
        $this->addSql('DROP TABLE car');
        $this->addSql('DROP TABLE chat');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE contact');
        $this->addSql('DROP TABLE message_chat');
        $this->addSql('DROP TABLE messenger_messages');
        $this->addSql('DROP TABLE music');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE trajet');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_trajet');
    }
}
