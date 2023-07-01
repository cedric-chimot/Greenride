<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\State\UserPasswordHasher;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(operations: [
  
    new Post(processor: UserPasswordHasher::class),
    new Put(processor: UserPasswordHasher::class),
    new Patch(processor: UserPasswordHasher::class),
    new Get(normalizationContext: ['groups' => ['user']]),
    new GetCollection(),
    new Delete()
  
])


]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['trajet', 'alert', 'comment','contact', 'annonces', 'music','user'])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['contact','user'])]
    private ?string $email = null;

    #[ORM\Column(type: "json")]
    #[Groups(['user'])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    private ?string $plainPassword = null;

    #[ORM\Column(length: 255)]
    #[Groups(['trajet', 'alert', 'comment','contact', 'annonces','user'])]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    #[Groups(['trajet', 'alert', 'comment','contact', 'annonces','user'])]
    private ?string $prenom = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user'])]
    private ?string $ville = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['user'])]
    private ?int $cp = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user'])]
    private ?string $adresse = null;

    #[ORM\Column]
    #[Groups(['user'])]
    private ?int $tokens = null;
    
    #[ORM\Column(length: 1, nullable: true)]
    #[Groups(['alert','user'])]
    private ?int $avertissements = null;

    #[ORM\Column(length: 10, nullable: true)]
    #[Groups(['user'])]
    private ?string $date_naissance = null;

    #[ORM\Column(length: 24, nullable: true)]
    #[Groups(['user'])]
    private ?string $silence = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['trajet', 'alert', 'comment','contact','user'])]
    private ?string $img_profil = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false, name: "id_music")]
    #[Groups(['user', 'trajet', 'music'])]
    private ?Music $id_music = null;

    #[ORM\Column(length: 1000, nullable: true)]
    #[Groups(['user'])]
    private ?string $description = null;

    #[ORM\Column (nullable: true)]
    #[Groups(['trajet', 'alert', 'comment','user'])]
    private ?string $date_unban = null;

    #[ORM\OneToMany(mappedBy: 'vendeur', targetEntity: Annonces::class)]
    #[Groups(['user'])]
    private Collection $annonces;

    #[ORM\Column(length: 10)]
    #[Groups(['user'])]
    private ?string $date_inscrit = null;

    public function __construct()
    {
        $this->annonces = new ArrayCollection();
        $this->contacts = new ArrayCollection();
        $this->transaction = new ArrayCollection();
    }

    #[ORM\OneToMany(mappedBy: 'id_user', targetEntity: Contact::class, orphanRemoval: true)]
    private Collection $contacts;

    #[ORM\OneToMany(mappedBy: 'acheteur', targetEntity: Annonces::class)]
    private Collection $transaction;

    #[ORM\Column(nullable: true, name: "isGoogleUser")]
    #[Groups(['user'])]
    private ?bool $isGoogleUser = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }
    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(?string $ville): self
    {
        $this->ville = $ville;

        return $this;
    }

    public function getCp(): ?int
    {
        return $this->cp;
    }

    public function setCp(?int $cp): self
    {
        $this->cp = $cp;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getTokens(): ?int
    {
        return $this->tokens;
    }

    public function setTokens(int $tokens): self
    {
        $this->tokens = $tokens;

        return $this;
    }
    public function getAvertissements(): ?int
    {
        return $this->avertissements;
    }

    public function setAvertissements(int $avertissements): self
    {
        $this->avertissements = $avertissements;

        return $this;
    }


    public function getDateNaissance(): ?string
    {
        return $this->date_naissance;
    }

    public function setDateNaissance(?string $date_naissance): self
    {
        $this->date_naissance = $date_naissance;

        return $this;
    }

    public function getSilence(): ?string
    {
        return $this->silence;
    }

    public function setSilence(?string $silence): self
    {
        $this->silence = $silence;

        return $this;
    }

    public function getImgProfil(): ?string
    {
        return $this->img_profil;
    }

    public function setImgProfil(?string $img_profil): self
    {
        $this->img_profil = $img_profil;

        return $this;
    }

     public function getIdMusic(): ?Music
    {
        return $this->id_music;
    }

    public function setIdMusic(?Music $id_music): self
    {
        $this->id_music = $id_music;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getDateUnban(): ?string
    {
        return $this->date_unban;
    }

    public function setDateUnban(string $date_unban): self
    {
        $this->date_unban = $date_unban;

        return $this;
    }

    /**
     * @return Collection<int, Contact>
     */
    public function getContacts(): Collection
    {
        return $this->contacts;
    }

    public function addContact(Contact $contact): self
    {
        if (!$this->contacts->contains($contact)) {
            $this->contacts->add($contact);
            $contact->setIdUser($this);
        }

        return $this;
    }

    public function removeContact(Contact $contact): self
    {
        if ($this->contacts->removeElement($contact)) {
            // set the owning side to null (unless already changed)
            if ($contact->getIdUser() === $this) {
                $contact->setIdUser(null);
            }
        }

        return $this;
    }
 

    /**
     * @return Collection<int, Annonces>
     */
    public function getAnnonces(): Collection
    {
        return $this->annonces;
    }

    public function addAnnonce(Annonces $annonce): self
    {
        if (!$this->annonces->contains($annonce)) {
            $this->annonces->add($annonce);
            $annonce->setVendeur($this);
        }

        return $this;
    }

    public function removeAnnonce(Annonces $annonce): self
    {
        if ($this->annonces->removeElement($annonce)) {
            // set the owning side to null (unless already changed)
            if ($annonce->getVendeur() === $this) {
                $annonce->setVendeur(null);
            }
        }

        return $this;
    }

    public function getDateInscrit(): ?string
    {
        return $this->date_inscrit;
    }

    public function setDateInscrit(string $date_inscrit): self
    {
        $this->date_inscrit = $date_inscrit;

        return $this;
    }

    /**
     * @return Collection<int, Annonces>
     */
    public function getTransaction(): Collection
    {
        return $this->transaction;
    }

    public function addTransaction(Annonces $transaction): self
    {
        if (!$this->transaction->contains($transaction)) {
            $this->transaction->add($transaction);
            $transaction->setAcheteur($this);
        }

        return $this;
    }

    public function removeTransaction(Annonces $transaction): self
    {
        if ($this->transaction->removeElement($transaction)) {
            // set the owning side to null (unless already changed)
            if ($transaction->getAcheteur() === $this) {
                $transaction->setAcheteur(null);
            }
        }

        return $this;
    }

    public function isIsGoogleUser(): ?bool
    {
        return $this->isGoogleUser;
    }

    public function setIsGoogleUser(?bool $isGoogleUser): self
    {
        $this->isGoogleUser = $isGoogleUser;

        return $this;
    }
 
}

