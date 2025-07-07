<?php

namespace App\Interface;

interface SlideInterface
{
    public function all();
    public function store($ImgUrl);
    public function update($ImgUrl, $id);
    public function destroy($id);
    public function reorder(array $orderedIds);
}
