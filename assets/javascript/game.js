	$(document).ready(function() {
			// var player = ['alone', 'gusta', 'troll', 'yuno'];
			// var herohp = [100, 120, 150, 180]; //alone = 100 - 8 - 25; gusta = 120 - 7 - 22; troll = 150 - 5 - 16; yuno = 180 - 4 - 13
			// var enemyhp = [100, 120, 150, 180];
			// var cap = [25, 22, 16, 13];
			// var ap = [8, 7, 5, 4];
			
function playgame() {				
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
				ap:8,
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
				$("#"+player[i].nick+"points").html("<p>" + player[i].hp + "</p>");
			}

			var myhero = "";
			var myenemy = "";
			var tempheroname = "";
			var tempenemyname = "";
			var hero = false;
			var enemy = false;
			var originalScreen = $(".container").clone();

		$(".statbox").on("click", function() {
			if (hero == false) {
					hero = true;
					$(this).toggleClass("hero");
					$(this).removeClass("statbox");
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
			
			else if (enemy == false) {
					enemy = true;
					$(this).toggleClass("enemy");
					$(this).removeClass("statbox");
					$(this).animate({ height: "150px", width: "150px"}).css("background-color", "red");
					$(this.id).animate({ height: "85px", width: "85px"});
					$("#enemy").append($(this)).css("color", "black");
					$("#instruct").html("<h2></h2>");
					$(".statbox").toggleClass("gang");
					$(".statbox").removeClass("statbox");
					$("#gang").append($(".gang")).css("color", "black");
					$(".gang").animate({ height: "150px", width: "150px"}).css("background-color", "yellow");
					$(".gang".id).animate({ height: "85px", width: "85px"});
					$("#attack").append('<button type="button" class="btn btn-secondary btn-lg">Attack!</button>').css("color", "black");
					$("#action").css("color", "black");
					$("#fightlog").css("color", "black");
					for (i=0; i < player.length; i++) {
						var tempenemyname = ($(this).attr("id"));
						if (tempenemyname == (player[i].nick)) {
							myenemy = player[i];
						}
					}
			
			}

			else {

			};
					
			var round = 0;
			
			$(".btn").on("click", function() {
				var tempherohp = myhero.hp;
				var heroattack = myhero.ap+(round*myhero.ap);
				if ((tempherohp - myenemy.cap) < 1 && myenemy.hp > 0) {
					$("#"+myhero.nick).css("background-color", "black").animate({height: '300px', width: '300px', opacity: '0.4'}, "slow").toggle("explode");				
					$(".btn").unbind("click");	
					$(".statbox").unbind("click");				
					$("#hero").append("<br/><br/><h2>EPIC FAIL!</h2>")
					$("#attack").html('<button type="button" class="btn btn-success btn-lg">Restart!</button>').css("color", "black");
					$("#fightlog").html("<br/><br/>Please click the 'Restart!' button to play again");
					$(".btn").on("click", function() {
						$(".container").replaceWith(originalScreen);
						playgame();
						});
					}

				else if (tempherohp > 0 && (myenemy.hp - (heroattack)) < 1) {
					$("#"+myenemy.nick).css("background-color", "black").toggle("explode");	
					setTimeout(function() {
							$("#enemy").append("<br/><br/><h2>FTW!!!</h2><br/><p>Please select another opponent!</p>").fadeIn("slow");
							$("#fightlog").empty();
						}, 500);
				}
				else if (myhero.hp >= 1 && myenemy.hp >= 1) {
					$("#fightlog").html("<br/><br/><p>You attacked " + myenemy.name + " for " + heroattack + " damage<br/>" + 
					myenemy.name + " attacked you back for " + myenemy.cap + " damage</p>");
					myhero.hp=(myhero.hp - myenemy.cap);
					myenemy.hp=(myenemy.hp - heroattack);
					$("#"+myhero.nick+"points").html("<p>" + myhero.hp + "</p>");
					$("#"+myenemy.nick+"points").html("<p>" + myenemy.hp + "</p>");
					round++;
				};
			});			
			});
				};
		
	playgame();

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



		// 	if ($(".statbox").on("click", function() {

		// 		// heroHP = 100;
		// 		// // AP = 8;
		// 		// enemyHP = 120;
		// 		// CAP = 22;
		// 		$(".pit").css("color", "black")
		// 		$("#aloneimg").animate({ height: "85px", width: "85px"})
		// 		$("#gustaimg").animate({ height: "85px", width: "85px"})
		// 		$("#trollimg").animate({ height: "85px", width: "85px"})
		// 		$("#yunoimg").animate({ height: "85px", width: "85px"})
		// 		$("#alone").animate({ height: "150px", width: "150px"}).css("background-color", "lightgreen")
		// 		$("#gusta").animate({ height: "150px", width: "150px"}).css("background-color", "yellow")
		// 		$("#troll").animate({ height: "150px", width: "150px"}).css("background-color", "yellow")
		// 		$("#yuno").animate({ height: "150px", width: "150px"}).css("background-color", "yellow")
		// 		$("#action").append('<button type="button" class="btn btn-danger btn-lg">Attack!</button>')
		// 		$("#hero").append($("#alone"))
		// 		$("#gang").append($("#gusta"))
		// 		$("#gang").append($("#troll"))
		// 		$("#gang").append($("#yuno"))
		// 		$(".overlay").empty()
		// 		$("#alone").on("click", null).off("click")
		// 		$("#gusta").on("click", null).off("click")
		// 		$("#troll").on("click", null).off("click")
		// 		$("#yuno").on("click", null).off("click")
		// 		$("#gusta").on("click", function() {
		// 			$("#enemy").append($("#gusta"))
		// 			$("#gusta").css("background-color", "red")
		// 			$(".btn").on("click", function() {
		// 				var tempHeroHP = parsInt($(this).attr("heroHP"))
		// 				console.log("this first works");
		// 				if (tempHeroHP > 0 && enemyHP > 0) {
		// 					console.log(AP[player.indexOf('alone')]);
		// 					$("#action").append("<br/><br/><p>You attacked Me Gusta for " + AP[alone] + " damage<br/>" + 
		// 						"Me Gusta attacked you back for " + CAP[gusta] + " damage</p>");
		// 				}  
		// 	        });
		// 		});
				


		// 	}));

		// 	if ($("#gusta").on("click", function() {
		// 		$(".pit").css("color", "black")
		// 		$("#aloneimg").animate({ height: "85px", width: "85px"})
		// 		$("#gustaimg").animate({ height: "85px", width: "85px"})
		// 		$("#trollimg").animate({ height: "85px", width: "85px"})
		// 		$("#yunoimg").animate({ height: "85px", width: "85px"})
		// 		$("#gusta").animate({ height: "150px", width: "150px"}).css("background-color", "lightgreen")
		// 		$("#alone").animate({ height: "150px", width: "150px"}).css("background-color", "yellow")
		// 		$("#troll").animate({ height: "150px", width: "150px"}).css("background-color", "yellow")
		// 		$("#yuno").animate({ height: "150px", width: "150px"}).css("background-color", "yellow")
		// 		$("#action").append('<button type="button" class="btn btn-danger btn-lg">Attack!</button>')
		// 		$("#hero").append($("#gusta"))
		// 		$("#gang").append($("#alone"))
		// 		$("#gang").append($("#troll"))
		// 		$("#gang").append($("#yuno"))
		// 		$(".overlay").empty()
		// 		$("#gusta").on("click", null).off("click");

		// 	}));

		// 	if ($("#troll").on("click", function() {
		// 		$(".pit").css("color", "black")
		// 		$("#aloneimg").animate({ height: "85px", width: "85px"})
		// 		$("#gustaimg").animate({ height: "85px", width: "85px"})
		// 		$("#trollimg").animate({ height: "85px", width: "85px"})
		// 		$("#yunoimg").animate({ height: "85px", width: "85px"})
		// 		$("#troll").animate({ height: "150px", width: "150px"}).css("background-color", "lightgreen")
		// 		$("#gusta").animate({ height: "150px", width: "150px"}).css("background-color", "yellow")
		// 		$("#alone").animate({ height: "150px", width: "150px"}).css("background-color", "yellow")
		// 		$("#yuno").animate({ height: "150px", width: "150px"}).css("background-color", "yellow")
		// 		$("#action").append('<button type="button" class="btn btn-danger btn-lg">Attack!</button>')
		// 		$("#hero").append($("#troll"))
		// 		$("#gang").append($("#alone"))
		// 		$("#gang").append($("#gusta"))
		// 		$("#gang").append($("#yuno"))
		// 		$(".overlay").empty()
		// 		$("#troll").on("click", null).off("click");
			

		// 	}));

		// 	if ($("#yuno").on("click", function() {
		// 		$(".pit").css("color", "black")
		// 		$("#aloneimg").animate({ height: "85px", width: "85px"})
		// 		$("#gustaimg").animate({ height: "85px", width: "85px"})
		// 		$("#trollimg").animate({ height: "85px", width: "85px"})
		// 		$("#yunoimg").animate({ height: "85px", width: "85px"})
		// 		$("#yuno").animate({ height: "150px", width: "150px"}).css("background-color", "lightgreen")
		// 		$("#gusta").animate({ height: "150px", width: "150px"}).css("background-color", "yellow")
		// 		$("#alone").animate({ height: "150px", width: "150px"}).css("background-color", "yellow")
		// 		$("#troll").animate({ height: "150px", width: "150px"}).css("background-color", "yellow")
		// 		$("#action").append('<button type="button" class="btn btn-danger btn-lg">Attack!</button>')
		// 		$("#hero").append($("#yuno"))
		// 		$("#gang").append($("#alone"))
		// 		$("#gang").append($("#gusta"))
		// 		$("#gang").append($("#troll"))
		// 		$(".overlay").empty()
		// 		$("#yuno").on("click", null).off("click");
			

		// 	}));