import{Q as a}from"./QSeparator.c337f640.js";import{Q as i,a as r}from"./QCard.ffecd5c7.js";import{_ as n,B as l,C as d,D as s,G as o,N as e,H as t}from"./index.47e46eca.js";import"./use-dark.13434755.js";const c={},h=e("div",{class:"text-h6"},"About",-1),b=e("div",{class:"text-body1 q-mb-md"}," While the site itself doesn't store any data, you should be aware of a few things: ",-1),p=e("div",{class:"text-body1 q-mb-md"},[e("span",{class:"text-bold"},"Cookies"),e("br"),t(" This site doesn't use third party cookies. First party cookies may be used (read: not yet) to make the site function, such as storing game state in the event that you or your opponent loses connection. ")],-1),u=e("div",{class:"text-body1 q-mb-md"},[e("span",{class:"text-bold"},"Hosting"),e("br"),t(" This site is hosted on GitHub pages with Cloudflare for distributed content delivery. This means that when you visit the site, your request will be served by Cloudflare, and they will see whatever information your browser sends. Usually this is your user agent string and your IP address. ")],-1),y=e("div",{class:"text-body1 q-mb-md"},[e("span",{class:"text-bold"},"Site analytics"),e("br"),t(" I use cookie-less analytics to get a basic understanding about the volume, type, and origin of the traffic to this site. Everything that's collected is viewable on the Statistics page. "),e("br"),t(" I'm self-hosting the receiver, so if that page is empty it means my instance of Plausible Analytics has crashed. \xAF\\_(\u30C4)_/\xAF ")],-1),m=e("div",{class:"text-body1 q-mb-md"},[e("span",{class:"text-bold"},"Errors and performance"),e("br"),t(" I use Sentry to get notified about bugs and issues on this site. Some extensions or firewalls may block the sentry.io domain. In this case, errors that occur for you will remain invisible to me and could remain that way, possibly preventing you from playing. "),e("br"),t(" If possible, please make sure that Sentry is not blocked from receiving error reports <3 ")],-1),f=e("div",{class:"text-body1 q-mb-md"},[e("span",{class:"text-bold"},"WebRTC"),e("br"),t(" When playing multiplayer with an opponent across the Internet, this site uses WebRTC to communicate directly with your opponent's web browser. This means that when both you and your opponent's browser and network supports WebRTC, your IP address will be technically available to your opponent. It's not displayed on the UI. ")],-1),w=e("div",{class:"text-body1 q-mb-md"},[e("span",{class:"text-bold"},"STUN/TURN servers"),e("br"),t(" If either your or your opponent's network/browser is incompatible with WebRTC, traffic will be proxied over a server, operated by PeerJS (https://peerjs.com/). In this case, the complete communication with your opponent will go through that server. "),e("br"),t(" If both players' conditions support WebRTC, a TURN server will be used to assign a peer ID to both players, and when connected, the traffic containing game state will travel directly between the two browsers. In this case, only the initial connection handshake will go through the external server. ")],-1);function v(_,g){return l(),d(i,{flat:"",class:"full-width q-mb-md"},{default:s(()=>[o(r,null,{default:s(()=>[h,o(a,{class:"q-mb-md"}),b,p,u,y,m,f,w]),_:1})]),_:1})}var C=n(c,[["render",v]]);export{C as default};
//# sourceMappingURL=privacy-page.334595b0.js.map
