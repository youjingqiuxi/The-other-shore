/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 / Tayun_Starry ]
*/
<<<<<<< Updated upstream
=======

//导入 功能接口
import { BlockLocation, BlockProperties, ItemStack, ItemTypes, world } from "@minecraft/server"
import { MessageFormData } from "@minecraft/server-ui"

//定义 全局变量
export let 获取维度 = world.getDimension('minecraft:overworld')
/**
 * @param {object} 修正 限制为: <实体类 对象>
 */
export let 维度修正 = function (修正) { 获取维度 = 修正.dimension; /*修正.runCommandAsync(`say ${获取维度.id}`)*/ }

//定义 类
export class 通用组件 {
    /**
     * @param {string} 类型 限制为: <实体><物品><粒子>
     * @param {string} 目标 需要生成的<对象>的完整标识符
     * @param {string|object} 位置 指定的生成实体的坐标
     * @param {number|string} 修饰A 生成物品的数量 | 生成实体的事件
     * @param {number|string} 修饰B 生成物品的数值 | 生成实体的名称
     */
    static 生成实体 = function (类型, 目标, 位置, 修饰A = 1, 修饰B = 0) {
        switch (typeof (位置)) {
            case 'string':
                var 运算 = 位置.split(/\s/)
                var 坐标 = new 坐标信息(运算[0], 运算[1], 运算[2])
                break

            default:
                var 坐标 = 位置
                break
        }
        switch (类型) {
            case '物品':
                获取维度.spawnItem(new ItemStack(ItemTypes.get(目标), 修饰A, 修饰B), 坐标)
                break
>>>>>>> Stashed changes

//导入< Beta_API >预设接口
import {
    MessageFormData,
    ActionFormData,
    ModalFormData
} from "@minecraft/server-ui"

import {
    EntityRaycastOptions,
    BlockRaycastOptions,
    BlockLocation,
    world
} from "@minecraft/server"

export class 通用组件 {
    /**
     * @param {string} 类型 限制为: < 快捷消息 | 原版指令 | ... >
     * @param {string} 内容 需要执行的 内容 或 指令
     * @param {object} 用户 限制为: <玩家类 对象>
     * @param {value} 延迟 等待多少<游戏刻>后执行
     * @returns {Promise<any>|run.command}
     */
    static 延迟执行 = function (类型, 内容, 用户, 延迟 = 20) {
        //定义实现当前功能所需的变量
        var 玩家名称 = `"` + `${用户.nameTag}` + `"`
        //执行接口功能
        return new Promise(async function () {
            let 等待执行 = function () {
                if (延迟 == 0) {
                    //当倒计时完成时, 执行预先设置好的内容
                    switch (类型) {
                        case '快捷消息':
                            通用组件.快捷消息([内容], 玩家名称)
                            break

                        case '原版指令':
                            用户.runCommandAsync(`${内容}`)
                            break

                        case '给予物品':
                            用户.runCommandAsync(`give @s ${内容}`)
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
     * @param {value} 数值A 取值区间的最小值
     * @param {value} 数值B 取值区间的最大值
     * @param {string} 类型 限制为: < A--B | --B | A-- >
     * @returns {value}
     */
    static 随机数值 = function (数值A, 数值B, 类型 = 'A--B') {
        switch (类型) {
            //包含 <数值A> 与 <数值B> 的区间内正整数
            case 'A--B':
                return Math.floor(Math.random() * (数值B - 数值A + 1) + 数值A)

            //不包含 <数值A> 但包含 <数值B> 的区间内正整数
            case '--B':
                return Math.floor(Math.random() * (数值B - 数值A) + 数值A) + 1

            //不包含 <数值B> 但包含 <数值A> 的区间内正整数
            case 'A--':
                return Math.floor(Math.random() * (数值B - 数值A) + 数值A)
        }
    }
    /**
     * @param {string} 内容 需要显示的内容
     * @param {string} 目标 限制为: <玩家名称><目标选择器>
     * @param {string} 附加 需要追加显示的内容
     * @param {string} 类型 限制为: <主标题><副标题><小标题>
     * @returns {run.command}
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
     * @param {object} 用户 限制为: <玩家类 对象>
     * @param {string} 标题 显示的界面标题
     * @param {string} 内容 显示的界面内容
     * @returns {show}
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
     * @param {string} 内容 需要显示的内容
     * @param {string} 目标 限制为: <玩家名称><目标选择器>
     * @param {string} 附加 需要追加显示的内容
     * @returns {run.command}
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
     * @param {object} 目标 限制为: <实体类 对象>
     * @param {string} 类型 限制为: < entity | block | ...>
     * @param {string} 用户 限制为: <玩家名称><目标选择器>
     * @returns {run.command | string}
     */
    static 查询名称 = function (目标, 类型, 用户) {
        //定义实现当前功能所需的变量
        let 查询_命名空间 = 目标.typeId.split(':')
        //实现接口功能
        switch (类型) {
            case 'entity':
                try {
                    world.getDimension("overworld").runCommand(`tellraw ${用户} {"rawtext":[{"translate":"entity.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.typeId}.name"}]}`)
                }
                catch {
                    world.getDimension("overworld").runCommand(`tellraw @a {"rawtext":[{"translate":"entity.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.typeId}.name"}]}`)
                }
                break

<<<<<<< Updated upstream
            case 'block':
                try {
                    world.getDimension("overworld").runCommand(`tellraw ${用户} {"rawtext":[{"translate":"tile.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.typeId}.name"}]}`)
                }
                catch {
                    world.getDimension("overworld").runCommand(`tellraw @a {"rawtext":[{"translate":"tile.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.typeId}.name"}]}`)
                }
                break
=======
            case '方块':
                let 方块排列 = 目标.permutation
                let 附加
                let 标识
                switch (目标.typeId) {
                    case 'minecraft:undyed_shulker_box': case 'minecraft:shulker_box':
                        标识 = 'shulkerBox'
                        break

                    case 'minecraft:lit_deepslate_redstone_ore':
                        标识 = 'deepslate_redstone_ore'
                        break

                    case 'minecraft:lit_blast_furnace':
                        标识 = 'blast_furnace'
                        break

                    case 'minecraft:lit_redstone_ore':
                        标识 = 'redstone_ore'
                        break

                    case 'minecraft:concrete_powder':
                        标识 = 'concretePowder'
                        break

                    case 'minecraft:lit_furnace':
                        标识 = 'furnace'
                        break

                    case 'minecraft:lit_smoker':
                        标识 = 'smoker'
                        break

                    case 'minecraft:carrots':
                        标识 = 'carrot'
                        break

                    case 'minecraft:log2':
                        标识 = 'log'
                        break

                    default:
                        if (目标.typeId.includes('glazed_terracotta')) {
                            标识 = `glazedTerracotta.${目标.typeId.slice(10, -18)}`
                        }
                        else if (查询_命名空间[0] == 'minecraft') {
                            标识 = 查询_命名空间[1]
                        }
                        else {
                            标识 = 目标.typeId
                        }
                }
                switch (目标.typeId) {
                    //自然类
                    case 'minecraft:coral_block': case 'minecraft:coral': case 'minecraft:coral_fan': case 'minecraft:coral_fan_dead':
                        附加 = 方块排列.getProperty(BlockProperties.coralColor).value
                        break

                    case 'minecraft:prismarine':
                        let 海晶类型 = 方块排列.getProperty(BlockProperties.prismarineBlockType).value
                        switch (海晶类型) {
                            case 'default':
                                附加 = 'rough'
                                break

                            default:
                                附加 = 海晶类型
                                break
                        }
                        break

                    case 'minecraft:sponge':
                        附加 = 方块排列.getProperty(BlockProperties.spongeType).value
                        break

                    case 'minecraft:stone':
                        let 石头类型 = 方块排列.getProperty(BlockProperties.stoneType).value
                        if (石头类型.includes('_')) {
                            附加 = 'stone'
                        }
                        else {
                            附加 = 石头类型
                        }
                        break

                    //建材类
                    case 'minecraft:stained_glass': case 'minecraft:stained_glass_pane':
                        附加 = 方块排列.getProperty(BlockProperties.color).value
                        break

                    case 'minecraft:concrete': case 'minecraft:concrete_powder':
                        let 水泥类型 = 方块排列.getProperty(BlockProperties.color).value
                        if (水泥类型.includes('_')) {
                            附加 = 'white'
                        }
                        else {
                            附加 = 水泥类型
                        }
                        break

                    case 'minecraft:cobblestone_wall':
                        let 墙壁类型 = 方块排列.getProperty(BlockProperties.wallBlockType).value
                        switch (墙壁类型) {
                            case 'cobblestone':
                                附加 = 'normal'
                                break

                            case 'mossy_cobblestone':
                                附加 = 'mossy'
                                break

                            default:
                                附加 = 墙壁类型
                                break
                        }
                        break

                    case 'minecraft:purpur_block':
                        附加 = 方块排列.getProperty(BlockProperties.chiselType).value
                        break

                    case 'minecraft:wood':
                        附加 = 方块排列.getProperty(BlockProperties.woodType).value
                        break

                    //植物类
                    case 'minecraft:brown_mushroom_block':
                        附加 = 'cap'
                        break

                    case 'minecraft:crimson_roots':
                        附加 = 'crimsonRoots'
                        break

                    case 'minecraft:warped_roots':
                        附加 = 'warpedRoots'
                        break

                    case 'minecraft:double_plant':
                        附加 = 方块排列.getProperty(BlockProperties.doublePlantType).value
                        break

                    case 'minecraft:seagrass':
                        附加 = 'seagrass'
                        break

                    case 'minecraft:sapling':
                        let 树苗类型 = 方块排列.getProperty(BlockProperties.saplingType).value
                        switch (树苗类型) {
                            case 'dark_oak':
                                附加 = 'big_oak'
                                break

                            default:
                                附加 = 树苗类型
                                break
                        }
                        break

                    case 'minecraft:leaves2':
                        let 树叶类型 = 方块排列.getProperty(BlockProperties.newLeafType).value
                        switch (树叶类型) {
                            case 'dark_oak':
                                附加 = 'big_oak'
                                break

                            default:
                                附加 = 树叶类型
                                break
                        }
                        break

                    case 'minecraft:leaves':
                        附加 = 方块排列.getProperty(BlockProperties.oldLeafType).value
                        break

                    case 'minecraft:log2':
                        let 原木类型 = 方块排列.getProperty(BlockProperties.newLogType).value
                        switch (原木类型) {
                            case 'dark_oak':
                                附加 = 'big_oak'
                                break
>>>>>>> Stashed changes

            case 'return_entity':
                if (目标.typeId == 'minecraft:player') {
                    return `{ "text": "${目标.name}" }`
                }
                else {
                    return `{ "translate": "entity.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.typeId}.name" }`
                }

            case 'return_block':
                return `{ "translate": "tile.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.typeId}.name" }`
        }
    }
}
export class 数据标签 {
    /**
    * @param {string} 类型 定义了需要储存的<方块ID>的标签名称
    * @param {carry} 用户 此参数限制为: <玩家类 对象>
    * @returns {string}
    */
    static 存储方块 = function (类型, 用户, 方块) {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
        for (let 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${类型}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                let 待删除_方块类型 = 标签数据[类型]["方块类型"]
                //整合 获得的 方块信息
                let 待删除_方块信息 = {
                    [类型]: {
                        "方块类型": 待删除_方块类型
                    }
                }
                //移除无用的方块信息
                用户.removeTag(JSON.stringify(待删除_方块信息))
            }
        }
        //整合 当前的 方块数据
        let 方块信息 = {
            [类型]: {
                "方块类型": 方块
            }
        }
        //添加对应的标签
        用户.addTag(JSON.stringify(方块信息))
    }
    /**
     * @param {string} 类型 定义了需要读取的<方块ID>的标签名称
     * @param {carry} 用户 此参数限制为: <玩家类 对象>
     * @returns {string}
     */
    static 读取方块 = function (类型, 用户) {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
        for (let 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${类型}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的 数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                let 方块类型 = 标签数据[类型]["方块类型"]
                //输出 标签中 的 数据
                return `${方块类型}`
            }
        }
    }
    /**
     * @param {object} 用户 限制为: <玩家类 对象>
     * @param {string} 名称 需要清理的物品名称, 最多8个, 使用空格分隔
     */
    static 移除物品 = function (用户, 名称) {
        //获取背包空间
        let 背包 = 用户.getComponent('minecraft:inventory').container
        //查找 并 清除 背包空间中 指定物品
        if (名称) {
            for (let 循环 = 0; 循环 < 8; 循环++) {
                let 项目 = 名称.split(/\s/)[循环]
                if (项目) {
                    for (let 位置 = 0; 位置 < 背包.size; 位置++) {
                        let 物品 = 背包.getItem(位置)
                        if (物品 && 物品.typeId == 项目) {
                            背包.setItem(位置, new ItemStack(ItemTypes.get('minecraft:tnt'), 0, 0))
                            位置 += 背包.size
                        }
                    }
                }
                else {
                    循环 = 8
                }
            }
        }
        //清除当前手持物品
        背包.setItem(用户.selectedSlot, new ItemStack(ItemTypes.get('minecraft:tnt'), 0, 0))
    }
}
export class 坐标信息 {
    /**
    * @param {object} 用户 限制为: <玩家类 对象>
    * @param {string} A坐标 需要计算的<坐标点>名称
    * @param {string} B坐标 需要计算的<坐标点>名称
<<<<<<< Updated upstream
    * @param {string} 类型 限制为: <获取体积> / <随机坐标>
    * @returns {string}
=======
    * @param {string} 类型 限制为: <获取体积><随机坐标><查询界限><获取向量>
    * @param {string} 查询 查询该坐标是否在范围内, 仅限<查询界限>使用
>>>>>>> Stashed changes
    */
    static 计算区间 = function (用户, A坐标, B坐标, 类型 = '获取体积') {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
        for (let 目标标签 in 查询标签) { //循环 获取标签 
            //如果 有标签 就 根据标签 执行 指定功能
            if (查询标签[目标标签].startsWith(`{"${A坐标}":{`)) {
                //读取 标签中 的 数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                var A坐标_X = 标签数据[A坐标]['坐标X']
                var A坐标_Y = 标签数据[A坐标]['坐标Y']
                var A坐标_Z = 标签数据[A坐标]['坐标Z']
            }
            //如果 有标签 就 根据标签 执行 指定功能
            if (查询标签[目标标签].startsWith(`{"${B坐标}":{`)) {
                //读取 标签中 的 数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                var B坐标_X = 标签数据[B坐标]['坐标X']
                var B坐标_Y = 标签数据[B坐标]['坐标Y']
                var B坐标_Z = 标签数据[B坐标]['坐标Z']
            }
        }
<<<<<<< Updated upstream
=======
        //计算坐标区间的绝对值
        let 区间_X = Math.abs(Math.abs(A坐标_X) - Math.abs(B坐标_X))
        let 区间_Y = Math.abs(Math.abs(A坐标_Y) - Math.abs(B坐标_Y))
        let 区间_Z = Math.abs(Math.abs(A坐标_Z) - Math.abs(B坐标_Z))
        //获取 X轴 区间极限
        let 上限_X = A坐标_X >= B坐标_X ? A坐标_X : B坐标_X
        let 下限_X = A坐标_X <= B坐标_X ? A坐标_X : B坐标_X
        //获取 Y轴 区间极限
        let 上限_Y = A坐标_Y >= B坐标_Y ? A坐标_Y : B坐标_Y
        let 下限_Y = A坐标_Y <= B坐标_Y ? A坐标_Y : B坐标_Y
        //获取 Z轴 区间极限
        let 上限_Z = A坐标_Z >= B坐标_Z ? A坐标_Z : B坐标_Z
        let 下限_Z = A坐标_Z <= B坐标_Z ? A坐标_Z : B坐标_Z
        //计算坐标区间的向量值
        let 向量_X = B坐标_X - A坐标_X
        let 向量_Y = B坐标_Y - A坐标_Y
        let 向量_Z = B坐标_Z - A坐标_Z
        if (查询) {
            switch (typeof (查询)) {
                case 'string':
                    var 运算 = 查询.split(/\s/)
                    var 坐标 = new 坐标信息(运算[0], 运算[1], 运算[2])
                    break

                default:
                    var 坐标 = 查询
                    break
            }
            //获取 X轴 区间极限
            var 界限_X = (坐标.x > 下限_X && 坐标.x < 上限_X) ? 1 : 0
            //获取 Y轴 区间极限
            var 界限_Y = (坐标.y > 下限_Y && 坐标.y < 上限_Y) ? 1 : 0
            //获取 Z轴 区间极限
            var 界限_Z = (坐标.z > 下限_Z && 坐标.z < 上限_Z) ? 1 : 0
        }
>>>>>>> Stashed changes
        switch (类型) {
            case '获取体积':
                //计算坐标区间的绝对值
                let X轴区间 = Math.abs(Math.abs(A坐标_X) - Math.abs(B坐标_X))
                let Y轴区间 = Math.abs(Math.abs(A坐标_Y) - Math.abs(B坐标_Y))
                let Z轴区间 = Math.abs(Math.abs(A坐标_Z) - Math.abs(B坐标_Z))
                //返回计算后 的 坐标区间 的 数值
                return `${(X轴区间 != 0 ? X轴区间 + 1 : 1) * (Y轴区间 != 0 ? Y轴区间 + 1 : 1) * (Z轴区间 != 0 ? Z轴区间 + 1 : 1)}`

            case '随机坐标':
                //获取 X轴 区间极限
                let X_最大值 = A坐标_X >= B坐标_X ? A坐标_X : B坐标_X
                let X_最小值 = A坐标_X <= B坐标_X ? A坐标_X : B坐标_X
                //获取 Y轴 区间极限
                let Y_最大值 = A坐标_Y >= B坐标_Y ? A坐标_Y : B坐标_Y
                let Y_最小值 = A坐标_Y <= B坐标_Y ? A坐标_Y : B坐标_Y
                //获取 Z轴 区间极限
                let Z_最大值 = A坐标_Z >= B坐标_Z ? A坐标_Z : B坐标_Z
                let Z_最小值 = A坐标_Z <= B坐标_Z ? A坐标_Z : B坐标_Z
                //返回计算后 的 坐标 的随机数值
<<<<<<< Updated upstream
                return `${通用组件.随机数值(X_最大值, X_最小值)} ${通用组件.随机数值(Y_最大值, Y_最小值)} ${通用组件.随机数值(Z_最大值, Z_最小值)}`
=======
                return `${数值修饰.整数值(上限_X, 下限_X)} ${数值修饰.整数值(上限_Y, 下限_Y)} ${数值修饰.整数值(上限_Z, 下限_Z)}`

            case '查询界限':
                //返回给定的坐标是否在范围内
                return `=====\n ${界限_X} ${界限_Y} ${界限_Z} \n ${界限_X + 界限_Y + 界限_Z == 3 ? true : false} \n=====`

            case '获取向量':
                return `${向量_X} ${向量_Y} ${向量_Z}`
        }
    }
    /**
    * @param {object} 位置 执行流程的原始坐标
    * @param {number} 范围 寻找地面的最大范围, 建议值:16~128
    * @param {number} 高度 寻找地面的最低高度, 建议值:-64~128
    */
    static 获取地面 = function (位置, 范围 = 256, 高度 = 60) {
        /**
        * @param {object} 方块 限制为: <方块类 对象>
        */
        let 地面判定 = function (方块) {
            switch (方块.typeId) {
                case 'minecraft:air':
                    break
                //流体
                case 'minecraft:lava':
                    break

                case 'minecraft:water':
                    break

                case 'minecraft:flowing_lava':
                    break

                case 'minecraft:flowing_water':
                    break
                //树叶
                case 'minecraft:leaves':
                    break

                case 'minecraft:leaves2':
                    break

                case 'minecraft:azalea_leaves':
                    break
>>>>>>> Stashed changes

            default:
                break
        }
    }
    /**
    * @param {string} 名称 需要查询的<坐标数值>的名称
    * @param {object} 用户 限制为: <玩家类 对象>
    * @param {string} 轴向 限制为:  < X > / < Y > / < Z > 
    * @param {value} 偏移 用于修改 输出 的 返回值
    * @returns {string}
    */
    static 轴向偏移 = function (名称, 用户, 轴向, 偏移 = 0) {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
        for (let 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${名称}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的 数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                let 坐标信息_X = 标签数据[名称]['坐标X']
                let 坐标信息_Y = 标签数据[名称]['坐标Y']
                let 坐标信息_Z = 标签数据[名称]['坐标Z']
                //输出 标签中 的 数据
                switch (轴向) {
                    case 'X':
                        return `${坐标信息_X + 偏移}`

                    case 'Y':
                        return `${坐标信息_Y + 偏移}`

                    case 'Z':
                        return `${坐标信息_Z + 偏移}`
                }
            }
        }
    }
    /**
    * @param {string} 名称 需要保存的<坐标数值>的名称
    * @param {object} 用户 限制为: <玩家类 对象>
    * @param {string} X轴 需要保存的坐标数值
    * @param {string} Y轴 需要保存的坐标数值
    * @param {string} Z轴 需要保存的坐标数值
    * @returns {string}
    */
    static 保存坐标 = function (名称, 用户, X轴, Y轴, Z轴) {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
<<<<<<< Updated upstream
        for (let 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${名称}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                let 待删除_坐标X = 标签数据[名称]['坐标X']
                let 待删除_坐标Y = 标签数据[名称]['坐标Y']
                let 待删除_坐标Z = 标签数据[名称]['坐标Z']
                //整合 获得的 坐标数据
                let 待删除_坐标点 = {
                    [名称]: {
                        '坐标X': 待删除_坐标X,
                        '坐标Y': 待删除_坐标Y,
                        '坐标Z': 待删除_坐标Z,
                    }
                }
                //移除无用的坐标
                用户.removeTag(JSON.stringify(待删除_坐标点))
            }
        }
        //整合 当前的 坐标数据
        let 坐标点 = {
            [名称]: {
                '坐标X': X轴,
                '坐标Y': Y轴,
                '坐标Z': Z轴,
            }
=======
        switch (typeof (位置)) {
            case 'string':
                var 运算 = 位置.split(/\s/)
                var 坐标 = new 坐标信息(运算[0], 运算[1], 运算[2])
                break

            default:
                var 坐标 = 位置
                break
>>>>>>> Stashed changes
        }
        //添加对应的标签
        用户.addTag(JSON.stringify(坐标点))
    }
    /**
    * @param {string} 名称 需要保存的<坐标数值>的名称
    * @param {object} 用户 限制为: <玩家类 对象>
    * @param {object} 位置 限制为: <坐标类 对象>
    * @returns {string}
    */
    static 数据保存 = function (名称, 用户, 位置) {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
        for (let 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${名称}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                let 待删除_坐标X = 标签数据[名称]['坐标X']
                let 待删除_坐标Y = 标签数据[名称]['坐标Y']
                let 待删除_坐标Z = 标签数据[名称]['坐标Z']
                //整合 获得的 坐标数据
                let 待删除_坐标点 = {
                    [名称]: {
                        '坐标X': 待删除_坐标X,
                        '坐标Y': 待删除_坐标Y,
                        '坐标Z': 待删除_坐标Z,
                    }
                }
                //移除无用的坐标
                用户.removeTag(JSON.stringify(待删除_坐标点))
            }
        }
        //整合 当前的 坐标数据
        let 坐标点 = {
            [名称]: {
                '坐标X': 位置.x,
                '坐标Y': 位置.y,
                '坐标Z': 位置.z,
            }
        }
        //添加对应的标签
        用户.addTag(JSON.stringify(坐标点))
    }
    /**
    * @param {string} 名称 需要读取的<坐标数值>的名称
    * @param {object} 用户 限制为: <玩家类 对象>
    * @returns {string}
    */
    static 数据解析 = function (名称, 用户) {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
        for (let 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${名称}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //获得 标签中 的 数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                let 坐标信息_X = 标签数据[名称]['坐标X']
                let 坐标信息_Y = 标签数据[名称]['坐标Y']
                let 坐标信息_Z = 标签数据[名称]['坐标Z']
                //输出 标签中 的 数据
                return `${坐标信息_X} ${坐标信息_Y} ${坐标信息_Z}`
            }
        }
    }
    /**
    * @param {string} 名称 需要移除的<坐标数值>的标签名称
    * @param {carry} 用户 限制为: <玩家类 对象>
    * @returns {string}
    */
    static 数据移除 = function (名称, 用户) {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
        for (let 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${名称}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                let 待删除_坐标X = 标签数据[名称]['坐标X']
                let 待删除_坐标Y = 标签数据[名称]['坐标Y']
                let 待删除_坐标Z = 标签数据[名称]['坐标Z']
                //整合 获得的 坐标数据
                let 待删除_坐标点 = {
                    [名称]: {
                        '坐标X': 待删除_坐标X,
                        '坐标Y': 待删除_坐标Y,
                        '坐标Z': 待删除_坐标Z,
                    }
                }
                //移除无用的坐标
                用户.removeTag(JSON.stringify(待删除_坐标点))
            }
        }
    }
<<<<<<< Updated upstream
=======
    /**
     * @param {object|number} X X轴 的数值 或 <坐标类 对象>
     * @param {number} Y Y轴 的数值
     * @param {number} Z Z轴 的数值
     * @remarks 创建虚拟的<方块类>的<坐标类 对象>
     */
    constructor(X轴, Y轴, Z轴) {
        switch (typeof (X轴)) {
            case 'object':
                return new BlockLocation(Math.floor(X轴.location.x), Math.floor(X轴.location.y), Math.floor(X轴.location.z))

            default:
                return new BlockLocation(Math.floor(X轴), Math.floor(Y轴), Math.floor(Z轴))
        }
    }
}
export class 消息通知 {
    /**
     * @param {string} 类型 限制为: <主标题><副标题><小标题><聊天栏>
     * @param {string} 内容 需要显示的内容
     * @param {string} 用户 限制为: <玩家类 对象><目标选择器>
     * @param {string} 附加 需要追加显示的内容
     */
    static 数据驱动 = function (类型, 内容, 用户, 附加) {
        if (用户) {
            switch (typeof (用户)) {
                case 'object':
                    switch (类型) {
                        case '主标题':
                            用户.runCommandAsync(`titleraw @s title {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break

                        case '副标题':
                            用户.runCommandAsync(`titleraw @s subtitle {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break

                        case '小标题':
                            用户.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break

                        case '聊天栏':
                            用户.runCommandAsync(`tellraw @s {"rawtext":[{"text":"666+${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break
                    }
                    break

                default:
                    switch (类型) {
                        case '主标题':
                            获取维度.runCommandAsync(`titleraw ${用户} title {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break

                        case '副标题':
                            获取维度.runCommandAsync(`titleraw ${用户} subtitle {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break

                        case '小标题':
                            获取维度.runCommandAsync(`titleraw ${用户} actionbar {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break

                        case '聊天栏':
                            获取维度.runCommandAsync(`tellraw ${用户} {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break
                    }
                    break
            }
        }
        else {
            switch (类型) {
                case '主标题':
                    获取维度.runCommandAsync(`titleraw @a title {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                    break

                case '副标题':
                    获取维度.runCommandAsync(`titleraw @a subtitle {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                    break

                case '小标题':
                    获取维度.runCommandAsync(`titleraw @a actionbar {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                    break

                case '聊天栏':
                    获取维度.runCommandAsync(`tellraw @a {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                    break
            }
        }
    }
    /**
     * @param {object} 用户 限制为: <玩家类 对象>
     * @param {string} 标题 显示的界面标题
     * @param {string} 内容 显示的界面内容
     */
    static 界面显示 = function (用户, 标题, 内容) {
        //定义当前界面所用到的各项元素
        var 页面元素 = new MessageFormData()
            .title(标题)
            .body(内容)
            .button1("查看 当前坐标")
            .button2("退出 通知界面")
        页面元素.show(用户).then((用户选择) => {
            if (用户选择.selection == 1) {
                消息通知.数据驱动('小标题', `您当前的坐标为: || ${用户.location.x} || ${用户.location.y} || ${用户.location.z} ||`)
            }
        }
        )
    }
}
export class 数值修饰 {
    /**
     * @param {number} 数值A 取值区间的最小值
     * @param {number} 数值B 取值区间的最大值
     * @param {string} 类型 限制为: < A--B >< --B >< A-- >
     * @example 输出< 取值区间 >的一组 随机 整数值
     */
    static 整数值 = function (数值A, 数值B, 类型 = 'A--B') {
        switch (类型) {
            //包含 <数值A> 与 <数值B> 的区间内的整数
            case 'A--B':
                return Math.floor(Math.random() * (数值B - 数值A + 1) + 数值A)

            //不包含 <数值A> 但包含 <数值B> 的区间内的整数
            case '--B':
                return Math.floor(Math.random() * (数值B - 数值A) + 数值A) + 1

            //不包含 <数值B> 但包含 <数值A> 的区间内的整数
            case 'A--':
                return Math.floor(Math.random() * (数值B - 数值A) + 数值A)
        }
    }
    /**
     * @param {number} 数值A 取值区间的最小值
     * @param {number} 数值B 取值区间的最大值
     * @param {string} 类型 限制为: < A--B >< --B >< A-- >
     * @example 输出< 取值区间 >的一组 随机 浮点值
     */
    static 浮点值 = function (数值A, 数值B, 类型 = 'A--B') {
        switch (类型) {
            //包含 <数值A> 与 <数值B> 的区间内的数
            case 'A--B':
                return (Math.random() * (数值B - 数值A + 1) + 数值A)

            //不包含 <数值A> 但包含 <数值B> 的区间内的数
            case '--B':
                return (Math.random() * (数值B - 数值A) + 数值A) + 1

            //不包含 <数值B> 但包含 <数值A> 的区间内的数
            case 'A--':
                return (Math.random() * (数值B - 数值A) + 数值A)
        }
    }
    /**
     * @param {number} 数值A 取值区间的最小值
     * @param {number} 数值B 取值区间的最大值
     * @param {string} 类型 限制为: < A--B >< --B >< A-- >
     * @example 输出< 取值区间 >限制范围内的数值, 并根据需求修饰数值
     */
    static 钳位值 = function (测试值, 上限值, 下限值, 倍数值 = 1, 单调性 = 0, 输出型 = 0) {
        测试值 = ((测试值 >= 上限值) ? 上限值 : (测试值 <= 下限值) ? 下限值 : 测试值)
        switch (单调性) {
            case 0:
                return 输出型 == 0 ? 测试值 * 倍数值 : Math.floor(测试值 * 倍数值)

            case 1:
                return 输出型 == 0 ? Math.abs(测试值 * 倍数值) : Math.floor(Math.abs(测试值 * 倍数值))

            case -1:
                return 输出型 == 0 ? -Math.abs(测试值 * 倍数值) : Math.floor(-Math.abs(测试值 * 倍数值))
        }
    }
}
export class 数据标签 {
    //方块信息类 数据标签
    /**
    * @param {string} 类型 定义了需要储存的<方块ID>的标签名称
    * @param {object} 用户 此参数限制为: <实体类 对象>
    * @param {string} 方块 定义了需要储存的信息
    */
    static 存储方块 = function (类型, 用户, 方块) {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
        for (let 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${类型}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                let 待删除_方块类型 = 标签数据[类型]["方块类型"]
                //整合 获得的 方块信息
                let 待删除_方块信息 = {
                    [类型]: {
                        "方块类型": 待删除_方块类型
                    }
                }
                //移除无用的方块信息
                用户.removeTag(JSON.stringify(待删除_方块信息))
            }
        }
        //整合 当前的 方块数据
        let 方块信息 = {
            [类型]: {
                "方块类型": 方块
            }
        }
        //添加对应的标签
        用户.addTag(JSON.stringify(方块信息))
    }
    /**
     * @param {string} 类型 定义了需要读取的<方块ID>的标签名称
     * @param {object} 用户 此参数限制为: <实体类 对象>
     */
    static 读取方块 = function (类型, 用户) {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
        for (let 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${类型}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的 数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                let 方块类型 = 标签数据[类型]["方块类型"]
                //输出 标签中 的 数据
                return `${方块类型}`
            }
        }
    }
    //数值信息类 数据标签
    /**
    * @param {string} 类型 定义了需要<储存>的数据类型名称
    * @param {object} 用户 此参数限制为: <实体类 对象>
    * @param {number} 数值 定义了需要储存的信息
    */
    static 存储数值 = function (类型, 用户, 数值) {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
        for (let 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${类型}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                let 待删除_数据值 = 标签数据[类型]["数据值"]
                //整合 获得的 数值信息
                let 待删除_数值信息 = {
                    [类型]: {
                        "数据值": 待删除_数据值
                    }
                }
                //移除无用的数值信息
                用户.removeTag(JSON.stringify(待删除_数值信息))
            }
        }
        //整合 当前的 数值数据
        let 数值信息 = {
            [类型]: {
                "数据值": 数值
            }
        }
        //添加对应的标签
        用户.addTag(JSON.stringify(数值信息))
    }
    /**
    * @param {string} 类型 定义了需要<读取>的数据类型名称
    * @param {object} 用户 此参数限制为: <实体类 对象>
    */
    static 读取数值 = function (类型, 用户) {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
        for (let 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${类型}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的 数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                let 输出数据 = 标签数据[类型]["数据值"]
                //输出 标签中 的 数据
                return Math.floor(输出数据)
            }
        }
    }
    /**
    * @param {string} 类型 定义了需要<移除>的数据类型名称
    * @param {object} 用户 此参数限制为: <实体类 对象>
    */
    static 移除数值 = function (类型, 用户) {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
        for (let 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${类型}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的数据
                let 标签数据 = JSON.parse(查询标签[目标标签])
                let 待删除_数据值 = 标签数据[类型]["数据值"]
                //整合 获得的 数值信息
                let 待删除_数值信息 = {
                    [类型]: {
                        "数据值": 待删除_数据值
                    }
                }
                //移除无用的数值信息
                用户.removeTag(JSON.stringify(待删除_数值信息))
            }
        }
    }
}
export class 图形绘制 {
    //效率优先
    /**
    * @example < 单线程 >< 效率 >优先型策略
    * @param {string} X轴 请勿过大, 使用< 空格 >分隔多组数值
    * @param {string} Y轴 请勿过大, 使用< 空格 >分隔多组数值
    * @param {string} Z轴 请勿过大, 使用< 空格 >分隔多组数值
    * @param {object} 起点 绘制图形的起点, 此参数限制为: <坐标类 对象>
    * @param {string} 粒子 用于显示的粒子效果, 使用完整命名空间进行定义
    */
    static α_直线 = function (X轴, Y轴, Z轴, 起点, 粒子) {
        //创建绘制进程
        new Promise(async function () {
            let 循环 = 0, 维度缓存 = 获取维度
            let 绘制 = async function () {
                //获取 绘制线体 的定制参数
                let X值 = Math.floor(parseInt(X轴.split(/\s/)[循环]))
                let Y值 = Math.floor(parseInt(Y轴.split(/\s/)[循环]))
                let Z值 = Math.floor(parseInt(Z轴.split(/\s/)[循环]))
                //判断是否结束进程
                if (X值 || Y值 || Z值) {
                    //< X轴 > 线条绘制
                    if (X值 >= 1) {
                        for (let 移动 = 0; 移动 < X值; 移动++) {
                            起点.x += 1
                            维度缓存.runCommandAsync(`particle ${粒子} ${起点.x} ${起点.y} ${起点.z}`)
                        }
                    }
                    else if (X值 <= -1) {
                        for (let 移动 = 0; 移动 > X值; 移动--) {
                            起点.x -= 1
                            维度缓存.runCommandAsync(`particle ${粒子} ${起点.x} ${起点.y} ${起点.z}`)
                        }
                    }
                    //< Y轴 > 线条绘制
                    if (Y值 >= 1) {
                        for (let 移动 = 0; 移动 < Y值; 移动++) {
                            起点.y += 1
                            维度缓存.runCommandAsync(`particle ${粒子} ${起点.x} ${起点.y} ${起点.z}`)
                        }
                    }
                    else if (Y值 <= -1) {
                        for (let 移动 = 0; 移动 > Y值; 移动--) {
                            起点.y -= 1
                            维度缓存.runCommandAsync(`particle ${粒子} ${起点.x} ${起点.y} ${起点.z}`)
                        }
                    }
                    //< Z轴 > 线条绘制
                    if (Z值 >= 1) {
                        for (let 移动 = 0; 移动 < Z值; 移动++) {
                            起点.z += 1
                            维度缓存.runCommandAsync(`particle ${粒子} ${起点.x} ${起点.y} ${起点.z}`)
                        }
                    }
                    else if (Z值 <= -1) {
                        for (let 移动 = 0; 移动 > Z值; 移动--) {
                            起点.z -= 1
                            维度缓存.runCommandAsync(`particle ${粒子} ${起点.x} ${起点.y} ${起点.z}`)
                        }
                    }
                }
                else {
                    循环 = 256
                }
                //结束 绘制线体 的进程
                if (循环 >= 256) {
                    world.events.tick.unsubscribe(绘制)
                }
                循环++
                冷却++
            }
            //自动填充缺失的参数
            if (!粒子) {
                粒子 = '动态轨迹:赤红'
            }
            //执行 绘制线体 的进程
            world.events.tick.subscribe(绘制)
        }
        )
    }
    /**
    * @example < 单线程 >< 效率 >优先型策略
    * @param {number} A轴 < 平面 >的< 长度 >请勿过大
    * @param {number} B轴 < 平面 >的< 宽度 >请勿过大
    * @param {string} 类型 < 平面 >的< 方向 >, 此参数限制为:< X|Z >< X|Y >< Z|Y >
    * @param {object} 起点 绘制图形的起点, 此参数限制为: <坐标类 对象>
    * @param {string} 粒子 用于显示的粒子效果, 使用完整命名空间进行定义
    */
    static α_平面 = function (A轴, B轴, 类型, 起点, 粒子) {
        //定义所需的变量
        let X轴值 = "", Y轴值 = "", Z轴值 = ""
        //判断是否可以执行< 绘制流程 >
        if (A轴 && B轴) {
            //生成需要传递的线条参数
            switch (类型) {
                case 'X|Z':
                    if (A轴 >= 1) {
                        for (let 循环 = 0; 循环 < A轴; 循环++) {
                            X轴值 += '1 0 '
                            Y轴值 += '0 0 '
                            Z轴值 += `${B轴} ${-B轴} `
                        }
                    }
                    else if (A轴 <= -1) {
                        for (let 循环 = 0; 循环 > A轴; 循环--) {
                            X轴值 += '-1 0 '
                            Y轴值 += '0 0 '
                            Z轴值 += `${B轴} ${-B轴} `
                        }
                    }
                    break

                case 'X|Y':
                    if (A轴 >= 1) {
                        for (let 循环 = 0; 循环 < A轴; 循环++) {
                            X轴值 += '1 0 '
                            Y轴值 += `${B轴} ${-B轴} `
                            Z轴值 += '0 0 '
                        }
                    }
                    else if (A轴 <= -1) {
                        for (let 循环 = 0; 循环 > A轴; 循环--) {
                            X轴值 += '-1 0 '
                            Y轴值 += `${B轴} ${-B轴} `
                            Z轴值 += '0 0 '
                        }
                    }
                    break

                case 'Z|Y':
                    if (A轴 >= 1) {
                        for (let 循环 = 0; 循环 < A轴; 循环++) {
                            X轴值 += '0 0 '
                            Y轴值 += `${B轴} ${-B轴} `
                            Z轴值 += '1 0 '
                        }
                    }
                    else if (A轴 <= -1) {
                        for (let 循环 = 0; 循环 > A轴; 循环--) {
                            X轴值 += '0 0 '
                            Y轴值 += `${B轴} ${-B轴} `
                            Z轴值 += '-1 0 '
                        }
                    }
                    break
            }
            //创建< 线条绘制 >的任务流程
            图形绘制.α_直线(X轴值, Y轴值, Z轴值, 起点, 粒子)
        }
    }
    /**
    * @example < 双线程 >< 效率 >优先型策略
    * @param {number} X轴 < 边框 >的< 长度 >
    * @param {number} Y轴 < 边框 >的< 高度 >
    * @param {number} Z轴 < 边框 >的< 宽度 >
    * @param {object} 起点 绘制图形的起点, 此参数限制为: <坐标类 对象>
    * @param {string} 粒子 用于显示的粒子效果, 使用完整命名空间进行定义
    */
    static α_线框 = function (X轴, Y轴, Z轴, 起点, 粒子) {
        if (X轴 && Y轴 && Z轴) {
            if (Y轴 != 0) {
                let 起点A = new BlockLocation(起点.x, 起点.y, 起点.z)
                let 起点B = new BlockLocation(起点.x + X轴, 起点.y + Y轴, 起点.z + Z轴)
                图形绘制.α_直线(`${X轴} ${-X轴} 0 0`, `${Y轴} ${-Y轴} ${Y轴} ${-Y轴}`, `0 0 ${Z轴} ${-Z轴}`, 起点A, 粒子)
                图形绘制.α_直线(`${-X轴} ${X轴} 0 0`, `${-Y轴} ${Y轴} ${-Y轴} ${Y轴}`, `0 0 ${-Z轴} ${Z轴}`, 起点B, 粒子)
            }
            else {
                图形绘制.α_直线(`${X轴} ${-X轴}`, `0 0`, `${Z轴} ${-Z轴}`, 起点, 粒子)
            }
        }
    }
    //性能优先
    /**
    * @example < 多线程 >< 性能 >优先型策略
    * @param {number} X轴 < 线条 >的< X轴长度 >
    * @param {number} Y轴 < 线条 >的< Y轴长度 >
    * @param {number} Z轴 < 线条 >的< Z轴长度 >
    * @param {object} 起点 绘制图形的起点, 此参数限制为: <坐标类 对象>
    * @param {string} 粒子 用于显示的粒子效果, 使用完整命名空间进行定义
    */
    static β_直线 = function (X轴, Y轴, Z轴, 起点, 粒子) {
        //执行绘制进程
        X轴 = Math.floor(X轴), Y轴 = Math.floor(Y轴), Z轴 = Math.floor(Z轴)
        new Promise(async function () {
            let 维度缓存 = 获取维度
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
            }
            world.events.tick.subscribe(绘制)
        }
        )
    }
    /**
    * @example < 多线程 >< 性能 >优先型策略
    * @param {number} A轴   < 平面 >的< 长度 >请勿过大
    * @param {number} B轴   < 平面 >的< 宽度 >请勿过大
    * @param {string} 类型  < 平面 >的< 方向 >, 此参数限制为:< X|Z >< X|Y >< Z|Y >
    * @param {object} 起点 绘制图形的起点, 此参数限制为: <坐标类 对象>
    * @param {string} 粒子 用于显示的粒子效果, 使用完整命名空间进行定义
    */
    static β_平面 = function (A轴, B轴, 类型, 起点, 粒子) {
        Math.floor(A轴 += 0), Math.floor(B轴 += 0)
        new Promise(async function () {
            let 绘制 = async function () {
                switch (类型) {
                    case 'X|Z':
                        var 坐标 = new BlockLocation(起点.x += (A轴 >= 1 ? 1 : A轴 == 0 ? 0 : -1), 起点.y, 起点.z)
                        图形绘制.β_直线(0, 0, B轴, 坐标, 粒子)
                        break

                    case 'X|Y':
                        var 坐标 = new BlockLocation(起点.x += (A轴 >= 1 ? 1 : A轴 == 0 ? 0 : -1), 起点.y, 起点.z)
                        图形绘制.β_直线(0, B轴, 0, 坐标, 粒子)
                        break

                    case 'Z|Y':
                        var 坐标 = new BlockLocation(起点.x, 起点.y, 起点.z += (A轴 >= 1 ? 1 : A轴 == 0 ? 0 : -1))
                        图形绘制.β_直线(0, B轴, 0, 坐标, 粒子)
                        break
                }
                if (A轴 == 0) {
                    world.events.tick.unsubscribe(绘制)
                }
                A轴 += (A轴 >= 1 ? -1 : A轴 == 0 ? 0 : 1)
            }
            world.events.tick.subscribe(绘制)
        }
        )
    }
    /**
    * @example < 多线程 >< 性能 >优先型策略
    * @param {number} X轴 < 立方 >的< 长度 >
    * @param {number} Y轴 < 立方 >的< 高度 >
    * @param {number} Z轴 < 立方 >的< 宽度 >
    * @param {object} 起点 绘制图形的起点, 此参数限制为: <坐标类 对象>
    * @param {string} 粒子 用于显示的粒子效果, 使用完整命名空间进行定义
    */
    static β_立方 = function (X轴, Y轴, Z轴, 起点, 粒子) {
        Math.floor(X轴 += 0), Math.floor(Y轴 += 0), Math.floor(Z轴 += 0)
        new Promise(async function () {
            let 循环 = 0, 冷却 = 5
            let 绘制 = async function () {
                if (冷却 == 0) {
                    let 高度 = new BlockLocation(起点.x, 起点.y + 循环, 起点.z)
                    Y轴 >= 0 ? 循环++ : 循环--
                    图形绘制.β_平面(X轴, Z轴, 'X|Z', 高度, 粒子)
                    if (循环 == Y轴) {
                        world.events.tick.unsubscribe(绘制)
                    }
                    冷却 = ((X轴 + Y轴) / 2) >= 32 ? 20 : ((X轴 + Y轴) / 2) >= 24 ? 10 : 5
                }
                else {
                    冷却--
                }
            }
            world.events.tick.subscribe(绘制)
        }
        )
    }
}
export class 方块识别 {
    static 树木类 = function (方块) {
        switch (方块.typeId) {
            //原木
            case 'minecraft:log': return true                       //一代原木
            case 'minecraft:log2': return true                      //二代原木
            case 'minecraft:mangrove_log': return true              //红杉原木
            //树叶
            case 'minecraft:leaves': return true                    //一代树叶
            case 'minecraft:leaves2': return true                   //二代树叶
            case 'minecraft:azalea_leaves': return true             //杜鹃树叶
            case 'minecraft:mangrove_leaves': return true           //红杉树叶
            case 'minecraft:azalea_leaves_flowered': return true    //杜鹃花叶
            //附着
            case 'minecraft:vine': return true                      //藤蔓方块
            case 'minecraft:bee_nest': return true                  //蜂巢方块
            case 'minecraft:shroomlight': return true               //菌光体块
            //紫颂类
            case 'minecraft:chorus_plant': return true              //紫颂茎块
            case 'minecraft:chorus_flower': return true             //紫颂花块
            //蘑菇
            case 'minecraft:warped_stem': return true               //扭曲菌柄
            case 'minecraft:crimson_stem': return true              //绯红菌柄
            case 'minecraft:nether_wart_block': return true         //下界疣块
            case 'minecraft:warped_wart_block': return true         //扭曲疣块
            case 'minecraft:red_mushroom_block': return true        //红蘑菇块
            case 'minecraft:brown_mushroom_block': return true      //棕蘑菇块
            //其他
            default: return false
        }
    }
    static 农业类 = function (方块) {
        switch (方块.typeId) {
            //农田类
            case 'minecraft:wheat': return 'test'       //小麦
            case 'minecraft:carrots': return 'test'     //胡萝
            case 'minecraft:potatoes': return 'test'    //土豆
            case 'minecraft:beetroot': return 'test'    //甜菜
            //竹笋类
            case 'minecraft:bamboo': return true        //竹子
            case 'minecraft:sugar_cane': return true    //甘蔗
            //南瓜类
            case 'minecraft:melon_block': return true   //西瓜块
            case 'minecraft:pumpkin': return true       //南瓜块
            //树果类
            case 'minecraft:cocoa': return 'test'       //可可豆
            //真菌类
            case 'minecraft:nether_wart': return 'test' //下界疣
            //紫颂类
            case 'minecraft:chorus_plant': return true  //紫颂茎
            case 'minecraft:chorus_flower': return true //紫颂花
            //其他
            default: return false
        }
    }
    static 矿石类 = function (方块) {
        switch (方块.typeId) {
            //煤矿
            case 'minecraft:coal_ore': return true
            case 'minecraft:deepslate_coal_ore': return true
            //铁矿
            case 'minecraft:iron_ore': return true
            case 'minecraft:deepslate_iron_ore': return true
            //青金石
            case 'minecraft:lapis_ore': return true
            case 'minecraft:deepslate_lapis_ore': return true
            //铜矿
            case 'minecraft:copper_ore': return true
            case 'minecraft:deepslate_copper_ore': return true
            //金矿
            case 'minecraft:gold_ore': return true
            case 'minecraft:nether_gold_ore': return true
            case 'minecraft:deepslate_gold_ore': return true
            //红石矿
            case 'minecraft:redstone_ore': return true
            case 'minecraft:lit_redstone_ore': return true
            case 'minecraft:deepslate_redstone_ore': return true
            case 'minecraft:lit_deepslate_redstone_ore': return true
            //钻石矿
            case 'minecraft:diamond_ore': return true
            case 'minecraft:deepslate_diamond_ore': return true
            //绿宝石矿
            case 'minecraft:emerald_ore': return true
            case 'minecraft:deepslate_emerald_ore': return true
            //水晶矿
            case 'minecraft:quartz_ore': return true
            case 'minecraft:amethyst_cluster': return true
            //残骸矿
            case 'minecraft:ancient_debris': return true
            //粗矿块
            case 'minecraft:raw_iron_block': return true
            case 'minecraft:raw_gold_block': return true
            case 'minecraft:raw_copper_block': return true
            //其他
            default: return false
        }
    }
    static 可通行 = function (方块) {
        switch (方块.typeId) {
            //空气
            case 'minecraft:air': return true               //空气
            case 'minecraft:structure_void': return true    //结构空位
            //流体
            case 'minecraft:water': return true             //水源
            case 'minecraft:lava': return true              //熔岩
            case 'minecraft:flowing_water': return true     //流动水
            case 'minecraft:flowing_lava': return true      //流动熔岩
            //植物
            case 'minecraft:tallgrass': return true         //矮草
            case 'minecraft:red_flower': return true        //小花
            case 'minecraft:double_plant': return true      //大花
            case 'minecraft:yellow_flower': return true     //蒲公英
            //雪类
            case 'minecraft:snow_layer': return true        //雪层
            case 'minecraft:powder_snow': return true       //雪层
            //其他
            default: return false
        }
    }
>>>>>>> Stashed changes
}