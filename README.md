# Greenride

 Projet Incubateur

 Site de covoiturage créer en équipe de 6/8 personnes avec React et Symfony via une API.
 
 Les utilisateurs inscrits postent des trajets s'il son véhiculés, ils peuvent aussi être simple passager. Le site fonctionne avec un sytème de Tokens,
 en quelque sorte la "monnaie" du site.
 
 1 kilomètre correspond à 1 token. Les utilisateurs consomment ces tokens quand ils participent aux trajets, le conducteurs est crédité des
 tokens utilisés par son/ses passager(s). Ils ont la possibilité de vendre leur tokens non utilisés, par exemple si un utilisateur est juste
 conducteur mais jamais passager.

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
