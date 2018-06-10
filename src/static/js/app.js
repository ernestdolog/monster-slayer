/**
 * 
 */
new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		turns: []
	},
	methods: {
		startGame: function () {
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.turns = [];
		},
		attack: function () {
			let min = 3;
			let max = 10;
			let damage = this.calculateDamage(min, max);
			this.monsterHealth -= damage;
			this.hitLog('Player', 'Monster', damage, true)
			
			if (this.checkWin()) {
				return;
			}
			
			this.monsterAttack();
		},
		specialAttack: function () {
			let min = 10;
			let max = 20;
			let damage = this.calculateDamage(min, max);
			this.monsterHealth -= damage;
			this.hitLog('Player', 'Monster', damage, true)
			
			if (this.checkWin()) {
				return;
			}
			
			this.monsterAttack();
		},
		heal: function () {
			let healthBefore = this.playerHealth;
			this.playerHealth = Math.min(this.playerHealth + 10, 100);
			this.healLog('Player', this.playerHealth - healthBefore)
			this.monsterAttack();
		},
		giveUp: function () {
			this.gameIsRunning = false;
		},
		monsterAttack: function () {
			let min = 5;
			let max = 12;
			let damage = this.calculateDamage(min, max);
			this.playerHealth -= damage;
			this.hitLog('Monster', 'Player', damage, false)
			this.checkWin();
		},
		calculateDamage: function (min, max) {
			return Math.max(Math.floor((Math.random() * 10)) + 1, min);
		},
		checkWin: function () {
			if (this.monsterHealth <= 0) {
				if (confirm ('You won! New game?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			} else if (this.playerHealth <= 0) {
				if (confirm ('The monster won! New game?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			}
			return false;
		},
		hitLog: function (attacker, target, damage, isPlayer) {
			this.turns.unshift({
				isPlayer: isPlayer,
				text: attacker + ' hits ' + target + ' for ' + damage + '.'
			});
		},
		healLog: function (target, heal) {
			this.turns.unshift({
				isPlayer: true,
				text: target + ' healed for ' + heal + '.'
			});
		}
	}
});