<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201115132711 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE equipe CHANGE club_id club_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE pronostic CHANGE joueur_id joueur_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rencontre CHANGE equipe_id equipe_id INT DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE equipe CHANGE club_id club_id INT NOT NULL');
        $this->addSql('ALTER TABLE pronostic CHANGE joueur_id joueur_id INT NOT NULL');
        $this->addSql('ALTER TABLE rencontre CHANGE equipe_id equipe_id INT NOT NULL');
    }
}
