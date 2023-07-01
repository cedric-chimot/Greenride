<?php

namespace App\Entity;

use App\Repository\ChatRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: ChatRepository::class)]
#[ApiResource]
class Chat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 10)]
    
    private ?string $date = null;

    #[ORM\Column]
    private ?int $id_user_1 = null;

    #[ORM\Column]
    private ?int $id_user_2 = null;


    public function getId(): ?int
    {
        return $this->id;
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

    public function getIdUser1(): ?int
    {
        return $this->id_user_1;
    }

    public function setIdUser1(int $id_user_1): self
    {
        $this->id_user_1 = $id_user_1;

        return $this;
    }

    public function getIdUser2(): ?int
    {
        return $this->id_user_2;
    }

    public function setIdUser2(int $id_user_2): self
    {
        $this->id_user_2 = $id_user_2;

        return $this;
    }



}
