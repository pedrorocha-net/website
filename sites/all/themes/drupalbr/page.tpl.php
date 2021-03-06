<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title><?php print $head_title ?></title>
  <?php print $head . $styles ?>
  <?php print $scripts ?>
  <script type="text/javascript"><?php /* Needed to avoid Flash of Unstyle Content in IE */ ?> </script>
</head>
<body>
<?php print $header ?>
<div id="container">
<div id="header">
<div id="top_menu">
      <?php if (isset($secondary_links)) { ?><?php print theme('links', $secondary_links, array('class' =>'links', 'id' => 'subnavlist')) ?><?php } ?>
      <?php if (isset($primary_links)) { ?><?php print theme('links', $primary_links, array('class' =>'links', 'id' => 'navlist')) ?><?php } ?>
      <?php print $search_box ?>
</div>
<?php if ($logo) { ?><a href="<?php print $base_path ?>" title="<?php print t('Home') ?>"><img src="<?php print $logo ?>" class="logo" alt="<?php print t('Home') ?>" /></a><?php } ?>

<?php if ($is_front):?>
<div id="spot">
<img src="<?php print $base_path.path_to_theme(); ?>/imgs/home_spot_logo.gif" alt="image" width="200" height="196" style="margin-left: 15px; margin-right: 10px;" border="0" align="left" />
<h1><?php print $site_slogan; ?></h1>
<?php print $mission; ?>
<div style="clear: both;"></div>
</div>
<?php endif;?>

<div id="content">
<div id="right_column">

    <?php if ($right) { ?>
      <?php print $right ?>
    <?php } ?>
</div>
<div id="left_column">
<?php print $breadcrumb ?>


        <div class="content"><h1><?php print $title ?></h1></div>
        <?php print $tabs ?>
        <?php print $help ?>
        <?php print $messages ?>
        <?php print $content; ?>
</div>

</div>
<div id="footer">
	<!-- INSERIR LOGO DO NANDO! -->
	<div style="float: right; margin: 10px 15px 0px 0px; font-size: 11px;">Design<a href="http://nandostudio.com" target="_blank"><img src="<?php print $base_path.path_to_theme(); ?>/imgs/logo_nando.gif" alt="image" width="60" height="44" border="0" style="vertical-align: middle" ala="Design por Fernando Albuquerque" /></a></div>
	<!-- INSERIR LOGO DO NANDO! -->
	<p><?php print $footer_message ?></p></div>
</div>

</div>
<?php print $closure ?>

<script src="http://www.google-analytics.com/urchin.js" type="text/javascript">
</script>
<script type="text/javascript">
_uacct = "UA-426480-1";
urchinTracker();
</script>
<SPAN ID=isee1 STYLE=position:absolute;width:0px;height:0px;top:-5px;visibility:hidden>
  <IMG SRC=http://a0.drupal-br-org.hst.isee1.net/ WIDTH=1 HEIGHT=1 BORDER=0>
</SPAN>
</body>
</html>
