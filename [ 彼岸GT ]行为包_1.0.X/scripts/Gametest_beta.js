//导入< gametest >接口
import { ActionFormData, MessageFormData, ModalFormData } from "mojang-minecraft-ui"
import { world, EntityRaycastOptions, Location, BlockLocation } from 'mojang-minecraft'

//定义功能方法
function 查询信息_实体名称(实体名称) {
    if (实体名称.id == 'minecraft:player') {
        return `{ "text": "${实体名称.name}" }`
    }
    else {
        let 查询_命名空间 = 实体名称.id.split(':')
        return `{ "translate": "entity.${(查询_命名空间[0] == 'minecraft') ? 查询_命名空间[1] : 实体名称.id}.name" }`
    }
}
function 使用道具_匣里乾坤(当前用户) {
    if (当前用户.hasTag('Box_World.is_stored')) {
        //释放被存储的实体 并 储存附近的实体
        当前用户.runCommand(`structure load ${当前用户.name} ~-5~3~-5 0_degrees none true false 100`)
        当前用户.runCommand(`structure save ${当前用户.name} ~5~2~5 ~-5~-2~-5 true disk true`)

        //播放使用动画与音效
        当前用户.runCommand("playanimation @s animation.hold_use.magic_bow default 1.0")
        当前用户.runCommand("playsound conduit.activate @a[r=15] ~~~")

        //对附近的实体进行处理
        当前用户.runCommand("function Data/BoxSpace_CleanEntity")

    }
    else {
        //当初次使用该功能时 进行初始化设置
        当前用户.runCommand("tag @s add Box_World.is_stored")
        当前用户.runCommand(`structure save ${当前用户.name} ~~~ ~~~ true disk true`)
    }

}
function 使用道具_锚点虚印(当前用户) {
    switch (当前用户.isSneaking) {
        case true:
            模态界面_锚点虚印(当前用户)
            break

        case false:
            当前用户.runCommand(`title ${当前用户.name} actionbar 正在召集 |> @e[tag=${当前用户.name},tag=!SitDown] <| `)
            当前用户.runCommand(`event entity @e[tag=${当前用户.name},tag=!SitDown] 事件:锚点虚印`)
            当前用户.runCommand(`tp @e[tag=${当前用户.name},tag=!SitDown] ~~~`)
            break
    }
}
function 动作界面_基础列表(当前用户) {
    //定义部分变量
    var 页面元素 = new ActionFormData()
    //定义页面元素
    页面元素 = 页面元素.body("§7基础列表")
        .title("§6==========§o§l§5 彼岸浮梦 §r§6==========")
        .button("§l§1查看§1[§0§o§l 项目开发 §1]§r", "textures/ui/book_addtextpage_default")
        .button("§l§1查看§1[§3§o§l 浮世众生 §1]§r", "textures/ui/book_addtextpage_default")
        .button("§l§1查看§1[§5§o§l 魔导工业 §1]§r", "textures/ui/book_addtextpage_default")
        .button("§l§1查看§1[§8§o§l 秘境探索 §1]§r", "textures/ui/book_addtextpage_default")
        .button("§l§1查看§1[§c§o§l 基岩计划 §1]§r", "textures/ui/book_addtextpage_default")
        .button("§l§1查看§1[§c§o§l 矩阵接口 §1]§r", "textures/ui/book_addtextpage_default")
    if (当前用户.hasTag('Gametest.GetMagic_CareFor')) {
        页面元素.button("§l§9设置§1[§4§o§l 血量显示 §1]§r", "textures/ui/book_addtextpage_default")
        页面元素.button("§l§9设置§1[§4§o§l 快捷传送 §1]§r", "textures/ui/book_addtextpage_default")
        页面元素.button("§l§9设置§1[§4§o§l 锚点虚印 §1]§r", "textures/ui/book_addtextpage_default")
    }
    //输出玩家选择
    页面元素.show(当前用户).then((用户选择) => {

        switch (用户选择.selection) {
            case 6:
                模态界面_血量显示(当前用户)
                break

            case 7:
                模态界面_快捷传送(当前用户)
                break

            case 8:
                模态界面_锚点虚印(当前用户)
                break

            default:
                break
        }
    }
    )
}
function 模态界面_血量显示(当前用户) {
    //定义部分变量
    var 页面元素 = new ModalFormData()
    //基础页面元素
    页面元素 = 页面元素.title("<§4§o§l 血量显示 §r>§9操作界面")
        //可调页面元素
        .dropdown("设置<§4§o§l 血量显示 §r>", ["§2常规显示§r", "§b详细显示§r", "§4关闭功能§r"], 0)
        .slider("§6设置§a 侦测范围§r", 8, 32, 8, 16)
        //输出玩家选择
        .show(当前用户).then((用户选择) => {
            if (用户选择.isCanceled) {
                动作界面_基础列表(当前用户)
            }
            switch (用户选择.formValues[0]) {
                case 0:
                    当前用户.runCommand("function HealthShow/BaseShow")
                    switch (用户选择.formValues[1]) {

                        case 8:
                            当前用户.runCommand("function HealthShow/Range_08")
                            break

                        case 16:
                            当前用户.runCommand("function HealthShow/Range_16")
                            break

                        case 24:
                            当前用户.runCommand("function HealthShow/Range_24")
                            break

                        case 32:
                            当前用户.runCommand("function HealthShow/Range_32")
                            break

                        default:
                            break

                    }
                    break

                case 1:
                    当前用户.runCommand("function HealthShow/ManyShow")
                    switch (用户选择.formValues[1]) {

                        case 8:
                            当前用户.runCommand("function HealthShow/Range_08")
                            break

                        case 16:
                            当前用户.runCommand("function HealthShow/Range_16")
                            break

                        case 24:
                            当前用户.runCommand("function HealthShow/Range_24")
                            break

                        case 32:
                            当前用户.runCommand("function HealthShow/Range_32")
                            break

                        default:
                            break

                    }
                    break

                case 2:
                    当前用户.runCommand("function HealthShow/CloseShow")
                    break

                default:
                    break
            }
        }
        )
}
function 模态界面_快捷传送(当前用户) {
    //定义部分变量
    const 当前坐标 = new BlockLocation(Math.floor(当前用户.location.x), Math.floor(当前用户.location.y), Math.floor(当前用户.location.z))
    var 页面元素 = new ModalFormData()
    //基础页面元素
    页面元素 = 页面元素.title("<§4§o§l 快捷传送 §r>§9操作界面")
        //可调页面元素
        .dropdown("设置<§4§o§l 快捷传送 §r>", ["§4§l相对传送§r", "§d§l随机传送§r", "§b§l绝对传送§r"], 0)
        .slider("§4相对§a X轴坐标§r", -64, 64, 1, 0)
        .slider("§4相对§a Y轴坐标§r", -64, 64, 1, 0)
        .slider("§4相对§a Z轴坐标§r", -64, 64, 1, 0)
        .textField("§b绝对§c 三轴坐标§r", "§c请输入目的地坐标§r", `${当前坐标.x} ${当前坐标.y} ${当前坐标.z}`)
        //输出玩家选择
        .show(当前用户).then((用户选择) => {
            switch (用户选择.formValues[0]) {
                case 0:
                    当前用户.teleport(new Location(当前坐标.x + 用户选择.formValues[1], 当前坐标.y + 用户选择.formValues[2], 当前坐标.z + 用户选择.formValues[3]), 当前用户.dimension, 0, 0)
                    break

                case 1:
                    当前用户.runCommand(`spreadplayers ~${用户选择.formValues[1]} ~${用户选择.formValues[3]} 5 15 @s`)
                    break

                case 2:
                    当前用户.runCommand(`tp ${当前用户.name} ${用户选择.formValues[4]}`)
                    break
            }
        }
        )
}
function 模态界面_锚点虚印(当前用户) {
    //定义部分变量
    const 当前坐标 = new BlockLocation(Math.floor(当前用户.location.x), Math.floor(当前用户.location.y), Math.floor(当前用户.location.z))
    var 页面元素 = new ModalFormData()
    //基础页面元素
    页面元素 = 页面元素.title("<§c§o§l 锚点虚印 §r>§9操作界面")
        //可调页面元素
        .dropdown("设置<§c§o§l 锚点虚印 §r>", ["§3§l执行§r<§9§o§l 锚点召集 §r>", "§3§l缔结§r<§5§o§l 锚点虚印 §r>", "§c§l消除§r<§4§o§l 锚点虚印 §r>"], 0)
        .slider("§6设置§r <§9§o§l 锚点召集 §r> §a有效范围§r", 1, 64, 1, 32)
        .slider("§6设置§r <§9§o§l 锚点召集 §r> §a有效数量§r", 1, 64, 1, 16)
        .slider("§c设置§r <§4§o§l 锚点虚印 §r> §a修改范围§r", 1, 16, 1, 16)
        .toggle("§c设置§r <§9§o§l 锚点召集 §r> §a范围限制§r", true)
        .textField("<§9§o§l 锚点虚印 §r>§c召集点坐标§r", "§c请输入 召集点 坐标§r", `${当前坐标.x} ${当前坐标.y} ${当前坐标.z}`)
        //输出玩家选择
        .show(当前用户).then((用户选择) => {
            switch (用户选择.formValues[0]) {
                case 0:
                    当前用户.runCommand(`event entity @e[tag=` + `${当前用户.name}` + `,r=${用户选择.formValues[1]}` + `,tag=!SitDown] 事件:锚点虚印`)
                    当前用户.runCommand("tp @e[tag=" + `${当前用户.name}` + `${(用户选择.formValues[4]) ? `,r=${用户选择.formValues[1]}` : ""}` + `,c=${用户选择.formValues[2]}` + `,tag=!SitDown] ${用户选择.formValues[5]}`)
                    当前用户.runCommand(`title ${当前用户.name} actionbar 正在召集 |> @e[tag=` + `${当前用户.name}` + `${(用户选择.formValues[4]) ? `,r=${用户选择.formValues[1]}` : ""}` + `,c=${用户选择.formValues[2]}` + `,tag=!SitDown] <| `)
                    break

                case 1:
                    当前用户.runCommand(`tag @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=${用户选择.formValues[3]}] add ${当前用户.name}`)
                    当前用户.runCommand(`title ${当前用户.name} actionbar 您已与 |> @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=8] <| 完成了<§6 锚点虚印 §r>的绑定`)
                    break

                case 2:
                    当前用户.runCommand(`tag @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=${用户选择.formValues[3]}] remove ${当前用户.name}`)
                    当前用户.runCommand(`title ${当前用户.name} actionbar 您已与 |> @e[family=Tayun,family=Peer,tag=contract,tag=!SitDown,r=8] <| 取消了<§6 锚点虚印 §r>的绑定`)
                    break
            }
        }
        )
}

//订阅< 系统侦听 >
world.events.beforeItemUse.subscribe((物品使用) => { //侦听物品使用
    //物品使用的自定义效果
    switch (物品使用.item.id) {
        case '基础书籍:魔导手册':
            动作界面_基础列表(物品使用.source)
            break

        case '魔法礼盒:匣里乾坤':
            使用道具_匣里乾坤(物品使用.source)
            break

        case '魔法书籍:瞬间移动':
            switch (物品使用.source.isSneaking) {
                case true:
                    模态界面_快捷传送(物品使用.source)
                    break

                case false:
                    物品使用.source.runCommand(`spreadplayers ~ ~ 5 15 @s`)
                    break
            }
            break

        case '特殊道具:锚点虚印':
            使用道具_锚点虚印(物品使用.source)
            break

        default:
            break
    }
}
)
world.events.beforeChat.subscribe((聊天信息) => { //侦听聊天栏输入
    //定义部分变量
    var 当前用户 = 聊天信息.sender.name
    //定义新增命令
    switch (聊天信息.message) {
        case 'help':
            world.getDimension("overworld").runCommand(`tellraw ${当前用户} {"rawtext":[{"text":"==§o§l§c| 彼岸附加指令 |§r=="}]}`)
            world.getDimension("overworld").runCommand(`tellraw ${当前用户} {"rawtext":[{"text":"输入<§c Hs+ §r> 开启血量显示功能"}]}`)
            world.getDimension("overworld").runCommand(`tellraw ${当前用户} {"rawtext":[{"text":"输入<§c Hs- §r> 关闭血量显示功能"}]}`)
            world.getDimension("overworld").runCommand(`tellraw ${当前用户} {"rawtext":[{"text":"输入<§c Gm+ §r> 开启功能附加列表"}]}`)
            聊天信息.cancel = true
            break

        case 'Gametest.PlayerMode.Creative':
            world.getDimension("overworld").runCommand(`gamemode creative ${当前用户}`)
            聊天信息.cancel = true
            break

        case 'Gametest.PlayerMode.Survival':
            world.getDimension("overworld").runCommand(`gamemode survival ${当前用户}`)
            聊天信息.cancel = true
            break

        case 'Hs+':
            world.getDimension("overworld").runCommand(`tag ${当前用户} add Gametest.HealthShow`)
            聊天信息.cancel = true
            break

        case 'Hs-':
            world.getDimension("overworld").runCommand(`tag ${当前用户} remove Gametest.HealthShow`)
            聊天信息.cancel = true
            break

        case 'Gm+':
            world.getDimension("overworld").runCommand(`tag ${当前用户} add Gametest.GetMagic_CareFor`)
            聊天信息.cancel = true
            break

        default:
            break
    }
}
)
world.events.tick.subscribe(() => { //侦听每个游戏帧
    for (const 当前用户 of world.getPlayers()) {
        if (当前用户.hasTag('Gametest.HealthShow')) {
            //定义目标类型
            var 前方实体 = new EntityRaycastOptions()
            // 定义侦测距离
            if (当前用户.hasTag('Gametest.HealthShow.Range.08')) {
                前方实体.maxDistance = 8
            }
            else {
                if (当前用户.hasTag('Gametest.HealthShow.Range.16')) {
                    前方实体.maxDistance = 16
                }
                else {
                    if (当前用户.hasTag('Gametest.HealthShow.Range.24')) {
                        前方实体.maxDistance = 24
                    }
                    else {
                        if (当前用户.hasTag('Gametest.HealthShow.Range.32')) {
                            前方实体.maxDistance = 32
                        }
                    }
                }
            }
            // 定义目标名称
            let 实体名称 = 当前用户.getEntitiesFromViewVector(前方实体)[0]
            //执行功能判断
            if (实体名称) {
                //定义部分变量
                let 水下移速 = 实体名称.getComponent('underwater_movement')
                let 能否牵引 = 实体名称.getComponent('leashable')
                let 常规移速 = 实体名称.getComponent('movement')
                let 能否契约 = 实体名称.getComponent('tameable')
                let 健康状态 = 实体名称.getComponent('health')
                //执行功能判断
                if (当前用户.hasTag('Gametest.HealthShow_detailed')) {
                    if (健康状态) {
                        当前用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${查询信息_实体名称(实体名称)}, { "text": "\n§l§6实体标识符§r: ${实体名称.id}\n§l§e实体生命值§r: ${Math.round(健康状态.current)}/${健康状态.value}\n§l§2实体可牵引§r: ${!!能否牵引}\n§l§2实体可契约§r: ${!!能否契约}\n${(常规移速) ? `§l§5陆地移速值§r: ${常规移速.value.toFixed(2)}` : ""}\n${(水下移速) ? `§l§9水下移速值§r: ${水下移速.value.toFixed(2)}` : ""}"}]}`)
                    }
                    else {
                        当前用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${查询信息_实体名称(实体名称)}, { "text": "\n§l§6实体标识符§r: ${实体名称.id}" }]}`)
                    }
                }
                else {
                    if (当前用户.isSneaking) {
                        if (健康状态) {
                            当前用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${查询信息_实体名称(实体名称)}, { "text": "\n§l§6实体标识符§r: ${实体名称.id}\n§l§e实体生命值§r: ${Math.round(健康状态.current)}/${健康状态.value}\n§l§2实体可牵引§r: ${!!能否牵引}\n§l§2实体可契约§r: ${!!能否契约}\n${(常规移速) ? `§l§5陆地移速值§r: ${常规移速.value.toFixed(2)}` : ""}\n${(水下移速) ? `§l§9水下移速值§r: ${水下移速.value.toFixed(2)}` : ""}"}]}`)
                        }
                        else {
                            当前用户.runCommand(`titleraw @s actionbar { "rawtext": [ ${查询信息_实体名称(实体名称)}, { "text": "\n§l§6实体标识符§r: ${实体名称.id}" }]}`)
                        }
                    }
                    else {
                        当前用户.runCommand(`titleraw @s actionbar {"rawtext":[${查询信息_实体名称(实体名称)},{"text": "${(健康状态) ? `${`§8 | §r${Math.round(健康状态.current)}`}` : ""}"}]}`)
                    }
                }
            }
        }
    }
}
)
