	$(document).ready(function restart() {

		//declare object of fighting characters
			var player = [
			{
				name:'Forever Alone',
				hp:115,
				cap:20,
				ap:16,
				nick:'alone'
			},
			{

				name:'Me Gusta',
				hp:120,
				cap:18,
				ap:9,
				nick:'gusta'
			},
			{
				name:'Trollface',
				hp:130,
				cap:15,
				ap:18,
				nick:'troll'
			},
			{
				name:'Y U No',
				hp:145,
				cap:16,
				ap:6,
				nick:'yuno'
			},
			];
		//writes hit-points html on icons
			for (i=0; i<player.length; i++) {

				var hitpoints = player[i].hp;
				$("#"+player[i].nick+"points").html("<p>" + player[i].hp + "</p>");
			}
		//variables are decraled for global use
			var myhero = "";
			var hero = false;
			var enemy = false;
			var myenemy = "";
			var originalScreen = $(".container").clone();
			var round = 0;
			var tempherohp = parseInt(myhero.hp);

	// reset function to reset most variables
function reset () {
				var player = [
			{
				name:'Forever Alone',
				hp:100,
				cap:30,
				ap:15,
				nick:'alone'
			},
			{

				name:'Me Gusta',
				hp:120,
				cap:20,
				ap:7,
				nick:'gusta'
			},
			{
				name:'Trollface',
				hp:150,
				cap:15,
				ap:12,
				nick:'troll'
			},
			{
				name:'Y U No',
				hp:180,
				cap:16,
				ap:5,
				nick:'yuno'
			},
			];

			for (i=0; i<player.length; i++) {

				var hitpoints = player[i].hp;
				$
			}

			var myhero = "";
			var hero = false;
			var enemy = false;
			var myenemy = "";
			var tempherohp = parseInt(myhero.hp);

		};
	//function to start game

function playgame() {

			var tempheroname = "";
			var tempenemyname = "";

	//user chooses his hero
		$(".statbox").on("click", function() {
			if (hero == false) {
					hero = true;
					$(this).addClass("hero");
					$(this).removeClass("statbox");
					$(this).unbind("click");
					$(this).animate({ height: "150px", width: "150px"}).css("background-color", "lightgreen");
					$(this.id).animate({ height: "85px", width: "85px"});
					$("#hero").append($(this)).css("color", "black");
					$("#instruct").html("<h2>Choose your Meme Enemy!</h2>");
					for (i=0; i < player.length; i++) {
						var tempheroname = ($(this).attr("id"));
						if (tempheroname == (player[i].nick)) {
							myhero = player[i];
						}
					}
			}
	//user chooses his first enemy
			else if (enemy == false) {
					enemy = true;
					$(this).addClass("enemy");
					$(this).removeClass("statbox");
					$(this).animate({ height: "150px", width: "150px"}).css("background-color", "red");
					$(this.id).animate({ height: "85px", width: "85px"});
					$("#enemy").append($(".enemy")).css("color", "black");
					$("#instruct").html("<h2></h2>");
					$(".statbox").toggleClass("gang");
					$(".statbox").removeClass("statbox");
					$("#gang").append($(".gang")).css("color", "black");
					$(".gang").animate({ height: "150px", width: "150px"}).css("background-color", "yellow");
					$(".gang".id).animate({ height: "85px", width: "85px"});
					$("#attack").html('<button type="button" class="btn btn-secondary btn-lg">Attack!</button>').css("color", "black");
					$("#action").css("color", "black");
					$("#fightlog").css("color", "black");
					$(".pithead").css("color", "black");
					for (i=0; i < player.length; i++) {
						var tempenemyname = ($(this).attr("id"));
						if (tempenemyname == (player[i].nick)) {
							myenemy = player[i];

						}
					}

			}

			else {
				console.log("else");
			};

			fight();
	});
				};
	//battle function
function fight() {
	//if it's the initial round, variable are assigned the original object values
				if (round == 0) {
				tempherohp = parseInt(myhero.hp);
				}
				var tempenemyhp = parseInt(myenemy.hp);
				console.log(myenemy);
				console.log(tempenemyhp);
				var heroattack = parseInt(myhero.ap)+(round*(parseInt(myhero.ap)));
	//button click starts melee
			$(".btn").on("click", function() {
				console.log('clicked');
				console.log('round ' + round);
				heroattack = parseInt(myhero.ap)+(round*(parseInt(myhero.ap)));
				console.log('temp hero hp is ' + tempherohp);
				console.log('tempenemy after click is  ' + tempenemyhp);
	//if both combatants still have health, carry on the game play
				if (tempherohp >= 1 && tempenemyhp >= 1) {
					$("#fightlog").html("<br/><br/><p>You attacked " + myenemy.name + " for " + heroattack + " damage<br/>" +
					myenemy.name + " attacked you back for " + myenemy.cap + " damage</p>");
					round++;
					tempenemyhp=(tempenemyhp - heroattack);
					tempherohp=(tempherohp - parseInt(myenemy.cap));
					console.log(tempenemyhp);
					console.log(tempherohp);

					// if (tempenemyhp > 0) {



	// after a battle round, checks to see if enemy is still 'alive',
						if (tempherohp > 0 && tempenemyhp <= 0) {


					//if not, enemy disappears and user must select another
								enemy = false;
								var gangLeft = $("#gang").contents().length;
								var enemiesLeft = $("#gang").contents().length;
								console.log(gangLeft);
								console.log(enemiesLeft);
								if (gangLeft === 0 && enemiesLeft === 0) {
									playerWins();
								} else {
								// $(".gang").bind("click", handler);
								$("#"+myenemy.nick).css("background-color", "black").toggle("explode").empty();
								setTimeout(function() {
										$("#enemy").empty();
										$("#enemy").html("<h4>The Enemy</h4");
										$("#enemy").append("<br/><br/><h2>FTW!!!</h2><br/><p>Please select another opponent!</p>").fadeIn("slow");
										$("#fightlog").empty();
									}, 500);


								$(".gang").on("click", function() {
									$(".gang").unbind("click");
									console.log(this);
									console.log(player);
									$(this).addClass("enemy");
									$(this).removeClass("gang");
									$("#enemy").empty();
									$("#enemy").html("<h4>The Enemy</h4");
									$(this).animate({ height: "150px", width: "150px"}).css("background-color", "red");
									$(this.id).animate({ height: "85px", width: "85px"});
									$("#enemy").append($(".enemy")).css("color", "black");
									for (i=0; i < player.length; i++) {
										var tempenemyname = ($(this).attr("id"));
										if (tempenemyname == (player[i].nick)) {
											myenemy = player[i];
											tempenemyhp = myenemy.hp;

										}
									}
								});
							}
						}
						if (tempherohp <= 0 && tempenemyhp > 0) {
							playerLoses();
						}
						if (tempherohp <= 0 && tempenemyhp <= 0) {
							$("body").empty();
							setTimeout(function(){
								$("body").css({"background-image": "url('assets/images/kaboom.jpeg')", "text-align": "center", "padding": "auto"});
								$("body").html("<h1 class='endText'>Mutal Destruction</h1>");

							}, 500);
							setTimeout(function () {
								$(".endText").append("<p style='font-size: 5rem; cursor: pointer; color: cornflowerblue' onclick='location.reload()'>Click to Restart</p>");

							},4000);

					}
					// }
				}
				else if (tempherohp <= 0 && tempenemyhp > 0) {
						//if not, game is over and button is clicked to reset
						playerLoses();
				}

				// else if (tempherohp <= 0 && tempherohp <= 0) {
				// 		setTimeout(function(){
				// 			$("body").empty();

				// 		}, 300);
				// }
					// if (tempherohp <=0) {
					// 	playerLoses();
					// }

	// after battle round checks to see if user's hero is still 'alive'

					$("#"+myhero.nick+"points").html("<p>" + tempherohp + "</p>");
					console.log(tempherohp + 'written in div');
					$("#"+myenemy.nick+"points").html("<p>" + tempenemyhp + "</p>");
								// };
			});


				};
	function playerLoses() {
		$("#"+myhero.nick).css("background-color", "black").animate({height: '300px', width: '300px', opacity: '0.4'}, "slow").toggle("explode");
		$(".btn").unbind("click");
		$(".statbox").unbind("click");
		$("#hero").append("<br/><br/><h2>EPIC FAIL!</h2>")
		$("#attack").html('<button type="button" class="btn btn-success btn-lg">Restart!</button>').css("color", "black");
		$("#fightlog").html("<br/><br/>Please click the 'Restart!' button to play again");
		reset();
		$(".btn").on("click", function() {
			location.reload();
			});
	};
	function playerWins() {
		$("#enemy").empty();
		$("#gangPit").empty();
		$("#"+myhero.nick).css("background-color", "gold").animate({height: '500px', width: '500px'}, "slow");
		$(".btn").unbind("click");
		$(".statbox").unbind("click");
		$("#hero").append("<br/><br/><h2>WINNER WINNER!!!</h2>")
		$("#attack").html('<button type="button" class="btn btn-success btn-lg">Restart!</button>').css("color", "black");
		$("#fightlog").html("<br/><br/>Please click the 'Restart!' button to play again");

		$(".btn").on("click", function() {
			location.reload();
			});
	};
//calls game to start
	playgame();
	fight();

});
	/*	1. All 4 icons appear on screen waitning to be clicked
			a. User is prompted to select a hero
			b. when selected, hero icon goes to left most column , labelled 'Your Hero'
				i. icon shrinks
				ii. icon border changes color to heroic green
			c. other non-selected icons go to right most column, labelled 'The Gang'
				i. all icons shrink
				ii. icon border changes color to dastardly yellow
			d. second column is the 'let's fight column' holding a button labelled 'attack'
			e. third column is where the active enemy is staged

		2. gameplay
			a. use selects an active enemy from 'The Gang'
			b. selected icon moves to the third column 'The Enemy'
				i. icon border changes color to bad-guy red
			c. 'attack' button is clicked by user
				i. predetermined damage is inflicted on 'The Enemy' reducing his hit points
					A. remiaing hp is updated on icon
				ii. enemy immediately counter attacks, reducing hit points on hero
				iii. same funciton is repeated
					A. 'hero' attack points increase by it's inital value every round
					B. function repeats until 'hero's or 'enemy's hp reach zero
			d. if enemy's hp reaches zero
				i. icon is removed from the board of play
				ii. use must choose another icon to become 'enemy'
				iii. 'hero' hps do not regenerate/renew... it stays the same number from previous battle
				iv. ap still increase in value every round
				v. gameplay continues until all enemies hp's reach zero
					A. after last enemy's hp reach zero, game is over, user wins
					B. game resets
					c. game restarts by user action
			e. if 'hero's hp reaches zero
				i. game is over
				ii. game resets
				iii. game restarts by user action




	*/



