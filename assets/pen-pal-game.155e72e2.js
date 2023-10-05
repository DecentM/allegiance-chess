import{Q as w,a as c}from"./QCard.6190aaec.js";import{A as C,K as b,ak as g,a as m,B as h,C as x,D as n,G as r,aj as N,M as o,N as y,O as H}from"./index.2c222f74.js";import{A as B,B as z}from"./board.a5920241.js";import{u as k,_ as E,G,a as M}from"./board-size.3286a6fa.js";import{H as l}from"./hex.be59d59d.js";import{u as q}from"./use-quasar.7e079753.js";import{a as Q,u as S}from"./board-audio.d4e60c16.js";import"./use-dark.852de887.js";import"./QList.1979fd31.js";import"./QScrollObserver.277d6daf.js";import"./focus-manager.202af5b7.js";import"./chess-piece.8308610b.js";const L=C({__name:"pen-pal-game",setup(T){const t=b(),_=g(),p=m(()=>{const e=Array.isArray(t.params.state)?t.params.state[0]:t.params.state;return e?l.hexToUtf8(e):B.VanillaDefault}),d=m(()=>{const e=Array.isArray(t.params.history)?t.params.history[0]:t.params.history;return e?l.hexToUtf8(e):""}),a=m(()=>{const e=new z;return p.value&&e.importAFEN(p.value),d.value&&e.importMoveHistory(d.value),e}),u=Q(),A=e=>{const v=a.value.executeMoveIndex(e);u==null||u.playNode(v),_.push({path:`/play/pen-pal/${l.utf8ToHex(a.value.toAFEN())}/${l.utf8ToHex(a.value.getMoveHistory())}`})},{gameOver:i}=S(a),s=q(),f=k();return(e,v)=>(h(),x(w,{flat:"",class:"full-width"},{default:n(()=>[r(c,{horizontal:o(s).screen.gt.sm,class:y({"q-px-none":o(s).screen.lt.sm})},{default:n(()=>[r(c,{style:N({width:`${o(f)}px`}),class:y({"q-px-none":o(s).screen.lt.sm})},{default:n(()=>[r(E,{onExecuteNodeIndex:A,board:a.value,perspective:a.value.activeColour,"play-as":["white","black"],width:o(f),"rounded-borders":o(s).screen.gt.xs},null,8,["board","perspective","width","rounded-borders"])]),_:1},8,["style","class"]),r(c,{class:"q-mb-md full-width"},{default:n(()=>[r(G,{"move-history":a.value.getMoveHistoryAst(),"active-colour":a.value.activeColour,"own-colour":a.value.activeColour,afen:a.value.toAFEN(),"game-over":o(i)},null,8,["move-history","active-colour","own-colour","afen","game-over"])]),_:1})]),_:1},8,["horizontal","class"]),o(i)?(h(),x(M,{key:0,node:o(i)},null,8,["node"])):H("",!0)]),_:1}))}});export{L as default};
//# sourceMappingURL=pen-pal-game.155e72e2.js.map
