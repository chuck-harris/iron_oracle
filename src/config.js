
let config_data = null

module.exports = function () {

    if( config_data != null && config_data != undefined ) {
        return config_data;
    }

    config_data = {};

    config_data.clientToken = process.env.client_token

    return config_data
}
