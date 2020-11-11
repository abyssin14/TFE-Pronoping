<?php

namespace App\Entity;

use App\Repository\ClubRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ClubRepository::class)
 */
class Club
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
    private $nom;


    /**
     * @ORM\OneToMany(targetEntity=Equipe::class, mappedBy="club")
     */
    private $equipes;

    /**
     * @ORM\OneToMany(targetEntity=Joueur::class, mappedBy="club")
     */
    private $joueurs;

    public function __construct()
    {
        $this->equipes = new ArrayCollection();
        $this->joueurs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * @return Collection|Equipe[]
     */
    public function getEquipes(): Collection
    {
        return $this->equipes;
    }

    public function addEquipe(Equipe $equipe): self
    {
        if (!$this->equipes->contains($equipe)) {
            $this->equipes[] = $equipe;
            $equipe->setClub($this);
        }

        return $this;
    }

    public function removeEquipe(Equipe $equipe): self
    {
        if ($this->equipes->removeElement($equipe)) {
            // set the owning side to null (unless already changed)
            if ($equipe->getClub() === $this) {
                $equipe->setClub(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Joueur[]
     */
    public function getJoueurs(): Collection
    {
        return $this->joueurs;
    }

    public function addJoueur(Joueur $joueur): self
    {
        if (!$this->joueurs->contains($joueur)) {
            $this->joueurs[] = $joueur;
            $joueur->setClub($this);
        }

        return $this;
    }

    public function removeJoueur(Joueur $joueur): self
    {
        if ($this->joueurs->removeElement($joueur)) {
            // set the owning side to null (unless already changed)
            if ($joueur->getClub() === $this) {
                $joueur->setClub(null);
            }
        }

        return $this;
    }
}
