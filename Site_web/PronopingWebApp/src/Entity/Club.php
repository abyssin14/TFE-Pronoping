<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ClubRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=ClubRepository::class)
 * @ApiResource(
 *     attributes={"security"="is_granted('ROLE_USER')"},
 *     normalizationContext={"groups"={"club:read"}},
 *     denormalizationContext={"groups"={"club:write"}}
 * )
 */
class Club
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"equipe:read", "equipe:write", "joueur:read", "joueur:write", "club:read", "club:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *@Groups({"equipe:read", "joueur:read", "club:read", "club:write"})
     */
    private $nom;


    /**
     * @ORM\OneToMany(targetEntity=Equipe::class, mappedBy="club")
     * @Groups({"club:read", "club:write"})
     */
    private $equipes;

    /**
     * @ORM\OneToMany(targetEntity=Joueur::class, mappedBy="club")
     * @Groups({"club:read", "club:write"})
     */
    private $joueurs;

    /**
     * @ORM\Column(type="array", nullable=false)
     * @Groups({"joueur:read", "club:read", "club:write"})
     */
    private $listMatricules;

    public function __construct()
    {
        $this->listMatricules = new ArrayCollection();
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

    public function getListMatricules(): ?array
    {
        return $this->listMatricules;
    }

    public function setListMatricules(?array $listMatricules): self
    {
        $this->listMatricules = $listMatricules;

        return $this;
    }
}
