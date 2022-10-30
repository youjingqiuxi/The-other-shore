/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 / Tayun_Starry ]
*/

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

                        case 1:
                            专用界面.辅助说明(用户, '众生索引')
                            break

                        case 9:
                            专用组件.事件侦测(用户)
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
                    }
                    switch (用户选择.selection) {

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
        }
    }
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
                        break

                    case false://执行完全填充操作
                        用户.runCommand(`fill ${坐标信息.数据解析('拟态矩阵_标记起点', 用户)} ${坐标信息.数据解析('拟态矩阵_标记终点', 用户)} ${数据标签.读取方块('拟态矩阵_标记方块', 用户)}`)
                        break
                }
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

                        default:
                            break
                    }
                }
                )
                break

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
                            }
                        }
                        )
                        break

                    case '随机调试':
                        var 获取方块 = world.getDimension("overworld").getBlock(new BlockLocation(坐标.x, 坐标.y, 坐标.z))
                        var 调试属性 = 获取方块.type.createDefaultBlockPermutation()
                        try {
                            调试属性.getProperty("Table:angle").value = 通用组件.随机数值(2, 5)
                            获取方块.setPermutation(调试属性)
                        }
                        catch {
                            try {
                                调试属性.getProperty("Table:switch").value = 通用组件.随机数值(1, 5)
                                获取方块.setPermutation(调试属性)
                            }
                            catch {
                                try {
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
                }
                break

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
    }
    /**
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
                }
                break

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
        }
    }
}
