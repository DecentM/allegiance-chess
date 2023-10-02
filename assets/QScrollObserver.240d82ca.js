import{r as K,y as Z,p as w,c as U,o as C,T as D,q as T,h as G,j as z,m as O,w as S,U as J,V as ee,W as Y,X as te,Y as oe,Z as ne,$ as ie,k as b,a0 as re,a1 as y,a2 as q,a3 as F,a4 as x,a5 as P,a6 as L,s as se}from"./index.7b68fa66.js";function le(){const t=K(!Z.value);return t.value===!1&&w(()=>{t.value=!0}),t}const B=typeof ResizeObserver!="undefined",N=B===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var he=U({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(t,{emit:o}){let n=null,l,e={width:-1,height:-1};function i(u){u===!0||t.debounce===0||t.debounce==="0"?r():n===null&&(n=setTimeout(r,t.debounce))}function r(){if(n!==null&&(clearTimeout(n),n=null),l){const{offsetWidth:u,offsetHeight:s}=l;(u!==e.width||s!==e.height)&&(e={width:u,height:s},o("resize",e))}}const{proxy:a}=z();if(B===!0){let u;const s=d=>{l=a.$el.parentNode,l?(u=new ResizeObserver(i),u.observe(l),r()):d!==!0&&T(()=>{s(!0)})};return w(()=>{s()}),C(()=>{n!==null&&clearTimeout(n),u!==void 0&&(u.disconnect!==void 0?u.disconnect():l&&u.unobserve(l))}),D}else{let d=function(){n!==null&&(clearTimeout(n),n=null),s!==void 0&&(s.removeEventListener!==void 0&&s.removeEventListener("resize",i,O.passive),s=void 0)},p=function(){d(),l&&l.contentDocument&&(s=l.contentDocument.defaultView,s.addEventListener("resize",i,O.passive),r())};const u=le();let s;return w(()=>{T(()=>{l=a.$el,l&&p()})}),C(d),a.trigger=i,()=>{if(u.value===!0)return G("object",{style:N.style,tabindex:-1,type:"text/html",data:N.url,"aria-hidden":"true",onLoad:p})}}}});const ge={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},be=["beforeShow","show","beforeHide","hide"];function we({showing:t,canShow:o,hideOnRouteChange:n,handleShow:l,handleHide:e,processOnMount:i}){const r=z(),{props:a,emit:u,proxy:s}=r;let d;function p(c){t.value===!0?v(c):m(c)}function m(c){if(a.disable===!0||c!==void 0&&c.qAnchorHandled===!0||o!==void 0&&o(c)!==!0)return;const h=a["onUpdate:modelValue"]!==void 0;h===!0&&(u("update:modelValue",!0),d=c,T(()=>{d===c&&(d=void 0)})),(a.modelValue===null||h===!1)&&f(c)}function f(c){t.value!==!0&&(t.value=!0,u("beforeShow",c),l!==void 0?l(c):u("show",c))}function v(c){if(a.disable===!0)return;const h=a["onUpdate:modelValue"]!==void 0;h===!0&&(u("update:modelValue",!1),d=c,T(()=>{d===c&&(d=void 0)})),(a.modelValue===null||h===!1)&&g(c)}function g(c){t.value!==!1&&(t.value=!1,u("beforeHide",c),e!==void 0?e(c):u("hide",c))}function R(c){a.disable===!0&&c===!0?a["onUpdate:modelValue"]!==void 0&&u("update:modelValue",!1):c===!0!==t.value&&(c===!0?f:g)(d)}S(()=>a.modelValue,R),n!==void 0&&J(r)===!0&&S(()=>s.$route.fullPath,()=>{n.value===!0&&t.value===!0&&v()}),i===!0&&w(()=>{R(a.modelValue)});const X={show:m,hide:v,toggle:p};return Object.assign(s,X),X}const ue=[null,document,document.body,document.scrollingElement,document.documentElement];function ae(t,o){let n=ee(o);if(n===void 0){if(t==null)return window;n=t.closest(".scroll,.scroll-y,.overflow-auto")}return ue.includes(n)?window:n}function W(t){return t===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:t.scrollTop}function $(t){return t===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:t.scrollLeft}function Q(t,o,n=0){const l=arguments[3]===void 0?performance.now():arguments[3],e=W(t);if(n<=0){e!==o&&V(t,o);return}requestAnimationFrame(i=>{const r=i-l,a=e+(o-e)/Math.max(r,n)*r;V(t,a),a!==o&&Q(t,o,n-r,i)})}function I(t,o,n=0){const l=arguments[3]===void 0?performance.now():arguments[3],e=$(t);if(n<=0){e!==o&&A(t,o);return}requestAnimationFrame(i=>{const r=i-l,a=e+(o-e)/Math.max(r,n)*r;A(t,a),a!==o&&I(t,o,n-r,i)})}function V(t,o){if(t===window){window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,o);return}t.scrollTop=o}function A(t,o){if(t===window){window.scrollTo(o,window.pageYOffset||window.scrollY||document.body.scrollTop||0);return}t.scrollLeft=o}function ye(t,o,n){if(n){Q(t,o,n);return}V(t,o)}function Ee(t,o,n){if(n){I(t,o,n);return}A(t,o)}let E;function Ce(){if(E!==void 0)return E;const t=document.createElement("p"),o=document.createElement("div");Y(t,{width:"100%",height:"200px"}),Y(o,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),o.appendChild(t),document.body.appendChild(o);const n=t.offsetWidth;o.style.overflow="scroll";let l=t.offsetWidth;return n===l&&(l=o.clientWidth),o.remove(),E=n-l,E}function Te(t,o=!0){return!t||t.nodeType!==Node.ELEMENT_NODE?!1:o?t.scrollHeight>t.clientHeight&&(t.classList.contains("scroll")||t.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(t)["overflow-y"])):t.scrollWidth>t.clientWidth&&(t.classList.contains("scroll")||t.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(t)["overflow-x"]))}function Se(){let t=null;const o=z();function n(){t!==null&&(clearTimeout(t),t=null)}return te(n),C(n),{removeTimeout:n,registerTimeout(l,e){n(),oe(o)===!1&&(t=setTimeout(l,e))}}}const H={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},ce=Object.keys(H);H.all=!0;function k(t){const o={};for(const n of ce)t[n]===!0&&(o[n]=!0);return Object.keys(o).length===0?H:(o.horizontal===!0?o.left=o.right=!0:o.left===!0&&o.right===!0&&(o.horizontal=!0),o.vertical===!0?o.up=o.down=!0:o.up===!0&&o.down===!0&&(o.vertical=!0),o.horizontal===!0&&o.vertical===!0&&(o.all=!0),o)}const de=["INPUT","TEXTAREA"];function _(t,o){return o.event===void 0&&t.target!==void 0&&t.target.draggable!==!0&&typeof o.handler=="function"&&de.includes(t.target.nodeName.toUpperCase())===!1&&(t.qClonedBy===void 0||t.qClonedBy.indexOf(o.uid)===-1)}function fe(){if(window.getSelection!==void 0){const t=window.getSelection();t.empty!==void 0?t.empty():t.removeAllRanges!==void 0&&(t.removeAllRanges(),ne.is.mobile!==!0&&t.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function M(t,o,n){const l=P(t);let e,i=l.left-o.event.x,r=l.top-o.event.y,a=Math.abs(i),u=Math.abs(r);const s=o.direction;s.horizontal===!0&&s.vertical!==!0?e=i<0?"left":"right":s.horizontal!==!0&&s.vertical===!0?e=r<0?"up":"down":s.up===!0&&r<0?(e="up",a>u&&(s.left===!0&&i<0?e="left":s.right===!0&&i>0&&(e="right"))):s.down===!0&&r>0?(e="down",a>u&&(s.left===!0&&i<0?e="left":s.right===!0&&i>0&&(e="right"))):s.left===!0&&i<0?(e="left",a<u&&(s.up===!0&&r<0?e="up":s.down===!0&&r>0&&(e="down"))):s.right===!0&&i>0&&(e="right",a<u&&(s.up===!0&&r<0?e="up":s.down===!0&&r>0&&(e="down")));let d=!1;if(e===void 0&&n===!1){if(o.event.isFirst===!0||o.event.lastDir===void 0)return{};e=o.event.lastDir,d=!0,e==="left"||e==="right"?(l.left-=i,a=0,i=0):(l.top-=r,u=0,r=0)}return{synthetic:d,payload:{evt:t,touch:o.event.mouse!==!0,mouse:o.event.mouse===!0,position:l,direction:e,isFirst:o.event.isFirst,isFinal:n===!0,duration:Date.now()-o.event.time,distance:{x:a,y:u},offset:{x:i,y:r},delta:{x:l.left-o.event.lastX,y:l.top-o.event.lastY}}}}let pe=0;var ze=ie({name:"touch-pan",beforeMount(t,{value:o,modifiers:n}){if(n.mouse!==!0&&b.has.touch!==!0)return;function l(i,r){n.mouse===!0&&r===!0?se(i):(n.stop===!0&&x(i),n.prevent===!0&&F(i))}const e={uid:"qvtp_"+pe++,handler:o,modifiers:n,direction:k(n),noop:D,mouseStart(i){_(i,e)&&re(i)&&(y(e,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),e.start(i,!0))},touchStart(i){if(_(i,e)){const r=i.target;y(e,"temp",[[r,"touchmove","move","notPassiveCapture"],[r,"touchcancel","end","passiveCapture"],[r,"touchend","end","passiveCapture"]]),e.start(i)}},start(i,r){if(b.is.firefox===!0&&q(t,!0),e.lastEvt=i,r===!0||n.stop===!0){if(e.direction.all!==!0&&(r!==!0||e.modifiers.mouseAllDir!==!0&&e.modifiers.mousealldir!==!0)){const s=i.type.indexOf("mouse")>-1?new MouseEvent(i.type,i):new TouchEvent(i.type,i);i.defaultPrevented===!0&&F(s),i.cancelBubble===!0&&x(s),Object.assign(s,{qKeyEvent:i.qKeyEvent,qClickOutside:i.qClickOutside,qAnchorHandled:i.qAnchorHandled,qClonedBy:i.qClonedBy===void 0?[e.uid]:i.qClonedBy.concat(e.uid)}),e.initialEvent={target:i.target,event:s}}x(i)}const{left:a,top:u}=P(i);e.event={x:a,y:u,time:Date.now(),mouse:r===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:a,lastY:u}},move(i){if(e.event===void 0)return;const r=P(i),a=r.left-e.event.x,u=r.top-e.event.y;if(a===0&&u===0)return;e.lastEvt=i;const s=e.event.mouse===!0,d=()=>{l(i,s);let f;n.preserveCursor!==!0&&n.preservecursor!==!0&&(f=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),s===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),fe(),e.styleCleanup=v=>{if(e.styleCleanup=void 0,f!==void 0&&(document.documentElement.style.cursor=f),document.body.classList.remove("non-selectable"),s===!0){const g=()=>{document.body.classList.remove("no-pointer-events--children")};v!==void 0?setTimeout(()=>{g(),v()},50):g()}else v!==void 0&&v()}};if(e.event.detected===!0){e.event.isFirst!==!0&&l(i,e.event.mouse);const{payload:f,synthetic:v}=M(i,e,!1);f!==void 0&&(e.handler(f)===!1?e.end(i):(e.styleCleanup===void 0&&e.event.isFirst===!0&&d(),e.event.lastX=f.position.left,e.event.lastY=f.position.top,e.event.lastDir=v===!0?void 0:f.direction,e.event.isFirst=!1));return}if(e.direction.all===!0||s===!0&&(e.modifiers.mouseAllDir===!0||e.modifiers.mousealldir===!0)){d(),e.event.detected=!0,e.move(i);return}const p=Math.abs(a),m=Math.abs(u);p!==m&&(e.direction.horizontal===!0&&p>m||e.direction.vertical===!0&&p<m||e.direction.up===!0&&p<m&&u<0||e.direction.down===!0&&p<m&&u>0||e.direction.left===!0&&p>m&&a<0||e.direction.right===!0&&p>m&&a>0?(e.event.detected=!0,e.move(i)):e.end(i,!0))},end(i,r){if(e.event!==void 0){if(L(e,"temp"),b.is.firefox===!0&&q(t,!1),r===!0)e.styleCleanup!==void 0&&e.styleCleanup(),e.event.detected!==!0&&e.initialEvent!==void 0&&e.initialEvent.target.dispatchEvent(e.initialEvent.event);else if(e.event.detected===!0){e.event.isFirst===!0&&e.handler(M(i===void 0?e.lastEvt:i,e).payload);const{payload:a}=M(i===void 0?e.lastEvt:i,e,!0),u=()=>{e.handler(a)};e.styleCleanup!==void 0?e.styleCleanup(u):u()}e.event=void 0,e.initialEvent=void 0,e.lastEvt=void 0}}};if(t.__qtouchpan=e,n.mouse===!0){const i=n.mouseCapture===!0||n.mousecapture===!0?"Capture":"";y(e,"main",[[t,"mousedown","mouseStart",`passive${i}`]])}b.has.touch===!0&&y(e,"main",[[t,"touchstart","touchStart",`passive${n.capture===!0?"Capture":""}`],[t,"touchmove","noop","notPassiveCapture"]])},updated(t,o){const n=t.__qtouchpan;n!==void 0&&(o.oldValue!==o.value&&(typeof value!="function"&&n.end(),n.handler=o.value),n.direction=k(o.modifiers))},beforeUnmount(t){const o=t.__qtouchpan;o!==void 0&&(o.event!==void 0&&o.end(),L(o,"main"),L(o,"temp"),b.is.firefox===!0&&q(t,!1),o.styleCleanup!==void 0&&o.styleCleanup(),delete t.__qtouchpan)}});function qe(t,o,n){return n<=o?o:Math.min(n,Math.max(o,t))}const{passive:j}=O,me=["both","horizontal","vertical"];var xe=U({name:"QScrollObserver",props:{axis:{type:String,validator:t=>me.includes(t),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(t,{emit:o}){const n={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let l=null,e,i;S(()=>t.scrollTarget,()=>{u(),a()});function r(){l!==null&&l();const p=Math.max(0,W(e)),m=$(e),f={top:p-n.position.top,left:m-n.position.left};if(t.axis==="vertical"&&f.top===0||t.axis==="horizontal"&&f.left===0)return;const v=Math.abs(f.top)>=Math.abs(f.left)?f.top<0?"up":"down":f.left<0?"left":"right";n.position={top:p,left:m},n.directionChanged=n.direction!==v,n.delta=f,n.directionChanged===!0&&(n.direction=v,n.inflectionPoint=n.position),o("scroll",{...n})}function a(){e=ae(i,t.scrollTarget),e.addEventListener("scroll",s,j),s(!0)}function u(){e!==void 0&&(e.removeEventListener("scroll",s,j),e=void 0)}function s(p){if(p===!0||t.debounce===0||t.debounce==="0")r();else if(l===null){const[m,f]=t.debounce?[setTimeout(r,t.debounce),clearTimeout]:[requestAnimationFrame(r),cancelAnimationFrame];l=()=>{f(m),l=null}}}const{proxy:d}=z();return S(()=>d.$q.lang.rtl,r),w(()=>{i=d.$el.parentNode,a()}),C(()=>{l!==null&&l(),u()}),Object.assign(d,{trigger:s,getPosition:()=>n}),D}});export{he as Q,ze as T,W as a,be as b,Se as c,we as d,qe as e,Ce as f,$ as g,Te as h,xe as i,fe as j,ae as k,Ee as l,ye as s,ge as u};
//# sourceMappingURL=QScrollObserver.240d82ca.js.map
