/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 | Tayun_Starry | <in>_taiyu ]
*/

//导入< 香草 >预设接口
import {
    world
} from "mojang-minecraft"

//导入< 矩阵 >预设接口
import { 功能界面, 功能组件 } from './function'
import { 辅助说明 } from './show_help'

export class 执行功能 {
    /**
     * @param {carry} 用户 定义了该功能的用户, 请继承 调用该函数的方法 的目标数组
     * @returns {run.command}
     * @example 接口功能: 在使用 游戏道具:<匣里乾坤>时, 应该执行的功能
     */
    static 匣里乾坤 = function (用户) {
        //定义实现当前功能所需的变量
        var 玩家名称 = `"` + `${用户.name}` + `"`
        //执行功能判断
        try {
            //乾坤空间_预处理
            用户.runCommand("function Data/BoxSpace_start")
            //释放被存储的实体 并 储存附近的实体
            用户.runCommand(`structure load ${玩家名称} ~-5~3~-5 0_degrees none true false 100`)
            用户.runCommand(`structure save ${玩家名称} ~5~2~5 ~-5~-2~-5 true disk true`)
            //乾坤空间_后处理
            用户.runCommand("function Data/BoxSpace_end")
            //归还道具:匣里乾坤
            功能组件.延迟执行('原版指令', `give @s 魔法礼盒:匣里乾坤`, 用户, 30)
        }
        catch {
            //当初次使用该功能时 创建储存空间
            用户.runCommand(`structure save ${玩家名称} ~~~ ~~~ false disk true`)
            用户.runCommand(`give @s 魔法礼盒:匣里乾坤`)
            //生成提示界面
            let 标题 = "§1|§9§l 匣里乾坤 - 创建提示 §r§1|"
            let 内容 = `欢迎使用<§9§o§l 匣里乾坤 §r>\n\n已为您创建了专属的存储空间\n\n再次使用道具即可使用存储空间:${玩家名称}`
            功能组件.通知界面(用户, 标题, 内容)
        }
    }

    /**
     * @param {carry} 用户 定义了该功能的用户
     * @param {carry} 内容 定义了该功能的用户所输入的文本内容
     * @param {carry} 名称 定义了该功能的用户的真实名称
     * @returns {run.command}
     * @example 接口功能: 用于实现自定义指令的效果
     */
    static 彼岸指令 = function (用户, 内容, 名称) {
        //定义实现当前功能所需的变量
        var 发送玩家 = 用户
        var 聊天内容 = 内容
        var 玩家名称 = 名称
        //按照格式拆分聊天内容 获得指令参数
        var 参数 = 聊天内容.split(/\s/)
        //根据参数的定义去执行指令效果
        switch (参数[1]) {
            case 'mode':
                switch (参数[2]) {
                    case '0':
                        发送玩家.runCommand(`gamemode creative ${玩家名称}`)
                        功能组件.快捷消息(`您已切换至 创造模式`, `${玩家名称}`)
                        break

                    case '1':
                        发送玩家.runCommand(`gamemode survival ${玩家名称}`)
                        功能组件.快捷消息(`您已切换至 生存模式`, 玩家名称)
                        break

                    case '2':
                        发送玩家.runCommand(`gamemode adventure ${玩家名称}`)
                        功能组件.快捷消息(`您已切换至 冒险模式`, 玩家名称)
                        break

                    case 's':
                        发送玩家.runCommand(`gamemode spectator ${玩家名称}`)
                        功能组件.快捷消息(`您已切换至 旁观模式`, 玩家名称)
                        break

                    case 'd':
                        发送玩家.runCommand(`gamemode default ${玩家名称}`)
                        功能组件.快捷消息(`您已切换至 默认模式`, 玩家名称)
                        break

                    case '+':
                        发送玩家.runCommand(`tag ${玩家名称} add Gametest.GetMagic_CareFor`)
                        功能组件.快捷消息(`特殊功能:§6《 强化版魔导手册 》§2已开启§r`, 玩家名称)
                        break

                    case '-':
                        发送玩家.runCommand(`tag ${玩家名称} remove Gametest.GetMagic_CareFor`)
                        功能组件.快捷消息(`特殊功能:§6《 强化版魔导手册 》§c已关闭§r`, 玩家名称)
                        break
                }
                break

            case 'health:show':
                switch (参数[2]) {
                    case 'open':
                        try {
                            发送玩家.runCommand(`function HealthShow/BaseShow`)
                            发送玩家.runCommand(`function HealthShow/Range_${参数[3]}`)
                        }
                        catch {
                            功能组件.快捷消息(`您输入的 §6|>§c ${聊天内容} §6<|§r 存在参数错误, 参数 §6|>§a ${参数[3]} §6<|§r 应该为: 8 | 16 | 24 | 32`, 玩家名称)
                        }
                        break

                    case 'many':
                        try {
                            发送玩家.runCommand("function HealthShow/ManyShow")
                            发送玩家.runCommand(`function HealthShow/Range_${参数[3]}`)
                        }
                        catch {
                            功能组件.快捷消息(`您输入的 §6|>§c ${聊天内容} §6<|§r 存在参数错误, 参数 §6|>§a ${参数[3]} §6<|§r 应该为: 8 | 16 | 24 | 32`, 玩家名称)
                        }
                        break

                    case 'shut':
                        发送玩家.runCommand("function HealthShow/CloseShow")
                        break

                    default:
                        功能组件.快捷消息(`您输入的|>§c ${聊天内容} §r<|存在参数错误, 参数 ${参数[2]} 应该为: open | many | shut`, 玩家名称)
                        break
                }
                break

            case 'event:show':
                switch (参数[2]) {
                    case 'open':
                        try {
                            发送玩家.runCommand(`tag @s add Gametest.EventShow`)
                            功能组件.快捷消息(`特殊功能:§6< 实体事件侦测 >§a已开启§r`, 玩家名称)
                        }
                        catch {
                            功能组件.快捷消息(`您输入的|>§c ${聊天内容} §r<|存在参数错误, 您已经开启了该功能`, 玩家名称)
                        }
                        break

                    case 'shut':
                        try {
                            发送玩家.runCommand(`tag @s remove Gametest.EventShow`)
                            功能组件.快捷消息(`特殊功能:§6< 实体事件侦测 >§c已关闭§r`, 玩家名称)
                        }
                        catch {
                            功能组件.快捷消息(`您输入的|>§c ${聊天内容} §r<|存在参数错误, 您已经关闭了该功能`, 玩家名称)
                        }
                        break

                    default:
                        功能组件.快捷消息(`您输入的|>§c ${聊天内容} §r<|存在参数错误, 参数 ${参数[2]} 应该为: open | shut`, 玩家名称)
                        break
                }
                break

            default:
                功能组件.快捷消息("===============", 玩家名称)
                功能组件.快捷消息(`§o§l§c| 彼岸附加指令组 |§r`, 玩家名称)
                功能组件.快捷消息(`输入 ${参数[0]} <§c health:show §r> 开启或关闭 实体属性侦测`, 玩家名称)
                功能组件.快捷消息(`输入 ${参数[0]} <§c event:show §r> 开启或关闭 实体事件侦测`, 玩家名称)
                功能组件.快捷消息(`输入 ${参数[0]} <§c mode §r> 可改变道具的功能表现`, 玩家名称)
                功能组件.快捷消息("===============", 玩家名称)
                功能组件.快捷消息(`您输入了: ${参数[0]} + ${参数[1]} + ${参数[2]} + ${参数[3]}`, 玩家名称)
                break
        }
    }

}

//订阅< 系统侦听 >
world.events.beforeItemUseOn.subscribe((使用物品) => { //侦听点击方块时
    //定义实现当前功能所需的变量
    const 查询坐标 = `${使用物品.blockLocation.x} ${使用物品.blockLocation.y} ${使用物品.blockLocation.z}`
    const 方块坐标 = 使用物品.blockLocation
    const 当前玩家 = 使用物品.source
    //使用物品时的自定义效果
    switch (使用物品.item.id) {
        case '拟态矩阵:标记起点':
            功能组件.拟态矩阵(当前玩家, '', 方块坐标, `标记起点`, 查询坐标)
            break

        case '拟态矩阵:标记终点':
            功能组件.拟态矩阵(当前玩家, '', 方块坐标, `标记终点`, 查询坐标)
            break

        case '拟态矩阵:开始填充':
            功能组件.拟态矩阵(当前玩家, '', 方块坐标, `开始填充`, 查询坐标)
            break

        case '拟态矩阵:标记方块':
            功能组件.拟态矩阵(当前玩家, '', 方块坐标, `等待方块`, 查询坐标)
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
            辅助说明.目录(使用物品.source)
            break

        case '魔法礼盒:匣里乾坤':
            执行功能.匣里乾坤(使用物品.source)
            break

        case '魔法书籍:瞬间移动':
            switch (使用物品.source.isSneaking) {
                case true:
                    功能界面.瞬间移动(使用物品.source)
                    break

                case false:
                    使用物品.source.runCommand(`spreadplayers ~ ~ 5 15 @s`)
                    break
            }
            break

        case '特殊道具:锚点虚印':
            switch (使用物品.source.isSneaking) {
                case true:
                    功能界面.锚点虚印(使用物品.source)
                    break

                case false:
                    //定义实现当前功能所需的变量
                    var 玩家名称 = `"` + `${使用物品.source.name}` + `"`
                    //执行功能
                    try {
                        使用物品.source.runCommand(`title @s actionbar 正在召集 |> @e[tag=${玩家名称},tag=!SitDown] <| `)
                        使用物品.source.runCommand(`event entity @e[tag=${玩家名称},tag=!SitDown] 事件:锚点虚印`)
                        使用物品.source.runCommand(`tp @e[tag=${玩家名称},tag=!SitDown] ~~~`)
                    }
                    catch {
                        let 用户 = 使用物品.source
                        let 标题 = "§c|§4§l 锚点虚印 - 错误提示 §r§c|"
                        let 内容 = `无法召唤您所期望的§6<§a 角色 §6>§r\n\n如需进行<§9§o§l 锚点召集 §r>应满足下列条件:\n\n     *. §6<§a 角色 §6>§r 没有 <§5 进行坐下 §r>\n\n     *. §6<§a 角色 §6>§r 已经 <§6 锚点绑定 §r>\n\n     *. §6<§a 角色 §6>§r 处于 <§9 加载区块 §r>`
                        功能组件.通知界面(用户, 标题, 内容)
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
        执行功能.彼岸指令(用户, 内容, 名称)
        //撤回玩家发送的信息内容
        发送信息.cancel = true
    }
}
)