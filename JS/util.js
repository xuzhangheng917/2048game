// 随机生成一个棋子
function randomChess(number) {

    if (chessNum >= config.col * config.col) {
        // 游戏结束
        lose()
        return
    }
    let x = Math.floor(Math.random() * config.col);
    let y = Math.floor(Math.random() * config.col);
    // 判断当前位置是否已经有棋子
    while (data[x][y]) {
        x = Math.floor(Math.random() * config.col);
        y = Math.floor(Math.random() * config.col);
    }
    if (number === undefined) {
        // 随机2和4
        number = Math.random() < 0.5 ? 2 : 4
    }
    data[x][y] = new Pawn({x, y}, config.chessClass, number, chessboard);
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
    for (let x = 0; x < config.col; x++) {
        for (let y = 1; y < config.col; y++) {
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
    randomChess()
}

// 移动棋子 下
function moveDown() {
    // 分数
    let score = 0;
    // 是否增加分数
    let isAddScore = false;
    // 从倒数第二排开始
    for (let x = 0; x < config.col; x++) {
        for (let y = config.col - 2; y >= 0; y--) {
            if (data[x][y]) {
                // 移动棋子 从当前位置开始，向下查找
                for (let i = y + 1; i < config.col; i++) {
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
    randomChess()
}

// 移动棋子 左
function moveLeft() {
    // 分数
    let score = 0;
    // 是否增加分数
    let isAddScore = false;
    // 从第二列开始
    for (let y = 0; y < config.col; y++) {
        for (let x = 1; x < config.col; x++) {
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
    randomChess()
}

// 移动棋子 右
function moveRight() {
    // 分数
    let score = 0;
    // 是否增加分数
    let isAddScore = false;
    // 从第二列开始
    for (let y = 0; y < config.col; y++) {
        for (let x = config.col - 2; x >= 0; x--) {
            if (data[x][y]) {
                // 移动棋子 从当前位置开始，向左查找
                for (let i = x + 1; i < config.col; i++) {
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
    randomChess()
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
        localStorage.setItem("maxScore", element.innerText)
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
    // 创建第3颗星星
    const star1 = document.createElement("div");
    const star2 = document.createElement("div");
    const star3 = document.createElement("div");
    const starList = [star1,star2,star3]
    // 添加类名
    star1.className = "start start_1 animate__animated animate__lightSpeedInLeft";
    star2.className = "start start_2 animate__animated animate__slideInDown";
    star3.className = "start start_3 animate__animated animate__lightSpeedInRight";
    const overlay = document.querySelector("#overlay");
    overlay.classList.add("win");
    // 添加星星
    for (let i = 0; i < 3; i++) {
        const timer = setTimeout(() => {
            overlay.appendChild(starList[i])
            clearTimeout(timer)
        }, 1200 * (i + 1))
    }
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

// 防抖
function debounce(func, wait) {
    let timeout;
    return function () {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func()
        }, wait);
    }
}

// 开始游戏、
const debounceMoveUp = debounce(moveUp, 200);
const debounceMoveDown = debounce(moveDown, 200);
const debounceMoveLeft = debounce(moveLeft, 200);
const debounceMoveRight = debounce(moveRight, 200);

function startGame() {
// 定义棋盘的宽高
    for (let i = 0; i < config.col; i++) {
        data.push([])
    }
    const maxScoreElement = document.querySelector(".MaxFraction .Fraction")
    const maxScore = localStorage.getItem("maxScore")
    maxScoreElement.innerText = maxScore ? maxScore : 0
    // 全屏监听 上下左右
    document.onkeydown = (e) => {
        // w 和 上键
        if (e.key === "w" || e.key === "ArrowUp") {
            debounceMoveUp();
        }
        // s 和 下键
        else if (e.key === "s" || e.key === "ArrowDown") {
            debounceMoveDown();
        }

        // a 和 左键
        else if (e.key === "a" || e.key === "ArrowLeft") {
            debounceMoveLeft();
        }
        // d 和 右键
        else if (e.key === "d" || e.key === "ArrowRight") {
            debounceMoveRight();
        }
    }
    // 随机生成两个红棋子
    randomChess(2);
    randomChess(2);
}

// 生成背景方格
function createBg() {
    const element = document.getElementById("chessboard"); // 获取元素
    const chessboardElement = document.querySelectorAll("#chessboard .bg"); // 获取元素
    const elementWith = (config.width - (config.col - 1) * config.interval) / config.col + "px";
    element.style.gridTemplateColumns = `repeat(${config.col},1fr)`; // 1fr 代表平均分配
    element.style.gridTemplateRows = `repeat(${config.col},1fr)`;  // 1fr 代表平均分配
    element.style.gap = config.interval + "px"; // 间距
    // <div className="item"></div>
    // 判断当前item 是否多余
    if (chessboardElement.length === 0) {
        for (let i = 0; i < config.col * config.col; i++) {
            const item = document.createElement("div");
            item.className = "item bg";
            item.style.width = elementWith;
            item.style.height = elementWith;
            element.appendChild(item);
        }
        return
    }
    // 判断当前item 是否对于 删除多余的 重新设置宽度
    if (chessboardElement.length > config.col * config.col) {
        for (let i = 0; i < chessboardElement.length; i++) {
            if (i >= config.col * config.col) {
                element.removeChild(chessboardElement[i])
            } else {
                chessboardElement[i].style.width = elementWith;
                chessboardElement[i].style.height = elementWith;
            }
        }
    }
    // 判断当前item 是否不足
    if (chessboardElement.length < config.col * config.col) {
        for (let i = 0; i < config.col * config.col; i++) {
            if (i >= chessboardElement.length) {
                const item = document.createElement("div");
                item.className = "item bg";
                item.style.width = elementWith;
                item.style.height = elementWith;
                element.appendChild(item);
            } else {
                chessboardElement[i].style.width = elementWith;
                chessboardElement[i].style.height = elementWith;
            }
        }
    }
}

// 清理棋盘
function clearChessboard() {
    for (let i = 0; i < config.col; i++) {
        for (let j = 0; j < config.col; j++) {
            if (data[i][j]) {
                data[i][j].isAlive = false;
                data[i][j] = undefined;
            }
        }
    }
    chessNum = 0;
}