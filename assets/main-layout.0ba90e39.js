import{c as W,a as i,h as b,e as X,i as N,f as _,r as z,w as p,o as xe,g as nt,j as Y,l as U,H as ke,k as I,m as F,s as rt,n as it,p as st,q as Ce,t as ut,u as Le,v as Fe,x as Re,y as ct,z as oe,A as dt,B as ft,C as Ae,D as ee,E as re,F as T,G as vt,I as ht,J as P,Q as De,K as be,L as Ie,M as mt,_ as yt,N as gt,O as pt,P as Te,R as G,S as Pe}from"./index.7b68fa66.js";import{Q as we,g as bt,a as wt,h as xt,u as _t,b as St,c as qt,d as $t,T as he,e as le,f as me,i as kt}from"./QScrollObserver.240d82ca.js";import{u as Ct,a as Lt}from"./use-dark.36d30594.js";import{Q as Tt,a as ze,b as Pt}from"./QList.bceeb6fa.js";var Be=W({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:a}){const r=i(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>b("div",{class:r.value},X(a.default))}}),Qe=W({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:a}){const r=i(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>b("div",{class:r.value,role:"toolbar"},X(a.default))}}),zt=W({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:a,emit:r}){const{proxy:{$q:o}}=Y(),l=N(U,_);if(l===_)return console.error("QHeader needs to be child of QLayout"),_;const u=z(parseInt(e.heightHint,10)),f=z(!0),g=i(()=>e.reveal===!0||l.view.value.indexOf("H")>-1||o.platform.is.ios&&l.isContainer.value===!0),k=i(()=>{if(e.modelValue!==!0)return 0;if(g.value===!0)return f.value===!0?u.value:0;const s=u.value-l.scroll.value.position;return s>0?s:0}),S=i(()=>e.modelValue!==!0||g.value===!0&&f.value!==!0),n=i(()=>e.modelValue===!0&&S.value===!0&&e.reveal===!0),y=i(()=>"q-header q-layout__section--marginal "+(g.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(S.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),x=i(()=>{const s=l.rows.value.top,C={};return s[0]==="l"&&l.left.space===!0&&(C[o.lang.rtl===!0?"right":"left"]=`${l.left.size}px`),s[2]==="r"&&l.right.space===!0&&(C[o.lang.rtl===!0?"left":"right"]=`${l.right.size}px`),C});function m(s,C){l.update("header",s,C)}function v(s,C){s.value!==C&&(s.value=C)}function q({height:s}){v(u,s),m("size",s)}function $(s){n.value===!0&&v(f,!0),r("focusin",s)}p(()=>e.modelValue,s=>{m("space",s),v(f,!0),l.animate()}),p(k,s=>{m("offset",s)}),p(()=>e.reveal,s=>{s===!1&&v(f,e.modelValue)}),p(f,s=>{l.animate(),r("reveal",s)}),p(l.scroll,s=>{e.reveal===!0&&v(f,s.direction==="up"||s.position<=e.revealOffset||s.position-s.inflectionPoint<100)});const h={};return l.instances.header=h,e.modelValue===!0&&m("size",u.value),m("space",e.modelValue),m("offset",k.value),xe(()=>{l.instances.header===h&&(l.instances.header=void 0,m("size",0),m("offset",0),m("space",!1))}),()=>{const s=nt(a.default,[]);return e.elevated===!0&&s.push(b("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),s.push(b(we,{debounce:0,onResize:q})),b("header",{class:y.value,style:x.value,onFocusin:$},s)}}});function Bt(e,a,r){let o;function l(){o!==void 0&&(ke.remove(o),o=void 0)}return xe(()=>{e.value===!0&&l()}),{removeFromHistory:l,addToHistory(){o={condition:()=>r.value===!0,handler:a},ke.add(o)}}}let J=0,ye,ge,Z,pe=!1,He,Oe,Ve,R=null;function Qt(e){Ht(e)&&rt(e)}function Ht(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const a=it(e),r=e.shiftKey&&!e.deltaX,o=!r&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),l=r||o?e.deltaY:e.deltaX;for(let u=0;u<a.length;u++){const f=a[u];if(xt(f,o))return o?l<0&&f.scrollTop===0?!0:l>0&&f.scrollTop+f.clientHeight===f.scrollHeight:l<0&&f.scrollLeft===0?!0:l>0&&f.scrollLeft+f.clientWidth===f.scrollWidth}return!0}function We(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function ne(e){pe!==!0&&(pe=!0,requestAnimationFrame(()=>{pe=!1;const{height:a}=e.target,{clientHeight:r,scrollTop:o}=document.scrollingElement;(Z===void 0||a!==window.innerHeight)&&(Z=r-a,document.scrollingElement.scrollTop=o),o>Z&&(document.scrollingElement.scrollTop-=Math.ceil((o-Z)/8))}))}function Me(e){const a=document.body,r=window.visualViewport!==void 0;if(e==="add"){const{overflowY:o,overflowX:l}=window.getComputedStyle(a);ye=bt(window),ge=wt(window),He=a.style.left,Oe=a.style.top,Ve=window.location.href,a.style.left=`-${ye}px`,a.style.top=`-${ge}px`,l!=="hidden"&&(l==="scroll"||a.scrollWidth>window.innerWidth)&&a.classList.add("q-body--force-scrollbar-x"),o!=="hidden"&&(o==="scroll"||a.scrollHeight>window.innerHeight)&&a.classList.add("q-body--force-scrollbar-y"),a.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,I.is.ios===!0&&(r===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",ne,F.passiveCapture),window.visualViewport.addEventListener("scroll",ne,F.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",We,F.passiveCapture))}I.is.desktop===!0&&I.is.mac===!0&&window[`${e}EventListener`]("wheel",Qt,F.notPassive),e==="remove"&&(I.is.ios===!0&&(r===!0?(window.visualViewport.removeEventListener("resize",ne,F.passiveCapture),window.visualViewport.removeEventListener("scroll",ne,F.passiveCapture)):window.removeEventListener("scroll",We,F.passiveCapture)),a.classList.remove("q-body--prevent-scroll"),a.classList.remove("q-body--force-scrollbar-x"),a.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,a.style.left=He,a.style.top=Oe,window.location.href===Ve&&window.scrollTo(ye,ge),Z=void 0)}function Ot(e){let a="add";if(e===!0){if(J++,R!==null){clearTimeout(R),R=null;return}if(J>1)return}else{if(J===0||(J--,J>0))return;if(a="remove",I.is.ios===!0&&I.is.nativeMobile===!0){R!==null&&clearTimeout(R),R=setTimeout(()=>{Me(a),R=null},100);return}}Me(a)}function Vt(){let e;return{preventBodyScroll(a){a!==e&&(e!==void 0||a===!0)&&(e=a,Ot(a))}}}const Ee=150;var Wt=W({name:"QDrawer",inheritAttrs:!1,props:{..._t,...Ct,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...St,"onLayout","miniState"],setup(e,{slots:a,emit:r,attrs:o}){const l=Y(),{proxy:{$q:u}}=l,f=Lt(e,u),{preventBodyScroll:g}=Vt(),{registerTimeout:k,removeTimeout:S}=qt(),n=N(U,_);if(n===_)return console.error("QDrawer needs to be child of QLayout"),_;let y,x=null,m;const v=z(e.behavior==="mobile"||e.behavior!=="desktop"&&n.totalWidth.value<=e.breakpoint),q=i(()=>e.mini===!0&&v.value!==!0),$=i(()=>q.value===!0?e.miniWidth:e.width),h=z(e.showIfAbove===!0&&v.value===!1?!0:e.modelValue===!0),s=i(()=>e.persistent!==!0&&(v.value===!0||Ne.value===!0));function C(t,c){if(M(),t!==!1&&n.animate(),Q(0),v.value===!0){const L=n.instances[te.value];L!==void 0&&L.belowBreakpoint===!0&&L.hide(!1),O(1),n.isContainer.value!==!0&&g(!0)}else O(0),t!==!1&&de(!1);k(()=>{t!==!1&&de(!0),c!==!0&&r("show",t)},Ee)}function d(t,c){K(),t!==!1&&n.animate(),O(0),Q(A.value*$.value),fe(),c!==!0?k(()=>{r("hide",t)},Ee):S()}const{show:w,hide:B}=$t({showing:h,hideOnRouteChange:s,handleShow:C,handleHide:d}),{addToHistory:M,removeFromHistory:K}=Bt(h,B,s),E={belowBreakpoint:v,hide:B},H=i(()=>e.side==="right"),A=i(()=>(u.lang.rtl===!0?-1:1)*(H.value===!0?1:-1)),_e=z(0),D=z(!1),ie=z(!1),Se=z($.value*A.value),te=i(()=>H.value===!0?"left":"right"),se=i(()=>h.value===!0&&v.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:$.value:0),ue=i(()=>e.overlay===!0||e.miniToOverlay===!0||n.view.value.indexOf(H.value?"R":"L")>-1||u.platform.is.ios===!0&&n.isContainer.value===!0),j=i(()=>e.overlay===!1&&h.value===!0&&v.value===!1),Ne=i(()=>e.overlay===!0&&h.value===!0&&v.value===!1),Xe=i(()=>"fullscreen q-drawer__backdrop"+(h.value===!1&&D.value===!1?" hidden":"")),Ye=i(()=>({backgroundColor:`rgba(0,0,0,${_e.value*.4})`})),qe=i(()=>H.value===!0?n.rows.value.top[2]==="r":n.rows.value.top[0]==="l"),Ue=i(()=>H.value===!0?n.rows.value.bottom[2]==="r":n.rows.value.bottom[0]==="l"),Ke=i(()=>{const t={};return n.header.space===!0&&qe.value===!1&&(ue.value===!0?t.top=`${n.header.offset}px`:n.header.space===!0&&(t.top=`${n.header.size}px`)),n.footer.space===!0&&Ue.value===!1&&(ue.value===!0?t.bottom=`${n.footer.offset}px`:n.footer.space===!0&&(t.bottom=`${n.footer.size}px`)),t}),je=i(()=>{const t={width:`${$.value}px`,transform:`translateX(${Se.value}px)`};return v.value===!0?t:Object.assign(t,Ke.value)}),Ge=i(()=>"q-drawer__content fit "+(n.isContainer.value!==!0?"scroll":"overflow-auto")),Je=i(()=>`q-drawer q-drawer--${e.side}`+(ie.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(f.value===!0?" q-drawer--dark q-dark":"")+(D.value===!0?" no-transition":h.value===!0?"":" q-layout--prevent-focus")+(v.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${q.value===!0?"mini":"standard"}`+(ue.value===!0||j.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(qe.value===!0?" q-drawer--top-padding":""))),Ze=i(()=>{const t=u.lang.rtl===!0?e.side:te.value;return[[he,ot,void 0,{[t]:!0,mouse:!0}]]}),et=i(()=>{const t=u.lang.rtl===!0?te.value:e.side;return[[he,$e,void 0,{[t]:!0,mouse:!0}]]}),tt=i(()=>{const t=u.lang.rtl===!0?te.value:e.side;return[[he,$e,void 0,{[t]:!0,mouse:!0,mouseAllDir:!0}]]});function ce(){lt(v,e.behavior==="mobile"||e.behavior!=="desktop"&&n.totalWidth.value<=e.breakpoint)}p(v,t=>{t===!0?(y=h.value,h.value===!0&&B(!1)):e.overlay===!1&&e.behavior!=="mobile"&&y!==!1&&(h.value===!0?(Q(0),O(0),fe()):w(!1))}),p(()=>e.side,(t,c)=>{n.instances[c]===E&&(n.instances[c]=void 0,n[c].space=!1,n[c].offset=0),n.instances[t]=E,n[t].size=$.value,n[t].space=j.value,n[t].offset=se.value}),p(n.totalWidth,()=>{(n.isContainer.value===!0||document.qScrollPrevented!==!0)&&ce()}),p(()=>e.behavior+e.breakpoint,ce),p(n.isContainer,t=>{h.value===!0&&g(t!==!0),t===!0&&ce()}),p(n.scrollbarWidth,()=>{Q(h.value===!0?0:void 0)}),p(se,t=>{V("offset",t)}),p(j,t=>{r("onLayout",t),V("space",t)}),p(H,()=>{Q()}),p($,t=>{Q(),ve(e.miniToOverlay,t)}),p(()=>e.miniToOverlay,t=>{ve(t,$.value)}),p(()=>u.lang.rtl,()=>{Q()}),p(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(at(),n.animate())}),p(q,t=>{r("miniState",t)});function Q(t){t===void 0?Ce(()=>{t=h.value===!0?0:$.value,Q(A.value*t)}):(n.isContainer.value===!0&&H.value===!0&&(v.value===!0||Math.abs(t)===$.value)&&(t+=A.value*n.scrollbarWidth.value),Se.value=t)}function O(t){_e.value=t}function de(t){const c=t===!0?"remove":n.isContainer.value!==!0?"add":"";c!==""&&document.body.classList[c]("q-body--drawer-toggle")}function at(){x!==null&&clearTimeout(x),l.proxy&&l.proxy.$el&&l.proxy.$el.classList.add("q-drawer--mini-animate"),ie.value=!0,x=setTimeout(()=>{x=null,ie.value=!1,l&&l.proxy&&l.proxy.$el&&l.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function ot(t){if(h.value!==!1)return;const c=$.value,L=le(t.distance.x,0,c);if(t.isFinal===!0){L>=Math.min(75,c)===!0?w():(n.animate(),O(0),Q(A.value*c)),D.value=!1;return}Q((u.lang.rtl===!0?H.value!==!0:H.value)?Math.max(c-L,0):Math.min(0,L-c)),O(le(L/c,0,1)),t.isFirst===!0&&(D.value=!0)}function $e(t){if(h.value!==!0)return;const c=$.value,L=t.direction===e.side,ae=(u.lang.rtl===!0?L!==!0:L)?le(t.distance.x,0,c):0;if(t.isFinal===!0){Math.abs(ae)<Math.min(75,c)===!0?(n.animate(),O(1),Q(0)):B(),D.value=!1;return}Q(A.value*ae),O(le(1-ae/c,0,1)),t.isFirst===!0&&(D.value=!0)}function fe(){g(!1),de(!0)}function V(t,c){n.update(e.side,t,c)}function lt(t,c){t.value!==c&&(t.value=c)}function ve(t,c){V("size",t===!0?e.miniWidth:c)}return n.instances[e.side]=E,ve(e.miniToOverlay,$.value),V("space",j.value),V("offset",se.value),e.showIfAbove===!0&&e.modelValue!==!0&&h.value===!0&&e["onUpdate:modelValue"]!==void 0&&r("update:modelValue",!0),st(()=>{r("onLayout",j.value),r("miniState",q.value),y=e.showIfAbove===!0;const t=()=>{(h.value===!0?C:d)(!1,!0)};if(n.totalWidth.value!==0){Ce(t);return}m=p(n.totalWidth,()=>{m(),m=void 0,h.value===!1&&e.showIfAbove===!0&&v.value===!1?w(!1):t()})}),xe(()=>{m!==void 0&&m(),x!==null&&(clearTimeout(x),x=null),h.value===!0&&fe(),n.instances[e.side]===E&&(n.instances[e.side]=void 0,V("size",0),V("offset",0),V("space",!1))}),()=>{const t=[];v.value===!0&&(e.noSwipeOpen===!1&&t.push(ut(b("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),Ze.value)),t.push(Le("div",{ref:"backdrop",class:Xe.value,style:Ye.value,"aria-hidden":"true",onClick:B},void 0,"backdrop",e.noSwipeBackdrop!==!0&&h.value===!0,()=>tt.value)));const c=q.value===!0&&a.mini!==void 0,L=[b("div",{...o,key:""+c,class:[Ge.value,o.class]},c===!0?a.mini():X(a.default))];return e.elevated===!0&&h.value===!0&&L.push(b("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),t.push(Le("aside",{ref:"content",class:Je.value,style:je.value},L,"contentclose",e.noSwipeClose!==!0&&v.value===!0,()=>et.value)),b("div",{class:"q-drawer-container"},t)}}});const Mt={position:{type:String,default:"bottom-right",validator:e=>["top-right","top-left","bottom-right","bottom-left","top","right","bottom","left"].includes(e)},offset:{type:Array,validator:e=>e.length===2},expand:Boolean};function Et(){const{props:e,proxy:{$q:a}}=Y(),r=N(U,_);if(r===_)return console.error("QPageSticky needs to be child of QLayout"),_;const o=i(()=>{const y=e.position;return{top:y.indexOf("top")>-1,right:y.indexOf("right")>-1,bottom:y.indexOf("bottom")>-1,left:y.indexOf("left")>-1,vertical:y==="top"||y==="bottom",horizontal:y==="left"||y==="right"}}),l=i(()=>r.header.offset),u=i(()=>r.right.offset),f=i(()=>r.footer.offset),g=i(()=>r.left.offset),k=i(()=>{let y=0,x=0;const m=o.value,v=a.lang.rtl===!0?-1:1;m.top===!0&&l.value!==0?x=`${l.value}px`:m.bottom===!0&&f.value!==0&&(x=`${-f.value}px`),m.left===!0&&g.value!==0?y=`${v*g.value}px`:m.right===!0&&u.value!==0&&(y=`${-v*u.value}px`);const q={transform:`translate(${y}, ${x})`};return e.offset&&(q.margin=`${e.offset[1]}px ${e.offset[0]}px`),m.vertical===!0?(g.value!==0&&(q[a.lang.rtl===!0?"right":"left"]=`${g.value}px`),u.value!==0&&(q[a.lang.rtl===!0?"left":"right"]=`${u.value}px`)):m.horizontal===!0&&(l.value!==0&&(q.top=`${l.value}px`),f.value!==0&&(q.bottom=`${f.value}px`)),q}),S=i(()=>`q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${e.expand===!0?"expand":"shrink"}`);function n(y){const x=X(y.default);return b("div",{class:S.value,style:k.value},e.expand===!0?x:[b("div",x)])}return{$layout:r,getStickyContent:n}}var Ft=W({name:"QPageSticky",props:Mt,setup(e,{slots:a}){const{getStickyContent:r}=Et();return()=>r(a)}}),Rt=W({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(e,{slots:a}){const{proxy:{$q:r}}=Y(),o=N(U,_);if(o===_)return console.error("QPage needs to be a deep child of QLayout"),_;if(N(Fe,_)===_)return console.error("QPage needs to be child of QPageContainer"),_;const u=i(()=>{const g=(o.header.space===!0?o.header.size:0)+(o.footer.space===!0?o.footer.size:0);if(typeof e.styleFn=="function"){const k=o.isContainer.value===!0?o.containerHeight.value:r.screen.height;return e.styleFn(g,k)}return{minHeight:o.isContainer.value===!0?o.containerHeight.value-g+"px":r.screen.height===0?g!==0?`calc(100vh - ${g}px)`:"100vh":r.screen.height-g+"px"}}),f=i(()=>`q-page${e.padding===!0?" q-layout-padding":""}`);return()=>b("main",{class:f.value,style:u.value},X(a.default))}}),At=W({name:"QPageContainer",setup(e,{slots:a}){const{proxy:{$q:r}}=Y(),o=N(U,_);if(o===_)return console.error("QPageContainer needs to be child of QLayout"),_;Re(Fe,!0);const l=i(()=>{const u={};return o.header.space===!0&&(u.paddingTop=`${o.header.size}px`),o.right.space===!0&&(u[`padding${r.lang.rtl===!0?"Left":"Right"}`]=`${o.right.size}px`),o.footer.space===!0&&(u.paddingBottom=`${o.footer.size}px`),o.left.space===!0&&(u[`padding${r.lang.rtl===!0?"Right":"Left"}`]=`${o.left.size}px`),u});return()=>b("div",{class:"q-page-container",style:l.value},X(a.default))}}),Dt=W({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:a,emit:r}){const{proxy:{$q:o}}=Y(),l=z(null),u=z(o.screen.height),f=z(e.container===!0?0:o.screen.width),g=z({position:0,direction:"down",inflectionPoint:0}),k=z(0),S=z(ct.value===!0?0:me()),n=i(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),y=i(()=>e.container===!1?{minHeight:o.screen.height+"px"}:null),x=i(()=>S.value!==0?{[o.lang.rtl===!0?"left":"right"]:`${S.value}px`}:null),m=i(()=>S.value!==0?{[o.lang.rtl===!0?"right":"left"]:0,[o.lang.rtl===!0?"left":"right"]:`-${S.value}px`,width:`calc(100% + ${S.value}px)`}:null);function v(d){if(e.container===!0||document.qScrollPrevented!==!0){const w={position:d.position.top,direction:d.direction,directionChanged:d.directionChanged,inflectionPoint:d.inflectionPoint.top,delta:d.delta.top};g.value=w,e.onScroll!==void 0&&r("scroll",w)}}function q(d){const{height:w,width:B}=d;let M=!1;u.value!==w&&(M=!0,u.value=w,e.onScrollHeight!==void 0&&r("scrollHeight",w),h()),f.value!==B&&(M=!0,f.value=B),M===!0&&e.onResize!==void 0&&r("resize",d)}function $({height:d}){k.value!==d&&(k.value=d,h())}function h(){if(e.container===!0){const d=u.value>k.value?me():0;S.value!==d&&(S.value=d)}}let s=null;const C={instances:{},view:i(()=>e.view),isContainer:i(()=>e.container),rootRef:l,height:u,containerHeight:k,scrollbarWidth:S,totalWidth:i(()=>f.value+S.value),rows:i(()=>{const d=e.view.toLowerCase().split(" ");return{top:d[0].split(""),middle:d[1].split(""),bottom:d[2].split("")}}),header:oe({size:0,offset:0,space:!1}),right:oe({size:300,offset:0,space:!1}),footer:oe({size:0,offset:0,space:!1}),left:oe({size:300,offset:0,space:!1}),scroll:g,animate(){s!==null?clearTimeout(s):document.body.classList.add("q-body--layout-animate"),s=setTimeout(()=>{s=null,document.body.classList.remove("q-body--layout-animate")},155)},update(d,w,B){C[d][w]=B}};if(Re(U,C),me()>0){let B=function(){d=null,w.classList.remove("hide-scrollbar")},M=function(){if(d===null){if(w.scrollHeight>o.screen.height)return;w.classList.add("hide-scrollbar")}else clearTimeout(d);d=setTimeout(B,300)},K=function(E){d!==null&&E==="remove"&&(clearTimeout(d),B()),window[`${E}EventListener`]("resize",M)},d=null;const w=document.body;p(()=>e.container!==!0?"add":"remove",K),e.container!==!0&&K("add"),dt(()=>{K("remove")})}return()=>{const d=ft(a.default,[b(kt,{onScroll:v}),b(we,{onResize:q})]),w=b("div",{class:n.value,style:y.value,ref:e.container===!0?void 0:l,tabindex:-1},d);return e.container===!0?b("div",{class:"q-layout-container overflow-hidden",ref:l},[b(we,{onResize:$}),b("div",{class:"absolute-full",style:x.value},[b("div",{class:"scroll",style:m.value},[w])])]):w}}});const It=Ae({__name:"sidebar-menu",setup(e){const a=[{to:"/",icon:"home",label:"Home"},{to:"/play",icon:"sports_esports",label:"Play"},{to:"/privacy",icon:"shield",label:"Privacy"}];return(r,o)=>(ee(),re(Tt,null,{default:T(()=>[(ee(),vt(mt,null,ht(a,(l,u)=>P(Pt,{key:u,to:l.to,exact:"","active-class":"bg-primary text-white"},{default:T(()=>[P(ze,{avatar:""},{default:T(()=>[P(De,{name:l.icon},null,8,["name"])]),_:2},1024),P(ze,null,{default:T(()=>[be(Ie(l.label),1)]),_:2},1024)]),_:2},1032,["to"])),64))]),_:1}))}});const Nt=Ae({__name:"main-layout",props:{fullwidth:{type:Boolean}},setup(e){const a=gt();return(r,o)=>{const l=pt("router-view");return ee(),re(Dt,{view:"lhh LpR lff",container:"",class:Te(["main-layout",r.$q.dark.isActive?"bg-grey-9":"bg-grey-3"])},{default:T(()=>[P(zt,{reveal:"",class:"bg-primary"},{default:T(()=>[P(Qe,null,{default:T(()=>[P(Be,null,{default:T(()=>[be("Allegiance Chess")]),_:1})]),_:1})]),_:1}),P(Wt,{bordered:"",persistent:"","model-value":!0,behavior:"desktop"},{default:T(()=>[P(It)]),_:1}),P(At,{class:"column items-center"},{default:T(()=>[P(Rt,{class:Te([{"q-pt-xl":G(a).meta.title},"full-width layout-page"])},{default:T(()=>[P(l),G(a).meta.title?(ee(),re(Ft,{key:0,position:"top",expand:"",class:"bg-secondary text-black route-title"},{default:T(()=>[P(Qe,null,{default:T(()=>[typeof G(a).meta.icon=="string"?(ee(),re(De,{key:0,size:"md",name:G(a).meta.icon},null,8,["name"])):Pe("",!0),P(Be,null,{default:T(()=>[be(Ie(G(a).meta.title),1)]),_:1})]),_:1})]),_:1})):Pe("",!0)]),_:1},8,["class"])]),_:1})]),_:1},8,["class"])}}});var Gt=yt(Nt,[["__scopeId","data-v-3a9e1d1a"]]);export{Gt as default};
//# sourceMappingURL=main-layout.0ba90e39.js.map
