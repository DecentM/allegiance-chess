<template>
  <q-card flat class="full-width q-mb-md">
    <q-card-section>
      <div class="text-h6">About</div>

      <q-separator class="q-mb-md" />

      <div class="text-body1 q-mb-md">
        While the site itself doesn't store any data, you should be aware of a
        few things:
      </div>

      <div class="text-body1 q-mb-md">
        <span class="text-bold">Cookies</span><br />
        This site doesn't use third party cookies. First party cookies may be
        used (read: not yet) to make the site function, such as storing game
        state in the event that you or your opponent loses connection.
      </div>

      <div class="text-body1 q-mb-md">
        <span class="text-bold">Hosting</span><br />
        This site is hosted on GitHub pages with Cloudflare for distributed
        content delivery. This means that when you visit the site, your request
        will be served by Cloudflare, and they will see whatever information
        your browser sends. Usually this is your user agent string and your IP
        address.
      </div>

      <div class="text-body1 q-mb-md">
        <span class="text-bold">Site analytics</span><br />
        I use cookie-less analytics to get a basic understanding about the
        volume, type, and origin of the traffic to this site. Everything that's
        collected is viewable on the Statistics page.
        <br />
        I'm self-hosting the receiver, so if that page is empty it means my
        instance of Plausible Analytics has crashed. ¯\_(ツ)_/¯
      </div>

      <div class="text-body1 q-mb-md">
        <span class="text-bold">Errors and performance</span><br />
        I use Sentry to get notified about bugs and issues on this site. Some
        extensions or firewalls may block the sentry.io domain. In this case,
        errors that occur for you will remain invisible to me and could remain
        that way, possibly preventing you from playing.
        <br />
        If possible, please make sure that Sentry is not blocked from receiving
        error reports &lt;3
      </div>

      <div class="text-body1 q-mb-md">
        <span class="text-bold">WebRTC</span><br />
        When playing multiplayer with an opponent across the Internet, this site
        uses WebRTC to communicate directly with your opponent's web browser.
        This means that when both you and your opponent's browser and network
        supports WebRTC, your IP address will be technically available to your
        opponent. It's not displayed on the UI.
      </div>

      <div class="text-body1 q-mb-md">
        <span class="text-bold">STUN/TURN servers</span><br />
        If either your or your opponent's network/browser is incompatible with
        WebRTC, traffic will be proxied over a server, operated by PeerJS
        (https://peerjs.com/). In this case, the complete communication with
        your opponent will go through that server.
        <br />
        If both players' conditions support WebRTC, a TURN server will be used
        to assign a peer ID to both players, and when connected, the traffic
        containing game state will travel directly between the two browsers. In
        this case, only the initial connection handshake will go through the
        external server.
      </div>
    </q-card-section>
  </q-card>
</template>
