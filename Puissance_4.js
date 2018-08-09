(function($) {
$.fn.puissance_4 = function(width = 7, height = 6, player1 = "Player 1", player2 = "Player 2", couleur1 = "yellow", 
							couleur2 = "red", maxRound = 3) {
	if (width >= 10) { width = 9} if (height >= 10) { height = 9}
	if(couleur1 == couleur2) {couleur1 = "yellow"; couleur2 = "red";}
	$("head").append("<style></style>");
	$("style").append("table{border:1px solid black;border-radius:5px}td{margin:4px;background-color:white;"+
		"border:1px solid black;width:100px;height:100px;border-top-left-radius: 50px;"+
		"border-top-right-radius: 50px;border-bottom-right-radius: 50px;border-bottom-left-radius: 50px;;}"+
		"tr{background-color:lightblue;display:flex;width:100%}tbody{display:block;width:100%}.dot{left:-2px;"+
		"height:95%;width:95%;border-radius:50%;border:4px solid black;display:inline-block}.yellow{"+
		"background-color:"+couleur1+"}.red{background-color:"+couleur2+"}");
	var arr = new Array(), player = 1, count = 1, color = "yellow", win1 = 0, win2 = 0, roundWon = false, cancelCell;
	win1 = localStorage.getItem("player1") == null ? win1 : localStorage.getItem("player1");
	win2 = localStorage.getItem("player2") == null ? win2 : localStorage.getItem("player2");
	$("div").append("<table id='p4'></table>");
	$("div").append("<score><player1>Player 1 : "+win1+"</player1><br><player2>Player 2 : "+win2+"</player2></score>");

	for (var h = 1; h <= height; h++) {
		$("#p4").append("<tr>");
		for (var w = 1; w <= width; w++) {
			$("tr:last").append("<td id=\""+h + w +"\" row=\""+h+"\" col=\""+w+"\"></td>");
			arr[h.toString()+w.toString()] = 0;
		}
		$("#p4").append("</tr>");
	}
	$("#p4").before("<h1 style='font-family:\"Georgia\"'>Puissance 4</h1>")
	$("#p4").before("<h3 id='info' style='font-family:\"Georgia\"'>Tour du joueur "+(player == 1 ? player1 : player2)+"</h3>");
	$("#p4").before("<button id='replay' style='border-radius:5px; background-color:skyblue'>Rejouer</button>"+
					"<button id='cancel' style='border-radius:5px; background-color:skyblue'>Cancel</button>"+
					"<button id='reset' style='border-radius:5px; background-color:skyblue'>Reset Score</button>")

	$("table").click(function(e) {
		if (roundWon) {return false;}
		lastcell = height.toString() + $(e.target).attr("col").toString();
		dropToken(lastcell);
	});

	$("#replay").click(() => {
		$("div").html("");
		arr = [];
		$("div").puissance_4(width, height, couleur1, couleur2, maxRound);
		roundWon = !roundWon;
	});
	$("#cancel").click(() => {
		arr[cancelCell] = 0;
		playerTurn();
		$("#"+cancelCell).html("");
	});
	$("#reset").click(() => {
		localStorage.setItem('player1', 0);
		localStorage.setItem('player2', 0);
		$("#replay").click();
	});

	function dropToken(lastcell) {
		lastcell = parseInt(lastcell);
		cancelCell = lastcell;
		if (lastcell < 11) { return false;}
		if (arr[lastcell] == 0) {
			arr[lastcell] = player;
			$("#"+lastcell).html("<span col=\""+$("#"+lastcell).attr("col")+
				"\" style=\"position:relative;top:-300px;\" id=\""+player+lastcell+
				"\"class=\"dot "+color+"\"></span>");
			$("#"+player+lastcell).animate({ "top": "-2px" }, "fast" );
			if(checkFour(lastcell)) { countWin(); return false;}
			playerTurn();
		} else {
			dropToken(lastcell-10)
		}
	}

	function checkDiag(alignFour) {
		for (var i = 0; i <= alignFour.length - 1; i++) {
			var cnt = 1;
			if (alignFour[i] == player) {
				for (var j = 1; j < 4; j++) {
					if (alignFour[i+j] == player) {
						cnt++;
					}
				}
			}
			if (cnt == 4) { return true;}
		}
		return false;
	}

	function checkFour(lastcell) {
		var alignFour = new Array();
		// Diag Left to Right
		for (var i = -33; i <= 33; i = i +11) {
			alignFour.push(arr[lastcell+ i]);
		}
		if (checkDiag(alignFour)) { return true;}
		// Vertical
		alignFour = [];
		for (var i = -30; i <= 30; i = i +10) {
			alignFour.push(arr[lastcell+ i]);
		}
		// Diag Right to Left
		if (checkDiag(alignFour)) { return true;}
		alignFour = [];
		for (var i = -27; i <= 27; i = i +9) {
			alignFour.push(arr[lastcell+ i]);
		}
		if (checkDiag(alignFour)) { return true;}
		// Left Right Horizontal
		alignFour = [];
		for (var i = -3; i <= 3; i = i +1) {
			alignFour.push(arr[lastcell+ i]);
		}
		if (checkDiag(alignFour)) { return true;}
	}

	function playerTurn() {
		var count = 0;
		$.each(arr, (k, v) => {
			if (v == 0) {
				count++;
			}
		});
		if (count == 0) {
			$("#info").html("Match nul");
			return false;
		}
		player = player == 1 ? 2 : 1;
		color = color == "yellow" ? "red" : "yellow";
		$("#info").html("Tour du joueur "+(player == 1 ? player1 : player2));
	}

	function countWin() {
		if (player == 1) {
			win1++;
			$("player1").html("Player 1 : "+win1);
			if (win1 >= maxRound) {
				$("#info").html("Le joueur "+(player == 1 ? player1 : player2)+" a gagné la game.");
				localStorage.setItem('player1', 0);
				localStorage.setItem('player2', 0);
				roundWon = 1;
				return 1;
			}
		} else {
			win2++;
			$("player2").html("Player 2 : "+win2);
			if (win2 >= maxRound) {
				$("#info").html("Le joueur "+(player == 1 ? player1 : player2)+" a gagné la game.");
				localStorage.setItem('player1', 0);
				localStorage.setItem('player2', 0);
				roundWon = 1;
				return 1;
			}
		}
		roundWon = true;
		localStorage.setItem('player1', win1);
		localStorage.setItem('player2', win2);
		$("#info").html("Le joueur "+(player == 1 ? player1 : player2)+" a gagné la manche.");
		return 1;
	}
};
})(jQuery);

$(document).ready(function () {
	// Demarrage du plugin pour soutenance
	$("div").puissance_4(7,6,"Paul");
});