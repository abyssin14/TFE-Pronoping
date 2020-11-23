<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RencontreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=RencontreRepository::class)
 * @ApiResource(
 *     normalizationContext={"groups"={"rencontre:read"}},
 *     denormalizationContext={"groups"={"rencontre:write"}}
 *     )
 */
class Rencontre
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"rencontre:read", "rencontre:write", "pronostic:read", "pronostic:write", "equipe:read", "equipe:write"})
     */
    private $id;


    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups({"rencontre:read", "rencontre:write", "pronostic:read", "equipe:read", "equipe:write"})
     */
    private $listJoueurs = [];

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"rencontre:read", "rencontre:write", "pronostic:read", "equipe:read", "equipe:write"})
     */
    private $adversaire;

    /**
     * @ORM\OneToMany(targetEntity=Pronostic::class, mappedBy="rencontre")
     * @Groups({"rencontre:read", "rencontre:write"})
     */
    private $pronostics;

    /**
     * @ORM\ManyToOne(targetEntity=Equipe::class, inversedBy="rencontres")
     * @Groups({"rencontre:read", "rencontre:write"})
     */
    private $equipe;

    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups({"rencontre:read", "rencontre:write", "pronostic:read"})
     */
    private $score = [];

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"rencontre:read", "rencontre:write", "pronostic:read", "equipe:read", "equipe:write"})
     */
    private $isFinished;

    public function __construct()
    {
        $this->pronostics = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getListJoueurs(): ?array
    {
        return $this->listJoueurs;
    }

    public function setListJoueurs(?array $listJoueurs): self
    {
        $this->listJoueurs = $listJoueurs;

        return $this;
    }

    public function getAdversaire(): ?string
    {
        return $this->adversaire;
    }

    public function setAdversaire(string $adversaire): self
    {
        $this->adversaire = $adversaire;

        return $this;
    }

    /**
     * @return Collection|Pronostic[]
     */
    public function getPronostics(): Collection
    {
        return $this->pronostics;
    }

    public function addPronostic(Pronostic $pronostic): self
    {
        if (!$this->pronostics->contains($pronostic)) {
            $this->pronostics[] = $pronostic;
            $pronostic->setRencontre($this);
        }

        return $this;
    }

    public function removePronostic(Pronostic $pronostic): self
    {
        if ($this->pronostics->removeElement($pronostic)) {
            // set the owning side to null (unless already changed)
            if ($pronostic->getRencontre() === $this) {
                $pronostic->setRencontre(null);
            }
        }

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

    public function getScore(): ?array
    {
        return $this->score;
    }

    public function setScore(?array $score): self
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
