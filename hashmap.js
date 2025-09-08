// hashmap.js

function HashMap(initialCapacity = 16, loadFactor = 0.75) {
  this._capacity = Math.max(1, Math.floor(initialCapacity));
  this._loadFactor = loadFactor;
  this._size = 0;
  this._buckets = Array.from({ length: this._capacity }, () => []);
}

HashMap.prototype._hash = function (key) {
  let hashCode = 0;
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this._capacity;
  }

  return hashCode;
};

HashMap.prototype._findIndexInBucket = function (bucket, key) {
  for (let i = 0; i < bucket.length; i++) {
    if (bucket[i].k === key) return i;
  }
  return -1;
};

HashMap.prototype._resize = function (newCapacity) {
  const oldBuckets = this._buckets;
  this._capacity = newCapacity;
  this._buckets = Array.from({ length: this._capacity }, () => []);
  this._size = 0;

  for (let b = 0; b < oldBuckets.length; b++) {
    const bucket = oldBuckets[b];
    for (let i = 0; i < bucket.length; i++) {
      const entry = bucket[i];
      this.set(entry.k, entry.v);
    }
  }
};

HashMap.prototype.set = function (key, value) {
  const index = this._hash(key);
  const bucket = this._buckets[index];
  const foundIndex = this._findIndexInBucket(bucket, key);

  if (foundIndex >= 0) {
    bucket[foundIndex].v = value;
  } else {
    bucket.push({ k: key, v: value });
    this._size++;

    if (this._size / this._capacity > this._loadFactor) {
      this._resize(this._capacity * 2);
    }
  }
  return this;
};

HashMap.prototype.get = function (key) {
  const index = this._hash(key);
  const bucket = this._buckets[index];
  const foundIndex = this._findIndexInBucket(bucket, key);
  if (foundIndex >= 0) return bucket[foundIndex].v;
  return undefined;
};

HashMap.prototype.has = function (key) {
  const index = this._hash(key);
  const bucket = this._buckets[index];
  return this._findIndexInBucket(bucket, key) >= 0;
};

HashMap.prototype.remove = function (key) {
  const index = this._hash(key);
  const bucket = this._buckets[index];
  const foundIndex = this._findIndexInBucket(bucket, key);
  if (foundIndex >= 0) {
    bucket.splice(foundIndex, 1);
    this._size--;
    return true;
  }
  return false;
};

HashMap.prototype.clear = function () {
  this._buckets = Array.from({ length: this._capacity }, () => []);
  this._size = 0;
};

HashMap.prototype.keys = function () {
  const res = [];
  for (let i = 0; i < this._buckets.length; i++) {
    const bucket = this._buckets[i];
    for (let j = 0; j < bucket.length; j++) {
      res.push(bucket[j].k);
    }
  }
  return res;
};

HashMap.prototype.values = function () {
  const res = [];
  for (let i = 0; i < this._buckets.length; i++) {
    const bucket = this._buckets[i];
    for (let j = 0; j < bucket.length; j++) {
      res.push(bucket[j].v);
    }
  }
  return res;
};

HashMap.prototype.entries = function () {
  const res = [];
  for (let i = 0; i < this._buckets.length; i++) {
    const bucket = this._buckets[i];
    for (let j = 0; j < bucket.length; j++) {
      const e = bucket[j];
      res.push([e.k, e.v]);
    }
  }
  return res;
};

Object.defineProperty(HashMap.prototype, "size", {
  get: function () {
    return this._size;
  },
  enumerable: true,
  configurable: true,
});

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
