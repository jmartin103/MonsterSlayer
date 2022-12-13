const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      log: []
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0) {
        if (this.monsterHealth <= 0) {
          this.winner = 'Draw'
        } else {
          this.winner = 'Monster' 
        } 
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        if (this.playerHealth <= 0) {
          this.winner = 'Draw' 
        } else {
          this.winner = 'Player'
        } 
      }  
    }
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return {
          width: '0%'  
        }
      } else {
        return {
          width: this.monsterHealth + '%'  
        }  
      } 
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return {
          width: '0%'  
        }  
      } else {
        return {
          width: this.playerHealth + '%'  
        }    
      } 
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 != 0
    },
    playerHealthIsFull() {
      return this.playerHealth == 100;  
    },
    gameOver() {
      return this.winner != null;
    },
    monsterWins() {
      return this.winner == 'Monster';  
    },
    playerWins() {
      return this.winner == 'Player';  
    },
    isDraw() {
      return this.winner == 'Draw'  
    }
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      let damage = getRandomValue(5, 12);
      this.monsterHealth -= damage;
      this.attackPlayer();
      this.addToLog('Player', 'Attack', damage)
    },
    attackPlayer() {
      let damage = getRandomValue(8, 15);
      this.playerHealth -= damage;
      this.addToLog('Monster', 'Attack', damage)
    },
    specialAttack() {
      this.currentRound++;
      let damage = getRandomValue(10, 25);
      this.monsterHealth -= damage;
      this.attackPlayer();
      this.addToLog('Player', 'Attack', damage)
    },
    healPlayer() {
      this.currentRound++;  
      let healAmt = getRandomValue(8, 20);
      if (this.playerHealth + healAmt > 100) {
        this.playerHealth = 100;
      }
      else {
        this.playerHealth += healAmt;
      }
      this.addToLog('Player', 'Heal', healAmt);
      this.attackPlayer();
    },
    surrender() {
      this.winner = 'Monster'
      this.addToLog('Player', 'Surrender', null);
    },
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.log = [];
    },
    addToLog(who, what, value) {
      this.log.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value  
      })  
    }
  }
});

app.mount('#game');