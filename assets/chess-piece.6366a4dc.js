import{c as v,a as f,h as V,e as g,A as u,B as a,E as s,ah as h,N as H,_ as i,ai as C,C as c,D as l,O as o,aj as m,G as r}from"./index.9bcfe4f0.js";var U=v({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(n,{slots:t}){const e=f(()=>parseInt(n.lines,10)),_=f(()=>"q-item__label"+(n.overline===!0?" q-item__label--overline text-overline":"")+(n.caption===!0?" q-item__label--caption text-caption":"")+(n.header===!0?" q-item__label--header":"")+(e.value===1?" ellipsis":"")),p=f(()=>n.lines!==void 0&&e.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":e.value}:null);return()=>V("div",{style:p.value,class:_.value},g(t.default))}});const $=C('<defs data-v-5537a9f2><linearGradient id="0" data-v-5537a9f2><stop offset="0%" stop-color="#000" data-v-5537a9f2></stop></linearGradient><linearGradient id="1" gradientTransform="rotate(90)" data-v-5537a9f2><stop offset="90%" stop-color="#000" data-v-5537a9f2></stop><stop offset="90%" stop-color="#FFF" data-v-5537a9f2></stop></linearGradient><linearGradient id="2" gradientTransform="rotate(90)" data-v-5537a9f2><stop offset="90%" stop-color="#FFF" data-v-5537a9f2></stop><stop offset="90%" stop-color="#000" data-v-5537a9f2></stop></linearGradient><linearGradient id="3" data-v-5537a9f2><stop offset="100%" stop-color="#FFF" data-v-5537a9f2></stop></linearGradient></defs>',1),L=u({__name:"piece-svg",props:{allegiance:{}},setup(n){return(t,e)=>(a(),s("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",class:H(`allegiance-${t.allegiance}`)},[$,h(t.$slots,"default",{},void 0,!0)],2))}});var d=i(L,[["__scopeId","data-v-5537a9f2"]]);const k={},y={d:`M19,22H5V20H19V22M17.16,8.26C18.22,9.63 18.86,11.28 19,13C19,15.76
      15.87,18 12,18C8.13,18 5,15.76 5,13C5,10.62 7.33,6.39 10.46,5.27C10.16,4.91
      10,4.46 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.46 13.84,4.91
      13.54,5.27C14.4,5.6 15.18,6.1
      15.84,6.74L11.29,11.29L12.71,12.71L17.16,8.26Z`};function b(n,t){return a(),s("path",y)}var w=i(k,[["render",b]]);const A={},M={d:`M19,22H5V20H19V22M17,10C15.58,10 14.26,10.77
      13.55,12H13V7H16V5H13V2H11V5H8V7H11V12H10.45C9.35,10.09 6.9,9.43
      5,10.54C3.07,11.64 2.42,14.09 3.5,16C4.24,17.24 5.57,18 7,18H17A4,4 0 0,0
      21,14A4,4 0 0,0 17,10Z`};function I(n,t){return a(),s("path",M)}var B=i(A,[["render",I]]);const F={},G={d:`M19,22H5V20H19V22M13,2V2C11.75,2 10.58,2.62
      9.89,3.66L7,8L9,10L11.06,8.63C11.5,8.32 12.14,8.44 12.45,8.9C12.47,8.93
      12.5,8.96 12.5,9V9C12.8,9.59 12.69,10.3 12.22,10.77L7.42,15.57C6.87,16.13
      6.87,17.03 7.43,17.58C7.69,17.84 8.05,18 8.42,18H17V6A4,4 0 0,0 13,2Z`};function z(n,t){return a(),s("path",G)}var S=i(F,[["render",z]]);const N={},Z={d:`M19 22H5V20H19V22M16 18H8L10.18 10H8V8H10.72L10.79 7.74C10.1 7.44 9.55
      6.89 9.25 6.2C8.58 4.68 9.27 2.91 10.79 2.25C12.31 1.58 14.08 2.27 14.74
      3.79C15.41 5.31 14.72 7.07 13.2 7.74L13.27 8H16V10H13.82L16 18Z`};function Q(n,t){return a(),s("path",Z)}var q=i(N,[["render",Q]]);const x={},P={d:`M18,3A2,2 0 0,1 20,5C20,5.81 19.5,6.5
      18.83,6.82L17,13.15V18H7V13.15L5.17,6.82C4.5,6.5 4,5.81 4,5A2,2 0 0,1
      6,3A2,2 0 0,1 8,5C8,5.5 7.82,5.95 7.5,6.3L10.3,9.35L10.83,5.62C10.33,5.26
      10,4.67 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.67 13.67,5.26
      13.17,5.62L13.7,9.35L16.47,6.29C16.18,5.94 16,5.5 16,5A2,2 0 0,1
      18,3M5,20H19V22H5V20Z`};function K(n,t){return a(),s("path",P)}var E=i(x,[["render",K]]);const R={},T={d:"M5,20H19V22H5V20M17,2V5H15V2H13V5H11V2H9V5H7V2H5V8H7V18H17V8H19V2H17Z"};function j(n,t){return a(),s("path",T)}var D=i(R,[["render",j]]);const O=u({__name:"chess-piece",props:{piece:{},allegiance:{},size:{}},emits:["click"],setup(n,{emit:t}){return(e,_)=>(a(),s("div",{class:"chess-piece-svg",onClick:_[0]||(_[0]=p=>t("click",p)),style:m({height:`${e.size}px`,width:`${e.size}px`})},[e.piece===null?(a(),c(d,{key:0,class:"piece",allegiance:e.allegiance},{default:l(()=>[r(q)]),_:1},8,["allegiance"])):o("",!0),e.piece==="B"?(a(),c(d,{key:1,class:"piece",allegiance:e.allegiance,size:e.size},{default:l(()=>[r(w)]),_:1},8,["allegiance","size"])):o("",!0),e.piece==="K"?(a(),c(d,{key:2,allegiance:e.allegiance,class:"piece"},{default:l(()=>[r(B)]),_:1},8,["allegiance"])):o("",!0),e.piece==="N"?(a(),c(d,{key:3,class:"piece",allegiance:e.allegiance},{default:l(()=>[r(S)]),_:1},8,["allegiance"])):o("",!0),e.piece==="Q"?(a(),c(d,{key:4,class:"piece",allegiance:e.allegiance},{default:l(()=>[r(E)]),_:1},8,["allegiance"])):o("",!0),e.piece==="R"?(a(),c(d,{key:5,class:"piece",allegiance:e.allegiance},{default:l(()=>[r(D)]),_:1},8,["allegiance"])):o("",!0)],4))}});var W=i(O,[["__scopeId","data-v-61df9ebe"]]);export{W as C,U as Q};
//# sourceMappingURL=chess-piece.6366a4dc.js.map