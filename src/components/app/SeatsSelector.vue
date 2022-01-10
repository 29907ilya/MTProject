<template>
  <div >
    <select name="seats" id="seats" v-model="selectedOption" @change="onChange">
      <option v-for="(seats, i) in seatsList" :key="i">{{ seats.Seats }}</option>
    </select>
  </div>
</template>
