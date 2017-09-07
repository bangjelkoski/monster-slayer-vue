new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		logs: [],
	}, 
	methods: {
		gameInit: function(){
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
		},
		attack: function(){
			this.takeDmg(this.genDmg(10, 5), 0);
			this.takeDmg(this.genDmg(10, 2), 1);
		},
		heal: function(){
			var heal = this.genDmg(10, 5);
			this.playerHealth = (this.playerHealth + heal > 100) ? 100 : this.playerHealth += heal;
			this.logs.unshift({
				isPlayer: false,
				text: 'Player healed for: '+ heal,
			});
			this.takeDmg(this.genDmg(10, 2), 0);
		},
		specialAttack: function(){
			this.takeDmg(this.genDmg(20, 15), 0);
			this.takeDmg(this.genDmg(20, 5), 1);
		},
		giveUp: function(){
			this.gameIsRunning = false;
			this.playerHealth = 0;
			this.logs = [];
			alert('The monster have won the game!')
		},
		takeDmg: function(dmg, type){
			// Monster Lost
			if(this.monsterHealth - dmg <= 0 && this.gameIsRunning){
				this.monsterHealth = 0;
				alert('You have won the game!'); 
				this.gameIsRunning = false;
				this.logs = [];
			}else if(type && this.gameIsRunning){
				this.monsterHealth -= dmg;
				this.logs.unshift({
					isPlayer: false,
					text: 'Player took: '+ dmg +' damage to the monster!',
				});
			}else if(this.playerHealth - dmg <= 0 && this.gameIsRunning){
				this.playerHealth = 0;
				alert('The monster have won the game!'); 
				this.gameIsRunning = false;
				this.logs = [];
			}else if(!type && this.gameIsRunning){
				this.playerHealth -= dmg;
				this.logs.unshift({
					isPlayer: true,
					text: 'Monster took: '+ dmg +' damage to the player!',
				});
			}
		},
		genDmg: function(max, min){
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
	},


});