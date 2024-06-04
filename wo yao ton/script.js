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
    './resource/1.jpg',
    './resource/2.jpg',
    './resource/3.jpg',
    './resource/4.jpg',
    './resource/5.jpg',
    './resource/6.jpg',
    './resource/7.jpg',
    './resource/8.jpg',
    './resource/9.jpg',
    './resource/10.jpg',
    './resource/11.jpg',
    './resource/12.jpg',
    './resource/13.jpg',
    './resource/14.jpg',
    './resource/15.jpg',
    './resource/16.jpg',
    './resource/17.jpg',
    './resource/18.jpg',
    './resource/19.jpg',
];

function startPhysics() {
    const { Engine, Render, Runner, Bodies, World, Events, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    const { world } = engine;

    // 創建地面
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 10, {
        isStatic: true
    });

    World.add(world, ground);

    // 創建綠色的反彈區域，確保符合用戶螢幕大小
    const bounceZoneHeight = 500;
    const bounceZoneWidth = window.innerWidth * 0.8;
    const bounceZoneX = (window.innerWidth - bounceZoneWidth) / 2;
    const bounceZoneY = (window.innerHeight - bounceZoneHeight) / 2;

    const bounceZone = Bodies.rectangle(bounceZoneX + bounceZoneWidth / 2, bounceZoneY + bounceZoneHeight / 2, bounceZoneWidth, bounceZoneHeight, {
        isStatic: true,
        render: {
            fillStyle: 'green'
        }
    });

    World.add(world, bounceZone);

    // 創建邊界牆
    const leftWall = Bodies.rectangle(bounceZoneX, bounceZoneY + bounceZoneHeight / 2, 10, bounceZoneHeight, { isStatic: true });
    const rightWall = Bodies.rectangle(bounceZoneX + bounceZoneWidth, bounceZoneY + bounceZoneHeight / 2, 10, bounceZoneHeight, { isStatic: true });
    const topWall = Bodies.rectangle(bounceZoneX + bounceZoneWidth / 2, bounceZoneY, bounceZoneWidth, 10, { isStatic: true });
    const bottomWall = Bodies.rectangle(bounceZoneX + bounceZoneWidth / 2, bounceZoneY + bounceZoneHeight, bounceZoneWidth, 10, { isStatic: true });

    World.add(world, [leftWall, rightWall, topWall, bottomWall]);

    // 隨機選擇一張圖片
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // 創建圓形圖片物體
    const circleSize = 80;
    const initialScale = 0.2;
    const density = 0.001;
    const airFriction = 0.05;
    const restitution = 0.8;

    const circle = Bodies.circle(bounceZoneX + bounceZoneWidth * Math.random(), bounceZoneY + bounceZoneHeight * Math.random(), circleSize / 2, {
        label: 'image',
        density: density,
        frictionAir: airFriction,
        restitution: restitution,
        render: {
            sprite: {
                texture: randomImage,
                xScale: initialScale,
                yScale: initialScale
            }
        }
    });

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

    // 點擊縮小圖片並反彈
    Events.on(mouseConstraint, 'mousedown', (event) => {
        const bodies = Matter.Composite.allBodies(engine.world);
        const mousePosition = event.mouse.position;
        const clickedBodies = Matter.Query.point(bodies, mousePosition);
        clickedBodies.forEach((body) => {
            if (body.label === 'image') {
                Matter.Body.scale(body, 0.5, 0.5);
                Matter.Body.applyForce(body, { x: body.position.x, y: body.position.y }, { x: 0, y: -0.05 });
            }
        });
    });

    // 監聽碰撞事件
    Events.on(engine, 'collisionStart', (event) => {
        const pairs = event.pairs;
        pairs.forEach((pair) => {
            if (pair.bodyA.label === 'image' && pair.bodyB === ground || pair.bodyA === ground && pair.bodyB.label === 'image') {
                endGame(count, render, Runner);
                playCollisionSound();
            }
        });
    });
}

let count = 0;

function endGame(count, render, runner) {
    Matter.Render.stop(render);
    Matter.Runner.stop(runner);

    document.getElementById('canvas').style.display = 'none';
    document.getElementById('count-display').innerText = `桐生: ${count}`;
    document.getElementById('summary').style.display = 'block';
}

function playCollisionSound() {
    const collisionSound = document.getElementById('collision-sound');
    collisionSound.currentTime = 0;
    collisionSound.play();
}
