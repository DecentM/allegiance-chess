import{a as ne,Q as se,b as ue}from"./QCard.a588b1ed.js";import{C as Z,c as B,i as me,a as ot,f as Te,B as at,Q as W}from"./chess-piece.4bba5fbd.js";import{M as Q,N as p,Q as k,W as H,R as L,aa as ie,r as A,a9 as Ve,x as Pe,C as Ne,u as xe,w as J,B as it,o as de,j as ke,A as nt,m as ye,as as ge,K as st,an as ut,h as be,at as rt,au as ct,av as dt,a as C,a4 as ft,a5 as vt,k as qe,c as pt,z as ht,e as mt,af as gt,aw as _t,s as yt,O as T,P as f,S as r,T as V,a0 as D,ab as E,$ as N,Z as Re,_ as M,U as x,V as K,D as bt,ax as wt}from"./index.97e3d356.js";import{b as R,a as P,Q as Ce}from"./QList.028b6d45.js";import{c as kt,i as qt,u as Ct,b as St,d as $t,e as zt,f as Et}from"./selection.0273a954.js";import{u as Ft,a as Tt}from"./use-dark.24f53c68.js";import{b as Me,c as Pt,a as xt}from"./focus-manager.202af5b7.js";import{u as Mt}from"./use-quasar.294020a4.js";const Ht={class:"row column full-width full-height no-pointer-events background-layer","data-testid":"background"},Lt=Q({__name:"background-layer",props:{ranks:{},files:{}},setup(e){return(l,t)=>(p(),k("div",Ht,[(p(!0),k(H,null,L(l.ranks,(o,a)=>(p(),k("div",{class:"rank col row full-width",key:a},[(p(!0),k(H,null,L(l.files,(c,i)=>(p(),k("div",{key:i,class:"file col"}))),128))]))),128))]))}});var Wt=ie(Lt,[["__scopeId","data-v-482c5e27"]]);const Bt={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function At({showing:e,avoidEmit:l,configureAnchorEl:t}){const{props:o,proxy:a,emit:c}=ke(),i=A(null);let s=null;function v(n){return i.value===null?!1:n===void 0||n.touches===void 0||n.touches.length<=1}const d={};t===void 0&&(Object.assign(d,{hide(n){a.hide(n)},toggle(n){a.toggle(n),n.qAnchorHandled=!0},toggleKey(n){Ve(n,13)===!0&&d.toggle(n)},contextClick(n){a.hide(n),Pe(n),Ne(()=>{a.show(n),n.qAnchorHandled=!0})},prevent:Pe,mobileTouch(n){if(d.mobileCleanup(n),v(n)!==!0)return;a.hide(n),i.value.classList.add("non-selectable");const g=n.target;xe(d,"anchor",[[g,"touchmove","mobileCleanup","passive"],[g,"touchend","mobileCleanup","passive"],[g,"touchcancel","mobileCleanup","passive"],[i.value,"contextmenu","prevent","notPassive"]]),s=setTimeout(()=>{s=null,a.show(n),n.qAnchorHandled=!0},300)},mobileCleanup(n){i.value.classList.remove("non-selectable"),s!==null&&(clearTimeout(s),s=null),e.value===!0&&n!==void 0&&kt()}}),t=function(n=o.contextMenu){if(o.noParentEvent===!0||i.value===null)return;let g;n===!0?a.$q.platform.is.mobile===!0?g=[[i.value,"touchstart","mobileTouch","passive"]]:g=[[i.value,"mousedown","hide","passive"],[i.value,"contextmenu","contextClick","notPassive"]]:g=[[i.value,"click","toggle","passive"],[i.value,"keyup","toggleKey","passive"]],xe(d,"anchor",g)});function h(){nt(d,"anchor")}function b(n){for(i.value=n;i.value.classList.contains("q-anchor--skip");)i.value=i.value.parentNode;t()}function q(){if(o.target===!1||o.target===""||a.$el.parentNode===null)i.value=null;else if(o.target===!0)b(a.$el.parentNode);else{let n=o.target;if(typeof o.target=="string")try{n=document.querySelector(o.target)}catch{n=void 0}n!=null?(i.value=n.$el||n,t()):(i.value=null,console.error(`Anchor: target "${o.target}" not found`))}}return J(()=>o.contextMenu,n=>{i.value!==null&&(h(),t(n))}),J(()=>o.target,()=>{i.value!==null&&h(),q()}),J(()=>o.noParentEvent,n=>{i.value!==null&&(n===!0?h():t())}),it(()=>{q(),l!==!0&&o.modelValue===!0&&i.value===null&&c("update:modelValue",!1)}),de(()=>{s!==null&&clearTimeout(s),h()}),{anchorEl:i,canShow:v,anchorEvents:d}}function Dt(e,l){const t=A(null);let o;function a(s,v){const d=`${v!==void 0?"add":"remove"}EventListener`,h=v!==void 0?v:o;s!==window&&s[d]("scroll",h,ye.passive),window[d]("scroll",h,ye.passive),o=v}function c(){t.value!==null&&(a(t.value),t.value=null)}const i=J(()=>e.noParentEvent,()=>{t.value!==null&&(c(),l())});return de(i),{localScrollTarget:t,unconfigureScrollTarget:c,changeScrollEvent:a}}const ae=[];function Qt(e,l){do{if(e.$options.name==="QMenu"){if(e.hide(l),e.$props.separateClosePopup===!0)return ge(e)}else if(e.__qPortal===!0){const t=ge(e);return t!==void 0&&t.$options.name==="QPopupProxy"?(e.hide(l),t):e}e=ge(e)}while(e!=null)}function Vt(e){for(e=e.parent;e!=null;){if(e.type.name==="QGlobalDialog")return!0;if(e.type.name==="QDialog"||e.type.name==="QMenu")return!1;e=e.parent}return!1}function Nt(e,l,t,o){const a=A(!1),c=A(!1);let i=null;const s={},v=o==="dialog"&&Vt(e);function d(b){if(b===!0){Me(s),c.value=!0;return}c.value=!1,a.value===!1&&(v===!1&&i===null&&(i=ct(!1,o)),a.value=!0,ae.push(e.proxy),Pt(s))}function h(b){if(c.value=!1,b!==!0)return;Me(s),a.value=!1;const q=ae.indexOf(e.proxy);q!==-1&&ae.splice(q,1),i!==null&&(dt(i),i=null)}return st(()=>{h(!0)}),e.proxy.__qPortal=!0,ut(e.proxy,"contentEl",()=>l.value),{showPortal:d,hidePortal:h,portalIsActive:a,portalIsAccessible:c,renderPortal:()=>v===!0?t():a.value===!0?[be(rt,{to:i},t())]:void 0}}const Rt={transitionShow:{type:String,default:"fade"},transitionHide:{type:String,default:"fade"},transitionDuration:{type:[String,Number],default:300}};function Kt(e,l=()=>{},t=()=>{}){return{transitionProps:C(()=>{const o=`q-transition--${e.transitionShow||l()}`,a=`q-transition--${e.transitionHide||t()}`;return{appear:!0,enterFromClass:`${o}-enter-from`,enterActiveClass:`${o}-enter-active`,enterToClass:`${o}-enter-to`,leaveFromClass:`${a}-leave-from`,leaveActiveClass:`${a}-leave-active`,leaveToClass:`${a}-leave-to`}}),transitionStyle:C(()=>`--q-transition-duration: ${e.transitionDuration}ms`)}}function Ot(){let e;const l=ke();function t(){e=void 0}return ft(t),de(t),{removeTick:t,registerTick(o){e=o,Ne(()=>{e===o&&(vt(l)===!1&&e(),e=void 0)})}}}const O=[];let I;function jt(e){I=e.keyCode===27}function Ut(){I===!0&&(I=!1)}function Gt(e){I===!0&&(I=!1,Ve(e,27)===!0&&O[O.length-1](e))}function Ke(e){window[e]("keydown",jt),window[e]("blur",Ut),window[e]("keyup",Gt),I=!1}function Xt(e){qe.is.desktop===!0&&(O.push(e),O.length===1&&Ke("addEventListener"))}function He(e){const l=O.indexOf(e);l>-1&&(O.splice(l,1),O.length===0&&Ke("removeEventListener"))}const j=[];function Oe(e){j[j.length-1](e)}function Yt(e){qe.is.desktop===!0&&(j.push(e),j.length===1&&document.body.addEventListener("focusin",Oe))}function Zt(e){const l=j.indexOf(e);l>-1&&(j.splice(l,1),j.length===0&&document.body.removeEventListener("focusin",Oe))}const{notPassiveCapture:re}=ye,U=[];function ce(e){const l=e.target;if(l===void 0||l.nodeType===8||l.classList.contains("no-pointer-events")===!0)return;let t=ae.length-1;for(;t>=0;){const o=ae[t].$;if(o.type.name==="QTooltip"){t--;continue}if(o.type.name!=="QDialog")break;if(o.props.seamless!==!0)return;t--}for(let o=U.length-1;o>=0;o--){const a=U[o];if((a.anchorEl.value===null||a.anchorEl.value.contains(l)===!1)&&(l===document.body||a.innerRef.value!==null&&a.innerRef.value.contains(l)===!1))e.qClickOutside=!0,a.onClickOutside(e);else return}}function Jt(e){U.push(e),U.length===1&&(document.addEventListener("mousedown",ce,re),document.addEventListener("touchstart",ce,re))}function Le(e){const l=U.findIndex(t=>t===e);l>-1&&(U.splice(l,1),U.length===0&&(document.removeEventListener("mousedown",ce,re),document.removeEventListener("touchstart",ce,re)))}let We,Be;function Ae(e){const l=e.split(" ");return l.length!==2?!1:["top","center","bottom"].includes(l[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(l[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function It(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const we={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{we[`${e}#ltr`]=e,we[`${e}#rtl`]=e});function De(e,l){const t=e.split(" ");return{vertical:t[0],horizontal:we[`${t[1]}#${l===!0?"rtl":"ltr"}`]}}function el(e,l){let{top:t,left:o,right:a,bottom:c,width:i,height:s}=e.getBoundingClientRect();return l!==void 0&&(t-=l[1],o-=l[0],c+=l[1],a+=l[0],i+=l[0],s+=l[1]),{top:t,bottom:c,height:s,left:o,right:a,width:i,middle:o+(a-o)/2,center:t+(c-t)/2}}function tl(e,l,t){let{top:o,left:a}=e.getBoundingClientRect();return o+=l.top,a+=l.left,t!==void 0&&(o+=t[1],a+=t[0]),{top:o,bottom:o+1,height:1,left:a,right:a+1,width:1,middle:a,center:o}}function ll(e,l){return{top:0,center:l/2,bottom:l,left:0,middle:e/2,right:e}}function Qe(e,l,t,o){return{top:e[t.vertical]-l[o.vertical],left:e[t.horizontal]-l[o.horizontal]}}function je(e,l=0){if(e.targetEl===null||e.anchorEl===null||l>5)return;if(e.targetEl.offsetHeight===0||e.targetEl.offsetWidth===0){setTimeout(()=>{je(e,l+1)},10);return}const{targetEl:t,offset:o,anchorEl:a,anchorOrigin:c,selfOrigin:i,absoluteOffset:s,fit:v,cover:d,maxHeight:h,maxWidth:b}=e;if(qe.is.ios===!0&&window.visualViewport!==void 0){const z=document.body.style,{offsetLeft:y,offsetTop:$}=window.visualViewport;y!==We&&(z.setProperty("--q-pe-left",y+"px"),We=y),$!==Be&&(z.setProperty("--q-pe-top",$+"px"),Be=$)}const{scrollLeft:q,scrollTop:n}=t,g=s===void 0?el(a,d===!0?[0,0]:o):tl(a,s,o);Object.assign(t.style,{top:0,left:0,minWidth:null,minHeight:null,maxWidth:b||"100vw",maxHeight:h||"100vh",visibility:"visible"});const{offsetWidth:G,offsetHeight:S}=t,{elWidth:X,elHeight:Y}=v===!0||d===!0?{elWidth:Math.max(g.width,G),elHeight:d===!0?Math.max(g.height,S):S}:{elWidth:G,elHeight:S};let F={maxWidth:b,maxHeight:h};(v===!0||d===!0)&&(F.minWidth=g.width+"px",d===!0&&(F.minHeight=g.height+"px")),Object.assign(t.style,F);const u=ll(X,Y);let _=Qe(g,u,c,i);if(s===void 0||o===void 0)_e(_,g,u,c,i);else{const{top:z,left:y}=_;_e(_,g,u,c,i);let $=!1;if(_.top!==z){$=!0;const w=2*o[1];g.center=g.top-=w,g.bottom-=w+2}if(_.left!==y){$=!0;const w=2*o[0];g.middle=g.left-=w,g.right-=w+2}$===!0&&(_=Qe(g,u,c,i),_e(_,g,u,c,i))}F={top:_.top+"px",left:_.left+"px"},_.maxHeight!==void 0&&(F.maxHeight=_.maxHeight+"px",g.height>_.maxHeight&&(F.minHeight=F.maxHeight)),_.maxWidth!==void 0&&(F.maxWidth=_.maxWidth+"px",g.width>_.maxWidth&&(F.minWidth=F.maxWidth)),Object.assign(t.style,F),t.scrollTop!==n&&(t.scrollTop=n),t.scrollLeft!==q&&(t.scrollLeft=q)}function _e(e,l,t,o,a){const c=t.bottom,i=t.right,s=qt(),v=window.innerHeight-s,d=document.body.clientWidth;if(e.top<0||e.top+c>v)if(a.vertical==="center")e.top=l[o.vertical]>v/2?Math.max(0,v-c):0,e.maxHeight=Math.min(c,v);else if(l[o.vertical]>v/2){const h=Math.min(v,o.vertical==="center"?l.center:o.vertical===a.vertical?l.bottom:l.top);e.maxHeight=Math.min(c,h),e.top=Math.max(0,h-c)}else e.top=Math.max(0,o.vertical==="center"?l.center:o.vertical===a.vertical?l.top:l.bottom),e.maxHeight=Math.min(c,v-e.top);if(e.left<0||e.left+i>d)if(e.maxWidth=Math.min(i,d),a.horizontal==="middle")e.left=l[o.horizontal]>d/2?Math.max(0,d-i):0;else if(l[o.horizontal]>d/2){const h=Math.min(d,o.horizontal==="middle"?l.middle:o.horizontal===a.horizontal?l.right:l.left);e.maxWidth=Math.min(i,h),e.left=Math.max(0,h-e.maxWidth)}else e.left=Math.max(0,o.horizontal==="middle"?l.middle:o.horizontal===a.horizontal?l.left:l.right),e.maxWidth=Math.min(i,d-e.left)}var Ue=pt({name:"QMenu",inheritAttrs:!1,props:{...Bt,...Ct,...Ft,...Rt,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:Ae},self:{type:String,validator:Ae},offset:{type:Array,validator:It},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...St,"click","escapeKey"],setup(e,{slots:l,emit:t,attrs:o}){let a=null,c,i,s;const v=ke(),{proxy:d}=v,{$q:h}=d,b=A(null),q=A(!1),n=C(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),g=Tt(e,h),{registerTick:G,removeTick:S}=Ot(),{registerTimeout:X}=$t(),{transitionProps:Y,transitionStyle:F}=Kt(e),{localScrollTarget:u,changeScrollEvent:_,unconfigureScrollTarget:z}=Dt(e,Ee),{anchorEl:y,canShow:$}=At({showing:q}),{hide:w}=zt({showing:q,canShow:$,handleShow:Ze,handleHide:Je,hideOnRouteChange:n,processOnMount:!0}),{showPortal:ee,hidePortal:te,renderPortal:le}=Nt(v,b,et,"menu"),fe={anchorEl:y,innerRef:b,onClickOutside(m){if(e.persistent!==!0&&q.value===!0)return w(m),(m.type==="touchstart"||m.target.classList.contains("q-dialog__backdrop"))&&yt(m),!0}},Se=C(()=>De(e.anchor||(e.cover===!0?"center middle":"bottom start"),h.lang.rtl)),Ge=C(()=>e.cover===!0?Se.value:De(e.self||"top start",h.lang.rtl)),Xe=C(()=>(e.square===!0?" q-menu--square":"")+(g.value===!0?" q-menu--dark q-dark":"")),Ye=C(()=>e.autoClose===!0?{onClick:Ie}:{}),$e=C(()=>q.value===!0&&e.persistent!==!0);J($e,m=>{m===!0?(Xt(pe),Jt(fe)):(He(pe),Le(fe))});function ve(){xt(()=>{let m=b.value;m&&m.contains(document.activeElement)!==!0&&(m=m.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||m.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||m.querySelector("[autofocus], [data-autofocus]")||m,m.focus({preventScroll:!0}))})}function Ze(m){if(a=e.noRefocus===!1?document.activeElement:null,Yt(Fe),ee(),Ee(),c=void 0,m!==void 0&&(e.touchPosition||e.contextMenu)){const he=ht(m);if(he.left!==void 0){const{top:tt,left:lt}=y.value.getBoundingClientRect();c={left:he.left-lt,top:he.top-tt}}}i===void 0&&(i=J(()=>h.screen.width+"|"+h.screen.height+"|"+e.self+"|"+e.anchor+"|"+h.lang.rtl,oe)),e.noFocus!==!0&&document.activeElement.blur(),G(()=>{oe(),e.noFocus!==!0&&ve()}),X(()=>{h.platform.is.ios===!0&&(s=e.autoClose,b.value.click()),oe(),ee(!0),t("show",m)},e.transitionDuration)}function Je(m){S(),te(),ze(!0),a!==null&&(m===void 0||m.qClickOutside!==!0)&&(((m&&m.type.indexOf("key")===0?a.closest('[tabindex]:not([tabindex^="-"])'):void 0)||a).focus(),a=null),X(()=>{te(!0),t("hide",m)},e.transitionDuration)}function ze(m){c=void 0,i!==void 0&&(i(),i=void 0),(m===!0||q.value===!0)&&(Zt(Fe),z(),Le(fe),He(pe)),m!==!0&&(a=null)}function Ee(){(y.value!==null||e.scrollTarget!==void 0)&&(u.value=Et(y.value,e.scrollTarget),_(u.value,oe))}function Ie(m){s!==!0?(Qt(d,m),t("click",m)):s=!1}function Fe(m){$e.value===!0&&e.noFocus!==!0&&_t(b.value,m.target)!==!0&&ve()}function pe(m){t("escapeKey"),w(m)}function oe(){je({targetEl:b.value,offset:e.offset,anchorEl:y.value,anchorOrigin:Se.value,selfOrigin:Ge.value,absoluteOffset:c,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function et(){return be(gt,Y.value,()=>q.value===!0?be("div",{role:"menu",...o,ref:b,tabindex:-1,class:["q-menu q-position-engine scroll"+Xe.value,o.class],style:[o.style,F.value],...Ye.value},mt(l.default)):null)}return de(ze),Object.assign(d,{focus:ve,updatePosition:oe}),le}});const ol=Q({__name:"promotion-selector",props:{modelValue:{type:Boolean},allegiance:{}},emits:["click","dismiss"],setup(e,{emit:l}){const t=["Q","N","R","B"],o=()=>{l("dismiss")};return(a,c)=>(p(),T(Ue,{cover:"","model-value":a.modelValue,"onUpdate:modelValue":o},{default:f(()=>[r(Ce,null,{default:f(()=>[(p(),k(H,null,L(t,i=>r(R,{clickable:"",key:i,class:"q-pa-sm",onClick:s=>l("click",i)},{default:f(()=>[r(P,{class:"promotion-piece"},{default:f(()=>[r(Z,{allegiance:a.allegiance,piece:i,size:86},null,8,["allegiance","piece"])]),_:2},1024)]),_:2},1032,["onClick"])),64))]),_:1})]),_:1},8,["model-value"]))}});var al=ie(ol,[["__scopeId","data-v-0418dade"]]);const il=Q({__name:"capture-selector",props:{modelValue:{type:Boolean},moves:{}},emits:["click","dismiss"],setup(e,{emit:l}){const t=()=>{l("dismiss")};return(o,a)=>(p(),T(Ue,{cover:"","model-value":o.modelValue,"onUpdate:modelValue":t},{default:f(()=>[r(Ce,null,{default:f(()=>[o.moves.includes("x")?(p(),T(R,{key:0,clickable:"",onClick:a[0]||(a[0]=c=>l("click","capture")),class:"q-py-lg"},{default:f(()=>[r(P,{class:"items-center"},{default:f(()=>[r(V,{size:"72px",name:"close"})]),_:1})]),_:1})):D("",!0),o.moves.includes(">")?(p(),T(R,{key:1,clickable:"",onClick:a[1]||(a[1]=c=>l("click","challenge")),class:"q-py-lg"},{default:f(()=>[r(P,{class:"items-center"},{default:f(()=>[r(V,{size:"64px",name:"arrow_forward_ios"})]),_:1})]),_:1})):D("",!0)]),_:1})]),_:1},8,["model-value"]))}});const nl={class:"relative-position full-width full-height interaction-layer"},sl=["onClick"],ul=Q({__name:"interaction-layer",props:{board:{},squareSize:{},ranks:{},files:{},perspective:{},pieceFocus:{}},emits:["execute-node","update-piece-focus","update-highlights"],setup(e,{emit:l}){const t=e,o=A(null),a=C(()=>t.board.enPassantTarget),c=A(null),i=A(null),s=C(()=>t.pieceFocus?t.board.getSquare(t.pieceFocus):null),v=C(()=>t.pieceFocus?t.board.getValidMoves(t.pieceFocus).map(z=>z.kind!=="move"?null:z.to).filter(Boolean):[]),d=u=>{const _=t.board.getSquare(u);return _?ot(_.allegiance)!==t.perspective:!1},h=u=>v.value.some(_=>_&&B(u,_)),b=(u,_)=>{var y,$;if(_.stopPropagation(),_.preventDefault(),h(u)&&t.pieceFocus&&s.value){if(a.value&&B(a.value,u))l("execute-node",{kind:"move",type:"en-passant",from:t.pieceFocus,to:u}),l("update-piece-focus",null);else if(me(u,t.board.activeColour)&&s&&s.value.piece===null){c.value=u;const w=t.board.getSquare(t.pieceFocus);i.value=(y=w==null?void 0:w.allegiance)!=null?y:null}else t.board.getSquare(u)?o.value=u:(($=s.value)==null?void 0:$.piece)==="K"&&Math.abs(t.pieceFocus.file-u.file)>1?l("execute-node",{kind:"move",type:"castle",side:u.file===7?"king":"queen",from:t.pieceFocus,to:u}):l("execute-node",{kind:"move",from:t.pieceFocus,to:u});return}if(d(u))return;const z=t.board.getSquare(u);l("update-piece-focus",z?u:null)},q=(u,_)=>{!t.pieceFocus||(c.value=null,l("execute-node",{kind:"move",type:"promotion",from:t.pieceFocus,to:u,promotionTo:_}),l("update-piece-focus",null))},n=()=>{c.value=null,i.value=null},g=()=>{o.value=null},G=u=>{!t.pieceFocus||!o.value||(u==="capture"?l("execute-node",{kind:"move",type:"capture",from:t.pieceFocus,to:o.value}):l("execute-node",{kind:"move",type:"allegiance",from:t.pieceFocus,to:o.value}),o.value=null,l("update-piece-focus",null))},S=(u,_)=>{const z=u+1,y=_+1;return t.perspective==="white"?{file:z,rank:9-y}:{file:9-z,rank:y}},X=u=>!t.board.getSquare(u),Y=(u,_,z)=>t.board.getValidMoves().some($=>$.kind==="move"&&B($.to,z)&&B($.from,_)&&$.type===u),F=C(()=>{const u=[];return!t.pieceFocus||!o.value||(Y("allegiance",t.pieceFocus,o.value)&&u.push(">"),Y("capture",t.pieceFocus,o.value)&&u.push("x")),u});return(u,_)=>(p(),k("div",nl,[(p(!0),k(H,null,L(u.ranks,(z,y)=>(p(),k("div",{class:"col column row full-width",key:y},[(p(!0),k(H,null,L(u.files,($,w)=>{var ee,te;return p(),k("div",{key:w,class:"full-height"},[E("div",{class:Re(["absolute",{"cursor-pointer":!X(S(w,y))||h(S(w,y)),"cursor-not-allowed":d(S(w,y))&&!s.value}]),onClick:le=>b(S(w,y),le),style:M(u.perspective==="white"?{width:`${u.squareSize}px`,height:`${u.squareSize}px`,left:`${(S(w,y).file-1)*u.squareSize}px`,bottom:`${(S(w,y).rank-1)*u.squareSize}px`}:{width:`${u.squareSize}px`,height:`${u.squareSize}px`,right:`${(S(w,y).file-1)*u.squareSize}px`,top:`${(S(w,y).rank-1)*u.squareSize}px`})},[o.value&&N(B)(o.value,S(w,y))?(p(),T(il,{key:0,moves:F.value,"model-value":(ee=N(B)(o.value,S(w,y)))!=null?ee:!1,size:u.squareSize,onClick:G,onDismiss:g},null,8,["moves","model-value","size"])):D("",!0)],14,sl),i.value!==null&&(N(me)(S(w,y),"white")||N(me)(S(w,y),"black"))?(p(),T(al,{key:0,"model-value":(te=N(B)(c.value,S(w,y)))!=null?te:!1,allegiance:i.value,size:u.squareSize,onClick:le=>q(S(w,y),le),onDismiss:n},null,8,["model-value","allegiance","size","onClick"])):D("",!0)])}),128))]))),128))]))}});var rl=ie(ul,[["__scopeId","data-v-2b4692d1"]]);const cl={class:"relative-position full-width full-height column no-pointer-events indicators-layer"},dl=Q({__name:"indicators-layer",props:{board:{},ranks:{},files:{},squareSize:{},perspective:{},pieceFocus:{}},setup(e){const l=e,t=C(()=>l.pieceFocus?l.board.getValidMoves(l.pieceFocus).map(h=>h.kind!=="move"?null:h.to).filter(Boolean):[]),o=v=>t.value.some(d=>d&&B(v,d)),a=v=>!l.board.getSquare(v),c=(v,d)=>{const h=v+1,b=d+1;return l.perspective==="white"?{file:h,rank:9-b}:{file:9-h,rank:b}},i=C(()=>l.board.getCheckMoves()),s=v=>i.value.some(d=>d.kind==="move"&&B(d.to,v));return(v,d)=>(p(),k("div",cl,[(p(!0),k(H,null,L(v.ranks,(h,b)=>(p(),k("div",{class:"col column row full-width",key:b},[(p(!0),k(H,null,L(v.files,(q,n)=>(p(),k("div",{key:n,class:Re(["full-height move-placeholder",{even:b%2===0?n%2===0:n%2!==0,focus:N(B)(v.pieceFocus,c(n,b)),show:o(c(n,b)),capture:!a(c(n,b)),target:a(c(n,b)),checked:s(c(n,b))}])},null,2))),128))]))),128))]))}});var fl=ie(dl,[["__scopeId","data-v-56f470a5"]]);const vl={class:"relative-position full-width full-height no-pointer-events pieces-layer"},pl=Q({__name:"pieces-layer",props:{modelValue:{},squareSize:{},perspective:{}},setup(e){return(l,t)=>(p(),k("div",vl,[(p(!0),k(H,null,L(l.modelValue,(o,a)=>(p(),k("div",{key:a},[o?(p(),T(Z,{key:0,"data-testid":"piece",class:"absolute",piece:o.piece,allegiance:o.allegiance,size:l.squareSize,style:M(l.perspective==="white"?{left:`${(o.file-1)*l.squareSize}px`,bottom:`${(o.rank-1)*l.squareSize}px`}:{right:`${(o.file-1)*l.squareSize}px`,top:`${(o.rank-1)*l.squareSize}px`})},null,8,["piece","allegiance","size","style"])):(p(),k("div",{key:1,style:M({width:`${l.squareSize}px`,height:`${l.squareSize}px`})},null,4))]))),128))]))}});var hl=ie(pl,[["__scopeId","data-v-7ad57934"]]);const ml={class:"absolute full-width full-height"},gl={class:"absolute full-width full-height"},_l={class:"absolute full-width full-height"},yl={class:"absolute full-width full-height"},bl=Q({__name:"board-table",props:{board:{},width:{},perspective:{},playAs:{}},emits:["execute-node"],setup(e,{emit:l}){const t=e,o=C(()=>t.width/8),a=A(null),c=i=>{l("execute-node",i),a.value=null};return(i,s)=>(p(),k("div",{"data-testid":"chess-board",class:"relative-position column",style:M({width:t.width+"px",height:t.width+"px"})},[E("div",ml,[r(Wt,{ranks:8,files:8})]),E("div",gl,[r(fl,{board:i.board,"square-size":o.value,files:8,ranks:8,perspective:i.perspective,"piece-focus":a.value},null,8,["board","square-size","perspective","piece-focus"])]),E("div",_l,[r(hl,{"model-value":i.board.getSquares(),perspective:t.perspective,"square-size":o.value},null,8,["model-value","perspective","square-size"])]),E("div",yl,[r(rl,{onExecuteNode:c,onUpdatePieceFocus:s[0]||(s[0]=v=>a.value=v),"piece-focus":a.value,board:i.board,"square-size":o.value,files:8,ranks:8,perspective:t.perspective},null,8,["piece-focus","board","square-size","perspective"])])],4))}}),wl={class:"column"},kl={class:"row"},ql={class:"col"},Ml=Q({__name:"chess-board",props:{board:{},width:{},perspective:{},playAs:{}},emits:["execute-node"],setup(e,{emit:l}){const t=e,o=C(()=>t.width/8/2.5);return(a,c)=>(p(),k("div",wl,[E("div",{class:"row",style:M({height:`${o.value}px`})},[E("div",{style:M({width:`${o.value}px`})},null,4),(p(),k(H,null,L(8,(i,s)=>r(se,{key:s,class:"col column full-height justify-center",flat:""},{default:f(()=>[r(ne,{class:"text-center q-pa-none"},{default:f(()=>[x(K(N(Te)(a.perspective==="white"?9-(8-s):8-s).toUpperCase()),1)]),_:2},1024)]),_:2},1024)),64)),E("div",{style:M({width:`${o.value}px`})},null,4)],4),E("div",kl,[E("div",{class:"column",style:M({width:`${o.value}px`})},[(p(),k(H,null,L(8,(i,s)=>r(se,{key:s,class:"col column full-height justify-center text-center",flat:""},{default:f(()=>[r(ne,{class:"q-pa-none"},{default:f(()=>[x(K(a.perspective==="white"?8-s:9-(8-s)),1)]),_:2},1024)]),_:2},1024)),64))],4),E("div",ql,[r(bl,{onExecuteNode:c[0]||(c[0]=i=>l("execute-node",i)),board:a.board,perspective:a.perspective,"play-as":a.playAs,width:a.width-o.value},null,8,["board","perspective","play-as","width"])]),E("div",{class:"column",style:M({width:`${o.value}px`})},[(p(),k(H,null,L(8,(i,s)=>r(se,{key:s,class:"col column full-height justify-center text-center",flat:""},{default:f(()=>[r(ne,{class:"q-pa-none"},{default:f(()=>[x(K(a.perspective==="white"?8-s:9-(8-s)),1)]),_:2},1024)]),_:2},1024)),64))],4)]),E("div",{class:"row",style:M({height:`${o.value}px`})},[E("div",{style:M({width:`${o.value}px`})},null,4),(p(),k(H,null,L(8,(i,s)=>r(se,{key:s,class:"col column full-height justify-center",flat:""},{default:f(()=>[r(ne,{class:"text-center q-pa-none"},{default:f(()=>[x(K(N(Te)(a.perspective==="white"?9-(8-s):8-s).toUpperCase()),1)]),_:2},1024)]),_:2},1024)),64)),E("div",{style:M({width:`${o.value}px`})},null,4)],4)]))}}),Cl={class:"row"},Hl=Q({__name:"afen-info",props:{modelValue:{}},setup(e){const l=e,t=C(()=>{const d=new at;return d.importAFEN(l.modelValue),d}),o=C(()=>{if(!!t.value)return t.value.activeColour}),a=C(()=>{if(!!t.value)return t.value.halfmoveClock}),c=C(()=>{if(!!t.value)return t.value.fullmoveNumber}),i=C(()=>{if(!!t.value)return t.value.castlingRights}),s=Mt(),v=()=>{if(!!t.value)try{navigator.clipboard.writeText(l.modelValue),s.notify({position:"bottom-right",timeout:4e3,message:"AFEN copied to clipboard",icon:"content_copy"})}catch{s.notify({position:"bottom-right",timeout:4e3,message:"Could not write to clipboard",icon:"close",iconColor:"red"})}};return(d,h)=>(p(),T(Ce,null,{default:f(()=>[bt((p(),T(R,{clickable:"",onClick:v},{default:f(()=>[r(P,{class:"q-mt-sm q-mb-sm"},{default:f(()=>[r(W,null,{default:f(()=>[x("AFEN")]),_:1}),r(W,{caption:"",lines:"2"},{default:f(()=>[x(K(d.modelValue),1)]),_:1})]),_:1}),r(P,{side:""},{default:f(()=>[r(V,{name:"edit"})]),_:1})]),_:1})),[[wt]]),r(ue,{inset:""}),r(R,null,{default:f(()=>[r(P,{class:"q-mt-sm q-mb-sm"},{default:f(()=>[r(W,null,{default:f(()=>[x("Next move")]),_:1}),r(W,{caption:"",lines:"2"},{default:f(()=>[x(K(o.value),1)]),_:1})]),_:1}),r(P,{side:""},{default:f(()=>[r(V,{name:"arrow_forward_ios"})]),_:1})]),_:1}),r(ue,{inset:""}),r(R,null,{default:f(()=>[r(P,{class:"q-mt-sm q-mb-sm"},{default:f(()=>[r(W,null,{default:f(()=>[x("Halfmove clock")]),_:1}),r(W,{caption:"",lines:"2"},{default:f(()=>[x(K(a.value),1)]),_:1})]),_:1}),r(P,{side:""},{default:f(()=>[r(V,{name:"hourglass_bottom"})]),_:1})]),_:1}),r(ue,{inset:""}),r(R,null,{default:f(()=>[r(P,{class:"q-mt-sm q-mb-sm"},{default:f(()=>[r(W,null,{default:f(()=>[x("Fullmove number")]),_:1}),r(W,{caption:"",lines:"2"},{default:f(()=>[x(K(c.value),1)]),_:1})]),_:1}),r(P,{side:""},{default:f(()=>[r(V,{name:"update"})]),_:1})]),_:1}),r(ue,{inset:""}),r(R,null,{default:f(()=>[r(P,{class:"q-mt-sm q-mb-sm"},{default:f(()=>[r(W,null,{default:f(()=>[x("Castling rights")]),_:1}),r(W,{caption:"",lines:"2"},{default:f(()=>{var b,q,n,g;return[E("div",Cl,[(b=i.value)!=null&&b.white.includes("queen")?(p(),T(Z,{key:0,allegiance:3,piece:"Q",size:24})):D("",!0),(q=i.value)!=null&&q.white.includes("king")?(p(),T(Z,{key:1,allegiance:3,piece:"K",size:24})):D("",!0),(n=i.value)!=null&&n.black.includes("queen")?(p(),T(Z,{key:2,allegiance:0,piece:"Q",size:24})):D("",!0),(g=i.value)!=null&&g.black.includes("king")?(p(),T(Z,{key:3,allegiance:0,piece:"K",size:24})):D("",!0),!i.value||i.value.black.length===0&&i.value.white.length===0?(p(),T(V,{key:4,name:"close"})):D("",!0)])]}),_:1})]),_:1}),r(P,{side:""},{default:f(()=>[r(V,{name:"castle"})]),_:1})]),_:1})]),_:1}))}});export{Ml as _,Hl as a};