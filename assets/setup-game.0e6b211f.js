import{Q as n}from"./QSeparator.25599c84.js";import{_ as q,A as x,r as C,a as Q,k,B as S,C as j,D as o,G as e,O as t,Q as p,aj as B,ak as T}from"./index.28a81f27.js";import{Q as i,a as c}from"./QCard.3efeaf1d.js";import{a as V,Q as f}from"./QForm.7ecd9a87.js";import{u as N}from"./use-quasar.a95f9029.js";import{H as A}from"./hex.e969b211.js";import"./use-dark.16bcfb0f.js";import"./uid.a41eb200.js";import"./focus-manager.202af5b7.js";const s=l=>(B("data-v-5a93c0b6"),l=l(),T(),l),G={class:"row items-center full-height space"},H={class:"col-md-6 col-sm-12 text-center q-pa-md"},U=s(()=>t("h4",{class:"text-h4"},"Pen-pal mode",-1)),E=s(()=>t("span",null," The game will run locally, but you can send the page URL to your opponent to let them make a move ",-1)),z={class:"row justify-end"},F={class:"col-md-6 col-sm-12 text-center q-pa-md"},J=s(()=>t("h4",{class:"text-h4"},"Play against a bot",-1)),L=s(()=>t("span",null," The game will run locally, with a (bad) bot as your opponent ",-1)),M={class:"row justify-end"},O={class:"row items-center full-height space"},R={class:"col-md-6 col-sm-12 text-center q-pa-md"},Y=s(()=>t("h4",{class:"text-h4"},"Join a game",-1)),K=s(()=>t("span",null,` Ask your opponent to visit this page, and send you their Peer ID. Paste your opponent's Peer ID in this field, and click "Connect" or press enter to begin the game `,-1)),W={class:"row justify-end"},X=s(()=>t("h4",{class:"text-h4"},"Host a game",-1)),Z=s(()=>t("span",null," Send your opponent your Peer ID. Ask your opponent to visit this page and paste your Peer ID into the field on the left on their side ",-1)),$={class:"row justify-end"},ee=x({__name:"setup-game",props:{connection:{}},setup(l){const r=l,d=C(""),h=a=>{if(!a)return"You must specify a Peer ID to connect with";const u=A.hexToUtf8(a),[m,b,I,P,D,...w]=u.split("-");return w.length!==0?"Peer ID invalid, too much data":m.length!==8?"Peer ID invalid, part 1 has invalid length":b.length!==4?"Peer ID invalid, part 2 has invalid length":I.length!==4?"Peer ID invalid, part 3 has invalid length":P.length!==4?"Peer ID invalid, part 4 has invalid length":D.length!==12?"Peer ID invalid, part 5 has invalid length":a===r.connection.peerId.value?"This is your own Peer ID":!0},v=()=>[r.connection.connect(d.value)],y=Q(()=>h(d.value)===!0),_=N(),g=()=>{try{if(!r.connection.peerId.value)throw new Error("Peer ID missing");navigator.clipboard.writeText(r.connection.peerId.value),_.notify({icon:"content_copy",message:"Peer ID copied to clipboard",timeout:4e3,position:"bottom-right"})}catch(a){a instanceof Error&&_.notify({icon:"close",iconColor:"red",message:"Cannot copy to clipboard",caption:a.message,timeout:4e3,position:"bottom-right"})}};return k(()=>{r.connection.disconnect()}),(a,u)=>(S(),j(i,{flat:""},{default:o(()=>[e(c,{vertical:""},{default:o(()=>[t("div",G,[t("div",H,[e(i,{flat:""},{default:o(()=>[e(c,null,{default:o(()=>[U,e(n,{class:"q-mb-md"}),E,e(n,{class:"q-mb-md q-mt-md"}),t("div",z,[e(p,{to:"/play/pen-pal",icon:"mail",label:"New game",color:"primary"})])]),_:1})]),_:1})]),t("div",F,[e(i,{flat:""},{default:o(()=>[e(c,null,{default:o(()=>[J,e(n,{class:"q-mb-md"}),L,e(n,{class:"q-mb-md q-mt-md"}),t("div",M,[e(p,{to:"/play/bot",icon:"precision_manufacturing",label:"New game",color:"primary"})])]),_:1})]),_:1})])]),t("div",O,[t("div",R,[e(i,{flat:""},{default:o(()=>[e(c,null,{default:o(()=>[e(V,{onSubmit:v},{default:o(()=>[Y,e(n,{class:"q-mb-md"}),K,e(n,{class:"q-mb-md q-mt-md"}),e(f,{filled:"",color:"secondary",modelValue:d.value,"onUpdate:modelValue":u[0]||(u[0]=m=>d.value=m),label:"Peer ID *",hint:"Paste your opponent's Peer ID here","lazy-rules":"",rules:[h]},null,8,["modelValue","rules"]),t("div",W,[e(p,{icon:"hub",label:"Connect",type:"submit",color:"primary",disable:!y.value},null,8,["disable"])])]),_:1})]),_:1})]),_:1})]),e(i,{flat:"",class:"col-md-6 col-sm-12 text-center q-pa-md"},{default:o(()=>[e(c,null,{default:o(()=>[X,e(n,{class:"q-mb-md"}),Z,e(n,{class:"q-mb-md q-mt-md"}),e(f,{filled:"",color:"secondary","model-value":a.connection.peerId.value,label:"Peer ID *",hint:"Copy this Peer ID and send it to your opponent",readonly:"",loading:!a.connection.peerId.value},null,8,["model-value","loading"]),t("div",$,[e(p,{label:"Copy",color:"primary",icon:"content_copy",onClick:g})])]),_:1})]),_:1})])]),_:1})]),_:1}))}});var de=q(ee,[["__scopeId","data-v-5a93c0b6"]]);export{de as default};
//# sourceMappingURL=setup-game.0e6b211f.js.map