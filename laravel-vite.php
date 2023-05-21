<?php defined('ABSPATH') or die;
/*
Plugin Name: Laravel Vite
Author: Sumon Sarker
*/

define('LARAVEL_VITE', plugin_dir_url(__FILE__));

add_action('admin_menu', 'laravel_vite_menu');

function laravel_vite_menu()
{
    add_menu_page('Laravel Vite', 'Laravel Vite', 'manage_options', 'laravel-vite', 'laravel_vite_page', 'dashicons-admin-generic', 6);
}

function laravel_vite_page()
{
    laravel_vite_scripts();
    echo "<div class='php-file'>Php file live update</div>";
    echo '<div id="laravel-vite_app"></div>';
}

function laravel_vite_scripts()
{
    $plugin_url = LARAVEL_VITE;
    $static_plugin_url = LARAVEL_VITE;

    wp_enqueue_script('laravel-vite', "http://127.0.0.1:1212/resources/js/app.js", [], false, true);
    wp_enqueue_style('php-file', "$static_plugin_url/assets/libs/css/one.css", [], false, 'all');
}

add_filter('script_loader_tag', 'add_module_to_script', 10, 3);

function add_module_to_script($tag, $handle, $src)
{
    $handlers = ['laravel-vite'];

    if (in_array($handle, $handlers)) {
        $tag = str_replace(' src', ' type="module" src', $tag);
    }

    return $tag;
}
