/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 | Tayun_Strry | <in>_taiyu ]
*/

//导入< 香草 >预设接口
import {
    MessageFormData,
    ActionFormData,
    ModalFormData
} from "mojang-minecraft-ui"

import {
    EntityRaycastOptions,
    MinecraftBlockTypes,
    MinecraftItemTypes,
    BlockLocation,
    ItemStack,
    world
} from "mojang-minecraft"

//导入< 彼岸 >预设接口
import { 功能界面, 功能组件 } from './function'
import { 辅助说明 } from './show_help'
import { 数据标签 } from './data_tag'

/**
 * @example 接口功能: 用于查询<特定信息> 并 直接显示给<特定玩家>进行阅读
 */
export class 查询信息 {
    /**
     * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
     * @returns {run.command}
     * @example 接口功能: 用于侦测<目标实体>的各项属性值(如:生命值,移速值)并向<指定玩家>显示
     */
    static 属性侦测 = function (用户) {
        //定义目标类型
        var 前方实体 = new EntityRaycastOptions()
        // 定义侦测距离
        if (用户.hasTag('Gametest.HealthShow.Range.08')) {
            前方实体.maxDistance = 8
        }
        if (用户.hasTag('Gametest.HealthShow.Range.16')) {
            前方实体.maxDistance = 16
        }
        if (用户.hasTag('Gametest.HealthShow.Range.24')) {
            前方实体.maxDistance = 24
        }
        if (用户.hasTag('Gametest.HealthShow.Range.32')) {
            前方实体.maxDistance = 32
        }
        // 定义目标名称
        let 信息 = 用户.getEntitiesFromViewVector(前方实体)[0]
        //执行功能判断
        if (信息) {
            //定义实现当前功能所需的变量
            let 水下移速 = 信息.getComponent('underwater_movement')
            let 能否牵引 = 信息.getComponent('leashable')
            let 常规移速 = 信息.getComponent('movement')
            let 能否契约 = 信息.getComponent('tameable')
            let 健康状态 = 信息.getComponent('health')
            //执行功能判断
            if (用户.hasTag('Gametest.HealthShow_detailed')) {
                if (健康状态) {
                    用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${功能组件.查询名称(信息)}, { "text": "\n§l§6实体标识符§r: ${信息.id}\n§l§e实体生命值§r: ${Math.round(健康状态.current)}/${健康状态.value}\n§l§2实体可牵引§r: ${!!能否牵引}\n§l§2实体可契约§r: ${!!能否契约}\n${(常规移速) ? `§l§5陆地移速值§r: ${常规移速.value.toFixed(2)}` : ""}\n${(水下移速) ? `§l§9水下移速值§r: ${水下移速.value.toFixed(2)}` : ""}"}]}`)
                }
                else {
                    用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${功能组件.查询名称(信息)}, { "text": "\n§l§6实体标识符§r: ${信息.id}" }]}`)
                }
            }
            else {
                if (用户.isSneaking) {
                    if (健康状态) {
                        用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${功能组件.查询名称(信息)}, { "text": "\n§l§6实体标识符§r: ${信息.id}\n§l§e实体生命值§r: ${Math.round(健康状态.current)}/${健康状态.value}\n§l§2实体可牵引§r: ${!!能否牵引}\n§l§2实体可契约§r: ${!!能否契约}\n${(常规移速) ? `§l§5陆地移速值§r: ${常规移速.value.toFixed(2)}` : ""}\n${(水下移速) ? `§l§9水下移速值§r: ${水下移速.value.toFixed(2)}` : ""}"}]}`)
                    }
                    else {
                        用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${功能组件.查询名称(信息)}, { "text": "\n§l§6实体标识符§r: ${信息.id}" }]}`)
                    }
                }
                else {
                    用户.runCommand(`titleraw @s actionbar {"rawtext":[${功能组件.查询名称(信息)},{"text": "${(健康状态) ? `${`§8 | §r${Math.round(健康状态.current)}`}` : ""}"}]}`)
                }
            }
        }

    }

    /**
     * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
     * @param {carry} 目标 定义了需要侦测的目标, 请勿使用原版指令进行定义
     * @returns {run.command}
     * @example 接口功能: 用于侦测<目标实体>所触发的(实体事件)并向<指定玩家>显示
     */
    static 事件侦测 = function (用户, 目标) {
        //定义实现当前功能所需的变量
        var 玩家名称 = `"` + `${用户.name}` + `"`
        //获取信息并进行显示
        功能组件.快捷消息("_______________", 玩家名称)
        功能组件.查询名称(目标.entity, 'entity', 玩家名称)
        功能组件.快捷消息(`${目标.entity.id}`, 玩家名称)
        功能组件.快捷消息(`${目标.id}`, 玩家名称)
        功能组件.快捷消息("_______________", 玩家名称)
    }
}

export class 执行功能 {
    /**
     * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
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
                功能组件.快捷消息("_______________", 玩家名称)
                功能组件.快捷消息(`§o§l§c| 彼岸附加指令组 |§r`, 玩家名称)
                功能组件.快捷消息(`输入 ${参数[0]} <§c health:show §r> 开启或关闭 实体属性侦测`, 玩家名称)
                功能组件.快捷消息(`输入 ${参数[0]} <§c event:show §r> 开启或关闭 实体事件侦测`, 玩家名称)
                功能组件.快捷消息(`输入 ${参数[0]} <§c mode §r> 可改变道具的功能表现`, 玩家名称)
                功能组件.快捷消息("_______________", 玩家名称)
                功能组件.快捷消息(`您输入了: ${参数[0]} + ${参数[1]} + ${参数[2]} + ${参数[3]}`, 玩家名称)
                break
        }
    }

    /**
     * @param {carry} 用户 定义了该功能的用户
     * @param {carry} 方块 定义了玩家放置的方块类型
     * @param {carry} 坐标 定义了玩家所点击的方块坐标
     * @param {string} 类型 定义了需要执行的功能类型
     * @param {any} 查询 定义了定义了部分功能所需要的来自外部信息
     * @returns {run.command}
     * @example 接口功能: 用于实现拟态矩阵的效果
     */
    static 拟态矩阵 = function (用户, 方块, 坐标, 类型, 查询) {
        //定义实现当前功能所需的变量
        var 玩家名称 = `"` + `${用户.name}` + `"`
        var 方块标识 = 方块.id
        var 方块信息 = 方块
        //执行本接口的功能
        switch (类型) {
            case '标记起点':
                用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
                数据标签.刷新坐标('拟态矩阵_标记起点', 用户, 坐标)
                功能组件.快捷消息(`${查询}`, 玩家名称)
                break

            case '标记终点':
                用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
                数据标签.刷新坐标('拟态矩阵_标记终点', 用户, 坐标)
                功能组件.快捷消息(`${查询}`, 玩家名称)
                break

            case '开始填充':
                用户.runCommand("function Data/fill_matrix")
                功能组件.快捷消息(`起点坐标: ${数据标签.读取坐标('拟态矩阵_标记起点', 用户)} | 终点坐标: ${数据标签.读取坐标('拟态矩阵_标记终点', 用户)}`, 玩家名称)
                用户.runCommand(`fill ${数据标签.读取坐标('拟态矩阵_标记起点', 用户)} ${数据标签.读取坐标('拟态矩阵_标记终点', 用户)} ${数据标签.读取方块('拟态矩阵_标记方块', 用户)}`)
                break

            case '等待方块':
                功能组件.快捷消息(`您已处于方块标记的模式, 请放置你需要用来填充的方块`, 玩家名称)
                用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
                用户.runCommand("tag @s add Gametest.RecordBlock")
                break

            case '记录方块':
                //获取信息并进行显示
                功能组件.快捷消息("_______________", 玩家名称)
                数据标签.存储方块('拟态矩阵_标记方块', 用户, 方块标识)
                功能组件.快捷消息("<拟态矩阵> 方块名称:")
                功能组件.查询名称(方块信息, `block`, 玩家名称)
                功能组件.快捷消息("<拟态矩阵> 方块标识:")
                功能组件.快捷消息(`${方块标识}`, 玩家名称)
                功能组件.快捷消息("<拟态矩阵> 执行玩家:")
                功能组件.快捷消息(`${用户.name}`, 玩家名称)
                功能组件.快捷消息("_______________", 玩家名称)
                //移除标签
                用户.runCommand("tag @s remove Gametest.RecordBlock")
                //给予物品
                用户.runCommand("give @s 拟态矩阵:标记方块")
                break
        }
    }
}

//订阅< 系统侦听 >
world.events.beforeDataDrivenEntityTriggerEvent.subscribe((实体事件) => { //侦听实体触发事件
    for (const 用户 of world.getPlayers()) {
        if (用户.hasTag('Gametest.EventShow')) {
            查询信息.事件侦测(用户, 实体事件)
        }
    }
}
)
world.events.beforeItemUseOn.subscribe((使用物品) => { //侦听点击方块时
    //定义实现当前功能所需的变量
    const 查询坐标 = `${使用物品.blockLocation.x} ${使用物品.blockLocation.y} ${使用物品.blockLocation.z}`
    const 方块坐标 = 使用物品.blockLocation
    const 当前玩家 = 使用物品.source
    //使用物品时的自定义效果
    switch (使用物品.item.id) {
        case '拟态矩阵:标记起点':
            执行功能.拟态矩阵(当前玩家, '', 方块坐标, `标记起点`, 查询坐标)
            break

        case '拟态矩阵:标记终点':
            执行功能.拟态矩阵(当前玩家, '', 方块坐标, `标记终点`, 查询坐标)
            break

        case '拟态矩阵:开始填充':
            执行功能.拟态矩阵(当前玩家, '', 方块坐标, `开始填充`, 查询坐标)
            break

        case '拟态矩阵:标记方块':
            执行功能.拟态矩阵(当前玩家, '', 方块坐标, `等待方块`, 查询坐标)
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
world.events.blockPlace.subscribe((放置方块) => { //侦听玩家放置方块时
    for (const 用户 of world.getPlayers()) {
        if (用户.hasTag('Gametest.RecordBlock')) {
            执行功能.拟态矩阵(用户, 放置方块.block, '', `记录方块`)
        }
    }
}
)
world.events.tick.subscribe((游戏时刻) => { //侦听每个游戏帧
    for (const 用户 of world.getPlayers()) {
        if (用户.hasTag('Gametest.HealthShow')) {
            查询信息.属性侦测(用户)
        }
    }
}
)