<?php

/*
 Plugin Name:       EverTech Price Ui
 Description:       Custom price tag for EverTech d.o.o.
 Version:           1.0.0
 Requires at least: 5.2
 Author:            Mesic Selim
 License:           GPL v2 or later
 License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 Text Domain:       EverTech Price Ui
*/
defined ( 'ABSPATH' ) or die('Hey, what are you doing here?');
define('ED_PRICE_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('ED_PRICE_PLUGIN_URL', plugin_dir_url(__FILE__));
define('ED_PRICE_PLUGIN_NAME', plugin_basename(__FILE__));

require_once ED_PRICE_PLUGIN_PATH . 'includes/enqueue.php';
require_once ED_PRICE_PLUGIN_PATH . 'includes/settings-api.php';
require_once ED_PRICE_PLUGIN_PATH . 'includes/content-handler.php';

class EdPriceUi{

  function get_classes(){
    return [
      new EdPriceUiEnqueue(), new EdPriceUiSettingsApi(),
      new ContentHandler()
    ];
  }

  function init(){
    register_activation_hook(__FILE__, array($this, 'activate'));
    register_deactivation_hook(__FILE__, array($this, 'deactivate'));

    foreach ($this->get_classes() as $class) {
      if(method_exists($class, 'init')){
        $class->init();
      }
    }
  }

  function activate(){
    flush_rewrite_rules();
  }

  function deactivate(){
    flush_rewrite_rules();
  }

}

$edPriceUi = new EdPriceUi();
$edPriceUi->init();
