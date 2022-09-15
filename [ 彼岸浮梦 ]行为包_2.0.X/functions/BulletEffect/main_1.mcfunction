
#作用 :实现彗星天降的效果
#时间 : 2021.01.20

#运行
tp @s ~0.3 ~-0.5 ~

#赋值
scoreboard players add @s CD 1

#保险
execute as @s [scores={CD=5}] run tag @s add Unlock

#检测
tag @s[tag=Unlock] add ground
execute as @s [tag=Unlock] if block ~~~  air run tag @s remove ground

#销毁
event entity @s[tag=ground] 寻路终止

#效果
