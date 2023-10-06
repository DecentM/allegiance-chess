import{Q as _,a as y}from"./QCard.74c18b57.js";import{Q as v}from"./QSeparator.556bfaa1.js";import{Q as m,a as g}from"./QForm.1cd2fb2a.js";import{_ as k,A as x,r as n,B as V,C as I,D as d,G as o,Q,M as w,ak as S,al as C,N as s,H as i}from"./index.602bb614.js";import{u as q}from"./notify.a8ee129a.js";import{a3 as B}from"./exports.a5d07a43.js";import{f as N}from"./sdk.157cf2d3.js";import"./use-dark.e969e9a4.js";import"./uid.a41eb200.js";import"./focus-manager.202af5b7.js";import"./use-quasar.4a23ba96.js";const c=r=>(S("data-v-6c64398c"),r=r(),C(),r),U=c(()=>s("div",{class:"text-body1 q-mb-md"},[i(" Thanks for playing my Chess variant!"),s("br"),i(" Since you're here, I assume you'd like to tell me your opinion, or let me know of a bug you found. ")],-1)),Y=c(()=>s("div",{class:"text-body1 q-mb-md"},[i(" If you're a technical person with a GitHub account, you should be able to find the repository based on my username (DecentM) and repository name (allegiance-chess). Please only report crashes or bugs there!"),s("br"),i(" Otherwise, this page is the best way to provide feedback and ideas about the site, and the game. You can also use it for bug reports if GitHub isn't your cup of tea. ")],-1)),z=c(()=>s("div",{class:"text-body1"}," If you'd like to allow me to contact you about your feedback, please enter your e-mail address. ",-1)),F=x({__name:"feedback-page",setup(r){const t=n(""),l=n(""),u=n(""),p=n(null),{notify:b}=q(),h=()=>{var e;const f=B("User Feedback");N({event_id:f,name:t.value,email:l.value,comments:u.value}),t.value="",l.value="",u.value="",b({icon:"outgoing_mail",message:"Your feedback is on its way!"}),(e=p.value)==null||e.reset()};return(f,e)=>(V(),I(_,{flat:"",class:"full-width q-mb-md"},{default:d(()=>[o(y,{class:"feedback-explanation"},{default:d(()=>[U,Y,z]),_:1}),o(v),o(w(g),{onSubmit:h,ref_key:"form",ref:p},{default:d(()=>[o(y,{class:"q-gutter-sm"},{default:d(()=>[o(m,{filled:"",color:"secondary",modelValue:t.value,"onUpdate:modelValue":e[0]||(e[0]=a=>t.value=a),counter:"",label:"Your name (optional)","lazy-rules":"",maxlength:32},null,8,["modelValue"]),o(m,{filled:"",color:"secondary",modelValue:l.value,"onUpdate:modelValue":e[1]||(e[1]=a=>l.value=a),counter:"",type:"email",label:"E-mail address (optional)",hint:"If you provide an e-mail address, I might contact you if your feedback calls for it","lazy-rules":"",maxlength:64-t.value.length},null,8,["modelValue","maxlength"]),o(m,{filled:"",color:"secondary",modelValue:u.value,"onUpdate:modelValue":e[2]||(e[2]=a=>u.value=a),counter:"",type:"textarea",label:"Your message","lazy-rules":"",maxlength:1024-t.value.length-l.value.length,rules:[a=>a&&a.length>0||"This field is required"]},null,8,["modelValue","maxlength","rules"]),o(Q,{label:"Send",icon:"send",type:"submit",color:"primary"})]),_:1})]),_:1},512)]),_:1}))}});var K=k(F,[["__scopeId","data-v-6c64398c"]]);export{K as default};
//# sourceMappingURL=feedback-page.42eab515.js.map
