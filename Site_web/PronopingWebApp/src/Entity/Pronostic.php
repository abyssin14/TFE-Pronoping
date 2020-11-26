<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PronosticRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PronosticRepository::class)
 * @ApiResource(
 *     normalizationContext={"groups"={"pronostic:read"}},
 *     denormalizationContext={"groups"={"pronostic:write"}}
 *     )
 */
class Pronostic
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"pronostic:read", "pronostic:write", "joueur:read", "joueur:write", "rencontre:read", "equipe:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"pronostic:read", "pronostic:write", "joueur:read", "joueur:write", "rencontre:read", "equipe:read"})
     */
    private $pointsRapportes;

    /**
     * @ORM\ManyToOne(targetEntity=Joueur::class, inversedBy="pronostics")
     * @Groups({"pronostic:read", "pronostic:write", "rencontre:read", "equipe:read"})
     */
    private $joueur;

    /**
     * @ORM\ManyToOne(targetEntity=Rencontre::class, inversedBy="pronostics")
     * @Groups({"pronostic:read", "pronostic:write", "joueur:read"})
     */
    private $rencontre;

    /**
     * @ORM\Column(type="array")
     * @Groups({"pronostic:read", "pronostic:write", "joueur:read", "rencontre:read", "equipe:read"})
     */
    private $score = [];

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"pronostic:read", "pronostic:write", "joueur:read", "joueur:write", "rencontre:read", "equipe:read"})
     */
    private $isFinished;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPointsRapportes(): ?int
    {
        return $this->pointsRapportes;
    }

    public function setPointsRapportes(?int $pointsRapportes): self
    {
        $this->pointsRapportes = $pointsRapportes;

        return $this;
    }

    public function getJoueur(): ?Joueur
    {
        return $this->joueur;
    }

    public function setJoueur(?Joueur $joueur): self
    {
        $this->joueur = $joueur;

        return $this;
    }

    public function getRencontre(): ?Rencontre
    {
        return $this->rencontre;
    }

    public function setRencontre(?Rencontre $rencontre): self
    {
        $this->rencontre = $rencontre;

        return $this;
    }

    public function getScore(): ?array
    {
        return $this->score;
    }

    public function setScore(array $score): self
    {
        $this->score = $score;

        return $this;
    }

    public function getIsFinished(): ?bool
    {
        return $this->isFinished;
    }

    public function setIsFinished(bool $isFinished): self
    {
        $this->isFinished = $isFinished;

        return $this;
    }
}
