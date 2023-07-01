<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CommentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CommentRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['comment']])]
class Comment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('comment')]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: false, name: "rating_user_id_id")]
    #[Groups(['comment','alert'])]
    private ?User $rating_user_id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false, name: "rated_user_id_id")]
    #[Groups(['comment','alert'])]
 
    private ?User $rated_user_id = null;

    #[ORM\Column]
    #[Groups(['comment','alert'])]
    private ?int $rate = null;

    #[ORM\Column(length: 255)]
    #[Groups(['comment','alert'])]
    private ?string $content = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRatingUserId(): ?User
    {
        return $this->rating_user_id;
    }

    public function setRatingUserId(?User $rating_user_id): self
    {
        $this->rating_user_id = $rating_user_id;

        return $this;
    }

    public function getRatedUserId(): ?User
    {
        return $this->rated_user_id;
    }

    public function setRatedUserId(?User $rated_user_id): self
    {
        $this->rated_user_id = $rated_user_id;

        return $this;
    }

    public function getRate(): ?int
    {
        return $this->rate;
    }

    public function setRate(int $rate): self
    {
        $this->rate = $rate;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }
}
