document.getElementById('button').addEventListener('click', () => {
    document.getElementById('button').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    startPhysics(); // 開始物理模擬
});

document.getElementById('restart-button').addEventListener('click', () => {
    document.getElementById('summary').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    startPhysics(); // 開始物理模擬
});



    // 準備多張圖片的URL
    const images = [
        '/resource/1.jpg',
        '/resource/2.jpg',
        '/resource/3.jpg',
        '/resource/4.jpg',
        '/resource/5.jpg',
        '/resource/6.jpg',
        '/resource/7.jpg',
        '/resource/8.jpg',
        '/resource/9.jpg',
        '/resource/10.jpg',
        '/resource/11.jpg',
        '/resource/12.jpg',
        '/resource/13.jpg',
        '/resource/14.jpg',
        '/resource/15.jpg',
        '/resource/16.jpg',
        '/resource/17.jpg',
        '/resource/18.jpg',
        '/resource/19.jpg',
    ];

    function startPhysics() {
        const { Engine, Render, Runner, Bodies, World, Mouse, MouseConstraint, Events, Query } = Matter;

    const engine = Engine.create();
    const { world } = engine;

    // 隨機選擇一張圖片
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // 創建圓形圖片物體
    const circleSize = 80;
    const circle = Bodies.circle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, circleSize / 2, {
        label: 'image',
        render: {
            sprite: {
                texture: randomImage,
                xScale: circleSize / 10,
                yScale: circleSize / 10
            }
        }
    });

    // 添加圖片物體到世界
    World.add(world, [circle]);

    // 創建渲染器
    const render = Render.create({
        element: document.body,
        canvas: document.getElementById('canvas'),
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: '#88ee9b'
        }
    });

    Render.run(render);
    Runner.run(Runner.create(), engine);

    // 開始監聽碰撞事件
    Events.on(engine, 'collisionStart', event => {
        const pairs = event.pairs;
        pairs.forEach(pair => {
            if ((pair.bodyA.label === 'image' && pair.bodyB === ground) || (pair.bodyA === ground && pair.bodyB.label === 'image')) {
                count++;
                endGame(count, render, Runner);
                playCollisionSound(); // 播放碰撞音效
            }
        });
    });
}

// 計算次數變數
let count = 0;

// 結束遊戲函數
function endGame(count, render, runner) {
    // 停止Matter.js
    Matter.Render.stop(render);
    Matter.Runner.stop(runner);

    // 隱藏畫布並顯示結算畫面
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('count-display').innerText = `桐生: ${count}`;
    document.getElementById('summary').style.display = 'block';
}

// 播放碰撞音效的函式
function playCollisionSound() {
    const collisionSound = document.getElementById('collision-sound');
    collisionSound.currentTime = 0; // 將音效時間設置為開始
    collisionSound.play(); // 播放音效
}
