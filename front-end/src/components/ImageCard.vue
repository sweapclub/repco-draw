<template>
  <div class="image-box">
    <img :src="require(`@/assets/employee-image/${emp.employeeId}.jpg`)" alt="" />
    <p id="detail">{{ emp.employeeName }}</p>
  </div>
</template>

<script>
export default {
  name: "imageCard",
  props: {
    emp: {
      type: Object,
      default: () => ({
        employeeId: null,
        employeeName: null,
      }),
    },
  },
};
</script>

<style scoped>
.image-box {
  text-align: center;
  width: 500px;
  /* display: flex; */
  gap: 20px;
  background-color: #ffffffb3;
  padding: 20px;
  border-radius: 10px;
}
.image-box img {
  /* flex-basis: 250px; */
  height: 300px;
  border-radius: 10px;
}
#detail {
  font-size: 32px;
  font-weight: bold;
}
</style>
