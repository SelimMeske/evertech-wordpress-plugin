<?php

class EdPriceUiEnqueue{
  function init(){
    add_action('wp_enqueue_scripts', array($this, 'enqueue_front_styles'));
    add_action('wp_enqueue_scripts', array($this, 'enqueue_front_script'));
  }

  function enqueue_front_styles(){
    wp_enqueue_style('ed-price-ui-front-style', ED_PRICE_PLUGIN_URL . 'assets/style/front/evertech-front-style.css', [], time());
  }

  function enqueue_front_script(){
    wp_enqueue_script('ed-price-ui-front-script', ED_PRICE_PLUGIN_URL . 'assets/js/front/evertech-front-script.js', array( 'jquery'), time());
    wp_localize_script( 'ed-price-ui-front-script', 'jsforwp_globals', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
  }
}
