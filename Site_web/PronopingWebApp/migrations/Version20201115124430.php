<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201115124430 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE equipe DROP adversaire, DROP score');
        $this->addSql('ALTER TABLE pronostic DROP FOREIGN KEY FK_E64BDCDE6D861B89');
        $this->addSql('DROP INDEX IDX_E64BDCDE6D861B89 ON pronostic');
        $this->addSql('ALTER TABLE pronostic DROP equipe_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE equipe ADD adversaire VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, ADD score VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE pronostic ADD equipe_id INT NOT NULL');
        $this->addSql('ALTER TABLE pronostic ADD CONSTRAINT FK_E64BDCDE6D861B89 FOREIGN KEY (equipe_id) REFERENCES equipe (id)');
        $this->addSql('CREATE INDEX IDX_E64BDCDE6D861B89 ON pronostic (equipe_id)');
    }
}
