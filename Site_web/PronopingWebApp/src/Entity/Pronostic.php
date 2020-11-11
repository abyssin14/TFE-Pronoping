<?php

namespace App\Entity;

use App\Repository\PronosticRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PronosticRepository::class)
 */
class Pronostic
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $score;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $pointsRapportes;


    /**
     * @ORM\ManyToOne(targetEntity=Equipe::class, inversedBy="pronostics")
     * @ORM\JoinColumn(nullable=false)
     */
    private $equipe;

    /**
     * @ORM\ManyToOne(targetEntity=Joueur::class, inversedBy="pronostics")
     * @ORM\JoinColumn(nullable=false)
     */
    private $joueur;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getScore(): ?string
    {
        return $this->score;
    }

    public function setScore(string $score): self
    {
        $this->score = $score;

        return $this;
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

    public function getEquipe(): ?Equipe
    {
        return $this->equipe;
    }

    public function setEquipe(?Equipe $equipe): self
    {
        $this->equipe = $equipe;

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
}
