$(function () {

    if (sessionStorage.getItem('namespace') === null || sessionStorage.getItem('name') === null) {
        window.location.href = 'clusterroles.html';
    } else {
        $('#name').text(sessionStorage.getItem('name'));
        setTitle(sessionStorage.getItem('name'));
    }

    $('#namespace').change(function () {
        sessionStorage.setItem('namespace', $(this).val());
        window.location.href = 'clusterroles.html';
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
            get($('#name').text());
        });
    }

    function get(name) {
        var url = apiEndpoint + '/clusterroles/' + name;
        console.log(url);
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (cr) {
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Name:</div>' + '<div class="col s10 content-body" title="Name">' + cr.name + '</div>'
                + '</div>'
            );
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Labels:</div>' + '<div class="col s10 content-body" id="labels"></div>'
                + '</div>'
            );
            if (cr.labels === null) {
                $('#labels').append('<span title="Labels">-</span>');
            } else {
                $.each(cr.labels, function (k, v) {
                    $('#labels').append('<span class="content-grey" title="Labels">' + k + ': ' + v + '</span>');
                });
            }
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Annotations:</div>' + '<div class="col s10 content-body" id="annotations"></div>'
                + '</div>'
            );
            if (cr.annotations === null) {
                $('#annotations').append('<span title="Annotations">-</span>');
            } else {
                $.each(cr.annotations, function (k, v) {
                    $('#annotations').append('<span class="content-grey" title="Annotations">' + k + ': ' + v + '</span>');
                });
            }
            $('#detail').append(
                '<div class="row row-xs">'
                + '<div class="col s2 content-body content-title">Creation Time:</div>' + '<div class="col s10 content-body" title="Creation Time">' + cr.creationTime + '</div>'
                + '</div>'
            );
            if (cr.rules.length !== 0) {
                $('#rules').append(
                    '<div class="row row-sm">'
                    + '<div class="col s2 content-header">' + 'API Groups' + '</div>'
                    + '<div class="col s5 content-header">' + 'Resources' + '</div>'
                    + '<div class="col s5 content-header">' + 'Verbs' + '</div>'
                    + '</div><div class="divider"></div>'
                );
                cr.rules.forEach(function (rule) {
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

});