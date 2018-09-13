const school = {
  name: `Technologia`,
  adress: {
    line1: `258 rue 455`,
    line2: `65456 blvd 854`
  }
};

console.dir(school, { showHidden: true, depth: 0, colors: true });

function printNames() {
  console.time(`printNames()`);
  for (let i = 0; i < 100000; i++) {
    console.time(`itération`);
    console.trace(`school: ${school.name}`);
    console.timeEnd(`itération`);
  }
  console.timeEnd(`printNames()`);
}

// printNames();

// console.assert(school.name === `Technologia`, `L'école n'est pas la bonne!`);

// console.trace(`Node a éxécuté le script.`);
