const l={VanillaDefault:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0",GreyDefault:"r>n>b>q>kb>n>r>/p>p>p>p>p>p>p>p>/8/8/8/8/P>P>P>P>P>P>P>P>/R>N>B>Q>KB>N>R> w KQkq - 0 0"};var i="/assets/navigation_backward-selection-minimal.5c6fba09.ogg",s="/assets/navigation_hover-tap.713baf32.ogg",p="/assets/navigation-cancel.92012997.ogg",u="/assets/ui_refresh-feed.44b5b5d7.ogg",c="/assets/ui_tap-variant-01.21f59a16.ogg";const g=()=>{if(typeof window=="undefined")return null;const e=new Audio(i),n=new Audio(s),t=new Audio(p),o=new Audio(u),r=new Audio(c);return{playNode:a=>{if(a.kind==="game-over")return e.play();if(a.kind==="move")switch(a.type){default:return r.play();case"capture":case"en-passant":return t.play();case"allegiance":return n.play();case"castle":case"promotion":return o.play()}}}};export{l as F,g as u};
//# sourceMappingURL=board-audio.22cbfa7b.js.map
