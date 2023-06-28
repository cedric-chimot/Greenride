# GREENRIDE - PROJET INCUBATEUR
	
1- Introduction

	
1.1 Qu'est-ce que l'incubateur du numérique


À la suite de ma formation de développeur web, j’ai choisi de rejoindre un dispositif nommé Incubateur du numérique.
Celui-ci permet de mettre en application ce qui a été vu en formation à travers des mises en situation en appliquant les compétences acquises en formation grâce à des projets concrets.
J’ai donc intégré une équipe Agile pour parfaire mes connaissances et gagner en expérience, tout en travaillant dans un environnement semblable au monde de l’entreprise.


1.2 Les missions


Hard skills et expertise technique :


- Travail en mode projet et parrainage
- Accompagnement personnalisé dans le développement de la pratique professionnelle
- Développement du "background" technique au travers de la réalisation de projets professionnels (réalisation d'un projet complet, méthode Agile, immersion professionnelle)
- Accompagnement éventuel pour le passage des certifications (Titre professionnel)
- Retour d'expériences par les professionnels du numérique


Soft skills, posture métier et entretien :


- Coaching
- Technique de recherche d'emploi
- Correction des lacunes et acquisition d'expérience pratique
- Mise en valeur d'une première expérience sur le CV


2- Le projet


Le projet Greenride est un site de covoiturage. Il faisait parti des sujets proposés par les formateurs au début de l'incubateur. Suivant un cahier des charges, il fallait réaliser un site selon les spécificités demandées.
Ici nous devions créer un site permettant la mise en relation de personnes voulant réaliser des trajets en voiture sans transfert d'argent. Le site fonctionne avec un sytème de Tokens, en quelque sorte la "monnaie" du site.
Les utilisateurs inscrits postent des trajets s'ils sont véhiculés, ils peuvent aussi être simple passager.
Par exemple lorsqu’un conducteur prend un passager pour un trajet de 20km il gagne 20 tokens et le passager consomme 20 tokens. A l’inscription l’utilisateur a un crédit de 50 tokens, et pour les personnes ne possédant
pas de voiture ils ont la possibilité d’acheter des tokens. Un système pour vendre mes tokens aux autres utilisateurs sera mis en place.


5- La création du site

 Le site se présente comme sur les images qui suivent, les différentes tâches ont été partagées entre les membres de l'équipe.

 La page d'accueil du site :
 
![accueil-green](https://github.com/cedric-chimot/Greenride/assets/106061524/63704da0-7e2f-4deb-a43f-5c2bd328d0ec)

Au niveau du tableau de bord, j'ai créé une sidebar pour renvoyer aux différentes pages accessible pour le ou les administrateurs ainsi que le header
qui affiche l'identité de la personne connectée.

Dès qu'il se connecte, il est envoyé sur cette page directement. Les blocs affichent les utilisateurs inscrits, les alertes ou encore les messages
directement depuis la base de données. Il y a aussi des statistiques qui évoluent en direct suivant les MAJ de la BDD.

Le tableau de bord :

![dashboard-green](https://github.com/cedric-chimot/Greenride/assets/106061524/890668d5-652e-4bc6-a573-15323bf29a55)

J'ai participé à la création de différents formulaires, insription connexion etc... 

![inscription-green](https://github.com/cedric-chimot/Greenride/assets/106061524/614693a0-e474-443e-a7b2-8986b9a37d71)

![contact-green](https://github.com/cedric-chimot/Greenride/assets/106061524/b95086af-7275-4097-9ce7-8e0cf2cc54cc)

Dans cahier des charges, il nous était demandé de créer un sytème d'échange de tokens. Pour cela, j'ai eu l'idée de mettre en place un système d'annonce achat/vente
pour que les utilisateurs puissent poster des annonces ou réaliser des transactions. Un de mes camarades à par la suite relier le tout à Stripe pour la validation
des transactions.

La page d'ajout se présente comme suit : 

![annonces-green](https://github.com/cedric-chimot/Greenride/assets/106061524/1a07fbee-3a1f-416d-8607-2b1b56a44950)

Il y a un formulaire pour ajouter les annonces ainsi qu'un récapitulatif des annonces de l'utilisateur en cours. Le système est paramétré de façon à ce qu'on
ne puisse pas posté d'annonce si l'on a pas assez de tokens. On est parti du principe que 10 tokens valaient 1 euro, le calcul du montant se fait automatiquement
et l'annonce s'affiche dès la validation.

Toutes les annonces peuvent être retrouvées sur la page dédiée, on ne trouve évidemment que les annonces des autres utilisateurs, pas les nôtres.

Le récapitulatif des annonces : 

![annonces1-green](https://github.com/cedric-chimot/Greenride/assets/106061524/a5f81542-24e5-4d39-aa8b-639164cef4a1)
