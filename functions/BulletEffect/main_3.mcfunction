
#作用 :实现星芒天降的效果
#时间 : 2021.01.20

#运行
tp @s ~ ~-0.75 ~

#赋值
scoreboard players add @s CD 1

#保险
execute as @s [scores={CD=5}] run tag @s add Unlock

#检测
tag @s[tag=Unlock] add ground
execute as @s [tag=Unlock] if block ~~~ air run tag @s remove ground

#效果
event entity @s[tag=ground] 星芒爆发

#效果
