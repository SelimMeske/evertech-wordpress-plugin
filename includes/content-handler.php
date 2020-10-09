<?php

class ContentHandler{
  function init(){
    add_action('wp_ajax_manipulator', array($this, 'contentManipulator'));
    add_action('wp_ajax_nopriv_manipulator', array($this, 'contentManipulator'));

    add_action('wp_ajax_style', array($this, 'setStyle'));
    add_action('wp_ajax_nopriv_style', array($this, 'setStyle'));
  }

  function contentManipulator(){
    $request = $_POST['id'];
    $prices = get_option('ed_product_' . $request);
    if($prices){
      echo $prices;
    }
    die();
  }

  function setStyle(){
    $request = $_GET;
    $color = get_option('ed_ui_background_color');
    $circleColor = get_option('ed_ui_circle_color');
    $title = get_option('ed_ui_title');
    $data = $color . ',' . $circleColor . ',' . $title;
    if($data){
      echo $data;
    }

    die();
  }
}
