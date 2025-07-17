/*! grapesjs-blocks-basic - 1.0.1 */ ! function (n, a) {
    'object' == typeof exports && 'object' == typeof module ? module.exports = a() : 'function' == typeof define && define.amd ? define([], a) : 'object' == typeof exports ? exports["gjs-blocks-basic"] = a() : n["gjs-blocks-basic"] = a()
}('undefined' != typeof globalThis ? globalThis : 'undefined' != typeof window ? window : this, (() => (() => {
    "use strict";
    var n = {
        d: (a, e) => {
            for (var t in e) n.o(e, t) && !n.o(a, t) && Object.defineProperty(a, t, {
                enumerable: !0,
                get: e[t]
            })
        },
        o: (n, a) => Object.prototype.hasOwnProperty.call(n, a),
        r: n => {
            'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
                value: 'Module'
            }), Object.defineProperty(n, '__esModule', {
                value: !0
            })
        }
    },
        a = {};
    n.r(a), n.d(a, {
        default: () => l
    });
    var e = void 0 && (void 0).__assign || function () {
        return e = Object.assign || function (n) {
            for (var a, e = 1, t = arguments.length; e < t; e++)
                for (var l in a = arguments[e]) Object.prototype.hasOwnProperty.call(a, l) && (n[l] = a[l]);
            return n
        }, e.apply(this, arguments)
    };
    var t = void 0 && (void 0).__assign || function () {
        return t = Object.assign || function (n) {
            for (var a, e = 1, t = arguments.length; e < t; e++)
                for (var l in a = arguments[e]) Object.prototype.hasOwnProperty.call(a, l) && (n[l] = a[l]);
            return n
        }, t.apply(this, arguments)
    };
    const l = function (n, a) {
        void 0 === a && (a = {}),
            function (n, a) {
                var t = n.BlockManager,
                    l = a.category,
                    o = a.blocks,
                    c = a.stylePrefix,
                    i = a.flexGrid,
                    d = a.rowHeight,
                    r = a.addBasicStyle,
                    s = "".concat(c, "row"),
                    v = "".concat(c, "cell"),
                    m = i ? "\n    .".concat(s, " {\n      display: flex;\n      justify-content: flex-start;\n      align-items: stretch;\n      flex-wrap: nowrap;\n      padding: 10px;\n    }\n    @media (max-width: 768px) {\n      .").concat(s, " {\n        flex-wrap: wrap;\n      }\n    }") : "\n    .".concat(s, " {\n      display: table;\n      padding: 10px;\n      width: 100%;\n    }\n    @media (max-width: 768px) {\n      .").concat(c, "cell, .").concat(c, "cell30, .").concat(c, "cell70 {\n        width: 100%;\n        display: block;\n      }\n    }"),
                    p = i ? "\n    .".concat(v, " {\n      min-height: ").concat(d, "px;\n      flex-grow: 1;\n      flex-basis: 100%;\n    }") : "\n    .".concat(v, " {\n      width: 8%;\n      display: table-cell;\n      height: ").concat(d, "px;\n    }"),
                    u = "\n  .".concat(c, "cell30 {\n    width: 30%;\n  }"),
                    b = "\n  .".concat(c, "cell70 {\n    width: 70%;\n  }"),
                    g = 1,
                    h = {
                        tl: 0,
                        tc: 0,
                        tr: 0,
                        cl: 0,
                        cr: 0,
                        bl: 0,
                        br: 0,
                        minDim: g
                    },
                    f = e(e({}, h), {
                        cr: 1,
                        bc: 0,
                        currentUnit: 1,
                        minDim: g,
                        step: .2
                    });
                i && (f.keyWidth = 'flex-basis');
                var y = {
                    class: s,
                    'data-gjs-droppable': ".".concat(v),
                    'data-gjs-resizable': h,
                    'data-gjs-name': 'Row'
                },
                    C = {
                        class: v,
                        'data-gjs-draggable': ".".concat(s),
                        'data-gjs-resizable': f,
                        'data-gjs-name': 'Cell'
                    };
                i && (C['data-gjs-unstylable'] = ['width'], C['data-gjs-stylable-require'] = ['flex-basis']);
                var x = [".".concat(s), ".".concat(v)];
                n.on('selector:add', (function (n) {
                    return x.indexOf(n.getFullName()) >= 0 && n.set('private', 1)
                }));
                var V = function (n) {
                    var a = [];
                    for (var e in n) {
                        var t = n[e];
                        t = t instanceof Array || t instanceof Object ? JSON.stringify(t) : t, a.push("".concat(e, "=").concat("'".concat(t, "'")))
                    }
                    return a.length ? " ".concat(a.join(' ')) : ''
                },
                    w = function (n) {
                        return o.indexOf(n) >= 0
                    },
                    L = V(y),
                    H = V(C),
                    M = {
                        category: l,
                        select: !0
                    };
                w('text') && t.add('text', e(e({}, M), {
                    activate: !0,
                    label: a.labelText,
                    media: "<svg viewBox=\"0 0 24 24\">\n        <path fill=\"currentColor\" d=\"M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z\" />\n      </svg>",
                    content: {
                        type: 'text',
                        content: 'Insert your text here',
                        style: {
                            "max-width": "800px",
                            "margin-left": "auto",
                            "margin-right": "auto",
                            padding: "10px",
                            color: "#551A8B"
                        }
                    },
                    draggable: false
                })), w('link') && t.add('link', e(e({}, M), {
                    label: a.labelLink,
                    media: "<svg viewBox=\"0 0 24 24\">\n        <path fill=\"currentColor\" d=\"M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z\" />\n      </svg>",
                    content: {
                        type: 'link',
                        content: 'Add your link here',
                        style: {
                            "max-width": "800px",
                            "margin-left": "auto",
                            "margin-right": "auto",
                            padding: "10px",
                            color: "#551A8B",
                            display: "block"
                        }
                    },
                    draggable: false,
                })),
                    w('image') && t.add('image', e(e({}, M), {
                        activate: !0,
                        label: a.labelImage,
                        media: "<svg viewBox=\"0 0 24 24\">\n        <path fill=\"currentColor\" d=\"M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z\" />\n      </svg>",
                        draggable: false,
                        content: {
                            content: '<div style="    position: relative;width: 100%;height: auto;transition: max-height 0.35s ease-out 0s;"><div tabindex="-1"><div><table cellpadding="0" cellspacing="0" class="ImageBlockContainer-hay267-0 laOfUh" data-ats-block="image" data-ats-block-id="image-5270e2a5f05f"><tbody><tr><td data-index="0"><div class="ImageBlockStyles-z77u4z-0 jzKKnB"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+"></div></td></tr></tbody></table></div></div></div>',
                            style: {
                                color: 'black', 'max-width': '800px', 'margin-left': 'auto', 'margin-right': 'auto', 'padding': '10px', display: 'block'
                            },
                            type: 'image'
                        },
                    })), w('horizontal_line') && t.add('horizontal_line', e(e({}, M), {
                        label: a.labelHorizontal,
                        media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="12" x2="24" y2="12" stroke="black" stroke-width="2" /></svg>',
                        content: '<hr>',
                        draggable: false
                    })), w('spacer') && t.add('spacer', e(e({}, M), {
                        label: a.labelSpacer,
                        media: '<svg viewBox="0 0 23 23" stroke-linecap="round" stroke-miterlimit="10"><g><path class="st0" d="M11.3,16V6 M19.8,4.5h-17 M2.8,17.5"></path><path class="st0" d="M11.3,6v10 M2.8,17.5h17 M19.8,4.5 M8.4,13.5l3,3l3-3"></path></g><polyline class="st0" points="14.3,8.5 11.3,5.6 8.4,8.5 "></polyline></svg>',
                        content: '<div height="20" style="background-color:transparent;height:20px;"></div>',
                        draggable: false
                    })), w('ordered_list') && t.add('ordered_list', e(e({}, M), {
                        label: a.labelOrdered,
                        media: '<div class="fa fa-list-ol" style="font-size:xx-large;"></div>',
                        content: {
                            content: '<ol data-gjs-highlightable="true"><li contenteditable="true" data-gjs-highlightable="true" style="padding:10px;">List Item 1</li><li data-gjs-highlightable="true" style="padding:10px;" contenteditable="true">List Item 2</li><li data-gjs-highlightable="true" contenteditable="true" style="padding:10px;">List Item 3</li></ol>',
                            style: {
                                'max-width': '800px', 'margin-left': 'auto', 'margin-right': 'auto',
                            }
                        },
                        draggable: false
                    })), w('unordered_list') && t.add('unordered_list', e(e({}, M), {
                        label: a.labelUnordered,
                        media: '<div class="fa fa-list-ul" style="font-size:xx-large;"></div>',
                        content: {content: '<ul data-gjs-highlightable="true"><li style="padding:10px;" data-gjs-highlightable="true" contenteditable="true">List Item 1</li><li contenteditable="true" style="padding:10px;" data-gjs-highlightable="true">List Item 2</li><li data-gjs-highlightable="true" contenteditable="true" style="padding:10px;">List Item 3</li></ul>',
                        style: {
                            'max-width': '800px', 'margin-left': 'auto', 'margin-right': 'auto'
                        }},
                        draggable: false
                    })), w('column1') && t.add('column1', e(e({}, M), {
                        label: a.labelColumn1,
                        media: "<svg viewBox=\"0 0 24 24\">\n        <path fill=\"currentColor\" d=\"M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z\"/>\n      </svg>",
                        content: {
                            content: "<div ".concat(L, ">\n        <div ").concat(H, "></div>\n      </div>\n      ").concat(r ? "<style>\n          ".concat(m, "\n          ").concat(p, "\n        </style>") : ''),
                            style: {
                                'max-width': '800px', 'margin-left': 'auto', 'margin-right': 'auto', 'padding': '10px'
                            }
                        },
                    })), w('column2') && t.add('column2', e(e({}, M), {
                        label: a.labelColumn2,
                        media: "<svg viewBox=\"0 0 23 24\">\n        <path fill=\"currentColor\" d=\"M2 20h8V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM13 20h8V4h-8v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z\"/>\n      </svg>",
                        content: {content:"<div ".concat(L, ">\n        <div ").concat(H, "></div>\n        <div ").concat(H, "></div>\n      </div>\n      ").concat(r ? "<style>\n          ".concat(m, "\n          ").concat(p, "\n        </style>") : ''), style: {
                            'max-width': '800px', 'margin-left': 'auto', 'margin-right': 'auto', 'padding': '10px'
                        }},
                    })), w('column3') && t.add('column3-7', e(e({}, M), {
                        label: a.labelColumn37,
                        media: "<svg viewBox=\"0 0 24 24\">\n        <path fill=\"currentColor\" d=\"M2 20h5V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM10 20h12V4H10v16Zm-1 0V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1Z\"/>\n      </svg>",
                        content: {content: "<div ".concat(L, ">\n        <div ").concat(H, " style='").concat(i ? 'flex-basis' : 'width', ": 30%;'></div>\n        <div ").concat(H, " style='").concat(i ? 'flex-basis' : 'width', ": 70%;'></div>\n      </div>\n      ").concat(r ? "<style>\n          ".concat(m, "\n          ").concat(p, "\n          ").concat(u, "\n          ").concat(b, "\n        </style>") : ''), style: {
                            'max-width': '800px', 'margin-left': 'auto', 'margin-right': 'auto', 'padding': '10px'
                        }},
                    })), w('snippets')
            }(n, t({
                blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'horizontal_line', 'spacer', 'ordered_list', 'unordered_list', 'video'],
                flexGrid: !1,
                stylePrefix: 'gjs-',
                addBasicStyle: !0,
                category: 'Basic',
                labelColumn1: '1 Column',
                labelColumn2: '2 Columns',
                labelHorizontal: 'Horizontal Line',
                labelSpacer: 'Spacer',
                labelColumn37: '2 Columns 3/7',
                labelOrdered: 'Ordered List',
                labelUnordered: 'Unordered List',
                labelText: 'Text',
                labelButton: "Button",
                labelLink: 'Link',
                labelImage: 'Image',
                labelVideo: 'Video',
                rowHeight: 75
            }, a))
    };
    return a
})()));
//# sourceMappingURL=index.js.map