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
				var temp = winOrLose();

				if(temp == 1)
					err.innerHTML = "Computer wins";
				else if(temp == -1)
					err.innerHTML = "You Won";
				else{
					if(checkTie())
						err.innerHTML = "Game drawn!";
				}
			}

			else {
				err.innerHTML = "Invalid Move! It's already Filled!";
			}
		}

		else {
			err.innerHTML = "Why so excited? Not your turn!";
		}
	}

	function winOrLose(){
		var i, j;

		//Check Row-wise
		for(i = 0; i < 9; i += 3){
			if(grid[i] === grid[i + 1] && grid[i + 1] === grid[i + 2]){
				if(grid[i] == 'X')
					return -1;
				else if(grid[i] == 'O')
					return 1
			}
		}

		//Check Column-wise
		for(i = 0; i < 3; i++){
			if(grid[i] === grid[i + 3] && grid[i + 3] === grid[i + 6]){
				if(grid[i] == 'X')
					return -1;
				else if(grid[i] == 'O')
					return 1
			}
		}

		//Check Diagonally
		if((grid[0] === grid[4] && grid[4] == grid[8]) || (grid[2] == grid[4] && grid[4] == grid[6])){
			if(grid[4] == 'X')
					return -1;
				else if(grid[4] == 'O')
					return 1	
		}

		return 0;
	}

	function checkTie(){
		var i;

		for(i = 0; i < 9; i++){
			if(grid[i] == ' ')
				return 0;
		}

		return 1;
	}

	init();
})();