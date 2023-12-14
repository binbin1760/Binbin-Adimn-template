<template>
    <div class="canvasbox">
        <canvas id="canvas"></canvas>
    </div>
</template>
<script setup  lang='ts'>
function drawCanvas() {
    let canvas = document.getElementById('canvas') as unknown as any
    let ctx = canvas?.getContext('2d')
    canvas.width = 800; // 设置实际像素宽度
    canvas.height = 600; // 设置实际像素高度
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(10, 10, 80, 80);
    ctx.strokeRect(90, 90, 20, 20);
    ctx.clearRect(30, 30, 40, 40);
}
onMounted(() => {
    drawCanvas()
})
</script>
<style scoped lang='less'>
.canvasbox {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    background-color: white;
    height: 100%;
    padding: 1.2rem;
    box-sizing: border-box;

    #canvas {
        border: 1px solid #000000;
        width: 800px;
        height: 600px;
    }
}
</style>