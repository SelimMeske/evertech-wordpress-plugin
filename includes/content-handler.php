<?php

class ContentHandler{
  function init(){
    add_action('wp_ajax_manipulator', array($this, 'contentManipulator'));
    add_action('wp_ajax_nopriv_manipulator', array($this, 'contentManipulator'));

    add_action('wp_ajax_gi', array($this, 'setStyle'));
    add_action('wp_ajax_nopriv_gi', array($this, 'setStyle'));
  }

  function contentManipulator(){
    $request = $_POST['id'];
    $prices = get_option('ed_product_' . $request);
    if($prices){
      echo $prices;
    }
    die();
  }
}
