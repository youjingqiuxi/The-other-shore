
#作用 : 匣里乾坤的功能实现
#时间 : 2022.09.11

#播放 使用 动画 
playanimation @s animation.hold_use.magic_bow default 1.0

#播放 使用 音效
playsound conduit.activate @a[r=15] ~~~

#召唤附近的实体
tp @e[type=!player,r=8] @s

#移除匣里乾坤道具
replaceitem entity @s slot.weapon.mainhand 0 air
