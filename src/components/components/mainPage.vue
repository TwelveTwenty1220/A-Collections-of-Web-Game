<template>
  <div class="common-layout">
    <el-container class="full-screen-container">
      <!-- Header 部分 -->
      <el-header class="header">
        <el-carousel :interval="4000" type="card" height="250px" class="carousel">
          <el-carousel-item v-for="item in imageUrls" :key="item">
            <img :src="item" alt="Carousel Image" class="carousel-image"/>
          </el-carousel-item>
        </el-carousel>
      </el-header>

      <!-- Main 内容部分 -->
      <el-main class="main-content">
        <div class="card-container" >
          <el-card
            v-for="(item,index) in games"
            :key="item"
            class="card"
            shadow="hover"
            @click="goToSnake(index)"
          >
            <template #header>
              <h2 class="card-header">{{ item[0] }}</h2>
            </template>

            <a>
              <img :src="`${item[1]}`"
              class="card-image"
            />
            </a>

          </el-card>

        </div>

        <!-- 下面的文字 -->
        <div class="text-container">
          <p>欢迎来到我们的小游戏世界！</p>
          <p>我们精心开发了一系列有趣的游戏，希望你能在这里度过愉快的时光，尽情享受挑战与乐趣！</p>
        </div>
      </el-main>



      <!-- Footer 部分 -->
      <el-footer class="footer">
        <p>&copy; 2024 Your Company | All Rights Reserved</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>

  import { useRouter } from 'vue-router';

  const router = useRouter();

  const imageUrls=[
    'https://images.pexels.com/photos/26537680/pexels-photo-26537680.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/29410748/pexels-photo-29410748.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/20267145/pexels-photo-20267145.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/27957831/pexels-photo-27957831.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/28221550/pexels-photo-28221550.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/12079147/pexels-photo-12079147.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  ];

  const games=[
    ['Snake','/Snake/image.png'],
    ['Buiding','/boards/image.png'],
    ['AvoidCollision','/triangle/image.png'],
    ['GunZi','/gunzi/image.png'],
    ['Maze','/maze/image.png']
  ];

  function goToSnake(index){
    if(index==0){
      router.push('/snake');
    }
    else if (index==1){
      router.push('/new');
    }
    else if(index==2){
      router.push('/collsion');
    }
    else if(index==3){
      router.push('/gunzi');
    }
    else if(index==4){
      router.push('/maze');
    }

  }


</script>

<style scoped>

.common-layout {
  width: 100%;        /* 占满屏幕宽度 */
  height: 100vh;      /* 占满屏幕高度 */
  margin: 0;          /* 去除默认的 margin */
  display: flex;      /* 使用 Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}
/* 全屏容器，确保占满整个屏幕 */
.full-screen-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vh;
  justify-content: space-between;
}

/* Header 部分 */
.header {
  background-color: #1f2d3d;
  padding: 0;
  /* margin-top: 30px; */
}

/* 限制轮播图的最大宽度 */
.carousel {
  width: 80%;        /* 设置轮播图的宽度为屏幕的80% */
  max-width: 2400px; /* 最大宽度为1200px */
  margin: 0 auto;    /* 水平居中 */
}

.carousel-image{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-carousel__item h3 {
  color: #ffffff;
  font-size: 36px;
  font-weight: 700;
  line-height: 250px; /* 让文字垂直居中 */
  margin: 0;
  text-align: center;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* 给文字添加阴影 */
}

.el-carousel__item:nth-child(2n) {
  background-color: #4e6b8c;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #6f7f9e;
}

/* Main 内容部分 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
  gap: 20px;
}

.card-container {
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1800px; /* 最大宽度 */
  margin-top: 150px;
}

.card {
  flex: 1 1 22%; /* 每个卡片占 22% 宽度 */
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-header {
  color: #42b983;
  text-align: center;
  font-weight: 600;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持比例，裁剪多余部分以填充容器 */
  border-radius: 10px;
  border: 1px solid #eee;
}

/* 文字区域 */
.text-container{
  font-size: 18px;
  color: #333;
  margin-top: 100px;
}

.text-container p:last-child {
  font-size: 16px;
  color: #666;
}

/* Footer 部分 */
.footer {
  background-color: #333;
  padding: 20px;
  color: #fff;
  margin: 0;
  text-align: center;
  width: 100%;
}

.footer p {
  margin: 0;
}
</style>
