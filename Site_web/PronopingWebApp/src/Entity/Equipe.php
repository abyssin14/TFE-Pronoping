<?php

namespace App\Entity;

use App\Repository\EquipeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=EquipeRepository::class)
 * @ApiResource(
 *     normalizationContext={"groups"={"equipe:read"}},
 *     denormalizationContext={"groups"={"equipe:write"}}
 *     )
 */

class Equipe
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("club:read")
     * @Groups({"equipe:read", "equipe:write", "club:read", "club:write", "rencontre:read", "rencontre:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"equipe:read", "equipe:write", "club:read", "club:write", "rencontre:read"})
     */
    private $nom;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"equipe:read", "equipe:write", "club:read", "club:write", "rencontre:read"})
     */
    private $division;

    /**
     * @ORM\ManyToOne(targetEntity=Club::class, inversedBy="equipes")
     * @Groups({"equipe:read", "equipe:write"})
     */
    private $club;

    /**
     * @ORM\OneToMany(targetEntity=Rencontre::class, mappedBy="equipe")
     * @Groups({"equipe:read", "equipe:write"})
     */
    private $rencontres;

    public function __construct()
    {
        $this->rencontres = new ArrayCollection();
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

    public function getDivision(): ?int
    {
        return $this->division;
    }

    public function setDivision(int $division): self
    {
        $this->division = $division;

        return $this;
    }

    public function getClub(): ?Club
    {
        return $this->club;
    }

    public function setClub(?Club $club): self
    {
        $this->club = $club;

        return $this;
    }

    /**
     * @return Collection|Rencontre[]
     */
    public function getRencontres(): Collection
    {
        return $this->rencontres;
    }

    public function addRencontre(Rencontre $rencontre): self
    {
        if (!$this->rencontres->contains($rencontre)) {
            $this->rencontres[] = $rencontre;
            $rencontre->setEquipe($this);
        }

        return $this;
    }

    public function removeRencontre(Rencontre $rencontre): self
    {
        if ($this->rencontres->removeElement($rencontre)) {
            // set the owning side to null (unless already changed)
            if ($rencontre->getEquipe() === $this) {
                $rencontre->setEquipe(null);
            }
        }

        return $this;
    }
}
