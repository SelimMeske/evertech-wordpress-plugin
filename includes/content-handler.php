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
    $title = get_option('ed_ui_title');
    $prices = get_option('ed_product_' . $request);

    $dataJson["title"] = $title;
    $dataJson["prices"] = $prices;

    if($dataJson){
      header('Content-Type: application/json');
      echo json_encode($dataJson);
    }
    die();
  }

  function setStyle(){
    $request = $_GET;
    $color = get_option('ed_ui_background_color');
    $circleColor = get_option('ed_ui_circle_color');

    $dataJson["bcgcolor"] =  $color;
    $dataJson["circlecolor"] =  $circleColor;

    if($dataJson){
      header('Content-Type: application/json');
      echo json_encode($dataJson);
    }
    die();
  }
}
