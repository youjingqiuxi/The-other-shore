/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 / Tayun_Starry ]
*/

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
                if (延迟 <= 0) {
                    //当倒计时完成时, 执行预先设置好的内容
                    switch (类型) {
                        case '快捷消息':
                            通用组件.快捷消息([内容], 玩家名称)
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

            case 'block':
                try {
                    world.getDimension("overworld").runCommand(`tellraw ${用户} {"rawtext":[{"translate":"tile.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.typeId}.name"}]}`)
                }
                catch {
                    world.getDimension("overworld").runCommand(`tellraw @a {"rawtext":[{"translate":"tile.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 目标.typeId}.name"}]}`)
                }
                break

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
}
export class 坐标信息 {
    /**
    * @param {object} 用户 限制为: <玩家类 对象>
    * @param {string} A坐标 需要计算的<坐标点>名称
    * @param {string} B坐标 需要计算的<坐标点>名称
    * @param {string} 类型 限制为: <获取体积> / <随机坐标>
    * @returns {string}
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
                return `${通用组件.随机数值(X_最大值, X_最小值)} ${通用组件.随机数值(Y_最大值, Y_最小值)} ${通用组件.随机数值(Z_最大值, Z_最小值)}`

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
}