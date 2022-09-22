/**
 * Considering the bellow array, return the entries that have an age greater than 23
 * and convert their name to include only the first letter
 */

const students = [{
    name: "John",
    age: 24,
  },
  {
    name: "Alice",
    age: 10,
  },
  {
    name: "Mary",
    age: 19,
  },
  {
    name: "Olly",
    age: 30,
  },
  {
    name: "Steven",
    age: 14,
  },
];

// (1)
const result = students.filter(student => {
  student.name = student.name[0];
  return student.age > 23
})

console.log(result);

// (2)
const result2 = students.filter(student => student.age > 23).map(student => {
  return {
    name: student.name.charAt(0),
    age: student.age
  };
});

console.log(result2);

// returns [{ name: "J", age: 24 }, {name: "O", age: 30}]

/**
 * Return the first 2 elements that have a score greater than 100
 * and return the list with their scores tripled
 * Don't use Array.prototype.filter for this one :P
 */

const teams = [{
    name: "Manchester",
    score: 90,
  },
  {
    name: "Liverpool",
    score: 300,
  },
  {
    name: "Real Madrid",
    score: 150,
  },
  {
    name: "PSG",
    score: 350,
  },
  {
    name: "Dinamo",
    score: 5,
  },
];

// (1)
const result3 = teams.reduce((arr, team) => {

  if (team.score > 100) {
    arr.push({
      name: team.name,
      score: team.score * 3
    });
  }

  return arr;

}, []).slice(0, 2);

console.log(result3);

// (2)
const arr = [];

teams.forEach(team => {
  if (team.score > 100) {
    arr.push({
      name: team.name,
      score: team.score * 3
    });
  }
});

const result4 = arr.slice(0, 2);
console.log(result4);

// returns: [{ name: "Liverpool", score: 900, name: "Real Madrid": 450 }]

/**
 * Considering the following nested object, make that all of its properties cannot be ever changed
 * So it will only have readonly properties.
 */

const collection = {
  item: {
    properties: {
      name: "abc",
      metadata: {
        m1: "v1",
        m2: "v2",
      },
    },
  },
  value: 50,
  data: {
    score: {
      max: 50,
    },
  },
};

function deepFreeze(object) {
  // Retrieve all property names
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

deepFreeze(collection);

const changeProp = () => {
  'use strict'
  try {
    collection.item.properties.metadata.m1 = "v3";
  } catch (e) {
    console.warn(e.message);
  }
};

changeProp();

/**
 * After appling the solution,
 * if I attempt to change collection.item.properties.metadata.m1
 * or any other combination of properties, no effect should take place
 * Bonus: You can throw an error on attempting to change a readonly property
 *  */