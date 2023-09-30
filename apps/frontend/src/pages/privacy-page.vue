<script setup lang="ts">
import background from '../assets/de-an-sun--iSZqeGuBnI-unsplash.jpg'
</script>

<style lang="scss" scoped>
.frosted-backdrop {
  background-color: rgba(40, 40, 40, 0.5);
  backdrop-filter: blur(30px);
}
</style>

<template>
  <q-page>
    <q-img :src="background" fit="cover" height="calc(100vh - 50px)">
      <div class="full-width full-height overflow-auto">
        <q-card flat class="full-width frosted-backdrop q-mb-md">
          <q-card-section>
            <div class="text-h6">About</div>

            <q-separator class="q-mb-md" />

            <div class="text-body1 q-mb-md">
              While the site itself doesn't store any data, you should be aware
              of a few things:
            </div>

            <div class="text-body1 q-mb-md">
              <span class="text-bold">Cookies</span><br />
              This site doesn't use third party cookies. First party cookies may
              be used (read: not yet) to make the site function, such as storing
              game state in the event that you or your opponent loses
              connection.
            </div>

            <div class="text-body1 q-mb-md">
              <span class="text-bold">Errors and performance</span><br />
              I use Sentry to get notified about bugs and issues on this site.
              Some extensions or firewalls may block the sentry.io domain. In
              this case, errors that occur for you will remain invisible to me
              and could remain that way, possibly preventing you from playing.
              If possible, please make sure that Sentry is not blocked from
              receiving error reports &lt;3
              <br />
              Here are the measures set up to protect your privacy when it comes
              to error reports:
            </div>

            <div class="text-body1 q-mb-md">
              <ul>
                <li>
                  Whenever an error occurs, details about the error are sent to
                  Sentry (https://sentry.io). Only data related to the error
                  itself is sent, such as stack traces, and application state
                  history (e.g. on which page the error occurred, or the
                  sequence of clicks that lead to the error). The source IP
                  address and additional potentially personally identifiable
                  information on the error is removed before error reports are
                  generated.
                </li>

                <li>
                  In addition, somer performance metrics may be (read: not yet)
                  collected and sent to Sentry as well, such as time taken to
                  process your move on the chessboard, evaluate the board, or
                  find a response to your move when playing against a bot.
                </li>

                <li>
                  In both cases, only the minimum required data is sent and in
                  personally identifiable cases that must be sent (e.g. IP
                  address), this information is scrubbed before processing. The
                  operator of Sentry is Functional Software, Inc
                  (https://functional.software/).
                </li>
              </ul>
            </div>

            <div class="text-body1 q-mb-md">
              <span class="text-bold">WebRTC</span><br />
              When playing multiplayer with an opponent across the Internet,
              this site uses WebRTC to communicate directly with your opponent's
              web browser. This means that when both you and your opponent's
              browser and network supports WebRTC, your IP address will be
              technically available to your opponent. It's not displayed on the
              UI.
            </div>

            <div class="text-body1 q-mb-md">
              <span class="text-bold">STUN/TURN servers</span><br />
              If either your or your opponent's network/browser is incompatible
              with WebRTC, traffic will be proxied over a server, operated by
              PeerJS (https://peerjs.com/). In this case, the complete
              communication with your opponent will go through that server.
              <br />
              If both players' conditions support WebRTC, a TURN server will be
              used to assign a peer ID to both players, and when connected, the
              traffic containing game state will travel directly between the two
              browsers. In this case, only the initial connection handshake will
              go through the external server.
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-img>
  </q-page>
</template>
