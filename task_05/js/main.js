let print1 = function() {
  console.log('Крот');
}
let print2 = function() {
  console.log('овце,');
}
let print3 = function() {
  console.log('жирафу,');
}
let print4 = function() {
  console.log('зайке');
}
let print5 = function() {
  console.log('голубые');
}
let print6 = function() {
  console.log('сшил');
}
let print7 = function() {
  console.log('фуфайки');
}

let func1 = function() {
  // ...
};

let func2 = function() {
  func1();

  setTimeout(function() {
      // ...
  }, 1000);
}

let func3 = function() {
  setTimeout(function() {
      func2();
      // ...
  }, 250);

  // ...
}

setTimeout(function() {
  // ...

  setTimeout(function() {
      // ...
  }, 750);
}, 500);

// ...

func3();