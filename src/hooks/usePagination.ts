import { ref, watchEffect } from "vue";


// 1.外部参数更新后 自动调用
export function usePagination(Fn: ()=>Promise<any>) {
    const data=ref()
    const queryFn = async () => {
        try {
            const result = await Fn();
            onSuccess(JSON.parse(result))
        } catch (err) { 
            console.log(err ,'err');
        }
        
    }

    function onSuccess(data: any) {
        data.value=data
    }

    watchEffect(() => {
        queryFn()
    });
    return {
        data
    }
}