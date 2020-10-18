function Delete(button)
    {
		var parent = button.parentNode;
		var grand_father = parent.parentNode;
		grand_father.removeChild(parent);
	}
