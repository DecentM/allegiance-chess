import{Q as y,a as p,b as w}from"./QCard.ccac548e.js";import{a as f,c as G,r as h,w as V,k as O,o as W,h as c,ae as Y,e as J,af as U,A as X,B as K,E as Z,G as t,D as i,J as ee,N as a,u as S,H as s,M as C,ag as A}from"./index.1e21fab5.js";import{Q as te,b as R,a as k}from"./QList.a3142a99.js";import{C as ae,Q as q}from"./chess-piece.376579ec.js";import"./use-dark.29e284eb.js";const le={ratio:[String,Number]};function ie(e,u){return f(()=>{const d=Number(e.ratio||(u!==void 0?u.value:void 0));return isNaN(d)!==!0&&d>0?{paddingBottom:`${100/d}%`}:null})}const ne=16/9;var N=G({name:"QImg",props:{...le,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:ne},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:u,emit:d}){const F=h(e.initialRatio),Q=ie(e,F);let n=null,b=!1;const o=[h(null),h(x())],r=h(0),g=h(!1),m=h(!1),B=f(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),M=f(()=>({width:e.width,height:e.height})),D=f(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),P=f(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));V(()=>T(),E);function T(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function x(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function E(l){n!==null&&(clearTimeout(n),n=null),m.value=!1,l===null?(g.value=!1,o[r.value^1].value=x()):g.value=!0,o[r.value].value=l}function j({target:l}){b!==!0&&(n!==null&&(clearTimeout(n),n=null),F.value=l.naturalHeight===0?.5:l.naturalWidth/l.naturalHeight,I(l,1))}function I(l,_){b===!0||_===1e3||(l.complete===!0?H(l):n=setTimeout(()=>{n=null,I(l,_+1)},50))}function H(l){b!==!0&&(r.value=r.value^1,o[r.value].value=null,g.value=!1,m.value=!1,d("load",l.currentSrc||l.src))}function L(l){n!==null&&(clearTimeout(n),n=null),g.value=!1,m.value=!0,o[r.value].value=null,o[r.value^1].value=x(),d("error",l)}function z(l){const _=o[l].value,v={key:"img_"+l,class:D.value,style:P.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,..._};return r.value===l?(v.class+=" q-img__image--waiting",Object.assign(v,{onLoad:j,onError:L})):v.class+=" q-img__image--loaded",c("div",{class:"q-img__container absolute-full",key:"img"+l},c("img",v))}function $(){return g.value!==!0?c("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},J(u[m.value===!0?"error":"default"])):c("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},u.loading!==void 0?u.loading():e.noSpinner===!0?void 0:[c(U,{color:e.spinnerColor,size:e.spinnerSize})])}return O(()=>{E(T())}),W(()=>{b=!0,n!==null&&(clearTimeout(n),n=null)}),()=>{const l=[];return Q.value!==null&&l.push(c("div",{key:"filler",style:Q.value})),m.value!==!0&&(o[0].value!==null&&l.push(z(0)),o[1].value!==null&&l.push(z(1))),l.push(c(Y,{name:"q-transition--fade"},$)),c("div",{class:B.value,style:M.value,role:"img","aria-label":e.alt},l)}}}),se="/assets/tutorial-1.b3b74247.png",oe="/assets/tutorial-2.88289e50.png",re="/assets/tutorial-3.f5b15ff3.png";const ce=a("div",{class:"text-h6"},"Introduction",-1),ue=a("div",{class:"text-body1 q-mb-md"},[s(" Allegiance Chess is a Chess variant where you can essentially brainwash your opponents' pieces. Instead of being black or white, each piece has an allegiance. At the beginning, pieces start with a pure black or white allegiance. During the course of a game, a piece can be manipulated into switching sides, if your opponent decides to challenge a piece of yours. "),a("br"),s(" From the original pure state, pieces transition into a partial state where you still control them, but one more step and they switch sides. You can't change the allegiance of your own pieces. ")],-1),de=a("div",{class:"text-body1 q-mb-md"}," During each turn, players can choose to challenge the allegiance of a piece instead of capturing it. This causes no movement, but the allegiance of the challenged piece shifts by one, towards the colour of the player making the move. ",-1),he=a("div",{class:"text-body1 q-mb-md"},' For example, if white challenges a black bishop (allegiance zero), then the targeted bishop will change its allegiance to one. Meaning that if it gets challenged one more time, it will switch sides to white. Since players can only challenge enemy pieces, once a piece leaves its "pure" allegiance, it will never go back to it. ',-1),ge={class:"text-body1 q-mb-md"},me=a("div",{class:"text-h6"},"How to play",-1),fe=a("div",{class:"text-body1 q-mb-md"},[s(" All normal rules of Chess apply: "),a("ul",null,[a("li",null,"Castling"),a("li",null,"En-passant"),a("li",null,"Promotion")])],-1),be=a("div",{class:"text-body1 q-mb-md"}," When your piece would be able to take a piece, you'll see two options. If you choose to take (X) the piece, it counts as a normal capture. If you choose to challenge (>) the piece, both yours and the challenged piece stays in place, and the challenged piece's allegiance will change towards your side. ",-1),_e={class:"row justify-center"},ve=a("div",{class:"text-h6"},"Technical details",-1),ye=a("div",{class:"text-body1 q-mb-md"},[s(" This game is implemented in Typescript from scratch, so there may be completely bame breaking bugs. You may open an issue on the issue tracker if you encounter bugs like this (but not limited to): "),a("ul",null,[a("li",null,"Ability to make illegal moves"),a("li",null,"Inability to castle, promote, challenge, or capture"),a("li",null,"Inability to move at all")])],-1),pe=a("div",{class:"text-body1 q-mb-md"},[s(' FEN has been extended to support storing allegiance information. The Allegiance FEN (AFEN) string is a superset of FEN, with the added ">" character, which indicates that the piece before the character has a non-pure allegiance. For example, "N>" means that the knight has an allegiance of 2 (white minus one), while "b>" means that the bishop has the allegiance of 1 (black plus one). '),a("br"),s(" Because AFEN is a superset, any FEN string is valid AFEN, but an AFEN string might not be valid FEN. ")],-1),we=a("div",{class:"text-body1 q-mb-md"},' Additionally, the standard Chess notation is extended in the same way. The ">" character signals a challenge. For example, where "Rxd2" would mean Rook takes on D2, "R>d2" means the Rook challenges the piece on D2. Neither of them move, but the opposing piece on D2 changes its allegiance by one, towards the challenging player. ',-1),Se=a("div",{class:"text-h6"},"Recognitions",-1),ke=a("span",null,"Michael Richins on Pictogrammers",-1),qe=a("br",null,null,-1),xe=a("span",null,"Modified to have allegiance indications",-1),Ce=a("span",null,"Google",-1),Ie=X({__name:"index-page",setup(e){return(u,d)=>(K(),Z(ee,null,[t(y,{flat:"",class:"full-width q-mb-md"},{default:i(()=>[t(p,null,{default:i(()=>[ce,t(w,{class:"q-mb-md"}),ue,de,he,a("div",ge,[t(S,{size:"xl",class:"col-2",name:"arrow_left"}),s(' Click "Play" on the left sidebar to begin, or read on for more. ')])]),_:1})]),_:1}),t(y,{flat:"",class:"full-width frosted-backdrop q-mb-md"},{default:i(()=>[t(p,null,{default:i(()=>[me,t(w,{class:"q-mb-md"}),fe,be,a("div",_e,[t(N,{class:"col-2",src:C(se)},null,8,["src"]),t(S,{size:"xl",class:"col-1",name:"arrow_right"}),t(N,{class:"col-2",src:C(oe)},null,8,["src"]),t(S,{size:"xl",class:"col-1",name:"arrow_right"}),t(N,{class:"col-2",src:C(re)},null,8,["src"])])]),_:1})]),_:1}),t(y,{flat:"",class:"full-width frosted-backdrop q-mb-md"},{default:i(()=>[t(p,null,{default:i(()=>[ve,t(w,{class:"q-mb-md"}),ye,pe,we]),_:1})]),_:1}),t(y,{flat:"",class:"full-width frosted-backdrop q-mb-md"},{default:i(()=>[t(p,null,{default:i(()=>[Se,t(w,{class:"q-mb-md"}),t(te,null,{default:i(()=>[t(R,{clickable:"",href:"https://pictogrammers.com/contributor/MrGrigri/",target:"_blank",rel:"noopener"},{default:i(()=>[t(k,{avatar:""},{default:i(()=>[t(A,{rounded:""},{default:i(()=>[t(ae,{piece:"Q",allegiance:3,size:40})]),_:1})]),_:1}),t(k,null,{default:i(()=>[t(q,null,{default:i(()=>[s(" Chess pieces ")]),_:1}),t(q,{caption:"",lines:2},{default:i(()=>[ke,qe,xe]),_:1})]),_:1})]),_:1}),t(R,{clickable:"",href:"https://m2.material.io/design/sound/sound-resources.html",target:"_blank",rel:"noopener"},{default:i(()=>[t(k,{avatar:""},{default:i(()=>[t(A,{rounded:""},{default:i(()=>[t(S,{name:"music_note"})]),_:1})]),_:1}),t(k,null,{default:i(()=>[t(q,null,{default:i(()=>[s(" Move sounds ")]),_:1}),t(q,{caption:"",lines:1},{default:i(()=>[Ce]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})],64))}});export{Ie as default};
//# sourceMappingURL=index-page.0a264aa9.js.map
