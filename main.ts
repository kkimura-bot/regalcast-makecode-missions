/** 子どもがAgentの移動とくり返しだけに集中するためのRegalCast専用ブロック。 */

//% blockNamespace=regalcast
enum RegalCastStage {
    //% block="ステージ2 はじめてのAgent"
    Stage02 = 2,
    //% block="ステージ4 5つのスイッチ"
    Stage04 = 4,
    //% block="ステージ6 ドラゴン"
    Stage06 = 6
}

//% color="#5636A4" weight=95 icon="\uf135" block="RegalCast"
namespace regalcast {
    let selectedStage = 0
    let stage04Step = 0

    function agentIsAt(x: number, z: number, minY: number, maxY: number): boolean {
        const pos = agent.getPosition()
        const ax = pos.getValue(Axis.X)
        const ay = pos.getValue(Axis.Y)
        const az = pos.getValue(Axis.Z)
        return ax == x && az == z && ay >= minY && ay <= maxY
    }

    function fill(blockName: string, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): void {
        player.execute("fill " + x1 + " " + y1 + " " + z1 + " " + x2 + " " + y2 + " " + z2 + " " + blockName)
    }

    function title(mainText: string, subText: string): void {
        player.execute("title @s title " + mainText)
        player.execute("title @s subtitle " + subText)
    }

    function setStage04Circuit(step: number, blockName: string): void {
        if (step == 1) {
            fill(blockName, 0, 57, 238, 0, 57, 252)
            fill(blockName, -1, 57, 237, 1, 57, 239)
        } else if (step == 2) {
            fill(blockName, 3, 57, 253, 9, 57, 253)
            fill(blockName, 9, 57, 250, 17, 57, 253)
            fill(blockName, 16, 57, 249, 18, 57, 251)
        } else if (step == 3) {
            fill(blockName, 3, 57, 259, 7, 57, 259)
            fill(blockName, 7, 57, 259, 7, 57, 265)
            fill(blockName, 7, 57, 265, 11, 57, 265)
            fill(blockName, 11, 57, 265, 11, 57, 271)
            fill(blockName, 10, 57, 270, 12, 57, 272)
        } else if (step == 4) {
            fill(blockName, -7, 57, 259, -3, 57, 259)
            fill(blockName, -7, 57, 259, -7, 57, 265)
            fill(blockName, -11, 57, 265, -7, 57, 265)
            fill(blockName, -11, 57, 265, -11, 57, 271)
            fill(blockName, -12, 57, 270, -10, 57, 272)
        } else if (step == 5) {
            fill(blockName, -9, 57, 253, -3, 57, 253)
            fill(blockName, -9, 57, 250, -9, 57, 253)
            fill(blockName, -17, 57, 250, -9, 57, 250)
            fill(blockName, -18, 57, 249, -16, 57, 251)
        }
    }

    function resetStage02(): void {
        fill("redstone_block", -4, 81, 112, -3, 86, 112)
        fill("redstone_block", 3, 81, 112, 4, 86, 112)
        fill("amethyst_block", -2, 86, 112, 2, 88, 112)
        fill("iron_bars", -2, 80, 112, 2, 84, 112)
        agent.teleport(world(-4, 80, 94), 0)
    }

    function resetStage04(): void {
        stage04Step = 0
        for (let step = 1; step <= 5; step++) {
            setStage04Circuit(step, "amethyst_block")
        }
        fill("redstone_block", -5, 59, 280, -3, 65, 280)
        fill("redstone_block", 3, 59, 280, 5, 65, 280)
        fill("amethyst_block", -2, 66, 280, 2, 69, 280)
        agent.teleport(world(0, 58, 246), 180)
    }

    function resetStage06(): void {
        fill("gold_block", 207, 59, 211, 209, 59, 213)
        agent.teleport(world(208, 60, 228), 180)
    }

    //% blockId=regalcast_prepare block="%stage を じゅんびする"
    //% weight=100
    export function prepare(stage: RegalCastStage): void {
        selectedStage = stage
        if (stage == RegalCastStage.Stage02) {
            resetStage02()
            title("ステージ2", "青い道を数えて、Agentを金のゴールへ！")
        } else if (stage == RegalCastStage.Stage04) {
            resetStage04()
            title("ステージ4", "金のスイッチを1番から5番まで動かそう！")
        } else {
            resetStage06()
            title("さいごのミッション", "くり返しを2つつないで、ドラゴンを止めよう！")
        }
    }

    //% blockId=regalcast_use_stage block="いまは %stage に ちょうせん"
    //% weight=95
    export function useStage(stage: RegalCastStage): void {
        selectedStage = stage
    }

    //% blockId=regalcast_move_forward block="Agentを 前へ %steps マス"
    //% steps.min=1 steps.max=32 steps.defl=1
    //% weight=90
    export function moveForward(steps: number): void {
        agent.move(FORWARD, steps)
    }

    //% blockId=regalcast_turn_left block="Agentを 左へ向ける"
    //% weight=89
    export function turnLeft(): void {
        agent.turn(LEFT_TURN)
    }

    //% blockId=regalcast_turn_right block="Agentを 右へ向ける"
    //% weight=88
    export function turnRight(): void {
        agent.turn(RIGHT_TURN)
    }

    //% blockId=regalcast_reset block="Agentを 最初へもどす"
    //% weight=70
    export function resetAgent(): void {
        if (selectedStage == RegalCastStage.Stage02) {
            resetStage02()
        } else if (selectedStage == RegalCastStage.Stage04) {
            resetStage04()
        } else if (selectedStage == RegalCastStage.Stage06) {
            resetStage06()
        } else {
            player.say("先に『ステージをじゅんびする』を使ってね")
        }
    }

    //% blockId=regalcast_hint block="ヒントを見せる"
    //% weight=65
    export function showHint(): void {
        if (selectedStage == RegalCastStage.Stage02) {
            player.say("青いマスを数えよう。前へ → 左 → 前への順だよ")
        } else if (selectedStage == RegalCastStage.Stage04) {
            player.say("次は金の台 " + (stage04Step + 1) + " 番。着いたら『答えをたしかめる』！")
        } else if (selectedStage == RegalCastStage.Stage06) {
            player.say("左へ曲がるくり返しと、右へ曲がるくり返しをつなごう")
        } else {
            player.say("先にステージをえらんでね")
        }
    }

    function checkStage02(): void {
        if (!agentIsAt(-1, 102, 80, 82)) {
            title("もう一度やってみよう", "Agentを金の台のまんなかまで動かしてね")
            return
        }
        fill("emerald_block", -4, 81, 112, -3, 86, 112)
        fill("emerald_block", 3, 81, 112, 4, 86, 112)
        fill("sea_lantern", -2, 86, 112, 2, 88, 112)
        fill("air", -2, 80, 112, 2, 84, 112)
        title("できた！", "ステージ2 クリア！")
        agent.teleport(world(0, 58, 246), 180)
    }

    function checkStage04(): void {
        const targetX = [0, 17, 11, -11, -17]
        const targetZ = [238, 250, 271, 271, 250]
        if (stage04Step >= 5) {
            player.say("5つのスイッチは、もう全部できているよ！")
            return
        }
        if (!agentIsAt(targetX[stage04Step], targetZ[stage04Step], 58, 60)) {
            title("おしい！", "Agentを次の金の台のまんなかへ動かそう")
            return
        }
        stage04Step += 1
        setStage04Circuit(stage04Step, "emerald_block")
        if (stage04Step < 5) {
            title("スイッチ " + stage04Step + " できた！", "次は " + (stage04Step + 1) + " 番へ進もう")
        } else {
            fill("emerald_block", -5, 59, 280, -3, 65, 280)
            fill("emerald_block", 3, 59, 280, 5, 65, 280)
            fill("sea_lantern", -2, 66, 280, 2, 69, 280)
            title("5つ全部できた！", "ステージ4 クリア！")
        }
    }

    function checkStage06(): void {
        if (!agentIsAt(208, 212, 60, 62)) {
            title("あと少し！", "2つのくり返しをつないで、金のゴールへ進もう")
            return
        }
        fill("emerald_block", 207, 59, 211, 209, 59, 213)
        player.execute("tp @e[tag=rc_stage06_dragon,c=1] 208 94 208 facing 208 60 230")
        player.execute("summon lightning_bolt 208 94 208")
        player.execute("playsound mob.enderdragon.death @a 208 94 208 2 1")
        player.execute("kill @e[tag=rc_stage06_dragon]")
        title("ドラゴンを止めた！", "さいごのミッション クリア！")
        loops.pause(1800)
        player.teleport(world(112, 80, 12))
    }

    //% blockId=regalcast_check block="答えを たしかめる"
    //% weight=60
    export function checkAnswer(): void {
        if (selectedStage == RegalCastStage.Stage02) {
            checkStage02()
        } else if (selectedStage == RegalCastStage.Stage04) {
            checkStage04()
        } else if (selectedStage == RegalCastStage.Stage06) {
            checkStage06()
        } else {
            player.say("先に『いまはステージ○にちょうせん』を入れてね")
        }
    }
}
