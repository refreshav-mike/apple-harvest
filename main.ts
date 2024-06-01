namespace SpriteKind {
    export const Wall = SpriteKind.create()
    export const Intro = SpriteKind.create()
    export const Setup = SpriteKind.create()
    export const Apple = SpriteKind.create()
    export const Bin = SpriteKind.create()
}
namespace StatusBarKind {
    export const Apples = StatusBarKind.create()
}
function scene_setup_farmer_next (dir2: number, player2: number) {
    if (scene_setup_players[0] == player2) {
        if (scene_setup_players[0] == 1) {
            scene_setup_farmer_sprite = farmer_p1
        } else {
            scene_setup_farmer_sprite = farmer_p2
        }
        scene_setup_farmer_sprite += dir2
        if (scene_setup_farmer_sprite >= farmers_names.length) {
            scene_setup_farmer_sprite = 0
        } else if (scene_setup_farmer_sprite < 0) {
            scene_setup_farmer_sprite = farmers_names.length - 1
        }
        music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.InBackground)
        if (scene_setup_players[0] == 1) {
            farmer_p1 = scene_setup_farmer_sprite
        } else {
            farmer_p2 = scene_setup_farmer_sprite
        }
        scene_setup_farmer(scene_setup_farmer_sprite)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Apple, function (sprite, otherSprite) {
    if (mp.getPlayerBySprite(sprite) == mp.playerSelector(mp.PlayerNumber.One)) {
        if (player_1_bucket.value == 5) {
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
            otherSprite.setFlag(SpriteFlag.Ghost, true)
            otherSprite.setFlag(SpriteFlag.DestroyOnWall, true)
            if (otherSprite.x < 60) {
                otherSprite.setVelocity(-500, -50)
            } else {
                otherSprite.setVelocity(500, -50)
            }
        } else {
            sprites.destroy(otherSprite)
            player_1_bucket.value += 1
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        }
    } else {
        if (player_2_bucket.value == 5) {
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
            otherSprite.setFlag(SpriteFlag.Ghost, true)
            otherSprite.setFlag(SpriteFlag.DestroyOnWall, true)
            if (otherSprite.x < 60) {
                otherSprite.setVelocity(-500, -50)
            } else {
                otherSprite.setVelocity(500, -50)
            }
        } else {
            sprites.destroy(otherSprite)
            player_2_bucket.value += 1
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        }
    }
})
function scene_game_update_bin (bin: Sprite, score: number) {
    if (score < 5) {
        bin.setImage(assets.image`bin_0`)
    } else if (score < 10) {
        bin.setImage(assets.image`bin_1`)
    } else if (score < 15) {
        bin.setImage(assets.image`bin_2`)
    } else if (score < 20) {
        bin.setImage(assets.image`bin_3`)
    } else if (score < 25) {
        bin.setImage(assets.image`bin_4`)
    } else if (score < 30) {
        bin.setImage(assets.image`bin_5`)
    } else {
        bin.setImage(assets.image`bin_6`)
    }
}
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 0) {
        scene_intro_button(1)
    } else if (scene_current == 1) {
        scene_setup_button(2)
    } else if (scene_current == 2) {
        scene_game_jump_player(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)))
    }
})
function scene_intro () {
    sprite_title = sprites.create(assets.image`sprite_title`, SpriteKind.Intro)
    sprite_title.setPosition(80, 40)
    animation.runImageAnimation(
    sprite_title,
    assets.animation`sprite_animation_title`,
    200,
    true
    )
    music.play(music.stringPlayable("C5 A B G A F G E ", 400), music.PlaybackMode.InBackground)
    for (let index = 0; index < 40; index++) {
        sprite_apple = sprites.create(assets.image`sprite_apple`, SpriteKind.Intro)
        sprite_apple.setPosition(randint(1, 159), -20)
        sprite_apple.vy = randint(60, 120)
        sprite_apple.ay = randint(60, 120)
    }
    sprite_start_1 = textsprite.create(" 1P Start")
    sprite_start_1.setKind(SpriteKind.Intro)
    sprite_start_1.setIcon(assets.image`sprite_a`)
    sprite_start_1.setOutline(1, 2)
    sprite_start_1.setPosition(80, 90)
    sprite_start_2 = textsprite.create(" 2P Start")
    sprite_start_2.setKind(SpriteKind.Intro)
    sprite_start_2.setIcon(assets.image`sprite_b`)
    sprite_start_2.setOutline(1, 2)
    sprite_start_2.setPosition(80, 110)
}
function scene_setup () {
    sprite_setup_title = textsprite.create("P" + ("" + scene_setup_players[0] + ": Choose Your Farmer"))
    if (scene_setup_players[0] == 1) {
        sprite_setup_title.setOutline(1, 14)
    } else {
        sprite_setup_title.setOutline(1, 6)
    }
    sprite_setup_title.setMaxFontHeight(5)
    sprite_setup_title.setPosition(80, 10)
    sprite_setup_title.setKind(SpriteKind.Setup)
    scene_setup_farmer(0)
}
scene.onHitWall(SpriteKind.Apple, function (sprite, location) {
    sprites.destroy(sprite)
})
// Sets the setup screen to the farmer ID for player consideration
function scene_setup_farmer (farmer_sprite_id: number) {
    sprites.destroy(sprite_setup_farmer)
    sprites.destroy(sprite_farmer)
    sprite_farmer = sprites.create(farmers_sprites_64[farmer_sprite_id], SpriteKind.Setup)
    sprite_setup_farmer = textsprite.create(" " + farmers_names[farmer_sprite_id])
    sprite_setup_farmer.setKind(SpriteKind.Setup)
    sprite_setup_farmer.setIcon(assets.image`sprite_a`)
    sprite_setup_farmer.setPosition(80, 100)
    if (scene_setup_players[0] == 1) {
        scene.setBackgroundColor(13)
        sprite_setup_farmer.setOutline(1, 14)
        sprite_setup_left = sprites.create(assets.image`sprite_left_p1`, SpriteKind.Setup)
        sprite_setup_right = sprites.create(assets.image`sprite_right_p1`, SpriteKind.Setup)
    } else {
        scene.setBackgroundColor(9)
        sprite_setup_farmer.setOutline(1, 6)
        sprite_setup_left = sprites.create(assets.image`sprite_left_p2`, SpriteKind.Setup)
        sprite_setup_right = sprites.create(assets.image`sprite_right_p2`, SpriteKind.Setup)
    }
    sprite_setup_left.setPosition(30, 60)
    sprite_setup_right.setPosition(130, 60)
}
function scene_game_jump_player (player2: Sprite) {
    if (player2.vy == 0) {
        player2.vy = -160
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bin, function (sprite, otherSprite) {
    if (mp.getPlayerBySprite(sprite) == mp.playerSelector(mp.PlayerNumber.One) && sprites.readDataNumber(otherSprite, "player") == 1) {
        if (player_1_bucket.value > 0) {
            mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score, player_1_bucket.value)
            player_1_bucket.value = 0
            music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
            scene_game_update_bin(otherSprite, mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score))
        }
    } else if (mp.getPlayerBySprite(sprite) == mp.playerSelector(mp.PlayerNumber.Two) && sprites.readDataNumber(otherSprite, "player") == 2) {
        if (player_2_bucket.value > 0) {
            mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score, player_2_bucket.value)
            player_2_bucket.value = 0
            music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
            scene_game_update_bin(otherSprite, mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score))
        }
    }
})
function scene_intro_button (players_selected: number) {
    players = players_selected
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Intro, effects.spray, 500)
    scene_current = 1
    pause(1000)
    scene_setup_players = [1]
    if (players > 1) {
        scene_setup_players.push(players)
    }
    scene_setup()
}
function scene_game () {
    scene.setBackgroundColor(9)
    scene.setBackgroundImage(img`
        ..........................7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777...........................................
        .........................77722222777777777777777777777777777777777777777777777777777777777777777777777777777777722222777........................................
        ........................77772222277777777777777777777777777777777772222277777777777777777777777777777777777777772222277777......................................
        ........................777722222777777777777777777777777777777777722222777777777777777777777777777777777777777722222777777.....................................
        ........................777722222777777777777777777777777777777777722222777777777777777777777777777777777777777722222777777.....................................
        ........................777722222777777777772222277777777777777777722222777777777777777777777777777777777777777722222777777.....................................
        ........................777777777777777777772222277777777777777777722222777777777777777777777777777777777777777777777777777.....................................
        .........................77777777777777777772222277777777777777777777777777777777777777777777777777777777777777777777777777.....................................
        .........................777777777777777777722222e.77777777777777777777777777777777777777777777777777777777777777777777777......................................
        .........................777777777777777777722222eeee77777777777777777777777777777777777777722222777777777777777777777777.......................................
        ...........................77777777777777777eeeeeeeeee777777777777777777777777777777777777772222277777777777777777777777........................................
        ...........................7777777777777....eeeeeeeeeeee777777777eeeeee...77777777777777777722222777777777777777777777..........................................
        ............................777777777777.....eeeeeeeeeee.......eeeeeeee....77777777777777777222227777777777777777777............................................
        ............................777777777777.....eeeeeeeeeeee......eeeeeeeee....777777777777777722222777777777777777777.............................................
        .............................77777777777.....eeeeeeeeeeee......eeeeeeeee....ee77777777777777777777777777777777777...............................................
        .............................7777777777......eeeeeeeeeeee......eeeeeeeee....ee7777777777777eeee77777777777777777................................................
        .............................77777777.........eeeeeeeeeee......eeeeeeeee....eeeeee......eeeeeeeee.7777777777777.................................................
        ..............................................eeeeeeeeeeee.....eeeeeeeee...eeeeeeee....eeeeeeee.................................................................
        .................................................eeeeeeeee......eeeeeeeee..eeeeeeee...eeeeeeeee.................................................................
        ...................................................eeeeeeeeee...eeeeeeeee..eeeeeeee..eeeeeeeee..................................................................
        .....................................................eeeeeeee...eeeeeeeee..eeeeeeee.eeeeeeeee...................................................................
        .....................................................eeeeeeeeeeeeeeeeeeee.eeeeeeeeeeeeeeeeee....................................................................
        ......................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee....................................................................
        .......................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.....................................................................
        ........................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee......................................................................
        ........................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.......................................................................
        .........................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee........................................................................
        .........................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee........................................................................
        .........................................................eeeeeeeeeeeeeffeeeeeeeeeeeeeee.........................................................................
        .........................................................eeeeeeeeeeeeffefeeeeeeeeeeeeee.........................................................................
        .........................................................eeeeeeeeeeeefffeeeeeeeeeeeeee..........................................................................
        .........................................................eeeeeeeeeeeefffeeeeeeeeeeeeee..........................................................................
        .........................................................eeeeeeeeeeeefffeeeeeeeeeeeee...........................................................................
        .........................................................eeeeeeeeeeeefffeeeeeeeeeeeee...........................................................................
        ..........................................................eeeeeeeeeefffffeeeeeeeeeeee...........................................................................
        ..........................................................eeeeeeeeeefffffeeeeeeeeeee............................................................................
        ...........................................................eeeeeeeeefffffeeeeeeeeeee............................................................................
        ...........................................................eeeeeeeeffffffeeeeeeeeee.............................................................................
        ............................................................eeeeeeeffffffeeeeeeeeee.............................................................................
        .............................................................eeeeeefffffeeeeeeeeee..............................................................................
        .............................................................eeeeeefffffeeeeeeeeee..............................................................................
        .............................................................eeeeeefffffeeeeeeeeee..............................................................................
        .............................................................eeeeeeeffffeeeeeeeee...............................................................................
        .............................................................eeeeeeeffffeeeeeeee................................................................................
        .............................................................eeeeeeeffffeeeeeee.................................................................................
        .............................................................eeeeeeeffffeeeeeee.................................................................................
        .............................................................eeeeeeeffffeeeeee..................................................................................
        .............................................................eeeeeeeffffeeeeee..................................................................................
        .............................................................eeeeeeeeeeeeeeeee..................................................................................
        .............................................................eeeeeeeeeeeeeeee...................................................................................
        .............................................................eeeeeeeeeeeeeeee...................................................................................
        .............................................................eeeeeeeeeeeeeeee...................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeee.....................................................................................
        .............................................................eeeeeeeeeeeeee.....................................................................................
        ..............................................................eeeeeeeeeeee......................................................................................
        ..............................................................eeeeeeeeeeee......................................................................................
        ..............................................................eeeeeeeeeee.......................................................................................
        ..............................................................eeeeeeeeeee.......................................................................................
        ..............................................................eeeeeeeeeee.......................................................................................
        .............................................................eeeeeeeeeeee.......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        ............................................................eeeeeeeeeeeeee......................................................................................
        ............................................................eeeeeeeeeeeeee......................................................................................
        ...........................................................eeeeeeeeeeeeeee......................................................................................
        ...........................................................eeeeeeeeeeeeeee......................................................................................
        ...........................................................eeeeeeeeeeeeeee......................................................................................
        ..........................................................eeeeeeeeeeeeeeee......................................................................................
        ..........................................................eeeeeeeeeeeeeeee......................................................................................
        .........................................................eeeeeeeeeeeeeeeee......................................................................................
        .........................................................eeeeeeeeeeeeeeeee......................................................................................
        .........................................................eeeeeeeeeeeeeeeee......................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        ..........................................................eeeeeeeeeeeeeeeee.....................................................................................
        ..........................................................eeeeeeeeeeeeeeeee.....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        ........................................................eeeeeeeeeeeeeeeeeeee....................................................................................
        ........................................................eeeeeeeeeeeeeeeeeeee....................................................................................
        ........................................................eeeeeeeeeeeeeeeeeeee....................................................................................
        .......................................................eeeeeeeeeeeeeeeeeeeeee...................................................................................
        ......................................................eeeeeeeeeeeeeeeeeeeeeee...................................................................................
        ......................................................eeeeeeeeeeeeeeeeeeeeeeee..................................................................................
        ......................................................eeeeeeeeeeeeeeeeeeeeeeee..................................................................................
        ....................................................eeeeeeeeeeeeeeeeeeeeeeeeeee.................................................................................
        ..................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeee................................................................................
        ..................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee..............................................................................
        ................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee............................................................................
        ..............................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.........................................................................
        ..............................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee......................................................................
        `)
    tiles.setCurrentTilemap(tilemap`level2`)
    story.printDialog("It's apple harvest time in the Valley.  A bumper crop!", 80, 50, 70, 150)
    story.printDialog("The apples are falling off the trees.", 80, 50, 70, 150)
    for (let index = 0; index < 30; index++) {
        sprite_apple = sprites.create(assets.image`sprite_apple`, SpriteKind.Player)
        sprite_apple.setFlag(SpriteFlag.Ghost, true)
        sprite_apple.setFlag(SpriteFlag.AutoDestroy, true)
        sprite_apple.setScale(randint(0.4, 0.7), ScaleAnchor.Middle)
        sprite_apple_x = randint(30, 130)
        sprite_apple.setPosition(sprite_apple_x, 10)
        sprite_apple.ay = randint(120, 150)
    }
    story.printDialog("Get them before they hit the ground. ", 80, 50, 70, 150)
    mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(farmers_sprites_32[farmer_p1], SpriteKind.Player))
    mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score, 0)
    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).ay = 400
    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setFlag(SpriteFlag.StayInScreen, true)
    player_1_bucket = statusbars.create(20, 4, StatusBarKind.Apples)
    player_1_bucket.value = 0
    player_1_bucket.max = 5
    player_1_bucket.setColor(2, 0)
    player_1_bucket.positionDirection(CollisionDirection.Bottom)
    player_1_bucket.attachToSprite(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
    player_1_bin = sprites.create(assets.image`bin_0`, SpriteKind.Bin)
    sprites.setDataNumber(player_1_bin, "player", 1)
    player_1_bin.setPosition(-5, 100)
    if (players > 1) {
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(farmers_sprites_32[farmer_p2], SpriteKind.Player))
        mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score, 0)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).ay = 400
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x = 120
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x = 40
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setFlag(SpriteFlag.StayInScreen, true)
        player_2_bucket = statusbars.create(20, 4, StatusBarKind.Apples)
        player_2_bucket.value = 0
        player_2_bucket.max = 5
        player_2_bucket.setColor(2, 0)
        player_2_bucket.positionDirection(CollisionDirection.Bottom)
        player_2_bucket.attachToSprite(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)))
        player_2_bin = sprites.create(assets.image`bin_0`, SpriteKind.Bin)
        sprites.setDataNumber(player_2_bin, "player", 2)
        player_2_bin.setPosition(scene.screenWidth() + 5, 100)
        if (farmer_p1 == farmer_p2) {
            player_1_bucket.setLabel("P1")
            player_2_bucket.setLabel("P2")
        }
    }
    story.printDialog("Your basket can only hold 5 at a time.  Fill the bin when your basket is full.", 90, 90, 50, 130)
    scene_game_playing = 1
    music.play(music.createSong(hex`003c000a64020100001c00010a006400f40164000004000000000000000000000000000500000436010000210002202421004200021b20430054000224275400650002222664007500021f2275000b010220240b012c010220242c014d01021b204e015f0101275e016f0101266f0180010224278001a101022226a101c201022427c30116020220241602370202202437025802021b2059026a020224276a027b020222267a028b02021f228b0221030220242103420302202442036303021b20640375030127740385030126850396030127b703d803022427d9032c040222262c044d040220254d046e04021d206f04b2040125c204d3040127d304e404022227e4043705021f223705580502202558057905021d208a059b050127ef05420601274206630602202564068506021d208506c8060125d806e9060127e906fa06022227fa064d07021f224d076e070220256e078f07021d20a107b2070127`), music.PlaybackMode.LoopingInBackground)
    music.play(music.createSong(hex`003c000a64020107001c00020a006400f40164000004000000000000000000000000000000000320013b044c0401314c045d04012c5d046e0401297e048f0401318f04a004012ca004b1040129b004c1040133c104d204012ed204e304012be204f3040127f3040405013304051505012e14052505012b25053605012747055805013157056805012c68057905012989059a0501319a05ab05012cab05bc050129bc05cd050133cc05dd05012edd05ee05012bee05ff050127fe050f0601330f062006012e20063106012b30064106012752066306013162067306012c7306840601299506a6060131a506b606012cb606c7060129c706d8060133d706e806012ee806f906012bf9060a0701270a071b0701331a072b07012e2b073c07012b3c074d0701275d076e0701316e077f07012c7e078f070129a007b1070131b007c107012cc107d0070129`), music.PlaybackMode.LoopingInBackground)
    music.play(music.createSong(hex`003c000a64020105001c000f0a006400f4010a00000400000000000000000000000000000000020e010000210001202100420001204300640001206400850001208600a7000120a700c8000120c800e9000120ea000b0101200b012c0101202d014e0101204e016f0101206f01900101209101b2010120b201d3010120d401f5010120f5011602012016023702012038025902012059027a0201207b029c0201209c02bd020120bd02de020120df02000301200003210301202203330301203203430301204303540301205403650301206403750301207503860301208603970301209603b7030127b803d9030124d903ea030122ea03fb030122fb030c0401220b041c0401221c042d0401222d04b2040125b204370501273805bd050125bd05420601274206c7060125c8064d0701274d07d0070125`), music.PlaybackMode.LoopingInBackground)
    info.startCountdown(60)
}
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(1, 2)
    }
})
function scene_game_move_players () {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vy != 0) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x += player_1_dx
    } else {
        player_1_dx = controller.player1.dx()
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x += player_1_dx
    }
    if (players > 1) {
        if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vy != 0) {
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x += player_2_dx
        } else {
            player_2_dx = controller.player2.dx()
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x += player_2_dx
        }
    }
}
function scene_setup_button (player2: number) {
    if (scene_setup_players[0] == player2) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        sprites.destroyAllSpritesOfKind(SpriteKind.Setup)
        scene_setup_players.shift()
        if (scene_setup_players.length > 0) {
            scene_setup()
        } else {
            scene_current += 1
            scene_game()
        }
    }
}
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(-1, 2)
    }
})
controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(1, 1)
    }
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 0) {
        scene_intro_button(1)
    } else if (scene_current == 1) {
        scene_setup_button(1)
    } else if (scene_current == 2) {
        scene_game_jump_player(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
    }
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 0) {
        scene_intro_button(2)
    }
})
controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(-1, 1)
    }
})
let player_2_dx = 0
let player_1_dx = 0
let player_2_bin: Sprite = null
let player_1_bin: Sprite = null
let sprite_apple_x = 0
let sprite_setup_right: Sprite = null
let sprite_setup_left: Sprite = null
let sprite_farmer: Sprite = null
let sprite_setup_farmer: TextSprite = null
let sprite_setup_title: TextSprite = null
let sprite_start_2: TextSprite = null
let sprite_start_1: TextSprite = null
let sprite_apple: Sprite = null
let sprite_title: Sprite = null
let player_2_bucket: StatusBarSprite = null
let player_1_bucket: StatusBarSprite = null
let scene_setup_farmer_sprite = 0
let scene_setup_players: number[] = []
let farmers_sprites_32: Image[] = []
let farmers_sprites_64: Image[] = []
let farmers_names: string[] = []
let scene_game_playing = 0
let farmer_p2 = 0
let farmer_p1 = 0
let players = 0
let scene_current = 0
// current scene is used to manage events across different scenes.
// 0 = intro
// 1 = setup
// 2 = game play
// 3 = outtro
scene_current = 0
// Number of players
players = 0
// sprite ID for P1
farmer_p1 = 0
// Sprite ID for P2
farmer_p2 = 0
scene_game_playing = 0
farmers_names = [
"Elderkin",
"Sterling",
"Hennigar",
"Bishop"
]
farmers_sprites_64 = [
assets.image`sprite_elderkin_64`,
assets.image`sprite_sterling_64`,
assets.image`sprite_hennigar_64`,
assets.image`sprite_bishop_64`
]
farmers_sprites_32 = [
assets.image`sprite_elderkin_32`,
assets.image`sprite_sterling_32`,
assets.image`sprite_hennigar_32`,
assets.image`sprite_bishop_32`
]
scene_intro()
game.onUpdate(function () {
    if (scene_current == 2) {
        if (scene_game_playing == 1) {
            scene_game_move_players()
        }
    }
})
forever(function () {
    if (scene_game_playing == 1) {
        pause(randint(800, 1200))
        sprite_apple = sprites.create(assets.image`sprite_apple`, SpriteKind.Apple)
        sprite_apple.setScale(randint(0.25, 0.75), ScaleAnchor.Middle)
        sprite_apple.ay = randint(20, 60)
        sprite_apple.vy = randint(20, 60)
        sprite_apple.y = 0
        sprite_apple.x = randint(20, 140)
    }
})
