class Fighter {
  constructor(name, hp = 10, str = 0, def = 0) {
    this.name = name;
    this.hp = hp;
    this.str = str;
    this.def = def;
  }

  atk(defender, attacker = this) {
    attacker.str = Math.floor(Math.random() * 6) + 5;
    defender.def = Math.floor(Math.random() * 6) + 5;
    const damage = attacker.str - defender.def;
    if (damage > 0) {
      defender.hp -= damage;
      console.log(`${attacker.name} did ${damage} damage to ${defender.name}!`);
      console.log(`> ${defender.name}'s HP is down to ${noNeg(defender.hp)}`);
      return damage;
    } else {
      //   console.log(`${defender.name} blocked the attack!`);
      return 0;
    }
  }
}

function noNeg(num) {
  let fixedNum;
  if (num < 0) {
    fixedNum = 0;
  } else {
    fixedNum = num;
  }
  return fixedNum;
}

const charNames = [
  "Ryu",
  "E. Honda",
  "Blanka",
  "Guile",
  "Ken",
  "Chun-Li",
  "Zangief",
  "Dhalsim",
];

let player1 = new Fighter(charNames[Math.floor(Math.random() * 8)]);
let player2 = new Fighter(charNames[Math.floor(Math.random() * 8)]);

if (player1.name === player2.name) {
  player1.name += " #1";
  player2.name += " #2";
}

// console.log(player1, player2)

function combat(p1, p2) {
  function atkFunc(attacker, defender) {
    attacker.atk(defender);
    if (defender.hp < 1) {
      console.log(`${attacker.name.toUpperCase()} WINS!`);
    }
  }

  while (p1.hp > 0 && p2.hp > 0) {
    atkFunc(p1, p2);

    if (p2.hp > 0) {
      atkFunc(p2, p1);
    }
  }

  console.log(
    `Final HP's: ${p1.name} = ${noNeg(p1.hp)}, ${p2.name} = ${noNeg(p2.hp)}`
  );
}

combat(player1, player2);
