let t=[],n=[];function l(e){n=n.filter(a=>a!==e)}function u(e){l(e),n.push(e)}function i(e){l(e),n.length===0&&t.length!==0&&(t[t.length-1](),t=[])}function o(e){n.length===0?e():t.push(e)}function s(e){t=t.filter(a=>a!==e)}export{o as a,i as b,u as c,s as r};
//# sourceMappingURL=focus-manager.202af5b7.js.map
