<template>
  <div class="setting">
    <label for="file-upload" class="custom-file-upload">
      <i class="fa fa-cloud-upload"></i> Custom Upload
    </label>
    <input
      @change="getImgePath"
      id="file-upload"
      type="file"
      webkitdirectory
      directory
      multiple
    />
  </div>
</template>

<script>
export default {
  methods: {
    getImgePath(e) {
      console.log(e.target.value);
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
