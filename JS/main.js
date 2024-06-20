// 定于棋子数量
let chessNum = 0;
// 获取chessboard 元素
const data = [];
// 生成背景方格
createBg()
// 难度配置事件
// 分数 history_score
const score = document.querySelector(".FractionBox .Fraction");
const difficulty = document.querySelectorAll(".GameDifficulty div");

for (let i = 0; i < difficulty.length; i++) {
    difficulty[i].addEventListener("click",()=>{
        // 清除棋盘 重新开始游戏
        clearChessboard()
        clearStyle()
        config.col = i+4;
        score.innerText = 0;
        createBg()
        startGame()
    });
}
// 定义重新开始游戏
const restartBtn = document.querySelector(".image");
restartBtn.addEventListener("click", () => {
    console.log("重新开始游戏")
    // 清除棋盘 重新开始游戏
    clearChessboard()
    clearStyle()
    score.innerText = 0;
    startGame();
})
const chessboard = document.getElementById("chessboard");
chessboard.style.width = config.width + "px";
chessboard.style.height = config.height + "px";
// 开始游戏
startGame();
