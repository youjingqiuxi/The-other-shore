/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 / Tayun_Starry ]
*/
//导入< Beta_API >预设接口
import { BlockLocation, BlockProperties, ItemStack, ItemTypes, world } from "@minecraft/server"
import { MessageFormData } from "@minecraft/server-ui"
//定义全局变量
const 获取维度 = world.getDimension('overworld') || world.getDimension('nether') || world.getDimension('the end')
//定义 类
export class 通用组件 {
    /**
     * @param {string} 类型 限制为: <实体><物品><粒子>
     * @param {string} 目标 需要生成的<对象>的完整标识符
     * @param {object|string} 位置 指定的生成实体的坐标
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

            case '粒子':
                获取维度.runCommandAsync(`particle ${目标} ${运算[0]} ${运算[1]} ${运算[2]}`)
                break

            case '实体':
                switch (typeof (修饰A)) {
                    case 'number':
                        获取维度.spawnEntity(目标, 坐标)
                        break

                    default:
                        获取维度.runCommandAsync(`summon ${目标} ${运算[0]} ${运算[1]} ${运算[2]} ${修饰A} ${修饰B}`)
                        break
                }
                break
        }
    }
    /**
     * @param {string} 类型 限制为: < ... >
     * @param {string} 内容 需要执行的 内容 或 指令
     * @param {object} 用户 限制为: <玩家类 对象>
     * @param {number} 延迟 等待多少<游戏刻>后执行
     * @returns {Promise<any>}
     */
    static 延迟执行 = function (类型, 内容, 用户, 延迟 = 20) {
        //定义玩家名称
        var 玩家名称 = `"${用户.nameTag}"`
        //创建异步执行
        new Promise(async function () {
            let 等待执行 = function () {
                if (延迟 <= 0) {
                    //当倒计时完成时, 执行预先设置好的内容
                    switch (类型) {
                        case '快捷消息':
                            消息通知.数据驱动('聊天栏', [内容], 玩家名称)
                            break

                        case '原版指令':
                            用户.runCommand(`${内容}`)
                            break

                        case '给予物品':
                            用户.runCommand(`give @s ${内容}`)
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
     * @param {object} 目标 限制为: <实体类 对象>
     * @param {string} 类型 限制为: <实体><方块>
     */
    static 查询名称 = function (目标, 类型 = '实体') {
        //定义实现当前功能所需的变量
        let 查询_命名空间 = 目标.typeId.split(':')
        //实现接口功能
        switch (类型) {
            case '实体':
                if (目标.typeId == 'minecraft:player') {
                    return `{"text": "${目标.name}"}`
                }
                else {
                    return `{"translate":"entity.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.typeId}.name"}`
                }

            case '方块':
                let 方块排列 = 目标.permutation
                let 附加
                let 标识
                switch (目标.typeId) {
                    case 'minecraft:undyed_shulker_box' || 'minecraft:shulker_box':
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
                    case 'minecraft:coral_block' || 'minecraft:coral' || 'minecraft:coral_fan' || 'minecraft:coral_fan_dead':
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
                    case 'minecraft:stained_glass' || 'minecraft:stained_glass_pane':
                        附加 = 方块排列.getProperty(BlockProperties.color).value
                        break

                    case 'minecraft:concrete' || 'minecraft:concrete_powder':
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

                            default:
                                附加 = 原木类型
                                break
                        }
                        break

                    case 'minecraft:log':
                        附加 = 方块排列.getProperty(BlockProperties.oldLogType).value
                        break
                }
                return `{"translate":"tile.${标识}.${(附加) ? `${附加}.name` : 'name'}"}`
        }
    }
    /**
     * @param {number} 范围A 取值区间的最小值
     * @param {number} 范围B 取值区间的最大值
     */
    static 字符颜色 = function (范围A, 范围B) {
        switch (数值修饰.整数值(范围A, 范围B)) {
            case 0:
                return 0

            case 1:
                return 1

            case 2:
                return 2

            case 3:
                return 3

            case 4:
                return 4

            case 5:
                return 5

            case 6:
                return 6

            case 7:
                return 7

            case 8:
                return 8

            case 9:
                return 9

            case 10:
                return 'a'

            case 11:
                return 'b'

            case 12:
                return 'c'

            case 13:
                return 'd'

            case 14:
                return 'e'

            case 15:
                return 'f'
        }
    }
}
export class 坐标信息 {
    /**
    * @param {object} 用户 限制为: <玩家类 对象>
    * @param {string} A坐标 需要计算的<坐标点>名称
    * @param {string} B坐标 需要计算的<坐标点>名称
    * @param {string} 类型 限制为: <获取体积><随机坐标><查询界限>
    */
    static 计算区间 = function (用户, A坐标, B坐标, 类型 = '获取体积', 查询) {
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
        switch (类型) {
            case '获取体积':
                //返回计算后 的 坐标区间 的 数值
                return `${(区间_X != 0 ? 区间_X + 1 : 1) * (区间_Y != 0 ? 区间_Y + 1 : 1) * (区间_Z != 0 ? 区间_Z + 1 : 1)}`

            case '随机坐标':
                //返回计算后 的 坐标 的随机数值
                return `${数值修饰.整数值(上限_X, 下限_X)} ${数值修饰.整数值(上限_Y, 下限_Y)} ${数值修饰.整数值(上限_Z, 下限_Z)}`

            case '查询界限':
                return `=====\n ${界限_X} ${界限_Y} ${界限_Z} \n ${界限_X + 界限_Y + 界限_Z == 3 ? true : false} \n=====`
        }
    }
    /**
    * @param {object} 位置 执行流程的原始坐标
    * @param {number} 范围 寻找地面的最大范围, 建议值:16~128
    * @param {number} 高度 寻找地面的最低高度, 建议值:-64~128
    */
    static 获取地面 = function (位置, 范围 = 128, 高度 = 60) {
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

                case 'minecraft:mangrove_leaves':
                    break

                case 'minecraft:azalea_leaves_flowered':
                    break
                //原木
                case 'minecraft:log':
                    break

                case 'minecraft:log2':
                    break

                case 'minecraft:mangrove_log':
                    break

                case 'minecraft:crimson_stem':
                    break

                case 'minecraft:warped_stem':
                    break
                //蘑菇
                case 'minecraft:red_mushroom_block':
                    break

                case 'minecraft:brown_mushroom_block':
                    break

                default:
                    var 通过 = 1
                    break
            }
            return 通过 == 1 ? 1 : 0
        }
        for (let 循环 = 1; 循环 > 0; 循环++) {
            switch (数值修饰.整数值(0, 3)) {
                case 0:
                    var 位置_X = (位置.x + 数值修饰.整数值(16, 范围))
                    var 位置_Z = (位置.z + 数值修饰.整数值(16, 范围))
                    break

                case 1:
                    var 位置_X = (位置.x + 数值修饰.整数值(范围 * -1, -16))
                    var 位置_Z = (位置.z + 数值修饰.整数值(范围 * -1, -16))
                    break

                case 2:
                    var 位置_X = (位置.x + 数值修饰.整数值(16, 范围))
                    var 位置_Z = (位置.z + 数值修饰.整数值(范围 * -1, -16))
                    break

                case 3:
                    var 位置_X = (位置.x + 数值修饰.整数值(范围 * -1, -16))
                    var 位置_Z = (位置.z + 数值修饰.整数值(16, 范围))
                    break
            }
            var 位置_Y = 数值修饰.整数值(高度, 128)
            let 方块A = 获取维度.getBlock(new BlockLocation(位置_X, 位置_Y, 位置_Z))
            let 方块B = 地面判定(获取维度.getBlock(new BlockLocation(位置_X, 位置_Y - 1, 位置_Z)))
            let 方块C = 地面判定(获取维度.getBlock(new BlockLocation(位置_X, 位置_Y - 3, 位置_Z)))
            let 方块D = 地面判定(获取维度.getBlock(new BlockLocation(位置_X + 数值修饰.整数值(1, 8), 位置_Y - 2, 位置_Z + 数值修饰.整数值(1, 8))))
            let 方块E = 地面判定(获取维度.getBlock(new BlockLocation(位置_X - 数值修饰.整数值(1, 8), 位置_Y - 4, 位置_Z - 数值修饰.整数值(1, 8))))
            if (方块A.typeId == 'minecraft:air') {
                if (方块B + 方块C + 方块D + 方块E == 4) {
                    循环 = -1
                }
            }
            if (循环 == 1000) {
                循环 = -1
                return `${位置.x} ${位置.y} ${位置.z}`
            }
        }
        return `${位置_X} ${位置_Y} ${位置_Z}`
    }
    /**
    * @param {string} 名称 需要查询的<坐标数值>的名称
    * @param {object} 用户 限制为: <玩家类 对象>
    * @param {string} 轴向 限制为: < X >< Y >< Z > 
    * @param {number} 偏移 用于修改 输出 的 返回值
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
    * @param {object|string} 位置 需要保存的坐标
    */
    static 数据保存 = function (名称, 用户, 位置) {
        //定义实现当前功能所需的变量
        let 查询标签 = 用户.getTags()
        //执行指定的功能
        switch (typeof (位置)) {
            case 'string':
                var 运算 = 位置.split(/\s/)
                var 坐标 = new 坐标信息(`${运算[0]}`, `${运算[1]}`, `${运算[2]}`)
                break

            default:
                var 坐标 = 位置
                break
        }
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
                '坐标X': 坐标.x,
                '坐标Y': 坐标.y,
                '坐标Z': 坐标.z,
            }
        }
        //添加对应的标签
        用户.addTag(JSON.stringify(坐标点))
    }
    /**
    * @param {string} 名称 需要读取的<坐标数值>的名称
    * @param {object} 用户 限制为: <玩家类 对象>
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
    * @param {object} 用户 限制为: <玩家类 对象>
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
                            用户.runCommand(`titleraw @s title {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break

                        case '副标题':
                            用户.runCommand(`titleraw @s subtitle {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break

                        case '小标题':
                            用户.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break

                        case '聊天栏':
                            用户.runCommand(`tellraw @s {"rawtext":[{"text":"666+${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break
                    }
                    break

                default:
                    switch (类型) {
                        case '主标题':
                            获取维度.runCommand(`titleraw ${用户} title {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break

                        case '副标题':
                            获取维度.runCommand(`titleraw ${用户} subtitle {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break

                        case '小标题':
                            获取维度.runCommand(`titleraw ${用户} actionbar {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break

                        case '聊天栏':
                            获取维度.runCommand(`tellraw ${用户} {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                            break
                    }
                    break
            }
        }
        else {
            switch (类型) {
                case '主标题':
                    获取维度.runCommand(`titleraw @a title {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                    break

                case '副标题':
                    获取维度.runCommand(`titleraw @a subtitle {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                    break

                case '小标题':
                    获取维度.runCommand(`titleraw @a actionbar {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
                    break

                case '聊天栏':
                    获取维度.runCommand(`tellraw @a {"rawtext":[{"text":"${内容}"}` + `${附加 ? ',' + 附加 : ``}` + `]}`)
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
            let 位置 = new 坐标信息(用户)
            if (用户选择.selection == 1) {
                消息通知.数据驱动('小标题', `您当前的坐标为: || ${位置.x} || ${位置.y} || ${位置.z} ||`)
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
}
export class 数据标签 {
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
}