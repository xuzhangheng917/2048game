// 性能监控和优化工具
class PerformanceOptimizer {
    constructor() {
        this.fps = 0;
        this.lastTime = 0;
        this.frameCount = 0;
        this.isMonitoring = false;
        
        this.init();
    }
    
    init() {
        // 预加载图片资源
        this.preloadImages();
        
        // 监控FPS
        if (window.requestAnimationFrame) {
            this.startFPSMonitor();
        }
        
        // 优化滚动性能
        this.optimizeScroll();
        
        // 内存清理
        this.setupMemoryCleanup();
    }
    
    // 预加载关键图片资源
    preloadImages() {
        const images = [
            './assets/image/win.gif',
            './assets/image/lose.gif',
            './assets/image/cry.gif',
            './assets/image/Star1.png',
            './assets/image/Star2.png',
            './assets/image/Star3.png'
        ];
        
        const imagePromises = images.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = src;
            });
        });
        
        Promise.all(imagePromises)
            .then(() => console.log('所有关键图片已预加载'))
            .catch(err => console.warn('图片预加载失败:', err));
    }
    
    // FPS监控
    startFPSMonitor() {
        this.isMonitoring = true;
        const monitor = (currentTime) => {
            if (this.lastTime === 0) {
                this.lastTime = currentTime;
            }
            
            this.frameCount++;
            
            if (currentTime - this.lastTime >= 1000) {
                this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
                this.frameCount = 0;
                this.lastTime = currentTime;
                
                // 如果FPS过低，启用性能优化模式
                if (this.fps < 30) {
                    this.enablePerformanceMode();
                }
            }
            
            if (this.isMonitoring) {
                requestAnimationFrame(monitor);
            }
        };
        
        requestAnimationFrame(monitor);
    }
    
    // 启用性能优化模式
    enablePerformanceMode() {
        console.log('检测到低FPS，启用性能优化模式');
        
        // 减少动画效果
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
            .animate__animated {
                animation-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
        
        // 降低动画质量
        document.body.style.transform = 'translateZ(0)';
    }
    
    // 优化滚动性能
    optimizeScroll() {
        let ticking = false;
        
        const updateScroll = () => {
            // 滚动相关的性能优化逻辑
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    // 内存清理
    setupMemoryCleanup() {
        // 定期清理不需要的DOM元素
        setInterval(() => {
            const removedElements = document.querySelectorAll('[data-removed="true"]');
            removedElements.forEach(el => {
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            });
        }, 5000);
    }
    
    // 获取性能信息
    getPerformanceInfo() {
        return {
            fps: this.fps,
            memory: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1048576),
                total: Math.round(performance.memory.totalJSHeapSize / 1048576),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
            } : null,
            timing: performance.timing ? {
                loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
                domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
            } : null
        };
    }
    
    // 停止监控
    stop() {
        this.isMonitoring = false;
    }
}

// 创建性能优化器实例
const performanceOptimizer = new PerformanceOptimizer();

// 在控制台显示性能信息
if (window.console) {
    setTimeout(() => {
        console.log('性能信息:', performanceOptimizer.getPerformanceInfo());
    }, 3000);
}

// 导出给其他模块使用
window.PerformanceOptimizer = performanceOptimizer;