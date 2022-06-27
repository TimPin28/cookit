function checkForm()
	{
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;

		var valid = false;		
		var all_fields = true;
        
		if (username == "")
		{
			all_fields = false;
			document.getElementById("username").style.backgroundColor = "#CD5C5C";
		}
		else
			document.getElementById("username").style.backgroundColor = "white";

		if (password1 == "")
		{
			all_fields = false;
			document.getElementById("password").style.backgroundColor = "#CD5C5C";
		}
		else
			document.getElementById("password").style.backgroundColor = "white";


		if (all_fields == true)
		{
			if (password == password)
			{
				alert("Welcome "+username);
				valid = true;
			}
			else
			{
				document.getElementById("password").style.backgroundColor = "#CD5C5C";
			}
		}
		
		return valid;
			
	}