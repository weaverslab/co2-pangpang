parcelRequire = (function (e, r, t, n) {
  var i,
    o = "function" == typeof parcelRequire && parcelRequire,
    u = "function" == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      (p.resolve = function (r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function (e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function (r, t) {
      e[r] = [
        function (e, r) {
          r.exports = t;
        },
        {},
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = l)
      : "function" == typeof define && define.amd
      ? define(function () {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    EtVE: [
      function (require, module, exports) {
        module.exports = "./blackCloud.dc392bb5.png";
      },
      {},
    ],
    PPhw: [
      function (require, module, exports) {
        "use strict";
        var t = e(require("./blackCloud.png"));
        function e(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function i(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function n(t, e) {
          for (var i = 0; i < e.length; i++) {
            var n = e[i];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, n.key, n);
          }
        }
        function s(t, e, i) {
          return e && n(t.prototype, e), i && n(t, i), t;
        }
        var o = (function () {
          function e() {
            i(this, e),
              (this.canvas = document.getElementById("app")),
              (this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1),
              (this.width = window.innerWidth),
              (this.height = window.innerHeight),
              (this.statusElm = document.getElementById("status")),
              (this.inputElm = document.getElementById("input")),
              (this.inputWordElm = document.getElementById("inputWord")),
              (this.startElm = document.getElementById("start")),
              (this.resultElm = document.getElementById("result")),
              (this.finalScoreElm = document.getElementById("finalScore")),
              (this.playElm = document.getElementById("play")),
              (this.defaultSpeed = 3),
              (this.speedVariable = 3),
              (this.defaultSpawnInterval = 2e3),
              (this.life = 10),
              (this.spawnT = void 0),
              (this.scoreT = void 0),
              (this.words = []),
              (this.keywords = [
                "고양이",
                "강아지",
                "거북이",
                "토끼",
                "뱀",
                "사자",
                "호랑이",
                "표범",
                "치타",
                "하이에나",
                "기린",
                "코끼리",
                "코뿔소",
                "하마",
                "악어",
                "펭귄",
                "부엉이",
                "올빼미",
                "곰",
                "돼지",
                "소",
                "닭",
                "독수리",
                "타조",
                "고릴라",
                "오랑우탄",
                "침팬지",
                "원숭이",
                "코알라",
                "캥거루",
                "고래",
                "상어",
                "칠면조",
                "직박구리",
                "쥐",
                "청설모",
                "메추라기",
                "앵무새",
                "삵",
                "스라소니",
                "판다",
                "오소리",
                "오리",
                "거위",
                "백조",
                "두루미",
                "고슴도치",
                "두더지",
                "우파루파",
                "맹꽁이",
              ]),
              (this.onScreenKeywords = []),
              (this.score = 0),
              this.resize(),
              this.inputWordElm.addEventListener(
                "keydown",
                this.handleInput.bind(this)
              ),
              this.playElm.addEventListener("click", this.start.bind(this)),
              window.addEventListener("resize", this.resize.bind(this), !1);
          }
          return (
            s(e, [
              {
                key: "resize",
                value: function () {
                  (this.width = window.innerWidth),
                    (this.height = window.innerHeight);
                },
              },
              {
                key: "handleInput",
                value: function (t) {
                  if ("Enter" === t.code) {
                    var e = this.inputWordElm.value;
                    this.removeWord(e), (this.inputWordElm.value = "");
                  }
                },
              },
              {
                key: "scoring",
                value: function () {
                  var t = this;
                  this.scoreT = setInterval(function () {
                    (t.score += 1),
                      t.score % 15 == 0 && (t.defaultSpawnInterval /= 2);
                  }, 1e3);
                },
              },
              {
                key: "spawnWord",
                value: function () {
                  var t = this;
                  this.spawnT = setTimeout(function () {
                    t.addWord(), t.spawnWord();
                  }, this.defaultSpawnInterval +
                    Math.floor(1e3 * (Math.random() - 0.5)));
                },
              },
              {
                key: "addWord",
                value: function () {
                  var t = this,
                    e = this.keywords.filter(function (e) {
                      return !t.onScreenKeywords.includes(e);
                    }),
                    i = e[Math.floor(Math.random() * e.length)];
                  this.onScreenKeywords.push(i), this.makeWord(i);
                },
              },
              {
                key: "makeWord",
                value: function (e) {
                  var i = document.createElement("div");
                  i.classList.add("word"),
                    (i.innerHTML = "<span>".concat(e, "</span>"));
                  var n = document.createElement("img");
                  (n.src = t.default), i.appendChild(n);
                  var s = {
                    elm: i,
                    pos: {
                      bottom: -20,
                      left: Math.random() * (this.width - 160),
                    },
                    text: e,
                    speed:
                      this.defaultSpeed + Math.random() * this.speedVariable,
                  };
                  this.words.push(s), this.canvas.appendChild(i);
                },
              },
              {
                key: "removeWord",
                value: function (t) {
                  var e = this.words.findIndex(function (e) {
                    return e.text === t;
                  });
                  if (!(e < 0)) {
                    var i = this.onScreenKeywords.findIndex(function (e) {
                      return e.text === t;
                    });
                    this.canvas.removeChild(this.words[e].elm),
                      this.words.splice(e, 1),
                      this.onScreenKeywords.splice(i, 1);
                  }
                },
              },
              {
                key: "update",
                value: function () {
                  var t = this;
                  this.words.forEach(function (e) {
                    (e.pos.bottom += e.speed),
                      e.pos.bottom > t.height - 210 &&
                        ((t.life -= 1), t.removeWord(e.text), t.showStatus());
                  });
                },
              },
              {
                key: "move",
                value: function () {
                  this.words.forEach(function (t) {
                    (t.elm.style.bottom = t.pos.bottom + "px"),
                      (t.elm.style.left = t.pos.left + "px");
                  });
                },
              },
              {
                key: "showStatus",
                value: function () {
                  this.statusElm.innerHTML =
                    '\n      <svg\n        width="24"\n        height="24"\n        viewBox="0 0 24 24"\n      >\n        <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />\n      </svg>\n      <span>'.concat(
                      this.life,
                      "</span>\n      "
                    );
                },
              },
              {
                key: "init",
                value: function () {
                  (this.inputElm.style.display = "block"),
                    (this.startElm.style.display = "none"),
                    this.inputWordElm.focus();
                },
              },
              {
                key: "start",
                value: function () {
                  this.init(),
                    this.showStatus(),
                    this.addWord(),
                    this.spawnWord(),
                    this.scoring(),
                    window.requestAnimationFrame(this.animate.bind(this));
                },
              },
              {
                key: "gameover",
                value: function () {
                  clearTimeout(this.spawnT),
                    clearInterval(this.scoreT),
                    (this.finalScoreElm.innerHTML = "최종 점수 : ".concat(
                      this.score,
                      " 초"
                    )),
                    (this.resultElm.style.display = "flex");
                },
              },
              {
                key: "animate",
                value: function (t) {
                  this.update(),
                    this.move(),
                    this.life > 0
                      ? window.requestAnimationFrame(this.animate.bind(this))
                      : this.gameover();
                },
              },
              {
                key: "isMobile",
                value: function () {
                  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                  );
                },
              },
            ]),
            e
          );
        })();
        window.onload = function () {
          new o();
        };
      },
      { "./blackCloud.png": "EtVE" },
    ],
  },
  {},
  ["PPhw"],
  null
);
//# sourceMappingURL=/app.531be961.js.map
