"use strict";(self.webpackChunkmrgrd56_github_io=self.webpackChunkmrgrd56_github_io||[]).push([[4422],{2767:function(e,n,t){var r=t(9665),i=t(41579),o=t(31039),a=t(49839),s=t(35300),c=t(44674),l=t(25389),u=t.n(l),d=t(88737),f=["className","loading","theme","onChange","options"],g=(0,d.jsx)(c.Z,{size:"large"}),v={minimap:{enabled:!1}};n.Z=function(e){var n=e.className,t=e.loading,c=e.theme,l=e.onChange,h=e.options,Z=(0,i.Z)(e,f),C=(0,s.Z)().isDarkMode,m=(0,o.useMemo)((function(){return(0,r.Z)((0,r.Z)({},v),h)}),[h]),x=(0,o.useCallback)((function(e,n){null===l||void 0===l||l(null!==e&&void 0!==e?e:"",n)}),[l]);return(0,d.jsx)(a.ZP,(0,r.Z)({theme:null!==c&&void 0!==c?c:C?"vs-dark":"light",className:u()("app-monaco-editor",n),loading:null!==t&&void 0!==t?t:g,onChange:x,options:m},Z))}},31612:function(e,n,t){t.d(n,{Z:function(){return p}});var r=t(9665),i=t(91391),o=t(71714),a=t(41579),s=t(73373),c=t.n(s),l=t(31039),u=function(e){if(e)return navigator.clipboard.writeText(e)},d=t(26020),f=t(58259),g=t(77883),v=t(65869),h=t(42761),Z=function(e){return navigator.clipboard.write([new ClipboardItem((0,h.Z)({},e.type,e))])},C=function(e){return(0,v.isFunction)(e)?e():e},m=t(88737),x=["value","copyEmpty","children","onClick","icon"];var p=function(e){var n=e.value,t=e.copyEmpty,s=e.children,h=e.onClick,p=e.icon,_=(0,a.Z)(e,x),b=(0,l.useState)(!1),j=(0,o.Z)(b,2),N=j[0],P=j[1],k=(0,l.useRef)(),y=function(){var e=(0,i.Z)(c().mark((function e(r){var i,o;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i=null===h||void 0===h?void 0:h(r),(o=null!==i&&void 0!==i?i:C(n))||t){e.next=4;break}return e.abrupt("return");case 4:if(k.current&&clearTimeout(k.current),!(0,v.isNil)(o)&&!(0,v.isString)(o)){e.next=8;break}return e.next=8,u(null!==o&&void 0!==o?o:"");case 8:if(!(o instanceof Blob)){e.next=11;break}return e.next=11,Z(o);case 11:P(!0),k.current=setTimeout((function(){P(!1)}),1e3);case 13:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,m.jsx)(d.Z,(0,r.Z)((0,r.Z)({onClick:y,icon:null!==p&&void 0!==p?p:N?(0,m.jsx)(f.Z,{}):(0,m.jsx)(g.Z,{})},_),{},{children:null!==s&&void 0!==s?s:"Copy"}))}},35186:function(e,n,t){t.d(n,{Q:function(){return v}});var r=t(91391),i=t(71714),o=t(73373),a=t.n(o),s=t(31039),c=t(65869),l=t(64810),u=t(78998),d=t(3540),f=function(e,n){return(0,c.isObject)(e)&&"_noResult"in e&&e===n},g=function(e){return function(n,t,o){var c=(0,s.useState)(),g=(0,i.Z)(c,2),v=g[0],h=g[1],Z=(0,d.Z)(n),C=(0,s.useRef)((0,u.Z)((function(){var n=Object.freeze({_noResult:(0,l.Z)()});return e((0,r.Z)(a().mark((function e(){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=Z.current(n),f(t,n)){e.next=7;break}return e.t0=h,e.next=5,t;case 5:e.t1=e.sent,(0,e.t0)(e.t1);case 7:case"end":return e.stop()}}),e)}))),o)}))).current;return(0,s.useEffect)((function(){C()}),t),v}},v=g(c.debounce);g(c.throttle)},16155:function(e,n,t){t.d(n,{Z:function(){return c}});var r=t(71714),i=t(31039),o=t(57852),a=function(){},s=t(21128),c=function(e,n){var t=(0,s.Z)(null!==e&&void 0!==e?e:o._,n),c=(0,i.useState)(n),l=(0,r.Z)(c,2),u=l[0],d=l[1];return(0,i.useMemo)((function(){return void 0===e?[u,d,a]:t}),[e,t,u,d])}},28857:function(e,n,t){var r=t(31039),i=t(3540);n.Z=function(e,n){var t=(0,i.Z)(n);return(0,r.useCallback)(function(e,n){return function(t){e(t.target.value),null===n||void 0===n||n(t)}}(e,t.current),[e])}},21128:function(e,n,t){var r=t(71714),i=t(31039),o=t(56722);n.Z=function(e,n){var t=(0,o.V)(e,n),a=(0,r.Z)(t,3),s=a[0],c=a[1],l=a[2],u=(0,i.useState)(s),d=(0,r.Z)(u,2),f=d[0],g=d[1];return(0,i.useEffect)((function(){c(f)}),[f]),(0,i.useMemo)((function(){return[f,g,l]}),[f,g,l])}},65621:function(e,n,t){t.d(n,{Z:function(){return g}});var r=t(9665),i=t(41579),o=(t(31039),t(76694)),a={"antd-text-primary":"BiConverterPageContainer_antd-text-primary__o1B+a","ant-tabs-first-tab-indent":"BiConverterPageContainer_ant-tabs-first-tab-indent__CLaaD","ant-tabs-tab":"BiConverterPageContainer_ant-tabs-tab__89fgL","ant-tabs-no-w100-but-max":"BiConverterPageContainer_ant-tabs-no-w100-but-max__R6tPe","ant-tabs-tabpane":"BiConverterPageContainer_ant-tabs-tabpane__gnkcR",pageContainer:"BiConverterPageContainer_pageContainer__fssmY",container:"BiConverterPageContainer_container__TfcIY",col:"BiConverterPageContainer_col__MvUHW",colLeft:"BiConverterPageContainer_colLeft__MYCMl",colLeftNoRight:"BiConverterPageContainer_colLeftNoRight__gnvOr",colHeader:"BiConverterPageContainer_colHeader__stxpZ",colTitle:"BiConverterPageContainer_colTitle__to0rW"},s=t(29251),c=t(30097),l=t(25389),u=t.n(l),d=t(88737),f=["leftTitle","rightTitle","leftTitleExtra","rightTitleExtra","left","right","extra","children","className","noPadding","noHeader","noRight","leftColSize"],g=function(e){var n=e.leftTitle,t=e.rightTitle,l=e.leftTitleExtra,g=e.rightTitleExtra,v=e.left,h=e.right,Z=e.extra,C=e.children,m=e.className,x=e.noPadding,p=e.noHeader,_=e.noRight,b=e.leftColSize,j=void 0===b?12:b,N=(0,i.Z)(e,f);return(0,d.jsxs)(o.Z,(0,r.Z)((0,r.Z)({noPadding:null===x||void 0===x||x,className:u()(a.pageContainer,m)},N),{},{children:[(0,d.jsxs)(s.Z,{className:a.container,children:[(0,d.jsxs)(c.Z,{xs:_?24:j,className:u()(a.col,a.colLeft,_&&a.colLeftNoRight),children:[!p&&(0,d.jsxs)("div",{className:a.colHeader,children:[(0,d.jsx)("h3",{className:a.colTitle,children:n}),l]}),_?(0,d.jsx)(c.Z,{xs:j,children:v}):v]}),!_&&(0,d.jsxs)(c.Z,{xs:24-j,className:u()(a.col,a.colRight),children:[!p&&(0,d.jsxs)("div",{className:a.colHeader,children:[(0,d.jsx)("h3",{className:a.colTitle,children:t}),g]}),h]}),Z]}),C]}))}},76694:function(e,n,t){t.d(n,{q:function(){return r},Z:function(){return w}});var r,i=t(9665),o=t(41579),a=t(42761),s=t(31039),c="PageContainer_container__0XdUl",l="PageContainer_noPadding__8qKdC",u="PageContainer_noContentPadding__e8KpM",d="PageContainer_headingContainer__oss+6",f="PageContainer_contentContainer__1pGdM",g=t(20205),v=t(97994),h=t(68777),Z=t(83142),C=t(30172),m=t(25389),x=t.n(m),p=t(32258),_=t(2403),b=t(18865),j=t(88737),N=["children"],P=function(e){var n=e.children,t=(0,o.Z)(e,N),r=(0,_.Z)(),a=(0,b.Z)().isCommentsBlockHidden,c=(0,s.useRef)(null),l=(0,s.useMemo)((function(){var e;return{url:new URL(null!==(e=null===r||void 0===r?void 0:r.path)&&void 0!==e?e:"",window.location.origin).toString(),identifier:null===r||void 0===r?void 0:r.path,language:navigator.language}}),[r]);return a?null:(0,j.jsxs)("div",(0,i.Z)((0,i.Z)({},t),{},{ref:c,children:[(0,j.jsx)(p.qw,{shortname:"mrgrd56",config:l}),n]}))},k=["title","description","titleExtra","tags","noPadding","noContentPadding","children","className","contentClassName","contentRef","withComments"];!function(e){e.WIP="WIP",e.NOT_WORKING="NOT_WORKING"}(r||(r={}));var y=function(e,n){return function(e){var n;return n={},(0,a.Z)(n,r.WIP,(0,j.jsx)(g.Z,{color:"blue",icon:(0,j.jsx)(Z.Z,{}),children:"Work In Progress"},e)),(0,a.Z)(n,r.NOT_WORKING,(0,j.jsx)(g.Z,{color:"red",icon:(0,j.jsx)(C.Z,{}),children:"Not Working"},e)),n}(n)[e]},w=s.forwardRef((function(e,n){var t,r=e.title,g=e.description,Z=e.titleExtra,C=e.tags,m=e.noPadding,p=e.noContentPadding,_=e.children,b=e.className,N=e.contentClassName,w=e.contentRef,T=e.withComments,O=(0,o.Z)(e,k),R=(0,s.useMemo)((function(){return null===C||void 0===C?void 0:C.map(y)}),[C]);return(0,j.jsxs)("div",(0,i.Z)((0,i.Z)({ref:n,className:x()(c,(t={},(0,a.Z)(t,l,m),(0,a.Z)(t,u,p),t),b)},O),{},{children:[(null===C||void 0===C?void 0:C.length)&&(0,j.jsx)("div",{children:R}),r&&(0,j.jsxs)(v.Z,{direction:"horizontal",size:"middle",className:d,children:[(0,j.jsx)("h1",{className:"mb-0",children:r}),Z]}),g&&(0,j.jsx)(h.Z,{className:"mb-2",children:g}),(0,j.jsxs)("div",{className:x()(f,N),ref:w,children:[_,T&&(0,j.jsx)(P,{className:"mt-4"})]})]}))}))},54422:function(e,n,t){t.d(n,{g:function(){return r},Z:function(){return W}});var r,i=t(71714),o=t(9665),a=t(31039),s=t(35186),c=t(6155),l=t(65621),u="TextBiConverterPageContainer_pageContainer__OmDjN",d="TextBiConverterPageContainer_editor__0Kuw9",f="TextBiConverterPageContainer_plainEditor__VLyId",g="TextBiConverterPageContainer_plainEditorCode__k2d-N",v="TextBiConverterPageContainer_messageContainer__-xGqL",h=t(70102),Z=t(26020),C=t(12133),m=t(1258),x=t(91156),p=t(27696),_=t(96579),b=t(2767),j=t(31612),N=t(65869),P=t(81792),k=t(16155),y=t(26952),w=t(95773),T=t(28857),O=t(25389),R=t.n(O),S=t(88737),B={minimap:{enabled:!1}},L=(0,o.Z)({},B),M=(0,o.Z)((0,o.Z)({},B),{},{readOnly:!0}),E={autoComplete:"off",autoCorrect:"off",autoCapitalize:"off",spellCheck:"false"};!function(e){e[e.MONACO=0]="MONACO",e[e.PLAIN=1]="PLAIN"}(r||(r={}));var I=function(e){var n,t,N=e.defaultOptions,O=e.optionsStorageKey,B=e.convert1to2,I=e.convert2to1,W=e.source1,A=e.source2,q=e.renderOptionsPopover,K=e.swapStateStorageKey,H=e.sourceStorageKey,V=e.description,z=(0,k.Z)(H,""),G=(0,i.Z)(z,2),D=G[0],U=G[1],Y=(0,T.Z)(U),Q=(0,a.useState)(),F=(0,i.Z)(Q,2),X=F[0],J=F[1],$=(0,a.useState)(!1),ee=(0,i.Z)($,2),ne=ee[0],te=ee[1],re=(0,a.useState)(!1),ie=(0,i.Z)(re,2),oe=ie[0],ae=ie[1],se=(0,k.Z)(K,!1),ce=(0,i.Z)(se,2),le=ce[0],ue=ce[1],de=(0,k.Z)(O,N),fe=(0,i.Z)(de,2),ge=fe[0],ve=fe[1],he=(0,s.Q)((function(e){if(!D)return J(void 0),"";try{var n=(le&&I?I:B)(D,ge);return J(void 0),n}catch(t){if(J((0,c.Z)(t)),t instanceof SyntaxError)return e;throw t}}),[D,ge,le,B,I],50),Ze=(0,a.useMemo)((function(){return{sourceLeft:le?A:W,sourceRight:le?W:A}}),[W,A,le]),Ce=Ze.sourceLeft,me=Ze.sourceRight,xe=(0,a.useCallback)((function(){ae((function(e){return!e})),te(!1)}),[]),pe=(0,a.useMemo)((function(){if(q){var e=q;return(0,S.jsx)(e,{options:ge,onOptionsChange:ve,onClose:xe})}}),[ge,ve,xe]),_e=(0,a.useCallback)((function(e){oe||te(e)}),[oe]),be=(0,a.useCallback)((function(){U(null!==he&&void 0!==he?he:""),ue((function(e){return!e}))}),[ue,he]);return(0,S.jsx)(l.Z,{className:u,leftTitle:Ce.title,leftTitleExtra:(0,S.jsxs)(P.Z,{row:!0,gap:4,children:[V&&(0,S.jsx)(h.Z,{content:V,placement:"bottomRight",overlayInnerStyle:{maxWidth:"380px"},children:(0,S.jsx)(Z.Z,{type:"text",icon:(0,S.jsx)(x.Z,{})})}),I&&(0,S.jsx)(C.Z,{title:"Swap conversion direction",placement:"bottomRight",children:(0,S.jsx)(Z.Z,{type:"text",icon:(0,S.jsx)(p.Z,{}),onClick:be})}),q&&(0,S.jsx)(h.Z,{trigger:"click",visible:oe,onVisibleChange:ae,content:pe,placement:"bottomRight",children:(0,S.jsx)(C.Z,{title:"Settings",placement:"bottomRight",visible:!oe&&ne,onVisibleChange:_e,children:(0,S.jsx)(Z.Z,{type:"text",icon:(0,S.jsx)(_.Z,{}),onClick:xe})})})]}),left:y.Z.of(null!==(n=Ce.editorType)&&void 0!==n?n:r.MONACO).onCase(r.MONACO,(function(){return(0,S.jsx)(b.Z,(0,o.Z)({className:d,language:Ce.language,options:(0,o.Z)((0,o.Z)({},L),{},{wordWrap:Ce.wrapLines?"on":"off",quickSuggestions:me.quickSuggestions}),value:D,onChange:U},Ce.editorProps))})).onCase(r.PLAIN,(function(){return(0,S.jsx)(w.default,(0,o.Z)((0,o.Z)({className:R()(d,f,Ce.isCode&&g),value:D,onChange:Y},Ce.isCode?E:{}),Ce.editorProps))})).value(),rightTitle:me.title,rightTitleExtra:(0,S.jsx)(C.Z,{title:"Copy",placement:"bottomLeft",children:(0,S.jsx)(j.Z,{value:he,type:"text",children:""})}),right:y.Z.of(null!==(t=me.editorType)&&void 0!==t?t:r.MONACO).onCase(r.MONACO,(function(){return(0,S.jsx)(b.Z,(0,o.Z)({className:d,language:me.language,options:(0,o.Z)((0,o.Z)({},M),{},{wordWrap:me.wrapLines?"on":"off",quickSuggestions:me.quickSuggestions}),value:he},me.editorProps))})).onCase(r.PLAIN,(function(){return(0,S.jsx)(w.default,(0,o.Z)((0,o.Z)({className:R()(d,f,me.isCode&&g),value:he,readOnly:!0},me.isCode?E:{}),me.editorProps))})).value(),extra:X&&(0,S.jsx)(m.Z,{className:v,type:"error",showIcon:!0,message:X})})},W=a.memo(I,N.isEqual)},26952:function(e,n,t){var r=t(71714),i=t(85228),o=t(33812),a=function(){function e(n){(0,i.Z)(this,e),this.object=n,this.conditions=new Map,this.defaultValue=void 0}return(0,o.Z)(e,[{key:"onCase",value:function(e,n){return this.conditions.has(e)||this.conditions.set(e,n),this}},{key:"onCases",value:function(e,n){var t=this;return e.forEach((function(e){return t.onCase(e,n)})),this}},{key:"onDefault",value:function(e){return void 0===this.defaultValue&&(this.defaultValue={current:e}),this.value()}},{key:"value",value:function(){for(var e,n=0,t=Array.from(this.conditions.entries());n<t.length;n++){var i=(0,r.Z)(t[n],2),o=i[0],a=i[1];if(o===this.object)return a()}return null===(e=this.defaultValue)||void 0===e?void 0:e.current()}}],[{key:"of",value:function(n){return new e(n)}}]),e}();n.Z=a},6155:function(e,n){n.Z=function(e){return e instanceof Error?e.message:String(e)}},57852:function(e,n,t){t.d(n,{_:function(){return i}});var r=function(e,n){return"mrgrd56:".concat(e,"/").concat(n)},i=r("global","null");n.Z=r}}]);
//# sourceMappingURL=4422.e3a99dfb.chunk.js.map