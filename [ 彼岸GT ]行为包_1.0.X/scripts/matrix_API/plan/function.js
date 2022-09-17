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

/**
* @example 定义了< 实现特定功能 >所依赖的 设置界面
*/
export class 功能界面 {
    /**
     * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
     * @returns {show.command}
     * @example 接口功能: 用于生成<状态侦测>的控制界面, 并根据玩家选择调整功能的执行效果
     */
    static 状态侦测 = function (用户) {
        //定义实现当前功能所需的变量
        var 页面元素 = new ModalFormData()
        var 玩家名称 = `"` + `${用户.name}` + `"`
        //定义当前界面所用到的各项元素
        页面元素 = 页面元素.title("<§5§o§l 状态侦测 §r>§9操作界面")
            .dropdown("设置<§5§o§l 属性侦测 §r>", ["§2§l常规显示§r", "§b§l详细显示§r", "§4§l关闭功能§r"], 2)
            .slider("§6设置§a 侦测范围§r", 8, 32, 8, 16)
            .dropdown("设置<§c§o§l 事件侦测 §r>", ["§2§l开启功能§r", "§4§l关闭功能§r"], 1)
            //生成界面并执行玩家的选择
            .show(用户).then((用户选择) => {
                switch (用户选择.formValues[0]) {
                    case 0:
                        用户.runCommand("function HealthShow/BaseShow")
                        用户.runCommand(`function HealthShow/Range_${用户选择.formValues[1]}`)
                        break

                    case 1:
                        用户.runCommand("function HealthShow/ManyShow")
                        用户.runCommand(`function HealthShow/Range_${用户选择.formValues[1]}`)
                        break

                    case 2:
                        用户.runCommand("function HealthShow/CloseShow")
                        break
                }
                switch (用户选择.formValues[2]) {
                    case 0:
                        用户.runCommand(`tag @s add Gametest.EventShow`)
                        消息(`<§6 事件侦测 §r> §a已开启§r`, 玩家名称)
                        break

                    case 1:
                        用户.runCommand(`tag @s remove Gametest.EventShow`)
                        消息(`<§6 事件侦测 §r> §c已关闭§r`, 玩家名称)
                        break
                }
            }
            )
    }

    /**
     * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
     * @returns {show.command}
     * @example 接口功能: 用于生成<快速传送>的控制界面, 并根据玩家选择调整功能的执行效果
     */
    static 瞬间移动 = function (用户) {
        //定义实现当前功能所需的变量
        const 当前坐标 = new BlockLocation(Math.floor(用户.location.x), Math.floor(用户.location.y), Math.floor(用户.location.z))
        var 页面元素 = new ModalFormData()
        var 玩家名称 = `"` + `${用户.name}` + `"`
        //定义当前界面所用到的各项元素
        页面元素 = 页面元素.title("<§4§o§l 瞬间移动 §r>§9操作界面")
            .dropdown("设置<§4§o§l 瞬间移动 §r>", ["§4§l相对传送§r", "§d§l随机传送§r", "§b§l绝对传送§r", "§f§l锚点传送§r"], 0)
            .slider("§4相对§a X轴坐标§r", -64, 64, 1, 0)
            .slider("§4相对§a Y轴坐标§r", -64, 64, 1, 0)
            .slider("§4相对§a Z轴坐标§r", -64, 64, 1, 0)
            .textField("§b绝对§c 三轴坐标§r", "§c请输入目的地坐标§r", `${当前坐标.x} ${当前坐标.y} ${当前坐标.z}`)
            //生成界面并执行玩家的选择
            .show(用户).then((用户选择) => {
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
                            功能组件.通知界面(用户, 标题, 内容)
                        }
                        break
                }
            }
            )
    }

    /**
     * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
     * @returns {show.command}
     * @example 接口功能: 用于生成<锚点虚印>的控制界面, 并根据玩家选择调整功能的执行效果
     */
    static 锚点虚印 = function (用户) {
        //定义实现当前功能所需的变量
        const 当前坐标 = new BlockLocation(Math.floor(用户.location.x), Math.floor(用户.location.y), Math.floor(用户.location.z))
        var 页面元素 = new ModalFormData()
        var 玩家名称 = `"` + `${用户.name}` + `"`
        //定义当前界面所用到的各项元素
        页面元素 = 页面元素.title("<§c§o§l 锚点虚印 §r>§9操作界面")
            .dropdown("设置<§c§o§l 锚点虚印 §r>", ["§1§l执行§r<§9§o§l 锚点召集 §r>", "§6§l绑定§r<§5§o§l 锚点虚印 §r>", "§c§l移除§r<§4§o§l 锚点虚印 §r>"], 0)
            .slider("§6设置§r <§9§o§l 锚点召集 §r> §a有效范围§r", 1, 64, 1, 32)
            .slider("§6设置§r <§9§o§l 锚点召集 §r> §a有效数量§r", 1, 64, 1, 16)
            .slider("§c设置§r <§4§o§l 锚点虚印 §r> §a修改范围§r", 1, 16, 1, 16)
            .toggle("§c设置§r <§9§o§l 锚点召集 §r> §a范围限制§r", true)
            .textField("<§9§o§l 锚点虚印 §r>§c召集点坐标§r", "§c请输入 召集点 坐标§r", `${当前坐标.x} ${当前坐标.y} ${当前坐标.z}`)
            //生成界面并执行玩家的选择
            .show(用户).then((用户选择) => {
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
                            功能组件.通知界面(用户, 标题, 内容)
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
                            功能组件.通知界面(用户, 标题, 内容)
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
                            功能组件.通知界面(用户, 标题, 内容)
                        }
                        break
                }
            }
            )
    }
}

/**
* @example 定义了< 实现特定功能 >所依赖的 功能组件
*/
export class 功能组件 {
    /**
     * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
     * @param {string} 标题 定义了进行功能组件.通知界面显示的界面标题
     * @param {string} 内容 定义了进行功能组件.通知界面显示的界面内容
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
     * @param {string} 目标 定义了显示信息的目标, 定义方式等同于原版指令
     * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
     * @returns {run.command}
     * @example 此接口所定义了一个 快捷的 向 指定玩家 的 聊天栏 显示 指定的 内容 的功能
     */
    static 快捷消息 = function (内容, 目标, 用户) {
        try {
            用户.runCommand(`tellraw ${目标} {"rawtext":[{"text":"${内容}"}]}`)
        }
        catch {
            try {
                world.getDimension("overworld").runCommand(`tellraw ${目标} {"rawtext":[{"text":"${内容}"}]}`)
            }
            catch {
                world.getDimension("overworld").runCommand(`tellraw @a {"rawtext":[{"text":"${内容}"}]}`)
            }
        }
    }

    /**
     * @param {carry} 目标 定义了需要被查询的目标, 请勿使用原版指令进行定义
     * @param {any} 类型 定义了调用该接口后, 应该返回的信息类型
     * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
     * @returns {run.command | string}
     * @example 接口功能: <状态侦测><事件侦测>所依赖的信息查询功能
     */
    static 查询名称 = function (目标, 类型, 用户) {
        //定义实现当前功能所需的变量
        let 查询_命名空间 = 目标.id.split(':')
        //执行功能判定
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

            default:
                if (目标.id == 'minecraft:player') {
                    return `{ "text": "${目标.name}" }`
                }
                else {
                    return `{ "translate": "entity.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.id}.name" }`
                }
        }
    }

    static 延迟执行 = function () { }
}