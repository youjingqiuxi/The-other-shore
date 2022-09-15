
#作用 : 设定<gametest>所实现的< 状态侦测 >的侦测距离控制
#时间 : 2021.09.4

#赋予标签
tag @s add Gametest.HealthShow.Range.16

#消除标签
tag @s remove Gametest.HealthShow.Range.08
tag @s remove Gametest.HealthShow.Range.24
tag @s remove Gametest.HealthShow.Range.32

#提示玩家
tellraw @s {"rawtext":[{"text":"<§d 侦测范围 §r> §b已设置为: §b16"}]}