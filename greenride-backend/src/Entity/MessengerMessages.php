<?php

namespace App\Entity;

use App\Repository\MessengerMessagesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MessengerMessagesRepository::class)]
class MessengerMessages
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $body = null;

    #[ORM\Column(length: 255)]
    private ?string $headers = null;

    #[ORM\Column(length: 190)]
    private ?string $queue_name = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $available_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $delivered_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBody(): ?string
    {
        return $this->body;
    }

    public function setBody(string $body): self
    {
        $this->body = $body;

        return $this;
    }

    public function getHeaders(): ?string
    {
        return $this->headers;
    }

    public function setHeaders(string $headers): self
    {
        $this->headers = $headers;

        return $this;
    }

    public function getQueueName(): ?string
    {
        return $this->queue_name;
    }

    public function setQueueName(string $queue_name): self
    {
        $this->queue_name = $queue_name;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getAvailableAt(): ?\DateTimeInterface
    {
        return $this->available_at;
    }

    public function setAvailableAt(\DateTimeInterface $available_at): self
    {
        $this->available_at = $available_at;

        return $this;
    }

    public function getDeliveredAt(): ?\DateTimeInterface
    {
        return $this->delivered_at;
    }

    public function setDeliveredAt(\DateTimeInterface $delivered_at): self
    {
        $this->delivered_at = $delivered_at;

        return $this;
    }
}
