# Proje Özeti (Project Brief)

## Proje Genel Bakış
**İsim:** Instagram DM Otomasyonu (ManyChat + OpenAI GPT-4)
**Hedef:** Bir eğitmen/işletme koçu için gelen Instagram DM mesajlarını ManyChat (mesajlaşma arayüzü) ve OpenAI GPT-4 (akıl/zeka) kullanarak otomatize etmek.

## Temel Hedefler
1.  **Otomatik Yanıtlar:** İşletmenin tonuna uygun olarak (örneğin Azerbaycan dili desteğiyle) kurslar, fiyatlar ve lokasyon hakkındaki kullanıcı sorularını otomatik yanıtlamak.
2.  **Sorunsuz Entegrasyon:** ManyChat (ön yüz/kanal) ile OpenAI (zeka) arasında özel bir Python (FastAPI) backend ile köprü kurmak.
3.  **Yönetici Kontrolü:** AI sistem promptunu yapılandırmak ve canlı Instagram trafiği olmadan yanıtları test etmek için opsiyonel bir Admin Paneli sunmak.

## Ana Özellikler
-   **Webhook İşleyicisi:** ManyChat'ten gelen DM verilerini (payload) karşılar.
-   **AI İşleme:** GPT-4 kullanarak bağlama uygun yanıtlar üretir.
-   **Yanıt Dağıtımı:** Yanıtları ManyChat API (`setCustomField` & `sendFlow`) aracılığıyla ilgili kullanıcıya geri gönderir.
-   **Admin Paneli:** İşletme detaylarını girerek sistem promptlarını otomatik oluşturan form ve test aracı.

## Başarı Kriterleri
-   Sistemin gelen DM'leri doğru şekilde tanımlaması.
-   GPT-4'ün yapılandırılan "Sistem Promptu"na göre uygun yanıt üretmesi.
-   Yanıtların makul bir süre içinde (<10sn) kullanıcıya Instagram üzerinden iletilmesi.
-   Temel Admin Panelinin işletme detaylarını güncelleyebilmesi ve bunun AI davranışına yansıması.
