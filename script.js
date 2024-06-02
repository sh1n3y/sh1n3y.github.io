const images = [
    'resource/0.png',
    'resource/1.png',
    'resource/2.png',
    'resource/3.png',
    'resource/4.png',
    'resource/5.png',
    'resource/6.png',
    'resource/7.png',
    'resource/8.png',
    'resource/9.png',
    'resource/99.png',
    'resource/999.png'
];

document.getElementById('dropImageBtn').addEventListener('click', () => {
    dropRandomImage();
    changeButtonSizeRandomly();
});

function dropRandomImage() {
    const imageContainer = document.getElementById('imageContainer');
    
    const img = document.createElement('img');
    img.src = getRandomImage();
    img.style.top = getRandomPosition(imageContainer.clientHeight) + 'px';
    img.style.left = getRandomPosition(imageContainer.clientWidth) + 'px';
    img.style.width = getRandomSize(50, 200) + 'px'; // 隨機寬度
    img.style.height = 'auto'; // 保持比例
    img.style.clipPath = getRandomClipPath(); // 隨機剪裁路徑

    imageContainer.appendChild(img);
}

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
}
function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
}

function getRandomSize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;}

function getRandomClipPath() {
    const clipPaths = [
        'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)', // 六邊形
        'polygon(25% 25%, 75% 25%, 75% 75%, 25% 75%)', // 方形
        'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // 菱形
        'polygon(50% 0%, 85% 20%, 100% 50%, 85% 80%, 50% 100%, 15% 80%, 0% 50%, 15% 20%)', // 八邊形
        'polygon(20% 30%, 40% 20%, 60% 30%, 70% 50%, 60% 70%, 40% 80%, 20% 70%, 10% 50%)', // 不規則形狀
        'polygon(20% 10%, 80% 10%, 90% 40%, 70% 90%, 30% 90%, 10% 40%)', // 不規則形狀
        'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', // 五邊形
        'ellipse(50% 50% at 50% 50%)', // 圓形
        'ellipse(60% 40% at 50% 50%)', // 橢圓形
        'ellipse(40% 60% at 50% 50%)', // 橢圓形
        'polygon(20% 30%, 40% 20%, 60% 30%, 70% 50%, 60% 70%, 40% 80%, 20% 70%, 10% 50%)', // 圓滑的多邊形
        'polygon(30% 20%, 70% 20%, 80% 50%, 70% 80%, 30% 80%, 20% 50%)', // 圓滑的多邊形
    ];
    const randomIndex = Math.floor(Math.random() * clipPaths.length);
    return clipPaths[randomIndex];
}

function moveButtonRandomly() {
    const button = document.getElementById('dropImageBtn');
    const container = document.body; // 假設按鈕在 body 內部，可以換成其他容器
    const maxWidth = container.clientWidth - button.clientWidth;
    const maxHeight = container.clientHeight - button.clientHeight;
    
    const newLeft = getRandomPosition(maxWidth) + 'px';
    const newTop = getRandomPosition(maxHeight) + 'px';
    
    button.style.position = 'absolute';
    button.style.left = newLeft;
    button.style.top = newTop;
}

function changeButtonSizeRandomly() {
    const button = document.getElementById('dropImageBtn');
    const newWidth = getRandomSize(100, 300) + 'px'; // 隨機寬度
    const newHeight = getRandomSize(30, 100) + 'px'; // 隨機高度
    
    button.style.width = newWidth;
    button.style.height = newHeight;
}
