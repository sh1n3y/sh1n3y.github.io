document.getElementById('button').addEventListener('click', () => {
    document.getElementById('button').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    startPhysics(); // 添加此行以開始物理模擬
});

document.getElementById('restart-button').addEventListener('click', () => {
    document.getElementById('summary').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    startPhysics(); // 添加此行以重新啟動物理模擬
});

// 播放音效
document.getElementById('button').addEventListener('click', () => {
    document.getElementById('clickSound').play();
});

function startPhysics() {
    const { Engine, Render, Runner, Bodies, World, Mouse, MouseConstraint, Events, Query } = Matter;

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

    const engine = Engine.create();
    const render = Render.create({
        element: document.body,
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

    const { world } = engine;

    Events.on(engine, 'mousedown', event => {
        const mousePosition = event.mouse.position;
        const clickedBodies = Query.point(world.bodies, mousePosition);

        clickedBodies.forEach(body => {
            if (body.label === 'image') {
                let scale = 1;
                const scaleInterval = setInterval(() => {
                    scale -= 0.1;
                    Matter.Body.scale(body, scale, scale);

                    if (scale <= 0) {
                        clearInterval(scaleInterval);
                        World.remove(world, body);
                    }
                }, 100);
            }
        });
    });

    const circleSize = 80;

    const randomImage = images[Math.floor(Math.random() * images.length)];
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

    World.add(world, [circle]);

    // 碰撞事件檢測
    Events.on(engine, 'collisionStart', event => {
        const pairs = event.pairs;
        pairs.forEach(pair => {
            if ((pair.bodyA === ground && pair.bodyB.label === 'circle') || (pair.bodyA.label === 'circle' && pair.bodyB === ground)) {
                count++;
                endGame(count, render, Runner);
                playCollisionSound();
            }
        });
    });

    // 播放碰撞音效的函式
    function playCollisionSound() {
        const collisionSound = document.getElementById('collision-sound');
        collisionSound.currentTime = 0;
        collisionSound.play();
    }
}
