// Fonction jQuery : exécute le jeu une fois que le DOM est chargé
$(function() {

	// On définit les variables du jeu dans un objet littéral
	var Settings = {
		bestScore: 0
	};

	// On attend que l'utilisateur clique sur le bouton "submit" pour lancer le jeu : il valide le formulaire
	$("form").on("submit", function (e) {
    	e.preventDefault(); // On ne recharge pas la page avec le formulaire

    	// On récupère le pseudo rentré par l'utilisateur
    	Settings.pseudo = $('input[type=text]#pseudo').val();

    	// On récupère la durée du jeu rentrée par l'utilisateur
    	Settings.timeToPlay = $('input[type=text]#time').val();

    	// On lance le jeu
		initial(Settings);
		click(Settings);
	});
});

// Fonction initial : initialise les variables, lance le décompte et exécute le jeu
function initial(gameSettings) {

	// On initialise les variables du jeu :
	gameSettings.score = 0;
	gameSettings.timer = gameSettings.timeToPlay; // Permet de réinitialiser le timer à chaque lancement du jeu

	// On affiche le timer dans le HTML
	$('span.timeLeft').text(gameSettings.timer + ' sec');
	
	// On affiche le score dans le HTML
	$('h2 span.score').text(gameSettings.score);

	// On affiche le pseudo de l'utilisateur dans le HTML
	$('h1 span.pseudo').text(gameSettings.pseudo);

	// On masque le div contenant le jeu
	$('.game').hide();

	// On masque le div contenant les informations du formulaire
	$('div.infos').fadeOut();

	// On affiche le décompte du jeu
	$('div.compteur h2').hide('slow',function(){
		$(this).text('3');
	}).fadeIn('slow').fadeOut('slow',function(){
		$(this).text('2');
	}).fadeIn('slow').fadeOut('slow',function(){
		$(this).text('1');
	}).fadeIn('slow').fadeOut('slow',function(){
		$(this).text('Click!');
	}).fadeIn('slow').fadeOut(2000,function() {

		// On affiche le jeu
		$('div.game').fadeIn();

		// On lance le timer
		setTimer(gameSettings);
	});
}

// Fonction setTimer : exécute un timer et affiche des informations
function setTimer(gameSettings) {

	// On lance un timer que l'on stocke dans une variable (pour pouvoir l'arrêter)
	var timer = setInterval(function() {

		// Si il reste du temps à jouer :
		if (gameSettings.timer > 0) {

			// Affiche le temps restant dans la page HTML
			$('span.timeLeft').fadeOut(function(){
				$(this).text(gameSettings.timer + ' sec');
			}).fadeIn();

			// On réduit le temps restant de 1
			gameSettings.timer--;
		}
		else {
			clearInterval(timer); // On arrête le timer

			// On modifie les informations de fin du jeu
			$('.end span.score').text(gameSettings.score);
			$('.end span.playerName').text(gameSettings.pseudo);

			// On affiche les inforamtions
			$('.end').fadeIn();

			// Si l'utilisateur a battu son propre record :
			if (gameSettings.score > gameSettings.bestScore) {
				gameSettings.bestScore = gameSettings.score; // On enregistre le meilleur score du joueur
				$('.infos-game .bestScore').text('(' + gameSettings.bestScore + ')'); // On affiche le meilleur score du joueur
			}

		}
	}, 1000); // On définit le décompte à 1000 ms = 1 seconde
}

// Fonction click : permet de cliquer dans une zone et compter le score + clique pour relancer le jeu
// Comprend les différents écouteurs d'évènements
function click(gameSettings) {

	// Quand l'utilisateur clique sur le carré
	$('.click').click(function(e) {

		// On vérifie que l'utilisateur a encore du temps de jeu :
		if (gameSettings.timer > 0) {
			gameSettings.score++;
			$('h2 span.score').text(gameSettings.score); // On affiche le score

			// On change de façon aléatoire le background-color à chaque clic
			$(this).css('background-color', 'rgb('+ getRandomInt(251) +','+ getRandomInt(251) +','+ getRandomInt(251) +')');
		}
		else {
			console.log("We can't play. Time it's over, sorry bro.");
		}
	});

	// Si l'utilisateur clique pour relancer une nouvelle partie :
	$('.tryAgain').click(function() {

		// On masque les informations
		$('.end').fadeOut();

		// On relance le jeu
		initial(gameSettings);
	});
}

// Fonction qui retourne un entier compris entre 0 et l'argument renseigné
function getRandomInt(max=101) {
  return Math.floor(Math.random() * Math.floor(max));
}



