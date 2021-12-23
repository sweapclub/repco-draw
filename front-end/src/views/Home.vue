<template>
  <div class="home">
    <div v-if="flg >= 2">
      <div class="congrad">
        <p v-if="flg == 4">ยินดีด้วยจ้า</p>
      </div>
      <div class="image-locate">
        <ImageCard v-if="activeEmp != null" :emp="activeEmp" />
      </div>
    </div>
    <div v-if="flg == 2" class="mask" @click="pickWinner()"></div>
    <div v-if="flg == 4" class="mask" @click="repeat()"></div>
    <div v-if="flg == 1" class="button-box">
      <button @click="draw()">Lucky draw</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import ImageCard from "@/components/ImageCard";
export default {
  name: "Home",
  data: () => ({
    employees: [],
    activeEmp: null,
    empLoc: 0,
    flg: 1,
  }),
  components: {
    // HelloWorld,
    ImageCard,
  },
  methods: {
    getEmployee() {
      fetch(`${process.env.VUE_APP_API_PATH}/employee`)
        .then((res) => res.json())
        .then((data) => {
          this.employees = this.shuffle(data);
        });
    },
    draw() {
      this.getEmployee();
      this.shuffleImage();
      this.flg = 2;
    },
    shuffle(array) {
      // ref : https://bost.ocks.org/mike/shuffle/
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },

    shuffleImage() {
      this.interShuffle = setInterval(() => {
        this.activeEmp = this.employees[this.empLoc];
        if (this.empLoc == this.employees.length - 1) {
          this.empLoc = 0;
        } else {
          this.empLoc += 1;
        }
      }, 10);
    },
    async pickWinner() {
      clearInterval(this.interShuffle);
      this.flg = 3;

      const winner = this.shuffle(this.employees).slice(0, 20);
      let s = 10;
      for (let i = 0; i < winner.length; i++) {
        this.activeEmp = this.employees[i];
        await new Promise((r) => setTimeout(r, s));
        const p = ((i + 1) * 100) / winner.length;
        s = (p * 500) / 100;
      }
      fetch(`${process.env.VUE_APP_API_PATH}/employee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ id: winner[winner.length - 1].employeeId }),
      });
      this.flg = 4;
    },
    repeat() {
      this.flg = 1;
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100vw;
  height: 100vh;
}
.mask {
  position: absolute;
  width: 100vw;
  height: 100vh;
  /* background-color: green; */
}
.image-locate {
  width: 100%;
  display: flex;
  justify-content: center;
}
.congrad {
  flex-basis: 200px;
  height: 200px;
  font-size: 64px;
  padding: 0px;
  text-align: center;
}
.congrad p {
  padding-top: 90px;
  margin: 0px;
}

.button-box {
  text-align: center;
}
.button-box button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  font-size: 64px;
  color: white;
  background-color: #ff4500;
  border-radius: 24px;
  padding: 20px;
  border-color: #ff4500;
  box-shadow: 4px 4px 10px whitesmoke;
}
</style>
