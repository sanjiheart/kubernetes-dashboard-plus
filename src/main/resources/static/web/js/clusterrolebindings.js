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
            listClusterRoleBindings(1);
        });
    }

    function listClusterRoleBindings(page) {
        var url = apiEndpoint + '/clusterrolebindings?itemsPerPage=' + itemsPerPage + '&page=' + page;
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (crResList) {
            $('#resources').empty();
            $('#pagination').hide();
            if (crResList.total !== 0) {
                $('#resources').append(
                    '<div class="row row-sm">'
                    + '<div class="col s9 content-header">' + 'Name' + '</div>'
                    + '<div class="col s3 content-header">' + 'Age' + '</div>'
                    + '</div><div class="divider"></div>'
                );
                crResList.resources.forEach(function (cr) {
                    $('#resources').append(
                        '<div class="row row-sm">'
                        + '<div class="col s9 content-body"><a href="clusterrolebinding.html" name="resource">' + cr.name + '</a></div>'
                        + '<div class="col s3 content-body tooltipped" data-position="bottom" data-tooltip="' + cr.creationTime + '">' + $.timeago(cr.creationTime) + '</div>'
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
                if (crResList.total > itemsPerPage) {
                    $('#pagination').show();
                    initPagination(false, crResList.total, page);
                }
            } else {
                showZeroState();
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
                namespaced ? listClusterRoleBindings($('#namespace').val(), 1) : listClusterRoleBindings(1);
            }
        });

        $('#prev-page').click(function () {
            if (!$(this).hasClass('disabled')) {
                namespaced ? listClusterRoleBindings($('#namespace').val(), --page) : listClusterRoleBindings(--page);
            }
        });

        $('#next-page').click(function () {
            console.log('c');
            if (!$(this).hasClass('disabled')) {
                namespaced ? listClusterRoleBindings($('#namespace').val(), ++page) : listClusterRoleBindings(++page);
            }
        });

        $('#last-page').click(function () {
            if (!$(this).hasClass('disabled')) {
                namespaced ? listClusterRoleBindings($('#namespace').val(), last) : listClusterRoleBindings(last);
            }
        });
    }

});