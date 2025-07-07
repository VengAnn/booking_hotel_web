<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileHelper
{
    /**
     * Store an uploaded image and delete the old one if provided.
     *
     * @param UploadedFile $file         The new uploaded file
     * @param string       $folder       The folder in 'public' disk to store the file
     * @param string|null  $oldFilePath  The old file path (relative to storage/app/public)
     * @return string                    The new file path
     */
    public static function storeImage(UploadedFile $file, string $folder = 'profile_images', ?string $oldFilePath = null): string
    {
        // Delete old file if it exists
        if ($oldFilePath && Storage::disk('public')->exists($oldFilePath)) {
            Storage::disk('public')->delete($oldFilePath);
        }

        // Generate a unique filename
        $filename = uniqid() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
        $extension = $file->getClientOriginalExtension();

        // Store the file in the public disk
        $path = $file->storeAs($folder, "{$filename}.{$extension}", 'public');

        return $path; // e.g. profile_images/unique-name.jpg
    }



    /**
     * Delete an image file from the public disk.
     *
     * @param string|null $path
     * @return bool
     */
    public static function deleteImage(?string $path): bool
    {
        if ($path && Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }
        return false;
    }
}
