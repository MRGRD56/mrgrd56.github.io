(self.webpackChunkmrgrd56_github_io=self.webpackChunkmrgrd56_github_io||[]).push([[8746],{54450:function(u,e,a){"use strict";a(72791);var n=a(19603),t=a(87309),c=a(11289),r=a(60732),f=a(80184);e.Z=function(u){var e=u.title,a=void 0===e?"Settings":e,i=u.onClose,s=u.children;return(0,f.jsxs)(n.Z,{className:c.Z.formContainer,children:[(0,f.jsxs)("div",{className:c.Z.title,children:[(0,f.jsx)("h3",{className:"mb-0",children:a}),(0,f.jsx)("div",{className:c.Z.rightSide,children:i&&(0,f.jsx)(t.Z,{size:"small",type:"text",icon:(0,f.jsx)(r.Z,{}),onClick:i})})]}),s]})}},40553:function(u,e,a){"use strict";a.d(e,{y:function(){return c}});var n=a(763),t=a(1951),c=function(u){return(0,n.isObject)(u)&&"target"in u};e.Z=function(u){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"value";return function(a){var n=(0,t.Z)((function(){return c(a)?a.target[e]:a}));u(n)}}},71071:function(u,e,a){"use strict";a.d(e,{Z:function(){return s}});var n=a(72791),t=a(1951),c=a(4942),r=a(1413),f=function(u){return(0,n.useCallback)((function(e,a){u((function(u){return(0,r.Z)((0,r.Z)({},u),{},(0,c.Z)({},e,a))}))}),[])},i=a(40553),s=function(u){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"value",a=f(u);return(0,n.useCallback)((function(u){return function(n){var c=(0,t.Z)((function(){return(0,i.y)(n)?n.target[e]:n}));a(u,c)}}),[a])}},8273:function(u,e,a){"use strict";a.r(e),a.d(e,{default:function(){return gu}});var n,t=a(1413),c=a(44925),r=a(4942);a(72791);!function(u){u.NONE="NONE",u.ES_MODULE="ES_MODULE",u.COMMONJS="COMMONJS"}(n||(n={}));var f,i,s,o=n,d=a(43144),b=a(15671),l=a(60136),p=a(29388),h=(0,d.Z)((function u(e){(0,b.Z)(this,u),this.fields=e})),m=(0,d.Z)((function u(e){(0,b.Z)(this,u),this.types=e})),y=function(u){(0,l.Z)(a,u);var e=(0,p.Z)(a);function a(u){var n;return(0,b.Z)(this,a),(n=e.call(this,u)).fields=u,n}return(0,d.Z)(a)}(h),v=function(u){(0,l.Z)(a,u);var e=(0,p.Z)(a);function a(u){var n;return(0,b.Z)(this,a),(n=e.call(this,u)).types=u,n}return(0,d.Z)(a)}(m),g=a(763),N=function(u,e){var a;return(0,g.isString)(u)?"null"===u&&null!==(a=e.nullType)&&void 0!==a?a:u:u.stringifyReference(e)},Z=a(21131);!function(u){u.NULL="null",u.UNDEFINED="undefined"}(f||(f={})),function(u){u.UNKNOWN="unknown",u.ANY="any"}(i||(i={})),function(u){u.INTERFACE="INTERFACE",u.TYPE="TYPE"}(s||(s={}));var E,x=function(u){return S.test(u)},$=function(u){return x(u)||j.test(u)},C=x,S=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc][$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc0-9\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19b0-\u19c0\u19c8\u19c9\u19d0-\u19d9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]*$/,j=/^\d+$/,w=function(){function u(e,a){(0,b.Z)(this,u),this.name=void 0,this.type=void 0,this.name=e,this.type=a}return(0,d.Z)(u,[{key:"stringifyDeclaration",value:function(u){return(0,g.isObject)(this.type)&&"stringifyDeclaration"in this.type?this.type.stringifyDeclaration(u):"".concat(D(u.exportType),"type ").concat(M(this.name)," = ").concat(this.stringifyDeclarationBody(u),";")}},{key:"stringifyDeclarationBody",value:function(u){return(0,g.isString)(this.type)?N(this.type,u):"stringifyDeclarationBody"in this.type?this.type.stringifyDeclarationBody(u):"stringifyReference"in this.type?this.type.stringifyReference(u):""}}]),u}(),A=function(){function u(){(0,b.Z)(this,u),this.isUnknown=!0}return(0,d.Z)(u,[{key:"stringifyReference",value:function(u){var e;return null!==(e=u.unknownType)&&void 0!==e?e:"unknown"}}]),u}(),O=function(){function u(e){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];(0,b.Z)(this,u),this.type=e,this.isOptional=a}return(0,d.Z)(u,[{key:"stringifyDeclarationBody",value:function(u){return"".concat(this.isOptional?"?":"",": ").concat(N(this.type,u))}}]),u}(),_=function(){function u(e,a){(0,b.Z)(this,u),this.name=e,this.fields=a}return(0,d.Z)(u,[{key:"stringifyDeclaration",value:function(u){var e,a,n=D(u.exportType),t=this.stringifyReference(u),c=this.stringifyDeclarationBody(u),f=null!==(e=u.objectDeclaration)&&void 0!==e?e:s.INTERFACE;return(a={},(0,r.Z)(a,s.INTERFACE,"".concat(n,"interface ").concat(t," ").concat(c)),(0,r.Z)(a,s.TYPE,"".concat(n,"type ").concat(t," = ").concat(c,";")),a)[f]}},{key:"stringifyDeclarationBody",value:function(u){return"{\n"+(0,Z.Z)(this.fields,(function(e,a){return"    ".concat(I(e)).concat(a.stringifyDeclarationBody(u),";")})).join("\n")+"\n}"}},{key:"stringifyReference",value:function(u){return M(this.name)}}]),u}(),k=function(){function u(e){(0,b.Z)(this,u),this.type=e}return(0,d.Z)(u,[{key:"stringifyReference",value:function(u){var e=N(this.type,u);return this.type instanceof R?"Array<".concat(e,">"):"".concat(e,"[]")}}]),u}(),T=(0,d.Z)((function u(e,a){(0,b.Z)(this,u),this.name=e,this.types=a})),R=function(u){(0,l.Z)(a,u);var e=(0,p.Z)(a);function a(u,n){var t;return(0,b.Z)(this,a),(t=e.call(this,u,n)).name=u,t.types=n,t}return(0,d.Z)(a,[{key:"stringifyDeclarationBody",value:function(u){return this.types.map((function(e){return N(e,u)})).join(" | ")}},{key:"stringifyReference",value:function(u){return this.stringifyDeclarationBody(u)}}]),a}(T),L=function(u){(0,l.Z)(a,u);var e=(0,p.Z)(a);function a(u,n){var t;return(0,b.Z)(this,a),(t=e.call(this,u,n)).name=u,t.types=n,t}return(0,d.Z)(a,[{key:"stringifyDeclarationBody",value:function(u){return"["+this.types.map((function(e){return N(e,u)})).join(", ")+"]"}},{key:"stringifyReference",value:function(u){return this.stringifyDeclarationBody(u)}}]),a}(T),D=function(){var u,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o.NONE;return(u={},(0,r.Z)(u,o.NONE,""),(0,r.Z)(u,o.ES_MODULE,"export "),(0,r.Z)(u,o.COMMONJS,"module.exports = "),u)[e]},I=function(u){return $(u)?u:"'".concat(u,"'")},M=function(u){var e;if(C(u))return u;var a=u;return null!==(e=a)&&void 0!==e&&e.trim()||(a="Type"),/^\d$/.test(a[0])&&(a="N"+a),(0,g.filter)(a,$).join("")},P=a(44799),U=a(93433),B=function(u,e){return e.length>1&&(0,g.remove)(e,(function(u){return u instanceof A})),0===e.length?new A:1===e.length?e[0]:new R(u,e)},K=function u(e,a,n){var t=e,c=B("",[e,a]);if((0,g.isString)(e)&&(0,g.isString)(a))return e===a?t:c;if(e instanceof _&&a instanceof _){var r=Object.keys(e.fields),f=Object.keys(a.fields),i=(0,g.chain)([r,f]).flatMap().uniq().value(),s=(0,g.chain)(i).reduce((function(t,c){var i=r.includes(c),s=f.includes(c),o=e.fields[c],d=a.fields[c];if(!i&&!s)return console.error("Both keys are undefined"),t;if(i&&!s)return t[c]=new O(o.type,!0),t;if(!i&&s)return t[c]=new O(d.type,!0),t;var b=o.isOptional||d.isOptional,l=u(o.type,d.type,n);return t[c]=new O(l,b),t}),{}).value();return new _(e.name,s)}if(e instanceof k&&a instanceof k){var o=u(e.type,a.type,n);return new k(o)}if(e instanceof R||a instanceof R){if(e instanceof R&&a instanceof R)return new R(e.name,(0,g.uniq)([].concat((0,U.Z)(e.types),(0,U.Z)(a.types))));var d=e instanceof R?e:a instanceof R?a:void 0,b=e instanceof R?a:a instanceof R?e:void 0;if(void 0===d||void 0===b)throw new Error;var l=new R(d.name,(0,g.uniq)([].concat((0,U.Z)(d.types),[b])));if((0,g.isString)(b))return l;var p=d.types.findIndex((function(u){return u.constructor===b.constructor}));if(-1===p)return l;var h=d.types[p];return d.types[p]=u(h,b,n),d}return c},z=function(u,e){return u.reduce((function(u,a){return void 0===u?a:K(u,a,e)}),void 0)},F=function u(e,a,n){var t,c,r=n.typeNameTransformer?n.typeNameTransformer(e):e,f=null!==(t=n.typeNameTransformer)&&void 0!==t?t:function(u){return u},i=null!==(c=n.fieldNameTransformer)&&void 0!==c?c:function(u){return u},s=f(r),o=(0,P.singular)(s);if((0,g.isString)(a))return a;if(a instanceof v){if(n.isTuplesEnabled){if(0===a.types.length)return new L("",[]);var d=a.types.map((function(e){return u(o,e,n)}));return new L(o,d)}if(0===a.types.length)return new k(new A);var b=a.types.map((function(e){return u(o,e,n)})),l=z(b,n);return new k(l)}return new _(s,(0,g.chain)(a.fields).mapValues((function(e,a){return new O(u(i(a),e,n))})).mapKeys((function(u,e){return i(e)})).value())},q=function u(e){if((0,g.isObject)(e))return(0,g.isArray)(e)?new v((0,g.chain)(e).map(u).value()):new y((0,g.mapValues)(e,(function(e){return u(e)})));if((0,g.isNil)(e))return"null";if("number"===typeof e||"bigint"===typeof e)return"number";if((0,g.isString)(e))return"string";if((0,g.isBoolean)(e))return"boolean";throw console.error({object:e}),new Error("Unable to parse JSON object")},J=a(29439),G=function u(e,a){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if((0,g.isString)(e)||e instanceof A)return[];if(e instanceof T)return e.types.flatMap((function(e){return u(e,a,!0)}));if(e instanceof k)return u(e.type,a,!0);var t=(0,Z.Z)(e.fields,(function(e,n){return u(n.type,a,!0)})).flatMap((function(u){return u}));return n&&(a.isReversedOrder?t.unshift(e):t.push(e)),t},Y=function u(e,a){var n=/^(.*?)(\d+)$/.exec(e.name);if(n){var t=(0,J.Z)(n,3),c=t[1],r=t[2],f=Number(r);e.name="".concat(c).concat(f+1)}else e.name+="2";a(e)&&u(e,a)},W=function(u,e,a){var n=function(u,e,a){var n=G(u,a),t=(0,g.isObject)(u)&&"stringifyDeclaration"in u?u:new w(e,u);return a.isReversedOrder?n.unshift(t):n.push(t),n}(u,a.typeNameTransformer?a.typeNameTransformer(e):e,a),t=[];return n.forEach((function(u){var e=function(u){return t.some((function(e){return e.name===u.name}))};e(u)&&Y(u,e),t.push(u)})),n.map((function(u){return u.stringifyDeclaration(a)})).join("\n\n")},V=function(u,e){var a=JSON.parse(u),n=q(a),t=e.rootTypeName,c=F(t,n,e);return W(c,t,e)},Q=a(65401);!function(u){u.NONE="NONE",u.CAMEL_CASE="CAMEL_CASE",u.PASCAL_CASE="PASCAL_CASE",u.SNAKE_CASE="SNAKE_CASE",u.SCREAMING_SNAKE_CASE="SCREAMING_SNAKE_CASE",u.KEBAB_CASE="KEBAB_CASE"}(E||(E={}));var H,X=function(u){return u.charAt(0).toUpperCase()+u.slice(1)},uu=function(u){return X((0,g.camelCase)(u))},eu=a(25886),au=a(18437),nu=a(25581),tu=a(47528),cu=a(71071),ru=a(11289),fu=a(13597),iu=a(81694),su=a.n(iu),ou=a(54450),du=a(80184),bu=function(u){var e=u.options,a=u.onOptionsChange,n=u.onClose,t=(0,cu.Z)(a);return(0,du.jsxs)(ou.Z,{onClose:n,children:[(0,du.jsxs)("label",{className:ru.Z.formItem,children:[(0,du.jsx)("span",{className:ru.Z.label,children:"Root type name"}),(0,du.jsx)(eu.Z,{className:ru.Z.input,value:e.rootTypeName,onChange:t("rootTypeName")})]}),(0,du.jsxs)("label",{className:ru.Z.formItem,children:[(0,du.jsx)("span",{className:ru.Z.label,children:"Export type"}),(0,du.jsxs)(au.Z,{className:ru.Z.input,value:e.exportType,onChange:t("exportType"),children:[(0,du.jsx)(au.Z.Option,{children:"None"},o.NONE),(0,du.jsx)(au.Z.Option,{children:"ES Module"},o.ES_MODULE),(0,du.jsx)(au.Z.Option,{children:(0,du.jsx)(fu.Z,{type:"danger",title:"CommonJS",children:"CommonJS"})},o.COMMONJS)]})]}),(0,du.jsxs)("label",{className:ru.Z.formItem,children:[(0,du.jsx)("span",{className:ru.Z.label,children:"Field names"}),(0,du.jsxs)(au.Z,{className:ru.Z.input,value:e.fieldNameTransformer,onChange:t("fieldNameTransformer"),children:[(0,du.jsx)(au.Z.Option,{children:"Not change"},E.NONE),(0,du.jsx)(au.Z.Option,{children:"camelCase"},E.CAMEL_CASE),(0,du.jsx)(au.Z.Option,{children:"PascalCase"},E.PASCAL_CASE),(0,du.jsx)(au.Z.Option,{children:"snake_case"},E.SNAKE_CASE),(0,du.jsx)(au.Z.Option,{children:"SCREAMING_SNAKE_CASE"},E.SCREAMING_SNAKE_CASE),(0,du.jsx)(au.Z.Option,{children:"kebab-case"},E.KEBAB_CASE)]})]}),(0,du.jsxs)("label",{className:ru.Z.formItem,children:[(0,du.jsx)("span",{className:ru.Z.label,children:"Type names"}),(0,du.jsxs)(au.Z,{className:ru.Z.input,value:e.typeNameTransformer,onChange:t("typeNameTransformer"),children:[(0,du.jsx)(au.Z.Option,{children:"Not change"},E.NONE),(0,du.jsx)(au.Z.Option,{children:"camelCase"},E.CAMEL_CASE),(0,du.jsx)(au.Z.Option,{children:"PascalCase"},E.PASCAL_CASE),(0,du.jsx)(au.Z.Option,{children:"snake_case"},E.SNAKE_CASE),(0,du.jsx)(au.Z.Option,{children:"SCREAMING_SNAKE_CASE"},E.SCREAMING_SNAKE_CASE)]})]}),(0,du.jsxs)("label",{className:ru.Z.formItem,children:[(0,du.jsx)("span",{className:ru.Z.label,children:"Unknown type"}),(0,du.jsxs)(au.Z,{className:ru.Z.input,value:e.unknownType,onChange:t("unknownType"),children:[(0,du.jsx)(au.Z.Option,{children:"unknown"},i.UNKNOWN),(0,du.jsx)(au.Z.Option,{children:"any"},i.ANY)]})]}),(0,du.jsxs)("label",{className:ru.Z.formItem,children:[(0,du.jsx)("span",{className:ru.Z.label,children:"Null type"}),(0,du.jsxs)(au.Z,{className:ru.Z.input,value:e.nullType,onChange:t("nullType"),children:[(0,du.jsx)(au.Z.Option,{children:"null"},f.NULL),(0,du.jsx)(au.Z.Option,{children:"undefined"},f.UNDEFINED)]})]}),(0,du.jsxs)("label",{className:ru.Z.formItem,children:[(0,du.jsx)("span",{className:ru.Z.label,children:"Object declaration"}),(0,du.jsxs)(au.Z,{className:ru.Z.input,value:e.objectDeclaration,onChange:t("objectDeclaration"),children:[(0,du.jsx)(au.Z.Option,{children:"Interface"},s.INTERFACE),(0,du.jsx)(au.Z.Option,{children:"Type"},s.TYPE)]})]}),(0,du.jsxs)("label",{className:su()("mt-1",ru.Z.formItem),children:[(0,du.jsx)(nu.Z,{checked:e.isReversedOrder,onChange:t("isReversedOrder")}),(0,du.jsx)("span",{className:"ms-3",children:"Reverse declarations"})]}),(0,du.jsxs)("label",{className:su()("mt-1",ru.Z.formItem),children:[(0,du.jsx)(nu.Z,{checked:e.isTuplesEnabled,onChange:t("isTuplesEnabled")}),(0,du.jsxs)(fu.Z,{className:"ms-3",children:["Enable tuples"," ",(0,du.jsx)(tu.Z,{color:"warning",className:"ms-1",children:"experimental"})]})]})]})},lu=function(u){return(0,g.snakeCase)(u).toLocaleUpperCase()},pu=a(37823),hu=["fieldNameTransformer","typeNameTransformer"],mu={rootTypeName:"Root",exportType:o.ES_MODULE,isReversedOrder:!0,typeNameTransformer:E.PASCAL_CASE,fieldNameTransformer:E.NONE,isTuplesEnabled:!1,nullType:f.NULL,unknownType:i.UNKNOWN,objectDeclaration:s.INTERFACE},yu=(H={},(0,r.Z)(H,E.NONE,(function(u){return u})),(0,r.Z)(H,E.CAMEL_CASE,g.camelCase),(0,r.Z)(H,E.PASCAL_CASE,uu),(0,r.Z)(H,E.SNAKE_CASE,g.snakeCase),(0,r.Z)(H,E.SCREAMING_SNAKE_CASE,lu),(0,r.Z)(H,E.KEBAB_CASE,g.kebabCase),H),vu=function(u,e){return V(u,function(u){var e=u.fieldNameTransformer,a=u.typeNameTransformer,n=(0,c.Z)(u,hu);return(0,t.Z)((0,t.Z)({},n),{},{fieldNameTransformer:yu[e],typeNameTransformer:yu[a]})}(e))},gu=function(){return(0,du.jsx)(pu.Z,{source1:{title:"JSON",language:"json"},source2:{title:"TypeScript",language:"typescript"},defaultOptions:mu,convert1to2:vu,optionsStorageKey:(0,Q.Z)("json-to-typescript","conversionOptions"),renderOptionsPopover:bu})}},21131:function(u,e){"use strict";e.Z=function(u,e){return Object.keys(u).map((function(a,n){return e(a,u[a],n)}))}},44799:function(u){u.exports=function(){var u=[],e=[],a={},n={},t={};function c(u){return"string"===typeof u?new RegExp("^"+u+"$","i"):u}function r(u,e){return u===e?e:u===u.toLowerCase()?e.toLowerCase():u===u.toUpperCase()?e.toUpperCase():u[0]===u[0].toUpperCase()?e.charAt(0).toUpperCase()+e.substr(1).toLowerCase():e.toLowerCase()}function f(u,e){return u.replace(/\$(\d{1,2})/g,(function(u,a){return e[a]||""}))}function i(u,e){return u.replace(e[0],(function(a,n){var t=f(e[1],arguments);return r(""===a?u[n-1]:a,t)}))}function s(u,e,n){if(!u.length||a.hasOwnProperty(u))return e;for(var t=n.length;t--;){var c=n[t];if(c[0].test(e))return i(e,c)}return e}function o(u,e,a){return function(n){var t=n.toLowerCase();return e.hasOwnProperty(t)?r(n,t):u.hasOwnProperty(t)?r(n,u[t]):s(t,n,a)}}function d(u,e,a,n){return function(n){var t=n.toLowerCase();return!!e.hasOwnProperty(t)||!u.hasOwnProperty(t)&&s(t,t,a)===t}}function b(u,e,a){return(a?e+" ":"")+(1===e?b.singular(u):b.plural(u))}return b.plural=o(t,n,u),b.isPlural=d(t,n,u),b.singular=o(n,t,e),b.isSingular=d(n,t,e),b.addPluralRule=function(e,a){u.push([c(e),a])},b.addSingularRule=function(u,a){e.push([c(u),a])},b.addUncountableRule=function(u){"string"!==typeof u?(b.addPluralRule(u,"$0"),b.addSingularRule(u,"$0")):a[u.toLowerCase()]=!0},b.addIrregularRule=function(u,e){e=e.toLowerCase(),u=u.toLowerCase(),t[u]=e,n[e]=u},[["I","we"],["me","us"],["he","they"],["she","they"],["them","them"],["myself","ourselves"],["yourself","yourselves"],["itself","themselves"],["herself","themselves"],["himself","themselves"],["themself","themselves"],["is","are"],["was","were"],["has","have"],["this","these"],["that","those"],["echo","echoes"],["dingo","dingoes"],["volcano","volcanoes"],["tornado","tornadoes"],["torpedo","torpedoes"],["genus","genera"],["viscus","viscera"],["stigma","stigmata"],["stoma","stomata"],["dogma","dogmata"],["lemma","lemmata"],["schema","schemata"],["anathema","anathemata"],["ox","oxen"],["axe","axes"],["die","dice"],["yes","yeses"],["foot","feet"],["eave","eaves"],["goose","geese"],["tooth","teeth"],["quiz","quizzes"],["human","humans"],["proof","proofs"],["carve","carves"],["valve","valves"],["looey","looies"],["thief","thieves"],["groove","grooves"],["pickaxe","pickaxes"],["passerby","passersby"]].forEach((function(u){return b.addIrregularRule(u[0],u[1])})),[[/s?$/i,"s"],[/[^\u0000-\u007F]$/i,"$0"],[/([^aeiou]ese)$/i,"$1"],[/(ax|test)is$/i,"$1es"],[/(alias|[^aou]us|t[lm]as|gas|ris)$/i,"$1es"],[/(e[mn]u)s?$/i,"$1s"],[/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i,"$1"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1i"],[/(alumn|alg|vertebr)(?:a|ae)$/i,"$1ae"],[/(seraph|cherub)(?:im)?$/i,"$1im"],[/(her|at|gr)o$/i,"$1oes"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,"$1a"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,"$1a"],[/sis$/i,"ses"],[/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i,"$1$2ves"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/([^ch][ieo][ln])ey$/i,"$1ies"],[/(x|ch|ss|sh|zz)$/i,"$1es"],[/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i,"$1ices"],[/\b((?:tit)?m|l)(?:ice|ouse)$/i,"$1ice"],[/(pe)(?:rson|ople)$/i,"$1ople"],[/(child)(?:ren)?$/i,"$1ren"],[/eaux$/i,"$0"],[/m[ae]n$/i,"men"],["thou","you"]].forEach((function(u){return b.addPluralRule(u[0],u[1])})),[[/s$/i,""],[/(ss)$/i,"$1"],[/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i,"$1fe"],[/(ar|(?:wo|[ae])l|[eo][ao])ves$/i,"$1f"],[/ies$/i,"y"],[/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i,"$1ie"],[/\b(mon|smil)ies$/i,"$1ey"],[/\b((?:tit)?m|l)ice$/i,"$1ouse"],[/(seraph|cherub)im$/i,"$1"],[/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i,"$1"],[/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i,"$1sis"],[/(movie|twelve|abuse|e[mn]u)s$/i,"$1"],[/(test)(?:is|es)$/i,"$1is"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1us"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i,"$1um"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i,"$1on"],[/(alumn|alg|vertebr)ae$/i,"$1a"],[/(cod|mur|sil|vert|ind)ices$/i,"$1ex"],[/(matr|append)ices$/i,"$1ix"],[/(pe)(rson|ople)$/i,"$1rson"],[/(child)ren$/i,"$1"],[/(eau)x?$/i,"$1"],[/men$/i,"man"]].forEach((function(u){return b.addSingularRule(u[0],u[1])})),["adulthood","advice","agenda","aid","aircraft","alcohol","ammo","analytics","anime","athletics","audio","bison","blood","bream","buffalo","butter","carp","cash","chassis","chess","clothing","cod","commerce","cooperation","corps","debris","diabetes","digestion","elk","energy","equipment","excretion","expertise","firmware","flounder","fun","gallows","garbage","graffiti","hardware","headquarters","health","herpes","highjinks","homework","housework","information","jeans","justice","kudos","labour","literature","machinery","mackerel","mail","media","mews","moose","music","mud","manga","news","only","personnel","pike","plankton","pliers","police","pollution","premises","rain","research","rice","salmon","scissors","series","sewage","shambles","shrimp","software","species","staff","swine","tennis","traffic","transportation","trout","tuna","wealth","welfare","whiting","wildebeest","wildlife","you",/pok[e\xe9]mon$/i,/[^aeiou]ese$/i,/deer$/i,/fish$/i,/measles$/i,/o[iu]s$/i,/pox$/i,/sheep$/i].forEach(b.addUncountableRule),b}()},11289:function(u,e){"use strict";e.Z={formContainer:"SettingsPopover_formContainer__FvEpx",title:"SettingsPopover_title__dzwnW",rightSide:"SettingsPopover_rightSide__kw5Fb",formItem:"SettingsPopover_formItem__Pm4Ou",label:"SettingsPopover_label__L84Wt",input:"SettingsPopover_input__LgDQB"}}}]);
//# sourceMappingURL=8746.9d431641.chunk.js.map