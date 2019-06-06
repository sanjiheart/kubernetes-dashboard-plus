$(function () {

    setTitle($('#resource-type').text());

    $('#namespace').change(function () {
        sessionStorage.setItem('namespace', $(this).val());
    });

    listNamespaces();
    function listNamespaces() {
        var url = apiEndpoint + '/namespaces';
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (nsResList) {
            nsResList.resources.forEach(function (ns) {
                ns.name === sessionStorage.getItem('namespace') ?
                    $('#namespace-opt-grp').append('<option selected>' + ns.name + '</option>') :
                    $('#namespace-opt-grp').append('<option>' + ns.name + '</option>');
            });
            $('select').formSelect();
        });
    }

    $('#cluster-name').val(localStorage.getItem('clusterName'));
    $('#items-per-page').val(itemsPerPage);
    $('#items-per-page-val').text(itemsPerPage);

    $('#cluster-name').keyup(function (e) {
        var code = e.keyCode || e.which;
        if (code !== 13) {
            $('#save-btn').removeClass('disabled');
        }
    });

    $('#items-per-page').change(function () {
        $('#items-per-page-val').text($('#items-per-page').val());
        $('#save-btn').removeClass('disabled');
    });

    $('#save-btn').click(function () {
        if (!$(this).hasClass('disabled')) {
            $('#cluster-name').val().trim() !== '' ?
                localStorage.setItem('clusterName', $('#cluster-name').val()) :
                localStorage.removeItem('clusterName');
            localStorage.setItem('itemsPerPage', $('#items-per-page').val());
            setTitle();
            $('#save-btn').addClass('disabled');
        }
    });

});