$( document ).ready( function ( ){

	function showRooms(str) {
		var xhttp;
		if (str == "") {
			document.getElementById("txtHint").innerHTML = "";
			return;
		}
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var list_html;
				for( var i=0; i < str.length; i++) {
					list_html +=  "<option>" + str[i] + "</option>";
                }
				$("#roomNum").html(list_html);
			}
		};
		xhttp.open("GET", "getrooms/" + str, true);
		xhttp.send();
	}
	
	
}