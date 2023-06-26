<?php

namespace App\Entity;

use App\Repository\UserTrajetRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserTrajetRepository::class)]
class UserTrajet
{  
    #[ORM\Id]
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false, name: "id_trajet")]
    private ?Trajet $id_trajet = null;

    #[ORM\Id]
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false, name: "id_user")]
    private ?User $id_user = null;


    #[ORM\Column]
    private ?bool $is_validate = null;
    
    
    public function getUserId(): ?User
    {
        return $this->id_user;
    }

    public function setUserId(?User $id_user): self
    {
        $this->id_user = $id_user;

        return $this;
    }

    
    public function getTrajetId(): ?Trajet
    {
        return $this->id_trajet;
    }

    public function setTrajetId(?Trajet $id_trajet): self
    {
        $this->id_trajet = $id_trajet;

        return $this;
    }


    public function isIsValidate(): ?bool
    {
        return $this->is_validate;
    }

    public function setIsValidate(bool $is_validate): self
    {
        $this->is_validate = $is_validate;

        return $this;
    }
}
