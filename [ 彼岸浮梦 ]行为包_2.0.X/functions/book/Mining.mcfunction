
#作用 : <魔法卷宗 - 岩矿采掘>的功能实现
#时间 : 2022.08.04

#煤炭
execute if block ~~~ coal_ore                   run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ deepslate_coal_ore         run fill ~~~ ~~~ air 0 destroy

#铁矿
execute if block ~~~ iron_ore                   run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ deepslate_iron_ore         run fill ~~~ ~~~ air 0 destroy

#青金石
execute if block ~~~ lapis_ore                  run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ deepslate_lapis_ore        run fill ~~~ ~~~ air 0 destroy

#铜矿
execute if block ~~~ copper_ore                 run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ deepslate_copper_ore       run fill ~~~ ~~~ air 0 destroy

#金矿
execute if block ~~~ gold_ore                   run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ deepslate_gold_ore         run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ nether_gold_ore            run fill ~~~ ~~~ air 0 destroy

#红石
execute if block ~~~ redstone_ore               run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ deepslate_redstone_ore     run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ lit_redstone_ore           run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ lit_deepslate_redstone_ore run fill ~~~ ~~~ air 0 destroy

#钻石
execute if block ~~~ diamond_ore                run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ deepslate_diamond_ore      run fill ~~~ ~~~ air 0 destroy

#绿宝石
execute if block ~~~ emerald_ore                run fill ~~~ ~~~ air 0 destroy
execute if block ~~~ deepslate_emerald_ore      run fill ~~~ ~~~ air 0 destroy

#石英
execute if block ~~~ quartz_ore                 run fill ~~~ ~~~ air 0 destroy

#残骸
execute if block ~~~ ancient_debris             run fill ~~~ ~~~ air 0 destroy

#水晶
execute if block ~~~ amethyst_cluster           run fill ~~~ ~~~ air 0 destroy

#效果
particle 闪烁粒子:姹紫 ~~~

#物资收集
tp @e[r=5,type=xp_orb] @p
tp @e[r=5,type=item] @p