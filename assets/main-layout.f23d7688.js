import{c as F,a,h as m,e as I,i as E,f as S,r as k,w,o as ke,g as Xe,j as M,l as U,k as Ge,n as pe,m as Je,p as we,q as ve,Q as Ye,s as Be,t as Ze,u as he,v as Le,x as et,y as Z,z as tt,A as Pe,B as j,C as G,D as L,E as at,F as lt,G as P,H as de,I as ze,J as nt,_ as ot,K as it,L as rt,M as O,N as xe,O as ue}from"./index.f0813b89.js";import{Q as fe,u as Qe,a as Te,b as ut,c as Oe,d as st,T as se,e as ee,f as ct,g as ce,h as dt}from"./QScrollObserver.d9ac380a.js";import{u as ft,a as vt}from"./use-dark.f0e8cb2d.js";import{u as ht}from"./uid.a41eb200.js";import{u as mt}from"./use-quasar.a8439e22.js";import{Q as bt,a as _e,b as gt}from"./QList.33d537d5.js";var qe=F({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:s}){const i=a(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>m("div",{class:i.value},I(s.default))}}),$e=F({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:s}){const i=a(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>m("div",{class:i.value,role:"toolbar"},I(s.default))}}),yt=F({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:s,emit:i}){const{proxy:{$q:n}}=M(),r=E(U,S);if(r===S)return console.error("QHeader needs to be child of QLayout"),S;const u=k(parseInt(e.heightHint,10)),g=k(!0),h=a(()=>e.reveal===!0||r.view.value.indexOf("H")>-1||n.platform.is.ios&&r.isContainer.value===!0),B=a(()=>{if(e.modelValue!==!0)return 0;if(h.value===!0)return g.value===!0?u.value:0;const o=u.value-r.scroll.value.position;return o>0?o:0}),q=a(()=>e.modelValue!==!0||h.value===!0&&g.value!==!0),l=a(()=>e.modelValue===!0&&q.value===!0&&e.reveal===!0),y=a(()=>"q-header q-layout__section--marginal "+(h.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(q.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),x=a(()=>{const o=r.rows.value.top,C={};return o[0]==="l"&&r.left.space===!0&&(C[n.lang.rtl===!0?"right":"left"]=`${r.left.size}px`),o[2]==="r"&&r.right.space===!0&&(C[n.lang.rtl===!0?"left":"right"]=`${r.right.size}px`),C});function b(o,C){r.update("header",o,C)}function f(o,C){o.value!==C&&(o.value=C)}function $({height:o}){f(u,o),b("size",o)}function _(o){l.value===!0&&f(g,!0),i("focusin",o)}w(()=>e.modelValue,o=>{b("space",o),f(g,!0),r.animate()}),w(B,o=>{b("offset",o)}),w(()=>e.reveal,o=>{o===!1&&f(g,e.modelValue)}),w(g,o=>{r.animate(),i("reveal",o)}),w(r.scroll,o=>{e.reveal===!0&&f(g,o.direction==="up"||o.position<=e.revealOffset||o.position-o.inflectionPoint<100)});const v={};return r.instances.header=v,e.modelValue===!0&&b("size",u.value),b("space",e.modelValue),b("offset",B.value),ke(()=>{r.instances.header===v&&(r.instances.header=void 0,b("size",0),b("offset",0),b("space",!1))}),()=>{const o=Xe(s.default,[]);return e.elevated===!0&&o.push(m("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),o.push(m(fe,{debounce:0,onResize:$})),m("header",{class:y.value,style:x.value,onFocusin:_},o)}}});const Se=150;var pt=F({name:"QDrawer",inheritAttrs:!1,props:{...Qe,...ft,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...Te,"onLayout","miniState"],setup(e,{slots:s,emit:i,attrs:n}){const r=M(),{proxy:{$q:u}}=r,g=vt(e,u),{preventBodyScroll:h}=ct(),{registerTimeout:B,removeTimeout:q}=ut(),l=E(U,S);if(l===S)return console.error("QDrawer needs to be child of QLayout"),S;let y,x=null,b;const f=k(e.behavior==="mobile"||e.behavior!=="desktop"&&l.totalWidth.value<=e.breakpoint),$=a(()=>e.mini===!0&&f.value!==!0),_=a(()=>$.value===!0?e.miniWidth:e.width),v=k(e.showIfAbove===!0&&f.value===!1?!0:e.modelValue===!0),o=a(()=>e.persistent!==!0&&(f.value===!0||He.value===!0));function C(t,d){if(V(),t!==!1&&l.animate(),T(0),f.value===!0){const z=l.instances[J.value];z!==void 0&&z.belowBreakpoint===!0&&z.hide(!1),A(1),l.isContainer.value!==!0&&h(!0)}else A(0),t!==!1&&oe(!1);B(()=>{t!==!1&&oe(!0),d!==!0&&i("show",t)},Se)}function c(t,d){K(),t!==!1&&l.animate(),A(0),T(D.value*_.value),ie(),d!==!0?B(()=>{i("hide",t)},Se):q()}const{show:p,hide:Q}=Oe({showing:v,hideOnRouteChange:o,handleShow:C,handleHide:c}),{addToHistory:V,removeFromHistory:K}=st(v,Q,o),W={belowBreakpoint:f,hide:Q},H=a(()=>e.side==="right"),D=a(()=>(u.lang.rtl===!0?-1:1)*(H.value===!0?1:-1)),me=k(0),N=k(!1),te=k(!1),be=k(_.value*D.value),J=a(()=>H.value===!0?"left":"right"),ae=a(()=>v.value===!0&&f.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:_.value:0),le=a(()=>e.overlay===!0||e.miniToOverlay===!0||l.view.value.indexOf(H.value?"R":"L")>-1||u.platform.is.ios===!0&&l.isContainer.value===!0),X=a(()=>e.overlay===!1&&v.value===!0&&f.value===!1),He=a(()=>e.overlay===!0&&v.value===!0&&f.value===!1),Fe=a(()=>"fullscreen q-drawer__backdrop"+(v.value===!1&&N.value===!1?" hidden":"")),Ae=a(()=>({backgroundColor:`rgba(0,0,0,${me.value*.4})`})),ge=a(()=>H.value===!0?l.rows.value.top[2]==="r":l.rows.value.top[0]==="l"),Re=a(()=>H.value===!0?l.rows.value.bottom[2]==="r":l.rows.value.bottom[0]==="l"),Ve=a(()=>{const t={};return l.header.space===!0&&ge.value===!1&&(le.value===!0?t.top=`${l.header.offset}px`:l.header.space===!0&&(t.top=`${l.header.size}px`)),l.footer.space===!0&&Re.value===!1&&(le.value===!0?t.bottom=`${l.footer.offset}px`:l.footer.space===!0&&(t.bottom=`${l.footer.size}px`)),t}),We=a(()=>{const t={width:`${_.value}px`,transform:`translateX(${be.value}px)`};return f.value===!0?t:Object.assign(t,Ve.value)}),Ie=a(()=>"q-drawer__content fit "+(l.isContainer.value!==!0?"scroll":"overflow-auto")),Me=a(()=>`q-drawer q-drawer--${e.side}`+(te.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(g.value===!0?" q-drawer--dark q-dark":"")+(N.value===!0?" no-transition":v.value===!0?"":" q-layout--prevent-focus")+(f.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${$.value===!0?"mini":"standard"}`+(le.value===!0||X.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(ge.value===!0?" q-drawer--top-padding":""))),De=a(()=>{const t=u.lang.rtl===!0?e.side:J.value;return[[se,Ue,void 0,{[t]:!0,mouse:!0}]]}),Ne=a(()=>{const t=u.lang.rtl===!0?J.value:e.side;return[[se,ye,void 0,{[t]:!0,mouse:!0}]]}),je=a(()=>{const t=u.lang.rtl===!0?J.value:e.side;return[[se,ye,void 0,{[t]:!0,mouse:!0,mouseAllDir:!0}]]});function ne(){Ke(f,e.behavior==="mobile"||e.behavior!=="desktop"&&l.totalWidth.value<=e.breakpoint)}w(f,t=>{t===!0?(y=v.value,v.value===!0&&Q(!1)):e.overlay===!1&&e.behavior!=="mobile"&&y!==!1&&(v.value===!0?(T(0),A(0),ie()):p(!1))}),w(()=>e.side,(t,d)=>{l.instances[d]===W&&(l.instances[d]=void 0,l[d].space=!1,l[d].offset=0),l.instances[t]=W,l[t].size=_.value,l[t].space=X.value,l[t].offset=ae.value}),w(l.totalWidth,()=>{(l.isContainer.value===!0||document.qScrollPrevented!==!0)&&ne()}),w(()=>e.behavior+e.breakpoint,ne),w(l.isContainer,t=>{v.value===!0&&h(t!==!0),t===!0&&ne()}),w(l.scrollbarWidth,()=>{T(v.value===!0?0:void 0)}),w(ae,t=>{R("offset",t)}),w(X,t=>{i("onLayout",t),R("space",t)}),w(H,()=>{T()}),w(_,t=>{T(),re(e.miniToOverlay,t)}),w(()=>e.miniToOverlay,t=>{re(t,_.value)}),w(()=>u.lang.rtl,()=>{T()}),w(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(Ee(),l.animate())}),w($,t=>{i("miniState",t)});function T(t){t===void 0?pe(()=>{t=v.value===!0?0:_.value,T(D.value*t)}):(l.isContainer.value===!0&&H.value===!0&&(f.value===!0||Math.abs(t)===_.value)&&(t+=D.value*l.scrollbarWidth.value),be.value=t)}function A(t){me.value=t}function oe(t){const d=t===!0?"remove":l.isContainer.value!==!0?"add":"";d!==""&&document.body.classList[d]("q-body--drawer-toggle")}function Ee(){x!==null&&clearTimeout(x),r.proxy&&r.proxy.$el&&r.proxy.$el.classList.add("q-drawer--mini-animate"),te.value=!0,x=setTimeout(()=>{x=null,te.value=!1,r&&r.proxy&&r.proxy.$el&&r.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function Ue(t){if(v.value!==!1)return;const d=_.value,z=ee(t.distance.x,0,d);if(t.isFinal===!0){z>=Math.min(75,d)===!0?p():(l.animate(),A(0),T(D.value*d)),N.value=!1;return}T((u.lang.rtl===!0?H.value!==!0:H.value)?Math.max(d-z,0):Math.min(0,z-d)),A(ee(z/d,0,1)),t.isFirst===!0&&(N.value=!0)}function ye(t){if(v.value!==!0)return;const d=_.value,z=t.direction===e.side,Y=(u.lang.rtl===!0?z!==!0:z)?ee(t.distance.x,0,d):0;if(t.isFinal===!0){Math.abs(Y)<Math.min(75,d)===!0?(l.animate(),A(1),T(0)):Q(),N.value=!1;return}T(D.value*Y),A(ee(1-Y/d,0,1)),t.isFirst===!0&&(N.value=!0)}function ie(){h(!1),oe(!0)}function R(t,d){l.update(e.side,t,d)}function Ke(t,d){t.value!==d&&(t.value=d)}function re(t,d){R("size",t===!0?e.miniWidth:d)}return l.instances[e.side]=W,re(e.miniToOverlay,_.value),R("space",X.value),R("offset",ae.value),e.showIfAbove===!0&&e.modelValue!==!0&&v.value===!0&&e["onUpdate:modelValue"]!==void 0&&i("update:modelValue",!0),Ge(()=>{i("onLayout",X.value),i("miniState",$.value),y=e.showIfAbove===!0;const t=()=>{(v.value===!0?C:c)(!1,!0)};if(l.totalWidth.value!==0){pe(t);return}b=w(l.totalWidth,()=>{b(),b=void 0,v.value===!1&&e.showIfAbove===!0&&f.value===!1?p(!1):t()})}),ke(()=>{b!==void 0&&b(),x!==null&&(clearTimeout(x),x=null),v.value===!0&&ie(),l.instances[e.side]===W&&(l.instances[e.side]=void 0,R("size",0),R("offset",0),R("space",!1))}),()=>{const t=[];f.value===!0&&(e.noSwipeOpen===!1&&t.push(Je(m("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),De.value)),t.push(we("div",{ref:"backdrop",class:Fe.value,style:Ae.value,"aria-hidden":"true",onClick:Q},void 0,"backdrop",e.noSwipeBackdrop!==!0&&v.value===!0,()=>je.value)));const d=$.value===!0&&s.mini!==void 0,z=[m("div",{...n,key:""+d,class:[Ie.value,n.class]},d===!0?s.mini():I(s.default))];return e.elevated===!0&&v.value===!0&&z.push(m("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),t.push(we("aside",{ref:"content",class:Me.value,style:We.value},z,"contentclose",e.noSwipeClose!==!0&&f.value===!0,()=>Ne.value)),m("div",{class:"q-drawer-container"},t)}}});const wt={position:{type:String,default:"bottom-right",validator:e=>["top-right","top-left","bottom-right","bottom-left","top","right","bottom","left"].includes(e)},offset:{type:Array,validator:e=>e.length===2},expand:Boolean};function xt(){const{props:e,proxy:{$q:s}}=M(),i=E(U,S);if(i===S)return console.error("QPageSticky needs to be child of QLayout"),S;const n=a(()=>{const y=e.position;return{top:y.indexOf("top")>-1,right:y.indexOf("right")>-1,bottom:y.indexOf("bottom")>-1,left:y.indexOf("left")>-1,vertical:y==="top"||y==="bottom",horizontal:y==="left"||y==="right"}}),r=a(()=>i.header.offset),u=a(()=>i.right.offset),g=a(()=>i.footer.offset),h=a(()=>i.left.offset),B=a(()=>{let y=0,x=0;const b=n.value,f=s.lang.rtl===!0?-1:1;b.top===!0&&r.value!==0?x=`${r.value}px`:b.bottom===!0&&g.value!==0&&(x=`${-g.value}px`),b.left===!0&&h.value!==0?y=`${f*h.value}px`:b.right===!0&&u.value!==0&&(y=`${-f*u.value}px`);const $={transform:`translate(${y}, ${x})`};return e.offset&&($.margin=`${e.offset[1]}px ${e.offset[0]}px`),b.vertical===!0?(h.value!==0&&($[s.lang.rtl===!0?"right":"left"]=`${h.value}px`),u.value!==0&&($[s.lang.rtl===!0?"left":"right"]=`${u.value}px`)):b.horizontal===!0&&(r.value!==0&&($.top=`${r.value}px`),g.value!==0&&($.bottom=`${g.value}px`)),$}),q=a(()=>`q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${e.expand===!0?"expand":"shrink"}`);function l(y){const x=I(y.default);return m("div",{class:q.value,style:B.value},e.expand===!0?x:[m("div",x)])}return{$layout:i,getStickyContent:l}}var Ce=F({name:"QPageSticky",props:wt,setup(e,{slots:s}){const{getStickyContent:i}=xt();return()=>i(s)}});const _t=["top","right","bottom","left"],qt={type:{type:String,default:"a"},outline:Boolean,push:Boolean,flat:Boolean,unelevated:Boolean,color:String,textColor:String,glossy:Boolean,square:Boolean,padding:String,label:{type:[String,Number],default:""},labelPosition:{type:String,default:"right",validator:e=>_t.includes(e)},externalLabel:Boolean,hideLabel:{type:Boolean},labelClass:[Array,String,Object],labelStyle:[Array,String,Object],disable:Boolean,tabindex:[Number,String]};function $t(e,s){return{formClass:a(()=>`q-fab--form-${e.square===!0?"square":"rounded"}`),stacked:a(()=>e.externalLabel===!1&&["top","bottom"].includes(e.labelPosition)),labelProps:a(()=>{if(e.externalLabel===!0){const i=e.hideLabel===null?s.value===!1:e.hideLabel;return{action:"push",data:{class:[e.labelClass,`q-fab__label q-tooltip--style q-fab__label--external q-fab__label--external-${e.labelPosition}`+(i===!0?" q-fab__label--external-hidden":"")],style:e.labelStyle}}}return{action:["left","top"].includes(e.labelPosition)?"unshift":"push",data:{class:[e.labelClass,`q-fab__label q-fab__label--internal q-fab__label--internal-${e.labelPosition}`+(e.hideLabel===!0?" q-fab__label--internal-hidden":"")],style:e.labelStyle}}})}}const St=["up","right","down","left"],Ct=["left","center","right"];var kt=F({name:"QFab",props:{...qt,...Qe,icon:String,activeIcon:String,hideIcon:Boolean,hideLabel:{default:null},direction:{type:String,default:"right",validator:e=>St.includes(e)},persistent:Boolean,verticalActionsAlign:{type:String,default:"center",validator:e=>Ct.includes(e)}},emits:Te,setup(e,{slots:s}){const i=k(null),n=k(e.modelValue===!0),r=ht(),{proxy:{$q:u}}=M(),{formClass:g,labelProps:h}=$t(e,n),B=a(()=>e.persistent!==!0),{hide:q,toggle:l}=Oe({showing:n,hideOnRouteChange:B}),y=a(()=>({opened:n.value})),x=a(()=>`q-fab z-fab row inline justify-center q-fab--align-${e.verticalActionsAlign} ${g.value}`+(n.value===!0?" q-fab--opened":" q-fab--closed")),b=a(()=>`q-fab__actions flex no-wrap inline q-fab__actions--${e.direction} q-fab__actions--${n.value===!0?"opened":"closed"}`),f=a(()=>{const o={id:r,role:"menu"};return n.value!==!0&&(o["aria-hidden"]="true"),o}),$=a(()=>`q-fab__icon-holder  q-fab__icon-holder--${n.value===!0?"opened":"closed"}`);function _(o,C){const c=s[o],p=`q-fab__${o} absolute-full`;return c===void 0?m(he,{class:p,name:e[C]||u.iconSet.fab[C]}):m("div",{class:p},c(y.value))}function v(){const o=[];return e.hideIcon!==!0&&o.push(m("div",{class:$.value},[_("icon","icon"),_("active-icon","activeIcon")])),(e.label!==""||s.label!==void 0)&&o[h.value.action](m("div",h.value.data,s.label!==void 0?s.label(y.value):[e.label])),Be(s.tooltip,o)}return ve(Ze,{showing:n,onChildClick(o){q(o),i.value!==null&&i.value.$el.focus()}}),()=>m("div",{class:x.value},[m(Ye,{ref:i,class:g.value,...e,noWrap:!0,stack:e.stacked,align:void 0,icon:void 0,label:void 0,noCaps:!0,fab:!0,"aria-expanded":n.value===!0?"true":"false","aria-haspopup":"true","aria-controls":r,onClick:l},v),m("div",{class:b.value,...f.value},I(s.default))])}}),Bt=F({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(e,{slots:s}){const{proxy:{$q:i}}=M(),n=E(U,S);if(n===S)return console.error("QPage needs to be a deep child of QLayout"),S;if(E(Le,S)===S)return console.error("QPage needs to be child of QPageContainer"),S;const u=a(()=>{const h=(n.header.space===!0?n.header.size:0)+(n.footer.space===!0?n.footer.size:0);if(typeof e.styleFn=="function"){const B=n.isContainer.value===!0?n.containerHeight.value:i.screen.height;return e.styleFn(h,B)}return{minHeight:n.isContainer.value===!0?n.containerHeight.value-h+"px":i.screen.height===0?h!==0?`calc(100vh - ${h}px)`:"100vh":i.screen.height-h+"px"}}),g=a(()=>`q-page${e.padding===!0?" q-layout-padding":""}`);return()=>m("main",{class:g.value,style:u.value},I(s.default))}}),Lt=F({name:"QPageContainer",setup(e,{slots:s}){const{proxy:{$q:i}}=M(),n=E(U,S);if(n===S)return console.error("QPageContainer needs to be child of QLayout"),S;ve(Le,!0);const r=a(()=>{const u={};return n.header.space===!0&&(u.paddingTop=`${n.header.size}px`),n.right.space===!0&&(u[`padding${i.lang.rtl===!0?"Left":"Right"}`]=`${n.right.size}px`),n.footer.space===!0&&(u.paddingBottom=`${n.footer.size}px`),n.left.space===!0&&(u[`padding${i.lang.rtl===!0?"Right":"Left"}`]=`${n.left.size}px`),u});return()=>m("div",{class:"q-page-container",style:r.value},I(s.default))}}),Pt=F({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:s,emit:i}){const{proxy:{$q:n}}=M(),r=k(null),u=k(n.screen.height),g=k(e.container===!0?0:n.screen.width),h=k({position:0,direction:"down",inflectionPoint:0}),B=k(0),q=k(et.value===!0?0:ce()),l=a(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),y=a(()=>e.container===!1?{minHeight:n.screen.height+"px"}:null),x=a(()=>q.value!==0?{[n.lang.rtl===!0?"left":"right"]:`${q.value}px`}:null),b=a(()=>q.value!==0?{[n.lang.rtl===!0?"right":"left"]:0,[n.lang.rtl===!0?"left":"right"]:`-${q.value}px`,width:`calc(100% + ${q.value}px)`}:null);function f(c){if(e.container===!0||document.qScrollPrevented!==!0){const p={position:c.position.top,direction:c.direction,directionChanged:c.directionChanged,inflectionPoint:c.inflectionPoint.top,delta:c.delta.top};h.value=p,e.onScroll!==void 0&&i("scroll",p)}}function $(c){const{height:p,width:Q}=c;let V=!1;u.value!==p&&(V=!0,u.value=p,e.onScrollHeight!==void 0&&i("scrollHeight",p),v()),g.value!==Q&&(V=!0,g.value=Q),V===!0&&e.onResize!==void 0&&i("resize",c)}function _({height:c}){B.value!==c&&(B.value=c,v())}function v(){if(e.container===!0){const c=u.value>B.value?ce():0;q.value!==c&&(q.value=c)}}let o=null;const C={instances:{},view:a(()=>e.view),isContainer:a(()=>e.container),rootRef:r,height:u,containerHeight:B,scrollbarWidth:q,totalWidth:a(()=>g.value+q.value),rows:a(()=>{const c=e.view.toLowerCase().split(" ");return{top:c[0].split(""),middle:c[1].split(""),bottom:c[2].split("")}}),header:Z({size:0,offset:0,space:!1}),right:Z({size:300,offset:0,space:!1}),footer:Z({size:0,offset:0,space:!1}),left:Z({size:300,offset:0,space:!1}),scroll:h,animate(){o!==null?clearTimeout(o):document.body.classList.add("q-body--layout-animate"),o=setTimeout(()=>{o=null,document.body.classList.remove("q-body--layout-animate")},155)},update(c,p,Q){C[c][p]=Q}};if(ve(U,C),ce()>0){let Q=function(){c=null,p.classList.remove("hide-scrollbar")},V=function(){if(c===null){if(p.scrollHeight>n.screen.height)return;p.classList.add("hide-scrollbar")}else clearTimeout(c);c=setTimeout(Q,300)},K=function(W){c!==null&&W==="remove"&&(clearTimeout(c),Q()),window[`${W}EventListener`]("resize",V)},c=null;const p=document.body;w(()=>e.container!==!0?"add":"remove",K),e.container!==!0&&K("add"),tt(()=>{K("remove")})}return()=>{const c=Be(s.default,[m(dt,{onScroll:f}),m(fe,{onResize:$})]),p=m("div",{class:l.value,style:y.value,ref:e.container===!0?void 0:r,tabindex:-1},c);return e.container===!0?m("div",{class:"q-layout-container overflow-hidden",ref:r},[m(fe,{onResize:_}),m("div",{class:"absolute-full",style:x.value},[m("div",{class:"scroll",style:b.value},[p])])]):p}}});const zt=Pe({__name:"sidebar-menu",setup(e){const s=[{to:"/",icon:"home",label:"Home"},{to:"/play",icon:"sports_esports",label:"Play"},{to:"/privacy",icon:"shield",label:"Privacy"}];return(i,n)=>(j(),G(bt,null,{default:L(()=>[(j(),at(nt,null,lt(s,(r,u)=>P(gt,{key:u,to:r.to,exact:"","active-class":"bg-primary text-white"},{default:L(()=>[P(_e,{avatar:""},{default:L(()=>[P(he,{name:r.icon},null,8,["name"])]),_:2},1024),P(_e,null,{default:L(()=>[de(ze(r.label),1)]),_:2},1024)]),_:2},1032,["to"])),64))]),_:1}))}});const Qt=Pe({__name:"main-layout",props:{fullwidth:{type:Boolean}},setup(e){const s=it(),i=mt(),n=k(!1);return(r,u)=>{const g=rt("router-view");return j(),G(Pt,{view:"lhh LpR lff",container:"",class:"main-layout"},{default:L(()=>[P(yt,{reveal:"",class:"bg-primary"},{default:L(()=>[P($e,null,{default:L(()=>[P(qe,null,{default:L(()=>[de("Allegiance Chess")]),_:1})]),_:1})]),_:1}),P(pt,{bordered:"",persistent:O(i).screen.gt.sm,"model-value":O(i).screen.gt.sm||n.value,side:O(i).screen.gt.sm?"left":"right",onHide:u[0]||(u[0]=h=>n.value=!1),class:xe(["column",{"justify-end q-pb-xl":O(i).screen.lt.md}])},{default:L(()=>[P(zt)]),_:1},8,["persistent","model-value","side","class"]),P(Lt,{class:"column items-center"},{default:L(()=>[P(Bt,{class:xe([{"q-pt-xl":O(s).meta.title},"full-width layout-page"])},{default:L(()=>[P(g),O(s).meta.title?(j(),G(Ce,{key:0,position:"top",expand:"",class:"bg-secondary text-black route-title"},{default:L(()=>[P($e,null,{default:L(()=>[typeof O(s).meta.icon=="string"?(j(),G(he,{key:0,size:"md",name:O(s).meta.icon},null,8,["name"])):ue("",!0),P(qe,null,{default:L(()=>[de(ze(O(s).meta.title),1)]),_:1})]),_:1})]),_:1})):ue("",!0),P(Ce,{position:"bottom-right",offset:[18,18]},{default:L(()=>[O(i).screen.lt.md?(j(),G(kt,{key:0,icon:"menu",direction:"up",color:"accent","model-value":n.value,onShow:u[1]||(u[1]=h=>n.value=!0),onHide:u[2]||(u[2]=h=>n.value=!1),class:"menu-fab"},null,8,["model-value"])):ue("",!0)]),_:1})]),_:1},8,["class"])]),_:1})]),_:1})}}});var Wt=ot(Qt,[["__scopeId","data-v-6b4b8267"]]);export{Wt as default};
//# sourceMappingURL=main-layout.f23d7688.js.map