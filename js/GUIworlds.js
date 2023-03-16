ui.txt("Worlds", sui, 1, 16);
ui.btns(sui,1,"mbtn","Demo World",function(){initSP(true)},"mbtn","Random World (buggy)",function(){initSP(false)})
ui.bbtn("Back", sui, 1, function() {setScreen(0)})
updateScreens();
