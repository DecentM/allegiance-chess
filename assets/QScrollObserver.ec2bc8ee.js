import{r as ce,x as de,k as C,c as re,o as S,R as k,n as x,h as fe,j as M,S as w,T as B,w as z,U as ve,V as pe,W as Q,X as h,Y as le,Z as me,$ as he,a0 as we,a1 as ge,a2 as ye,a3 as be,a4 as L,a5 as V,a6 as I,a7 as H,a8 as D,a9 as O}from"./index.cdbd9832.js";function Ee(){const e=ce(!de.value);return e.value===!1&&C(()=>{e.value=!0}),e}const se=typeof ResizeObserver!="undefined",K=se===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var Ae=re({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:t}){let i=null,r,o={width:-1,height:-1};function n(u){u===!0||e.debounce===0||e.debounce==="0"?l():i===null&&(i=setTimeout(l,e.debounce))}function l(){if(i!==null&&(clearTimeout(i),i=null),r){const{offsetWidth:u,offsetHeight:s}=r;(u!==o.width||s!==o.height)&&(o={width:u,height:s},t("resize",o))}}const{proxy:a}=M();if(se===!0){let u;const s=d=>{r=a.$el.parentNode,r?(u=new ResizeObserver(n),u.observe(r),l()):d!==!0&&x(()=>{s(!0)})};return C(()=>{s()}),S(()=>{i!==null&&clearTimeout(i),u!==void 0&&(u.disconnect!==void 0?u.disconnect():r&&u.unobserve(r))}),k}else{let d=function(){i!==null&&(clearTimeout(i),i=null),s!==void 0&&(s.removeEventListener!==void 0&&s.removeEventListener("resize",n,w.passive),s=void 0)},v=function(){d(),r&&r.contentDocument&&(s=r.contentDocument.defaultView,s.addEventListener("resize",n,w.passive),l())};const u=Ee();let s;return C(()=>{x(()=>{r=a.$el,r&&v()})}),S(d),a.trigger=n,()=>{if(u.value===!0)return fe("object",{style:K.style,tabindex:-1,type:"text/html",data:K.url,"aria-hidden":"true",onLoad:v})}}}});function Xe(e,t,i){let r;function o(){r!==void 0&&(B.remove(r),r=void 0)}return S(()=>{e.value===!0&&o()}),{removeFromHistory:o,addToHistory(){r={condition:()=>i.value===!0,handler:t},B.add(r)}}}const Ye={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},Re=["beforeShow","show","beforeHide","hide"];function De({showing:e,canShow:t,hideOnRouteChange:i,handleShow:r,handleHide:o,processOnMount:n}){const l=M(),{props:a,emit:u,proxy:s}=l;let d;function v(c){e.value===!0?m(c):p(c)}function p(c){if(a.disable===!0||c!==void 0&&c.qAnchorHandled===!0||t!==void 0&&t(c)!==!0)return;const y=a["onUpdate:modelValue"]!==void 0;y===!0&&(u("update:modelValue",!0),d=c,x(()=>{d===c&&(d=void 0)})),(a.modelValue===null||y===!1)&&f(c)}function f(c){e.value!==!0&&(e.value=!0,u("beforeShow",c),r!==void 0?r(c):u("show",c))}function m(c){if(a.disable===!0)return;const y=a["onUpdate:modelValue"]!==void 0;y===!0&&(u("update:modelValue",!1),d=c,x(()=>{d===c&&(d=void 0)})),(a.modelValue===null||y===!1)&&b(c)}function b(c){e.value!==!1&&(e.value=!1,u("beforeHide",c),o!==void 0?o(c):u("hide",c))}function U(c){a.disable===!0&&c===!0?a["onUpdate:modelValue"]!==void 0&&u("update:modelValue",!1):c===!0!==e.value&&(c===!0?f:b)(d)}z(()=>a.modelValue,U),i!==void 0&&ve(l)===!0&&z(()=>s.$route.fullPath,()=>{i.value===!0&&e.value===!0&&m()}),n===!0&&C(()=>{U(a.modelValue)});const j={show:p,hide:m,toggle:v};return Object.assign(s,j),j}const Te=[null,document,document.body,document.scrollingElement,document.documentElement];function Ce(e,t){let i=pe(t);if(i===void 0){if(e==null)return window;i=e.closest(".scroll,.scroll-y,.overflow-auto")}return Te.includes(i)?window:i}function _(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function N(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}function ue(e,t,i=0){const r=arguments[3]===void 0?performance.now():arguments[3],o=_(e);if(i<=0){o!==t&&F(e,t);return}requestAnimationFrame(n=>{const l=n-r,a=o+(t-o)/Math.max(l,i)*l;F(e,a),a!==t&&ue(e,t,i-l,n)})}function ae(e,t,i=0){const r=arguments[3]===void 0?performance.now():arguments[3],o=N(e);if(i<=0){o!==t&&W(e,t);return}requestAnimationFrame(n=>{const l=n-r,a=o+(t-o)/Math.max(l,i)*l;W(e,a),a!==t&&ae(e,t,i-l,n)})}function F(e,t){if(e===window){window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,t);return}e.scrollTop=t}function W(e,t){if(e===window){window.scrollTo(t,window.pageYOffset||window.scrollY||document.body.scrollTop||0);return}e.scrollLeft=t}function Fe(e,t,i){if(i){ue(e,t,i);return}F(e,t)}function We(e,t,i){if(i){ae(e,t,i);return}W(e,t)}let q;function ke(){if(q!==void 0)return q;const e=document.createElement("p"),t=document.createElement("div");Q(e,{width:"100%",height:"200px"}),Q(t,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(e),document.body.appendChild(t);const i=e.offsetWidth;t.style.overflow="scroll";let r=e.offsetWidth;return i===r&&(r=t.clientWidth),t.remove(),q=i-r,q}function Se(e,t=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:t?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}let E=0,A,X,T,Y=!1,Z,G,J,g=null;function Le(e){qe(e)&&le(e)}function qe(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const t=me(e),i=e.shiftKey&&!e.deltaX,r=!i&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),o=i||r?e.deltaY:e.deltaX;for(let n=0;n<t.length;n++){const l=t[n];if(Se(l,r))return r?o<0&&l.scrollTop===0?!0:o>0&&l.scrollTop+l.clientHeight===l.scrollHeight:o<0&&l.scrollLeft===0?!0:o>0&&l.scrollLeft+l.clientWidth===l.scrollWidth}return!0}function ee(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function P(e){Y!==!0&&(Y=!0,requestAnimationFrame(()=>{Y=!1;const{height:t}=e.target,{clientHeight:i,scrollTop:r}=document.scrollingElement;(T===void 0||t!==window.innerHeight)&&(T=i-t,document.scrollingElement.scrollTop=r),r>T&&(document.scrollingElement.scrollTop-=Math.ceil((r-T)/8))}))}function te(e){const t=document.body,i=window.visualViewport!==void 0;if(e==="add"){const{overflowY:r,overflowX:o}=window.getComputedStyle(t);A=N(window),X=_(window),Z=t.style.left,G=t.style.top,J=window.location.href,t.style.left=`-${A}px`,t.style.top=`-${X}px`,o!=="hidden"&&(o==="scroll"||t.scrollWidth>window.innerWidth)&&t.classList.add("q-body--force-scrollbar-x"),r!=="hidden"&&(r==="scroll"||t.scrollHeight>window.innerHeight)&&t.classList.add("q-body--force-scrollbar-y"),t.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,h.is.ios===!0&&(i===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",P,w.passiveCapture),window.visualViewport.addEventListener("scroll",P,w.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",ee,w.passiveCapture))}h.is.desktop===!0&&h.is.mac===!0&&window[`${e}EventListener`]("wheel",Le,w.notPassive),e==="remove"&&(h.is.ios===!0&&(i===!0?(window.visualViewport.removeEventListener("resize",P,w.passiveCapture),window.visualViewport.removeEventListener("scroll",P,w.passiveCapture)):window.removeEventListener("scroll",ee,w.passiveCapture)),t.classList.remove("q-body--prevent-scroll"),t.classList.remove("q-body--force-scrollbar-x"),t.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,t.style.left=Z,t.style.top=G,window.location.href===J&&window.scrollTo(A,X),T=void 0)}function Pe(e){let t="add";if(e===!0){if(E++,g!==null){clearTimeout(g),g=null;return}if(E>1)return}else{if(E===0||(E--,E>0))return;if(t="remove",h.is.ios===!0&&h.is.nativeMobile===!0){g!==null&&clearTimeout(g),g=setTimeout(()=>{te(t),g=null},100);return}}te(t)}function _e(){let e;return{preventBodyScroll(t){t!==e&&(e!==void 0||t===!0)&&(e=t,Pe(t))}}}function Ne(){let e=null;const t=M();function i(){e!==null&&(clearTimeout(e),e=null)}return he(i),S(i),{removeTimeout:i,registerTimeout(r,o){i(),we(t)===!1&&(e=setTimeout(r,o))}}}const $={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},xe=Object.keys($);$.all=!0;function oe(e){const t={};for(const i of xe)e[i]===!0&&(t[i]=!0);return Object.keys(t).length===0?$:(t.horizontal===!0?t.left=t.right=!0:t.left===!0&&t.right===!0&&(t.horizontal=!0),t.vertical===!0?t.up=t.down=!0:t.up===!0&&t.down===!0&&(t.vertical=!0),t.horizontal===!0&&t.vertical===!0&&(t.all=!0),t)}const ze=["INPUT","TEXTAREA"];function ie(e,t){return t.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof t.handler=="function"&&ze.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(t.uid)===-1)}function Me(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),ge.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function R(e,t,i){const r=D(e);let o,n=r.left-t.event.x,l=r.top-t.event.y,a=Math.abs(n),u=Math.abs(l);const s=t.direction;s.horizontal===!0&&s.vertical!==!0?o=n<0?"left":"right":s.horizontal!==!0&&s.vertical===!0?o=l<0?"up":"down":s.up===!0&&l<0?(o="up",a>u&&(s.left===!0&&n<0?o="left":s.right===!0&&n>0&&(o="right"))):s.down===!0&&l>0?(o="down",a>u&&(s.left===!0&&n<0?o="left":s.right===!0&&n>0&&(o="right"))):s.left===!0&&n<0?(o="left",a<u&&(s.up===!0&&l<0?o="up":s.down===!0&&l>0&&(o="down"))):s.right===!0&&n>0&&(o="right",a<u&&(s.up===!0&&l<0?o="up":s.down===!0&&l>0&&(o="down")));let d=!1;if(o===void 0&&i===!1){if(t.event.isFirst===!0||t.event.lastDir===void 0)return{};o=t.event.lastDir,d=!0,o==="left"||o==="right"?(r.left-=n,a=0,n=0):(r.top-=l,u=0,l=0)}return{synthetic:d,payload:{evt:e,touch:t.event.mouse!==!0,mouse:t.event.mouse===!0,position:r,direction:o,isFirst:t.event.isFirst,isFinal:i===!0,duration:Date.now()-t.event.time,distance:{x:a,y:u},offset:{x:n,y:l},delta:{x:r.left-t.event.lastX,y:r.top-t.event.lastY}}}}let Ve=0;var $e=ye({name:"touch-pan",beforeMount(e,{value:t,modifiers:i}){if(i.mouse!==!0&&h.has.touch!==!0)return;function r(n,l){i.mouse===!0&&l===!0?le(n):(i.stop===!0&&H(n),i.prevent===!0&&I(n))}const o={uid:"qvtp_"+Ve++,handler:t,modifiers:i,direction:oe(i),noop:k,mouseStart(n){ie(n,o)&&be(n)&&(L(o,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),o.start(n,!0))},touchStart(n){if(ie(n,o)){const l=n.target;L(o,"temp",[[l,"touchmove","move","notPassiveCapture"],[l,"touchcancel","end","passiveCapture"],[l,"touchend","end","passiveCapture"]]),o.start(n)}},start(n,l){if(h.is.firefox===!0&&V(e,!0),o.lastEvt=n,l===!0||i.stop===!0){if(o.direction.all!==!0&&(l!==!0||o.modifiers.mouseAllDir!==!0&&o.modifiers.mousealldir!==!0)){const s=n.type.indexOf("mouse")>-1?new MouseEvent(n.type,n):new TouchEvent(n.type,n);n.defaultPrevented===!0&&I(s),n.cancelBubble===!0&&H(s),Object.assign(s,{qKeyEvent:n.qKeyEvent,qClickOutside:n.qClickOutside,qAnchorHandled:n.qAnchorHandled,qClonedBy:n.qClonedBy===void 0?[o.uid]:n.qClonedBy.concat(o.uid)}),o.initialEvent={target:n.target,event:s}}H(n)}const{left:a,top:u}=D(n);o.event={x:a,y:u,time:Date.now(),mouse:l===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:a,lastY:u}},move(n){if(o.event===void 0)return;const l=D(n),a=l.left-o.event.x,u=l.top-o.event.y;if(a===0&&u===0)return;o.lastEvt=n;const s=o.event.mouse===!0,d=()=>{r(n,s);let f;i.preserveCursor!==!0&&i.preservecursor!==!0&&(f=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),s===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Me(),o.styleCleanup=m=>{if(o.styleCleanup=void 0,f!==void 0&&(document.documentElement.style.cursor=f),document.body.classList.remove("non-selectable"),s===!0){const b=()=>{document.body.classList.remove("no-pointer-events--children")};m!==void 0?setTimeout(()=>{b(),m()},50):b()}else m!==void 0&&m()}};if(o.event.detected===!0){o.event.isFirst!==!0&&r(n,o.event.mouse);const{payload:f,synthetic:m}=R(n,o,!1);f!==void 0&&(o.handler(f)===!1?o.end(n):(o.styleCleanup===void 0&&o.event.isFirst===!0&&d(),o.event.lastX=f.position.left,o.event.lastY=f.position.top,o.event.lastDir=m===!0?void 0:f.direction,o.event.isFirst=!1));return}if(o.direction.all===!0||s===!0&&(o.modifiers.mouseAllDir===!0||o.modifiers.mousealldir===!0)){d(),o.event.detected=!0,o.move(n);return}const v=Math.abs(a),p=Math.abs(u);v!==p&&(o.direction.horizontal===!0&&v>p||o.direction.vertical===!0&&v<p||o.direction.up===!0&&v<p&&u<0||o.direction.down===!0&&v<p&&u>0||o.direction.left===!0&&v>p&&a<0||o.direction.right===!0&&v>p&&a>0?(o.event.detected=!0,o.move(n)):o.end(n,!0))},end(n,l){if(o.event!==void 0){if(O(o,"temp"),h.is.firefox===!0&&V(e,!1),l===!0)o.styleCleanup!==void 0&&o.styleCleanup(),o.event.detected!==!0&&o.initialEvent!==void 0&&o.initialEvent.target.dispatchEvent(o.initialEvent.event);else if(o.event.detected===!0){o.event.isFirst===!0&&o.handler(R(n===void 0?o.lastEvt:n,o).payload);const{payload:a}=R(n===void 0?o.lastEvt:n,o,!0),u=()=>{o.handler(a)};o.styleCleanup!==void 0?o.styleCleanup(u):u()}o.event=void 0,o.initialEvent=void 0,o.lastEvt=void 0}}};if(e.__qtouchpan=o,i.mouse===!0){const n=i.mouseCapture===!0||i.mousecapture===!0?"Capture":"";L(o,"main",[[e,"mousedown","mouseStart",`passive${n}`]])}h.has.touch===!0&&L(o,"main",[[e,"touchstart","touchStart",`passive${i.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,t){const i=e.__qtouchpan;i!==void 0&&(t.oldValue!==t.value&&(typeof value!="function"&&i.end(),i.handler=t.value),i.direction=oe(t.modifiers))},beforeUnmount(e){const t=e.__qtouchpan;t!==void 0&&(t.event!==void 0&&t.end(),O(t,"main"),O(t,"temp"),h.is.firefox===!0&&V(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(),delete e.__qtouchpan)}});function Ue(e,t,i){return i<=t?t:Math.min(i,Math.max(t,e))}const{passive:ne}=w,He=["both","horizontal","vertical"];var je=re({name:"QScrollObserver",props:{axis:{type:String,validator:e=>He.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:t}){const i={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let r=null,o,n;z(()=>e.scrollTarget,()=>{u(),a()});function l(){r!==null&&r();const v=Math.max(0,_(o)),p=N(o),f={top:v-i.position.top,left:p-i.position.left};if(e.axis==="vertical"&&f.top===0||e.axis==="horizontal"&&f.left===0)return;const m=Math.abs(f.top)>=Math.abs(f.left)?f.top<0?"up":"down":f.left<0?"left":"right";i.position={top:v,left:p},i.directionChanged=i.direction!==m,i.delta=f,i.directionChanged===!0&&(i.direction=m,i.inflectionPoint=i.position),t("scroll",{...i})}function a(){o=Ce(n,e.scrollTarget),o.addEventListener("scroll",s,ne),s(!0)}function u(){o!==void 0&&(o.removeEventListener("scroll",s,ne),o=void 0)}function s(v){if(v===!0||e.debounce===0||e.debounce==="0")l();else if(r===null){const[p,f]=e.debounce?[setTimeout(l,e.debounce),clearTimeout]:[requestAnimationFrame(l),cancelAnimationFrame];r=()=>{f(p),r=null}}}const{proxy:d}=M();return z(()=>d.$q.lang.rtl,l),C(()=>{n=d.$el.parentNode,a()}),S(()=>{r!==null&&r(),u()}),Object.assign(d,{trigger:s,getPosition:()=>i}),k}});export{Ae as Q,$e as T,Re as a,Ne as b,De as c,Xe as d,Ue as e,_e as f,ke as g,je as h,Me as i,Ce as j,We as k,Fe as s,Ye as u};
//# sourceMappingURL=QScrollObserver.ec2bc8ee.js.map