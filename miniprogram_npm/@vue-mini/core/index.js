module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1745476025423, function(require, module, exports) {
/*!
 * vue-mini v1.2.2
 * https://github.com/vue-mini/vue-mini
 * (c) 2019-present Yang Mingshan
 * @license MIT
 */


/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}

const EMPTY_OBJ$1 = Object.freeze({}) ;
const NOOP = () => {
};
const extend$1 = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction$1 = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};

/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/

function warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}

let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    /**
     * @internal
     */
    this._active = true;
    /**
     * @internal
     */
    this.effects = [];
    /**
     * @internal
     */
    this.cleanups = [];
    this._isPaused = false;
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = undefined;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn, failSilently = false) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else if (!failSilently) {
    warn(
      `onScopeDispose() is called when there is no active effect scope to be associated with.`
    );
  }
}

let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    /**
     * @internal
     */
    this.deps = undefined;
    /**
     * @internal
     */
    this.depsTail = undefined;
    /**
     * @internal
     */
    this.flags = 1 | 4;
    /**
     * @internal
     */
    this.next = undefined;
    /**
     * @internal
     */
    this.cleanup = undefined;
    this.scheduler = undefined;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      if (activeSub !== this) {
        warn(
          "Active effect was not restored correctly - this is likely a Vue internal bug."
        );
      }
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = undefined;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
let batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = undefined;
    while (e) {
      const next = e.next;
      e.next = undefined;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = undefined;
    while (e) {
      const next = e.next;
      e.next = undefined;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = undefined;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed) {
  if (computed.flags & 4 && !(computed.flags & 16)) {
    return;
  }
  computed.flags &= -17;
  if (computed.globalVersion === globalVersion) {
    return;
  }
  computed.globalVersion = globalVersion;
  const dep = computed.dep;
  computed.flags |= 2;
  if (dep.version > 0 && !computed.isSSR && computed.deps && !isDirty(computed)) {
    computed.flags &= -3;
    return;
  }
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed;
  shouldTrack = true;
  try {
    prepareDeps(computed);
    const value = computed.fn(computed._value);
    if (dep.version === 0 || hasChanged(value, computed._value)) {
      computed._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed);
    computed.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = undefined;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = undefined;
  }
  if (dep.subsHead === link) {
    dep.subsHead = nextSub;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = undefined;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = undefined;
  }
}
function effect(fn, options) {
  if (fn.effect instanceof ReactiveEffect) {
    fn = fn.effect.fn;
  }
  const e = new ReactiveEffect(fn);
  if (options) {
    extend$1(e, options);
  }
  try {
    e.run();
  } catch (err) {
    e.stop();
    throw err;
  }
  const runner = e.run.bind(e);
  runner.effect = e;
  return runner;
}
function stop(runner) {
  runner.effect.stop();
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === undefined ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = undefined;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = undefined;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}

let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = undefined;
  }
}
class Dep {
  constructor(computed) {
    this.computed = computed;
    this.version = 0;
    /**
     * Link between this dep and the current active effect
     */
    this.activeLink = undefined;
    /**
     * Doubly linked list representing the subscribing effects (tail)
     */
    this.subs = undefined;
    /**
     * For object property deps cleanup
     */
    this.map = undefined;
    this.key = undefined;
    /**
     * Subscriber counter
     */
    this.sc = 0;
    {
      this.subsHead = undefined;
    }
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === undefined || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = undefined;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    if (activeSub.onTrack) {
      activeSub.onTrack(
        extend$1(
          {
            effect: activeSub
          },
          debugInfo
        )
      );
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (!!("development" !== "production")) {
        for (let head = this.subsHead; head; head = head.nextSub) {
          if (head.sub.onTrigger && !(head.sub.flags & 8)) {
            head.sub.onTrigger(
              extend$1(
                {
                  effect: head.sub
                },
                debugInfo
              )
            );
          }
        }
      }
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed = link.dep.computed;
    if (computed && !link.dep.subs) {
      computed.flags |= 4 | 16;
      for (let l = computed.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    if (link.dep.subsHead === undefined) {
      link.dep.subsHead = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol(
  "Object iterate" 
);
const MAP_KEY_ITERATE_KEY = Symbol(
  "Map keys iterate" 
);
const ARRAY_ITERATE_KEY = Symbol(
  "Array iterate" 
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track({
        target,
        type,
        key
      });
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      {
        dep.trigger({
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        });
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray$1(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== undefined || depsMap.has(undefined)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function getDepFromReactive(object, key) {
  const depMap = targetMap.get(object);
  return depMap && depMap.get(key);
}

function reactiveReadArray(array) {
  const raw = toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray$1(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toReactive(value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, undefined, arguments);
  },
  filter(fn, thisArg) {
    return apply(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
  },
  find(fn, thisArg) {
    return apply(this, "find", fn, thisArg, toReactive, arguments);
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, undefined, arguments);
  },
  findLast(fn, thisArg) {
    return apply(this, "findLast", fn, thisArg, toReactive, arguments);
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, undefined, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, undefined, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, undefined, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, undefined, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", toReactive);
  }
};
function iterator(self, method, wrapValue) {
  const arr = shallowReadArray(self);
  const iter = arr[method]();
  if (arr !== self && !isShallow(self)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (result.value) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply(self, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self);
  const needsWrap = arr !== self && !isShallow(self);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toReactive(item), index, self);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self, method, fn, args) {
  const arr = shallowReadArray(self);
  let wrappedFn = fn;
  if (arr !== self) {
    if (!isShallow(self)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self, method, args) {
  const arr = toRaw(self);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self, method, args = []) {
  pauseTracking();
  startBatch();
  const res = toRaw(self)[method].apply(self, args);
  endBatch();
  resetTracking();
  return res;
}

const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      isRef(target) ? target : receiver
    );
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, undefined, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$1(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    {
      warn(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    {
      warn(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);

const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? undefined : this;
  };
}
function createInstrumentations(readonly, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly && track(toRaw(target), "iterate", ITERATE_KEY);
      return Reflect.get(target, "size", target);
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
      !readonly && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend$1(
    instrumentations,
    readonly ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
          target.add(value);
          trigger(target, "add", value, value);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        } else {
          checkIdentityKeys(target, has, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
        return this;
      },
      delete(key) {
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        } else {
          checkIdentityKeys(target, has, key);
        }
        const oldValue = get ? get.call(target, key) : undefined;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, undefined, oldValue);
        }
        return result;
      },
      clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const oldTarget = isMap(target) ? new Map(target) : new Set(target) ;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            undefined,
            undefined,
            oldTarget
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has.call(target, rawKey)) {
    const type = toRawType(target);
    warn(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}

const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1 /* COMMON */;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2 /* COLLECTION */;
    default:
      return 0 /* INVALID */;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 /* INVALID */ : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      warn(
        `value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(
          target
        )}`
      );
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0 /* INVALID */) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;

function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    {
      this.dep.track({
        target: this,
        type: "get",
        key: "value"
      });
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger({
          target: this,
          type: "set",
          key: "value",
          newValue,
          oldValue
        });
      }
    }
  }
}
function triggerRef(ref2) {
  if (ref2.dep) {
    {
      ref2.dep.trigger({
        target: ref2,
        type: "set",
        key: "value",
        newValue: ref2._value
      });
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
function toValue(source) {
  return isFunction$1(source) ? source() : unref(source);
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class CustomRefImpl {
  constructor(factory) {
    this["__v_isRef"] = true;
    this._value = undefined;
    const dep = this.dep = new Dep();
    const { get, set } = factory(dep.track.bind(dep), dep.trigger.bind(dep));
    this._get = get;
    this._set = set;
  }
  get value() {
    return this._value = this._get();
  }
  set value(newVal) {
    this._set(newVal);
  }
}
function customRef(factory) {
  return new CustomRefImpl(factory);
}
function toRefs(object) {
  if (!isProxy(object)) {
    warn(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret = isArray$1(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = propertyToRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this["__v_isRef"] = true;
    this._value = undefined;
  }
  get value() {
    const val = this._object[this._key];
    return this._value = val === undefined ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
class GetterRefImpl {
  constructor(_getter) {
    this._getter = _getter;
    this["__v_isRef"] = true;
    this["__v_isReadonly"] = true;
    this._value = undefined;
  }
  get value() {
    return this._value = this._getter();
  }
}
function toRef(source, key, defaultValue) {
  if (isRef(source)) {
    return source;
  } else if (isFunction$1(source)) {
    return new GetterRefImpl(source);
  } else if (isObject$1(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  const val = source[key];
  return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
}

class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    /**
     * @internal
     */
    this._value = undefined;
    /**
     * @internal
     */
    this.dep = new Dep(this);
    /**
     * @internal
     */
    this.__v_isRef = true;
    // TODO isolatedDeclarations "__v_isReadonly"
    // A computed is also a subscriber that tracks other deps
    /**
     * @internal
     */
    this.deps = undefined;
    /**
     * @internal
     */
    this.depsTail = undefined;
    /**
     * @internal
     */
    this.flags = 16;
    /**
     * @internal
     */
    this.globalVersion = globalVersion - 1;
    /**
     * @internal
     */
    this.next = undefined;
    // for backwards compat
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this, true);
      return true;
    }
  }
  get value() {
    const link = this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) ;
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    } else {
      warn("Write operation failed: computed value is readonly");
    }
  }
}
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction$1(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.onTrack = debugOptions.onTrack;
    cRef.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}

const TrackOpTypes = {
  "GET": "get",
  "HAS": "has",
  "ITERATE": "iterate"
};
const TriggerOpTypes = {
  "SET": "set",
  "ADD": "add",
  "DELETE": "delete",
  "CLEAR": "clear"
};
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = undefined;
function getCurrentWatcher() {
  return activeWatcher;
}
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  } else if (!failSilently) {
    warn(
      `onWatcherCleanup() was called when there was no active watcher to associate with.`
    );
  }
}
function watch$1(source, cb, options = EMPTY_OBJ$1) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const warnInvalidSource = (s) => {
    (options.onWarn || warn)(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction$1(s)) {
        return call ? call(s, 2) : s();
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect.flags & 1) || !effect.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
          oldValue = newValue;
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect = new ReactiveEffect(getter);
  effect.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect);
  cleanup = effect.onStop = () => {
    const cleanups = cleanupMap.get(effect);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect);
    }
  };
  {
    effect.onTrack = options.onTrack;
    effect.onTrigger = options.onTrigger;
  }
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect.run();
  }
  watchHandle.pause = effect.pause.bind(effect);
  watchHandle.resume = effect.resume.bind(effect);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  depth--;
  if (isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}

const EMPTY_OBJ = Object.freeze({}) ;
const { isArray } = Array;
const extend = Object.assign;
function exclude(obj, keys) {
    const ret = {};
    Object.keys(obj).forEach((key) => {
        if (!keys.includes(key)) {
            ret[key] = obj[key];
        }
    });
    return ret;
}
function getType(x) {
    return Object.prototype.toString.call(x).slice(8, -1);
}
function isSimpleValue(x) {
    const simpleTypes = new Set(['undefined', 'boolean', 'number', 'string']);
    return x === null || simpleTypes.has(typeof x);
}
function isObject(x) {
    return x !== null && typeof x === 'object';
}
function isPlainObject(x) {
    return getType(x) === 'Object';
}
function isFunction(x) {
    return typeof x === 'function';
}
function toHiddenField(name) {
    return `__${name}__`;
}

/* eslint-disable no-bitwise, unicorn/prefer-math-trunc, @typescript-eslint/prefer-literal-enum-member */
var SchedulerJobFlags;
(function (SchedulerJobFlags) {
    SchedulerJobFlags[SchedulerJobFlags["QUEUED"] = 1] = "QUEUED";
    SchedulerJobFlags[SchedulerJobFlags["ALLOW_RECURSE"] = 4] = "ALLOW_RECURSE";
})(SchedulerJobFlags || (SchedulerJobFlags = {}));
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
// eslint-disable-next-line spaced-comment
const resolvedPromise = /*@__PURE__*/ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
    const p = currentFlushPromise || resolvedPromise;
    // eslint-disable-next-line promise/prefer-await-to-then
    return fn ? p.then(fn) : p;
}
function queueJob(job) {
    if (!(job.flags & SchedulerJobFlags.QUEUED)) {
        queue.push(job);
        job.flags |= SchedulerJobFlags.QUEUED;
        queueFlush();
    }
}
function queueFlush() {
    if (!currentFlushPromise) {
        // eslint-disable-next-line promise/prefer-await-to-then
        currentFlushPromise = resolvedPromise.then(flushJobs);
    }
}
function queuePostFlushCb(cb) {
    if (!(cb.flags & SchedulerJobFlags.QUEUED)) {
        pendingPostFlushCbs.push(cb);
        cb.flags |= SchedulerJobFlags.QUEUED;
    }
}
function flushPostFlushCbs() {
    if (pendingPostFlushCbs.length > 0) {
        activePostFlushCbs = [...new Set(pendingPostFlushCbs)];
        pendingPostFlushCbs.length = 0;
        for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
            const cb = activePostFlushCbs[postFlushIndex];
            if (cb.flags & SchedulerJobFlags.ALLOW_RECURSE) {
                cb.flags &= ~SchedulerJobFlags.QUEUED;
            }
            cb();
            cb.flags &= ~SchedulerJobFlags.QUEUED;
        }
        activePostFlushCbs = null;
        postFlushIndex = 0;
    }
}
function flushJobs(seen) {
    /* istanbul ignore else -- @preserve  */
    {
        seen = seen || new Map();
    }
    // Conditional usage of checkRecursiveUpdate must be determined out of
    // try ... catch block since Rollup by default de-optimizes treeshaking
    // inside try-catch. This can leave all warning code unshaked. Although
    // they would get eventually shaken by a minifier like terser, some minifiers
    // would fail to do that (e.g. https://github.com/evanw/esbuild/issues/1610)
    const check = (job) => checkRecursiveUpdates(seen, job)
        ;
    try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
            const job = queue[flushIndex];
            /* istanbul ignore if -- @preserve  */
            if (true && check(job)) {
                continue;
            }
            if (job.flags & SchedulerJobFlags.ALLOW_RECURSE) {
                job.flags &= ~SchedulerJobFlags.QUEUED;
            }
            job();
            if (!(job.flags & SchedulerJobFlags.ALLOW_RECURSE)) {
                job.flags &= ~SchedulerJobFlags.QUEUED;
            }
        }
    }
    finally {
        // If there was an error we still need to clear the QUEUED flags
        for (; flushIndex < queue.length; flushIndex++) {
            const job = queue[flushIndex];
            job.flags &= ~SchedulerJobFlags.QUEUED;
        }
        flushIndex = -1;
        queue.length = 0;
        currentFlushPromise = null;
    }
}
function checkRecursiveUpdates(seen, fn) {
    const count = seen.get(fn) || 0;
    /* istanbul ignore if -- @preserve */
    if (count > RECURSION_LIMIT) {
        console.warn(`Maximum recursive updates exceeded. ` +
            `This means you have a reactive effect that is mutating its own ` +
            `dependencies and thus recursively triggering itself.`);
        return true;
    }
    seen.set(fn, count + 1);
    return false;
}

// Simple effect.
function watchEffect(effect, options) {
    return doWatch(effect, null, options);
}
function watchPostEffect(effect, options) {
    return doWatch(effect, null, extend({}, options, { flush: 'post' })
        );
}
function watchSyncEffect(effect, options) {
    return doWatch(effect, null, extend({}, options, { flush: 'sync' })
        );
}
// Implementation
function watch(source, cb, options) {
    if (!isFunction(cb)) {
        console.warn(`\`watch(fn, options?)\` signature has been moved to a separate API. ` +
            `Use \`watchEffect(fn, options?)\` instead. \`watch\` now only ` +
            `supports \`watch(source, cb, options?) signature.`);
    }
    return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, flush, once } = options;
    if (!cb) {
        if (immediate !== undefined) {
            console.warn(`watch() "immediate" option is only respected when using the ` +
                `watch(source, callback, options?) signature.`);
        }
        if (deep !== undefined) {
            console.warn(`watch() "deep" option is only respected when using the ` +
                `watch(source, callback, options?) signature.`);
        }
        if (once !== undefined) {
            console.warn(`watch() "once" option is only respected when using the ` +
                `watch(source, callback, options?) signature.`);
        }
    }
    const baseWatchOptions = extend({}, options);
    // Scheduler
    if (flush === 'post') {
        baseWatchOptions.scheduler = (job) => {
            queuePostFlushCb(job);
        };
    }
    else if (flush !== 'sync') {
        baseWatchOptions.scheduler = (job, isFirstRun) => {
            if (isFirstRun) {
                job();
            }
            else {
                queueJob(job);
            }
        };
    }
    // @ts-expect-error
    baseWatchOptions.augmentJob = (job) => {
        // Important: mark the job as a watcher callback so that scheduler knows
        // it is allowed to self-trigger
        if (cb) {
            // eslint-disable-next-line no-bitwise
            job.flags |= SchedulerJobFlags.ALLOW_RECURSE;
        }
    };
    const watchHandle = watch$1(source, cb, baseWatchOptions);
    return watchHandle;
}

const provides = Object.create(null);
function provide(key, value) {
    // TS doesn't allow symbol as index type
    provides[key] = value;
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
    if (key in provides) {
        // TS doesn't allow symbol as index type
        return provides[key];
    }
    if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue()
            : defaultValue;
    }
    /* istanbul ignore else -- @preserve */
    {
        console.warn(`injection "${String(key)}" not found.`);
    }
}

let currentApp = null;
let currentPage = null;
let currentComponent = null;
function getCurrentInstance() {
    return currentPage || currentComponent;
}
function setCurrentApp(app) {
    currentApp = app;
}
function unsetCurrentApp() {
    currentApp = null;
}
function setCurrentPage(page) {
    currentPage = page;
    // @ts-expect-error
    page.__scope__.on();
}
function unsetCurrentPage() {
    /* istanbul ignore else -- @preserve */
    if (currentPage) {
        // @ts-expect-error
        currentPage.__scope__.off();
    }
    currentPage = null;
}
function setCurrentComponent(component) {
    currentComponent = component;
    // @ts-expect-error
    component.__scope__.on();
}
function unsetCurrentComponent() {
    /* istanbul ignore else -- @preserve */
    if (currentComponent) {
        // @ts-expect-error
        currentComponent.__scope__.off();
    }
    currentComponent = null;
}

var AppLifecycle;
(function (AppLifecycle) {
    AppLifecycle["ON_LAUNCH"] = "onLaunch";
    AppLifecycle["ON_SHOW"] = "onShow";
    AppLifecycle["ON_HIDE"] = "onHide";
    AppLifecycle["ON_ERROR"] = "onError";
    AppLifecycle["ON_PAGE_NOT_FOUND"] = "onPageNotFound";
    AppLifecycle["ON_UNHANDLED_REJECTION"] = "onUnhandledRejection";
    AppLifecycle["ON_THEME_CHANGE"] = "onThemeChange";
})(AppLifecycle || (AppLifecycle = {}));
function createApp(optionsOrSetup) {
    let setup;
    let options;
    if (isFunction(optionsOrSetup)) {
        setup = optionsOrSetup;
        options = {};
    }
    else {
        if (optionsOrSetup.setup === undefined) {
            // eslint-disable-next-line new-cap
            App(optionsOrSetup);
            return;
        }
        setup = optionsOrSetup.setup;
        options = exclude(optionsOrSetup, ['setup']);
    }
    const originOnLaunch = options[AppLifecycle.ON_LAUNCH];
    options[AppLifecycle.ON_LAUNCH] = function (options) {
        setCurrentApp(this);
        const bindings = setup(options);
        if (bindings !== undefined) {
            Object.keys(bindings).forEach((key) => {
                this[key] = bindings[key];
            });
        }
        unsetCurrentApp();
        if (originOnLaunch !== undefined) {
            originOnLaunch.call(this, options);
        }
    };
    options[AppLifecycle.ON_SHOW] = createLifecycle$2(options, AppLifecycle.ON_SHOW);
    options[AppLifecycle.ON_HIDE] = createLifecycle$2(options, AppLifecycle.ON_HIDE);
    options[AppLifecycle.ON_ERROR] = createLifecycle$2(options, AppLifecycle.ON_ERROR);
    options[AppLifecycle.ON_PAGE_NOT_FOUND] = createLifecycle$2(options, AppLifecycle.ON_PAGE_NOT_FOUND);
    options[AppLifecycle.ON_UNHANDLED_REJECTION] = createLifecycle$2(options, AppLifecycle.ON_UNHANDLED_REJECTION);
    options[AppLifecycle.ON_THEME_CHANGE] = createLifecycle$2(options, AppLifecycle.ON_THEME_CHANGE);
    // eslint-disable-next-line new-cap
    App(options);
}
function createLifecycle$2(options, lifecycle) {
    const originLifecycle = options[lifecycle];
    return function (...args) {
        const hooks = this[toHiddenField(lifecycle)];
        if (hooks) {
            hooks.forEach((hook) => hook(...args));
        }
        if (originLifecycle !== undefined) {
            originLifecycle.call(this, ...args);
        }
    };
}

function deepToRaw(x) {
    if (isSimpleValue(x) || isFunction(x)) {
        return x;
    }
    if (isRef(x)) {
        return deepToRaw(x.value);
    }
    if (isProxy(x)) {
        return deepToRaw(toRaw(x));
    }
    if (isArray(x)) {
        return x.map((item) => deepToRaw(item));
    }
    if (isPlainObject(x)) {
        const obj = {};
        Object.keys(x).forEach((key) => {
            obj[key] = deepToRaw(x[key]);
        });
        return obj;
    }
    throw new TypeError(`${getType(x)} value is not supported`);
}
function deepWatch(key, value) {
    if (!isObject(value)) {
        return;
    }
    watch(isRef(value) ? value : () => value, () => {
        this.setData({ [key]: deepToRaw(value) }, flushPostFlushCbs);
    }, {
        deep: true,
    });
}

var PageLifecycle;
(function (PageLifecycle) {
    PageLifecycle["ON_LOAD"] = "onLoad";
    PageLifecycle["ON_SHOW"] = "onShow";
    PageLifecycle["ON_READY"] = "onReady";
    PageLifecycle["ON_HIDE"] = "onHide";
    PageLifecycle["ON_UNLOAD"] = "onUnload";
    PageLifecycle["ON_ROUTE_DONE"] = "onRouteDone";
    PageLifecycle["ON_PULL_DOWN_REFRESH"] = "onPullDownRefresh";
    PageLifecycle["ON_REACH_BOTTOM"] = "onReachBottom";
    PageLifecycle["ON_PAGE_SCROLL"] = "onPageScroll";
    PageLifecycle["ON_SHARE_APP_MESSAGE"] = "onShareAppMessage";
    PageLifecycle["ON_SHARE_TIMELINE"] = "onShareTimeline";
    PageLifecycle["ON_ADD_TO_FAVORITES"] = "onAddToFavorites";
    PageLifecycle["ON_RESIZE"] = "onResize";
    PageLifecycle["ON_TAB_ITEM_TAP"] = "onTabItemTap";
    PageLifecycle["ON_SAVE_EXIT_STATE"] = "onSaveExitState";
})(PageLifecycle || (PageLifecycle = {}));
function definePage(optionsOrSetup, config) {
    config = extend({
        listenPageScroll: false,
        canShareToOthers: false,
        canShareToTimeline: false,
    }, config);
    let setup;
    let options;
    if (isFunction(optionsOrSetup)) {
        setup = optionsOrSetup;
        options = {};
    }
    else {
        if (optionsOrSetup.setup === undefined) {
            // eslint-disable-next-line new-cap
            Page(optionsOrSetup);
            return;
        }
        setup = optionsOrSetup.setup;
        options = exclude(optionsOrSetup, ['setup']);
    }
    const originOnLoad = options[PageLifecycle.ON_LOAD];
    options[PageLifecycle.ON_LOAD] = function (query) {
        this.__scope__ = new EffectScope();
        setCurrentPage(this);
        const context = {
            is: this.is,
            route: this.route,
            options: this.options,
            exitState: this.exitState,
            router: this.router,
            pageRouter: this.pageRouter,
            renderer: this.renderer,
            createSelectorQuery: this.createSelectorQuery.bind(this),
            createIntersectionObserver: this.createIntersectionObserver.bind(this),
            createMediaQueryObserver: this.createMediaQueryObserver.bind(this),
            selectComponent: this.selectComponent.bind(this),
            selectAllComponents: this.selectAllComponents.bind(this),
            getTabBar: this.getTabBar.bind(this),
            getPageId: this.getPageId.bind(this),
            animate: this.animate.bind(this),
            clearAnimation: this.clearAnimation.bind(this),
            getOpenerEventChannel: this.getOpenerEventChannel.bind(this),
            applyAnimatedStyle: this.applyAnimatedStyle.bind(this),
            clearAnimatedStyle: this.clearAnimatedStyle.bind(this),
            setUpdatePerformanceListener: this.setUpdatePerformanceListener.bind(this),
            getPassiveEvent: this.getPassiveEvent.bind(this),
            setPassiveEvent: this.setPassiveEvent.bind(this),
            setInitialRenderingCache: this.setInitialRenderingCache.bind(this),
            getAppBar: this.getAppBar && this.getAppBar.bind(this),
        };
        const bindings = setup(query, context);
        if (bindings !== undefined) {
            let data;
            Object.keys(bindings).forEach((key) => {
                const value = bindings[key];
                if (isFunction(value)) {
                    this[key] = value;
                    return;
                }
                data = data || {};
                data[key] = deepToRaw(value);
                deepWatch.call(this, key, value);
            });
            if (data !== undefined) {
                this.setData(data, flushPostFlushCbs);
            }
        }
        unsetCurrentPage();
        if (originOnLoad !== undefined) {
            originOnLoad.call(this, query);
        }
    };
    const onUnload = createLifecycle$1(options, PageLifecycle.ON_UNLOAD);
    options[PageLifecycle.ON_UNLOAD] = function () {
        onUnload.call(this);
        this.__scope__.stop();
    };
    if (options[PageLifecycle.ON_PAGE_SCROLL] || config.listenPageScroll) {
        options[PageLifecycle.ON_PAGE_SCROLL] = createLifecycle$1(options, PageLifecycle.ON_PAGE_SCROLL);
        /* istanbul ignore next -- @preserve */
        options.__listenPageScroll__ = () => true;
    }
    if (options[PageLifecycle.ON_SHARE_APP_MESSAGE] === undefined &&
        config.canShareToOthers) {
        options[PageLifecycle.ON_SHARE_APP_MESSAGE] = function (share) {
            const hook = this[toHiddenField(PageLifecycle.ON_SHARE_APP_MESSAGE)];
            if (hook) {
                return hook(share);
            }
            return {};
        };
        /* istanbul ignore next -- @preserve */
        options.__isInjectedShareToOthersHook__ = () => true;
    }
    if (options[PageLifecycle.ON_SHARE_TIMELINE] === undefined &&
        config.canShareToTimeline) {
        options[PageLifecycle.ON_SHARE_TIMELINE] = function () {
            const hook = this[toHiddenField(PageLifecycle.ON_SHARE_TIMELINE)];
            if (hook) {
                return hook();
            }
            return {};
        };
        /* istanbul ignore next -- @preserve */
        options.__isInjectedShareToTimelineHook__ = () => true;
    }
    if (options[PageLifecycle.ON_ADD_TO_FAVORITES] === undefined) {
        options[PageLifecycle.ON_ADD_TO_FAVORITES] = function (favorites) {
            const hook = this[toHiddenField(PageLifecycle.ON_ADD_TO_FAVORITES)];
            if (hook) {
                return hook(favorites);
            }
            return {};
        };
        /* istanbul ignore next -- @preserve */
        options.__isInjectedFavoritesHook__ = () => true;
    }
    if (options[PageLifecycle.ON_SAVE_EXIT_STATE] === undefined) {
        options[PageLifecycle.ON_SAVE_EXIT_STATE] = function () {
            const hook = this[toHiddenField(PageLifecycle.ON_SAVE_EXIT_STATE)];
            if (hook) {
                return hook();
            }
            return { data: undefined };
        };
        /* istanbul ignore next -- @preserve */
        options.__isInjectedExitStateHook__ = () => true;
    }
    options[PageLifecycle.ON_SHOW] = createLifecycle$1(options, PageLifecycle.ON_SHOW);
    options[PageLifecycle.ON_READY] = createLifecycle$1(options, PageLifecycle.ON_READY);
    options[PageLifecycle.ON_HIDE] = createLifecycle$1(options, PageLifecycle.ON_HIDE);
    options[PageLifecycle.ON_ROUTE_DONE] = createLifecycle$1(options, PageLifecycle.ON_ROUTE_DONE);
    options[PageLifecycle.ON_PULL_DOWN_REFRESH] = createLifecycle$1(options, PageLifecycle.ON_PULL_DOWN_REFRESH);
    options[PageLifecycle.ON_REACH_BOTTOM] = createLifecycle$1(options, PageLifecycle.ON_REACH_BOTTOM);
    options[PageLifecycle.ON_RESIZE] = createLifecycle$1(options, PageLifecycle.ON_RESIZE);
    options[PageLifecycle.ON_TAB_ITEM_TAP] = createLifecycle$1(options, PageLifecycle.ON_TAB_ITEM_TAP);
    // eslint-disable-next-line new-cap
    Page(options);
}
function createLifecycle$1(options, lifecycle) {
    const originLifecycle = options[lifecycle];
    return function (...args) {
        const hooks = this[toHiddenField(lifecycle)];
        if (hooks) {
            hooks.forEach((hook) => hook(...args));
        }
        if (originLifecycle !== undefined) {
            originLifecycle.call(this, ...args);
        }
    };
}

var ComponentLifecycle;
(function (ComponentLifecycle) {
    ComponentLifecycle["ATTACHED"] = "attached";
    ComponentLifecycle["READY"] = "ready";
    ComponentLifecycle["MOVED"] = "moved";
    ComponentLifecycle["DETACHED"] = "detached";
    ComponentLifecycle["ERROR"] = "error";
})(ComponentLifecycle || (ComponentLifecycle = {}));
const SpecialLifecycleMap = {
    [PageLifecycle.ON_SHOW]: 'show',
    [PageLifecycle.ON_HIDE]: 'hide',
    [PageLifecycle.ON_RESIZE]: 'resize',
    [PageLifecycle.ON_ROUTE_DONE]: 'routeDone',
    [ComponentLifecycle.READY]: PageLifecycle.ON_READY,
};
function defineComponent(optionsOrSetup, config) {
    config = extend({
        listenPageScroll: false,
        canShareToOthers: false,
        canShareToTimeline: false,
    }, config);
    let setup;
    let options;
    let properties = null;
    if (isFunction(optionsOrSetup)) {
        setup = optionsOrSetup;
        options = {};
    }
    else {
        if (optionsOrSetup.setup === undefined) {
            // eslint-disable-next-line new-cap
            return Component(optionsOrSetup);
        }
        setup = optionsOrSetup.setup;
        options = exclude(optionsOrSetup, ['setup']);
        if (options.properties) {
            properties = Object.keys(options.properties);
        }
    }
    if (options.lifetimes === undefined) {
        options.lifetimes = {};
    }
    const originAttached = options.lifetimes[ComponentLifecycle.ATTACHED] ||
        options[ComponentLifecycle.ATTACHED];
    options.lifetimes[ComponentLifecycle.ATTACHED] = function () {
        this.__scope__ = new EffectScope();
        setCurrentComponent(this);
        const rawProps = {};
        if (properties) {
            properties.forEach((property) => {
                rawProps[property] = this.data[property];
            });
        }
        this.__props__ = shallowReactive(rawProps);
        const context = {
            is: this.is,
            id: this.id,
            dataset: this.dataset,
            exitState: this.exitState,
            router: this.router,
            pageRouter: this.pageRouter,
            renderer: this.renderer,
            triggerEvent: this.triggerEvent.bind(this),
            createSelectorQuery: this.createSelectorQuery.bind(this),
            createIntersectionObserver: this.createIntersectionObserver.bind(this),
            createMediaQueryObserver: this.createMediaQueryObserver.bind(this),
            selectComponent: this.selectComponent.bind(this),
            selectAllComponents: this.selectAllComponents.bind(this),
            selectOwnerComponent: this.selectOwnerComponent.bind(this),
            getRelationNodes: this.getRelationNodes.bind(this),
            getTabBar: this.getTabBar.bind(this),
            getPageId: this.getPageId.bind(this),
            animate: this.animate.bind(this),
            clearAnimation: this.clearAnimation.bind(this),
            getOpenerEventChannel: this.getOpenerEventChannel.bind(this),
            applyAnimatedStyle: this.applyAnimatedStyle.bind(this),
            clearAnimatedStyle: this.clearAnimatedStyle.bind(this),
            setUpdatePerformanceListener: this.setUpdatePerformanceListener.bind(this),
            getPassiveEvent: this.getPassiveEvent.bind(this),
            setPassiveEvent: this.setPassiveEvent.bind(this),
            setInitialRenderingCache: this.setInitialRenderingCache.bind(this),
            getAppBar: this.getAppBar && this.getAppBar.bind(this),
        };
        const bindings = setup(shallowReadonly(this.__props__)
            , context);
        if (bindings !== undefined) {
            let data;
            Object.keys(bindings).forEach((key) => {
                const value = bindings[key];
                if (isFunction(value)) {
                    this[key] = value;
                    return;
                }
                data = data || {};
                data[key] = deepToRaw(value);
                deepWatch.call(this, key, value);
            });
            if (data !== undefined) {
                this.setData(data, flushPostFlushCbs);
            }
        }
        unsetCurrentComponent();
        if (originAttached !== undefined) {
            originAttached.call(this);
        }
    };
    const detached = createComponentLifecycle(options, ComponentLifecycle.DETACHED);
    options.lifetimes[ComponentLifecycle.DETACHED] = function () {
        detached.call(this);
        this.__scope__.stop();
    };
    const originReady = options.lifetimes[ComponentLifecycle.READY] ||
        options[ComponentLifecycle.READY];
    options.lifetimes[ComponentLifecycle.READY] = createLifecycle(SpecialLifecycleMap[ComponentLifecycle.READY], originReady);
    options.lifetimes[ComponentLifecycle.MOVED] = createComponentLifecycle(options, ComponentLifecycle.MOVED);
    options.lifetimes[ComponentLifecycle.ERROR] = createComponentLifecycle(options, ComponentLifecycle.ERROR);
    if (options.methods === undefined) {
        options.methods = {};
    }
    if (options.methods[PageLifecycle.ON_PAGE_SCROLL] ||
        config.listenPageScroll) {
        options.methods[PageLifecycle.ON_PAGE_SCROLL] = createPageLifecycle(options, PageLifecycle.ON_PAGE_SCROLL);
        /* istanbul ignore next -- @preserve */
        options.methods.__listenPageScroll__ = () => true;
    }
    if (options.methods[PageLifecycle.ON_SHARE_APP_MESSAGE] === undefined &&
        config.canShareToOthers) {
        options.methods[PageLifecycle.ON_SHARE_APP_MESSAGE] = function (share) {
            const hook = this[toHiddenField(PageLifecycle.ON_SHARE_APP_MESSAGE)];
            if (hook) {
                return hook(share);
            }
            return {};
        };
        /* istanbul ignore next -- @preserve */
        options.methods.__isInjectedShareToOthersHook__ = () => true;
    }
    if (options.methods[PageLifecycle.ON_SHARE_TIMELINE] === undefined &&
        config.canShareToTimeline) {
        options.methods[PageLifecycle.ON_SHARE_TIMELINE] = function () {
            const hook = this[toHiddenField(PageLifecycle.ON_SHARE_TIMELINE)];
            if (hook) {
                return hook();
            }
            return {};
        };
        /* istanbul ignore next -- @preserve */
        options.methods.__isInjectedShareToTimelineHook__ = () => true;
    }
    if (options.methods[PageLifecycle.ON_ADD_TO_FAVORITES] === undefined) {
        options.methods[PageLifecycle.ON_ADD_TO_FAVORITES] = function (favorites) {
            const hook = this[toHiddenField(PageLifecycle.ON_ADD_TO_FAVORITES)];
            if (hook) {
                return hook(favorites);
            }
            return {};
        };
        /* istanbul ignore next -- @preserve */
        options.methods.__isInjectedFavoritesHook__ = () => true;
    }
    if (options.methods[PageLifecycle.ON_SAVE_EXIT_STATE] === undefined) {
        options.methods[PageLifecycle.ON_SAVE_EXIT_STATE] = function () {
            const hook = this[toHiddenField(PageLifecycle.ON_SAVE_EXIT_STATE)];
            if (hook) {
                return hook();
            }
            return { data: undefined };
        };
        /* istanbul ignore next -- @preserve */
        options.methods.__isInjectedExitStateHook__ = () => true;
    }
    options.methods[PageLifecycle.ON_LOAD] = createPageLifecycle(options, PageLifecycle.ON_LOAD);
    options.methods[PageLifecycle.ON_PULL_DOWN_REFRESH] = createPageLifecycle(options, PageLifecycle.ON_PULL_DOWN_REFRESH);
    options.methods[PageLifecycle.ON_REACH_BOTTOM] = createPageLifecycle(options, PageLifecycle.ON_REACH_BOTTOM);
    options.methods[PageLifecycle.ON_TAB_ITEM_TAP] = createPageLifecycle(options, PageLifecycle.ON_TAB_ITEM_TAP);
    if (options.pageLifetimes === undefined) {
        options.pageLifetimes = {};
    }
    options.pageLifetimes[SpecialLifecycleMap[PageLifecycle.ON_SHOW]] =
        createSpecialPageLifecycle(options, PageLifecycle.ON_SHOW);
    options.pageLifetimes[SpecialLifecycleMap[PageLifecycle.ON_HIDE]] =
        createSpecialPageLifecycle(options, PageLifecycle.ON_HIDE);
    options.pageLifetimes[SpecialLifecycleMap[PageLifecycle.ON_RESIZE]] =
        createSpecialPageLifecycle(options, PageLifecycle.ON_RESIZE);
    options.pageLifetimes[SpecialLifecycleMap[PageLifecycle.ON_ROUTE_DONE]] =
        createSpecialPageLifecycle(options, PageLifecycle.ON_ROUTE_DONE);
    if (properties) {
        if (options.observers === undefined) {
            options.observers = {};
        }
        properties.forEach((property) => {
            const originObserver = options.observers[property];
            options.observers[property] = function (value) {
                // Observer executes before attached
                if (this.__props__) {
                    this.__props__[property] = value;
                }
                if (originObserver !== undefined) {
                    originObserver.call(this, value);
                }
            };
        });
    }
    // eslint-disable-next-line new-cap
    return Component(options);
}
function createComponentLifecycle(options, lifecycle) {
    const originLifecycle = options.lifetimes[lifecycle] || options[lifecycle];
    return createLifecycle(lifecycle, originLifecycle);
}
function createPageLifecycle(options, lifecycle) {
    const originLifecycle = options.methods[lifecycle];
    return createLifecycle(lifecycle, originLifecycle);
}
function createSpecialPageLifecycle(options, lifecycle) {
    const originLifecycle = options.pageLifetimes[SpecialLifecycleMap[lifecycle]];
    return createLifecycle(lifecycle, originLifecycle);
}
function createLifecycle(lifecycle, originLifecycle) {
    const hiddenField = toHiddenField(lifecycle);
    return function (...args) {
        const hooks = this[hiddenField];
        if (hooks) {
            hooks.forEach((hook) => hook(...args));
        }
        if (originLifecycle !== undefined) {
            originLifecycle.call(this, ...args);
        }
    };
}

const pageHookWarn = 'Page specific lifecycle injection APIs can only be used during execution of setup() in definePage() or defineComponent().';
const onAppShow = createAppHook(AppLifecycle.ON_SHOW);
const onAppHide = createAppHook(AppLifecycle.ON_HIDE);
const onAppError = createAppHook(AppLifecycle.ON_ERROR);
const onPageNotFound = createAppHook(AppLifecycle.ON_PAGE_NOT_FOUND);
const onUnhandledRejection = createAppHook(AppLifecycle.ON_UNHANDLED_REJECTION);
const onThemeChange = createAppHook(AppLifecycle.ON_THEME_CHANGE);
const onShow = createPageHook(PageLifecycle.ON_SHOW);
const onHide = createPageHook(PageLifecycle.ON_HIDE);
const onUnload = createPageHook(PageLifecycle.ON_UNLOAD);
const onRouteDone = createPageHook(PageLifecycle.ON_ROUTE_DONE);
const onPullDownRefresh = createPageHook(PageLifecycle.ON_PULL_DOWN_REFRESH);
const onReachBottom = createPageHook(PageLifecycle.ON_REACH_BOTTOM);
const onResize = createPageHook(PageLifecycle.ON_RESIZE);
const onTabItemTap = createPageHook(PageLifecycle.ON_TAB_ITEM_TAP);
const onPageScroll = (hook) => {
    const currentInstance = getCurrentInstance();
    /* istanbul ignore else -- @preserve  */
    if (currentInstance) {
        /* istanbul ignore else -- @preserve   */
        if (currentInstance.__listenPageScroll__) {
            injectHook(currentInstance, PageLifecycle.ON_PAGE_SCROLL, hook);
        }
        else {
            console.warn('onPageScroll() hook only works when `listenPageScroll` is configured to true.');
        }
    }
    else {
        console.warn(pageHookWarn);
    }
};
const onShareAppMessage = (hook) => {
    const currentInstance = getCurrentInstance();
    /* istanbul ignore else -- @preserve  */
    if (currentInstance) {
        /* istanbul ignore else -- @preserve  */
        if (currentInstance[PageLifecycle.ON_SHARE_APP_MESSAGE] &&
            currentInstance.__isInjectedShareToOthersHook__) {
            const hiddenField = toHiddenField(PageLifecycle.ON_SHARE_APP_MESSAGE);
            /* istanbul ignore else -- @preserve  */
            if (currentInstance[hiddenField] === undefined) {
                currentInstance[hiddenField] = hook;
            }
            else {
                console.warn('onShareAppMessage() hook can only be called once.');
            }
        }
        else {
            console.warn('onShareAppMessage() hook only works when `onShareAppMessage` option is not exist and `canShareToOthers` is configured to true.');
        }
    }
    else {
        console.warn(pageHookWarn);
    }
};
const onShareTimeline = (hook) => {
    const currentInstance = getCurrentInstance();
    /* istanbul ignore else -- @preserve  */
    if (currentInstance) {
        /* istanbul ignore else -- @preserve  */
        if (currentInstance[PageLifecycle.ON_SHARE_TIMELINE] &&
            currentInstance.__isInjectedShareToTimelineHook__) {
            const hiddenField = toHiddenField(PageLifecycle.ON_SHARE_TIMELINE);
            /* istanbul ignore else -- @preserve  */
            if (currentInstance[hiddenField] === undefined) {
                currentInstance[hiddenField] = hook;
            }
            else {
                console.warn('onShareTimeline() hook can only be called once.');
            }
        }
        else {
            console.warn('onShareTimeline() hook only works when `onShareTimeline` option is not exist and `canShareToTimeline` is configured to true.');
        }
    }
    else {
        console.warn(pageHookWarn);
    }
};
const onAddToFavorites = (hook) => {
    const currentInstance = getCurrentInstance();
    /* istanbul ignore else -- @preserve  */
    if (currentInstance) {
        /* istanbul ignore else -- @preserve  */
        if (currentInstance.__isInjectedFavoritesHook__) {
            const hiddenField = toHiddenField(PageLifecycle.ON_ADD_TO_FAVORITES);
            /* istanbul ignore else -- @preserve  */
            if (currentInstance[hiddenField] === undefined) {
                currentInstance[hiddenField] = hook;
            }
            else {
                console.warn('onAddToFavorites() hook can only be called once.');
            }
        }
        else {
            console.warn('onAddToFavorites() hook only works when `onAddToFavorites` option is not exist.');
        }
    }
    else {
        console.warn(pageHookWarn);
    }
};
const onSaveExitState = (hook) => {
    const currentInstance = getCurrentInstance();
    /* istanbul ignore else -- @preserve  */
    if (currentInstance) {
        /* istanbul ignore else -- @preserve  */
        if (currentInstance.__isInjectedExitStateHook__) {
            const hiddenField = toHiddenField(PageLifecycle.ON_SAVE_EXIT_STATE);
            /* istanbul ignore else -- @preserve  */
            if (currentInstance[hiddenField] === undefined) {
                currentInstance[hiddenField] = hook;
            }
            else {
                console.warn('onSaveExitState() hook can only be called once.');
            }
        }
        else {
            console.warn('onSaveExitState() hook only works when `onSaveExitState` option is not exist.');
        }
    }
    else {
        console.warn(pageHookWarn);
    }
};
const onReady = (hook) => {
    const currentInstance = getCurrentInstance();
    /* istanbul ignore else -- @preserve  */
    if (currentInstance) {
        injectHook(currentInstance, PageLifecycle.ON_READY, hook);
    }
    else {
        console.warn('onReady() hook can only be called during execution of setup() in definePage() or defineComponent().');
    }
};
const onLoad = createComponentHook(PageLifecycle.ON_LOAD);
const onMove = createComponentHook(ComponentLifecycle.MOVED);
const onDetach = createComponentHook(ComponentLifecycle.DETACHED);
const onError = createComponentHook(ComponentLifecycle.ERROR);
function createAppHook(lifecycle) {
    return (hook) => {
        /* istanbul ignore else -- @preserve  */
        if (currentApp) {
            injectHook(currentApp, lifecycle, hook);
        }
        else {
            console.warn('App specific lifecycle injection APIs can only be used during execution of setup() in createApp().');
        }
    };
}
function createPageHook(lifecycle) {
    return (hook) => {
        const currentInstance = getCurrentInstance();
        /* istanbul ignore else -- @preserve  */
        if (currentInstance) {
            injectHook(currentInstance, lifecycle, hook);
        }
        else {
            console.warn(pageHookWarn);
        }
    };
}
function createComponentHook(lifecycle) {
    return (hook) => {
        /* istanbul ignore else -- @preserve  */
        if (currentComponent) {
            injectHook(currentComponent, lifecycle, hook);
        }
        else {
            console.warn('Component specific lifecycle injection APIs can only be used during execution of setup() in defineComponent().');
        }
    };
}
function injectHook(currentInstance, lifecycle, hook) {
    const hiddenField = toHiddenField(lifecycle);
    if (currentInstance[hiddenField] === undefined) {
        currentInstance[hiddenField] = [];
    }
    currentInstance[hiddenField].push(hook);
}

exports.EffectScope = EffectScope;
exports.ReactiveEffect = ReactiveEffect;
exports.TrackOpTypes = TrackOpTypes;
exports.TriggerOpTypes = TriggerOpTypes;
exports.computed = computed;
exports.createApp = createApp;
exports.customRef = customRef;
exports.defineComponent = defineComponent;
exports.definePage = definePage;
exports.effect = effect;
exports.effectScope = effectScope;
exports.getCurrentScope = getCurrentScope;
exports.getCurrentWatcher = getCurrentWatcher;
exports.inject = inject;
exports.isProxy = isProxy;
exports.isReactive = isReactive;
exports.isReadonly = isReadonly;
exports.isRef = isRef;
exports.isShallow = isShallow;
exports.markRaw = markRaw;
exports.nextTick = nextTick;
exports.onAddToFavorites = onAddToFavorites;
exports.onAppError = onAppError;
exports.onAppHide = onAppHide;
exports.onAppShow = onAppShow;
exports.onDetach = onDetach;
exports.onError = onError;
exports.onHide = onHide;
exports.onLoad = onLoad;
exports.onMove = onMove;
exports.onPageNotFound = onPageNotFound;
exports.onPageScroll = onPageScroll;
exports.onPullDownRefresh = onPullDownRefresh;
exports.onReachBottom = onReachBottom;
exports.onReady = onReady;
exports.onResize = onResize;
exports.onRouteDone = onRouteDone;
exports.onSaveExitState = onSaveExitState;
exports.onScopeDispose = onScopeDispose;
exports.onShareAppMessage = onShareAppMessage;
exports.onShareTimeline = onShareTimeline;
exports.onShow = onShow;
exports.onTabItemTap = onTabItemTap;
exports.onThemeChange = onThemeChange;
exports.onUnhandledRejection = onUnhandledRejection;
exports.onUnload = onUnload;
exports.onWatcherCleanup = onWatcherCleanup;
exports.provide = provide;
exports.proxyRefs = proxyRefs;
exports.reactive = reactive;
exports.readonly = readonly;
exports.ref = ref;
exports.shallowReactive = shallowReactive;
exports.shallowReadonly = shallowReadonly;
exports.shallowRef = shallowRef;
exports.stop = stop;
exports.toRaw = toRaw;
exports.toRef = toRef;
exports.toRefs = toRefs;
exports.toValue = toValue;
exports.triggerRef = triggerRef;
exports.unref = unref;
exports.watch = watch;
exports.watchEffect = watchEffect;
exports.watchPostEffect = watchPostEffect;
exports.watchSyncEffect = watchSyncEffect;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1745476025423);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map