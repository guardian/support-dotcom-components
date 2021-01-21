(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __exportStar = (target, module, desc) => {
    __markAsModule(target);
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", {value: module, enumerable: true}), module);
  };

  // node_modules/object-assign/index.js
  var require_object_assign = __commonJS((exports, module) => {
    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty2 = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from3;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from3 = Object(arguments[s]);
        for (var key in from3) {
          if (hasOwnProperty2.call(from3, key)) {
            to[key] = from3[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from3);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from3, symbols[i])) {
              to[symbols[i]] = from3[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  });

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS((exports) => {
    /** @license React v16.13.1
     * react.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    "use strict";
    var l = require_object_assign();
    var n = typeof Symbol === "function" && Symbol.for;
    var p = n ? Symbol.for("react.element") : 60103;
    var q = n ? Symbol.for("react.portal") : 60106;
    var r = n ? Symbol.for("react.fragment") : 60107;
    var t = n ? Symbol.for("react.strict_mode") : 60108;
    var u = n ? Symbol.for("react.profiler") : 60114;
    var v = n ? Symbol.for("react.provider") : 60109;
    var w = n ? Symbol.for("react.context") : 60110;
    var x = n ? Symbol.for("react.forward_ref") : 60112;
    var y = n ? Symbol.for("react.suspense") : 60113;
    var z = n ? Symbol.for("react.memo") : 60115;
    var A = n ? Symbol.for("react.lazy") : 60116;
    var B = typeof Symbol === "function" && Symbol.iterator;
    function C(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var D = {isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    }};
    var E = {};
    function F(a, b, c) {
      this.props = a;
      this.context = b;
      this.refs = E;
      this.updater = c || D;
    }
    F.prototype.isReactComponent = {};
    F.prototype.setState = function(a, b) {
      if (typeof a !== "object" && typeof a !== "function" && a != null)
        throw Error(C(85));
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    F.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function G() {
    }
    G.prototype = F.prototype;
    function H(a, b, c) {
      this.props = a;
      this.context = b;
      this.refs = E;
      this.updater = c || D;
    }
    var I = H.prototype = new G();
    I.constructor = H;
    l(I, F.prototype);
    I.isPureReactComponent = true;
    var J = {current: null};
    var K = Object.prototype.hasOwnProperty;
    var L = {key: true, ref: true, __self: true, __source: true};
    function M(a, b, c) {
      var e, d = {}, g = null, k = null;
      if (b != null)
        for (e in b.ref !== void 0 && (k = b.ref), b.key !== void 0 && (g = "" + b.key), b)
          K.call(b, e) && !L.hasOwnProperty(e) && (d[e] = b[e]);
      var f = arguments.length - 2;
      if (f === 1)
        d.children = c;
      else if (1 < f) {
        for (var h = Array(f), m = 0; m < f; m++)
          h[m] = arguments[m + 2];
        d.children = h;
      }
      if (a && a.defaultProps)
        for (e in f = a.defaultProps, f)
          d[e] === void 0 && (d[e] = f[e]);
      return {$$typeof: p, type: a, key: g, ref: k, props: d, _owner: J.current};
    }
    function N(a, b) {
      return {$$typeof: p, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner};
    }
    function O(a) {
      return typeof a === "object" && a !== null && a.$$typeof === p;
    }
    function escape(a) {
      var b = {"=": "=0", ":": "=2"};
      return "$" + ("" + a).replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var P = /\/+/g;
    var Q = [];
    function R(a, b, c, e) {
      if (Q.length) {
        var d = Q.pop();
        d.result = a;
        d.keyPrefix = b;
        d.func = c;
        d.context = e;
        d.count = 0;
        return d;
      }
      return {result: a, keyPrefix: b, func: c, context: e, count: 0};
    }
    function S(a) {
      a.result = null;
      a.keyPrefix = null;
      a.func = null;
      a.context = null;
      a.count = 0;
      10 > Q.length && Q.push(a);
    }
    function T(a, b, c, e) {
      var d = typeof a;
      if (d === "undefined" || d === "boolean")
        a = null;
      var g = false;
      if (a === null)
        g = true;
      else
        switch (d) {
          case "string":
          case "number":
            g = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case p:
              case q:
                g = true;
            }
        }
      if (g)
        return c(e, a, b === "" ? "." + U(a, 0) : b), 1;
      g = 0;
      b = b === "" ? "." : b + ":";
      if (Array.isArray(a))
        for (var k = 0; k < a.length; k++) {
          d = a[k];
          var f = b + U(d, k);
          g += T(d, f, c, e);
        }
      else if (a === null || typeof a !== "object" ? f = null : (f = B && a[B] || a["@@iterator"], f = typeof f === "function" ? f : null), typeof f === "function")
        for (a = f.call(a), k = 0; !(d = a.next()).done; )
          d = d.value, f = b + U(d, k++), g += T(d, f, c, e);
      else if (d === "object")
        throw c = "" + a, Error(C(31, c === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : c, ""));
      return g;
    }
    function V(a, b, c) {
      return a == null ? 0 : T(a, "", b, c);
    }
    function U(a, b) {
      return typeof a === "object" && a !== null && a.key != null ? escape(a.key) : b.toString(36);
    }
    function W(a, b) {
      a.func.call(a.context, b, a.count++);
    }
    function aa(a, b, c) {
      var e = a.result, d = a.keyPrefix;
      a = a.func.call(a.context, b, a.count++);
      Array.isArray(a) ? X(a, e, c, function(a2) {
        return a2;
      }) : a != null && (O(a) && (a = N(a, d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(P, "$&/") + "/") + c)), e.push(a));
    }
    function X(a, b, c, e, d) {
      var g = "";
      c != null && (g = ("" + c).replace(P, "$&/") + "/");
      b = R(b, g, e, d);
      V(a, aa, b);
      S(b);
    }
    var Y = {current: null};
    function Z() {
      var a = Y.current;
      if (a === null)
        throw Error(C(321));
      return a;
    }
    var ba = {ReactCurrentDispatcher: Y, ReactCurrentBatchConfig: {suspense: null}, ReactCurrentOwner: J, IsSomeRendererActing: {current: false}, assign: l};
    exports.Children = {map: function(a, b, c) {
      if (a == null)
        return a;
      var e = [];
      X(a, e, null, b, c);
      return e;
    }, forEach: function(a, b, c) {
      if (a == null)
        return a;
      b = R(null, null, b, c);
      V(a, W, b);
      S(b);
    }, count: function(a) {
      return V(a, function() {
        return null;
      }, null);
    }, toArray: function(a) {
      var b = [];
      X(a, b, null, function(a2) {
        return a2;
      });
      return b;
    }, only: function(a) {
      if (!O(a))
        throw Error(C(143));
      return a;
    }};
    exports.Component = F;
    exports.Fragment = r;
    exports.Profiler = u;
    exports.PureComponent = H;
    exports.StrictMode = t;
    exports.Suspense = y;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ba;
    exports.cloneElement = function(a, b, c) {
      if (a === null || a === void 0)
        throw Error(C(267, a));
      var e = l({}, a.props), d = a.key, g = a.ref, k = a._owner;
      if (b != null) {
        b.ref !== void 0 && (g = b.ref, k = J.current);
        b.key !== void 0 && (d = "" + b.key);
        if (a.type && a.type.defaultProps)
          var f = a.type.defaultProps;
        for (h in b)
          K.call(b, h) && !L.hasOwnProperty(h) && (e[h] = b[h] === void 0 && f !== void 0 ? f[h] : b[h]);
      }
      var h = arguments.length - 2;
      if (h === 1)
        e.children = c;
      else if (1 < h) {
        f = Array(h);
        for (var m = 0; m < h; m++)
          f[m] = arguments[m + 2];
        e.children = f;
      }
      return {
        $$typeof: p,
        type: a.type,
        key: d,
        ref: g,
        props: e,
        _owner: k
      };
    };
    exports.createContext = function(a, b) {
      b === void 0 && (b = null);
      a = {$$typeof: w, _calculateChangedBits: b, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null};
      a.Provider = {$$typeof: v, _context: a};
      return a.Consumer = a;
    };
    exports.createElement = M;
    exports.createFactory = function(a) {
      var b = M.bind(null, a);
      b.type = a;
      return b;
    };
    exports.createRef = function() {
      return {current: null};
    };
    exports.forwardRef = function(a) {
      return {$$typeof: x, render: a};
    };
    exports.isValidElement = O;
    exports.lazy = function(a) {
      return {$$typeof: A, _ctor: a, _status: -1, _result: null};
    };
    exports.memo = function(a, b) {
      return {$$typeof: z, type: a, compare: b === void 0 ? null : b};
    };
    exports.useCallback = function(a, b) {
      return Z().useCallback(a, b);
    };
    exports.useContext = function(a, b) {
      return Z().useContext(a, b);
    };
    exports.useDebugValue = function() {
    };
    exports.useEffect = function(a, b) {
      return Z().useEffect(a, b);
    };
    exports.useImperativeHandle = function(a, b, c) {
      return Z().useImperativeHandle(a, b, c);
    };
    exports.useLayoutEffect = function(a, b) {
      return Z().useLayoutEffect(a, b);
    };
    exports.useMemo = function(a, b) {
      return Z().useMemo(a, b);
    };
    exports.useReducer = function(a, b, c) {
      return Z().useReducer(a, b, c);
    };
    exports.useRef = function(a) {
      return Z().useRef(a);
    };
    exports.useState = function(a) {
      return Z().useState(a);
    };
    exports.version = "16.13.1";
  });

  // node_modules/react/index.js
  var require_react = __commonJS((exports, module) => {
    "use strict";
    if (true) {
      module.exports = require_react_production_min();
    } else {
      module.exports = null;
    }
  });

  // node_modules/@babel/runtime/helpers/inheritsLoose.js
  var require_inheritsLoose = __commonJS((exports, module) => {
    function _inheritsLoose2(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    module.exports = _inheritsLoose2;
  });

  // node_modules/@babel/runtime/helpers/defineProperty.js
  var require_defineProperty = __commonJS((exports, module) => {
    function _defineProperty5(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    module.exports = _defineProperty5;
  });

  // node_modules/@babel/runtime/helpers/extends.js
  var require_extends = __commonJS((exports, module) => {
    function _extends4() {
      module.exports = _extends4 = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends4.apply(this, arguments);
    }
    module.exports = _extends4;
  });

  // node_modules/react-is/cjs/react-is.production.min.js
  var require_react_is_production_min = __commonJS((exports) => {
    /** @license React v16.13.1
     * react-is.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    "use strict";
    var b = typeof Symbol === "function" && Symbol.for;
    var c = b ? Symbol.for("react.element") : 60103;
    var d = b ? Symbol.for("react.portal") : 60106;
    var e = b ? Symbol.for("react.fragment") : 60107;
    var f = b ? Symbol.for("react.strict_mode") : 60108;
    var g = b ? Symbol.for("react.profiler") : 60114;
    var h = b ? Symbol.for("react.provider") : 60109;
    var k = b ? Symbol.for("react.context") : 60110;
    var l = b ? Symbol.for("react.async_mode") : 60111;
    var m = b ? Symbol.for("react.concurrent_mode") : 60111;
    var n = b ? Symbol.for("react.forward_ref") : 60112;
    var p = b ? Symbol.for("react.suspense") : 60113;
    var q = b ? Symbol.for("react.suspense_list") : 60120;
    var r = b ? Symbol.for("react.memo") : 60115;
    var t = b ? Symbol.for("react.lazy") : 60116;
    var v = b ? Symbol.for("react.block") : 60121;
    var w = b ? Symbol.for("react.fundamental") : 60117;
    var x = b ? Symbol.for("react.responder") : 60118;
    var y = b ? Symbol.for("react.scope") : 60119;
    function z(a) {
      if (typeof a === "object" && a !== null) {
        var u = a.$$typeof;
        switch (u) {
          case c:
            switch (a = a.type, a) {
              case l:
              case m:
              case e:
              case g:
              case f:
              case p:
                return a;
              default:
                switch (a = a && a.$$typeof, a) {
                  case k:
                  case n:
                  case t:
                  case r:
                  case h:
                    return a;
                  default:
                    return u;
                }
            }
          case d:
            return u;
        }
      }
    }
    function A(a) {
      return z(a) === m;
    }
    exports.AsyncMode = l;
    exports.ConcurrentMode = m;
    exports.ContextConsumer = k;
    exports.ContextProvider = h;
    exports.Element = c;
    exports.ForwardRef = n;
    exports.Fragment = e;
    exports.Lazy = t;
    exports.Memo = r;
    exports.Portal = d;
    exports.Profiler = g;
    exports.StrictMode = f;
    exports.Suspense = p;
    exports.isAsyncMode = function(a) {
      return A(a) || z(a) === l;
    };
    exports.isConcurrentMode = A;
    exports.isContextConsumer = function(a) {
      return z(a) === k;
    };
    exports.isContextProvider = function(a) {
      return z(a) === h;
    };
    exports.isElement = function(a) {
      return typeof a === "object" && a !== null && a.$$typeof === c;
    };
    exports.isForwardRef = function(a) {
      return z(a) === n;
    };
    exports.isFragment = function(a) {
      return z(a) === e;
    };
    exports.isLazy = function(a) {
      return z(a) === t;
    };
    exports.isMemo = function(a) {
      return z(a) === r;
    };
    exports.isPortal = function(a) {
      return z(a) === d;
    };
    exports.isProfiler = function(a) {
      return z(a) === g;
    };
    exports.isStrictMode = function(a) {
      return z(a) === f;
    };
    exports.isSuspense = function(a) {
      return z(a) === p;
    };
    exports.isValidElementType = function(a) {
      return typeof a === "string" || typeof a === "function" || a === e || a === m || a === g || a === f || a === p || a === q || typeof a === "object" && a !== null && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
    };
    exports.typeOf = z;
  });

  // node_modules/react-is/index.js
  var require_react_is = __commonJS((exports, module) => {
    "use strict";
    if (true) {
      module.exports = require_react_is_production_min();
    } else {
      module.exports = null;
    }
  });

  // node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
  var require_hoist_non_react_statics_cjs = __commonJS((exports, module) => {
    "use strict";
    var reactIs = require_react_is();
    var REACT_STATICS = {
      childContextTypes: true,
      contextType: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromError: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true
    };
    var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
    };
    var FORWARD_REF_STATICS = {
      $$typeof: true,
      render: true,
      defaultProps: true,
      displayName: true,
      propTypes: true
    };
    var MEMO_STATICS = {
      $$typeof: true,
      compare: true,
      defaultProps: true,
      displayName: true,
      propTypes: true,
      type: true
    };
    var TYPE_STATICS = {};
    TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
    TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
    function getStatics(component) {
      if (reactIs.isMemo(component)) {
        return MEMO_STATICS;
      }
      return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
    }
    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = Object.prototype;
    function hoistNonReactStatics2(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent !== "string") {
        if (objectPrototype) {
          var inheritedComponent = getPrototypeOf(sourceComponent);
          if (inheritedComponent && inheritedComponent !== objectPrototype) {
            hoistNonReactStatics2(targetComponent, inheritedComponent, blacklist);
          }
        }
        var keys = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
          keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }
        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
            var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
            try {
              defineProperty(targetComponent, key, descriptor);
            } catch (e) {
            }
          }
        }
      }
      return targetComponent;
    }
    module.exports = hoistNonReactStatics2;
  });

  // src/components/modules/banners/globalEoy/GlobalEoy.tsx
  var import_react21 = __toModule(require_react());

  // node_modules/@emotion/core/dist/core.browser.esm.js
  var import_inheritsLoose = __toModule(require_inheritsLoose());
  var import_react = __toModule(require_react());

  // node_modules/@emotion/sheet/dist/sheet.browser.esm.js
  function sheetForTag(tag) {
    if (tag.sheet) {
      return tag.sheet;
    }
    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].ownerNode === tag) {
        return document.styleSheets[i];
      }
    }
  }
  function createStyleElement(options) {
    var tag = document.createElement("style");
    tag.setAttribute("data-emotion", options.key);
    if (options.nonce !== void 0) {
      tag.setAttribute("nonce", options.nonce);
    }
    tag.appendChild(document.createTextNode(""));
    return tag;
  }
  var StyleSheet = /* @__PURE__ */ function() {
    function StyleSheet2(options) {
      this.isSpeedy = options.speedy === void 0 ? true : options.speedy;
      this.tags = [];
      this.ctr = 0;
      this.nonce = options.nonce;
      this.key = options.key;
      this.container = options.container;
      this.before = null;
    }
    var _proto = StyleSheet2.prototype;
    _proto.insert = function insert(rule) {
      if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
        var _tag = createStyleElement(this);
        var before;
        if (this.tags.length === 0) {
          before = this.before;
        } else {
          before = this.tags[this.tags.length - 1].nextSibling;
        }
        this.container.insertBefore(_tag, before);
        this.tags.push(_tag);
      }
      var tag = this.tags[this.tags.length - 1];
      if (this.isSpeedy) {
        var sheet = sheetForTag(tag);
        try {
          var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64;
          sheet.insertRule(rule, isImportRule ? 0 : sheet.cssRules.length);
        } catch (e) {
          if (false) {
            console.warn('There was a problem inserting the following rule: "' + rule + '"', e);
          }
        }
      } else {
        tag.appendChild(document.createTextNode(rule));
      }
      this.ctr++;
    };
    _proto.flush = function flush() {
      this.tags.forEach(function(tag) {
        return tag.parentNode.removeChild(tag);
      });
      this.tags = [];
      this.ctr = 0;
    };
    return StyleSheet2;
  }();

  // node_modules/@emotion/stylis/dist/stylis.browser.esm.js
  function stylis_min(W) {
    function M(d, c, e, h, a) {
      for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B2 = e.length, J = B2 - 1, y, f = "", p = "", F2 = "", G2 = "", C; l < B2; ) {
        g = e.charCodeAt(l);
        l === J && b + n + v + m !== 0 && (b !== 0 && (g = b === 47 ? 10 : 47), n = v = m = 0, B2++, J++);
        if (b + n + v + m === 0) {
          if (l === J && (0 < r && (f = f.replace(N, "")), 0 < f.trim().length)) {
            switch (g) {
              case 32:
              case 9:
              case 59:
              case 13:
              case 10:
                break;
              default:
                f += e.charAt(l);
            }
            g = 59;
          }
          switch (g) {
            case 123:
              f = f.trim();
              q = f.charCodeAt(0);
              k = 1;
              for (t = ++l; l < B2; ) {
                switch (g = e.charCodeAt(l)) {
                  case 123:
                    k++;
                    break;
                  case 125:
                    k--;
                    break;
                  case 47:
                    switch (g = e.charCodeAt(l + 1)) {
                      case 42:
                      case 47:
                        a: {
                          for (u = l + 1; u < J; ++u) {
                            switch (e.charCodeAt(u)) {
                              case 47:
                                if (g === 42 && e.charCodeAt(u - 1) === 42 && l + 2 !== u) {
                                  l = u + 1;
                                  break a;
                                }
                                break;
                              case 10:
                                if (g === 47) {
                                  l = u + 1;
                                  break a;
                                }
                            }
                          }
                          l = u;
                        }
                    }
                    break;
                  case 91:
                    g++;
                  case 40:
                    g++;
                  case 34:
                  case 39:
                    for (; l++ < J && e.charCodeAt(l) !== g; ) {
                    }
                }
                if (k === 0)
                  break;
                l++;
              }
              k = e.substring(t, l);
              q === 0 && (q = (f = f.replace(ca, "").trim()).charCodeAt(0));
              switch (q) {
                case 64:
                  0 < r && (f = f.replace(N, ""));
                  g = f.charCodeAt(1);
                  switch (g) {
                    case 100:
                    case 109:
                    case 115:
                    case 45:
                      r = c;
                      break;
                    default:
                      r = O;
                  }
                  k = M(c, r, k, g, a + 1);
                  t = k.length;
                  0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(""), C !== void 0 && (t = (k = C.trim()).length) === 0 && (g = 0, k = ""));
                  if (0 < t)
                    switch (g) {
                      case 115:
                        f = f.replace(da, ea);
                      case 100:
                      case 109:
                      case 45:
                        k = f + "{" + k + "}";
                        break;
                      case 107:
                        f = f.replace(fa, "$1 $2");
                        k = f + "{" + k + "}";
                        k = w === 1 || w === 2 && L("@" + k, 3) ? "@-webkit-" + k + "@" + k : "@" + k;
                        break;
                      default:
                        k = f + k, h === 112 && (k = (p += k, ""));
                    }
                  else
                    k = "";
                  break;
                default:
                  k = M(c, X(c, f, I), k, h, a + 1);
              }
              F2 += k;
              k = I = r = u = q = 0;
              f = "";
              g = e.charCodeAt(++l);
              break;
            case 125:
            case 59:
              f = (0 < r ? f.replace(N, "") : f).trim();
              if (1 < (t = f.length))
                switch (u === 0 && (q = f.charCodeAt(0), q === 45 || 96 < q && 123 > q) && (t = (f = f.replace(" ", ":")).length), 0 < A && (C = H(1, f, c, d, D, z, p.length, h, a, h)) !== void 0 && (t = (f = C.trim()).length) === 0 && (f = "\0\0"), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
                  case 0:
                    break;
                  case 64:
                    if (g === 105 || g === 99) {
                      G2 += f + e.charAt(l);
                      break;
                    }
                  default:
                    f.charCodeAt(t - 1) !== 58 && (p += P(f, q, g, f.charCodeAt(2)));
                }
              I = r = u = q = 0;
              f = "";
              g = e.charCodeAt(++l);
          }
        }
        switch (g) {
          case 13:
          case 10:
            b === 47 ? b = 0 : 1 + q === 0 && h !== 107 && 0 < f.length && (r = 1, f += "\0");
            0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
            z = 1;
            D++;
            break;
          case 59:
          case 125:
            if (b + n + v + m === 0) {
              z++;
              break;
            }
          default:
            z++;
            y = e.charAt(l);
            switch (g) {
              case 9:
              case 32:
                if (n + m + b === 0)
                  switch (x) {
                    case 44:
                    case 58:
                    case 9:
                    case 32:
                      y = "";
                      break;
                    default:
                      g !== 32 && (y = " ");
                  }
                break;
              case 0:
                y = "\\0";
                break;
              case 12:
                y = "\\f";
                break;
              case 11:
                y = "\\v";
                break;
              case 38:
                n + b + m === 0 && (r = I = 1, y = "\f" + y);
                break;
              case 108:
                if (n + b + m + E === 0 && 0 < u)
                  switch (l - u) {
                    case 2:
                      x === 112 && e.charCodeAt(l - 3) === 58 && (E = x);
                    case 8:
                      K === 111 && (E = K);
                  }
                break;
              case 58:
                n + b + m === 0 && (u = l);
                break;
              case 44:
                b + v + n + m === 0 && (r = 1, y += "\r");
                break;
              case 34:
              case 39:
                b === 0 && (n = n === g ? 0 : n === 0 ? g : n);
                break;
              case 91:
                n + b + v === 0 && m++;
                break;
              case 93:
                n + b + v === 0 && m--;
                break;
              case 41:
                n + b + m === 0 && v--;
                break;
              case 40:
                if (n + b + m === 0) {
                  if (q === 0)
                    switch (2 * x + 3 * K) {
                      case 533:
                        break;
                      default:
                        q = 1;
                    }
                  v++;
                }
                break;
              case 64:
                b + v + n + m + u + k === 0 && (k = 1);
                break;
              case 42:
              case 47:
                if (!(0 < n + m + v))
                  switch (b) {
                    case 0:
                      switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                        case 235:
                          b = 47;
                          break;
                        case 220:
                          t = l, b = 42;
                      }
                      break;
                    case 42:
                      g === 47 && x === 42 && t + 2 !== l && (e.charCodeAt(t + 2) === 33 && (p += e.substring(t, l + 1)), y = "", b = 0);
                  }
            }
            b === 0 && (f += y);
        }
        K = x;
        x = g;
        l++;
      }
      t = p.length;
      if (0 < t) {
        r = c;
        if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), C !== void 0 && (p = C).length === 0))
          return G2 + p + F2;
        p = r.join(",") + "{" + p + "}";
        if (w * E !== 0) {
          w !== 2 || L(p, 2) || (E = 0);
          switch (E) {
            case 111:
              p = p.replace(ha, ":-moz-$1") + p;
              break;
            case 112:
              p = p.replace(Q, "::-webkit-input-$1") + p.replace(Q, "::-moz-$1") + p.replace(Q, ":-ms-input-$1") + p;
          }
          E = 0;
        }
      }
      return G2 + p + F2;
    }
    function X(d, c, e) {
      var h = c.trim().split(ia);
      c = h;
      var a = h.length, m = d.length;
      switch (m) {
        case 0:
        case 1:
          var b = 0;
          for (d = m === 0 ? "" : d[0] + " "; b < a; ++b) {
            c[b] = Z(d, c[b], e).trim();
          }
          break;
        default:
          var v = b = 0;
          for (c = []; b < a; ++b) {
            for (var n = 0; n < m; ++n) {
              c[v++] = Z(d[n] + " ", h[b], e).trim();
            }
          }
      }
      return c;
    }
    function Z(d, c, e) {
      var h = c.charCodeAt(0);
      33 > h && (h = (c = c.trim()).charCodeAt(0));
      switch (h) {
        case 38:
          return c.replace(F, "$1" + d.trim());
        case 58:
          return d.trim() + c.replace(F, "$1" + d.trim());
        default:
          if (0 < 1 * e && 0 < c.indexOf("\f"))
            return c.replace(F, (d.charCodeAt(0) === 58 ? "" : "$1") + d.trim());
      }
      return d + c;
    }
    function P(d, c, e, h) {
      var a = d + ";", m = 2 * c + 3 * e + 4 * h;
      if (m === 944) {
        d = a.indexOf(":", 9) + 1;
        var b = a.substring(d, a.length - 1).trim();
        b = a.substring(0, d).trim() + b + ";";
        return w === 1 || w === 2 && L(b, 1) ? "-webkit-" + b + b : b;
      }
      if (w === 0 || w === 2 && !L(a, 1))
        return a;
      switch (m) {
        case 1015:
          return a.charCodeAt(10) === 97 ? "-webkit-" + a + a : a;
        case 951:
          return a.charCodeAt(3) === 116 ? "-webkit-" + a + a : a;
        case 963:
          return a.charCodeAt(5) === 110 ? "-webkit-" + a + a : a;
        case 1009:
          if (a.charCodeAt(4) !== 100)
            break;
        case 969:
        case 942:
          return "-webkit-" + a + a;
        case 978:
          return "-webkit-" + a + "-moz-" + a + a;
        case 1019:
        case 983:
          return "-webkit-" + a + "-moz-" + a + "-ms-" + a + a;
        case 883:
          if (a.charCodeAt(8) === 45)
            return "-webkit-" + a + a;
          if (0 < a.indexOf("image-set(", 11))
            return a.replace(ja, "$1-webkit-$2") + a;
          break;
        case 932:
          if (a.charCodeAt(4) === 45)
            switch (a.charCodeAt(5)) {
              case 103:
                return "-webkit-box-" + a.replace("-grow", "") + "-webkit-" + a + "-ms-" + a.replace("grow", "positive") + a;
              case 115:
                return "-webkit-" + a + "-ms-" + a.replace("shrink", "negative") + a;
              case 98:
                return "-webkit-" + a + "-ms-" + a.replace("basis", "preferred-size") + a;
            }
          return "-webkit-" + a + "-ms-" + a + a;
        case 964:
          return "-webkit-" + a + "-ms-flex-" + a + a;
        case 1023:
          if (a.charCodeAt(8) !== 99)
            break;
          b = a.substring(a.indexOf(":", 15)).replace("flex-", "").replace("space-between", "justify");
          return "-webkit-box-pack" + b + "-webkit-" + a + "-ms-flex-pack" + b + a;
        case 1005:
          return ka.test(a) ? a.replace(aa, ":-webkit-") + a.replace(aa, ":-moz-") + a : a;
        case 1e3:
          b = a.substring(13).trim();
          c = b.indexOf("-") + 1;
          switch (b.charCodeAt(0) + b.charCodeAt(c)) {
            case 226:
              b = a.replace(G, "tb");
              break;
            case 232:
              b = a.replace(G, "tb-rl");
              break;
            case 220:
              b = a.replace(G, "lr");
              break;
            default:
              return a;
          }
          return "-webkit-" + a + "-ms-" + b + a;
        case 1017:
          if (a.indexOf("sticky", 9) === -1)
            break;
        case 975:
          c = (a = d).length - 10;
          b = (a.charCodeAt(c) === 33 ? a.substring(0, c) : a).substring(d.indexOf(":", 7) + 1).trim();
          switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
            case 203:
              if (111 > b.charCodeAt(8))
                break;
            case 115:
              a = a.replace(b, "-webkit-" + b) + ";" + a;
              break;
            case 207:
            case 102:
              a = a.replace(b, "-webkit-" + (102 < m ? "inline-" : "") + "box") + ";" + a.replace(b, "-webkit-" + b) + ";" + a.replace(b, "-ms-" + b + "box") + ";" + a;
          }
          return a + ";";
        case 938:
          if (a.charCodeAt(5) === 45)
            switch (a.charCodeAt(6)) {
              case 105:
                return b = a.replace("-items", ""), "-webkit-" + a + "-webkit-box-" + b + "-ms-flex-" + b + a;
              case 115:
                return "-webkit-" + a + "-ms-flex-item-" + a.replace(ba, "") + a;
              default:
                return "-webkit-" + a + "-ms-flex-line-pack" + a.replace("align-content", "").replace(ba, "") + a;
            }
          break;
        case 973:
        case 989:
          if (a.charCodeAt(3) !== 45 || a.charCodeAt(4) === 122)
            break;
        case 931:
        case 953:
          if (la.test(d) === true)
            return (b = d.substring(d.indexOf(":") + 1)).charCodeAt(0) === 115 ? P(d.replace("stretch", "fill-available"), c, e, h).replace(":fill-available", ":stretch") : a.replace(b, "-webkit-" + b) + a.replace(b, "-moz-" + b.replace("fill-", "")) + a;
          break;
        case 962:
          if (a = "-webkit-" + a + (a.charCodeAt(5) === 102 ? "-ms-" + a : "") + a, e + h === 211 && a.charCodeAt(13) === 105 && 0 < a.indexOf("transform", 10))
            return a.substring(0, a.indexOf(";", 27) + 1).replace(ma, "$1-webkit-$2") + a;
      }
      return a;
    }
    function L(d, c) {
      var e = d.indexOf(c === 1 ? ":" : "{"), h = d.substring(0, c !== 3 ? e : 10);
      e = d.substring(e + 1, d.length - 1);
      return R(c !== 2 ? h : h.replace(na, "$1"), e, c);
    }
    function ea(d, c) {
      var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
      return e !== c + ";" ? e.replace(oa, " or ($1)").substring(4) : "(" + c + ")";
    }
    function H(d, c, e, h, a, m, b, v, n, q) {
      for (var g = 0, x = c, w2; g < A; ++g) {
        switch (w2 = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
          case void 0:
          case false:
          case true:
          case null:
            break;
          default:
            x = w2;
        }
      }
      if (x !== c)
        return x;
    }
    function T(d) {
      switch (d) {
        case void 0:
        case null:
          A = S.length = 0;
          break;
        default:
          if (typeof d === "function")
            S[A++] = d;
          else if (typeof d === "object")
            for (var c = 0, e = d.length; c < e; ++c) {
              T(d[c]);
            }
          else
            Y = !!d | 0;
      }
      return T;
    }
    function U(d) {
      d = d.prefix;
      d !== void 0 && (R = null, d ? typeof d !== "function" ? w = 1 : (w = 2, R = d) : w = 0);
      return U;
    }
    function B(d, c) {
      var e = d;
      33 > e.charCodeAt(0) && (e = e.trim());
      V = e;
      e = [V];
      if (0 < A) {
        var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
        h !== void 0 && typeof h === "string" && (c = h);
      }
      var a = M(O, e, c, 0, 0);
      0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), h !== void 0 && (a = h));
      V = "";
      E = 0;
      z = D = 1;
      return a;
    }
    var ca = /^\0+/g, N = /[\0\r\f]/g, aa = /: */g, ka = /zoo|gra/, ma = /([,: ])(transform)/g, ia = /,\r+?/g, F = /([\t\r\n ])*\f?&/g, fa = /@(k\w+)\s*(\S*)\s*/, Q = /::(place)/g, ha = /:(read-only)/g, G = /[svh]\w+-[tblr]{2}/, da = /\(\s*(.*)\s*\)/g, oa = /([\s\S]*?);/g, ba = /-self|flex-/g, na = /[^]*?(:[rp][el]a[\w-]+)[^]*/, la = /stretch|:\s*\w+\-(?:conte|avail)/, ja = /([^-])(image-set\()/, z = 1, D = 1, E = 0, w = 1, O = [], S = [], A = 0, R = null, Y = 0, V = "";
    B.use = T;
    B.set = U;
    W !== void 0 && U(W);
    return B;
  }
  var stylis_browser_esm_default = stylis_min;

  // node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js
  var weakMemoize = function weakMemoize2(func) {
    var cache = new WeakMap();
    return function(arg) {
      if (cache.has(arg)) {
        return cache.get(arg);
      }
      var ret = func(arg);
      cache.set(arg, ret);
      return ret;
    };
  };
  var weak_memoize_browser_esm_default = weakMemoize;

  // node_modules/@emotion/cache/dist/cache.browser.esm.js
  var delimiter = "/*|*/";
  var needle = delimiter + "}";
  function toSheet(block) {
    if (block) {
      Sheet.current.insert(block + "}");
    }
  }
  var Sheet = {
    current: null
  };
  var ruleSheet = function ruleSheet2(context, content, selectors, parents, line5, column3, length, ns, depth, at) {
    switch (context) {
      case 1: {
        switch (content.charCodeAt(0)) {
          case 64: {
            Sheet.current.insert(content + ";");
            return "";
          }
          case 108: {
            if (content.charCodeAt(2) === 98) {
              return "";
            }
          }
        }
        break;
      }
      case 2: {
        if (ns === 0)
          return content + delimiter;
        break;
      }
      case 3: {
        switch (ns) {
          case 102:
          case 112: {
            Sheet.current.insert(selectors[0] + content);
            return "";
          }
          default: {
            return content + (at === 0 ? delimiter : "");
          }
        }
      }
      case -2: {
        content.split(needle).forEach(toSheet);
      }
    }
  };
  var createCache = function createCache2(options) {
    if (options === void 0)
      options = {};
    var key = options.key || "css";
    var stylisOptions;
    if (options.prefix !== void 0) {
      stylisOptions = {
        prefix: options.prefix
      };
    }
    var stylis = new stylis_browser_esm_default(stylisOptions);
    if (false) {
      if (/[^a-z-]/.test(key)) {
        throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
      }
    }
    var inserted = {};
    var container8;
    {
      container8 = options.container || document.head;
      var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
      Array.prototype.forEach.call(nodes, function(node) {
        var attrib = node.getAttribute("data-emotion-" + key);
        attrib.split(" ").forEach(function(id) {
          inserted[id] = true;
        });
        if (node.parentNode !== container8) {
          container8.appendChild(node);
        }
      });
    }
    var _insert;
    {
      stylis.use(options.stylisPlugins)(ruleSheet);
      _insert = function insert(selector, serialized, sheet, shouldCache) {
        var name = serialized.name;
        Sheet.current = sheet;
        if (false) {
          var map = serialized.map;
          Sheet.current = {
            insert: function insert2(rule) {
              sheet.insert(rule + map);
            }
          };
        }
        stylis(selector, serialized.styles);
        if (shouldCache) {
          cache.inserted[name] = true;
        }
      };
    }
    if (false) {
      var commentStart = /\/\*/g;
      var commentEnd = /\*\//g;
      stylis.use(function(context, content) {
        switch (context) {
          case -1: {
            while (commentStart.test(content)) {
              commentEnd.lastIndex = commentStart.lastIndex;
              if (commentEnd.test(content)) {
                commentStart.lastIndex = commentEnd.lastIndex;
                continue;
              }
              throw new Error('Your styles have an unterminated comment ("/*" without corresponding "*/").');
            }
            commentStart.lastIndex = 0;
            break;
          }
        }
      });
      stylis.use(function(context, content, selectors) {
        switch (context) {
          case -1: {
            var flag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
            var unsafePseudoClasses = content.match(/(:first|:nth|:nth-last)-child/g);
            if (unsafePseudoClasses && cache.compat !== true) {
              unsafePseudoClasses.forEach(function(unsafePseudoClass) {
                var ignoreRegExp = new RegExp(unsafePseudoClass + ".*\\/\\* " + flag + " \\*\\/");
                var ignore = ignoreRegExp.test(content);
                if (unsafePseudoClass && !ignore) {
                  console.error('The pseudo class "' + unsafePseudoClass + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + unsafePseudoClass.split("-child")[0] + '-of-type".');
                }
              });
            }
            break;
          }
        }
      });
    }
    var cache = {
      key,
      sheet: new StyleSheet({
        key,
        container: container8,
        nonce: options.nonce,
        speedy: options.speedy
      }),
      nonce: options.nonce,
      inserted,
      registered: {},
      insert: _insert
    };
    return cache;
  };
  var cache_browser_esm_default = createCache;

  // node_modules/@emotion/utils/dist/utils.browser.esm.js
  var isBrowser = true;
  function getRegisteredStyles(registered, registeredStyles, classNames) {
    var rawClassName = "";
    classNames.split(" ").forEach(function(className) {
      if (registered[className] !== void 0) {
        registeredStyles.push(registered[className]);
      } else {
        rawClassName += className + " ";
      }
    });
    return rawClassName;
  }
  var insertStyles = function insertStyles2(cache, serialized, isStringTag) {
    var className = cache.key + "-" + serialized.name;
    if ((isStringTag === false || isBrowser === false && cache.compat !== void 0) && cache.registered[className] === void 0) {
      cache.registered[className] = serialized.styles;
    }
    if (cache.inserted[serialized.name] === void 0) {
      var current = serialized;
      do {
        var maybeStyles = cache.insert("." + className, current, cache.sheet, true);
        current = current.next;
      } while (current !== void 0);
    }
  };

  // node_modules/@emotion/hash/dist/hash.browser.esm.js
  function murmur2(str) {
    var h = 0;
    var k, i = 0, len = str.length;
    for (; len >= 4; ++i, len -= 4) {
      k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
      k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
      k ^= k >>> 24;
      h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    }
    switch (len) {
      case 3:
        h ^= (str.charCodeAt(i + 2) & 255) << 16;
      case 2:
        h ^= (str.charCodeAt(i + 1) & 255) << 8;
      case 1:
        h ^= str.charCodeAt(i) & 255;
        h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    }
    h ^= h >>> 13;
    h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    return ((h ^ h >>> 15) >>> 0).toString(36);
  }
  var hash_browser_esm_default = murmur2;

  // node_modules/@emotion/unitless/dist/unitless.browser.esm.js
  var unitlessKeys = {
    animationIterationCount: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };
  var unitless_browser_esm_default = unitlessKeys;

  // node_modules/@emotion/memoize/dist/memoize.browser.esm.js
  function memoize(fn) {
    var cache = {};
    return function(arg) {
      if (cache[arg] === void 0)
        cache[arg] = fn(arg);
      return cache[arg];
    };
  }
  var memoize_browser_esm_default = memoize;

  // node_modules/@emotion/serialize/dist/serialize.browser.esm.js
  var hyphenateRegex = /[A-Z]|^ms/g;
  var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
  var isCustomProperty = function isCustomProperty2(property) {
    return property.charCodeAt(1) === 45;
  };
  var isProcessableValue = function isProcessableValue2(value) {
    return value != null && typeof value !== "boolean";
  };
  var processStyleName = memoize_browser_esm_default(function(styleName) {
    return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
  });
  var processStyleValue = function processStyleValue2(key, value) {
    switch (key) {
      case "animation":
      case "animationName": {
        if (typeof value === "string") {
          return value.replace(animationRegex, function(match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
    }
    if (unitless_browser_esm_default[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
      return value + "px";
    }
    return value;
  };
  if (false) {
    contentValuePattern = /(attr|calc|counters?|url)\(/;
    contentValues = ["normal", "none", "counter", "open-quote", "close-quote", "no-open-quote", "no-close-quote", "initial", "inherit", "unset"];
    oldProcessStyleValue = processStyleValue;
    msPattern = /^-ms-/;
    hyphenPattern = /-(.)/g;
    hyphenatedCache = {};
    processStyleValue = function processStyleValue3(key, value) {
      if (key === "content") {
        if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
          console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
        }
      }
      var processed = oldProcessStyleValue(key, value);
      if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
        hyphenatedCache[key] = true;
        console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
          return _char.toUpperCase();
        }) + "?");
      }
      return processed;
    };
  }
  var contentValuePattern;
  var contentValues;
  var oldProcessStyleValue;
  var msPattern;
  var hyphenPattern;
  var hyphenatedCache;
  var shouldWarnAboutInterpolatingClassNameFromCss = true;
  function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
    if (interpolation == null) {
      return "";
    }
    if (interpolation.__emotion_styles !== void 0) {
      if (false) {
        throw new Error("Component selectors can only be used in conjunction with babel-plugin-emotion.");
      }
      return interpolation;
    }
    switch (typeof interpolation) {
      case "boolean": {
        return "";
      }
      case "object": {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }
        if (interpolation.styles !== void 0) {
          var next = interpolation.next;
          if (next !== void 0) {
            while (next !== void 0) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }
          var styles = interpolation.styles + ";";
          if (false) {
            styles += interpolation.map;
          }
          return styles;
        }
        return createStringFromObject(mergedProps, registered, interpolation);
      }
      case "function": {
        if (mergedProps !== void 0) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        } else if (false) {
          console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
        }
        break;
      }
      case "string":
        if (false) {
          var matched = [];
          var replaced = interpolation.replace(animationRegex, function(match, p1, p2) {
            var fakeVarName = "animation" + matched.length;
            matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
            return "${" + fakeVarName + "}";
          });
          if (matched.length) {
            console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\n" + ("css`" + replaced + "`"));
          }
        }
        break;
    }
    if (registered == null) {
      return interpolation;
    }
    var cached = registered[interpolation];
    if (false) {
      console.error("Interpolating a className from css`` is not recommended and will cause problems with composition.\nInterpolating a className from css`` will be completely unsupported in a future major version of Emotion");
      shouldWarnAboutInterpolatingClassNameFromCss = false;
    }
    return cached !== void 0 && !couldBeSelectorInterpolation ? cached : interpolation;
  }
  function createStringFromObject(mergedProps, registered, obj) {
    var string = "";
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        string += handleInterpolation(mergedProps, registered, obj[i], false);
      }
    } else {
      for (var _key in obj) {
        var value = obj[_key];
        if (typeof value !== "object") {
          if (registered != null && registered[value] !== void 0) {
            string += _key + "{" + registered[value] + "}";
          } else if (isProcessableValue(value)) {
            string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
          }
        } else {
          if (_key === "NO_COMPONENT_SELECTOR" && false) {
            throw new Error("Component selectors can only be used in conjunction with babel-plugin-emotion.");
          }
          if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
            for (var _i = 0; _i < value.length; _i++) {
              if (isProcessableValue(value[_i])) {
                string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
              }
            }
          } else {
            var interpolated = handleInterpolation(mergedProps, registered, value, false);
            switch (_key) {
              case "animation":
              case "animationName": {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }
              default: {
                if (false) {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }
                string += _key + "{" + interpolated + "}";
              }
            }
          }
        }
      }
    }
    return string;
  }
  var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
  var sourceMapPattern;
  if (false) {
    sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
  }
  var cursor;
  var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
    if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
      return args[0];
    }
    var stringMode = true;
    var styles = "";
    cursor = void 0;
    var strings = args[0];
    if (strings == null || strings.raw === void 0) {
      stringMode = false;
      styles += handleInterpolation(mergedProps, registered, strings, false);
    } else {
      if (false) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles += strings[0];
    }
    for (var i = 1; i < args.length; i++) {
      styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);
      if (stringMode) {
        if (false) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles += strings[i];
      }
    }
    var sourceMap;
    if (false) {
      styles = styles.replace(sourceMapPattern, function(match2) {
        sourceMap = match2;
        return "";
      });
    }
    labelPattern.lastIndex = 0;
    var identifierName = "";
    var match;
    while ((match = labelPattern.exec(styles)) !== null) {
      identifierName += "-" + match[1];
    }
    var name = hash_browser_esm_default(styles) + identifierName;
    if (false) {
      return {
        name,
        styles,
        map: sourceMap,
        next: cursor,
        toString: function toString() {
          return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
        }
      };
    }
    return {
      name,
      styles,
      next: cursor
    };
  };

  // node_modules/@emotion/css/dist/css.browser.esm.js
  function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return serializeStyles(args);
  }
  var css_browser_esm_default = css;

  // node_modules/@emotion/core/dist/core.browser.esm.js
  var EmotionCacheContext = import_react.createContext(typeof HTMLElement !== "undefined" ? cache_browser_esm_default() : null);
  var ThemeContext = import_react.createContext({});
  var CacheProvider = EmotionCacheContext.Provider;
  var withEmotionCache = function withEmotionCache2(func) {
    var render3 = function render4(props, ref) {
      return import_react.createElement(EmotionCacheContext.Consumer, null, function(cache) {
        return func(props, cache, ref);
      });
    };
    return import_react.forwardRef(render3);
  };
  var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var render = function render2(cache, props, theme, ref) {
    var cssProp = theme === null ? props.css : props.css(theme);
    if (typeof cssProp === "string" && cache.registered[cssProp] !== void 0) {
      cssProp = cache.registered[cssProp];
    }
    var type = props[typePropName];
    var registeredStyles = [cssProp];
    var className = "";
    if (typeof props.className === "string") {
      className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
    } else if (props.className != null) {
      className = props.className + " ";
    }
    var serialized = serializeStyles(registeredStyles);
    if (false) {
      var labelFromStack = props[labelPropName];
      if (labelFromStack) {
        serialized = serializeStyles([serialized, "label:" + labelFromStack + ";"]);
      }
    }
    var rules = insertStyles(cache, serialized, typeof type === "string");
    className += cache.key + "-" + serialized.name;
    var newProps = {};
    for (var key in props) {
      if (hasOwnProperty.call(props, key) && key !== "css" && key !== typePropName && true) {
        newProps[key] = props[key];
      }
    }
    newProps.ref = ref;
    newProps.className = className;
    var ele = import_react.createElement(type, newProps);
    return ele;
  };
  var Emotion = /* @__PURE__ */ withEmotionCache(function(props, cache, ref) {
    if (typeof props.css === "function") {
      return import_react.createElement(ThemeContext.Consumer, null, function(theme) {
        return render(cache, props, theme, ref);
      });
    }
    return render(cache, props, null, ref);
  });
  if (false) {
    Emotion.displayName = "EmotionCssPropInternal";
  }
  var jsx = function jsx2(type, props) {
    var args = arguments;
    if (props == null || !hasOwnProperty.call(props, "css")) {
      return import_react.createElement.apply(void 0, args);
    }
    if (false) {
      throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/css' like this: css`" + props.css + "`");
    }
    var argsLength = args.length;
    var createElementArgArray = new Array(argsLength);
    createElementArgArray[0] = Emotion;
    var newProps = {};
    for (var key in props) {
      if (hasOwnProperty.call(props, key)) {
        newProps[key] = props[key];
      }
    }
    newProps[typePropName] = type;
    if (false) {
      var error5 = new Error();
      if (error5.stack) {
        var match = error5.stack.match(/at (?:Object\.|)jsx.*\n\s+at ([A-Z][A-Za-z$]+) /);
        if (!match) {
          match = error5.stack.match(/.*\n([A-Z][A-Za-z$]+)@/);
        }
        if (match) {
          newProps[labelPropName] = sanitizeIdentifier(match[1]);
        }
      }
    }
    createElementArgArray[1] = newProps;
    for (var i = 2; i < argsLength; i++) {
      createElementArgArray[i] = args[i];
    }
    return import_react.createElement.apply(null, createElementArgArray);
  };
  var classnames = function classnames2(args) {
    var len = args.length;
    var i = 0;
    var cls = "";
    for (; i < len; i++) {
      var arg = args[i];
      if (arg == null)
        continue;
      var toAdd = void 0;
      switch (typeof arg) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(arg)) {
            toAdd = classnames2(arg);
          } else {
            toAdd = "";
            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += " ");
                toAdd += k;
              }
            }
          }
          break;
        }
        default: {
          toAdd = arg;
        }
      }
      if (toAdd) {
        cls && (cls += " ");
        cls += toAdd;
      }
    }
    return cls;
  };
  function merge(registered, css2, className) {
    var registeredStyles = [];
    var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
    if (registeredStyles.length < 2) {
      return className;
    }
    return rawClassName + css2(registeredStyles);
  }
  var ClassNames = withEmotionCache(function(props, context) {
    return import_react.createElement(ThemeContext.Consumer, null, function(theme) {
      var hasRendered = false;
      var css2 = function css3() {
        if (hasRendered && false) {
          throw new Error("css can only be used during render");
        }
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var serialized = serializeStyles(args, context.registered);
        {
          insertStyles(context, serialized, false);
        }
        return context.key + "-" + serialized.name;
      };
      var cx = function cx2() {
        if (hasRendered && false) {
          throw new Error("cx can only be used during render");
        }
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return merge(context.registered, css2, classnames(args));
      };
      var content = {
        css: css2,
        cx,
        theme
      };
      var ele = props.children(content);
      hasRendered = true;
      return ele;
    });
  });

  // src/components/modules/banners/contributionsTemplate/ContributionsTemplateWithVisual.tsx
  var import_react2 = __toModule(require_react());

  // node_modules/@guardian/src-foundations/foundations.esm.js
  var colors = {
    reds: [
      "#660505",
      "#8B0000",
      "#AB0613",
      "#C70000",
      "#FF5943",
      "#FFBAC8",
      "#FFF4F2",
      "#FF9081"
    ],
    oranges: [
      "#672005",
      "#8D2700",
      "#BD5318",
      "#E05E00",
      "#FF7F0F",
      "#F9B376",
      "#FEF9F5"
    ],
    blues: [
      "#003C60",
      "#004E7C",
      "#005689",
      "#0084C6",
      "#00B2FF",
      "#90DCFF",
      "#F1F8FC",
      "#001536",
      "#041F4A",
      "#052962",
      "#007ABC",
      "#506991",
      "#C1D8FC"
    ],
    browns: [
      "#3E3323",
      "#574835",
      "#6B5840",
      "#A1845C",
      "#EACCA0",
      "#E7D4B9",
      "#FBF6EF"
    ],
    pinks: [
      "#510043",
      "#650054",
      "#7D0068",
      "#BB3B80",
      "#FFABDB",
      "#FEC8D3",
      "#FEEEF7"
    ],
    yellows: [
      "#F3C100",
      "#FFD900",
      "#FFE500"
    ],
    greens: [
      "#185E36",
      "#22874D",
      "#58D08B",
      "#4B8878",
      "#65A897",
      "#69D1CA"
    ],
    grays: [
      "#000000",
      "#121212",
      "#1A1A1A",
      "#333333",
      "#767676",
      "#999999",
      "#DCDCDC",
      "#EDEDED",
      "#F6F6F6",
      "#FFFFFF",
      "#222527",
      "#303538",
      "#3F464A",
      "#63717A",
      "#ABC2C9",
      "#33393D"
    ]
  };
  var space = [0, 4, 8, 12, 16, 20, 24, 36, 48, 96];
  var size = [24, 36, 44];
  var breakpoints = [740, 980, 1140, 1300];
  var tweakpoints = [320, 375, 480, 660];
  var transitions = [".2s cubic-bezier(.64, .57, .67, 1.53)", ".3s ease-in-out", ".65s ease-in-out"];
  var transitions$1 = {
    short: transitions[0],
    medium: transitions[1],
    long: transitions[2]
  };
  var breakpoints$1 = {
    mobile: tweakpoints[0],
    mobileMedium: tweakpoints[1],
    mobileLandscape: tweakpoints[2],
    phablet: tweakpoints[3],
    tablet: breakpoints[0],
    desktop: breakpoints[1],
    leftCol: breakpoints[2],
    wide: breakpoints[3]
  };
  var brand = {
    100: colors.blues[7],
    300: colors.blues[8],
    400: colors.blues[9],
    500: colors.blues[10],
    600: colors.blues[11],
    800: colors.blues[12],
    dark: colors.blues[8],
    main: colors.blues[9],
    bright: colors.blues[10],
    pastel: colors.blues[11],
    faded: colors.blues[12]
  };
  var brandAlt = {
    200: colors.yellows[0],
    300: colors.yellows[1],
    400: colors.yellows[2],
    dark: colors.yellows[1],
    main: colors.yellows[2]
  };
  var neutral = {
    0: colors.grays[0],
    7: colors.grays[1],
    10: colors.grays[2],
    20: colors.grays[3],
    46: colors.grays[4],
    60: colors.grays[5],
    86: colors.grays[6],
    93: colors.grays[7],
    97: colors.grays[8],
    100: colors.grays[9]
  };
  var error = {
    400: colors.reds[3],
    500: colors.reds[7],
    main: colors.reds[3],
    bright: colors.reds[7]
  };
  var success = {
    400: colors.greens[1],
    500: colors.greens[2],
    main: colors.greens[1]
  };
  var news = {
    100: colors.reds[0],
    200: colors.reds[1],
    300: colors.reds[2],
    400: colors.reds[3],
    500: colors.reds[4],
    600: colors.reds[5],
    800: colors.reds[6],
    dark: colors.reds[2],
    main: colors.reds[3],
    bright: colors.reds[4],
    pastel: colors.reds[5],
    faded: colors.reds[6]
  };
  var opinion = {
    100: colors.oranges[0],
    200: colors.oranges[1],
    300: colors.oranges[2],
    400: colors.oranges[3],
    500: colors.oranges[4],
    600: colors.oranges[5],
    800: colors.oranges[6],
    dark: colors.oranges[2],
    main: colors.oranges[3],
    bright: colors.oranges[4],
    pastel: colors.oranges[5],
    faded: colors.oranges[6]
  };
  var sport = {
    100: colors.blues[0],
    200: colors.blues[1],
    300: colors.blues[2],
    400: colors.blues[3],
    500: colors.blues[4],
    600: colors.blues[5],
    800: colors.blues[6],
    dark: colors.blues[2],
    main: colors.blues[3],
    bright: colors.blues[4],
    pastel: colors.blues[5],
    faded: colors.blues[6]
  };
  var culture = {
    100: colors.browns[0],
    200: colors.browns[1],
    300: colors.browns[2],
    400: colors.browns[3],
    500: colors.browns[4],
    600: colors.browns[5],
    800: colors.browns[6],
    dark: colors.browns[2],
    main: colors.browns[3],
    bright: colors.browns[4],
    pastel: colors.browns[5],
    faded: colors.browns[6]
  };
  var lifestyle = {
    100: colors.pinks[0],
    200: colors.pinks[1],
    300: colors.pinks[2],
    400: colors.pinks[3],
    500: colors.pinks[4],
    600: colors.pinks[5],
    800: colors.pinks[6],
    dark: colors.pinks[2],
    main: colors.pinks[3],
    bright: colors.pinks[4],
    pastel: colors.pinks[5],
    faded: colors.pinks[6]
  };
  var labs = {
    200: colors.greens[3],
    300: colors.greens[4],
    400: colors.greens[5],
    dark: colors.greens[4],
    main: colors.greens[5]
  };
  var specialReport = {
    100: colors.grays[10],
    200: colors.grays[11],
    300: colors.grays[12],
    400: colors.grays[13],
    500: colors.grays[14]
  };
  var dynamo = {
    400: colors.grays[15]
  };
  var background = {
    primary: neutral[100],
    secondary: neutral[97],
    inverse: neutral[10],
    ctaPrimary: brand[400],
    ctaPrimaryHover: "#234B8A",
    ctaSecondary: brand[800],
    ctaSecondaryHover: "#ACC9F7",
    ctaTertiaryHover: "#E5E5E5",
    input: neutral[100],
    inputChecked: brand[500]
  };
  var brandBackground = {
    primary: brand[400],
    inputChecked: neutral[100],
    ctaPrimary: neutral[100],
    ctaPrimaryHover: "#E0E0E0",
    ctaSecondary: brand[600],
    ctaSecondaryHover: "#234B8A",
    ctaTertiaryHover: brand[300]
  };
  var brandAltBackground = {
    primary: brandAlt[400],
    ctaPrimary: neutral[7],
    ctaPrimaryHover: "#454545",
    ctaSecondary: brandAlt[200],
    ctaSecondaryHover: "#F2AE00",
    ctaTertiaryHover: "#FFD213"
  };
  var border = {
    primary: neutral[60],
    secondary: neutral[86],
    success: success[400],
    error: error[400],
    ctaTertiary: brand[400],
    input: neutral[60],
    inputChecked: brand[500],
    inputHover: brand[500],
    inputActive: brand[500],
    focusHalo: sport[500]
  };
  var brandBorder = {
    primary: brand[800],
    success: success[500],
    error: error[500],
    ctaTertiary: neutral[100],
    input: brand[800],
    inputChecked: neutral[100],
    inputHover: neutral[100]
  };
  var brandAltBorder = {
    ctaTertiary: neutral[7]
  };
  var line = {
    primary: neutral[86]
  };
  var brandLine = {
    primary: brand[600]
  };
  var brandAltLine = {
    primary: neutral[7]
  };
  var text = {
    primary: neutral[7],
    supporting: neutral[46],
    success: success[400],
    error: error[400],
    ctaPrimary: neutral[100],
    ctaSecondary: brand[400],
    ctaTertiary: brand[400],
    anchorPrimary: brand[500],
    anchorSecondary: neutral[7],
    userInput: neutral[7],
    inputLabel: neutral[7],
    inputLabelSupporting: neutral[46],
    inputChecked: brand[400],
    inputHover: brand[400],
    groupLabel: neutral[7],
    groupLabelSupporting: neutral[46]
  };
  var brandText = {
    primary: neutral[100],
    supporting: brand[800],
    success: success[500],
    error: error[500],
    ctaPrimary: brand[400],
    ctaSecondary: neutral[100],
    ctaTertiary: neutral[100],
    anchorPrimary: neutral[100],
    userInput: neutral[100],
    inputLabel: neutral[100],
    inputLabelSupporting: brand[800]
  };
  var brandAltText = {
    primary: neutral[7],
    supporting: neutral[60],
    ctaPrimary: neutral[100],
    ctaSecondary: neutral[7],
    ctaTertiary: neutral[7],
    anchorPrimary: neutral[7]
  };
  var size$1 = {
    xsmall: size[0],
    small: size[1],
    medium: size[2]
  };
  var rootPixelFontSize = 16;
  var pxToRem = function pxToRem2(px) {
    return px / rootPixelFontSize;
  };
  var space$1 = {
    1: space[1],
    2: space[2],
    3: space[3],
    4: space[4],
    5: space[5],
    6: space[6],
    9: space[7],
    12: space[8],
    24: space[9]
  };
  var remSpace = {
    1: "".concat(pxToRem(space$1[1]), "rem"),
    2: "".concat(pxToRem(space$1[2]), "rem"),
    3: "".concat(pxToRem(space$1[3]), "rem"),
    4: "".concat(pxToRem(space$1[4]), "rem"),
    5: "".concat(pxToRem(space$1[5]), "rem"),
    6: "".concat(pxToRem(space$1[6]), "rem"),
    9: "".concat(pxToRem(space$1[9]), "rem"),
    12: "".concat(pxToRem(space$1[12]), "rem"),
    24: "".concat(pxToRem(space$1[24]), "rem")
  };

  // node_modules/@guardian/src-foundations/mq/index.js
  var breakpoints2 = [740, 980, 1140, 1300];
  var tweakpoints2 = [320, 375, 480, 660];
  var breakpoints$12 = {
    mobile: tweakpoints2[0],
    mobileMedium: tweakpoints2[1],
    mobileLandscape: tweakpoints2[2],
    phablet: tweakpoints2[3],
    tablet: breakpoints2[0],
    desktop: breakpoints2[1],
    leftCol: breakpoints2[2],
    wide: breakpoints2[3]
  };
  var minWidth = function minWidth2(from3) {
    return "@media (min-width: ".concat("".concat(from3, "px"), ")");
  };
  var maxWidth = function maxWidth2(until3) {
    return "@media (max-width: ".concat("".concat(until3 - 1, "px"), ")");
  };
  var minWidthMaxWidth = function minWidthMaxWidth2(from3, until3) {
    return "@media (min-width: ".concat("".concat(from3, "px"), ") and (max-width: ", "".concat(until3 - 1, "px"), ")");
  };
  var from = {
    mobile: minWidth(breakpoints$12.mobile),
    mobileMedium: minWidth(breakpoints$12.mobileMedium),
    mobileLandscape: minWidth(breakpoints$12.mobileLandscape),
    phablet: minWidth(breakpoints$12.phablet),
    tablet: minWidth(breakpoints$12.tablet),
    desktop: minWidth(breakpoints$12.desktop),
    leftCol: minWidth(breakpoints$12.leftCol),
    wide: minWidth(breakpoints$12.wide)
  };
  var until = {
    mobile: maxWidth(breakpoints$12.mobile),
    mobileMedium: maxWidth(breakpoints$12.mobileMedium),
    mobileLandscape: maxWidth(breakpoints$12.mobileLandscape),
    phablet: maxWidth(breakpoints$12.phablet),
    tablet: maxWidth(breakpoints$12.tablet),
    desktop: maxWidth(breakpoints$12.desktop),
    leftCol: maxWidth(breakpoints$12.leftCol),
    wide: maxWidth(breakpoints$12.wide)
  };
  var between = {
    mobile: {
      and: {
        mobileMedium: minWidthMaxWidth(breakpoints$12.mobile, breakpoints$12.mobileMedium),
        mobileLandscape: minWidthMaxWidth(breakpoints$12.mobile, breakpoints$12.mobileLandscape),
        phablet: minWidthMaxWidth(breakpoints$12.mobile, breakpoints$12.phablet),
        tablet: minWidthMaxWidth(breakpoints$12.mobile, breakpoints$12.tablet),
        desktop: minWidthMaxWidth(breakpoints$12.mobile, breakpoints$12.desktop),
        leftCol: minWidthMaxWidth(breakpoints$12.mobile, breakpoints$12.leftCol),
        wide: minWidthMaxWidth(breakpoints$12.mobileMedium, breakpoints$12.wide)
      }
    },
    mobileMedium: {
      and: {
        mobileLandscape: minWidthMaxWidth(breakpoints$12.mobileMedium, breakpoints$12.mobileLandscape),
        phablet: minWidthMaxWidth(breakpoints$12.mobileMedium, breakpoints$12.phablet),
        tablet: minWidthMaxWidth(breakpoints$12.mobileMedium, breakpoints$12.tablet),
        desktop: minWidthMaxWidth(breakpoints$12.mobileMedium, breakpoints$12.desktop),
        leftCol: minWidthMaxWidth(breakpoints$12.mobileMedium, breakpoints$12.leftCol),
        wide: minWidthMaxWidth(breakpoints$12.mobileMedium, breakpoints$12.wide)
      }
    },
    mobileLandscape: {
      and: {
        phablet: minWidthMaxWidth(breakpoints$12.mobileLandscape, breakpoints$12.phablet),
        tablet: minWidthMaxWidth(breakpoints$12.mobileLandscape, breakpoints$12.tablet),
        desktop: minWidthMaxWidth(breakpoints$12.mobileLandscape, breakpoints$12.desktop),
        leftCol: minWidthMaxWidth(breakpoints$12.mobileLandscape, breakpoints$12.leftCol),
        wide: minWidthMaxWidth(breakpoints$12.mobileLandscape, breakpoints$12.wide)
      }
    },
    phablet: {
      and: {
        tablet: minWidthMaxWidth(breakpoints$12.phablet, breakpoints$12.tablet),
        desktop: minWidthMaxWidth(breakpoints$12.phablet, breakpoints$12.desktop),
        leftCol: minWidthMaxWidth(breakpoints$12.phablet, breakpoints$12.leftCol),
        wide: minWidthMaxWidth(breakpoints$12.phablet, breakpoints$12.wide)
      }
    },
    tablet: {
      and: {
        desktop: minWidthMaxWidth(breakpoints$12.tablet, breakpoints$12.desktop),
        leftCol: minWidthMaxWidth(breakpoints$12.tablet, breakpoints$12.leftCol),
        wide: minWidthMaxWidth(breakpoints$12.tablet, breakpoints$12.wide)
      }
    },
    desktop: {
      and: {
        leftCol: minWidthMaxWidth(breakpoints$12.desktop, breakpoints$12.leftCol),
        wide: minWidthMaxWidth(breakpoints$12.desktop, breakpoints$12.wide)
      }
    },
    leftCol: {
      and: {
        wide: minWidthMaxWidth(breakpoints$12.leftCol, breakpoints$12.wide)
      }
    }
  };

  // src/components/modules/banners/contributionsTemplate/ContributionsTemplateWithVisual.tsx
  var banner = (cssOverrides) => css_browser_esm_default`
    ${cssOverrides};
    overflow: hidden;
    width: 100%;
    display: flex;
    justify-content: center;
`;
  var container = css_browser_esm_default`
    width: 100%;
    max-width: 1300px;
    display: flex;
    flex-direction: column;

    ${from.tablet} {
        flex-direction: row-reverse;
    }
`;
  var visualContainer = css_browser_esm_default`
    position: relative;
    ${from.tablet} {
        width: 50%;
    }

    ${from.wide} {
        width: 57%;
    }
`;
  var visualSizer = css_browser_esm_default`
    ${from.tablet} {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
`;
  var contentContainer = css_browser_esm_default`
    padding: 0 ${space$1[3]}px;

    ${from.tablet} {
        width: 50%;
        padding: 0 ${space$1[5]}px;
    }

    ${from.wide} {
        width: 43%;
    }
`;
  var headerContainer = css_browser_esm_default`
    padding-top: ${space$1[1]}px;

    ${from.tablet} {
        padding-top: ${space$1[3]}px;
    }

    ${from.desktop} {
        padding-top: ${space$1[2]}px;
    }
`;
  var bodyContainerWithTicker = css_browser_esm_default`
    display: none;
    ${from.tablet} {
        display: block;
    }
`;
  var bodyContainer = (hasTicker) => css_browser_esm_default`
    padding-top: ${space$1[1]}px;
    ${hasTicker && bodyContainerWithTicker}

    ${from.tablet} {
        padding-top: ${space$1[2]}px;
    }
`;
  var tickerContainer = css_browser_esm_default`
    padding-top: ${space$1[1]}px;
    padding-bottom: ${space$1[1]}px;

    ${from.tablet} {
        padding-top: ${space$1[6]}px;
    }
`;
  var ctaContainer = css_browser_esm_default`
    padding-top: ${space$1[3]}px;
    padding-bottom: ${space$1[5]}px;

    ${from.tablet} {
        padding-top: ${space$1[5]}px;
        padding-bottom: ${space$1[4]}px;
    }
`;
  var closeButtonContainer = css_browser_esm_default`
    position: absolute;
    top: ${space$1[3]}px;
    right: ${space$1[3]}px;
`;
  var ContributionsTemplateWithVisual = ({
    visual,
    closeButton,
    header,
    body: body2,
    ticker,
    cta,
    cssOverrides
  }) => {
    return /* @__PURE__ */ import_react2.default.createElement("div", {
      css: banner(cssOverrides)
    }, /* @__PURE__ */ import_react2.default.createElement("div", {
      css: container
    }, /* @__PURE__ */ import_react2.default.createElement("div", {
      css: visualContainer
    }, /* @__PURE__ */ import_react2.default.createElement("div", {
      css: visualSizer
    }, visual, /* @__PURE__ */ import_react2.default.createElement("div", {
      css: closeButtonContainer
    }, closeButton))), /* @__PURE__ */ import_react2.default.createElement("div", {
      css: contentContainer
    }, /* @__PURE__ */ import_react2.default.createElement("div", {
      css: headerContainer
    }, header), /* @__PURE__ */ import_react2.default.createElement("div", {
      css: bodyContainer(!!ticker)
    }, body2), ticker && /* @__PURE__ */ import_react2.default.createElement("div", {
      css: tickerContainer
    }, ticker), /* @__PURE__ */ import_react2.default.createElement("div", {
      css: ctaContainer
    }, cta))));
  };
  var ContributionsTemplateWithVisual_default = ContributionsTemplateWithVisual;

  // src/components/modules/banners/globalEoy/components/GlobalEoyBody.tsx
  var import_react11 = __toModule(require_react());

  // node_modules/@guardian/src-layout/dist/layout.esm.js
  var import_react3 = __toModule(require_react());

  // node_modules/@guardian/src-layout/node_modules/@guardian/src-foundations/foundations.esm.js
  var colors2 = {
    reds: [
      "#660505",
      "#8B0000",
      "#AB0613",
      "#C70000",
      "#FF5943",
      "#FF9081",
      "#FFBAC8",
      "#FFF4F2"
    ],
    oranges: [
      "#672005",
      "#8D2700",
      "#CB4700",
      "#E05E00",
      "#FF7F0F",
      "#F9B376",
      "#FEF9F5"
    ],
    blues: [
      "#003C60",
      "#004E7C",
      "#005689",
      "#0084C6",
      "#00B2FF",
      "#90DCFF",
      "#F1F8FC",
      "#001536",
      "#041F4A",
      "#052962",
      "#007ABC",
      "#506991",
      "#C1D8FC"
    ],
    browns: [
      "#3E3323",
      "#574835",
      "#6B5840",
      "#A1845C",
      "#EACCA0",
      "#E7D4B9",
      "#FBF6EF"
    ],
    pinks: [
      "#510043",
      "#650054",
      "#7D0068",
      "#BB3B80",
      "#FFABDB",
      "#FEC8D3",
      "#FEEEF7"
    ],
    yellows: [
      "#F3C100",
      "#FFD900",
      "#FFE500"
    ],
    greens: [
      "#185E36",
      "#22874D",
      "#58D08B",
      "#4B8878",
      "#65A897",
      "#69D1CA"
    ],
    grays: [
      "#000000",
      "#121212",
      "#1A1A1A",
      "#333333",
      "#767676",
      "#999999",
      "#DCDCDC",
      "#EDEDED",
      "#F6F6F6",
      "#FFFFFF",
      "#222527",
      "#303538",
      "#3F464A",
      "#63717A",
      "#ABC2C9",
      "#33393D",
      "#EFF1F2"
    ]
  };
  var space2 = [0, 4, 8, 12, 16, 20, 24, 36, 48, 96];
  var breakpoints3 = [740, 980, 1140, 1300];
  var tweakpoints3 = [320, 375, 480, 660];
  var transitions2 = [".2s cubic-bezier(.64, .57, .67, 1.53)", ".3s ease-in-out", ".65s ease-in-out"];
  var transitions$12 = {
    short: transitions2[0],
    medium: transitions2[1],
    long: transitions2[2]
  };
  var breakpoints$13 = {
    mobile: tweakpoints3[0],
    mobileMedium: tweakpoints3[1],
    mobileLandscape: tweakpoints3[2],
    phablet: tweakpoints3[3],
    tablet: breakpoints3[0],
    desktop: breakpoints3[1],
    leftCol: breakpoints3[2],
    wide: breakpoints3[3]
  };
  var brand2 = {
    100: colors2.blues[7],
    300: colors2.blues[8],
    400: colors2.blues[9],
    500: colors2.blues[10],
    600: colors2.blues[11],
    800: colors2.blues[12]
  };
  var brandAlt2 = {
    200: colors2.yellows[0],
    300: colors2.yellows[1],
    400: colors2.yellows[2]
  };
  var neutral2 = {
    0: colors2.grays[0],
    7: colors2.grays[1],
    10: colors2.grays[2],
    20: colors2.grays[3],
    46: colors2.grays[4],
    60: colors2.grays[5],
    86: colors2.grays[6],
    93: colors2.grays[7],
    97: colors2.grays[8],
    100: colors2.grays[9]
  };
  var error2 = {
    400: colors2.reds[3],
    500: colors2.reds[5]
  };
  var success2 = {
    400: colors2.greens[1],
    500: colors2.greens[2]
  };
  var news2 = {
    100: colors2.reds[0],
    200: colors2.reds[1],
    300: colors2.reds[2],
    400: colors2.reds[3],
    500: colors2.reds[4],
    550: colors2.reds[5],
    600: colors2.reds[6],
    800: colors2.reds[7]
  };
  var opinion2 = {
    100: colors2.oranges[0],
    200: colors2.oranges[1],
    300: colors2.oranges[2],
    400: colors2.oranges[3],
    500: colors2.oranges[4],
    600: colors2.oranges[5],
    800: colors2.oranges[6]
  };
  var sport2 = {
    100: colors2.blues[0],
    200: colors2.blues[1],
    300: colors2.blues[2],
    400: colors2.blues[3],
    500: colors2.blues[4],
    600: colors2.blues[5],
    800: colors2.blues[6]
  };
  var culture2 = {
    100: colors2.browns[0],
    200: colors2.browns[1],
    300: colors2.browns[2],
    400: colors2.browns[3],
    500: colors2.browns[4],
    600: colors2.browns[5],
    800: colors2.browns[6]
  };
  var lifestyle2 = {
    100: colors2.pinks[0],
    200: colors2.pinks[1],
    300: colors2.pinks[2],
    400: colors2.pinks[3],
    500: colors2.pinks[4],
    600: colors2.pinks[5],
    800: colors2.pinks[6]
  };
  var labs2 = {
    200: colors2.greens[3],
    300: colors2.greens[4],
    400: colors2.greens[5]
  };
  var specialReport2 = {
    100: colors2.grays[10],
    200: colors2.grays[11],
    300: colors2.grays[12],
    400: colors2.grays[13],
    500: colors2.grays[14],
    800: colors2.grays[16]
  };
  var dynamo2 = {
    400: colors2.grays[15]
  };
  var background2 = {
    primary: neutral2[100],
    secondary: neutral2[97],
    inverse: neutral2[10],
    ctaPrimary: brand2[400],
    ctaPrimaryHover: "#234B8A",
    ctaSecondary: brand2[800],
    ctaSecondaryHover: "#ACC9F7",
    ctaTertiaryHover: "#E5E5E5",
    input: neutral2[100],
    inputChecked: brand2[500]
  };
  var brandBackground2 = {
    primary: brand2[400],
    inputChecked: neutral2[100],
    ctaPrimary: neutral2[100],
    ctaPrimaryHover: "#E0E0E0",
    ctaSecondary: brand2[600],
    ctaSecondaryHover: "#234B8A",
    ctaTertiaryHover: brand2[300]
  };
  var brandAltBackground2 = {
    primary: brandAlt2[400],
    ctaPrimary: neutral2[7],
    ctaPrimaryHover: "#454545",
    ctaSecondary: brandAlt2[200],
    ctaSecondaryHover: "#F2AE00",
    ctaTertiaryHover: "#FFD213"
  };
  var border2 = {
    primary: neutral2[60],
    secondary: neutral2[86],
    success: success2[400],
    error: error2[400],
    ctaTertiary: brand2[400],
    input: neutral2[60],
    inputChecked: brand2[500],
    inputHover: brand2[500],
    inputActive: brand2[500],
    focusHalo: sport2[500]
  };
  var brandBorder2 = {
    primary: brand2[600],
    secondary: brand2[600],
    success: success2[500],
    error: error2[500],
    ctaTertiary: neutral2[100],
    input: brand2[800],
    inputChecked: neutral2[100],
    inputHover: neutral2[100]
  };
  var brandAltBorder2 = {
    ctaTertiary: neutral2[7]
  };
  var line2 = {
    primary: neutral2[86]
  };
  var brandLine2 = {
    primary: brand2[600]
  };
  var brandAltLine2 = {
    primary: neutral2[7]
  };
  var text2 = {
    primary: neutral2[7],
    supporting: neutral2[46],
    success: success2[400],
    error: error2[400],
    ctaPrimary: neutral2[100],
    ctaSecondary: brand2[400],
    ctaTertiary: brand2[400],
    anchorPrimary: brand2[500],
    anchorSecondary: neutral2[7],
    userInput: neutral2[7],
    inputLabel: neutral2[7],
    inputLabelSupporting: neutral2[46],
    inputChecked: brand2[400],
    inputHover: brand2[400],
    groupLabel: neutral2[7],
    groupLabelSupporting: neutral2[46],
    newsInverse: news2[550]
  };
  var brandText2 = {
    primary: neutral2[100],
    supporting: brand2[800],
    success: success2[500],
    error: error2[500],
    ctaPrimary: brand2[400],
    ctaSecondary: neutral2[100],
    ctaTertiary: neutral2[100],
    anchorPrimary: neutral2[100],
    anchorPrimaryHover: brandAlt2[400],
    userInput: neutral2[100],
    inputLabel: neutral2[100],
    inputLabelSupporting: brand2[800]
  };
  var brandAltText2 = {
    primary: neutral2[7],
    supporting: neutral2[60],
    ctaPrimary: neutral2[100],
    ctaSecondary: neutral2[7],
    ctaTertiary: neutral2[7],
    anchorPrimary: neutral2[7]
  };
  var rootPixelFontSize2 = 16;
  var pxToRem3 = function pxToRem4(px) {
    return px / rootPixelFontSize2;
  };
  var space$12 = {
    1: space2[1],
    2: space2[2],
    3: space2[3],
    4: space2[4],
    5: space2[5],
    6: space2[6],
    9: space2[7],
    12: space2[8],
    24: space2[9]
  };
  var remSpace2 = {
    1: "".concat(pxToRem3(space$12[1]), "rem"),
    2: "".concat(pxToRem3(space$12[2]), "rem"),
    3: "".concat(pxToRem3(space$12[3]), "rem"),
    4: "".concat(pxToRem3(space$12[4]), "rem"),
    5: "".concat(pxToRem3(space$12[5]), "rem"),
    6: "".concat(pxToRem3(space$12[6]), "rem"),
    9: "".concat(pxToRem3(space$12[9]), "rem"),
    12: "".concat(pxToRem3(space$12[12]), "rem"),
    24: "".concat(pxToRem3(space$12[24]), "rem")
  };

  // node_modules/@guardian/src-layout/node_modules/@guardian/src-foundations/mq/index.js
  var breakpoints4 = [740, 980, 1140, 1300];
  var tweakpoints4 = [320, 375, 480, 660];
  var breakpoints$14 = {
    mobile: tweakpoints4[0],
    mobileMedium: tweakpoints4[1],
    mobileLandscape: tweakpoints4[2],
    phablet: tweakpoints4[3],
    tablet: breakpoints4[0],
    desktop: breakpoints4[1],
    leftCol: breakpoints4[2],
    wide: breakpoints4[3]
  };
  var minWidth3 = function minWidth4(from3) {
    return "@media (min-width: ".concat("".concat(from3, "px"), ")");
  };
  var maxWidth3 = function maxWidth4(until3) {
    return "@media (max-width: ".concat("".concat(until3 - 1, "px"), ")");
  };
  var minWidthMaxWidth3 = function minWidthMaxWidth4(from3, until3) {
    return "@media (min-width: ".concat("".concat(from3, "px"), ") and (max-width: ", "".concat(until3 - 1, "px"), ")");
  };
  var from2 = {
    mobile: minWidth3(breakpoints$14.mobile),
    mobileMedium: minWidth3(breakpoints$14.mobileMedium),
    mobileLandscape: minWidth3(breakpoints$14.mobileLandscape),
    phablet: minWidth3(breakpoints$14.phablet),
    tablet: minWidth3(breakpoints$14.tablet),
    desktop: minWidth3(breakpoints$14.desktop),
    leftCol: minWidth3(breakpoints$14.leftCol),
    wide: minWidth3(breakpoints$14.wide)
  };
  var until2 = {
    mobile: maxWidth3(breakpoints$14.mobile),
    mobileMedium: maxWidth3(breakpoints$14.mobileMedium),
    mobileLandscape: maxWidth3(breakpoints$14.mobileLandscape),
    phablet: maxWidth3(breakpoints$14.phablet),
    tablet: maxWidth3(breakpoints$14.tablet),
    desktop: maxWidth3(breakpoints$14.desktop),
    leftCol: maxWidth3(breakpoints$14.leftCol),
    wide: maxWidth3(breakpoints$14.wide)
  };
  var between2 = {
    mobile: {
      and: {
        mobileMedium: minWidthMaxWidth3(breakpoints$14.mobile, breakpoints$14.mobileMedium),
        mobileLandscape: minWidthMaxWidth3(breakpoints$14.mobile, breakpoints$14.mobileLandscape),
        phablet: minWidthMaxWidth3(breakpoints$14.mobile, breakpoints$14.phablet),
        tablet: minWidthMaxWidth3(breakpoints$14.mobile, breakpoints$14.tablet),
        desktop: minWidthMaxWidth3(breakpoints$14.mobile, breakpoints$14.desktop),
        leftCol: minWidthMaxWidth3(breakpoints$14.mobile, breakpoints$14.leftCol),
        wide: minWidthMaxWidth3(breakpoints$14.mobileMedium, breakpoints$14.wide)
      }
    },
    mobileMedium: {
      and: {
        mobileLandscape: minWidthMaxWidth3(breakpoints$14.mobileMedium, breakpoints$14.mobileLandscape),
        phablet: minWidthMaxWidth3(breakpoints$14.mobileMedium, breakpoints$14.phablet),
        tablet: minWidthMaxWidth3(breakpoints$14.mobileMedium, breakpoints$14.tablet),
        desktop: minWidthMaxWidth3(breakpoints$14.mobileMedium, breakpoints$14.desktop),
        leftCol: minWidthMaxWidth3(breakpoints$14.mobileMedium, breakpoints$14.leftCol),
        wide: minWidthMaxWidth3(breakpoints$14.mobileMedium, breakpoints$14.wide)
      }
    },
    mobileLandscape: {
      and: {
        phablet: minWidthMaxWidth3(breakpoints$14.mobileLandscape, breakpoints$14.phablet),
        tablet: minWidthMaxWidth3(breakpoints$14.mobileLandscape, breakpoints$14.tablet),
        desktop: minWidthMaxWidth3(breakpoints$14.mobileLandscape, breakpoints$14.desktop),
        leftCol: minWidthMaxWidth3(breakpoints$14.mobileLandscape, breakpoints$14.leftCol),
        wide: minWidthMaxWidth3(breakpoints$14.mobileLandscape, breakpoints$14.wide)
      }
    },
    phablet: {
      and: {
        tablet: minWidthMaxWidth3(breakpoints$14.phablet, breakpoints$14.tablet),
        desktop: minWidthMaxWidth3(breakpoints$14.phablet, breakpoints$14.desktop),
        leftCol: minWidthMaxWidth3(breakpoints$14.phablet, breakpoints$14.leftCol),
        wide: minWidthMaxWidth3(breakpoints$14.phablet, breakpoints$14.wide)
      }
    },
    tablet: {
      and: {
        desktop: minWidthMaxWidth3(breakpoints$14.tablet, breakpoints$14.desktop),
        leftCol: minWidthMaxWidth3(breakpoints$14.tablet, breakpoints$14.leftCol),
        wide: minWidthMaxWidth3(breakpoints$14.tablet, breakpoints$14.wide)
      }
    },
    desktop: {
      and: {
        leftCol: minWidthMaxWidth3(breakpoints$14.desktop, breakpoints$14.leftCol),
        wide: minWidthMaxWidth3(breakpoints$14.desktop, breakpoints$14.wide)
      }
    },
    leftCol: {
      and: {
        wide: minWidthMaxWidth3(breakpoints$14.leftCol, breakpoints$14.wide)
      }
    }
  };

  // node_modules/@guardian/src-layout/node_modules/@guardian/src-foundations/palette/index.js
  var colors3 = {
    reds: [
      "#660505",
      "#8B0000",
      "#AB0613",
      "#C70000",
      "#FF5943",
      "#FF9081",
      "#FFBAC8",
      "#FFF4F2"
    ],
    oranges: [
      "#672005",
      "#8D2700",
      "#CB4700",
      "#E05E00",
      "#FF7F0F",
      "#F9B376",
      "#FEF9F5"
    ],
    blues: [
      "#003C60",
      "#004E7C",
      "#005689",
      "#0084C6",
      "#00B2FF",
      "#90DCFF",
      "#F1F8FC",
      "#001536",
      "#041F4A",
      "#052962",
      "#007ABC",
      "#506991",
      "#C1D8FC"
    ],
    browns: [
      "#3E3323",
      "#574835",
      "#6B5840",
      "#A1845C",
      "#EACCA0",
      "#E7D4B9",
      "#FBF6EF"
    ],
    pinks: [
      "#510043",
      "#650054",
      "#7D0068",
      "#BB3B80",
      "#FFABDB",
      "#FEC8D3",
      "#FEEEF7"
    ],
    yellows: [
      "#F3C100",
      "#FFD900",
      "#FFE500"
    ],
    greens: [
      "#185E36",
      "#22874D",
      "#58D08B",
      "#4B8878",
      "#65A897",
      "#69D1CA"
    ],
    grays: [
      "#000000",
      "#121212",
      "#1A1A1A",
      "#333333",
      "#767676",
      "#999999",
      "#DCDCDC",
      "#EDEDED",
      "#F6F6F6",
      "#FFFFFF",
      "#222527",
      "#303538",
      "#3F464A",
      "#63717A",
      "#ABC2C9",
      "#33393D",
      "#EFF1F2"
    ]
  };
  var brand3 = {
    100: colors3.blues[7],
    300: colors3.blues[8],
    400: colors3.blues[9],
    500: colors3.blues[10],
    600: colors3.blues[11],
    800: colors3.blues[12]
  };
  var brandAlt3 = {
    200: colors3.yellows[0],
    300: colors3.yellows[1],
    400: colors3.yellows[2]
  };
  var neutral3 = {
    0: colors3.grays[0],
    7: colors3.grays[1],
    10: colors3.grays[2],
    20: colors3.grays[3],
    46: colors3.grays[4],
    60: colors3.grays[5],
    86: colors3.grays[6],
    93: colors3.grays[7],
    97: colors3.grays[8],
    100: colors3.grays[9]
  };
  var error3 = {
    400: colors3.reds[3],
    500: colors3.reds[5]
  };
  var success3 = {
    400: colors3.greens[1],
    500: colors3.greens[2]
  };
  var news3 = {
    100: colors3.reds[0],
    200: colors3.reds[1],
    300: colors3.reds[2],
    400: colors3.reds[3],
    500: colors3.reds[4],
    550: colors3.reds[5],
    600: colors3.reds[6],
    800: colors3.reds[7]
  };
  var opinion3 = {
    100: colors3.oranges[0],
    200: colors3.oranges[1],
    300: colors3.oranges[2],
    400: colors3.oranges[3],
    500: colors3.oranges[4],
    600: colors3.oranges[5],
    800: colors3.oranges[6]
  };
  var sport3 = {
    100: colors3.blues[0],
    200: colors3.blues[1],
    300: colors3.blues[2],
    400: colors3.blues[3],
    500: colors3.blues[4],
    600: colors3.blues[5],
    800: colors3.blues[6]
  };
  var culture3 = {
    100: colors3.browns[0],
    200: colors3.browns[1],
    300: colors3.browns[2],
    400: colors3.browns[3],
    500: colors3.browns[4],
    600: colors3.browns[5],
    800: colors3.browns[6]
  };
  var lifestyle3 = {
    100: colors3.pinks[0],
    200: colors3.pinks[1],
    300: colors3.pinks[2],
    400: colors3.pinks[3],
    500: colors3.pinks[4],
    600: colors3.pinks[5],
    800: colors3.pinks[6]
  };
  var labs3 = {
    200: colors3.greens[3],
    300: colors3.greens[4],
    400: colors3.greens[5]
  };
  var specialReport3 = {
    100: colors3.grays[10],
    200: colors3.grays[11],
    300: colors3.grays[12],
    400: colors3.grays[13],
    500: colors3.grays[14],
    800: colors3.grays[16]
  };
  var dynamo3 = {
    400: colors3.grays[15]
  };
  var background3 = {
    primary: neutral3[100],
    secondary: neutral3[97],
    inverse: neutral3[10],
    ctaPrimary: brand3[400],
    ctaPrimaryHover: "#234B8A",
    ctaSecondary: brand3[800],
    ctaSecondaryHover: "#ACC9F7",
    ctaTertiaryHover: "#E5E5E5",
    input: neutral3[100],
    inputChecked: brand3[500]
  };
  var brandBackground3 = {
    primary: brand3[400],
    inputChecked: neutral3[100],
    ctaPrimary: neutral3[100],
    ctaPrimaryHover: "#E0E0E0",
    ctaSecondary: brand3[600],
    ctaSecondaryHover: "#234B8A",
    ctaTertiaryHover: brand3[300]
  };
  var brandAltBackground3 = {
    primary: brandAlt3[400],
    ctaPrimary: neutral3[7],
    ctaPrimaryHover: "#454545",
    ctaSecondary: brandAlt3[200],
    ctaSecondaryHover: "#F2AE00",
    ctaTertiaryHover: "#FFD213"
  };
  var border3 = {
    primary: neutral3[60],
    secondary: neutral3[86],
    success: success3[400],
    error: error3[400],
    ctaTertiary: brand3[400],
    input: neutral3[60],
    inputChecked: brand3[500],
    inputHover: brand3[500],
    inputActive: brand3[500],
    focusHalo: sport3[500]
  };
  var brandBorder3 = {
    primary: brand3[600],
    secondary: brand3[600],
    success: success3[500],
    error: error3[500],
    ctaTertiary: neutral3[100],
    input: brand3[800],
    inputChecked: neutral3[100],
    inputHover: neutral3[100]
  };
  var brandAltBorder3 = {
    ctaTertiary: neutral3[7]
  };
  var line3 = {
    primary: neutral3[86]
  };
  var brandLine3 = {
    primary: brand3[600]
  };
  var brandAltLine3 = {
    primary: neutral3[7]
  };
  var text3 = {
    primary: neutral3[7],
    supporting: neutral3[46],
    success: success3[400],
    error: error3[400],
    ctaPrimary: neutral3[100],
    ctaSecondary: brand3[400],
    ctaTertiary: brand3[400],
    anchorPrimary: brand3[500],
    anchorSecondary: neutral3[7],
    userInput: neutral3[7],
    inputLabel: neutral3[7],
    inputLabelSupporting: neutral3[46],
    inputChecked: brand3[400],
    inputHover: brand3[400],
    groupLabel: neutral3[7],
    groupLabelSupporting: neutral3[46],
    newsInverse: news3[550]
  };
  var brandText3 = {
    primary: neutral3[100],
    supporting: brand3[800],
    success: success3[500],
    error: error3[500],
    ctaPrimary: brand3[400],
    ctaSecondary: neutral3[100],
    ctaTertiary: neutral3[100],
    anchorPrimary: neutral3[100],
    anchorPrimaryHover: brandAlt3[400],
    userInput: neutral3[100],
    inputLabel: neutral3[100],
    inputLabelSupporting: brand3[800]
  };
  var brandAltText3 = {
    primary: neutral3[7],
    supporting: neutral3[60],
    ctaPrimary: neutral3[100],
    ctaSecondary: neutral3[7],
    ctaTertiary: neutral3[7],
    anchorPrimary: neutral3[7]
  };

  // node_modules/@guardian/src-layout/dist/layout.esm.js
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  var columns = /* @__PURE__ */ css_browser_esm_default("box-sizing:border-box;display:flex;& > * + *{margin-left:", space$12[5], "px;}label:columns;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJMEIiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL2NvcmVcIlxuaW1wb3J0IHsgc3BhY2UgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9uc1wiXG5pbXBvcnQgeyB1bnRpbCB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL21xXCJcblxuZXhwb3J0IGNvbnN0IGNvbHVtbnMgPSBjc3NgXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdCYgPiAqICsgKiB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7c3BhY2VbNV19cHg7XG5cdH1cbmBcblxuY29uc3QgY29sbGFwc2VCZWxvd1NwYWNpbmcgPSBjc3NgXG5cdGRpc3BsYXk6IGJsb2NrO1xuXHQmID4gKiArICoge1xuXHRcdG1hcmdpbi1sZWZ0OiAwO1xuXHR9XG5cdCYgPiAqIHtcblx0XHRtYXJnaW4tYm90dG9tOiAke3NwYWNlWzVdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93VGFibGV0Q29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC50YWJsZXR9IHtcblx0XHQke2NvbGxhcHNlQmVsb3dTcGFjaW5nfVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd0Rlc2t0b3BDb2x1bW5zID0gY3NzYFxuXHQke3VudGlsLmRlc2t0b3B9IHtcblx0XHQke2NvbGxhcHNlQmVsb3dTcGFjaW5nfVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd0xlZnRDb2xDb2x1bW5zID0gY3NzYFxuXHQke3VudGlsLmxlZnRDb2x9IHtcblx0XHQke2NvbGxhcHNlQmVsb3dTcGFjaW5nfVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1dpZGVDb2x1bW5zID0gY3NzYFxuXHQke3VudGlsLndpZGV9IHtcblx0XHQke2NvbGxhcHNlQmVsb3dTcGFjaW5nfVxuXHR9XG5gXG5cbmNvbnN0IGNvbGxhcHNlQmVsb3dXaWR0aCA9IGNzc2Bcblx0d2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbmBcblxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dUYWJsZXQgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLnRhYmxldH0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd0Rlc2t0b3AgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLmRlc2t0b3B9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dsZWZ0Q29sID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC5sZWZ0Q29sfSB7XG5cdFx0XHQke2NvbGxhcHNlQmVsb3dXaWR0aH1cblx0XHR9XG5cdH1cbmBcbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93V2lkZSA9IGNzc2Bcblx0JiA+ICoge1xuXHRcdCR7dW50aWwud2lkZX0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBjb2x1bW4gPSAod2lkdGg6IG51bWJlcikgPT4gY3NzYFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHQvKiBJZiBhIHdpZHRoIGlzIHNwZWNpZmllZCwgZG9uJ3QgYWxsb3cgY29sdW1uIHRvIGdyb3cuIFVzZSB0aGUgd2lkdGggcHJvcGVydHkgKi9cblx0ZmxleDogJHt3aWR0aCA/IFwiMCAwIGF1dG9cIiA6IDF9O1xuXHQvKlxuXHRcdEEgc2V0IG9mIENvbHVtbnMgaGFzIG4gY29sdW1ucyBhbmQgbi0xIGd1dHRlcnM6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8XG5cdFx0VGhpcyBtZWFucyBpZiB3ZSB0YWtlIGEgc2ltcGxlIGZyYWN0aW9uIG9mIHRoZSB3aWR0aCBvZiB0aGUgc2V0IG9mIENvbHVtbnMsXG5cdFx0b3VyIENvbHVtbiB3aWxsIHN0b3AgcGFydC13YXkgdGhyb3VnaCBhIGd1dHRlcjpcblx0XHR8ICAgIHxnfCAgICB8Z3wgICAgfGd8ICAgIHxcblx0XHR8PT09PTUwJT09PT09fD09PT01MCU9PT09PXxcblx0XHRUbyBjYWxjdWxhdGUgd2lkdGggb2YgYSBDb2x1bW4gY29ycmVjdGx5LCB3ZSBtdXN0IGFkZCBhbiBpbWFnaW5hcnkgZXh0cmEgZ3V0dGVyXG5cdFx0YW5kIHRha2UgYSBmcmFjdGlvbiBvZiB0aGUgd2hvbGU6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8Z3xcblx0XHR8PT09PT01MCU9PT09PXx8PT09PTUwJT09PT09fFxuXHRcdFRoaXMgd2lsbCBjcmVhdGUgYSBDb2x1bW4gd2hpY2ggaXMgeCBjb2x1bW5zIGFuZCB4IGd1dHRlcnMgd2lkZS4gV2UgcmVhbGx5IHdhbnQgdGhlXG5cdFx0Q29sdW1uIHRvIGJlIHggY29sdW1ucyBhbmQgeC0xIGd1dHRlcnMsIHNvIHdlIG11c3Qgc3VidHJhY3QgYSBndXR0ZXIgYXQgdGhlIGVuZDpcblx0XHR8ICAgIHxnfCAgICB8Z3wgICAgfGd8ICAgIHxnfFxuXHRcdHw9PT09NTAlPT09PXwgfD09PT01MCU9PT09fFxuXHQgKi9cblx0JHt3aWR0aFxuXHRcdD8gYHdpZHRoOiBjYWxjKCgxMDAlICsgJHtzcGFjZVs1XX1weCkgKiAke3dpZHRofSAtICR7c3BhY2VbNV19cHgpO2Bcblx0XHQ6IFwiXCJ9XG5gXG4iXX0= */"));
  var collapseBelowSpacing = /* @__PURE__ */ css_browser_esm_default("display:block;& > * + *{margin-left:0;}& > *{margin-bottom:", space$12[5], "px;}label:collapseBelowSpacing;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZZ0MiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL2NvcmVcIlxuaW1wb3J0IHsgc3BhY2UgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9uc1wiXG5pbXBvcnQgeyB1bnRpbCB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL21xXCJcblxuZXhwb3J0IGNvbnN0IGNvbHVtbnMgPSBjc3NgXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdCYgPiAqICsgKiB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7c3BhY2VbNV19cHg7XG5cdH1cbmBcblxuY29uc3QgY29sbGFwc2VCZWxvd1NwYWNpbmcgPSBjc3NgXG5cdGRpc3BsYXk6IGJsb2NrO1xuXHQmID4gKiArICoge1xuXHRcdG1hcmdpbi1sZWZ0OiAwO1xuXHR9XG5cdCYgPiAqIHtcblx0XHRtYXJnaW4tYm90dG9tOiAke3NwYWNlWzVdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93VGFibGV0Q29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC50YWJsZXR9IHtcblx0XHQke2NvbGxhcHNlQmVsb3dTcGFjaW5nfVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd0Rlc2t0b3BDb2x1bW5zID0gY3NzYFxuXHQke3VudGlsLmRlc2t0b3B9IHtcblx0XHQke2NvbGxhcHNlQmVsb3dTcGFjaW5nfVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd0xlZnRDb2xDb2x1bW5zID0gY3NzYFxuXHQke3VudGlsLmxlZnRDb2x9IHtcblx0XHQke2NvbGxhcHNlQmVsb3dTcGFjaW5nfVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1dpZGVDb2x1bW5zID0gY3NzYFxuXHQke3VudGlsLndpZGV9IHtcblx0XHQke2NvbGxhcHNlQmVsb3dTcGFjaW5nfVxuXHR9XG5gXG5cbmNvbnN0IGNvbGxhcHNlQmVsb3dXaWR0aCA9IGNzc2Bcblx0d2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbmBcblxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dUYWJsZXQgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLnRhYmxldH0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd0Rlc2t0b3AgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLmRlc2t0b3B9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dsZWZ0Q29sID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC5sZWZ0Q29sfSB7XG5cdFx0XHQke2NvbGxhcHNlQmVsb3dXaWR0aH1cblx0XHR9XG5cdH1cbmBcbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93V2lkZSA9IGNzc2Bcblx0JiA+ICoge1xuXHRcdCR7dW50aWwud2lkZX0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBjb2x1bW4gPSAod2lkdGg6IG51bWJlcikgPT4gY3NzYFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHQvKiBJZiBhIHdpZHRoIGlzIHNwZWNpZmllZCwgZG9uJ3QgYWxsb3cgY29sdW1uIHRvIGdyb3cuIFVzZSB0aGUgd2lkdGggcHJvcGVydHkgKi9cblx0ZmxleDogJHt3aWR0aCA/IFwiMCAwIGF1dG9cIiA6IDF9O1xuXHQvKlxuXHRcdEEgc2V0IG9mIENvbHVtbnMgaGFzIG4gY29sdW1ucyBhbmQgbi0xIGd1dHRlcnM6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8XG5cdFx0VGhpcyBtZWFucyBpZiB3ZSB0YWtlIGEgc2ltcGxlIGZyYWN0aW9uIG9mIHRoZSB3aWR0aCBvZiB0aGUgc2V0IG9mIENvbHVtbnMsXG5cdFx0b3VyIENvbHVtbiB3aWxsIHN0b3AgcGFydC13YXkgdGhyb3VnaCBhIGd1dHRlcjpcblx0XHR8ICAgIHxnfCAgICB8Z3wgICAgfGd8ICAgIHxcblx0XHR8PT09PTUwJT09PT09fD09PT01MCU9PT09PXxcblx0XHRUbyBjYWxjdWxhdGUgd2lkdGggb2YgYSBDb2x1bW4gY29ycmVjdGx5LCB3ZSBtdXN0IGFkZCBhbiBpbWFnaW5hcnkgZXh0cmEgZ3V0dGVyXG5cdFx0YW5kIHRha2UgYSBmcmFjdGlvbiBvZiB0aGUgd2hvbGU6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8Z3xcblx0XHR8PT09PT01MCU9PT09PXx8PT09PTUwJT09PT09fFxuXHRcdFRoaXMgd2lsbCBjcmVhdGUgYSBDb2x1bW4gd2hpY2ggaXMgeCBjb2x1bW5zIGFuZCB4IGd1dHRlcnMgd2lkZS4gV2UgcmVhbGx5IHdhbnQgdGhlXG5cdFx0Q29sdW1uIHRvIGJlIHggY29sdW1ucyBhbmQgeC0xIGd1dHRlcnMsIHNvIHdlIG11c3Qgc3VidHJhY3QgYSBndXR0ZXIgYXQgdGhlIGVuZDpcblx0XHR8ICAgIHxnfCAgICB8Z3wgICAgfGd8ICAgIHxnfFxuXHRcdHw9PT09NTAlPT09PXwgfD09PT01MCU9PT09fFxuXHQgKi9cblx0JHt3aWR0aFxuXHRcdD8gYHdpZHRoOiBjYWxjKCgxMDAlICsgJHtzcGFjZVs1XX1weCkgKiAke3dpZHRofSAtICR7c3BhY2VbNV19cHgpO2Bcblx0XHQ6IFwiXCJ9XG5gXG4iXX0= */"));
  var collapseBelowTabletColumns = /* @__PURE__ */ css_browser_esm_default(until2.tablet, "{", collapseBelowSpacing, "}label:collapseBelowTabletColumns;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQjZDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnNcIlxuaW1wb3J0IHsgdW50aWwgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9tcVwiXG5cbmV4cG9ydCBjb25zdCBjb2x1bW5zID0gY3NzYFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRkaXNwbGF5OiBmbGV4O1xuXHQmID4gKiArICoge1xuXHRcdG1hcmdpbi1sZWZ0OiAke3NwYWNlWzVdfXB4O1xuXHR9XG5gXG5cbmNvbnN0IGNvbGxhcHNlQmVsb3dTcGFjaW5nID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0JiA+ICogKyAqIHtcblx0XHRtYXJnaW4tbGVmdDogMDtcblx0fVxuXHQmID4gKiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogJHtzcGFjZVs1XX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1RhYmxldENvbHVtbnMgPSBjc3NgXG5cdCR7dW50aWwudGFibGV0fSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dMZWZ0Q29sQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5sZWZ0Q29sfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dXaWRlQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC53aWRlfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuXG5jb25zdCBjb2xsYXBzZUJlbG93V2lkdGggPSBjc3NgXG5cdHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG5gXG5cbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93VGFibGV0ID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC50YWJsZXR9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0XHQke2NvbGxhcHNlQmVsb3dXaWR0aH1cblx0XHR9XG5cdH1cbmBcbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93bGVmdENvbCA9IGNzc2Bcblx0JiA+ICoge1xuXHRcdCR7dW50aWwubGVmdENvbH0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1dpZGUgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLndpZGV9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sdW1uID0gKHdpZHRoOiBudW1iZXIpID0+IGNzc2Bcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0LyogSWYgYSB3aWR0aCBpcyBzcGVjaWZpZWQsIGRvbid0IGFsbG93IGNvbHVtbiB0byBncm93LiBVc2UgdGhlIHdpZHRoIHByb3BlcnR5ICovXG5cdGZsZXg6ICR7d2lkdGggPyBcIjAgMCBhdXRvXCIgOiAxfTtcblx0Lypcblx0XHRBIHNldCBvZiBDb2x1bW5zIGhhcyBuIGNvbHVtbnMgYW5kIG4tMSBndXR0ZXJzOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfFxuXHRcdFRoaXMgbWVhbnMgaWYgd2UgdGFrZSBhIHNpbXBsZSBmcmFjdGlvbiBvZiB0aGUgd2lkdGggb2YgdGhlIHNldCBvZiBDb2x1bW5zLFxuXHRcdG91ciBDb2x1bW4gd2lsbCBzdG9wIHBhcnQtd2F5IHRocm91Z2ggYSBndXR0ZXI6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8XG5cdFx0fD09PT01MCU9PT09PXw9PT09NTAlPT09PT18XG5cdFx0VG8gY2FsY3VsYXRlIHdpZHRoIG9mIGEgQ29sdW1uIGNvcnJlY3RseSwgd2UgbXVzdCBhZGQgYW4gaW1hZ2luYXJ5IGV4dHJhIGd1dHRlclxuXHRcdGFuZCB0YWtlIGEgZnJhY3Rpb24gb2YgdGhlIHdob2xlOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfGd8XG5cdFx0fD09PT09NTAlPT09PT18fD09PT01MCU9PT09PXxcblx0XHRUaGlzIHdpbGwgY3JlYXRlIGEgQ29sdW1uIHdoaWNoIGlzIHggY29sdW1ucyBhbmQgeCBndXR0ZXJzIHdpZGUuIFdlIHJlYWxseSB3YW50IHRoZVxuXHRcdENvbHVtbiB0byBiZSB4IGNvbHVtbnMgYW5kIHgtMSBndXR0ZXJzLCBzbyB3ZSBtdXN0IHN1YnRyYWN0IGEgZ3V0dGVyIGF0IHRoZSBlbmQ6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8Z3xcblx0XHR8PT09PTUwJT09PT18IHw9PT09NTAlPT09PXxcblx0ICovXG5cdCR7d2lkdGhcblx0XHQ/IGB3aWR0aDogY2FsYygoMTAwJSArICR7c3BhY2VbNV19cHgpICogJHt3aWR0aH0gLSAke3NwYWNlWzVdfXB4KTtgXG5cdFx0OiBcIlwifVxuYFxuIl19 */"));
  var collapseBelowDesktopColumns = /* @__PURE__ */ css_browser_esm_default(until2.desktop, "{", collapseBelowSpacing, "}label:collapseBelowDesktopColumns;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQjhDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnNcIlxuaW1wb3J0IHsgdW50aWwgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9tcVwiXG5cbmV4cG9ydCBjb25zdCBjb2x1bW5zID0gY3NzYFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRkaXNwbGF5OiBmbGV4O1xuXHQmID4gKiArICoge1xuXHRcdG1hcmdpbi1sZWZ0OiAke3NwYWNlWzVdfXB4O1xuXHR9XG5gXG5cbmNvbnN0IGNvbGxhcHNlQmVsb3dTcGFjaW5nID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0JiA+ICogKyAqIHtcblx0XHRtYXJnaW4tbGVmdDogMDtcblx0fVxuXHQmID4gKiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogJHtzcGFjZVs1XX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1RhYmxldENvbHVtbnMgPSBjc3NgXG5cdCR7dW50aWwudGFibGV0fSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dMZWZ0Q29sQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5sZWZ0Q29sfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dXaWRlQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC53aWRlfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuXG5jb25zdCBjb2xsYXBzZUJlbG93V2lkdGggPSBjc3NgXG5cdHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG5gXG5cbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93VGFibGV0ID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC50YWJsZXR9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0XHQke2NvbGxhcHNlQmVsb3dXaWR0aH1cblx0XHR9XG5cdH1cbmBcbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93bGVmdENvbCA9IGNzc2Bcblx0JiA+ICoge1xuXHRcdCR7dW50aWwubGVmdENvbH0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1dpZGUgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLndpZGV9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sdW1uID0gKHdpZHRoOiBudW1iZXIpID0+IGNzc2Bcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0LyogSWYgYSB3aWR0aCBpcyBzcGVjaWZpZWQsIGRvbid0IGFsbG93IGNvbHVtbiB0byBncm93LiBVc2UgdGhlIHdpZHRoIHByb3BlcnR5ICovXG5cdGZsZXg6ICR7d2lkdGggPyBcIjAgMCBhdXRvXCIgOiAxfTtcblx0Lypcblx0XHRBIHNldCBvZiBDb2x1bW5zIGhhcyBuIGNvbHVtbnMgYW5kIG4tMSBndXR0ZXJzOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfFxuXHRcdFRoaXMgbWVhbnMgaWYgd2UgdGFrZSBhIHNpbXBsZSBmcmFjdGlvbiBvZiB0aGUgd2lkdGggb2YgdGhlIHNldCBvZiBDb2x1bW5zLFxuXHRcdG91ciBDb2x1bW4gd2lsbCBzdG9wIHBhcnQtd2F5IHRocm91Z2ggYSBndXR0ZXI6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8XG5cdFx0fD09PT01MCU9PT09PXw9PT09NTAlPT09PT18XG5cdFx0VG8gY2FsY3VsYXRlIHdpZHRoIG9mIGEgQ29sdW1uIGNvcnJlY3RseSwgd2UgbXVzdCBhZGQgYW4gaW1hZ2luYXJ5IGV4dHJhIGd1dHRlclxuXHRcdGFuZCB0YWtlIGEgZnJhY3Rpb24gb2YgdGhlIHdob2xlOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfGd8XG5cdFx0fD09PT09NTAlPT09PT18fD09PT01MCU9PT09PXxcblx0XHRUaGlzIHdpbGwgY3JlYXRlIGEgQ29sdW1uIHdoaWNoIGlzIHggY29sdW1ucyBhbmQgeCBndXR0ZXJzIHdpZGUuIFdlIHJlYWxseSB3YW50IHRoZVxuXHRcdENvbHVtbiB0byBiZSB4IGNvbHVtbnMgYW5kIHgtMSBndXR0ZXJzLCBzbyB3ZSBtdXN0IHN1YnRyYWN0IGEgZ3V0dGVyIGF0IHRoZSBlbmQ6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8Z3xcblx0XHR8PT09PTUwJT09PT18IHw9PT09NTAlPT09PXxcblx0ICovXG5cdCR7d2lkdGhcblx0XHQ/IGB3aWR0aDogY2FsYygoMTAwJSArICR7c3BhY2VbNV19cHgpICogJHt3aWR0aH0gLSAke3NwYWNlWzVdfXB4KTtgXG5cdFx0OiBcIlwifVxuYFxuIl19 */"));
  var collapseBelowLeftColColumns = /* @__PURE__ */ css_browser_esm_default(until2.leftCol, "{", collapseBelowSpacing, "}label:collapseBelowLeftColColumns;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQzhDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnNcIlxuaW1wb3J0IHsgdW50aWwgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9tcVwiXG5cbmV4cG9ydCBjb25zdCBjb2x1bW5zID0gY3NzYFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRkaXNwbGF5OiBmbGV4O1xuXHQmID4gKiArICoge1xuXHRcdG1hcmdpbi1sZWZ0OiAke3NwYWNlWzVdfXB4O1xuXHR9XG5gXG5cbmNvbnN0IGNvbGxhcHNlQmVsb3dTcGFjaW5nID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0JiA+ICogKyAqIHtcblx0XHRtYXJnaW4tbGVmdDogMDtcblx0fVxuXHQmID4gKiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogJHtzcGFjZVs1XX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1RhYmxldENvbHVtbnMgPSBjc3NgXG5cdCR7dW50aWwudGFibGV0fSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dMZWZ0Q29sQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5sZWZ0Q29sfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dXaWRlQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC53aWRlfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuXG5jb25zdCBjb2xsYXBzZUJlbG93V2lkdGggPSBjc3NgXG5cdHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG5gXG5cbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93VGFibGV0ID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC50YWJsZXR9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0XHQke2NvbGxhcHNlQmVsb3dXaWR0aH1cblx0XHR9XG5cdH1cbmBcbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93bGVmdENvbCA9IGNzc2Bcblx0JiA+ICoge1xuXHRcdCR7dW50aWwubGVmdENvbH0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1dpZGUgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLndpZGV9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sdW1uID0gKHdpZHRoOiBudW1iZXIpID0+IGNzc2Bcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0LyogSWYgYSB3aWR0aCBpcyBzcGVjaWZpZWQsIGRvbid0IGFsbG93IGNvbHVtbiB0byBncm93LiBVc2UgdGhlIHdpZHRoIHByb3BlcnR5ICovXG5cdGZsZXg6ICR7d2lkdGggPyBcIjAgMCBhdXRvXCIgOiAxfTtcblx0Lypcblx0XHRBIHNldCBvZiBDb2x1bW5zIGhhcyBuIGNvbHVtbnMgYW5kIG4tMSBndXR0ZXJzOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfFxuXHRcdFRoaXMgbWVhbnMgaWYgd2UgdGFrZSBhIHNpbXBsZSBmcmFjdGlvbiBvZiB0aGUgd2lkdGggb2YgdGhlIHNldCBvZiBDb2x1bW5zLFxuXHRcdG91ciBDb2x1bW4gd2lsbCBzdG9wIHBhcnQtd2F5IHRocm91Z2ggYSBndXR0ZXI6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8XG5cdFx0fD09PT01MCU9PT09PXw9PT09NTAlPT09PT18XG5cdFx0VG8gY2FsY3VsYXRlIHdpZHRoIG9mIGEgQ29sdW1uIGNvcnJlY3RseSwgd2UgbXVzdCBhZGQgYW4gaW1hZ2luYXJ5IGV4dHJhIGd1dHRlclxuXHRcdGFuZCB0YWtlIGEgZnJhY3Rpb24gb2YgdGhlIHdob2xlOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfGd8XG5cdFx0fD09PT09NTAlPT09PT18fD09PT01MCU9PT09PXxcblx0XHRUaGlzIHdpbGwgY3JlYXRlIGEgQ29sdW1uIHdoaWNoIGlzIHggY29sdW1ucyBhbmQgeCBndXR0ZXJzIHdpZGUuIFdlIHJlYWxseSB3YW50IHRoZVxuXHRcdENvbHVtbiB0byBiZSB4IGNvbHVtbnMgYW5kIHgtMSBndXR0ZXJzLCBzbyB3ZSBtdXN0IHN1YnRyYWN0IGEgZ3V0dGVyIGF0IHRoZSBlbmQ6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8Z3xcblx0XHR8PT09PTUwJT09PT18IHw9PT09NTAlPT09PXxcblx0ICovXG5cdCR7d2lkdGhcblx0XHQ/IGB3aWR0aDogY2FsYygoMTAwJSArICR7c3BhY2VbNV19cHgpICogJHt3aWR0aH0gLSAke3NwYWNlWzVdfXB4KTtgXG5cdFx0OiBcIlwifVxuYFxuIl19 */"));
  var collapseBelowWideColumns = /* @__PURE__ */ css_browser_esm_default(until2.wide, "{", collapseBelowSpacing, "}label:collapseBelowWideColumns;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQzJDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnNcIlxuaW1wb3J0IHsgdW50aWwgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9tcVwiXG5cbmV4cG9ydCBjb25zdCBjb2x1bW5zID0gY3NzYFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRkaXNwbGF5OiBmbGV4O1xuXHQmID4gKiArICoge1xuXHRcdG1hcmdpbi1sZWZ0OiAke3NwYWNlWzVdfXB4O1xuXHR9XG5gXG5cbmNvbnN0IGNvbGxhcHNlQmVsb3dTcGFjaW5nID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0JiA+ICogKyAqIHtcblx0XHRtYXJnaW4tbGVmdDogMDtcblx0fVxuXHQmID4gKiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogJHtzcGFjZVs1XX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1RhYmxldENvbHVtbnMgPSBjc3NgXG5cdCR7dW50aWwudGFibGV0fSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dMZWZ0Q29sQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5sZWZ0Q29sfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dXaWRlQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC53aWRlfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuXG5jb25zdCBjb2xsYXBzZUJlbG93V2lkdGggPSBjc3NgXG5cdHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG5gXG5cbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93VGFibGV0ID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC50YWJsZXR9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0XHQke2NvbGxhcHNlQmVsb3dXaWR0aH1cblx0XHR9XG5cdH1cbmBcbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93bGVmdENvbCA9IGNzc2Bcblx0JiA+ICoge1xuXHRcdCR7dW50aWwubGVmdENvbH0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1dpZGUgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLndpZGV9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sdW1uID0gKHdpZHRoOiBudW1iZXIpID0+IGNzc2Bcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0LyogSWYgYSB3aWR0aCBpcyBzcGVjaWZpZWQsIGRvbid0IGFsbG93IGNvbHVtbiB0byBncm93LiBVc2UgdGhlIHdpZHRoIHByb3BlcnR5ICovXG5cdGZsZXg6ICR7d2lkdGggPyBcIjAgMCBhdXRvXCIgOiAxfTtcblx0Lypcblx0XHRBIHNldCBvZiBDb2x1bW5zIGhhcyBuIGNvbHVtbnMgYW5kIG4tMSBndXR0ZXJzOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfFxuXHRcdFRoaXMgbWVhbnMgaWYgd2UgdGFrZSBhIHNpbXBsZSBmcmFjdGlvbiBvZiB0aGUgd2lkdGggb2YgdGhlIHNldCBvZiBDb2x1bW5zLFxuXHRcdG91ciBDb2x1bW4gd2lsbCBzdG9wIHBhcnQtd2F5IHRocm91Z2ggYSBndXR0ZXI6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8XG5cdFx0fD09PT01MCU9PT09PXw9PT09NTAlPT09PT18XG5cdFx0VG8gY2FsY3VsYXRlIHdpZHRoIG9mIGEgQ29sdW1uIGNvcnJlY3RseSwgd2UgbXVzdCBhZGQgYW4gaW1hZ2luYXJ5IGV4dHJhIGd1dHRlclxuXHRcdGFuZCB0YWtlIGEgZnJhY3Rpb24gb2YgdGhlIHdob2xlOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfGd8XG5cdFx0fD09PT09NTAlPT09PT18fD09PT01MCU9PT09PXxcblx0XHRUaGlzIHdpbGwgY3JlYXRlIGEgQ29sdW1uIHdoaWNoIGlzIHggY29sdW1ucyBhbmQgeCBndXR0ZXJzIHdpZGUuIFdlIHJlYWxseSB3YW50IHRoZVxuXHRcdENvbHVtbiB0byBiZSB4IGNvbHVtbnMgYW5kIHgtMSBndXR0ZXJzLCBzbyB3ZSBtdXN0IHN1YnRyYWN0IGEgZ3V0dGVyIGF0IHRoZSBlbmQ6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8Z3xcblx0XHR8PT09PTUwJT09PT18IHw9PT09NTAlPT09PXxcblx0ICovXG5cdCR7d2lkdGhcblx0XHQ/IGB3aWR0aDogY2FsYygoMTAwJSArICR7c3BhY2VbNV19cHgpICogJHt3aWR0aH0gLSAke3NwYWNlWzVdfXB4KTtgXG5cdFx0OiBcIlwifVxuYFxuIl19 */"));
  var collapseBelowWidth = true ? {
    name: "1946d98-collapseBelowWidth",
    styles: "width:100% !important;label:collapseBelowWidth;"
  } : {
    name: "1946d98-collapseBelowWidth",
    styles: "width:100% !important;label:collapseBelowWidth;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQzhCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnNcIlxuaW1wb3J0IHsgdW50aWwgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9tcVwiXG5cbmV4cG9ydCBjb25zdCBjb2x1bW5zID0gY3NzYFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRkaXNwbGF5OiBmbGV4O1xuXHQmID4gKiArICoge1xuXHRcdG1hcmdpbi1sZWZ0OiAke3NwYWNlWzVdfXB4O1xuXHR9XG5gXG5cbmNvbnN0IGNvbGxhcHNlQmVsb3dTcGFjaW5nID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0JiA+ICogKyAqIHtcblx0XHRtYXJnaW4tbGVmdDogMDtcblx0fVxuXHQmID4gKiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogJHtzcGFjZVs1XX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1RhYmxldENvbHVtbnMgPSBjc3NgXG5cdCR7dW50aWwudGFibGV0fSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dMZWZ0Q29sQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5sZWZ0Q29sfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dXaWRlQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC53aWRlfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuXG5jb25zdCBjb2xsYXBzZUJlbG93V2lkdGggPSBjc3NgXG5cdHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG5gXG5cbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93VGFibGV0ID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC50YWJsZXR9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0XHQke2NvbGxhcHNlQmVsb3dXaWR0aH1cblx0XHR9XG5cdH1cbmBcbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93bGVmdENvbCA9IGNzc2Bcblx0JiA+ICoge1xuXHRcdCR7dW50aWwubGVmdENvbH0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1dpZGUgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLndpZGV9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sdW1uID0gKHdpZHRoOiBudW1iZXIpID0+IGNzc2Bcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0LyogSWYgYSB3aWR0aCBpcyBzcGVjaWZpZWQsIGRvbid0IGFsbG93IGNvbHVtbiB0byBncm93LiBVc2UgdGhlIHdpZHRoIHByb3BlcnR5ICovXG5cdGZsZXg6ICR7d2lkdGggPyBcIjAgMCBhdXRvXCIgOiAxfTtcblx0Lypcblx0XHRBIHNldCBvZiBDb2x1bW5zIGhhcyBuIGNvbHVtbnMgYW5kIG4tMSBndXR0ZXJzOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfFxuXHRcdFRoaXMgbWVhbnMgaWYgd2UgdGFrZSBhIHNpbXBsZSBmcmFjdGlvbiBvZiB0aGUgd2lkdGggb2YgdGhlIHNldCBvZiBDb2x1bW5zLFxuXHRcdG91ciBDb2x1bW4gd2lsbCBzdG9wIHBhcnQtd2F5IHRocm91Z2ggYSBndXR0ZXI6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8XG5cdFx0fD09PT01MCU9PT09PXw9PT09NTAlPT09PT18XG5cdFx0VG8gY2FsY3VsYXRlIHdpZHRoIG9mIGEgQ29sdW1uIGNvcnJlY3RseSwgd2UgbXVzdCBhZGQgYW4gaW1hZ2luYXJ5IGV4dHJhIGd1dHRlclxuXHRcdGFuZCB0YWtlIGEgZnJhY3Rpb24gb2YgdGhlIHdob2xlOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfGd8XG5cdFx0fD09PT09NTAlPT09PT18fD09PT01MCU9PT09PXxcblx0XHRUaGlzIHdpbGwgY3JlYXRlIGEgQ29sdW1uIHdoaWNoIGlzIHggY29sdW1ucyBhbmQgeCBndXR0ZXJzIHdpZGUuIFdlIHJlYWxseSB3YW50IHRoZVxuXHRcdENvbHVtbiB0byBiZSB4IGNvbHVtbnMgYW5kIHgtMSBndXR0ZXJzLCBzbyB3ZSBtdXN0IHN1YnRyYWN0IGEgZ3V0dGVyIGF0IHRoZSBlbmQ6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8Z3xcblx0XHR8PT09PTUwJT09PT18IHw9PT09NTAlPT09PXxcblx0ICovXG5cdCR7d2lkdGhcblx0XHQ/IGB3aWR0aDogY2FsYygoMTAwJSArICR7c3BhY2VbNV19cHgpICogJHt3aWR0aH0gLSAke3NwYWNlWzVdfXB4KTtgXG5cdFx0OiBcIlwifVxuYFxuIl19 */"
  };
  var collapseBelowTablet = /* @__PURE__ */ css_browser_esm_default("& > *{", until2.tablet, "{", collapseBelowWidth, "}}label:collapseBelowTablet;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQ3NDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnNcIlxuaW1wb3J0IHsgdW50aWwgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9tcVwiXG5cbmV4cG9ydCBjb25zdCBjb2x1bW5zID0gY3NzYFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRkaXNwbGF5OiBmbGV4O1xuXHQmID4gKiArICoge1xuXHRcdG1hcmdpbi1sZWZ0OiAke3NwYWNlWzVdfXB4O1xuXHR9XG5gXG5cbmNvbnN0IGNvbGxhcHNlQmVsb3dTcGFjaW5nID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0JiA+ICogKyAqIHtcblx0XHRtYXJnaW4tbGVmdDogMDtcblx0fVxuXHQmID4gKiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogJHtzcGFjZVs1XX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1RhYmxldENvbHVtbnMgPSBjc3NgXG5cdCR7dW50aWwudGFibGV0fSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dMZWZ0Q29sQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5sZWZ0Q29sfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dXaWRlQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC53aWRlfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuXG5jb25zdCBjb2xsYXBzZUJlbG93V2lkdGggPSBjc3NgXG5cdHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG5gXG5cbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93VGFibGV0ID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC50YWJsZXR9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0XHQke2NvbGxhcHNlQmVsb3dXaWR0aH1cblx0XHR9XG5cdH1cbmBcbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93bGVmdENvbCA9IGNzc2Bcblx0JiA+ICoge1xuXHRcdCR7dW50aWwubGVmdENvbH0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1dpZGUgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLndpZGV9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sdW1uID0gKHdpZHRoOiBudW1iZXIpID0+IGNzc2Bcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0LyogSWYgYSB3aWR0aCBpcyBzcGVjaWZpZWQsIGRvbid0IGFsbG93IGNvbHVtbiB0byBncm93LiBVc2UgdGhlIHdpZHRoIHByb3BlcnR5ICovXG5cdGZsZXg6ICR7d2lkdGggPyBcIjAgMCBhdXRvXCIgOiAxfTtcblx0Lypcblx0XHRBIHNldCBvZiBDb2x1bW5zIGhhcyBuIGNvbHVtbnMgYW5kIG4tMSBndXR0ZXJzOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfFxuXHRcdFRoaXMgbWVhbnMgaWYgd2UgdGFrZSBhIHNpbXBsZSBmcmFjdGlvbiBvZiB0aGUgd2lkdGggb2YgdGhlIHNldCBvZiBDb2x1bW5zLFxuXHRcdG91ciBDb2x1bW4gd2lsbCBzdG9wIHBhcnQtd2F5IHRocm91Z2ggYSBndXR0ZXI6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8XG5cdFx0fD09PT01MCU9PT09PXw9PT09NTAlPT09PT18XG5cdFx0VG8gY2FsY3VsYXRlIHdpZHRoIG9mIGEgQ29sdW1uIGNvcnJlY3RseSwgd2UgbXVzdCBhZGQgYW4gaW1hZ2luYXJ5IGV4dHJhIGd1dHRlclxuXHRcdGFuZCB0YWtlIGEgZnJhY3Rpb24gb2YgdGhlIHdob2xlOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfGd8XG5cdFx0fD09PT09NTAlPT09PT18fD09PT01MCU9PT09PXxcblx0XHRUaGlzIHdpbGwgY3JlYXRlIGEgQ29sdW1uIHdoaWNoIGlzIHggY29sdW1ucyBhbmQgeCBndXR0ZXJzIHdpZGUuIFdlIHJlYWxseSB3YW50IHRoZVxuXHRcdENvbHVtbiB0byBiZSB4IGNvbHVtbnMgYW5kIHgtMSBndXR0ZXJzLCBzbyB3ZSBtdXN0IHN1YnRyYWN0IGEgZ3V0dGVyIGF0IHRoZSBlbmQ6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8Z3xcblx0XHR8PT09PTUwJT09PT18IHw9PT09NTAlPT09PXxcblx0ICovXG5cdCR7d2lkdGhcblx0XHQ/IGB3aWR0aDogY2FsYygoMTAwJSArICR7c3BhY2VbNV19cHgpICogJHt3aWR0aH0gLSAke3NwYWNlWzVdfXB4KTtgXG5cdFx0OiBcIlwifVxuYFxuIl19 */"));
  var collapseBelowDesktop = /* @__PURE__ */ css_browser_esm_default("& > *{", until2.desktop, "{", collapseBelowWidth, "}}label:collapseBelowDesktop;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzRHVDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnNcIlxuaW1wb3J0IHsgdW50aWwgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9tcVwiXG5cbmV4cG9ydCBjb25zdCBjb2x1bW5zID0gY3NzYFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRkaXNwbGF5OiBmbGV4O1xuXHQmID4gKiArICoge1xuXHRcdG1hcmdpbi1sZWZ0OiAke3NwYWNlWzVdfXB4O1xuXHR9XG5gXG5cbmNvbnN0IGNvbGxhcHNlQmVsb3dTcGFjaW5nID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0JiA+ICogKyAqIHtcblx0XHRtYXJnaW4tbGVmdDogMDtcblx0fVxuXHQmID4gKiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogJHtzcGFjZVs1XX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1RhYmxldENvbHVtbnMgPSBjc3NgXG5cdCR7dW50aWwudGFibGV0fSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dMZWZ0Q29sQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5sZWZ0Q29sfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dXaWRlQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC53aWRlfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuXG5jb25zdCBjb2xsYXBzZUJlbG93V2lkdGggPSBjc3NgXG5cdHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG5gXG5cbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93VGFibGV0ID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC50YWJsZXR9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0XHQke2NvbGxhcHNlQmVsb3dXaWR0aH1cblx0XHR9XG5cdH1cbmBcbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93bGVmdENvbCA9IGNzc2Bcblx0JiA+ICoge1xuXHRcdCR7dW50aWwubGVmdENvbH0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1dpZGUgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLndpZGV9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sdW1uID0gKHdpZHRoOiBudW1iZXIpID0+IGNzc2Bcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0LyogSWYgYSB3aWR0aCBpcyBzcGVjaWZpZWQsIGRvbid0IGFsbG93IGNvbHVtbiB0byBncm93LiBVc2UgdGhlIHdpZHRoIHByb3BlcnR5ICovXG5cdGZsZXg6ICR7d2lkdGggPyBcIjAgMCBhdXRvXCIgOiAxfTtcblx0Lypcblx0XHRBIHNldCBvZiBDb2x1bW5zIGhhcyBuIGNvbHVtbnMgYW5kIG4tMSBndXR0ZXJzOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfFxuXHRcdFRoaXMgbWVhbnMgaWYgd2UgdGFrZSBhIHNpbXBsZSBmcmFjdGlvbiBvZiB0aGUgd2lkdGggb2YgdGhlIHNldCBvZiBDb2x1bW5zLFxuXHRcdG91ciBDb2x1bW4gd2lsbCBzdG9wIHBhcnQtd2F5IHRocm91Z2ggYSBndXR0ZXI6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8XG5cdFx0fD09PT01MCU9PT09PXw9PT09NTAlPT09PT18XG5cdFx0VG8gY2FsY3VsYXRlIHdpZHRoIG9mIGEgQ29sdW1uIGNvcnJlY3RseSwgd2UgbXVzdCBhZGQgYW4gaW1hZ2luYXJ5IGV4dHJhIGd1dHRlclxuXHRcdGFuZCB0YWtlIGEgZnJhY3Rpb24gb2YgdGhlIHdob2xlOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfGd8XG5cdFx0fD09PT09NTAlPT09PT18fD09PT01MCU9PT09PXxcblx0XHRUaGlzIHdpbGwgY3JlYXRlIGEgQ29sdW1uIHdoaWNoIGlzIHggY29sdW1ucyBhbmQgeCBndXR0ZXJzIHdpZGUuIFdlIHJlYWxseSB3YW50IHRoZVxuXHRcdENvbHVtbiB0byBiZSB4IGNvbHVtbnMgYW5kIHgtMSBndXR0ZXJzLCBzbyB3ZSBtdXN0IHN1YnRyYWN0IGEgZ3V0dGVyIGF0IHRoZSBlbmQ6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8Z3xcblx0XHR8PT09PTUwJT09PT18IHw9PT09NTAlPT09PXxcblx0ICovXG5cdCR7d2lkdGhcblx0XHQ/IGB3aWR0aDogY2FsYygoMTAwJSArICR7c3BhY2VbNV19cHgpICogJHt3aWR0aH0gLSAke3NwYWNlWzVdfXB4KTtgXG5cdFx0OiBcIlwifVxuYFxuIl19 */"));
  var collapseBelowleftCol = /* @__PURE__ */ css_browser_esm_default("& > *{", until2.leftCol, "{", collapseBelowWidth, "}}label:collapseBelowleftCol;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2RHVDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnNcIlxuaW1wb3J0IHsgdW50aWwgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9tcVwiXG5cbmV4cG9ydCBjb25zdCBjb2x1bW5zID0gY3NzYFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRkaXNwbGF5OiBmbGV4O1xuXHQmID4gKiArICoge1xuXHRcdG1hcmdpbi1sZWZ0OiAke3NwYWNlWzVdfXB4O1xuXHR9XG5gXG5cbmNvbnN0IGNvbGxhcHNlQmVsb3dTcGFjaW5nID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0JiA+ICogKyAqIHtcblx0XHRtYXJnaW4tbGVmdDogMDtcblx0fVxuXHQmID4gKiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogJHtzcGFjZVs1XX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1RhYmxldENvbHVtbnMgPSBjc3NgXG5cdCR7dW50aWwudGFibGV0fSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dMZWZ0Q29sQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5sZWZ0Q29sfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dXaWRlQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC53aWRlfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuXG5jb25zdCBjb2xsYXBzZUJlbG93V2lkdGggPSBjc3NgXG5cdHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG5gXG5cbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93VGFibGV0ID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC50YWJsZXR9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0XHQke2NvbGxhcHNlQmVsb3dXaWR0aH1cblx0XHR9XG5cdH1cbmBcbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93bGVmdENvbCA9IGNzc2Bcblx0JiA+ICoge1xuXHRcdCR7dW50aWwubGVmdENvbH0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1dpZGUgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLndpZGV9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sdW1uID0gKHdpZHRoOiBudW1iZXIpID0+IGNzc2Bcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0LyogSWYgYSB3aWR0aCBpcyBzcGVjaWZpZWQsIGRvbid0IGFsbG93IGNvbHVtbiB0byBncm93LiBVc2UgdGhlIHdpZHRoIHByb3BlcnR5ICovXG5cdGZsZXg6ICR7d2lkdGggPyBcIjAgMCBhdXRvXCIgOiAxfTtcblx0Lypcblx0XHRBIHNldCBvZiBDb2x1bW5zIGhhcyBuIGNvbHVtbnMgYW5kIG4tMSBndXR0ZXJzOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfFxuXHRcdFRoaXMgbWVhbnMgaWYgd2UgdGFrZSBhIHNpbXBsZSBmcmFjdGlvbiBvZiB0aGUgd2lkdGggb2YgdGhlIHNldCBvZiBDb2x1bW5zLFxuXHRcdG91ciBDb2x1bW4gd2lsbCBzdG9wIHBhcnQtd2F5IHRocm91Z2ggYSBndXR0ZXI6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8XG5cdFx0fD09PT01MCU9PT09PXw9PT09NTAlPT09PT18XG5cdFx0VG8gY2FsY3VsYXRlIHdpZHRoIG9mIGEgQ29sdW1uIGNvcnJlY3RseSwgd2UgbXVzdCBhZGQgYW4gaW1hZ2luYXJ5IGV4dHJhIGd1dHRlclxuXHRcdGFuZCB0YWtlIGEgZnJhY3Rpb24gb2YgdGhlIHdob2xlOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfGd8XG5cdFx0fD09PT09NTAlPT09PT18fD09PT01MCU9PT09PXxcblx0XHRUaGlzIHdpbGwgY3JlYXRlIGEgQ29sdW1uIHdoaWNoIGlzIHggY29sdW1ucyBhbmQgeCBndXR0ZXJzIHdpZGUuIFdlIHJlYWxseSB3YW50IHRoZVxuXHRcdENvbHVtbiB0byBiZSB4IGNvbHVtbnMgYW5kIHgtMSBndXR0ZXJzLCBzbyB3ZSBtdXN0IHN1YnRyYWN0IGEgZ3V0dGVyIGF0IHRoZSBlbmQ6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8Z3xcblx0XHR8PT09PTUwJT09PT18IHw9PT09NTAlPT09PXxcblx0ICovXG5cdCR7d2lkdGhcblx0XHQ/IGB3aWR0aDogY2FsYygoMTAwJSArICR7c3BhY2VbNV19cHgpICogJHt3aWR0aH0gLSAke3NwYWNlWzVdfXB4KTtgXG5cdFx0OiBcIlwifVxuYFxuIl19 */"));
  var collapseBelowWide = /* @__PURE__ */ css_browser_esm_default("& > *{", until2.wide, "{", collapseBelowWidth, "}}label:collapseBelowWide;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvRW9DIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnNcIlxuaW1wb3J0IHsgdW50aWwgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9tcVwiXG5cbmV4cG9ydCBjb25zdCBjb2x1bW5zID0gY3NzYFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRkaXNwbGF5OiBmbGV4O1xuXHQmID4gKiArICoge1xuXHRcdG1hcmdpbi1sZWZ0OiAke3NwYWNlWzVdfXB4O1xuXHR9XG5gXG5cbmNvbnN0IGNvbGxhcHNlQmVsb3dTcGFjaW5nID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0JiA+ICogKyAqIHtcblx0XHRtYXJnaW4tbGVmdDogMDtcblx0fVxuXHQmID4gKiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogJHtzcGFjZVs1XX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1RhYmxldENvbHVtbnMgPSBjc3NgXG5cdCR7dW50aWwudGFibGV0fSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dMZWZ0Q29sQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5sZWZ0Q29sfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dXaWRlQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC53aWRlfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuXG5jb25zdCBjb2xsYXBzZUJlbG93V2lkdGggPSBjc3NgXG5cdHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG5gXG5cbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93VGFibGV0ID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC50YWJsZXR9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0XHQke2NvbGxhcHNlQmVsb3dXaWR0aH1cblx0XHR9XG5cdH1cbmBcbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93bGVmdENvbCA9IGNzc2Bcblx0JiA+ICoge1xuXHRcdCR7dW50aWwubGVmdENvbH0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1dpZGUgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLndpZGV9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sdW1uID0gKHdpZHRoOiBudW1iZXIpID0+IGNzc2Bcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0LyogSWYgYSB3aWR0aCBpcyBzcGVjaWZpZWQsIGRvbid0IGFsbG93IGNvbHVtbiB0byBncm93LiBVc2UgdGhlIHdpZHRoIHByb3BlcnR5ICovXG5cdGZsZXg6ICR7d2lkdGggPyBcIjAgMCBhdXRvXCIgOiAxfTtcblx0Lypcblx0XHRBIHNldCBvZiBDb2x1bW5zIGhhcyBuIGNvbHVtbnMgYW5kIG4tMSBndXR0ZXJzOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfFxuXHRcdFRoaXMgbWVhbnMgaWYgd2UgdGFrZSBhIHNpbXBsZSBmcmFjdGlvbiBvZiB0aGUgd2lkdGggb2YgdGhlIHNldCBvZiBDb2x1bW5zLFxuXHRcdG91ciBDb2x1bW4gd2lsbCBzdG9wIHBhcnQtd2F5IHRocm91Z2ggYSBndXR0ZXI6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8XG5cdFx0fD09PT01MCU9PT09PXw9PT09NTAlPT09PT18XG5cdFx0VG8gY2FsY3VsYXRlIHdpZHRoIG9mIGEgQ29sdW1uIGNvcnJlY3RseSwgd2UgbXVzdCBhZGQgYW4gaW1hZ2luYXJ5IGV4dHJhIGd1dHRlclxuXHRcdGFuZCB0YWtlIGEgZnJhY3Rpb24gb2YgdGhlIHdob2xlOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfGd8XG5cdFx0fD09PT09NTAlPT09PT18fD09PT01MCU9PT09PXxcblx0XHRUaGlzIHdpbGwgY3JlYXRlIGEgQ29sdW1uIHdoaWNoIGlzIHggY29sdW1ucyBhbmQgeCBndXR0ZXJzIHdpZGUuIFdlIHJlYWxseSB3YW50IHRoZVxuXHRcdENvbHVtbiB0byBiZSB4IGNvbHVtbnMgYW5kIHgtMSBndXR0ZXJzLCBzbyB3ZSBtdXN0IHN1YnRyYWN0IGEgZ3V0dGVyIGF0IHRoZSBlbmQ6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8Z3xcblx0XHR8PT09PTUwJT09PT18IHw9PT09NTAlPT09PXxcblx0ICovXG5cdCR7d2lkdGhcblx0XHQ/IGB3aWR0aDogY2FsYygoMTAwJSArICR7c3BhY2VbNV19cHgpICogJHt3aWR0aH0gLSAke3NwYWNlWzVdfXB4KTtgXG5cdFx0OiBcIlwifVxuYFxuIl19 */"));
  var column = function column2(width2) {
    return /* @__PURE__ */ css_browser_esm_default("box-sizing:border-box;flex:", width2 ? "0 0 auto" : 1, ";", width2 ? "width: calc((100% + ".concat(space$12[5], "px) * ").concat(width2, " - ").concat(space$12[5], "px);") : "", true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0RTRDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnNcIlxuaW1wb3J0IHsgdW50aWwgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9tcVwiXG5cbmV4cG9ydCBjb25zdCBjb2x1bW5zID0gY3NzYFxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRkaXNwbGF5OiBmbGV4O1xuXHQmID4gKiArICoge1xuXHRcdG1hcmdpbi1sZWZ0OiAke3NwYWNlWzVdfXB4O1xuXHR9XG5gXG5cbmNvbnN0IGNvbGxhcHNlQmVsb3dTcGFjaW5nID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0JiA+ICogKyAqIHtcblx0XHRtYXJnaW4tbGVmdDogMDtcblx0fVxuXHQmID4gKiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogJHtzcGFjZVs1XX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1RhYmxldENvbHVtbnMgPSBjc3NgXG5cdCR7dW50aWwudGFibGV0fSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dMZWZ0Q29sQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC5sZWZ0Q29sfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dXaWRlQ29sdW1ucyA9IGNzc2Bcblx0JHt1bnRpbC53aWRlfSB7XG5cdFx0JHtjb2xsYXBzZUJlbG93U3BhY2luZ31cblx0fVxuYFxuXG5jb25zdCBjb2xsYXBzZUJlbG93V2lkdGggPSBjc3NgXG5cdHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG5gXG5cbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93VGFibGV0ID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC50YWJsZXR9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmVsb3dEZXNrdG9wID0gY3NzYFxuXHQmID4gKiB7XG5cdFx0JHt1bnRpbC5kZXNrdG9wfSB7XG5cdFx0XHQke2NvbGxhcHNlQmVsb3dXaWR0aH1cblx0XHR9XG5cdH1cbmBcbmV4cG9ydCBjb25zdCBjb2xsYXBzZUJlbG93bGVmdENvbCA9IGNzc2Bcblx0JiA+ICoge1xuXHRcdCR7dW50aWwubGVmdENvbH0ge1xuXHRcdFx0JHtjb2xsYXBzZUJlbG93V2lkdGh9XG5cdFx0fVxuXHR9XG5gXG5leHBvcnQgY29uc3QgY29sbGFwc2VCZWxvd1dpZGUgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHQke3VudGlsLndpZGV9IHtcblx0XHRcdCR7Y29sbGFwc2VCZWxvd1dpZHRofVxuXHRcdH1cblx0fVxuYFxuXG5leHBvcnQgY29uc3QgY29sdW1uID0gKHdpZHRoOiBudW1iZXIpID0+IGNzc2Bcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0LyogSWYgYSB3aWR0aCBpcyBzcGVjaWZpZWQsIGRvbid0IGFsbG93IGNvbHVtbiB0byBncm93LiBVc2UgdGhlIHdpZHRoIHByb3BlcnR5ICovXG5cdGZsZXg6ICR7d2lkdGggPyBcIjAgMCBhdXRvXCIgOiAxfTtcblx0Lypcblx0XHRBIHNldCBvZiBDb2x1bW5zIGhhcyBuIGNvbHVtbnMgYW5kIG4tMSBndXR0ZXJzOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfFxuXHRcdFRoaXMgbWVhbnMgaWYgd2UgdGFrZSBhIHNpbXBsZSBmcmFjdGlvbiBvZiB0aGUgd2lkdGggb2YgdGhlIHNldCBvZiBDb2x1bW5zLFxuXHRcdG91ciBDb2x1bW4gd2lsbCBzdG9wIHBhcnQtd2F5IHRocm91Z2ggYSBndXR0ZXI6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8XG5cdFx0fD09PT01MCU9PT09PXw9PT09NTAlPT09PT18XG5cdFx0VG8gY2FsY3VsYXRlIHdpZHRoIG9mIGEgQ29sdW1uIGNvcnJlY3RseSwgd2UgbXVzdCBhZGQgYW4gaW1hZ2luYXJ5IGV4dHJhIGd1dHRlclxuXHRcdGFuZCB0YWtlIGEgZnJhY3Rpb24gb2YgdGhlIHdob2xlOlxuXHRcdHwgICAgfGd8ICAgIHxnfCAgICB8Z3wgICAgfGd8XG5cdFx0fD09PT09NTAlPT09PT18fD09PT01MCU9PT09PXxcblx0XHRUaGlzIHdpbGwgY3JlYXRlIGEgQ29sdW1uIHdoaWNoIGlzIHggY29sdW1ucyBhbmQgeCBndXR0ZXJzIHdpZGUuIFdlIHJlYWxseSB3YW50IHRoZVxuXHRcdENvbHVtbiB0byBiZSB4IGNvbHVtbnMgYW5kIHgtMSBndXR0ZXJzLCBzbyB3ZSBtdXN0IHN1YnRyYWN0IGEgZ3V0dGVyIGF0IHRoZSBlbmQ6XG5cdFx0fCAgICB8Z3wgICAgfGd8ICAgIHxnfCAgICB8Z3xcblx0XHR8PT09PTUwJT09PT18IHw9PT09NTAlPT09PXxcblx0ICovXG5cdCR7d2lkdGhcblx0XHQ/IGB3aWR0aDogY2FsYygoMTAwJSArICR7c3BhY2VbNV19cHgpICogJHt3aWR0aH0gLSAke3NwYWNlWzVdfXB4KTtgXG5cdFx0OiBcIlwifVxuYFxuIl19 */");
  };
  var collapseBelowMap = {
    tablet: collapseBelowTablet,
    desktop: collapseBelowDesktop,
    leftCol: collapseBelowleftCol,
    wide: collapseBelowWide
  };
  var collapseBelowColumnsMap = {
    tablet: collapseBelowTabletColumns,
    desktop: collapseBelowDesktopColumns,
    leftCol: collapseBelowLeftColColumns,
    wide: collapseBelowWideColumns
  };
  var Columns = function Columns2(_ref) {
    var collapseBelow = _ref.collapseBelow, cssOverrides = _ref.cssOverrides, children = _ref.children, props = _objectWithoutProperties(_ref, ["collapseBelow", "cssOverrides", "children"]);
    return jsx("div", _extends({
      css: /* @__PURE__ */ css_browser_esm_default([columns, collapseBelow ? collapseBelowColumnsMap[collapseBelow] : "", collapseBelow ? collapseBelowMap[collapseBelow] : "", cssOverrides], "label:Columns;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbHVtbnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlERyIsImZpbGUiOiJjb2x1bW5zLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBIVE1MQXR0cmlidXRlcywgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7IFNlcmlhbGl6ZWRTdHlsZXMgfSBmcm9tIFwiQGVtb3Rpb24vY29yZVwiXG5pbXBvcnQge1xuXHRjb2x1bW5zLFxuXHRjb2x1bW4sXG5cdGNvbGxhcHNlQmVsb3dUYWJsZXRDb2x1bW5zLFxuXHRjb2xsYXBzZUJlbG93RGVza3RvcENvbHVtbnMsXG5cdGNvbGxhcHNlQmVsb3dMZWZ0Q29sQ29sdW1ucyxcblx0Y29sbGFwc2VCZWxvd1dpZGVDb2x1bW5zLFxuXHRjb2xsYXBzZUJlbG93VGFibGV0LFxuXHRjb2xsYXBzZUJlbG93RGVza3RvcCxcblx0Y29sbGFwc2VCZWxvd2xlZnRDb2wsXG5cdGNvbGxhcHNlQmVsb3dXaWRlLFxufSBmcm9tIFwiLi9zdHlsZXNcIlxuaW1wb3J0IHsgQnJlYWtwb2ludCB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL21xXCJcbmltcG9ydCB7IFByb3BzIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtaGVscGVyc1wiXG5cbnR5cGUgR3JpZEJyZWFrcG9pbnQgPSBFeHRyYWN0PFxuXHRCcmVha3BvaW50LFxuXHRcIm1vYmlsZVwiIHwgXCJ0YWJsZXRcIiB8IFwiZGVza3RvcFwiIHwgXCJsZWZ0Q29sXCIgfCBcIndpZGVcIlxuPlxuXG50eXBlIENvbGxhcHNlQnJlYWtwb2ludCA9IEV4dHJhY3Q8XG5cdEdyaWRCcmVha3BvaW50LFxuXHRcInRhYmxldFwiIHwgXCJkZXNrdG9wXCIgfCBcImxlZnRDb2xcIiB8IFwid2lkZVwiXG4+XG5cbmludGVyZmFjZSBDb2x1bW5zUHJvcHMgZXh0ZW5kcyBIVE1MQXR0cmlidXRlczxIVE1MRGl2RWxlbWVudD4sIFByb3BzIHtcblx0Y29sbGFwc2VCZWxvdz86IENvbGxhcHNlQnJlYWtwb2ludFxuXHRjc3NPdmVycmlkZXM/OiBTZXJpYWxpemVkU3R5bGVzIHwgU2VyaWFsaXplZFN0eWxlc1tdXG5cdGNoaWxkcmVuOiBSZWFjdE5vZGVcbn1cblxuY29uc3QgY29sbGFwc2VCZWxvd01hcDogeyBba2V5IGluIENvbGxhcHNlQnJlYWtwb2ludF06IFNlcmlhbGl6ZWRTdHlsZXMgfSA9IHtcblx0dGFibGV0OiBjb2xsYXBzZUJlbG93VGFibGV0LFxuXHRkZXNrdG9wOiBjb2xsYXBzZUJlbG93RGVza3RvcCxcblx0bGVmdENvbDogY29sbGFwc2VCZWxvd2xlZnRDb2wsXG5cdHdpZGU6IGNvbGxhcHNlQmVsb3dXaWRlLFxufVxuXG5jb25zdCBjb2xsYXBzZUJlbG93Q29sdW1uc01hcDoge1xuXHRba2V5IGluIENvbGxhcHNlQnJlYWtwb2ludF06IFNlcmlhbGl6ZWRTdHlsZXNcbn0gPSB7XG5cdHRhYmxldDogY29sbGFwc2VCZWxvd1RhYmxldENvbHVtbnMsXG5cdGRlc2t0b3A6IGNvbGxhcHNlQmVsb3dEZXNrdG9wQ29sdW1ucyxcblx0bGVmdENvbDogY29sbGFwc2VCZWxvd0xlZnRDb2xDb2x1bW5zLFxuXHR3aWRlOiBjb2xsYXBzZUJlbG93V2lkZUNvbHVtbnMsXG59XG5cbmNvbnN0IENvbHVtbnMgPSAoe1xuXHRjb2xsYXBzZUJlbG93LFxuXHRjc3NPdmVycmlkZXMsXG5cdGNoaWxkcmVuLFxuXHQuLi5wcm9wc1xufTogQ29sdW1uc1Byb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGRpdlxuXHRcdFx0Y3NzPXtbXG5cdFx0XHRcdGNvbHVtbnMsXG5cdFx0XHRcdGNvbGxhcHNlQmVsb3cgPyBjb2xsYXBzZUJlbG93Q29sdW1uc01hcFtjb2xsYXBzZUJlbG93XSA6IFwiXCIsXG5cdFx0XHRcdGNvbGxhcHNlQmVsb3cgPyBjb2xsYXBzZUJlbG93TWFwW2NvbGxhcHNlQmVsb3ddIDogXCJcIixcblx0XHRcdFx0Y3NzT3ZlcnJpZGVzLFxuXHRcdFx0XX1cblx0XHRcdHsuLi5wcm9wc31cblx0XHQ+XG5cdFx0XHR7Y2hpbGRyZW59XG5cdFx0PC9kaXY+XG5cdClcbn1cblxuaW50ZXJmYWNlIENvbHVtblByb3BzIGV4dGVuZHMgSFRNTEF0dHJpYnV0ZXM8SFRNTERpdkVsZW1lbnQ+LCBQcm9wcyB7XG5cdHdpZHRoPzogbnVtYmVyXG5cdGNzc092ZXJyaWRlcz86IFNlcmlhbGl6ZWRTdHlsZXMgfCBTZXJpYWxpemVkU3R5bGVzW11cblx0Y2hpbGRyZW46IFJlYWN0Tm9kZVxufVxuXG5jb25zdCBDb2x1bW4gPSAoe1xuXHR3aWR0aCA9IDAsXG5cdGNzc092ZXJyaWRlcyxcblx0Y2hpbGRyZW4sXG5cdC4uLnByb3BzXG59OiBDb2x1bW5Qcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY3NzPXtbY29sdW1uKHdpZHRoKSwgY3NzT3ZlcnJpZGVzXX0gey4uLnByb3BzfT5cblx0XHRcdHtjaGlsZHJlbn1cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5Db2x1bW5zLmRlZmF1bHRQcm9wcyA9IHt9XG5Db2x1bW4uZGVmYXVsdFByb3BzID0ge31cblxuZXhwb3J0IHsgQ29sdW1ucywgQ29sdW1uIH1cbiJdfQ== */"))
    }, props), children);
  };
  var Column = function Column2(_ref2) {
    var _ref2$width = _ref2.width, width2 = _ref2$width === void 0 ? 0 : _ref2$width, cssOverrides = _ref2.cssOverrides, children = _ref2.children, props = _objectWithoutProperties(_ref2, ["width", "cssOverrides", "children"]);
    return jsx("div", _extends({
      css: /* @__PURE__ */ css_browser_esm_default([column(width2), cssOverrides], "label:Column;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbHVtbnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1GTyIsImZpbGUiOiJjb2x1bW5zLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBIVE1MQXR0cmlidXRlcywgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7IFNlcmlhbGl6ZWRTdHlsZXMgfSBmcm9tIFwiQGVtb3Rpb24vY29yZVwiXG5pbXBvcnQge1xuXHRjb2x1bW5zLFxuXHRjb2x1bW4sXG5cdGNvbGxhcHNlQmVsb3dUYWJsZXRDb2x1bW5zLFxuXHRjb2xsYXBzZUJlbG93RGVza3RvcENvbHVtbnMsXG5cdGNvbGxhcHNlQmVsb3dMZWZ0Q29sQ29sdW1ucyxcblx0Y29sbGFwc2VCZWxvd1dpZGVDb2x1bW5zLFxuXHRjb2xsYXBzZUJlbG93VGFibGV0LFxuXHRjb2xsYXBzZUJlbG93RGVza3RvcCxcblx0Y29sbGFwc2VCZWxvd2xlZnRDb2wsXG5cdGNvbGxhcHNlQmVsb3dXaWRlLFxufSBmcm9tIFwiLi9zdHlsZXNcIlxuaW1wb3J0IHsgQnJlYWtwb2ludCB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL21xXCJcbmltcG9ydCB7IFByb3BzIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtaGVscGVyc1wiXG5cbnR5cGUgR3JpZEJyZWFrcG9pbnQgPSBFeHRyYWN0PFxuXHRCcmVha3BvaW50LFxuXHRcIm1vYmlsZVwiIHwgXCJ0YWJsZXRcIiB8IFwiZGVza3RvcFwiIHwgXCJsZWZ0Q29sXCIgfCBcIndpZGVcIlxuPlxuXG50eXBlIENvbGxhcHNlQnJlYWtwb2ludCA9IEV4dHJhY3Q8XG5cdEdyaWRCcmVha3BvaW50LFxuXHRcInRhYmxldFwiIHwgXCJkZXNrdG9wXCIgfCBcImxlZnRDb2xcIiB8IFwid2lkZVwiXG4+XG5cbmludGVyZmFjZSBDb2x1bW5zUHJvcHMgZXh0ZW5kcyBIVE1MQXR0cmlidXRlczxIVE1MRGl2RWxlbWVudD4sIFByb3BzIHtcblx0Y29sbGFwc2VCZWxvdz86IENvbGxhcHNlQnJlYWtwb2ludFxuXHRjc3NPdmVycmlkZXM/OiBTZXJpYWxpemVkU3R5bGVzIHwgU2VyaWFsaXplZFN0eWxlc1tdXG5cdGNoaWxkcmVuOiBSZWFjdE5vZGVcbn1cblxuY29uc3QgY29sbGFwc2VCZWxvd01hcDogeyBba2V5IGluIENvbGxhcHNlQnJlYWtwb2ludF06IFNlcmlhbGl6ZWRTdHlsZXMgfSA9IHtcblx0dGFibGV0OiBjb2xsYXBzZUJlbG93VGFibGV0LFxuXHRkZXNrdG9wOiBjb2xsYXBzZUJlbG93RGVza3RvcCxcblx0bGVmdENvbDogY29sbGFwc2VCZWxvd2xlZnRDb2wsXG5cdHdpZGU6IGNvbGxhcHNlQmVsb3dXaWRlLFxufVxuXG5jb25zdCBjb2xsYXBzZUJlbG93Q29sdW1uc01hcDoge1xuXHRba2V5IGluIENvbGxhcHNlQnJlYWtwb2ludF06IFNlcmlhbGl6ZWRTdHlsZXNcbn0gPSB7XG5cdHRhYmxldDogY29sbGFwc2VCZWxvd1RhYmxldENvbHVtbnMsXG5cdGRlc2t0b3A6IGNvbGxhcHNlQmVsb3dEZXNrdG9wQ29sdW1ucyxcblx0bGVmdENvbDogY29sbGFwc2VCZWxvd0xlZnRDb2xDb2x1bW5zLFxuXHR3aWRlOiBjb2xsYXBzZUJlbG93V2lkZUNvbHVtbnMsXG59XG5cbmNvbnN0IENvbHVtbnMgPSAoe1xuXHRjb2xsYXBzZUJlbG93LFxuXHRjc3NPdmVycmlkZXMsXG5cdGNoaWxkcmVuLFxuXHQuLi5wcm9wc1xufTogQ29sdW1uc1Byb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGRpdlxuXHRcdFx0Y3NzPXtbXG5cdFx0XHRcdGNvbHVtbnMsXG5cdFx0XHRcdGNvbGxhcHNlQmVsb3cgPyBjb2xsYXBzZUJlbG93Q29sdW1uc01hcFtjb2xsYXBzZUJlbG93XSA6IFwiXCIsXG5cdFx0XHRcdGNvbGxhcHNlQmVsb3cgPyBjb2xsYXBzZUJlbG93TWFwW2NvbGxhcHNlQmVsb3ddIDogXCJcIixcblx0XHRcdFx0Y3NzT3ZlcnJpZGVzLFxuXHRcdFx0XX1cblx0XHRcdHsuLi5wcm9wc31cblx0XHQ+XG5cdFx0XHR7Y2hpbGRyZW59XG5cdFx0PC9kaXY+XG5cdClcbn1cblxuaW50ZXJmYWNlIENvbHVtblByb3BzIGV4dGVuZHMgSFRNTEF0dHJpYnV0ZXM8SFRNTERpdkVsZW1lbnQ+LCBQcm9wcyB7XG5cdHdpZHRoPzogbnVtYmVyXG5cdGNzc092ZXJyaWRlcz86IFNlcmlhbGl6ZWRTdHlsZXMgfCBTZXJpYWxpemVkU3R5bGVzW11cblx0Y2hpbGRyZW46IFJlYWN0Tm9kZVxufVxuXG5jb25zdCBDb2x1bW4gPSAoe1xuXHR3aWR0aCA9IDAsXG5cdGNzc092ZXJyaWRlcyxcblx0Y2hpbGRyZW4sXG5cdC4uLnByb3BzXG59OiBDb2x1bW5Qcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY3NzPXtbY29sdW1uKHdpZHRoKSwgY3NzT3ZlcnJpZGVzXX0gey4uLnByb3BzfT5cblx0XHRcdHtjaGlsZHJlbn1cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5Db2x1bW5zLmRlZmF1bHRQcm9wcyA9IHt9XG5Db2x1bW4uZGVmYXVsdFByb3BzID0ge31cblxuZXhwb3J0IHsgQ29sdW1ucywgQ29sdW1uIH1cbiJdfQ== */"))
    }, props), children);
  };
  Columns.defaultProps = {};
  Column.defaultProps = {};
  var container2 = /* @__PURE__ */ css_browser_esm_default("margin:0 auto;box-sizing:border-box;padding:0 ", space$12[3], "px;width:100%;", from2.tablet, "{padding:0 ", space$12[5], "px;width:", breakpoints$13.tablet, "px;}", from2.desktop, "{width:", breakpoints$13.desktop, "px;}", from2.leftCol, "{width:", breakpoints$13.leftCol, "px;}", from2.wide, "{width:", breakpoints$13.wide, "px;}label:container;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLNEIiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL2NvcmVcIlxuaW1wb3J0IHsgYnJlYWtwb2ludHMsIHNwYWNlIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnNcIlxuaW1wb3J0IHsgZnJvbSB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL21xXCJcbmltcG9ydCB7IGJvcmRlciB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL3BhbGV0dGVcIlxuXG5leHBvcnQgY29uc3QgY29udGFpbmVyID0gY3NzYFxuXHRtYXJnaW46IDAgYXV0bztcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0cGFkZGluZzogMCAke3NwYWNlWzNdfXB4O1xuXHR3aWR0aDogMTAwJTtcblx0JHtmcm9tLnRhYmxldH0ge1xuXHRcdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0XHR3aWR0aDogJHticmVha3BvaW50cy50YWJsZXR9cHg7XG5cdH1cblx0JHtmcm9tLmRlc2t0b3B9IHtcblx0XHR3aWR0aDogJHticmVha3BvaW50cy5kZXNrdG9wfXB4O1xuXHR9XG5cdCR7ZnJvbS5sZWZ0Q29sfSB7XG5cdFx0d2lkdGg6ICR7YnJlYWtwb2ludHMubGVmdENvbH1weDtcblx0fVxuXHQke2Zyb20ud2lkZX0ge1xuXHRcdHdpZHRoOiAke2JyZWFrcG9pbnRzLndpZGV9cHg7XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IGNvbnRhaW5lckJvcmRlciA9IGNzc2Bcblx0Ym9yZGVyLXN0eWxlOiBzb2xpZDtcblx0Ym9yZGVyLWNvbG9yOiAke2JvcmRlci5zZWNvbmRhcnl9O1xuXHRib3JkZXItd2lkdGg6IDA7XG5cblx0JHtmcm9tLnRhYmxldH0ge1xuXHRcdHdpZHRoOiAke2JyZWFrcG9pbnRzLnRhYmxldCArIDJ9cHg7XG5cdFx0Ym9yZGVyLXdpZHRoOiAwIDFweCAwIDFweDtcblx0fVxuXHQke2Zyb20uZGVza3RvcH0ge1xuXHRcdHdpZHRoOiAke2JyZWFrcG9pbnRzLmRlc2t0b3AgKyAyfXB4O1xuXHR9XG5cdCR7ZnJvbS5sZWZ0Q29sfSB7XG5cdFx0d2lkdGg6ICR7YnJlYWtwb2ludHMubGVmdENvbCArIDJ9cHg7XG5cdH1cblx0JHtmcm9tLndpZGV9IHtcblx0XHR3aWR0aDogJHticmVha3BvaW50cy53aWRlICsgMn1weDtcblx0fVxuYFxuIl19 */"));
  var containerBorder = /* @__PURE__ */ css_browser_esm_default("border-style:solid;border-color:", border3.secondary, ";border-width:0;", from2.tablet, "{width:", breakpoints$13.tablet + 2, "px;border-width:0 1px 0 1px;}", from2.desktop, "{width:", breakpoints$13.desktop + 2, "px;}", from2.leftCol, "{width:", breakpoints$13.leftCol + 2, "px;}", from2.wide, "{width:", breakpoints$13.wide + 2, "px;}label:containerBorder;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5QmtDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IGJyZWFrcG9pbnRzLCBzcGFjZSB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGZyb20gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9tcVwiXG5pbXBvcnQgeyBib3JkZXIgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9wYWxldHRlXCJcblxuZXhwb3J0IGNvbnN0IGNvbnRhaW5lciA9IGNzc2Bcblx0bWFyZ2luOiAwIGF1dG87XG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVszXX1weDtcblx0d2lkdGg6IDEwMCU7XG5cdCR7ZnJvbS50YWJsZXR9IHtcblx0XHRwYWRkaW5nOiAwICR7c3BhY2VbNV19cHg7XG5cdFx0d2lkdGg6ICR7YnJlYWtwb2ludHMudGFibGV0fXB4O1xuXHR9XG5cdCR7ZnJvbS5kZXNrdG9wfSB7XG5cdFx0d2lkdGg6ICR7YnJlYWtwb2ludHMuZGVza3RvcH1weDtcblx0fVxuXHQke2Zyb20ubGVmdENvbH0ge1xuXHRcdHdpZHRoOiAke2JyZWFrcG9pbnRzLmxlZnRDb2x9cHg7XG5cdH1cblx0JHtmcm9tLndpZGV9IHtcblx0XHR3aWR0aDogJHticmVha3BvaW50cy53aWRlfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBjb250YWluZXJCb3JkZXIgPSBjc3NgXG5cdGJvcmRlci1zdHlsZTogc29saWQ7XG5cdGJvcmRlci1jb2xvcjogJHtib3JkZXIuc2Vjb25kYXJ5fTtcblx0Ym9yZGVyLXdpZHRoOiAwO1xuXG5cdCR7ZnJvbS50YWJsZXR9IHtcblx0XHR3aWR0aDogJHticmVha3BvaW50cy50YWJsZXQgKyAyfXB4O1xuXHRcdGJvcmRlci13aWR0aDogMCAxcHggMCAxcHg7XG5cdH1cblx0JHtmcm9tLmRlc2t0b3B9IHtcblx0XHR3aWR0aDogJHticmVha3BvaW50cy5kZXNrdG9wICsgMn1weDtcblx0fVxuXHQke2Zyb20ubGVmdENvbH0ge1xuXHRcdHdpZHRoOiAke2JyZWFrcG9pbnRzLmxlZnRDb2wgKyAyfXB4O1xuXHR9XG5cdCR7ZnJvbS53aWRlfSB7XG5cdFx0d2lkdGg6ICR7YnJlYWtwb2ludHMud2lkZSArIDJ9cHg7XG5cdH1cbmBcbiJdfQ== */"));
  var Container = function Container2(_ref) {
    var _ref$border = _ref.border, border6 = _ref$border === void 0 ? false : _ref$border, cssOverrides = _ref.cssOverrides, children = _ref.children, props = _objectWithoutProperties(_ref, ["border", "cssOverrides", "children"]);
    return jsx("div", _extends({
      css: /* @__PURE__ */ css_browser_esm_default([container2, border6 ? containerBorder : "", cssOverrides], "label:Container;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUJHIiwiZmlsZSI6ImNvbnRhaW5lci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgSFRNTEF0dHJpYnV0ZXMsIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSBcIkBlbW90aW9uL2NvcmVcIlxuaW1wb3J0IHsgY29udGFpbmVyLCBjb250YWluZXJCb3JkZXIgfSBmcm9tIFwiLi9zdHlsZXNcIlxuaW1wb3J0IHsgUHJvcHMgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1oZWxwZXJzXCJcblxuaW50ZXJmYWNlIENvbnRhaW5lciBleHRlbmRzIEhUTUxBdHRyaWJ1dGVzPEhUTUxEaXZFbGVtZW50PiwgUHJvcHMge1xuXHRib3JkZXI/OiBib29sZWFuXG5cdGNzc092ZXJyaWRlcz86IFNlcmlhbGl6ZWRTdHlsZXMgfCBTZXJpYWxpemVkU3R5bGVzW11cblx0Y2hpbGRyZW46IFJlYWN0Tm9kZVxufVxuXG5jb25zdCBDb250YWluZXIgPSAoe1xuXHRib3JkZXIgPSBmYWxzZSxcblx0Y3NzT3ZlcnJpZGVzLFxuXHRjaGlsZHJlbixcblx0Li4ucHJvcHNcbn06IENvbnRhaW5lcikgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxkaXZcblx0XHRcdGNzcz17W2NvbnRhaW5lciwgYm9yZGVyID8gY29udGFpbmVyQm9yZGVyIDogXCJcIiwgY3NzT3ZlcnJpZGVzXX1cblx0XHRcdHsuLi5wcm9wc31cblx0XHQ+XG5cdFx0XHR7Y2hpbGRyZW59XG5cdFx0PC9kaXY+XG5cdClcbn1cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHt9XG5cbkNvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSB7IC4uLmRlZmF1bHRQcm9wcyB9XG5cbmV4cG9ydCB7IENvbnRhaW5lciB9XG4iXX0= */"))
    }, props), children);
  };
  var defaultProps = {};
  Container.defaultProps = _objectSpread2({}, defaultProps);
  var Hide = function Hide2(_ref) {
    var children = _ref.children, above = _ref.above, below = _ref.below;
    var whenToHide;
    if (below) {
      whenToHide = /* @__PURE__ */ css_browser_esm_default(until2[below], "{display:none;}label:Hide;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhpZGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWVrQiIsImZpbGUiOiJoaWRlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBIVE1MQXR0cmlidXRlcywgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IEJyZWFrcG9pbnQgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9uc1wiXG5pbXBvcnQgeyBmcm9tLCB1bnRpbCB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL21xXCJcbmltcG9ydCB7IFByb3BzIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtaGVscGVyc1wiXG5cbmludGVyZmFjZSBIaWRlUHJvcHMgZXh0ZW5kcyBIVE1MQXR0cmlidXRlczxIVE1MRGl2RWxlbWVudD4sIFByb3BzIHtcblx0Y2hpbGRyZW46IFJlYWN0Tm9kZVxuXHRhYm92ZT86IEJyZWFrcG9pbnRcblx0YmVsb3c/OiBCcmVha3BvaW50XG59XG5cbmNvbnN0IEhpZGUgPSAoeyBjaGlsZHJlbiwgYWJvdmUsIGJlbG93IH06IEhpZGVQcm9wcykgPT4ge1xuXHRsZXQgd2hlblRvSGlkZVxuXHRpZiAoYmVsb3cpIHtcblx0XHR3aGVuVG9IaWRlID0gY3NzYFxuXHRcdFx0JHt1bnRpbFtiZWxvd119IHtcblx0XHRcdFx0ZGlzcGxheTogbm9uZTtcblx0XHRcdH1cblx0XHRgXG5cdH1cblx0aWYgKGFib3ZlKSB7XG5cdFx0d2hlblRvSGlkZSA9IGNzc2Bcblx0XHRcdCR7ZnJvbVthYm92ZV19IHtcblx0XHRcdFx0ZGlzcGxheTogbm9uZTtcblx0XHRcdH1cblx0XHRgXG5cdH1cblxuXHRyZXR1cm4gPHNwYW4gY3NzPXt3aGVuVG9IaWRlfT57Y2hpbGRyZW59PC9zcGFuPlxufVxuY29uc3QgZGVmYXVsdFByb3BzID0ge31cblxuSGlkZS5kZWZhdWx0UHJvcHMgPSB7IC4uLmRlZmF1bHRQcm9wcyB9XG5cbmV4cG9ydCB7IEhpZGUgfVxuIl19 */"));
    }
    if (above) {
      whenToHide = /* @__PURE__ */ css_browser_esm_default(from2[above], "{display:none;}label:Hide;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhpZGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNCa0IiLCJmaWxlIjoiaGlkZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgSFRNTEF0dHJpYnV0ZXMsIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vY29yZVwiXG5pbXBvcnQgeyBCcmVha3BvaW50IH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnNcIlxuaW1wb3J0IHsgZnJvbSwgdW50aWwgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9tcVwiXG5pbXBvcnQgeyBQcm9wcyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWhlbHBlcnNcIlxuXG5pbnRlcmZhY2UgSGlkZVByb3BzIGV4dGVuZHMgSFRNTEF0dHJpYnV0ZXM8SFRNTERpdkVsZW1lbnQ+LCBQcm9wcyB7XG5cdGNoaWxkcmVuOiBSZWFjdE5vZGVcblx0YWJvdmU/OiBCcmVha3BvaW50XG5cdGJlbG93PzogQnJlYWtwb2ludFxufVxuXG5jb25zdCBIaWRlID0gKHsgY2hpbGRyZW4sIGFib3ZlLCBiZWxvdyB9OiBIaWRlUHJvcHMpID0+IHtcblx0bGV0IHdoZW5Ub0hpZGVcblx0aWYgKGJlbG93KSB7XG5cdFx0d2hlblRvSGlkZSA9IGNzc2Bcblx0XHRcdCR7dW50aWxbYmVsb3ddfSB7XG5cdFx0XHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0XHR9XG5cdFx0YFxuXHR9XG5cdGlmIChhYm92ZSkge1xuXHRcdHdoZW5Ub0hpZGUgPSBjc3NgXG5cdFx0XHQke2Zyb21bYWJvdmVdfSB7XG5cdFx0XHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0XHR9XG5cdFx0YFxuXHR9XG5cblx0cmV0dXJuIDxzcGFuIGNzcz17d2hlblRvSGlkZX0+e2NoaWxkcmVufTwvc3Bhbj5cbn1cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHt9XG5cbkhpZGUuZGVmYXVsdFByb3BzID0geyAuLi5kZWZhdWx0UHJvcHMgfVxuXG5leHBvcnQgeyBIaWRlIH1cbiJdfQ== */"));
    }
    return jsx("span", {
      css: whenToHide
    }, children);
  };
  var defaultProps$1 = {};
  Hide.defaultProps = _objectSpread2({}, defaultProps$1);
  var stack = true ? {
    name: "qx1pke-stack",
    styles: "& > *{width:100%;}label:stack;"
  } : {
    name: "qx1pke-stack",
    styles: "& > *{width:100%;}label:stack;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJd0IiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzLCBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSBcIkBlbW90aW9uL2NvcmVcIlxuaW1wb3J0IHsgc3BhY2UgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9uc1wiXG5pbXBvcnQgeyBTdGFja1NwYWNlIH0gZnJvbSBcIi4vc3RhY2tcIlxuXG5leHBvcnQgY29uc3Qgc3RhY2sgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHR3aWR0aDogMTAwJTtcblx0fVxuYFxuXG5jb25zdCBzdGFja1NwYWNlU3R5bGUgPSAobnVtYmVyOiBTdGFja1NwYWNlKSA9PiBjc3NgXG5cdCYgPiAqICsgKiB7XG5cdFx0bWFyZ2luLXRvcDogJHtzcGFjZVtudW1iZXJdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzdGFja1NwYWNlOiB7XG5cdDE6IFNlcmlhbGl6ZWRTdHlsZXNcblx0MjogU2VyaWFsaXplZFN0eWxlc1xuXHQzOiBTZXJpYWxpemVkU3R5bGVzXG5cdDQ6IFNlcmlhbGl6ZWRTdHlsZXNcblx0NTogU2VyaWFsaXplZFN0eWxlc1xuXHQ2OiBTZXJpYWxpemVkU3R5bGVzXG5cdDk6IFNlcmlhbGl6ZWRTdHlsZXNcblx0MTI6IFNlcmlhbGl6ZWRTdHlsZXNcblx0MjQ6IFNlcmlhbGl6ZWRTdHlsZXNcbn0gPSB7XG5cdDE6IHN0YWNrU3BhY2VTdHlsZSgxKSxcblx0Mjogc3RhY2tTcGFjZVN0eWxlKDIpLFxuXHQzOiBzdGFja1NwYWNlU3R5bGUoMyksXG5cdDQ6IHN0YWNrU3BhY2VTdHlsZSg0KSxcblx0NTogc3RhY2tTcGFjZVN0eWxlKDUpLFxuXHQ2OiBzdGFja1NwYWNlU3R5bGUoNiksXG5cdDk6IHN0YWNrU3BhY2VTdHlsZSg5KSxcblx0MTI6IHN0YWNrU3BhY2VTdHlsZSgxMiksXG5cdDI0OiBzdGFja1NwYWNlU3R5bGUoMjQpLFxufVxuIl19 */"
  };
  var stackSpaceStyle = function stackSpaceStyle2(number) {
    return /* @__PURE__ */ css_browser_esm_default("& > * + *{margin-top:", space$12[number], "px;}" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVbUQiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzLCBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSBcIkBlbW90aW9uL2NvcmVcIlxuaW1wb3J0IHsgc3BhY2UgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9uc1wiXG5pbXBvcnQgeyBTdGFja1NwYWNlIH0gZnJvbSBcIi4vc3RhY2tcIlxuXG5leHBvcnQgY29uc3Qgc3RhY2sgPSBjc3NgXG5cdCYgPiAqIHtcblx0XHR3aWR0aDogMTAwJTtcblx0fVxuYFxuXG5jb25zdCBzdGFja1NwYWNlU3R5bGUgPSAobnVtYmVyOiBTdGFja1NwYWNlKSA9PiBjc3NgXG5cdCYgPiAqICsgKiB7XG5cdFx0bWFyZ2luLXRvcDogJHtzcGFjZVtudW1iZXJdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzdGFja1NwYWNlOiB7XG5cdDE6IFNlcmlhbGl6ZWRTdHlsZXNcblx0MjogU2VyaWFsaXplZFN0eWxlc1xuXHQzOiBTZXJpYWxpemVkU3R5bGVzXG5cdDQ6IFNlcmlhbGl6ZWRTdHlsZXNcblx0NTogU2VyaWFsaXplZFN0eWxlc1xuXHQ2OiBTZXJpYWxpemVkU3R5bGVzXG5cdDk6IFNlcmlhbGl6ZWRTdHlsZXNcblx0MTI6IFNlcmlhbGl6ZWRTdHlsZXNcblx0MjQ6IFNlcmlhbGl6ZWRTdHlsZXNcbn0gPSB7XG5cdDE6IHN0YWNrU3BhY2VTdHlsZSgxKSxcblx0Mjogc3RhY2tTcGFjZVN0eWxlKDIpLFxuXHQzOiBzdGFja1NwYWNlU3R5bGUoMyksXG5cdDQ6IHN0YWNrU3BhY2VTdHlsZSg0KSxcblx0NTogc3RhY2tTcGFjZVN0eWxlKDUpLFxuXHQ2OiBzdGFja1NwYWNlU3R5bGUoNiksXG5cdDk6IHN0YWNrU3BhY2VTdHlsZSg5KSxcblx0MTI6IHN0YWNrU3BhY2VTdHlsZSgxMiksXG5cdDI0OiBzdGFja1NwYWNlU3R5bGUoMjQpLFxufVxuIl19 */"));
  };
  var stackSpace = {
    1: stackSpaceStyle(1),
    2: stackSpaceStyle(2),
    3: stackSpaceStyle(3),
    4: stackSpaceStyle(4),
    5: stackSpaceStyle(5),
    6: stackSpaceStyle(6),
    9: stackSpaceStyle(9),
    12: stackSpaceStyle(12),
    24: stackSpaceStyle(24)
  };
  var Stack = function Stack2(_ref) {
    var cssOverrides = _ref.cssOverrides, children = _ref.children, space3 = _ref.space, props = _objectWithoutProperties(_ref, ["cssOverrides", "children", "space"]);
    return jsx("div", _extends({
      css: /* @__PURE__ */ css_browser_esm_default([stack, space3 ? stackSpace[space3] : "", cssOverrides], "label:Stack;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YWNrLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQkciLCJmaWxlIjoic3RhY2sudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IEhUTUxBdHRyaWJ1dGVzLCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHsgU2VyaWFsaXplZFN0eWxlcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHN0YWNrLCBzdGFja1NwYWNlIH0gZnJvbSBcIi4vc3R5bGVzXCJcbmltcG9ydCB7IFByb3BzIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtaGVscGVyc1wiXG5cbmV4cG9ydCB0eXBlIFN0YWNrU3BhY2UgPSAxIHwgMiB8IDMgfCA0IHwgNSB8IDYgfCA5IHwgMTIgfCAyNFxuXG5pbnRlcmZhY2UgU3RhY2tQcm9wcyBleHRlbmRzIEhUTUxBdHRyaWJ1dGVzPEhUTUxEaXZFbGVtZW50PiwgUHJvcHMge1xuXHRzcGFjZT86IFN0YWNrU3BhY2Vcblx0Y3NzT3ZlcnJpZGVzPzogU2VyaWFsaXplZFN0eWxlcyB8IFNlcmlhbGl6ZWRTdHlsZXNbXVxuXHRjaGlsZHJlbjogUmVhY3ROb2RlXG59XG5cbmNvbnN0IFN0YWNrID0gKHsgY3NzT3ZlcnJpZGVzLCBjaGlsZHJlbiwgc3BhY2UsIC4uLnByb3BzIH06IFN0YWNrUHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8ZGl2XG5cdFx0XHRjc3M9e1tzdGFjaywgc3BhY2UgPyBzdGFja1NwYWNlW3NwYWNlXSA6IFwiXCIsIGNzc092ZXJyaWRlc119XG5cdFx0XHR7Li4ucHJvcHN9XG5cdFx0PlxuXHRcdFx0e2NoaWxkcmVufVxuXHRcdDwvZGl2PlxuXHQpXG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHt9XG5cblN0YWNrLmRlZmF1bHRQcm9wcyA9IHsgLi4uZGVmYXVsdFByb3BzIH1cblxuZXhwb3J0IHsgU3RhY2sgfVxuIl19 */"))
    }, props), children);
  };
  var defaultProps$2 = {};
  Stack.defaultProps = _objectSpread2({}, defaultProps$2);
  var inline = true ? {
    name: "5aiy5h-inline",
    styles: "display:flex;flex-wrap:wrap;label:inline;"
  } : {
    name: "5aiy5h-inline",
    styles: "display:flex;flex-wrap:wrap;label:inline;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJeUIiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzLCBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSBcIkBlbW90aW9uL2NvcmVcIlxuaW1wb3J0IHsgc3BhY2UgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9uc1wiXG5pbXBvcnQgeyBJbmxpbmVTcGFjZSB9IGZyb20gXCIuL2lubGluZVwiXG5cbmV4cG9ydCBjb25zdCBpbmxpbmUgPSBjc3NgXG5cdGRpc3BsYXk6IGZsZXg7XG5cdGZsZXgtd3JhcDogd3JhcDtcbmBcblxuY29uc3QgaW5saW5lU3BhY2VTdHlsZSA9IChudW1iZXI6IElubGluZVNwYWNlKSA9PiBjc3NgXG5cdG1hcmdpbi1sZWZ0OiAtJHtzcGFjZVtudW1iZXJdfXB4O1xuXHQmID4gKiB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7c3BhY2VbbnVtYmVyXX1weDtcblx0XHRtYXJnaW4tYm90dG9tOiAke3NwYWNlW251bWJlcl19cHg7XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IGlubGluZVNwYWNlOiB7XG5cdDE6IFNlcmlhbGl6ZWRTdHlsZXNcblx0MjogU2VyaWFsaXplZFN0eWxlc1xuXHQzOiBTZXJpYWxpemVkU3R5bGVzXG5cdDQ6IFNlcmlhbGl6ZWRTdHlsZXNcblx0NTogU2VyaWFsaXplZFN0eWxlc1xuXHQ2OiBTZXJpYWxpemVkU3R5bGVzXG5cdDk6IFNlcmlhbGl6ZWRTdHlsZXNcblx0MTI6IFNlcmlhbGl6ZWRTdHlsZXNcblx0MjQ6IFNlcmlhbGl6ZWRTdHlsZXNcbn0gPSB7XG5cdDE6IGlubGluZVNwYWNlU3R5bGUoMSksXG5cdDI6IGlubGluZVNwYWNlU3R5bGUoMiksXG5cdDM6IGlubGluZVNwYWNlU3R5bGUoMyksXG5cdDQ6IGlubGluZVNwYWNlU3R5bGUoNCksXG5cdDU6IGlubGluZVNwYWNlU3R5bGUoNSksXG5cdDY6IGlubGluZVNwYWNlU3R5bGUoNiksXG5cdDk6IGlubGluZVNwYWNlU3R5bGUoOSksXG5cdDEyOiBpbmxpbmVTcGFjZVN0eWxlKDEyKSxcblx0MjQ6IGlubGluZVNwYWNlU3R5bGUoMjQpLFxufVxuIl19 */"
  };
  var inlineSpaceStyle = function inlineSpaceStyle2(number) {
    return /* @__PURE__ */ css_browser_esm_default("margin-left:-", space$12[number], "px;& > *{margin-left:", space$12[number], "px;margin-bottom:", space$12[number], "px;}" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTcUQiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzLCBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSBcIkBlbW90aW9uL2NvcmVcIlxuaW1wb3J0IHsgc3BhY2UgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9uc1wiXG5pbXBvcnQgeyBJbmxpbmVTcGFjZSB9IGZyb20gXCIuL2lubGluZVwiXG5cbmV4cG9ydCBjb25zdCBpbmxpbmUgPSBjc3NgXG5cdGRpc3BsYXk6IGZsZXg7XG5cdGZsZXgtd3JhcDogd3JhcDtcbmBcblxuY29uc3QgaW5saW5lU3BhY2VTdHlsZSA9IChudW1iZXI6IElubGluZVNwYWNlKSA9PiBjc3NgXG5cdG1hcmdpbi1sZWZ0OiAtJHtzcGFjZVtudW1iZXJdfXB4O1xuXHQmID4gKiB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7c3BhY2VbbnVtYmVyXX1weDtcblx0XHRtYXJnaW4tYm90dG9tOiAke3NwYWNlW251bWJlcl19cHg7XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IGlubGluZVNwYWNlOiB7XG5cdDE6IFNlcmlhbGl6ZWRTdHlsZXNcblx0MjogU2VyaWFsaXplZFN0eWxlc1xuXHQzOiBTZXJpYWxpemVkU3R5bGVzXG5cdDQ6IFNlcmlhbGl6ZWRTdHlsZXNcblx0NTogU2VyaWFsaXplZFN0eWxlc1xuXHQ2OiBTZXJpYWxpemVkU3R5bGVzXG5cdDk6IFNlcmlhbGl6ZWRTdHlsZXNcblx0MTI6IFNlcmlhbGl6ZWRTdHlsZXNcblx0MjQ6IFNlcmlhbGl6ZWRTdHlsZXNcbn0gPSB7XG5cdDE6IGlubGluZVNwYWNlU3R5bGUoMSksXG5cdDI6IGlubGluZVNwYWNlU3R5bGUoMiksXG5cdDM6IGlubGluZVNwYWNlU3R5bGUoMyksXG5cdDQ6IGlubGluZVNwYWNlU3R5bGUoNCksXG5cdDU6IGlubGluZVNwYWNlU3R5bGUoNSksXG5cdDY6IGlubGluZVNwYWNlU3R5bGUoNiksXG5cdDk6IGlubGluZVNwYWNlU3R5bGUoOSksXG5cdDEyOiBpbmxpbmVTcGFjZVN0eWxlKDEyKSxcblx0MjQ6IGlubGluZVNwYWNlU3R5bGUoMjQpLFxufVxuIl19 */"));
  };
  var inlineSpace = {
    1: inlineSpaceStyle(1),
    2: inlineSpaceStyle(2),
    3: inlineSpaceStyle(3),
    4: inlineSpaceStyle(4),
    5: inlineSpaceStyle(5),
    6: inlineSpaceStyle(6),
    9: inlineSpaceStyle(9),
    12: inlineSpaceStyle(12),
    24: inlineSpaceStyle(24)
  };
  var Inline = function Inline2(_ref) {
    var cssOverrides = _ref.cssOverrides, children = _ref.children, space3 = _ref.space, props = _objectWithoutProperties(_ref, ["cssOverrides", "children", "space"]);
    return jsx("div", _extends({
      css: /* @__PURE__ */ css_browser_esm_default([inline, space3 ? inlineSpace[space3] : "", cssOverrides], "label:Inline;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlubGluZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0JHIiwiZmlsZSI6ImlubGluZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgSFRNTEF0dHJpYnV0ZXMsIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSBcIkBlbW90aW9uL2NvcmVcIlxuaW1wb3J0IHsgaW5saW5lLCBpbmxpbmVTcGFjZSB9IGZyb20gXCIuL3N0eWxlc1wiXG5pbXBvcnQgeyBQcm9wcyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWhlbHBlcnNcIlxuXG5leHBvcnQgdHlwZSBJbmxpbmVTcGFjZSA9IDEgfCAyIHwgMyB8IDQgfCA1IHwgNiB8IDkgfCAxMiB8IDI0XG5cbmludGVyZmFjZSBJbmxpbmVQcm9wcyBleHRlbmRzIEhUTUxBdHRyaWJ1dGVzPEhUTUxEaXZFbGVtZW50PiwgUHJvcHMge1xuXHRzcGFjZT86IElubGluZVNwYWNlXG5cdGNzc092ZXJyaWRlcz86IFNlcmlhbGl6ZWRTdHlsZXMgfCBTZXJpYWxpemVkU3R5bGVzW11cblx0Y2hpbGRyZW46IFJlYWN0Tm9kZVxufVxuXG5jb25zdCBJbmxpbmUgPSAoeyBjc3NPdmVycmlkZXMsIGNoaWxkcmVuLCBzcGFjZSwgLi4ucHJvcHMgfTogSW5saW5lUHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8ZGl2XG5cdFx0XHRjc3M9e1tpbmxpbmUsIHNwYWNlID8gaW5saW5lU3BhY2Vbc3BhY2VdIDogXCJcIiwgY3NzT3ZlcnJpZGVzXX1cblx0XHRcdHsuLi5wcm9wc31cblx0XHQ+XG5cdFx0XHR7Y2hpbGRyZW59XG5cdFx0PC9kaXY+XG5cdClcbn1cblxuY29uc3QgZGVmYXVsdFByb3BzID0ge31cblxuSW5saW5lLmRlZmF1bHRQcm9wcyA9IHsgLi4uZGVmYXVsdFByb3BzIH1cblxuZXhwb3J0IHsgSW5saW5lIH1cbiJdfQ== */"))
    }, props), children);
  };
  var defaultProps$3 = {};
  Inline.defaultProps = _objectSpread2({}, defaultProps$3);

  // src/components/modules/banners/contributionsTemplate/ContributionsTemplateBody.tsx
  var import_react4 = __toModule(require_react());

  // node_modules/@guardian/src-foundations/typography/index.js
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var fontSizes = [12, 15, 17, 20, 24, 28, 34, 42, 50, 70];
  var fonts = {
    titlepiece: "GT Guardian Titlepiece, Georgia, serif",
    headlineSerif: "GH Guardian Headline, Guardian Egyptian Web, Georgia, serif",
    bodySerif: "GuardianTextEgyptian, Guardian Text Egyptian Web, Georgia, serif",
    bodySans: "GuardianTextSans, Guardian Text Sans Web, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif"
  };
  var lineHeights = [1.15, 1.35, 1.5];
  var fontWeights = [300, 400, 500, 700];
  var rootPixelFontSize3 = 16;
  var pxToRem5 = function pxToRem6(px) {
    return px / rootPixelFontSize3;
  };
  var titlepieceSizes = {
    small: fontSizes[7],
    medium: fontSizes[8],
    large: fontSizes[9]
  };
  var headlineSizes = {
    xxxsmall: fontSizes[2],
    xxsmall: fontSizes[3],
    xsmall: fontSizes[4],
    small: fontSizes[5],
    medium: fontSizes[6],
    large: fontSizes[7],
    xlarge: fontSizes[8]
  };
  var bodySizes = {
    small: fontSizes[1],
    medium: fontSizes[2]
  };
  var textSansSizes = {
    xsmall: fontSizes[0],
    small: fontSizes[1],
    medium: fontSizes[2],
    large: fontSizes[3],
    xlarge: fontSizes[4],
    xxlarge: fontSizes[5],
    xxxlarge: fontSizes[6]
  };
  var fontSizeMapping = {
    titlepiece: titlepieceSizes,
    headline: headlineSizes,
    body: bodySizes,
    textSans: textSansSizes
  };
  var remFontSizes = fontSizes.map(function(fontSize) {
    return pxToRem5(fontSize);
  });
  var remTitlepieceSizes = {
    small: remFontSizes[7],
    medium: remFontSizes[8],
    large: remFontSizes[9]
  };
  var remHeadlineSizes = {
    xxxsmall: remFontSizes[2],
    xxsmall: remFontSizes[3],
    xsmall: remFontSizes[4],
    small: remFontSizes[5],
    medium: remFontSizes[6],
    large: remFontSizes[7],
    xlarge: remFontSizes[8]
  };
  var remBodySizes = {
    small: remFontSizes[1],
    medium: remFontSizes[2]
  };
  var remTextSansSizes = {
    xsmall: remFontSizes[0],
    small: remFontSizes[1],
    medium: remFontSizes[2],
    large: remFontSizes[3],
    xlarge: remFontSizes[4],
    xxlarge: remFontSizes[5],
    xxxlarge: remFontSizes[6]
  };
  var remFontSizeMapping = {
    titlepiece: remTitlepieceSizes,
    headline: remHeadlineSizes,
    body: remBodySizes,
    textSans: remTextSansSizes
  };
  var fontMapping = {
    titlepiece: fonts.titlepiece,
    headline: fonts.headlineSerif,
    body: fonts.bodySerif,
    textSans: fonts.bodySans
  };
  var lineHeightMapping = {
    tight: lineHeights[0],
    regular: lineHeights[1],
    loose: lineHeights[2]
  };
  var fontWeightMapping = {
    light: fontWeights[0],
    regular: fontWeights[1],
    medium: fontWeights[2],
    bold: fontWeights[3]
  };
  var availableFonts = {
    titlepiece: {
      bold: {
        hasItalic: false
      }
    },
    headline: {
      light: {
        hasItalic: true
      },
      medium: {
        hasItalic: true
      },
      bold: {
        hasItalic: false
      }
    },
    body: {
      regular: {
        hasItalic: true
      },
      bold: {
        hasItalic: true
      }
    },
    textSans: {
      regular: {
        hasItalic: true
      },
      bold: {
        hasItalic: false
      }
    }
  };
  Object.freeze(titlepieceSizes);
  Object.freeze(headlineSizes);
  Object.freeze(bodySizes);
  Object.freeze(textSansSizes);
  Object.freeze(remTitlepieceSizes);
  Object.freeze(remHeadlineSizes);
  Object.freeze(remBodySizes);
  Object.freeze(remTextSansSizes);
  Object.freeze(fontMapping);
  Object.freeze(fontSizeMapping);
  Object.freeze(fontWeightMapping);
  Object.freeze(lineHeightMapping);
  Object.freeze(availableFonts);
  function getFontStyle(font, fontStyle) {
    switch (fontStyle) {
      case "italic":
        return font && font.hasItalic ? "italic" : null;
      case "normal":
        return "normal";
      case null:
      default:
        return null;
    }
  }
  var fs = function fs2(category) {
    return function(level, _ref) {
      var lineHeight = _ref.lineHeight, fontWeight = _ref.fontWeight, fontStyle = _ref.fontStyle, unit = _ref.unit;
      var fontFamilyValue = fontMapping[category];
      var fontSizeValue = unit === "px" ? fontSizeMapping[category][level] : "".concat(remFontSizeMapping[category][level], "rem");
      var lineHeightValue = unit === "px" ? "".concat(lineHeightMapping[lineHeight] * fontSizeMapping[category][level], "px") : lineHeightMapping[lineHeight];
      var requestedFont = availableFonts[category][fontWeight];
      var fontWeightValue = requestedFont ? fontWeightMapping[fontWeight] : "";
      var fontStyleValue = getFontStyle(requestedFont, fontStyle);
      return Object.assign({
        fontFamily: fontFamilyValue,
        fontSize: fontSizeValue,
        lineHeight: lineHeightValue
      }, fontWeightValue ? {
        fontWeight: fontWeightValue
      } : {}, fontStyleValue ? {
        fontStyle: fontStyleValue
      } : {});
    };
  };
  var titlepieceDefaults = {
    lineHeight: "tight",
    fontWeight: "bold",
    fontStyle: null,
    unit: "rem"
  };
  var titlepieceFs = fs("titlepiece");
  var titlepiece = {
    small: function small(options) {
      return titlepieceFs("small", Object.assign({}, titlepieceDefaults, options));
    },
    medium: function medium(options) {
      return titlepieceFs("medium", Object.assign({}, titlepieceDefaults, options));
    },
    large: function large(options) {
      return titlepieceFs("large", Object.assign({}, titlepieceDefaults, options));
    }
  };
  var headlineDefaults = {
    lineHeight: "tight",
    fontWeight: "medium",
    fontStyle: null,
    unit: "rem"
  };
  var headlineFs = fs("headline");
  var headline = {
    xxxsmall: function xxxsmall(options) {
      return headlineFs("xxxsmall", Object.assign({}, headlineDefaults, options));
    },
    xxsmall: function xxsmall(options) {
      return headlineFs("xxsmall", Object.assign({}, headlineDefaults, options));
    },
    xsmall: function xsmall(options) {
      return headlineFs("xsmall", Object.assign({}, headlineDefaults, options));
    },
    small: function small2(options) {
      return headlineFs("small", Object.assign({}, headlineDefaults, options));
    },
    medium: function medium2(options) {
      return headlineFs("medium", Object.assign({}, headlineDefaults, options));
    },
    large: function large2(options) {
      return headlineFs("large", Object.assign({}, headlineDefaults, options));
    },
    xlarge: function xlarge(options) {
      return headlineFs("xlarge", Object.assign({}, headlineDefaults, options));
    }
  };
  var bodyDefaults = {
    lineHeight: "loose",
    fontWeight: "regular",
    fontStyle: null,
    unit: "rem"
  };
  var bodyFs = fs("body");
  var body = {
    small: function small3(options) {
      return bodyFs("small", Object.assign({}, bodyDefaults, options));
    },
    medium: function medium3(options) {
      return bodyFs("medium", Object.assign({}, bodyDefaults, options));
    }
  };
  var textSansDefaults = {
    lineHeight: "loose",
    fontWeight: "regular",
    fontStyle: null,
    unit: "rem"
  };
  var textSansFs = fs("textSans");
  var textSans = {
    xsmall: function xsmall2(options) {
      return textSansFs("xsmall", Object.assign({}, textSansDefaults, options));
    },
    small: function small4(options) {
      return textSansFs("small", Object.assign({}, textSansDefaults, options));
    },
    medium: function medium4(options) {
      return textSansFs("medium", Object.assign({}, textSansDefaults, options));
    },
    large: function large3(options) {
      return textSansFs("large", Object.assign({}, textSansDefaults, options));
    },
    xlarge: function xlarge2(options) {
      return textSansFs("xlarge", Object.assign({}, textSansDefaults, options));
    },
    xxlarge: function xxlarge(options) {
      return textSansFs("xxlarge", Object.assign({}, textSansDefaults, options));
    },
    xxxlarge: function xxxlarge(options) {
      return textSansFs("xxxlarge", Object.assign({}, textSansDefaults, options));
    }
  };
  var objectStylesToString = function objectStylesToString2(_ref) {
    var fontFamily = _ref.fontFamily, fontSize = _ref.fontSize, lineHeight = _ref.lineHeight, fontWeight = _ref.fontWeight, fontStyle = _ref.fontStyle;
    return "\n	font-family: ".concat(fontFamily, ";\n	font-size: ").concat(typeof fontSize === "number" ? "".concat(fontSize, "px") : fontSize, ";\n	line-height: ").concat(lineHeight, ";\n	").concat(fontWeight ? "font-weight: ".concat(fontWeight) : "", ";\n	").concat(fontStyle ? "font-style: ".concat(fontStyle) : "", ";\n");
  };
  var fromEntries = function fromEntries2(entries) {
    return entries.reduce(function(acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
      acc[key] = value;
      return acc;
    }, {});
  };
  var titlepiece$1 = fromEntries(Object.entries(titlepiece).map(function(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2), key = _ref4[0], func = _ref4[1];
    return [key, function(options) {
      return objectStylesToString(func(options));
    }];
  }));
  var headline$1 = fromEntries(Object.entries(headline).map(function(_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2), key = _ref6[0], func = _ref6[1];
    return [key, function(options) {
      return objectStylesToString(func(options));
    }];
  }));
  var body$1 = fromEntries(Object.entries(body).map(function(_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2), key = _ref8[0], func = _ref8[1];
    return [key, function(options) {
      return objectStylesToString(func(options));
    }];
  }));
  var textSans$1 = fromEntries(Object.entries(textSans).map(function(_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2), key = _ref10[0], func = _ref10[1];
    return [key, function(options) {
      return objectStylesToString(func(options));
    }];
  }));

  // src/components/modules/banners/contributionsTemplate/ContributionsTemplateBody.tsx
  var container3 = css_browser_esm_default`
    ${body$1.medium()}
`;
  var ContributionsTemplateBody = ({
    copy
  }) => /* @__PURE__ */ import_react4.default.createElement("div", {
    css: container3
  }, copy);
  var ContributionsTemplateBody_default = ContributionsTemplateBody;

  // src/lib/geolocation.ts
  var countryGroups = {
    GBPCountries: {
      name: "United Kingdom",
      currency: "GBP",
      countries: ["GB", "FK", "GI", "GG", "IM", "JE", "SH"],
      supportRegionId: "UK"
    },
    UnitedStates: {
      name: "United States",
      currency: "USD",
      countries: ["US"],
      supportRegionId: "US"
    },
    AUDCountries: {
      name: "Australia",
      currency: "AUD",
      countries: ["AU", "KI", "NR", "NF", "TV"],
      supportRegionId: "AU"
    },
    EURCountries: {
      name: "Europe",
      currency: "EUR",
      countries: [
        "AD",
        "AL",
        "AT",
        "BA",
        "BE",
        "BG",
        "BL",
        "CH",
        "CY",
        "CZ",
        "DE",
        "DK",
        "EE",
        "ES",
        "FI",
        "FO",
        "FR",
        "GF",
        "GL",
        "GP",
        "GR",
        "HR",
        "HU",
        "IE",
        "IT",
        "LI",
        "LT",
        "LU",
        "LV",
        "MC",
        "ME",
        "MF",
        "IS",
        "MQ",
        "MT",
        "NL",
        "NO",
        "PF",
        "PL",
        "PM",
        "PT",
        "RE",
        "RO",
        "RS",
        "SE",
        "SI",
        "SJ",
        "SK",
        "SM",
        "TF",
        "TR",
        "WF",
        "YT",
        "VA",
        "AX"
      ],
      supportRegionId: "EU"
    },
    International: {
      name: "International",
      currency: "USD",
      countries: [
        "AE",
        "AF",
        "AG",
        "AI",
        "AM",
        "AO",
        "AQ",
        "AR",
        "AS",
        "AW",
        "AZ",
        "BB",
        "BD",
        "BF",
        "BH",
        "BI",
        "BJ",
        "BM",
        "BN",
        "BO",
        "BQ",
        "BR",
        "BS",
        "BT",
        "BV",
        "BW",
        "BY",
        "BZ",
        "CC",
        "CD",
        "CF",
        "CG",
        "CI",
        "CL",
        "CM",
        "CN",
        "CO",
        "CR",
        "CU",
        "CV",
        "CW",
        "CX",
        "DJ",
        "DM",
        "DO",
        "DZ",
        "EC",
        "EG",
        "EH",
        "ER",
        "ET",
        "FJ",
        "FM",
        "GA",
        "GD",
        "GE",
        "GH",
        "GM",
        "GN",
        "GQ",
        "GS",
        "GT",
        "GU",
        "GW",
        "GY",
        "HK",
        "HM",
        "HN",
        "HT",
        "ID",
        "IL",
        "IN",
        "IO",
        "IQ",
        "IR",
        "JM",
        "JO",
        "JP",
        "KE",
        "KG",
        "KH",
        "KM",
        "KN",
        "KP",
        "KR",
        "KW",
        "KY",
        "KZ",
        "LA",
        "LB",
        "LC",
        "LK",
        "LR",
        "LS",
        "LY",
        "MA",
        "MD",
        "MG",
        "MH",
        "MK",
        "ML",
        "MM",
        "MN",
        "MO",
        "MP",
        "MR",
        "MS",
        "MU",
        "MV",
        "MW",
        "MX",
        "MY",
        "MZ",
        "NA",
        "NC",
        "NE",
        "NG",
        "NI",
        "NP",
        "NU",
        "OM",
        "PA",
        "PE",
        "PG",
        "PH",
        "PK",
        "PN",
        "PR",
        "PS",
        "PW",
        "PY",
        "QA",
        "RU",
        "RW",
        "SA",
        "SB",
        "SC",
        "SD",
        "SG",
        "SL",
        "SN",
        "SO",
        "SR",
        "SS",
        "ST",
        "SV",
        "SX",
        "SY",
        "SZ",
        "TC",
        "TD",
        "TG",
        "TH",
        "TJ",
        "TK",
        "TL",
        "TM",
        "TN",
        "TO",
        "TT",
        "TW",
        "TZ",
        "UA",
        "UG",
        "UM",
        "UY",
        "UZ",
        "VC",
        "VE",
        "VG",
        "VI",
        "VN",
        "VU",
        "WS",
        "YE",
        "ZA",
        "ZM",
        "ZW"
      ],
      supportRegionId: "INT"
    },
    NZDCountries: {
      name: "New Zealand",
      currency: "NZD",
      countries: ["NZ", "CK"],
      supportRegionId: "NZ"
    },
    Canada: {
      name: "Canada",
      currency: "CAD",
      countries: ["CA"],
      supportRegionId: "CA"
    }
  };
  var countryNames = {
    GB: "the UK",
    US: "the US",
    AU: "Australia",
    CA: "Canada",
    DE: "Germany",
    NZ: "New Zealand",
    FR: "France",
    NL: "the Netherlands",
    IE: "Ireland",
    SE: "Sweden",
    CH: "Switzerland",
    NO: "Norway",
    BE: "Belgium",
    IT: "Italy",
    IN: "India",
    ES: "Spain",
    DK: "Denmark",
    SG: "Singapore",
    AT: "Austria",
    FI: "Finland",
    HK: "Hong Kong",
    LU: "Luxembourg",
    PT: "Portugal",
    AE: "the UAE",
    MX: "Mexico",
    BR: "Brazil",
    ZA: "South Africa",
    TW: "Taiwan",
    IL: "Israel",
    JP: "Japan",
    CZ: "the Czech Republic",
    GR: "Greece",
    IS: "Iceland",
    TH: "Thailand",
    MY: "Malaysia",
    RO: "Romania",
    PL: "Poland",
    HU: "Hungary",
    TR: "Turkey",
    KR: "Korea",
    SI: "Slovenia",
    CL: "Chile",
    CO: "Colombia",
    QA: "Qatar",
    HR: "Croatia",
    SK: "Slovakia",
    ID: "Indonesia",
    VN: "Vietnam",
    CN: "China",
    MT: "Malta",
    AR: "Argentina",
    KE: "Kenya",
    PR: "Puerto Rico",
    RU: "Russia",
    EE: "Estonia",
    CR: "Costa Rica",
    PA: "Panama"
  };
  var extendedCurrencySymbol = {
    GBPCountries: "\xA3",
    UnitedStates: "$",
    AUDCountries: "$",
    Canada: "CA$",
    EURCountries: "\u20AC",
    NZDCountries: "NZ$",
    International: "$"
  };
  var countryCodeToCountryGroupId = (countryCode) => {
    const availableCountryGroupIds = Object.keys(countryGroups);
    const foundCountryGroupId = availableCountryGroupIds.find((countryGroupId) => countryGroups[countryGroupId].countries.includes(countryCode));
    return foundCountryGroupId || "International";
  };
  var defaultCurrencySymbol = "\xA3";
  var getLocalCurrencySymbol = (geolocation) => {
    if (geolocation) {
      const countryGroupId = countryCodeToCountryGroupId(geolocation);
      return extendedCurrencySymbol[countryGroupId];
    }
    return defaultCurrencySymbol;
  };
  var getCountryName = (geolocation) => {
    if (geolocation) {
      return countryNames[geolocation];
    }
    return void 0;
  };
  var countryCodeToSupportRegionId = (countryCode) => countryGroups[countryCodeToCountryGroupId(countryCode)]?.supportRegionId;
  var addRegionIdToSupportUrl = (originalUrl, countryCode) => {
    if (countryCode) {
      const supportRegionId = countryCodeToSupportRegionId(countryCode);
      if (supportRegionId) {
        return originalUrl.replace(/(support.theguardian.com)\/(contribute|subscribe)/, (_, domain, path) => `${domain}/${supportRegionId.toLowerCase()}/${path}`);
      }
    }
    return originalUrl;
  };

  // src/lib/placeholders.ts
  var replaceNonArticleCountPlaceholders = (content, countryCode) => {
    if (!content) {
      return "";
    }
    content = content.replace(/%%CURRENCY_SYMBOL%%/g, getLocalCurrencySymbol(countryCode));
    const countryName = getCountryName(countryCode) ?? "";
    content = countryName ? content.replace(/%%COUNTRY_NAME%%/g, countryName) : content;
    return content;
  };

  // src/lib/replaceArticleCount.tsx
  var import_react10 = __toModule(require_react());

  // src/components/modules/shared/ArticleCountOptOut.tsx
  var import_react9 = __toModule(require_react());

  // src/lib/cookies.ts
  var ERR_INVALID_COOKIE_NAME = `Cookie must not contain invalid characters (space, tab and the following characters: '()<>@,;"/[]?={}')`;
  var isValidCookieValue = (name) => !/[()<>@,;"\\/[\]?={} \t]/g.test(name);
  var getShortDomain = (isCrossSubdomain = false) => {
    const domain = document.domain || "";
    if (domain === "localhost") {
      return domain;
    }
    if (isCrossSubdomain) {
      return ["", ...domain.split(".").slice(-2)].join(".");
    }
    return domain.replace(/^(www|m\.code|dev|m)\./, ".");
  };
  var getDomainAttribute = (isCrossSubdomain = false) => {
    const shortDomain = getShortDomain(isCrossSubdomain);
    return shortDomain === "localhost" ? "" : ` domain=${shortDomain};`;
  };
  var addCookie = (name, value, daysToLive, isCrossSubdomain = false) => {
    const expires = new Date();
    if (!isValidCookieValue(name) || !isValidCookieValue(value)) {
      throw new Error(`${ERR_INVALID_COOKIE_NAME} .${name}=${value}`);
    }
    if (daysToLive) {
      expires.setDate(expires.getDate() + daysToLive);
    } else {
      expires.setMonth(expires.getMonth() + 5);
      expires.setDate(1);
    }
    document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()};${getDomainAttribute(isCrossSubdomain)}`;
  };

  // src/components/modules/shared/ArticleCountOptOutOverlay.tsx
  var import_react8 = __toModule(require_react());

  // node_modules/@guardian/src-foundations/palette/index.js
  var colors4 = {
    reds: [
      "#660505",
      "#8B0000",
      "#AB0613",
      "#C70000",
      "#FF5943",
      "#FFBAC8",
      "#FFF4F2",
      "#FF9081"
    ],
    oranges: [
      "#672005",
      "#8D2700",
      "#BD5318",
      "#E05E00",
      "#FF7F0F",
      "#F9B376",
      "#FEF9F5"
    ],
    blues: [
      "#003C60",
      "#004E7C",
      "#005689",
      "#0084C6",
      "#00B2FF",
      "#90DCFF",
      "#F1F8FC",
      "#001536",
      "#041F4A",
      "#052962",
      "#007ABC",
      "#506991",
      "#C1D8FC"
    ],
    browns: [
      "#3E3323",
      "#574835",
      "#6B5840",
      "#A1845C",
      "#EACCA0",
      "#E7D4B9",
      "#FBF6EF"
    ],
    pinks: [
      "#510043",
      "#650054",
      "#7D0068",
      "#BB3B80",
      "#FFABDB",
      "#FEC8D3",
      "#FEEEF7"
    ],
    yellows: [
      "#F3C100",
      "#FFD900",
      "#FFE500"
    ],
    greens: [
      "#185E36",
      "#22874D",
      "#58D08B",
      "#4B8878",
      "#65A897",
      "#69D1CA"
    ],
    grays: [
      "#000000",
      "#121212",
      "#1A1A1A",
      "#333333",
      "#767676",
      "#999999",
      "#DCDCDC",
      "#EDEDED",
      "#F6F6F6",
      "#FFFFFF",
      "#222527",
      "#303538",
      "#3F464A",
      "#63717A",
      "#ABC2C9",
      "#33393D"
    ]
  };
  var brand4 = {
    100: colors4.blues[7],
    300: colors4.blues[8],
    400: colors4.blues[9],
    500: colors4.blues[10],
    600: colors4.blues[11],
    800: colors4.blues[12],
    dark: colors4.blues[8],
    main: colors4.blues[9],
    bright: colors4.blues[10],
    pastel: colors4.blues[11],
    faded: colors4.blues[12]
  };
  var brandAlt4 = {
    200: colors4.yellows[0],
    300: colors4.yellows[1],
    400: colors4.yellows[2],
    dark: colors4.yellows[1],
    main: colors4.yellows[2]
  };
  var neutral4 = {
    0: colors4.grays[0],
    7: colors4.grays[1],
    10: colors4.grays[2],
    20: colors4.grays[3],
    46: colors4.grays[4],
    60: colors4.grays[5],
    86: colors4.grays[6],
    93: colors4.grays[7],
    97: colors4.grays[8],
    100: colors4.grays[9]
  };
  var error4 = {
    400: colors4.reds[3],
    500: colors4.reds[7],
    main: colors4.reds[3],
    bright: colors4.reds[7]
  };
  var success4 = {
    400: colors4.greens[1],
    500: colors4.greens[2],
    main: colors4.greens[1]
  };
  var news4 = {
    100: colors4.reds[0],
    200: colors4.reds[1],
    300: colors4.reds[2],
    400: colors4.reds[3],
    500: colors4.reds[4],
    600: colors4.reds[5],
    800: colors4.reds[6],
    dark: colors4.reds[2],
    main: colors4.reds[3],
    bright: colors4.reds[4],
    pastel: colors4.reds[5],
    faded: colors4.reds[6]
  };
  var opinion4 = {
    100: colors4.oranges[0],
    200: colors4.oranges[1],
    300: colors4.oranges[2],
    400: colors4.oranges[3],
    500: colors4.oranges[4],
    600: colors4.oranges[5],
    800: colors4.oranges[6],
    dark: colors4.oranges[2],
    main: colors4.oranges[3],
    bright: colors4.oranges[4],
    pastel: colors4.oranges[5],
    faded: colors4.oranges[6]
  };
  var sport4 = {
    100: colors4.blues[0],
    200: colors4.blues[1],
    300: colors4.blues[2],
    400: colors4.blues[3],
    500: colors4.blues[4],
    600: colors4.blues[5],
    800: colors4.blues[6],
    dark: colors4.blues[2],
    main: colors4.blues[3],
    bright: colors4.blues[4],
    pastel: colors4.blues[5],
    faded: colors4.blues[6]
  };
  var culture4 = {
    100: colors4.browns[0],
    200: colors4.browns[1],
    300: colors4.browns[2],
    400: colors4.browns[3],
    500: colors4.browns[4],
    600: colors4.browns[5],
    800: colors4.browns[6],
    dark: colors4.browns[2],
    main: colors4.browns[3],
    bright: colors4.browns[4],
    pastel: colors4.browns[5],
    faded: colors4.browns[6]
  };
  var lifestyle4 = {
    100: colors4.pinks[0],
    200: colors4.pinks[1],
    300: colors4.pinks[2],
    400: colors4.pinks[3],
    500: colors4.pinks[4],
    600: colors4.pinks[5],
    800: colors4.pinks[6],
    dark: colors4.pinks[2],
    main: colors4.pinks[3],
    bright: colors4.pinks[4],
    pastel: colors4.pinks[5],
    faded: colors4.pinks[6]
  };
  var labs4 = {
    200: colors4.greens[3],
    300: colors4.greens[4],
    400: colors4.greens[5],
    dark: colors4.greens[4],
    main: colors4.greens[5]
  };
  var specialReport4 = {
    100: colors4.grays[10],
    200: colors4.grays[11],
    300: colors4.grays[12],
    400: colors4.grays[13],
    500: colors4.grays[14]
  };
  var dynamo4 = {
    400: colors4.grays[15]
  };
  var background4 = {
    primary: neutral4[100],
    secondary: neutral4[97],
    inverse: neutral4[10],
    ctaPrimary: brand4[400],
    ctaPrimaryHover: "#234B8A",
    ctaSecondary: brand4[800],
    ctaSecondaryHover: "#ACC9F7",
    ctaTertiaryHover: "#E5E5E5",
    input: neutral4[100],
    inputChecked: brand4[500]
  };
  var brandBackground4 = {
    primary: brand4[400],
    inputChecked: neutral4[100],
    ctaPrimary: neutral4[100],
    ctaPrimaryHover: "#E0E0E0",
    ctaSecondary: brand4[600],
    ctaSecondaryHover: "#234B8A",
    ctaTertiaryHover: brand4[300]
  };
  var brandAltBackground4 = {
    primary: brandAlt4[400],
    ctaPrimary: neutral4[7],
    ctaPrimaryHover: "#454545",
    ctaSecondary: brandAlt4[200],
    ctaSecondaryHover: "#F2AE00",
    ctaTertiaryHover: "#FFD213"
  };
  var border4 = {
    primary: neutral4[60],
    secondary: neutral4[86],
    success: success4[400],
    error: error4[400],
    ctaTertiary: brand4[400],
    input: neutral4[60],
    inputChecked: brand4[500],
    inputHover: brand4[500],
    inputActive: brand4[500],
    focusHalo: sport4[500]
  };
  var brandBorder4 = {
    primary: brand4[800],
    success: success4[500],
    error: error4[500],
    ctaTertiary: neutral4[100],
    input: brand4[800],
    inputChecked: neutral4[100],
    inputHover: neutral4[100]
  };
  var brandAltBorder4 = {
    ctaTertiary: neutral4[7]
  };
  var line4 = {
    primary: neutral4[86]
  };
  var brandLine4 = {
    primary: brand4[600]
  };
  var brandAltLine4 = {
    primary: neutral4[7]
  };
  var text4 = {
    primary: neutral4[7],
    supporting: neutral4[46],
    success: success4[400],
    error: error4[400],
    ctaPrimary: neutral4[100],
    ctaSecondary: brand4[400],
    ctaTertiary: brand4[400],
    anchorPrimary: brand4[500],
    anchorSecondary: neutral4[7],
    userInput: neutral4[7],
    inputLabel: neutral4[7],
    inputLabelSupporting: neutral4[46],
    inputChecked: brand4[400],
    inputHover: brand4[400],
    groupLabel: neutral4[7],
    groupLabelSupporting: neutral4[46]
  };
  var brandText4 = {
    primary: neutral4[100],
    supporting: brand4[800],
    success: success4[500],
    error: error4[500],
    ctaPrimary: brand4[400],
    ctaSecondary: neutral4[100],
    ctaTertiary: neutral4[100],
    anchorPrimary: neutral4[100],
    userInput: neutral4[100],
    inputLabel: neutral4[100],
    inputLabelSupporting: brand4[800]
  };
  var brandAltText4 = {
    primary: neutral4[7],
    supporting: neutral4[60],
    ctaPrimary: neutral4[100],
    ctaSecondary: neutral4[7],
    ctaTertiary: neutral4[7],
    anchorPrimary: neutral4[7]
  };

  // node_modules/@guardian/src-button/dist/button.esm.js
  var import_react5 = __toModule(require_react());

  // node_modules/@guardian/src-foundations/accessibility/index.js
  var visuallyHidden = "\n	position: absolute;\n	opacity: 0;\n	height: 0;\n	width: 0;\n	top: 0;\n	left: 0;\n";
  var focusHalo = "\n	outline: 0;\n	html:not(.src-focus-disabled) & {\n		box-shadow: 0 0 0 5px ".concat(border4.focusHalo, ";\n		z-index: 9;\n	}\n");

  // node_modules/@guardian/src-foundations/size/index.js
  var size2 = [24, 36, 44];
  var rootPixelFontSize4 = 16;
  var pxToRem7 = function pxToRem8(px) {
    return px / rootPixelFontSize4;
  };
  var size$12 = {
    xsmall: size2[0],
    small: size2[1],
    medium: size2[2]
  };
  var remSize = {
    xsmall: pxToRem7(size2[0]),
    small: pxToRem7(size2[1]),
    medium: pxToRem7(size2[2])
  };
  var iconSize = {
    xsmall: 20,
    small: 26,
    medium: 30
  };
  var remIconSize = {
    xsmall: pxToRem7(20),
    small: pxToRem7(26),
    medium: pxToRem7(30)
  };
  var height = {
    ctaMedium: size$12.medium,
    ctaSmall: size$12.small,
    ctaXsmall: size$12.xsmall,
    inputMedium: size$12.medium,
    inputXsmall: size$12.xsmall,
    iconMedium: iconSize.medium,
    iconSmall: iconSize.small,
    iconXsmall: iconSize.xsmall
  };
  var remHeight = {
    ctaMedium: remSize.medium,
    ctaSmall: remSize.small,
    ctaXsmall: remSize.xsmall,
    inputMedium: remSize.medium,
    inputXsmall: remSize.xsmall,
    iconMedium: remIconSize.medium,
    iconSmall: remIconSize.small,
    iconXsmall: remIconSize.xsmall
  };
  var width = {
    ctaMedium: size$12.medium,
    ctaSmall: size$12.small,
    ctaXsmall: size$12.xsmall,
    inputXsmall: size$12.xsmall,
    iconMedium: iconSize.medium,
    iconSmall: iconSize.small,
    iconXsmall: iconSize.xsmall
  };
  var remWidth = {
    ctaMedium: remSize.medium,
    ctaSmall: remSize.small,
    ctaXsmall: remSize.xsmall,
    inputXsmall: remSize.xsmall,
    iconMedium: remIconSize.medium,
    iconSmall: remIconSize.small,
    iconXsmall: remIconSize.xsmall
  };

  // node_modules/@guardian/src-foundations/themes/index.js
  function _defineProperty2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function ownKeys2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread22(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys2(Object(source), true).forEach(function(key) {
          _defineProperty2(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys2(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  var accordionDefault = {
    accordion: {
      textPrimary: text4.primary,
      borderPrimary: border4.primary
    }
  };
  var buttonDefault = {
    button: {
      textPrimary: text4.ctaPrimary,
      backgroundPrimary: background4.ctaPrimary,
      backgroundPrimaryHover: background4.ctaPrimaryHover,
      textSecondary: text4.ctaSecondary,
      backgroundSecondary: background4.ctaSecondary,
      backgroundSecondaryHover: background4.ctaSecondaryHover,
      textTertiary: text4.ctaTertiary,
      backgroundTertiaryHover: background4.ctaTertiaryHover,
      borderTertiary: border4.ctaTertiary,
      textSubdued: text4.ctaSecondary
    }
  };
  var buttonBrand = {
    button: {
      textPrimary: brandText4.ctaPrimary,
      backgroundPrimary: brandBackground4.ctaPrimary,
      backgroundPrimaryHover: brandBackground4.ctaPrimaryHover,
      textSecondary: brandText4.ctaSecondary,
      backgroundSecondary: brandBackground4.ctaSecondary,
      backgroundSecondaryHover: brandBackground4.ctaSecondaryHover,
      textTertiary: brandText4.ctaTertiary,
      backgroundTertiaryHover: brandBackground4.ctaTertiaryHover,
      borderTertiary: brandBorder4.ctaTertiary,
      textSubdued: brandText4.ctaSecondary
    }
  };
  var buttonBrandAlt = {
    button: {
      textPrimary: brandAltText4.ctaPrimary,
      backgroundPrimary: brandAltBackground4.ctaPrimary,
      backgroundPrimaryHover: brandAltBackground4.ctaPrimaryHover,
      textSecondary: brandAltText4.ctaSecondary,
      backgroundSecondary: brandAltBackground4.ctaSecondary,
      backgroundSecondaryHover: brandAltBackground4.ctaSecondaryHover,
      textTertiary: brandAltText4.ctaTertiary,
      backgroundTertiaryHover: brandAltBackground4.ctaTertiaryHover,
      borderTertiary: brandAltBorder4.ctaTertiary,
      textSubdued: brandAltText4.ctaSecondary
    }
  };
  var buttonLight = buttonDefault;
  var buttonBrandYellow = buttonBrandAlt;
  var userFeedbackDefault = {
    userFeedback: {
      textSuccess: text4.success,
      textError: text4.error
    }
  };
  var userFeedbackBrand = {
    userFeedback: {
      textSuccess: brandText4.success,
      textError: brandText4.error
    }
  };
  var checkboxDefault = _objectSpread22({
    checkbox: {
      border: border4.input,
      borderHover: border4.inputHover,
      borderChecked: border4.inputChecked,
      borderError: border4.error,
      backgroundChecked: background4.inputChecked,
      textLabel: text4.inputLabel,
      textLabelSupporting: text4.inputLabelSupporting,
      textIndeterminate: text4.supporting
    }
  }, userFeedbackDefault);
  var checkboxBrand = _objectSpread22({
    checkbox: {
      border: brandBorder4.input,
      borderHover: brandBorder4.inputHover,
      borderChecked: brandBorder4.inputChecked,
      borderError: brandBorder4.error,
      backgroundChecked: brandBackground4.inputChecked,
      textLabel: brandText4.inputLabel,
      textLabelSupporting: brandText4.inputLabelSupporting,
      textIndeterminate: brandText4.supporting
    }
  }, userFeedbackBrand);
  var checkboxLight = checkboxDefault;
  var choiceCardDefault = _objectSpread22({
    choiceCard: {
      textLabel: text4.supporting,
      textLabelSupporting: text4.supporting,
      textGroupLabel: text4.groupLabel,
      textGroupLabelSupporting: text4.groupLabelSupporting,
      border: border4.input,
      textChecked: text4.inputChecked,
      backgroundChecked: "#E3F6FF",
      backgroundTick: background4.inputChecked,
      borderChecked: border4.inputChecked,
      textHover: text4.inputHover,
      borderHover: border4.inputHover,
      textError: text4.error,
      borderError: border4.error
    }
  }, userFeedbackDefault);
  var inlineErrorDefault = {
    inlineError: {
      text: text4.error
    }
  };
  var inlineErrorBrand = {
    inlineError: {
      text: brandText4.error
    }
  };
  var inlineErrorLight = inlineErrorDefault;
  var linkDefault = {
    link: {
      textPrimary: text4.anchorPrimary,
      textPrimaryHover: text4.anchorPrimary,
      textSecondary: text4.anchorSecondary,
      textSecondaryHover: text4.anchorSecondary
    }
  };
  var linkBrand = {
    link: {
      textPrimary: brandText4.anchorPrimary,
      textPrimaryHover: brandText4.anchorPrimary
    }
  };
  var linkBrandAlt = {
    link: {
      textPrimary: brandAltText4.anchorPrimary,
      textPrimaryHover: brandAltText4.anchorPrimary
    }
  };
  var linkLight = linkDefault;
  var linkBrandYellow = linkBrandAlt;
  var radioDefault = _objectSpread22({
    radio: {
      borderHover: border4.inputHover,
      border: border4.input,
      backgroundChecked: background4.inputChecked,
      textLabel: text4.inputLabel,
      textLabelSupporting: text4.inputLabelSupporting,
      borderError: border4.error
    }
  }, userFeedbackDefault);
  var radioBrand = _objectSpread22({
    radio: {
      borderHover: brandBorder4.inputHover,
      border: brandBorder4.input,
      backgroundChecked: brandBackground4.inputChecked,
      textLabel: brandText4.inputLabel,
      textLabelSupporting: brandText4.supporting,
      borderError: brandBorder4.error
    }
  }, userFeedbackBrand);
  var radioLight = radioDefault;
  var selectDefault = _objectSpread22({
    select: {
      textUserInput: text4.userInput,
      textLabel: text4.inputLabel,
      textLabelOptional: text4.supporting,
      textLabelSupporting: text4.supporting,
      textError: text4.error,
      textSuccess: text4.success,
      backgroundInput: background4.input,
      border: border4.input,
      borderActive: border4.inputActive,
      borderError: border4.error,
      borderSuccess: border4.success
    }
  }, userFeedbackDefault);
  var textInputDefault = _objectSpread22({
    textInput: {
      textUserInput: text4.userInput,
      textLabel: text4.inputLabel,
      textLabelOptional: text4.supporting,
      textLabelSupporting: text4.supporting,
      textError: text4.error,
      textSuccess: text4.success,
      backgroundInput: background4.input,
      border: border4.input,
      borderActive: border4.inputActive,
      borderError: border4.error,
      borderSuccess: border4.success
    }
  }, userFeedbackDefault);
  var textInputLight = textInputDefault;
  var defaultTheme = _objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22({}, buttonDefault), checkboxDefault), choiceCardDefault), inlineErrorDefault), linkDefault), radioDefault), textInputDefault), userFeedbackDefault), buttonLight), checkboxLight), inlineErrorLight), linkLight), radioLight), textInputLight);
  var brand5 = _objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22({}, buttonBrand), checkboxBrand), inlineErrorBrand), linkBrand), radioBrand), userFeedbackBrand);
  var brandAlt5 = _objectSpread22(_objectSpread22(_objectSpread22(_objectSpread22({}, buttonBrandAlt), linkBrandAlt), buttonBrandYellow), linkBrandYellow);

  // node_modules/@guardian/src-button/dist/button.esm.js
  function _defineProperty3(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends2() {
    _extends2 = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends2.apply(this, arguments);
  }
  function ownKeys3(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread23(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys3(Object(source), true).forEach(function(key) {
          _defineProperty3(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys3(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _objectWithoutPropertiesLoose2(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties2(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose2(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  var SvgArrowRightStraight = function SvgArrowRightStraight2() {
    return /* @__PURE__ */ import_react5.default.createElement("svg", {
      viewBox: "0 0 30 30",
      xmlns: "http://www.w3.org/2000/svg"
    }, /* @__PURE__ */ import_react5.default.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M4 15.95h19.125l-7.5 8.975.975.975 10.425-10.45v-1L16.6 4l-.975.975 7.5 8.975H4v2z"
    }));
  };
  var button = /* @__PURE__ */ css_browser_esm_default("display:inline-flex;justify-content:space-between;align-items:center;box-sizing:border-box;border:none;background:transparent;cursor:pointer;transition:", transitions$1.medium, ";text-decoration:none;white-space:nowrap;&:focus{", focusHalo, ";}label:button;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPeUIiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSBcIkBlbW90aW9uL2NvcmVcIlxuaW1wb3J0IHsgc3BhY2UsIHRyYW5zaXRpb25zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnNcIlxuaW1wb3J0IHsgaGVpZ2h0LCB3aWR0aCB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL3NpemVcIlxuaW1wb3J0IHsgYnV0dG9uRGVmYXVsdCwgQnV0dG9uVGhlbWUgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy90aGVtZXNcIlxuaW1wb3J0IHsgdGV4dFNhbnMgfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy90eXBvZ3JhcGh5XCJcbmltcG9ydCB7IGZvY3VzSGFsbyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL2FjY2Vzc2liaWxpdHlcIlxuXG5leHBvcnQgY29uc3QgYnV0dG9uID0gY3NzYFxuXHRkaXNwbGF5OiBpbmxpbmUtZmxleDtcblx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRib3JkZXI6IG5vbmU7XG5cdGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuXHRjdXJzb3I6IHBvaW50ZXI7XG5cdHRyYW5zaXRpb246ICR7dHJhbnNpdGlvbnMubWVkaXVtfTtcblx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xuXHR3aGl0ZS1zcGFjZTogbm93cmFwO1xuXG5cdCY6Zm9jdXMge1xuXHRcdCR7Zm9jdXNIYWxvfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgcHJpbWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kUHJpbWFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0UHJpbWFyeX07XG5cblx0Jjpob3ZlciB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnlIb3Zlcn07XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHNlY29uZGFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5fTtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTZWNvbmRhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRTZWNvbmRhcnlIb3Zlcn07XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHRlcnRpYXJ5ID0gKHtcblx0YnV0dG9uLFxufTogeyBidXR0b246IEJ1dHRvblRoZW1lIH0gPSBidXR0b25EZWZhdWx0KSA9PiBjc3NgXG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0VGVydGlhcnl9O1xuXHRib3JkZXI6IDFweCBzb2xpZCAke2J1dHRvbi5ib3JkZXJUZXJ0aWFyeX07XG5cblx0Jjpob3ZlciB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFRlcnRpYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzdWJkdWVkID0gKHtcblx0YnV0dG9uLFxufTogeyBidXR0b246IEJ1dHRvblRoZW1lIH0gPSBidXR0b25EZWZhdWx0KSA9PiBjc3NgXG5cdHBhZGRpbmc6IDA7XG5cdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFN1YmR1ZWR9O1xuXG5cdCY6aG92ZXIge1xuXHRcdHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuXHR9XG5cblx0LyogV2h5IGlzIHRoaXMgemVybz8gQmVjYXVzZSB0aGUgZGVmYXVsdCBpcyB0byBoYXZlIHJvdW5kZWQgY29ybmVycyBidXQgaGVyZSwgd2hlblxuXHQgICB0aGVyZSBpcyBvbmx5IHRleHQsIGl0IGlzIG1vcmUgbmF0dXJhbCB0byBzaG93IGEgcmVjdGFuZ2xlIGZvciB0aGUgZm9jdXMgaGFsbyAqL1xuXHRib3JkZXItcmFkaXVzOiAwO1xuYFxuXG4vKlxuXHRHdWFyZGlhbiBUZXh0IFNhbnMgYXBwZWFycyB0byBiZSBlbmNvZGVkIHdpdGggc2xpZ2h0bHkgbW9yZSBzcGFjZSBhYm92ZSB0aGUgbGV0dGVyaW5nXG5cdHRoYW4gYmVsb3cuIFdlIGFkZCBhIHNtYWxsIGFtb3VudCBvZiBwYWRkaW5nIHRvIHRoZSBib3R0b20gb2YgdGhlIGJ1dHRvbiB0byBlbnN1cmVcblx0dGhlIGJ1dHRvbiBsYWJlbCBpcyB2ZXJ0aWNhbGx5IGNlbnRyZWQgdmlzdWFsbHkuXG5cdFRPRE86IGZpbmQgYSBtb3JlIHNjYWxhYmxlIHNvbHV0aW9uIHRvIHRoaXMgKHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL2hvdy10by10YW1lLWxpbmUtaGVpZ2h0LWluLWNzcy8pXG4qL1xuY29uc3QgZm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldCA9IGNzc2Bcblx0cGFkZGluZy1ib3R0b206IDJweDtcbmBcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdG1pbi1oZWlnaHQ6ICR7aGVpZ2h0LmN0YU1lZGl1bX1weDtcblx0cGFkZGluZzogMCAke3NwYWNlWzVdfXB4O1xuXHRib3JkZXItcmFkaXVzOiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCBzbWFsbFNpemUgPSBjc3NgXG5cdCR7dGV4dFNhbnMubWVkaXVtKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVNtYWxsfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0cGFkZGluZzogMCAke3NwYWNlWzRdfXB4O1xuXHRib3JkZXItcmFkaXVzOiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IHhzbWFsbFNpemUgPSBjc3NgXG5cdCR7dGV4dFNhbnMuc21hbGwoeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFYc21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVszXX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbkRlZmF1bHQgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uTWVkaXVtfXB4O1xuXHRcdGhlaWdodDogYXV0bztcblx0fVxuXHQuc3JjLWJ1dHRvbi1zcGFjZSB7XG5cdFx0d2lkdGg6ICR7c3BhY2VbM119cHg7XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IGljb25TbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25TbWFsbH1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzJdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uWHNtYWxsID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvblhzbWFsbH1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzFdfXB4O1xuXHR9XG5gXG5cbi8qIFRPRE86IHdlIGFkZCBzb21lIG5lZ2F0aXZlIG1hcmdpbiB0byBpY29ucyB0byBhY2NvdW50IGZvclxuIHRoZSBleHRyYSBzcGFjZSBlbmNvZGVkIGludG8gdGhlIFNWRy4gV2Ugc2hvdWxkIGNvbnNpZGVyIHJlbW92aW5nXG4gb3Igc2lnbmlmaWNhbnRseSByZWR1Y2luZyB0aGlzIHNwYWNlXG4gKi9cbmNvbnN0IHB1bGxJY29uVG93YXJkRWRnZSA9IC1zcGFjZVsxXVxuXG5leHBvcnQgY29uc3QgaWNvbkxlZnQgPSBjc3NgXG5cdGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcblx0c3ZnIHtcblx0XHRtYXJnaW4tbGVmdDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcbmV4cG9ydCBjb25zdCBpY29uUmlnaHQgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0bWFyZ2luLXJpZ2h0OiAke3B1bGxJY29uVG93YXJkRWRnZX1weDtcblx0fVxuYFxuXG5jb25zdCBpY29uT25seSA9IGNzc2Bcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdHBhZGRpbmc6IDA7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uT25seURlZmF1bHQgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFNZWRpdW19cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uT25seVNtYWxsID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhU21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uT25seVhzbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVhzbWFsbH1weDtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25OdWRnZUFuaW1hdGlvbiA9IGNzc2Bcblx0c3ZnIHtcblx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcblx0XHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLnNob3J0fTtcblx0fVxuXHQmOmhvdmVyLFxuXHQmOmZvY3VzIHtcblx0XHRzdmcge1xuXHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoJHtzcGFjZVsxXSAvIDJ9cHgsIDApO1xuXHRcdH1cblx0fVxuYFxuIl19 */"));
  var primary = function primary2() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : buttonDefault, button2 = _ref.button;
    return /* @__PURE__ */ css_browser_esm_default("background-color:", button2.backgroundPrimary, ";color:", button2.textPrimary, ";&:hover{background-color:", button2.backgroundPrimaryHover, ";}" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQmtEIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  };
  var secondary = function secondary2() {
    var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : buttonDefault, button2 = _ref2.button;
    return /* @__PURE__ */ css_browser_esm_default("background-color:", button2.backgroundSecondary, ";color:", button2.textSecondary, ";&:hover{background-color:", button2.backgroundSecondaryHover, ";}" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQ2tEIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  };
  var tertiary = function tertiary2() {
    var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : buttonDefault, button2 = _ref3.button;
    return /* @__PURE__ */ css_browser_esm_default("color:", button2.textTertiary, ";border:1px solid ", button2.borderTertiary, ";&:hover{background-color:", button2.backgroundTertiaryHover, ";}" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnRGtEIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  };
  var subdued = function subdued2() {
    var _ref4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : buttonDefault, button2 = _ref4.button;
    return /* @__PURE__ */ css_browser_esm_default("padding:0;background-color:transparent;color:", button2.textSubdued, ";&:hover{text-decoration:underline;}border-radius:0;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyRGtEIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  };
  var fontSpacingVerticalOffset = true ? {
    name: "q19zel-fontSpacingVerticalOffset",
    styles: "padding-bottom:2px;label:fontSpacingVerticalOffset;"
  } : {
    name: "q19zel-fontSpacingVerticalOffset",
    styles: "padding-bottom:2px;label:fontSpacingVerticalOffset;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErRXFDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"
  };
  var defaultSize = /* @__PURE__ */ css_browser_esm_default(textSans$1.medium({
    fontWeight: "bold"
  }), ";height:", height.ctaMedium, "px;min-height:", height.ctaMedium, "px;padding:0 ", space$1[5], "px;border-radius:", height.ctaMedium, "px;", fontSpacingVerticalOffset, ";label:defaultSize;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtRjhCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  var smallSize = /* @__PURE__ */ css_browser_esm_default(textSans$1.medium({
    fontWeight: "bold"
  }), ";height:", height.ctaSmall, "px;min-height:", height.ctaSmall, "px;padding:0 ", space$1[4], "px;border-radius:", height.ctaSmall, "px;", fontSpacingVerticalOffset, ";label:smallSize;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0RjRCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  var xsmallSize = /* @__PURE__ */ css_browser_esm_default(textSans$1.small({
    fontWeight: "bold"
  }), ";height:", height.ctaXsmall, "px;min-height:", height.ctaXsmall, "px;padding:0 ", space$1[3], "px;border-radius:", height.ctaXsmall, "px;", fontSpacingVerticalOffset, ";label:xsmallSize;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxRzZCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  var iconDefault = /* @__PURE__ */ css_browser_esm_default("svg{flex:0 0 auto;display:block;fill:currentColor;position:relative;width:", width.iconMedium, "px;height:auto;}.src-button-space{width:", space$1[3], "px;}label:iconDefault;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4RzhCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  var iconSmall = /* @__PURE__ */ css_browser_esm_default("svg{flex:0 0 auto;display:block;fill:currentColor;position:relative;width:", width.iconSmall, "px;height:auto;}.src-button-space{width:", space$1[2], "px;}label:iconSmall;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0SDRCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  var iconXsmall = /* @__PURE__ */ css_browser_esm_default("svg{flex:0 0 auto;display:block;fill:currentColor;position:relative;width:", width.iconXsmall, "px;height:auto;}.src-button-space{width:", space$1[1], "px;}label:iconXsmall;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwSTZCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  var pullIconTowardEdge = -space$1[1];
  var iconLeft = /* @__PURE__ */ css_browser_esm_default("flex-direction:row-reverse;svg{margin-left:", pullIconTowardEdge, "px;}label:iconLeft;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4SjJCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  var iconRight = /* @__PURE__ */ css_browser_esm_default("svg{margin-right:", pullIconTowardEdge, "px;}label:iconRight;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvSzRCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  var iconOnly = true ? {
    name: "fi94m9-iconOnly",
    styles: "justify-content:center;padding:0;label:iconOnly;"
  } : {
    name: "fi94m9-iconOnly",
    styles: "justify-content:center;padding:0;label:iconOnly;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwS29CIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"
  };
  var iconOnlyDefault = /* @__PURE__ */ css_browser_esm_default(iconOnly, ";width:", width.ctaMedium, "px;label:iconOnlyDefault;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErS2tDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  var iconOnlySmall = /* @__PURE__ */ css_browser_esm_default(iconOnly, ";width:", width.ctaSmall, "px;label:iconOnlySmall;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvTGdDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  var iconOnlyXsmall = /* @__PURE__ */ css_browser_esm_default(iconOnly, ";width:", width.ctaXsmall, "px;label:iconOnlyXsmall;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5TGlDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  var iconNudgeAnimation = /* @__PURE__ */ css_browser_esm_default("svg{transform:translate(0,0);transition:", transitions$1["short"], ";}&:hover,&:focus{svg{transform:translate(", space$1[1] / 2, "px,0);}}label:iconNudgeAnimation;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4THFDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9jb3JlXCJcbmltcG9ydCB7IHNwYWNlLCB0cmFuc2l0aW9ucyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zXCJcbmltcG9ydCB7IGhlaWdodCwgd2lkdGggfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9zaXplXCJcbmltcG9ydCB7IGJ1dHRvbkRlZmF1bHQsIEJ1dHRvblRoZW1lIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdGhlbWVzXCJcbmltcG9ydCB7IHRleHRTYW5zIH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtZm91bmRhdGlvbnMvdHlwb2dyYXBoeVwiXG5pbXBvcnQgeyBmb2N1c0hhbG8gfSBmcm9tIFwiQGd1YXJkaWFuL3NyYy1mb3VuZGF0aW9ucy9hY2Nlc3NpYmlsaXR5XCJcblxuZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IGNzc2Bcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyOiBub25lO1xuXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHR0cmFuc2l0aW9uOiAke3RyYW5zaXRpb25zLm1lZGl1bX07XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuXHQmOmZvY3VzIHtcblx0XHQke2ZvY3VzSGFsb307XG5cdH1cbmBcblxuZXhwb3J0IGNvbnN0IHByaW1hcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFByaW1hcnl9O1xuXHRjb2xvcjogJHtidXR0b24udGV4dFByaW1hcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRQcmltYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnkgPSAoe1xuXHRidXR0b24sXG59OiB7IGJ1dHRvbjogQnV0dG9uVGhlbWUgfSA9IGJ1dHRvbkRlZmF1bHQpID0+IGNzc2Bcblx0YmFja2dyb3VuZC1jb2xvcjogJHtidXR0b24uYmFja2dyb3VuZFNlY29uZGFyeX07XG5cdGNvbG9yOiAke2J1dHRvbi50ZXh0U2Vjb25kYXJ5fTtcblxuXHQmOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke2J1dHRvbi5iYWNrZ3JvdW5kU2Vjb25kYXJ5SG92ZXJ9O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCB0ZXJ0aWFyeSA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRjb2xvcjogJHtidXR0b24udGV4dFRlcnRpYXJ5fTtcblx0Ym9yZGVyOiAxcHggc29saWQgJHtidXR0b24uYm9yZGVyVGVydGlhcnl9O1xuXG5cdCY6aG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7YnV0dG9uLmJhY2tncm91bmRUZXJ0aWFyeUhvdmVyfTtcblx0fVxuYFxuXG5leHBvcnQgY29uc3Qgc3ViZHVlZCA9ICh7XG5cdGJ1dHRvbixcbn06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9ID0gYnV0dG9uRGVmYXVsdCkgPT4gY3NzYFxuXHRwYWRkaW5nOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0Y29sb3I6ICR7YnV0dG9uLnRleHRTdWJkdWVkfTtcblxuXHQmOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0fVxuXG5cdC8qIFdoeSBpcyB0aGlzIHplcm8/IEJlY2F1c2UgdGhlIGRlZmF1bHQgaXMgdG8gaGF2ZSByb3VuZGVkIGNvcm5lcnMgYnV0IGhlcmUsIHdoZW5cblx0ICAgdGhlcmUgaXMgb25seSB0ZXh0LCBpdCBpcyBtb3JlIG5hdHVyYWwgdG8gc2hvdyBhIHJlY3RhbmdsZSBmb3IgdGhlIGZvY3VzIGhhbG8gKi9cblx0Ym9yZGVyLXJhZGl1czogMDtcbmBcblxuLypcblx0R3VhcmRpYW4gVGV4dCBTYW5zIGFwcGVhcnMgdG8gYmUgZW5jb2RlZCB3aXRoIHNsaWdodGx5IG1vcmUgc3BhY2UgYWJvdmUgdGhlIGxldHRlcmluZ1xuXHR0aGFuIGJlbG93LiBXZSBhZGQgYSBzbWFsbCBhbW91bnQgb2YgcGFkZGluZyB0byB0aGUgYm90dG9tIG9mIHRoZSBidXR0b24gdG8gZW5zdXJlXG5cdHRoZSBidXR0b24gbGFiZWwgaXMgdmVydGljYWxseSBjZW50cmVkIHZpc3VhbGx5LlxuXHRUT0RPOiBmaW5kIGEgbW9yZSBzY2FsYWJsZSBzb2x1dGlvbiB0byB0aGlzIChzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9ob3ctdG8tdGFtZS1saW5lLWhlaWdodC1pbi1jc3MvKVxuKi9cbmNvbnN0IGZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXQgPSBjc3NgXG5cdHBhZGRpbmctYm90dG9tOiAycHg7XG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2l6ZSA9IGNzc2Bcblx0JHt0ZXh0U2Fucy5tZWRpdW0oeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9KX07XG5cdGhlaWdodDogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHRtaW4taGVpZ2h0OiAke2hlaWdodC5jdGFNZWRpdW19cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs1XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhTWVkaXVtfXB4O1xuXHQke2ZvbnRTcGFjaW5nVmVydGljYWxPZmZzZXR9O1xuYFxuXG5leHBvcnQgY29uc3Qgc21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLm1lZGl1bSh7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0pfTtcblx0aGVpZ2h0OiAke2hlaWdodC5jdGFTbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdHBhZGRpbmc6IDAgJHtzcGFjZVs0XX1weDtcblx0Ym9yZGVyLXJhZGl1czogJHtoZWlnaHQuY3RhU21hbGx9cHg7XG5cdCR7Zm9udFNwYWNpbmdWZXJ0aWNhbE9mZnNldH07XG5gXG5cbmV4cG9ydCBjb25zdCB4c21hbGxTaXplID0gY3NzYFxuXHQke3RleHRTYW5zLnNtYWxsKHsgZm9udFdlaWdodDogXCJib2xkXCIgfSl9O1xuXHRoZWlnaHQ6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0bWluLWhlaWdodDogJHtoZWlnaHQuY3RhWHNtYWxsfXB4O1xuXHRwYWRkaW5nOiAwICR7c3BhY2VbM119cHg7XG5cdGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0LmN0YVhzbWFsbH1weDtcblx0JHtmb250U3BhY2luZ1ZlcnRpY2FsT2Zmc2V0fTtcbmBcblxuZXhwb3J0IGNvbnN0IGljb25EZWZhdWx0ID0gY3NzYFxuXHRzdmcge1xuXHRcdGZsZXg6IDAgMCBhdXRvO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0d2lkdGg6ICR7d2lkdGguaWNvbk1lZGl1bX1weDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblx0LnNyYy1idXR0b24tc3BhY2Uge1xuXHRcdHdpZHRoOiAke3NwYWNlWzNdfXB4O1xuXHR9XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uU21hbGwgPSBjc3NgXG5cdHN2ZyB7XG5cdFx0ZmxleDogMCAwIGF1dG87XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0ZmlsbDogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR3aWR0aDogJHt3aWR0aC5pY29uU21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsyXX1weDtcblx0fVxuYFxuXG5leHBvcnQgY29uc3QgaWNvblhzbWFsbCA9IGNzc2Bcblx0c3ZnIHtcblx0XHRmbGV4OiAwIDAgYXV0bztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmaWxsOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHdpZHRoOiAke3dpZHRoLmljb25Yc21hbGx9cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cdC5zcmMtYnV0dG9uLXNwYWNlIHtcblx0XHR3aWR0aDogJHtzcGFjZVsxXX1weDtcblx0fVxuYFxuXG4vKiBUT0RPOiB3ZSBhZGQgc29tZSBuZWdhdGl2ZSBtYXJnaW4gdG8gaWNvbnMgdG8gYWNjb3VudCBmb3JcbiB0aGUgZXh0cmEgc3BhY2UgZW5jb2RlZCBpbnRvIHRoZSBTVkcuIFdlIHNob3VsZCBjb25zaWRlciByZW1vdmluZ1xuIG9yIHNpZ25pZmljYW50bHkgcmVkdWNpbmcgdGhpcyBzcGFjZVxuICovXG5jb25zdCBwdWxsSWNvblRvd2FyZEVkZ2UgPSAtc3BhY2VbMV1cblxuZXhwb3J0IGNvbnN0IGljb25MZWZ0ID0gY3NzYFxuXHRmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cdHN2ZyB7XG5cdFx0bWFyZ2luLWxlZnQ6ICR7cHVsbEljb25Ub3dhcmRFZGdlfXB4O1xuXHR9XG5gXG5leHBvcnQgY29uc3QgaWNvblJpZ2h0ID0gY3NzYFxuXHRzdmcge1xuXHRcdG1hcmdpbi1yaWdodDogJHtwdWxsSWNvblRvd2FyZEVkZ2V9cHg7XG5cdH1cbmBcblxuY29uc3QgaWNvbk9ubHkgPSBjc3NgXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRwYWRkaW5nOiAwO1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlEZWZhdWx0ID0gY3NzYFxuXHQke2ljb25Pbmx5fTtcblx0d2lkdGg6ICR7d2lkdGguY3RhTWVkaXVtfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlTbWFsbCA9IGNzc2Bcblx0JHtpY29uT25seX07XG5cdHdpZHRoOiAke3dpZHRoLmN0YVNtYWxsfXB4O1xuYFxuXG5leHBvcnQgY29uc3QgaWNvbk9ubHlYc21hbGwgPSBjc3NgXG5cdCR7aWNvbk9ubHl9O1xuXHR3aWR0aDogJHt3aWR0aC5jdGFYc21hbGx9cHg7XG5gXG5cbmV4cG9ydCBjb25zdCBpY29uTnVkZ2VBbmltYXRpb24gPSBjc3NgXG5cdHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG5cdFx0dHJhbnNpdGlvbjogJHt0cmFuc2l0aW9ucy5zaG9ydH07XG5cdH1cblx0Jjpob3Zlcixcblx0Jjpmb2N1cyB7XG5cdFx0c3ZnIHtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKCR7c3BhY2VbMV0gLyAyfXB4LCAwKTtcblx0XHR9XG5cdH1cbmBcbiJdfQ== */"));
  var text5 = {
    readerRevenue: {
      ctaPrimary: brand4[400],
      ctaTertiary: brand4[400]
    },
    readerRevenueBrand: {
      ctaPrimary: brand4[400],
      ctaTertiary: brandAlt4[400]
    },
    readerRevenueBrandAlt: {
      ctaPrimary: neutral4[100],
      ctaTertiary: neutral4[7]
    }
  };
  var background5 = {
    readerRevenue: {
      ctaPrimary: brandAlt4[400],
      ctaPrimaryHover: "#FFD213",
      ctaTertiaryHover: "#E5E5E5"
    },
    readerRevenueBrand: {
      ctaPrimary: brandAlt4[400],
      ctaPrimaryHover: "#FFD213",
      ctaTertiaryHover: brand4[300]
    },
    readerRevenueBrandAlt: {
      ctaPrimary: neutral4[7],
      ctaPrimaryHover: "#454545",
      ctaTertiaryHover: "#FFD213"
    }
  };
  var border5 = {
    readerRevenue: {
      ctaTertiary: brand4[400]
    },
    readerRevenueBrand: {
      ctaTertiary: brandAlt4[400]
    },
    readerRevenueBrandAlt: {
      ctaTertiary: neutral4[7]
    }
  };
  var buttonReaderRevenue = {
    button: {
      textPrimary: text5.readerRevenue.ctaPrimary,
      backgroundPrimary: background5.readerRevenue.ctaPrimary,
      backgroundPrimaryHover: background5.readerRevenue.ctaPrimaryHover,
      textTertiary: text5.readerRevenue.ctaTertiary,
      backgroundTertiaryHover: background5.readerRevenue.ctaTertiaryHover,
      borderTertiary: border5.readerRevenue.ctaTertiary
    }
  };
  var buttonReaderRevenueBrand = {
    button: {
      textPrimary: text5.readerRevenueBrand.ctaPrimary,
      backgroundPrimary: background5.readerRevenueBrand.ctaPrimary,
      backgroundPrimaryHover: background5.readerRevenueBrand.ctaPrimaryHover,
      textTertiary: text5.readerRevenueBrand.ctaTertiary,
      backgroundTertiaryHover: background5.readerRevenueBrand.ctaTertiaryHover,
      borderTertiary: border5.readerRevenueBrand.ctaTertiary
    }
  };
  var buttonReaderRevenueBrandAlt = {
    button: {
      textPrimary: text5.readerRevenueBrandAlt.ctaPrimary,
      backgroundPrimary: background5.readerRevenueBrandAlt.ctaPrimary,
      backgroundPrimaryHover: background5.readerRevenueBrandAlt.ctaPrimaryHover,
      textTertiary: text5.readerRevenueBrandAlt.ctaTertiary,
      backgroundTertiaryHover: background5.readerRevenueBrandAlt.ctaTertiaryHover,
      borderTertiary: border5.readerRevenueBrandAlt.ctaTertiary
    }
  };
  var priorities = {
    primary,
    secondary,
    tertiary,
    subdued
  };
  var iconSides = {
    right: iconRight,
    left: iconLeft
  };
  var sizes = {
    default: defaultSize,
    small: smallSize,
    xsmall: xsmallSize
  };
  var iconSizes = {
    default: iconDefault,
    small: iconSmall,
    xsmall: iconXsmall
  };
  var iconOnlySizes = {
    default: iconOnlyDefault,
    small: iconOnlySmall,
    xsmall: iconOnlyXsmall
  };
  var Button = function Button2(_ref) {
    var priority = _ref.priority, size3 = _ref.size, iconSvg = _ref.icon, iconSide = _ref.iconSide, hideLabel = _ref.hideLabel, nudgeIcon = _ref.nudgeIcon, cssOverrides = _ref.cssOverrides, children = _ref.children, props = _objectWithoutProperties2(_ref, ["priority", "size", "icon", "iconSide", "hideLabel", "nudgeIcon", "cssOverrides", "children"]);
    var buttonContents = [children];
    if (iconSvg) {
      if (!hideLabel) {
        buttonContents.push(jsx("div", {
          className: "src-button-space"
        }));
      }
      buttonContents.push(/* @__PURE__ */ import_react5.default.cloneElement(iconSvg, {
        key: "svg"
      }));
    }
    return jsx("button", _extends2({
      css: function css2(theme) {
        return [
          button,
          sizes[size3],
          priorities[priority](theme.button && theme),
          iconSvg ? iconSizes[size3] : "",
          iconSvg && !hideLabel && children ? iconSides[iconSide] : "",
          nudgeIcon ? iconNudgeAnimation : "",
          hideLabel || !children ? iconOnlySizes[size3] : "",
          cssOverrides
        ];
      }
    }, props), hideLabel ? jsx(import_react5.default.Fragment, null, jsx("span", {
      css: /* @__PURE__ */ css_browser_esm_default(visuallyHidden, ";label:Button;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwSWMiLCJmaWxlIjoiaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG5cdFJlYWN0RWxlbWVudCxcblx0UmVhY3ROb2RlLFxuXHRCdXR0b25IVE1MQXR0cmlidXRlcyxcblx0QW5jaG9ySFRNTEF0dHJpYnV0ZXMsXG59IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vY29yZVwiXG5pbXBvcnQgeyBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSBcIkBlbW90aW9uL2Nzc1wiXG5pbXBvcnQgeyBCdXR0b25UaGVtZSB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL3RoZW1lc1wiXG5pbXBvcnQgeyB2aXN1YWxseUhpZGRlbiB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL2FjY2Vzc2liaWxpdHlcIlxuaW1wb3J0IHsgU3ZnQXJyb3dSaWdodFN0cmFpZ2h0IH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtaWNvbnNcIlxuaW1wb3J0IHtcblx0YnV0dG9uLFxuXHRwcmltYXJ5LFxuXHRzZWNvbmRhcnksXG5cdHRlcnRpYXJ5LFxuXHRzdWJkdWVkLFxuXHRkZWZhdWx0U2l6ZSxcblx0c21hbGxTaXplLFxuXHR4c21hbGxTaXplLFxuXHRpY29uRGVmYXVsdCxcblx0aWNvblNtYWxsLFxuXHRpY29uWHNtYWxsLFxuXHRpY29uTGVmdCxcblx0aWNvblJpZ2h0LFxuXHRpY29uT25seURlZmF1bHQsXG5cdGljb25Pbmx5U21hbGwsXG5cdGljb25Pbmx5WHNtYWxsLFxuXHRpY29uTnVkZ2VBbmltYXRpb24sXG59IGZyb20gXCIuL3N0eWxlc1wiXG5pbXBvcnQgeyBQcm9wcyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWhlbHBlcnNcIlxuXG5leHBvcnQge1xuXHRidXR0b25EZWZhdWx0LFxuXHRidXR0b25CcmFuZCxcblx0YnV0dG9uQnJhbmRBbHQsXG59IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL3RoZW1lc1wiXG5leHBvcnQge1xuXHRidXR0b25SZWFkZXJSZXZlbnVlLFxuXHRidXR0b25SZWFkZXJSZXZlbnVlQnJhbmQsXG5cdGJ1dHRvblJlYWRlclJldmVudWVCcmFuZEFsdCxcbn0gZnJvbSBcIi4vdGhlbWVzXCJcblxuZXhwb3J0IHR5cGUgUHJpb3JpdHkgPSBcInByaW1hcnlcIiB8IFwic2Vjb25kYXJ5XCIgfCBcInRlcnRpYXJ5XCIgfCBcInN1YmR1ZWRcIlxudHlwZSBJY29uU2lkZSA9IFwibGVmdFwiIHwgXCJyaWdodFwiXG50eXBlIFNpemUgPSBcImRlZmF1bHRcIiB8IFwic21hbGxcIiB8IFwieHNtYWxsXCJcblxuY29uc3QgcHJpb3JpdGllczoge1xuXHRba2V5IGluIFByaW9yaXR5XTogKHsgYnV0dG9uIH06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9KSA9PiBTZXJpYWxpemVkU3R5bGVzXG59ID0ge1xuXHRwcmltYXJ5LFxuXHRzZWNvbmRhcnksXG5cdHRlcnRpYXJ5LFxuXHRzdWJkdWVkLFxufVxuXG5jb25zdCBpY29uU2lkZXM6IHtcblx0W2tleSBpbiBJY29uU2lkZV06IFNlcmlhbGl6ZWRTdHlsZXNcbn0gPSB7XG5cdHJpZ2h0OiBpY29uUmlnaHQsXG5cdGxlZnQ6IGljb25MZWZ0LFxufVxuXG5jb25zdCBzaXplczoge1xuXHRba2V5IGluIFNpemVdOiBTZXJpYWxpemVkU3R5bGVzXG59ID0ge1xuXHRkZWZhdWx0OiBkZWZhdWx0U2l6ZSxcblx0c21hbGw6IHNtYWxsU2l6ZSxcblx0eHNtYWxsOiB4c21hbGxTaXplLFxufVxuY29uc3QgaWNvblNpemVzOiB7XG5cdFtrZXkgaW4gU2l6ZV06IFNlcmlhbGl6ZWRTdHlsZXNcbn0gPSB7XG5cdGRlZmF1bHQ6IGljb25EZWZhdWx0LFxuXHRzbWFsbDogaWNvblNtYWxsLFxuXHR4c21hbGw6IGljb25Yc21hbGwsXG59XG5jb25zdCBpY29uT25seVNpemVzOiB7XG5cdFtrZXkgaW4gU2l6ZV06IFNlcmlhbGl6ZWRTdHlsZXNcbn0gPSB7XG5cdGRlZmF1bHQ6IGljb25Pbmx5RGVmYXVsdCxcblx0c21hbGw6IGljb25Pbmx5U21hbGwsXG5cdHhzbWFsbDogaWNvbk9ubHlYc21hbGwsXG59XG5cbmludGVyZmFjZSBCdXR0b25Qcm9wcyBleHRlbmRzIFByb3BzLCBCdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4ge1xuXHRwcmlvcml0eTogUHJpb3JpdHlcblx0c2l6ZTogU2l6ZVxuXHRpY29uU2lkZTogSWNvblNpZGVcblx0aWNvbj86IFJlYWN0RWxlbWVudFxuXHRoaWRlTGFiZWw6IGJvb2xlYW5cblx0bnVkZ2VJY29uPzogYm9vbGVhblxuXHRjaGlsZHJlbj86IFJlYWN0Tm9kZVxufVxuXG5jb25zdCBCdXR0b24gPSAoe1xuXHRwcmlvcml0eSxcblx0c2l6ZSxcblx0aWNvbjogaWNvblN2Zyxcblx0aWNvblNpZGUsXG5cdGhpZGVMYWJlbCxcblx0bnVkZ2VJY29uLFxuXHRjc3NPdmVycmlkZXMsXG5cdGNoaWxkcmVuLFxuXHQuLi5wcm9wc1xufTogQnV0dG9uUHJvcHMpID0+IHtcblx0Y29uc3QgYnV0dG9uQ29udGVudHMgPSBbY2hpbGRyZW5dXG5cblx0aWYgKGljb25TdmcpIHtcblx0XHRpZiAoIWhpZGVMYWJlbCkge1xuXHRcdFx0YnV0dG9uQ29udGVudHMucHVzaCg8ZGl2IGNsYXNzTmFtZT1cInNyYy1idXR0b24tc3BhY2VcIiAvPilcblx0XHR9XG5cdFx0YnV0dG9uQ29udGVudHMucHVzaChSZWFjdC5jbG9uZUVsZW1lbnQoaWNvblN2ZywgeyBrZXk6IFwic3ZnXCIgfSkpXG5cdH1cblxuXHRyZXR1cm4gKFxuXHRcdDxidXR0b25cblx0XHRcdGNzcz17dGhlbWUgPT4gW1xuXHRcdFx0XHRidXR0b24sXG5cdFx0XHRcdHNpemVzW3NpemVdLFxuXHRcdFx0XHRwcmlvcml0aWVzW3ByaW9yaXR5XSh0aGVtZS5idXR0b24gJiYgdGhlbWUpLFxuXHRcdFx0XHRpY29uU3ZnID8gaWNvblNpemVzW3NpemVdIDogXCJcIixcblx0XHRcdFx0Lypcblx0XHRcdFx0VE9ETzogV2Ugc2hvdWxkIGJlIGFibGUgdG8gYXNzdW1lIHRoYXQgY2hpbGRyZW5cblx0XHRcdFx0d2lsbCBhbHdheXMgYmUgcGFzc2VkIHRvIHRoZSBCdXR0b24gY29tcG9uZW50LlxuXHRcdFx0XHRBIGZ1dHVyZSBicmVha2luZyBjaGFuZ2UgbWlnaHQgYmUgdG8gcmVtb3ZlIHRoZVxuXHRcdFx0XHRsb2dpYyB0aGF0IGNoZWNrcyBmb3IgdGhlIChub24tKWV4aXN0ZW5jZSBvZiBjaGlsZHJlbi5cblx0XHRcdFx0Ki9cblx0XHRcdFx0aWNvblN2ZyAmJiAhaGlkZUxhYmVsICYmIGNoaWxkcmVuID8gaWNvblNpZGVzW2ljb25TaWRlXSA6IFwiXCIsXG5cdFx0XHRcdG51ZGdlSWNvbiA/IGljb25OdWRnZUFuaW1hdGlvbiA6IFwiXCIsXG5cdFx0XHRcdGhpZGVMYWJlbCB8fCAhY2hpbGRyZW4gPyBpY29uT25seVNpemVzW3NpemVdIDogXCJcIixcblx0XHRcdFx0Y3NzT3ZlcnJpZGVzLFxuXHRcdFx0XX1cblx0XHRcdHsuLi5wcm9wc31cblx0XHQ+XG5cdFx0XHR7aGlkZUxhYmVsID8gKFxuXHRcdFx0XHQ8PlxuXHRcdFx0XHRcdDxzcGFuXG5cdFx0XHRcdFx0XHRjc3M9e2Nzc2Bcblx0XHRcdFx0XHRcdFx0JHt2aXN1YWxseUhpZGRlbn07XG5cdFx0XHRcdFx0XHRgfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdHtjaGlsZHJlbn1cblx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0e2J1dHRvbkNvbnRlbnRzWzFdfVxuXHRcdFx0XHQ8Lz5cblx0XHRcdCkgOiAoXG5cdFx0XHRcdGJ1dHRvbkNvbnRlbnRzXG5cdFx0XHQpfVxuXHRcdDwvYnV0dG9uPlxuXHQpXG59XG5cbmludGVyZmFjZSBMaW5rQnV0dG9uUHJvcHNcblx0ZXh0ZW5kcyBQcm9wcyxcblx0XHRBbmNob3JIVE1MQXR0cmlidXRlczxIVE1MQW5jaG9yRWxlbWVudD4ge1xuXHRwcmlvcml0eTogUHJpb3JpdHlcblx0c2l6ZTogU2l6ZVxuXHRzaG93SWNvbjogYm9vbGVhbiAvLyBUT0RPOiBkZXByZWNhdGVkLCByZW1vdmUgaW4gZnV0dXJlIHZlcnNpb25cblx0aWNvblNpZGU6IEljb25TaWRlXG5cdGljb24/OiBSZWFjdEVsZW1lbnRcblx0bnVkZ2VJY29uPzogYm9vbGVhblxuXHRoaWRlTGFiZWw6IGJvb2xlYW5cblx0Y2hpbGRyZW4/OiBSZWFjdE5vZGVcbn1cblxuY29uc3QgTGlua0J1dHRvbiA9ICh7XG5cdHByaW9yaXR5LFxuXHRzaXplLFxuXHRzaG93SWNvbixcblx0aWNvblNpZGUsXG5cdGljb246IGljb25TdmcsXG5cdG51ZGdlSWNvbixcblx0aGlkZUxhYmVsLFxuXHRjc3NPdmVycmlkZXMsXG5cdGNoaWxkcmVuLFxuXHQuLi5wcm9wc1xufTogTGlua0J1dHRvblByb3BzKSA9PiB7XG5cdGNvbnN0IGJ1dHRvbkNvbnRlbnRzID0gW2NoaWxkcmVuXVxuXG5cdGlmIChpY29uU3ZnKSB7XG5cdFx0aWYgKCFoaWRlTGFiZWwpIHtcblx0XHRcdGJ1dHRvbkNvbnRlbnRzLnB1c2goPGRpdiBjbGFzc05hbWU9XCJzcmMtYnV0dG9uLXNwYWNlXCIgLz4pXG5cdFx0fVxuXHRcdGJ1dHRvbkNvbnRlbnRzLnB1c2goUmVhY3QuY2xvbmVFbGVtZW50KGljb25TdmcsIHsga2V5OiBcInN2Z1wiIH0pKVxuXHR9XG5cblx0Ly8gVE9ETzogZGVwcmVjYXRlZCBBUEksIHJlbW92ZSBpbiBmdXR1cmUgdmVyc2lvblxuXHRpZiAoc2hvd0ljb24pIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGFcblx0XHRcdFx0Y3NzPXt0aGVtZSA9PiBbXG5cdFx0XHRcdFx0YnV0dG9uLFxuXHRcdFx0XHRcdHNpemVzW3NpemVdLFxuXHRcdFx0XHRcdHByaW9yaXRpZXNbcHJpb3JpdHldKHRoZW1lLmJ1dHRvbiAmJiB0aGVtZSksXG5cdFx0XHRcdFx0aWNvblNpemVzW3NpemVdLFxuXHRcdFx0XHRcdCFjaGlsZHJlbiA/IGljb25Pbmx5U2l6ZXNbc2l6ZV0gOiBcIlwiLFxuXHRcdFx0XHRcdGljb25OdWRnZUFuaW1hdGlvbixcblx0XHRcdFx0XHRjc3NPdmVycmlkZXMsXG5cdFx0XHRcdF19XG5cdFx0XHRcdHsuLi5wcm9wc31cblx0XHRcdD5cblx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0XHQ8U3ZnQXJyb3dSaWdodFN0cmFpZ2h0IC8+XG5cdFx0XHQ8L2E+XG5cdFx0KVxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8YVxuXHRcdFx0XHRjc3M9e3RoZW1lID0+IFtcblx0XHRcdFx0XHRidXR0b24sXG5cdFx0XHRcdFx0c2l6ZXNbc2l6ZV0sXG5cdFx0XHRcdFx0cHJpb3JpdGllc1twcmlvcml0eV0odGhlbWUuYnV0dG9uICYmIHRoZW1lKSxcblx0XHRcdFx0XHRpY29uU3ZnID8gaWNvblNpemVzW3NpemVdIDogXCJcIixcblx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFRPRE86IFdlIHNob3VsZCBiZSBhYmxlIHRvIGFzc3VtZSB0aGF0IGNoaWxkcmVuXG5cdFx0XHRcdFx0d2lsbCBhbHdheXMgYmUgcGFzc2VkIHRvIHRoZSBMaW5rQnV0dG9uIGNvbXBvbmVudC5cblx0XHRcdFx0XHRBIGZ1dHVyZSBicmVha2luZyBjaGFuZ2UgbWlnaHQgYmUgdG8gcmVtb3ZlIHRoZVxuXHRcdFx0XHRcdGxvZ2ljIHRoYXQgY2hlY2tzIGZvciB0aGUgKG5vbi0pZXhpc3RlbmNlIG9mIGNoaWxkcmVuLlxuXHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0aWNvblN2ZyAmJiAhaGlkZUxhYmVsICYmIGNoaWxkcmVuXG5cdFx0XHRcdFx0XHQ/IGljb25TaWRlc1tpY29uU2lkZV1cblx0XHRcdFx0XHRcdDogXCJcIixcblx0XHRcdFx0XHRudWRnZUljb24gPyBpY29uTnVkZ2VBbmltYXRpb24gOiBcIlwiLFxuXHRcdFx0XHRcdGhpZGVMYWJlbCB8fCAhY2hpbGRyZW4gPyBpY29uT25seVNpemVzW3NpemVdIDogXCJcIixcblx0XHRcdFx0XX1cblx0XHRcdFx0ey4uLnByb3BzfVxuXHRcdFx0PlxuXHRcdFx0XHR7aGlkZUxhYmVsID8gKFxuXHRcdFx0XHRcdDw+XG5cdFx0XHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdFx0XHRjc3M9e2Nzc2Bcblx0XHRcdFx0XHRcdFx0XHQke3Zpc3VhbGx5SGlkZGVufTtcblx0XHRcdFx0XHRcdFx0YH1cblx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdFx0e2J1dHRvbkNvbnRlbnRzWzFdfVxuXHRcdFx0XHRcdDwvPlxuXHRcdFx0XHQpIDogKFxuXHRcdFx0XHRcdGJ1dHRvbkNvbnRlbnRzXG5cdFx0XHRcdCl9XG5cdFx0XHQ8L2E+XG5cdFx0KVxuXHR9XG59XG5cbmNvbnN0IGRlZmF1bHRCdXR0b25Qcm9wcyA9IHtcblx0dHlwZTogXCJidXR0b25cIixcblx0cHJpb3JpdHk6IFwicHJpbWFyeVwiLFxuXHRzaXplOiBcImRlZmF1bHRcIixcblx0aWNvblNpZGU6IFwibGVmdFwiLFxuXHRoaWRlTGFiZWw6IGZhbHNlLFxufVxuXG5jb25zdCBkZWZhdWx0TGlua0J1dHRvblByb3BzID0ge1xuXHRwcmlvcml0eTogXCJwcmltYXJ5XCIsXG5cdHNpemU6IFwiZGVmYXVsdFwiLFxuXHRpY29uU2lkZTogXCJsZWZ0XCIsXG5cdGhpZGVMYWJlbDogZmFsc2UsXG5cdHNob3dJY29uOiBmYWxzZSxcbn1cblxuQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHsgLi4uZGVmYXVsdEJ1dHRvblByb3BzIH1cbkxpbmtCdXR0b24uZGVmYXVsdFByb3BzID0geyAuLi5kZWZhdWx0TGlua0J1dHRvblByb3BzIH1cblxuZXhwb3J0IHsgQnV0dG9uLCBMaW5rQnV0dG9uIH1cbiJdfQ== */"))
    }, children), buttonContents[1]) : buttonContents);
  };
  var LinkButton = function LinkButton2(_ref2) {
    var priority = _ref2.priority, size3 = _ref2.size, showIcon = _ref2.showIcon, iconSide = _ref2.iconSide, iconSvg = _ref2.icon, nudgeIcon = _ref2.nudgeIcon, hideLabel = _ref2.hideLabel, cssOverrides = _ref2.cssOverrides, children = _ref2.children, props = _objectWithoutProperties2(_ref2, ["priority", "size", "showIcon", "iconSide", "icon", "nudgeIcon", "hideLabel", "cssOverrides", "children"]);
    var buttonContents = [children];
    if (iconSvg) {
      if (!hideLabel) {
        buttonContents.push(jsx("div", {
          className: "src-button-space"
        }));
      }
      buttonContents.push(/* @__PURE__ */ import_react5.default.cloneElement(iconSvg, {
        key: "svg"
      }));
    }
    if (showIcon) {
      return jsx("a", _extends2({
        css: function css2(theme) {
          return [button, sizes[size3], priorities[priority](theme.button && theme), iconSizes[size3], !children ? iconOnlySizes[size3] : "", iconNudgeAnimation, cssOverrides];
        }
      }, props), children, jsx(SvgArrowRightStraight, null));
    } else {
      return jsx("a", _extends2({
        css: function css2(theme) {
          return [
            button,
            sizes[size3],
            priorities[priority](theme.button && theme),
            iconSvg ? iconSizes[size3] : "",
            iconSvg && !hideLabel && children ? iconSides[iconSide] : "",
            nudgeIcon ? iconNudgeAnimation : "",
            hideLabel || !children ? iconOnlySizes[size3] : ""
          ];
        }
      }, props), hideLabel ? jsx(import_react5.default.Fragment, null, jsx("span", {
        css: /* @__PURE__ */ css_browser_esm_default(visuallyHidden, ";label:LinkButton;" + (true ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1T2UiLCJmaWxlIjoiaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG5cdFJlYWN0RWxlbWVudCxcblx0UmVhY3ROb2RlLFxuXHRCdXR0b25IVE1MQXR0cmlidXRlcyxcblx0QW5jaG9ySFRNTEF0dHJpYnV0ZXMsXG59IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vY29yZVwiXG5pbXBvcnQgeyBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSBcIkBlbW90aW9uL2Nzc1wiXG5pbXBvcnQgeyBCdXR0b25UaGVtZSB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL3RoZW1lc1wiXG5pbXBvcnQgeyB2aXN1YWxseUhpZGRlbiB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL2FjY2Vzc2liaWxpdHlcIlxuaW1wb3J0IHsgU3ZnQXJyb3dSaWdodFN0cmFpZ2h0IH0gZnJvbSBcIkBndWFyZGlhbi9zcmMtaWNvbnNcIlxuaW1wb3J0IHtcblx0YnV0dG9uLFxuXHRwcmltYXJ5LFxuXHRzZWNvbmRhcnksXG5cdHRlcnRpYXJ5LFxuXHRzdWJkdWVkLFxuXHRkZWZhdWx0U2l6ZSxcblx0c21hbGxTaXplLFxuXHR4c21hbGxTaXplLFxuXHRpY29uRGVmYXVsdCxcblx0aWNvblNtYWxsLFxuXHRpY29uWHNtYWxsLFxuXHRpY29uTGVmdCxcblx0aWNvblJpZ2h0LFxuXHRpY29uT25seURlZmF1bHQsXG5cdGljb25Pbmx5U21hbGwsXG5cdGljb25Pbmx5WHNtYWxsLFxuXHRpY29uTnVkZ2VBbmltYXRpb24sXG59IGZyb20gXCIuL3N0eWxlc1wiXG5pbXBvcnQgeyBQcm9wcyB9IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWhlbHBlcnNcIlxuXG5leHBvcnQge1xuXHRidXR0b25EZWZhdWx0LFxuXHRidXR0b25CcmFuZCxcblx0YnV0dG9uQnJhbmRBbHQsXG59IGZyb20gXCJAZ3VhcmRpYW4vc3JjLWZvdW5kYXRpb25zL3RoZW1lc1wiXG5leHBvcnQge1xuXHRidXR0b25SZWFkZXJSZXZlbnVlLFxuXHRidXR0b25SZWFkZXJSZXZlbnVlQnJhbmQsXG5cdGJ1dHRvblJlYWRlclJldmVudWVCcmFuZEFsdCxcbn0gZnJvbSBcIi4vdGhlbWVzXCJcblxuZXhwb3J0IHR5cGUgUHJpb3JpdHkgPSBcInByaW1hcnlcIiB8IFwic2Vjb25kYXJ5XCIgfCBcInRlcnRpYXJ5XCIgfCBcInN1YmR1ZWRcIlxudHlwZSBJY29uU2lkZSA9IFwibGVmdFwiIHwgXCJyaWdodFwiXG50eXBlIFNpemUgPSBcImRlZmF1bHRcIiB8IFwic21hbGxcIiB8IFwieHNtYWxsXCJcblxuY29uc3QgcHJpb3JpdGllczoge1xuXHRba2V5IGluIFByaW9yaXR5XTogKHsgYnV0dG9uIH06IHsgYnV0dG9uOiBCdXR0b25UaGVtZSB9KSA9PiBTZXJpYWxpemVkU3R5bGVzXG59ID0ge1xuXHRwcmltYXJ5LFxuXHRzZWNvbmRhcnksXG5cdHRlcnRpYXJ5LFxuXHRzdWJkdWVkLFxufVxuXG5jb25zdCBpY29uU2lkZXM6IHtcblx0W2tleSBpbiBJY29uU2lkZV06IFNlcmlhbGl6ZWRTdHlsZXNcbn0gPSB7XG5cdHJpZ2h0OiBpY29uUmlnaHQsXG5cdGxlZnQ6IGljb25MZWZ0LFxufVxuXG5jb25zdCBzaXplczoge1xuXHRba2V5IGluIFNpemVdOiBTZXJpYWxpemVkU3R5bGVzXG59ID0ge1xuXHRkZWZhdWx0OiBkZWZhdWx0U2l6ZSxcblx0c21hbGw6IHNtYWxsU2l6ZSxcblx0eHNtYWxsOiB4c21hbGxTaXplLFxufVxuY29uc3QgaWNvblNpemVzOiB7XG5cdFtrZXkgaW4gU2l6ZV06IFNlcmlhbGl6ZWRTdHlsZXNcbn0gPSB7XG5cdGRlZmF1bHQ6IGljb25EZWZhdWx0LFxuXHRzbWFsbDogaWNvblNtYWxsLFxuXHR4c21hbGw6IGljb25Yc21hbGwsXG59XG5jb25zdCBpY29uT25seVNpemVzOiB7XG5cdFtrZXkgaW4gU2l6ZV06IFNlcmlhbGl6ZWRTdHlsZXNcbn0gPSB7XG5cdGRlZmF1bHQ6IGljb25Pbmx5RGVmYXVsdCxcblx0c21hbGw6IGljb25Pbmx5U21hbGwsXG5cdHhzbWFsbDogaWNvbk9ubHlYc21hbGwsXG59XG5cbmludGVyZmFjZSBCdXR0b25Qcm9wcyBleHRlbmRzIFByb3BzLCBCdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4ge1xuXHRwcmlvcml0eTogUHJpb3JpdHlcblx0c2l6ZTogU2l6ZVxuXHRpY29uU2lkZTogSWNvblNpZGVcblx0aWNvbj86IFJlYWN0RWxlbWVudFxuXHRoaWRlTGFiZWw6IGJvb2xlYW5cblx0bnVkZ2VJY29uPzogYm9vbGVhblxuXHRjaGlsZHJlbj86IFJlYWN0Tm9kZVxufVxuXG5jb25zdCBCdXR0b24gPSAoe1xuXHRwcmlvcml0eSxcblx0c2l6ZSxcblx0aWNvbjogaWNvblN2Zyxcblx0aWNvblNpZGUsXG5cdGhpZGVMYWJlbCxcblx0bnVkZ2VJY29uLFxuXHRjc3NPdmVycmlkZXMsXG5cdGNoaWxkcmVuLFxuXHQuLi5wcm9wc1xufTogQnV0dG9uUHJvcHMpID0+IHtcblx0Y29uc3QgYnV0dG9uQ29udGVudHMgPSBbY2hpbGRyZW5dXG5cblx0aWYgKGljb25TdmcpIHtcblx0XHRpZiAoIWhpZGVMYWJlbCkge1xuXHRcdFx0YnV0dG9uQ29udGVudHMucHVzaCg8ZGl2IGNsYXNzTmFtZT1cInNyYy1idXR0b24tc3BhY2VcIiAvPilcblx0XHR9XG5cdFx0YnV0dG9uQ29udGVudHMucHVzaChSZWFjdC5jbG9uZUVsZW1lbnQoaWNvblN2ZywgeyBrZXk6IFwic3ZnXCIgfSkpXG5cdH1cblxuXHRyZXR1cm4gKFxuXHRcdDxidXR0b25cblx0XHRcdGNzcz17dGhlbWUgPT4gW1xuXHRcdFx0XHRidXR0b24sXG5cdFx0XHRcdHNpemVzW3NpemVdLFxuXHRcdFx0XHRwcmlvcml0aWVzW3ByaW9yaXR5XSh0aGVtZS5idXR0b24gJiYgdGhlbWUpLFxuXHRcdFx0XHRpY29uU3ZnID8gaWNvblNpemVzW3NpemVdIDogXCJcIixcblx0XHRcdFx0Lypcblx0XHRcdFx0VE9ETzogV2Ugc2hvdWxkIGJlIGFibGUgdG8gYXNzdW1lIHRoYXQgY2hpbGRyZW5cblx0XHRcdFx0d2lsbCBhbHdheXMgYmUgcGFzc2VkIHRvIHRoZSBCdXR0b24gY29tcG9uZW50LlxuXHRcdFx0XHRBIGZ1dHVyZSBicmVha2luZyBjaGFuZ2UgbWlnaHQgYmUgdG8gcmVtb3ZlIHRoZVxuXHRcdFx0XHRsb2dpYyB0aGF0IGNoZWNrcyBmb3IgdGhlIChub24tKWV4aXN0ZW5jZSBvZiBjaGlsZHJlbi5cblx0XHRcdFx0Ki9cblx0XHRcdFx0aWNvblN2ZyAmJiAhaGlkZUxhYmVsICYmIGNoaWxkcmVuID8gaWNvblNpZGVzW2ljb25TaWRlXSA6IFwiXCIsXG5cdFx0XHRcdG51ZGdlSWNvbiA/IGljb25OdWRnZUFuaW1hdGlvbiA6IFwiXCIsXG5cdFx0XHRcdGhpZGVMYWJlbCB8fCAhY2hpbGRyZW4gPyBpY29uT25seVNpemVzW3NpemVdIDogXCJcIixcblx0XHRcdFx0Y3NzT3ZlcnJpZGVzLFxuXHRcdFx0XX1cblx0XHRcdHsuLi5wcm9wc31cblx0XHQ+XG5cdFx0XHR7aGlkZUxhYmVsID8gKFxuXHRcdFx0XHQ8PlxuXHRcdFx0XHRcdDxzcGFuXG5cdFx0XHRcdFx0XHRjc3M9e2Nzc2Bcblx0XHRcdFx0XHRcdFx0JHt2aXN1YWxseUhpZGRlbn07XG5cdFx0XHRcdFx0XHRgfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdHtjaGlsZHJlbn1cblx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0e2J1dHRvbkNvbnRlbnRzWzFdfVxuXHRcdFx0XHQ8Lz5cblx0XHRcdCkgOiAoXG5cdFx0XHRcdGJ1dHRvbkNvbnRlbnRzXG5cdFx0XHQpfVxuXHRcdDwvYnV0dG9uPlxuXHQpXG59XG5cbmludGVyZmFjZSBMaW5rQnV0dG9uUHJvcHNcblx0ZXh0ZW5kcyBQcm9wcyxcblx0XHRBbmNob3JIVE1MQXR0cmlidXRlczxIVE1MQW5jaG9yRWxlbWVudD4ge1xuXHRwcmlvcml0eTogUHJpb3JpdHlcblx0c2l6ZTogU2l6ZVxuXHRzaG93SWNvbjogYm9vbGVhbiAvLyBUT0RPOiBkZXByZWNhdGVkLCByZW1vdmUgaW4gZnV0dXJlIHZlcnNpb25cblx0aWNvblNpZGU6IEljb25TaWRlXG5cdGljb24/OiBSZWFjdEVsZW1lbnRcblx0bnVkZ2VJY29uPzogYm9vbGVhblxuXHRoaWRlTGFiZWw6IGJvb2xlYW5cblx0Y2hpbGRyZW4/OiBSZWFjdE5vZGVcbn1cblxuY29uc3QgTGlua0J1dHRvbiA9ICh7XG5cdHByaW9yaXR5LFxuXHRzaXplLFxuXHRzaG93SWNvbixcblx0aWNvblNpZGUsXG5cdGljb246IGljb25TdmcsXG5cdG51ZGdlSWNvbixcblx0aGlkZUxhYmVsLFxuXHRjc3NPdmVycmlkZXMsXG5cdGNoaWxkcmVuLFxuXHQuLi5wcm9wc1xufTogTGlua0J1dHRvblByb3BzKSA9PiB7XG5cdGNvbnN0IGJ1dHRvbkNvbnRlbnRzID0gW2NoaWxkcmVuXVxuXG5cdGlmIChpY29uU3ZnKSB7XG5cdFx0aWYgKCFoaWRlTGFiZWwpIHtcblx0XHRcdGJ1dHRvbkNvbnRlbnRzLnB1c2goPGRpdiBjbGFzc05hbWU9XCJzcmMtYnV0dG9uLXNwYWNlXCIgLz4pXG5cdFx0fVxuXHRcdGJ1dHRvbkNvbnRlbnRzLnB1c2goUmVhY3QuY2xvbmVFbGVtZW50KGljb25TdmcsIHsga2V5OiBcInN2Z1wiIH0pKVxuXHR9XG5cblx0Ly8gVE9ETzogZGVwcmVjYXRlZCBBUEksIHJlbW92ZSBpbiBmdXR1cmUgdmVyc2lvblxuXHRpZiAoc2hvd0ljb24pIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGFcblx0XHRcdFx0Y3NzPXt0aGVtZSA9PiBbXG5cdFx0XHRcdFx0YnV0dG9uLFxuXHRcdFx0XHRcdHNpemVzW3NpemVdLFxuXHRcdFx0XHRcdHByaW9yaXRpZXNbcHJpb3JpdHldKHRoZW1lLmJ1dHRvbiAmJiB0aGVtZSksXG5cdFx0XHRcdFx0aWNvblNpemVzW3NpemVdLFxuXHRcdFx0XHRcdCFjaGlsZHJlbiA/IGljb25Pbmx5U2l6ZXNbc2l6ZV0gOiBcIlwiLFxuXHRcdFx0XHRcdGljb25OdWRnZUFuaW1hdGlvbixcblx0XHRcdFx0XHRjc3NPdmVycmlkZXMsXG5cdFx0XHRcdF19XG5cdFx0XHRcdHsuLi5wcm9wc31cblx0XHRcdD5cblx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0XHQ8U3ZnQXJyb3dSaWdodFN0cmFpZ2h0IC8+XG5cdFx0XHQ8L2E+XG5cdFx0KVxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8YVxuXHRcdFx0XHRjc3M9e3RoZW1lID0+IFtcblx0XHRcdFx0XHRidXR0b24sXG5cdFx0XHRcdFx0c2l6ZXNbc2l6ZV0sXG5cdFx0XHRcdFx0cHJpb3JpdGllc1twcmlvcml0eV0odGhlbWUuYnV0dG9uICYmIHRoZW1lKSxcblx0XHRcdFx0XHRpY29uU3ZnID8gaWNvblNpemVzW3NpemVdIDogXCJcIixcblx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFRPRE86IFdlIHNob3VsZCBiZSBhYmxlIHRvIGFzc3VtZSB0aGF0IGNoaWxkcmVuXG5cdFx0XHRcdFx0d2lsbCBhbHdheXMgYmUgcGFzc2VkIHRvIHRoZSBMaW5rQnV0dG9uIGNvbXBvbmVudC5cblx0XHRcdFx0XHRBIGZ1dHVyZSBicmVha2luZyBjaGFuZ2UgbWlnaHQgYmUgdG8gcmVtb3ZlIHRoZVxuXHRcdFx0XHRcdGxvZ2ljIHRoYXQgY2hlY2tzIGZvciB0aGUgKG5vbi0pZXhpc3RlbmNlIG9mIGNoaWxkcmVuLlxuXHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0aWNvblN2ZyAmJiAhaGlkZUxhYmVsICYmIGNoaWxkcmVuXG5cdFx0XHRcdFx0XHQ/IGljb25TaWRlc1tpY29uU2lkZV1cblx0XHRcdFx0XHRcdDogXCJcIixcblx0XHRcdFx0XHRudWRnZUljb24gPyBpY29uTnVkZ2VBbmltYXRpb24gOiBcIlwiLFxuXHRcdFx0XHRcdGhpZGVMYWJlbCB8fCAhY2hpbGRyZW4gPyBpY29uT25seVNpemVzW3NpemVdIDogXCJcIixcblx0XHRcdFx0XX1cblx0XHRcdFx0ey4uLnByb3BzfVxuXHRcdFx0PlxuXHRcdFx0XHR7aGlkZUxhYmVsID8gKFxuXHRcdFx0XHRcdDw+XG5cdFx0XHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdFx0XHRjc3M9e2Nzc2Bcblx0XHRcdFx0XHRcdFx0XHQke3Zpc3VhbGx5SGlkZGVufTtcblx0XHRcdFx0XHRcdFx0YH1cblx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdFx0e2J1dHRvbkNvbnRlbnRzWzFdfVxuXHRcdFx0XHRcdDwvPlxuXHRcdFx0XHQpIDogKFxuXHRcdFx0XHRcdGJ1dHRvbkNvbnRlbnRzXG5cdFx0XHRcdCl9XG5cdFx0XHQ8L2E+XG5cdFx0KVxuXHR9XG59XG5cbmNvbnN0IGRlZmF1bHRCdXR0b25Qcm9wcyA9IHtcblx0dHlwZTogXCJidXR0b25cIixcblx0cHJpb3JpdHk6IFwicHJpbWFyeVwiLFxuXHRzaXplOiBcImRlZmF1bHRcIixcblx0aWNvblNpZGU6IFwibGVmdFwiLFxuXHRoaWRlTGFiZWw6IGZhbHNlLFxufVxuXG5jb25zdCBkZWZhdWx0TGlua0J1dHRvblByb3BzID0ge1xuXHRwcmlvcml0eTogXCJwcmltYXJ5XCIsXG5cdHNpemU6IFwiZGVmYXVsdFwiLFxuXHRpY29uU2lkZTogXCJsZWZ0XCIsXG5cdGhpZGVMYWJlbDogZmFsc2UsXG5cdHNob3dJY29uOiBmYWxzZSxcbn1cblxuQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHsgLi4uZGVmYXVsdEJ1dHRvblByb3BzIH1cbkxpbmtCdXR0b24uZGVmYXVsdFByb3BzID0geyAuLi5kZWZhdWx0TGlua0J1dHRvblByb3BzIH1cblxuZXhwb3J0IHsgQnV0dG9uLCBMaW5rQnV0dG9uIH1cbiJdfQ== */"))
      }, children), buttonContents[1]) : buttonContents);
    }
  };
  var defaultButtonProps = {
    type: "button",
    priority: "primary",
    size: "default",
    iconSide: "left",
    hideLabel: false
  };
  var defaultLinkButtonProps = {
    priority: "primary",
    size: "default",
    iconSide: "left",
    hideLabel: false,
    showIcon: false
  };
  Button.defaultProps = _objectSpread23({}, defaultButtonProps);
  LinkButton.defaultProps = _objectSpread23({}, defaultLinkButtonProps);

  // node_modules/@guardian/src-icons/dist/index.esm.js
  var import_react6 = __toModule(require_react());
  var SvgCross = function SvgCross2() {
    return /* @__PURE__ */ import_react6.default.createElement("svg", {
      viewBox: "0 0 30 30",
      xmlns: "http://www.w3.org/2000/svg"
    }, /* @__PURE__ */ import_react6.default.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M15.325 17.025l7.225 6.625 1.075-1.075-6.6-7.25 6.6-7.25L22.55 7l-7.225 6.625-7.25-6.6L7 8.1l6.625 7.225L7 22.55l1.075 1.075 7.25-6.6z"
    }));
  };

  // node_modules/emotion-theming/dist/emotion-theming.browser.esm.js
  var import_defineProperty = __toModule(require_defineProperty());
  var import_react7 = __toModule(require_react());
  var import_extends = __toModule(require_extends());
  var import_hoist_non_react_statics = __toModule(require_hoist_non_react_statics_cjs());
  function ownKeys4(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys4(source, true).forEach(function(key) {
          import_defineProperty.default(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys4(source).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  var getTheme = function getTheme2(outerTheme, theme) {
    if (typeof theme === "function") {
      var mergedTheme = theme(outerTheme);
      if (false) {
        throw new Error("[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!");
      }
      return mergedTheme;
    }
    if (false) {
      throw new Error("[ThemeProvider] Please make your theme prop a plain object");
    }
    return _objectSpread({}, outerTheme, {}, theme);
  };
  var createCacheWithTheme = weak_memoize_browser_esm_default(function(outerTheme) {
    return weak_memoize_browser_esm_default(function(theme) {
      return getTheme(outerTheme, theme);
    });
  });
  var ThemeProvider = function ThemeProvider2(props) {
    return import_react7.createElement(ThemeContext.Consumer, null, function(theme) {
      if (props.theme !== theme) {
        theme = createCacheWithTheme(theme)(props.theme);
      }
      return import_react7.createElement(ThemeContext.Provider, {
        value: theme
      }, props.children);
    });
  };

  // src/components/modules/shared/ArticleCountOptOutOverlay.tsx
  var COLOURS = {
    epic: "white",
    banner: brandAltText4.primary,
    ["global-eoy-banner"]: neutral4[0]
  };
  var BACKGROUND_COLOURS = {
    epic: brand4[400],
    banner: brandAltBackground4.primary,
    ["global-eoy-banner"]: "#FFF7E5"
  };
  var BORDER_COLOURS = {
    epic: "transparent",
    banner: brandAltLine4.primary,
    ["global-eoy-banner"]: "#052962"
  };
  var BUTTON_THEMES = {
    epic: brand5,
    banner: brandAlt5,
    ["global-eoy-banner"]: buttonDefault
  };
  var overlayContainer = (type) => css_browser_esm_default`
    color: ${COLOURS[type]};
    background: ${BACKGROUND_COLOURS[type]};
    border: 1px solid ${BORDER_COLOURS[type]};
    ${textSans$1.medium()}
    padding: ${space$1[2]}px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;
  var overlayHeader = css_browser_esm_default`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
  var overlayHeaderText = css_browser_esm_default`
    font-size: 17px;
    font-weight: bold;
`;
  var overlayBody = css_browser_esm_default`
    margin-top: ${space$1[1]}px;
    font-size: 15px;
`;
  var overlayCtaContainer = css_browser_esm_default`
    margin-top: ${space$1[3]}px;
    display: flex;
    flex-direction: row;

    > * + * {
        margin-left: ${space$1[2]}px;
    }

    ${from.tablet} {
        > * + * {
            margin-left: ${space$1[3]}px;
        }
    }
`;
  var NOTE_LINK_COLOURS = {
    epic: neutral4[100],
    banner: brandAltText4.primary,
    ["global-eoy-banner"]: neutral4[0]
  };
  var BUTTON_OVERRIDES = {
    epic: css_browser_esm_default``,
    banner: css_browser_esm_default``,
    ["global-eoy-banner"]: css_browser_esm_default``
  };
  var overlayNote = (type) => css_browser_esm_default`
    margin-top: ${space$1[2]}px;
    ${textSans$1.xsmall()}
    font-style: italic;

    a {
        color: ${NOTE_LINK_COLOURS[type]} !important;
        text-decoration: underline !important;
    }
`;
  var ArticleCountOptOutOverlay = ({
    type,
    hasOptedOut,
    onClose,
    onOptOut
  }) => {
    return /* @__PURE__ */ import_react8.default.createElement("div", {
      css: overlayContainer(type)
    }, /* @__PURE__ */ import_react8.default.createElement("div", {
      css: overlayHeader
    }, /* @__PURE__ */ import_react8.default.createElement("div", {
      css: overlayHeaderText
    }, hasOptedOut ? "You've opted out" : "What's this?"), /* @__PURE__ */ import_react8.default.createElement(ThemeProvider, {
      theme: BUTTON_THEMES[type]
    }, /* @__PURE__ */ import_react8.default.createElement(Button, {
      onClick: onClose,
      cssOverrides: BUTTON_OVERRIDES[type],
      icon: /* @__PURE__ */ import_react8.default.createElement(SvgCross, null),
      hideLabel: true,
      size: "xsmall",
      priority: "tertiary"
    }))), /* @__PURE__ */ import_react8.default.createElement("div", {
      css: overlayBody
    }, hasOptedOut ? "Starting from your next page view, we won't count the articles you read or show you this message for three months." : "We would like to remind you how many Guardian articles you\u2019ve enjoyed on this device. Can we continue showing you this?"), !hasOptedOut && /* @__PURE__ */ import_react8.default.createElement("div", {
      css: overlayCtaContainer
    }, /* @__PURE__ */ import_react8.default.createElement(ThemeProvider, {
      theme: BUTTON_THEMES[type]
    }, /* @__PURE__ */ import_react8.default.createElement(Button, {
      onClick: onClose,
      priority: "primary",
      size: "xsmall"
    }, "Yes, that's OK")), /* @__PURE__ */ import_react8.default.createElement(ThemeProvider, {
      theme: BUTTON_THEMES[type]
    }, /* @__PURE__ */ import_react8.default.createElement(Button, {
      onClick: onOptOut,
      cssOverrides: BUTTON_OVERRIDES[type],
      priority: "tertiary",
      size: "xsmall"
    }, "No, opt me out"))), /* @__PURE__ */ import_react8.default.createElement("div", {
      css: overlayNote(type)
    }, hasOptedOut ? /* @__PURE__ */ import_react8.default.createElement("span", null, "If you have any questions, please", " ", /* @__PURE__ */ import_react8.default.createElement("a", {
      href: "https://www.theguardian.com/help/contact-us"
    }, "contact us.")) : "Please note that opting out is a permanent action and can't be reversed"));
  };

  // src/components/modules/shared/ArticleCountOptOut.tsx
  var ARTICLE_COUNT_OPT_OUT_COOKIE = {
    name: "gu_article_count_opt_out",
    daysToLive: 90
  };
  var DAILY_ARTICLE_COUNT_STORAGE_KEY = "gu.history.dailyArticleCount";
  var WEEKLY_ARTICLE_COUNT_STORAGE_KEY = "gu.history.weeklyArticleCount";
  var isBanner = (type) => type === "banner" || type === "global-eoy-banner";
  var optOutContainer = css_browser_esm_default`
    display: inline-block;

    ${from.tablet} {
        position: relative;
    }
`;
  var articleCountButton = css_browser_esm_default`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    &:focus {
        outline: none !important;
    }
`;
  var overlayContainer2 = (type) => css_browser_esm_default`
    position: absolute;
    z-index: 100;
    left: ${space$1[4]}px;
    right: ${space$1[4]}px;
    ${isBanner(type) ? "bottom: 21px;" : ""}

    ${from.tablet} {
        width: 400px;
        left: 0;
        ${isBanner(type) ? "bottom: -90px;" : ""}
    }
`;
  var ArticleCountOptOut = ({
    numArticles,
    nextWord,
    type
  }) => {
    const [isOpen, setIsOpen] = import_react9.useState(false);
    const [hasOptedOut, setHasOptedOut] = import_react9.useState(false);
    const addArticleCountOptOutCookie = () => addCookie(ARTICLE_COUNT_OPT_OUT_COOKIE.name, new Date().getTime().toString(), ARTICLE_COUNT_OPT_OUT_COOKIE.daysToLive);
    const removeArticleCountFromLocalStorage = () => {
      window.localStorage.removeItem(DAILY_ARTICLE_COUNT_STORAGE_KEY);
      window.localStorage.removeItem(WEEKLY_ARTICLE_COUNT_STORAGE_KEY);
    };
    const onOptOut = () => {
      addArticleCountOptOutCookie();
      removeArticleCountFromLocalStorage();
      setHasOptedOut(true);
    };
    const onClose = () => setIsOpen(false);
    return /* @__PURE__ */ import_react9.default.createElement("div", {
      css: optOutContainer
    }, /* @__PURE__ */ import_react9.default.createElement("button", {
      css: articleCountButton,
      onClick: () => setIsOpen(!isOpen)
    }, `${numArticles}${nextWord ? nextWord : ""}`), isOpen && /* @__PURE__ */ import_react9.default.createElement("div", {
      css: overlayContainer2(type)
    }, /* @__PURE__ */ import_react9.default.createElement(ArticleCountOptOutOverlay, {
      type,
      hasOptedOut,
      onOptOut,
      onClose
    })));
  };

  // src/lib/replaceArticleCount.tsx
  var replaceArticleCount = (text6, numArticles, articleCountOptOutType) => {
    const nextWords = [];
    const subbedText = text6.replace(/%%ARTICLE_COUNT%%( \w+)?/g, (_, nextWord) => {
      nextWords.push(nextWord);
      return "%%ARTICLE_COUNT_AND_NEXT_WORD%%";
    });
    const parts = subbedText.split(/%%ARTICLE_COUNT_AND_NEXT_WORD%%/);
    const elements = [];
    for (let i = 0; i < parts.length - 1; i += 1) {
      elements.push(/* @__PURE__ */ import_react10.default.createElement("span", {
        dangerouslySetInnerHTML: {__html: parts[i]}
      }));
      elements.push(/* @__PURE__ */ import_react10.default.createElement(ArticleCountOptOut, {
        numArticles,
        nextWord: nextWords[i],
        type: articleCountOptOutType
      }));
    }
    elements.push(/* @__PURE__ */ import_react10.default.createElement("span", {
      dangerouslySetInnerHTML: {__html: parts[parts.length - 1]}
    }));
    return elements;
  };

  // src/components/modules/banners/globalEoy/components/GlobalEoyBody.tsx
  var GlobalEoyBody = ({
    numArticles,
    countryCode,
    body: body2,
    mobileBody
  }) => {
    const cleanMobileBody = replaceNonArticleCountPlaceholders(mobileBody, countryCode);
    const cleanBody = replaceNonArticleCountPlaceholders(body2, countryCode);
    return /* @__PURE__ */ import_react11.default.createElement(ContributionsTemplateBody_default, {
      copy: /* @__PURE__ */ import_react11.default.createElement(import_react11.default.Fragment, null, /* @__PURE__ */ import_react11.default.createElement(Hide, {
        above: "tablet"
      }, replaceArticleCount(cleanMobileBody, numArticles, "global-eoy-banner")), /* @__PURE__ */ import_react11.default.createElement(Hide, {
        below: "tablet"
      }, replaceArticleCount(cleanBody, numArticles, "global-eoy-banner")))
    });
  };
  var GlobalEoyBody_default = GlobalEoyBody;

  // src/components/modules/banners/globalEoy/components/GlobalEoyVisual.tsx
  var import_react13 = __toModule(require_react());

  // src/components/modules/banners/contributionsTemplate/ContributionsTemplateVisual.tsx
  var import_react12 = __toModule(require_react());
  var container4 = css_browser_esm_default`
    width: 100%;
    padding-top: 45%;
    position: relative;

    ${from.tablet} {
        padding-top: 0;
        height: 100%;
    }
`;
  var imageContainer = css_browser_esm_default`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    ${from.tablet} {
        position: relative;
        width: 100%;
        height: 100%;
    }
`;
  var ContributionsTemplateVisual = ({
    image
  }) => /* @__PURE__ */ import_react12.default.createElement("div", {
    css: container4
  }, /* @__PURE__ */ import_react12.default.createElement("div", {
    css: imageContainer
  }, image));
  var ContributionsTemplateVisual_default = ContributionsTemplateVisual;

  // src/components/modules/banners/globalEoy/components/GlobalEoyVisual.tsx
  var visualStyles = css_browser_esm_default`
    img {
        ${from.tablet} {
            object-fit: contain;
            transform: scale(1.1);
        }

        ${from.desktop} {
            transform: scale(1.2);
        }

        ${from.leftCol} {
            transform: scale(1.3);
        }

        ${from.wide} {
            transform: scale(1.4);
        }
    }
`;
  var GlobalEoyVisual = () => /* @__PURE__ */ import_react13.default.createElement(ContributionsTemplateVisual_default, {
    image: /* @__PURE__ */ import_react13.default.createElement("picture", {
      css: visualStyles
    }, /* @__PURE__ */ import_react13.default.createElement("source", {
      media: "(max-width: 739px)",
      srcSet: "https://media.guim.co.uk/e9012f30db4814101252a0f76ec653c80e3d81b4/0_0_960_432/960.jpg"
    }), /* @__PURE__ */ import_react13.default.createElement("source", {
      srcSet: "https://media.guim.co.uk/3b2c4eb1ef1e354a851fe7ea5a547266ceaba981/0_0_720_681/720.jpg"
    }), /* @__PURE__ */ import_react13.default.createElement("img", {
      src: "https://media.guim.co.uk/e9012f30db4814101252a0f76ec653c80e3d81b4/0_0_960_432/960.jpg"
    }))
  });
  var GlobalEoyVisual_default = GlobalEoyVisual;

  // src/components/modules/banners/globalEoy/components/GlobalEoyCloseButton.tsx
  var import_react15 = __toModule(require_react());

  // src/components/modules/banners/contributionsTemplate/ContributionsTemplateCloseButton.tsx
  var import_react14 = __toModule(require_react());
  var container5 = css_browser_esm_default`
    display: flex;

    ${from.tablet} {
        & > * + * {
            margin-left: ${space$1[2]}px;
        }
    }

    svg {
        display: block;
    }
`;
  var ContributionsTemplateCloseButton = ({
    closeButton,
    roundel
  }) => /* @__PURE__ */ import_react14.default.createElement("div", {
    css: container5
  }, /* @__PURE__ */ import_react14.default.createElement(Hide, {
    below: "tablet"
  }, roundel), closeButton);
  var ContributionsTemplateCloseButton_default = ContributionsTemplateCloseButton;

  // src/components/modules/banners/globalEoy/components/GlobalEoyCloseButton.tsx
  var closeButtonStyles = css_browser_esm_default`
    color: ${neutral4[7]};
    border-color: ${neutral4[7]};

    &:hover {
        background-color: #f3eade;
    }
`;
  var Roundel = /* @__PURE__ */ import_react15.default.createElement("svg", {
    width: "36",
    height: "36",
    viewBox: "0 0 36 36",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ import_react15.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M18.0001 0C8.05903 0 0 8.05873 0 18C0 27.9412 8.05903 36 18.0001 36C27.9412 36 36 27.9412 36 18C36 8.05873 27.9412 0 18.0001 0Z",
    fill: brand4[400]
  }), /* @__PURE__ */ import_react15.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M28.8837 18.9866L27.0361 19.8125V28.3322C25.9968 29.3221 23.3408 30.8651 20.8003 31.3954V30.7765V29.6149V19.6268L18.8372 18.9332V18.4187H28.8837V18.9866ZM19.6745 4.79612C19.6745 4.79612 19.6365 4.79577 19.6178 4.79577C15.4528 4.79577 13.07 10.4117 13.1901 17.9868C13.07 25.5895 15.4528 31.2052 19.6178 31.2052C19.6365 31.2052 19.6745 31.205 19.6745 31.205V31.7887C13.4303 32.2062 4.90449 27.5543 5.02457 18.0142C4.90449 8.44674 13.4303 3.79484 19.6745 4.21235V4.79612ZM20.9301 4.18604C23.3719 4.55897 26.1626 6.1627 27.2092 7.30124V12.5581H26.6079L20.9301 4.76617V4.18604Z",
    fill: "white"
  }));
  var GlobalEoyCloseButton = ({
    onClose
  }) => /* @__PURE__ */ import_react15.default.createElement(ContributionsTemplateCloseButton_default, {
    closeButton: /* @__PURE__ */ import_react15.default.createElement(Button, {
      onClick: onClose,
      cssOverrides: closeButtonStyles,
      size: "small",
      priority: "tertiary",
      icon: /* @__PURE__ */ import_react15.default.createElement(SvgCross, null),
      hideLabel: true
    }, "Close"),
    roundel: Roundel
  });
  var GlobalEoyCloseButton_default = GlobalEoyCloseButton;

  // src/components/modules/banners/globalEoy/components/GlobalEoyHeader.tsx
  var import_react17 = __toModule(require_react());

  // src/components/modules/banners/contributionsTemplate/ContributionsTemplateHeader.tsx
  var import_react16 = __toModule(require_react());
  var container6 = css_browser_esm_default`
    ${headline$1.xsmall({fontWeight: "bold"})}

    ${from.tablet} {
        font-size: 28px;
    }

    ${from.desktop} {
        font-size: 42px;
    }
`;
  var ContributionsTemplateHeader = ({
    copy
  }) => /* @__PURE__ */ import_react16.default.createElement("header", {
    css: container6
  }, /* @__PURE__ */ import_react16.default.createElement("div", null, copy));
  var ContributionsTemplateHeader_default = ContributionsTemplateHeader;

  // src/components/modules/banners/globalEoy/components/GlobalEoyHeader.tsx
  var GlobalEoyHeader = () => /* @__PURE__ */ import_react17.default.createElement(ContributionsTemplateHeader_default, {
    copy: /* @__PURE__ */ import_react17.default.createElement(import_react17.default.Fragment, null, "Show your support for high-impact reporting")
  });
  var GlobalEoyHeader_default = GlobalEoyHeader;

  // src/components/modules/banners/globalEoy/components/GlobalEoyCta.tsx
  var import_react19 = __toModule(require_react());

  // src/components/modules/banners/contributionsTemplate/ContributionsTemplateCta.tsx
  var import_react18 = __toModule(require_react());
  var container7 = css_browser_esm_default`
    display: flex;

    & > * + * {
        margin-left: ${space$1[4]}px;
    }

    ${from.tablet} {
        & > * + * {
            margin-left: ${space$1[5]}px;
        }
    }
`;
  var paymentMethods = css_browser_esm_default`
    display: block;
    max-height: 1.25rem;
    margin-top: ${space$1[2]}px;
`;
  var ContributionsTemplateCta = ({
    primaryCta,
    secondaryCta
  }) => /* @__PURE__ */ import_react18.default.createElement(import_react18.default.Fragment, null, /* @__PURE__ */ import_react18.default.createElement("div", {
    css: container7
  }, primaryCta, secondaryCta), /* @__PURE__ */ import_react18.default.createElement("img", {
    src: "https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png",
    alt: "Accepted payment methods: Visa, Mastercard, American Express and PayPal",
    css: paymentMethods
  }));
  var ContributionsTemplateCta_default = ContributionsTemplateCta;

  // src/lib/tracking.ts
  var addTrackingParams = (baseUrl, params) => {
    const acquisitionData = encodeURIComponent(JSON.stringify({
      source: params.platformId,
      componentId: params.campaignCode,
      componentType: params.componentType,
      campaignCode: params.campaignCode,
      abTest: {
        name: params.abTestName,
        variant: params.abTestVariant
      },
      referrerPageviewId: params.ophanPageId,
      referrerUrl: params.referrerUrl,
      isRemote: true
    }));
    const trackingLinkParams = {
      REFPVID: params.ophanPageId || "not_found",
      INTCMP: params.campaignCode || "",
      acquisitionData
    };
    const queryString = Object.entries(trackingLinkParams).map(([key, value]) => `${key}=${value}`);
    const alreadyHasQueryString = baseUrl.includes("?");
    return `${baseUrl}${alreadyHasQueryString ? "&" : "?"}${queryString.join("&")}`;
  };
  var addRegionIdAndTrackingParamsToSupportUrl = (baseUrl, tracking, countryCode) => {
    const isSupportUrl = /\bsupport\./.test(baseUrl);
    return isSupportUrl ? addTrackingParams(addRegionIdToSupportUrl(baseUrl, countryCode), tracking) : baseUrl;
  };

  // src/components/modules/banners/globalEoy/components/GlobalEoyCta.tsx
  var BASE_LANDING_PAGE_URL = "https://support.theguardian.com/contribute";
  var GlobalEoyCta = ({
    onContributeClick,
    tracking,
    countryCode
  }) => {
    const landingPageUrl = addRegionIdAndTrackingParamsToSupportUrl(BASE_LANDING_PAGE_URL, tracking, countryCode);
    return /* @__PURE__ */ import_react19.default.createElement(ContributionsTemplateCta_default, {
      primaryCta: /* @__PURE__ */ import_react19.default.createElement("div", null, /* @__PURE__ */ import_react19.default.createElement(Hide, {
        above: "desktop"
      }, /* @__PURE__ */ import_react19.default.createElement(LinkButton, {
        href: landingPageUrl,
        onClick: onContributeClick,
        size: "small"
      }, "Support the Guardian")), /* @__PURE__ */ import_react19.default.createElement(Hide, {
        below: "desktop"
      }, /* @__PURE__ */ import_react19.default.createElement(LinkButton, {
        href: landingPageUrl,
        onClick: onContributeClick,
        size: "default"
      }, "Support the Guardian"))),
      secondaryCta: null
    });
  };
  var GlobalEoyCta_default = GlobalEoyCta;

  // src/components/modules/banners/globalEoy/helpers/ophan.ts
  var OPHAN_COMPONENT_ID_CONTRIBUTE = "global-eoy-2020-contribute";
  var OPHAN_COMPONENT_ID_CLOSE = "global-eoy-2020-close";
  var OPHAN_COMPONENT_EVENT_CONTRIBUTE_CLICK = {
    component: {
      componentType: "ACQUISITIONS_ENGAGEMENT_BANNER",
      id: OPHAN_COMPONENT_ID_CONTRIBUTE
    },
    action: "CLICK"
  };
  var OPHAN_COMPONENT_EVENT_CLOSE_CLICK = {
    component: {
      componentType: "ACQUISITIONS_ENGAGEMENT_BANNER",
      id: OPHAN_COMPONENT_ID_CLOSE
    },
    action: "CLICK"
  };

  // src/components/modules/banners/hocs/withCloseable.tsx
  var import_react20 = __toModule(require_react());

  // src/components/modules/banners/localStorage.ts
  var setBannerClosedTimestamp = (name) => localStorage.setItem(`gu.prefs.${name}`, JSON.stringify({
    value: new Date().toISOString()
  }));
  var setContributionsBannerClosedTimestamp = () => setBannerClosedTimestamp("engagementBannerLastClosedAt");
  var setSubscriptionsBannerClosedTimestamp = () => setBannerClosedTimestamp("subscriptionBannerLastClosedAt");
  var setChannelClosedTimestamp = (channel) => {
    if (channel === "contributions") {
      setContributionsBannerClosedTimestamp();
    } else if (channel === "subscriptions") {
      setSubscriptionsBannerClosedTimestamp();
    }
  };

  // src/components/modules/banners/hocs/withCloseable.tsx
  var withCloseable = (CloseableBanner, bannerChannel) => {
    const Banner = (bannerProps) => {
      const [isOpen, setIsOpen] = import_react20.useState(true);
      const onClose = () => {
        setChannelClosedTimestamp(bannerChannel);
        setIsOpen(false);
      };
      return isOpen ? /* @__PURE__ */ import_react20.default.createElement(CloseableBanner, {
        onClose,
        ...bannerProps
      }) : null;
    };
    return Banner;
  };
  var withCloseable_default = withCloseable;

  // src/components/modules/banners/globalEoy/GlobalEoy.tsx
  var bannerStyles = css_browser_esm_default`
    background-color: #fff7e5;
    border-top: 1px solid #052962;
`;
  var GlobalEoyBanner = ({
    onClose,
    submitComponentEvent,
    tracking,
    countryCode,
    numArticles,
    content
  }) => {
    const onContributeClick = () => submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_EVENT_CONTRIBUTE_CLICK);
    const onCloseClick = () => {
      submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_EVENT_CLOSE_CLICK);
      onClose();
    };
    if (content && content.mobileMessageText) {
      return /* @__PURE__ */ import_react21.default.createElement(ContributionsTemplateWithVisual_default, {
        cssOverrides: bannerStyles,
        visual: /* @__PURE__ */ import_react21.default.createElement(GlobalEoyVisual_default, null),
        closeButton: /* @__PURE__ */ import_react21.default.createElement(GlobalEoyCloseButton_default, {
          onClose: onCloseClick
        }),
        header: /* @__PURE__ */ import_react21.default.createElement(GlobalEoyHeader_default, null),
        body: /* @__PURE__ */ import_react21.default.createElement(GlobalEoyBody_default, {
          numArticles: numArticles || 0,
          countryCode,
          body: content.messageText,
          mobileBody: content.mobileMessageText
        }),
        cta: /* @__PURE__ */ import_react21.default.createElement(GlobalEoyCta_default, {
          onContributeClick,
          tracking,
          countryCode: countryCode || ""
        })
      });
    }
    return null;
  };
  var wrapped = withCloseable_default(GlobalEoyBanner, "contributions");
})();
