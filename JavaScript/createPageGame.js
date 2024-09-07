async function getGamePage() {

    var g_name = sessionStorage.getItem("game_name");
    var g_comment = sessionStorage.getItem("game_comment");
    var g_img = sessionStorage.getItem("game_img");

    var page_title = document.getElementsByClassName('game-name')[0]
    var game_title = document.getElementsByClassName('game-name')[1]
    page_title.textContent = g_name
    game_title.textContent = g_name

    var comment = document.getElementById('game-comment')
    comment.innerText = g_comment

    var img = document.getElementById('game-img')
    img.src = g_img
}

getGamePage()