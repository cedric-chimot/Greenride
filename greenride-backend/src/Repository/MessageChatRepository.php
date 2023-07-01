<?php

namespace App\Repository;

use App\Entity\MessageChat;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MessageChat>
 *
 * @method MessageChat|null find($id, $lockMode = null, $lockVersion = null)
 * @method MessageChat|null findOneBy(array $criteria, array $orderBy = null)
 * @method MessageChat[]    findAll()
 * @method MessageChat[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageChatRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MessageChat::class);
    }

    public function save(MessageChat $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(MessageChat $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findMessagesByChatId($id)
    {
       
        return $this->createQueryBuilder('message_chat')
           ->where('message_chat.id_chat = :id OR message_chat.id_chat = :id' )
           ->setParameter('id', $id)
           ->getQuery()
           ->getResult();
    }

//    /**
//     * @return MessageChat[] Returns an array of MessageChat objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('m.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?MessageChat
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
