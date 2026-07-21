// このファイルは、1つのMakeCodeブロック教材に並べる初期形です。
// MakeCodeへ拡張機能を追加した後、JavaScript表示で貼り付け、ブロック表示へ戻します。

player.onChat("start02", function () {
    regalcast.prepare(RegalCastStage.Stage02)
})

player.onChat("mission02", function () {
    regalcast.useStage(RegalCastStage.Stage02)
    // 子どもが数字を考える。
    regalcast.moveForward(1)
    regalcast.turnLeft()
    regalcast.moveForward(1)
    regalcast.checkAnswer()
})

player.onChat("start04", function () {
    regalcast.prepare(RegalCastStage.Stage04)
})

player.onChat("mission04", function () {
    regalcast.useStage(RegalCastStage.Stage04)
    // その時に光っている金の台までの命令を、子どもがここへ組む。
    regalcast.moveForward(1)
    regalcast.checkAnswer()
})

player.onChat("start06", function () {
    regalcast.prepare(RegalCastStage.Stage06)
})

player.onChat("mission06", function () {
    regalcast.useStage(RegalCastStage.Stage06)
    // 子どもはMakeCodeの「くりかえし」ブロックを2つ置き、下の移動を中へ入れる。
    for (let index = 0; index < 1; index++) {
        regalcast.moveForward(4)
        regalcast.turnLeft()
        regalcast.moveForward(4)
        regalcast.turnRight()
    }
    for (let index = 0; index < 1; index++) {
        regalcast.moveForward(4)
        regalcast.turnRight()
        regalcast.moveForward(4)
        regalcast.turnLeft()
    }
    regalcast.checkAnswer()
})

player.onChat("agent_reset", function () {
    regalcast.resetAgent()
})

player.onChat("agent_hint", function () {
    regalcast.showHint()
})
