// $(document).ready(function () {
//     const setupData = {
//         websiteTitle: "Phongsavath Boutique Hotel",
//         websiteDescription: "Phongsavath Boutique Hotel là khách sạn boutique tại trung tâm thành phố, mang phong cách hiện đại, đầy đủ tiện nghi với phòng nghỉ sang trọng và dịch vụ chuyên nghiệp.",
//         address: "123 Phố Chính - Trung tâm Thành phố - Lào",
//         mapLink: "https://www.google.com/maps/place/Phongsavath+Boutique+Hotel/@17.9643896,102.6066588,17z", // Google Maps link
//         phones: ["+090 123 456 789", "+091 987 654 321"],
//         email: "info@phongsavathhotel.com",
//         social: {
//             facebook: "https://facebook.com/phongsavathhotel",
//             instagram: "https://instagram.com/phongsavathhotel",
//             twitter: "https://twitter.com/phongsavathhotel"
//         },
//         embedMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3793.763676839697!2d102.6041751!3d17.9641702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3124694c2d2564d1%3A0xb9df88e5b733e260!2sPhongsavath%20Boutique%20Hotel!5e0!3m2!1svi!2s!4v1720080000000!5m2!1svi!2s"
//     };

//     function renderSetup() {
//         const html = `
//             <h2 class="mb-4">Thiết lập Website</h2>

//             <!-- General Settings -->
//             <div class="card mb-4 shadow-sm">
//                 <div class="card-header d-flex justify-content-between align-items-center">
//                     <strong>Thiết Lập Chung</strong>
//                     <button class="btn btn-sm btn-outline-secondary" onclick="editGeneral()">
//                         <i class="fa fa-edit"></i> Sửa
//                     </button>
//                 </div>
//                 <div class="card-body">
//                     <p><strong>Tiêu Đề Website:</strong> <span id="websiteTitle">${setupData.websiteTitle}</span></p>
//                     <p><strong>Giới Thiệu:</strong> <span id="websiteDescription">${setupData.websiteDescription}</span></p>
//                 </div>
//             </div>

//             <!-- Contact Settings -->
//             <div class="card mb-4 shadow-sm">
//                 <div class="card-header d-flex justify-content-between align-items-center">
//                     <strong>Thiết Lập Liên Hệ</strong>
//                     <button class="btn btn-sm btn-outline-secondary" onclick="editContact()">
//                         <i class="fa fa-edit"></i> Sửa
//                     </button>
//                 </div>
//                 <div class="card-body row">
//                     <div class="col-md-6">
//                         <p><strong>Địa Chỉ:</strong> <span id="contactAddress">${setupData.address}</span></p>
//                         <p><strong>Google Map:</strong> 
//                             <a id="googleMap" href="${setupData.mapLink}" target="_blank">Xem bản đồ</a>
//                         </p>
//                         <p><strong>Số Điện Thoại:</strong>
//                             <br><i class="fa fa-phone"></i> <span id="phone1">${setupData.phones[0]}</span>
//                             <br><i class="fa fa-phone"></i> <span id="phone2">${setupData.phones[1]}</span>
//                         </p>
//                         <p><strong>Email:</strong> <span id="email">${setupData.email}</span></p>
//                     </div>
//                     <div class="col-md-6">
//                         <p><strong>Mạng Xã Hội:</strong></p>
//                         <p><i class="fab fa-facebook"></i> <a id="fb" href="${setupData.social.facebook}" target="_blank">Facebook</a></p>
//                         <p><i class="fab fa-instagram"></i> <a id="ig" href="${setupData.social.instagram}" target="_blank">Instagram</a></p>
//                         <p><i class="fab fa-twitter"></i> <a id="tw" href="${setupData.social.twitter}" target="_blank">Twitter</a></p>
//                         <p><strong>Bản Đồ:</strong></p>
//                         <iframe id="mapIframe"
//                             src="${setupData.embedMap}"
//                             width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy">
//                         </iframe>
//                     </div>
//                 </div>
//             </div>
//         `;

//         $("#setup").html(html);
//     }

//     renderSetup();
// });

// // Optional: Add editing features later
// function editGeneral() {
//     alert("Chức năng chỉnh sửa thiết lập chung chưa được triển khai.");
// }

// function editContact() {
//     alert("Chức năng chỉnh sửa thiết lập liên hệ chưa được triển khai.");
// }
