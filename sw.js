if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(s[f])return;let d={};const r=e=>a(e,f),b={module:{uri:f},exports:d,require:r};s[f]=Promise.all(c.map((e=>b[e]||r(e)))).then((e=>(i(...e),d)))}}define(["./workbox-b05a3e3c"],(function(e){"use strict";e.setCacheNameDetails({prefix:"frontend"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"20ee2b7a3a1408da8c50f4698777d9ad"},{url:"assets/board-audio.3e587d48.js",revision:"b5585c8f39725c47127e78bbcf83f1db"},{url:"assets/board-audio.3e587d48.js.map",revision:"8e9349a2733e65ffb24cf510058bc76b"},{url:"assets/board-size.35d258e9.css",revision:"85c1ca08ac74596dfe1c9aac9c953569"},{url:"assets/board-size.5ffe9b6b.js",revision:"bb3782c97ecbc64fe5ef9a9acf3ee5b2"},{url:"assets/board-size.5ffe9b6b.js.map",revision:"d1c983786d2ed6b334bbc4116671eb09"},{url:"assets/board.de1ff7ae.js",revision:"5964c741df301af763a0fba240063148"},{url:"assets/board.de1ff7ae.js.map",revision:"67e26a4272ba785c4ee5342fd14ddd21"},{url:"assets/chess-piece.794f8f32.css",revision:"0b26625d06f43d0ca22afedb8efb5261"},{url:"assets/chess-piece.c40437e0.js",revision:"799e03182fbde74ec8511ffe564fc9b3"},{url:"assets/chess-piece.c40437e0.js.map",revision:"9ac02accc7a1ea6d7626ced959c03761"},{url:"assets/exports.d8cbbaa6.js",revision:"54ce5cc77eacaaa095a4618591806462"},{url:"assets/exports.d8cbbaa6.js.map",revision:"aae7f6185db5c18f964423e5e5822ce2"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.4a4dbc62.woff2",revision:"a4160421d2605545f69a4cd6cd642902"},{url:"assets/focus-manager.202af5b7.js",revision:"003a1f86dc1479b342f3824cc795d59a"},{url:"assets/focus-manager.202af5b7.js.map",revision:"1f6f197fa3868d64806adabc98722cf3"},{url:"assets/hex.76224a12.js",revision:"f1b51334e8ddd838f0a9f3b602b53948"},{url:"assets/hex.76224a12.js.map",revision:"1833471c588611144885e2aaed7ee72d"},{url:"assets/index-page.69f17e40.js",revision:"e402430f9efa22067193ccf29fc7f6d1"},{url:"assets/index-page.69f17e40.js.map",revision:"71c16fcba1982c6aa17d76a99658f5ca"},{url:"assets/index.3f1ca227.css",revision:"7a0795e00ce01436a231fa3828f2af09"},{url:"assets/index.abfe4b42.js",revision:"7e8322310cdeed923c122ab318188535"},{url:"assets/index.abfe4b42.js.map",revision:"3948f2af32ed32caf00fa380eb16d0c1"},{url:"assets/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.796de064.woff2",revision:"1f6d3cf6d38f25d83d95f5a800b8cac3"},{url:"assets/KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz.582ca1c5.woff2",revision:"93dcb0c222437699e9dd591d8b5a6b85"},{url:"assets/main-layout.b96b2315.js",revision:"b036269f95bc1bcb514fdd2b5efb523c"},{url:"assets/main-layout.b96b2315.js.map",revision:"a80ddcec8b12b46f92b577e21d676c21"},{url:"assets/main-layout.cf237793.css",revision:"000894d682ac32b3f66836cf69e6685b"},{url:"assets/navigation_backward-selection-minimal.5c6fba09.ogg",revision:"6b1ca279a4157df0dd929290f3d28aa1"},{url:"assets/navigation_hover-tap.713baf32.ogg",revision:"2b59b68c6914ca747b674c8a781ba2f7"},{url:"assets/navigation-cancel.92012997.ogg",revision:"9d8d7a695e40fce912f1ecf6212ef5ea"},{url:"assets/not-found.a4fbd56a.js",revision:"0318c9afd7a170d31f029871e25ca5de"},{url:"assets/not-found.a4fbd56a.js.map",revision:"82e8bfe5ba69eb57fc52cb283f0a1574"},{url:"assets/online-game.80f98ec8.js",revision:"1829a6fef0641142ecd2a38ceb7a026e"},{url:"assets/online-game.80f98ec8.js.map",revision:"d2ab8833209c8b70c794b5a092ce4534"},{url:"assets/pen-pal-game.40becc42.js",revision:"45de45f414c2d1ceac4627a761f1e740"},{url:"assets/pen-pal-game.40becc42.js.map",revision:"203325b1ec169af73655faf6f789069c"},{url:"assets/play-page.0179378f.js",revision:"c15c06f1d56194455fe1d3ddeb382115"},{url:"assets/play-page.0179378f.js.map",revision:"26d65632d1b32a280718595577908bcf"},{url:"assets/privacy-page.0b00db5a.js",revision:"3077c4e561b2ac9e6bbb6c993eb4fadf"},{url:"assets/privacy-page.0b00db5a.js.map",revision:"75d6c4fd9dadd7fb0780e5007331b982"},{url:"assets/QCard.4b0b801f.js",revision:"250d5f1a3d9839abca08e364708aa223"},{url:"assets/QCard.4b0b801f.js.map",revision:"e96d03d0bfef60a864dbcae02136db47"},{url:"assets/QList.36623d4c.js",revision:"d5b52a84528e4078344c69a0993c3d02"},{url:"assets/QList.36623d4c.js.map",revision:"29eec3b9a21d4a1a0c87180c507846c2"},{url:"assets/QScrollObserver.1c33f1b3.js",revision:"f8d3fe8b00823b92f29228800a321a44"},{url:"assets/QScrollObserver.1c33f1b3.js.map",revision:"76ba3de87531cd93313ec8ac17ec213a"},{url:"assets/sentry.cce725ce.js",revision:"ee0a30cf12d00c4afbadba472ac390c5"},{url:"assets/sentry.cce725ce.js.map",revision:"c04cd296b4e15abd8698fa2b8631777e"},{url:"assets/setup-game.0cd94ed8.js",revision:"d1e19caac1e1f35f38a4b7a7d3ae9d68"},{url:"assets/setup-game.0cd94ed8.js.map",revision:"a2d1acc8a6b3058c5756c37cc24501db"},{url:"assets/setup-game.d2402ef4.css",revision:"d9ac77c676020c7cdc287234d0e2af1a"},{url:"assets/tutorial-1.b3b74247.png",revision:"d71b800a05feed95da8d6860221fe573"},{url:"assets/tutorial-2.88289e50.png",revision:"cf09242e22e88d170fadc520bbeffc38"},{url:"assets/tutorial-3.f5b15ff3.png",revision:"8c8e026ff30ee8355235b1405aa902b9"},{url:"assets/ui_refresh-feed.44b5b5d7.ogg",revision:"5b835253fd7a4963669e105996427d8c"},{url:"assets/ui_tap-variant-01.21f59a16.ogg",revision:"9ecf45410f01e0b68b8dc932ea58a207"},{url:"assets/uid.a41eb200.js",revision:"01943b83af9843b534123877cb75518d"},{url:"assets/uid.a41eb200.js.map",revision:"23189be4e53ead8c222e7eb0c3253bcd"},{url:"assets/use-dark.60f61f9a.js",revision:"58f3d10c3f33eedbc9646e7f5a486947"},{url:"assets/use-dark.60f61f9a.js.map",revision:"78e23c68ea70de7a15b50a364893578f"},{url:"assets/use-quasar.200cb82c.js",revision:"bf7d1a57d7f0d8aae69dd4b4bf8d31a5"},{url:"assets/use-quasar.200cb82c.js.map",revision:"ad9e05e7f3c0bbcf8cdaef0602ae5d1a"},{url:"favicon.ico",revision:"f4facfeaed834544d622544acfbb7722"},{url:"icons/apple-icon-120x120.png",revision:"d082235f6e6d2109e84e397f66fa868d"},{url:"icons/apple-icon-152x152.png",revision:"3c728ce3e709b7395be487becf76283a"},{url:"icons/apple-icon-167x167.png",revision:"3fec89672a18e4b402ede58646917c2d"},{url:"icons/apple-icon-180x180.png",revision:"aa47843bd47f34b7ca4b99f65dd25955"},{url:"icons/favicon-128x128.png",revision:"ab92df0270f054ca388127c9703a4911"},{url:"icons/favicon-16x16.png",revision:"e4b046d41e08e6fa06626d6410ab381d"},{url:"icons/favicon-32x32.png",revision:"410858b01fa6d3d66b7bf21447c5f1fc"},{url:"icons/favicon-96x96.png",revision:"db2bde7f824fb4057ffd1c42f6ed756e"},{url:"icons/icon-128x128.png",revision:"ab92df0270f054ca388127c9703a4911"},{url:"icons/icon-192x192.png",revision:"7659f0d3e9602e71811f8b7cf2ce0e8e"},{url:"icons/icon-256x256.png",revision:"cf5ad3498fb6fda43bdafd3c6ce9b824"},{url:"icons/icon-384x384.png",revision:"fdfc1b3612b6833a27a7b260c9990247"},{url:"icons/icon-512x512.png",revision:"2c2dc987945806196bd18cb6028d8bf4"},{url:"icons/ms-icon-144x144.png",revision:"8de1b0e67a62b881cd22d935f102a0e6"},{url:"icons/safari-pinned-tab.svg",revision:"3e4c3730b00c89591de9505efb73afd3"},{url:"index.html",revision:"7e84dc699829b84c126b97ff65b18e8e"},{url:"manifest.json",revision:"ef7e23c018eea8aeb238b8d7d1dad340"},{url:"play/index.html",revision:"93d7bf2197f59229910872cf43af4ab6"},{url:"play/pen-pal/index.html",revision:"e8beba96d1b7faf23cf6f323d18d46d3"},{url:"privacy/index.html",revision:"267bce115a0136cdd509b6a697cea744"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("404.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
//# sourceMappingURL=sw.js.map