// 定于棋子数量
let chessNum = 0;
// 获取chessboard 元素
let data = [[], [], [], []];
// 定义重新开始游戏
const restartBtn = document.querySelector(".image");
// 分数 history_score
const score = document.querySelector(".FractionBox .Fraction");
restartBtn.addEventListener("click", () => {
    console.log("重新开始游戏")
    // 清除棋盘 重新开始游戏
    clearStyle()
    chessNum = 0;
    score.innerText = 0;
    // 遍历棋盘
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (data[i][j]) {
                data[i][j].isAlive = false;
                data[i][j] = undefined;
            }
        }
    }
    startGame();
})
const chessboard = document.getElementById("chessboard");
chessboard.style.width = config.width + "px";
chessboard.style.height = config.height + "px";
// 开始游戏
startGame();

