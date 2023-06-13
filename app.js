// HELPER FUNCTIONS

function noNeg(num) {
  let fixedNum;
  if (num < 0) {
    fixedNum = 0;
  } else {
    fixedNum = num;
  }
  return fixedNum;
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Array of Smash Bros character names

const charNamesArr = [
  "Mario",
  "DK",
  "Link",
  "Samus",
  "Yoshi",
  "Kirby",
  "Fox",
  "Pikachu",
];

const fightButton = document.getElementById("fightButton");
const logBox = document.getElementById("logBox");

class Fighter {
  constructor(name, playerNum, hp = 10, str = 0, def = 0) {
    this.name = name;
    this.displayName = `<span class="${name}">${name}</span>`;
    this.upperCaseName = `<span class="${name}">${name.toUpperCase()}</span>`;
    this.playerNum = playerNum;
    this.hp = hp;
    this.str = str;
    this.def = def;
  }

  atk(defender, attacker = this) {
    // Sets attack power to random number between 6 and 10
    attacker.str = Math.floor(Math.random() * 5) + 6;
    // Sets defense power to random number between 4 and 9
    defender.def = Math.floor(Math.random() * 6) + 4;
    // NOTE: Ranges have been modified from original assignment instructions
    //       to speed things up (as even failed attacks are now logged) &
    //       to attempt to create more dynamic combat scenarios

    const atkrName = attacker.displayName;
    const defrName = defender.displayName;
    const damage = attacker.str - defender.def;
    const exchangeBox = document.createElement("div");
    exchangeBox.classList.add("exchange");

    // ARRAYS OF RANDOMIZED FLAVOR TEXT

    // Descriptions of attack, categorized by character
    let atkTextArray;
    switch (attacker.name) {
      case "Mario":
        atkTextArray = [
          `${atkrName} swings in to punch ${defrName}!`,
          `${atkrName} lobs a giant Fireball at ${defrName}!`,
          `${atkrName} goes to uppercut ${defrName} like a coin block!`,
          `${atkrName} spins his Cape toward ${defrName}!`,
        ];
        break;
      case "DK":
        atkTextArray = [
          `${atkrName} swings an open palm to smack ${defrName}!`,
          `${atkrName} slaps the ground, sending shock waves toward ${defrName}!`,
          `${atkrName} winds up and swings his giant fist at ${defrName}!`,
        ];
        break;
      case "Link":
        const arrowArray = ["a Fire", "an Ice", "a Light", "a Bomb"];
        atkTextArray = [
          `${atkrName} whips out his bow and fires ${randomPick(arrowArray)} Arrow at ${defrName}!`,
          `${atkrName} throws his Boomerang at ${defrName}!`,
          `${atkrName} thrusts the Master Sword directly at ${defrName}!`,
          `${atkrName} tosses a Bomb at ${defrName}!`,
        ];
        break;
      case "Samus":
        atkTextArray = [
          `${atkrName} drops a Morph Ball Bomb near ${defrName}!`,
          `${atkrName} performs a Screw Attack on ${defrName}!`,
          `${atkrName} sends a fully-charged shot from her Arm Cannon at ${defrName}!`,
        ];
        break;
      case "Yoshi":
        atkTextArray = [
          `${atkrName} tosses an Egg Bomb towards ${defrName}!`,
          `${atkrName} leaps up to perform a Flutter Kick at ${defrName}!`,
          `${atkrName} launches his tongue at ${defrName} to take a bite!`,
          `${atkrName} performs a Ground Pound toward ${defrName}!`,
        ];
        break;
      case "Kirby":
        atkTextArray = [
          `${atkrName} aims a flurry of fist jabs at ${defrName}!`,
          `${atkrName} floats upward and drops toward ${defrName} in Stone form!`,
          `${atkrName} leaps up to deliver a blow with his Sword at ${defrName}!`,
        ];
        break;
      case "Fox":
        atkTextArray = [
          `${atkrName} performs a tail sweep on ${defrName}!`,
          `${atkrName} fires his blaster at will toward ${defrName}!`,
          `Flames form around ${atkrName}'s body, who launches himself at ${defrName}!`,
        ];
        break;
      case "Pikachu":
        atkTextArray = [
          `${atkrName} launches himself head-first toward ${defrName}!`,
          `${atkrName} sends a bolt of electricity toward ${defrName}!`,
          `${atkrName} summons lightning from the sky in ${defrName}'s direction!`,
        ];
        break;
      default:
        atkTextArray = [`${atkrName} attacks ${defrName}!`];
    }

    const hitTextArray = [
      "HIT!",
      "SUCCESS!",
      "BOOM!",
      "OUCH!",
      "IT CONNECTS!",
      "KAPOW!",
      "WHAM!",
      "WOW!",
      "NICE!",
    ];

    const defTextArray = [
      `but the attack misses!`,
      `but ${defrName} dodges out of the way!`,
      `but the attack bounces off of ${defrName}'s energy shield!`,
    ];

    if (defender.name === "Link") {
      defTextArray.push(
        `but ${defrName}'s raises his Mirror Shield and deflects the attack!`
      );
    }
    if (defender.name === "Fox") {
      defTextArray.push(
        `but ${defrName} activates his Reflector to repel the attack!`
      );
    }

    // LOGGING THE FIGHT

    const attackLog = document.createElement("p");
    attackLog.innerHTML = randomPick(atkTextArray);
    attackLog.classList.add(`player${attacker.playerNum}`);
    exchangeBox.append(attackLog);

    const defenseLog = document.createElement("p");
    defenseLog.classList.add(`player${defender.playerNum}`);

    if (damage > 0) {
      defender.hp -= damage;

      defenseLog.innerHTML = `${randomPick(
        hitTextArray
      )} ${defrName} takes ${damage} damage and is down to <span class="hp">${noNeg(
        defender.hp
      )} HP</span`;
      defenseLog.classList.add(`player${defender.playerNum}`);
      console.log(defender.playerNum);
      exchangeBox.append(defenseLog);

      if (damage >= 5) {
        const crowdLog = document.createElement("h2");
        crowdLog.id = "crowd"
        crowdLog.innerText = `( The crowd chants: "${attacker.name.toUpperCase()}! ${attacker.name.toUpperCase()}! ${attacker.name.toUpperCase()}!" )`;
        exchangeBox.append(crowdLog);
      }
      logBox.append(exchangeBox);
      return;
    } else {
      defenseLog.innerHTML = `... ${randomPick(defTextArray)}`;
      exchangeBox.append(defenseLog);
      logBox.append(exchangeBox);
      return;
    }
  }
}

fightButton.addEventListener("click", () => {
  logBox.innerHTML = "";

  // CREATES TWO FIGHTERS, assigns them random SSB identities
  let player1 = new Fighter(randomPick(charNamesArr), "1");
  let player2 = new Fighter(randomPick(charNamesArr), "2");

  // Handles when both fighters are same character
  if (player1.name === player2.name) {
    player1.displayName = `<span class="${player1.name}">${player1.name} #1</span>`;
    player2.displayName = `<span class="${player2.name}">${player2.name} #2</span>`;
  }

  function combat(p1, p2) {
    const startLog = document.createElement("h1");
    startLog.innerHTML = `${p1.upperCaseName} vs ${p2.upperCaseName}!`;
    logBox.append(startLog);

    const readyGoLog = document.createElement("h2");
    readyGoLog.innerHTML = "READY? . . . GO!!";
    logBox.append(readyGoLog);

    // Initiates an attack, and logs the results after a killing blow
    function atkFunc(attacker, defender) {
      attacker.atk(defender);

      if (defender.hp < 1) {
        const winnerLog = document.createElement("h1");
        winnerLog.innerHTML = `The winner is . . . ${attacker.upperCaseName}!`;
        logBox.append(winnerLog);

        const resultsLog = document.createElement("h2");
        resultsLog.classList.add("hp")
        resultsLog.innerHTML = `Final HP's: ${p1.displayName} = ${noNeg(
          p1.hp
        )}, ${p2.displayName} = ${noNeg(p2.hp)}`;
        logBox.append(resultsLog);
      }
    }

    // Player 1 attacks Player 2, then if Player 2 isn't dead, they attack back
    // Loops until one player wins
    while (p1.hp > 0 && p2.hp > 0) {
      atkFunc(p1, p2);

      if (p2.hp > 0) {
        atkFunc(p2, p1);
      }
    }
  }

  combat(player1, player2);
});
