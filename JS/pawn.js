class Pawn {
    #color;
    #position;
    #isAlive;
    #div = document.createElement('div');
    width = 170;
    // 间隔
    interval = 20;
    // 数字
    #number = 0;

    #init() {
        // 数据劫持
        Object.defineProperty(this, 'color', {
            get() {
                return this.#color;
            },
            set(value) {
                // 给color赋值时，同时修改div的背景颜色
                this.#div.style.backgroundColor = value;
                this.#color = value;
            }
        });
        // 位置
        Object.defineProperty(this, 'position', {
            get() {
                return this.#position;
            },
            set(value) {
                const result = {
                    x: 0,
                    y: 0
                }
                // 计算位置
                result.x = value.x * (this.width + this.interval); // 4 是棋盘的格子数
                result.y = value.y * (this.width + this.interval);
                // 给position赋值时，同时修改div的transform属性
                this.#div.style.top = `${result.y + this.interval}px`;
                this.#div.style.left = `${result.x + this.interval}px`;
                this.#position = value;
            }
        })
        // 是否存活
        Object.defineProperty(this, 'isAlive', {
            get() {
                return this.#isAlive;
            },
            set(value) {
                this.#isAlive = value;
                if (!value) {
                    // 不存活时，隐藏div
                    this.#div.style.display = 'none';
                    // 销毁div
                    this.#div.remove();
                }
            }
        })
        // 劫持数字
        Object.defineProperty(this, 'number', {
            get() {
                return this.#number;
            },
            set(value) {
                // 修改div的innerText
                this.#div.innerText = value;
                // 按照数字修改div的className 以便显示不同的颜色
                this.#div.style.backgroundColor = config.chessColor[Math.log2(value) - 1];
                // 修改number的值
                this.#number = value;
            }
        })
    }

    constructor(color, position, className, number, element) {
        // 初始化
        this.#init();
        this.color = color; // 这将触发 color 的 setter
        this.position = position; // 这将触发 position 的 setter
        this.#div.className = className + ' item animate__animated animate__zoomIn'
        this.number = number;
        element.appendChild(this.#div);
    }
    moveUp(){
        this.position = {
            x: this.position.x,
            y: this.position.y - 1
        }
    }
    moveDown(){
        this.position = {
            x: this.position.x,
            y: this.position.y + 1
        }
    }
    moveLeft(){
        this.position = {
            x: this.position.x - 1,
            y: this.position.y
        }
    }
    moveRight(){
        this.position = {
            x: this.position.x + 1,
            y: this.position.y
        }
    }
}