// import Vue from 'vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

window._ = require('lodash');

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
} catch (e) {}

window.axios = require('axios').default;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.toastr = require('toastr');