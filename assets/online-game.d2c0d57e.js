import{Q as _}from"./selection.af0b7864.js";import{Q as b}from"./QItemLabel.57109f19.js";import{Q as c,a as i}from"./QCard.366e39b1.js";import{B as N}from"./chess-piece.67efc1ab.js";import{_ as w,a as x}from"./afen-info.70a1a39b.js";import{u as Q}from"./use-quasar.b6f21c2f.js";import{M as B,o as E,a as d,r as g,N as u,O as m,P as t,S as a,a0 as k,ab as A,U as C}from"./index.f5899c35.js";import"./use-dark.a1f34955.js";import"./QList.876f6ecf.js";import"./focus-manager.202af5b7.js";import"./QSeparator.8dabd8d4.js";const F={class:"col-lg col-md-12 full-width"},L=B({__name:"online-game",props:{connection:{}},setup(v){const o=v;E(()=>{o.connection.disconnect()});const n=d(()=>{const e=new N;return e.importAFEN(o.connection.boardAFEN.value),e}),p=e=>{const s=n.value.findMoveIndex(e);s!==-1&&(n.value.executeMoveIndex(s),o.connection.sendMessage({type:"afen-update",value:n.value.toAFEN()}))},r=g(800),f=Q(),h=e=>{if(f.screen.gt.md){r.value=e.width-e.width/8-200;return}r.value=e.width-e.width/8},l=d(()=>o.connection.serverSide.value?o.connection.mode.value==="server"?o.connection.serverSide.value:o.connection.serverSide.value==="white"?"black":"white":null);return(e,s)=>(u(),m(c,{flat:""},{default:t(()=>[a(i,{class:"row"},{default:t(()=>[a(_,{onResize:h}),l.value?(u(),m(w,{key:0,"model-value":e.connection.boardAFEN.value,width:r.value,onExecuteNode:p,board:n.value,perspective:l.value,"play-as":["white","black"]},null,8,["model-value","width","board","perspective"])):k("",!0),A("div",F,[a(c,{flat:"",bordered:"",class:"full-height"},{default:t(()=>[a(i,{class:"bg-primary q-mb-md"},{default:t(()=>[a(b,null,{default:t(()=>[C("Board information")]),_:1})]),_:1}),a(x,{"model-value":e.connection.boardAFEN.value},null,8,["model-value"])]),_:1})])]),_:1})]),_:1}))}});export{L as default};