/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 / Tayun_Starry ]
*/
<<<<<<< Updated upstream

//导入< 香草 >预设接口
import {
    MessageFormData,
    ActionFormData,
    ModalFormData
} from "@minecraft/server-ui"

import {
    EntityQueryOptions,
    BlockRaycastOptions,
    BlockLocation,
    Dimension,
    Entity,
    world
} from "@minecraft/server"

//导入< matrix_API >预设接口
import { 通用组件, 数据标签, 坐标信息 } from './matrix_API'

export class 专用界面 {
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {string} 类型 此参数限制为: <基础目录 | 项目列表 | ...>
     * @returns {show.command}
     */
    static 辅助说明 = function (用户, 类型) {
        switch (类型) {
            case '基础目录':
                //定义当前界面所用到的各项元素
                var 功能界面 = new ActionFormData()
                    .body("§7功能目录")
                    .title("§6==========§o§l§5 彼岸浮梦 §r§6==========")
                    .button("§l§1查看§1[§0§o§l 项目开发 §1]§r", "textures/GUI/icon/icon_00")
                    .button("§l§1查看§1[§3§o§l 浮世众生 §1]§r", "textures/items/魔法卷宗/0")
                    .button("§l§1查看§1[§5§o§l 魔导工业 §1]§r", "textures/GUI/icon/icon_06")
                    .button("§l§1查看§1[§c§o§l 特种制造 §1]§r", "textures/GUI/icon/icon_04")
                    .button("§l§1查看§1[§8§o§l 家居装饰 §1]§r", "textures/GUI/icon/icon_09")
                    .button("§l§1查看§1[§8§o§l 领域方块 §1]§r", "textures/GUI/icon/icon_10")
                    .button("§l§1查看§1[§8§o§l 迷途机关 §1]§r", "textures/GUI/icon/icon_11")
                    .button("§l§1查看§1[§8§o§l 秘境探索 §1]§r", "textures/GUI/icon/icon_05")
                    .button("§l§1查看§1[§c§o§l 矩阵接口 §1]§r", "textures/GUI/icon/icon_07")
                    .button("§l§9设置§1[§5§o§l 状态侦测 §1]§r", "textures/GUI/icon/icon_08")
                功能界面.show(用户).then((用户选择) => {
                    switch (用户选择.selection) {
                        case 0:
                            专用界面.辅助说明(用户, '项目列表')
                            break
=======
>>>>>>> Stashed changes

//导入 功能接口
import { BlockRaycastOptions, EntityRaycastOptions, ItemStack, ItemTypes, world } from "@minecraft/server"
import { 通用组件, 数据标签, 坐标信息, 消息通知, 数值修饰, 获取维度, 图形绘制, 方块识别 } from './matrix_API'
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui"
import { BlockLocation } from "@minecraft/server"

//定义 功能
/**
 * @param {string} 类型 此参数限制为: < ... >
 * @param {string} 效果 此参数限制为: < ... >
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 * @param {number} 维持 执行功能时, 等待多少<游戏刻>后停止运行
 * @returns {Promise<any>}
 */
export const 保持运行 = function (类型, 效果, 用户, 维持 = 1200) {
    //定义实现当前功能所需的变量
    var 玩家名称 = `"${用户.nameTag}"`
    //创建多线程任务
    new Promise(async function () {
        //定义所需的游戏事件效果
        let 游戏事件 = function (信息) {
            switch (效果) {
                case '状态显示':
                    状态显示(用户)
                    break

                case '事件侦测':
                    事件侦测(用户, 信息, '执行功能')
                    break

                case '拟态矩阵_方块记录':
                    if (用户.hasTag('Mimetic_matrix.RecordBlock')) {
                        拟态矩阵(用户, 信息.block, '', `记录方块`)
                        //移除游戏侦听
                        world.events.blockPlace.unsubscribe(游戏事件)
                        world.events.tick.unsubscribe(等待关闭)
                    }
                    break

                case '拟态矩阵_方块替换':
                    if (用户.hasTag('Mimetic_matrix.ReplaceBlock')) {
                        //定义 需要替换的方块
                        let 方块 = 信息.block.typeId
                        //执行 替换操作
                        用户.runCommandAsync(`fill ${坐标信息.数据解析('拟态矩阵_标记起点', 用户)} ${坐标信息.数据解析('拟态矩阵_标记终点', 用户)} ${方块} -1 replace ${数据标签.读取方块('拟态矩阵_标记方块', 用户)}`)
                        //移除用户标签
                        用户.removeTag('Mimetic_matrix.ReplaceBlock')
                        //移除游戏侦听
                        world.events.blockPlace.unsubscribe(游戏事件)
                        world.events.tick.unsubscribe(等待关闭)
                    }
                    break
            }
        }
        let 等待关闭 = function () {
            if (维持 <= 0) {
                //移除实体事件侦听
                world.events.beforeDataDrivenEntityTriggerEvent.unsubscribe(游戏事件)
                //移除方块事件侦听
                world.events.blockPlace.unsubscribe(游戏事件)
                //移除游戏刻侦听
                world.events.tick.unsubscribe(等待关闭)
                world.events.tick.unsubscribe(游戏事件)
                //移除游戏事件时, 进行通报操作
                消息通知.数据驱动('聊天栏', `§a${效果} §6持续时间结束 §c正在停止运行`, 玩家名称)
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
        }
    }
<<<<<<< Updated upstream
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @returns {show.command}
     */
    static 瞬间移动 = function (用户) {
        //定义实现当前功能所需的变量
        let 当前坐标 = new BlockLocation(Math.floor(用户.location.x), Math.floor(用户.location.y), Math.floor(用户.location.z))
        let 玩家名称 = `"` + `${用户.nameTag}` + `"`
        //定义当前界面所用到的各项元素
        let 功能界面 = new ModalFormData()
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
     */
    static 锚点虚印 = function (用户) {
        //定义实现当前功能所需的变量
        let 当前坐标 = new BlockLocation(Math.floor(用户.location.x), Math.floor(用户.location.y), Math.floor(用户.location.z))
        let 玩家名称 = `"` + `${用户.nameTag}` + `"`
        //定义当前界面所用到的各项元素
        let 功能界面 = new ModalFormData()
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
export class 专用组件 {
    /**
     * @param {string} 类型 此参数限制为: < 实体事件 | 方块放置 | 游戏时刻 >
     * @param {string} 效果 此参数限制为: < 实体属性显示 | 实体事件显示 | ... >中选择
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {value} 维持 执行功能时, 等待多少<游戏刻>后停止运行
     * @returns {Promise<any>}
     */
    static 保持运行 = function (类型, 效果, 用户, 维持 = 1200) {
        //定义实现当前功能所需的变量
        var 玩家名称 = `"` + `${用户.nameTag}` + `"`
        //创建多线程任务
        return new Promise(async function () {
            //定义所需的游戏事件效果
            let 游戏事件 = function (信息) {
                switch (效果) {
                    case '实体事件显示':
                        if (用户.hasTag('Gametest.EventShow')) {
                            专用组件.事件侦测(用户, 信息, '执行功能')
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
                }
            }
            let 等待关闭 = function () {
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
=======
    )
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 * @param {object} 目标 此参数限制为: <事件类 对象>
 * @param {string} 类型 此参数限制为: < 显示界面 | 执行功能 >
 */
export const 事件侦测 = function (用户, 目标, 类型 = '显示界面') {
    switch (类型) {
        case '显示界面':
            //定义实现当前功能所需的变量
            let 玩家名称 = `"${用户.nameTag}"`
            //定义当前界面所用到的各项元素
            let 功能界面 = new ModalFormData()
                .title('<§5§o§l 特殊侦测 §r>§9操作界面')
                .dropdown("开启<§2§o§l事件侦测§r>§r后\n当<§b实体§r>触发<§e事件§r>时\n将显示<§b实体§r>与<§e事件§r>的部分信息\n==============================\n开启<§5§o§l状态侦测§r>§r后\n将显示<§e玩家§r>所注视的<§b实体§r>的血量\n当<§e玩家§r>[§c潜行§r]时\n将显示所注视的<§b方块§r>的名称与标识\n==============================\n当持续时间结束后, 上述侦测效果将自动移除", ["§2§l事件侦测§r", "§4§l暂不开启§r", "§5§l状态侦测§r"], 1)
                .textField("§6设置<§5§o§l 特殊侦测 §r>§持续时间[秒]", "§c请输入持续时间§r", '60')
            功能界面.show(用户).then((用户选择) => {
                let 持续时间 = parseInt(用户选择.formValues[1]) * 20
                switch (用户选择.formValues[0]) {
                    case 0:
                        消息通知.数据驱动('聊天栏', `<§5§o§l 事件侦测 §r>§a已开启§r, 该效果将持续: §c${持续时间} §r游戏刻`, 玩家名称)
                        保持运行('实体事件', '事件侦测', 用户, 持续时间)
                        break

                    case 1:
                        break

                    case 2:
                        消息通知.数据驱动('聊天栏', `<§5§o§l 状态显示 §r>§a已开启§r, 该效果将持续: §c${持续时间} §r游戏刻`, 玩家名称)
                        保持运行('游戏时刻', '状态显示', 用户, 持续时间)
                        break
                }
            }
            )
            break

        case '执行功能':
            //定义实现当前功能所需的变量
            let 位置 = `${Math.floor(目标.entity.location.x)} ${Math.floor(目标.entity.location.y)} ${Math.floor(目标.entity.location.z)}`
            let 血量 = 目标.entity.getComponent('health')
            //获取信息并进行显示
            if (血量) {
                用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b实体名称§7: §3"},${通用组件.查询名称(目标.entity)},{"text":"\n§l§e实体标识§7: §6${目标.entity.typeId}\n§l§e实体血量§7: §2${Math.round(血量.current)}/${血量.value}\n§a实体事件§7: §b${目标.id}\n§6实体位置§7: §e${位置}\n§r========================="}]}`)
>>>>>>> Stashed changes
            }
            else {
                用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b实体名称§7: §3"},${通用组件.查询名称(目标.entity)},{"text":"\n§l§e实体标识§7: §6${目标.entity.typeId}\n§a实体事件§7: §b${目标.id}\n§6实体位置§7: §e${位置}\n§r========================="}]}`)
            }
            break
    }
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 * @param {object} 方块 此参数限制为: <方块类 对象>
 * @param {string} 坐标 此参数限制为: <坐标类 对象>
 * @param {string} 类型 此参数限制为: < ... >
 * @param {string} 查询 定义了定义了部分功能所需要的来自外部信息
 */
export const 拟态矩阵 = function (用户, 方块, 坐标, 类型, 查询) {
    //定义实现当前功能所需的变量
    let 玩家名称 = `"${用户.nameTag}"`
    let 方块标识 = 方块.typeId
    let 方块信息 = 方块
    var 标定界面 = new ActionFormData()
        .body("§7方块信息标定")
        .title("§l§8 拟态矩阵 §r")
        .button("§l§5< 空气 >§r", "textures/items/bucket_empty")
        .button("§l§4< 熔岩 >§r", "textures/items/bucket_lava")
        .button("§l§9< 水源 >§r", "textures/items/bucket_water")
        .button("§l§5< 细雪 >§r", "textures/items/bucket_powder_snow")
    //执行本接口的功能
    switch (类型) {
        case '标记起点':
            消息通知.数据驱动('小标题', `§6填充坐标§r<§b A §r>§6为§r :§a ${查询}`, 玩家名称)
            坐标信息.数据保存('拟态矩阵_标记起点', 用户, 坐标)
            break

        case '标记终点':
            消息通知.数据驱动('小标题', `§6填充坐标§r<§d B §r>§6为§r :§a ${查询}`, 玩家名称)
            坐标信息.数据保存('拟态矩阵_标记终点', 用户, 坐标)
            break

        case '开始填充':
            //提示 进行填充时 的 坐标点
            消息通知.数据驱动('小标题', `§r<§b 坐标点 A §r>§6为§r :§a ${坐标信息.数据解析('拟态矩阵_标记起点', 用户)}\n§r<§d 坐标点 B §r>§6为§r :§a ${坐标信息.数据解析('拟态矩阵_标记终点', 用户)}\n§r<§e 方块数 F §r>§6为§r :§a ${坐标信息.计算区间(用户, '拟态矩阵_标记起点', '拟态矩阵_标记终点')}`, 玩家名称)
            //执行填充操作
            switch (用户.isSneaking) {
                case true://执行随机填充操作
                    for (let 填充次数 = 坐标信息.计算区间(用户, '拟态矩阵_标记起点', '拟态矩阵_标记终点'); 填充次数 > 0; 填充次数--) {
                        用户.runCommandAsync(`setblock ${坐标信息.计算区间(用户, '拟态矩阵_标记起点', '拟态矩阵_标记终点', '随机坐标')} ${数据标签.读取方块('拟态矩阵_标记方块', 用户)}`)
                    }
                    break

                case false://执行完全填充操作
                    用户.runCommandAsync(`fill ${坐标信息.数据解析('拟态矩阵_标记起点', 用户)} ${坐标信息.数据解析('拟态矩阵_标记终点', 用户)} ${数据标签.读取方块('拟态矩阵_标记方块', 用户)}`)
                    break
            }
<<<<<<< Updated upstream
        }
        )
    }
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {object} 目标 此参数限制为: <事件类 对象>
     * @param {string} 类型 此参数限制为: < 显示界面 | 执行功能 >
     * @returns {run.command}
     */
    static 事件侦测 = function (用户, 目标, 类型 = '显示界面') {
        switch (类型) {
            case '显示界面':
                //定义实现当前功能所需的变量
                let 玩家名称 = `"` + `${用户.nameTag}` + `"`
                //定义当前界面所用到的各项元素
                //定义当前界面所用到的各项元素
                let 功能界面 = new ModalFormData()
                    .title('<§5§o§l 事件侦测 §r>§9操作界面')
                    .dropdown("开启功能后, 将持续进行侦测\n\n当<§b实体§r>触发<§e实体事件§r>时, 将显示该<§b实体§r>的部分信息\n\n当持续时间结束后, 侦测效果将自动移除", ["§2§l开启功能§r", "§4§l关闭功能§r"], 1)
                    .slider("§6设置<§5§o§l 状态侦测 §r>§持续时间[秒]", 0, 300, 1, 60)
                功能界面.show(用户).then((用户选择) => {
                    let 持续时间 = 用户选择.formValues[1] * 20
                    switch (用户选择.formValues[0]) {
                        case 0:
                            通用组件.快捷消息(`<§5§o§l 事件侦测 §r>§a已开启§r, 该效果将持续: §c${持续时间} §r游戏刻`, 玩家名称)
                            专用组件.保持运行('实体事件', '实体事件显示', 用户, 持续时间)
                            用户.addTag('Gametest.EventShow')
                            break

                        case 1:
                            break
                    }
                }
                )
                break

            case '执行功能':
                //定义实现当前功能所需的变量
                let 目标实体 = 目标.entity
                let 健康状态 = 目标实体.getComponent('health')
                let 目标位置 = new BlockLocation(Math.floor(目标实体.location.x), Math.floor(目标实体.location.y), Math.floor(目标实体.location.z))
                //获取信息并进行显示
                if (健康状态) {
                    用户.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§b实体名称§7: §3"},${通用组件.查询名称(目标实体, 'return_entity')},{"text":"\n§e实体标识§7: §6${目标实体.typeId}\n§l§e实体血量§7: §2${Math.round(健康状态.current)}/${健康状态.value}\n§a实体事件§7: §b${目标.id}\n§6实体位置§7: §e${目标位置.x} ${目标位置.y} ${目标位置.z}\n§r========================="}]}`)
                }
                else {
                    用户.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§b实体名称§7: §3"},${通用组件.查询名称(目标实体, 'return_entity')},{"text":"\n§e实体标识§7: §6${目标实体.typeId}\n§a实体事件§7: §b${目标.id}\n§6实体位置§7: §e${目标位置.x} ${目标位置.y} ${目标位置.z}\n§r========================="}]}`)
                }
                目标实体.runCommand('particle 提示图标:通用提示 ~ ~2 ~')
                break
        }
    }
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {object} 方块 此参数限制为: <方块类 对象>
     * @param {string} 坐标 此参数限制为: <坐标类 对象>
     * @param {string} 类型 此参数限制为: <标记起点 | 标记终点 | ...>
     * @param {string} 查询 定义了定义了部分功能所需要的来自外部信息
     * @returns {run.command}
     */
    static 拟态矩阵 = function (用户, 方块, 坐标, 类型, 查询) {
        //定义实现当前功能所需的变量
        let 玩家名称 = `"` + `${用户.nameTag}` + `"`
        let 方块标识 = 方块.typeId
        let 方块信息 = 方块
        //执行本接口的功能
        switch (类型) {
            case '标记起点':
                用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
                通用组件.快捷标题(`§6填充坐标§r<§b A §r>§6为§r :§a ${查询}`, 玩家名称)
                坐标信息.数据保存('拟态矩阵_标记起点', 用户, 坐标)
                break

            case '标记终点':
                用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
                通用组件.快捷标题(`§6填充坐标§r<§d B §r>§6为§r :§a ${查询}`, 玩家名称)
                坐标信息.数据保存('拟态矩阵_标记终点', 用户, 坐标)
                break

            case '开始填充':
                //移除特定道具
                用户.runCommand("function Data/matrix_delete_items")
                //归还特定道具
                通用组件.延迟执行('给予物品', '拟态矩阵:开始填充', 用户, 10)
                通用组件.延迟执行('给予物品', '拟态矩阵:标记起点', 用户, 20)
                通用组件.延迟执行('给予物品', '拟态矩阵:标记终点', 用户, 25)
                //提示 进行填充时 的 坐标点
                通用组件.快捷标题(`§r<§b 坐标点 A §r>§6为§r :§a ${坐标信息.数据解析('拟态矩阵_标记起点', 用户)}\n§r<§d 坐标点 B §r>§6为§r :§a ${坐标信息.数据解析('拟态矩阵_标记终点', 用户)}\n§r<§e 方块数 F §r>§6为§r :§a ${坐标信息.计算区间(用户, '拟态矩阵_标记起点', '拟态矩阵_标记终点')}`, 玩家名称)
                //执行填充操作
                switch (用户.isSneaking) {
                    case true://执行随机填充操作
                        for (let 填充次数 = 坐标信息.计算区间(用户, '拟态矩阵_标记起点', '拟态矩阵_标记终点'); 填充次数 > 0; 填充次数--) {
                            用户.runCommand(`setblock ${坐标信息.计算区间(用户, '拟态矩阵_标记起点', '拟态矩阵_标记终点', '随机坐标')} ${数据标签.读取方块('拟态矩阵_标记方块', 用户)}`)
                        }
=======
            break

        case '等待方块':
            消息通知.数据驱动('小标题', `§6您已处于方块标记的模式, 请放置你需要用来§r<§9 ${类型} §r>§6的方块`, 玩家名称)
            保持运行('方块放置', '拟态矩阵_方块记录', 用户)
            用户.addTag('Mimetic_matrix.RecordBlock')
            break

        case '记录方块':
            //获取方块信息
            数据标签.存储方块('拟态矩阵_标记方块', 用户, 方块标识)
            //向玩家反馈与显示
            消息通知.数据驱动('聊天栏', "===============", 玩家名称)
            消息通知.数据驱动('聊天栏', `§2方块名称 §7:§a `, 玩家名称, `${通用组件.查询名称(方块信息, '方块')}`)
            消息通知.数据驱动('聊天栏', `§3玩家名称 §7:§b ${用户.nameTag}`, 玩家名称)
            消息通知.数据驱动('聊天栏', `§4方块标识 §7:§c ${方块标识}`, 玩家名称)
            消息通知.数据驱动('聊天栏', "===============", 玩家名称)
            //移除标签
            用户.removeTag('Mimetic_matrix.RecordBlock')
            break

        case '方块标定':
            //定义当前界面所用到的各项元素
            标定界面.show(用户).then((用户选择) => {
                switch (用户选择.selection) {
                    case 0:
                        数据标签.存储方块('拟态矩阵_标记方块', 用户, 'air')
                        消息通知.数据驱动('聊天栏', "===============", 玩家名称)
                        消息通知.数据驱动('聊天栏', `§2方块名称 §7:§a `, 玩家名称, `{ "translate": "tile.air.name" }`)
                        消息通知.数据驱动('聊天栏', `§3玩家名称 §7:§b ${用户.nameTag}`, 玩家名称)
                        消息通知.数据驱动('聊天栏', `§4方块标识 §7:§a minecraft:air`, 玩家名称)
                        消息通知.数据驱动('聊天栏', "===============", 玩家名称)
                        break

                    case 1:
                        数据标签.存储方块('拟态矩阵_标记方块', 用户, 'lava')
                        消息通知.数据驱动('聊天栏', "===============", 玩家名称)
                        消息通知.数据驱动('聊天栏', `§2方块名称 §7:§4 `, 玩家名称, `{ "translate": "tile.lava.name" }`)
                        消息通知.数据驱动('聊天栏', `§3玩家名称 §7:§b ${用户.nameTag}`, 玩家名称)
                        消息通知.数据驱动('聊天栏', `§4方块标识 §7:§4 minecraft:lava`, 玩家名称)
                        消息通知.数据驱动('聊天栏', "===============", 玩家名称)
                        break

                    case 2:
                        数据标签.存储方块('拟态矩阵_标记方块', 用户, 'water')
                        消息通知.数据驱动('聊天栏', "===============", 玩家名称)
                        消息通知.数据驱动('聊天栏', `§2方块名称 §7:§9 `, 玩家名称, `{ "translate": "tile.water.name" }`)
                        消息通知.数据驱动('聊天栏', `§3玩家名称 §7:§b ${用户.nameTag}`, 玩家名称)
                        消息通知.数据驱动('聊天栏', `§4方块标识 §7:§9 minecraft:water`, 玩家名称)
                        消息通知.数据驱动('聊天栏', "===============", 玩家名称)
                        break

                    case 3:
                        数据标签.存储方块('拟态矩阵_标记方块', 用户, 'powder_snow')
                        消息通知.数据驱动('聊天栏', "===============", 玩家名称)
                        消息通知.数据驱动('聊天栏', `§2方块名称 §7:§6 `, 玩家名称, `{ "translate": "tile.powder_snow.name" }`)
                        消息通知.数据驱动('聊天栏', `§3玩家名称 §7:§b ${用户.nameTag}`, 玩家名称)
                        消息通知.数据驱动('聊天栏', `§4方块标识 §7:§6 minecraft:powder_snow`, 玩家名称)
                        消息通知.数据驱动('聊天栏', "===============", 玩家名称)
>>>>>>> Stashed changes
                        break

                    default:
                        break
                }
<<<<<<< Updated upstream
                break

            case '等待方块':
                通用组件.快捷标题(`§6您已处于方块标记的模式, 请放置你需要用来填充的方块`, 玩家名称)
                用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
                专用组件.保持运行('方块放置', '拟态矩阵_方块记录', 用户)
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
                //移除玩家手上的道具
                用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
                //等待一段时间后归还道具
                通用组件.延迟执行('给予物品', '拟态矩阵:方块标定', 用户, 通用组件.随机数值(10, 30))
                //定义当前界面所用到的各项元素
                var 功能界面 = new ActionFormData()
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
=======
            }
            )
            break

        case '方块调试':
            //执行功能
            switch (用户.isSneaking) {
                case true:
                    //定义实现当前功能所需的变量
                    var 获取方块 = 获取维度.getBlock(坐标)
                    var 调试属性 = 获取方块.type.createDefaultBlockPermutation()
                    //定义当前界面所用到的各项元素
                    var 调试界面 = new ModalFormData()
                        .title("<§5§o§l 方块修改 §r>§9操作界面")
                        .dropdown("| 调试 |与| 修改 |<§9§o§l 方块属性 §r>", ["<§c§o§l 自由模式 §r>", "<§7§o§l 方块朝向 §r>", "<§7§o§l 方块转换 §r>", "<§7§o§l 方块能量 §r>", "<§7§o§l 方块参数 §r>"], 2)
                        .textField("<§c§o§l 自由模式 => §9方块属性 §r>", "§c请输入 方块属性 标签§r", 'Table:switch')
                        .textField("§6设置§r<§9§o§l 方块属性 §r>§a数值§r", "§c请输入数值§r", '0')
                    调试界面.show(用户).then((用户选择) => {
                        let 属性数值 = parseInt(用户选择.formValues[2])
                        try {
                            switch (用户选择.formValues[0]) {
                                case 0:
                                    调试属性.getProperty(用户选择.formValues[1]).value = 属性数值
                                    获取方块.setPermutation(调试属性)
                                    break

                                case 1:
                                    调试属性.getProperty('Table:angle').value = 属性数值
                                    获取方块.setPermutation(调试属性)
                                    break

                                case 2:
                                    调试属性.getProperty('Table:switch').value = 属性数值
                                    获取方块.setPermutation(调试属性)
                                    break
>>>>>>> Stashed changes

                                case 3:
                                    调试属性.getProperty('Table:energy').value = 属性数值
                                    获取方块.setPermutation(调试属性)
                                    break

<<<<<<< Updated upstream
            case '方块调试':
                //移除玩家手上的道具
                用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
                //等待一段时间后归还道具
                通用组件.延迟执行('给予物品', '拟态矩阵:方块调试', 用户, 通用组件.随机数值(10, 30))
                //执行功能
                switch (查询) {
                    case '标准调试':
                        //定义实现当前功能所需的变量
                        var 获取方块 = world.getDimension("overworld").getBlock(new BlockLocation(坐标.x, 坐标.y, 坐标.z))
                        var 调试属性 = 获取方块.type.createDefaultBlockPermutation()
                        //定义当前界面所用到的各项元素
                        var 功能界面 = new ModalFormData()
                            .title("<§5§o§l 方块修改 §r>§9操作界面")
                            .dropdown("| 调试 |与| 修改 |<§9§o§l 方块属性 §r>", ["<§c§o§l 自由模式 §r>", "<§7§o§l 方块朝向 §r>", "<§7§o§l 方块转换 §r>", "<§7§o§l 方块能量 §r>", "<§7§o§l 方块参数 §r>"], 2)
                            .textField("<§c§o§l 自由模式 => §9方块属性 §r>", "§c请输入 方块属性 标签§r", 'Table:switch')
                            .slider("§6设置§r<§9§o§l 方块属性 §r>§a数值§r", 0, 15, 1, 0)
                        功能界面.show(用户).then((用户选择) => {
                            try {
                                switch (用户选择.formValues[0]) {
                                    case 0:
                                        调试属性.getProperty(用户选择.formValues[1]).value = 用户选择.formValues[2]
                                        获取方块.setPermutation(调试属性)
                                        break

                                    case 1:
                                        调试属性.getProperty('Table:angle').value = 用户选择.formValues[2]
                                        获取方块.setPermutation(调试属性)
                                        break

                                    case 2:
                                        调试属性.getProperty('Table:switch').value = 用户选择.formValues[2]
                                        获取方块.setPermutation(调试属性)
                                        break

                                    case 3:
                                        调试属性.getProperty('Table:energy').value = 用户选择.formValues[2]
                                        获取方块.setPermutation(调试属性)
                                        break

                                    case 4:
                                        调试属性.getProperty('Table:value').value = 用户选择.formValues[2]
                                        获取方块.setPermutation(调试属性)
                                        break
                                }
                            }
                            catch {
                                通用组件.通知界面(用户, '<§9§o§l 调试权杖 §r>§c随机参数设置异常', '*.当前方块无法进行属性修改\n\n*.当前方块属性参数设置失败\n\n*.当前方块参数类型设置失败')
=======
                                case 4:
                                    调试属性.getProperty('Table:value').value = 属性数值
                                    获取方块.setPermutation(调试属性)
                                    break
>>>>>>> Stashed changes
                            }
                        }
                        catch {
                            消息通知.界面显示(用户, '<§9§o§l 调试权杖 §r>§c方块参数设置异常', '*.当前方块无法进行属性修改\n\n*.当前方块属性参数设置失败\n\n*.当前方块参数类型设置失败')
                        }
                    }
                    )
                    break

<<<<<<< Updated upstream
                    case '随机调试':
                        var 获取方块 = world.getDimension("overworld").getBlock(new BlockLocation(坐标.x, 坐标.y, 坐标.z))
                        var 调试属性 = 获取方块.type.createDefaultBlockPermutation()
                        try {
                            调试属性.getProperty("Table:angle").value = 通用组件.随机数值(2, 5)
=======
                case false:
                    var 获取方块 = 获取维度.getBlock(坐标)
                    var 调试属性 = 获取方块.type.createDefaultBlockPermutation()
                    try {
                        调试属性.getProperty("Table:angle").value = 数值修饰.整数值(2, 5)
                        获取方块.setPermutation(调试属性)
                    }
                    catch {
                        try {
                            调试属性.getProperty("Table:switch").value = 数值修饰.整数值(1, 5)
>>>>>>> Stashed changes
                            获取方块.setPermutation(调试属性)
                        }
                        catch {
                            try {
<<<<<<< Updated upstream
                                调试属性.getProperty("Table:switch").value = 通用组件.随机数值(1, 5)
=======
                                调试属性.getProperty("Table:energy").value = 数值修饰.整数值(1, 6)
>>>>>>> Stashed changes
                                获取方块.setPermutation(调试属性)
                            }
                            catch {
                                try {
<<<<<<< Updated upstream
                                    调试属性.getProperty("Table:energy").value = 通用组件.随机数值(1, 6)
                                    获取方块.setPermutation(调试属性)
                                }
                                catch {
                                    try {
                                        调试属性.getProperty("Table:value").value = 通用组件.随机数值(0, 5)
                                        获取方块.setPermutation(调试属性)
                                    }
                                    catch {
                                        通用组件.通知界面(用户, '<§9§o§l 调试权杖 §r>§c随机参数设置异常', '*.当前方块无法进行属性修改\n\n*.当前方块属性参数设置失败\n\n*.当前方块参数类型设置失败')
                                    }
                                }
                            }
                        }
                        break
                }
                break
        }
    }
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {string} 内容 用户所输入的文本内容
     * @param {string} 名称 此参数限制为: <玩家名称><目标选择器>
     * @returns {run.command}
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
            case 'gm':
                switch (参数[2]) {
                    case '0':
                        发送玩家.runCommand(`gamemode creative ${玩家名称}`)
                        通用组件.快捷消息(`您已切换至 创造模式`, 玩家名称)
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
                }
                break

            case 'hs':
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

            case 'es':
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
=======
                                    调试属性.getProperty("Table:value").value = 数值修饰.整数值(0, 5)
                                    获取方块.setPermutation(调试属性)
                                }
                                catch {
                                    消息通知.界面显示(用户, '<§9§o§l 调试权杖 §r>§c随机参数设置异常', '*.当前方块无法进行属性修改\n\n*.当前方块属性参数设置失败\n\n*.当前方块参数类型设置失败')
                                }
                            }
                        }
                    }
                    break
            }
            break

        case '方块替换':
            //执行功能
            if (用户.isSneaking) {
                //定义当前界面所用到的各项元素
                标定界面.show(用户).then((用户选择) => {
                    switch (用户选择.selection) {
                        case 0:
                            用户.runCommandAsync(`fill ${坐标信息.数据解析('拟态矩阵_标记起点', 用户)} ${坐标信息.数据解析('拟态矩阵_标记终点', 用户)} minecraft:air -1 replace ${数据标签.读取方块('拟态矩阵_标记方块', 用户)}`)
                            break

                        case 1:
                            用户.runCommandAsync(`fill ${坐标信息.数据解析('拟态矩阵_标记起点', 用户)} ${坐标信息.数据解析('拟态矩阵_标记终点', 用户)} minecraft:lava -1 replace ${数据标签.读取方块('拟态矩阵_标记方块', 用户)}`)
                            break

                        case 2:
                            用户.runCommandAsync(`fill ${坐标信息.数据解析('拟态矩阵_标记起点', 用户)} ${坐标信息.数据解析('拟态矩阵_标记终点', 用户)} minecraft:water -1 replace ${数据标签.读取方块('拟态矩阵_标记方块', 用户)}`)
                            break

                        case 3:
                            用户.runCommandAsync(`fill ${坐标信息.数据解析('拟态矩阵_标记起点', 用户)} ${坐标信息.数据解析('拟态矩阵_标记终点', 用户)} minecraft:powder_snow -1 replace ${数据标签.读取方块('拟态矩阵_标记方块', 用户)}`)
                            break
                    }
                }
                )
            }
            else {
                消息通知.数据驱动('小标题', `§6您已处于方块标记的模式, 请放置你需要用来§r<§9 ${类型} §r>§6的方块`, 玩家名称)
                保持运行('方块放置', '拟态矩阵_方块替换', 用户)
                用户.addTag('Mimetic_matrix.ReplaceBlock')
            }
            break

        case '结构复制':
            //获取 A坐标 的信息
            let 坐标A = 坐标信息.数据解析('拟态矩阵_标记起点', 用户)
            let X值_A = parseInt(坐标A.split(/\s/)[0])
            let Y值_A = parseInt(坐标A.split(/\s/)[1])
            let Z值_A = parseInt(坐标A.split(/\s/)[2])
            //获取 B坐标 的信息
            let 坐标B = 坐标信息.数据解析('拟态矩阵_标记终点', 用户)
            let X值_B = parseInt(坐标B.split(/\s/)[0])
            let Y值_B = parseInt(坐标B.split(/\s/)[1])
            let Z值_B = parseInt(坐标B.split(/\s/)[2])
            //获取向量
            var 向量_X = ((X值_A > X值_B) ? X值_A - X值_B : ((X值_A < X值_B) ? X值_B - X值_A : 0))
            var 向量_Z = ((Z值_A > Z值_B) ? Z值_A - Z值_B : ((Z值_A < Z值_B) ? Z值_B - Z值_A : 0))
            var 向量_Y = (Y值_B - Y值_A) + 1
            //执行填充操作 或 显示填充范围
            if (用户.isSneaking) {
                用户.runCommandAsync(`clone ${坐标信息.数据解析('拟态矩阵_标记起点', 用户)} ${坐标信息.数据解析('拟态矩阵_标记终点', 用户)} ${坐标.x} ${坐标.y} ${坐标.z} replace`)
            }
            else {
                图形绘制.α_线框(向量_X, 向量_Y, 向量_Z, 坐标)
            }
            return
    }
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 * @param {string} 类型 此参数限制为: < ... >
 */
export const 锚点虚印 = function (用户, 类型 = '基础菜单') {
    //定义实现当前功能所需的变量
    let 当前坐标 = `${Math.floor(用户.location.x)} ${Math.floor(用户.location.y)} ${Math.floor(用户.location.z)}`
    let 玩家名称 = `"${用户.nameTag}"`
    //执行功能
    switch (类型) {
        case '基础菜单':
            //定义当前界面所用到的各项元素
            var 功能界面 = new ActionFormData()
                .body("§7基础菜单")
                .title("§8==========§r<§9§o§l 锚点虚印 §r>§8==========")
                .button("<§5§o§l 锚点绑定 §r>", "textures/items/锚点虚印")
                .button("<§9§o§l 锚点召集 §r>", "textures/items/锚点虚印")
                .button("<§4§o§l 锚点移除 §r>", "textures/items/锚点虚印")
                .button("<§9§o§l 锚点传送 §r>", "textures/items/锚点虚印")
            功能界面.show(用户).then((用户选择) => {
                switch (用户选择.selection) {
                    case 0:
                        锚点虚印(用户, '锚点绑定')
                        break

                    case 1:
                        锚点虚印(用户, '锚点召集')
                        break

                    case 2:
                        锚点虚印(用户, '锚点移除')
                        break

                    case 3:
                        锚点虚印(用户, '锚点传送')
                        break
                }
            }
            )
            break

        case '锚点绑定':
            //定义当前界面所用到的各项元素
            var 功能界面 = new ModalFormData()
                .title("<§5§o§l 锚点绑定 §r>§2操作界面")
                .slider("§6设置§r <§9§o§l 锚点虚印 §r> §a有效范围§r", 1, 64, 1, 32)
                .slider("§6设置§r <§9§o§l 锚点虚印 §r> §a有效数量§r", 1, 64, 1, 16)
            功能界面.show(用户).then((用户选择) => {
                用户.runCommandAsync(`tag @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=${用户选择.formValues[0]},c=${用户选择.formValues[1]}] add ${玩家名称}`)
                用户.runCommandAsync(`title @s actionbar |> @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=${用户选择.formValues[0]},c=${用户选择.formValues[1]}] <| 尝试与您的操作共鸣`)
            }
            )
            break

        case '锚点召集':
            //定义当前界面所用到的各项元素
            var 功能界面 = new ModalFormData()
                .title("<§9§o§l 锚点召集 §r>§2操作界面")
                .slider("§6设置§r <§9§o§l 锚点虚印 §r> §a有效范围§r", 1, 64, 1, 32)
                .slider("§6设置§r <§9§o§l 锚点虚印 §r> §a有效数量§r", 1, 64, 1, 16)
                .toggle("§c设置§r <§9§o§l 锚点虚印 §r> §a范围限制§r", true)
                .textField("<§9§o§l 锚点虚印 §r>§c召集点坐标§r", "§c请输入 召集点 坐标§r", 当前坐标)
            功能界面.show(用户).then((用户选择) => {
                用户.runCommandAsync(`event entity @e[tag=${玩家名称},r=${用户选择.formValues[0]},tag=!SitDown] 锚点虚印`)
                用户.runCommandAsync(`tp @e[tag=${玩家名称}${(用户选择.formValues[2]) ? `,r=${用户选择.formValues[0]}` : ""},c=${用户选择.formValues[1]},tag=!SitDown] ${用户选择.formValues[3]}`)
                用户.runCommandAsync(`title @s actionbar |> @e[tag=${玩家名称}${(用户选择.formValues[2]) ? `,r=${用户选择.formValues[0]}` : ""},c=${用户选择.formValues[1]},tag=!SitDown] <| 尝试与您的操作共鸣`)
            }
            )
            break

        case '锚点移除':
            //定义当前界面所用到的各项元素
            var 功能界面 = new ModalFormData()
                .title("<§4§o§l 锚点移除 §r>§2操作界面")
                .slider("§6设置§r <§9§o§l 锚点虚印 §r> §a有效范围§r", 1, 64, 1, 32)
                .slider("§6设置§r <§9§o§l 锚点虚印 §r> §a有效数量§r", 1, 64, 1, 16)
                .toggle("§c设置§r <§9§o§l 锚点虚印 §r> §a范围限制§r", true)
            功能界面.show(用户).then((用户选择) => {
                用户.runCommandAsync(`tag @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=${用户选择.formValues[0]},c=${用户选择.formValues[1]}] remove ${玩家名称}`)
                用户.runCommandAsync(`title @s actionbar |> @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=${用户选择.formValues[0]},c=${用户选择.formValues[1]}] <| 尝试与您的操作共鸣`)
            }
            )
            break

        case '锚点传送':
            用户.runCommandAsync(`tp @s @e[tag=${玩家名称},c=1,family=Tayun,family=Peer]`)
            break
    }
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 * @param {string} 类型 此参数限制为: < ... >
 */
export const 瞬间移动 = function (用户, 类型 = '基础菜单') {
    //定义实现当前功能所需的变量
    let 当前坐标 = `${Math.floor(用户.location.x)} ${Math.floor(用户.location.y)} ${Math.floor(用户.location.z)}`
    //执行功能
    switch (用户.isSneaking) {
        case false:
            switch (类型) {
                case '基础菜单':
                    //定义当前界面所用到的各项元素
                    var 功能界面 = new ActionFormData()
                        .body("§7基础菜单")
                        .title("§8==========§r<§9§o§l 瞬间移动 §r>§8==========")
                        .button("<§4§o§l 相对传送 §r>", "textures/items/魔法卷宗/5")
                        .button("<§5§o§l 随机传送 §r>", "textures/items/魔法卷宗/2")
                        .button("<§9§o§l 绝对传送 §r>", "textures/items/魔法卷宗/9")
                    功能界面.show(用户).then((用户选择) => {
                        switch (用户选择.selection) {
                            case 0:
                                瞬间移动(用户, '相对传送')
                                break

                            case 1:
                                瞬间移动(用户, '随机传送')
                                break

                            case 2:
                                瞬间移动(用户, '绝对传送')
                                break
                        }
                    }
                    )
                    break

                case '相对传送':
                    //定义当前界面所用到的各项元素
                    var 功能界面 = new ModalFormData()
                        .title("<§4§o§l 相对传送 §r>§2操作界面")
                        .slider("§3相对§a X轴坐标§r", -64, 64, 1, 0)
                        .slider("§3相对§a Y轴坐标§r", -64, 64, 1, 0)
                        .slider("§3相对§a Z轴坐标§r", -64, 64, 1, 0)
                    功能界面.show(用户).then((用户选择) => {
                        用户.runCommandAsync(`tp @s ${Math.floor(用户.location.x) + 用户选择.formValues[0]} ${Math.floor(用户.location.y) + 用户选择.formValues[1]} ${Math.floor(用户.location.z) + 用户选择.formValues[2]}`)
                    }
                    )
                    break

                case '随机传送':
                    //定义当前界面所用到的各项元素
                    var 功能界面 = new ModalFormData()
                        .title("<§5§o§l 随机传送 §r>§2操作界面")
                        .slider("§3相对§a X轴坐标§r", -64, 64, 1, 0)
                        .slider("§3相对§a Z轴坐标§r", -64, 64, 1, 0)
                        .slider("§9设置§a 分散间距§r", 1, 64, 1, 10)
                        .slider("§9相对§a 分散间距§r", 1, 64, 1, 15)
                    功能界面.show(用户).then((用户选择) => {
                        用户.runCommandAsync(`spreadplayers ~${用户选择.formValues[0]} ~${用户选择.formValues[1]} ${用户选择.formValues[2]} ${用户选择.formValues[3]} @s`)
                    }
                    )
                    break

                case '绝对传送':
                    //定义当前界面所用到的各项元素
                    var 功能界面 = new ModalFormData()
                        .title("<§9§o§l 绝对传送 §r>§2操作界面")
                        .textField("§9绝对§c 三轴坐标§r", "§c请输入目的地坐标§r", 当前坐标)
                    功能界面.show(用户).then((用户选择) => {
                        用户.runCommandAsync(`tp @s ${用户选择.formValues[0]}`)
                    }
                    )
                    break
            }
            break

        case true:
            //将玩家随机移动到安全位置
            用户.runCommandAsync(`spreadplayers ~ ~ 5 15 @s`)
            break
    }
}
/**
 * @param {number} 损伤 攻击造成的损伤伤害值
 * @param {object|string} 位置 显示损伤值的位置
 * @param {number} 悬浮 调整伤害显示的悬浮字的基准高度
 * @returns {Promise<any>}
 */
export const 损伤显示 = function (目标, 损伤, 位置, 悬浮 = 0) {
    if (损伤 < 99999) {
        //定义所需的变量
        var 计算_损伤值 = String(损伤 + 10000)
        var 计算_万位数 = parseInt(计算_损伤值.slice(0))
        var 计算_千位数 = parseInt(计算_损伤值.slice(1))
        var 计算_百位数 = parseInt(计算_损伤值.slice(2))
        var 计算_十位数 = parseInt(计算_损伤值.slice(3))
        var 个位数 = parseInt(计算_损伤值.slice(4))
        //计算并显示伤害的数值
        if (计算_万位数 >= 20000) {
            for (let 数值 = 0; 数值 < 计算_万位数; 数值++) {
                if ((计算_万位数 - 10000) < ((数值 + 1) * 10000)) {
                    var 万位数 = 数值
                    数值 = 数值 + 计算_万位数
                }
            }
            目标.runCommandAsync(`particle 伤害显示:万位数-${万位数} ${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
        }
        if (计算_千位数 >= 1000) {
            for (let 数值 = 0; 数值 < 计算_千位数; 数值++) {
                if (计算_千位数 < ((数值 + 1) * 1000)) {
                    var 千位数 = 数值
                    数值 = 数值 + 计算_千位数
                }
            }
            目标.runCommandAsync(`particle 伤害显示:千位数-${千位数} ${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
        }
        if (计算_百位数 >= 100) {
            for (let 数值 = 0; 数值 < 计算_百位数; 数值++) {
                if (计算_百位数 < ((数值 + 1) * 100)) {
                    var 百位数 = 数值
                    数值 = 数值 + 计算_百位数
                }
            }
            目标.runCommandAsync(`particle 伤害显示:百位数-${百位数} ${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
        }
        if (计算_十位数 >= 10) {
            for (let 数值 = 0; 数值 < 计算_十位数; 数值++) {
                if (计算_十位数 < ((数值 + 1) * 10)) {
                    var 十位数 = 数值
                    数值 = 数值 + 计算_十位数
                }
            }
            目标.runCommandAsync(`particle 伤害显示:十位数-${十位数} ${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
        }
        if (个位数 != 0) {
            目标.runCommandAsync(`particle 伤害显示:个位数-${个位数} ${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
        }
    }
    else {
        //当超出最大显示范围后 用于补偿的数值显示机制
        目标.runCommandAsync(`summon 矩阵接口:容器 ${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1.5, 2.5)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)} 显示名称 §${通用组件.字符颜色(1, 14)}§l—§${通用组件.字符颜色(1, 14)}${损伤}`)
    }
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 * @param {string} 类型 此参数限制为: <基础目录 | 项目列表 | ...>
 * @returns {show.command}
 */
export const 辅助说明 = function (用户, 类型) {
    switch (类型) {
        case '基础目录':
            //定义当前界面所用到的各项元素
            var 功能界面 = new ActionFormData()
                .body("§7功能目录")
                .title("§6==========§o§l§5 彼岸浮梦 §r§6==========")
                .button("§l§1查看§1 [§0§o§l 项目开发 §1]§r", "textures/GUI/icon/icon_00")
                .button("§l§1查看§1 [§3§o§l 浮世众生 §1]§r", "textures/items/魔法卷宗/0")
                .button("§l§1查看§1 [§5§o§l 魔导工业 §1]§r", "textures/GUI/icon/icon_06")
                .button("§l§1查看§1 [§c§o§l 特种制造 §1]§r", "textures/GUI/icon/icon_04")
                .button("§l§1查看§1 [§8§o§l 家居装饰 §1]§r", "textures/GUI/icon/icon_09")
                .button("§l§1查看§1 [§8§o§l 领域方块 §1]§r", "textures/GUI/icon/icon_10")
                .button("§l§1查看§1 [§8§o§l 迷途机关 §1]§r", "textures/GUI/icon/icon_11")
                .button("§l§1查看§1 [§8§o§l 秘境探索 §1]§r", "textures/GUI/icon/icon_05")
                .button("§l§1查看§1 [§c§o§l 矩阵接口 §1]§r", "textures/GUI/icon/icon_07")
                .button("§l§c设置§1 [§5§o§l 特殊侦测 §1]§r", "textures/GUI/icon/icon_08")
            功能界面.show(用户).then((用户选择) => {
                switch (用户选择.selection) {
                    case 0:
                        辅助说明(用户, '项目列表')
                        break

                    case 1:
                        辅助说明(用户, '众生索引')
                        break

                    case 9:
                        事件侦测(用户)
                        break

                    default:
                        break
                }
            }
            )
            break

        case '项目列表':
            //定义当前界面所用到的各项元素
            var 功能界面 = new ActionFormData()
                .body("§7功能目录")
                .title("§1[§0§o§l 项目开发 §1]§r§8")
                .button("§l§9 开发人员名单 §r", "textures/GUI/icon/icon_00")
                .button("§l§2 模组授权信息 §r", "textures/GUI/icon/icon_01")
                .button("§l§5 模组获取途径 §r", "textures/GUI/icon/icon_02")
            功能界面.show(用户).then((用户选择) => {
                if (用户选择.isCanceled) {
                    辅助说明.目录(用户)
>>>>>>> Stashed changes
                }
                switch (用户选择.selection) {

<<<<<<< Updated upstream
            default:
                通用组件.快捷消息("===============", 玩家名称)
                通用组件.快捷消息(`§o§l§c| 彼岸附加指令组 |§r`, 玩家名称)
                通用组件.快捷消息(`输入 ${参数[0]} <§c hs §r> 开启或关闭 实体属性侦测`, 玩家名称)
                通用组件.快捷消息(`输入 ${参数[0]} <§c es §r> 开启或关闭 实体事件侦测`, 玩家名称)
                通用组件.快捷消息(`输入 ${参数[0]} <§c gm §r> 可改变道具的功能表现`, 玩家名称)
                通用组件.快捷消息("===============", 玩家名称)
                通用组件.快捷消息(`您输入了: ${参数[0]} + ${参数[1]} + ${参数[2]} + ${参数[3]}`, 玩家名称)
                break
        }
=======
                    default:
                        break
                }
            }
            )
            break

        case '众生索引':
            //定义当前界面所用到的各项元素
            var 功能界面 = new ActionFormData()
                .body("§7功能目录")
                .title("§1[§3§o§l 浮世众生 §1]§r§8")
                .button("§l§9 星光阁 §r", "textures/icon/星光阁/Basics_0")
                .button("§l§2 幻生阁 §r", "textures/icon/幻生阁/Basics_0")
                .button("§l§3 明镜阁 §r", "textures/icon/明镜阁/Basics_0")
                .button("§l§4 天渊阁 §r", "textures/icon/天渊阁/Basics_0")
            功能界面.show(用户).then((用户选择) => {
                if (用户选择.isCanceled) {
                    辅助说明.目录(用户)
                }
                switch (用户选择.selection) {

                    default:
                        break
                }
            }
            )
            break

        default:
            break
>>>>>>> Stashed changes
    }
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 * @param {string} 类型 此参数限制为: <道具模式>
 */
export const 状态显示 = function (用户, 类型) {
    //获取目标信息
    var 实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0]
    var 方块 = 用户.getBlockFromViewVector({ BlockRaycastOptions })
    /**
<<<<<<< Updated upstream
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {string} 坐标 此参数限制为: <方块的 坐标>
     * @param {string} 类型 此参数限制为: <容器类 | 掉落物>
     * @returns {Promise<any>|run.command}
     */
    static 物资整理 = function (用户, 坐标, 类型) {
        //移除玩家手上的道具
        用户.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air")
        //等待一段时间后归还道具
        通用组件.延迟执行('给予物品', '特殊道具:物资整理', 用户, 通用组件.随机数值(10, 30))
        //定义实现当前功能所需的变量
        let 方块容器 = 用户.getBlockFromViewVector(new BlockRaycastOptions())
        let 玩家名称 = `"` + `${用户.nameTag}` + `"`
        let 物品列表 = []
        //执行功能
        switch (类型) {
            case '容器类':
                //仅限<箱子>可以执行物品分类
                if (方块容器.type.id == "minecraft:chest" || 方块容器.type.id == "minecraft:trapped_chest") {
                    //定义实现当前功能所需的变量
                    var 容器内容 = 方块容器.getComponent("inventory").container
                    //执行容器内的物品分类
                    return new Promise(async function () {
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
                                A_item = a.typeId.split(':')[1]
                                B_item = b.typeId.split(':')[1]
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
                    通用组件.快捷标题('< 容器整理 >功能, 仅限< 箱子 >与< 陷阱箱 >可以使用', 玩家名称)
=======
    * @param {object} 属性 限制为: <属性类 对象>
    */
    var 属性 = function (属性) {
        let 信息 = ''
        let 列表 = []
        for (let 类型 of 属性) {
            列表.push(类型)
        }
        列表.sort(function (a, b) {
            return b.name.length - a.name.length
        }
        )
        for (let 内容 of 列表) {
            信息 += `\n§r§l<§r §9${内容.name} §7:§2 ${内容.value} §r§l>§r`
        }
        return 信息
    }
    if (实体) {
        var 泳速 = 实体.getComponent('underwater_movement')
        var 栓绳 = 实体.getComponent('leashable')
        var 移速 = 实体.getComponent('movement')
        var 血量 = 实体.getComponent('health')
    }
    switch (类型) {
        case '道具模式':
            //显示侦测到的信息
            if (实体) {
                let 位置 = `${Math.floor(实体.location.x)} ${Math.floor(实体.location.y)} ${Math.floor(实体.location.z)}`
                if (血量) {
                    用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b实体名称§7 : §2"},${通用组件.查询名称(实体)},{"text":"\n§l§e实体标识§7 : §6${实体.typeId}\n§l§e实体血量§7 : §2${Math.round(血量.current)}/${血量.value}\n§l§2能否牵引§7 : §6${!!栓绳}\n${(移速) ? `§l§5常规移速§7 : §d${移速.value.toFixed(2)}` : ""}\n${(泳速) ? `§l§9水下移速§7 : §3${泳速.value.toFixed(2)}` : ""}\n§l§6实体位置§7 : §e${位置}\n§r========================="}]}`)
                }
                else {
                    用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b实体名称§7 : §2"},${通用组件.查询名称(实体)},{"text":"\n§l§e实体标识§7 : §6${实体.typeId}\n§l§6实体位置§7 : §e${位置}\n§r========================="}]}`)
                }
                通用组件.生成实体('粒子', '提示图标:定位标识', `${Math.floor(实体.location.x)} ${Math.floor(实体.location.y) + 数值修饰.浮点值(1, 2)} ${Math.floor(实体.location.z)}`)
            }
            else if (方块) {
                let 位置 = `${Math.floor(方块.location.x)} ${Math.floor(方块.location.y)} ${Math.floor(方块.location.z)}`
                用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b方块名称§7 : §2"},${通用组件.查询名称(方块, '方块')},{"text":"\n§l§e方块标识§7 : §b${方块.typeId}\n§l§6方块位置§7 : §e${位置}${方块.typeId.startsWith('minecraft:') ? 属性(方块.permutation.getAllProperties()) : ''}\n§r========================="}]}`)
            }
            break

        default:
            if (实体) {
                if (血量) {
                    用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[${通用组件.查询名称(实体)},{"text":"§6 || §2${Math.round(血量.current)}/${血量.value}"}]}`)
                }
                else {
                    用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[${通用组件.查询名称(实体)},{"text":"§6 || §9${实体.typeId}"}]}`)
                }
            }
            else if (方块) {
                if (用户.isSneaking) {
                    用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[${通用组件.查询名称(方块, '方块')},{"text":"§6 || §9${方块.typeId}"}]}`)
                }
            }
            break
    }
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 * @param {string} 类型 此参数限制为: <点击方块><使用物品>
 * @returns {Promise<any>}
 */
export const 物资整理 = function (用户, 类型) {
    //定义实现当前功能所需的变量
    let 实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0]
    let 方块 = 用户.getBlockFromViewVector({ BlockRaycastOptions })
    let 列表 = []
    //等待一段时间后归还道具
    通用组件.延迟执行('给予物品', '特殊道具:物资整理', 用户, 数值修饰.整数值(20, 40))
    //执行功能
    switch (类型) {
        case '点击方块':
            //仅限<箱子>可以执行物品分类
            if (方块.typeId == "minecraft:chest" || 方块.typeId == "minecraft:trapped_chest") {
                var 容器 = 方块.getComponent('minecraft:inventory').container
                //执行容器内物品分类的操作流程
                new Promise(async function () {
                    //获取 实体背包内的物品信息 并 清除 实体背包内的物品
                    for (let 位置 = 0; 位置 < 容器.size; 位置++) {
                        let 物品 = 容器.getItem(位置)
                        if (物品) {
                            容器.setItem(位置, new ItemStack(ItemTypes.get('minecraft:tnt'), 0, 0))
                            列表.push(物品)
                        }
                    }
                    //对数组内的物品信息进行排序
                    列表.sort(function (a, b) {
                        let A_item
                        let B_item
                        if (a.nameTag && b.nameTag) {
                            A_item = a.nameTag
                            B_item = b.nameTag
                        }
                        else {
                            A_item = a.typeId.split(':')[1]
                            B_item = b.typeId.split(':')[1]
                        }
                        if (A_item >= B_item) {
                            return 1
                        }
                        else {
                            return -1
                        }
                    }
                    )
                    //向容器内添加排序后的物品
                    for (let 填充 of 列表) {
                        容器.addItem(填充)
                    }
>>>>>>> Stashed changes
                }
                )
            }
            else {
                //定义当前界面所用到的各项元素
                let 功能界面 = new ModalFormData()
                    .title("<§8§o§l 物资清除 §r>§9操作界面")
                    .dropdown("本功能将销毁<§a 清理范围 §r>内的一切掉落物\n\n效果触发后, 无法撤销该效果\n\n触发效果前, 请确认§c 重要物品是否遗落§r !!!", ["§c§l掉落物清理§r"], 0)
                    .slider("§6设置§r<§a 清理范围 §r>", 8, 256, 1, 64)
                功能界面.show(用户).then((用户选择) => {
                    用户.runCommandAsync(`kill @e[type=item,r=${用户选择.formValues[1]}]`)
                    消息通知.数据驱动('小标题', `§4掉落物已销毁, 该操作不可撤销!`)
                    用户.runCommandAsync('particle 提示图标:通用提示 ~ ~2.35 ~')
                }
                )
            }
            break

<<<<<<< Updated upstream
            case '掉落物':
                //定义当前界面所用到的各项元素
                let 功能界面 = new ModalFormData()
                    .title("<§8§o§l 物资清除 §r>§9操作界面")
                    .dropdown("本功能将销毁<§a 清理范围 §r>内的一切掉落物\n\n效果触发后, 无法撤销该效果\n\n触发效果前, 请确认§c 重要物品是否遗落§r !!!", ["§c§l掉落物清理§r"], 0)
                    .slider("§6设置<§a 清理范围 §r>", 8, 256, 1, 64)
                功能界面.show(用户).then((用户选择) => {
                    用户.runCommand(`kill @e[type=item,r=${用户选择.formValues[1]}]`)
                    用户.runCommand('particle 提示图标:通用提示 ~ ~2.35 ~')
                    通用组件.快捷标题('§4散落物品已销毁, 该操作不可撤销!', `@a[r=${用户选择.formValues[1]}]`)
                }
                )
                break
        }
    }
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @returns {run.command}
     */
    static 匣里乾坤 = function (用户) {
        //定义实现当前功能所需的变量
        var 玩家名称 = `"` + `${用户.nameTag}` + `"`
        try {
            //乾坤空间_预处理
            用户.runCommand("function Data/BoxSpace_start")
            //释放被存储的实体 或 储存附近的实体
            if (!(用户.hasTag('BoxSpace.load'))) {
                //收集附近的实体
                用户.runCommand('tp @e[x=~-5,dx=10,y=~-2,dy=4,z=~-5,dz=10,type=!player] @s')
                //储存实体信息
                用户.runCommand(`structure save ${玩家名称} ~5~2~5 ~-5~-2~-5 true disk true`)
                //进行文本提示
                通用组件.快捷标题('§6|§r 正在<§a 收纳 §r>周围的实体 §6|§r', 玩家名称)
                //移除被储存的实体
                用户.runCommand('function Data/BoxSpace_end')
                //添加释放实体的标签
                用户.addTag('BoxSpace.load')
            }
            else {
                //释放被储存的实体
                用户.runCommand(`structure load ${玩家名称} ~-5~-2~-5 0_degrees none true false`)
                //进行文本提示
                通用组件.快捷标题('§6|§r 正在<§d 释放 §r>储存的实体 §6|§r', 玩家名称)
                //播放粒子动画
                用户.runCommand('particle 烟雾效果:紫影 ~~~')
                //移除释放实体的标签
                用户.removeTag('BoxSpace.load')
            }
            //归还道具:匣里乾坤
            通用组件.延迟执行('给予物品', '魔法礼盒:匣里乾坤', 用户, 通用组件.随机数值(20, 40))
        }
        catch {
            //进行文本提示
            通用组件.快捷标题('§6|§r §c您的周围没有其他实体§r §6|§r', 玩家名称)
            //归还道具:匣里乾坤
            通用组件.延迟执行('给予物品', '魔法礼盒:匣里乾坤', 用户, 通用组件.随机数值(10, 20))
=======
        case '使用物品':
            switch (用户.isSneaking) {
                case false:
                    //定义 将被注入的 目标容器
                    if (实体) {
                        try {
                            var 容积 = 实体.getComponent('minecraft:inventory').container
                        }
                        catch {
                            消息通知.数据驱动('小标题', `§7无法获取实体:§6<§c ${实体.typeId} §6>§7的背包信息`)
                        }
                    }
                    else if (方块 && (方块.typeId == "minecraft:chest" || 方块.typeId == "minecraft:trapped_chest")) {
                        var 容积 = 方块.getComponent('minecraft:inventory').container
                    }
                    var 背包 = 用户.getComponent('minecraft:inventory').container
                    //执行 向 容器内 注入物品 的流程
                    if (容积) {
                        new Promise(async function () {
                            //获取 目标容器 剩余存储空间
                            var 空间 = 容积.emptySlotsCount
                            //抽取 玩家背包内 指定数量 的物品
                            for (let 位置 = 0; 位置 < 背包.size; 位置++) {
                                let 物品 = 背包.getItem(位置)
                                if (物品 && 空间 != 0) {
                                    背包.setItem(位置, new ItemStack(ItemTypes.get('minecraft:tnt'), 0, 0))
                                    列表.push(物品)
                                    空间 -= 1
                                }
                            }
                            //向 容器内 填充物品
                            for (let 填充 of 列表) {
                                容积.addItem(填充)
                            }
                            //显示 目标容器 的剩余储存空间
                            消息通知.数据驱动('小标题', `§7正在远程注入物品, < 目标容器 >的剩余空间为§r:§2 ${空间}`, 用户)
                        }
                        )
                    }
                    break

                case true:
                    //定义 将被抽取 容器内容 的目标
                    if (实体) {
                        try {
                            var 容积 = 实体.getComponent('minecraft:inventory').container
                        }
                        catch {
                            消息通知.数据驱动('小标题', `§7无法获取实体:§6<§c ${实体.typeId} §6>§7的背包信息`)
                        }
                    }
                    else if (方块 && (方块.typeId == "minecraft:chest" || 方块.typeId == "minecraft:trapped_chest")) {
                        var 容积 = 方块.getComponent('minecraft:inventory').container
                    }
                    var 背包 = 用户.getComponent('minecraft:inventory').container
                    //执行 抽取 容器内容 的流程
                    if (容积) {
                        new Promise(async function () {
                            //获取 玩家背包 剩余存储空间
                            var 空间 = 背包.emptySlotsCount
                            //抽取 目标容器内 指定数量 的物品
                            for (let 位置 = 0; 位置 < 容积.size; 位置++) {
                                let 物品 = 容积.getItem(位置)
                                if (物品 && 空间 != 0) {
                                    容积.setItem(位置, new ItemStack(ItemTypes.get('minecraft:tnt'), 0, 0))
                                    列表.push(物品)
                                    空间 -= 1
                                }
                            }
                            //向 玩家背包中 填充物品
                            for (let 填充 of 列表) {
                                背包.addItem(填充)
                            }
                            //显示 玩家背包 的剩余储存空间
                            消息通知.数据驱动('小标题', `§7正在远程抽取物品, < 您的背包 >的剩余空间为§r:§2 ${空间}`, 用户)
                        }
                        )
                    }
                    break
            }
            break
    }
}
/**
 * @param {object} 用户 此参数限制为: <实体类 对象>
 * @param {string} 类型 此参数限制为: <道具模式>
 */
export const 仓储过滤 = function (用户, 模式) {
    switch (模式) {
        case '道具模式':
            let 实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0]
            if (实体 && 实体.typeId == '列车组:挖掘') {
                //显示将被清除的方块
                实体.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 ${数据标签.读取方块('拟态矩阵_标记方块', 用户)}`)
                //保存需要清除的方块信息
                数据标签.存储方块('仓储过滤', 实体, 数据标签.读取方块('拟态矩阵_标记方块', 用户))
                //播放操作音效
                用户.runCommandAsync('playsound tile.piston.out @a[r=15] ~~~')
            }
            break

        default:
            let 容器 = 用户.getComponent('minecraft:inventory').container
            new Promise(async function () {
                //移除 目标容器内的 指定物品
                for (let 位置 = 0; 位置 < 容器.size; 位置++) {
                    let 物品 = 容器.getItem(位置)
                    if (物品 && 物品.typeId == 数据标签.读取方块('仓储过滤', 用户)) {
                        容器.setItem(位置, new ItemStack(ItemTypes.get('minecraft:tnt'), 0, 0))
                    }
                }
            }
            )
            break
    }
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 */
export const 匣里乾坤 = function (用户) {
    //定义实现当前功能所需的变量
    var 玩家名称 = `"${用户.nameTag}"`
    //匣里乾坤_预处理
    用户.runCommandAsync('playanimation @s animation.hold_use.magic_bow default 1.0')
    用户.runCommandAsync('playsound conduit.activate @a[r=15] ~~~')
    //执行<匣里乾坤>的功能流程
    if (!(用户.hasTag('BoxSpace.load'))) {
        //储存附近的实体
        用户.runCommandAsync('tp @e[x=~-5,dx=10,y=~-5,dy=10,z=~-5,dz=10,type=!player] @s')
        用户.runCommandAsync(`structure save ${玩家名称} ~5~5~5 ~-5~-5~-5 true disk true`)
        消息通知.数据驱动('小标题', '§6|§r 正在<§a 收纳 §r>周围的实体 §6|§r', 玩家名称)
        用户.runCommandAsync('function Data/BoxSpace_end')
        用户.addTag('BoxSpace.load')
    }
    else {
        //释放被储存的实体
        用户.runCommandAsync(`structure load ${玩家名称} ~-5~-5~-5 0_degrees none true false`)
        消息通知.数据驱动('小标题', '§6|§r 正在<§d 释放 §r>储存的实体 §6|§r', 玩家名称)
        用户.runCommandAsync('particle 烟雾效果:紫影 ~~~')
        用户.removeTag('BoxSpace.load')
    }
}
/**
 * @param {object} 位置 限制为<坐标型 对象>
 */
export const 结构珍宝 = function (位置) {
    //获取可以生成结构的位置
    let 生成 = 坐标信息.获取地面(位置).split(/\s/)
    //随机生成一个结构
    switch (数值修饰.整数值(0, 7)) {
        case 0:
            获取维度.runCommandAsync(`structure load 环境建筑:荒原蜂塔 ${生成[0] - 4} ${生成[1] - 1} ${生成[2] - 4} 0_degrees none true true`)
            break

        case 1:
            获取维度.runCommandAsync(`structure load 环境建筑:森林蜂塔 ${生成[0] - 4} ${生成[1] - 1} ${生成[2] - 4} 0_degrees none true true`)
            break

        case 2:
            获取维度.runCommandAsync(`structure load 环境建筑:巨型橡树 ${生成[0] - 10} ${生成[1] - 1} ${生成[2] - 10} 0_degrees none true true`)
            break

        case 3:
            获取维度.runCommandAsync(`structure load 环境建筑:小型营地 ${生成[0] - 8} ${生成[1] - 1} ${生成[2] - 8} 0_degrees none true true`)
            break

        case 4:
            获取维度.runCommandAsync(`structure load 环境建筑:幻生遗居 ${生成[0] - 12} ${生成[1] - 1} ${生成[2] - 12} 0_degrees none true true`)
            break

        case 5:
            获取维度.runCommandAsync(`structure load 环境建筑:星辉旧居 ${生成[0] - 10} ${生成[1] - 6} ${生成[2] - 10} 0_degrees none true true`)
            break

        case 6:
            获取维度.runCommandAsync(`structure load 环境建筑:若水鲸塔 ${生成[0] - 8} ${生成[1] - 30} ${生成[2] - 8} 0_degrees none true true`)
            break

        case 7:
            获取维度.runCommandAsync(`structure load 环境建筑:岩矿采掘 ${生成[0] - 4} ${生成[1] - 2} ${生成[2] - 4} 0_degrees none true true`)
            break

        case 8:
            获取维度.runCommandAsync(`structure load 环境建筑:弹药仓库 ${生成[0] - 3} ${生成[1] - 2} ${生成[2] - 3} 0_degrees none true true`)
            break
    }
    //生成提示文本
    let 文案前言 = function () {
        switch (数值修饰.整数值(1, 4)) {
            case 1:
                return '神秘的数值突然出现'

            case 2:
                return '一串数字映入眼帘'

            case 3:
                return '来自<故土>的信息突然降临'

            case 4:
                return '远处似乎发生了什么, 而眼前这个'
        }
    }
    let 文案后言 = function () {
        switch (数值修饰.整数值(1, 4)) {
            case 1:
                return '这…… 似乎是在暗示什么?'

            case 2:
                return '这也许是一个坐标?'

            case 3:
                return '那边似乎有着<故土>的气息'

            case 4:
                return '也许应该仔细研究一下……'
        }
    }
    消息通知.数据驱动('聊天栏', `${文案前言()}: < ${生成[0]}  ${生成[1]}  ${生成[2]} > ${文案后言()}`)
    //生成指引信标
    let 位置A = new BlockLocation(位置.x, 位置.y + 10, 位置.z)
    let 向量_X = 生成[0] - 位置.x
    let 向量_Y = 生成[1] - 位置.y
    let 向量_Z = 生成[2] - 位置.z
    图形绘制.β_直线(向量_X, 向量_Y, 向量_Z, 位置A, '动态轨迹:靛蓝')
    图形绘制.β_直线(0, 10, 0, 位置, '烟雾效果:紫影')
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 */
export const 魔晶弹珠 = function (用户) {
    //定义功能变量
    let 实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0]
    let 背包 = 用户.getComponent('minecraft:inventory').container
    let 伤害 = 1.0, 暴击 = 1.0, 爆伤 = 1.5
    //获取 伤害加成 并 造成伤害
    if (实体 && 实体.typeId != 'minecraft:item') {
        for (let 位置 = 0; 位置 < 背包.size; 位置++) {
            let 物品 = 背包.getItem(位置)
            if (物品) {
                switch (物品.typeId) {
                    case 'minecraft:experience_bottle':
                        用户.runCommandAsync('clear @s minecraft:experience_bottle 0 1')
                        伤害 += 5
                        break

                    case '魔晶块:基础魔晶':
                        用户.runCommandAsync('clear @s 魔晶块:基础魔晶 0 1')
                        伤害 += 45
                        break

                    case '能量水晶:高压魔晶':
                        用户.runCommandAsync('clear @s 能量水晶:高压魔晶 0 1')
                        爆伤 += 0.5
                        break

                    case '魔晶块:高压魔晶':
                        用户.runCommandAsync('clear @s 魔晶块:高压魔晶 0 1')
                        爆伤 += 4.5
                        break

                    case '能量水晶:超频魔晶':
                        if ((暴击 + 1) <= 10) {
                            用户.runCommandAsync('clear @s 能量水晶:超频魔晶 0 1')
                            暴击 += 1
                        }
                        break

                    case '魔晶块:超频魔晶':
                        if (暴击 != 10) {
                            用户.runCommandAsync('clear @s 魔晶块:超频魔晶 0 1')
                            暴击 = 10
                        }
                        break
                }
            }
        }
        //对目标造成单体伤害
        if (数值修饰.整数值(暴击, 10) == 10) {
            实体.runCommandAsync(`damage @s ${Math.floor(伤害 * 爆伤)} entity_attack entity ${用户.nameTag}`)
        }
        else {
            实体.runCommandAsync(`damage @s ${Math.floor(伤害)} entity_attack entity ${用户.nameTag}`)
        }
        //播放 效果 并 消耗物品
        用户.runCommandAsync('playsound random.bow @s ~~~ 0.5')
        用户.runCommandAsync('clear @s 魔法工具:魔晶弹珠 0 1')
        实体.runCommandAsync('particle 烟雾效果:猩红 ~~~')
    }
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 */
export const 林木植伐 = function (用户) {
    let 坐标 = 用户.location
    new Promise(async function () {
        let 高度 = 0, 冷却 = 5
        let 绘制 = async function () {
            if (冷却 == 0) {
                let 起点 = new BlockLocation(坐标.x - 7, 坐标.y + 高度, 坐标.z - 7)
                创建阵列(11, 11, 起点, '闪烁粒子:叶绿', '树木砍伐')
                高度 == 15 ? world.events.tick.unsubscribe(绘制) : 高度++
                冷却 = 5
            }
            else {
                冷却--
            }
        }
        world.events.tick.subscribe(绘制)
    }
    )
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 */
export const 矿物辞典 = function (用户) {
    let 坐标 = 用户.location
    new Promise(async function () {
        let 高度 = 0, 冷却 = 5
        坐标.y -= 8
        let 绘制 = async function () {
            if (冷却 == 0) {
                let 起点 = new BlockLocation(坐标.x - 7, 坐标.y + 高度, 坐标.z - 7)
                创建阵列(11, 11, 起点, '闪烁粒子:靛蓝', '矿石开采')
                高度 == 15 ? world.events.tick.unsubscribe(绘制) : 高度++
                冷却 = 5
            }
            else {
                冷却--
            }
        }
        world.events.tick.subscribe(绘制)
    }
    )
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 */
export const 精灵结契 = function (用户) {
    let 特殊道具 = 0
    let 背包 = 用户.getComponent('minecraft:inventory').container
    let 实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0]
    for (let 位置 = 0; 位置 < 背包.size; 位置++) {
        let 物品 = 背包.getItem(位置)
        if (物品 && 物品.typeId == '特制模板:铁偶魔芯') {
            位置 += 背包.size
            特殊道具 = 1
        }
    }
    if (特殊道具 == 1) {
        if (用户.hasTag('call_starry_end')) {
            消息通知.数据驱动('小标题', '您已经召唤过 [ 星辉雅居 ] 了, 请不要尝试重复召唤', 用户)
        }
        else {
            用户.runCommandAsync('clear @s 特制模板:铁偶魔芯 0 1')
            用户.runCommandAsync('function born/TaYun')
        }
    }
    else {
        if (实体 && 实体.typeId == 'minecraft:wandering_trader') {
            if (实体.hasTag('unreal_all_end')) {
                消息通知.数据驱动('小标题', '这个< 商人 >已经帮你进行过召唤了, 请换一个< 商人 >来寻求帮助吧', 用户)
            }
            else {
                let 起点 = new BlockLocation(实体.location.x, 实体.location.y + 32, 实体.location.z)
                消息通知.数据驱动('小标题', '< 商人 >正在召唤 [ 虚幻天星 ] 请抬头注意彗星动向', 用户)
                实体.runCommandAsync('summon minecraft:lightning_bolt ~ ~32 ~')
                路径功能(数值修饰.整数值(-32, 32), -128, 数值修饰.整数值(-32, 32), 起点, '烟雾效果:靛蓝', '虚幻天星')
                实体.addTag('unreal_all_end')
            }
        }
    }
}
const 路径功能 = function (X轴, Y轴, Z轴, 起点, 粒子, 功能) {
    new Promise(async function () {
        switch (获取维度.id) {
            case 'minecraft:overworld':
                var 维度缓存 = world.getDimension('minecraft:overworld')
                break

            case 'minecraft:nether':
                var 维度缓存 = world.getDimension('minecraft:nether')
                break

            case 'minecraft:the_end':
                var 维度缓存 = world.getDimension('minecraft:the_end')
                break
        }
        let 绘制 = async function () {
            起点.x += (X轴 >= 1 ? 1 : X轴 == 0 ? 0 : -1)
            X轴 += (X轴 >= 1 ? -1 : X轴 == 0 ? 0 : 1)
            起点.y += (Y轴 >= 1 ? 1 : Y轴 == 0 ? 0 : -1)
            Y轴 += (Y轴 >= 1 ? -1 : Y轴 == 0 ? 0 : 1)
            起点.z += (Z轴 >= 1 ? 1 : Z轴 == 0 ? 0 : -1)
            Z轴 += (Z轴 >= 1 ? -1 : Z轴 == 0 ? 0 : 1)
            if (X轴 == 0 && Y轴 == 0 && Z轴 == 0) {
                world.events.tick.unsubscribe(绘制)
            }
            if (!粒子) {
                粒子 = '动态轨迹:赤红'
            }
            维度缓存.runCommandAsync(`particle ${粒子} ${起点.x} ${起点.y} ${起点.z}`)
            switch (功能) {
                case '树木砍伐':
                    var 目标方块 = 方块识别.树木类(维度缓存.getBlock(new BlockLocation(起点.x, 起点.y, 起点.z)))
                    if (目标方块 == true) {
                        维度缓存.runCommandAsync(`fill ${起点.x} ${起点.y} ${起点.z} ${起点.x} ${起点.y} ${起点.z} air 0 destroy`)
                    }
                    break

                case '矿石开采':
                    var 目标方块 = 方块识别.矿石类(维度缓存.getBlock(new BlockLocation(起点.x, 起点.y, 起点.z)))
                    if (目标方块 == true) {
                        维度缓存.runCommandAsync(`fill ${起点.x} ${起点.y} ${起点.z} ${起点.x} ${起点.y} ${起点.z} air 0 destroy`)
                        维度缓存.runCommandAsync(`execute positioned ${起点.x} ${起点.y} ${起点.z} run tp @e[r=1,type=item] @p`)
                    }
                    break

                case '虚幻天星':
                    var 目标方块 = 方块识别.可通行(维度缓存.getBlock(new BlockLocation(起点.x, 起点.y - 1, 起点.z)))
                    if (目标方块 == false) {
                        维度缓存.runCommandAsync(`summon minecraft:lightning_bolt ${起点.x} ${起点.y} ${起点.z}`)
                        维度缓存.runCommandAsync(`particle minecraft:totem_particle ${起点.x} ${起点.y} ${起点.z}`)
                        维度缓存.runCommandAsync(`particle 'minecraft:knockback_roar_particle' ${起点.x} ${起点.y} ${起点.z}`)
                        switch (数值修饰.整数值(0, 4)) {
                            case 0:
                                维度缓存.runCommandAsync(`summon 幻生阁:九九 ${起点.x} ${起点.y + 1} ${起点.z}`)
                                break

                            case 1:
                                维度缓存.runCommandAsync(`summon 幻生阁:雪隐 ${起点.x} ${起点.y + 1} ${起点.z}`)
                                break

                            case 2:
                                维度缓存.runCommandAsync(`summon 幻生阁:星砂 ${起点.x} ${起点.y + 1} ${起点.z}`)
                                break

                            case 3:
                                维度缓存.runCommandAsync(`summon 幻生阁:幽蓝 ${起点.x} ${起点.y + 1} ${起点.z}`)
                                break

                            case 4:
                                维度缓存.runCommandAsync(`summon 明镜阁:珍珠 ${起点.x} ${起点.y + 1} ${起点.z}`)
                                break
                        }
                        world.events.tick.unsubscribe(绘制)
                    }
                    break
            }
        }
        world.events.tick.subscribe(绘制)
    }
    )
}
const 创建阵列 = function (A轴, B轴, 起点, 粒子, 功能) {
    new Promise(async function () {
        let 绘制 = async function () {
            let 位置 = new BlockLocation(起点.x += (A轴 >= 1 ? 1 : A轴 == 0 ? 0 : -1), 起点.y, 起点.z)
            路径功能(0, 0, B轴, 位置, 粒子, 功能)
            A轴 += (A轴 >= 1 ? -1 : A轴 == 0 ? 0 : 1)
            if (A轴 == 0) {
                world.events.tick.unsubscribe(绘制)
            }
>>>>>>> Stashed changes
        }
        world.events.tick.subscribe(绘制)
    }
<<<<<<< Updated upstream
}
=======
    )
}
>>>>>>> Stashed changes
