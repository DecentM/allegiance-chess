import{Q as l}from"./QSeparator.9182f6a0.js";import{A as p,B as g,E as b,G as e,D as a,J as f,O as t,Q as _,N as r,u as d,M as u,H as s}from"./index.0dab1eee.js";import{Q as o,a as i}from"./QCard.27897d44.js";import{Q as h}from"./QImg.75552e3e.js";import{Q as y,b as m,a as n}from"./QList.a95d107d.js";import{_ as w,Q as c}from"./chess-piece.3f24ab6b.js";import"./use-dark.17eafb98.js";var v="/assets/tutorial-1.b3b74247.png",k="/assets/tutorial-2.88289e50.png",x="/assets/tutorial-3.f5b15ff3.png";const Q=t("div",{class:"text-h6"},"Introduction",-1),q=t("div",{class:"text-body1 q-mb-md"},[s(" Allegiance Chess is a Chess variant where you can essentially brainwash your opponents' pieces. Instead of being black or white, each piece has an allegiance. At the beginning, pieces start with a pure black or white allegiance. During the course of a game, a piece can be manipulated into switching sides, if your opponent decides to challenge a piece of yours. "),t("br"),s(" From the original pure state, pieces transition into a partial state where you still control them, but one more step and they switch sides. You can't change the allegiance of your own pieces. ")],-1),N=t("div",{class:"text-body1 q-mb-md"}," During each turn, players can choose to challenge the allegiance of a piece instead of capturing it. This causes no movement, but the allegiance of the challenged piece shifts by one, towards the colour of the player making the move. ",-1),F=t("div",{class:"text-body1 q-mb-md"},' For example, if white challenges a black bishop (allegiance zero), then the targeted bishop will change its allegiance to one. Meaning that if it gets challenged one more time, it will switch sides to white. Since players can only challenge enemy pieces, once a piece leaves its "pure" allegiance, it will never go back to it. ',-1),A={class:"text-body1 q-mb-md"},E=t("div",{class:"text-h6"},"How to play",-1),C=t("div",{class:"text-body1 q-mb-md"},[s(" All normal rules of Chess apply: "),t("ul",null,[t("li",null,"Castling"),t("li",null,"En-passant"),t("li",null,"Promotion")])],-1),I=t("div",{class:"text-body1 q-mb-md"}," When your piece would be able to take a piece, you'll see two options. If you choose to take (X) the piece, it counts as a normal capture. If you choose to challenge (>) the piece, both yours and the challenged piece stays in place, and the challenged piece's allegiance will change towards your side. ",-1),T={class:"row justify-center"},B=t("div",{class:"text-h6"},"Technical details",-1),D=t("div",{class:"text-body1 q-mb-md"},[s(" This game is implemented in Typescript from scratch, so there may be completely bame breaking bugs. You may open an issue on the issue tracker if you encounter bugs like this (but not limited to): "),t("ul",null,[t("li",null,"Ability to make illegal moves"),t("li",null,"Inability to castle, promote, challenge, or capture"),t("li",null,"Inability to move at all")])],-1),M=t("div",{class:"text-body1 q-mb-md"},[s(' FEN has been extended to support storing allegiance information. The Allegiance FEN (AFEN) string is a superset of FEN, with the added ">" character, which indicates that the piece before the character has a non-pure allegiance. For example, "N>" means that the knight has an allegiance of 2 (white minus one), while "b>" means that the bishop has the allegiance of 1 (black plus one). '),t("br"),s(" Because AFEN is a superset, any FEN string is valid AFEN, but an AFEN string might not be valid FEN. ")],-1),R=t("div",{class:"text-body1 q-mb-md"},' Additionally, the standard Chess notation is extended in the same way. The ">" character signals a challenge. For example, where "Rxd2" would mean Rook takes on D2, "R>d2" means the Rook challenges the piece on D2. Neither of them move, but the opposing piece on D2 changes its allegiance by one, towards the challenging player. ',-1),z=t("div",{class:"text-h6"},"Recognitions",-1),S=t("span",null,"Michael Richins on Pictogrammers",-1),G=t("br",null,null,-1),V=t("span",null,"Modified to have allegiance indications",-1),H=t("span",null,"Google",-1),U=p({__name:"index-page",setup(L){return(P,Y)=>(g(),b(f,null,[e(o,{flat:"",class:"full-width q-mb-md"},{default:a(()=>[e(i,null,{default:a(()=>[Q,e(l,{class:"q-mb-md"}),q,N,F,t("div",A,[e(_,{class:"full-width",color:"primary",icon:"sports_esports",label:"Click here to play, or read on for more",to:"/play"})])]),_:1})]),_:1}),e(o,{flat:"",class:"full-width frosted-backdrop q-mb-md"},{default:a(()=>[e(i,null,{default:a(()=>[E,e(l,{class:"q-mb-md"}),C,I,t("div",T,[e(h,{class:"col-2",src:r(v)},null,8,["src"]),e(d,{size:"xl",class:"col-1",name:"arrow_right"}),e(h,{class:"col-2",src:r(k)},null,8,["src"]),e(d,{size:"xl",class:"col-1",name:"arrow_right"}),e(h,{class:"col-2",src:r(x)},null,8,["src"])])]),_:1})]),_:1}),e(o,{flat:"",class:"full-width frosted-backdrop q-mb-md"},{default:a(()=>[e(i,null,{default:a(()=>[B,e(l,{class:"q-mb-md"}),D,M,R]),_:1})]),_:1}),e(o,{flat:"",class:"full-width frosted-backdrop q-mb-md"},{default:a(()=>[e(i,null,{default:a(()=>[z,e(l,{class:"q-mb-md"}),e(y,null,{default:a(()=>[e(m,{clickable:"",href:"https://pictogrammers.com/contributor/MrGrigri/",target:"_blank",rel:"noopener"},{default:a(()=>[e(n,{avatar:""},{default:a(()=>[e(u,{rounded:""},{default:a(()=>[e(w,{piece:"Q",allegiance:3,size:40})]),_:1})]),_:1}),e(n,null,{default:a(()=>[e(c,null,{default:a(()=>[s(" Chess pieces ")]),_:1}),e(c,{caption:"",lines:2},{default:a(()=>[S,G,V]),_:1})]),_:1})]),_:1}),e(m,{clickable:"",href:"https://m2.material.io/design/sound/sound-resources.html",target:"_blank",rel:"noopener"},{default:a(()=>[e(n,{avatar:""},{default:a(()=>[e(u,{rounded:""},{default:a(()=>[e(d,{name:"music_note"})]),_:1})]),_:1}),e(n,null,{default:a(()=>[e(c,null,{default:a(()=>[s(" Move sounds ")]),_:1}),e(c,{caption:"",lines:1},{default:a(()=>[H]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})],64))}});export{U as default};
//# sourceMappingURL=index-page.978095ac.js.map
