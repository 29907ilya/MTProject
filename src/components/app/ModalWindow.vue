<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal-window">
    <div class="logo_info">
      <div>logo_info</div>
      <span>Duration</span>
      <span>Raiting</span>
    </div>
    <div class="options">
      <div class="title">
        <span> Title </span>
      </div>
      <div class="formalities">
        <div class="place_sessions">
          <div class="place">Place Name</div>
          <div class="sessions">Sessions</div>
        </div>
        <div class="seats_buy">
          <div class="seats">Seats</div>
          <button @click="tap">BUY</button>
        </div>
      </div>
    </div>

    <div class="discription">Discription</div>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  methods: {
    tap () {
      console.log('click')
      window.M.toast({ html: 'You have bought a tickets!' })
    }
  }
}
</script>

<style>
.modal-window {
  position: fixed;
  top: 120px;
  width: 600px;
  padding: 1rem;
  background: rgb(179, 92, 92);
  z-index: 100;
  left: 56%;
  border-radius: 10px;
  transform: translateX(-50%);
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
  opacity: 0.99;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(58, 57, 57, 0.35);
  z-index: 10;
  opacity: 0.8;
}
</style>
