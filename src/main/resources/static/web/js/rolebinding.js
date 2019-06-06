$(function () {

    if (sessionStorage.getItem('namespace') === null || sessionStorage.getItem('name') === null) {
        window.location.href = 'rolebindings.html';
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
            getRole($('#namespace').val(), $('#name').text());
        });
    }

    function getRole(namespace, name) {
        var url = apiEndpoint + '/namespaces/' + namespace + '/rolebindings/' + name;
        console.log(url);
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (rb) {
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Name:</div>' + '<div class="col s10 content-body" title="Name">' + rb.name + '</div>'
                + '</div>'
            );
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Namespace:</div>' + '<div class="col s10 content-body" title="Namespace">' + rb.namespace + '</div>'
                + '</div>'
            );
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Labels:</div>' + '<div class="col s10 content-body" id="labels"></div>'
                + '</div>'
            );
            if (rb.labels === null) {
                $('#labels').append('<span title="Labels">-</span>');
            } else {
                $.each(rb.labels, function (k, v) {
                    $('#labels').append('<span class="content-grey" title="Labels">' + k + ': ' + v + '</span>');
                });
            }
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Annotations:</div>' + '<div class="col s10 content-body" id="annotations"></div>'
                + '</div>'
            );
            if (rb.annotations === null) {
                $('#annotations').append('<span title="Annotations">-</span>');
            } else {
                $.each(rb.annotations, function (k, v) {
                    $('#annotations').append('<span class="content-grey" title="Annotations">' + k + ': ' + v + '</span>');
                });
            }
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Creation Time:</div>' + '<div class="col s10 content-body" title="Creation Time">' + rb.creationTime + '</div>'
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
            rb.subjects.forEach(function (s) {
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
                + '<div class="col s2 content-body content-title">API Group:</div>' + '<div class="col s10 content-body" title="Name">' + rb.roleRef.apiGroup + '</div>'
                + '</div>'
            );
            $('#roleRef').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Kind:</div>' + '<div class="col s10 content-body" title="Name">' + rb.roleRef.kind + '</div>'
                + '</div>'
            );
            $('#roleRef').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Name:</div>' + '<div class="col s10 content-body" title="Name">' + rb.roleRef.name + '</div>'
                + '</div>'
            );
        });
    }

    function deleteRole(namespace, name) {
        var url = apiEndpoint + '/namespaces/' + namespace + '/rolebindings/' + name;
        $.ajax({
            url: url,
            method: 'DELETE'
        }).done(function () {
            window.location.href = 'rolebindings.html';
        });
    }

    $('#delete-modal-trigger').click(function () {
        $('#delete-modal-body').html('Are you sure you want to delete Role Binding<em>'
            + sessionStorage.getItem('name')
            + '</em> in namespace <em>'
            + sessionStorage.getItem('namespace')
            + '</em>?');
    });

    $('#delete-btn').click(function () {
        deleteRole(sessionStorage.getItem('namespace'), sessionStorage.getItem('name'));
    });

    $('#namespace').change(function () {
        sessionStorage.setItem('namespace', $(this).val());
        window.location.href = 'rolebindings.html';
    });

});