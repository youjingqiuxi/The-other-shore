
#作用 : 设定<gametest>所实现的< 状态侦测 >的 基础显示 的开关
#时间 : 2021.09.4

#赋予标签
tag @s add Gametest.HealthShow

#消除标签
tag @s remove Gametest.HealthShow_detailed

#提示玩家
tellraw @s {"rawtext":[{"text":"<§d 基础显示 §r> §2已开启"}]}