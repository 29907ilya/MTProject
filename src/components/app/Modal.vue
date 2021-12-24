<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal">
      <div class="logo_info">
        <div>Logo</div>
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
            <button>BUY</button>
          </div>
        </div>
      </div>

      <div class="discription">Discription</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.modal {
  position: fixed;
  top: 60px;
  width: 600px;
  padding: 1rem;
  background: rgb(179, 92, 92);
  z-index: 1000;
  left: 50%;
  border-radius: 10px;
  transform: translateX(-50%);
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(58, 57, 57, 0.35);
  z-index: 100;
  opacity: 0.8;
}
</style>
