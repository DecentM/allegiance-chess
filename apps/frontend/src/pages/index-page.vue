<script setup lang="ts">
import tutorial1 from '../assets/tutorial-1.png'
import tutorial2 from '../assets/tutorial-2.png'
import tutorial3 from '../assets/tutorial-3.png'

import ChessPiece from '../components/chess-piece.vue'
</script>

<template>
  <q-card flat class="full-width q-mb-md">
    <q-card-section>
      <div class="text-h6">Introduction</div>

      <q-separator class="q-mb-md" />

      <div class="text-body1 q-mb-md">
        Allegiance Chess is a Chess variant where you can essentially brainwash
        your opponents' pieces. Instead of being black or white, each piece has
        an allegiance. At the beginning, pieces start with a pure black or white
        allegiance. During the course of a game, a piece can be manipulated into
        switching sides, if your opponent decides to challenge a piece of yours.
        <br />
        From the original pure state, pieces transition into a partial state
        where you still control them, but one more step and they switch sides.
        You can't change the allegiance of your own pieces.
      </div>

      <div class="text-body1 q-mb-md">
        During each turn, players can choose to challenge the allegiance of a
        piece instead of capturing it. This causes no movement, but the
        allegiance of the challenged piece shifts by one, towards the colour of
        the player making the move.
      </div>

      <div class="text-body1 q-mb-md">
        For example, if white challenges a black bishop (allegiance zero), then
        the targeted bishop will change its allegiance to one. Meaning that if
        it gets challenged one more time, it will switch sides to white. Since
        players can only challenge enemy pieces, once a piece leaves its "pure"
        allegiance, it will never go back to it.
      </div>

      <div class="text-body1 q-mb-md">
        <q-btn
          class="full-width"
          color="primary"
          icon="sports_esports"
          label="Click here to play, or read on for more"
          to="/play"
        />
      </div>
    </q-card-section>
  </q-card>

  <q-card flat class="full-width frosted-backdrop q-mb-md">
    <q-card-section>
      <div class="text-h6">How to play</div>

      <q-separator class="q-mb-md" />

      <div class="text-body1 q-mb-md">
        All normal rules of Chess apply:

        <ul>
          <li>Castling</li>
          <li>En-passant</li>
          <li>Promotion</li>
        </ul>
      </div>

      <div class="text-body1 q-mb-md">
        When your piece would be able to take a piece, you'll see two options.
        If you choose to take (X) the piece, it counts as a normal capture. If
        you choose to challenge (>) the piece, both yours and the challenged
        piece stays in place, and the challenged piece's allegiance will change
        towards your side.
      </div>

      <div class="row justify-center">
        <q-img class="col-2" :src="tutorial1" />
        <q-icon size="xl" class="col-1" name="arrow_right" />
        <q-img class="col-2" :src="tutorial2" />
        <q-icon size="xl" class="col-1" name="arrow_right" />
        <q-img class="col-2" :src="tutorial3" />
      </div>
    </q-card-section>
  </q-card>

  <q-card flat class="full-width frosted-backdrop q-mb-md">
    <q-card-section>
      <div class="text-h6">Technical details</div>

      <q-separator class="q-mb-md" />

      <div class="text-body1 q-mb-md">
        This game is implemented in Typescript from scratch, so there may be
        completely bame breaking bugs. You may open an issue on the issue
        tracker if you encounter bugs like this (but not limited to):

        <ul>
          <li>Ability to make illegal moves</li>
          <li>Inability to castle, promote, challenge, or capture</li>
          <li>Inability to move at all</li>
        </ul>
      </div>

      <div class="text-body1 q-mb-md">
        FEN has been extended to support storing allegiance information. The
        Allegiance FEN (AFEN) string is a superset of FEN, with the added ">"
        character, which indicates that the piece before the character has a
        non-pure allegiance. For example, "N>" means that the knight has an
        allegiance of 2 (white minus one), while "b>" means that the bishop has
        the allegiance of 1 (black plus one).
        <br />
        Because AFEN is a superset, any FEN string is valid AFEN, but an AFEN
        string might not be valid FEN.
      </div>

      <div class="text-body1 q-mb-md">
        Additionally, the standard Chess notation is extended in the same way.
        The ">" character signals a challenge. For example, where "Rxd2" would
        mean Rook takes on D2, "R>d2" means the Rook challenges the piece on D2.
        Neither of them move, but the opposing piece on D2 changes its
        allegiance by one, towards the challenging player.
      </div>
    </q-card-section>
  </q-card>

  <q-card flat class="full-width frosted-backdrop q-mb-md">
    <q-card-section>
      <div class="text-h6">Recognitions</div>

      <q-separator class="q-mb-md" />

      <q-list>
        <q-item
          clickable
          href="https://pictogrammers.com/contributor/MrGrigri/"
          target="_blank"
          rel="noopener"
        >
          <q-item-section avatar>
            <q-avatar rounded>
              <chess-piece piece="Q" :allegiance="3" :size="40" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label> Chess pieces </q-item-label>
            <q-item-label caption :lines="2">
              <span>Michael Richins on Pictogrammers</span><br />
              <span>Modified to have allegiance indications</span>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          href="https://m2.material.io/design/sound/sound-resources.html"
          target="_blank"
          rel="noopener"
        >
          <q-item-section avatar>
            <q-avatar rounded>
              <q-icon name="music_note" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label> Move sounds </q-item-label>
            <q-item-label caption :lines="1">
              <span>Google</span>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          href="https://database.lichess.org/"
          target="_blank"
          rel="noopener"
        >
          <q-item-section avatar>
            <q-avatar rounded>
              <q-icon name="book" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label> Opening moves </q-item-label>
            <q-item-label caption :lines="2">
              <span>Lichess</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>
