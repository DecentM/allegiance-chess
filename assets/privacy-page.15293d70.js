import{Q as r,b as a,a as n}from"./QCard.18a41439.js";import{_ as i,N as l,O as c,P as o,S as s,ac as e,U as t}from"./index.24610c7a.js";import"./use-dark.8f2925c9.js";const d={},h=e("div",{class:"text-h6"},"About",-1),p=e("div",{class:"text-body1 q-mb-md"}," While the site itself doesn't store any data, you should be aware of a few things: ",-1),b=e("div",{class:"text-body1 q-mb-md"},[e("span",{class:"text-bold"},"Cookies"),e("br"),t(" This site doesn't use third party cookies. First party cookies may be used (read: not yet) to make the site function, such as storing game state in the event that you or your opponent loses connection. ")],-1),u=e("div",{class:"text-body1 q-mb-md"},[e("span",{class:"text-bold"},"Errors and performance"),e("br"),t(" I use Sentry to get notified about bugs and issues on this site. Some extensions or firewalls may block the sentry.io domain. In this case, errors that occur for you will remain invisible to me and could remain that way, possibly preventing you from playing. If possible, please make sure that Sentry is not blocked from receiving error reports <3 "),e("br"),t(" Here are the measures set up to protect your privacy when it comes to error reports: ")],-1),m=e("div",{class:"text-body1 q-mb-md"},[e("ul",null,[e("li",null," Whenever an error occurs, details about the error are sent to Sentry (https://sentry.io). Only data related to the error itself is sent, such as stack traces, and application state history (e.g. on which page the error occurred, or the sequence of clicks that lead to the error). The source IP address and additional potentially personally identifiable information on the error is removed before error reports are generated. "),e("li",null," In addition, somer performance metrics may be (read: not yet) collected and sent to Sentry as well, such as time taken to process your move on the chessboard, evaluate the board, or find a response to your move when playing against a bot. "),e("li",null," In both cases, only the minimum required data is sent and in personally identifiable cases that must be sent (e.g. IP address), this information is scrubbed before processing. The operator of Sentry is Functional Software, Inc (https://functional.software/). ")])],-1),y=e("div",{class:"text-body1 q-mb-md"},[e("span",{class:"text-bold"},"WebRTC"),e("br"),t(" When playing multiplayer with an opponent across the Internet, this site uses WebRTC to communicate directly with your opponent's web browser. This means that when both you and your opponent's browser and network supports WebRTC, your IP address will be technically available to your opponent. It's not displayed on the UI. ")],-1),f=e("div",{class:"text-body1 q-mb-md"},[e("span",{class:"text-bold"},"STUN/TURN servers"),e("br"),t(" If either your or your opponent's network/browser is incompatible with WebRTC, traffic will be proxied over a server, operated by PeerJS (https://peerjs.com/). In this case, the complete communication with your opponent will go through that server. "),e("br"),t(" If both players' conditions support WebRTC, a TURN server will be used to assign a peer ID to both players, and when connected, the traffic containing game state will travel directly between the two browsers. In this case, only the initial connection handshake will go through the external server. ")],-1);function w(v,_){return l(),c(r,{flat:"",class:"full-width q-mb-md"},{default:o(()=>[s(n,null,{default:o(()=>[h,s(a,{class:"q-mb-md"}),p,b,u,m,y,f]),_:1})]),_:1})}var k=i(d,[["render",w]]);export{k as default};
