<template>
    <div class="company-bussiness">
        <div>获取鼠标所处位置的dom信息 , 鼠标选中信息</div>
        <div id="context">
            <p>
                <span>文本1</span>
                <span>文本2</span>
                <span>文本3</span>
                <span>文本4</span>
            </p>
            <h1>3</h1>
            <p>123132</p>
        </div>
    </div>
</template>
<script setup  lang='ts'>

function getSelectText() {
    let text = ''
    const selection = window.getSelection()
    if (selection!.toString().length > 0) {
        text = selection!.toString()
    }
    return text
}
function getMouse() {
    const context = document.getElementById('context')
    context?.addEventListener('click', (event) => {
        const target = event.target as unknown as HTMLElement
        if (target !== context) {
            console.log(target.innerText);
        }
    })
    context?.addEventListener('mouseup', () => {
        const selectText = getSelectText()
        console.log(selectText)
    })
}

onMounted(() => {
    getMouse()
})

</script>
<style scoped lang='less'>
.company-bussiness {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    background-color: white;
    height: 100%;
    padding: 1.2rem;
}

#context {
    background-color: aqua;
}
</style>