const config  =  {
    // 棋盘大小
    width: 740,
    height: 740,
    // 棋子的类名
    chessClass: 'pawn',
    // 棋子的颜色
    chessColor: [
        'rgba(50,117,46,0.9)', // 2
        'rgba(122, 209, 64, .9)', // 4
        'rgba(241, 229, 214, .9)', // 8
        'rgba(8, 27, 76, .9)', // 16
        'rgba(99, 185, 195, .9)', // 32
        'rgba(204, 44, 29, .9)', // 64
        'rgba(238, 134, 178, .9)', // 128
        'rgba(50,99,102, .9)', // 256
        'rgba(68,32,98, .9)', // 512
        'rgba(50,114,155, .9)', // 1024
        'rgba(237,148,53, .9)' // 2048
    ],
    scoreTarget: 256, // 目标分数
    col:  4, // 列数
    interval : 20, // 方块间隔距离
}