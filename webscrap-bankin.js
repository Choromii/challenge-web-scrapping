var webpage = require('webpage');
var page = webpage.create();

page.open('https://web.bankin.com/challenge/index.html', function (status) {
    var result = page.evaluate(getTransactions);
        
    // Affichage du résultat
    console.log(result);

    phantom.exit();
});

// Fonction de lecture des transactions
function getTransactions() {
    var transactions = [];
    var oldLength = undefined;

    // Tant qu'il y a des nouvelles données
    while (transactions.length !== oldLength) {
        oldLength = transactions.length;

        // Suppression de l'iframe avant de générer pour éviter d'avoir les données en double
        var frame = document.getElementById('fm');
        if (frame) {
            frame.remove();
        }

        // Génération
        start = transactions.length;
        doGenerate();

        // Récupération de la source contenant les données
        frame = document.getElementById('fm');
        var source = frame ? frame.contentDocument : document;
        
        // Lecture des données
        var lines = source.getElementsByTagName('tr');
        for (var index = 1; index < lines.length; index++) {
            var line = lines[index];

            // Séparation du montant et de la monnaie
            var amountAndCurrency = line.children[2].innerText;
            var amount = amountAndCurrency.match(/[0-9.]+/)[0];
            var currency = amountAndCurrency.split(amount).join('');

            // Ajout de la ligne aux résultats
            transactions.push({
                'Account': line.children[0].innerText,
                'Transaction': line.children[1].innerText,
                'Amount': parseFloat(amount),
                'Currency': currency
            });
        }
    }

    // Renvoi des résulats
    return JSON.stringify(transactions);
}
