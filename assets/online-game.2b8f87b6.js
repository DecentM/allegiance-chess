import{Q as f,a as l}from"./QCard.781a9cad.js";import{B as h}from"./board.6abea6e8.js";import{_ as w,G as _}from"./game-sidebar.3596ae06.js";import{u as g}from"./use-quasar.08edd231.js";import{M as y,f as b,a as u,N as x,O as z,P as s,S as r,ae as N,$ as S}from"./index.8fb4d5f0.js";import"./use-dark.8ed248c2.js";import"./QList.c3f98d17.js";import"./selection.a0c874b8.js";import"./focus-manager.202af5b7.js";import"./chess-piece.4abe5418.js";const i=200,q=y({__name:"online-game",props:{connection:{}},setup(v){const e=v;b(()=>{e.connection.disconnect()});const a=u(()=>{const t=new h;return t.importAFEN(e.connection.boardAFEN.value),t.importMoveHistory(e.connection.moveHistory.value),t}),p=t=>{const c=a.value.findMoveIndex(t);c!==-1&&e.connection.sendMessage({type:"execute-node-index",value:c})},o=g(),d=u(()=>o.screen.gt.lg?o.screen.sizes.lg-i:o.screen.gt.md?o.screen.sizes.md-i:o.screen.gt.sm?o.screen.sizes.sm-i:o.screen.width-i-150),m=u(()=>e.connection.serverSide.value?e.connection.mode.value==="server"?e.connection.serverSide.value:e.connection.serverSide.value==="white"?"black":"white":null);return(t,c)=>(x(),z(f,{flat:"",class:"full-width"},{default:s(()=>[r(l,{horizontal:S(o).screen.gt.sm},{default:s(()=>[r(l,{style:N({width:`${d.value}px`})},{default:s(()=>{var n;return[r(w,{"model-value":t.connection.boardAFEN.value,width:d.value,onExecuteNode:p,board:a.value,perspective:(n=m.value)!=null?n:"white","play-as":["white","black"]},null,8,["model-value","width","board","perspective"])]}),_:1},8,["style"]),r(l,{class:"q-mb-md full-width"},{default:s(()=>{var n;return[r(_,{"move-history":a.value.getMoveHistoryAst(),"active-colour":a.value.activeColour,"own-colour":(n=m.value)!=null?n:"white"},null,8,["move-history","active-colour","own-colour"])]}),_:1})]),_:1},8,["horizontal"])]),_:1}))}});export{q as default};
