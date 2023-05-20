<?php
/*
Plugin Name: Laravel Vite
Author: Sumon Sarker
*/

add_action('admin_menu', 'laravel_vite_menu');

function laravel_vite_menu()
{
    add_menu_page('Laravel Vite', 'Laravel Vite', 'manage_options', 'laravel-vite', 'laravel_vite_page', 'dashicons-admin-generic', 6);
}

function laravel_vite_page()
{
    laravel_vite_scripts();
    echo '<div id="laravel-vite_app"></div>';
}

function laravel_vite_scripts()
{
    wp_enqueue_script('laravel-vite', "http://127.0.0.1:1212/resources/js/app.js", [], false, true);
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
