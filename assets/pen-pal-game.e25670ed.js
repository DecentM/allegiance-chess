import{Q as _}from"./selection.31f4f0c7.js";import{B as v,Q as x}from"./chess-piece.0b1aefb5.js";import{Q as n,a as i}from"./QCard.5d378843.js";import{M as b,X as w,ak as N,a as d,r as Q,N as B,O as g,P as r,S as a,ab as y,U as C}from"./index.3c0fead1.js";import{_ as R,a as k}from"./afen-info.2ba03f15.js";import{H as c}from"./hex.b4824a29.js";import{F as A}from"./boards.07b20eb6.js";import{u as E}from"./use-quasar.77f7fb29.js";import"./use-dark.ff948b39.js";import"./QList.e44e87f7.js";import"./focus-manager.202af5b7.js";const F={class:"col-lg col-md-12 full-width"},L=b({__name:"pen-pal-game",setup(M){const o=w(),m=N(),u=d(()=>{const e=Array.isArray(o.params.state)?o.params.state[0]:o.params.state;return e?c.hexToUtf8(e):A.VanillaDefault}),t=d(()=>{const e=new v;return e.importAFEN(u.value),e}),p=e=>{const l=t.value.findMoveIndex(e);l!==-1&&(t.value.executeMoveIndex(l),m.push({path:`/play/pen-pal/${c.utf8ToHex(t.value.toAFEN())}`}))},s=Q(800),f=E(),h=e=>{if(f.screen.gt.md){s.value=Math.min(e.width-e.width/8-200,1200);return}s.value=e.width-e.width/8};return(e,l)=>(B(),g(n,{flat:""},{default:r(()=>[a(i,{class:"row"},{default:r(()=>[a(_,{onResize:h}),a(R,{onExecuteNode:p,board:t.value,perspective:t.value.activeColour,"play-as":["white","black"],width:s.value},null,8,["board","perspective","width"]),y("div",F,[a(n,{flat:"",bordered:"",class:"full-height"},{default:r(()=>[a(i,{class:"bg-primary q-mb-md"},{default:r(()=>[a(x,null,{default:r(()=>[C("Board information")]),_:1})]),_:1}),a(k,{"model-value":u.value},null,8,["model-value"])]),_:1})])]),_:1})]),_:1}))}});export{L as default};
