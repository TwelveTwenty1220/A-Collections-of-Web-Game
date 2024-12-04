<template>
  <div class="t1">
    <h1 >Welcom to the Snake</h1>
    <canvas ref="board" id="board"></canvas>
    <div>
    <button @click="restartGame">Restart Game</button>
    <button @click="back">Back</button>
  </div>

  <div class="speed-control">
      <!-- 添加一个 Slider 控件来选择速度 -->
      <el-slider v-model="gameSpeed" :min="1" :max="20" :step="1" label="Speed" />
      <span>Game Speed: {{ gameSpeed }}</span>
    </div>
  </div>

  <div class="score">
    <el-text class="mx-1 score-text"  size="large">Current Score : {{ score }}</el-text>
  </div>



  <!-- 左侧卡片部分 -->
  <div class="left-cards">
    <el-card class="card" shadow="hover">
      <template #header>
        <h2 class="card-header"> "Record your score in the leftTop"</h2>
      </template>
      <a>
        <img :src="`/Snake/showScore.png`" alt="Hamburger" class="card-image" />
      </a>
    </el-card>

    <el-card class="card" shadow="hover">
      <template #header>
        <h2 class="card-header"> "adjust your speed "</h2>
      </template>
      <a>
        <img :src="`/Snake/speed.png`" alt="Hamburger" class="card-image" />
      </a>
    </el-card>
  </div>

  <!-- 右侧卡片部分 -->
  <div class="right-cards">
    <el-card class="card" shadow="hover">
      <template #header>
        <h2 class="card-header"> "you can't over bound"</h2>
      </template>
      <a>
        <img :src="`/Snake/bound.png`" alt="Hamburger" class="card-image" />
      </a>
    </el-card>

    <el-card class="card" shadow="hover">
      <template #header>
        <h2 class="card-header"> "You can't hit yourself"</h2>
      </template>
      <a>
        <img :src="`/Snake/hitYourself.png`" alt="Hamburger" class="card-image" />
      </a>
    </el-card>
  </div>


  <div>
    <el-dialog
    v-model="centerDialogVisible"
    title="Game Over"
    class="center-dialog"
    width="400"
    height="400"
    align-center
    :visible="centerDialogVisible"
  >
    <span>Game Over! Would you like to play again?</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="restartGame">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
  </div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
// import { ElDialog, ElButton } from 'element-plus';
const router = useRouter();
// 数据和状态
const blockSize = 25;
const rows = 40;
const cols = 40;
const snakeX = ref(blockSize * 5);
const snakeY = ref(blockSize * 5);
const velocityX = ref(0);
const velocityY = ref(0);
const snakeBody = ref([]);
const foodX = ref(0);
const foodY = ref(0);
const score=ref(0);

const gameSpeed = ref(10);

let gameOver = ref(false); // 用 let 替代 const 以便后续更新
let intervalId = ref(null);  // 用 let 以便后续更新
let context = ref(null); // 用 let 替代 const 以便后续更新
let canvas = ref(null); // 用 let 替代 const 以便后续更新

// 控制对话框显示
const centerDialogVisible = ref(false);

// 先进行初始化，然后再启动游戏
const initCanvas = () => {
  return new Promise((resolve, reject) => {
    if (canvas.value) {
      context.value = canvas.value.getContext("2d");
      canvas.value.width = cols * blockSize;  // 重新设置宽度
      canvas.value.height = rows * blockSize; // 重新设置高度
      resolve();  // 完成Canvas的初始化
    } else {
      reject("Canvas initialization failed");
    }
  });
};

const back= ()=>{
  router.push('/');
}

// 初始化游戏
const initGame = () => {
  score.value=0;
  snakeX.value = blockSize * 5;
  snakeY.value = blockSize * 5;
  velocityX.value = 0;
  velocityY.value = 0;
  snakeBody.value = [];
  gameOver.value = false;
  placeFood();
};

// 启动游戏
const startGame = async () => {
  // 初始化Canvas并等待完成
  try {
    await initCanvas();
    // 初始化游戏
    initGame();
    // 绑定键盘事件
    document.addEventListener("keyup", changeDirection);

    // 启动游戏循环
    intervalId.value = setInterval(update, 1000 / gameSpeed.value); // 100 milliseconds
  } catch (error) {
    console.error("Canvas initialization error:", error);
  }
};

// 更新游戏状态
const update = () => {
  if (gameOver.value) {
    clearInterval(intervalId.value); // 停止游戏
    centerDialogVisible.value = true;
    return;
  }

  let ctx = context.value;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // 绘制食物
  ctx.fillStyle = "red";
  ctx.fillRect(foodX.value, foodY.value, blockSize, blockSize);

  // 吃到食物
  if (snakeX.value === foodX.value && snakeY.value === foodY.value) {
    snakeBody.value.push([foodX.value, foodY.value]);
    score.value++;
    placeFood();

  }

  // 更新蛇的身体
  for (let i = snakeBody.value.length - 1; i > 0; i--) {
    snakeBody.value[i] = snakeBody.value[i - 1];
  }

  if (snakeBody.value.length) {
    snakeBody.value[0] = [snakeX.value, snakeY.value];
  }

  // 移动蛇
  ctx.fillStyle = "lime";
  snakeX.value += velocityX.value * blockSize;
  snakeY.value += velocityY.value * blockSize;
  ctx.fillRect(snakeX.value, snakeY.value, blockSize, blockSize);

  // 绘制蛇身体
  for (let i = 0; i < snakeBody.value.length; i++) {
    ctx.fillRect(snakeBody.value[i][0], snakeBody.value[i][1], blockSize, blockSize);
  }

  // 游戏结束条件
  if (
    snakeX.value < 0 ||
    snakeX.value > cols * blockSize ||
    snakeY.value < 0 ||
    snakeY.value > rows * blockSize
  ) {
    gameOver.value = true;
  }

  for (let i = 0; i < snakeBody.value.length; i++) {
    if (snakeX.value === snakeBody.value[i][0] && snakeY.value === snakeBody.value[i][1]) {
      gameOver.value = true;
    }
  }
};

// 改变蛇的方向
const changeDirection = (e) => {
  if (e.code === "ArrowUp" && velocityY.value !== 1) {
    velocityX.value = 0;
    velocityY.value = -1;
  } else if (e.code === "ArrowDown" && velocityY.value !== -1) {
    velocityX.value = 0;
    velocityY.value = 1;
  } else if (e.code === "ArrowLeft" && velocityX.value !== 1) {
    velocityX.value = -1;
    velocityY.value = 0;
  } else if (e.code === "ArrowRight" && velocityX.value !== -1) {
    velocityX.value = 1;
    velocityY.value = 0;
  }
};

// 放置食物
const placeFood = () => {
  foodX.value = Math.floor(Math.random() * cols) * blockSize;
  foodY.value = Math.floor(Math.random() * rows) * blockSize;
};

// 重启游戏
const restartGame = async () => {
  centerDialogVisible.value = false;
  startGame();

};

// 挂载时初始化 canvas 和绑定事件
onMounted(() => {
  canvas.value = document.getElementById("board");
  startGame(); // 自动开始游戏
});

// 卸载时清理事件和定时器
onBeforeUnmount(() => {
  clearInterval(intervalId.value);
  document.removeEventListener("keyup", changeDirection);
});
</script>

<style scoped>

/* 父容器使用 Flexbox 布局 */
.t1 {
  display: flex;                /* 使用 Flexbox 布局 */
  justify-content: center;      /* 水平居中 */
  align-items: center;          /* 垂直居中 */
  height: 100vh;                /* 父容器高度为视口高度 */
  width: 100vh;                  /* 父容器宽度填充整个视口 */
  margin: 0;                    /* 移除外边距，避免偏移 */
  flex-direction: column;       /* 垂直方向排列子元素 */
}

.t1 > div {
  display: flex;                /* 使用 Flexbox 布局来排列按钮 */
  justify-content: center;      /* 水平居中按钮 */
  gap: 20px;                    /* 按钮之间的间距 */
  flex-direction: row;          /* 按钮并排显示 */
}

.t1 > h1 {
  margin-bottom: 18px;
  font-size: 40px;

}

/* 设置canvas居中 */
canvas {
  border: 2px solid black;
  display: block;
  margin-bottom: 20px;          /* canvas 和按钮之间的间距 */
}

/* 按钮样式 */
button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.speed-control {
  display: flex;
  align-items: center;
  gap: 10px; /* 添加间距 */
  margin-top: 20px; /* 让它与其他内容有间距 */
}

.el-slider {
  width: 200px;
}

.score{
  position: absolute;
  top:11%;
  left:34%;
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

.left-cards {
  display: flex;
  flex-direction: column; /* 垂直排列两个卡片 */
  gap: 80px; /* 卡片之间的间距 */
  position: absolute;
  top: 10%; /* 卡片距离顶部位置 */
  left: 7%; /* 卡片距离左侧位置 */
}

.right-cards {
  display: flex;
  flex-direction: column; /* 垂直排列两个卡片 */
  gap: 80px; /* 卡片之间的间距 */
  position: absolute;
  top: 10%; /* 卡片距离顶部位置 */
  right: 5%; /* 卡片距离左侧位置 */
}

.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #eee;
}

.score-text {
  font-size: 28px;
  color: #42b983;
}

button:hover {
  background-color: #45a049;
}

</style>
