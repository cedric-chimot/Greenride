<?php

namespace App\Controller;

use App\Entity\Notification;
use App\Entity\User;
use App\Repository\TrajetRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

class MercureController extends AbstractController
{
    #[Route('/mercure/post/notification', name: 'mercure_post_notif', methods: ['POST'])]
    public function insertNotification(HubInterface $hub, Request $request, UserRepository $UserRepo, TrajetRepository $TrajetRepo, EntityManagerInterface $em): JsonResponse
    {
        $contentParse = json_decode($request->getContent(), true);
        try {
            $newNotif = new Notification();
            $newNotif->setType($contentParse["data"]["type"]);
            $newNotif->setContent($contentParse["data"]["content"]);
            $newNotif->setLu(false);
            $newNotif->setDate($contentParse["data"]["date"]);
            $newNotif->setUserId($UserRepo->findOneBy(array('id' => $contentParse["data"]["userId"])));
            if ($contentParse["data"]["trajetId"] != null) {
                $newNotif->setTrajetId($TrajetRepo->findOneBy(array('id' => $contentParse["data"]["trajetId"])));
            } else {
                $newNotif->setTrajetId(null);
            }

            $em->persist($newNotif);
            $em->flush();

            $update = new Update(
                $contentParse["topic"],
                json_encode($contentParse["data"])
            );

            $hub->publish($update);

            return $this->json($newNotif, 201, []);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
