(function(){
	var grid = [] //stores the value of each grid field,
		col = document.getElementsByClassName("col"),
		turn = 0, //0 means player, 1 means computer
		err = document.getElementsByClassName("error")[0]; 

	function render(){
		var i;
		for(i = 0; i < 9; i++){
			col[i].innerHTML = grid[i];
		}
	}

	// Initialise the grid and add event listener for user click
	function init(){
		var i;
		
		for(i = 0; i < 9; i++){
			grid[i] = " ";
			col[i].val = i;
			col[i].addEventListener("click", clickListener, false);
		}

		render();
	}

	function clickListener(){
		if(!turn){
			if(grid[this.val] == ' '){
				grid[this.val] = 'X';
				err.innerHTML = "";
				render();
			}

			else {
				err.innerHTML = "Invalid Move! It's already Filled!";
			}
		}

		else {
			err.innerHTML = "Why so excited? Not your turn!";
		}
	}

	init();
})();