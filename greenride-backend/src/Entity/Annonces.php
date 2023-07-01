<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AnnoncesRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AnnoncesRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['annonces']])]
class Annonces
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['annonces'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'annonces')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['annonces'])]
    private ?User $vendeur = null;

    #[ORM\Column]
    #[Groups(['annonces'])]
    private ?int $nb_tokens = null;

    #[ORM\Column]
    #[Groups(['annonces'])]
    private ?int $montant = null;

    #[ORM\Column(length: 10)]
    #[Groups(['annonces'])]
    private ?string $date = null;

    #[ORM\Column(length: 20)]
    #[Groups(['annonces'])]
    private ?string $statut = null;

    #[ORM\ManyToOne(inversedBy: 'transaction')]
    #[Groups(['annonces'])]
    private ?User $acheteur = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['annonces'])]
    private ?string $date_achat = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVendeur(): ?User
    {
        return $this->vendeur;
    }

    public function setVendeur(?User $vendeur): self
    {
        $this->vendeur = $vendeur;

        return $this;
    }

    public function getNbTokens(): ?int
    {
        return $this->nb_tokens;
    }

    public function setNbTokens(int $nb_tokens): self
    {
        $this->nb_tokens = $nb_tokens;

        return $this;
    }

    public function getMontant(): ?int
    {
        return $this->montant;
    }

    public function setMontant(int $montant): self
    {
        $this->montant = $montant;

        return $this;
    }

    public function getDate(): ?string
    {
        return $this->date;
    }

    public function setDate(string $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): self
    {
        $this->statut = $statut;

        return $this;
    }

    public function getAcheteur(): ?User
    {
        return $this->acheteur;
    }

    public function setAcheteur(?User $acheteur): self
    {
        $this->acheteur = $acheteur;

        return $this;
    }

    public function getDateAchat(): ?string
    {
        return $this->date_achat;
    }

    public function setDateAchat(?string $date_achat): self
    {
        $this->date_achat = $date_achat;

        return $this;
    }
}
