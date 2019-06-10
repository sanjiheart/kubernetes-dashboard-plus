$(function () {

    if (sessionStorage.getItem('namespace') === null || sessionStorage.getItem('name') === null) {
        window.location.href = 'clusterrolebindings.html';
    } else {
        $('#name').text(sessionStorage.getItem('name'));
        setTitle($('#name').text());
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
            getClusterRole($('#name').text());
        });
    }

    function getClusterRole(name) {
        var url = apiEndpoint + '/clusterrolebindings/' + name;
        console.log(url);
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (crb) {
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Name:</div>' + '<div class="col s10 content-body" title="Name">' + crb.name + '</div>'
                + '</div>'
            );
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Labels:</div>' + '<div class="col s10 content-body" id="labels"></div>'
                + '</div>'
            );
            if (crb.labels === null) {
                $('#labels').append('<span title="Labels">-</span>');
            } else {
                $.each(crb.labels, function (k, v) {
                    $('#labels').append('<span class="content-grey" title="Labels">' + k + ': ' + v + '</span>');
                });
            }
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Annotations:</div>' + '<div class="col s10 content-body" id="annotations"></div>'
                + '</div>'
            );
            if (crb.annotations === null) {
                $('#annotations').append('<span title="Annotations">-</span>');
            } else {
                $.each(crb.annotations, function (k, v) {
                    $('#annotations').append('<span class="content-grey" title="Annotations">' + k + ': ' + v + '</span>');
                });
            }
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Creation Time:</div>' + '<div class="col s10 content-body" title="Creation Time">' + crb.creationTime + '</div>'
                + '</div>'
            );
            $('#subjects').append(
                '<div class="row row-sm">'
                + '<div class="col s3 content-header">' + 'API Group' + '</div>'
                + '<div class="col s2 content-header">' + 'Kind' + '</div>'
                + '<div class="col s4 content-header">' + 'Name' + '</div>'
                + '<div class="col s3 content-header">' + 'Namespace' + '</div>'
                + '</div><div class="divider"></div>'
            );
            crb.subjects.forEach(function (s) {
                $('#subjects').append(
                    '<div class="row row-sm">'
                    + '<div class="col s3">' + s.apiGroup + '</a></div>'
                    + '<div class="col s2">' + s.kind + '</a></div>'
                    + '<div class="col s4">' + s.name + '</a></div>'
                    + '<div class="col s3">' + s.namespace + '</a></div>'
                    + '</div><div class="divider"></div>'
                );
            });
            $('#roleRef').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">API Group:</div>' + '<div class="col s10 content-body" title="Name">' + crb.roleRef.apiGroup + '</div>'
                + '</div>'
            );
            $('#roleRef').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Kind:</div>' + '<div class="col s10 content-body" title="Name">' + crb.roleRef.kind + '</div>'
                + '</div>'
            );
            $('#roleRef').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Name:</div>' + '<div class="col s10 content-body" title="Name">' + crb.roleRef.name + '</div>'
                + '</div>'
            );
        });
    }

    function deleteClusterRole(name) {
        var url = apiEndpoint + '/clusterrolebindings/' + name;
        $.ajax({
            url: url,
            method: 'DELETE'
        }).done(function () {
            window.location.href = 'clusterrolebindings.html';
        });
    }

    $('#delete-modal-trigger').click(function () {
        $('#delete-modal-body').html('Are you sure you want to delete Cluster Role Binding <em>'
            + sessionStorage.getItem('name')
            + '</em>?');
    });

    $('#delete-btn').click(function () {
        deleteClusterRole(sessionStorage.getItem('name'));
    });

    $('#namespace').change(function () {
        sessionStorage.setItem('namespace', $(this).val());
        window.location.href = 'clusterrolebindings.html';
    });

});