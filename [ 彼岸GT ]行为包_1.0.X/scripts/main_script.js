//导入< gametest >接口
import { ActionFormData, MessageFormData, ModalFormData } from "mojang-minecraft-ui"
import { EntityRaycastOptions, BlockLocation, world } from "mojang-minecraft"

//便捷组件
/**
 * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
 * @param {string} 标题 定义了进行通知显示的界面标题
 * @param {string} 内容 定义了进行通知显示的界面内容
 * @returns {show}
 * @example 此接口所定义的界面有且只有一个交互输出, 用于打开本模组的<辅助说明>目录
 */
const 通知 = function (用户, 标题, 内容) {
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
                辅助说明_功能目录(用户)
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
const 消息 = function (内容, 目标, 用户) {
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
 * @param {carry} 目标 定义了需要被查询的实体, 请勿使用原版指令进行定义
 * @param {any} 类型 定义了调用该接口后, 应该返回的信息类型
 * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
 * @returns {run.command | string}
 * @example 接口功能: <状态侦测><事件侦测>所依赖的信息查询功能
 */
const 名称 = function (目标, 类型, 用户) {
    //定义实现当前功能所需的变量
    let 查询_命名空间 = 目标.id.split(':')
    //执行功能判定
    if (类型) {
        try {
            用户.runCommand(`tellraw @s {"rawtext":[{"translate":"entity.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.id}.name"}]}`)
        }
        catch {
            world.getDimension("overworld").runCommand(`tellraw @a {"rawtext":[{"translate":"entity.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.id}.name"}]}`)
        }
    }
    else {
        if (目标.id == 'minecraft:player') {
            return `{ "text": "${目标.name}" }`
        }
        else {
            return `{ "translate": "entity.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.id}.name" }`
        }
    }
}
/**
 * @param {string} 类型 用于 定义 需要查询 的 坐标标签 的名称
 * @param {carry} 用户 用于 传递 与 继承 对应目标 的 标签数组
 * @returns {run.command}
 * @example 接口功能: 用于查询 <标签类_3轴坐标_数据存储> 的 具体内容
 */
const 坐标_标签类 = function (类型, 用户) {
    const 查询标签 = 用户
    for (const 目标标签 in 查询标签) { //循环 获取标签
        if (查询标签[目标标签].startsWith(`{"${类型}":{`)) { //如果 有标签 就 根据标签 执行 指定功能

            //读取 标签中 的数据
            const 标签数据 = JSON.parse(查询标签[目标标签])
            const 坐标信息_X = 标签数据[类型]['坐标X']
            const 坐标信息_Y = 标签数据[类型]['坐标Y']
            const 坐标信息_Z = 标签数据[类型]['坐标Z']

            //输出读取出来的信息
            return `${坐标信息_X} ${坐标信息_Y} ${坐标信息_Z}`
        }
    }
}

//辅助说明
/**
 * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
 * @returns {show}
 * @example 接口功能: 本模组的<辅助说明>的目录部分
 */
const 辅助说明_功能目录 = function (用户) {
    //定义实现当前功能所需的变量
    var 页面元素 = new ActionFormData()
    //定义当前界面所用到的各项元素
    页面元素 = 页面元素.body("§7功能目录")
        .title("§6==========§o§l§5 彼岸浮梦 §r§6==========")
        .button("§l§1查看§1[§0§o§l 项目开发 §1]§r", "textures/ui/book_addtextpage_default")
        .button("§l§1查看§1[§3§o§l 浮世众生 §1]§r", "textures/ui/book_addtextpage_default")
        .button("§l§1查看§1[§5§o§l 魔导工业 §1]§r", "textures/ui/book_addtextpage_default")
        .button("§l§1查看§1[§8§o§l 秘境探索 §1]§r", "textures/ui/book_addtextpage_default")
        .button("§l§1查看§1[§c§o§l 基岩计划 §1]§r", "textures/ui/book_addtextpage_default")
        .button("§l§1查看§1[§c§o§l 矩阵接口 §1]§r", "textures/ui/book_addtextpage_default")
        .button("§l§9设置§1[§5§o§l 状态侦测 §1]§r", "textures/ui/book_addtextpage_default")
    if (用户.hasTag('Gametest.GetMagic_CareFor')) {
        页面元素.button("§l§9设置§1[§4§o§l 快捷传送 §1]§r", "textures/ui/book_addtextpage_default")
        页面元素.button("§l§9设置§1[§4§o§l 锚点虚印 §1]§r", "textures/ui/book_addtextpage_default")
    }
    //生成界面并执行玩家的选择
    页面元素.show(用户).then((用户选择) => {
        switch (用户选择.selection) {

            case 6:
                设置界面_状态侦测(用户)
                break

            case 7:
                设置界面_快捷传送(用户)
                break

            case 8:
                设置界面_锚点虚印(用户)
                break

            default:
                break
        }
    }
    )
}

//查询信息
/**
 * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
 * @returns {run.command}
 * @example 接口功能: <状态侦测>的主要部分
 */
const 查询信息_状态侦测 = function (用户) {
    //定义目标类型
    var 前方实体 = new EntityRaycastOptions()
    // 定义侦测距离
    if (用户.hasTag('Gametest.HealthShow.Range.08')) {
        前方实体.maxDistance = 8
    }
    else {
        if (用户.hasTag('Gametest.HealthShow.Range.16')) {
            前方实体.maxDistance = 16
        }
        else {
            if (用户.hasTag('Gametest.HealthShow.Range.24')) {
                前方实体.maxDistance = 24
            }
            else {
                if (用户.hasTag('Gametest.HealthShow.Range 32')) {
                    前方实体.maxDistance = 32
                }
            }
        }
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
                用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${名称(信息)}, { "text": "\n§l§6实体标识符§r: ${信息.id}\n§l§e实体生命值§r: ${Math.round(健康状态.current)}/${健康状态.value}\n§l§2实体可牵引§r: ${!!能否牵引}\n§l§2实体可契约§r: ${!!能否契约}\n${(常规移速) ? `§l§5陆地移速值§r: ${常规移速.value.toFixed(2)}` : ""}\n${(水下移速) ? `§l§9水下移速值§r: ${水下移速.value.toFixed(2)}` : ""}"}]}`)
            }
            else {
                用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${名称(信息)}, { "text": "\n§l§6实体标识符§r: ${信息.id}" }]}`)
            }
        }
        else {
            if (用户.isSneaking) {
                if (健康状态) {
                    用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${名称(信息)}, { "text": "\n§l§6实体标识符§r: ${信息.id}\n§l§e实体生命值§r: ${Math.round(健康状态.current)}/${健康状态.value}\n§l§2实体可牵引§r: ${!!能否牵引}\n§l§2实体可契约§r: ${!!能否契约}\n${(常规移速) ? `§l§5陆地移速值§r: ${常规移速.value.toFixed(2)}` : ""}\n${(水下移速) ? `§l§9水下移速值§r: ${水下移速.value.toFixed(2)}` : ""}"}]}`)
                }
                else {
                    用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${名称(信息)}, { "text": "\n§l§6实体标识符§r: ${信息.id}" }]}`)
                }
            }
            else {
                用户.runCommand(`titleraw @s actionbar {"rawtext":[${名称(信息)},{"text": "${(健康状态) ? `${`§8 | §r${Math.round(健康状态.current)}`}` : ""}"}]}`)
            }
        }
    }

}

//使用道具
/**
 * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
 * @returns {run.command}
 * @example 接口功能: 在使用<匣里乾坤>时, 应该执行的功能
 */
const 使用道具_匣里乾坤 = function (用户) {
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
        //生成提示界面
        let 标题 = "§1|§9§l 匣里乾坤 - 创建提示 §r§1|"
        let 内容 = `欢迎使用<§9§o§l 匣里乾坤 §r>\n\n已为您创建了专属的存储空间\n\n再次使用道具即可使用存储空间:${玩家名称}`
        通知(用户, 标题, 内容)
    }
}

//设置界面
/**
 * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
 * @returns {show.command}
 * @example 接口功能: 用于生成<状态侦测>的控制界面, 并根据玩家选择调整功能的执行效果
 */
const 设置界面_状态侦测 = function (用户) {
    //定义实现当前功能所需的变量
    var 页面元素 = new ModalFormData()
    //定义当前界面所用到的各项元素
    页面元素 = 页面元素.title("<§5§o§l 状态侦测 §r>§9操作界面")
        .dropdown("设置<§5§o§l 状态侦测 §r>", ["§2§l常规显示§r", "§b§l详细显示§r", "§4§l关闭功能§r"], 2)
        .slider("§6设置§a 侦测范围§r", 8, 32, 8, 16)
        .dropdown("设置<§c§o§l 事件侦测 §r>", ["§2§l开启功能§r", "§4§l关闭功能§r"], 1)
        //生成界面并执行玩家的选择
        .show(用户).then((用户选择) => {
            if (用户选择.isCanceled) {
                辅助说明_功能目录(用户)
            }
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
                    消息(`<§6 事件侦测 §r> §a已开启§r`)
                    break

                case 1:
                    用户.runCommand(`tag @s remove Gametest.EventShow`)
                    消息(`<§6 事件侦测 §r> §c已关闭§r`)
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
const 设置界面_快捷传送 = function (用户) {
    //定义实现当前功能所需的变量
    const 当前坐标 = new BlockLocation(Math.floor(用户.location.x), Math.floor(用户.location.y), Math.floor(用户.location.z))
    var 页面元素 = new ModalFormData()
    var 玩家名称 = `"` + `${用户.name}` + `"`
    //定义当前界面所用到的各项元素
    页面元素 = 页面元素.title("<§4§o§l 快捷传送 §r>§9操作界面")
        .dropdown("设置<§4§o§l 快捷传送 §r>", ["§4§l相对传送§r", "§d§l随机传送§r", "§b§l绝对传送§r", "§f§l锚点传送§r"], 0)
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
                        let 标题 = "§c|§4§l 快捷传送 - 错误提示 §r§c|"
                        let 内容 = `无法传送到您所期望的§6<§a 角色 §6>§r\n\n如需进行<§9§o§l 锚点传送 §r>应满足下列条件:\n\n     *. §6<§a 角色 §6>§r 已经 <§6 与您绑定 §r>\n\n     *. §6<§a 角色 §6>§r 处于 <§9 加载区块 §r>\n\n     *. §6<§a 角色 §6>§r 已经 <§5 精灵结契 §r>`
                        通知(用户, 标题, 内容)
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
const 设置界面_锚点虚印 = function (用户) {
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
                        通知(用户, 标题, 内容)
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
                        通知(用户, 标题, 内容)
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
                        通知(用户, 标题, 内容)
                    }
                    break
            }
        }
        )
}
//订阅< 系统侦听 >
world.events.beforeDataDrivenEntityTriggerEvent.subscribe((实体事件) => { //侦听实体触发事件
    for (const 用户 of world.getPlayers()) {
        if (用户.hasTag('Gametest.EventShow')) {
            消息("_______________", `@s`, 用户)
            名称(实体事件.entity, true, 用户)
            消息(`${实体事件.entity.id}`, `@s`, 用户)
            消息(`${实体事件.id}`, `@s`, 用户)
            消息("_______________")
        }
    }
}
)
world.events.beforeItemUseOn.subscribe((使用物品) => { //侦听手持物品点击方块时
    //定义实现当前功能所需的变量
    const 查询坐标 = `${使用物品.blockLocation.x} ${使用物品.blockLocation.y} ${使用物品.blockLocation.z}`
    const 查询标签 = 使用物品.source.getTags()
    const 当前玩家 = 使用物品.source
    //使用物品时的自定义效果
    switch (使用物品.item.id) {
        case 'minecraft:wooden_sword':
            当前玩家.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
            消息(`${查询坐标}`)
            //储存坐标信息
            for (const 目标标签 in 查询标签) { //循环 获取标签
                if (查询标签[目标标签].startsWith('{"标记点_1":{')) { //如果 有标签 就 根据标签 执行 指定功能

                    //读取 标签中 的数据
                    const 标签数据 = JSON.parse(查询标签[目标标签])
                    const 待删除_坐标X = 标签数据['标记点_1']['坐标X']
                    const 待删除_坐标Y = 标签数据['标记点_1']['坐标Y']
                    const 待删除_坐标Z = 标签数据['标记点_1']['坐标Z']

                    //整合 获得的 坐标数据
                    const 待删除_标记点_1 = {
                        '标记点_1': {
                            '坐标X': 待删除_坐标X,
                            '坐标Y': 待删除_坐标Y,
                            '坐标Z': 待删除_坐标Z,
                        }
                    }
                    //移除无用的坐标
                    当前玩家.removeTag(JSON.stringify(待删除_标记点_1))
                }
            }
            //整合 当前指向 的 方块 的 坐标数据
            const 标记点_1 = {
                '标记点_1': {
                    '坐标X': 使用物品.blockLocation.x,
                    '坐标Y': 使用物品.blockLocation.y,
                    '坐标Z': 使用物品.blockLocation.z,
                }
            }
            //添加对应的标签
            当前玩家.addTag(JSON.stringify(标记点_1))
            break

        case 'minecraft:stone_sword':
            当前玩家.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
            消息(`${查询坐标}`)
            //储存坐标信息
            for (const 目标标签 in 查询标签) { //循环 获取标签
                if (查询标签[目标标签].startsWith('{"标记点_2":{')) { //如果 有标签 就 根据标签 执行 指定功能

                    //读取 标签中 的数据
                    const 标签数据 = JSON.parse(查询标签[目标标签])
                    const 待删除_坐标X = 标签数据['标记点_2']['坐标X']
                    const 待删除_坐标Y = 标签数据['标记点_2']['坐标Y']
                    const 待删除_坐标Z = 标签数据['标记点_2']['坐标Z']

                    //整合 获得的 坐标数据
                    const 待删除_标记点_2 = {
                        '标记点_2': {
                            '坐标X': 待删除_坐标X,
                            '坐标Y': 待删除_坐标Y,
                            '坐标Z': 待删除_坐标Z,
                        }
                    }
                    //移除无用的坐标
                    当前玩家.removeTag(JSON.stringify(待删除_标记点_2))
                }
            }
            //整合 当前指向 的 方块 的 坐标数据
            const 标记点_2 = {
                '标记点_2': {
                    '坐标X': 使用物品.blockLocation.x,
                    '坐标Y': 使用物品.blockLocation.y,
                    '坐标Z': 使用物品.blockLocation.z,
                }
            }
            //添加对应的标签
            当前玩家.addTag(JSON.stringify(标记点_2))
            break

        case 'minecraft:iron_sword':
            当前玩家.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
            消息(`坐标点1: ${坐标_标签类(`标记点_1`, 查询标签)} | 坐标点2: ${坐标_标签类(`标记点_2`, 查询标签)}`)
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
            辅助说明_功能目录(使用物品.source)
            break

        case '魔法礼盒:匣里乾坤':
            使用道具_匣里乾坤(使用物品.source)
            break

        case '魔法书籍:瞬间移动':
            switch (使用物品.source.isSneaking) {
                case true:
                    设置界面_快捷传送(使用物品.source)
                    break

                case false:
                    使用物品.source.runCommand(`spreadplayers ~ ~ 5 15 @s`)
                    break
            }
            break

        case '特殊道具:锚点虚印':
            switch (使用物品.source.isSneaking) {
                case true:
                    设置界面_锚点虚印(使用物品.source)
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
                        通知(用户, 标题, 内容)
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
    var 发送玩家 = 发送信息.sender
    var 聊天内容 = 发送信息.message
    var 玩家名称 = `"` + `${发送玩家.name}` + `"`
    //定义新增命令
    if (聊天内容.startsWith(`in: `) || 聊天内容.startsWith(`<!>: `) || 聊天内容.startsWith(`<$>:`) || 聊天内容.startsWith(`!: `) || 聊天内容.startsWith(`#: `)) {
        //定义该指令的各项参数
        var 参数 = 聊天内容.split(/\s/)
        //撤回玩家发送的信息内容
        发送信息.cancel = true
        //根据参数的定义去执行指令效果
        switch (参数[1]) {
            case 'mode':
                switch (参数[2]) {
                    case '0':
                        发送玩家.runCommand(`gamemode creative ${玩家名称}`)
                        消息(`您已切换至 创造模式`, `${玩家名称}`)
                        break

                    case '1':
                        发送玩家.runCommand(`gamemode survival ${玩家名称}`)
                        消息(`您已切换至 生存模式`, `${玩家名称}`)
                        break

                    case '2':
                        发送玩家.runCommand(`gamemode adventure ${玩家名称}`)
                        消息(`您已切换至 冒险模式`, `${玩家名称}`)
                        break

                    case 's':
                        发送玩家.runCommand(`gamemode spectator ${玩家名称}`)
                        消息(`您已切换至 旁观模式`, `${玩家名称}`)
                        break

                    case 'd':
                        发送玩家.runCommand(`gamemode default ${玩家名称}`)
                        消息(`您已切换至 默认模式`, `${玩家名称}`)
                        break

                    case '+':
                        发送玩家.runCommand(`tag ${玩家名称} add Gametest.GetMagic_CareFor`)
                        消息(`特殊功能:§6《 强化版魔导手册 》§2已开启§r`, `${玩家名称}`)
                        break

                    case '-':
                        发送玩家.runCommand(`tag ${玩家名称} remove Gametest.GetMagic_CareFor`)
                        消息(`特殊功能:§6《 强化版魔导手册 》§c已关闭§r`, `${玩家名称}`)
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
                            消息(`您输入的 §6|>§c ${聊天内容} §6<|§r 存在参数错误, 参数 §6|>§a ${参数[3]} §6<|§r 应该为: 8 | 16 | 24 | 32`, `${玩家名称}`)
                        }
                        break

                    case 'many':
                        try {
                            发送玩家.runCommand("function HealthShow/ManyShow")
                            发送玩家.runCommand(`function HealthShow/Range_${参数[3]}`)
                        }
                        catch {
                            消息(`您输入的 §6|>§c ${聊天内容} §6<|§r 存在参数错误, 参数 §6|>§a ${参数[3]} §6<|§r 应该为: 8 | 16 | 24 | 32`, `${玩家名称}`)
                        }
                        break

                    case 'shut':
                        发送玩家.runCommand("function HealthShow/CloseShow")
                        break

                    default:
                        消息(`您输入的|>§c ${聊天内容} §r<|存在参数错误, 参数 ${参数[2]} 应该为: open | many | shut`, `${玩家名称}`)
                        break
                }
                break

            case 'event:show':
                switch (参数[2]) {
                    case 'open':
                        try {
                            发送玩家.runCommand(`tag @s add Gametest.EventShow`)
                            消息(`特殊功能:§6< 实体事件侦测 >§a已开启§r`, `${玩家名称}`)
                        }
                        catch {
                            消息(`您输入的|>§c ${聊天内容} §r<|存在参数错误, 您已经开启了该功能`, `${玩家名称}`)
                        }
                        break

                    case 'shut':
                        try {
                            发送玩家.runCommand(`tag @s remove Gametest.EventShow`)
                            消息(`特殊功能:§6< 实体事件侦测 >§c已关闭§r`, `${玩家名称}`)
                        }
                        catch {
                            消息(`您输入的|>§c ${聊天内容} §r<|存在参数错误, 您已经关闭了该功能`, `${玩家名称}`)
                        }
                        break

                    default:
                        消息(`您输入的|>§c ${聊天内容} §r<|存在参数错误, 参数 ${参数[2]} 应该为: open | shut`, `${玩家名称}`)
                        break
                }
                break
            default:
                消息(`${发送信息.sender.name} ${参数[0]} + ${参数[1]} + ${参数[2]} + ${参数[3]}`)
                消息(`===§o§l§c| 彼岸附加指令组 |§r===`, `${玩家名称}`)
                消息(`输入<§c Hs+ §r> 开启状态侦测功能`, `${玩家名称}`)
                消息(`输入<§c Hs- §r> 关闭状态侦测功能`, `${玩家名称}`)
                消息(`输入<§c Gm+ §r> 开启功能附加列表`, `${玩家名称}`)
                break
        }
    }
}
)
world.events.tick.subscribe((游戏时刻) => { //侦听每个游戏帧
    for (const 用户 of world.getPlayers()) {
        if (用户.hasTag('Gametest.HealthShow')) {
            查询信息_状态侦测(用户)
        }
    }
}
)