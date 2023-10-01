import{c as b,a as l,h as $,e as I,M as d,N as s,Q as i,ac as t,ae as c,_ as u,af as f,ag as m,W as L,ah as C,O as _,a0 as h}from"./index.9b88f190.js";import{a as z,P as y}from"./board.8fb46aec.js";var Ie=b({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:r}){const a=l(()=>parseInt(e.lines,10)),o=l(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(a.value===1?" ellipsis":"")),n=l(()=>e.lines!==void 0&&a.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":a.value}:null);return()=>$("div",{style:n.value,class:o.value},I(r.default))}});const w=e=>(f("data-v-0af0cd9c"),e=e(),m(),e),x={xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 46 46"},j={opacity:"1",fill:"none","fill-rule":"evenodd","fill-opacity":"1",stroke:"#000000","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1",transform:"translate(0,0.6)"},B=w(()=>t("path",{d:"M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"},null,-1)),A=w(()=>t("path",{d:"M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"},null,-1)),S=w(()=>t("path",{d:"M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"},null,-1)),q=[B,A,S],N=d({__name:"bishop-icon",props:{variant:{},colour:{}},setup(e){const r=e,a=l(()=>({primary:r.variant==="white"?"#000000":"#FFFFFF",secondary:r.variant==="white"?"#FFFFFF":"#000000"}));return(o,n)=>(s(),i("svg",x,[t("g",j,[t("g",{style:c([{fill:o.colour},{stroke:"#000000","stroke-linecap":"butt"}])},q,4),t("path",{d:"M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18",style:c([{fill:"none","stroke-linejoin":"miter"},{stroke:a.value.primary}])},null,4)])]))}});var Q=u(N,[["__scopeId","data-v-0af0cd9c"]]);const g=e=>(f("data-v-5296c147"),e=e(),m(),e),P={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 46 46"},K=["stroke-width"],V=g(()=>t("path",{d:"M 22.5,11.63 L 22.5,6",style:{fill:"none","stroke-linejoin":"miter"},stroke:"#000000"},null,-1)),G=["stroke"],R=g(()=>t("path",{d:"M 20,8 L 25,8",style:{fill:"none","stroke-linejoin":"miter"},stroke:"#000000"},null,-1)),W=["stroke"],D=d({__name:"king-icon",props:{variant:{},colour:{}},setup(e){const r=e,a=l(()=>({primary:r.variant==="white"?"#000000":"#FFFFFF",secondary:r.variant==="white"?"#FFFFFF":"#000000"}));return(o,n)=>(s(),i("svg",P,[t("g",{fill:"none","fill-opacity":"1","fill-rule":"evenodd",stroke:"#000000","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":o.variant==="white"?1.5:1.1,"stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"},[V,t("path",{d:"M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25",style:c([{fill:o.colour},{"fill-opacity":"1","stroke-linecap":"butt","stroke-linejoin":"miter"}])},null,4),t("path",{d:"M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37",stroke:a.value.primary,style:c({fill:o.colour})},null,12,G),R,t("path",{d:"M 12.5,30 C 18,27 27,27 32.5,30 M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5 M 12.5,37 C 18,34 27,34 32.5,37",style:{fill:"none"},stroke:a.value.primary},null,8,W)],8,K)]))}});var E=u(D,[["__scopeId","data-v-5296c147"]]);const H={xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 46 46"},O=["stroke"],J=["stroke","fill"],T=["stroke"],U=d({__name:"knight-icon",props:{variant:{},colour:{}},setup(e){const r=e,a=l(()=>({primary:r.variant==="white"?"#000000":"#FFFFFF",secondary:r.variant==="white"?"#FFFFFF":"#000000"}));return(o,n)=>(s(),i("svg",H,[t("g",{opacity:"1",fill:"none","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1",stroke:a.value.primary,transform:"translate(0,0.3)"},[t("path",{d:"M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18",stroke:"#000000",style:c({fill:o.colour})},null,4),t("path",{d:"M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10",stroke:"#000000",style:c({fill:o.colour})},null,4),t("path",{d:"M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z",stroke:a.value.primary,fill:a.value.primary},null,8,J),t("path",{d:"M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z",transform:"matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)",stroke:a.value.primary},null,8,T)],8,O)]))}});var X=u(U,[["__scopeId","data-v-3c89697a"]]);const Y={xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 46 46"},Z=d({__name:"pawn-icon",props:{variant:{},colour:{}},setup(e){return(r,a)=>(s(),i("svg",Y,[t("path",{d:`m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5
    16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H
    34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59
    27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4
    -4,-4 z`,style:c([{fill:r.colour},{opacity:"1","fill-opacity":"1","fill-rule":"nonzero",stroke:"#000000","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"miter","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1"}])},null,4)]))}});var ee=u(Z,[["__scopeId","data-v-f20361a2"]]);const v=e=>(f("data-v-638aa7b4"),e=e(),m(),e),te={xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 46 46"},oe=C('<circle cx="6" cy="12" r="2" data-v-638aa7b4></circle><circle cx="14" cy="9" r="2" data-v-638aa7b4></circle><circle cx="22.5" cy="8" r="2" data-v-638aa7b4></circle><circle cx="31" cy="9" r="2" data-v-638aa7b4></circle><circle cx="39" cy="12" r="2" data-v-638aa7b4></circle><path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z" data-v-638aa7b4></path><path d="m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1,2.5 -1,2.5 -1.5,1.5 0,2.5 0,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z" data-v-638aa7b4></path><path d="M 11.5,30 C 15,29 30,29 33.5,30" data-v-638aa7b4></path>',8),ae={key:0,d:"M 12,33.5 C 18,32.5 27,32.5 33,33.5"},re=v(()=>t("path",{d:"m 12,33.5 c 6,-1 15,-1 21,0"},null,-1)),se=v(()=>t("path",{d:"M 11,38.5 A 35,35 1 0 0 34,38.5"},null,-1)),ne=["stroke"],ie=v(()=>t("path",{d:"M 11,29 A 35,35 1 0 1 34,29"},null,-1)),le=v(()=>t("path",{d:"M 12.5,31.5 L 32.5,31.5"},null,-1)),ce=v(()=>t("path",{d:"M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"},null,-1)),pe=v(()=>t("path",{d:"M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"},null,-1)),de=[ie,le,ce,pe],ue=d({__name:"queen-icon",props:{variant:{},colour:{}},setup(e){const r=e,a=l(()=>({primary:r.variant==="white"?"#000000":"#FFFFFF",secondary:r.variant==="white"?"#FFFFFF":"#000000"}));return(o,n)=>(s(),i("svg",te,[t("g",{style:c([{fill:o.colour},{"stroke-width":"1.5","stroke-linejoin":"round"}]),stroke:"#000000"},[oe,o.variant==="white"?(s(),i("path",ae)):(s(),i(L,{key:1},[re,se,t("g",{stroke:a.value.primary},de,8,ne)],64))],4)]))}});var _e=u(ue,[["__scopeId","data-v-638aa7b4"]]);const k=e=>(f("data-v-4714c79c"),e=e(),m(),e),he={xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 46 46"},ve=k(()=>t("path",{d:"M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z ",style:{"stroke-linecap":"butt"}},null,-1)),ke=k(()=>t("path",{d:"M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z ",style:{"stroke-linecap":"butt"}},null,-1)),ye=k(()=>t("path",{d:"M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14",style:{"stroke-linecap":"butt"}},null,-1)),fe=k(()=>t("path",{d:"M 34,14 L 31,17 L 14,17 L 11,14"},null,-1)),me=k(()=>t("path",{d:"M 31,17 L 31,29.5 L 14,29.5 L 14,17",style:{"stroke-linecap":"butt","stroke-linejoin":"miter"}},null,-1)),Le=k(()=>t("path",{d:"M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5"},null,-1)),we=["stroke"],Fe=C('<path d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z " style="stroke-linecap:butt;" data-v-4714c79c></path><path d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z " style="stroke-linecap:butt;stroke-linejoin:miter;" data-v-4714c79c></path><path d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z " style="stroke-linecap:butt;" data-v-4714c79c></path><path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z " style="stroke-linecap:butt;" data-v-4714c79c></path><path d="M 12,35.5 L 33,35.5 L 33,35.5" style="fill:none;stroke:#ffffff;stroke-width:1;stroke-linejoin:miter;" data-v-4714c79c></path><path d="M 13,31.5 L 32,31.5" style="fill:none;stroke:#ffffff;stroke-width:1;stroke-linejoin:miter;" data-v-4714c79c></path><path d="M 14,29.5 L 31,29.5" style="fill:none;stroke:#ffffff;stroke-width:1;stroke-linejoin:miter;" data-v-4714c79c></path><path d="M 14,16.5 L 31,16.5" style="fill:none;stroke:#ffffff;stroke-width:1;stroke-linejoin:miter;" data-v-4714c79c></path><path d="M 11,14 L 34,14" style="fill:none;stroke:#ffffff;stroke-width:1;stroke-linejoin:miter;" data-v-4714c79c></path>',9),Ce=d({__name:"rook-icon",props:{variant:{},colour:{}},setup(e){const r=e,a=l(()=>({primary:r.variant==="white"?"#000000":"#FFFFFF",secondary:r.variant==="white"?"#FFFFFF":"#000000"}));return(o,n)=>(s(),i("svg",he,[t("g",{style:c({fill:o.colour}),opacity:"1","fill-opacity":"1","fill-rule":"evenodd","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-opacity":"1",stroke:"#000000",transform:"translate(0,0.3)"},[ve,ke,o.variant==="white"?(s(),i(L,{key:0},[ye,fe,me,Le,t("path",{d:"M 11,14 L 34,14",style:{fill:"none","stroke-linejoin":"miter"},stroke:a.value.primary},null,8,we)],64)):(s(),i(L,{key:1},[Fe],64))],4)]))}});var ge=u(Ce,[["__scopeId","data-v-4714c79c"]]);const Me=d({__name:"chess-piece",props:{piece:{},allegiance:{},size:{}},emits:["click"],setup(e,{emit:r}){const a=e,o=l(()=>z(a.allegiance)),n=l(()=>{switch(a.allegiance){case y.Black:return"#000";case y.DarkGrey:return"#444";case y.LightGrey:return"#999";case y.White:return"#FFF";default:return""}});return(p,F)=>(s(),i("div",{class:"chess-piece-svg",onClick:F[0]||(F[0]=M=>r("click",M)),style:c({height:`${p.size}px`,width:`${p.size}px`})},[p.piece===null?(s(),_(ee,{key:0,class:"piece",variant:o.value,colour:n.value},null,8,["variant","colour"])):h("",!0),p.piece==="B"?(s(),_(Q,{key:1,class:"piece",variant:o.value,colour:n.value,size:p.size},null,8,["variant","colour","size"])):h("",!0),p.piece==="K"?(s(),_(E,{key:2,class:"piece",variant:o.value,colour:n.value},null,8,["variant","colour"])):h("",!0),p.piece==="N"?(s(),_(X,{key:3,class:"piece",variant:o.value,colour:n.value},null,8,["variant","colour"])):h("",!0),p.piece==="Q"?(s(),_(_e,{key:4,class:"piece",variant:o.value,colour:n.value},null,8,["variant","colour"])):h("",!0),p.piece==="R"?(s(),_(ge,{key:5,class:"piece",variant:o.value,colour:n.value},null,8,["variant","colour"])):h("",!0)],4))}});var ze=u(Me,[["__scopeId","data-v-3c3086f4"]]);export{ze as C,Ie as Q};
