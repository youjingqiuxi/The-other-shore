/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 / Tayun_Starry ]
*/
//导入< Beta_API >预设接口
import { BlockRaycastOptions, EntityRaycastOptions, ItemStack, ItemTypes, world } from "@minecraft/server"
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"
//导入< matrix_API >预设接口
import { 通用组件, 数据标签, 坐标信息, 消息通知, 数值修饰 } from './matrix_API'
//定义全局变量
const 获取维度 = world.getDimension('overworld') || world.getDimension('nether') || world.getDimension('the end')
//定义 类
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
}
export class 专用组件 {
    /**
     * @param {string} 类型 此参数限制为: < ... >
     * @param {string} 效果 此参数限制为: < ... >
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {number} 维持 执行功能时, 等待多少<游戏刻>后停止运行
     * @returns {Promise<any>}
     */
    static 保持运行 = function (类型, 效果, 用户, 维持 = 1200) {
        //定义实现当前功能所需的变量
        var 玩家名称 = `"${用户.nameTag}"`
        //创建多线程任务
        new Promise(async function () {
            //定义所需的游戏事件效果
            let 游戏事件 = function (信息) {
                switch (效果) {
                    case '状态显示':
                        专用组件.状态显示(用户)
                        break

                    case '事件侦测':
                        专用组件.事件侦测(用户, 信息, '执行功能')
                        break

                    case '拟态矩阵_方块记录':
                        if (用户.hasTag('Gametest.RecordBlock')) {
                            专用组件.拟态矩阵(用户, 信息.block, '', `记录方块`)
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
        )
    }
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {object} 目标 此参数限制为: <事件类 对象>
     * @param {string} 类型 此参数限制为: < 显示界面 | 执行功能 >
     */
    static 事件侦测 = function (用户, 目标, 类型 = '显示界面') {
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
                            专用组件.保持运行('实体事件', '事件侦测', 用户, 持续时间)
                            break

                        case 1:
                            break

                        case 2:
                            消息通知.数据驱动('聊天栏', `<§5§o§l 状态显示 §r>§a已开启§r, 该效果将持续: §c${持续时间} §r游戏刻`, 玩家名称)
                            专用组件.保持运行('游戏时刻', '状态显示', 用户, 持续时间)
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
                    用户.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b实体名称§7: §3"},${通用组件.查询名称(目标.entity)},{"text":"\n§l§e实体标识§7: §6${目标.entity.typeId}\n§l§e实体血量§7: §2${Math.round(血量.current)}/${血量.value}\n§a实体事件§7: §b${目标.id}\n§6实体位置§7: §e${位置}\n§r========================="}]}`)
                }
                else {
                    用户.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b实体名称§7: §3"},${通用组件.查询名称(目标.entity)},{"text":"\n§l§e实体标识§7: §6${目标.entity.typeId}\n§a实体事件§7: §b${目标.id}\n§6实体位置§7: §e${位置}\n§r========================="}]}`)
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
    static 拟态矩阵 = function (用户, 方块, 坐标, 类型, 查询) {
        //定义实现当前功能所需的变量
        let 玩家名称 = `"${用户.nameTag}"`
        let 方块标识 = 方块.typeId
        let 方块信息 = 方块
        //执行本接口的功能
        switch (类型) {
            case '标记起点':
                用户.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air')
                消息通知.数据驱动('小标题', `§6填充坐标§r<§b A §r>§6为§r :§a ${查询}`, 玩家名称)
                坐标信息.数据保存('拟态矩阵_标记起点', 用户, 坐标)
                break

            case '标记终点':
                用户.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air')
                消息通知.数据驱动('小标题', `§6填充坐标§r<§d B §r>§6为§r :§a ${查询}`, 玩家名称)
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
                消息通知.数据驱动('小标题', `§r<§b 坐标点 A §r>§6为§r :§a ${坐标信息.数据解析('拟态矩阵_标记起点', 用户)}\n§r<§d 坐标点 B §r>§6为§r :§a ${坐标信息.数据解析('拟态矩阵_标记终点', 用户)}\n§r<§e 方块数 F §r>§6为§r :§a ${坐标信息.计算区间(用户, '拟态矩阵_标记起点', '拟态矩阵_标记终点')}`, 玩家名称)
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
                消息通知.数据驱动('小标题', '§6您已处于方块标记的模式, 请放置你需要用来填充的方块', 玩家名称)
                用户.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air')
                专用组件.保持运行('方块放置', '拟态矩阵_方块记录', 用户)
                用户.addTag('Gametest.RecordBlock')
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
                用户.removeTag('Gametest.RecordBlock')
                //给予物品
                用户.runCommand("give @s 拟态矩阵:标记方块")
                break

            case '方块标定':
                //移除玩家手上的道具
                用户.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air')
                //等待一段时间后归还道具
                通用组件.延迟执行('给予物品', '拟态矩阵:方块标定', 用户, 数值修饰.整数值(10, 30))
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
                //移除玩家手上的道具
                用户.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air')
                //等待一段时间后归还道具
                通用组件.延迟执行('给予物品', '拟态矩阵:方块调试', 用户, 数值修饰.整数值(10, 30))
                //执行功能
                switch (用户.isSneaking) {
                    case true:
                        //定义实现当前功能所需的变量
                        var 获取方块 = 获取维度.getBlock(坐标)
                        var 调试属性 = 获取方块.type.createDefaultBlockPermutation()
                        //定义当前界面所用到的各项元素
                        var 功能界面 = new ModalFormData()
                            .title("<§5§o§l 方块修改 §r>§9操作界面")
                            .dropdown("| 调试 |与| 修改 |<§9§o§l 方块属性 §r>", ["<§c§o§l 自由模式 §r>", "<§7§o§l 方块朝向 §r>", "<§7§o§l 方块转换 §r>", "<§7§o§l 方块能量 §r>", "<§7§o§l 方块参数 §r>"], 2)
                            .textField("<§c§o§l 自由模式 => §9方块属性 §r>", "§c请输入 方块属性 标签§r", 'Table:switch')
                            .textField("§6设置§r<§9§o§l 方块属性 §r>§a数值§r", "§c请输入数值§r", '0')
                        功能界面.show(用户).then((用户选择) => {
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
                        var 获取方块 = world.getDimension("overworld").getBlock(坐标)
                        var 调试属性 = 获取方块.type.createDefaultBlockPermutation()
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
        }
    }
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {string} 类型 此参数限制为: < ... >
     */
    static 锚点虚印 = function (用户, 类型 = '基础菜单') {
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
                            专用组件.锚点虚印(用户, '锚点绑定')
                            break

                        case 1:
                            专用组件.锚点虚印(用户, '锚点召集')
                            break

                        case 2:
                            专用组件.锚点虚印(用户, '锚点移除')
                            break

                        case 3:
                            专用组件.锚点虚印(用户, '锚点传送')
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
                    用户.runCommand(`tag @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=${用户选择.formValues[0]},c=${用户选择.formValues[1]}] add ${玩家名称}`)
                    用户.runCommand(`title @s actionbar |> @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=${用户选择.formValues[0]},c=${用户选择.formValues[1]}] <| 尝试与您的操作共鸣`)
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
                    用户.runCommand(`event entity @e[tag=${玩家名称},r=${用户选择.formValues[0]},tag=!SitDown] 锚点虚印`)
                    用户.runCommand(`tp @e[tag=${玩家名称}${(用户选择.formValues[2]) ? `,r=${用户选择.formValues[0]}` : ""},c=${用户选择.formValues[1]},tag=!SitDown] ${用户选择.formValues[3]}`)
                    用户.runCommand(`title @s actionbar |> @e[tag=${玩家名称}${(用户选择.formValues[2]) ? `,r=${用户选择.formValues[0]}` : ""},c=${用户选择.formValues[1]},tag=!SitDown] <| 尝试与您的操作共鸣`)
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
                    用户.runCommand(`tag @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=${用户选择.formValues[0]},c=${用户选择.formValues[1]}] remove ${玩家名称}`)
                    用户.runCommand(`title @s actionbar |> @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=${用户选择.formValues[0]},c=${用户选择.formValues[1]}] <| 尝试与您的操作共鸣`)
                }
                )
                break

            case '锚点传送':
                用户.runCommand(`tp @s @e[tag=${玩家名称},c=1,family=Tayun,family=Peer]`)
                break
        }
    }
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {string} 类型 此参数限制为: < ... >
     */
    static 瞬间移动 = function (用户, 类型 = '基础菜单') {
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
                                    专用组件.瞬间移动(用户, '相对传送')
                                    break

                                case 1:
                                    专用组件.瞬间移动(用户, '随机传送')
                                    break

                                case 2:
                                    专用组件.瞬间移动(用户, '绝对传送')
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
                            用户.runCommand(`tp @s ${Math.floor(用户.location.x) + 用户选择.formValues[0]} ${Math.floor(用户.location.y) + 用户选择.formValues[1]} ${Math.floor(用户.location.z) + 用户选择.formValues[2]}`)
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
                            用户.runCommand(`spreadplayers ~${用户选择.formValues[0]} ~${用户选择.formValues[1]} ${用户选择.formValues[2]} ${用户选择.formValues[3]} @s`)
                        }
                        )
                        break

                    case '绝对传送':
                        //定义当前界面所用到的各项元素
                        var 功能界面 = new ModalFormData()
                            .title("<§9§o§l 绝对传送 §r>§2操作界面")
                            .textField("§9绝对§c 三轴坐标§r", "§c请输入目的地坐标§r", 当前坐标)
                        功能界面.show(用户).then((用户选择) => {
                            用户.runCommand(`tp @s ${用户选择.formValues[0]}`)
                        }
                        )
                        break
                }
                //清除道具并在等待一段时间后归还
                通用组件.延迟执行('给予物品', '魔法书籍:瞬间移动', 用户, 数值修饰.整数值(10, 20))
                用户.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air')
                break

            case true:
                //将玩家随机移动到安全位置
                用户.runCommand(`spreadplayers ~ ~ 5 15 @s`)
                //清除道具并在等待一段时间后归还
                通用组件.延迟执行('给予物品', '魔法书籍:瞬间移动', 用户, 数值修饰.整数值(20, 40))
                用户.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air')
                break
        }
    }
    /**
     * @param {number} 损伤 攻击造成的损伤伤害值
     * @param {object|string} 位置 显示损伤值的位置
     * @param {number} 悬浮 调整伤害显示的悬浮字的基准高度
     * @returns {Promise<any>}
     */
    static 损伤显示 = function (损伤, 位置, 悬浮 = 0) {
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
                通用组件.生成实体('粒子', `伤害显示:万位数-${万位数}`, `${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
            }
            if (计算_千位数 >= 1000) {
                for (let 数值 = 0; 数值 < 计算_千位数; 数值++) {
                    if (计算_千位数 < ((数值 + 1) * 1000)) {
                        var 千位数 = 数值
                        数值 = 数值 + 计算_千位数
                    }
                }
                通用组件.生成实体('粒子', `伤害显示:千位数-${千位数}`, `${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
            }
            if (计算_百位数 >= 100) {
                for (let 数值 = 0; 数值 < 计算_百位数; 数值++) {
                    if (计算_百位数 < ((数值 + 1) * 100)) {
                        var 百位数 = 数值
                        数值 = 数值 + 计算_百位数
                    }
                }
                通用组件.生成实体('粒子', `伤害显示:百位数-${百位数}`, `${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
            }
            if (计算_十位数 >= 10) {
                for (let 数值 = 0; 数值 < 计算_十位数; 数值++) {
                    if (计算_十位数 < ((数值 + 1) * 10)) {
                        var 十位数 = 数值
                        数值 = 数值 + 计算_十位数
                    }
                }
                通用组件.生成实体('粒子', `伤害显示:十位数-${十位数}`, `${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
            }
            if (个位数 != 0) {
                通用组件.生成实体('粒子', `伤害显示:个位数-${个位数}`, `${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1, 2)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`)
            }
        }
        else {
            //当超出最大显示范围后 用于补偿的数值显示机制
            通用组件.生成实体('实体', '矩阵接口:容器', `${位置.x + 数值修饰.浮点值(-1.5, 0.5)} ${位置.y + 悬浮 + 数值修饰.浮点值(1.5, 2.5)} ${位置.z + 数值修饰.浮点值(-1.5, 0.5)}`, '显示名称', `§${通用组件.字符颜色(1, 14)}§l—§${通用组件.字符颜色(1, 14)}${损伤}`)
        }
    }
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     * @param {string} 类型 此参数限制为: <道具模式>
     */
    static 状态显示 = function (用户, 类型) {
        //获取目标信息
        var 实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0]
        var 方块 = 用户.getBlockFromViewVector(new BlockRaycastOptions())
        if (实体) {
            var 泳速 = 实体.getComponent('underwater_movement')
            var 栓绳 = 实体.getComponent('leashable')
            var 移速 = 实体.getComponent('movement')
            var 血量 = 实体.getComponent('health')
        }
        switch (类型) {
            case '道具模式':
                //清除道具并在等待一段时间后归还
                通用组件.延迟执行('给予物品', '特殊道具:状态显示', 用户, 数值修饰.整数值(15, 30))
                用户.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air')
                //显示侦测到的信息
                if (实体) {
                    let 位置 = `${Math.floor(实体.location.x)} ${Math.floor(实体.location.y)} ${Math.floor(实体.location.z)}`
                    if (血量) {
                        用户.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b实体名称§7: §2"},${通用组件.查询名称(实体)},{"text":"\n§l§e实体标识§7: §6${实体.typeId}\n§l§e实体血量§7: §2${Math.round(血量.current)}/${血量.value}\n§l§2能否牵引§r: ${!!栓绳}\n${(移速) ? `§l§5常规移速§r: ${移速.value.toFixed(2)}` : ""}\n${(泳速) ? `§l§9水下移速§r: ${泳速.value.toFixed(2)}` : ""}\n§l§6实体位置§7: §e${位置}\n§r========================="}]}`)
                    }
                    else {
                        用户.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b实体名称§7: §2"},${通用组件.查询名称(实体)},{"text":"\n§l§e实体标识§7: §6${实体.typeId}\n§l§6实体位置§7: §e${位置}\n§r========================="}]}`)
                    }
                    通用组件.生成实体('粒子', '提示图标:定位标识', `${Math.floor(实体.location.x)} ${Math.floor(实体.location.y) + 数值修饰.浮点值(1, 2)} ${Math.floor(实体.location.z)}`)
                }
                else if (方块) {
                    let 位置 = `${Math.floor(方块.location.x)} ${Math.floor(方块.location.y)} ${Math.floor(方块.location.z)}`
                    用户.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"=========================\n§l§b方块名称§7: §2"},${通用组件.查询名称(方块, '方块')},{"text":"\n§l§e方块标识§7: §b${方块.typeId}\n§l§6方块位置§7: §e${位置}\n§r========================="}]}`)
                }
                break

            default:
                if (实体) {
                    if (血量) {
                        用户.runCommand(`titleraw @s actionbar {"rawtext":[${通用组件.查询名称(实体)},{"text":"§9 | §2${Math.round(血量.current)}/${血量.value}"}]}`)
                    }
                    else {
                        用户.runCommand(`titleraw @s actionbar {"rawtext":[${通用组件.查询名称(实体)},{"text":"§9 | §6${实体.typeId}"}]}`)
                    }
                }
                else if (方块) {
                    if (用户.isSneaking) {
                        用户.runCommand(`titleraw @s actionbar {"rawtext":[${通用组件.查询名称(方块, '方块')},{"text":"§9 | §6${方块.typeId}"}]}`)
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
    static 物资整理 = function (用户, 类型) {
        //定义实现当前功能所需的变量
        let 实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0]
        let 方块 = 用户.getBlockFromViewVector(new BlockRaycastOptions())
        let 列表 = []
        //清除道具并在等待一段时间后归还
        通用组件.延迟执行('给予物品', '特殊道具:物资整理', 用户, 数值修饰.整数值(10, 30))
        用户.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air')
        //执行功能
        switch (类型) {
            case '点击方块':
                //仅限<箱子>可以执行物品分类
                if (方块.typeId == "minecraft:chest" || 方块.typeId == "minecraft:trapped_chest") {
                    var 容器 = 方块.getComponent("inventory").container
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
                        用户.runCommand(`kill @e[type=item,r=${用户选择.formValues[1]}]`)
                        消息通知.数据驱动('小标题', `§4掉落物已销毁, 该操作不可撤销!`)
                        用户.runCommand('particle 提示图标:通用提示 ~ ~2.35 ~')
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
                                var 容积 = 实体.getComponent("inventory").container
                            }
                            catch {
                                消息通知.数据驱动('小标题', `§7无法获取实体:§6<§c ${实体.typeId} §6>§7的背包信息`)
                            }
                        }
                        else if (方块 && (方块.typeId == "minecraft:chest" || 方块.typeId == "minecraft:trapped_chest")) {
                            var 容积 = 方块.getComponent("inventory").container
                        }
                        var 背包 = 用户.getComponent("inventory").container
                        //执行 向 容器内 注入物品 的流程
                        if (容积) {
                            new Promise(async function () {
                                //获取 目标容器 剩余存储空间
                                var 空间 = 0
                                for (let 位置 = 0; 位置 < 容积.size; 位置++) {
                                    let 物品 = 容积.getItem(位置)
                                    if (!物品) {
                                        空间 += 1
                                    }
                                }
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
                                var 容积 = 实体.getComponent("inventory").container
                            }
                            catch {
                                消息通知.数据驱动('小标题', `§7无法获取实体:§6<§c ${实体.typeId} §6>§7的背包信息`)
                            }
                        }
                        else if (方块 && (方块.typeId == "minecraft:chest" || 方块.typeId == "minecraft:trapped_chest")) {
                            var 容积 = 方块.getComponent("inventory").container
                        }
                        var 背包 = 用户.getComponent("inventory").container
                        //执行 抽取 容器内容 的流程
                        if (容积) {
                            new Promise(async function () {
                                //获取 玩家背包 剩余存储空间
                                var 空间 = 0
                                for (let 位置 = 0; 位置 < 背包.size; 位置++) {
                                    let 物品 = 背包.getItem(位置)
                                    if (!物品) {
                                        空间 += 1
                                    }
                                }
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
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     */
    static 匣里乾坤 = function (用户) {
        //定义实现当前功能所需的变量
        var 玩家名称 = `"${用户.nameTag}"`
        try {
            //匣里乾坤_预处理
            用户.runCommand("function Data/BoxSpace_start")
            //执行<匣里乾坤>的功能流程
            if (!(用户.hasTag('BoxSpace.load'))) {
                //储存附近的实体
                用户.runCommand('tp @e[x=~-5,dx=10,y=~-5,dy=10,z=~-5,dz=10,type=!player] @s')
                用户.runCommand(`structure save ${玩家名称} ~5~5~5 ~-5~-5~-5 true disk true`)
                消息通知.数据驱动('小标题', '§6|§r 正在<§a 收纳 §r>周围的实体 §6|§r', 玩家名称)
                用户.runCommand('function Data/BoxSpace_end')
                用户.addTag('BoxSpace.load')
            }
            else {
                //释放被储存的实体
                用户.runCommand(`structure load ${玩家名称} ~-5~-5~-5 0_degrees none true false`)
                消息通知.数据驱动('小标题', '§6|§r 正在<§d 释放 §r>储存的实体 §6|§r', 玩家名称)
                用户.runCommand('particle 烟雾效果:紫影 ~~~')
                用户.removeTag('BoxSpace.load')
            }
            //归还道具:匣里乾坤
            通用组件.延迟执行('给予物品', '魔法礼盒:匣里乾坤', 用户, 数值修饰.整数值(20, 40))
        }
        catch {
            //当无法找到实体时, 弹出的提示文本
            消息通知.数据驱动('小标题', '§6|§r §c有效范围内没能找到实体§r §6|§r', 玩家名称)
            通用组件.延迟执行('给予物品', '魔法礼盒:匣里乾坤', 用户, 数值修饰.整数值(10, 20))
        }
    }
    /**
     * @param {object} 位置 限制为<坐标型 对象>
     */
    static 结构珍宝 = function (位置) {
        let 生成 = 坐标信息.获取地面(位置).split(/\s/)
        switch (数值修饰.整数值(0, 7)) {
            case 0:
                获取维度.runCommand(`structure load 环境建筑:荒原蜂塔 ${生成[0] - 4} ${生成[1] - 1} ${生成[2] - 4} 0_degrees none true true`)
                break

            case 1:
                获取维度.runCommand(`structure load 环境建筑:森林蜂塔 ${生成[0] - 4} ${生成[1] - 1} ${生成[2] - 4} 0_degrees none true true`)
                break

            case 2:
                获取维度.runCommand(`structure load 环境建筑:巨型橡树 ${生成[0] - 10} ${生成[1] - 1} ${生成[2] - 10} 0_degrees none true true`)
                break

            case 3:
                获取维度.runCommand(`structure load 环境建筑:小型营地 ${生成[0] - 8} ${生成[1] - 1} ${生成[2] - 8} 0_degrees none true true`)
                break

            case 4:
                获取维度.runCommand(`structure load 环境建筑:幻生遗居 ${生成[0] - 12} ${生成[1] - 1} ${生成[2] - 12} 0_degrees none true true`)
                break

            case 5:
                获取维度.runCommand(`structure load 环境建筑:星辉旧居 ${生成[0] - 10} ${生成[1] - 6} ${生成[2] - 10} 0_degrees none true true`)
                break

            case 6:
                获取维度.runCommand(`structure load 环境建筑:若水鲸塔 ${生成[0] - 8} ${生成[1] - 30} ${生成[2] - 8} 0_degrees none true true`)
                break

            case 7:
                获取维度.runCommand(`structure load 环境建筑:岩矿采掘 ${生成[0] - 4} ${生成[1] - 2} ${生成[2] - 4} 0_degrees none true true`)
                break

            case 8:
                获取维度.runCommand(`structure load 环境建筑:弹药仓库 ${生成[0] - 3} ${生成[1] - 2} ${生成[2] - 3} 0_degrees none true true`)
                break
        }
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
        消息通知.数据驱动('聊天栏', `${文案前言()}: < ${生成[0]} ${生成[1]} ${生成[2]} > ${文案后言()}`)
    }
    /**
     * @param {object} 用户 此参数限制为: <玩家类 对象>
     */
    static 魔晶弹珠 = function (用户) {
        //定义功能变量
        let 实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0]
        let 背包 = 用户.getComponent("inventory").container
        let 伤害 = 1.0
        let 暴击 = 1.0
        let 爆伤 = 1.5
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
                实体.runCommandAsync(`damage @s ${Math.floor(伤害 * 爆伤)} entity_attack entity @p`)
            }
            else {
                实体.runCommandAsync(`damage @s ${Math.floor(伤害)} entity_attack entity @p`)
            }
            //播放 效果 并 消耗物品
            用户.runCommandAsync('playsound random.bow @s ~~~ 0.5')
            用户.runCommandAsync('clear @s 魔法工具:魔晶弹珠 0 1')
            实体.runCommandAsync('particle 烟雾效果:猩红 ~~~')
        }
    }
    /**
     * @param {object} 用户 此参数限制为: <实体类 对象>
     * @param {string} 类型 此参数限制为: <道具模式>
     */
    static 仓储过滤 = function (用户, 模式) {
        switch (模式) {
            case '道具模式':
                let 实体 = 用户.getEntitiesFromViewVector({ EntityRaycastOptions })[0]
                if (实体 && 实体.typeId == '列车组:挖掘') {
                    //显示将被清除的方块
                    实体.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 ${数据标签.读取方块('拟态矩阵_标记方块', 用户)}`)
                    //保存需要清除的方块信息
                    数据标签.存储方块('仓储过滤', 实体, 数据标签.读取方块('拟态矩阵_标记方块', 用户))
                    //清除道具并在等待一段时间后归还
                    通用组件.延迟执行('给予物品', '载具控制:仓储过滤', 用户, 数值修饰.整数值(10, 30))
                    用户.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air')
                    //播放操作音效
                    用户.runCommand('playsound tile.piston.out @a[r=15] ~~~')
                }
                break

            default:
                let 容器 = 用户.getComponent("inventory").container
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
}