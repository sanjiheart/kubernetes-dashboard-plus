$(function () {

    setTitle('Roles');

    $('#namespace').change(function () {
        sessionStorage.setItem('namespace', $(this).val());
        list($(this).val(), 1);
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
            list($('#namespace').val(), 1);
        });
    }

    function list(namespace, page) {
        var url = apiEndpoint + '/namespaces/' + namespace + '/roles?itemsPerPage=' + itemsPerPage + '&page=' + page;
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (rResList) {
            $('#resources').empty();
            $('#pagination').hide();
            if (rResList.total !== 0) {
                $('#resources').append(
                    '<div class="row row-sm">'
                    + '<div class="col s6 content-header">' + 'Name' + '</div>'
                    + '<div class="col s3 content-header">' + 'Namespace' + '</div>'
                    + '<div class="col s3 content-header">' + 'Age' + '</div>'
                    + '</div><div class="divider"></div>'
                );
                rResList.resources.forEach(function (r) {
                    $('#resources').append(
                        '<div class="row row-sm">'
                        + '<div class="col s6 content-body"><a href="role.html" name="resource">' + r.name + '</a></div>'
                        + '<div class="col s3 content-body">' + r.namespace + '</div>'
                        + '<div class="col s3 content-body tooltipped" data-position="bottom" data-tooltip="' + r.creationTime + '">' + $.timeago(r.creationTime) + '</div>'
                        + '</div><div class="divider"></div>'
                    );
                });
                $('a[name="resource"]').click(function () {
                    sessionStorage.setItem('namespace', $('#namespace').val());
                    sessionStorage.setItem('name', $(this).text());
                });
                $('.tooltipped').tooltip({
                    'enterDelay': 500
                });
                if (rResList.total > itemsPerPage) {
                    $('#pagination').show();
                    initPagination(true, rResList.total, page);
                }
            }
        });
    }

    function initPagination(namespaced, total, page) {
        $('#pagination').find('li').unbind('click');

        if (page === 1) {
            $('#first-page').removeClass('waves-effect').addClass('disabled');
            $('#prev-page').removeClass('waves-effect').addClass('disabled');
        } else {
            $('#first-page').removeClass('disabled').addClass('waves-effect');
            $('#prev-page').removeClass('disabled').addClass('waves-effect');
        }
        var last = Math.ceil(total / itemsPerPage);
        if (page === last) {
            $('#next-page').removeClass('waves-effect').addClass('disabled');
            $('#last-page').removeClass('waves-effect').addClass('disabled');
        } else {
            $('#next-page').removeClass('disabled').addClass('waves-effect');
            $('#last-page').removeClass('disabled').addClass('waves-effect');
        }

        $('#first-page').click(function () {
            if (!$(this).hasClass('disabled')) {
                namespaced ? list($('#namespace').val(), 1) : list(1);
            }
        });

        $('#prev-page').click(function () {
            if (!$(this).hasClass('disabled')) {
                namespaced ? list($('#namespace').val(), --page) : list(--page);
            }
        });

        $('#next-page').click(function () {
            console.log('c');
            if (!$(this).hasClass('disabled')) {
                namespaced ? list($('#namespace').val(), ++page) : list(++page);
            }
        });

        $('#last-page').click(function () {
            if (!$(this).hasClass('disabled')) {
                namespaced ? list($('#namespace').val(), last) : list(last);
            }
        });
    }

});