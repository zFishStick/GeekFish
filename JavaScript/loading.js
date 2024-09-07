function loading() {
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.getElementById('loader-container').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        }, 500); // Ritardo di 500 ms
    });
    

}

loading()