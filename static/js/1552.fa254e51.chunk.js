"use strict";(self.webpackChunkmrgrd56_github_io=self.webpackChunkmrgrd56_github_io||[]).push([[1552],{34894:function(e,n,i){i.d(n,{q:function(){return t},Z:function(){return R}});var t,o=i(1413),a=i(44925),r=i(4942),s=i(72791),d="PageContainer_container__KmrZF",c="PageContainer_noPadding__74Oon",l="PageContainer_noContentPadding__rSQgs",u="PageContainer_headingContainer__ScW-F",m="PageContainer_contentContainer__l-gCb",h=i(47528),w=i(83099),f=i(67758),v=i(40050),g=i(90398),p=i(81694),x=i.n(p),C=i(31862),_=i(23555),b=i(58771),P=i(80184),Z=["children"],j=function(e){var n=e.children,i=(0,a.Z)(e,Z),t=(0,_.Z)(),r=(0,b.Z)().isCommentsBlockHidden,d=(0,s.useRef)(null),c=(0,s.useMemo)((function(){var e;return{url:new URL(null!==(e=null===t||void 0===t?void 0:t.path)&&void 0!==e?e:"",window.location.origin).toString(),identifier:null===t||void 0===t?void 0:t.path,language:navigator.language}}),[t]);return r?null:(0,P.jsxs)("div",(0,o.Z)((0,o.Z)({},i),{},{ref:d,children:[(0,P.jsx)(C.qw,{shortname:"mrgrd56",config:c}),n]}))},N=["title","description","titleExtra","tags","noPadding","noContentPadding","children","className","contentClassName","contentRef","withComments"];!function(e){e.WIP="WIP",e.NOT_WORKING="NOT_WORKING"}(t||(t={}));var k=function(e){var n;return n={},(0,r.Z)(n,t.WIP,(0,P.jsx)(h.Z,{color:"blue",icon:(0,P.jsx)(v.Z,{}),children:"Work In Progress"},e)),(0,r.Z)(n,t.NOT_WORKING,(0,P.jsx)(h.Z,{color:"red",icon:(0,P.jsx)(g.Z,{}),children:"Not Working"},e)),n},y=function(e,n){return k(n)[e]},R=s.forwardRef((function(e,n){var i,t=e.title,h=e.description,v=e.titleExtra,g=e.tags,p=e.noPadding,C=e.noContentPadding,_=e.children,b=e.className,Z=e.contentClassName,k=e.contentRef,R=e.withComments,W=(0,a.Z)(e,N),M=(0,s.useMemo)((function(){return null===g||void 0===g?void 0:g.map(y)}),[g]);return(0,P.jsxs)("div",(0,o.Z)((0,o.Z)({ref:n,className:x()(d,(i={},(0,r.Z)(i,c,p),(0,r.Z)(i,l,C),i),b)},W),{},{children:[(null===g||void 0===g?void 0:g.length)&&(0,P.jsx)("div",{children:M}),t&&(0,P.jsxs)(w.Z,{direction:"horizontal",size:"middle",className:u,children:[(0,P.jsx)("h1",{className:"mb-0",children:t}),v]}),h&&(0,P.jsx)(f.Z,{className:"mb-2",children:h}),(0,P.jsxs)("div",{className:x()(m,Z),ref:k,children:[_,R&&(0,P.jsx)(j,{className:"mt-4"})]})]}))}))},91552:function(e,n,i){i.r(n),i.d(n,{default:function(){return P}});var t=i(72791),o=i(34894),a=i(85997),r=i(17760),s=i(49738),d=i(82726),c=i(4174),l=i(27649),u=i(87700),m=i(40966),h=i(85171),w=i(6145),f=i(13597),v=i(20635),g=i(27852),p=i(66973),x=function(){return(0,t.useMemo)((function(){var e=window.innerWidth>=992;return{isSiderShown:e,siderWidth:e?p.Sq:0}}),[])},C=i(80184),_=new r.dpR,b=new w.E,P=function(){var e=(0,t.useRef)(null),n=x().siderWidth;return(0,a.H)((function(){var i=e.current;if(i){Array.from(i.children).forEach((function(e){e.remove()}));var t=Math.min(Math.min(window.innerWidth-n-2*p.W5,window.innerHeight-50),1e3),o=t,a=_.load(c);a.repeat.set(.9,.9);var w=new r.FM8(2,2),f=new r.xsS,x=new r.cPb,C=new r.CP7({antialias:!0});C.setPixelRatio(window.devicePixelRatio),C.setSize(t,o),C.setClearColor("#1976d2"),i.appendChild(C.domElement);var P=new l.xC(C);P.addPass(new u.C(f,x)),P.addPass(new m.m(new r.FM8(t,o),.2,.5,.33));var Z=new g.T(v.C);Z.uniforms.resolution.value.x=1/(t*window.devicePixelRatio),Z.uniforms.resolution.value.y=1/(o*window.devicePixelRatio),P.addPass(Z);var j=(new h.x).load("/assets/empty_warehouse_01_1k.hdr",(function(){j.mapping=r.dSO}));new s.z(x,C.domElement).enabled=!0;var N=new r.Kj0(new r._12(112/9,7),new r.vBJ({map:_.load(d)}));N.position.z=-1,f.add(N);var k=new r.cJO(.8),y=new r.EJi({roughness:.15,transmission:1,thickness:1,color:new r.Ilk("#80deea"),envMap:j,envMapIntensity:1.3,clearcoat:1,clearcoatRoughness:.3,normalMap:a,clearcoatNormalMap:a,normalScale:w,clearcoatNormalScale:w}),R=new r.Kj0(k,y);R.position.x=-.85,R.rotation.x=.3,R.rotation.y=.33,f.add(R);var W=new r.Ox3(16773341,1);W.position.set(0,5,5),W.rotation.y=-.5,f.add(W),x.position.z=5;var M,S=new r.ZAu;S.position.set(0,0,0),b.load("/assets/madoka_machida/scene.gltf",(function(e){(M=e).scene.scale.set(.1,.1,.1),(new r.ZzF).setFromObject(S).getCenter(M.scene.position).multiplyScalar(-1),S.add(M.scene),S.position.x=1.1,S.position.y=-.95,f.add(S)}));!function e(){requestAnimationFrame(e),R.rotation.x+=.002,R.rotation.y+=.002,M&&(S.rotation.y+=.01),P.render()}()}})),(0,C.jsxs)(o.Z,{title:"3D Graphics Test",withComments:!0,children:[(0,C.jsx)("div",{ref:e}),(0,C.jsx)(f.Z,{type:"secondary",className:"d-flex mt-1 text-break",children:'This work is based on "Madoka Machida" (https://sketchfab.com/3d-models/madoka-machida-4a23132e4cf0482bbe55131745bee27c) by halloween (https://sketchfab.com/yellow09) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)'})]})}},82726:function(e,n,i){e.exports=i.p+"static/media/colorful-background-q50.496b4d5083bc453a6e6a.jpg"},4174:function(e,n,i){e.exports=i.p+"static/media/glass.b0def512e093c0485de6.jpg"}}]);
//# sourceMappingURL=1552.fa254e51.chunk.js.map