let gmt = ui.txt("Game Menu", sui, 3, 16);
gmt.style.paddingBottom = "40px"
ui.bbtn("Back to Game",sui,3,function(){setScreen(null); gs.paused = false})
ui.btns(sui, 3, "sbtn", "Advancements", n, "sbtn", "Statistics", n);
ui.btns(sui, 3, "sbtn", "Give Feedback", n, "sbtn", "Report Bugs", n);
ui.btns(sui, 3, "sbtn", "Options...", function(){setScreen(2)}, "sbtn", "Open to LAN", n);
ui.bbtn("Save and Quit to Title",sui,3,function(){leaveSP()})
updateScreens();
