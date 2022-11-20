/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的分类为: 矩阵接口_规划

该<javaScript>的作者为: [ 钛宇·星光阁 / Tayun_Starry ]
*/
//导入< Beta_API >预设接口
import { world, BlockLocation } from "@minecraft/server"
//导入< 项目功能 >预设接口
import { 专用界面, 专用组件 } from './function'
import { 通用组件, 数据标签, 坐标信息, 消息通知, 数值修饰 } from './matrix_API'
//定义全局变量
const 获取维度 = world.getDimension('overworld') || world.getDimension('nether') || world.getDimension('the end')
//订阅< 系统侦听 >
world.events.beforeDataDrivenEntityTriggerEvent.subscribe((实体事件) => {
    switch (实体事件.id) {
        case '开启<结构珍宝>':
            var 位置 = 实体事件.entity.location
            专用组件.结构珍宝(位置)
            break

        case '仓储过滤':
            专用组件.仓储过滤(实体事件.entity)
            break

        default:
            break
    }
}
)
world.events.beforeItemUseOn.subscribe((使用物品) => { //当玩家手持物品点击方块时
    //定义实现当前功能所需的变量
    let 查询坐标 = `${使用物品.blockLocation.x} ${使用物品.blockLocation.y} ${使用物品.blockLocation.z}`
    let 方块坐标 = 使用物品.blockLocation
    let 当前玩家 = 使用物品.source
    //使用物品时的自定义效果
    switch (使用物品.item.typeId) {
        case '拟态矩阵:标记起点':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '标记起点', 查询坐标)
            break

        case '拟态矩阵:标记终点':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '标记终点', 查询坐标)
            break

        case '拟态矩阵:开始填充':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '开始填充')
            break

        case '拟态矩阵:标记方块':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '等待方块')
            break

        case '拟态矩阵:方块标定':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '方块标定')
            break

        case '拟态矩阵:方块调试':
            专用组件.拟态矩阵(当前玩家, '', 方块坐标, '方块调试')
            break

        case '特殊道具:物资整理':
            专用组件.物资整理(当前玩家, '点击方块')
            break

        default:
            break
    }
}
)
world.events.beforeItemUse.subscribe((使用物品) => { //当玩家使用物品时
    //定义实现当前功能所需的变量
    let 当前玩家 = 使用物品.source
    //使用物品时的自定义效果
    switch (使用物品.item.typeId) {
        case '基础书籍:魔导手册':
            switch (当前玩家.isSneaking) {
                case true:
                    专用界面.辅助说明(当前玩家, '基础目录')
                    break
            }
            break

        case '魔法礼盒:匣里乾坤':
            专用组件.匣里乾坤(当前玩家)
            break

        case '魔法书籍:瞬间移动':
            专用组件.瞬间移动(当前玩家)
            break

        case '特殊道具:锚点虚印':
            专用组件.锚点虚印(当前玩家)
            break

        case '特殊道具:物资整理':
            专用组件.物资整理(当前玩家, '使用物品')
            break

        case '特殊道具:状态显示':
            专用组件.状态显示(当前玩家, '道具模式')
            break

        case '魔法工具:魔晶弹珠':
            专用组件.魔晶弹珠(当前玩家)
            break

        case '载具控制:仓储过滤':
            专用组件.仓储过滤(当前玩家, '道具模式')
            break

        default:
            break
    }
}
)
world.events.entityHurt.subscribe((实体损伤) => { //当实体受到损伤时
    switch (实体损伤.hurtEntity.typeId) {
        case '矩阵接口:容器' || '矩阵接口:绘制' || '矩阵接口:锚点':
            break

        default:
            let 位置 = 实体损伤.hurtEntity.location
            let 损伤 = 实体损伤.damage
            switch (实体损伤.hurtEntity.typeId) {
                case 'minecraft:iron_golem':
                    var 悬浮 = 1
                    break

                case 'minecraft:warden':
                    var 悬浮 = 1.5
                    break

                case 'minecraft:ravager':
                    var 悬浮 = 1
                    break

                default:
                    var 悬浮 = 0
                    break
            }
            专用组件.损伤显示(损伤, 位置, 悬浮)
            break
    }
}
)