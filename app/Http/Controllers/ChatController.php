<?php

namespace App\Http\Controllers;

use Gemini\Laravel\Facades\Gemini;
use Illuminate\Http\Request;
use App\Models\Room;
use App\Models\Booking;

class ChatController extends Controller
{
    protected string $SYSTEM_PROMPT = <<<PROMPT
Bạn là trợ lý khách sạn thân thiện của khách sạn Phongsavath Boutique Hotel, tọa lạc tại Luang Prabang, Lào.

Luôn trả lời bằng tiếng Việt. Nếu người dùng đặt câu hỏi bằng tiếng Anh hoặc ngôn ngữ khác, hãy lịch sự yêu cầu họ sử dụng tiếng Việt.

Thông tin khách sạn:
- Địa chỉ: Đường Sisavangvong, Luang Prabang, Lào
- Điện thoại: +856 20 9999 9999
- Website: https://www.phongsavathboutique.com/
- Email: info@phongsavathhotel.com

Hãy trả lời ngắn gọn (3-5 dòng), rõ ràng, thân thiện và phù hợp để hiển thị trong giao diện chat web. Không sử dụng ký tự đặc biệt hoặc emoji.
PROMPT;

    public function chatWithGemini(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:100000',
        ]);

        try {
            $userMessage = $request->input('message');
            $prompt = $this->SYSTEM_PROMPT;

            // Thêm thông tin phòng nếu user hỏi về phòng
            if (stripos($userMessage, 'phòng') !== false || stripos($userMessage, 'room') !== false) {
                $availableRooms = Room::with('roomType')
                    ->where('status', 'available')
                    ->get();

                if ($availableRooms->isNotEmpty()) {
                    $roomInfo = "\n\nCác phòng hiện còn trống:\n";
                    foreach ($availableRooms as $room) {
                        $roomInfo .= "- Phòng {$room->room_number} ({$room->roomType->name}): ";
                        $roomInfo .= "{$room->roomType->description}, ";
                        $roomInfo .= "Giá: {$room->roomType->price_per_night} USD/đêm\n";
                    }
                    $prompt .= $roomInfo;
                } else {
                    $prompt .= "\n\nHiện tại không có phòng trống.";
                }
            }

            // Thêm thông tin booking nếu user hỏi về đặt phòng
            if (stripos($userMessage, 'booking') !== false || stripos($userMessage, 'đặt phòng') !== false) {
                $recentBookings = Booking::with(['user', 'room.roomType'])
                    ->where('status', 'confirmed')
                    ->orderByDesc('booking_date')
                    ->take(5)
                    ->get();

                if ($recentBookings->isNotEmpty()) {
                    $bookingInfo = "\n\nThông tin đặt phòng gần đây:\n";
                    foreach ($recentBookings as $booking) {
                        $date = $booking->booking_date ? $booking->booking_date->format('d/m/Y') : 'N/A';
                        $bookingInfo .= "- Ngày đặt: {$date}, Phòng: {$booking->room->room_number} ({$booking->room->roomType->name}), Khách: {$booking->user->name}, Trạng thái: {$booking->status}\n";
                    }
                    $prompt .= $bookingInfo;
                } else {
                    $prompt .= "\n\nHiện chưa có đặt phòng nào.";
                }
            }

            $fullPrompt = $prompt . "\n\nNgười dùng: " . $userMessage . "\nTrợ lý:";

            $result = Gemini::generativeModel(model: 'gemini-2.0-flash')
                ->generateContent($fullPrompt);

            return response()->json([
                'reply' => $result->text(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Không thể lấy phản hồi từ Gemini',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
