function checkForm()
	{
		var username = document.getElementById("username").value;
		var password1 = document.getElementById("password1").value;
		var password2 = document.getElementById("password2").value;		

		var valid = false;		
		var all_fields = true;
		if (username == "")
		{
			all_fields = false;
			document.getElementById("username").style.backgroundColor = "red";
		}
		else
			document.getElementById("username").style.backgroundColor = "white";

		if (password1 == "")
		{
			all_fields = false;
			document.getElementById("password1").style.backgroundColor = "red";
		}
		else
			document.getElementById("password1").style.backgroundColor = "white";

		if (password2 == "")
		{
			all_fields = false;
			document.getElementById("password2").style.backgroundColor = "red";
		}
		else
			document.getElementById("password2").style.backgroundColor = "white";

		if (all_fields == true)
		{
			if (password1 == password2)
			{
				alert("Welcome "+username);
				valid = true;
			}
			else
			{
				document.getElementById("password1").style.backgroundColor = "red";
				document.getElementById("password2").style.backgroundColor = "red";
			}
		}
		
		return valid;
			
	}