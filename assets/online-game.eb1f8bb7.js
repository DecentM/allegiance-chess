import{Q as f,a as l}from"./QCard.48cbf7da.js";import{B as h}from"./board.68ecb5dd.js";import{u as w}from"./use-quasar.35a8132f.js";import{_,G as g}from"./game-sidebar.3c0fefe1.js";import{C as y,o as b,a as u,D as x,E as z,F as s,J as r,ae as C,R as E}from"./index.d8dd3e6c.js";import"./use-dark.c02bd21a.js";import"./QList.912d51d6.js";import"./QScrollObserver.fa50fdfe.js";import"./focus-manager.202af5b7.js";import"./chess-piece.f3528f6f.js";const i=200,G=y({__name:"online-game",props:{connection:{}},setup(v){const e=v;b(()=>{e.connection.disconnect()});const a=u(()=>{const t=new h;return t.importAFEN(e.connection.boardAFEN.value),t.importMoveHistory(e.connection.moveHistory.value),t}),p=t=>{const c=a.value.findMoveIndex(t);c!==-1&&e.connection.sendMessage({type:"execute-node-index",value:c})},o=w(),d=u(()=>o.screen.gt.lg?o.screen.sizes.lg-i:o.screen.gt.md?o.screen.sizes.md-i:o.screen.gt.sm?o.screen.sizes.sm-i:o.screen.width-i-150),m=u(()=>e.connection.serverSide.value?e.connection.mode.value==="server"?e.connection.serverSide.value:e.connection.serverSide.value==="white"?"black":"white":null);return(t,c)=>(x(),z(f,{flat:"",class:"full-width"},{default:s(()=>[r(l,{horizontal:E(o).screen.gt.sm},{default:s(()=>[r(l,{style:C({width:`${d.value}px`})},{default:s(()=>{var n;return[r(_,{"model-value":t.connection.boardAFEN.value,width:d.value,onExecuteNode:p,board:a.value,perspective:(n=m.value)!=null?n:"white","play-as":["white","black"]},null,8,["model-value","width","board","perspective"])]}),_:1},8,["style"]),r(l,{class:"q-mb-md full-width"},{default:s(()=>{var n;return[r(g,{"move-history":a.value.getMoveHistoryAst(),"active-colour":a.value.activeColour,"own-colour":(n=m.value)!=null?n:"white"},null,8,["move-history","active-colour","own-colour"])]}),_:1})]),_:1},8,["horizontal"])]),_:1}))}});export{G as default};
//# sourceMappingURL=online-game.eb1f8bb7.js.map
