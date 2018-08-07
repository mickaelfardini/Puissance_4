(function($) {
$.fn.puissance_4 = function(width = 7, height = 6, couleur1 = "yellow", couleur2 = "red") {
	if (width >= 10) { width = 9} if (height >= 10) { height = 9}
	$("head").append("<style></style>");
	$("style").append("td{border:1px solid black;width:100px;height:100px}table{display:block;width:100%}"+
		"tr{display:flex;width:100%}tbody{display:block;width:100%}.dot{height:90%;width:90%;border-radius:"+
		"50%;border:4px solid black;display:inline-block}.yellow{background-color:"+couleur1+"}."+
		"red{background-color:"+couleur2+"}");
	var arr = new Array(), player = 1, count = 1, color = "yellow", win1 = 0, win2 = 0;
	win1 = localStorage.getItem("player1") == null ? win1 : localStorage.getItem("player1");
	win2 = localStorage.getItem("player2") == null ? win2 : localStorage.getItem("player2");
	console.log(localStorage, win1, win2);
	$("div").append("<table></table>");
	$("div").append("<score><player1>Player 1 : "+win1+"</player1><br><player2>Player 2 : "+win2+"</player2></score>");

	for (var h = 1; h <= height; h++) {
		$("table").append("<tr>");
		for (var w = 1; w <= width; w++) {
			$("tr:last").append("<td id=\""+h + w +"\" row=\""+h+"\" col=\""+w+"\"></td>");
			arr[h.toString()+w.toString()] = 0;
		}
		$("table").append("</tr>");
	}

	$(document).click(function(e) {
		lastcell = height.toString() + $(e.target).attr("col").toString();
		dropToken(lastcell);
	});

	function dropToken(lastcell) {
		lastcell = parseInt(lastcell);
		if (lastcell < 11) { return false;}
		if (arr[lastcell] == 0) {
			arr[lastcell] = player;
			$("#"+lastcell).html("<span col=\""+$("#"+lastcell).attr("col")+
				"\" style=\"position:relative;top:-300px;\" id=\""+player+lastcell+
				"\"class=\"dot "+color+"\"></span>");
			$("#"+player+lastcell).animate({ "top": "0px" }, "fast" );
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

	function checkFour(lastcell, dir = "tl") {
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
		player = player == 1 ? 2 : 1;
		color = color == "yellow" ? "red" : "yellow";
	}

	function countWin() {
		if (player == 1) {
			win1++;
			$("player1").html("Player 1 : "+win1);
			if (win1 >= 3) {
				$("div").prepend("<h1>Le joueur "+player+" a gagné.");
				localStorage.setItem('player1', 0);
				localStorage.setItem('player2', 0);
				return 1;
			}
		} else {
			win2++;
			$("player2").html("Player 2 : "+win2);
			if (win2 >= 3) {
				$("div").prepend("<h1>Le joueur "+player+" a gagné.");
				localStorage.setItem('player1', 0);
				localStorage.setItem('player2', 0);
				return 1;
			}
		}
		localStorage.setItem('player1', win1);
		localStorage.setItem('player2', win2);
		$("div").html("");
		$("div").prepend("<h1>Le joueur "+player+" a gagné.");
		arr = [];
		$("div").puissance_4();
	}
};
})(jQuery);

$(document).ready(function () {
	$("div").puissance_4();	
});