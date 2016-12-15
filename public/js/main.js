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

	// When user tries to fill a box, this will be invoked
	function clickListener(){
		if(!turn){
			if(grid[this.val] == ' '){
				grid[this.val] = 'X';
				err.innerHTML = "";
				render();
				turn = 1;
				var temp = winOrLose();

				if(temp == 1)
					err.innerHTML = "Computer wins";
				else if(temp == -1)
					err.innerHTML = "You Won";
				else{
					if(checkTie())
						err.innerHTML = "Game drawn!";
					else
						computersTurn();
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

	// Checks if the game is over
	function winOrLose(){
		var i, j;

		//Check Row-wise
		for(i = 0; i < 9; i += 3){
			if(grid[i] === grid[i + 1] && grid[i + 1] === grid[i + 2]){
				if(grid[i] == 'X')
					return -1;
				else if(grid[i] == 'O')
					return 1;
			}
		}

		//Check Column-wise
		for(i = 0; i < 3; i++){
			if(grid[i] === grid[i + 3] && grid[i + 3] === grid[i + 6]){
				if(grid[i] == 'X')
					return -1;
				else if(grid[i] == 'O')
					return 1;
			}
		}

		//Check Diagonally
		if((grid[0] === grid[4] && grid[4] == grid[8]) || (grid[2] == grid[4] && grid[4] == grid[6])){
			if(grid[4] == 'X')
					return -1;
				else if(grid[4] == 'O')
					return 1;	
		}

		return 0;
	}

	// Is it a TIE?
	function checkTie(){
		var i;

		for(i = 0; i < 9; i++){
			if(grid[i] == ' ')
				return 0;
		}

		return 1;
	}

	function computersTurn(){
		var temp = minimax(0, 1);
		grid[temp.set] = 'O';
		var temp = winOrLose();
		if(temp == 1)
			err.innerHTML = "Computer wins";
		else if(temp == -1)
			err.innerHTML = "You Won";
		else if(checkTie())
			err.innerHTML = "Match Drawn!";
		render();
		turn = 0;
	}

	function minimax(depth, player){
		var i, res = [], temp2;

		for(i = 0; i < grid.length; i++){
			if(grid[i] == ' '){

				if(player == 1)
					grid[i] = 'O';
				else
					grid[i] = 'X';

				var temp = winOrLose();

				if(temp == 1)
					res.push({set: i, ans: 10 - depth});
				else if(temp == -1)
					res.push({set: i, ans: -10 + depth});
				else if(checkTie())
					res.push({set: i, ans: 0 + depth});
				else {
					if(player == 1)
						temp2 = minimax(depth + 1, 0);
					else
						temp2 = minimax(depth + 1, 1);
					res.push({set: i, ans: temp2.ans});
				}

				grid[i] = ' ';
			}
		}

		var ans = 0;
		for(i = 1; i < res.length; i++){
			if(player == 1){
				if(res[i].ans > res[ans].ans)
					ans = i;
			}

			else {
				if(res[i].ans < res[ans].ans)
					ans = i;
			}
		}

		return res[ans];
	}

	init();
})();