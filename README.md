# Challenge Engineering : Web Scrapping

Ce script renvoi des données JSON à partir de la page `https://web.bankin.com/challenge/index.html`.

Le script utilise `phantomjs` pour lire la page.
Pour le démarrer :

    npm start

ou

    phantomjs webscrap-bankin.js


## Fonctionnement

Ce script modifie la valeur de la variable `start` du script `load.js` et fait appel directement à la fonction `generate` pour forcer l'affichage des données.

La lecture du tableau de résultat se fait en itérant sur les lignes du tableau à l'aide de `getElementsByTagName('tr')`.

Un test est fait pour vérifier si l'iframe `fm` est ajouté à la page. Si oui, le tableau est cherché dans le `document` de l'iframe, sinon il est cherché dans le `document` de la page.
