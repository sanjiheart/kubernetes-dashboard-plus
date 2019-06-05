var version = 'v0.1.0';

var title = '<subtitle> - Kubernetes Dashboard Plus';

var itemsPerPage = localStorage.getItem('itemsPerPage') === null ? 10 : localStorage.getItem('itemsPerPage');

var apiEndpoint = window.location.protocol + '//' + window.location.host + '/api';

$(function () {

    M.AutoInit();

    window.setTitle = function (subtitle) {
        var prefix = localStorage.getItem('title') === null ? '' : localStorage.getItem('title') + ' - ';
        $('title').text(prefix + title.replace('<subtitle>', subtitle));
    }

    $('.modal').modal({
        opacity: 0.4
    });

    window.showZeroState = function (resourceType) {
        $('#resources').append(
            '<div class="row row-sm"><div class="col s12">'
            + '<div class="zerostate-title center-align">There is nothing to display here</div>'
            + '<div class="zerostate-subtitle center-align">There are no ' + resourceType + ' to display.</div>'
            + '</div></div>'
        );
    }

    $('#menu-trigger').click(function () {
        if ($('#menu').css('transform') === 'matrix(1, 0, 0, 1, 0, 0)') {
            $('#menu').css('transform', 'translateX(-105%)');
            $('main').css('margin-left', '0px');
        } else {
            $('#menu').css('transform', 'translateX(0%)');
            $('main').css('margin-left', '240px');
        }
    });

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

});