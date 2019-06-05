$(function () {

    if (sessionStorage.getItem('namespace') === null || sessionStorage.getItem('name') === null) {
        window.location.href = 'serviceaccounts.html';
    } else {
        $('#name').text(sessionStorage.getItem('name'));
        setTitle(sessionStorage.getItem('name'));
        listNamespaces();
    }

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
            getServiceAccount($('#namespace').val(), $('#name').text());
        });
    }

    function getServiceAccount(namespace, name) {
        var url = apiEndpoint + '/namespaces/' + namespace + '/serviceaccounts/' + name;
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (sa) {
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Name:</div>' + '<div class="col s10 content-body" title="Name">' + sa.name + '</div>'
                + '</div>'
            );
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Namespace:</div>' + '<div class="col s10 content-body" title="Namespace">' + sa.namespace + '</div>'
                + '</div>'
            );
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Creation Time:</div>' + '<div class="col s10 content-body" title="Creation Time">' + sa.creationTime + '</div>'
                + '</div>'
            );
            $('#secrets').append(
                '<div class="row row-sm">'
                + '<div class="col s12 content-header">' + 'Name' + '</div>'
                + '</div><div class="divider"></div>'
            );
            sa.secrets.forEach(function (s) {
                $('#secrets').append(
                    '<div class="row row-sm">'
                    + '<div class="col s12">' + s.name + '</a></div>'
                    + '</div><div class="divider"></div>'
                );
            });
        });
    }

    function deleteServiceAccount(namespace, name) {
        var url = apiEndpoint + '/namespaces/' + namespace + '/serviceaccounts/' + name;
        $.ajax({
            url: url,
            method: 'DELETE'
        }).done(function () {
            window.location.href = 'serviceaccounts.html';
        });
    }

    $('#delete-modal-trigger').click(function () {
        $('#delete-modal-body').html('Are you sure you want to delete Service Account <em>'
            + sessionStorage.getItem('name')
            + '</em> in namespace <em>'
            + sessionStorage.getItem('namespace')
            + '</em>?');
    });

    $('#delete-btn').click(function () {
        deleteServiceAccount(sessionStorage.getItem('namespace'), sessionStorage.getItem('name'));
    });

    $('#namespace').change(function () {
        sessionStorage.setItem('namespace', $(this).val());
        window.location.href = 'serviceaccounts.html';
    });

});