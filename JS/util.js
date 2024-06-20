// 随机生成一个棋子
function randomChess(color, number) {

    if (chessNum >= 16){
        // 游戏结束
        lose()
        return
    }
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);
    // 判断当前位置是否已经有棋子
    while (data[x][y]) {
        x = Math.floor(Math.random() * 4);
        y = Math.floor(Math.random() * 4);
    }
    if (number === undefined) {
        // 随机2和4
        number = Math.random() < 0.5 ? 2 : 4
    }
    data[x][y] = new Pawn(color, {x, y}, config.chessClass, number, chessboard);
    // 棋子数量+1
    chessNum++
}

// 移动棋子 上
function moveUp() {
    // 分数
    let score = 0;
    // 是否增加分数
    let isAddScore = false;
    // 从第二排开始
    for (let x = 0; x < 4; x++) {
        for (let y = 1; y < 4; y++) {
            if (data[x][y]) {
                // 移动棋子 从当前位置开始，向上查找
                for (let i = y - 1; i >= 0; i--) {
                    if (!data[x][i]) {
                        data[x][i + 1].moveUp()
                        data[x][i] = data[x][i + 1]
                        data[x][i + 1] = undefined
                    } else {
                        if (data[x][i + 1].number === data[x][i].number) {
                            data[x][i].number *= 2         // 数字翻倍
                            data[x][i + 1].isAlive = false // 移除棋子
                            data[x][i + 1] = undefined     // 清空当前位置
                            isAddScore = true              // 增加分数
                            score += data[x][i].number     // 增加分数
                            chessNum-- // 棋子数量-1

                            if (score >= config.scoreTarget) {
                                // 游戏胜利
                                win()
                            }
                            break
                        }
                    }
                }
            }
        }
    }
    if (isAddScore) {
        addScore(score)
    }
    randomChess("red")
}

// 移动棋子 下
function moveDown() {
    // 分数
    let score = 0;
    // 是否增加分数
    let isAddScore = false;
    // 从倒数第二排开始
    for (let x = 0; x < 4; x++) {
        for (let y = 2; y >= 0; y--) {
            if (data[x][y]) {
                // 移动棋子 从当前位置开始，向下查找
                for (let i = y + 1; i < 4; i++) {
                    if (!data[x][i]) {
                        data[x][i - 1].moveDown()
                        data[x][i] = data[x][i - 1]
                        data[x][i - 1] = undefined
                    } else {
                        // 判断是否可以合并
                        if (data[x][i - 1].number === data[x][i].number) {
                            data[x][i].number *= 2            // 数字翻倍
                            data[x][i - 1].isAlive = false   // 移除棋子
                            data[x][i - 1] = undefined       // 清空当前位置
                            isAddScore = true                // 增加分数
                            score += data[x][i].number      // 增加分数
                            chessNum-- // 棋子数量-1
                            if (score >= config.scoreTarget) {
                                // 游戏胜利
                                win()
                            }
                            break
                        }
                    }
                }
            }
        }
    }
    if (isAddScore) {
        addScore(score)
    }
    randomChess("red")
}

// 移动棋子 左
function moveLeft() {
    // 分数
    let score = 0;
    // 是否增加分数
    let isAddScore = false;
    // 从第二列开始
    for (let y = 0; y < 4; y++) {
        for (let x = 1; x < 4; x++) {
            if (data[x][y]) {
                // 移动棋子 从当前位置开始，向左查找
                for (let i = x - 1; i >= 0; i--) {
                    if (!data[i][y]) {
                        data[i + 1][y].moveLeft()
                        data[i][y] = data[i + 1][y]
                        data[i + 1][y] = undefined
                    } else {
                        // 判断是否可以合并
                        if (data[i + 1][y].number === data[i][y].number) {
                            data[i][y].number *= 2 // 数字翻倍
                            data[i + 1][y].isAlive = false // 移除棋子
                            data[i + 1][y] = undefined // 清空当前位置
                            isAddScore = true // 增加分数
                            score += data[i][y].number // 增加分数
                            chessNum-- // 棋子数量-1
                            if (score >= config.scoreTarget) {
                                // 游戏胜利
                                win()
                            }
                            break
                        }
                    }
                }
            }
        }
    }
    if (isAddScore) {
        addScore(score)
    }
    randomChess("red")
}

// 移动棋子 右
function moveRight() {
    // 分数
    let score = 0;
    // 是否增加分数
    let isAddScore = false;
    // 从第二列开始
    for (let y = 0; y < 4; y++) {
        for (let x = 2; x >= 0; x--) {
            if (data[x][y]) {
                // 移动棋子 从当前位置开始，向左查找
                for (let i = x + 1; i < 4; i++) {
                    if (!data[i][y]) {
                        data[i - 1][y].moveRight()
                        data[i][y] = data[i - 1][y]
                        data[i - 1][y] = undefined
                    } else {
                        // 判断是否可以合并
                        if (data[i - 1][y].number === data[i][y].number) {
                            data[i][y].number *= 2 // 数字翻倍
                            data[i - 1][y].isAlive = false // 移除棋子
                            data[i - 1][y] = undefined // 清空当前位置
                            isAddScore = true // 增加分数
                            score += data[i][y].number // 增加分数
                            chessNum-- // 棋子数量-1
                            if (score >= config.scoreTarget) {
                                // 游戏胜利
                                win()
                            }
                            break
                        }
                    }
                }
            }
        }
    }
    if (isAddScore) {
        addScore(score)
    }
    randomChess("red")
}

//-------------------------------分数的逻辑--------------------------------

function addScore(number) {
    const fatherElement = document.getElementById("nowScore");
    const element = document.querySelector(".FractionBox .Fraction")
    const maxScoreElement = document.querySelector(".MaxFraction .Fraction")
    // 创建上升动画的元素
    const spanElement = document.createElement("span");
    // 设置span的内容
    spanElement.innerText = "+" + number;
    // 设置span的样式
    spanElement.className = 'Fraction rise_score animate__animated animate__fadeOutUp';
    fatherElement.appendChild(spanElement)
    // 修改分数
    element.innerText = parseInt(element.innerText) + number
    // 判断是否是最高分
    const maxScore = localStorage.getItem("maxScore");
    if (maxScore < parseInt(element.innerText)) {
        localStorage.setItem("maxScore",element.innerText)
        maxScoreElement.innerText = element.innerText
    }
    // 1. 秒数后删除span
    const timer = setTimeout(() => {
        spanElement.remove()
        clearTimeout(timer)
    }, 1000)
}

// 赢的样式
function win() {
    document.onkeydown = null;
    document.querySelector("#overlay").classList.add("win")
}

// 输的样式
function lose() {
    document.onkeydown = null;
    document.querySelector("#overlay").classList.add("lose")
}

// 输赢样式清除
function clearStyle() {
    document.querySelector("#overlay").classList.remove("lose")
    document.querySelector("#overlay").classList.remove("win")
}
// 开始游戏
function startGame() {
    const maxScoreElement = document.querySelector(".MaxFraction .Fraction")
    const maxScore = localStorage.getItem("maxScore")
    maxScoreElement.innerText = maxScore ? maxScore : 0
    // 全屏监听 上下左右
    document.onkeydown = (e) => {
        // w 和 上键
        if (e.key === "w" || e.key === "ArrowUp") {
            debounce(moveUp, 100)()
        }
        // s 和 下键
        else if (e.key === "s" || e.key === "ArrowDown") {
            debounce(moveDown, 100)()
        }
        // a 和 左键
        else if (e.key === "a" || e.key === "ArrowLeft") {
            debounce(moveLeft, 100)()
        }
        // d 和 右键
        else if (e.key === "d" || e.key === "ArrowRight") {
            debounce(moveRight, 100)()
        }
    }
    // 随机生成两个红棋子
    randomChess("red", 2);
    randomChess("red", 2)
}


// 防抖
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}