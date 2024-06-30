const apps = [
    {
        url: "tsuki",
        deeplink: "tsukiodyssey://secret",
        ios: "1564146071",
        android: "com.hyperbeard.odyssey",
        web: "https://hyperbeard.com/game/tsukisodyssey",
        innerIcon: "images/tsukiLayer1.png",
        outerIcon: "images/tsukiLayer2.png",
        gameInfo: "TSUKI'S ODYSSEY"
    },
    {
        url: "wurmwood",
        deeplink: "",
        ios: "",
        android: "",
        web: "https://www.youtube.com/watch?v=3b5aV75NcFs",
        innerIcon: "images/wurmLayer1.png",
        outerIcon: "images/wurmLayer2.png",
        gameInfo: "WURMWOOD"
    }
]
const appStoreURL = "itms-apps://apps.apple.com/app/id"
const playStoreURL = "market://details?id="

var hasFocus = true;
var didHide = false;

window.onload = addGames;
function addGames() {
    bindEvents();
    let gameGroup = document.createElement("div");
    gameGroup.className = "gameGroup";
    for(let i = 0; i < apps.length; i++) {
        if(window.location.pathname.includes(apps[i].url)) {
            openGame(apps[i]);
            return;
        }
        gameGroup.appendChild(createGame(apps[i]));
    }
    document.body.appendChild(gameGroup);
}
function bindEvents() {
    [
        [window, 'blur', onBlur],
        [document, 'visibilitychange', onVisibilityChange],
        [window, 'focus', onFocus],
      ].forEach(function(conf) {
        conf[0]['addEventListener'](conf[1], conf[2]);
      });
}
function onVisibilityChange(e) {
    if (e.target.visibilityState === 'hidden') {
      didHide = true;
    }
}
function onFocus() {
    if (didHide) {
        didHide = false;
    }
}
function onBlur() {
    hasFocus = false;
};
function createGame(appLink) {
    let game = document.createElement("button");
    game.className = "game";
    game.onclick = function() {
        openGame(appLink);
    }
    let icon = document.createElement("div");
    icon.id = appLink.url;
    icon.className = "icon";
    game.appendChild(icon);
    let innerIcon = document.createElement("div");
    innerIcon.className = "innerIcon";
    icon.appendChild(innerIcon);
    let layer = document.createElement("img");
    layer.src = appLink.innerIcon;
    innerIcon.appendChild(layer);
    let outerIcon = document.createElement("div");
    outerIcon.className = "outerIcon";
    innerIcon.appendChild(outerIcon);
    let outerLayer = document.createElement("img");
    outerLayer.src = appLink.outerIcon;
    outerIcon.appendChild(outerLayer);
    let gameInfo = document.createElement("div");
    gameInfo.className = "gameInfo";
    gameInfo.innerText = appLink.gameInfo;
    game.appendChild(gameInfo);
    return game;
}
function openGame(appLink) {
    if(appLink.deeplink !== "") {
        let iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        iframe.style.display = 'none';
        iframe.contentDocument.write('\<script\>window.location="'+appLink.deeplink+ '";\</script\>');
    }
    // setTimeout(function() {
    //     if (hasFocus) {
    //         if(appLink.ios !== "" && isIOS()) {
    //             window.location = appStoreURL + appLink.ios;
    //         }
    //         else if(appLink.android != "" && isAndroid()) {
    //             window.location = playStoreURL + appLink.android;
    //         }
    //         else {
    //             window.location = appLink.web;
    //         }
    //     }
    //     else {
    //         window.close();
    //     }
    //   }, 500);
    //   window.open(appLink.deeplink,'_parent','');
}
function isIOS() {
    return navigator.userAgent.match('iPad') || 
    navigator.userAgent.match('iPhone') || 
    navigator.userAgent.match('iPod');
}
function isAndroid() {
    return navigator.userAgent.match('Android');
}