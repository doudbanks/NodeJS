const { Door } = require('door');

const detector1 = new Door();
const detector2 = new Door();

console.log('events - start');

const watching = (data) => { console.log('test'); };
detector1.listenOpening(watching);

// const util = require('util');
// console.log(util.inspect(detector1.listeners('DOOR_OPEN')));

detector1.listenOpening((data) => {
  console.log('I am watching you: ', data);
});

detector1.listenOpening(() => {
  console.log('ACCESS GRANTED!');
});

detector2.listenOpening(() => {
  console.log('OKAY');
});

// detector1.emit('DOOR_OPEN', { employeeId: 1, ts: new Date().getTime() });

detector1.open({ id: 1, role: 'ADMIN' });

console.log('events - end');
