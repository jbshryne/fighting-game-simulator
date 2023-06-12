// Array of Smash Bros character names

const charNames = [
  "Mario",
  "DK",
  "Link",
  "Samus",
  "Yoshi",
  "Kirby",
  "Fox",
  "Pikachu",
];

class Fighter {
  constructor(name, hp = 10, str = 0, def = 0) {
    this.name = name;
    this.displayName = name;
    this.hp = hp;
    this.str = str;
    this.def = def;
  }

  atk(defender, attacker = this) {
    // Sets attack power to random number between 6 and 10
    attacker.str = Math.floor(Math.random() * 5) + 6;
    // Sets defense power to random number between 4 and 8
    defender.def = Math.floor(Math.random() * 5) + 4;
    // NOTE: Ranges have been modified from original assignment instructions
    //       to speed things up (as even failed attacks are now logged) &
    //       to attempt to create more dynamic combat scenarios

    const atkrName = attacker.displayName;
    const defrName = defender.displayName;
    const damage = attacker.str - defender.def;

    // ARRAYS OF RANDOMIZED FLAVOR TEXT

    // Descriptions of attack, categorized by character
    let atkTextArray;
    switch (attacker.name) {
      case "Mario":
        atkTextArray = [
          `${atkrName} swings in to punch ${defrName}!`,
          `${atkrName} lobs a giant Fireball at ${defrName}!`,
          `${atkrName} goes to uppercut ${defrName} like a coin block!`,
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
        atkTextArray = [
          `${atkrName} whips out his bow and fires an arrow at ${defrName}!`,
          `${atkrName} throws his Boomerang at ${defrName}!`,
          `${atkrName} thrusts the Master Sword directly at ${defrName}!`,
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
      `but the attack bounces off of ${defrName}'s shield!`,
    ];

    // LOGGING THE FIGHT

    console.log(atkTextArray[Math.floor(Math.random() * atkTextArray.length)]);

    if (damage > 0) {
      defender.hp -= damage;
      console.log(
        " ...",
        hitTextArray[Math.floor(Math.random() * hitTextArray.length)],
        `${defrName} takes`,
        damage,
        "damage and is down to",
        noNeg(defender.hp),
        "HP"
      );
      if (damage >= 5) {
        console.log(
          `( The crowd chants: "${attacker.name.toUpperCase()}! ${attacker.name.toUpperCase()}! ${attacker.name.toUpperCase()}!" )`
        );
      }

      return;
    } else {
      console.log(
        " ...",
        defTextArray[Math.floor(Math.random() * defTextArray.length)]
      );
      return;
    }
  }
}

// HELPER FUNCTION to avoid negative numbers
function noNeg(num) {
  let fixedNum;
  if (num < 0) {
    fixedNum = 0;
  } else {
    fixedNum = num;
  }
  return fixedNum;
}

// CREATES TWO FIGHTERS, assigns them random SSB identities
let player1 = new Fighter(
  charNames[Math.floor(Math.random() * charNames.length)]
);
let player2 = new Fighter(
  charNames[Math.floor(Math.random() * charNames.length)]
);

// Handles when both fighters are same character
if (player1.name === player2.name) {
  player1.displayName += " #1";
  player2.displayName += " #2";
}

function combat(p1, p2) {
  console.log(`${p1.name.toUpperCase()} vs ${p2.name.toUpperCase()}!`);
  console.log("READY? ... GO!!");

  // Initiates an attack, and logs the results after a killing blow
  function atkFunc(attacker, defender) {
    attacker.atk(defender);

    if (defender.hp < 1) {
      console.log(`The winner is ... ${attacker.displayName.toUpperCase()}!`);
      console.log(
        `Final HP's: ${p1.displayName} = ${noNeg(p1.hp)}, ${
          p2.displayName
        } = ${noNeg(p2.hp)}`
      );
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