var version = 'v0.1.0';

var title = '<subtitle> - Kubernetes Dashboard Extra';

var itemsPerPage = localStorage.getItem('itemsPerPage') === null ? 10 : localStorage.getItem('itemsPerPage');

var apiEndpoint = window.location.protocol + '//' + window.location.host + '/api';

$(function () {

    window.setTitle = function (subtitle) {
        var clusterName = localStorage.getItem('clusterName') === null ? '' : localStorage.getItem('clusterName') + ' - ';
        $('title').text(clusterName + title.replace('<subtitle>', subtitle));
    }

    $('.modal').modal({
        opacity: 0.4
    });

    $('#menu-trigger').click(function () {
        if ($('#menu').css('transform') === 'matrix(1, 0, 0, 1, 0, 0)') {
            $('#menu').css('transform', 'translateX(-105%)');
            $('main').css('margin-left', '0px');
        } else {
            $('#menu').css('transform', 'translateX(0%)');
            $('main').css('margin-left', '240px');
        }
    });

    window.showZeroState = function () {
        $('#resources').append(
            '<div class="row row-sm"><div class="col s12">'
            + '<div class="zerostate-title center-align">There is nothing to display here</div>'
            + '<div class="zerostate-subtitle center-align">There are no ' + $('#resource-type').text() + ' to display.</div>'
            + '</div></div>'
        );
    }

    $.timeago.settings.strings.suffixAgo = '';

    new Vue({
        el: '#first-nav',
        data: {
            logoList: [
                { src: 'imgs/kubernetes-logo.svg', width: '32', style: 'margin-top: 8px; margin-left: 22px;' },
                { src: 'imgs/kubernetes-logo-text.svg', width: '113', style: 'margin-bottom: 7px; margin-left: 13px;' },
                { src: 'imgs/plus.png', width: '32' }
            ]
        }
    });

    new Vue({
        el: '#menu',
        data: {
            clusterObjList: [
                { class: 'collapsible-header waves-effect', href: '', text: 'Cluster' },
                { headerType: 'sub-header', class: 'collapsible-header waves-effect', href: 'clusterroles.html', text: 'Cluster Roles', style: 'font-weight: normal;' },
                { headerType: 'sub-header', class: 'collapsible-header waves-effect', href: 'clusterrolebindings.html', text: 'Cluster Role Bindings', style: 'font-weight: normal;' }
            ],
            namespacedClusterObjList: [
                { class: 'collapsible-header waves-effect', href: '', text: 'Cluster' },
                { headerType: 'sub-header', class: 'collapsible-header waves-effect', href: 'roles.html', text: 'Roles', style: 'font-weight: normal;' },
                { headerType: 'sub-header', class: 'collapsible-header waves-effect', href: 'rolebindings.html', text: 'Role Bindings', style: 'font-weight: normal;' },
                { headerType: 'sub-header', class: 'collapsible-header waves-effect', href: 'serviceaccounts.html', text: 'Service Accounts', style: 'font-weight: normal;' }
            ],
            otherList: [
                { class: 'collapsible-header waves-effect', href: 'settings.html', text: 'Settings' },
                { class: 'collapsible-header waves-effect', href: 'about.html', text: 'About' }
            ]
        },
        mounted: function () {
            $.each($('#menu').find('a'), function () {
                if ($(this).text() === $('#resource-type').text().trim())
                    $(this).parent().addClass('active');
            });
        }
    });

    new Vue({
        el: '#pagination',
        data: {
            behaviorList: [
                { id: 'first-page', text: 'first_page' },
                { id: 'prev-page', text: 'chevron_left' },
                { id: 'next-page', text: 'chevron_right' },
                { id: 'last-page', text: 'last_page' }
            ]
        }
    });

    M.AutoInit();

});