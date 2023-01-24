/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的作者为: [ 钛宇·星光阁 / Tayun_Starry ]

该<javaScript>的分类为: 矩阵接口_规划
*/

//导入 功能接口
import {
    MessageFormData,
    ActionFormData,
    ModalFormData,
}
    from "@minecraft/server-ui"

import {
    EntityRaycastOptions,
    BlockRaycastOptions,
    BlockLocation,
    ItemStack,
    ItemTypes,
    world
}
    from "@minecraft/server"

import {
    通用组件,
    数据标签,
    坐标信息,
    消息通知,
    数值修饰,
    图形绘制,
    方块识别,
    维度修正
}
    from './matrix_API'

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
    var
        玩家名称 = `"${用户.nameTag}"`
    //创建多线程任务
    new Promise(async function () {
        //定义所需的游戏事件效果
        let
            游戏事件 = function (信息) {
                switch (效果) {
                    case '状态显示':
                        状态显示(用户)
                        break

                    case '精密坐标':
                        状态显示(用户, '精密坐标')
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
                            let
                                方块 = 信息.block.typeId
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
        let
            等待关闭 = function () {
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
            let
                玩家名称 = `"${用户.nameTag}"`
            //定义当前界面所用到的各项元素
            let
                功能界面 = new ModalFormData()
                    .title('<§5§o§l 特殊侦测 §r>§9操作界面')
                    .dropdown("开启<§2§o§l事件侦测§r>§r后\n当<§b实体§r>触发<§e事件§r>时\n将显示<§b实体§r>与<§e事件§r>的部分信息\n==============================\n开启<§5§o§l状态侦测§r>§r后\n将显示<§e玩家§r>所注视的<§b实体§r>的血量\n当<§e玩家§r>[§c潜行§r]时\n将显示所注视的<§b方块§r>的名称与标识\n==============================\n当持续时间结束后, 上述侦测效果将自动移除", ['§2§l事件侦测§r', '§4§l暂不开启§r', '§5§l状态侦测§r', '§b§l精密坐标§r'], 1)
                    .textField("§6设置<§5§o§l 特殊侦测 §r>§持续时间[秒]", "§c请输入持续时间§r", '60')
            功能界面.show(用户).then((用户选择) => {
                let
                    持续时间 = parseInt(用户选择.formValues[1]) * 20
                switch (用户选择.formValues[0]) {
                    case 0:
                        消息通知.数据驱动('聊天栏', `<§5§o§l 事件侦测 §r>§a已开启§r, 该效果将持续: §c${持续时间} §r游戏刻`, 玩家名称)
                        保持运行('实体事件', '事件侦测', 用户, 持续时间)
                        break

                    case 2:
                        消息通知.数据驱动('聊天栏', `<§5§o§l 状态显示 §r>§a已开启§r, 该效果将持续: §c${持续时间} §r游戏刻`, 玩家名称)
                        保持运行('游戏时刻', '状态显示', 用户, 持续时间)
                        break

                    case 3:
                        消息通知.数据驱动('聊天栏', `<§5§o§l 精密坐标 §r>§a已开启§r, 该效果将持续: §c${持续时间} §r游戏刻`, 玩家名称)
                        保持运行('游戏时刻', '精密坐标', 用户, 持续时间)
                        break
                }
            }
            )
            break

        case '执行功能':
            //定义实现当前功能所需的变量
            let
                位置 = `${Math.floor(目标.entity.location.x)} ${Math.floor(目标.entity.location.y)} ${Math.floor(目标.entity.location.z)}`,
                血量 = 目标.entity.getComponent('health')
            //获取信息并进行显示
            if (血量) {
                用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b实体名称§7: §3"},${通用组件.查询名称(目标.entity)},{"text":"\n§l§e实体标识§7: §6${目标.entity.typeId}\n§l§e实体血量§7: §2${Math.round(血量.current)}/${血量.value}\n§a实体事件§7: §b${目标.id}\n§6实体位置§7: §e${位置}\n§r========================="}]}`)
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
    let
        玩家名称 = `"${用户.nameTag}"`,
        方块标识 = 方块.typeId,
        方块信息 = 方块
    var
        标定界面 = new ActionFormData()
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
                        break

                    default:
                        break
                }
            }
            )
            break

        case '方块调试':
            //执行功能
            switch (用户.isSneaking) {
                case true:
                    //定义实现当前功能所需的变量
                    var
                        获取方块 = 用户.dimension.getBlock(坐标),
                        调试属性 = 获取方块.type.createDefaultBlockPermutation()
                    //定义当前界面所用到的各项元素
                    var
                        调试界面 = new ModalFormData()
                            .title("<§5§o§l 方块修改 §r>§9操作界面")
                            .dropdown("| 调试 |与| 修改 |<§9§o§l 方块属性 §r>", ["<§c§o§l 自由模式 §r>", "<§7§o§l 方块朝向 §r>", "<§7§o§l 方块转换 §r>", "<§7§o§l 方块能量 §r>", "<§7§o§l 方块参数 §r>"], 2)
                            .textField("<§c§o§l 自由模式 => §9方块属性 §r>", "§c请输入 方块属性 标签§r", 'Table:switch')
                            .textField("§6设置§r<§9§o§l 方块属性 §r>§a数值§r", "§c请输入数值§r", '0')
                    调试界面.show(用户).then((用户选择) => {
                        let
                            属性数值 = parseInt(用户选择.formValues[2])
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

                                case 3:
                                    调试属性.getProperty('Table:energy').value = 属性数值
                                    获取方块.setPermutation(调试属性)
                                    break

                                case 4:
                                    调试属性.getProperty('Table:value').value = 属性数值
                                    获取方块.setPermutation(调试属性)
                                    break
                            }
                        }
                        catch {
                            消息通知.界面显示(用户, '<§9§o§l 调试权杖 §r>§c方块参数设置异常', '*.当前方块无法进行属性修改\n\n*.当前方块属性参数设置失败\n\n*.当前方块参数类型设置失败')
                        }
                    }
                    )
                    break

                case false:
                    var
                        获取方块 = 用户.dimension.getBlock(坐标),
                        调试属性 = 获取方块.type.createDefaultBlockPermutation()
                    try {
                        调试属性.getProperty("Table:angle").value = 数值修饰.整数值(2, 5)
                        获取方块.setPermutation(调试属性)
                    }
                    catch {
                        try {
                            调试属性.getProperty("Table:switch").value = 数值修饰.整数值(1, 5)
                            获取方块.setPermutation(调试属性)
                        }
                        catch {
                            try {
                                调试属性.getProperty("Table:energy").value = 数值修饰.整数值(1, 6)
                                获取方块.setPermutation(调试属性)
                            }
                            catch {
                                try {
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
            let
                坐标A = 坐标信息.数据解析('拟态矩阵_标记起点', 用户),
                X值_A = parseInt(坐标A.split(/\s/)[0]),
                Y值_A = parseInt(坐标A.split(/\s/)[1]),
                Z值_A = parseInt(坐标A.split(/\s/)[2])
            //获取 B坐标 的信息
            let
                坐标B = 坐标信息.数据解析('拟态矩阵_标记终点', 用户),
                X值_B = parseInt(坐标B.split(/\s/)[0]),
                Y值_B = parseInt(坐标B.split(/\s/)[1]),
                Z值_B = parseInt(坐标B.split(/\s/)[2])
            //获取向量
            var
                向量_X = ((X值_A > X值_B) ? X值_A - X值_B : ((X值_A < X值_B) ? X值_B - X值_A : 0)),
                向量_Z = ((Z值_A > Z值_B) ? Z值_A - Z值_B : ((Z值_A < Z值_B) ? Z值_B - Z值_A : 0)),
                向量_Y = (Y值_B - Y值_A) + 1
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
 * @param {object} 目标 此参数限制为: <实体类 对象>
 * @param {number} 数值 需要显示的伤害值
 * @param {object|string} 位置 伤害显示的位置
 * @param {number} 悬浮 调整伤害显示的悬浮字的基准高度
 * @returns {Promise<any>}
 */
export const 伤害显示 = function (目标, 数值, 位置, 悬浮 = 0) {
    if (数值 <= 99999) {
        //获取伤害值的每一位数值
        let
            个位数 = Math.floor(数值 / 1 % 10),
            十位数 = Math.floor(数值 / 10 % 10),
            百位数 = Math.floor(数值 / 100 % 10),
            千位数 = Math.floor(数值 / 1000 % 10),
            万位数 = Math.floor(数值 / 10000 % 10)
        //生成用于显示伤害值的浮空字
        if (个位数) {
            目标.runCommandAsync(`particle 伤害显示:个位数-${个位数} ${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
        }
        if (十位数) {
            目标.runCommandAsync(`particle 伤害显示:十位数-${十位数} ${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
        }
        if (百位数) {
            目标.runCommandAsync(`particle 伤害显示:百位数-${百位数} ${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
        }
        if (千位数) {
            目标.runCommandAsync(`particle 伤害显示:千位数-${千位数} ${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
        }
        if (万位数) {
            目标.runCommandAsync(`particle 伤害显示:万位数-${万位数} ${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
        }
    }
    else {
        //当超出最大显示范围后 用于补偿的数值显示机制
        目标.runCommandAsync(`summon 矩阵接口:容器 ${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1.5, 2.5)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)} 显示名称 §${通用组件.字符颜色(1, 14)}§l—§${通用组件.字符颜色(1, 14)}${数值}`)
    }
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 * @param {string} 类型 此参数限制为: < ... >
 */
export const 锚点虚印 = function (用户, 类型 = '基础菜单') {
    //定义实现当前功能所需的变量
    let
        当前坐标 = `${Math.floor(用户.location.x)} ${Math.floor(用户.location.y)} ${Math.floor(用户.location.z)}`,
        玩家名称 = `"${用户.nameTag}"`
    //执行功能
    switch (类型) {
        case '基础菜单':
            //定义当前界面所用到的各项元素
            var
                功能界面 = new ActionFormData()
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
            var
                功能界面 = new ModalFormData()
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
            var
                功能界面 = new ModalFormData()
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
            var
                功能界面 = new ModalFormData()
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
    let
        当前坐标 = `${Math.floor(用户.location.x)} ${Math.floor(用户.location.y)} ${Math.floor(用户.location.z)}`
    //执行功能
    switch (用户.isSneaking) {
        case false:
            switch (类型) {
                case '基础菜单':
                    //定义当前界面所用到的各项元素
                    var
                        功能界面 = new ActionFormData()
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
                    var
                        功能界面 = new ModalFormData()
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
                    var
                        功能界面 = new ModalFormData()
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
                    var
                        功能界面 = new ModalFormData()
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
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 * @param {string} 类型 此参数限制为: <基础目录 | 项目列表 | ...>
 * @returns {show.command}
 */
export const 辅助说明 = function (用户, 类型) {
    switch (类型) {
        case '基础目录':
            //定义当前界面所用到的各项元素
            var
                功能界面 = new ActionFormData()
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
            var
                功能界面 = new ActionFormData()
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
            var
                功能界面 = new ActionFormData()
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
 * @param {string} 类型 此参数限制为: <道具模式>
 */
export const 状态显示 = function (用户, 类型) {
    //获取目标信息
    var
        实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0],
        方块 = 用户.getBlockFromViewVector({ BlockRaycastOptions })
    /**
    * @param {object} 属性 限制为: <属性类 对象>
    */
    var
        属性 = function (属性) {
            let
                信息 = '',
                列表 = []
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
        var
            泳速 = 实体.getComponent('underwater_movement'),
            栓绳 = 实体.getComponent('leashable'),
            移速 = 实体.getComponent('movement'),
            血量 = 实体.getComponent('health')
    }
    switch (类型) {
        //显示侦测到的信息
        case '道具模式':
            if (实体) {
                let
                    位置 = `${Math.floor(实体.location.x)} ${Math.floor(实体.location.y)} ${Math.floor(实体.location.z)}`
                if (血量) {
                    用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b实体名称§7 : §2"},${通用组件.查询名称(实体)},{"text":"\n§l§e实体标识§7 : §6${实体.typeId}\n§l§e实体血量§7 : §2${Math.round(血量.current)}/${血量.value}\n§l§2能否牵引§7 : §6${!!栓绳}\n${(移速) ? `§l§5常规移速§7 : §d${移速.value.toFixed(2)}` : ""}\n${(泳速) ? `§l§9水下移速§7 : §3${泳速.value.toFixed(2)}` : ""}\n§l§6实体位置§7 : §e${位置}\n§r========================="}]}`)
                }
                else {
                    用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b实体名称§7 : §2"},${通用组件.查询名称(实体)},{"text":"\n§l§e实体标识§7 : §6${实体.typeId}\n§l§6实体位置§7 : §e${位置}\n§r========================="}]}`)
                }
                实体.runCommandAsync(`particle 提示图标:定位标识 ${Math.floor(实体.location.x)} ${Math.floor(实体.location.y) + 数值修饰.浮点值(1, 2)} ${Math.floor(实体.location.z)}`)
            }
            else if (方块) {
                let
                    位置 = `${Math.floor(方块.location.x)} ${Math.floor(方块.location.y)} ${Math.floor(方块.location.z)}`
                用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b方块名称§7 : §2"},${通用组件.查询名称(方块, '方块')},{"text":"\n§l§e方块标识§7 : §b${方块.typeId}\n§l§6方块位置§7 : §e${位置}${方块.typeId.startsWith('minecraft:') ? 属性(方块.permutation.getAllProperties()) : ''}\n§r========================="}]}`)
            }
            break

        case '精密坐标':
            if (实体) {
                用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b实体名称§7 : §2"},${通用组件.查询名称(实体)},{"text":"\n§l§6实体位置§9<§a X §9>§7 : §e${实体.location.x}\n§l§6实体位置§9<§b Y §9>§7 : §e${实体.location.y}\n§l§6实体位置§9<§g Z §9>§7 : §e${实体.location.z}\n§r========================="}]}`)
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
    let
        实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0],
        方块 = 用户.getBlockFromViewVector({ BlockRaycastOptions }),
        列表 = []
    //等待一段时间后归还道具
    通用组件.延迟执行('给予物品', '特殊道具:物资整理', 用户, 数值修饰.整数值(20, 40))
    //执行功能
    switch (类型) {
        case '点击方块':
            //仅限<箱子>可以执行物品分类
            if (方块.typeId == "minecraft:chest" || 方块.typeId == "minecraft:trapped_chest") {
                var
                    容器 = 方块.getComponent('minecraft:inventory').container
                //执行容器内物品分类的操作流程
                new Promise(async function () {
                    //获取 实体背包内的物品信息 并 清除 实体背包内的物品
                    for (let 位置 = 0; 位置 < 容器.size; 位置++) {
                        let
                            物品 = 容器.getItem(位置)
                        if (物品) {
                            容器.setItem(位置, new ItemStack(ItemTypes.get('minecraft:tnt'), 0, 0))
                            列表.push(物品)
                        }
                    }
                    //对数组内的物品信息进行排序
                    列表.sort(function (a, b) {
                        let
                            A_item, B_item
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
                }
                )
            }
            else {
                //定义当前界面所用到的各项元素
                let
                    功能界面 = new ModalFormData()
                        .title("<§8§o§l 物资清除 §r>§9操作界面")
                        .dropdown("本功能将销毁<§a 清理范围 §r>内的一切掉落物\n\n效果触发后, 无法撤销该效果\n\n触发效果前, 请确认§c 重要物品是否遗落§r !!!", ["§c§l掉落物清理§r"], 0)
                        .slider("§6设置§r<§a 清理范围 §r>", 8, 256, 1, 64)
                功能界面.show(用户).then((用户选择) => {
                    用户.runCommandAsync(`particle 提示图标:通用提示 ${方块.location.x} ${方块.location.y + 2} ${方块.location.z}`)
                    用户.runCommandAsync(`kill @e[type=item,r=${用户选择.formValues[1]}]`)
                    消息通知.数据驱动('小标题', `§4掉落物已销毁, 该操作不可撤销!`)
                }
                )
            }
            break

        case '使用物品':
            switch (用户.isSneaking) {
                case false:
                    //定义 将被注入的 目标容器
                    if (实体) {
                        try {
                            var
                                容积 = 实体.getComponent('minecraft:inventory').container
                        }
                        catch {
                            消息通知.数据驱动('小标题', `§7无法获取实体:§6<§c ${实体.typeId} §6>§7的背包信息`)
                        }
                    }
                    else if (方块 && (方块.typeId == "minecraft:chest" || 方块.typeId == "minecraft:trapped_chest")) {
                        var
                            容积 = 方块.getComponent('minecraft:inventory').container
                    }
                    var
                        背包 = 用户.getComponent('minecraft:inventory').container
                    //执行 向 容器内 注入物品 的流程
                    if (容积) {
                        new Promise(async function () {
                            //获取 目标容器 剩余存储空间
                            var
                                空间 = 容积.emptySlotsCount
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
                            var
                                容积 = 实体.getComponent('minecraft:inventory').container
                        }
                        catch {
                            消息通知.数据驱动('小标题', `§7无法获取实体:§6<§c ${实体.typeId} §6>§7的背包信息`)
                        }
                    }
                    else if (方块 && (方块.typeId == "minecraft:chest" || 方块.typeId == "minecraft:trapped_chest")) {
                        var
                            容积 = 方块.getComponent('minecraft:inventory').container
                    }
                    var
                        背包 = 用户.getComponent('minecraft:inventory').container
                    //执行 抽取 容器内容 的流程
                    if (容积) {
                        new Promise(async function () {
                            //获取 玩家背包 剩余存储空间
                            var
                                空间 = 背包.emptySlotsCount
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
            let
                实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0]
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
            let
                容器 = 用户.getComponent('minecraft:inventory').container
            new Promise(async function () {
                //移除 目标容器内的 指定物品
                for (let 位置 = 0; 位置 < 容器.size; 位置++) {
                    let
                        物品 = 容器.getItem(位置)
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
 * @param {object} 位置 限制为<坐标型 对象>
 * @param {object} 维度 此参数限制为: <维度类 对象>
 */
export const 结构珍宝 = function (位置, 维度) {
    //获取可以生成结构的位置
    let
        极限 = (维度.id == 'minecraft:overworld' ? 200 : 维度.id == 'minecraft:nether' ? 100 : 200),
        高度 = (维度.id == 'minecraft:overworld' ? 55 : 维度.id == 'minecraft:nether' ? 10 : 35),
        生成 = 坐标信息.获取地面(位置, 256, 高度, 极限).split(/\s/)
    //随机生成一个结构
    switch (数值修饰.整数值(0, 8)) {
        case 0:
            维度.runCommandAsync(`structure load 环境建筑:荒原蜂塔 ${生成[0] - 4} ${生成[1] - 1} ${生成[2] - 4} 0_degrees none true true`)
            break

        case 1:
            维度.runCommandAsync(`structure load 环境建筑:森林蜂塔 ${生成[0] - 4} ${生成[1] - 1} ${生成[2] - 4} 0_degrees none true true`)
            break

        case 2:
            维度.runCommandAsync(`structure load 环境建筑:巨型橡树 ${生成[0] - 10} ${生成[1] - 1} ${生成[2] - 10} 0_degrees none true true`)
            break

        case 3:
            维度.runCommandAsync(`structure load 环境建筑:小型营地 ${生成[0] - 8} ${生成[1] - 1} ${生成[2] - 8} 0_degrees none true true`)
            break

        case 4:
            维度.runCommandAsync(`structure load 环境建筑:幻生遗居 ${生成[0] - 12} ${生成[1] - 1} ${生成[2] - 12} 0_degrees none true true`)
            break

        case 5:
            维度.runCommandAsync(`structure load 环境建筑:星辉旧居 ${生成[0] - 10} ${生成[1] - 6} ${生成[2] - 10} 0_degrees none true true`)
            break

        case 6:
            维度.runCommandAsync(`structure load 环境建筑:若水鲸塔 ${生成[0] - 8} ${生成[1] - 30} ${生成[2] - 8} 0_degrees none true true`)
            break

        case 7:
            维度.runCommandAsync(`structure load 环境建筑:岩矿采掘 ${生成[0] - 4} ${生成[1] - 2} ${生成[2] - 4} 0_degrees none true true`)
            break

        case 8:
            维度.runCommandAsync(`structure load 环境建筑:弹药仓库 ${生成[0] - 3} ${生成[1] - 2} ${生成[2] - 3} 0_degrees none true true`)
            break
    }
    //生成提示文本
    let
        文案前言 = function () {
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
    let
        文案后言 = function () {
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
    let
        位置A = new BlockLocation(位置.x, 位置.y + 10, 位置.z),
        向量_X = 生成[0] - 位置.x,
        向量_Y = 生成[1] - 位置.y,
        向量_Z = 生成[2] - 位置.z
    //创建绘制流程
    图形绘制.β_直线(向量_X, 向量_Y, 向量_Z, 位置A, '提示图标:路径指示')
    图形绘制.β_直线(0, 10, 0, 位置, '烟雾效果:紫影')
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 */
export const 匣里乾坤 = function (用户) {
    //定义实现当前功能所需的变量
    var
        玩家名称 = `"${用户.nameTag}"`
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
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 */
export const 魔晶弹珠 = function (用户) {
    //定义功能变量
    let
        实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0],
        背包 = 用户.getComponent('minecraft:inventory').container,
        伤害 = 1.0, 暴击 = 1.0, 暴伤 = 1.5
    //获取 伤害加成 并 造成伤害
    if (实体 && 实体.typeId != 'minecraft:item') {
        for (let 位置 = 0; 位置 < 背包.size; 位置++) {
            let
                物品 = 背包.getItem(位置)
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
                        暴伤 += 0.5
                        break

                    case '魔晶块:高压魔晶':
                        用户.runCommandAsync('clear @s 魔晶块:高压魔晶 0 1')
                        暴伤 += 4.5
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
        if (数值修饰.整数值(1, 10) <= 暴击) {
            实体.runCommandAsync(`damage @s ${Math.floor(伤害 * 暴伤)} entity_attack entity ${用户.nameTag}`)
        }
        else {
            实体.runCommandAsync(`damage @s ${Math.floor(伤害)} entity_attack entity ${用户.nameTag}`)
        }
        //播放 效果 并 消耗物品
        用户.runCommandAsync('playsound random.bow @s ~~~ 0.5')
        用户.runCommandAsync('clear @s 魔法工具:魔晶弹珠 0 1')
        实体.runCommandAsync('particle 烟雾效果:赤焰 ~~~')
    }
}
/**
 * @param {object} 用户 此参数限制为: <玩家类 对象>
 */
export const 林木植伐 = function (用户) {
    let
        坐标 = 用户.location
    new Promise(async function () {
        let
            高度 = 0, 冷却 = 5,
            绘制 = async function () {
                if (冷却 == 0) {
                    let 起点 = new BlockLocation(坐标.x - 7, 坐标.y + 高度, 坐标.z - 7)
                    创建阵列(11, 11, 起点, '闪烁粒子:森绿', '树木砍伐', 用户)
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
    let
        坐标 = 用户.location
    new Promise(async function () {
        坐标.y -= 8
        let
            高度 = 0, 冷却 = 5,
            绘制 = async function () {
                if (冷却 == 0) {
                    let 起点 = new BlockLocation(坐标.x - 7, 坐标.y + 高度, 坐标.z - 7)
                    创建阵列(11, 11, 起点, '闪烁粒子:靛蓝', '矿石开采', 用户)
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
    let
        特殊道具 = 0,
        背包 = 用户.getComponent('minecraft:inventory').container,
        起点 = new BlockLocation(用户.location.x, 用户.location.y + 32, 用户.location.z)
    for (let 位置 = 0; 位置 < 背包.size; 位置++) {
        let
            物品 = 背包.getItem(位置)
        if (物品?.typeId == '特制模板:铁偶魔芯') {
            位置 += 背包.size
            特殊道具 = 1
        }
        if (物品?.typeId == '特制模板:百灵绘卷') {
            位置 += 背包.size
            特殊道具 = 2
        }
    }
    switch (特殊道具) {
        case 1:
            if (用户.hasTag('call_starry_end')) {
                消息通知.数据驱动('小标题', '您已经召唤过 [ 星辉雅居 ] 了, 请不要尝试重复召唤', 用户)
            }
            else {
                用户.runCommandAsync('clear @s 特制模板:铁偶魔芯 0 1')
                用户.runCommandAsync('function born/TaYun')
            }
            break

        case 2:
            路径功能(数值修饰.整数值(-32, 32), -128, 数值修饰.整数值(-32, 32), 起点, '烟雾效果:靛蓝', '虚幻天星', 用户)
            消息通知.数据驱动('小标题', '请注意 [ 虚幻天星 ] 已出现, 请抬头观察彗星动向', 用户)
            用户.runCommandAsync('summon minecraft:lightning_bolt ~ ~32 ~')
            用户.runCommandAsync('clear @s 特制模板:百灵绘卷 0 1')
            break
    }
}
const 路径功能 = function (X轴, Y轴, Z轴, 起点, 粒子, 功能, 用户) {
    new Promise(async function () {
        let
            绘制 = async function () {
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
                    粒子 = '动态轨迹:赤焰'
                }
                用户.dimension.runCommandAsync(`particle ${粒子} ${起点.x} ${起点.y} ${起点.z}`)
                switch (功能) {
                    case '树木砍伐':
                        var
                            目标方块 = 方块识别.树木类(用户.dimension.getBlock(new BlockLocation(起点.x, 起点.y, 起点.z)))
                        if (目标方块 == true) {
                            用户.dimension.runCommandAsync(`fill ${起点.x} ${起点.y} ${起点.z} ${起点.x} ${起点.y} ${起点.z} air 0 destroy`)
                        }
                        break

                    case '矿石开采':
                        var
                            目标方块 = 方块识别.矿石类(用户.dimension.getBlock(new BlockLocation(起点.x, 起点.y, 起点.z)))
                        if (目标方块 == true) {
                            用户.dimension.runCommandAsync(`fill ${起点.x} ${起点.y} ${起点.z} ${起点.x} ${起点.y} ${起点.z} air 0 destroy`)
                            用户.dimension.runCommandAsync(`execute positioned ${起点.x} ${起点.y} ${起点.z} run tp @e[r=1,type=item] @p`)
                        }
                        break

                    case '虚幻天星':
                        var
                            目标方块 = 方块识别.可通行(用户.dimension.getBlock(new BlockLocation(起点.x, 起点.y - 1, 起点.z)))
                        if (目标方块 == false) {
                            用户.dimension.runCommandAsync(`summon minecraft:lightning_bolt ${起点.x} ${起点.y} ${起点.z}`)
                            用户.dimension.runCommandAsync(`particle minecraft:totem_particle ${起点.x} ${起点.y} ${起点.z}`)
                            用户.dimension.runCommandAsync(`particle 'minecraft:knockback_roar_particle' ${起点.x} ${起点.y} ${起点.z}`)
                            switch (数值修饰.整数值(0, 4)) {
                                case 0:
                                    用户.dimension.runCommandAsync(`summon 幻生阁:九九 ${起点.x} ${起点.y + 1} ${起点.z}`)
                                    break

                                case 1:
                                    用户.dimension.runCommandAsync(`summon 幻生阁:雪隐 ${起点.x} ${起点.y + 1} ${起点.z}`)
                                    break

                                case 2:
                                    用户.dimension.runCommandAsync(`summon 幻生阁:星砂 ${起点.x} ${起点.y + 1} ${起点.z}`)
                                    break

                                case 3:
                                    用户.dimension.runCommandAsync(`summon 幻生阁:幽蓝 ${起点.x} ${起点.y + 1} ${起点.z}`)
                                    break

                                case 4:
                                    用户.dimension.runCommandAsync(`summon 明镜阁:珍珠 ${起点.x} ${起点.y + 1} ${起点.z}`)
                                    break
                            }
                            let
                                高度 = 起点.y - 用户.location.y,
                                纵向 = 起点.x - 用户.location.x,
                                横向 = 起点.z - 用户.location.z
                            图形绘制.β_直线(纵向, 高度, 横向, 用户.headLocation,'提示图标:路径指示')
                            world.events.tick.unsubscribe(绘制)
                        }
                        break
                }
            }
        world.events.tick.subscribe(绘制)
    }
    )
}
const 创建阵列 = function (A轴, B轴, 起点, 粒子, 功能, 用户) {
    new Promise(async function () {
        let
            绘制 = async function () {
                let
                    位置 = new BlockLocation(起点.x += (A轴 >= 1 ? 1 : A轴 == 0 ? 0 : -1), 起点.y, 起点.z)
                路径功能(0, 0, B轴, 位置, 粒子, 功能, 用户)
                A轴 += (A轴 >= 1 ? -1 : A轴 == 0 ? 0 : 1)
                if (A轴 == 0) {
                    world.events.tick.unsubscribe(绘制)
                }
            }
        world.events.tick.subscribe(绘制)
    }
    )
}
export const 元素附加 = function (目标, 符文, 参数 = 1) {
    let
        查询标签 = 目标.getTags()
    for (let 目标标签 in 查询标签) {
        if (查询标签[目标标签].startsWith(`{"元素符文":{`)) {
            var
                查询结果 = JSON.parse(查询标签[目标标签])
        }
    }
    if (查询结果) {
        let
            起始 = 查询结果["元素符文"]["起始.元素"],
            反应 = 查询结果["元素符文"]["反应.元素"],
            数值 = 查询结果["元素符文"]["元素.数值"]
        if (反应 == '无') {
            let
                无效信息 = {
                    "元素符文": {
                        "起始.元素": 起始,
                        "反应.元素": 反应,
                        "元素.数值": 数值
                    }
                },
                有效信息 = {
                    "元素符文": {
                        "起始.元素": 起始,
                        "反应.元素": 符文,
                        "元素.数值": 数值 + 参数
                    }
                }
            目标.removeTag(JSON.stringify(无效信息))
            目标.addTag(JSON.stringify(有效信息))
        }
        else {
            let
                无效信息 = {
                    "元素符文": {
                        "起始.元素": 起始,
                        "反应.元素": 反应,
                        "元素.数值": 数值
                    }
                },
                有效信息 = {
                    "元素符文": {
                        "起始.元素": 符文,
                        "反应.元素": 起始,
                        "元素.数值": 数值 + 参数
                    }
                }
            目标.removeTag(JSON.stringify(无效信息))
            目标.addTag(JSON.stringify(有效信息))
        }
    }
    else {
        let
            元素信息 = {
                "元素符文": {
                    "起始.元素": 符文,
                    "反应.元素": '无',
                    "元素.数值": 参数
                }
            }
        目标.addTag(JSON.stringify(元素信息))
    }
}
export const 等级提升 = function (目标) {
    let
        查询标签 = 目标.getTags()
    for (let 目标标签 in 查询标签) {
        if (查询标签[目标标签].startsWith(`{"等级":{`)) {
            var
                查询结果 = JSON.parse(查询标签[目标标签])
        }
    }
    if (查询结果) {
        let
            阶段 = 查询结果["等级"]["阶段"],
            数值 = 查询结果["等级"]["数值"],
            进阶 = Math.floor(((阶段 * 10) + 阶段) * ((阶段 * 0.15) <= 1 ? 1 : (阶段 * 0.15))) <= 数值 ? true : false
        //根据数值执行[等级提升]的相关功能
        if (阶段 < 64) {
            let
                无效信息 = {
                    "等级": {
                        "阶段": 阶段,
                        "数值": 数值
                    }
                },
                有效信息 = {
                    "等级": {
                        "阶段": 进阶 == true ? 阶段 + 1 : 阶段,
                        "数值": 进阶 == true ? 0 : 数值 + 1
                    }
                }
            目标.removeTag(JSON.stringify(无效信息))
            目标.addTag(JSON.stringify(有效信息))
        }
        if (进阶 == true) {
            目标.runCommandAsync('loot spawn ~ ~1 ~ loot 参悟之石')
        }
    }
    else {
        let
            等级标签 = {
                "等级": {
                    "阶段": 1,
                    "数值": 0
                }
            }
        目标.addTag(JSON.stringify(等级标签))
    }
}
export const 魔导手册 = function (用户) {
    //获取目标信息
    let
        实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0],
        //方块 = 用户.getBlockFromViewVector({ BlockRaycastOptions }),
        背包 = 用户.getComponent('minecraft:inventory').container,
        血量 = 实体?.getComponent('health'),
        标签 = 实体?.getTags()
    if (实体) {
        for (let 指针 in 标签) {
            if (标签[指针].startsWith(`{"攻击":{`)) {
                var
                    攻击 = parseInt(JSON.parse(标签[指针])["攻击"]["数据值"])
            }
            if (标签[指针].startsWith(`{"暴击":{`)) {
                var
                    暴击 = parseInt(JSON.parse(标签[指针])["暴击"]["数据值"])
            }
            if (标签[指针].startsWith(`{"暴伤":{`)) {
                var
                    暴伤 = parseInt(JSON.parse(标签[指针])["暴伤"]["数据值"])
            }
            if (标签[指针].startsWith(`{"充能":{`)) {
                var
                    充能 = parseInt(JSON.parse(标签[指针])["充能"]["数据值"])
            }
            if (标签[指针].startsWith(`{"快充":{`)) {
                var
                    快充 = parseInt(JSON.parse(标签[指针])["快充"]["数据值"])
            }
            if (标签[指针].startsWith(`{"等级":{`)) {
                var
                    阶段 = parseInt(JSON.parse(标签[指针])["等级"]["阶段"]),
                    数值 = parseInt(JSON.parse(标签[指针])["等级"]["数值"])
            }
        }
    }
    let
        元素 = function (目标) {
            switch (目标.typeId) {
                case '明镜阁:珍珠': return '§b海蓝§r'
                case '星光阁:琉璃': return '§6橙光§r'
                case '幻生阁:星砂': return '§4赤焰§r'
                case '星光阁:森涅': return '§a森绿§r'
                case '星光阁:蔷薇': return '§5紫影§r'
            }
        }
    //定义 界面元素 与 界面内容
    if (攻击 && 实体?.hasTag('contract')) {
        var
            元素类型 = `\n    §l§1[§9 元素类型 §1]§r\n          §6[§7 类型 §6]§r : < ${元素(实体)} >`,
            快速充能 = `\n    §l§1[§9 快速充能 §1]§r\n          §6[ §4max:§b 10 §6]§r : §a${快充}§r`,
            当前等级 = `\n    §l§1[§9 当前等级 §1]§r\n          §6[ §4max:§b 64 §6]§r : §a${阶段}§r`,
            基础攻击 = `\n    §l§1[§9 基础攻击 §1]§r\n          §6[ §4max:§b 100 §6]§r : §a${攻击}§r`,
            基础暴击 = `\n    §l§1[§9 基础暴击 §1]§r\n          §6[ §4max:§b 100 §6]§r : §a${暴击}§r`,
            基础暴伤 = `\n    §l§1[§9 基础暴伤 §1]§r\n          §6[ §4max:§b 500 §6]§r : §a${暴伤}§r`,
            当前充能 = `\n    §l§1[§9 当前充能 §1]§r\n          §6[ §4max:§b ${15 - 快充} §6]§r : §a${充能}§r`,
            角色血量 = `\n    §l§1[§9 角色血量 §1]§r\n          §6[ §4max:§b ${血量.value} §6]§r : §a${血量.current}§r`,
            攻击次数 = `\n    §l§1[§9 攻击次数 §1]§r\n          §6[ §4max:§b ${Math.floor(((阶段 * 10) + 阶段) * ((阶段 * 0.15) <= 1 ? 1 : (阶段 * 0.15)))} §6]§r : §a${数值}§r`,
            功能界面 = new ActionFormData()
                .title("§1==========§l§9 浮世众生 §r§1==========")
                .body(`-------------------------------${角色血量}${当前等级}${攻击次数}\n-------------------------------${当前充能}${快速充能}\n-------------------------------${基础攻击}${基础暴击}${基础暴伤}${元素类型}`)
                .button("§l§1<§9 属性提升 §1>", "textures/GUI/icon/icon_08")
                .button("§l§1<§9 技能介绍 §1>", "textures/GUI/icon/icon_08")
                .button("§l§1<§9 元素共鸣 §1>", "textures/GUI/icon/icon_08")
                .button("§l§1<§9 特殊侦测 §1>", "textures/GUI/icon/icon_08")
        功能界面.show(用户).then((用户选择) => {
            switch (用户选择.selection) {
                case 0:
                    var
                        功能界面 = new ActionFormData()
                            .title("§1==========§l§9 属性提升 §r§1==========")
                            .button("§l§1<§9 基础攻击 §1>", "textures/GUI/icon/icon_08")
                            .button("§l§1<§9 基础暴击 §1>", "textures/GUI/icon/icon_08")
                            .button("§l§1<§9 基础暴伤 §1>", "textures/GUI/icon/icon_08")
                            .button("§l§1<§9 快速充能 §1>", "textures/GUI/icon/icon_08")
                    功能界面.show(用户).then((用户选择) => {
                        for (let 位置 = 0; 位置 < 背包.size; 位置++) {
                            var
                                物品 = 背包.getItem(位置),
                                查询结果 = (物品 && 物品.typeId == '特制模板:参悟之石') ? true : false
                            位置 += (查询结果 == true) ? 背包.size : 0
                        }
                        if (查询结果 == true) {
                            switch (用户选择.selection) {
                                case 0:
                                    if (攻击 < 100) {
                                        消息通知.数据驱动('小标题', `§l§1<§9 基础攻击 §1>§r获得提升, 现在为: ${攻击 + 5}`, 用户)
                                        用户.runCommandAsync('clear @s 特制模板:参悟之石 0 1')
                                        数据标签.存储数值('攻击', 实体, 攻击 + 5)
                                    }
                                    else {
                                        消息通知.数据驱动('小标题', `§l§4<§c 基础攻击 §4>§r已到达上限, 无法继续提升`, 用户)
                                    }
                                    break

                                case 1:
                                    if (暴击 < 100) {
                                        消息通知.数据驱动('小标题', `§l§1<§9 基础暴击 §1>§r获得提升, 现在为: ${暴击 + 5}`, 用户)
                                        用户.runCommandAsync('clear @s 特制模板:参悟之石 0 1')
                                        数据标签.存储数值('暴击', 实体, 暴击 + 5)
                                    }
                                    else {
                                        消息通知.数据驱动('小标题', `§l§4<§c 基础暴击 §4>§r已到达上限, 无法继续提升`, 用户)
                                    }
                                    break

                                case 2:
                                    if (暴伤 < 500) {
                                        消息通知.数据驱动('小标题', `§l§1<§9 基础暴伤 §1>§r获得提升, 现在为: ${暴伤 + 25}`, 用户)
                                        用户.runCommandAsync('clear @s 特制模板:参悟之石 0 1')
                                        数据标签.存储数值('暴伤', 实体, 暴伤 + 25)
                                    }
                                    else {
                                        消息通知.数据驱动('小标题', `§l§4<§c 基础暴伤 §4>§r已到达上限, 无法继续提升`, 用户)
                                    }
                                    break

                                case 3:
                                    if (快充 < 10) {
                                        消息通知.数据驱动('小标题', `§l§1<§9 快速充能 §1>§r获得提升, 现在为: ${快充 + 1}`, 用户)
                                        用户.runCommandAsync('clear @s 特制模板:参悟之石 0 1')
                                        数据标签.存储数值('快充', 实体, 快充 + 1)
                                    }
                                    else {
                                        消息通知.数据驱动('小标题', `§l§4<§c 快速充能 §4>§r已到达上限, 无法继续提升`, 用户)
                                    }
                                    break
                            }
                        }
                        else {
                            消息通知.数据驱动('小标题', '§c§l提升属性需要消耗§6<§b 参悟之石 §6>§c ! ! !', 用户)
                        }
                    })
                    break

                case 1:
                    var
                        分隔 = '-------------------------------'
                    switch (实体.typeId) {
                        case '明镜阁:珍珠':
                            var
                                普攻 = '<普攻>:\n  单体伤害, 附着§2 1 §r单位<§b 海蓝 §r>\n\n',
                                技能 = '<技能>:\n  <珍珠之心>:\n    发动攻击时, 使§4[§c 目标 §4]§r附加印记\n    再次命中时, 将移除标记, 并获得<珍珠之心>效果\n      基于§4[§c 目标 §4]§r的§2 10% §r生命上限, 释放[ 生命恢复 ]范围效果\n      基于§4[§c 目标 §4]§r的§2 10% §r当前生命, 修改[ 生命恢复 ]持续时间\n\n',
                                天赋 = '  <契约加成>:\n    攻击时, 给予玩家[ 潮涌能量 ]和[ 生命提升 ]\n\n  <诸海巡游>:\n    如果发动攻击时, 被水淹没\n    则额外召唤< 欧泊 >协同攻击',
                                大招 = `<大招>:\n  <能耗>: §2${15 - 快充}§r\n\n  <附着>:\n    对§4[§c 目标 §4]§r附着§2 2 §r单位<§b 海蓝 §r>\n\n  <效果>:\n    在§4[§c 目标 §4]§r位置, 召唤会发射[ 幻海(游鱼) ]的[ 沧海(水母) ]`
                            消息通知.数据驱动('聊天栏', 分隔, 用户)
                            消息通知.数据驱动('聊天栏', 普攻 + 技能 + 天赋 + 大招, 用户)
                            消息通知.数据驱动('聊天栏', 分隔, 用户)
                            break

                        case '星光阁:琉璃':
                            var
                                普攻 = '<普攻>:\n  单体伤害, 1单位<§6 橙光 §r>\n\n',
                                技能 = '<技能>:\n  <零能回充>:\n    暴击时, 获得§2 5 §r点能量\n\n',
                                天赋 = '  <契约加成>:\n    攻击时, 给予玩家[ 抗性提升 ]和[ 伤害提升 ]\n\n',
                                被动 = '  <复苏锚定>:\n    在一定的情况下, 为附近的玩家创建复活点\n\n',
                                号令 = '  <战争号令>:\n    攻击时, 命令周围未战斗的实体进行协同攻击\n\n',
                                意志 = '  <水晶意志>:\n    血量低于 45 点时, 快速恢复生命值\n\n',
                                大招 = `<大招>:\n  <能耗>: §2${15 - 快充}§r\n\n  <附着>:\n    对§4[§c 目标 §4]§r附着§2 2 §r单位<§6 橙光 §r>\n\n  <效果>:\n    召唤[神恩]法术飞弹\n    数量基于目标最大血量的§2 10% §r, 最大不超过§2 9 §r个`
                            消息通知.数据驱动('聊天栏', 分隔, 用户)
                            消息通知.数据驱动('聊天栏', 普攻 + 技能 + 天赋 + 被动 + 号令 + 意志 + 大招, 用户)
                            消息通知.数据驱动('聊天栏', 分隔, 用户)
                            break

                        case '幻生阁:星砂':
                            var
                                普攻 = '<普攻>:\n  单体伤害, 1单位<§4 赤焰 §r>\n\n',
                                技能 = '<技能>:\n  <攻竭一击>:\n    未暴击时\n        暴击伤害, 追加§2 200% §r\n        该效果获得的 暴伤提升 最大不可超过§2 1000% §r\n\n    当暴击时\n        基础伤害, 追加§2 45% §r的双暴面板\n        伤害结算后, 移除所有的属性追加值\n\n',
                                大招 = `<大招>:\n  <能耗>: §2${15 - 快充}§r\n\n  <附着>:\n    对§4[§c 目标 §4]§r附着§2 2 §r单位<§4 赤焰 §r>\n\n  <效果>:\n    追加 100% 暴击, 500% 暴伤`
                            消息通知.数据驱动('聊天栏', 分隔, 用户)
                            消息通知.数据驱动('聊天栏', 普攻 + 技能 + 大招, 用户)
                            消息通知.数据驱动('聊天栏', 分隔, 用户)
                            break

                        case '星光阁:森涅':
                            var
                                普攻 = '<普攻>:\n  单体伤害, 1单位<§a 森绿 §r>\n\n',
                                技能 = '<技能>:\n  <零能回充>:\n    暴击时, 获得§2 5 §r点能量\n\n  <紧急规避>:\n    生命值低于§2 35% §r时, 传送至最近的玩家\n    使用[ 虚空方块 ]保护自身\n    自身获得[ 生命恢复 ]效果',
                                大招 = `<大招>:\n  <能耗>: §2${15 - 快充}§r\n\n  <附着>:\n    对§4[§c 目标 §4]§r附着§2 2 §r单位<§a 森绿 §r>\n\n  <效果>:\n    基于§2 75% §r的双暴面板, 对目标进行一次追加伤害\n    本次伤害可以触发暴击乘区`
                            消息通知.数据驱动('聊天栏', 分隔, 用户)
                            消息通知.数据驱动('聊天栏', 普攻 + 技能 + 大招, 用户)
                            消息通知.数据驱动('聊天栏', 分隔, 用户)
                            break

                    }
                    break

                case 3:
                    事件侦测(用户)
                    break
            }
        })
    }
    else {
        var
            功能界面 = new ActionFormData()
                .body("§7功能目录")
                .title("§6==========§o§l§5 彼岸浮梦 §r§6==========")
                .button("§l§1查看§1 [§0§o§l 项目开发 §1]§r", "textures/GUI/icon/icon_00")
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

                case 8:
                    事件侦测(用户)
                    break

                default:
                    break
            }
        })
    }
}
export const 浮光镜影 = function (用户) {
    let
        实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0],
        背包 = 用户.getComponent('minecraft:inventory').container,
        任务 = function (信息) { 实体.runCommandAsync(信息) },
        血量 = 实体?.getComponent('health'),
        标签 = 实体?.getTags(),
        物品 = 背包.getItem(0)
    if (实体) {
        for (let 指针 in 标签) {
            if (标签[指针].startsWith(`{"攻击":{`)) {
                var
                    攻击 = parseInt(JSON.parse(标签[指针])["攻击"]["数据值"])
            }
        }
        if (攻击 && 实体.hasTag('contract')) {
            let
                血量显示 = `§l§1[§9 角色血量 §1]§r : §a${血量.current} §6[ §4max:§b ${血量.value} §6]§r`,
                功能提示 = `按下按钮后\n    1.会将您快捷栏中的第一个<§9物品§r>\n    2.镜像到<§2角色§r>对应<§6位置§r>中进行替换\n    3.部分<§6位置§r>与<§9物品§r>可能出现异常, 还请注意`,
                功能界面 = new ActionFormData()
                    .title("§1==========§l§9 浮光镜影 §r§1==========")
                    .body(`------------------< 百货穿搭 >-----------------\n\n${血量显示}\n\n${功能提示}\n\n`)
                    .button("§l§1<§r 装备§r [§l§9 右手 §r] §1§l>", "textures/items/iron_sword")
                    .button("§l§1<§r 装备§r [§l§9 左手 §r] §1§l>", "textures/items/钢岩合金盾牌")
                    .button("§l§1<§r 装备§r [§l§9 头盔 §r] §1§l>", "textures/items/iron_helmet")
                    .button("§l§1<§r 装备§r [§l§9 胸甲 §r] §1§l>", "textures/items/iron_chestplate")
                    .button("§l§1<§r 装备§r [§l§9 护腿 §r] §1§l>", "textures/items/iron_leggings")
                    .button("§l§1<§r 装备§r [§l§9 靴子 §r] §1§l>", "textures/items/iron_boots")
                    .button("§l§1<§r 移除§r [§l§4 全部 §r] §1§l>", "textures/items/All_Make")
            功能界面.show(用户).then((用户选择) => {
                switch (用户选择.selection) {
                    case 0:
                        任务(`replaceitem entity @s slot.weapon.mainhand 0 ${物品.typeId}`)
                        break

                    case 1:
                        任务(`replaceitem entity @s slot.weapon.offhand 0 ${物品.typeId}`)
                        break

                    case 2:
                        任务(`replaceitem entity @s slot.armor.head 0 ${物品.typeId}`)
                        break

                    case 3:
                        任务(`replaceitem entity @s slot.armor.chest 0 ${物品.typeId}`)
                        break

                    case 4:
                        任务(`replaceitem entity @s slot.armor.legs 0 ${物品.typeId}`)
                        break

                    case 5:
                        任务(`replaceitem entity @s slot.armor.feet 0 ${物品.typeId}`)
                        break

                    case 6:
                        任务(`replaceitem entity @s slot.weapon.mainhand 0 air`)
                        任务(`replaceitem entity @s slot.weapon.offhand 0 air`)
                        任务(`replaceitem entity @s slot.armor.head 0 air`)
                        任务(`replaceitem entity @s slot.armor.chest 0 air`)
                        任务(`replaceitem entity @s slot.armor.legs 0 air`)
                        任务(`replaceitem entity @s slot.armor.feet 0 air`)
                        break
                }
            })
        }
        else if (实体.typeId == '星光阁:啸天' && 实体.hasTag('contract')) {
            let
                功能界面 = new ActionFormData()
                    .title("§1==========§l§9 浮光镜影 §r§1==========")
                    .body(`------------------< 坐骑装甲 >-----------------\n\n§l§1[§9 啸天血量 §1]§r : §a${血量.current} §6[ §4max:§b ${血量.value} §6]\n\n`)
                    .button("§l§1<§r 装备§r [§l§9 护甲 §r] §1§l>", "textures/items/iron_leggings")
                    .button("§l§1<§r 移除§r [§l§4 全部 §r] §1§l>", "textures/items/All_Make")
            功能界面.show(用户).then((用户选择) => {
                switch (用户选择.selection) {
                    case 0:
                        任务(`replaceitem entity @s slot.armor.legs 0 ${物品.typeId}`)
                        break

                    case 1:
                        任务(`replaceitem entity @s slot.weapon.mainhand 0 air`)
                        任务(`replaceitem entity @s slot.weapon.offhand 0 air`)
                        任务(`replaceitem entity @s slot.armor.head 0 air`)
                        任务(`replaceitem entity @s slot.armor.chest 0 air`)
                        任务(`replaceitem entity @s slot.armor.legs 0 air`)
                        任务(`replaceitem entity @s slot.armor.feet 0 air`)
                        break
                }
            })
        }
        else {
            let
                功能界面 = new ActionFormData()
                    .title("§1==========§l§9 浮光镜影 §r§1==========")
                    .body(`------------噬灵靶标------------\n\n该功能未完工`)
                    .button("§l§1<§c 创建 §r§1>", "textures/items/iron_sword")
            功能界面.show(用户).then((用户选择) => { })
        }
    }
    else {
        let
            功能_1 = '<功能提示>:\n  1.本道仅在指向实体时生效\n  2.可用于为<角色>穿戴装备\n  3.可用于创建<靶标>\n\n',
            功能_2 = '<穿戴装备>:\n  1.本功能仅限已契约的<角色>触发\n  2.可将任意物品装配到任意槽位上\n  3.部分槽位与部分物品可能无法正常显示\n\n',
            功能_3 = '<创建靶标>:\n  1.本功能可创建< 攻击伤害测试靶标 >\n  2.每个靶标的血量为10000'
        消息通知.界面显示(用户, '§1==========§l§9 浮光镜影 §r§1==========', 功能_1 + 功能_2 + 功能_3)
    }
}