import{Q as p,a as r}from"./QCard.78fa8550.js";import{Q as m}from"./chess-piece.2d3aa9e8.js";import{b as f,a as c}from"./QList.f8fe278d.js";import{A as _,k as h,B as l,C as u,D as o,M as e,P as i,G as s,aj as x,H as d,I as y,u as b,O as v}from"./index.90ee8eaf.js";import{u as g}from"./use-quasar.3e6ad70c.js";import{a as k,u as w,_ as q,G as C,b as Q}from"./board-worker.b8c1d317.js";import"./use-dark.665573af.js";import"./QScrollObserver.43ca2596.js";import"./focus-manager.202af5b7.js";import"./QSeparator.e2862eb2.js";const P=_({__name:"bot-game",setup(I){const a=k({autoplayFor:["black"]});h(()=>a.reset());const t=g(),n=w();return(S,z)=>(l(),u(p,{flat:"",class:"full-width"},{default:o(()=>[e(a).ready.value?(l(),u(r,{key:0,horizontal:e(t).screen.gt.sm,class:i({"q-px-none":e(t).screen.lt.sm})},{default:o(()=>[s(r,{style:x({width:`${e(n)}px`}),class:i({"q-px-none":e(t).screen.lt.sm})},{default:o(()=>[s(q,{onExecuteNodeIndex:e(a).executeMoveIndex,"active-colour":e(a).activeColour.value,"check-moves":e(a).checkMoves.value,"en-passant-target":e(a).enPassantTarget.value,"move-history-ast":e(a).moveHistoryAst.value,squares:e(a).squares.value,perspective:"white","play-as":["white","black"],width:e(n),"rounded-borders":e(t).screen.gt.xs,"valid-moves":e(a).validMoves.value},null,8,["onExecuteNodeIndex","active-colour","check-moves","en-passant-target","move-history-ast","squares","width","rounded-borders","valid-moves"])]),_:1},8,["style","class"]),s(r,{class:"q-mb-md full-width"},{default:o(()=>[s(C,{"move-history":e(a).moveHistoryAst.value,"active-colour":e(a).activeColour.value,"own-colour":"white",afen:e(a).afen.value,"game-over":e(a).gameOver.value},{default:o(()=>[s(f,null,{default:o(()=>[s(c,{class:"q-mt-sm q-mb-sm"},{default:o(()=>[s(m,null,{default:o(()=>[d("Evaluation")]),_:1}),s(m,{caption:"",lines:"2"},{default:o(()=>[d(y(e(a).boardScore.value),1)]),_:1})]),_:1}),s(c,{side:""},{default:o(()=>[s(b,{name:"exposure_plus_1"})]),_:1})]),_:1})]),_:1},8,["move-history","active-colour","afen","game-over"])]),_:1})]),_:1},8,["horizontal","class"])):v("",!0),e(a).gameOver.value?(l(),u(Q,{key:1,node:e(a).gameOver.value},null,8,["node"])):v("",!0)]),_:1}))}});export{P as default};
//# sourceMappingURL=bot-game.640b12ce.js.map
