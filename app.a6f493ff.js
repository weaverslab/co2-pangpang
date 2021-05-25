// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"1/blackCloud.png":[function(require,module,exports) {
module.exports = "/blackCloud.435f295a.png";
},{}],"1/app.js":[function(require,module,exports) {
"use strict";

var _blackCloud = _interopRequireDefault(require("./blackCloud.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    // screen setting
    this.canvas = document.getElementById("app");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.statusElm = document.getElementById("status");
    this.inputElm = document.getElementById("input");
    this.inputWordElm = document.getElementById("inputWord");
    this.startElm = document.getElementById("start");
    this.resultElm = document.getElementById("result");
    this.finalScoreElm = document.getElementById("finalScore");
    this.playElm = document.getElementById("play"); // game setting

    this.defaultSpeed = 3;
    this.speedVariable = 3;
    this.defaultSpawnInterval = 2000;
    this.life = 10;
    this.spawnT = undefined;
    this.scoreT = undefined; // game data

    this.words = [];
    this.keywords = ["고양이", "강아지", "거북이", "토끼", "뱀", "사자", "호랑이", "표범", "치타", "하이에나", "기린", "코끼리", "코뿔소", "하마", "악어", "펭귄", "부엉이", "올빼미", "곰", "돼지", "소", "닭", "독수리", "타조", "고릴라", "오랑우탄", "침팬지", "원숭이", "코알라", "캥거루", "고래", "상어", "칠면조", "직박구리", "쥐", "청설모", "메추라기", "앵무새", "삵", "스라소니", "판다", "오소리", "오리", "거위", "백조", "두루미", "고슴도치", "두더지", "우파루파", "맹꽁이"];
    this.onScreenKeywords = [];
    this.score = 0; // event listener

    this.resize();
    this.inputWordElm.addEventListener("keydown", this.handleInput.bind(this));
    this.playElm.addEventListener("click", this.start.bind(this));
    window.addEventListener("resize", this.resize.bind(this), false);
  }

  _createClass(App, [{
    key: "resize",
    value: function resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }
  }, {
    key: "handleInput",
    value: function handleInput(e) {
      if (e.code === "Enter") {
        var inputText = this.inputWordElm.value;
        this.removeWord(inputText);
        this.inputWordElm.value = "";
      }
    }
  }, {
    key: "scoring",
    value: function scoring() {
      var _this = this;

      this.scoreT = setInterval(function () {
        _this.score += 1;

        if (_this.score % 15 === 0) {
          _this.defaultSpawnInterval /= 2;
        }
      }, 1000);
    }
  }, {
    key: "spawnWord",
    value: function spawnWord() {
      var _this2 = this;

      this.spawnT = setTimeout(function () {
        _this2.addWord();

        _this2.spawnWord();
      }, this.defaultSpawnInterval + Math.floor((Math.random() - 0.5) * 1000));
    }
  }, {
    key: "addWord",
    value: function addWord() {
      var _this3 = this;

      var candidate = this.keywords.filter(function (keyword) {
        return !_this3.onScreenKeywords.includes(keyword);
      });
      var text = candidate[Math.floor(Math.random() * candidate.length)];
      this.onScreenKeywords.push(text);
      this.makeWord(text);
    }
  }, {
    key: "makeWord",
    value: function makeWord(text) {
      var elm = document.createElement("div");
      elm.classList.add("word");
      elm.innerHTML = "<span>".concat(text, "</span>");
      var img = document.createElement("img");
      img.src = _blackCloud.default;
      elm.appendChild(img);
      var pos = {
        bottom: -20,
        left: Math.random() * (this.width - 160)
      };
      var word = {
        elm: elm,
        pos: pos,
        text: text,
        speed: this.defaultSpeed + Math.random() * this.speedVariable
      };
      this.words.push(word);
      this.canvas.appendChild(elm);
    }
  }, {
    key: "removeWord",
    value: function removeWord(text) {
      var wordIdx = this.words.findIndex(function (word) {
        return word.text === text;
      });

      if (wordIdx < 0) {
        return;
      }

      var onScreenIdx = this.onScreenKeywords.findIndex(function (word) {
        return word.text === text;
      });
      this.canvas.removeChild(this.words[wordIdx].elm);
      this.words.splice(wordIdx, 1);
      this.onScreenKeywords.splice(onScreenIdx, 1);
    }
  }, {
    key: "update",
    value: function update() {
      var _this4 = this;

      this.words.forEach(function (word) {
        word.pos.bottom += word.speed;

        if (word.pos.bottom > _this4.height - 210) {
          _this4.life -= 1;

          _this4.removeWord(word.text);

          _this4.showStatus();
        }
      });
    }
  }, {
    key: "move",
    value: function move() {
      this.words.forEach(function (word) {
        word.elm.style.bottom = word.pos.bottom + "px";
        word.elm.style.left = word.pos.left + "px";
      });
    }
  }, {
    key: "showStatus",
    value: function showStatus() {
      // life info
      this.statusElm.innerHTML = "\n      <svg\n        width=\"24\"\n        height=\"24\"\n        viewBox=\"0 0 24 24\"\n      >\n        <path d=\"M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z\" />\n      </svg>\n      <span>".concat(this.life, "</span>\n      ");
    }
  }, {
    key: "init",
    value: function init() {
      this.inputElm.style.display = "block";
      this.startElm.style.display = "none";
      this.inputWordElm.focus();
    }
  }, {
    key: "start",
    value: function start() {
      this.init();
      this.showStatus();
      this.addWord();
      this.spawnWord();
      this.scoring();
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: "gameover",
    value: function gameover() {
      clearTimeout(this.spawnT);
      clearInterval(this.scoreT);
      this.finalScoreElm.innerHTML = "\uCD5C\uC885 \uC810\uC218 : ".concat(this.score, " \uCD08");
      this.resultElm.style.display = "flex";
    }
  }, {
    key: "animate",
    value: function animate(t) {
      this.update();
      this.move();

      if (this.life > 0) {
        window.requestAnimationFrame(this.animate.bind(this));
      } else {
        this.gameover();
      }
    }
  }, {
    key: "isMobile",
    value: function isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  }]);

  return App;
}();

window.onload = function () {
  var app = new App();
};
},{"./blackCloud.png":"1/blackCloud.png"}],"../../../.nvm/versions/node/v12.18.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59709" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.nvm/versions/node/v12.18.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","1/app.js"], null)
//# sourceMappingURL=/app.a6f493ff.js.map