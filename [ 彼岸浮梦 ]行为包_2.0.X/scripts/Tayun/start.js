/*
该<javaScript>的归属为:< 彼岸浮梦 系列 > 的 < 矩阵接口 >

该<javaScript>的作者为: [ 钛宇·星光阁 / Tayun_Starry ]

该<javaScript>的分类为: 矩阵接口_规划
*/

//导入 功能接口
import { world } from "@minecraft/server"
import * as 基础 from './matrix_API'
import * as 功能 from './function'

//定义 全局变量
let 等待执行 = 4

//触发 功能事件
world.events.beforeDataDrivenEntityTriggerEvent.subscribe((实体事件) => { //触发功能事件时
    //执行功能
    switch (实体事件.id) {
        case '开启<结构珍宝>':
            //修正维度信息
            基础.维度修正(实体事件.entity)
            //执行任务:开启<结构珍宝>
            功能.结构珍宝(实体事件.entity.location, 实体事件.entity.dimension)
            //释放粒子效果
            实体事件.entity.runCommandAsync('particle 烟雾效果:紫影 ~~~')
            实体事件.entity.runCommandAsync('particle 烟雾效果:海蓝 ~~~')
            实体事件.entity.runCommandAsync('particle 烟雾效果:靛蓝 ~~~')
            break

        case '仓储过滤':
            功能.仓储过滤(实体事件.entity)
            break
    }
}
)
world.events.beforeDataDrivenEntityTriggerEvent.subscribe((实体事件) => { //触发战斗事件时
    //获取 实体属性
    let
        角色 = 实体事件.entity,
        标签 = 实体事件.entity.getTags(),
        任务 = function (信息) { 角色.runCommandAsync(信息) },
        执行 = function (信息) { 角色.target?.runCommandAsync(信息) },
        轨迹 = function () {
            let
                高度 = 角色.target?.location.y - 角色.location.y,
                纵向 = 角色.target?.location.x - 角色.location.x,
                横向 = 角色.target?.location.z - 角色.location.z,
                类型 = function (指针) {
                    switch (指针.typeId) {
                        case '明镜阁:珍珠': return '海蓝'
                        case '星光阁:琉璃': return '橙光'
                        case '幻生阁:星砂': return '赤焰'
                        case '星光阁:森涅': return '森绿'
                        case '星光阁:蔷薇': return '紫影'
                    }
                }
            //创建绘制流程
            if ((Math.abs(纵向) + Math.abs(高度) + Math.abs(横向)) >= 5) {
                基础.图形绘制.β_直线(纵向, 高度, 横向, 角色.headLocation, `动态轨迹:${类型(角色)}`)
            }
        }
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
    }
    //解析 实体事件
    switch (实体事件.id) {
        case '初始化_数值':
            let
                属性 = [
                    { '攻击': { '数据值': '10' } },
                    { '暴击': { '数据值': '10' } },
                    { '暴伤': { '数据值': '50' } },
                    { '充能': { '数据值': '15' } },
                    { '快充': { '数据值': '00' } }
                ]
            for (let 指针 of 属性) {
                角色.addTag(JSON.stringify(指针))
            }
            break

        case '法术攻击<珍珠>':
            //结算伤害
            if (角色.target) {
                //技能
                if (角色.target?.hasTag('§k<珍珠之心>§r')) {
                    执行(`effect @e[r=32,family=!monster] regeneration ${基础.数值修饰.钳位值(Math.floor(角色.target?.getComponent('health').value / 10), 14, 4)} ${Math.floor(角色.target?.getComponent('health').current / 10)} true`)
                    角色.target?.removeTag('§k<珍珠之心>§r')
                }
                else {
                    角色.target?.addTag('§k<珍珠之心>§r')
                }
                //普攻
                if (基础.数值修饰.整数值(1, 100) <= 暴击) {
                    执行(`damage @s ${Math.floor(攻击 * (1 + (暴伤 / 100)))} entity_attack entity @p`)
                    执行('particle 暴击特效:海蓝 ~ ~1 ~')
                }
                else {
                    执行(`damage @s ${Math.floor(攻击)} entity_attack entity @p`)
                }
                //大招
                if (充能 < (15 - 快充)) {
                    //获得充能
                    基础.数据标签.存储数值('充能', 角色, 充能 + 1)
                }
                else {
                    //清除充能
                    基础.数据标签.存储数值('充能', 角色, 1)
                    //释放技能效果
                    执行('summon 增幅法阵:沧海 ~ ~1 ~')
                    //附加元素印记
                    功能.元素附加(角色.target, '海蓝', 2)
                    //释放大招特效
                    任务('particle 大招特效:海蓝 ~~~')
                }
                //附件
                功能.元素附加(角色.target, '海蓝')
                功能.等级提升(角色)
                轨迹()
            }
            break

        case '法术攻击<琉璃>':
            //结算伤害
            if (角色.target) {
                //普攻
                if (基础.数值修饰.整数值(1, 100) <= 暴击) {
                    执行(`damage @s ${Math.floor(攻击 * (1 + (暴伤 / 100)))} entity_attack entity @p`)
                    基础.数据标签.存储数值('充能', 角色, 充能 + 5)
                    执行('particle 暴击特效:橙光 ~ ~1 ~')
                }
                else {
                    执行(`damage @s ${Math.floor(攻击)} entity_attack entity @p`)
                    基础.数据标签.存储数值('充能', 角色, 充能 + 1)
                }
                //大招
                if (充能 >= (15 - 快充)) {
                    //清除充能
                    基础.数据标签.存储数值('充能', 角色, 1)
                    //获取飞弹数量
                    let
                        参数 = 角色.target?.getComponent('health').value * 0.1,
                        数量 = 参数 >= 3 ? (参数 <= 9 ? 参数 : 9) : 3
                    //执行创建飞弹的效果
                    for (let 发射 = 0; 发射 < 数量; 发射++) {
                        任务('summon 制导飞弹:神恩 ~~~')
                    }
                    //显示技能等级
                    任务(`particle 数值显示:闪烁效果_${数量} ~ ~1.75 ~`)
                    //附加元素印记
                    功能.元素附加(角色.target, '橙光', 2)
                    //释放大招特效
                    任务('particle 大招特效:橙光 ~~~')
                }
                //附件
                功能.元素附加(角色.target, '橙光')
                功能.等级提升(角色)
                轨迹()
            }
            break

        case '法术攻击<星砂>':
            //结算伤害
            if (角色.target) {
                //获取 属性 追加值的信息
                for (let 指针 in 标签) {
                    if (标签[指针].startsWith(`{"追加_暴击":{`)) {
                        let
                            数值 = parseInt(JSON.parse(标签[指针])["追加_暴击"]["数据值"])
                        var
                            追加_暴击 = 数值 ? 数值 : 0
                    }
                    if (标签[指针].startsWith(`{"追加_暴伤":{`)) {
                        let
                            数值 = parseInt(JSON.parse(标签[指针])["追加_暴伤"]["数据值"])
                        var
                            追加_暴伤 = 数值 ? 数值 : 0
                    }
                }
                //普攻
                if (基础.数值修饰.整数值(1, 100) <= 暴击 + 追加_暴击) {
                    //清除所有的 属性 追加数值
                    基础.数据标签.存储数值('追加_暴击', 角色, 0)
                    基础.数据标签.存储数值('追加_暴伤', 角色, 0)
                    //结算暴击伤害
                    执行(`damage @s ${Math.floor((攻击 + ((暴击 + 暴伤) * 0.45)) * (1 + ((暴伤 + 追加_暴伤) / 100)))} entity_attack entity @p`)
                    //播放暴击特效
                    执行('particle 暴击特效:赤焰 ~ ~1 ~')
                }
                else {
                    执行(`damage @s ${Math.floor(攻击)} entity_attack entity @p`)
                    //获得 暴击伤害 的数值追加效果
                    基础.数据标签.存储数值('追加_暴伤', 角色, 基础.数值修饰.钳位值(追加_暴伤 + 200, 1000, 200))
                }
                //大招
                if (充能 < (15 - 快充)) {
                    基础.数据标签.存储数值('充能', 角色, 充能 + 1)
                }
                else {
                    //清除充能
                    基础.数据标签.存储数值('充能', 角色, 1)
                    功能.元素附加(角色.target, '赤焰', 2)
                    //获取 属性 追加数值
                    基础.数据标签.存储数值('追加_暴击', 角色, 追加_暴击 + 100)
                    基础.数据标签.存储数值('追加_暴伤', 角色, 追加_暴伤 + 500)
                    //释放大招特效
                    任务('particle 大招特效:赤焰 ~~~')
                }
                //附件
                功能.元素附加(角色.target, '赤焰')
                功能.等级提升(角色)
                轨迹()
            }
            break

        case '法术攻击<森涅>':
            //结算伤害
            if (角色.target) {
                //普攻
                if (基础.数值修饰.整数值(1, 100) <= 暴击) {
                    执行(`damage @s ${Math.floor(攻击 * (1 + (暴伤 / 100)))} entity_attack entity @p`)
                    基础.数据标签.存储数值('充能', 角色, 充能 + 5)
                    执行('particle 暴击特效:森绿 ~ ~1 ~')
                }
                else {
                    基础.数据标签.存储数值('充能', 角色, 充能 + 1)
                    执行(`damage @s ${Math.floor(攻击)} entity_attack entity @p`)
                }
                //大招
                if (充能 >= (15 - 快充)) {
                    //清除充能
                    基础.数据标签.存储数值('充能', 角色, 1)
                    //释放技能效果
                    if (基础.数值修饰.整数值(1, 100) <= 暴击) {
                        执行(`damage @s ${Math.floor(((暴击 + 暴伤) * 0.75) * (1 + (暴伤 / 100)))} entity_attack entity @p`)
                        执行('particle 暴击特效:森绿 ~ ~1 ~')
                    }
                    else {
                        执行(`damage @s ${Math.floor((暴击 + 暴伤) * 0.75)} entity_attack entity @p`)
                    }
                    //附加元素印记
                    功能.元素附加(角色.target, '森绿', 2)
                    //释放大招特效
                    任务('particle 大招特效:森绿 ~~~')
                }
                //附件
                功能.元素附加(角色.target, '森绿')
                功能.等级提升(角色)
                轨迹()
            }
            break

        case '法术攻击<蔷薇>':
            //结算伤害
            if (角色.target) {
                //普攻
                if (基础.数值修饰.整数值(1, 100) <= 暴击) {
                    执行(`damage @s ${Math.floor(攻击 * (1 + (暴伤 / 100)))} entity_attack entity @p`)
                    基础.数据标签.存储数值('充能', 角色, 充能 + 5)
                    执行('particle 暴击特效:紫影 ~ ~1 ~')
                }
                else {
                    执行(`damage @s ${Math.floor((攻击 + (暴击 * 0.6)) * (攻击 * 0.05))} entity_attack entity @p`)
                }
                //大招
                if (充能 >= (15 - 快充)) {
                    //清除充能
                    基础.数据标签.存储数值('充能', 角色, 1)
                    //获取飞弹数量
                    let
                        参数 = 暴伤 * 0.1,
                        数量 = 参数 >= 3 ? (参数 <= 9 ? 参数 : 9) : 3
                    //执行创建飞弹的效果
                    for (let 发射 = 0; 发射 < 数量; 发射++) {
                        执行('summon 制导飞弹:碎星 ~~~')
                    }
                    //显示技能等级
                    任务(`particle 数值显示:闪烁效果_${数量} ~ ~1.75 ~`)
                    //附加元素印记
                    功能.元素附加(角色.target, '紫影', 2)
                    //释放大招特效
                    任务('particle 大招特效:紫影 ~~~')
                }
                //附件
                功能.元素附加(角色.target, '紫影')
                功能.等级提升(角色)
                轨迹()
            }
            break
    }
}
)
world.events.beforeItemUseOn.subscribe((使用物品) => { //当玩家手持物品点击方块时
    //定义实现当前功能所需的变量
    let
        当前玩家 = 使用物品.source,
        查询标签 = 当前玩家.getTags(),
        方块坐标 = 使用物品.blockLocation,
        查询坐标 = `${使用物品.blockLocation.x} ${使用物品.blockLocation.y} ${使用物品.blockLocation.z}`
    //修正维度信息
    for (let 目标标签 in 查询标签) {
        //维度修正 的 使用后 的 冷却机制
        if (查询标签[目标标签].startsWith(`{"特殊冷却:维度修正":{`)) {
            var
                功能禁用_α = true
        }
    }
    if (功能禁用_α != true) {
        基础.数据标签.存储数值('特殊冷却:维度修正', 当前玩家, 32)
        基础.维度修正(使用物品.source)
    }
    //使用物品时的自定义效果
    switch (使用物品.item.typeId) {
        case '拟态矩阵:开始填充':
            for (let 目标标签 in 查询标签) {
                //拟态矩阵 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '开始填充')
            }
            break

        case '拟态矩阵:方块替换':
            for (let 目标标签 in 查询标签) {
                //拟态矩阵 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '方块替换')
            }
            break

        case '拟态矩阵:标记起点':
            for (let 目标标签 in 查询标签) {
                //拟态矩阵 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '标记起点', 查询坐标)
            }
            break

        case '拟态矩阵:标记终点':
            for (let 目标标签 in 查询标签) {
                //拟态矩阵 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '标记终点', 查询坐标)
            }
            break

        case '拟态矩阵:标记方块':
            for (let 目标标签 in 查询标签) {
                //拟态矩阵 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '等待方块')
            }
            break

        case '拟态矩阵:方块标定':
            for (let 目标标签 in 查询标签) {
                //拟态矩阵 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '方块标定')
            }
            break

        case '拟态矩阵:方块调试':
            for (let 目标标签 in 查询标签) {
                //拟态矩阵 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '方块调试')
            }
            break

        case '拟态矩阵:结构复制':
            for (let 目标标签 in 查询标签) {
                //拟态矩阵 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:拟态矩阵":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:拟态矩阵', 当前玩家, 8)
                功能.拟态矩阵(当前玩家, '', 方块坐标, '结构复制')
            }
            break

        case '特殊道具:物资整理':
            基础.通用组件.移除物品(当前玩家)
            功能.物资整理(当前玩家, '点击方块')
            break

        default:
            break
    }
}
)
world.events.beforeItemUse.subscribe((使用物品) => { //当玩家使用物品时
    //定义实现当前功能所需的变量
    let
        当前玩家 = 使用物品.source,
        查询标签 = 当前玩家.getTags()
    //修正维度信息
    for (let 目标标签 in 查询标签) {
        //维度修正 的 使用后 的 冷却机制
        if (查询标签[目标标签].startsWith(`{"特殊冷却:维度修正":{`)) {
            var
                功能禁用_α = true
        }
    }
    if (功能禁用_α != true) {
        基础.数据标签.存储数值('特殊冷却:维度修正', 当前玩家, 32)
        基础.维度修正(使用物品.source)
    }
    //使用物品时的自定义效果
    switch (使用物品.item.typeId) {
        case '基础书籍:魔导手册':
            功能.魔导手册(当前玩家)
            break

        case '魔法礼盒:浮光镜影':
            功能.浮光镜影(当前玩家)
            break

        case '魔法工具:魔晶弹珠':
            功能.魔晶弹珠(当前玩家)
            break

        case '特殊道具:锚点虚印':
            功能.锚点虚印(当前玩家)
            break

        case '特殊道具:物资整理':
            基础.通用组件.移除物品(当前玩家)
            功能.物资整理(当前玩家, '使用物品')
            break

        case '载具控制:仓储过滤':
            for (let 目标标签 in 查询标签) {
                //特殊道具 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:特殊道具":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:特殊道具', 当前玩家, 8)
                功能.仓储过滤(当前玩家, '道具模式')
            }
            break

        case '特殊道具:状态显示':
            for (let 目标标签 in 查询标签) {
                //特殊道具 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:特殊道具":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:特殊道具', 当前玩家, 8)
                功能.状态显示(当前玩家, '道具模式')
            }
            break

        case '魔法礼盒:匣里乾坤':
            for (let 目标标签 in 查询标签) {
                //特殊道具 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:特殊道具":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:特殊道具', 当前玩家, 8)
                功能.匣里乾坤(当前玩家)
            }
            break

        case '魔法书籍:瞬间移动':
            for (let 目标标签 in 查询标签) {
                //魔法书籍 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:魔法书籍":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:魔法书籍', 当前玩家, 20)
                功能.瞬间移动(当前玩家)
            }
            break

        case '魔法书籍:林业指南':
            for (let 目标标签 in 查询标签) {
                //魔法书籍 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:魔法书籍":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:魔法书籍', 当前玩家, 20)
                功能.林木植伐(当前玩家)
            }
            break

        case '魔法书籍:矿物辞典':
            for (let 目标标签 in 查询标签) {
                //魔法书籍 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:魔法书籍":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:魔法书籍', 当前玩家, 20)
                功能.矿物辞典(当前玩家)
            }
            break

        case '魔法书籍:精灵结契':
            for (let 目标标签 in 查询标签) {
                //魔法书籍 的 使用后 的 冷却机制
                if (查询标签[目标标签].startsWith(`{"道具冷却:魔法书籍":{`)) {
                    var
                        功能禁用_β = true
                }
            }
            if (功能禁用_β != true) {
                基础.数据标签.存储数值('道具冷却:魔法书籍', 当前玩家, 20)
                功能.精灵结契(当前玩家)
            }
            break
    }
}
)
world.events.entityHurt.subscribe((实体损伤) => { //当实体受到损伤时
    //执行功能
    switch (实体损伤.hurtEntity.typeId) {
        case '矩阵接口:容器': case '矩阵接口:绘制': case '矩阵接口:锚点':
            break

        default:
            switch (实体损伤.hurtEntity.typeId) {
                case 'minecraft:iron_golem':
                    var
                        悬浮 = 1
                    break

                case 'minecraft:warden':
                    var
                        悬浮 = 1.5
                    break

                case 'minecraft:ravager':
                    var
                        悬浮 = 1
                    break

                default:
                    var
                        悬浮 = 0
                    break
            }
            功能.伤害显示(实体损伤.hurtEntity, 实体损伤.damage, 实体损伤.hurtEntity.location, 悬浮)
            break
    }
}
)
world.events.tick.subscribe(() => { //使用道具后的效果冷却机制
    if (等待执行 == 0) {
        for (const 用户 of world.getPlayers()) {
            let
                标签 = 用户.getTags()
            for (let 指针 in 标签) {
                //魔法书籍 的 使用后 的 冷却机制
                if (标签[指针].startsWith(`{"道具冷却:魔法书籍":{`)) {
                    let
                        数值 = parseInt(JSON.parse(标签[指针])["道具冷却:魔法书籍"]["数据值"]),
                        类型 = '道具冷却:魔法书籍'
                    //对标签信息进行处理
                    if (数值 >= 1) {
                        //定义标签样式
                        let
                            有效信息 = { [类型]: { "数据值": 数值 - 1 } },
                            无效信息 = { [类型]: { "数据值": 数值 } }
                        //对标签信息进行更新
                        用户.removeTag(JSON.stringify(无效信息))
                        用户.addTag(JSON.stringify(有效信息))
                    }
                    else {
                        //定义标签样式
                        let
                            无效信息 = { [类型]: { "数据值": 数值 } }
                        //对标签信息进行移除
                        用户.removeTag(JSON.stringify(无效信息))
                    }
                }
                //特殊道具 的 使用后 的 冷却机制
                if (标签[指针].startsWith(`{"道具冷却:特殊道具":{`)) {
                    let
                        数值 = parseInt(JSON.parse(标签[指针])["道具冷却:特殊道具"]["数据值"]),
                        类型 = '道具冷却:特殊道具'
                    //对标签信息进行处理
                    if (数值 >= 1) {
                        //定义标签样式
                        let
                            有效信息 = { [类型]: { "数据值": 数值 - 1 } },
                            无效信息 = { [类型]: { "数据值": 数值 } }
                        //对标签信息进行更新
                        用户.removeTag(JSON.stringify(无效信息))
                        用户.addTag(JSON.stringify(有效信息))
                    }
                    else {
                        //定义标签样式
                        let
                            无效信息 = { [类型]: { "数据值": 数值 } }
                        //对标签信息进行移除
                        用户.removeTag(JSON.stringify(无效信息))
                    }
                }
                //拟态矩阵 的 使用后 的 冷却机制
                if (标签[指针].startsWith(`{"道具冷却:拟态矩阵":{`)) {
                    let
                        数值 = parseInt(JSON.parse(标签[指针])["道具冷却:拟态矩阵"]["数据值"]),
                        类型 = '道具冷却:拟态矩阵'
                    //对标签信息进行处理
                    if (数值 >= 1) {
                        //定义标签样式
                        let
                            有效信息 = { [类型]: { "数据值": 数值 - 1 } },
                            无效信息 = { [类型]: { "数据值": 数值 } }
                        //对标签信息进行更新
                        用户.removeTag(JSON.stringify(无效信息))
                        用户.addTag(JSON.stringify(有效信息))
                    }
                    else {
                        //定义标签样式
                        let
                            无效信息 = { [类型]: { "数据值": 数值 } }
                        //对标签信息进行移除
                        用户.removeTag(JSON.stringify(无效信息))
                    }
                }
                //维度修正 的 使用后 的 冷却机制
                if (标签[指针].startsWith(`{"特殊冷却:维度修正":{`)) {
                    let
                        数值 = parseInt(JSON.parse(标签[指针])["特殊冷却:维度修正"]["数据值"]),
                        类型 = '特殊冷却:维度修正'
                    //对标签信息进行处理
                    if (数值 >= 1) {
                        //定义标签样式
                        let
                            有效信息 = { [类型]: { "数据值": 数值 - 1 } },
                            无效信息 = { [类型]: { "数据值": 数值 } }
                        //对标签信息进行更新
                        用户.removeTag(JSON.stringify(无效信息))
                        用户.addTag(JSON.stringify(有效信息))
                    }
                    else {
                        //定义标签样式
                        let
                            无效信息 = { [类型]: { "数据值": 数值 } }
                        //对标签信息进行移除
                        用户.removeTag(JSON.stringify(无效信息))
                    }
                }
            }
        }
        等待执行 = 4
    }
    else {
        等待执行 -= 1
    }
}
)