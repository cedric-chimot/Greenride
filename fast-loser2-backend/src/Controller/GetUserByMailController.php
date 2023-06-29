<?php

namespace App\Controller;

use App\Entity\Trajet;
use App\Entity\UserTrajet;
use App\Entity\User;
use App\Entity\Annonces;
use App\Entity\Notification;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Repository\CarRepository;
use App\Repository\TrajetRepository;
use App\Repository\AlertRepository;
use App\Repository\UserTrajetRepository;
use App\Repository\CommentRepository;
use App\Repository\ContactRepository;
use App\Repository\AnnoncesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use App\Repository\ChatRepository;
use App\Repository\MessageChatRepository;
use App\Repository\NotificationRepository;

class GetUserByMailController extends AbstractController
{
    #[Route('/get/user_by_email/{name}/{domain}/{ext}', name: 'app_get_user_by_mail')]
    public function getUserByMail(string $name, $domain, $ext, UserRepository $UserRepo): Response
    {
        $email = $name . "@" . $domain . "." . $ext;

        return $this->json($UserRepo->findBy(array('email' => $email)));
    }

    #[Route('/user/check-email/{email}', name: "check-email")]
    public function checkEmail(UserRepository $userRepo, string $email): Response
    {
        $user = $userRepo->findBy(array('email' => $email));
        if (count($user) > 0) {
            return $this->json(true);
        }
        return $this->json(false);
    }

    #[Route('/get/reservation/{idTrajet}/{idUser}', name: 'app_get_reservation_by_both_id')]
    public function getReservationByBothId(int $idTrajet, $idUser, UserTrajetRepository $UserTrajetRepo): Response
    {
        return $this->json($UserTrajetRepo->findOneBy(array('id_user' => $idUser, 'id_trajet' => $idTrajet)));
    }

    #[Route('/get/reservations/{idUser}', name: 'app_get_reservations_by_user_id')]
    public function getReservationsByUserId(int $idUser, UserTrajetRepository $UserTrajetRepo): Response
    {
        return $this->json($UserTrajetRepo->findBy(array('id_user' => $idUser)));
    }

    #[Route('/get/notifications/{idUser}', name: 'app_get_notifications_by_user_id')]
    public function getNotificationsByUserId(int $idUser, NotificationRepository $NotifRepo): Response
    {
        return $this->json($NotifRepo->findBy(array('user_id' => $idUser), array('id' => 'DESC')));
    }

    #[Route('/get/comments/{id}', name: 'app_get_comments_by_trajet_id')]
    public function getCommentsById(int $id, CommentRepository $CommentRepo): Response
    {
        return $this->json($CommentRepo->findBy(array('rated_user_id' => $id)));
    }

    #[Route('/get/cars/{idUser}', name: 'app_get_cars_by_user')]
    public function getCarByUser(int $idUser, CarRepository $CarRepo): Response
    {
        return $this->json($CarRepo->findOneBy(array('id_user' => $idUser)));
    }

    #[Route('/get/contact/{id}', name: 'app_get_contact')]
    public function getContact(int $id, ContactRepository $ContactRepo): Response
    {
        return $this->json($ContactRepo->findBy(array('id' => $id)));
    }

    #[Route('/get/trajets/{idUser}', name: 'app_get_trajets_by_user')]
    public function getTrajetByUser(int $idUser, TrajetRepository $TrajetRepo): Response
    {
        return $this->json($TrajetRepo->findBy(array('id_account' => $idUser), array('id' => 'DESC')));
    }

    #[Route('/get/user_admin', name: 'app_get_user_admin')]
    public function getUserAdmin(UserRepository $userRepository): Response
    {
        $users = $userRepository->findAll();
        $result = array();
        foreach ($users as $user) {
            if ($user->getRoles()[0] == "ROLE_ADMIN") {
                array_push($result, $user);
            }
        }
        return $this->json($result);
    }

    #[Route('/get/user_user', name: 'app_get_user_utilisateur')]
    public function getUserUtilisateur(UserRepository $userRepository): Response
    {
        $users = $userRepository->findAll();
        $result = array();
        foreach ($users as $user) {
            if ($user->getRoles()[0] == "ROLE_USER") {
                array_push($result, $user);
            }
        }
        return $this->json($result);
    }

    #[Route('/warn/{value}/{id}', name: 'warn_by_user_id')]
    public function warnByUserId(string $id, string $value, EntityManagerInterface $entityManager): Response
    {
        $user = $entityManager->getRepository(User::class)->find($id);
        $user->setAvertissements($value);
        $entityManager->flush();

        return $this->json($user);
    }

    #[Route('/post/reservation', name: 'app_post_reservation', methods: ['POST'])]
    public function insertReservation(Request $request, EntityManagerInterface $em, UserRepository $UserRepo, TrajetRepository $TrajetRepo): JsonResponse
    {
        $content = $request->getContent();
        $jsonParse = json_decode($content, true);

        try {
            $reservation = new UserTrajet();
            $reservation->setTrajetId($TrajetRepo->findOneBy(array('id' => $jsonParse["trajetId"])));
            $reservation->setUserId($UserRepo->findOneBy(array('id' => $jsonParse["userId"])));
            $reservation->setIsValidate($jsonParse["isValidate"]);

            $em->persist($reservation);
            $em->flush();

            return $this->json($reservation, 201, []);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/put/validate_reservation', name: 'app_put_validate_reservation', methods: ['PUT'])]
    public function putValidateReservation(Request $request, EntityManagerInterface $em, UserTrajetRepository $UserTrajetRepo, TrajetRepository $TrajetRepo): JsonResponse
    {
        $content = $request->getContent();
        $jsonParse = json_decode($content, true);
        try {
            $reservation = $UserTrajetRepo->findOneBy(array('id_user' => $jsonParse["userId"], 'id_trajet' => $jsonParse["trajetId"]));
            $reservation->setIsValidate(true);

            $trajet = $TrajetRepo->find($jsonParse["trajetId"]);
            $trajet->setPlaces($trajet->getPlaces() - 1);

            $em->persist($reservation, $trajet);
            $em->flush();

            return $this->json($reservation, 201, []);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/put/notifications_lu/{idUser}/{typeRequest}', name: 'app_put_notifications_lu', methods: ['GET'])]
    public function putNotificationsLu(int $idUser, string $typeRequest, EntityManagerInterface $em, NotificationRepository $NotifRepo): JsonResponse
    {
        try {
            $notifs = $NotifRepo->findBy(array('user_id' => $idUser));
            if ($typeRequest == "notifications") {
                foreach ($notifs as $notif) {
                    if ($notif->getType() != "message-chat") {
                        $notif->setLu(true);
                        $em->persist($notif);
                    }
                }
            } else if ($typeRequest == "chat") {
                foreach ($notifs as $notif) {
                    if ($notif->getType() == "message-chat") {
                        $notif->setLu(true);
                        $em->persist($notif);
                    }
                }
            }
            $em->flush();

            return $this->json('ok', 201, []);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/post/reservations_by_trajets_id', name: 'app_post_reservations_by_trajets_id', methods: ['POST'])]
    public function getReservationsByTrajetsId(Request $request, UserTrajetRepository $UserTrajetRepo): JsonResponse
    {
        $content = $request->getContent();
        $jsonParse = json_decode($content, true);
        $trajetsId = array();
        $response = array();
        foreach ($jsonParse as $trajet) {
            array_push($trajetsId, $trajet["id"]);
        }
        foreach ($trajetsId as $id) {
            $trajetReservations = $UserTrajetRepo->findBy(array('id_trajet' => $id));
            foreach ($trajetReservations as $reservation) {
                array_push($response, $reservation);
            }
        }
        return $this->json($response);
    }

    #[Route('/delete/reservation/{idTrajet}/{idUser}', name: 'app_delete_reservation', methods: ['DELETE'])]
    public function deleteReservation(int $idTrajet, $idUser, EntityManagerInterface $em, UserTrajetRepository $UserTrajetRepo, TrajetRepository $TrajetRepo): JsonResponse
    {
        try {
            $reservation = $UserTrajetRepo->findOneBy(array('id_user' => $idUser, 'id_trajet' => $idTrajet));
            $trajet = $TrajetRepo->find($idTrajet);
            $trajet->setPlaces($trajet->getPlaces() + 1);
            $em->persist($trajet);
            $em->remove($reservation);
            $em->flush();

            return $this->json($reservation, 201, []);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/get/chat_by_user_id/{id}', name: 'app_get_chat_by_user_id')]
    public function getChatByUserId(string $id, ChatRepository $chatRepo): Response
    {
        $user = $this->json($chatRepo->findChatById($id));

        return $user;
    }

    #[Route('/get/messages_by_chat_id/{id}', name: 'app_get_messages_by_chat_id')]
    public function getMessagesByChatId(string $id, MessageChatRepository $messagesRepo): Response
    {
        $messages = $this->json($messagesRepo->findMessagesByChatId($id));

        return $messages;
    }

    #[Route('/get/alerts_by_user_id/{id}', name: 'alertsByUser')]
    public function getAlertsByUserId(string $id, AlertRepository $alertRepo): Response
    {
        $alerts = $alertRepo->findby(['user_signal' => $id]);

        return $this->json($alerts);
    }

    #[Route('/get/cars_by_user_id/{id}', name: 'carsByUser')]
    public function getCarsByUserId(string $id, CarRepository $carRepo): Response
    {
        $cars = $carRepo->findby(['id_user' => $id]);

        return $this->json($cars);
    }

    #[Route('/delete/ride_and_alerts_by_ride_id/{id}', name: 'app_get_alerts_by_ride_id')]
    public function getAlertsByRideId(string $id, AlertRepository $alertRepo, TrajetRepository $trajet, EntityManagerInterface $em): Response
    {

        $alerts = $alertRepo->findBy(['trajet' => $id]);
        for ($i = 0; $i < count($alerts); $i++) {
            $em->remove($alerts[$i]);
            $em->flush();
        }

        $ride = $trajet->find($id);
        $em->remove($ride);

        return $this->json($alerts);
    }

    #[Route('/get/comments_by_user_id/{id}', name: 'app_get_alerts_by_user_id')]
    public function getRatesByUserId(string $id, CommentRepository $comment, EntityManagerInterface $entityManager): Response
    {
        $rates = $comment->findBy(['rated_user_id' => $id]);

        return $this->json($rates);
    }

    #[Route('/ban/{date}/{id}', name: 'ban_by_user_id')]
    public function banByUserId(string $id, string $date, EntityManagerInterface $entityManager): Response
    {
        $user = $entityManager->getRepository(User::class)->find($id);
        $user->setDateUnban($date);
        $entityManager->flush();

        return $this->json($user->getDateUnban());
    }

    #[Route('/sellTokens/{vendeur}/{acheteur}/{nbTokens}/{annonce_id}/{date}', name: 'sellTokens')]
    public function sellTokens(string $vendeur, string $acheteur, int $nbTokens, string $annonce_id, string $date, EntityManagerInterface $entityManager): Response
    {
        $vendeur = $entityManager->getRepository(User::class)->find($vendeur);
        $acheteur = $entityManager->getRepository(User::class)->find($acheteur);
        $annonce = $entityManager->getRepository(Annonces::class)->find($annonce_id);
        $annonce->setAcheteur($acheteur);
        $annonce->setDateAchat($date);
        $annonce->setStatut('termine');
        $acheteurTokens = $acheteur->getTokens();
        $acheteur->setTokens($acheteurTokens + $nbTokens);
        $entityManager->flush();

        return $this->json(array($acheteur, $vendeur, $annonce));
    }

    #[Route('/calcTokens/{action}/{vendeurId}/{nbTokens}', name: 'calcTokens')]
    public function calcTokens(string $vendeurId, int $nbTokens, string $action, EntityManagerInterface $entityManager): Response
    {
        $vendeur = $entityManager->getRepository(User::class)->find($vendeurId);
        $vendeurTokens = $vendeur->getTokens();
        if ($action === 'add') {
            $vendeur->setTokens($vendeurTokens + $nbTokens);
        } else {
            $vendeur->setTokens($vendeurTokens - $nbTokens);
        }

        $entityManager->flush();

        return $this->json(array($vendeur));
    }

    #[Route('/get/annonces_by_user_id/{id}', name: 'annoncesByUser')]
    public function annoncesByUser(string $id, AnnoncesRepository $annoncesRepo): Response
    {
        $annonces = $annoncesRepo->findby(['vendeur' => $id]);

        return $this->json($annonces);
    }
}
