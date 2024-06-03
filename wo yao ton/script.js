document.getElementById('button').addEventListener('click', () => {
    document.getElementById('button').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    startPhysics();
});

document.getElementById('restart-button').addEventListener('click', () => {
    document.getElementById('summary').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    startPhysics();
});

function startPhysics() {
    const { Engine, Render, Runner, Bodies, World, Mouse, MouseConstraint } = Matter;

    // 準備多張圖片的URL
    const images = [
        'resource/1.jpg',
        'resource/2.jpg',
        'resource/3.jpg',
        'resource/4.jpg',
        'resource/5.jpg',
        'resource/6.jpg',
        'resource/7.jpg',
        'resource/8.jpg',
        'resource/9.jpg',
        'resource/10.jpg',
        'resource/11.jpg',
        'resource/12.jpg',
        'resource/13.jpg',
        'resource/14.jpg',
        'resource/15.jpg',
        'resource/16.jpg',
        'resource/17.jpg',
        'resource/18.jpg',
        'resource/19.jpg',
    ];

    // 隨機選擇一張圖片
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // 創建引擎
    const engine = Engine.create();
    const { world } = engine;

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

    // 添加地面
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 60, { isStatic: true });

    // 添加物體到世界
    World.add(world, [circle, ground]);

    // 添加鼠標控制
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    World.add(world, mouseConstraint);

    render.mouse = mouse;

    // 確保畫布大小隨窗口大小變化
    window.addEventListener('resize', () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight });
    });

    // 觸摸事件支持
    if ('ontouchstart' in window) {
        const touch = Mouse.create(render.canvas);
        Mouse.setElement(touch, render.canvas);
        mouseConstraint.constraint.mouse = touch;
    }
}

// 計算次數變數
let count = 0;

// 碰撞事件檢測
Events.on(engine, 'collisionStart', event => {
    const pairs = event.pairs;
    pairs.forEach(pair => {
        if ((pair.bodyA === ground && pair.bodyB.label === 'circle') || (pair.bodyA.label === 'circle' && pair.bodyB === ground)) {
            count++;
            endGame(count, render, Runner);
        }
    });
});

const circleSize = 80; // 圓形圖片的大小

// 創建一個圓形圖片物體
const circle = Bodies.circle(400, 200, circleSize / 2, { // 400和200是圓形圖片的初始位置
    label: 'circle', // 添加了標籤，用於碰撞事件檢測
    render: {
        sprite: {
            texture: randomImage, // 使用隨機選擇的圖片
            xScale: circleSize / 10, // 根據圖片大小設置比例
            yScale: circleSize / 10 // 根據圖片大小設置比例
        }
    }
});
// 添加物體到世界
World.add(world, [circle]);


function endGame(count, render, runner) {
    // 停止Matter.js
    Matter.Render.stop(render);
    Matter.Runner.stop(runner);

    // 隱藏畫布並顯示結算畫面
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('count-display').innerText = `桐生: ${count}`;
    document.getElementById('summary').style.display = 'block';
}