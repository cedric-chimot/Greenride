<?php

namespace App\Entity;

use App\Repository\MessageChatRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: MessageChatRepository::class)]
#[ApiResource]
class MessageChat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $text = null;

    #[ORM\Column]
    private ?int $id_user = null;

    #[ORM\Column(nullable: false)]
    private ?int $id_chat = null;



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;

        return $this;
    }

    public function getIdUser(): ?int
    {
        return $this->id_user;
    }

    public function setIdUser(int $id_user): self
    {
        $this->id_user = $id_user;

        return $this;
    }

    public function getIdChat(): ?int
    {
        return $this->id_chat;
    }

    public function setIdChat(?int $id_chat): self
    {
        $this->id_chat = $id_chat;

        return $this;
    }
}
