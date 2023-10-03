import{Q as b,a as l}from"./QCard.89d2f498.js";import{B as y}from"./board.f9a3d75d.js";import{u as x}from"./use-quasar.a8439e22.js";import{u as N,_,G as g,a as C}from"./board-size.89a43d6f.js";import{A as B,o as S,a as m,B as v,C as p,D as c,G as t,aj as z,M as n,N as f,O as A}from"./index.f0813b89.js";import"./use-dark.f0e8cb2d.js";import"./QList.33d537d5.js";import"./QScrollObserver.d9ac380a.js";import"./focus-manager.202af5b7.js";import"./chess-piece.b3c89498.js";const V=B({__name:"online-game",props:{connection:{}},setup(h){const o=h;S(()=>{o.connection.disconnect()});const r=m(()=>{const e=new y;return e.importAFEN(o.connection.boardAFEN.value),e.importMoveHistory(o.connection.moveHistory.value),e}),w=e=>{const i=r.value.findMoveIndex(e);i!==-1&&o.connection.sendMessage({type:"execute-node-index",value:i})},s=x(),u=N(),d=m(()=>o.connection.serverSide.value?o.connection.mode.value==="server"?o.connection.serverSide.value:o.connection.serverSide.value==="white"?"black":"white":null);return(e,i)=>(v(),p(b,{flat:"",class:"full-width"},{default:c(()=>[t(l,{horizontal:n(s).screen.gt.sm,class:f({"q-px-none":n(s).screen.lt.sm})},{default:c(()=>[t(l,{style:z({width:`${n(u)}px`}),class:f({"q-px-none":n(s).screen.lt.sm})},{default:c(()=>{var a;return[t(_,{"model-value":e.connection.boardAFEN.value,width:n(u),onExecuteNode:w,board:r.value,perspective:(a=d.value)!=null?a:"white","play-as":["white","black"],"rounded-borders":n(s).screen.gt.xs},null,8,["model-value","width","board","perspective","rounded-borders"])]}),_:1},8,["style","class"]),t(l,{class:"q-mb-md full-width"},{default:c(()=>{var a;return[t(g,{"move-history":r.value.getMoveHistoryAst(),"active-colour":r.value.activeColour,"own-colour":(a=d.value)!=null?a:"white",afen:e.connection.boardAFEN.value},null,8,["move-history","active-colour","own-colour","afen"])]}),_:1})]),_:1},8,["horizontal","class"]),e.connection.gameOver.value?(v(),p(C,{key:0,node:e.connection.gameOver.value},null,8,["node"])):A("",!0)]),_:1}))}});export{V as default};
//# sourceMappingURL=online-game.3d9b94a5.js.map