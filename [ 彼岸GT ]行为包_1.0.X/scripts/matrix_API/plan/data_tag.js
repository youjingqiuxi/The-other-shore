/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 | Tayun_Strry | <in>_taiyu ]
*/

//导入预设接口
import { ActionFormData, MessageFormData, ModalFormData } from "mojang-minecraft-ui"
import { EntityRaycastOptions, BlockLocation, world } from "mojang-minecraft"

/**
* @example 定义了向 <指定目标 > 进行 [ 添加 | 移除 | 读取 ] <json>标签 的 方法与机制
*/
export class 数据标签 {
    /**
    * @param {string} 类型 用于 定义 需要刷新 的 坐标标签 的名称
    * @param {carry} 用户 用于 传递 与 继承 对应目标 的 标签数组
    * @param {carry} 位置 用于 传递 与 继承 对应目标 的 坐标信息
    * @returns {string}
    * @example 接口功能: 用于刷新 <标签类_3轴坐标_数据存储> 的 具体内容
    */
    static 刷新坐标 = function (类型, 用户, 位置) {
        //定义实现当前功能所需的变量
        const 查询标签 = 用户.getTags()
        //执行指定的功能
        for (const 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${类型}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的数据
                const 标签数据 = JSON.parse(查询标签[目标标签])
                const 待删除_坐标X = 标签数据[类型]['坐标X']
                const 待删除_坐标Y = 标签数据[类型]['坐标Y']
                const 待删除_坐标Z = 标签数据[类型]['坐标Z']
                //整合 获得的 坐标数据
                const 待删除_坐标点 = {
                    [类型]: {
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
        const 坐标点 = {
            [类型]: {
                '坐标X': 位置.x,
                '坐标Y': 位置.y,
                '坐标Z': 位置.z,
            }
        }
        //添加对应的标签
        用户.addTag(JSON.stringify(坐标点))
    }

    /**
     * @param {string} 类型 用于 定义 需要查询 的 坐标标签 的名称
     * @param {carry} 用户 用于 传递 与 继承 对应目标 的 标签数组
     * @returns {string}
     * @example 接口功能: 用于查询 <标签类_3轴坐标_数据存储> 的 具体内容
     */
    static 读取坐标 = function (类型, 用户) {
        //定义实现当前功能所需的变量
        const 查询标签 = 用户.getTags()
        //执行指定的功能
        for (const 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${类型}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的 数据
                const 标签数据 = JSON.parse(查询标签[目标标签])
                const 坐标信息_X = 标签数据[类型]['坐标X']
                const 坐标信息_Y = 标签数据[类型]['坐标Y']
                const 坐标信息_Z = 标签数据[类型]['坐标Z']
                //输出 标签中 的 数据
                return `${坐标信息_X} ${坐标信息_Y} ${坐标信息_Z}`
            }
        }
    }

    /**
    * @param {string} 类型 用于 定义 需要移除 的 坐标标签 的名称
    * @param {carry} 用户 用于 传递 与 继承 对应目标 的 标签数组
    * @param {carry} 位置 用于 传递 与 继承 对应目标 的 坐标信息
    * @returns {string}
    * @example 接口功能: 用于移除 <标签类_3轴坐标_数据存储> 的 具体内容
    */
    static 移除坐标 = function (类型, 用户) {
        //定义实现当前功能所需的变量
        const 查询标签 = 用户.getTags()
        //执行指定的功能
        for (const 目标标签 in 查询标签) { //循环 获取标签
            if (查询标签[目标标签].startsWith(`{"${类型}":{`)) { //如果 有标签 就 根据标签 执行 指定功能
                //读取 标签中 的数据
                const 标签数据 = JSON.parse(查询标签[目标标签])
                const 待删除_坐标X = 标签数据[类型]['坐标X']
                const 待删除_坐标Y = 标签数据[类型]['坐标Y']
                const 待删除_坐标Z = 标签数据[类型]['坐标Z']
                //整合 获得的 坐标数据
                const 待删除_坐标点 = {
                    [类型]: {
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