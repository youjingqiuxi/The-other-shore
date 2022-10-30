/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 / Tayun_Starry ]
*/

//导入< Beta_API >预设接口
import { BlockLocation, world } from "@minecraft/server"

//导入< 项目功能 >预设接口
import { 专用界面, 专用组件 } from './function'

//订阅< 系统侦听 >
world.events.beforeItemUseOn.subscribe((使用物品) => { //当玩家手持物品点击方块时
    //定义实现当前功能所需的变量
    let 查询坐标 = `${使用物品.blockLocation.x} ${使用物品.blockLocation.y} ${使用物品.blockLocation.z}`
    let 方块坐标 = 使用物品.blockLocation
    let 当前玩家 = 使用物品.source
    //使用物品时的自定义效果
    switch (使用物品.item.typeId) {
        case '拟态矩阵:标记起点':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '标记起点', 查询坐标)
            break

        case '拟态矩阵:标记终点':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '标记终点', 查询坐标)
            break

        case '拟态矩阵:开始填充':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '开始填充')
            break

        case '拟态矩阵:标记方块':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '等待方块')
            break

        case '拟态矩阵:方块标定':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '方块标定')
            break

        case '拟态矩阵:方块调试':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '方块调试')
            break

        case '特殊道具:物资整理':
            专用组件.物资整理(当前玩家, 查询坐标)
            break

        default:
            break
    }
}
)
world.events.beforeItemUse.subscribe((使用物品) => { //当玩家使用物品时
    //使用物品时的自定义效果
    switch (使用物品.item.typeId) {
        case '基础书籍:魔导手册':
            switch (使用物品.source.isSneaking) {
                case true:
                    专用界面.辅助说明(使用物品.source, '基础目录')
                    break
            }
            break

        case '魔法礼盒:匣里乾坤':
            专用组件.匣里乾坤(使用物品.source)
            break

        case '魔法书籍:瞬间移动':
            switch (使用物品.source.isSneaking) {
                case true:
                    专用界面.瞬间移动(使用物品.source)
                    break

                case false:
                    使用物品.source.runCommand(`spreadplayers ~ ~ 5 15 @s`)
                    break
            }
            break

        case '特殊道具:锚点虚印':
            专用界面.锚点虚印(使用物品.source)
            break

        case '特殊道具:状态显示':
            专用组件.状态显示(使用物品.source)
            break

        default:
            break
    }
}
)
world.events.beforeChat.subscribe((发送信息) => { //侦听聊天栏输入
    //定义实现当前功能所需的变量
    var 用户 = 发送信息.sender
    var 内容 = 发送信息.message
    var 名称 = `"` + `${用户.nameTag}` + `"`
    //定义新增命令
    if (内容.startsWith(`in: `) || 内容.startsWith(`<!>: `) || 内容.startsWith(`<$>:`) || 内容.startsWith(`!: `) || 内容.startsWith(`#: `)) {
        //执行自定义指令
        专用组件.彼岸指令(用户, 内容, 名称)
        //撤回玩家发送的信息内容
        发送信息.cancel = true
    }
}
)

//world.events.beforeDataDrivenEntityTriggerEvent.subscribe((游戏事件) => {游戏事件.id})