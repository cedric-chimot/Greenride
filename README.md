# GREENRIDE - PROJET INCUBATEUR
	
# 1- Introduction
	
_1.1 Qu'est-ce que l'incubateur du numérique_

À la suite de ma formation de développeur web, j’ai choisi de rejoindre un dispositif nommé Incubateur du numérique.
Celui-ci permet de mettre en application ce qui a été vu en formation à travers des mises en situation en appliquant les compétences acquises en formation grâce à des projets concrets.
J’ai donc intégré une équipe Agile pour parfaire mes connaissances et gagner en expérience, tout en travaillant dans un environnement semblable au monde de l’entreprise.

_1.2 Les missions_

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

# 2- Le projet

Le projet Greenride est un site de covoiturage. Il faisait parti des sujets proposés par les formateurs au début de l'incubateur. Suivant un cahier des charges, il fallait réaliser un site selon les spécificités demandées.
Ici nous devions créer un site permettant la mise en relation de personnes voulant réaliser des trajets en voiture sans transfert d'argent. Il fonctionne avec un sytème de Tokens, en quelque sorte la "monnaie" du site.
Les utilisateurs inscrits postent des trajets s'ils sont véhiculés, ils peuvent aussi être simple passager.
Par exemple lorsqu’un conducteur prend un passager pour un trajet de 20km il gagne 20 tokens et le passager consomme 20 tokens. A l’inscription l’utilisateur a un crédit de 50 tokens, et pour les personnes ne possédant
pas de voiture ils ont la possibilité d’acheter des tokens. Un système pour vendre mes tokens aux autres utilisateurs sera mis en place.

_Technologies utilisées :_

- HTML
- CSS
- Javascript
- React
- Symfony via une API Rest
- Tailwind
- MySql
- Looping
- Stripe
- Leaflet
- Figma
- Jira

# 3- Conception et maquettage du site

Avant de coder le site à proprement parler, il a fallu commencer par créer une maquette de celui-ci afin d'avoir une idée de ce à quoi il pourrait ressembler. Travaillant en méthode Agile, nous nous sommes concertés et ce sont les formateurs qui ont au final validé ou non nos idées de développement.

Pour réaliser cette maquette, nous avons utilisé Figma, un site collaboratif de design. Pour la répartition des tâches entre l'équipe, nous avons créer un tableau de suivi sur Jira afin de gérer au mieux les différentes étapes de conception et les nombreux sprints à venir tout au long du projet.

Voici en image les propositions de disposition des différentes pages ainsi que le code couleur choisi pour le site.

![maquette1-green](https://github.com/cedric-chimot/Greenride/assets/106061524/f784e26a-898b-47b8-a5a7-98449d039926)
![maquette2-green](https://github.com/cedric-chimot/Greenride/assets/106061524/e1aff879-ce42-4697-9b39-8fb51306cca6)
![maquette3-green](https://github.com/cedric-chimot/Greenride/assets/106061524/76d732b1-1900-4856-85c8-7b3ade2bfde2)
![maquette4-green](https://github.com/cedric-chimot/Greenride/assets/106061524/ceb1f78b-05ae-4408-963d-b8fc9e39ea16)
![maquette5-green](https://github.com/cedric-chimot/Greenride/assets/106061524/179399e4-06d0-48e0-a4c2-daaff3bf2427)
![maquette6-green](https://github.com/cedric-chimot/Greenride/assets/106061524/93d5addc-45e9-4388-b9e3-2b204891d0c6)

Sur les différentes images, il est possible de voir les pages telles qu'elles ont été pensées au départ. Il y a bien entendu eu de nombreuses réflexions, celles-ci n'étant qu'une ébauche du rendu final du site. Nous étions 16 dans l'équipe au départ, les formateurs nous ont donc séparés en deux équipes distinctes pour travailler au mieux. Le design du projet a donc évolué selon les idées de chacun ce qui donne une proposition finale différente du projet par rapport à la maquette initiale.

_Exemple :_
Pour les formulaires (inscription, connexion etc...), nous avons choisi de les uniformisés afin qu'ils soient les plus optimisés possible en créant par exemple un composant pour les inputs de façon à ce qu'ils soient tous de taille indentique.

# 4- Création de la base de données

Pour la gestion du back-end, il a fallu créer une base de données. Le point de départ de celle-ci est la création du MCD (Modèle Conceptuel de Données) que j'ai réalisé sur Looping, un logiciel de modélisation conceptuelle de données.

![mcd-green](https://github.com/cedric-chimot/Greenride/assets/106061524/aaff7300-07d4-4b4c-b52e-6c7570e7acb9)

On peut voir sur l'image les différentes entités ainsi que les relations entre elles.
De ce MCD, j'ai pour obtenir le MLD (Modèle Logique de Données). Les entités sont devenues des tables et sur l'image on peut voir que les relations ont créé des "clés étrangères", faisant référence aux identifiants des autres tables auxquelles elles sont liées.

![mld-green](https://github.com/cedric-chimot/Greenride/assets/106061524/4f81fd3b-9db0-4681-bd01-bd7ce583141e)

De la même manière que la maquette ces MCD/MLD ont servi de base à la création de notre base de données. Au fur et à mesure de nos réflexions et de nos besoins, celle-ci a fortement évolué et d'autres tables sont venues s'ajouter au modèle de base.

Voici en image la version finale de la base de données : 

![BDD-green](https://github.com/cedric-chimot/Greenride/assets/106061524/146fe70c-e3c6-4c6c-9e22-26e92889fc8f)

Ceci est le rendu du modèle obtenu avec PhpMyadmin. On peut voir les nombreux ajouts proposés, le tout ayant été bien entendu réfléchi en fonction du cahier des charges. Par exemple, le système d'annonces pour acheter des tokens a donné lieu à la création d'une table dédiée.

# 5- La création du site

_5.1 Accueil et Dasboard administrateur_

Le site se présente comme sur les images qui suivent, les différentes tâches ont été partagées entre les membres de l'équipe. Il est proposé différentes vues selon que l'on soit simple utilisateur ou administrateur, on peut simplement être visiteur cependant, de nombreuses pages sont inaccessible si l'on est pas inscrit ou connecté.

La page d'accueil du site :
 
![accueil-green](https://github.com/cedric-chimot/Greenride/assets/106061524/63704da0-7e2f-4deb-a43f-5c2bd328d0ec)

Au niveau du tableau de bord, j'ai créé une sidebar pour renvoyer aux différentes pages accessible pour le ou les administrateurs ainsi que le header
qui affiche l'identité de la personne connectée.

Dès qu'il se connecte, il est envoyé sur cette page directement. Les blocs affichent les utilisateurs inscrits, les alertes ou encore les messages
directement depuis la base de données. Il y a aussi des statistiques qui évoluent en direct suivant les MAJ de la BDD.

Le tableau de bord :

![dashboard-green](https://github.com/cedric-chimot/Greenride/assets/106061524/890668d5-652e-4bc6-a573-15323bf29a55)

_5.2 Exemple de tâches effectuées_

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

Lorsque l'on souhaite acheter des tokens, un pop-up apparait sur l'écran afin de valider ou non la transaction. Celle-ci est liée à Stripe, une API qui traite les paiements en ligne.

![annonces2-green](https://github.com/cedric-chimot/Greenride/assets/106061524/6d6003db-d7c8-455d-901e-3b4e7932bd2b)

Les tokens sont directement crédités lors de la validation de la transaction.

_5.3 Autres pages du site_

Voici le rendu de différentes pages du site dans leur version finale :

Page de profil de l'utilisateur connecté :
![profil1-green](https://github.com/cedric-chimot/Greenride/assets/106061524/e6ff272d-a16c-44dd-a3e5-103a5a38a705)
![profil-green](https://github.com/cedric-chimot/Greenride/assets/106061524/5e1fdbf7-08de-4e96-872b-01ed4e48b893)
![profil2-green](https://github.com/cedric-chimot/Greenride/assets/106061524/c6bdaf39-d552-4f3d-b117-14b10bd50342)![profil3-green](https://github.com/cedric-chimot/Greenride/assets/106061524/d26e42f3-1225-4b1f-aa1d-64a2d47875aa)
![signal-green](https://github.com/cedric-chimot/Greenride/assets/106061524/6e98e5b2-a98a-49cf-902d-b429395e1215)
![trajet-green](https://github.com/cedric-chimot/Greenride/assets/106061524/1b4cbf6d-7382-484c-b947-33039d17b4eb)
![trajet1-green](https://github.com/cedric-chimot/Greenride/assets/106061524/81ea9261-b17f-4955-93e2-5d0ea4bc4796)
![trajet2-green](https://github.com/cedric-chimot/Greenride/assets/106061524/9aee3bd5-f7d5-4dc7-8b9f-5907977c8b22)


