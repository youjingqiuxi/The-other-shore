
#作用 : 用于控制角色手中盾牌的耐久的机制
#时间 : 2022.07.28

#赋值
scoreboard players add @s CC 1

#提示
execute as @s [scores={CC=260..}] run particle 提示图标:碎盾警示 ~ ~2 ~

#破盾
execute as @s [scores={CC=270..}] run replaceitem entity @s slot.weapon.offhand 0 air
execute as @s [scores={CC=270..}] run playsound random.break @a[r=15] ~~~
execute as @s [scores={CC=270..}] run scoreboard players set @s CC 0