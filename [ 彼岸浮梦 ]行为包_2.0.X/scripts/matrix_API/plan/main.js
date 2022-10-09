/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 | Tayun_Starry | <in>_taiyu ]
*/

//导入< 香草 >预设接口
import { world } from "mojang-minecraft"

//导入< 矩阵 >预设接口
import { 专用界面, 通用组件, 专用组件 } from './function'
import { 辅助说明 } from './show_help'

//订阅< 系统侦听 >
world.events.beforeItemUseOn.subscribe((使用物品) => { //侦听点击方块时
    //定义实现当前功能所需的变量
    const 查询坐标 = `${使用物品.blockLocation.x} ${使用物品.blockLocation.y} ${使用物品.blockLocation.z}`
    const 方块坐标 = 使用物品.blockLocation
    const 当前玩家 = 使用物品.source
    //使用物品时的自定义效果
    switch (使用物品.item.id) {
        case '拟态矩阵:标记起点':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, `标记起点`, 查询坐标)
            break

        case '拟态矩阵:标记终点':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, `标记终点`, 查询坐标)
            break

        case '拟态矩阵:开始填充':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, `开始填充`, 查询坐标)
            break

        case '拟态矩阵:标记方块':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, `等待方块`, 查询坐标)
            break

        default:
            break
    }
}
)
world.events.beforeItemUse.subscribe((使用物品) => { //侦听使用物品时
    //使用物品时的自定义效果
    switch (使用物品.item.id) {
        case '基础书籍:魔导手册':
            switch (使用物品.source.isSneaking) {
                case true:
                    辅助说明.目录(使用物品.source)
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
            switch (使用物品.source.isSneaking) {
                case true:
                    专用界面.锚点虚印(使用物品.source)
                    break

                case false:
                    //定义实现当前功能所需的变量
                    var 玩家名称 = `"` + `${使用物品.source.name}` + `"`
                    //实现接口功能
                    try {
                        使用物品.source.runCommand(`title @s actionbar 正在召集 |> @e[tag=${玩家名称},tag=!SitDown] <| `)
                        使用物品.source.runCommand(`event entity @e[tag=${玩家名称},tag=!SitDown] 事件:锚点虚印`)
                        使用物品.source.runCommand(`tp @e[tag=${玩家名称},tag=!SitDown] ~~~`)
                    }
                    catch {
                        let 用户 = 使用物品.source
                        let 标题 = "§c|§4§l 锚点虚印 - 错误提示 §r§c|"
                        let 内容 = `无法召唤您所期望的§6<§a 角色 §6>§r\n\n如需进行<§9§o§l 锚点召集 §r>应满足下列条件:\n\n     *. §6<§a 角色 §6>§r 没有 <§5 进行坐下 §r>\n\n     *. §6<§a 角色 §6>§r 已经 <§6 锚点绑定 §r>\n\n     *. §6<§a 角色 §6>§r 处于 <§9 加载区块 §r>`
                        通用组件.通知界面(用户, 标题, 内容)
                    }
                    break
            }
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
    var 名称 = `"` + `${用户.name}` + `"`
    //定义新增命令
    if (内容.startsWith(`in: `) || 内容.startsWith(`<!>: `) || 内容.startsWith(`<$>:`) || 内容.startsWith(`!: `) || 内容.startsWith(`#: `)) {
        //执行自定义指令
        专用组件.彼岸指令(用户, 内容, 名称)
        //撤回玩家发送的信息内容
        发送信息.cancel = true
    }
}
)