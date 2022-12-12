/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 / Tayun_Starry ]
*/

<<<<<<< Updated upstream
//导入< Beta_API >预设接口
import { BlockLocation, world } from "@minecraft/server"

//导入< 项目功能 >预设接口
import { 专用界面, 专用组件 } from './function'

//订阅< 系统侦听 >
=======
//导入 功能接口
import { world } from "@minecraft/server"
import * as 基础 from './matrix_API'
import * as 功能 from './function'

//定义 全局变量
let 道具冷却 = 0, 等待执行 = 4

//触发 功能事件
world.events.beforeDataDrivenEntityTriggerEvent.subscribe((实体事件) => { //当实体触发事件时
    //执行功能
    switch (实体事件.id) {
        case '开启<结构珍宝>':
            //修正维度信息
            基础.维度修正(实体事件.entity)
            //执行任务:开启<结构珍宝>
            var 位置 = 实体事件.entity.location
            功能.结构珍宝(位置)
            //释放粒子效果
            实体事件.entity.runCommandAsync('particle 烟雾效果:紫影 ~~~')
            实体事件.entity.runCommandAsync('particle 烟雾效果:海蓝 ~~~')
            实体事件.entity.runCommandAsync('particle 烟雾效果:靛蓝 ~~~')
            break

        case '仓储过滤':
            功能.仓储过滤(实体事件.entity)
            break

        case '攻击命中<森涅>':
            let 森涅 = 实体事件.entity
            let 目标 = 实体事件.entity.target
            let 血量 = 森涅.getComponent('health').current
            森涅.runCommandAsync('playanimation @s animation.hold_use.magic_bow default 1.0')
            目标.runCommandAsync('tp @s ~ ~10 ~')
            目标.runCommandAsync(`say ${血量}`)
            break

        default:
            break
    }
}
)
>>>>>>> Stashed changes
world.events.beforeItemUseOn.subscribe((使用物品) => { //当玩家手持物品点击方块时
    //定义实现当前功能所需的变量
    let 当前玩家 = 使用物品.source
    let 查询标签 = 当前玩家.getTags()
    let 方块坐标 = 使用物品.blockLocation
    let 查询坐标 = `${使用物品.blockLocation.x} ${使用物品.blockLocation.y} ${使用物品.blockLocation.z}`
    //修正维度信息
    for (let 目标标签 in 查询标签) {
        道具冷却 = (查询标签[目标标签].startsWith(`{"特殊冷却:维度修正":{`)) ? 1 : 0
    }
    if (道具冷却 == 0) {
        基础.数据标签.存储数值('特殊冷却:维度修正', 当前玩家, 32)
        基础.维度修正(使用物品.source)
    }
    //使用物品时的自定义效果
    switch (使用物品.item.typeId) {
        case '拟态矩阵:开始填充':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '开始填充')
            }
            break

        case '拟态矩阵:方块替换':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '方块替换')
            }
            break

<<<<<<< Updated upstream
        case '拟态矩阵:开始填充':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '开始填充', '')
            break

        case '拟态矩阵:标记方块':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '等待方块', '')
            break

        case '拟态矩阵:方块标定':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '方块标定', '')
            break

        case '拟态矩阵:方块调试':
            switch (当前玩家.isSneaking) {
                case true:
                    专用组件.拟态矩阵(当前玩家, '', 方块坐标, '方块调试', '标准调试')
                    break

                case false:
                    专用组件.拟态矩阵(当前玩家, '', 方块坐标, '方块调试', '随机调试')
                    break
=======
        case '拟态矩阵:标记起点':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '标记起点', 查询坐标)
            }
            break

        case '拟态矩阵:标记终点':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '标记终点', 查询坐标)
            }
            break

        case '拟态矩阵:标记方块':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '等待方块')
            }
            break

        case '拟态矩阵:方块标定':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '方块标定')
            }
            break

        case '拟态矩阵:方块调试':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '方块调试')
            }
            break

        case '拟态矩阵:结构复制':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '结构复制')
>>>>>>> Stashed changes
            }
            break

        case '特殊道具:物资整理':
<<<<<<< Updated upstream
            switch (当前玩家.isSneaking) {
                case true:
                    专用组件.物资整理(当前玩家, 查询坐标, '容器类')
                    break

                case false:
                    专用组件.物资整理(当前玩家, 查询坐标, '掉落物')
                    break
            }
=======
            基础.通用组件.移除物品(当前玩家)
            功能.物资整理(当前玩家, '点击方块')
>>>>>>> Stashed changes
            break

        default:
            break
    }
}
)
world.events.beforeItemUse.subscribe((使用物品) => { //当玩家使用物品时
<<<<<<< Updated upstream
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
=======
    //定义实现当前功能所需的变量
    let 当前玩家 = 使用物品.source
    let 查询标签 = 当前玩家.getTags()
    //修正维度信息
    for (let 目标标签 in 查询标签) {
        道具冷却 = (查询标签[目标标签].startsWith(`{"特殊冷却:维度修正":{`)) ? 1 : 0
    }
    if (道具冷却 == 0) {
        基础.数据标签.存储数值('特殊冷却:维度修正', 当前玩家, 32)
        基础.维度修正(使用物品.source)
    }
    //使用物品时的自定义效果
    switch (使用物品.item.typeId) {
        case '基础书籍:魔导手册':
            当前玩家.isSneaking ? 功能.辅助说明(当前玩家, '基础目录') : ''
            break

        case '魔法工具:魔晶弹珠':
            功能.魔晶弹珠(当前玩家)
            break

        case '特殊道具:锚点虚印':
            功能.锚点虚印(当前玩家)
            break

        case '特殊道具:物资整理':
            基础.通用组件.移除物品(当前玩家)
            功能.物资整理(当前玩家, '使用物品')
            break

        case '载具控制:仓储过滤':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:特殊道具":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:特殊道具', 当前玩家, 8)
                功能.仓储过滤(当前玩家, '道具模式')
            }
            break

        case '特殊道具:状态显示':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:特殊道具":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:特殊道具', 当前玩家, 8)
                功能.状态显示(当前玩家, '道具模式')
            }
            break

        case '魔法礼盒:匣里乾坤':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:特殊道具":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:特殊道具', 当前玩家, 8)
                功能.匣里乾坤(当前玩家)
            }
            break

        case '魔法书籍:瞬间移动':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:魔法书籍":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:魔法书籍', 当前玩家, 20)
                功能.瞬间移动(当前玩家)
            }
            break

        case '魔法书籍:林业指南':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:魔法书籍":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:魔法书籍', 当前玩家, 20)
                功能.林木植伐(当前玩家)
            }
            break

        case '魔法书籍:矿物辞典':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:魔法书籍":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:魔法书籍', 当前玩家, 20)
                功能.矿物辞典(当前玩家)
            }
            break

        case '魔法书籍:精灵结契':
            for (let 目标标签 in 查询标签) {
                道具冷却 = (查询标签[目标标签].startsWith(`{"道具冷却:魔法书籍":{`)) ? 1 : 0
            }
            if (道具冷却 == 0) {
                基础.数据标签.存储数值('道具冷却:魔法书籍', 当前玩家, 20)
                功能.精灵结契(当前玩家)
>>>>>>> Stashed changes
            }
            break

        default:
            break
    }
}
)
<<<<<<< Updated upstream
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
=======
world.events.entityHurt.subscribe((实体损伤) => { //当实体受到损伤时
    //执行功能
    switch (实体损伤.hurtEntity.typeId) {
        case '矩阵接口:容器': case '矩阵接口:绘制': case '矩阵接口:锚点':
            break

        default:
            switch (实体损伤.hurtEntity.typeId) {
                case 'minecraft:iron_golem':
                    var 悬浮 = 1
                    break

                case 'minecraft:warden':
                    var 悬浮 = 1.5
                    break

                case 'minecraft:ravager':
                    var 悬浮 = 1
                    break

                default:
                    var 悬浮 = 0
                    break
            }
            功能.损伤显示(实体损伤.hurtEntity, 实体损伤.damage, 实体损伤.hurtEntity.location, 悬浮)
            break
    }
}
)
world.events.tick.subscribe(() => { //使用道具后的效果冷却机制
    if (等待执行 == 0) {
        for (const 用户 of world.getPlayers()) {
            let 查询标签 = 用户.getTags()
            for (let 目标标签 in 查询标签) {
                //魔法书籍 的 使用后 的 冷却机制
                if (!(查询标签[目标标签].startsWith(`{"道具冷却:魔法书籍":{`))) {
                    let 当前值 = 基础.数据标签.读取数值('道具冷却:魔法书籍', 用户)
                    if (当前值 == 0) {
                        基础.数据标签.移除数值('道具冷却:魔法书籍', 用户)
                    }
                    else if (当前值 >= 1) {
                        当前值 -= 1
                        基础.数据标签.存储数值('道具冷却:魔法书籍', 用户, 当前值)
                    }
                }
                //特殊道具 的 使用后 的 冷却机制
                if (!(查询标签[目标标签].startsWith(`{"道具冷却:特殊道具":{`))) {
                    let 当前值 = 基础.数据标签.读取数值('道具冷却:特殊道具', 用户)
                    if (当前值 == 0) {
                        基础.数据标签.移除数值('道具冷却:特殊道具', 用户)
                    }
                    else if (当前值 >= 1) {
                        当前值 -= 1
                        基础.数据标签.存储数值('道具冷却:特殊道具', 用户, 当前值)
                    }
                }
                //拟态矩阵 的 使用后 的 冷却机制
                if (!(查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`))) {
                    let 当前值 = 基础.数据标签.读取数值('道具冷却:拟态矩阵', 用户)
                    if (当前值 == 0) {
                        基础.数据标签.移除数值('道具冷却:拟态矩阵', 用户)
                    }
                    else if (当前值 >= 1) {
                        当前值 -= 1
                        基础.数据标签.存储数值('道具冷却:拟态矩阵', 用户, 当前值)
                    }
                }
                //维度修正 的 使用后 的 冷却机制
                if (!(查询标签[目标标签].startsWith(`{"特殊冷却:维度修正":{`))) {
                    let 当前值 = 基础.数据标签.读取数值('特殊冷却:维度修正', 用户)
                    if (当前值 == 0) {
                        基础.数据标签.移除数值('特殊冷却:维度修正', 用户)
                    }
                    else if (当前值 >= 1) {
                        当前值 -= 1
                        基础.数据标签.存储数值('特殊冷却:维度修正', 用户, 当前值)
                    }
                }
            }
        }
        等待执行 = 4
    }
    else {
        等待执行 -= 1
    }
}
)
>>>>>>> Stashed changes
