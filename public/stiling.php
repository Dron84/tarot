<?php
	/**
	 * Created by PhpStorm.
	 * User: andrey
	 * Date: 20.05.2020
	 * Time: 21:38
	 */
	$data = $_POST;
	$date = new DateTime();
	file_put_contents($date.'txt', $data);