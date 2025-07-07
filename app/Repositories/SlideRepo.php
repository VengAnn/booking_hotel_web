<?php

namespace App\Repositories;

use App\Interface\SlideInterface;
use App\Models\Slide;

class SlideRepo implements SlideInterface
{
    public function all()
    {
        // Order by 'order' ascending
        return Slide::orderBy('order')->get();
    }

    public function store($imgUrl)
    {
        // Get the current max order and increment
        $maxOrder = Slide::max('order') ?? -1;
        return Slide::create([
            'img_url' => $imgUrl,
            'order' => $maxOrder + 1,
        ]);
    }

    public function update($imgUrl, $id)
    {
        $slide = Slide::findOrFail($id);
        $slide->update([
            'img_url' => $imgUrl,
        ]);
        return $slide;
    }

    public function destroy($id)
    {
        $slide = Slide::findOrFail($id);
        $slide->delete();
        return $slide;
    }

    public function reorder(array $orderedIds)
    {
        foreach ($orderedIds as $index => $id) {
            Slide::where('id', $id)->update(['order' => $index]);
        }
    }
}
