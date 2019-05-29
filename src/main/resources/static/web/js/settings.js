$(function () {

    setTitle('Settings');

    $('#cluster-name').val(localStorage.getItem('title'));
    $('#items-per-page').val(itemsPerPage);
    $('#items-per-page-val').text(itemsPerPage);

    $('#cluster-name').keyup(function (e) {
        var code = e.keyCode || e.which;
        if (code !== 13) {
            $('#saving').removeClass('disabled');
        }
    });

    $('#items-per-page').change(function () {
        $('#items-per-page-val').text($('#items-per-page').val());
        $('#saving').removeClass('disabled');
    });

    $('#saving').click(function () {
        if (!$(this).hasClass('disabled')) {
            $('#cluster-name').val().trim() !== '' ?
                localStorage.setItem('title', $('#cluster-name').val()) :
                localStorage.removeItem('title');
            localStorage.setItem('itemsPerPage', $('#items-per-page').val());
            setTitle('Settings');
            $('#saving').addClass('disabled');
        }
    });

});