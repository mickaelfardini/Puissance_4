(function($) {
$.fn.puissance_4 = function(width = 7, height = 6, couleur1 = "", couleur2 = "") {

	var arr = new Array();
	var player = 1;
	var color = "yellow";
	
	$("div").append("<table></table>");

	for (var h = 1; h <= height; h++) {
		$("table").append("<tr>");
		for (var w = 1; w <= width; w++) {
			$("tr:last").append("<td id=\""+h + w +"\" row=\""+h+"\" col=\""+w+"\">"+h + w + "</td>");
			arr[h.toString()+w.toString()] = 0;
		}
		$("table").append("</tr>");
	}

	$(document).click(function(e) {
		// console.log(arr);
		// console.log($(e.target).attr("col") + $(e.target).attr("row"));
		lastcell = height.toString() + $(e.target).attr("col").toString();
		dropToken(lastcell);
	});

	function dropToken(lastcell) {
		if (lastcell < 11) { return false;}
		if (arr[lastcell] == 0) {
			arr[lastcell] = player;
			$("#"+lastcell).html("<span class=\"dot "+color+"\"></span>");
			playerTurn();
		} else {
			dropToken(parseInt(lastcell)-10)
		}
	}

	function playerTurn() {
		player = player == 1 ? 2 : 1;
		color = color == "yellow" ? "red" : "yellow";
	}
};
})(jQuery);

$(document).ready(function () {
	$("div").puissance_4();	
});