function checkForm() {
		var title = document.getElementById("title").value;
		var tags = document.getElementById("tags").value;
		var ingredients = document.getElementById("ingredients").value;	
        var instructions = document.getElementById("instructions").value;

		var valid = false;		
		var all_fields = true;
		if (title == "")
		{
			all_fields = false;
			document.getElementById("title").style.backgroundColor = "#CD5C5C";
		}
		else
			document.getElementById("title").style.backgroundColor = "white";

		if (tags == "")
		{
			all_fields = false;
			document.getElementById("tags").style.backgroundColor = "#CD5C5C";
		}
		else
			document.getElementById("tags").style.backgroundColor = "white";

		if (ingredients == "")
		{
			all_fields = false;
			document.getElementById("ingredients").style.backgroundColor = "#CD5C5C";
		}
		else
			document.getElementById("ingredients").style.backgroundColor = "white";

        if (instructions == "")
		{
			all_fields = false;
			document.getElementById("instructions").style.backgroundColor = "#CD5C5C";
		}
		else
			document.getElementById("instructions").style.backgroundColor = "white";
		
		if (all_fields == true)
		{
			valid = true;
		}
        else 
            valid = false;
		
		return valid;	
}

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#foodimg')
				.attr('src', e.target.result)
				.width(500)
				.height(500);
		};

		reader.readAsDataURL(input.files[0]);
	}
}