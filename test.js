import HashMap from "./hashmap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");

console.log(`the current load level is ${test._size / test._capacity}`);

test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");

console.log(`the current load level is ${test._size / test._capacity}`);

test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(`the current load level is ${test._size / test._capacity}`);
console.log(`now the capacity is ${test._capacity}`);

// the following should trigger a resize

test.set("moon", "silver");
console.log(`the current load level is ${test._size / test._capacity}`);
console.log(`now the capacity is ${test._capacity}`);

console.log("get apple ->", test.get("apple"));
console.log("get unknown ->", test.get("unknown"));

console.log("has banana ->", test.has("banana"));
console.log("has zebra ->", test.has("zebra"));

console.log("remove carrot ->", test.remove("carrot"));
console.log("remove carrot again ->", test.remove("carrot"));

console.log(
  "size ->",
  test.size !== undefined
    ? test.size
    : typeof test.length === "function"
    ? test.length()
    : test._size
);

console.log("keys ->", test.keys());
console.log("values ->", test.values());
console.log("entries ->", test.entries());

test.clear();
console.log(
  "after clear size ->",
  test.size !== undefined
    ? test.size
    : typeof test.length === "function"
    ? test.length()
    : test._size
);
console.log("after clear keys ->", test.keys());
console.log("after clear values ->", test.values());
console.log("after clear entries ->", test.entries());
