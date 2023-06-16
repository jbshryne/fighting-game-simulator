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

function randomPick(arr, random = Math.random()) {
  return arr[Math.floor(random * arr.length)];
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
    this.copying = false;
    switch (this.name) {
      case "Mario":
      case "DK":
      case "Link":
      case "Yoshi":
      case "Kirby":
      case "Fox":
      case "Pikachu":
        this.pronouns = {
          subj: "he",
          pred: "him",
          posv: "his",
        };
        break;
      case "Samus":
        this.pronouns = {
          subj: "she",
          pred: "her",
          posv: "her",
        };
        break;
      default:
        this.pronouns = {
          subj: "they",
          pred: "them",
          posv: "their",
        };
    }
  }

  atk(defender, attacker = this) {
    // Sets attack power to random number between 6 and 10
    const atkNumValue = Math.random();
    attacker.str = Math.floor(atkNumValue * 5) + 6;

    // Sets defense power to random number between 4 and 9
    defender.def = Math.floor(Math.random() * 6) + 4;
    // NOTE: Ranges have been modified from original assignment instructions
    //       to speed things up (as even failed attacks are now logged) &
    //       to attempt to create more dynamic combat scenarios

    let atkrName = attacker.displayName;
    let defrName = defender.displayName;
    let pn = attacker.pronouns;
    const damage = attacker.str - defender.def;

    const exchangeBox = document.createElement("div");
    exchangeBox.classList.add("exchange");

    // ARRAYS OF RANDOMIZED FLAVOR TEXT

    // Descriptions of attack, categorized by character
    let atkTextArray = [];

    function atksByCharacter(name) {
      switch (name) {
        case "Mario":
          return [
            `${atkrName} swings in to punch ${defrName}!`,
            `${atkrName} spins ${pn.posv} Cape toward ${defrName}!`,
            `${atkrName} lobs a giant Fireball at ${defrName}!`,
            `${atkrName} goes to uppercut ${defrName} like a coin block!`,
          ];
        case "DK":
          return [
            `${atkrName} swings an open palm to smack ${defrName}!`,
            `${atkrName} slaps the ground, sending shock waves toward ${defrName}!`,
            `With fists outstretched, ${atkrName} spins toward ${defrName} like a top!`,
            `${atkrName} winds up and swings ${pn.posv} giant fist at ${defrName}!`,
          ];
        case "Link":
          const arrowArray = ["a Fire", "an Ice", "a Light", "a Bomb"];
          return [
            `${atkrName} throws ${pn.posv} Boomerang at ${defrName}!`,
            `${atkrName} whips out ${pn.posv} bow and fires ${randomPick(
              arrowArray
            )} Arrow at ${defrName}!`,
            `${atkrName} thrusts the Master Sword directly at ${defrName}!`,
            `${atkrName} tosses a Bomb at ${defrName}!`,
          ];
        case "Samus":
          return [
            `${atkrName} aims ${pn.posv} Arm Cannon at ${defrName} and fires a barrage of shots!`,
            `${atkrName} drops a Morph Ball Bomb near ${defrName}!`,
            `${atkrName} performs a Screw Attack on ${defrName}!`,
            `${atkrName} sends a fully-charged Arm Cannon shot at ${defrName}!`,
          ];
        case "Yoshi":
          return [
            `${atkrName} launches ${pn.posv} tongue at ${defrName} to take a bite!`,
            `${atkrName} leaps up to perform a Flutter Kick at ${defrName}!`,
            `${atkrName} performs a Ground Pound toward ${defrName}!`,
            `${atkrName} tosses an Egg Bomb towards ${defrName}!`,
          ];
        case "Kirby":
          return [
            `${atkrName} aims a flurry of fist jabs at ${defrName}!`,
            `${atkrName} whips out ${pn.posv} Hammer to smash ${defrName}!`,
            `${atkrName} leaps forward to deliver a blow with ${pn.posv} Sword at ${defrName}!`,
            `${atkrName} floats upward and drops toward ${defrName} in Stone form!`,
          ];
        case "Fox":
          return [
            `${atkrName} performs a tail sweep on ${defrName}!`,
            `${atkrName} aims his Blaster at ${defrName} and fires at will!`,
            `${atkrName} goes to lash ${defrName} with his Energy Whip!`,
            `Flames form around ${atkrName}'s body, who launches himself at ${defrName}!`,
          ];
        case "Pikachu":
          return [
            `${atkrName} whips his jagged tail at ${defrName}!`,
            `${atkrName} sends a bolt of electricity toward ${defrName}!`,
            `${atkrName} launches himself head-first toward ${defrName}!`,
            `${atkrName} summons lightning from the sky in ${defrName}'s direction!`,
          ];
        default:
          return [`${atkrName} attacks ${defrName}!`];
      }
    }

    const arr1 = [...atksByCharacter(defender.name)];
    const arr2 = [...atksByCharacter("Kirby")];

    if (attacker.name === "Kirby" && attacker.copying) {
      let i = 0;
      while (arr1.length > 0 || arr2.length > 0) {
        if (i % 2 === 0 && arr1.length > 0) {
          let newAttack = arr1.shift();
          atkTextArray.push(newAttack, newAttack);
        } else if (i % 2 === 1 && arr2.length > 0) {
          let newAttack = arr2.shift();
          atkTextArray.push(newAttack);
        }
        i++;
      }
    } else {
      atkTextArray.push(...atksByCharacter(attacker.name));
    }

    // const hitTextArray = [
    //   "IT CONNECTS!",
    //   "HIT!",
    //   "GOT 'EM!",
    //   "NICE!",
    //   "BOOM!",
    //   "WHAM!",
    //   "OUCH!",
    //   "OOF!",
    //   "WOW!",
    //   "KAPOW!",
    //   "AMAZING!",
    //   "INCREDIBLE!",
    // ];

    function generateHitText(damage) {
      const hitTextArray = [];
      switch (damage) {
        case 1:
        case 2:
          hitTextArray.push("IT CONNECTS!", "HIT!", "GOT 'EM!", "NICE!");
          break;
        case 3:
        case 4:
          hitTextArray.push("BOOM!", "WHAM!", "OUCH!", "OOF!");
          break;
        case 5:
        case 6:
          hitTextArray.push("KAPOW!", "WOW!", "AMAZING!", "INCREDIBLE!");
          break;
        default:
          hitTextArray.push("HIT!");
      }

      return hitTextArray[Math.floor(Math.random() * hitTextArray.length)];
    }

    const hitText = generateHitText(damage);

    console.log(hitText)

    const defTextArray = [
      `but the attack misses!`,
      `but ${defrName} dodges out of the way!`,
      `but the attack bounces off of ${defrName}'s energy shield!`,
    ];

    if (defender.name === "Link") {
      defTextArray.push(
        `but ${defrName} raises his Mirror Shield and deflects the attack!`,
        `but ${defrName} raises his Mirror Shield and deflects the attack!`
      );
    }
    if (defender.name === "Fox") {
      defTextArray.push(
        `but ${defrName} activates his Reflector to repel the attack!`,
        `but ${defrName} activates his Reflector to repel the attack!`
      );
    }

    // LOGGING THE FIGHT

    const attackLog = document.createElement("p");

    if (
      attacker.name === "Kirby" &&
      defender.name !== "Kirby" &&
      !attacker.copying
    ) {
      let inhaleChance = Math.random();
      if (inhaleChance > 0.7) {
        attackLog.innerHTML = `${atkrName} briefly inhales ${defrName} to copy ${defender.pronouns.posv} abilities, becoming <span class="Kirby copying">${defender.name} Kirby</>!`;
        attackLog.classList.add(`player${attacker.playerNum}`);
        attacker.displayName = `<span class="Kirby copying">${defender.name} Kirby</span>`;
        attacker.copying = true;
        exchangeBox.append(attackLog);
        logBox.append(exchangeBox);
        return;
      }
    }

    attackLog.innerHTML = randomPick(atkTextArray, atkNumValue);
    attackLog.classList.add(`player${attacker.playerNum}`);
    exchangeBox.append(attackLog);

    const defenseLog = document.createElement("p");
    defenseLog.classList.add(`player${defender.playerNum}`);

    if (damage > 0) {
      defender.hp -= damage;

      defenseLog.innerHTML = `${hitText} ${defrName} takes ${damage} damage and is down to <span class="hp">${noNeg(
        defender.hp
      )} HP</span`;
      defenseLog.classList.add(`player${defender.playerNum}`);
      exchangeBox.append(defenseLog);

      if (damage >= 5) {
        if (defender.name === "Kirby" && defender.copying) {
          defender.copying = false;
          defender.displayName = `<span class="Kirby">Kirby</span>`;
          const eventLog = document.createElement("p");
          eventLog.classList.add(`player${defender.playerNum}`);
          eventLog.innerHTML = `<span class="Kirby">Kirby</span> loses his Copy ability!`;
          exchangeBox.append(eventLog);
        }
        const crowdLog = document.createElement("h2");
        crowdLog.id = "crowd";
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

function newMatch() {
  window.scrollTo(0, 0);
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

    // COPY TEST
    // player1.copying = true;
    function atkFunc(attacker, defender) {
      attacker.atk(defender);

      if (defender.hp < 1) {
        const winnerLog = document.createElement("h1");
        winnerLog.innerHTML = `The winner is . . . ${attacker.upperCaseName}!`;
        logBox.append(winnerLog);

        // console.log(typeof p1.displayName);

        if (p1.displayName.includes("copying"))
          p1.displayName = `<span class="${p1.name}">${p1.name}</span>`;
        if (p2.displayName.includes("copying"))
          p2.displayName = `<span class="${p2.name}">${p2.name}</span>`;

        // console.log("Final display names: ", p1.displayName, p2.displayName);

        const resultsLog = document.createElement("h2");
        resultsLog.classList.add("hp");
        resultsLog.innerHTML = `Final HP's: ${p1.displayName} = ${noNeg(
          p1.hp
        )}, ${p2.displayName} = ${noNeg(p2.hp)}`;
        logBox.append(resultsLog);
        const newMatchButton = document.createElement("button");
        newMatchButton.innerText = "NEW MATCH!";
        newMatchButton.style.marginTop = "30px";
        newMatchButton.addEventListener("click", newMatch);
        logBox.append(newMatchButton);
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
}

fightButton.addEventListener("click", newMatch);
