//导入< gametest >接口
import { ActionFormData, MessageFormData, ModalFormData } from "mojang-minecraft-ui"
import { world, EntityRaycastOptions, Location, BlockLocation } from 'mojang-minecraft'

//定义功能方法
function 实验性_动作界面(当前用户) {
    //定义部分变量
    var 页面元素 = new ActionFormData()

    //定义页面元素
    页面元素 = 页面元素.body("§7快速操作")
        .title("<§d 血量显示 §r>§9操作界面")
        .button("§4关闭§r[§d 血量显示 §r]", "textures/GUI/血量显示/功能关闭")
        .button("§2开启§r[§d 血量显示 §r]", "textures/GUI/血量显示/功能开启")
        .button("§2开启§r[§e 详细设置 §r]", "textures/ui/book_addtextpage_default")

        //输出玩家选择
        .show(当前用户).then((用户选择) => {

            switch (用户选择.selection) {

                case 0:
                    当前用户.runCommand(`tag @s remove Gametest.HealthShow`)
                    当前用户.runCommand(`tellraw @s {"rawtext":[{"text":"<§d 血量显示 §r> §4已关闭"}]}`)
                    break

                case 1:
                    当前用户.runCommand(`tag @s add Gametest.HealthShow`)
                    当前用户.runCommand(`tellraw @s {"rawtext":[{"text":"<§d 血量显示 §r> §2已开启"}]}`)
                    break

                case 2:
                    当前用户.runCommand(`say 打开新的界面`)
                    break

                default:
                    break
            }
        }
    )
}
function 实验性_模态界面(当前用户) {
    //定义部分变量
    var 页面元素 = new ModalFormData()

    //基础页面元素
    页面元素 = 页面元素.title("页面标题< 该页面暂时无具体效果 >")
        //.icon("textures/GUI/QR_code")
        //可调页面元素
        .dropdown("单项选择", ["选项0", "选项1", "选项2", "选项3"], 0) //下标 0
        .textField("文本输入", "需要发送的文本", "测试成功") //下标 1
        .slider("滑动选择", 0, 10, 1, 0) //下标 2
        .toggle("是否开启", true) // 下标 3

        //输出玩家选择
        .show(当前用户).then((用户选择) => {
            //当前用户.runCommand("say " + 用户选择.formValues[0] + 用户选择.formValues[1] + 用户选择.formValues[2] + 用户选择.formValues[3])
            switch (用户选择.formValues[0]) {

                case 0:
                    world.getDimension("overworld").runCommand(`say ${当前用户.name}按下了选择 0`)
                    break

                case 1:
                    world.getDimension("overworld").runCommand(`say ${当前用户.name}按下了选择 1`)
                    break

                case 2:
                    world.getDimension("overworld").runCommand(`say ${当前用户.name}按下了选择 2`)
                    break

                case 3:
                    world.getDimension("overworld").runCommand(`say ${当前用户.name}按下了选择 3`)
                    break

                default:
                    break

            }
        }
    )
}
function 实验性_消息界面(当前用户) {
    //定义部分变量
    var 页面元素 = new MessageFormData()

    //定义页面元素
    页面元素 = 页面元素.title("MESSAGE TITLE TEST")
        .body("MESSAGE UI提醒你一条消息")
        .button1("点击BUTTON1")
        .button2("点击BUTTON2")

        //输出玩家选择
        .show(当前用户).then((用户选择) => {
            switch (用户选择.selection[0]) {

                case 0:
                    当前用户.runCommand(`say ${当前用户.name}按下了BUTTON2`)
                    break

                case 1:
                    当前用户.runCommand(`say ${当前用户.name}按下了BUTTON1`)
                    break

                default:
                    break

            }
        }
    )
}

//订阅< 系统侦听 >
world.events.buttonPush.subscribe((按下按钮) => { //侦听按钮按下
}
)
