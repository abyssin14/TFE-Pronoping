<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201111131416 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE pronostic DROP FOREIGN KEY FK_E64BDCDEA9E2D76C');
        $this->addSql('DROP TABLE joueur');
        $this->addSql('DROP INDEX IDX_E64BDCDEA9E2D76C ON pronostic');
        $this->addSql('ALTER TABLE pronostic DROP joueur_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE joueur (id INT AUTO_INCREMENT NOT NULL, club_id INT NOT NULL, matricule VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, mail VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, nb_points INT NOT NULL, mot_de_passe VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_FD71A9C561190A32 (club_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE joueur ADD CONSTRAINT FK_FD71A9C561190A32 FOREIGN KEY (club_id) REFERENCES club (id)');
        $this->addSql('ALTER TABLE pronostic ADD joueur_id INT NOT NULL');
        $this->addSql('ALTER TABLE pronostic ADD CONSTRAINT FK_E64BDCDEA9E2D76C FOREIGN KEY (joueur_id) REFERENCES joueur (id)');
        $this->addSql('CREATE INDEX IDX_E64BDCDEA9E2D76C ON pronostic (joueur_id)');
    }
}
