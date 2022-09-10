
#作用 : 设定<gametest>所实现的< 血量显示 >的 基础显示 的开关
#时间 : 2021.09.4

#赋予标签

#消除标签
tag @s remove Gametest.HealthShow_detailed
tag @s remove Gametest.HealthShow

#提示玩家
tellraw @s {"rawtext":[{"text":"<§d 血量显示 §r> §4已关闭"}]}