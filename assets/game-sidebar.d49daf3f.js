import{a as R,Q as le}from"./QCard.9c504a4c.js";import{G as rt,p as ct,t as dt,w as ft,b as vt,c as P,i as ve,a as ht,f as $e}from"./board.3b72bc8f.js";import{M as V,N as v,Q as b,W as F,R as M,_ as Z,r as D,a9 as Ae,A as ze,g as Ve,y as Te,w as U,o as pt,f as se,j as ue,D as mt,l as me,as as he,K as gt,an as _t,h as A,at as yt,au as bt,av as wt,a as q,a4 as kt,a5 as St,s as be,c as Re,C as qt,e as Ct,aa as Ne,aw as $t,t as Qe,O as L,P as S,S as k,T as oe,a0 as Y,ac as z,$ as H,Z as Oe,ae as E,U as K,V as G,ax as zt,ay as Tt,F as xt,az as Et,aA as Ft,af as Mt,ag as Pt}from"./index.a9cd5dcf.js";import{b as ge,a as _e,Q as je}from"./QList.7e56ea27.js";import{c as Ht,i as Bt,u as Lt,b as Wt,d as Dt,e as At,f as Vt}from"./selection.ff63ad85.js";import{u as Ke,a as Ge}from"./use-dark.ba76f059.js";import{b as xe,c as Rt,a as Nt}from"./focus-manager.202af5b7.js";import{C as Ue}from"./chess-piece.3ca385f7.js";var Ee=Object.freeze(Object.defineProperty({__proto__:null,GameOutcome:rt,parse:ct,tokenize:dt,writeNode:ft,write:vt},Symbol.toStringTag,{value:"Module"}));const Qt={class:"row column full-width full-height no-pointer-events background-layer","data-testid":"background"},Ot=V({__name:"background-layer",props:{ranks:{},files:{}},setup(e){return(o,l)=>(v(),b("div",Qt,[(v(!0),b(F,null,M(o.ranks,(t,a)=>(v(),b("div",{class:"rank col row full-width",key:a},[(v(!0),b(F,null,M(o.files,(n,i)=>(v(),b("div",{key:i,class:"file col"}))),128))]))),128))]))}});var jt=Z(Ot,[["__scopeId","data-v-482c5e27"]]);const Kt={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function Gt({showing:e,avoidEmit:o,configureAnchorEl:l}){const{props:t,proxy:a,emit:n}=ue(),i=D(null);let s=null;function c(u){return i.value===null?!1:u===void 0||u.touches===void 0||u.touches.length<=1}const d={};l===void 0&&(Object.assign(d,{hide(u){a.hide(u)},toggle(u){a.toggle(u),u.qAnchorHandled=!0},toggleKey(u){Ae(u,13)===!0&&d.toggle(u)},contextClick(u){a.hide(u),ze(u),Ve(()=>{a.show(u),u.qAnchorHandled=!0})},prevent:ze,mobileTouch(u){if(d.mobileCleanup(u),c(u)!==!0)return;a.hide(u),i.value.classList.add("non-selectable");const p=u.target;Te(d,"anchor",[[p,"touchmove","mobileCleanup","passive"],[p,"touchend","mobileCleanup","passive"],[p,"touchcancel","mobileCleanup","passive"],[i.value,"contextmenu","prevent","notPassive"]]),s=setTimeout(()=>{s=null,a.show(u),u.qAnchorHandled=!0},300)},mobileCleanup(u){i.value.classList.remove("non-selectable"),s!==null&&(clearTimeout(s),s=null),e.value===!0&&u!==void 0&&Ht()}}),l=function(u=t.contextMenu){if(t.noParentEvent===!0||i.value===null)return;let p;u===!0?a.$q.platform.is.mobile===!0?p=[[i.value,"touchstart","mobileTouch","passive"]]:p=[[i.value,"mousedown","hide","passive"],[i.value,"contextmenu","contextClick","notPassive"]]:p=[[i.value,"click","toggle","passive"],[i.value,"keyup","toggleKey","passive"]],Te(d,"anchor",p)});function h(){mt(d,"anchor")}function g(u){for(i.value=u;i.value.classList.contains("q-anchor--skip");)i.value=i.value.parentNode;l()}function C(){if(t.target===!1||t.target===""||a.$el.parentNode===null)i.value=null;else if(t.target===!0)g(a.$el.parentNode);else{let u=t.target;if(typeof t.target=="string")try{u=document.querySelector(t.target)}catch{u=void 0}u!=null?(i.value=u.$el||u,l()):(i.value=null,console.error(`Anchor: target "${t.target}" not found`))}}return U(()=>t.contextMenu,u=>{i.value!==null&&(h(),l(u))}),U(()=>t.target,()=>{i.value!==null&&h(),C()}),U(()=>t.noParentEvent,u=>{i.value!==null&&(u===!0?h():l())}),pt(()=>{C(),o!==!0&&t.modelValue===!0&&i.value===null&&n("update:modelValue",!1)}),se(()=>{s!==null&&clearTimeout(s),h()}),{anchorEl:i,canShow:c,anchorEvents:d}}function Ut(e,o){const l=D(null);let t;function a(s,c){const d=`${c!==void 0?"add":"remove"}EventListener`,h=c!==void 0?c:t;s!==window&&s[d]("scroll",h,me.passive),window[d]("scroll",h,me.passive),t=c}function n(){l.value!==null&&(a(l.value),l.value=null)}const i=U(()=>e.noParentEvent,()=>{l.value!==null&&(n(),o())});return se(i),{localScrollTarget:l,unconfigureScrollTarget:n,changeScrollEvent:a}}const ae=[];function Yt(e,o){do{if(e.$options.name==="QMenu"){if(e.hide(o),e.$props.separateClosePopup===!0)return he(e)}else if(e.__qPortal===!0){const l=he(e);return l!==void 0&&l.$options.name==="QPopupProxy"?(e.hide(o),l):e}e=he(e)}while(e!=null)}function Xt(e){for(e=e.parent;e!=null;){if(e.type.name==="QGlobalDialog")return!0;if(e.type.name==="QDialog"||e.type.name==="QMenu")return!1;e=e.parent}return!1}function Zt(e,o,l,t){const a=D(!1),n=D(!1);let i=null;const s={},c=t==="dialog"&&Xt(e);function d(g){if(g===!0){xe(s),n.value=!0;return}n.value=!1,a.value===!1&&(c===!1&&i===null&&(i=bt(!1,t)),a.value=!0,ae.push(e.proxy),Rt(s))}function h(g){if(n.value=!1,g!==!0)return;xe(s),a.value=!1;const C=ae.indexOf(e.proxy);C!==-1&&ae.splice(C,1),i!==null&&(wt(i),i=null)}return gt(()=>{h(!0)}),e.proxy.__qPortal=!0,_t(e.proxy,"contentEl",()=>o.value),{showPortal:d,hidePortal:h,portalIsActive:a,portalIsAccessible:n,renderPortal:()=>c===!0?l():a.value===!0?[A(yt,{to:i},l())]:void 0}}const Jt={transitionShow:{type:String,default:"fade"},transitionHide:{type:String,default:"fade"},transitionDuration:{type:[String,Number],default:300}};function It(e,o=()=>{},l=()=>{}){return{transitionProps:q(()=>{const t=`q-transition--${e.transitionShow||o()}`,a=`q-transition--${e.transitionHide||l()}`;return{appear:!0,enterFromClass:`${t}-enter-from`,enterActiveClass:`${t}-enter-active`,enterToClass:`${t}-enter-to`,leaveFromClass:`${a}-leave-from`,leaveActiveClass:`${a}-leave-active`,leaveToClass:`${a}-leave-to`}}),transitionStyle:q(()=>`--q-transition-duration: ${e.transitionDuration}ms`)}}function el(){let e;const o=ue();function l(){e=void 0}return kt(l),se(l),{removeTick:l,registerTick(t){e=t,Ve(()=>{e===t&&(St(o)===!1&&e(),e=void 0)})}}}const N=[];let X;function tl(e){X=e.keyCode===27}function ll(){X===!0&&(X=!1)}function ol(e){X===!0&&(X=!1,Ae(e,27)===!0&&N[N.length-1](e))}function Ye(e){window[e]("keydown",tl),window[e]("blur",ll),window[e]("keyup",ol),X=!1}function al(e){be.is.desktop===!0&&(N.push(e),N.length===1&&Ye("addEventListener"))}function Fe(e){const o=N.indexOf(e);o>-1&&(N.splice(o,1),N.length===0&&Ye("removeEventListener"))}const Q=[];function Xe(e){Q[Q.length-1](e)}function il(e){be.is.desktop===!0&&(Q.push(e),Q.length===1&&document.body.addEventListener("focusin",Xe))}function nl(e){const o=Q.indexOf(e);o>-1&&(Q.splice(o,1),Q.length===0&&document.body.removeEventListener("focusin",Xe))}const{notPassiveCapture:ie}=me,O=[];function ne(e){const o=e.target;if(o===void 0||o.nodeType===8||o.classList.contains("no-pointer-events")===!0)return;let l=ae.length-1;for(;l>=0;){const t=ae[l].$;if(t.type.name==="QTooltip"){l--;continue}if(t.type.name!=="QDialog")break;if(t.props.seamless!==!0)return;l--}for(let t=O.length-1;t>=0;t--){const a=O[t];if((a.anchorEl.value===null||a.anchorEl.value.contains(o)===!1)&&(o===document.body||a.innerRef.value!==null&&a.innerRef.value.contains(o)===!1))e.qClickOutside=!0,a.onClickOutside(e);else return}}function sl(e){O.push(e),O.length===1&&(document.addEventListener("mousedown",ne,ie),document.addEventListener("touchstart",ne,ie))}function Me(e){const o=O.findIndex(l=>l===e);o>-1&&(O.splice(o,1),O.length===0&&(document.removeEventListener("mousedown",ne,ie),document.removeEventListener("touchstart",ne,ie)))}let Pe,He;function Be(e){const o=e.split(" ");return o.length!==2?!1:["top","center","bottom"].includes(o[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(o[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function ul(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const ye={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{ye[`${e}#ltr`]=e,ye[`${e}#rtl`]=e});function Le(e,o){const l=e.split(" ");return{vertical:l[0],horizontal:ye[`${l[1]}#${o===!0?"rtl":"ltr"}`]}}function rl(e,o){let{top:l,left:t,right:a,bottom:n,width:i,height:s}=e.getBoundingClientRect();return o!==void 0&&(l-=o[1],t-=o[0],n+=o[1],a+=o[0],i+=o[0],s+=o[1]),{top:l,bottom:n,height:s,left:t,right:a,width:i,middle:t+(a-t)/2,center:l+(n-l)/2}}function cl(e,o,l){let{top:t,left:a}=e.getBoundingClientRect();return t+=o.top,a+=o.left,l!==void 0&&(t+=l[1],a+=l[0]),{top:t,bottom:t+1,height:1,left:a,right:a+1,width:1,middle:a,center:t}}function dl(e,o){return{top:0,center:o/2,bottom:o,left:0,middle:e/2,right:e}}function We(e,o,l,t){return{top:e[l.vertical]-o[t.vertical],left:e[l.horizontal]-o[t.horizontal]}}function Ze(e,o=0){if(e.targetEl===null||e.anchorEl===null||o>5)return;if(e.targetEl.offsetHeight===0||e.targetEl.offsetWidth===0){setTimeout(()=>{Ze(e,o+1)},10);return}const{targetEl:l,offset:t,anchorEl:a,anchorOrigin:n,selfOrigin:i,absoluteOffset:s,fit:c,cover:d,maxHeight:h,maxWidth:g}=e;if(be.is.ios===!0&&window.visualViewport!==void 0){const T=document.body.style,{offsetLeft:y,offsetTop:$}=window.visualViewport;y!==Pe&&(T.setProperty("--q-pe-left",y+"px"),Pe=y),$!==He&&(T.setProperty("--q-pe-top",$+"px"),He=$)}const{scrollLeft:C,scrollTop:u}=l,p=s===void 0?rl(a,d===!0?[0,0]:t):cl(a,s,t);Object.assign(l.style,{top:0,left:0,minWidth:null,minHeight:null,maxWidth:g||"100vw",maxHeight:h||"100vh",visibility:"visible"});const{offsetWidth:B,offsetHeight:f}=l,{elWidth:W,elHeight:j}=c===!0||d===!0?{elWidth:Math.max(p.width,B),elHeight:d===!0?Math.max(p.height,f):f}:{elWidth:B,elHeight:f};let x={maxWidth:g,maxHeight:h};(c===!0||d===!0)&&(x.minWidth=p.width+"px",d===!0&&(x.minHeight=p.height+"px")),Object.assign(l.style,x);const r=dl(W,j);let _=We(p,r,n,i);if(s===void 0||t===void 0)pe(_,p,r,n,i);else{const{top:T,left:y}=_;pe(_,p,r,n,i);let $=!1;if(_.top!==T){$=!0;const w=2*t[1];p.center=p.top-=w,p.bottom-=w+2}if(_.left!==y){$=!0;const w=2*t[0];p.middle=p.left-=w,p.right-=w+2}$===!0&&(_=We(p,r,n,i),pe(_,p,r,n,i))}x={top:_.top+"px",left:_.left+"px"},_.maxHeight!==void 0&&(x.maxHeight=_.maxHeight+"px",p.height>_.maxHeight&&(x.minHeight=x.maxHeight)),_.maxWidth!==void 0&&(x.maxWidth=_.maxWidth+"px",p.width>_.maxWidth&&(x.minWidth=x.maxWidth)),Object.assign(l.style,x),l.scrollTop!==u&&(l.scrollTop=u),l.scrollLeft!==C&&(l.scrollLeft=C)}function pe(e,o,l,t,a){const n=l.bottom,i=l.right,s=Bt(),c=window.innerHeight-s,d=document.body.clientWidth;if(e.top<0||e.top+n>c)if(a.vertical==="center")e.top=o[t.vertical]>c/2?Math.max(0,c-n):0,e.maxHeight=Math.min(n,c);else if(o[t.vertical]>c/2){const h=Math.min(c,t.vertical==="center"?o.center:t.vertical===a.vertical?o.bottom:o.top);e.maxHeight=Math.min(n,h),e.top=Math.max(0,h-n)}else e.top=Math.max(0,t.vertical==="center"?o.center:t.vertical===a.vertical?o.top:o.bottom),e.maxHeight=Math.min(n,c-e.top);if(e.left<0||e.left+i>d)if(e.maxWidth=Math.min(i,d),a.horizontal==="middle")e.left=o[t.horizontal]>d/2?Math.max(0,d-i):0;else if(o[t.horizontal]>d/2){const h=Math.min(d,t.horizontal==="middle"?o.middle:t.horizontal===a.horizontal?o.right:o.left);e.maxWidth=Math.min(i,h),e.left=Math.max(0,h-e.maxWidth)}else e.left=Math.max(0,t.horizontal==="middle"?o.middle:t.horizontal===a.horizontal?o.left:o.right),e.maxWidth=Math.min(i,d-e.left)}var Je=Re({name:"QMenu",inheritAttrs:!1,props:{...Kt,...Lt,...Ke,...Jt,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:Be},self:{type:String,validator:Be},offset:{type:Array,validator:ul},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...Wt,"click","escapeKey"],setup(e,{slots:o,emit:l,attrs:t}){let a=null,n,i,s;const c=ue(),{proxy:d}=c,{$q:h}=d,g=D(null),C=D(!1),u=q(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),p=Ge(e,h),{registerTick:B,removeTick:f}=el(),{registerTimeout:W}=Dt(),{transitionProps:j,transitionStyle:x}=It(e),{localScrollTarget:r,changeScrollEvent:_,unconfigureScrollTarget:T}=Ut(e,qe),{anchorEl:y,canShow:$}=Gt({showing:C}),{hide:w}=At({showing:C,canShow:$,handleShow:ot,handleHide:at,hideOnRouteChange:u,processOnMount:!0}),{showPortal:J,hidePortal:I,renderPortal:ee}=Zt(c,g,nt,"menu"),re={anchorEl:y,innerRef:g,onClickOutside(m){if(e.persistent!==!0&&C.value===!0)return w(m),(m.type==="touchstart"||m.target.classList.contains("q-dialog__backdrop"))&&Qe(m),!0}},we=q(()=>Le(e.anchor||(e.cover===!0?"center middle":"bottom start"),h.lang.rtl)),et=q(()=>e.cover===!0?we.value:Le(e.self||"top start",h.lang.rtl)),tt=q(()=>(e.square===!0?" q-menu--square":"")+(p.value===!0?" q-menu--dark q-dark":"")),lt=q(()=>e.autoClose===!0?{onClick:it}:{}),ke=q(()=>C.value===!0&&e.persistent!==!0);U(ke,m=>{m===!0?(al(de),sl(re)):(Fe(de),Me(re))});function ce(){Nt(()=>{let m=g.value;m&&m.contains(document.activeElement)!==!0&&(m=m.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||m.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||m.querySelector("[autofocus], [data-autofocus]")||m,m.focus({preventScroll:!0}))})}function ot(m){if(a=e.noRefocus===!1?document.activeElement:null,il(Ce),J(),qe(),n=void 0,m!==void 0&&(e.touchPosition||e.contextMenu)){const fe=qt(m);if(fe.left!==void 0){const{top:st,left:ut}=y.value.getBoundingClientRect();n={left:fe.left-ut,top:fe.top-st}}}i===void 0&&(i=U(()=>h.screen.width+"|"+h.screen.height+"|"+e.self+"|"+e.anchor+"|"+h.lang.rtl,te)),e.noFocus!==!0&&document.activeElement.blur(),B(()=>{te(),e.noFocus!==!0&&ce()}),W(()=>{h.platform.is.ios===!0&&(s=e.autoClose,g.value.click()),te(),J(!0),l("show",m)},e.transitionDuration)}function at(m){f(),I(),Se(!0),a!==null&&(m===void 0||m.qClickOutside!==!0)&&(((m&&m.type.indexOf("key")===0?a.closest('[tabindex]:not([tabindex^="-"])'):void 0)||a).focus(),a=null),W(()=>{I(!0),l("hide",m)},e.transitionDuration)}function Se(m){n=void 0,i!==void 0&&(i(),i=void 0),(m===!0||C.value===!0)&&(nl(Ce),T(),Me(re),Fe(de)),m!==!0&&(a=null)}function qe(){(y.value!==null||e.scrollTarget!==void 0)&&(r.value=Vt(y.value,e.scrollTarget),_(r.value,te))}function it(m){s!==!0?(Yt(d,m),l("click",m)):s=!1}function Ce(m){ke.value===!0&&e.noFocus!==!0&&$t(g.value,m.target)!==!0&&ce()}function de(m){l("escapeKey"),w(m)}function te(){Ze({targetEl:g.value,offset:e.offset,anchorEl:y.value,anchorOrigin:we.value,selfOrigin:et.value,absoluteOffset:n,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function nt(){return A(Ne,j.value,()=>C.value===!0?A("div",{role:"menu",...t,ref:g,tabindex:-1,class:["q-menu q-position-engine scroll"+tt.value,t.class],style:[t.style,x.value],...lt.value},Ct(o.default)):null)}return se(Se),Object.assign(d,{focus:ce,updatePosition:te}),ee}});const fl=V({__name:"promotion-selector",props:{modelValue:{type:Boolean},allegiance:{}},emits:["click","dismiss"],setup(e,{emit:o}){const l=["Q","N","R","B"],t=()=>{o("dismiss")};return(a,n)=>(v(),L(Je,{cover:"","model-value":a.modelValue,"onUpdate:modelValue":t},{default:S(()=>[k(je,null,{default:S(()=>[(v(),b(F,null,M(l,i=>k(ge,{clickable:"",key:i,class:"q-pa-sm",onClick:s=>o("click",i)},{default:S(()=>[k(_e,{class:"promotion-piece"},{default:S(()=>[k(Ue,{allegiance:a.allegiance,piece:i,size:86},null,8,["allegiance","piece"])]),_:2},1024)]),_:2},1032,["onClick"])),64))]),_:1})]),_:1},8,["model-value"]))}});var vl=Z(fl,[["__scopeId","data-v-0418dade"]]);const hl=V({__name:"capture-selector",props:{modelValue:{type:Boolean},moves:{}},emits:["click","dismiss"],setup(e,{emit:o}){const l=()=>{o("dismiss")};return(t,a)=>(v(),L(Je,{cover:"","model-value":t.modelValue,"onUpdate:modelValue":l},{default:S(()=>[k(je,null,{default:S(()=>[t.moves.includes("x")?(v(),L(ge,{key:0,clickable:"",onClick:a[0]||(a[0]=n=>o("click","capture")),class:"q-py-lg"},{default:S(()=>[k(_e,{class:"items-center"},{default:S(()=>[k(oe,{size:"72px",name:"close"})]),_:1})]),_:1})):Y("",!0),t.moves.includes(">")?(v(),L(ge,{key:1,clickable:"",onClick:a[1]||(a[1]=n=>o("click","challenge")),class:"q-py-lg"},{default:S(()=>[k(_e,{class:"items-center"},{default:S(()=>[k(oe,{size:"64px",name:"arrow_forward_ios"})]),_:1})]),_:1})):Y("",!0)]),_:1})]),_:1},8,["model-value"]))}});const pl={class:"relative-position full-width full-height interaction-layer"},ml=["onClick"],gl=V({__name:"interaction-layer",props:{board:{},squareSize:{},ranks:{},files:{},perspective:{},pieceFocus:{}},emits:["execute-node","update-piece-focus","update-highlights"],setup(e,{emit:o}){const l=e,t=D(null),a=q(()=>l.board.enPassantTarget),n=D(null),i=D(null),s=q(()=>l.pieceFocus?l.board.getSquare(l.pieceFocus):null),c=q(()=>l.pieceFocus?l.board.getValidMoves(l.pieceFocus).map(T=>T.kind!=="move"?null:T.to).filter(Boolean):[]),d=r=>{const _=l.board.getSquare(r);return _?ht(_.allegiance)!==l.perspective:!1},h=r=>c.value.some(_=>_&&P(r,_)),g=(r,_)=>{var y,$;if(_.stopPropagation(),_.preventDefault(),h(r)&&l.pieceFocus&&s.value){if(a.value&&P(a.value,r))o("execute-node",{kind:"move",type:"en-passant",from:l.pieceFocus,to:r}),o("update-piece-focus",null);else if(ve(r,l.board.activeColour)&&s&&s.value.piece===null){n.value=r;const w=l.board.getSquare(l.pieceFocus);i.value=(y=w==null?void 0:w.allegiance)!=null?y:null}else l.board.getSquare(r)?t.value=r:(($=s.value)==null?void 0:$.piece)==="K"&&Math.abs(l.pieceFocus.file-r.file)>1?o("execute-node",{kind:"move",type:"castle",side:r.file===7?"king":"queen",from:l.pieceFocus,to:r}):o("execute-node",{kind:"move",from:l.pieceFocus,to:r});return}if(d(r))return;const T=l.board.getSquare(r);o("update-piece-focus",T?r:null)},C=(r,_)=>{!l.pieceFocus||(n.value=null,o("execute-node",{kind:"move",type:"promotion",from:l.pieceFocus,to:r,promotionTo:_}),o("update-piece-focus",null))},u=()=>{n.value=null,i.value=null},p=()=>{t.value=null},B=r=>{!l.pieceFocus||!t.value||(r==="capture"?o("execute-node",{kind:"move",type:"capture",from:l.pieceFocus,to:t.value}):o("execute-node",{kind:"move",type:"allegiance",from:l.pieceFocus,to:t.value}),t.value=null,o("update-piece-focus",null))},f=(r,_)=>{const T=r+1,y=_+1;return l.perspective==="white"?{file:T,rank:9-y}:{file:9-T,rank:y}},W=r=>!l.board.getSquare(r),j=(r,_,T)=>l.board.getValidMoves().some($=>$.kind==="move"&&P($.to,T)&&P($.from,_)&&$.type===r),x=q(()=>{const r=[];return!l.pieceFocus||!t.value||(j("allegiance",l.pieceFocus,t.value)&&r.push(">"),j("capture",l.pieceFocus,t.value)&&r.push("x")),r});return(r,_)=>(v(),b("div",pl,[(v(!0),b(F,null,M(r.ranks,(T,y)=>(v(),b("div",{class:"col column row full-width",key:y},[(v(!0),b(F,null,M(r.files,($,w)=>{var J,I;return v(),b("div",{key:w,class:"full-height"},[z("div",{class:Oe(["absolute",{"cursor-pointer":!W(f(w,y))||h(f(w,y)),"cursor-not-allowed":d(f(w,y))&&!s.value}]),onClick:ee=>g(f(w,y),ee),style:E(r.perspective==="white"?{width:`${r.squareSize}px`,height:`${r.squareSize}px`,left:`${(f(w,y).file-1)*r.squareSize}px`,bottom:`${(f(w,y).rank-1)*r.squareSize}px`}:{width:`${r.squareSize}px`,height:`${r.squareSize}px`,right:`${(f(w,y).file-1)*r.squareSize}px`,top:`${(f(w,y).rank-1)*r.squareSize}px`})},[t.value&&H(P)(t.value,f(w,y))?(v(),L(hl,{key:0,moves:x.value,"model-value":(J=H(P)(t.value,f(w,y)))!=null?J:!1,size:r.squareSize,onClick:B,onDismiss:p},null,8,["moves","model-value","size"])):Y("",!0)],14,ml),i.value!==null&&(H(ve)(f(w,y),"white")||H(ve)(f(w,y),"black"))?(v(),L(vl,{key:0,"model-value":(I=H(P)(n.value,f(w,y)))!=null?I:!1,allegiance:i.value,size:r.squareSize,onClick:ee=>C(f(w,y),ee),onDismiss:u},null,8,["model-value","allegiance","size","onClick"])):Y("",!0)])}),128))]))),128))]))}});var _l=Z(gl,[["__scopeId","data-v-2b4692d1"]]);const yl={class:"relative-position full-width full-height column no-pointer-events indicators-layer"},bl=V({__name:"indicators-layer",props:{board:{},ranks:{},files:{},squareSize:{},perspective:{},pieceFocus:{},lastMove:{}},setup(e){const o=e,l=q(()=>o.pieceFocus?o.board.getValidMoves(o.pieceFocus).map(h=>h.kind!=="move"?null:h.to).filter(Boolean):[]),t=c=>l.value.some(d=>d&&P(c,d)),a=c=>!o.board.getSquare(c),n=(c,d)=>{const h=c+1,g=d+1;return o.perspective==="white"?{file:h,rank:9-g}:{file:9-h,rank:g}},i=q(()=>o.board.getCheckMoves()),s=c=>i.value.some(d=>d.kind==="move"&&P(d.to,c));return(c,d)=>(v(),b("div",yl,[(v(!0),b(F,null,M(c.ranks,(h,g)=>(v(),b("div",{class:"col column row full-width",key:g},[(v(!0),b(F,null,M(c.files,(C,u)=>{var p,B;return v(),b("div",{key:u,class:Oe(["full-height move-placeholder",{even:g%2===0?u%2===0:u%2!==0,focus:H(P)(c.pieceFocus,n(u,g)),show:t(n(u,g)),capture:!a(n(u,g)),target:a(n(u,g)),checked:s(n(u,g)),"last-from":((p=c.lastMove)==null?void 0:p.kind)==="move"&&H(P)(c.lastMove.from,n(u,g)),"last-to":((B=c.lastMove)==null?void 0:B.kind)==="move"&&H(P)(c.lastMove.to,n(u,g))}])},null,2)}),128))]))),128))]))}});var wl=Z(bl,[["__scopeId","data-v-27a4adb2"]]);const kl={class:"relative-position full-width full-height no-pointer-events pieces-layer"},Sl=V({__name:"pieces-layer",props:{modelValue:{},squareSize:{},perspective:{}},setup(e){return(o,l)=>(v(),b("div",kl,[(v(!0),b(F,null,M(o.modelValue,(t,a)=>(v(),b("div",{key:a},[t?(v(),L(Ue,{key:0,"data-testid":"piece",class:"absolute",piece:t.piece,allegiance:t.allegiance,size:o.squareSize,style:E(o.perspective==="white"?{left:`${(t.file-1)*o.squareSize}px`,bottom:`${(t.rank-1)*o.squareSize}px`}:{right:`${(t.file-1)*o.squareSize}px`,top:`${(t.rank-1)*o.squareSize}px`})},null,8,["piece","allegiance","size","style"])):(v(),b("div",{key:1,style:E({width:`${o.squareSize}px`,height:`${o.squareSize}px`})},null,4))]))),128))]))}});var ql=Z(Sl,[["__scopeId","data-v-fc205e14"]]);const Cl={class:"absolute full-width full-height"},$l={class:"absolute full-width full-height"},zl={class:"absolute full-width full-height"},Tl={class:"absolute full-width full-height"},xl=V({__name:"board-table",props:{board:{},width:{},perspective:{},playAs:{}},emits:["execute-node"],setup(e,{emit:o}){const l=e,t=q(()=>l.width/8),a=D(null),n=s=>{o("execute-node",s),a.value=null},i=q(()=>{var c;return(c=l.board.getMoveHistoryAst().children.at(-1))!=null?c:null});return(s,c)=>(v(),b("div",{"data-testid":"chess-board",class:"relative-position column",style:E({width:l.width+"px",height:l.width+"px"})},[z("div",Cl,[k(jt,{ranks:8,files:8})]),z("div",$l,[k(wl,{board:s.board,"square-size":t.value,files:8,ranks:8,perspective:s.perspective,"piece-focus":a.value,"last-move":i.value},null,8,["board","square-size","perspective","piece-focus","last-move"])]),z("div",zl,[k(ql,{"model-value":s.board.getSquares(),perspective:l.perspective,"square-size":t.value},null,8,["model-value","perspective","square-size"])]),z("div",Tl,[k(_l,{onExecuteNode:n,onUpdatePieceFocus:c[0]||(c[0]=d=>a.value=d),"piece-focus":a.value,board:s.board,"square-size":t.value,files:8,ranks:8,perspective:l.perspective},null,8,["piece-focus","board","square-size","perspective"])])],4))}}),El={class:"column"},Fl={class:"row"},Ml={class:"col"},Gl=V({__name:"chess-board",props:{board:{},width:{},perspective:{},playAs:{}},emits:["execute-node"],setup(e,{emit:o}){const l=e,t=q(()=>l.width/8/2.5);return(a,n)=>(v(),b("div",{style:E({width:`${a.width}px`})},[z("div",El,[z("div",{class:"row",style:E({height:`${t.value}px`})},[z("div",{style:E({width:`${t.value}px`})},null,4),(v(),b(F,null,M(8,(i,s)=>k(le,{key:s,class:"col column full-height justify-center",flat:""},{default:S(()=>[k(R,{class:"text-center q-pa-none"},{default:S(()=>[K(G(H($e)(a.perspective==="white"?9-(8-s):8-s).toUpperCase()),1)]),_:2},1024)]),_:2},1024)),64)),z("div",{style:E({width:`${t.value}px`})},null,4)],4),z("div",Fl,[z("div",{class:"column",style:E({width:`${t.value}px`})},[(v(),b(F,null,M(8,(i,s)=>k(le,{key:s,class:"col column full-height justify-center text-center",flat:""},{default:S(()=>[k(R,{class:"q-pa-none"},{default:S(()=>[K(G(a.perspective==="white"?8-s:9-(8-s)),1)]),_:2},1024)]),_:2},1024)),64))],4),z("div",Ml,[k(xl,{onExecuteNode:n[0]||(n[0]=i=>o("execute-node",i)),board:a.board,perspective:a.perspective,"play-as":a.playAs,width:a.width-t.value*2},null,8,["board","perspective","play-as","width"])]),z("div",{class:"column",style:E({width:`${t.value}px`})},[(v(),b(F,null,M(8,(i,s)=>k(le,{key:s,class:"col column full-height justify-center text-center",flat:""},{default:S(()=>[k(R,{class:"q-pa-none"},{default:S(()=>[K(G(a.perspective==="white"?8-s:9-(8-s)),1)]),_:2},1024)]),_:2},1024)),64))],4)]),z("div",{class:"row",style:E({height:`${t.value}px`})},[z("div",{style:E({width:`${t.value}px`})},null,4),(v(),b(F,null,M(8,(i,s)=>k(le,{key:s,class:"col column full-height justify-center",flat:""},{default:S(()=>[k(R,{class:"text-center q-pa-none"},{default:S(()=>[K(G(H($e)(a.perspective==="white"?9-(8-s):8-s).toUpperCase()),1)]),_:2},1024)]),_:2},1024)),64)),z("div",{style:E({width:`${t.value}px`})},null,4)],4)])],4))}}),Pl={xs:8,sm:10,md:14,lg:20,xl:24};var De=Re({name:"QChip",props:{...Ke,...zt,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:o,emit:l}){const{proxy:{$q:t}}=ue(),a=Ge(e,t),n=Tt(e,Pl),i=q(()=>e.selected===!0||e.icon!==void 0),s=q(()=>e.selected===!0?e.iconSelected||t.iconSet.chip.selected:e.icon),c=q(()=>e.iconRemove||t.iconSet.chip.remove),d=q(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),h=q(()=>{const f=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(f?` text-${f} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(d.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(a.value===!0?" q-chip--dark q-dark":"")}),g=q(()=>{const f=e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0},W={...f,role:"button","aria-hidden":"false","aria-label":e.removeAriaLabel||t.lang.label.remove};return{chip:f,remove:W}});function C(f){f.keyCode===13&&u(f)}function u(f){e.disable||(l("update:selected",!e.selected),l("click",f))}function p(f){(f.keyCode===void 0||f.keyCode===13)&&(Qe(f),e.disable===!1&&(l("update:modelValue",!1),l("remove")))}function B(){const f=[];d.value===!0&&f.push(A("div",{class:"q-focus-helper"})),i.value===!0&&f.push(A(oe,{class:"q-chip__icon q-chip__icon--left",name:s.value}));const W=e.label!==void 0?[A("div",{class:"ellipsis"},[e.label])]:void 0;return f.push(A("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},Et(o.default,W))),e.iconRight&&f.push(A(oe,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&f.push(A(oe,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:c.value,...g.value.remove,onClick:p,onKeyup:p})),f}return()=>{if(e.modelValue===!1)return;const f={class:h.value,style:n.value};return d.value===!0&&Object.assign(f,g.value.chip,{onClick:u,onKeyup:C}),xt("div",f,B(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[Ft,e.ripple]])}}});const Ie=e=>(Mt("data-v-0066e02d"),e=e(),Pt(),e),Hl=Ie(()=>z("div",{class:"text-h6"},"Your turn!",-1)),Bl=Ie(()=>z("div",{class:"text-h6"},"Waiting for opponent...",-1)),Ll={key:0,class:"col"},Wl={key:1,class:"col"},Dl=V({__name:"game-sidebar",props:{moveHistory:{},activeColour:{},ownColour:{}},setup(e){const o=e,l=q(()=>{const t=[];return o.moveHistory.children.forEach(a=>{const n=t.at(-1);if(!n||n.length!==1){t.push([a]);return}n.push(a)}),t});return(t,a)=>(v(),L(le,{flat:"",bordered:"",class:"q-ma-md"},{default:S(()=>[k(Ne,{mode:"out-in"},{default:S(()=>[t.activeColour===t.ownColour?(v(),L(R,{key:0,class:"bg-primary text-white q-mb-md"},{default:S(()=>[Hl]),_:1})):(v(),L(R,{key:1,class:"bg-grey text-black q-mb-md"},{default:S(()=>[Bl]),_:1}))]),_:1}),(v(!0),b(F,null,M(l.value,(n,i)=>(v(),L(R,{key:i,horizontal:"",class:"row q-py-none q-mx-md"},{default:S(()=>[n[0]?(v(),b("div",Ll,[k(De,{class:"white-move"},{default:S(()=>[K(G(H(Ee).writeNode(n[0])),1)]),_:2},1024)])):Y("",!0),n[1]?(v(),b("div",Wl,[k(De,{class:"black-move"},{default:S(()=>[K(G(H(Ee).writeNode(n[1])),1)]),_:2},1024)])):Y("",!0)]),_:2},1024))),128))]),_:1}))}});var Ul=Z(Dl,[["__scopeId","data-v-0066e02d"]]);export{Ul as G,Gl as _};
//# sourceMappingURL=game-sidebar.d49daf3f.js.map