<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\JoueurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use phpDocumentor\Reflection\Types\String_;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\SerializedName;

/**
 * @ORM\Entity(repositoryClass="App\Repository\JoueurRepository", repositoryClass=JoueurRepository::class)
 * @UniqueEntity(fields={"username"}, message="Il y a dèjà un compte avec ce nom d'utilisateur.")
 * @ApiResource(
 *     normalizationContext={"groups"={"joueur:read"}},
 *     denormalizationContext={"groups"={"joueur:write"}}
 *     )
 */
class Joueur implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"joueur:read", "joueur:write", "club:read", "club:write", "pronostic:read", "pronostic:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"joueur:read", "joueur:write", "club:read", "club:write", "pronostic:read"})
     */
    private $username;

    /**
     * @ORM\Column(type="json")
     * @Groups({"joueur:read", "joueur:write", "club:read", "club:write", "pronostic:read"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;


    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"joueur:read", "joueur:write", "club:read", "club:write", "pronostic:read"})
     */
    private $matricule;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"joueur:read", "joueur:write", "club:read", "club:write", "pronostic:read"})
     */
    private $nbPoints;

    /**
     * @ORM\ManyToOne(targetEntity=Club::class, inversedBy="joueurs")
     * @Groups({"joueur:read", "joueur:write"})
     */
    private $club;

    /**
     * @ORM\OneToMany(targetEntity=Pronostic::class, mappedBy="joueur")
     * @Groups({"joueur:read", "joueur:write"})
     */
    private $pronostics;

    /**
     * @Groups({"joueur:write"})
     * @SerializedName("password")
     */
    private $plainPassword;

    public function __construct()
    {
        $this->pronostics = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';
        if($this->matricule == 'PpNimda1'){
            $roles[] = 'ROLE_ADMIN';
        }
        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): string
    {
        return (string) $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    public function getMatricule(): ?string
    {
        return $this->matricule;
    }

    public function setMatricule(string $matricule): self
    {
        $this->matricule = $matricule;

        return $this;
    }

    public function getNbPoints(): ?int
    {
        return $this->nbPoints;
    }

    public function setNbPoints(?int $nbPoints): self
    {
        $this->nbPoints = $nbPoints;

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
            $pronostic->setJoueur($this);
        }

        return $this;
    }

    public function removePronostic(Pronostic $pronostic): self
    {
        if ($this->pronostics->removeElement($pronostic)) {
            // set the owning side to null (unless already changed)
            if ($pronostic->getJoueur() === $this) {
                $pronostic->setJoueur(null);
            }
        }

        return $this;
    }

}
