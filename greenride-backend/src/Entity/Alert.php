<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AlertRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AlertRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['alert']])]
class Alert
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('alert')]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups('alert')]
    private ?string $date = null;

    #[ORM\ManyToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false, name: "user_plaint")]
    #[Groups('alert')]
    private ?User $user_plaint = null;

    #[ORM\ManyToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false, name: "user_signal")]
    #[Groups('alert')]
    private ?User $user_signal = null;

    #[ORM\Column(length: 255)]
    #[Groups('alert')]
    private ?string $commentaire = null;

    #[ORM\Column(length: 255)]
    #[Groups('alert')]
    private ?string $reason = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?string
    {
        return $this->date;
    }

    public function setDate(?string $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getUserPlaint(): ?user
    {
        return $this->user_plaint;
    }

    public function setUserPlaint(?user $user_plaint): self
    {
        $this->user_plaint = $user_plaint;

        return $this;
    }

    public function getUserSignal(): ?user
    {
        return $this->user_signal;
    }

    public function setUserSignal(?user $user_signal): self
    {
        $this->user_signal = $user_signal;

        return $this;
    }

    public function getCommentaire(): ?string
    {
        return $this->commentaire;
    }

    public function setCommentaire(string $commentaire): self
    {
        $this->commentaire = $commentaire;

        return $this;
    }

    public function getReason(): ?string
    {
        return $this->reason;
    }

    public function setReason(string $reason): self
    {
        $this->reason = $reason;

        return $this;
    }
}
