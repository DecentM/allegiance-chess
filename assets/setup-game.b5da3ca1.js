import{Q as re,a as ie,b as te}from"./QCard.18a41439.js";import{i as De,w as H,B as ae,o as fe,al as Ae,j as ne,r as U,a as _,am as Te,an as Fe,ao as Oe,s as he,C as W,a4 as Ie,ap as Ee,I as $e,h as q,x as oe,T as xe,ab as je,e as le,aa as Ne,aq as ze,k as Ue,c as Be,y as ke,G as Le,a5 as Ze,_ as He,M as Ke,N as Qe,O as Ye,P as J,S as T,ac as Z,ar as ve,ag as Ge,ah as Je}from"./index.24610c7a.js";import{u as We,a as Xe}from"./use-dark.8f2925c9.js";import{a as ye,r as et}from"./focus-manager.202af5b7.js";import{u as tt}from"./use-quasar.ab1c7df1.js";import{H as nt}from"./hex.18acc6ed.js";function ot({validate:e,resetValidation:t,requiresQForm:i}){const u=De(Ae,!1);if(u!==!1){const{props:c,proxy:d}=ne();Object.assign(d,{validate:e,resetValidation:t}),H(()=>c.disable,f=>{f===!0?(typeof t=="function"&&t(),u.unbindComponent(d)):u.bindComponent(d)}),ae(()=>{c.disable!==!0&&u.bindComponent(d)}),fe(()=>{c.disable!==!0&&u.unbindComponent(d)})}else i===!0&&console.error("Parent QForm not found on useFormChild()!")}const Ce=/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,we=/^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,_e=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,ue=/^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,se=/^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,me={date:e=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),time:e=>/^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),fulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),timeOrFulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),hexColor:e=>Ce.test(e),hexaColor:e=>we.test(e),hexOrHexaColor:e=>_e.test(e),rgbColor:e=>ue.test(e),rgbaColor:e=>se.test(e),rgbOrRgbaColor:e=>ue.test(e)||se.test(e),hexOrRgbColor:e=>Ce.test(e)||ue.test(e),hexaOrRgbaColor:e=>we.test(e)||se.test(e),anyColor:e=>_e.test(e)||ue.test(e)||se.test(e)},lt=[!0,!1,"ondemand"],at={modelValue:{},error:{type:Boolean,default:null},errorMessage:String,noErrorIcon:Boolean,rules:Array,reactiveRules:Boolean,lazyRules:{type:[Boolean,String],validator:e=>lt.includes(e)}};function rt(e,t){const{props:i,proxy:u}=ne(),c=U(!1),d=U(null),f=U(null);ot({validate:R,resetValidation:v});let x=0,C;const k=_(()=>i.rules!==void 0&&i.rules!==null&&i.rules.length!==0),p=_(()=>i.disable!==!0&&k.value===!0),m=_(()=>i.error===!0||c.value===!0),K=_(()=>typeof i.errorMessage=="string"&&i.errorMessage.length!==0?i.errorMessage:d.value);H(()=>i.modelValue,()=>{O()}),H(()=>i.reactiveRules,N=>{N===!0?C===void 0&&(C=H(()=>i.rules,()=>{O(!0)})):C!==void 0&&(C(),C=void 0)},{immediate:!0}),H(e,N=>{N===!0?f.value===null&&(f.value=!1):f.value===!1&&(f.value=!0,p.value===!0&&i.lazyRules!=="ondemand"&&t.value===!1&&j())});function v(){x++,t.value=!1,f.value=null,c.value=!1,d.value=null,j.cancel()}function R(N=i.modelValue){if(p.value!==!0)return!0;const B=++x,A=t.value!==!0?()=>{f.value=!0}:()=>{},F=(S,w)=>{S===!0&&A(),c.value=S,d.value=w||null,t.value=!1},I=[];for(let S=0;S<i.rules.length;S++){const w=i.rules[S];let $;if(typeof w=="function"?$=w(N,me):typeof w=="string"&&me[w]!==void 0&&($=me[w](N)),$===!1||typeof $=="string")return F(!0,$),!1;$!==!0&&$!==void 0&&I.push($)}return I.length===0?(F(!1),!0):(t.value=!0,Promise.all(I).then(S=>{if(S===void 0||Array.isArray(S)===!1||S.length===0)return B===x&&F(!1),!0;const w=S.find($=>$===!1||typeof $=="string");return B===x&&F(w!==void 0,w),w===void 0},S=>(B===x&&(console.error(S),F(!0)),!1)))}function O(N){p.value===!0&&i.lazyRules!=="ondemand"&&(f.value===!0||i.lazyRules!==!0&&N!==!0)&&j()}const j=Te(R,0);return fe(()=>{C!==void 0&&C(),j.cancel()}),Object.assign(u,{resetValidation:v,validate:R}),Fe(u,"hasError",()=>m.value),{isDirtyModel:f,hasRules:k,hasError:m,errorMessage:K,validate:R,resetValidation:v}}const Se=/^on[A-Z]/;function it(e,t){const i={listeners:U({}),attributes:U({})};function u(){const c={},d={};for(const f in e)f!=="class"&&f!=="style"&&Se.test(f)===!1&&(c[f]=e[f]);for(const f in t.props)Se.test(f)===!0&&(d[f]=t.props[f]);i.attributes.value=c,i.listeners.value=d}return Oe(u),u(),i}let ge,de=0;const z=new Array(256);for(let e=0;e<256;e++)z[e]=(e+256).toString(16).substring(1);const ut=(()=>{const e=typeof crypto!="undefined"?crypto:typeof window!="undefined"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return t=>{const i=new Uint8Array(t);return e.getRandomValues(i),i}}return t=>{const i=[];for(let u=t;u>0;u--)i.push(Math.floor(Math.random()*256));return i}})(),Me=4096;function st(){(ge===void 0||de+16>Me)&&(de=0,ge=ut(Me));const e=Array.prototype.slice.call(ge,de,de+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,z[e[0]]+z[e[1]]+z[e[2]]+z[e[3]]+"-"+z[e[4]]+z[e[5]]+"-"+z[e[6]]+z[e[7]]+"-"+z[e[8]]+z[e[9]]+"-"+z[e[10]]+z[e[11]]+z[e[12]]+z[e[13]]+z[e[14]]+z[e[15]]}function pe(e){return e===void 0?`f_${st()}`:e}function be(e){return e!=null&&(""+e).length!==0}const dt={...We,...at,label:String,stackLabel:Boolean,hint:String,hideHint:Boolean,prefix:String,suffix:String,labelColor:String,color:String,bgColor:String,filled:Boolean,outlined:Boolean,borderless:Boolean,standout:[Boolean,String],square:Boolean,loading:Boolean,labelSlot:Boolean,bottomSlots:Boolean,hideBottomSpace:Boolean,rounded:Boolean,dense:Boolean,itemAligned:Boolean,counter:Boolean,clearable:Boolean,clearIcon:String,disable:Boolean,readonly:Boolean,autofocus:Boolean,for:String,maxlength:[Number,String]},ct=["update:modelValue","clear","focus","blur","popupShow","popupHide"];function ft(){const{props:e,attrs:t,proxy:i,vnode:u}=ne();return{isDark:Xe(e,i.$q),editable:_(()=>e.disable!==!0&&e.readonly!==!0),innerLoading:U(!1),focused:U(!1),hasPopupOpen:!1,splitAttrs:it(t,u),targetUid:U(pe(e.for)),rootRef:U(null),targetRef:U(null),controlRef:U(null)}}function vt(e){const{props:t,emit:i,slots:u,attrs:c,proxy:d}=ne(),{$q:f}=d;let x=null;e.hasValue===void 0&&(e.hasValue=_(()=>be(t.modelValue))),e.emitValue===void 0&&(e.emitValue=n=>{i("update:modelValue",n)}),e.controlEvents===void 0&&(e.controlEvents={onFocusin:a,onFocusout:l}),Object.assign(e,{clearValue:s,onControlFocusin:a,onControlFocusout:l,focus:w}),e.computedCounter===void 0&&(e.computedCounter=_(()=>{if(t.counter!==!1){const n=typeof t.modelValue=="string"||typeof t.modelValue=="number"?(""+t.modelValue).length:Array.isArray(t.modelValue)===!0?t.modelValue.length:0,y=t.maxlength!==void 0?t.maxlength:t.maxValues;return n+(y!==void 0?" / "+y:"")}}));const{isDirtyModel:C,hasRules:k,hasError:p,errorMessage:m,resetValidation:K}=rt(e.focused,e.innerLoading),v=e.floatingLabel!==void 0?_(()=>t.stackLabel===!0||e.focused.value===!0||e.floatingLabel.value===!0):_(()=>t.stackLabel===!0||e.focused.value===!0||e.hasValue.value===!0),R=_(()=>t.bottomSlots===!0||t.hint!==void 0||k.value===!0||t.counter===!0||t.error!==null),O=_(()=>t.filled===!0?"filled":t.outlined===!0?"outlined":t.borderless===!0?"borderless":t.standout?"standout":"standard"),j=_(()=>`q-field row no-wrap items-start q-field--${O.value}`+(e.fieldClass!==void 0?` ${e.fieldClass.value}`:"")+(t.rounded===!0?" q-field--rounded":"")+(t.square===!0?" q-field--square":"")+(v.value===!0?" q-field--float":"")+(B.value===!0?" q-field--labeled":"")+(t.dense===!0?" q-field--dense":"")+(t.itemAligned===!0?" q-field--item-aligned q-item-type":"")+(e.isDark.value===!0?" q-field--dark":"")+(e.getControl===void 0?" q-field--auto-height":"")+(e.focused.value===!0?" q-field--focused":"")+(p.value===!0?" q-field--error":"")+(p.value===!0||e.focused.value===!0?" q-field--highlighted":"")+(t.hideBottomSpace!==!0&&R.value===!0?" q-field--with-bottom":"")+(t.disable===!0?" q-field--disabled":t.readonly===!0?" q-field--readonly":"")),N=_(()=>"q-field__control relative-position row no-wrap"+(t.bgColor!==void 0?` bg-${t.bgColor}`:"")+(p.value===!0?" text-negative":typeof t.standout=="string"&&t.standout.length!==0&&e.focused.value===!0?` ${t.standout}`:t.color!==void 0?` text-${t.color}`:"")),B=_(()=>t.labelSlot===!0||t.label!==void 0),A=_(()=>"q-field__label no-pointer-events absolute ellipsis"+(t.labelColor!==void 0&&p.value!==!0?` text-${t.labelColor}`:"")),F=_(()=>({id:e.targetUid.value,editable:e.editable.value,focused:e.focused.value,floatingLabel:v.value,modelValue:t.modelValue,emitValue:e.emitValue})),I=_(()=>{const n={for:e.targetUid.value};return t.disable===!0?n["aria-disabled"]="true":t.readonly===!0&&(n["aria-readonly"]="true"),n});H(()=>t.for,n=>{e.targetUid.value=pe(n)});function S(){const n=document.activeElement;let y=e.targetRef!==void 0&&e.targetRef.value;y&&(n===null||n.id!==e.targetUid.value)&&(y.hasAttribute("tabindex")===!0||(y=y.querySelector("[tabindex]")),y&&y!==n&&y.focus({preventScroll:!0}))}function w(){ye(S)}function $(){et(S);const n=document.activeElement;n!==null&&e.rootRef.value.contains(n)&&n.blur()}function a(n){x!==null&&(clearTimeout(x),x=null),e.editable.value===!0&&e.focused.value===!1&&(e.focused.value=!0,i("focus",n))}function l(n,y){x!==null&&clearTimeout(x),x=setTimeout(()=>{x=null,!(document.hasFocus()===!0&&(e.hasPopupOpen===!0||e.controlRef===void 0||e.controlRef.value===null||e.controlRef.value.contains(document.activeElement)!==!1))&&(e.focused.value===!0&&(e.focused.value=!1,i("blur",n)),y!==void 0&&y())})}function s(n){he(n),f.platform.is.mobile!==!0?(e.targetRef!==void 0&&e.targetRef.value||e.rootRef.value).focus():e.rootRef.value.contains(document.activeElement)===!0&&document.activeElement.blur(),t.type==="file"&&(e.inputRef.value.value=null),i("update:modelValue",null),i("clear",t.modelValue),W(()=>{K(),f.platform.is.mobile!==!0&&(C.value=!1)})}function r(){const n=[];return u.prepend!==void 0&&n.push(q("div",{class:"q-field__prepend q-field__marginal row no-wrap items-center",key:"prepend",onClick:oe},u.prepend())),n.push(q("div",{class:"q-field__control-container col relative-position row no-wrap q-anchor--skip"},h())),p.value===!0&&t.noErrorIcon===!1&&n.push(V("error",[q(xe,{name:f.iconSet.field.error,color:"negative"})])),t.loading===!0||e.innerLoading.value===!0?n.push(V("inner-loading-append",u.loading!==void 0?u.loading():[q(je,{color:t.color})])):t.clearable===!0&&e.hasValue.value===!0&&e.editable.value===!0&&n.push(V("inner-clearable-append",[q(xe,{class:"q-field__focusable-action",tag:"button",name:t.clearIcon||f.iconSet.field.clear,tabindex:0,type:"button","aria-hidden":null,role:null,onClick:s})])),u.append!==void 0&&n.push(q("div",{class:"q-field__append q-field__marginal row no-wrap items-center",key:"append",onClick:oe},u.append())),e.getInnerAppend!==void 0&&n.push(V("inner-append",e.getInnerAppend())),e.getControlChild!==void 0&&n.push(e.getControlChild()),n}function h(){const n=[];return t.prefix!==void 0&&t.prefix!==null&&n.push(q("div",{class:"q-field__prefix no-pointer-events row items-center"},t.prefix)),e.getShadowControl!==void 0&&e.hasShadow.value===!0&&n.push(e.getShadowControl()),e.getControl!==void 0?n.push(e.getControl()):u.rawControl!==void 0?n.push(u.rawControl()):u.control!==void 0&&n.push(q("div",{ref:e.targetRef,class:"q-field__native row",tabindex:-1,...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0},u.control(F.value))),B.value===!0&&n.push(q("div",{class:A.value},le(u.label,t.label))),t.suffix!==void 0&&t.suffix!==null&&n.push(q("div",{class:"q-field__suffix no-pointer-events row items-center"},t.suffix)),n.concat(le(u.default))}function g(){let n,y;p.value===!0?m.value!==null?(n=[q("div",{role:"alert"},m.value)],y=`q--slot-error-${m.value}`):(n=le(u.error),y="q--slot-error"):(t.hideHint!==!0||e.focused.value===!0)&&(t.hint!==void 0?(n=[q("div",t.hint)],y=`q--slot-hint-${t.hint}`):(n=le(u.hint),y="q--slot-hint"));const Y=t.counter===!0||u.counter!==void 0;if(t.hideBottomSpace===!0&&Y===!1&&n===void 0)return;const M=q("div",{key:y,class:"q-field__messages col"},n);return q("div",{class:"q-field__bottom row items-start q-field__bottom--"+(t.hideBottomSpace!==!0?"animated":"stale"),onClick:oe},[t.hideBottomSpace===!0?M:q(Ne,{name:"q-transition--field-message"},()=>M),Y===!0?q("div",{class:"q-field__counter"},u.counter!==void 0?u.counter():e.computedCounter.value):null])}function V(n,y){return y===null?null:q("div",{key:n,class:"q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"},y)}let b=!1;return Ie(()=>{b=!0}),Ee(()=>{b===!0&&t.autofocus===!0&&d.focus()}),ae(()=>{$e.value===!0&&t.for===void 0&&(e.targetUid.value=pe()),t.autofocus===!0&&d.focus()}),fe(()=>{x!==null&&clearTimeout(x)}),Object.assign(d,{focus:w,blur:$}),function(){const y=e.getControl===void 0&&u.control===void 0?{...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0,...I.value}:I.value;return q("label",{ref:e.rootRef,class:[j.value,c.class],style:c.style,...y},[u.before!==void 0?q("div",{class:"q-field__before q-field__marginal row no-wrap items-center",onClick:oe},u.before()):null,q("div",{class:"q-field__inner relative-position col self-stretch"},[q("div",{ref:e.controlRef,class:N.value,tabindex:-1,...e.controlEvents},r()),R.value===!0?g():null]),u.after!==void 0?q("div",{class:"q-field__after q-field__marginal row no-wrap items-center",onClick:oe},u.after()):null])}}const qe={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},ce={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},Pe=Object.keys(ce);Pe.forEach(e=>{ce[e].regex=new RegExp(ce[e].pattern)});const mt=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+Pe.join("")+"])|(.)","g"),Re=/[.*+?^${}()|[\]\\]/g,P=String.fromCharCode(1),gt={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function ht(e,t,i,u){let c,d,f,x,C,k;const p=U(null),m=U(v());function K(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}H(()=>e.type+e.autogrow,O),H(()=>e.mask,a=>{if(a!==void 0)j(m.value,!0);else{const l=w(m.value);O(),e.modelValue!==l&&t("update:modelValue",l)}}),H(()=>e.fillMask+e.reverseFillMask,()=>{p.value===!0&&j(m.value,!0)}),H(()=>e.unmaskedValue,()=>{p.value===!0&&j(m.value)});function v(){if(O(),p.value===!0){const a=I(w(e.modelValue));return e.fillMask!==!1?$(a):a}return e.modelValue}function R(a){if(a<c.length)return c.slice(-a);let l="",s=c;const r=s.indexOf(P);if(r>-1){for(let h=a-s.length;h>0;h--)l+=P;s=s.slice(0,r)+l+s.slice(r)}return s}function O(){if(p.value=e.mask!==void 0&&e.mask.length!==0&&K(),p.value===!1){x=void 0,c="",d="";return}const a=qe[e.mask]===void 0?e.mask:qe[e.mask],l=typeof e.fillMask=="string"&&e.fillMask.length!==0?e.fillMask.slice(0,1):"_",s=l.replace(Re,"\\$&"),r=[],h=[],g=[];let V=e.reverseFillMask===!0,b="",n="";a.replace(mt,(D,o,E,G,Q)=>{if(G!==void 0){const L=ce[G];g.push(L),n=L.negate,V===!0&&(h.push("(?:"+n+"+)?("+L.pattern+"+)?(?:"+n+"+)?("+L.pattern+"+)?"),V=!1),h.push("(?:"+n+"+)?("+L.pattern+")?")}else if(E!==void 0)b="\\"+(E==="\\"?"":E),g.push(E),r.push("([^"+b+"]+)?"+b+"?");else{const L=o!==void 0?o:Q;b=L==="\\"?"\\\\\\\\":L.replace(Re,"\\\\$&"),g.push(L),r.push("([^"+b+"]+)?"+b+"?")}});const y=new RegExp("^"+r.join("")+"("+(b===""?".":"[^"+b+"]")+"+)?"+(b===""?"":"["+b+"]*")+"$"),Y=h.length-1,M=h.map((D,o)=>o===0&&e.reverseFillMask===!0?new RegExp("^"+s+"*"+D):o===Y?new RegExp("^"+D+"("+(n===""?".":n)+"+)?"+(e.reverseFillMask===!0?"$":s+"*")):new RegExp("^"+D));f=g,x=D=>{const o=y.exec(e.reverseFillMask===!0?D:D.slice(0,g.length+1));o!==null&&(D=o.slice(1).join(""));const E=[],G=M.length;for(let Q=0,L=D;Q<G;Q++){const ee=M[Q].exec(L);if(ee===null)break;L=L.slice(ee.shift().length),E.push(...ee)}return E.length!==0?E.join(""):D},c=g.map(D=>typeof D=="string"?D:P).join(""),d=c.split(P).join(l)}function j(a,l,s){const r=u.value,h=r.selectionEnd,g=r.value.length-h,V=w(a);l===!0&&O();const b=I(V),n=e.fillMask!==!1?$(b):b,y=m.value!==n;r.value!==n&&(r.value=n),y===!0&&(m.value=n),document.activeElement===r&&W(()=>{if(n===d){const M=e.reverseFillMask===!0?d.length:0;r.setSelectionRange(M,M,"forward");return}if(s==="insertFromPaste"&&e.reverseFillMask!==!0){const M=r.selectionEnd;let D=h-1;for(let o=C;o<=D&&o<M;o++)c[o]!==P&&D++;B.right(r,D);return}if(["deleteContentBackward","deleteContentForward"].indexOf(s)>-1){const M=e.reverseFillMask===!0?h===0?n.length>b.length?1:0:Math.max(0,n.length-(n===d?0:Math.min(b.length,g)+1))+1:h;r.setSelectionRange(M,M,"forward");return}if(e.reverseFillMask===!0)if(y===!0){const M=Math.max(0,n.length-(n===d?0:Math.min(b.length,g+1)));M===1&&h===1?r.setSelectionRange(M,M,"forward"):B.rightReverse(r,M)}else{const M=n.length-g;r.setSelectionRange(M,M,"backward")}else if(y===!0){const M=Math.max(0,c.indexOf(P),Math.min(b.length,h)-1);B.right(r,M)}else{const M=h-1;B.right(r,M)}});const Y=e.unmaskedValue===!0?w(n):n;String(e.modelValue)!==Y&&i(Y,!0)}function N(a,l,s){const r=I(w(a.value));l=Math.max(0,c.indexOf(P),Math.min(r.length,l)),C=l,a.setSelectionRange(l,s,"forward")}const B={left(a,l){const s=c.slice(l-1).indexOf(P)===-1;let r=Math.max(0,l-1);for(;r>=0;r--)if(c[r]===P){l=r,s===!0&&l++;break}if(r<0&&c[l]!==void 0&&c[l]!==P)return B.right(a,0);l>=0&&a.setSelectionRange(l,l,"backward")},right(a,l){const s=a.value.length;let r=Math.min(s,l+1);for(;r<=s;r++)if(c[r]===P){l=r;break}else c[r-1]===P&&(l=r);if(r>s&&c[l-1]!==void 0&&c[l-1]!==P)return B.left(a,s);a.setSelectionRange(l,l,"forward")},leftReverse(a,l){const s=R(a.value.length);let r=Math.max(0,l-1);for(;r>=0;r--)if(s[r-1]===P){l=r;break}else if(s[r]===P&&(l=r,r===0))break;if(r<0&&s[l]!==void 0&&s[l]!==P)return B.rightReverse(a,0);l>=0&&a.setSelectionRange(l,l,"backward")},rightReverse(a,l){const s=a.value.length,r=R(s),h=r.slice(0,l+1).indexOf(P)===-1;let g=Math.min(s,l+1);for(;g<=s;g++)if(r[g-1]===P){l=g,l>0&&h===!0&&l--;break}if(g>s&&r[l-1]!==void 0&&r[l-1]!==P)return B.leftReverse(a,s);a.setSelectionRange(l,l,"forward")}};function A(a){t("click",a),k=void 0}function F(a){if(t("keydown",a),ze(a)===!0||a.altKey===!0)return;const l=u.value,s=l.selectionStart,r=l.selectionEnd;if(a.shiftKey||(k=void 0),a.keyCode===37||a.keyCode===39){a.shiftKey&&k===void 0&&(k=l.selectionDirection==="forward"?s:r);const h=B[(a.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];if(a.preventDefault(),h(l,k===s?r:s),a.shiftKey){const g=l.selectionStart;l.setSelectionRange(Math.min(k,g),Math.max(k,g),"forward")}}else a.keyCode===8&&e.reverseFillMask!==!0&&s===r?(B.left(l,s),l.setSelectionRange(l.selectionStart,r,"backward")):a.keyCode===46&&e.reverseFillMask===!0&&s===r&&(B.rightReverse(l,r),l.setSelectionRange(s,l.selectionEnd,"forward"))}function I(a){if(a==null||a==="")return"";if(e.reverseFillMask===!0)return S(a);const l=f;let s=0,r="";for(let h=0;h<l.length;h++){const g=a[s],V=l[h];if(typeof V=="string")r+=V,g===V&&s++;else if(g!==void 0&&V.regex.test(g))r+=V.transform!==void 0?V.transform(g):g,s++;else return r}return r}function S(a){const l=f,s=c.indexOf(P);let r=a.length-1,h="";for(let g=l.length-1;g>=0&&r>-1;g--){const V=l[g];let b=a[r];if(typeof V=="string")h=V+h,b===V&&r--;else if(b!==void 0&&V.regex.test(b))do h=(V.transform!==void 0?V.transform(b):b)+h,r--,b=a[r];while(s===g&&b!==void 0&&V.regex.test(b));else return h}return h}function w(a){return typeof a!="string"||x===void 0?typeof a=="number"?x(""+a):a:x(a)}function $(a){return d.length-a.length<=0?a:e.reverseFillMask===!0&&a.length!==0?d.slice(0,-a.length)+a:a+d.slice(a.length)}return{innerValue:m,hasMask:p,moveCursorForPaste:N,updateMaskValue:j,onMaskedKeydown:F,onMaskedClick:A}}const pt={name:String};function bt(e){return _(()=>e.name||e.for)}function yt(e,t){function i(){const u=e.modelValue;try{const c="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(u)===u&&("length"in u?Array.from(u):[u]).forEach(d=>{c.items.add(d)}),{files:c.files}}catch{return{files:void 0}}}return t===!0?_(()=>{if(e.type==="file")return i()}):_(i)}const xt=/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,kt=/[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,Ct=/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,wt=/[a-z0-9_ -]$/i;function _t(e){return function(i){if(i.type==="compositionend"||i.type==="change"){if(i.target.qComposing!==!0)return;i.target.qComposing=!1,e(i)}else i.type==="compositionupdate"&&i.target.qComposing!==!0&&typeof i.data=="string"&&(Ue.is.firefox===!0?wt.test(i.data)===!1:xt.test(i.data)===!0||kt.test(i.data)===!0||Ct.test(i.data)===!0)===!0&&(i.target.qComposing=!0)}}var Ve=Be({name:"QInput",inheritAttrs:!1,props:{...dt,...gt,...pt,modelValue:{required:!1},shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...ct,"paste","change","keydown","click","animationend"],setup(e,{emit:t,attrs:i}){const{proxy:u}=ne(),{$q:c}=u,d={};let f=NaN,x,C,k=null,p;const m=U(null),K=bt(e),{innerValue:v,hasMask:R,moveCursorForPaste:O,updateMaskValue:j,onMaskedKeydown:N,onMaskedClick:B}=ht(e,t,b,m),A=yt(e,!0),F=_(()=>be(v.value)),I=_t(g),S=ft(),w=_(()=>e.type==="textarea"||e.autogrow===!0),$=_(()=>w.value===!0||["text","search","url","tel","password"].includes(e.type)),a=_(()=>{const o={...S.splitAttrs.listeners.value,onInput:g,onPaste:h,onChange:y,onBlur:Y,onFocus:ke};return o.onCompositionstart=o.onCompositionupdate=o.onCompositionend=I,R.value===!0&&(o.onKeydown=N,o.onClick=B),e.autogrow===!0&&(o.onAnimationend=V),o}),l=_(()=>{const o={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:K.value,...S.splitAttrs.attributes.value,id:S.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return w.value===!1&&(o.type=e.type),e.autogrow===!0&&(o.rows=1),o});H(()=>e.type,()=>{m.value&&(m.value.value=e.modelValue)}),H(()=>e.modelValue,o=>{if(R.value===!0){if(C===!0&&(C=!1,String(o)===f))return;j(o)}else v.value!==o&&(v.value=o,e.type==="number"&&d.hasOwnProperty("value")===!0&&(x===!0?x=!1:delete d.value));e.autogrow===!0&&W(n)}),H(()=>e.autogrow,o=>{o===!0?W(n):m.value!==null&&i.rows>0&&(m.value.style.height="auto")}),H(()=>e.dense,()=>{e.autogrow===!0&&W(n)});function s(){ye(()=>{const o=document.activeElement;m.value!==null&&m.value!==o&&(o===null||o.id!==S.targetUid.value)&&m.value.focus({preventScroll:!0})})}function r(){m.value!==null&&m.value.select()}function h(o){if(R.value===!0&&e.reverseFillMask!==!0){const E=o.target;O(E,E.selectionStart,E.selectionEnd)}t("paste",o)}function g(o){if(!o||!o.target)return;if(e.type==="file"){t("update:modelValue",o.target.files);return}const E=o.target.value;if(o.target.qComposing===!0){d.value=E;return}if(R.value===!0)j(E,!1,o.inputType);else if(b(E),$.value===!0&&o.target===document.activeElement){const{selectionStart:G,selectionEnd:Q}=o.target;G!==void 0&&Q!==void 0&&W(()=>{o.target===document.activeElement&&E.indexOf(o.target.value)===0&&o.target.setSelectionRange(G,Q)})}e.autogrow===!0&&n()}function V(o){t("animationend",o),n()}function b(o,E){p=()=>{k=null,e.type!=="number"&&d.hasOwnProperty("value")===!0&&delete d.value,e.modelValue!==o&&f!==o&&(f=o,E===!0&&(C=!0),t("update:modelValue",o),W(()=>{f===o&&(f=NaN)})),p=void 0},e.type==="number"&&(x=!0,d.value=o),e.debounce!==void 0?(k!==null&&clearTimeout(k),d.value=o,k=setTimeout(p,e.debounce)):p()}function n(){requestAnimationFrame(()=>{const o=m.value;if(o!==null){const E=o.parentNode.style,{scrollTop:G}=o,{overflowY:Q,maxHeight:L}=c.platform.is.firefox===!0?{}:window.getComputedStyle(o),ee=Q!==void 0&&Q!=="scroll";ee===!0&&(o.style.overflowY="hidden"),E.marginBottom=o.scrollHeight-1+"px",o.style.height="1px",o.style.height=o.scrollHeight+"px",ee===!0&&(o.style.overflowY=parseInt(L,10)<o.scrollHeight?"auto":"hidden"),E.marginBottom="",o.scrollTop=G}})}function y(o){I(o),k!==null&&(clearTimeout(k),k=null),p!==void 0&&p(),t("change",o.target.value)}function Y(o){o!==void 0&&ke(o),k!==null&&(clearTimeout(k),k=null),p!==void 0&&p(),x=!1,C=!1,delete d.value,e.type!=="file"&&setTimeout(()=>{m.value!==null&&(m.value.value=v.value!==void 0?v.value:"")})}function M(){return d.hasOwnProperty("value")===!0?d.value:v.value!==void 0?v.value:""}fe(()=>{Y()}),ae(()=>{e.autogrow===!0&&n()}),Object.assign(S,{innerValue:v,fieldClass:_(()=>`q-${w.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:_(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length!==0),inputRef:m,emitValue:b,hasValue:F,floatingLabel:_(()=>F.value===!0&&(e.type!=="number"||isNaN(v.value)===!1)||be(e.displayValue)),getControl:()=>q(w.value===!0?"textarea":"input",{ref:m,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...l.value,...a.value,...e.type!=="file"?{value:M()}:A.value}),getShadowControl:()=>q("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(w.value===!0?"":" text-no-wrap")},[q("span",{class:"invisible"},M()),q("span",e.shadowText)])});const D=vt(S);return Object.assign(u,{focus:s,select:r,getNativeElement:()=>m.value}),Fe(u,"nativeEl",()=>m.value),D}}),St=Be({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(e,{slots:t,emit:i}){const u=ne(),c=U(null);let d=0;const f=[];function x(v){const R=typeof v=="boolean"?v:e.noErrorFocus!==!0,O=++d,j=(A,F)=>{i("validation"+(A===!0?"Success":"Error"),F)},N=A=>{const F=A.validate();return typeof F.then=="function"?F.then(I=>({valid:I,comp:A}),I=>({valid:!1,comp:A,err:I})):Promise.resolve({valid:F,comp:A})};return(e.greedy===!0?Promise.all(f.map(N)).then(A=>A.filter(F=>F.valid!==!0)):f.reduce((A,F)=>A.then(()=>N(F).then(I=>{if(I.valid===!1)return Promise.reject(I)})),Promise.resolve()).catch(A=>[A])).then(A=>{if(A===void 0||A.length===0)return O===d&&j(!0),!0;if(O===d){const{comp:F,err:I}=A[0];if(I!==void 0&&console.error(I),j(!1,F),R===!0){const S=A.find(({comp:w})=>typeof w.focus=="function"&&Ze(w.$)===!1);S!==void 0&&S.comp.focus()}}return!1})}function C(){d++,f.forEach(v=>{typeof v.resetValidation=="function"&&v.resetValidation()})}function k(v){v!==void 0&&he(v);const R=d+1;x().then(O=>{R===d&&O===!0&&(e.onSubmit!==void 0?i("submit",v):v!==void 0&&v.target!==void 0&&typeof v.target.submit=="function"&&v.target.submit())})}function p(v){v!==void 0&&he(v),i("reset"),W(()=>{C(),e.autofocus===!0&&e.noResetFocus!==!0&&m()})}function m(){ye(()=>{if(c.value===null)return;const v=c.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||c.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||c.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(c.value.querySelectorAll("[tabindex]"),R=>R.tabIndex>-1);v!=null&&v.focus({preventScroll:!0})})}Le(Ae,{bindComponent(v){f.push(v)},unbindComponent(v){const R=f.indexOf(v);R>-1&&f.splice(R,1)}});let K=!1;return Ie(()=>{K=!0}),Ee(()=>{K===!0&&e.autofocus===!0&&m()}),ae(()=>{e.autofocus===!0&&m()}),Object.assign(u.proxy,{validate:x,resetValidation:C,submit:k,reset:p,focus:m,getValidationComponents:()=>f}),()=>q("form",{class:"q-form",ref:c,onSubmit:k,onReset:p},le(t.default))}});const X=e=>(Ge("data-v-136a7b10"),e=e(),Je(),e),Mt={class:"row items-center full-height space"},qt={class:"col-12 text-center q-pa-md"},Rt=X(()=>Z("h4",{class:"text-h4"},"Pen-pal mode",-1)),Vt=X(()=>Z("span",null," The game will run locally, but you can send the page URL to your opponent to let them make a move. ",-1)),At={class:"row justify-end"},Ft={class:"row items-center full-height space"},It={class:"col-md-6 col-sm-12 text-center q-pa-md"},Et=X(()=>Z("h4",{class:"text-h4"},"Join a game",-1)),Bt=X(()=>Z("span",null,` Ask your opponent to visit this page, and send you their Peer ID. Paste your opponent's Peer ID in this field, and click "Connect" or press enter to begin the game `,-1)),Pt={class:"row justify-end"},Dt=X(()=>Z("div",{class:"col-0 divider-right"},null,-1)),Tt=X(()=>Z("h4",{class:"text-h4"},"Host a game",-1)),Ot=X(()=>Z("span",null," Send your opponent your Peer ID. Ask your opponent to visit this page and paste your Peer ID into the field on the left on their side. ",-1)),$t={class:"row justify-end"},jt=Ke({__name:"setup-game",props:{connection:{}},setup(e){const t=e,i=U(""),u=C=>{if(!C)return"You must specify a Peer ID to connect with";const k=nt.hexToUtf8(C),[p,m,K,v,R,...O]=k.split("-");return O.length!==0?"Peer ID invalid, too much data":p.length!==8?"Peer ID invalid, part 1 has invalid length":m.length!==4?"Peer ID invalid, part 2 has invalid length":K.length!==4?"Peer ID invalid, part 3 has invalid length":v.length!==4?"Peer ID invalid, part 4 has invalid length":R.length!==12?"Peer ID invalid, part 5 has invalid length":C===t.connection.peerId.value?"This is your own Peer ID":!0},c=()=>[t.connection.connect(i.value)],d=_(()=>u(i.value)===!0),f=tt(),x=()=>{try{if(!t.connection.peerId.value)throw new Error("Peer ID missing");navigator.clipboard.writeText(t.connection.peerId.value),f.notify({icon:"content_copy",message:"Peer ID copied to clipboard",timeout:4e3,position:"bottom-right"})}catch(C){C instanceof Error&&f.notify({icon:"close",iconColor:"red",message:"Cannot copy to clipboard",caption:C.message,timeout:4e3,position:"bottom-right"})}};return ae(()=>{t.connection.disconnect()}),(C,k)=>(Qe(),Ye(re,{flat:"",class:"full-height"},{default:J(()=>[T(ie,{vertical:""},{default:J(()=>[Z("div",Mt,[Z("div",qt,[T(re,{flat:""},{default:J(()=>[T(ie,null,{default:J(()=>[Rt,T(te,{class:"q-mb-md"}),Vt,T(te,{class:"q-mb-md q-mt-md"}),Z("div",At,[T(ve,{to:"/play/pen-pal",icon:"mail",label:"New game",color:"primary"})])]),_:1})]),_:1})])]),Z("div",Ft,[Z("div",It,[T(re,{flat:""},{default:J(()=>[T(ie,null,{default:J(()=>[T(St,{onSubmit:c},{default:J(()=>[Et,T(te,{class:"q-mb-md"}),Bt,T(te,{class:"q-mb-md q-mt-md"}),T(Ve,{standout:"",modelValue:i.value,"onUpdate:modelValue":k[0]||(k[0]=p=>i.value=p),label:"Peer ID *",hint:"Paste your opponent's Peer ID here","lazy-rules":"",rules:[u]},null,8,["modelValue","rules"]),Z("div",Pt,[T(ve,{icon:"hub",label:"Connect",type:"submit",color:"primary",disable:!d.value},null,8,["disable"])])]),_:1})]),_:1})]),_:1})]),Dt,T(re,{flat:"",class:"col-md-6 col-sm-12 text-center q-pa-md"},{default:J(()=>[T(ie,null,{default:J(()=>[Tt,T(te,{class:"q-mb-md"}),Ot,T(te,{class:"q-mb-md q-mt-md"}),T(Ve,{standout:"","model-value":C.connection.peerId.value,label:"Peer ID *",hint:"Copy this Peer ID and send it to your opponent",readonly:""},null,8,["model-value"]),Z("div",$t,[T(ve,{label:"Copy",color:"primary",icon:"content_copy",onClick:x})])]),_:1})]),_:1})])]),_:1})]),_:1}))}});var Kt=He(jt,[["__scopeId","data-v-136a7b10"]]);export{Kt as default};
