function checkForm()
	{
		var title = document.getElementById("title").value;
		var tags = document.getElementById("tags").value;
		var ingredients = document.getElementById("ingredients").value;	
        var instructions = document.getElementById("instructions").value;		


		var valid = false;		
		var all_fields = true;
		if (title == "")
		{
			all_fields = false;
			document.getElementById("title").style.backgroundColor = "red";
		}
		else
			document.getElementById("title").style.backgroundColor = "white";

		if (tags == "")
		{
			all_fields = false;
			document.getElementById("tags").style.backgroundColor = "red";
		}
		else
			document.getElementById("tags").style.backgroundColor = "white";

		if (ingredients == "")
		{
			all_fields = false;
			document.getElementById("ingredients").style.backgroundColor = "red";
		}
		else
			document.getElementById("ingredients").style.backgroundColor = "white";

        if (instructions == "")
		{
			all_fields = false;
			document.getElementById("instructions").style.backgroundColor = "red";
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