$(function () {

    if (sessionStorage.getItem('namespace') === null || sessionStorage.getItem('name') === null) {
        window.location.href = 'roles.html';
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
            getRole($('#namespace').val(), $('#name').text());
        });
    }

    function getRole(namespace, name) {
        var url = apiEndpoint + '/namespaces/' + namespace + '/roles/' + name;
        console.log(url);
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (r) {
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Name:</div>' + '<div class="col s10 content-body" title="Name">' + r.name + '</div>'
                + '</div>'
            );
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Namespace:</div>' + '<div class="col s10 content-body" title="Namespace">' + r.namespace + '</div>'
                + '</div>'
            );
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Labels:</div>' + '<div class="col s10 content-body" id="labels"></div>'
                + '</div>'
            );
            if (r.labels === null) {
                $('#labels').append('<span title="Labels">-</span>');
            } else {
                $.each(r.labels, function (k, v) {
                    $('#labels').append('<span class="content-grey" title="Labels">' + k + ': ' + v + '</span>');
                });
            }
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Annotations:</div>' + '<div class="col s10 content-body" id="annotations"></div>'
                + '</div>'
            );
            if (r.annotations === null) {
                $('#annotations').append('<span title="Annotations">-</span>');
            } else {
                $.each(r.annotations, function (k, v) {
                    $('#annotations').append('<span class="content-grey" title="Annotations">' + k + ': ' + v + '</span>');
                });
            }
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Creation Time:</div>' + '<div class="col s10 content-body" title="Creation Time">' + r.creationTime + '</div>'
                + '</div>'
            );
            if (r.rules.length !== 0) {
                $('#rules').append(
                    '<div class="row row-sm">'
                    + '<div class="col s2 content-header">' + 'API Groups' + '</div>'
                    + '<div class="col s5 content-header">' + 'Resources' + '</div>'
                    + '<div class="col s5 content-header">' + 'Verbs' + '</div>'
                    + '</div><div class="divider"></div>'
                );
                r.rules.forEach(function (rule) {
                    var apiGroups = '';
                    rule.apiGroups.forEach(function (a) {
                        readableA = a === '' ? '&lt;empty string&gt;' : a;
                        apiGroups += '<div class="chip teal lighten-4" title="' + a + '">' + readableA + '</div>';
                    });
                    var resources = '';
                    rule.resources.forEach(function (res) {
                        resources += '<div class="chip teal lighten-4" title="' + res + '">' + res + '</div>';
                    });
                    var verbs = '';
                    rule.verbs.forEach(function (v) {
                        verbs += '<div class="chip teal lighten-4" title="' + v + '">' + v + '</div>';
                    });
                    $('#rules').append(
                        '<div class="row row-sm valign-wrapper">'
                        + '<div class="col s2 content-body">' + apiGroups + '</div>'
                        + '<div class="col s5 content-body">' + resources + '</div>'
                        + '<div class="col s5 content-body">' + verbs + '</div>'
                        + '</div><div class="divider"></div>'
                    )
                });
            }
        });
    }

    function deleteRole(namespace, name) {
        var url = apiEndpoint + '/namespaces/' + namespace + '/roles/' + name;
        $.ajax({
            url: url,
            method: 'DELETE'
        }).done(function () {
            window.location.href = 'roles.html';
        });
    }

    $('#delete-modal-trigger').click(function () {
        $('#delete-modal-body').html('Are you sure you want to delete Role <em>'
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
        window.location.href = 'roles.html';
    });

});