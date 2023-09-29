import{i as qe,w as U,B as le,o as ae,am as xe,j as J,r as L,a as S,an as Fe,ao as Ce,ap as Ve,s as ie,C as Y,a4 as we,aq as Se,I as Ae,h as M,x as X,T as ce,ag as Ee,e as G,af as _e,ar as Be,k as Oe,c as Me,y as ve,F as Pe,a5 as Te}from"./index.f5899c35.js";import{u as $e,a as Ie}from"./use-dark.a1f34955.js";import{a as fe,r as je}from"./focus-manager.202af5b7.js";function De({validate:e,resetValidation:t,requiresQForm:u}){const i=qe(xe,!1);if(i!==!1){const{props:f,proxy:d}=J();Object.assign(d,{validate:e,resetValidation:t}),U(()=>f.disable,c=>{c===!0?(typeof t=="function"&&t(),i.unbindComponent(d)):i.bindComponent(d)}),le(()=>{f.disable!==!0&&i.bindComponent(d)}),ae(()=>{f.disable!==!0&&i.unbindComponent(d)})}else u===!0&&console.error("Parent QForm not found on useFormChild()!")}const me=/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,ge=/^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,he=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,ee=/^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,te=/^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,re={date:e=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),time:e=>/^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),fulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),timeOrFulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),hexColor:e=>me.test(e),hexaColor:e=>ge.test(e),hexOrHexaColor:e=>he.test(e),rgbColor:e=>ee.test(e),rgbaColor:e=>te.test(e),rgbOrRgbaColor:e=>ee.test(e)||te.test(e),hexOrRgbColor:e=>me.test(e)||ee.test(e),hexaOrRgbaColor:e=>ge.test(e)||te.test(e),anyColor:e=>he.test(e)||ee.test(e)||te.test(e)},ze=[!0,!1,"ondemand"],Ne={modelValue:{},error:{type:Boolean,default:null},errorMessage:String,noErrorIcon:Boolean,rules:Array,reactiveRules:Boolean,lazyRules:{type:[Boolean,String],validator:e=>ze.includes(e)}};function Le(e,t){const{props:u,proxy:i}=J(),f=L(!1),d=L(null),c=L(null);De({validate:V,resetValidation:v});let y=0,O;const R=S(()=>u.rules!==void 0&&u.rules!==null&&u.rules.length!==0),k=S(()=>u.disable!==!0&&R.value===!0),m=S(()=>u.error===!0||f.value===!0),K=S(()=>typeof u.errorMessage=="string"&&u.errorMessage.length!==0?u.errorMessage:d.value);U(()=>u.modelValue,()=>{z()}),U(()=>u.reactiveRules,j=>{j===!0?O===void 0&&(O=U(()=>u.rules,()=>{z(!0)})):O!==void 0&&(O(),O=void 0)},{immediate:!0}),U(e,j=>{j===!0?c.value===null&&(c.value=!1):c.value===!1&&(c.value=!0,k.value===!0&&u.lazyRules!=="ondemand"&&t.value===!1&&I())});function v(){y++,t.value=!1,c.value=null,f.value=!1,d.value=null,I.cancel()}function V(j=u.modelValue){if(k.value!==!0)return!0;const B=++y,F=t.value!==!0?()=>{c.value=!0}:()=>{},A=(C,x)=>{C===!0&&F(),f.value=C,d.value=x||null,t.value=!1},E=[];for(let C=0;C<u.rules.length;C++){const x=u.rules[C];let $;if(typeof x=="function"?$=x(j,re):typeof x=="string"&&re[x]!==void 0&&($=re[x](j)),$===!1||typeof $=="string")return A(!0,$),!1;$!==!0&&$!==void 0&&E.push($)}return E.length===0?(A(!1),!0):(t.value=!0,Promise.all(E).then(C=>{if(C===void 0||Array.isArray(C)===!1||C.length===0)return B===y&&A(!1),!0;const x=C.find($=>$===!1||typeof $=="string");return B===y&&A(x!==void 0,x),x===void 0},C=>(B===y&&(console.error(C),A(!0)),!1)))}function z(j){k.value===!0&&u.lazyRules!=="ondemand"&&(c.value===!0||u.lazyRules!==!0&&j!==!0)&&I()}const I=Fe(V,0);return ae(()=>{O!==void 0&&O(),I.cancel()}),Object.assign(i,{resetValidation:v,validate:V}),Ce(i,"hasError",()=>m.value),{isDirtyModel:c,hasRules:R,hasError:m,errorMessage:K,validate:V,resetValidation:v}}const be=/^on[A-Z]/;function Ue(e,t){const u={listeners:L({}),attributes:L({})};function i(){const f={},d={};for(const c in e)c!=="class"&&c!=="style"&&be.test(c)===!1&&(f[c]=e[c]);for(const c in t.props)be.test(c)===!0&&(d[c]=t.props[c]);u.attributes.value=f,u.listeners.value=d}return Ve(i),i(),u}let ue,ne=0;const D=new Array(256);for(let e=0;e<256;e++)D[e]=(e+256).toString(16).substring(1);const Ze=(()=>{const e=typeof crypto!="undefined"?crypto:typeof window!="undefined"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return t=>{const u=new Uint8Array(t);return e.getRandomValues(u),u}}return t=>{const u=[];for(let i=t;i>0;i--)u.push(Math.floor(Math.random()*256));return u}})(),pe=4096;function Ke(){(ue===void 0||ne+16>pe)&&(ne=0,ue=Ze(pe));const e=Array.prototype.slice.call(ue,ne,ne+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,D[e[0]]+D[e[1]]+D[e[2]]+D[e[3]]+"-"+D[e[4]]+D[e[5]]+"-"+D[e[6]]+D[e[7]]+"-"+D[e[8]]+D[e[9]]+"-"+D[e[10]]+D[e[11]]+D[e[12]]+D[e[13]]+D[e[14]]+D[e[15]]}function se(e){return e===void 0?`f_${Ke()}`:e}function de(e){return e!=null&&(""+e).length!==0}const He={...$e,...Ne,label:String,stackLabel:Boolean,hint:String,hideHint:Boolean,prefix:String,suffix:String,labelColor:String,color:String,bgColor:String,filled:Boolean,outlined:Boolean,borderless:Boolean,standout:[Boolean,String],square:Boolean,loading:Boolean,labelSlot:Boolean,bottomSlots:Boolean,hideBottomSpace:Boolean,rounded:Boolean,dense:Boolean,itemAligned:Boolean,counter:Boolean,clearable:Boolean,clearIcon:String,disable:Boolean,readonly:Boolean,autofocus:Boolean,for:String,maxlength:[Number,String]},Qe=["update:modelValue","clear","focus","blur","popupShow","popupHide"];function Ye(){const{props:e,attrs:t,proxy:u,vnode:i}=J();return{isDark:Ie(e,u.$q),editable:S(()=>e.disable!==!0&&e.readonly!==!0),innerLoading:L(!1),focused:L(!1),hasPopupOpen:!1,splitAttrs:Ue(t,i),targetUid:L(se(e.for)),rootRef:L(null),targetRef:L(null),controlRef:L(null)}}function We(e){const{props:t,emit:u,slots:i,attrs:f,proxy:d}=J(),{$q:c}=d;let y=null;e.hasValue===void 0&&(e.hasValue=S(()=>de(t.modelValue))),e.emitValue===void 0&&(e.emitValue=n=>{u("update:modelValue",n)}),e.controlEvents===void 0&&(e.controlEvents={onFocusin:a,onFocusout:l}),Object.assign(e,{clearValue:s,onControlFocusin:a,onControlFocusout:l,focus:x}),e.computedCounter===void 0&&(e.computedCounter=S(()=>{if(t.counter!==!1){const n=typeof t.modelValue=="string"||typeof t.modelValue=="number"?(""+t.modelValue).length:Array.isArray(t.modelValue)===!0?t.modelValue.length:0,p=t.maxlength!==void 0?t.maxlength:t.maxValues;return n+(p!==void 0?" / "+p:"")}}));const{isDirtyModel:O,hasRules:R,hasError:k,errorMessage:m,resetValidation:K}=Le(e.focused,e.innerLoading),v=e.floatingLabel!==void 0?S(()=>t.stackLabel===!0||e.focused.value===!0||e.floatingLabel.value===!0):S(()=>t.stackLabel===!0||e.focused.value===!0||e.hasValue.value===!0),V=S(()=>t.bottomSlots===!0||t.hint!==void 0||R.value===!0||t.counter===!0||t.error!==null),z=S(()=>t.filled===!0?"filled":t.outlined===!0?"outlined":t.borderless===!0?"borderless":t.standout?"standout":"standard"),I=S(()=>`q-field row no-wrap items-start q-field--${z.value}`+(e.fieldClass!==void 0?` ${e.fieldClass.value}`:"")+(t.rounded===!0?" q-field--rounded":"")+(t.square===!0?" q-field--square":"")+(v.value===!0?" q-field--float":"")+(B.value===!0?" q-field--labeled":"")+(t.dense===!0?" q-field--dense":"")+(t.itemAligned===!0?" q-field--item-aligned q-item-type":"")+(e.isDark.value===!0?" q-field--dark":"")+(e.getControl===void 0?" q-field--auto-height":"")+(e.focused.value===!0?" q-field--focused":"")+(k.value===!0?" q-field--error":"")+(k.value===!0||e.focused.value===!0?" q-field--highlighted":"")+(t.hideBottomSpace!==!0&&V.value===!0?" q-field--with-bottom":"")+(t.disable===!0?" q-field--disabled":t.readonly===!0?" q-field--readonly":"")),j=S(()=>"q-field__control relative-position row no-wrap"+(t.bgColor!==void 0?` bg-${t.bgColor}`:"")+(k.value===!0?" text-negative":typeof t.standout=="string"&&t.standout.length!==0&&e.focused.value===!0?` ${t.standout}`:t.color!==void 0?` text-${t.color}`:"")),B=S(()=>t.labelSlot===!0||t.label!==void 0),F=S(()=>"q-field__label no-pointer-events absolute ellipsis"+(t.labelColor!==void 0&&k.value!==!0?` text-${t.labelColor}`:"")),A=S(()=>({id:e.targetUid.value,editable:e.editable.value,focused:e.focused.value,floatingLabel:v.value,modelValue:t.modelValue,emitValue:e.emitValue})),E=S(()=>{const n={for:e.targetUid.value};return t.disable===!0?n["aria-disabled"]="true":t.readonly===!0&&(n["aria-readonly"]="true"),n});U(()=>t.for,n=>{e.targetUid.value=se(n)});function C(){const n=document.activeElement;let p=e.targetRef!==void 0&&e.targetRef.value;p&&(n===null||n.id!==e.targetUid.value)&&(p.hasAttribute("tabindex")===!0||(p=p.querySelector("[tabindex]")),p&&p!==n&&p.focus({preventScroll:!0}))}function x(){fe(C)}function $(){je(C);const n=document.activeElement;n!==null&&e.rootRef.value.contains(n)&&n.blur()}function a(n){y!==null&&(clearTimeout(y),y=null),e.editable.value===!0&&e.focused.value===!1&&(e.focused.value=!0,u("focus",n))}function l(n,p){y!==null&&clearTimeout(y),y=setTimeout(()=>{y=null,!(document.hasFocus()===!0&&(e.hasPopupOpen===!0||e.controlRef===void 0||e.controlRef.value===null||e.controlRef.value.contains(document.activeElement)!==!1))&&(e.focused.value===!0&&(e.focused.value=!1,u("blur",n)),p!==void 0&&p())})}function s(n){ie(n),c.platform.is.mobile!==!0?(e.targetRef!==void 0&&e.targetRef.value||e.rootRef.value).focus():e.rootRef.value.contains(document.activeElement)===!0&&document.activeElement.blur(),t.type==="file"&&(e.inputRef.value.value=null),u("update:modelValue",null),u("clear",t.modelValue),Y(()=>{K(),c.platform.is.mobile!==!0&&(O.value=!1)})}function r(){const n=[];return i.prepend!==void 0&&n.push(M("div",{class:"q-field__prepend q-field__marginal row no-wrap items-center",key:"prepend",onClick:X},i.prepend())),n.push(M("div",{class:"q-field__control-container col relative-position row no-wrap q-anchor--skip"},h())),k.value===!0&&t.noErrorIcon===!1&&n.push(q("error",[M(ce,{name:c.iconSet.field.error,color:"negative"})])),t.loading===!0||e.innerLoading.value===!0?n.push(q("inner-loading-append",i.loading!==void 0?i.loading():[M(Ee,{color:t.color})])):t.clearable===!0&&e.hasValue.value===!0&&e.editable.value===!0&&n.push(q("inner-clearable-append",[M(ce,{class:"q-field__focusable-action",tag:"button",name:t.clearIcon||c.iconSet.field.clear,tabindex:0,type:"button","aria-hidden":null,role:null,onClick:s})])),i.append!==void 0&&n.push(M("div",{class:"q-field__append q-field__marginal row no-wrap items-center",key:"append",onClick:X},i.append())),e.getInnerAppend!==void 0&&n.push(q("inner-append",e.getInnerAppend())),e.getControlChild!==void 0&&n.push(e.getControlChild()),n}function h(){const n=[];return t.prefix!==void 0&&t.prefix!==null&&n.push(M("div",{class:"q-field__prefix no-pointer-events row items-center"},t.prefix)),e.getShadowControl!==void 0&&e.hasShadow.value===!0&&n.push(e.getShadowControl()),e.getControl!==void 0?n.push(e.getControl()):i.rawControl!==void 0?n.push(i.rawControl()):i.control!==void 0&&n.push(M("div",{ref:e.targetRef,class:"q-field__native row",tabindex:-1,...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0},i.control(A.value))),B.value===!0&&n.push(M("div",{class:F.value},G(i.label,t.label))),t.suffix!==void 0&&t.suffix!==null&&n.push(M("div",{class:"q-field__suffix no-pointer-events row items-center"},t.suffix)),n.concat(G(i.default))}function g(){let n,p;k.value===!0?m.value!==null?(n=[M("div",{role:"alert"},m.value)],p=`q--slot-error-${m.value}`):(n=G(i.error),p="q--slot-error"):(t.hideHint!==!0||e.focused.value===!0)&&(t.hint!==void 0?(n=[M("div",t.hint)],p=`q--slot-hint-${t.hint}`):(n=G(i.hint),p="q--slot-hint"));const H=t.counter===!0||i.counter!==void 0;if(t.hideBottomSpace===!0&&H===!1&&n===void 0)return;const w=M("div",{key:p,class:"q-field__messages col"},n);return M("div",{class:"q-field__bottom row items-start q-field__bottom--"+(t.hideBottomSpace!==!0?"animated":"stale"),onClick:X},[t.hideBottomSpace===!0?w:M(_e,{name:"q-transition--field-message"},()=>w),H===!0?M("div",{class:"q-field__counter"},i.counter!==void 0?i.counter():e.computedCounter.value):null])}function q(n,p){return p===null?null:M("div",{key:n,class:"q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"},p)}let b=!1;return we(()=>{b=!0}),Se(()=>{b===!0&&t.autofocus===!0&&d.focus()}),le(()=>{Ae.value===!0&&t.for===void 0&&(e.targetUid.value=se()),t.autofocus===!0&&d.focus()}),ae(()=>{y!==null&&clearTimeout(y)}),Object.assign(d,{focus:x,blur:$}),function(){const p=e.getControl===void 0&&i.control===void 0?{...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0,...E.value}:E.value;return M("label",{ref:e.rootRef,class:[I.value,f.class],style:f.style,...p},[i.before!==void 0?M("div",{class:"q-field__before q-field__marginal row no-wrap items-center",onClick:X},i.before()):null,M("div",{class:"q-field__inner relative-position col self-stretch"},[M("div",{ref:e.controlRef,class:j.value,tabindex:-1,...e.controlEvents},r()),V.value===!0?g():null]),i.after!==void 0?M("div",{class:"q-field__after q-field__marginal row no-wrap items-center",onClick:X},i.after()):null])}}const ye={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},oe={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},Re=Object.keys(oe);Re.forEach(e=>{oe[e].regex=new RegExp(oe[e].pattern)});const Je=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+Re.join("")+"])|(.)","g"),ke=/[.*+?^${}()|[\]\\]/g,P=String.fromCharCode(1),Xe={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function Ge(e,t,u,i){let f,d,c,y,O,R;const k=L(null),m=L(v());function K(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}U(()=>e.type+e.autogrow,z),U(()=>e.mask,a=>{if(a!==void 0)I(m.value,!0);else{const l=x(m.value);z(),e.modelValue!==l&&t("update:modelValue",l)}}),U(()=>e.fillMask+e.reverseFillMask,()=>{k.value===!0&&I(m.value,!0)}),U(()=>e.unmaskedValue,()=>{k.value===!0&&I(m.value)});function v(){if(z(),k.value===!0){const a=E(x(e.modelValue));return e.fillMask!==!1?$(a):a}return e.modelValue}function V(a){if(a<f.length)return f.slice(-a);let l="",s=f;const r=s.indexOf(P);if(r>-1){for(let h=a-s.length;h>0;h--)l+=P;s=s.slice(0,r)+l+s.slice(r)}return s}function z(){if(k.value=e.mask!==void 0&&e.mask.length!==0&&K(),k.value===!1){y=void 0,f="",d="";return}const a=ye[e.mask]===void 0?e.mask:ye[e.mask],l=typeof e.fillMask=="string"&&e.fillMask.length!==0?e.fillMask.slice(0,1):"_",s=l.replace(ke,"\\$&"),r=[],h=[],g=[];let q=e.reverseFillMask===!0,b="",n="";a.replace(Je,(T,o,_,Q,Z)=>{if(Q!==void 0){const N=oe[Q];g.push(N),n=N.negate,q===!0&&(h.push("(?:"+n+"+)?("+N.pattern+"+)?(?:"+n+"+)?("+N.pattern+"+)?"),q=!1),h.push("(?:"+n+"+)?("+N.pattern+")?")}else if(_!==void 0)b="\\"+(_==="\\"?"":_),g.push(_),r.push("([^"+b+"]+)?"+b+"?");else{const N=o!==void 0?o:Z;b=N==="\\"?"\\\\\\\\":N.replace(ke,"\\\\$&"),g.push(N),r.push("([^"+b+"]+)?"+b+"?")}});const p=new RegExp("^"+r.join("")+"("+(b===""?".":"[^"+b+"]")+"+)?"+(b===""?"":"["+b+"]*")+"$"),H=h.length-1,w=h.map((T,o)=>o===0&&e.reverseFillMask===!0?new RegExp("^"+s+"*"+T):o===H?new RegExp("^"+T+"("+(n===""?".":n)+"+)?"+(e.reverseFillMask===!0?"$":s+"*")):new RegExp("^"+T));c=g,y=T=>{const o=p.exec(e.reverseFillMask===!0?T:T.slice(0,g.length+1));o!==null&&(T=o.slice(1).join(""));const _=[],Q=w.length;for(let Z=0,N=T;Z<Q;Z++){const W=w[Z].exec(N);if(W===null)break;N=N.slice(W.shift().length),_.push(...W)}return _.length!==0?_.join(""):T},f=g.map(T=>typeof T=="string"?T:P).join(""),d=f.split(P).join(l)}function I(a,l,s){const r=i.value,h=r.selectionEnd,g=r.value.length-h,q=x(a);l===!0&&z();const b=E(q),n=e.fillMask!==!1?$(b):b,p=m.value!==n;r.value!==n&&(r.value=n),p===!0&&(m.value=n),document.activeElement===r&&Y(()=>{if(n===d){const w=e.reverseFillMask===!0?d.length:0;r.setSelectionRange(w,w,"forward");return}if(s==="insertFromPaste"&&e.reverseFillMask!==!0){const w=r.selectionEnd;let T=h-1;for(let o=O;o<=T&&o<w;o++)f[o]!==P&&T++;B.right(r,T);return}if(["deleteContentBackward","deleteContentForward"].indexOf(s)>-1){const w=e.reverseFillMask===!0?h===0?n.length>b.length?1:0:Math.max(0,n.length-(n===d?0:Math.min(b.length,g)+1))+1:h;r.setSelectionRange(w,w,"forward");return}if(e.reverseFillMask===!0)if(p===!0){const w=Math.max(0,n.length-(n===d?0:Math.min(b.length,g+1)));w===1&&h===1?r.setSelectionRange(w,w,"forward"):B.rightReverse(r,w)}else{const w=n.length-g;r.setSelectionRange(w,w,"backward")}else if(p===!0){const w=Math.max(0,f.indexOf(P),Math.min(b.length,h)-1);B.right(r,w)}else{const w=h-1;B.right(r,w)}});const H=e.unmaskedValue===!0?x(n):n;String(e.modelValue)!==H&&u(H,!0)}function j(a,l,s){const r=E(x(a.value));l=Math.max(0,f.indexOf(P),Math.min(r.length,l)),O=l,a.setSelectionRange(l,s,"forward")}const B={left(a,l){const s=f.slice(l-1).indexOf(P)===-1;let r=Math.max(0,l-1);for(;r>=0;r--)if(f[r]===P){l=r,s===!0&&l++;break}if(r<0&&f[l]!==void 0&&f[l]!==P)return B.right(a,0);l>=0&&a.setSelectionRange(l,l,"backward")},right(a,l){const s=a.value.length;let r=Math.min(s,l+1);for(;r<=s;r++)if(f[r]===P){l=r;break}else f[r-1]===P&&(l=r);if(r>s&&f[l-1]!==void 0&&f[l-1]!==P)return B.left(a,s);a.setSelectionRange(l,l,"forward")},leftReverse(a,l){const s=V(a.value.length);let r=Math.max(0,l-1);for(;r>=0;r--)if(s[r-1]===P){l=r;break}else if(s[r]===P&&(l=r,r===0))break;if(r<0&&s[l]!==void 0&&s[l]!==P)return B.rightReverse(a,0);l>=0&&a.setSelectionRange(l,l,"backward")},rightReverse(a,l){const s=a.value.length,r=V(s),h=r.slice(0,l+1).indexOf(P)===-1;let g=Math.min(s,l+1);for(;g<=s;g++)if(r[g-1]===P){l=g,l>0&&h===!0&&l--;break}if(g>s&&r[l-1]!==void 0&&r[l-1]!==P)return B.leftReverse(a,s);a.setSelectionRange(l,l,"forward")}};function F(a){t("click",a),R=void 0}function A(a){if(t("keydown",a),Be(a)===!0||a.altKey===!0)return;const l=i.value,s=l.selectionStart,r=l.selectionEnd;if(a.shiftKey||(R=void 0),a.keyCode===37||a.keyCode===39){a.shiftKey&&R===void 0&&(R=l.selectionDirection==="forward"?s:r);const h=B[(a.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];if(a.preventDefault(),h(l,R===s?r:s),a.shiftKey){const g=l.selectionStart;l.setSelectionRange(Math.min(R,g),Math.max(R,g),"forward")}}else a.keyCode===8&&e.reverseFillMask!==!0&&s===r?(B.left(l,s),l.setSelectionRange(l.selectionStart,r,"backward")):a.keyCode===46&&e.reverseFillMask===!0&&s===r&&(B.rightReverse(l,r),l.setSelectionRange(s,l.selectionEnd,"forward"))}function E(a){if(a==null||a==="")return"";if(e.reverseFillMask===!0)return C(a);const l=c;let s=0,r="";for(let h=0;h<l.length;h++){const g=a[s],q=l[h];if(typeof q=="string")r+=q,g===q&&s++;else if(g!==void 0&&q.regex.test(g))r+=q.transform!==void 0?q.transform(g):g,s++;else return r}return r}function C(a){const l=c,s=f.indexOf(P);let r=a.length-1,h="";for(let g=l.length-1;g>=0&&r>-1;g--){const q=l[g];let b=a[r];if(typeof q=="string")h=q+h,b===q&&r--;else if(b!==void 0&&q.regex.test(b))do h=(q.transform!==void 0?q.transform(b):b)+h,r--,b=a[r];while(s===g&&b!==void 0&&q.regex.test(b));else return h}return h}function x(a){return typeof a!="string"||y===void 0?typeof a=="number"?y(""+a):a:y(a)}function $(a){return d.length-a.length<=0?a:e.reverseFillMask===!0&&a.length!==0?d.slice(0,-a.length)+a:a+d.slice(a.length)}return{innerValue:m,hasMask:k,moveCursorForPaste:j,updateMaskValue:I,onMaskedKeydown:A,onMaskedClick:F}}const et={name:String};function tt(e){return S(()=>e.name||e.for)}function nt(e,t){function u(){const i=e.modelValue;try{const f="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(i)===i&&("length"in i?Array.from(i):[i]).forEach(d=>{f.items.add(d)}),{files:f.files}}catch{return{files:void 0}}}return t===!0?S(()=>{if(e.type==="file")return u()}):S(u)}const ot=/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,lt=/[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,at=/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,rt=/[a-z0-9_ -]$/i;function ut(e){return function(u){if(u.type==="compositionend"||u.type==="change"){if(u.target.qComposing!==!0)return;u.target.qComposing=!1,e(u)}else u.type==="compositionupdate"&&u.target.qComposing!==!0&&typeof u.data=="string"&&(Oe.is.firefox===!0?rt.test(u.data)===!1:ot.test(u.data)===!0||lt.test(u.data)===!0||at.test(u.data)===!0)===!0&&(u.target.qComposing=!0)}}var ft=Me({name:"QInput",inheritAttrs:!1,props:{...He,...Xe,...et,modelValue:{required:!1},shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...Qe,"paste","change","keydown","click","animationend"],setup(e,{emit:t,attrs:u}){const{proxy:i}=J(),{$q:f}=i,d={};let c=NaN,y,O,R=null,k;const m=L(null),K=tt(e),{innerValue:v,hasMask:V,moveCursorForPaste:z,updateMaskValue:I,onMaskedKeydown:j,onMaskedClick:B}=Ge(e,t,b,m),F=nt(e,!0),A=S(()=>de(v.value)),E=ut(g),C=Ye(),x=S(()=>e.type==="textarea"||e.autogrow===!0),$=S(()=>x.value===!0||["text","search","url","tel","password"].includes(e.type)),a=S(()=>{const o={...C.splitAttrs.listeners.value,onInput:g,onPaste:h,onChange:p,onBlur:H,onFocus:ve};return o.onCompositionstart=o.onCompositionupdate=o.onCompositionend=E,V.value===!0&&(o.onKeydown=j,o.onClick=B),e.autogrow===!0&&(o.onAnimationend=q),o}),l=S(()=>{const o={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:K.value,...C.splitAttrs.attributes.value,id:C.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return x.value===!1&&(o.type=e.type),e.autogrow===!0&&(o.rows=1),o});U(()=>e.type,()=>{m.value&&(m.value.value=e.modelValue)}),U(()=>e.modelValue,o=>{if(V.value===!0){if(O===!0&&(O=!1,String(o)===c))return;I(o)}else v.value!==o&&(v.value=o,e.type==="number"&&d.hasOwnProperty("value")===!0&&(y===!0?y=!1:delete d.value));e.autogrow===!0&&Y(n)}),U(()=>e.autogrow,o=>{o===!0?Y(n):m.value!==null&&u.rows>0&&(m.value.style.height="auto")}),U(()=>e.dense,()=>{e.autogrow===!0&&Y(n)});function s(){fe(()=>{const o=document.activeElement;m.value!==null&&m.value!==o&&(o===null||o.id!==C.targetUid.value)&&m.value.focus({preventScroll:!0})})}function r(){m.value!==null&&m.value.select()}function h(o){if(V.value===!0&&e.reverseFillMask!==!0){const _=o.target;z(_,_.selectionStart,_.selectionEnd)}t("paste",o)}function g(o){if(!o||!o.target)return;if(e.type==="file"){t("update:modelValue",o.target.files);return}const _=o.target.value;if(o.target.qComposing===!0){d.value=_;return}if(V.value===!0)I(_,!1,o.inputType);else if(b(_),$.value===!0&&o.target===document.activeElement){const{selectionStart:Q,selectionEnd:Z}=o.target;Q!==void 0&&Z!==void 0&&Y(()=>{o.target===document.activeElement&&_.indexOf(o.target.value)===0&&o.target.setSelectionRange(Q,Z)})}e.autogrow===!0&&n()}function q(o){t("animationend",o),n()}function b(o,_){k=()=>{R=null,e.type!=="number"&&d.hasOwnProperty("value")===!0&&delete d.value,e.modelValue!==o&&c!==o&&(c=o,_===!0&&(O=!0),t("update:modelValue",o),Y(()=>{c===o&&(c=NaN)})),k=void 0},e.type==="number"&&(y=!0,d.value=o),e.debounce!==void 0?(R!==null&&clearTimeout(R),d.value=o,R=setTimeout(k,e.debounce)):k()}function n(){requestAnimationFrame(()=>{const o=m.value;if(o!==null){const _=o.parentNode.style,{scrollTop:Q}=o,{overflowY:Z,maxHeight:N}=f.platform.is.firefox===!0?{}:window.getComputedStyle(o),W=Z!==void 0&&Z!=="scroll";W===!0&&(o.style.overflowY="hidden"),_.marginBottom=o.scrollHeight-1+"px",o.style.height="1px",o.style.height=o.scrollHeight+"px",W===!0&&(o.style.overflowY=parseInt(N,10)<o.scrollHeight?"auto":"hidden"),_.marginBottom="",o.scrollTop=Q}})}function p(o){E(o),R!==null&&(clearTimeout(R),R=null),k!==void 0&&k(),t("change",o.target.value)}function H(o){o!==void 0&&ve(o),R!==null&&(clearTimeout(R),R=null),k!==void 0&&k(),y=!1,O=!1,delete d.value,e.type!=="file"&&setTimeout(()=>{m.value!==null&&(m.value.value=v.value!==void 0?v.value:"")})}function w(){return d.hasOwnProperty("value")===!0?d.value:v.value!==void 0?v.value:""}ae(()=>{H()}),le(()=>{e.autogrow===!0&&n()}),Object.assign(C,{innerValue:v,fieldClass:S(()=>`q-${x.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:S(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length!==0),inputRef:m,emitValue:b,hasValue:A,floatingLabel:S(()=>A.value===!0&&(e.type!=="number"||isNaN(v.value)===!1)||de(e.displayValue)),getControl:()=>M(x.value===!0?"textarea":"input",{ref:m,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...l.value,...a.value,...e.type!=="file"?{value:w()}:F.value}),getShadowControl:()=>M("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(x.value===!0?"":" text-no-wrap")},[M("span",{class:"invisible"},w()),M("span",e.shadowText)])});const T=We(C);return Object.assign(i,{focus:s,select:r,getNativeElement:()=>m.value}),Ce(i,"nativeEl",()=>m.value),T}}),ct=Me({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(e,{slots:t,emit:u}){const i=J(),f=L(null);let d=0;const c=[];function y(v){const V=typeof v=="boolean"?v:e.noErrorFocus!==!0,z=++d,I=(F,A)=>{u("validation"+(F===!0?"Success":"Error"),A)},j=F=>{const A=F.validate();return typeof A.then=="function"?A.then(E=>({valid:E,comp:F}),E=>({valid:!1,comp:F,err:E})):Promise.resolve({valid:A,comp:F})};return(e.greedy===!0?Promise.all(c.map(j)).then(F=>F.filter(A=>A.valid!==!0)):c.reduce((F,A)=>F.then(()=>j(A).then(E=>{if(E.valid===!1)return Promise.reject(E)})),Promise.resolve()).catch(F=>[F])).then(F=>{if(F===void 0||F.length===0)return z===d&&I(!0),!0;if(z===d){const{comp:A,err:E}=F[0];if(E!==void 0&&console.error(E),I(!1,A),V===!0){const C=F.find(({comp:x})=>typeof x.focus=="function"&&Te(x.$)===!1);C!==void 0&&C.comp.focus()}}return!1})}function O(){d++,c.forEach(v=>{typeof v.resetValidation=="function"&&v.resetValidation()})}function R(v){v!==void 0&&ie(v);const V=d+1;y().then(z=>{V===d&&z===!0&&(e.onSubmit!==void 0?u("submit",v):v!==void 0&&v.target!==void 0&&typeof v.target.submit=="function"&&v.target.submit())})}function k(v){v!==void 0&&ie(v),u("reset"),Y(()=>{O(),e.autofocus===!0&&e.noResetFocus!==!0&&m()})}function m(){fe(()=>{if(f.value===null)return;const v=f.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||f.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||f.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(f.value.querySelectorAll("[tabindex]"),V=>V.tabIndex>-1);v!=null&&v.focus({preventScroll:!0})})}Pe(xe,{bindComponent(v){c.push(v)},unbindComponent(v){const V=c.indexOf(v);V>-1&&c.splice(V,1)}});let K=!1;return we(()=>{K=!0}),Se(()=>{K===!0&&e.autofocus===!0&&m()}),le(()=>{e.autofocus===!0&&m()}),Object.assign(i.proxy,{validate:y,resetValidation:O,submit:R,reset:k,focus:m,getValidationComponents:()=>c}),()=>M("form",{class:"q-form",ref:f,onSubmit:R,onReset:k},G(t.default))}});export{ct as Q,ft as a};
