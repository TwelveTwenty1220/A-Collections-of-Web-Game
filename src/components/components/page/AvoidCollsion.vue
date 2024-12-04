<template>
  <!-- <div id="three-container"></div> -->
  <div id="three-container">
    <!-- This is your container for other content -->
    <iframe src="/triangle/index.html" width="100%" height="100%"></iframe>
  </div>

</template>

<script>


</script>

<style scoped>

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#three-container {
  position: absolute;  /* Make sure it is absolutely positioned */
  top: 0;
  left: 0;
  width: 100vw;  /* Use viewport width */
  height: 100vh; /* Use viewport height */
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
