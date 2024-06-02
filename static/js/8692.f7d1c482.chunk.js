/*! For license information please see 8692.f7d1c482.chunk.js.LICENSE.txt */
(self.webpackChunkmrgrd56_github_io=self.webpackChunkmrgrd56_github_io||[]).push([[8692],{49182:function(e,n,t){"use strict";var r=t(31039),a=t(82399),i=t(29133),o=t(88737),s=function(e){var n=e.packageName,t=e.plain,r=e.children,s=(0,i.Z)(n),u=r||n;return(0,o.jsx)(a.Z,{href:s,children:t?u:(0,o.jsx)("code",{children:u})})};n.Z=r.memo(s)},76694:function(e,n,t){"use strict";t.d(n,{q:function(){return r},Z:function(){return R}});var r,a=t(9665),i=t(41579),o=t(42761),s=t(31039),u="PageContainer_container__0XdUl",c="PageContainer_noPadding__8qKdC",l="PageContainer_noContentPadding__e8KpM",d="PageContainer_headingContainer__oss+6",f="PageContainer_contentContainer__1pGdM",h=t(20205),m=t(97994),g=t(68777),p=t(83142),v=t(30172),$=t(25389),w=t.n($),x=t(32258),Z=t(2403),b=t(18865),y=t(88737),k=["children"],C=function(e){var n=e.children,t=(0,i.Z)(e,k),r=(0,Z.Z)(),o=(0,b.Z)().isCommentsBlockHidden,u=(0,s.useRef)(null),c=(0,s.useMemo)((function(){var e;return{url:new URL(null!==(e=null===r||void 0===r?void 0:r.path)&&void 0!==e?e:"",window.location.origin).toString(),identifier:null===r||void 0===r?void 0:r.path,language:navigator.language}}),[r]);return o?null:(0,y.jsxs)("div",(0,a.Z)((0,a.Z)({},t),{},{ref:u,children:[(0,y.jsx)(x.qw,{shortname:"mrgrd56",config:c}),n]}))},j=["title","description","titleExtra","tags","noPadding","noContentPadding","children","className","contentClassName","contentRef","withComments"];!function(e){e.WIP="WIP",e.NOT_WORKING="NOT_WORKING"}(r||(r={}));var S=function(e,n){return function(e){var n;return n={},(0,o.Z)(n,r.WIP,(0,y.jsx)(h.Z,{color:"blue",icon:(0,y.jsx)(p.Z,{}),children:"Work In Progress"},e)),(0,o.Z)(n,r.NOT_WORKING,(0,y.jsx)(h.Z,{color:"red",icon:(0,y.jsx)(v.Z,{}),children:"Not Working"},e)),n}(n)[e]},R=s.forwardRef((function(e,n){var t,r=e.title,h=e.description,p=e.titleExtra,v=e.tags,$=e.noPadding,x=e.noContentPadding,Z=e.children,b=e.className,k=e.contentClassName,R=e.contentRef,N=e.withComments,E=(0,i.Z)(e,j),P=(0,s.useMemo)((function(){return null===v||void 0===v?void 0:v.map(S)}),[v]);return(0,y.jsxs)("div",(0,a.Z)((0,a.Z)({ref:n,className:w()(u,(t={},(0,o.Z)(t,c,$),(0,o.Z)(t,l,x),t),b)},E),{},{children:[(null===v||void 0===v?void 0:v.length)&&(0,y.jsx)("div",{children:P}),r&&(0,y.jsxs)(m.Z,{direction:"horizontal",size:"middle",className:d,children:[(0,y.jsx)("h1",{className:"mb-0",children:r}),p]}),h&&(0,y.jsx)(g.Z,{className:"mb-2",children:h}),(0,y.jsxs)("div",{className:w()(f,k),ref:R,children:[Z,N&&(0,y.jsx)(C,{className:"mt-4"})]})]}))}))},58692:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return K}});var r=t(9665),a=t(91391),i=t(71714),o=t(73373),s=t.n(o),u=t(31039),c=t(76694),l=t(49182),d=t(97994),f=t(30097),h=t(26020),m=t(58840),g=t(81792),p=t(82399),v=t(65869),$=t(88737),w=function(e){return"https://react-hooks.org/docs/".concat(e)},x=function(e){var n=e.hooks;return(0,$.jsx)("h3",{children:(0,$.jsx)(g.Z,{row:!0,gap:8,children:n.map((function(e,n){return(0,$.jsx)(p.Z,{href:w(e),children:e},n)}))})})},Z=u.memo(x,(function(e,n){return(0,v.isEqual)((0,v.sortBy)(e),(0,v.sortBy)(n))})),b={};var y=function(e){return!e};function k(e,n){var t=function(e){var n;if("undefined"===typeof sessionStorage)return null;var t=null!==(n=sessionStorage.getItem(e))&&void 0!==n?n:"null";try{return JSON.parse(t)}catch(r){console.error(r)}return t}(e);return null===t?n:t}function C(e,n){var t=(0,u.useState)((function(){return k(e,n)})),r=t[0],a=t[1],i=(0,u.useRef)(!1),o=(0,u.useRef)(!1),s=(0,u.useMemo)((function(){return"rooks-".concat(e,"-sessionstorage-update")}),[e]);(0,u.useEffect)((function(){i.current||function(e,n){"undefined"===typeof sessionStorage||sessionStorage.setItem(e,JSON.stringify(n))}(e,r)}),[e,r]);var c=(0,u.useCallback)((function(n){var t;if(n.storageArea===sessionStorage&&n.key===e)try{i.current=!0;var o=JSON.parse(null!==(t=n.newValue)&&void 0!==t?t:"null");r!==o&&a(o)}catch(s){console.log(s)}}),[e,r]);(0,u.useEffect)((function(){return"undefined"!==typeof window?(window.addEventListener("storage",c),function(){window.removeEventListener("storage",c)}):(console.warn("[useSessionstorageState] window is undefined."),function(){})}),[c]);var l=(0,u.useCallback)((function(e){try{o.current=!0;var n=e.detail.newValue;r!==n&&a(n)}catch(t){console.log(t)}}),[r]);(0,u.useEffect)((function(){return"undefined"!==typeof document?(document.addEventListener(s,l),function(){document.removeEventListener(s,l)}):(console.warn("[useSessionstorageState] document is undefined."),function(){})}),[s,l]);var d=(0,u.useCallback)((function(e){if("undefined"!==typeof document){var n=new CustomEvent(s,{detail:{newValue:e}});document.dispatchEvent(n)}else console.warn("[useSessionstorageState] document is undefined.")}),[s]),f=(0,u.useCallback)((function(e){i.current=!1,o.current=!1,a(e),d(e)}),[d]),h=(0,u.useCallback)((function(){sessionStorage.removeItem(e)}),[e]);return[r,f,h]}var j=t(56722),S=t(38633),R=t(84286),N=t(16666),E=function(e){return new Promise((function(n){return setTimeout(n,e)}))},P=t(73041),_=t(87990),z=t(41668),I=t(71437),q=t(57852),L=t(95773),O=JSON.parse('["galaxy","flow","pastel","level","deal","casualty","gallery","chimpanzee","mourning","fur","illness","exchange","stand","forbid","rhetoric","story","detective","epicalyx","beach","gradient","pledge","monopoly","bin","island","cycle","liver","watch","uncle","tip","tendency","trance","seize","reactor","charm","absorption","opinion","prison","tropical","heart","bike","pass","radiation","trust","salvation","period","salad","imposter","cutting","systematic","last","pioneer","cheap","volume","robot","continuation","archive","world","bold","sector","chair","tough","script","border","detail","pillow","talented","action","rhythm","writer","trace","psychology","formulate","genuine","credibility","contract","blade","desert","sensitive","fisherman","hesitate","art","slide","patrol","cottage","dead","yearn","waste","coat","information","button","depend","owner","interface","hard","line","slip","dance","nerve","nail","gate"]'),M=t(78829),W=t.n(M),U={text:"Initial text"},B=(0,$.jsx)(l.Z,{packageName:"rooks",plain:!0,children:"npm package"}),K=function(){var e,n,t,o=(0,u.useState)("not mounted"),l=(0,i.Z)(o,2),p=l[0],w=l[1],x=function(e,n){void 0===e&&(e=""),void 0===n&&(n=b);var t=(0,u.useState)(e),r=t[0],a=t[1],i=(0,u.useCallback)((function(e){var t=e.target.value,i=!0;"function"===typeof n.validate&&(i=n.validate(t,r)),i&&a(t)}),[r]);return(0,u.useEffect)((function(){a(e)}),[e]),{onChange:i,value:r}}(""),k=(0,u.useState)(O),M=(0,i.Z)(k,2),K=M[0],V=M[1],T=function(e){var n=(0,u.useState)(e),t=n[0],r=n[1],a=(0,u.useCallback)((function(e){r((function(n){return n+e}))}),[]),i=(0,u.useCallback)((function(e){a(-e)}),[]),o=(0,u.useCallback)((function(){a(1)}),[]),s=(0,u.useCallback)((function(){a(-1)}),[]),c=(0,u.useCallback)((function(){r(e)}),[]);return{decrement:s,decrementBy:i,increment:o,incrementBy:a,reset:c,value:t}}(0),A=T.value,G=T.increment,H=T.decrement,J=T.reset,D=(void 0===(e=!0)&&(e=!1),void 0===n&&(n=y),(0,u.useReducer)(n,e)),F=(0,i.Z)(D,2),X=F[0],Q=F[1],Y=(0,j.V)((0,q.Z)("rooks-demo","localStorageState"),U),ee=(0,i.Z)(Y,2),ne=ee[0],te=ee[1],re=(0,j.V)((0,q.Z)("rooks-demo","localStorageState"),U),ae=(0,i.Z)(re,2),ie=ae[0],oe=ae[1],se=C((0,q.Z)("rooks-demo","sessionStorageState"),U),ue=(0,i.Z)(se,2),ce=ue[0],le=ue[1];(0,S.H)((0,a.Z)(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E(1e3);case 2:w("mounted 1s ago");case 3:case"end":return e.stop()}}),e)})))),t=(0,a.Z)(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E(10);case 2:w("unmounted 0.01s ago");case 3:case"end":return e.stop()}}),e)}))),(0,u.useEffect)((function(){return t}),[]);var de=(0,u.useCallback)((function(){G()}),[]);(0,R.K)(de,500,X);var fe=(0,u.useCallback)((function(e){te((0,r.Z)((0,r.Z)({},ne),{},{text:e.target.value}))}),[]),he=(0,u.useCallback)((function(e){oe((0,r.Z)((0,r.Z)({},ne),{},{text:e.target.value}))}),[]),me=(0,u.useCallback)((function(e){le((0,r.Z)((0,r.Z)({},ce),{},{text:e.target.value}))}),[]),ge=(0,u.useCallback)((function(e){V(O.filter((function(n){return!!(0,v.isEmpty)(e)||n.trim().toLocaleLowerCase().includes(e.trim().toLocaleLowerCase())})))}),[]),pe=(0,N.N)(ge,500);return(0,u.useEffect)((function(){return pe(x.value)}),[x.value]),(0,$.jsx)(c.Z,{title:"Rooks demo",titleExtra:B,children:(0,$.jsxs)(d.Z,{direction:"vertical",size:"middle",children:[(0,$.jsxs)(f.Z,{children:[(0,$.jsx)(Z,{hooks:["useDidMount","useWillUnmount"]}),p]}),(0,$.jsxs)(f.Z,{children:[(0,$.jsx)(Z,{hooks:["useIntervalWhen","useCounter","useToggle"]}),(0,$.jsxs)(g.Z,{col:!0,gap:6,children:[(0,$.jsx)(g.Z,{row:!0,gap:6,children:(0,$.jsx)(h.Z,{onClick:Q,children:(0,$.jsx)(I.Z,{type:X?"success":"danger",children:X?"Interval enabled":"Interval disabled"})})}),(0,$.jsxs)(g.Z,{row:!0,gap:6,align:"center",children:[(0,$.jsx)(h.Z,{icon:(0,$.jsx)(P.Z,{}),size:"small",onClick:G}),(0,$.jsx)(h.Z,{icon:(0,$.jsx)(_.Z,{}),size:"small",onClick:H}),(0,$.jsx)(h.Z,{icon:(0,$.jsx)(z.Z,{}),size:"small",onClick:J}),(0,$.jsx)("h3",{className:"m-0",children:A})]})]})]}),(0,$.jsxs)(f.Z,{children:[(0,$.jsx)(Z,{hooks:["useLocalstorageState"]}),(0,$.jsxs)(g.Z,{col:!0,gap:6,align:"stretch",children:[(0,$.jsx)(L.default,{value:ne.text,onChange:fe}),(0,$.jsx)(L.default,{value:ie.text,onChange:he})]})]}),(0,$.jsxs)(f.Z,{children:[(0,$.jsx)(Z,{hooks:["useSessionstorageState"]}),(0,$.jsx)(L.default,{value:ce.text,onChange:me})]}),(0,$.jsxs)(f.Z,{children:[(0,$.jsx)(Z,{hooks:["useDebounce","useInput"]}),(0,$.jsxs)(g.Z,{col:!0,gap:6,children:[(0,$.jsx)(m.Z,(0,r.Z)((0,r.Z)({},x),{},{placeholder:"Search..."})),(0,$.jsx)(L.default,{readOnly:!0,placeholder:"Results",rows:4,value:K.join("\n"),showCount:{formatter:function(){return W()("result",K.length,!0)}}})]})]})]})})}},57852:function(e,n,t){"use strict";t.d(n,{_:function(){return a}});var r=function(e,n){return"mrgrd56:".concat(e,"/").concat(n)},a=r("global","null");n.Z=r},29133:function(e,n){"use strict";n.Z=function(e){return"https://www.npmjs.com/package/".concat(e)}},87990:function(e,n,t){"use strict";t.d(n,{Z:function(){return u}});var r=t(9665),a=t(31039),i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"minus",theme:"outlined"},o=t(11269),s=function(e,n){return a.createElement(o.Z,(0,r.Z)((0,r.Z)({},e),{},{ref:n,icon:i}))};s.displayName="MinusOutlined";var u=a.forwardRef(s)},73041:function(e,n,t){"use strict";t.d(n,{Z:function(){return u}});var r=t(9665),a=t(31039),i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"},o=t(11269),s=function(e,n){return a.createElement(o.Z,(0,r.Z)((0,r.Z)({},e),{},{ref:n,icon:i}))};s.displayName="PlusOutlined";var u=a.forwardRef(s)},41668:function(e,n,t){"use strict";t.d(n,{Z:function(){return u}});var r=t(9665),a=t(31039),i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"}}]},name:"reload",theme:"outlined"},o=t(11269),s=function(e,n){return a.createElement(o.Z,(0,r.Z)((0,r.Z)({},e),{},{ref:n,icon:i}))};s.displayName="ReloadOutlined";var u=a.forwardRef(s)},78829:function(e){e.exports=function(){var e=[],n=[],t={},r={},a={};function i(e){return"string"===typeof e?new RegExp("^"+e+"$","i"):e}function o(e,n){return e===n?n:e===e.toLowerCase()?n.toLowerCase():e===e.toUpperCase()?n.toUpperCase():e[0]===e[0].toUpperCase()?n.charAt(0).toUpperCase()+n.substr(1).toLowerCase():n.toLowerCase()}function s(e,n){return e.replace(/\$(\d{1,2})/g,(function(e,t){return n[t]||""}))}function u(e,n){return e.replace(n[0],(function(t,r){var a=s(n[1],arguments);return o(""===t?e[r-1]:t,a)}))}function c(e,n,r){if(!e.length||t.hasOwnProperty(e))return n;for(var a=r.length;a--;){var i=r[a];if(i[0].test(n))return u(n,i)}return n}function l(e,n,t){return function(r){var a=r.toLowerCase();return n.hasOwnProperty(a)?o(r,a):e.hasOwnProperty(a)?o(r,e[a]):c(a,r,t)}}function d(e,n,t,r){return function(r){var a=r.toLowerCase();return!!n.hasOwnProperty(a)||!e.hasOwnProperty(a)&&c(a,a,t)===a}}function f(e,n,t){return(t?n+" ":"")+(1===n?f.singular(e):f.plural(e))}return f.plural=l(a,r,e),f.isPlural=d(a,r,e),f.singular=l(r,a,n),f.isSingular=d(r,a,n),f.addPluralRule=function(n,t){e.push([i(n),t])},f.addSingularRule=function(e,t){n.push([i(e),t])},f.addUncountableRule=function(e){"string"!==typeof e?(f.addPluralRule(e,"$0"),f.addSingularRule(e,"$0")):t[e.toLowerCase()]=!0},f.addIrregularRule=function(e,n){n=n.toLowerCase(),e=e.toLowerCase(),a[e]=n,r[n]=e},[["I","we"],["me","us"],["he","they"],["she","they"],["them","them"],["myself","ourselves"],["yourself","yourselves"],["itself","themselves"],["herself","themselves"],["himself","themselves"],["themself","themselves"],["is","are"],["was","were"],["has","have"],["this","these"],["that","those"],["echo","echoes"],["dingo","dingoes"],["volcano","volcanoes"],["tornado","tornadoes"],["torpedo","torpedoes"],["genus","genera"],["viscus","viscera"],["stigma","stigmata"],["stoma","stomata"],["dogma","dogmata"],["lemma","lemmata"],["schema","schemata"],["anathema","anathemata"],["ox","oxen"],["axe","axes"],["die","dice"],["yes","yeses"],["foot","feet"],["eave","eaves"],["goose","geese"],["tooth","teeth"],["quiz","quizzes"],["human","humans"],["proof","proofs"],["carve","carves"],["valve","valves"],["looey","looies"],["thief","thieves"],["groove","grooves"],["pickaxe","pickaxes"],["passerby","passersby"]].forEach((function(e){return f.addIrregularRule(e[0],e[1])})),[[/s?$/i,"s"],[/[^\u0000-\u007F]$/i,"$0"],[/([^aeiou]ese)$/i,"$1"],[/(ax|test)is$/i,"$1es"],[/(alias|[^aou]us|t[lm]as|gas|ris)$/i,"$1es"],[/(e[mn]u)s?$/i,"$1s"],[/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i,"$1"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1i"],[/(alumn|alg|vertebr)(?:a|ae)$/i,"$1ae"],[/(seraph|cherub)(?:im)?$/i,"$1im"],[/(her|at|gr)o$/i,"$1oes"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,"$1a"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,"$1a"],[/sis$/i,"ses"],[/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i,"$1$2ves"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/([^ch][ieo][ln])ey$/i,"$1ies"],[/(x|ch|ss|sh|zz)$/i,"$1es"],[/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i,"$1ices"],[/\b((?:tit)?m|l)(?:ice|ouse)$/i,"$1ice"],[/(pe)(?:rson|ople)$/i,"$1ople"],[/(child)(?:ren)?$/i,"$1ren"],[/eaux$/i,"$0"],[/m[ae]n$/i,"men"],["thou","you"]].forEach((function(e){return f.addPluralRule(e[0],e[1])})),[[/s$/i,""],[/(ss)$/i,"$1"],[/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i,"$1fe"],[/(ar|(?:wo|[ae])l|[eo][ao])ves$/i,"$1f"],[/ies$/i,"y"],[/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i,"$1ie"],[/\b(mon|smil)ies$/i,"$1ey"],[/\b((?:tit)?m|l)ice$/i,"$1ouse"],[/(seraph|cherub)im$/i,"$1"],[/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i,"$1"],[/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i,"$1sis"],[/(movie|twelve|abuse|e[mn]u)s$/i,"$1"],[/(test)(?:is|es)$/i,"$1is"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1us"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i,"$1um"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i,"$1on"],[/(alumn|alg|vertebr)ae$/i,"$1a"],[/(cod|mur|sil|vert|ind)ices$/i,"$1ex"],[/(matr|append)ices$/i,"$1ix"],[/(pe)(rson|ople)$/i,"$1rson"],[/(child)ren$/i,"$1"],[/(eau)x?$/i,"$1"],[/men$/i,"man"]].forEach((function(e){return f.addSingularRule(e[0],e[1])})),["adulthood","advice","agenda","aid","aircraft","alcohol","ammo","analytics","anime","athletics","audio","bison","blood","bream","buffalo","butter","carp","cash","chassis","chess","clothing","cod","commerce","cooperation","corps","debris","diabetes","digestion","elk","energy","equipment","excretion","expertise","firmware","flounder","fun","gallows","garbage","graffiti","hardware","headquarters","health","herpes","highjinks","homework","housework","information","jeans","justice","kudos","labour","literature","machinery","mackerel","mail","media","mews","moose","music","mud","manga","news","only","personnel","pike","plankton","pliers","police","pollution","premises","rain","research","rice","salmon","scissors","series","sewage","shambles","shrimp","software","species","staff","swine","tennis","traffic","transportation","trout","tuna","wealth","welfare","whiting","wildebeest","wildlife","you",/pok[e\xe9]mon$/i,/[^aeiou]ese$/i,/deer$/i,/fish$/i,/measles$/i,/o[iu]s$/i,/pox$/i,/sheep$/i].forEach(f.addUncountableRule),f}()},16666:function(e,n,t){"use strict";t.d(n,{N:function(){return o}});var r=t(46820),a=t.n(r),i=t(31039);function o(e,n,t){var r=(0,i.useCallback)((function(e){return a()(e,n,t)}),[n,t]),o=(0,i.useRef)(r(e));return(0,i.useEffect)((function(){o.current=r(e)}),[e,r]),o.current}},84286:function(e,n,t){"use strict";t.d(n,{K:function(){return a}});var r=t(31039);function a(e,n,t,a){void 0===n&&(n=0),void 0===t&&(t=!0),void 0===a&&(a=!1);var i=(0,r.useRef)();function o(){i.current&&i.current()}(0,r.useEffect)((function(){i.current=e})),(0,r.useEffect)((function(){if("undefined"!==typeof window){if(t){a&&o();var e=window.setInterval(o,n);return function(){window.clearInterval(e)}}}else console.warn("useIntervalWhen: window is undefined.")}),[t,n])}}}]);
//# sourceMappingURL=8692.f7d1c482.chunk.js.map