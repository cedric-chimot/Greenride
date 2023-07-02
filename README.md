# GREENRIDE - PROJET INCUBATEUR
	
# 1- Introduction
	
# _1.1 Qu'est-ce que l'incubateur du numérique_

À la suite de ma formation de développeur web, j’ai choisi de rejoindre un dispositif nommé Incubateur du numérique.
Celui-ci permet de mettre en application ce qui a été vu en formation à travers des mises en situation en appliquant les compétences acquises en formation grâce à des projets concrets.
J’ai donc intégré une équipe Agile pour parfaire mes connaissances et gagner en expérience, tout en travaillant dans un environnement semblable au monde de l’entreprise.

# _1.2 Les missions_

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
- PHP
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
![maquette7-green](https://github.com/cedric-chimot/Greenride/assets/106061524/c1b80488-e7cf-40c2-9079-8dc930c4adb9)
![maquette8-green](https://github.com/cedric-chimot/Greenride/assets/106061524/4ab190ca-2cec-4b93-a514-fd88759b2416)

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

# _5.1 Accueil et Dasboard administrateur_

Le site se présente comme sur les images qui suivent, les différentes tâches ont été partagées entre les membres de l'équipe. Il est proposé différentes vues selon que l'on soit simple utilisateur ou administrateur, on peut simplement être visiteur cependant, de nombreuses pages sont inaccessible si l'on est pas inscrit ou connecté.

_- La page d'accueil du site :_
 
![accueil-green](https://github.com/cedric-chimot/Greenride/assets/106061524/63704da0-7e2f-4deb-a43f-5c2bd328d0ec)
![accueil1-green](https://github.com/cedric-chimot/Greenride/assets/106061524/a2097f88-50f0-4616-8776-c51aed835e04)
![accueil2-green](https://github.com/cedric-chimot/Greenride/assets/106061524/8418eea0-5206-48f9-83b2-b887a99d4110)

_- Le tableau de bord :_

Au niveau du tableau de bord, j'ai créé une sidebar pour renvoyer aux différentes pages accessible pour le ou les administrateurs ainsi que le header
qui affiche l'identité de la personne connectée.

Dès qu'un administrateur se connecte, il est envoyé sur cette page directement. Les blocs affichent les utilisateurs inscrits, les alertes ou encore les messages
directement depuis la base de données. Il y a aussi des statistiques qui évoluent en direct suivant les MAJ de la BDD.

![dashboard-green](https://github.com/cedric-chimot/Greenride/assets/106061524/890668d5-652e-4bc6-a573-15323bf29a55)

# _5.2 Exemple de tâches effectuées_

J'ai participé à la création de différents formulaires, insription connexion etc... 

![inscription1-green](https://github.com/cedric-chimot/Greenride/assets/106061524/3869910e-6db1-498c-9d1e-67494eab5e81)

![login-green](https://github.com/cedric-chimot/Greenride/assets/106061524/fb5b2081-ca5a-4648-b108-3bd125dc7f3d)

![contact-green](https://github.com/cedric-chimot/Greenride/assets/106061524/b95086af-7275-4097-9ce7-8e0cf2cc54cc)

Dans le cahier des charges, il nous était demandé de créer un sytème d'échange de tokens. Pour cela, j'ai eu l'idée de mettre en place un système d'annonce achat/vente
pour que les utilisateurs puissent poster des annonces ou réaliser des transactions. Un de mes camarades a par la suite relié le tout à Stripe pour la validation
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

# _5.3 Autres pages du site_

_5.3.1 Pages utilisateurs_

Voici le rendu de différentes pages du site dans leur version finale :

_- Page de profil de l'utilisateur connecté :_

![profil1-green](https://github.com/cedric-chimot/Greenride/assets/106061524/e6ff272d-a16c-44dd-a3e5-103a5a38a705)

L'utilisateur dispose de plusieurs options, comme la modification de son profil, de son véhicule, le nombre de tokens à sa disposition ainsi qu'une liste exhaustive de ses trajets postés. Il peut tous les afficher en cliquant sur le bouton "voir plus".

_- Historique des trajets :_

![trajet3-green](https://github.com/cedric-chimot/Greenride/assets/106061524/1812e0d3-1781-4fdb-9a99-ca34e7e16175)

Sur cette page, on affiche tous les trajets proposés par l'utilisateur ainsi que les réservations en attente de validation ou efectuées. Il peut aussi voir les réservations qu'il a fait sur les trajets des autres utilisateurs.

_- Page de modification de profil :_

![profil-green](https://github.com/cedric-chimot/Greenride/assets/106061524/5e1fdbf7-08de-4e96-872b-01ed4e48b893)

L'utilisateur peut ici modifier ses informations personnelles.

_- Proposition de trajet :_

![trajet-green](https://github.com/cedric-chimot/Greenride/assets/106061524/1b4cbf6d-7382-484c-b947-33039d17b4eb)

L'utilisateur propose ici un ou plusieurs trajets en indiquant différentes informations.

_- Page de présentation d'un trajet :_

![trajet5-green](https://github.com/cedric-chimot/Greenride/assets/106061524/3c6b27c5-1ada-4c49-a594-667e25daaae8)

L'utilisateur peut voir ici les différentes informations concernant un trajet. Il peut le réserver en appuyant sur le bouton, un pop-up apparait alors. En cliquant sur le nom de la personne qui a ajouté le trajet, il a accès au profil de cet utilisateur. Il peut aussi voir dans un encadré le kilométrage et l'itinéraire du trajet.

_- Pop-up de réservation :_

![trajet4-green](https://github.com/cedric-chimot/Greenride/assets/106061524/7d382a2c-c807-42ed-a6d2-96288ff7ba7a)

On peut voir ici le coût en tokens du trajet. Bien évidemment, si l'utilisateur ne possède pas suffisamment de tokens, le texte de validation évolue et il est impossible de confirmer sa réservation.

_- Profil autre utilisateur :_

![profil2-green](https://github.com/cedric-chimot/Greenride/assets/106061524/bb12c520-18b8-49a8-9e2a-b06984542ecb)

On peut voir ici toute les informations d'un utilisateur. On peut lui envoyer un message, laisser un avis s'il on a partagé un trajet avec lui ou mème le signaler s'il y a eu un quelconque souci durant le trajet.

_- Pop-up d'avis :_

![profil4-green](https://github.com/cedric-chimot/Greenride/assets/106061524/1c7deb56-9639-4afc-be72-52a2b1d6d624)

_- Composant message :_

![profil5-green](https://github.com/cedric-chimot/Greenride/assets/106061524/4d4d052a-6c19-40f0-886d-14e85c6bc90a)

On peut envoyer directement un message à l'utilisateur. Lorsqu'il le reçoit, une notification apparait au niveau de la petite cloche en haut à droite sur la navbar. Celle-ci indique toutes notifications reçues : réservations, achat, message etc...

_- Page d'alerte :_

![signal-green](https://github.com/cedric-chimot/Greenride/assets/106061524/2fec4371-6e71-4359-978a-672362b49401)

La page de signalement avec la possibilité de choisir la raison parmi une liste ou d'indiquer le motif soit même.

_5.3.2 Pages Administrateurs_

Voici quelques pages de la partie administrateur.

_- La liste des utilisateurs :_

![admin-green](https://github.com/cedric-chimot/Greenride/assets/106061524/ac8f5f31-0540-4c4f-90e8-e384ba20ec1d)

L'admin peut voir le profil de l'utilisateur ou le supprimer.

_- Le profil d'un utilisateur en vue admin :_

![admin1-green](https://github.com/cedric-chimot/Greenride/assets/106061524/2c35837b-c164-4313-82e3-84648e881b2e)

Toutes les informations de l'utilisateur s'affichent (informations personnelles, trajets etc...). L'admin peut le contacter directement par le chat, le bannir s'il y a lieu.

_- La liste des trajets postés :_

![admin5-green](https://github.com/cedric-chimot/Greenride/assets/106061524/e53e7283-d420-493c-8d7b-09ec1c9a8173)

_- La vue d'un trajet :_

![admin2-green](https://github.com/cedric-chimot/Greenride/assets/106061524/562387b8-c5dc-4004-98ba-9d753a170e59)

Vue d'un trajet avec les avis éventuels sur le conducteur et toutes les informations concernant le trajet.

_- La vue d'une alerte :_

![admin6-green](https://github.com/cedric-chimot/Greenride/assets/106061524/339df35c-9020-469f-84b7-58679165ba94)

L'admin peut ici avertir le conducteur faisant l'objet d'une alerte, il peut aussi le bannir temporairement ou définitivement. Sont également affichées toutes les alertes antérieures s'il y en a.

_- Les statistiques :_

![admin4-green](https://github.com/cedric-chimot/Greenride/assets/106061524/9318fc0e-bb98-48ca-8d3b-d50627241575)

Ici un récapitulatif statistique en ce qui concerne les trajets, les utilisateurs, les tokens consommés. Celles-ci évoluent en direct en fonction des données de la base de données.

_- Le profil d'un admin_

![admin7-green](https://github.com/cedric-chimot/Greenride/assets/106061524/450bd50d-4986-4b60-991f-b1349107c0f4)

![admin8-green](https://github.com/cedric-chimot/Greenride/assets/106061524/097f6498-810f-4453-8eff-4256e1e27821)

La vue d'un profil admin, avec la possibilité de voir l'historique des échanges avec les utilisateurs et le formulaire en mode pop-up pour créer un nouvel administrateur.

_5.3.3 Conclusions_

Ces différents exemples démontrent les réflexions qui ont pu être faites tout au long du projet. De la maquette au rendu final, de nombreuses modifications et améliorations ont été faites de façon à coller au mieux aux demandes du cahier des charges. L'échange d'idée entre nous a permis de faire évoluer le projet dans le bon sens et de l'optimiser.

# 6- Conclusion générale

L'incubateur fut pour moi une excellente expérience. Cela m'a permis de gagner en compétence et en assurance.
J'ai aussi pu travailler en équipe dans de vraies conditions de travail. Par rapport à ma formation, le fait d'avoir pu échanger nos idées, de les confronter m'a conforté dans mon envie de poursuivre dans ce métier.
