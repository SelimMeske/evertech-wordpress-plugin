<?php

require_once ED_PRICE_PLUGIN_PATH . 'includes/enqueue.php';

class EdPriceUiSettingsApi {

  function init(){
    add_action('admin_menu', array($this, 'createAdminPage'));
    add_action('admin_init', array($this, 'createCustomFields'));
  }

  function getWooProducts(){
    $query = new WC_Product_Query( array(
      'return' => 'ids'
    ));
    return $products = $query->get_products();
  }

  function createCustomFields(){
    if( get_option('ed_settings') == false) {
      add_option('ed_settings');
    }

    add_settings_section('ed_section', 'Product', array($this, 'admin_section_callback'), 'ed_price');

    //Style and title label sections and fields...
    add_settings_section('ed_section_style', 'Style', array($this, 'admin_section_callback'), 'ed_price');
    //Button...
    add_settings_field('ed_ui_background_color', 'Button Color', array($this, 'colorCallback'), 'ed_price', 'ed_section_style', array(
      'label_for' => 'ed_ui_background_color',
      'class' => 'ed-ui-dummy-button-input'
    ));
    //Small circle...
    add_settings_field('ed_ui_circle_color', 'Circle Color', array($this, 'circColorCallback'), 'ed_price', 'ed_section_style', array(
      'label_for' => 'ed_ui_circle_color',
      'class' => 'ed-ui-dummy-circle-input'
    ));
    //Title...
    add_settings_field('ed_ui_title', 'Title Above Buttons', array($this, 'titleCallback'), 'ed_price', 'ed_section_style', array(
      'label_for' => 'ed_ui_title',
      'class' => 'ed-ui-dummy-title-input'
    ));

    register_setting('ed_settings', 'ed_ui_background_color');
    register_setting('ed_settings', 'ed_ui_circle_color');
    register_setting('ed_settings', 'ed_ui_title');

    foreach($this->getWooProducts() as $product) {

        add_settings_field($product, wc_get_product($product)->get_title() . ' (ID:'.$product.')', array($this, 'inputCallback'), 'ed_price', 'ed_section', array(
          'label_for' => $product,
          'class' => 'ed-product-info'
        ));

        if(get_option('ed_product_' . $product) == false) {
          add_option('ed_product_' . $product, "98.99,99.99,99.99,2,3,6,1");
        }
        register_setting('ed_settings', 'ed_product_' . $product);
      }
  }

  function inputCallback($args){
    $options = get_option('ed_product_' . $args['label_for']);
    $splited = explode(',', $options);
    if(array_key_exists(6, $splited) == false){
      array_push($splited, 3);
    }
    echo '<div class="ed-wrap-input"><p><strong>Price 1</strong></p><input type="text" value="'.$splited[0].'" placeholder="Enter your price."><input type="text" value="'.$splited[3].'" placeholder="Quantity?"><div class="top-price"><input value="1" '. checked( 1, $splited[6], false ) .'type="checkbox"><label>Top Price?</label></div></div>';
    echo '<div class="ed-wrap-input"><p><strong>Price 2</strong></p><input type="text" value="'.$splited[1].'" placeholder="Enter your price."><input type="text" value="'.$splited[4].'" placeholder="Quantity?"><div class="top-price"><input value="2" '. checked( 2, $splited[6], false ) .'type="checkbox"><label>Top Price?</label></div></div>';
    echo '<div class="ed-wrap-input"><p><strong>Price 3</strong></p><input type="text" value="'.$splited[2].'" placeholder="Enter your price."><input type="text" value="'.$splited[5].'" placeholder="Quantity?"><div class="top-price"><input value="3" '. checked( 3, $splited[6], false ) .'type="checkbox"><label>Top Price?</label></div></div>';
    echo '<input name="'.'ed_product_' . $args['label_for'].'" type="hidden" value="'.$options.'" placeholder="">';
    echo '<div class="close-ed-product">Save</div>';
  }

  function colorCallback($args){
    $options = get_option($args['label_for']);
    echo '<input name="'.$args['label_for'].'" type="text" value="'.$options.'" placeholder=""><p class="dummy-button" style="margin-left: 20px; display: inline;">24.99 KM</p>';
  }

  function circColorCallback($args){
    $options = get_option($args['label_for']);
    echo '<div style="display: flex;"><input name="'.$args['label_for'].'" type="text" value="'.$options.'" placeholder=""><p class="dummy-circle" style="margin-left: 20px;">2x</p></div>';
  }

  function titleCallback($args){
    $options = get_option($args['label_for']);
    echo '<textarea cols=50 name="'.$args['label_for'].'"  type="textarea" value="" placeholder="">'.$options.'</textarea>';
  }

  function admin_section_callback(){
    echo "";
  }

  function createAdminPage(){
    $adminPg = add_menu_page('evertech_price_ui', 'EverTech Price Ui', 'manage_options', 'evertech_ui', array($this, 'admin_template'), ED_PRICE_PLUGIN_URL . 'assets/images/ever.png');

    add_action('load-' . $adminPg, array($this, 'initOnAdmin'));
  }

  function initOnAdmin(){
    add_action('admin_enqueue_scripts', array($this, 'enqueue_back_script'));
    add_action('admin_enqueue_scripts', array($this, 'enqueue_back_styles'));
  }

  function enqueue_back_script(){
    wp_enqueue_script('ed-price-ui-back-script', ED_PRICE_PLUGIN_URL . 'assets/js/back/evertech-back-script.js', [], time());
  }

  function enqueue_back_styles(){
    wp_enqueue_style('ed-price-ui-back-style', ED_PRICE_PLUGIN_URL . 'assets/style/back/evertech-back-style.css', [], time());
  }

  function admin_template(){
    require_once ED_PRICE_PLUGIN_PATH . 'templates/evertech-admin-template.php';
  }

}
