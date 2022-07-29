"use strict";(self.webpackChunkmrgrd56_github_io=self.webpackChunkmrgrd56_github_io||[]).push([[4758],{84813:function(n,e,t){t.d(e,{q:function(){return r},Z:function(){return k}});var r,i=t(1413),s=t(44925),o=t(4942),a=t(72791),c="PageContainer_container__KmrZF",u="PageContainer_noPadding__74Oon",l="PageContainer_noContentPadding__rSQgs",d="PageContainer_headingContainer__ScW-F",f="PageContainer_contentContainer__l-gCb",h=t(47528),v=t(83099),w=t(67758),x=t(40050),Z=t(90398),g=t(81694),m=t.n(g),N=t(80184),C=["title","description","titleExtra","tags","noPadding","noContentPadding","children","className","contentClassName"];!function(n){n.WIP="WIP",n.NOT_WORKING="NOT_WORKING"}(r||(r={}));var _=function(n){var e;return e={},(0,o.Z)(e,r.WIP,(0,N.jsx)(h.Z,{color:"blue",icon:(0,N.jsx)(x.Z,{}),children:"Work In Progress"},n)),(0,o.Z)(e,r.NOT_WORKING,(0,N.jsx)(h.Z,{color:"red",icon:(0,N.jsx)(Z.Z,{}),children:"Not Working"},n)),e},y=function(n,e){return _(e)[n]},k=a.forwardRef((function(n,e){var t,r=n.title,h=n.description,x=n.titleExtra,Z=n.tags,g=n.noPadding,_=n.noContentPadding,k=n.children,P=n.className,I=n.contentClassName,b=(0,s.Z)(n,C),j=(0,a.useMemo)((function(){return null===Z||void 0===Z?void 0:Z.map(y)}),[Z]);return(0,N.jsxs)("div",(0,i.Z)((0,i.Z)({ref:e,className:m()(c,(t={},(0,o.Z)(t,u,g),(0,o.Z)(t,l,_),t),P)},b),{},{children:[(null===Z||void 0===Z?void 0:Z.length)&&(0,N.jsx)("div",{children:j}),r&&(0,N.jsxs)(v.Z,{direction:"horizontal",size:"middle",className:d,children:[(0,N.jsx)("h1",{className:"mb-0",children:r}),x]}),h&&(0,N.jsx)(w.Z,{className:"mb-2",children:h}),(0,N.jsx)("div",{className:m()(f,I),children:k})]}))}))},84758:function(n,e,t){t.r(e),t.d(e,{default:function(){return E}});var r,i,s=t(72791),o=t(84813),a=t(29439),c=t(23025),u={container:"SnakeGame_container__oNBJn"},l=t(15671),d=t(43144),f=function(){function n(e){(0,l.Z)(this,n),this.rowCells=e}return(0,d.Z)(n,[{key:"getCellSize",value:function(n){return n/this.rowCells}}]),n}(),h=t(60136),v=t(29388),w=function(){function n(e,t){(0,l.Z)(this,n),this.x=e,this.y=t}return(0,d.Z)(n,[{key:"add",value:function(e){return new n(this.x+e.x,this.y+e.y)}},{key:"clone",value:function(){return new n(this.x,this.y)}}]),n}(),x=function(n){(0,h.Z)(t,n);var e=(0,v.Z)(t);function t(n,r){return(0,l.Z)(this,t),e.call(this,n,r)}return(0,d.Z)(t,[{key:"add",value:function(n){return new t(this.x+n.x,this.y+n.y)}},{key:"clone",value:function(){return new t(this.x,this.y)}},{key:"getView",value:function(n,e){var t=n.getCellSize(e);return{size:t,x:this.x*t,y:this.y*t}}}]),t}(w),Z=x,g=t(80184),m=function(n){var e=n.value,t=n.settings,r=n.areaWidth,i=n.fill,s=e.getView(t,r),o=s.x,a=s.y,u=s.size;return(0,g.jsx)(c.UL,{x:o,y:a,width:u,height:u,fill:i})},N=s.memo(m),C=t(4942);!function(n){n[n.UP=0]="UP",n[n.RIGHT=1]="RIGHT",n[n.DOWN=2]="DOWN",n[n.LEFT=3]="LEFT"}(i||(i={}));var _=(r={},(0,C.Z)(r,i.UP,new w(0,-1)),(0,C.Z)(r,i.RIGHT,new w(1,0)),(0,C.Z)(r,i.DOWN,new w(0,1)),(0,C.Z)(r,i.LEFT,new w(-1,0)),r),y=i,k=function(){function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;(0,l.Z)(this,n),this.parts=e,this.direction=t,this.directionCoords=void 0,this.directionCoords=_[t]}return(0,d.Z)(n,[{key:"setDirection",value:function(e){var t=_[e];return this.directionCoords.x+t.x===0&&this.directionCoords.y+t.y===0?this:new n(this.parts,e)}},{key:"move",value:function(e){var t=this,r=e.rowCells;return new n(this.parts.map((function(n,e){if(0===e){var i=n.add(t.directionCoords),s=i.x,o=i.y;return t.direction===y.LEFT&&s<0?new Z(r-1,o):t.direction===y.RIGHT&&s>=r?new Z(0,o):t.direction===y.UP&&o<0?new Z(s,r-1):t.direction===y.DOWN&&o>=r?new Z(s,0):i}return t.parts[e-1].clone()})),this.direction)}}]),n}(),P=k,I=t(81694),b=t.n(I),j=t(1413),W=t(44925),p=["tabIndex","className"],R=s.forwardRef((function(n,e){var t=n.tabIndex,r=n.className,i=(0,W.Z)(n,p),o=(0,s.useRef)(),a=(0,s.useRef)(!1);(0,s.useEffect)((function(){a.current||o.current&&(o.current.focus(),a.current=!0)}),[]);return(0,g.jsx)("div",(0,j.Z)((0,j.Z)({},i),{},{tabIndex:null!==t&&void 0!==t?t:0,ref:function(n){o.current=n,e&&("current"in e?e.current=n:e(n))},className:b()("focus-visible-unstyled",r)}))})),T=t(36920),G=new f(20),O=function(){var n=(0,s.useState)(new P([new Z(6,2),new Z(5,2),new Z(4,2),new Z(3,2),new Z(2,2)],y.RIGHT)),e=(0,a.Z)(n,2),t=e[0],r=e[1],i=(0,s.useState)(0),o=(0,a.Z)(i,2),l=o[0],d=o[1],f=(0,s.useRef)(null),h=(0,s.useCallback)((function(n){var e;switch(n.key){case"w":case"ArrowUp":e=y.UP;break;case"d":case"ArrowRight":e=y.RIGHT;break;case"s":case"ArrowDown":e=y.DOWN;break;case"a":case"ArrowLeft":e=y.LEFT;break;default:return}n.preventDefault(),r((function(n){return n.setDirection(e)}))}),[]);return(0,s.useEffect)((function(){(0,T.Z)(f,(function(n){d(Math.min(n.clientWidth-16,500)),n.focus()}))}),[]),(0,s.useEffect)((function(){var n=setInterval((function(){r((function(n){return n.move(G)}))}),150);return function(){clearInterval(n)}}),[]),(0,g.jsx)(R,{className:b()(u.container,"focus-visible-unstyled","SnakeGame__container"),ref:f,onKeyDown:h,children:(0,g.jsx)(c.Hf,{className:u.canvasContainer,width:l,height:l,children:(0,g.jsx)(c.mh,{children:t.parts.map((function(n,e){return(0,g.jsx)(N,{value:n,settings:G,areaWidth:l,fill:"#2196f3"},e)}))})})})},D=[o.q.WIP],E=function(){return(0,g.jsx)(o.Z,{title:"Snake Game",tags:D,children:(0,g.jsx)(O,{})})}},36920:function(n,e,t){var r=t(763);e.Z=function(n,e,t){if((0,r.isNil)(n.current)){if(!t)return;return t(n.current)}return e(n.current)}}}]);
//# sourceMappingURL=4758.201c3cb7.chunk.js.map