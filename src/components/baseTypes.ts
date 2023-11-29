export type btnType = {
    class: 'add-btn' | 'ban-btn',
    color: '#F5F5F5' | "#0083FF",
    label: string,
    clickFn: Function,
    icon: 'delIcon' | 'addicon' | 'reUseIcon' | 'banIcon'
}

export type ConfigType = {
    name: 'input' | 'select' | 'date-range',
    label: string,
    keyVal: string,
    value: any,
    labelwidth?: string,
    options?: Array<Record<string, any>>,
}

export type DrawContentType = {
    keyVal: string,
    label: string,
    vnodeName: 'divider' | 'imgBox' | 'labelKey' | 'title',
    weight: '400' | '500',
    textcolor?:string
}