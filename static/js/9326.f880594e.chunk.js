"use strict";(self.webpackChunkmrgrd56_github_io=self.webpackChunkmrgrd56_github_io||[]).push([[9326],{39914:function(e,n,r){r.d(n,{Z:function(){return d}});var s=r(18437),t=r.n(s),i=r(78998),c=r(42761),a=r(9665),o=r(65869),l=function e(n){return Array.isArray(n)?n.map((function(n){return e(n)})):(0,o.isNil)(n)||n.constructor!==Object?n:Object.keys(n).reduce((function(r,s){return(0,a.Z)((0,a.Z)({},r),{},(0,c.Z)({},(0,o.camelCase)(s),e(n[s])))}),{})},d=(0,i.Z)((function(){var e=t().create();return e.interceptors.response.use((function(e){return e.data=l(e.data),e})),e}))},56942:function(e,n,r){r.r(n),r.d(n,{default:function(){return U}});r(31039);var s=r(76694),t=r(71437),i=r(7148),c=r(26020),a=r(30097),o=r(97994),l=r(81593),d=r(12133),u=r(20205),h="UserInfoPage_container__zR63S",Z="UserInfoPage_ipAddress__H-mdb",g="UserInfoPage_ipAddressSkeleton__StKKx",x="UserInfoPage_locationSkeleton__ieFWo",m="UserInfoPage_ipDataProviderSkeleton__8Xhe8",j=r(40214),p=r(91391),f=r(73373),w=r.n(f),v=r(39914),_=function(){var e=(0,p.Z)(w().mark((function e(){var n;return w().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.Z.get("https://ipapi.co/json/");case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=_,N=r(6155),k=r(82399),b=r(86150),I=r(36350),P=r(41668),S=r(81792),A=r(88737),U=function(){var e=(0,j.Z)(y,{doInvokeOnMount:!0,onError:function(e){console.error(e),i.Z.error({message:"An error occurred while getting the IP address",description:(0,N.Z)(e)})},onSuccess:console.log}),n=e.result,r=e.isLoading,p=e.error,f=e.invoke,w=window.navigator.languages,v=(0,I.Z)(),_=(0,b.Z)(),U=window.devicePixelRatio,C=window.screen.orientation.type,O=navigator.userAgent;return(0,A.jsx)(s.Z,{title:(0,A.jsxs)(S.Z,{row:!0,gap:3,children:[(0,A.jsx)("div",{children:"User Info"}),(0,A.jsx)(c.Z,{size:"small",type:"link",onClick:f,children:(0,A.jsx)(P.Z,{})})]}),children:(0,A.jsxs)(a.Z,{className:h,children:[!p&&(0,A.jsx)(o.Z,{direction:"vertical",className:"mb-2",children:r?(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(l.Z.Input,{active:!0,className:g}),(0,A.jsx)(l.Z.Input,{active:!0,className:x}),(0,A.jsx)(l.Z.Input,{active:!0,className:m})]}):n&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsxs)(t.Z,{strong:!0,className:Z,children:[(0,A.jsx)(t.Z,{strong:!0,children:"IP: "}),(0,A.jsx)(t.Z,{copyable:!0,children:n.ip})]}),(0,A.jsxs)(t.Z,{className:"d-flex align-items-center",children:[(0,A.jsx)(t.Z,{strong:!0,children:"Location:"}),(0,A.jsx)("img",{className:"ms-2",src:"https://purecatamphetamine.github.io/country-flag-icons/3x2/".concat(n.country,".svg"),alt:n.country,height:12,width:18})," ",(0,A.jsxs)(t.Z,{className:"ms-1",children:[n.countryName,", ",n.city]})]}),(0,A.jsxs)(t.Z,{type:"secondary",children:["The data is provided by"," ",(0,A.jsx)(k.Z,{href:"https://ipapi.co/",children:"ipapi.co"})]})]})}),(0,A.jsxs)(t.Z,{children:[(0,A.jsx)(t.Z,{strong:!0,children:"Browser languages:"}),(0,A.jsx)(t.Z,{className:"ms-2",children:w.map((function(e,n){return 0===n?(0,A.jsx)(d.Z,{title:"Your primary language",placement:"bottom",children:(0,A.jsx)(u.Z,{color:"gold",children:e})},n):(0,A.jsx)(u.Z,{color:"default",children:e},n)}))})]}),(0,A.jsxs)(t.Z,{children:[(0,A.jsx)(t.Z,{strong:!0,children:"Screen size:"}),(0,A.jsxs)(t.Z,{className:"ms-2",children:[v.width,"x",v.height]}),1!==U&&(0,A.jsxs)(t.Z,{className:"ms-1",type:"secondary",children:["(",_.width,"x",_.height," * ",U,")"]})]}),(0,A.jsxs)(t.Z,{children:[(0,A.jsx)(t.Z,{strong:!0,children:"Pixel ratio:"}),(0,A.jsx)(t.Z,{className:"ms-2",children:U})]}),(0,A.jsxs)(t.Z,{children:[(0,A.jsx)(t.Z,{strong:!0,children:"Orientation:"}),(0,A.jsx)(t.Z,{className:"ms-2",children:C})]}),(0,A.jsxs)(t.Z,{children:[(0,A.jsx)(t.Z,{strong:!0,children:"User Agent:"}),(0,A.jsx)(t.Z,{className:"ms-2",children:O})]})]})})}},6155:function(e,n){n.Z=function(e){return e instanceof Error?e.message:String(e)}},36350:function(e,n,r){var s=r(65869);n.Z=function(){var e=window.devicePixelRatio,n=window.screen,r=n.width,t=n.height;return{width:(0,s.round)(r*e),height:(0,s.round)(t*e)}}},86150:function(e,n,r){var s=r(65869);n.Z=function(){return(0,s.pick)(window.screen,["width","height"])}}}]);
//# sourceMappingURL=9326.f880594e.chunk.js.map