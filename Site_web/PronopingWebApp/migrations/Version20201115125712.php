<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201115125712 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `match` (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rencontre (id INT AUTO_INCREMENT NOT NULL, equipe_id INT NOT NULL, date DATE NOT NULL, list_joueurs LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', adversaire VARCHAR(255) NOT NULL, score VARCHAR(255) DEFAULT NULL, INDEX IDX_460C35ED6D861B89 (equipe_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE rencontre ADD CONSTRAINT FK_460C35ED6D861B89 FOREIGN KEY (equipe_id) REFERENCES equipe (id)');
        $this->addSql('ALTER TABLE pronostic ADD rencontre_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE pronostic ADD CONSTRAINT FK_E64BDCDE6CFC0818 FOREIGN KEY (rencontre_id) REFERENCES rencontre (id)');
        $this->addSql('CREATE INDEX IDX_E64BDCDE6CFC0818 ON pronostic (rencontre_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE pronostic DROP FOREIGN KEY FK_E64BDCDE6CFC0818');
        $this->addSql('DROP TABLE `match`');
        $this->addSql('DROP TABLE rencontre');
        $this->addSql('DROP INDEX IDX_E64BDCDE6CFC0818 ON pronostic');
        $this->addSql('ALTER TABLE pronostic DROP rencontre_id');
    }
}
