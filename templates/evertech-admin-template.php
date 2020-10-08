<div class="wrap">
  <h1>EverTech Price Ui</h1>

  <form action="options.php" method="post">
    <?php
        settings_errors();
        settings_fields('ed_settings');
        do_settings_sections('ed_price');
        submit_button();
    ?>
  </form>
</div>
<div class='evertech-loader'>
  <p>EverTech Price UI</p>
</div>
