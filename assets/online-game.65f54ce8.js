import{Q as c}from"./chess-piece.287834d9.js";import{b as _,a as i}from"./QList.e9651fa1.js";import{A as b,o as x,a as k,r as y,k as w,w as I,B as v,C as m,D as a,G as t,N as o,H as d,I as C,u as q,P as B}from"./index.d98542eb.js";import{u as N}from"./use-quasar.07a0740a.js";import{u as Q,_ as S,C as M,G as O,a as G}from"./board-worker.a9dc82ed.js";import"./use-dark.1db35295.js";import"./QCard.b898c128.js";import"./QScrollObserver.5df01707.js";import"./focus-manager.202af5b7.js";import"./QSeparator.4c1b3b0b.js";import"./notify.0ff5fb43.js";import"./exports.42380454.js";const j=b({__name:"online-game",props:{connection:{}},setup(p){const n=p;x(()=>{n.connection.disconnect()});const f=N(),l=k(()=>n.connection.serverSide.value?n.connection.isHost.value?n.connection.serverSide.value:n.connection.serverSide.value==="white"?"black":"white":null),g=y([]),e=Q({autoplayFor:g});w(()=>e.reset());const h=r=>{n.connection.sendMessage({type:"execute-node-index",value:r})};return I(n.connection.moveHistory,r=>{const u=r[r.length-1];typeof u=="number"&&e.executeMoveIndex(u)}),(r,u)=>(v(),m(S,null,{board:a(()=>{var s;return[t(M,{onExecuteNodeIndex:h,"model-value":o(e).afen.value,"valid-moves":o(e).validMoves.value,board:o(e),perspective:(s=l.value)!=null?s:"white","play-as":["white","black"],"rounded-borders":o(f).screen.gt.xs,"active-colour":o(e).activeColour.value,"check-moves":o(e).checkMoves.value,"en-passant-target":o(e).enPassantTarget.value,"move-history-ast":o(e).moveHistoryAst.value,squares:o(e).squares.value,loading:o(e).loading.value},null,8,["model-value","valid-moves","board","perspective","rounded-borders","active-colour","check-moves","en-passant-target","move-history-ast","squares","loading"])]}),sidebar:a(()=>{var s;return[t(O,{"move-history":o(e).moveHistoryAst.value,"active-colour":o(e).activeColour.value,"own-colour":(s=l.value)!=null?s:"white",afen:o(e).afen.value,"game-over":o(e).gameOver.value},{default:a(()=>[t(_,null,{default:a(()=>[t(i,{class:"q-mt-sm q-mb-sm"},{default:a(()=>[t(c,null,{default:a(()=>[d("Opening")]),_:1}),t(c,{caption:"",lines:"2"},{default:a(()=>[d(C(o(e).opening.value||"unknown"),1)]),_:1})]),_:1}),t(i,{side:""},{default:a(()=>[t(q,{name:"book"})]),_:1})]),_:1})]),_:1},8,["move-history","active-colour","own-colour","afen","game-over"])]}),default:a(()=>[o(e).gameOver.value?(v(),m(G,{key:0,node:o(e).gameOver.value},null,8,["node"])):B("",!0)]),_:1}))}});export{j as default};
//# sourceMappingURL=online-game.65f54ce8.js.map
