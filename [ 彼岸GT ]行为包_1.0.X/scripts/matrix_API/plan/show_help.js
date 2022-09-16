/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 | Tayun_Strry | <in>_taiyu ]
*/

//导入预设接口
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

//导入< 彼岸 >预设接口
import { 功能界面 } from './function'

/**
* @example 定义了向 <指定目标 > 展示 < 辅助说明 > 的 方法与机制
*/
export class 辅助说明 {
    /**
     * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
     * @returns {show}
     * @example 接口功能: 本模组的<辅助说明>的目录部分
     */
    static 目录 = function (用户) {
        //定义实现当前功能所需的变量
        var 页面元素 = new ActionFormData()
        //定义当前界面所用到的各项元素
        页面元素 = 页面元素.body("§7功能目录")
            .title("§6==========§o§l§5 彼岸浮梦 §r§6==========")
            .button("§l§1查看§1[§0§o§l 项目开发 §1]§r", "textures/GUI/icon/icon_00")
            .button("§l§1查看§1[§3§o§l 浮世众生 §1]§r", "textures/items/魔法卷宗/0")
            .button("§l§1查看§1[§5§o§l 魔导工业 §1]§r", "textures/GUI/icon/icon_04")
            .button("§l§1查看§1[§c§o§l 特种制造 §1]§r", "textures/GUI/icon/icon_06")
            .button("§l§1查看§1[§8§o§l 家居装饰 §1]§r", "textures/GUI/icon/icon_05")
            .button("§l§1查看§1[§8§o§l 领域方块 §1]§r", "textures/GUI/icon/icon_05")
            .button("§l§1查看§1[§8§o§l 迷途机关 §1]§r", "textures/GUI/icon/icon_05")
            .button("§l§1查看§1[§8§o§l 秘境探索 §1]§r", "textures/GUI/icon/icon_05")
            .button("§l§1查看§1[§c§o§l 矩阵接口 §1]§r", "textures/GUI/icon/icon_07")
            .button("§l§9设置§1[§5§o§l 状态侦测 §1]§r", "textures/GUI/icon/icon_08")
        if (用户.hasTag('Gametest.GetMagic_CareFor')) {
            页面元素.button("§l§9设置§1[§4§o§l 快捷传送 §1]§r", "textures/items/魔法卷宗/9")
            页面元素.button("§l§9设置§1[§4§o§l 锚点虚印 §1]§r", "textures/items/锚点虚印")
        }
        //生成界面并执行玩家的选择
        页面元素.show(用户).then((用户选择) => {
            switch (用户选择.selection) {
                case 0:
                    辅助说明.目录_项目开发(用户)
                    break

                case 1:
                    辅助说明.目录_浮世众生(用户)
                    break

                case 9:
                    功能界面.状态侦测(用户)
                    break

                case 10:
                    功能界面.瞬间移动(用户)
                    break

                case 11:
                    功能界面.锚点虚印(用户)
                    break

                default:
                    break
            }
        }
        )
    }

    /**
     * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
     * @returns {show}
     * @example 接口功能: 定义了< 项目开发 >的基础目录
     */
     static 目录_项目开发 = function (用户) {
        //定义实现当前功能所需的变量
        var 页面元素 = new ActionFormData()
        //定义当前界面所用到的各项元素
        页面元素 = 页面元素.body("§7功能目录")
            .title("§1[§0§o§l 项目开发 §1]§r§8")
            .button("§l§9 开发人员名单 §r", "textures/GUI/icon/icon_00")
            .button("§l§2 模组授权信息 §r", "textures/GUI/icon/icon_01")
            .button("§l§5 模组获取途径 §r", "textures/GUI/icon/icon_02")
        //生成界面并执行玩家的选择
        页面元素.show(用户).then((用户选择) => {
            if (用户选择.isCanceled) {
                辅助说明.目录(用户)
            }
            switch (用户选择.selection) {

                default:
                    break
            }
        }
        )
    }
    
    /**
     * @param {carry} 用户 定义了该功能的用户, 请勿使用原版指令进行定义
     * @returns {show}
     * @example 接口功能: 定义了< 浮世众生 >的基础目录
     */
     static 目录_浮世众生 = function (用户) {
        //定义实现当前功能所需的变量
        var 页面元素 = new ActionFormData()
        //定义当前界面所用到的各项元素
        页面元素 = 页面元素.body("§7功能目录")
            .title("§1[§3§o§l 浮世众生 §1]§r§8")
            .button("§l§9 星光阁 §r", "textures/icon/星光阁/Basics_0")
            .button("§l§2 幻生阁 §r", "textures/icon/幻生阁/Basics_0")
            .button("§l§3 明镜阁 §r", "textures/icon/明镜阁/Basics_0")
            .button("§l§4 天渊阁 §r", "textures/icon/天渊阁/Basics_0")
        //生成界面并执行玩家的选择
        页面元素.show(用户).then((用户选择) => {
            if (用户选择.isCanceled) {
                辅助说明.目录(用户)
            }
            switch (用户选择.selection) {

                default:
                    break
            }
        }
        )
    }
}