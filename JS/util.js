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

// 缓存DOM元素以提高性能
const cachedElements = {
    nowScore: null,
    currentScore: null,
    maxScore: null
};

function addScore(number) {
    // 使用缓存的DOM元素
    if (!cachedElements.nowScore) {
        cachedElements.nowScore = document.getElementById("nowScore");
        cachedElements.currentScore = document.querySelector(".FractionBox .Fraction");
        cachedElements.maxScore = document.querySelector(".MaxFraction .Fraction");
    }
    
    // 使用requestAnimationFrame优化动画
    requestAnimationFrame(() => {
        // 创建上升动画的元素
        const spanElement = document.createElement("span");
        spanElement.textContent = "+" + number;
        spanElement.className = 'Fraction rise_score animate__animated animate__fadeOutUp';
        cachedElements.nowScore.appendChild(spanElement);
        
        // 修改分数
        const currentScore = parseInt(cachedElements.currentScore.textContent) + number;
        cachedElements.currentScore.textContent = currentScore;
        
        // 判断是否是最高分
        const maxScore = parseInt(localStorage.getItem("maxScore") || "0");
        if (maxScore < currentScore) {
            localStorage.setItem("maxScore", currentScore.toString());
            cachedElements.maxScore.textContent = currentScore;
        }
        
        // 使用更高效的方式清理元素
        setTimeout(() => {
            if (spanElement.parentNode) {
                spanElement.parentNode.removeChild(spanElement);
            }
        }, 1000);
    });
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
    const list = document.querySelectorAll("#overlay .start");
    for (let i = 0; i < list.length; i++) {
        list[i].remove()
    }
    document.querySelector("#overlay").classList.remove("lose")
    document.querySelector("#overlay").classList.remove("win")
}

// 防抖 - 优化版本
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    }
}

// 节流函数 - 用于高频事件
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 开始游戏 - 使用节流而不是防抖以获得更好的响应性
const throttledMoveUp = throttle(moveUp, 150);
const throttledMoveDown = throttle(moveDown, 150);
const throttledMoveLeft = throttle(moveLeft, 150);
const throttledMoveRight = throttle(moveRight, 150);

function startGame() {
// 定义棋盘的宽高
    for (let i = 0; i < config.col; i++) {
        data.push([])
    }
    const maxScoreElement = document.querySelector(".MaxFraction .Fraction")
    const maxScore = localStorage.getItem("maxScore")
    maxScoreElement.innerText = maxScore ? maxScore : 0
    // 全屏监听 上下左右 - 优化键盘事件处理
    document.addEventListener('keydown', (e) => {
        // 阻止默认行为以防止页面滚动
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
            e.preventDefault();
        }
        
        // 使用switch语句提高性能
        switch (e.key) {
            case "w":
            case "ArrowUp":
                throttledMoveUp();
                break;
            case "s":
            case "ArrowDown":
                throttledMoveDown();
                break;
            case "a":
            case "ArrowLeft":
                throttledMoveLeft();
                break;
            case "d":
            case "ArrowRight":
                throttledMoveRight();
                break;
        }
    }, { passive: false });
    // 随机生成两个红棋子
    randomChess(2);
    randomChess(2);
}

// 生成背景方格 - 优化版本
function createBg() {
    const element = document.getElementById("chessboard");
    const chessboardElements = element.querySelectorAll(".bg");
    const elementWidth = (config.width - (config.col - 1) * config.interval) / config.col + "px";
    const totalCells = config.col * config.col;
    
    // 使用DocumentFragment提高DOM操作性能
    const fragment = document.createDocumentFragment();
    
    // 批量更新样式
    requestAnimationFrame(() => {
        element.style.gridTemplateColumns = `repeat(${config.col}, 1fr)`;
        element.style.gridTemplateRows = `repeat(${config.col}, 1fr)`;
        element.style.gap = config.interval + "px";
        
        const currentCount = chessboardElements.length;
        
        if (currentCount === 0) {
            // 创建所有背景格子
            for (let i = 0; i < totalCells; i++) {
                const item = document.createElement("div");
                item.className = "item bg";
                item.style.width = elementWidth;
                item.style.height = elementWidth;
                fragment.appendChild(item);
            }
            element.appendChild(fragment);
        } else if (currentCount > totalCells) {
            // 删除多余的元素
            for (let i = currentCount - 1; i >= totalCells; i--) {
                chessboardElements[i].remove();
            }
            // 更新剩余元素的尺寸
            for (let i = 0; i < totalCells; i++) {
                chessboardElements[i].style.width = elementWidth;
                chessboardElements[i].style.height = elementWidth;
            }
        } else if (currentCount < totalCells) {
            // 更新现有元素
            for (let i = 0; i < currentCount; i++) {
                chessboardElements[i].style.width = elementWidth;
                chessboardElements[i].style.height = elementWidth;
            }
            // 添加缺少的元素
            for (let i = currentCount; i < totalCells; i++) {
                const item = document.createElement("div");
                item.className = "item bg";
                item.style.width = elementWidth;
                item.style.height = elementWidth;
                fragment.appendChild(item);
            }
            element.appendChild(fragment);
        }
    });
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
