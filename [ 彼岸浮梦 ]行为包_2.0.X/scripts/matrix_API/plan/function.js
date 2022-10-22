/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 | Tayun_Starry | <in>_taiyu ]
*/

//导入< 香草 >预设接口
import {
    MessageFormData,
    ActionFormData,
    ModalFormData,
    ActionFormResponse
} from "mojang-minecraft-ui"

import {
    EntityRaycastOptions,
    BlockRaycastOptions,
    MinecraftBlockTypes,
    MinecraftItemTypes,
    BlockLocation,
    ItemStack,
    world
} from "mojang-minecraft"

//导入< 矩阵 >预设接口
import { 数据标签 } from './data_tag'

/**
* @example 定义了< 实现特定功能 >所依赖的 设置界面
*/
export class 专用界面 {
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @returns {show.command}
     * @example 接口功能: 用于生成<状态侦测>的控制界面, 并根据玩家选择调整功能的执行效果
     */
    static 状态侦测 = function (用户) {
        //定义实现当前功能所需的变量
        const 玩家名称 = `"` + `${用户.nameTag}` + `"`
        //定义当前界面所用到的各项元素
        const 功能界面 = new ModalFormData()
            .title("<§5§o§l 状态侦测 §r>§9操作界面")
            .dropdown("设置<§5§o§l 属性侦测 §r>", ["§2§l常规显示§r", "§b§l详细显示§r", "§4§l关闭功能§r"], 2)
            .slider("§6设置§a 侦测范围§r", 8, 32, 8, 16)
            .dropdown("设置<§c§o§l 事件侦测 §r>", ["§2§l开启功能§r", "§4§l关闭功能§r"], 1)
        功能界面.show(用户).then((用户选择) => {
            switch (用户选择.formValues[0]) {
                case 0:
                    用户.runCommand(`function HealthShow/Range_${用户选择.formValues[1]}`)
                    用户.runCommand("function HealthShow/BaseShow")
                    通用组件.持续侦听('游戏时刻', '实体属性显示', 用户)
                    break

                case 1:
                    用户.runCommand(`function HealthShow/Range_${用户选择.formValues[1]}`)
                    用户.runCommand("function HealthShow/ManyShow")
                    通用组件.持续侦听('游戏时刻', '实体属性显示', 用户)
                    break

                case 2:
                    用户.runCommand("function HealthShow/CloseShow")
                    break
            }
            switch (用户选择.formValues[2]) {
                case 0:
                    通用组件.快捷消息(`<§6 事件侦测 §r> §a已开启§r`, 玩家名称)
                    通用组件.持续侦听('实体事件', '实体事件显示', 用户)
                    用户.addTag('Gametest.EventShow')
                    break

                case 1:
                    通用组件.快捷消息(`<§6 事件侦测 §r> §c已关闭§r`, 玩家名称)
                    用户.removeTag('Gametest.EventShow')
                    break
            }
        }
        )
    }

    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @returns {show.command}
     * @example 接口功能: 用于生成<瞬间移动>的控制界面, 并根据玩家选择调整功能的执行效果
     */
    static 瞬间移动 = function (用户) {
        //定义实现当前功能所需的变量
        const 当前坐标 = new BlockLocation(Math.floor(用户.location.x), Math.floor(用户.location.y), Math.floor(用户.location.z))
        const 玩家名称 = `"` + `${用户.nameTag}` + `"`
        //定义当前界面所用到的各项元素
        const 功能界面 = new ModalFormData()
            .title("<§4§o§l 瞬间移动 §r>§9操作界面")
            .dropdown("设置<§4§o§l 瞬间移动 §r>", ["§4§l相对传送§r", "§d§l随机传送§r", "§b§l绝对传送§r", "§f§l锚点传送§r"], 0)
            .slider("§4相对§a X轴坐标§r", -64, 64, 1, 0)
            .slider("§4相对§a Y轴坐标§r", -64, 64, 1, 0)
            .slider("§4相对§a Z轴坐标§r", -64, 64, 1, 0)
            .textField("§b绝对§c 三轴坐标§r", "§c请输入目的地坐标§r", `${当前坐标.x} ${当前坐标.y} ${当前坐标.z}`)
        功能界面.show(用户).then((用户选择) => {
            switch (用户选择.formValues[0]) {
                case 0:
                    用户.runCommand(`tp @s ${当前坐标.x + 用户选择.formValues[1]} ${当前坐标.y + 用户选择.formValues[2]} ${当前坐标.z + 用户选择.formValues[3]}`)
                    break

                case 1:
                    用户.runCommand(`spreadplayers ~${用户选择.formValues[1]} ~${用户选择.formValues[3]} 5 15 @s`)
                    break

                case 2:
                    用户.runCommand(`tp @s ${用户选择.formValues[4]}`)
                    break

                case 3:
                    try {
                        用户.runCommand(`tp @s @e[tag=${玩家名称},c=1,family=Tayun,family=Peer]`)
                    }
                    catch {
                        let 标题 = "§c|§4§l 瞬间移动 - 错误提示 §r§c|"
                        let 内容 = `无法传送到您所期望的§6<§a 角色 §6>§r\n\n如需进行<§9§o§l 锚点传送 §r>应满足下列条件:\n\n     *. §6<§a 角色 §6>§r 已经 <§6 与您绑定 §r>\n\n     *. §6<§a 角色 §6>§r 处于 <§9 加载区块 §r>\n\n     *. §6<§a 角色 §6>§r 已经 <§5 精灵结契 §r>`
                        通用组件.通知界面(用户, 标题, 内容)
                    }
                    break
            }
        }
        )
    }

    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @returns {show.command}
     * @example 接口功能: 用于生成<锚点虚印>的控制界面, 并根据玩家选择调整功能的执行效果
     */
    static 锚点虚印 = function (用户) {
        //定义实现当前功能所需的变量
        const 当前坐标 = new BlockLocation(Math.floor(用户.location.x), Math.floor(用户.location.y), Math.floor(用户.location.z))
        const 玩家名称 = `"` + `${用户.nameTag}` + `"`
        //定义当前界面所用到的各项元素
        const 功能界面 = new ModalFormData()
            .title("<§c§o§l 锚点虚印 §r>§9操作界面")
            .dropdown("设置<§c§o§l 锚点虚印 §r>", ["§1§l执行§r<§9§o§l 锚点召集 §r>", "§6§l绑定§r<§5§o§l 锚点虚印 §r>", "§c§l移除§r<§4§o§l 锚点虚印 §r>"], 0)
            .slider("§6设置§r <§9§o§l 锚点召集 §r> §a有效范围§r", 1, 64, 1, 32)
            .slider("§6设置§r <§9§o§l 锚点召集 §r> §a有效数量§r", 1, 64, 1, 16)
            .slider("§c设置§r <§4§o§l 锚点虚印 §r> §a修改范围§r", 1, 16, 1, 16)
            .toggle("§c设置§r <§9§o§l 锚点召集 §r> §a范围限制§r", true)
            .textField("<§9§o§l 锚点虚印 §r>§c召集点坐标§r", "§c请输入 召集点 坐标§r", `${当前坐标.x} ${当前坐标.y} ${当前坐标.z}`)
        功能界面.show(用户).then((用户选择) => {
            switch (用户选择.formValues[0]) {
                case 0:
                    try {
                        用户.runCommand(`event entity @e[tag=${玩家名称},r=${用户选择.formValues[1]},tag=!SitDown] 事件:锚点虚印`)
                        用户.runCommand(`tp @e[tag=${玩家名称}${(用户选择.formValues[4]) ? `,r=${用户选择.formValues[1]}` : ""},c=${用户选择.formValues[2]},tag=!SitDown] ${用户选择.formValues[5]}`)
                        用户.runCommand(`title @s actionbar 正在召集 |> @e[tag=${玩家名称}${(用户选择.formValues[4]) ? `,r=${用户选择.formValues[1]}` : ""},c=${用户选择.formValues[2]},tag=!SitDown] <|`)
                    }
                    catch {
                        let 标题 = "§c|§4§l 锚点虚印 - 错误提示 §r§c|"
                        let 内容 = `无法召唤您所期望的§6<§a 角色 §6>§r\n\n如需进行<§9§o§l 锚点召集 §r>应满足下列条件:\n\n     *. §6<§a 角色 §6>§r 没有 <§5 进行坐下 §r>\n\n     *. §6<§a 角色 §6>§r 已经 <§6 与您绑定 §r>\n\n     *. §6<§a 角色 §6>§r 处于 <§9 加载区块 §r>\n\n     *. §6<§a 角色 §6>§r 已经 <§5 精灵结契 §r>`
                        通用组件.通知界面(用户, 标题, 内容)
                    }
                    break

                case 1:
                    try {
                        用户.runCommand(`tag @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=${用户选择.formValues[3]}] add ${玩家名称}`)
                        用户.runCommand(`title @s actionbar 您已与 |> @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=8] <| 完成了<§6 锚点虚印 §r>的绑定`)
                    }
                    catch {
                        let 标题 = "§c|§4§l 锚点虚印 - 错误提示 §r§c|"
                        let 内容 = `无法绑定您所期望的§6<§a 角色 §6>§r\n\n如需进行<§9§o§l 锚点绑定 §r>应满足下列条件:\n\n     *. §6<§a 角色 §6>§r 没有 <§5 进行坐下 §r>\n\n     *. §6<§a 角色 §6>§r 没有 <§6 与您绑定 §r>\n\n     *. §6<§a 角色 §6>§r 处于 <§9 加载区块 §r>\n\n     *. §6<§a 角色 §6>§r 已经 <§5 精灵结契 §r>`
                        通用组件.通知界面(用户, 标题, 内容)
                    }
                    break

                case 2:
                    try {
                        用户.runCommand(`tag @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=${用户选择.formValues[3]}] remove ${玩家名称}`)
                        用户.runCommand(`title @s actionbar 您已与 |> @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=8] <| 移除了<§6 锚点虚印 §r>的绑定`)
                    }
                    catch {
                        let 标题 = "§c|§4§l 锚点虚印 - 错误提示 §r§c|"
                        let 内容 = `无法解绑您所期望的§6<§a 角色 §6>§r\n\n如需进行<§9§o§l 锚点移除 §r>应满足下列条件:\n\n     *. §6<§a 角色 §6>§r 没有 <§5 进行坐下 §r>\n\n     *. §6<§a 角色 §6>§r 已经 <§6 与您绑定 §r>\n\n     *. §6<§a 角色 §6>§r 处于 <§9 加载区块 §r>\n\n     *. §6<§a 角色 §6>§r 已经 <§5 精灵结契 §r>`
                        通用组件.通知界面(用户, 标题, 内容)
                    }
                    break
            }
        }
        )
    }
}

/**
* @example 定义了< 实现特定功能 >所依赖的 脚本程序
*/
export class 专用组件 {
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @returns {run.command}
     * @example 接口功能: 在使用 游戏道具:<匣里乾坤>时, 应该执行的功能
     */
    static 匣里乾坤 = function (用户) {
        //定义实现当前功能所需的变量
        var 玩家名称 = `"` + `${用户.nameTag}` + `"`
        //实现接口功能
        try {
            //乾坤空间_预处理
            用户.runCommand("function Data/BoxSpace_start")
            //释放被存储的实体 并 储存附近的实体
            用户.runCommand(`structure load ${玩家名称} ~-5~3~-5 0_degrees none true false`)
            用户.runCommand(`structure save ${玩家名称} ~5~2~5 ~-5~-2~-5 true disk true`)
            //乾坤空间_后处理
            用户.runCommand("function Data/BoxSpace_end")
            //归还道具:匣里乾坤
            通用组件.延迟执行('原版指令', 'give @s 魔法礼盒:匣里乾坤', 用户, 20)
        }
        catch {
            //当初次使用该功能时 创建储存空间
            用户.runCommand(`structure save ${玩家名称} ~~~ ~~~ false disk true`)
            用户.runCommand(`give @s 魔法礼盒:匣里乾坤`)
            //生成提示界面
            let 标题 = "§1|§9§l 匣里乾坤 - 创建提示 §r§1|"
            let 内容 = `欢迎使用<§9§o§l 匣里乾坤 §r>\n\n已为您创建了专属的存储空间\n\n再次使用道具即可使用存储空间:${玩家名称}`
            通用组件.通知界面(用户, 标题, 内容)
        }
    }

    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {string} 内容 用户所输入的文本内容
     * @param {string} 名称 此参数限制为: <玩家名称><目标选择器>
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
                        通用组件.快捷消息(`您已切换至 创造模式`, `${玩家名称}`)
                        break

                    case '1':
                        发送玩家.runCommand(`gamemode survival ${玩家名称}`)
                        通用组件.快捷消息(`您已切换至 生存模式`, 玩家名称)
                        break

                    case '2':
                        发送玩家.runCommand(`gamemode adventure ${玩家名称}`)
                        通用组件.快捷消息(`您已切换至 冒险模式`, 玩家名称)
                        break

                    case 's':
                        发送玩家.runCommand(`gamemode spectator ${玩家名称}`)
                        通用组件.快捷消息(`您已切换至 旁观模式`, 玩家名称)
                        break

                    case 'd':
                        发送玩家.runCommand(`gamemode default ${玩家名称}`)
                        通用组件.快捷消息(`您已切换至 默认模式`, 玩家名称)
                        break

                    case '+':
                        发送玩家.runCommand(`tag ${玩家名称} add Gametest.GetMagic_CareFor`)
                        通用组件.快捷消息(`特殊功能:§6《 强化版魔导手册 》§2已开启§r`, 玩家名称)
                        break

                    case '-':
                        发送玩家.runCommand(`tag ${玩家名称} remove Gametest.GetMagic_CareFor`)
                        通用组件.快捷消息(`特殊功能:§6《 强化版魔导手册 》§c已关闭§r`, 玩家名称)
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
                            通用组件.快捷消息(`您输入的 §6|>§c ${聊天内容} §6<|§r 存在参数错误, 参数 §6|>§a ${参数[3]} §6<|§r 应该为: 8 | 16 | 24 | 32`, 玩家名称)
                        }
                        break

                    case 'many':
                        try {
                            发送玩家.runCommand("function HealthShow/ManyShow")
                            发送玩家.runCommand(`function HealthShow/Range_${参数[3]}`)
                        }
                        catch {
                            通用组件.快捷消息(`您输入的 §6|>§c ${聊天内容} §6<|§r 存在参数错误, 参数 §6|>§a ${参数[3]} §6<|§r 应该为: 8 | 16 | 24 | 32`, 玩家名称)
                        }
                        break

                    case 'shut':
                        发送玩家.runCommand("function HealthShow/CloseShow")
                        break

                    default:
                        通用组件.快捷消息(`您输入的|>§c ${聊天内容} §r<|存在参数错误, 参数 ${参数[2]} 应该为: open | many | shut`, 玩家名称)
                        break
                }
                break

            case 'event:show':
                switch (参数[2]) {
                    case 'open':
                        try {
                            发送玩家.runCommand(`tag @s add Gametest.EventShow`)
                            通用组件.快捷消息(`特殊功能:§6< 实体事件侦测 >§a已开启§r`, 玩家名称)
                        }
                        catch {
                            通用组件.快捷消息(`您输入的|>§c ${聊天内容} §r<|存在参数错误, 您已经开启了该功能`, 玩家名称)
                        }
                        break

                    case 'shut':
                        try {
                            发送玩家.runCommand(`tag @s remove Gametest.EventShow`)
                            通用组件.快捷消息(`特殊功能:§6< 实体事件侦测 >§c已关闭§r`, 玩家名称)
                        }
                        catch {
                            通用组件.快捷消息(`您输入的|>§c ${聊天内容} §r<|存在参数错误, 您已经关闭了该功能`, 玩家名称)
                        }
                        break

                    default:
                        通用组件.快捷消息(`您输入的|>§c ${聊天内容} §r<|存在参数错误, 参数 ${参数[2]} 应该为: open | shut`, 玩家名称)
                        break
                }
                break

            default:
                通用组件.快捷消息("===============", 玩家名称)
                通用组件.快捷消息(`§o§l§c| 彼岸附加指令组 |§r`, 玩家名称)
                通用组件.快捷消息(`输入 ${参数[0]} <§c health:show §r> 开启或关闭 实体属性侦测`, 玩家名称)
                通用组件.快捷消息(`输入 ${参数[0]} <§c event:show §r> 开启或关闭 实体事件侦测`, 玩家名称)
                通用组件.快捷消息(`输入 ${参数[0]} <§c mode §r> 可改变道具的功能表现`, 玩家名称)
                通用组件.快捷消息("===============", 玩家名称)
                通用组件.快捷消息(`您输入了: ${参数[0]} + ${参数[1]} + ${参数[2]} + ${参数[3]}`, 玩家名称)
                break
        }
    }

    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
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
        //实现接口功能
        if (信息) {
            //定义实现当前功能所需的变量
            let 水下移速 = 信息.getComponent('underwater_movement')
            let 能否牵引 = 信息.getComponent('leashable')
            let 常规移速 = 信息.getComponent('movement')
            let 能否契约 = 信息.getComponent('tameable')
            let 健康状态 = 信息.getComponent('health')
            //实现接口功能
            if (用户.hasTag('Gametest.HealthShow_detailed')) {
                if (健康状态) {
                    用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${通用组件.查询名称(信息, 'return_entity')}, { "text": "\n§l§6实体标识符§r: ${信息.id}\n§l§e实体生命值§r: ${Math.round(健康状态.current)}/${健康状态.value}\n§l§2实体可牵引§r: ${!!能否牵引}\n§l§2实体可契约§r: ${!!能否契约}\n${(常规移速) ? `§l§5陆地移速值§r: ${常规移速.value.toFixed(2)}` : ""}\n${(水下移速) ? `§l§9水下移速值§r: ${水下移速.value.toFixed(2)}` : ""}"}]}`)
                }
                else {
                    用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${通用组件.查询名称(信息, 'return_entity')}, { "text": "\n§l§6实体标识符§r: ${信息.id}" }]}`)
                }
            }
            else {
                if (用户.isSneaking) {
                    if (健康状态) {
                        用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${通用组件.查询名称(信息, 'return_entity')}, { "text": "\n§l§6实体标识符§r: ${信息.id}\n§l§e实体生命值§r: ${Math.round(健康状态.current)}/${健康状态.value}\n§l§2实体可牵引§r: ${!!能否牵引}\n§l§2实体可契约§r: ${!!能否契约}\n${(常规移速) ? `§l§5陆地移速值§r: ${常规移速.value.toFixed(2)}` : ""}\n${(水下移速) ? `§l§9水下移速值§r: ${水下移速.value.toFixed(2)}` : ""}"}]}`)
                    }
                    else {
                        用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${通用组件.查询名称(信息, 'return_entity')}, { "text": "\n§l§6实体标识符§r: ${信息.id}" }]}`)
                    }
                }
                else {
                    用户.runCommand(`titleraw @s actionbar {"rawtext":[${通用组件.查询名称(信息, 'return_entity')},{"text": "${(健康状态) ? `${`§8 | §r${Math.round(健康状态.current)}`}` : ""}"}]}`)
                }
            }
        }

    }

    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {object} 目标 此参数限制为: <事件类 对象>
     * @returns {run.command}
     * @example 接口功能: 用于侦测<目标实体>所触发的(实体事件)并向<指定玩家>显示
     */
    static 事件侦测 = function (用户, 目标) {
        //定义实现当前功能所需的变量
        var 玩家名称 = `"` + `${用户.nameTag}` + `"`
        //获取信息并进行显示
        通用组件.快捷消息("===============", 玩家名称)
        通用组件.快捷消息(`§b实体名称§7 : §3`, 玩家名称, `${通用组件.查询名称(目标.entity, 'return_entity', 玩家名称)}`)
        通用组件.快捷消息(`§e实体标识§7 : §6${目标.entity.id}`, 玩家名称)
        通用组件.快捷消息(`§a实体事件§7 : §2${目标.id}`, 玩家名称)
        通用组件.快捷消息("===============", 玩家名称)
    }

    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {object} 方块 此参数限制为: <方块类 对象>
     * @param {string} 坐标 此参数限制为: <目标方块的坐标>
     * @param {string} 类型 此参数限制为: <标记起点><标记终点><...>
     * @param {string} 查询 定义了定义了部分功能所需要的来自外部信息
     * @returns {run.command}
     * @example 接口功能: 用于实现拟态矩阵的效果
     */
    static 拟态矩阵 = function (用户, 方块, 坐标, 类型, 查询) {
        //定义实现当前功能所需的变量
        const 玩家名称 = `"` + `${用户.nameTag}` + `"`
        const 方块标识 = 方块.id
        const 方块信息 = 方块
        //执行本接口的功能
        switch (类型) {
            case '标记起点':
                用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
                通用组件.快捷标题(`§6填充坐标§r<§b A §r>§6为§r :§a ${查询}`, 玩家名称)
                数据标签.刷新坐标('拟态矩阵_标记起点', 用户, 坐标)
                break

            case '标记终点':
                用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
                通用组件.快捷标题(`§6填充坐标§r<§d B §r>§6为§r :§a ${查询}`, 玩家名称)
                数据标签.刷新坐标('拟态矩阵_标记终点', 用户, 坐标)
                break

            case '开始填充':
                //移除特定道具
                用户.runCommand("function Data/matrix_delete_items")
                //归还特定道具
                通用组件.延迟执行('原版指令', `give @s 拟态矩阵:开始填充`, 用户, 10)
                通用组件.延迟执行('原版指令', `give @s 拟态矩阵:标记起点`, 用户, 15)
                通用组件.延迟执行('原版指令', `give @s 拟态矩阵:标记终点`, 用户, 20)
                //提示 进行填充时 的 坐标点
                通用组件.快捷标题(`§6填充坐标§r<§b A §r>§6为§r :§a ${数据标签.读取坐标('拟态矩阵_标记起点', 用户)}\n§6填充坐标§r<§d B §r>§6为§r :§a ${数据标签.读取坐标('拟态矩阵_标记终点', 用户)}`, 玩家名称)
                //执行填充操作
                用户.runCommand(`fill ${数据标签.读取坐标('拟态矩阵_标记起点', 用户)} ${数据标签.读取坐标('拟态矩阵_标记终点', 用户)} ${数据标签.读取方块('拟态矩阵_标记方块', 用户)}`)
                break

            case '等待方块':
                通用组件.快捷标题(`§6您已处于方块标记的模式, 请放置你需要用来填充的方块`, 玩家名称)
                用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
                通用组件.持续侦听('方块放置', '拟态矩阵_方块记录', 用户)
                用户.addTag('Gametest.RecordBlock')
                break

            case '记录方块':
                //获取方块信息
                数据标签.存储方块('拟态矩阵_标记方块', 用户, 方块标识)
                //向玩家反馈与显示
                通用组件.快捷消息("===============", 玩家名称)
                通用组件.快捷消息(`§2方块名称 §7:§a `, 玩家名称, `${通用组件.查询名称(方块信息, `return_block`, 玩家名称)}`)
                通用组件.快捷消息(`§3玩家名称 §7:§b ${用户.nameTag}`, 玩家名称)
                通用组件.快捷消息(`§4方块标识 §7:§c ${方块标识}`, 玩家名称)
                通用组件.快捷消息("===============", 玩家名称)
                //移除标签
                用户.removeTag('Gametest.RecordBlock')
                //给予物品
                用户.runCommand("give @s 拟态矩阵:标记方块")
                break

            case '方块标定':
                //对手持物品进行处理
                通用组件.延迟执行('原版指令', `give @s 拟态矩阵:方块标定`, 用户, 10)
                用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
                //定义当前界面所用到的各项元素
                const 功能界面 = new ActionFormData()
                    .body("§7方块信息标定")
                    .title("§l§8 拟态矩阵 §r")
                    .button("§l§5< 空气 >§r", "textures/items/bucket_empty")
                    .button("§l§4< 熔岩 >§r", "textures/items/bucket_lava")
                    .button("§l§9< 水源 >§r", "textures/items/bucket_water")
                    .button("§l§5< 细雪 >§r", "textures/items/bucket_powder_snow")
                功能界面.show(用户).then((用户选择) => {
                    switch (用户选择.selection) {
                        case 0:
                            数据标签.存储方块('拟态矩阵_标记方块', 用户, 'air')
                            通用组件.快捷消息("===============", 玩家名称)
                            通用组件.快捷消息(`§2方块名称 §7:§a `, 玩家名称, `{ "translate": "tile.air.name" }`)
                            通用组件.快捷消息(`§3玩家名称 §7:§b ${用户.nameTag}`, 玩家名称)
                            通用组件.快捷消息(`§4方块标识 §7:§a minecraft:air`, 玩家名称)
                            通用组件.快捷消息("===============", 玩家名称)
                            break

                        case 1:
                            数据标签.存储方块('拟态矩阵_标记方块', 用户, 'lava')
                            通用组件.快捷消息("===============", 玩家名称)
                            通用组件.快捷消息(`§2方块名称 §7:§4 `, 玩家名称, `{ "translate": "tile.lava.name" }`)
                            通用组件.快捷消息(`§3玩家名称 §7:§b ${用户.nameTag}`, 玩家名称)
                            通用组件.快捷消息(`§4方块标识 §7:§4 minecraft:lava`, 玩家名称)
                            通用组件.快捷消息("===============", 玩家名称)
                            break

                        case 2:
                            数据标签.存储方块('拟态矩阵_标记方块', 用户, 'water')
                            通用组件.快捷消息("===============", 玩家名称)
                            通用组件.快捷消息(`§2方块名称 §7:§9 `, 玩家名称, `{ "translate": "tile.water.name" }`)
                            通用组件.快捷消息(`§3玩家名称 §7:§b ${用户.nameTag}`, 玩家名称)
                            通用组件.快捷消息(`§4方块标识 §7:§9 minecraft:water`, 玩家名称)
                            通用组件.快捷消息("===============", 玩家名称)
                            break

                        case 3:
                            数据标签.存储方块('拟态矩阵_标记方块', 用户, 'powder_snow')
                            通用组件.快捷消息("===============", 玩家名称)
                            通用组件.快捷消息(`§2方块名称 §7:§6 `, 玩家名称, `{ "translate": "tile.powder_snow.name" }`)
                            通用组件.快捷消息(`§3玩家名称 §7:§b ${用户.nameTag}`, 玩家名称)
                            通用组件.快捷消息(`§4方块标识 §7:§6 minecraft:powder_snow`, 玩家名称)
                            通用组件.快捷消息("===============", 玩家名称)
                            break

                        default:
                            break
                    }
                }
                )
                break
        }
    }

    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {string} 坐标 此参数限制为: <目标方块的坐标>
     * @returns {Promise<any>|run.command}
     * @example 接口功能: 用于实现拟态矩阵的效果
     */
    static 仓储整理 = function (用户, 坐标) {
        //定义实现当前功能所需的变量
        let 选择容器 = 用户.getBlockFromViewVector(new BlockRaycastOptions())
        let 物品列表 = []
        //定义部分参数
        选择容器.includePassableBlocks = false
        选择容器.includeLiquidBlocks = false
        选择容器.maxDistance = 5
        //仅限<箱子>可以执行物品分类
        if (选择容器.type.id == "minecraft:chest" || 选择容器.type.id == "minecraft:trapped_chest") {
            //定义实现当前功能所需的变量
            var 容器内容 = 选择容器.getComponent("inventory").container
            //实现物品使用后的冷却效果
            用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
            通用组件.延迟执行('原版指令', `give @s 特殊道具:质能转换`, 用户, 15)
            //执行容器内的物品分类
            return new Promise(async function (异步执行) {
                for (let 位置 = 0; 位置 < 容器内容.size; 位置++) {
                    //定义实现当前功能所需的变量
                    let 物品信息 = 容器内容.getItem(位置)
                    //判断容器内是否存在物品
                    if (!物品信息) {
                        continue
                    }
                    else {
                        //将容器内的物品信息存入数组
                        物品列表.push(物品信息)
                        //清除容器内的原有物品
                        用户.runCommand(`replaceitem block ${坐标} slot.container ${位置} air 1 0`)
                    }
                }
                //对数组内的物品信息进行排序
                物品列表.sort(function (a, b) {
                    //定义实现当前功能所需的变量
                    let A_item
                    let B_item
                    //根据物品名称修改判断方式
                    if (a.nameTag && b.nameTag) {
                        A_item = a.nameTag
                        B_item = b.nameTag
                    }
                    else {
                        A_item = a.id.split(':')[1]
                        B_item = b.id.split(':')[1]
                    }
                    //对数组内容进行排序
                    if (A_item >= B_item) {
                        return 1
                    }
                    else {
                        return -1
                    }
                }
                )
                //向容器内添加排序后的物品
                for (let 填充物品 of 物品列表) {
                    容器内容.addItem(填充物品)
                }
            }
            )
        }
        else {
            //当玩家选中了错误的方块时, 应该弹出的提示文本
            通用组件.快捷标题('< 容器整理 >功能, 仅限< 箱子 >与< 陷阱箱 >可以使用', 用户)
            //实现物品使用后的冷却效果
            用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
            通用组件.延迟执行('原版指令', `give @s 特殊道具:质能转换`, 用户, 30)
        }
    }
}

/**
* @example 定义了< 实现基础功能 >所依赖的 脚本程序
*/
export class 通用组件 {
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {string} 标题 定义了显示的界面标题
     * @param {string} 内容 定义了显示的界面内容
     * @returns {show}
     * @example 此接口所定义的界面有且只有一个交互输出, 用于打开本模组的<辅助说明>目录
     */
    static 通知界面 = function (用户, 标题, 内容) {
        //定义实现当前功能所需的变量
        var 页面元素 = new MessageFormData()
        //定义当前界面所用到的各项元素
        页面元素 = 页面元素.title(标题)
            .body(内容)
            .button1("查看 功能目录")
            .button2("关闭 当前界面")
            //生成界面并执行玩家的选择
            .show(用户).then((用户选择) => {
                if (用户选择.selection == 1) {
                    辅助说明.目录(用户)
                }
            }
            )
    }

    /**
     * @param {string} 内容 定义了需要显示的内容
     * @param {string} 目标 此参数限制为: <玩家名称><目标选择器>
     * @param {string} 附加 定义了需要追加显示的内容
     * @returns {run.command}
     * @example 此接口所定义了一个 快捷的 向 指定玩家 的 聊天栏 显示 指定的 内容 的功能
     */
    static 快捷消息 = function (内容, 目标, 附加) {
        try {
            world.getDimension("overworld").runCommand(`tellraw ${目标} {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
        }
        catch {
            world.getDimension("overworld").runCommand(`tellraw @a {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
        }
    }

    /**
     * @param {string} 内容 定义了需要显示的内容
     * @param {string} 目标 此参数限制为: <玩家名称><目标选择器>
     * @param {string} 附加 定义了需要追加显示的内容
     * @param {string} 类型 此参数限制为: < 主标题 >< 副标题 >< 小标题 >
     * @returns {run.command}
     * @example 此接口所定义了一个 快捷的 向 指定玩家  显示 指定的 标题内容 的功能
     */
    static 快捷标题 = function (内容, 目标, 附加, 类型) {
        switch (类型) {
            case '主标题':
                类型 = 'title'
                break

            case '副标题':
                类型 = 'subtitle'
                break

            case '小标题':
                类型 = 'actionbar'
                break

            default:
                类型 = 'actionbar'
                break
        }
        try {
            world.getDimension("overworld").runCommand(`titleraw ${目标} ${类型} {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
        }
        catch {
            world.getDimension("overworld").runCommand(`titleraw @a ${类型} {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
        }
    }

    /**
     * @param {object} 目标 此参数限制为: <实体类 对象>
     * @param {string} 类型 此参数限制为: < entity >< block >< return_entity >< return_block >
     * @param {string} 用户 此参数限制为: <玩家名称><目标选择器>
     * @returns {run.command | string}
     * @example 接口功能: <状态侦测><事件侦测>所依赖的信息查询功能
     */
    static 查询名称 = function (目标, 类型, 用户) {
        //定义实现当前功能所需的变量
        let 查询_命名空间 = 目标.id.split(':')
        //实现接口功能
        switch (类型) {
            case 'entity':
                try {
                    world.getDimension("overworld").runCommand(`tellraw ${用户} {"rawtext":[{"translate":"entity.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.id}.name"}]}`)
                }
                catch {
                    world.getDimension("overworld").runCommand(`tellraw @a {"rawtext":[{"translate":"entity.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.id}.name"}]}`)
                }
                break

            case 'block':
                try {
                    world.getDimension("overworld").runCommand(`tellraw ${用户} {"rawtext":[{"translate":"tile.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.id}.name"}]}`)
                }
                catch {
                    world.getDimension("overworld").runCommand(`tellraw @a {"rawtext":[{"translate":"tile.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.id}.name"}]}`)
                }
                break

            case 'return_entity':
                if (目标.id == 'minecraft:player') {
                    return `{ "text": "${目标.name}" }`
                }
                else {
                    return `{ "translate": "entity.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.id}.name" }`
                }

            case 'return_block':
                return `{ "translate": "tile.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.id}.name" }`
        }
    }

    /**
     * @param {string} 类型 此参数限制为: < 快捷消息 >< 原版指令 >
     * @param {string} 内容 需要执行的 内容 或 指令
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {value} 延迟 执行功能前, 需等待多少<游戏刻>
     * @returns {Promise<any>|run.command}
     * @example 接口功能: <状态侦测><事件侦测>所依赖的信息查询功能
     */
    static 延迟执行 = function (类型, 内容, 用户, 延迟 = 20) {
        //定义实现当前功能所需的变量
        var 玩家名称 = `"` + `${用户.nameTag}` + `"`
        //执行接口功能
        return new Promise(async function () {
            const 等待执行 = function () {
                if (延迟 <= 0) {
                    //当倒计时完成时, 执行预先设置好的内容
                    switch (类型) {
                        case '快捷消息':
                            通用组件.快捷消息([内容], 玩家名称)
                            break

                        case '原版指令':
                            用户.runCommand(`${内容}`)
                            break
                    }
                    //移除游戏刻侦听
                    world.events.tick.unsubscribe(等待执行)
                }
                延迟--
            }
            //添加游戏刻侦听, 并在每个游戏刻中运行
            world.events.tick.subscribe(等待执行)
        }
        )
    }

    /**
     * @param {string} 类型 此参数限制为: < 实体事件 >< 方块放置 >< 游戏时刻 >
     * @param {string} 效果 此参数限制为: < 实体属性显示 >< 实体事件显示 >< ... >中选择
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {value} 维持 执行功能时, 等待多少<游戏刻>后停止运行
     * @returns {Promise<any>}
     * @example 接口功能: <状态侦测><事件侦测>所依赖的信息查询功能
     */
    static 持续侦听 = function (类型, 效果, 用户, 维持 = 1200) {
        //定义实现当前功能所需的变量
        var 玩家名称 = `"` + `${用户.nameTag}` + `"`
        //创建多线程任务
        return new Promise(async function () {
            //定义所需的游戏事件效果
            const 游戏事件 = function (信息) {
                switch (效果) {
                    case '实体属性显示':
                        if (用户.hasTag('Gametest.HealthShow')) {
                            专用组件.属性侦测(用户)
                        }
                        break

                    case '实体事件显示':
                        if (用户.hasTag('Gametest.EventShow')) {
                            专用组件.事件侦测(用户, 信息)
                        }
                        break

                    case '拟态矩阵_方块记录':
                        if (用户.hasTag('Gametest.RecordBlock')) {
                            专用组件.拟态矩阵(用户, 信息.block, '', `记录方块`)
                            //移除游戏刻侦听
                            world.events.tick.unsubscribe(等待关闭)
                            //移除方块事件侦听
                            world.events.blockPlace.unsubscribe(游戏事件)
                        }
                        break

                    default:
                        通用组件.快捷消息(`您输入的|>§c ${效果} §r<|存在参数错误, 未能找到您所期望的功能`, 玩家名称)
                        break
                }
            }
            const 等待关闭 = function () {
                if (维持 <= 0) {
                    //移除实体事件侦听
                    world.events.beforeDataDrivenEntityTriggerEvent.unsubscribe(游戏事件)
                    //移除方块事件侦听
                    world.events.blockPlace.unsubscribe(游戏事件)
                    //移除游戏刻侦听
                    world.events.tick.unsubscribe(等待关闭)
                    world.events.tick.unsubscribe(游戏事件)
                    //移除游戏事件时, 进行通报操作
                    通用组件.快捷消息(`§a${效果} §6持续时间结束 §c正在停止运行`, 玩家名称)
                }
                维持--
            }
            //添加游戏刻侦听, 并在每个游戏刻中运行, 用于关闭长时间运行的后台
            world.events.tick.subscribe(等待关闭)
            //开启所需的游戏内容侦听
            switch (类型) {
                case '实体事件':
                    world.events.beforeDataDrivenEntityTriggerEvent.subscribe(游戏事件)
                    break

                case '方块放置':
                    world.events.blockPlace.subscribe(游戏事件)
                    break

                case '游戏时刻':
                    world.events.tick.subscribe(游戏事件)
                    break

                default:
                    通用组件.快捷消息(`您输入的|>§c ${类型} §r<|存在参数错误, 未能找到您所期望的功能`, 玩家名称)
                    break
            }
        }
        )
    }
}
