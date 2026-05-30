# Codyverse
Hasan Hüseyin KAYIK - 21040523

---

## Video Linkleri

| Hafta | Tarih | Video Bağlantısı |
| :--- | :--- | :--- |
| **1. Hafta** | 23.03.2026 | [🔗 21040523-HasanHüseyinKayık-IOS2 Dersi-23032026-V1](https://www.youtube.com/watch?v=sEEcYnMdA-s) |
| **2. Hafta** | 29.03.2026 | [🔗 21040523-HasanHüseyinKayık-IOS2 Dersi-29032026-V2](https://www.youtube.com/watch?v=9QD9gnPqa7A) |
| **3. Hafta** | 26.04.2026 | [🔗 21040523-HasanHüseyinKayık-IOS2 Dersi-26042026-V3](https://www.youtube.com/watch?v=hcNHJQ3PawU) |
| **4. Hafta** | 26.05.2026 | [🔗 21040523-HasanHüseyinKayık-IOS2 Dersi-26052026-V4](https://youtu.be/gJXu1f543A0) |
| **5. Hafta** | 27.05.2026 | [🔗 21040523-HasanHüseyinKayık-IOS2 Dersi-27052026-V5](https://www.youtube.com/watch?v=qfjXgbzScxU) |
| **6. Hafta** | 28.05.2026 | [🔗 21040523-HasanHüseyinKayık-IOS2 Dersi-28052026-V6](https://youtu.be/CFaPOfIcJyI) |

---

## 1. Hafta: Projenin planlanması
**Tarih:** 23.03.2026

Hocam 1. haftamda size verdiğim dokümanda belirttiğim gibi projenin planlanması ve teknoloji araştırması aşamasını tamamladım. 

Hafta hafta kullanabileceğim teknolojileri araştırdım ve bir excel tablosu haline getirdim. Excel tablosun bu haftanın videosunda gösterdim. Büyük ölçüde bu plana bağlı kalarak hareket etmeyi planlıyorum.

| Hafta | Planlanan İşlem | Kullanılacak Teknolojiler / Kütüphaneler |
| :--- | :--- | :--- |
| **1** | Proje Planlama ve Araştırma | React Native (Expo), GitHub |
| **2** | Arayüz Tasarımı ve Mimari | Expo Router, Figma |
| **3 4 5** | Ders Modülleri ve İçerik | JSON, Markdown |
| **5 6 7** | Veritabanı Entegrasyonu | PostgreSQL (?), Node.js (?) |
| **8** | Daily Challenge Özelliği | PostgreSQL (?) |
| **9 10** | Test ve Hata Düzeltme | - |
| **11** | Ek Özellikler | - |

Mobil uygulamayı React Native Expo ile kodlarken, sizin de istediğiniz gibi Github üzerinden ilerlememi kaydedeceğim. 

Uygulama içi sayfa geçişleri noktasında daha önce kendi projelerimde Kotlin'de kullandığım Navigation for Compose yapısına çok benzeyen Expo Router yapısını kullanacağım. Bu sayede her bir sayfayı kendi dosyası özelinde kodlayabilecek ve herhangi bir hata oluştuğunda diğer sayfalara yayılmasının önüne geçeceğim. Bu teknolojiyi test etmek amacıyla bu hafta yapay zeka ile bu mantığı kullanan basit bir prototip oluşturdum; videoda bu prototipi gösterdim. Bu basit prototipte sayfaların birbiri arasında nasıl kolayca ve sistematik şekilde geçiş yaptığını gözlemledim.

Ders modülleri ve içerik konusunda JSON ve Markdown kullanmayı düşünüyorum. İçerikleri JSON objeleri içerisinde tutarken Markdown ile yazılan kodların renklendirmesini yapabileceğimi düşünüyorum. Daha önce bu teknolojiler ile çalışmadım ancak entegre etmeye çalışacağım.

## 2. Hafta: Arayüz Tasarımı ve Mimari
**Tarih:** 29.03.2026

İkinci haftamda proje dokümanında belirttiğim gibi arayüz tasarımı ve mimari üzerine çalıştım. Uygulamamın hangi menülerden oluşacağını, bu menülerin kendi içlerinde nasıl iletişim kuracağını, ileride kullanacağım veritabanı yapısına uygun olarak nasıl veriler içereceği üzerine kurgu yaptım.

Navigasyon barında yer alacak 4 temel arayüz olacak: Journey, Daily Challange, Leaderboard ve Profile. Bu arayüzler hakkındaki çalışmamı 2. hafta videosunda detaylıca açıkladım. İlgili ekranlar, '_layout.tsx' dosyası içinde expo-router sistemi kullanılarak birbirlerine bağlandı. Ayrıca projeyi yaparaken kolaylık olması açısından 'tabs' içeren bir başlangıç projesi ile başladım, bu bana özellikle navigasyon menüsünü oluştururken kolaylık sağladı. Arayüzler ile ilgili bilgiler aşağıdadır:

Journey -> Tasarım raporunda belirttiğim uygulama içerisindeki modüler yapıda ilerleyen ders modülleri, 'journey' adı altında bir 'roadmap' şeklinde kullanıcıya sunulacak. İçerik tamamlandıkça roadmap'te yeni alanlar açılacak ve kullanıcı ilerleme kaydedecek. Her bir roadmap dairesi içinde, yeni bir eğitim içeriği yer alacak.

Bu bölüm proje dosyaları içinde yer alan 'index.tsx' dosyasının karşılığı oluyor, yani aslında kullanıcıyı karşılayan Main Page'imiz. Bu haftaki çalışmada index.tsx dosyası içinde 'const modules' olarak tanımlanan veriler; aslında ilerleyen haftalarda projeme entegre etmeyi planladığım PostgreSQL yapısı ile alacağım veri yapısına uygun olarak geçici olarak manuel şekilde eklendi. Veri tabanı eklendiğinde bu bilgilerin bir .js dosyasından alınarak sisteme sorunsuz şekilde entegre edilmesini planlıyorum.

Daily Challange -> Bu kısımda veri tabanında bir havuzda tutulan sorulardan rastgele bir tanesi seçilerek kullanıcılara sunulacak.

Leaderboard -> Bu kısımda kullanıcılar kazandıkları puanlara göre sıralanacak.

Profile -> Kullanıcıların kişisel bilgilerinin yer aldığı ve 'Ayarlar' alanına erişebildikleri ekran. Bu hafta basit bir profil ekranı tasarladım ve kullanıcı bilgilerinin yan ısıra içerisine XP, Günlük Seri gibi iki adet özellik ekledim. Bu bilgileri daha önce bahsettiğim sistem ile manuel olarak ekledim. Veritabanı entegrasyonunda sorun yaşamamak için temel inşa ettim.

Ayarlar -> Profil ekranı içerisinden erişilebilen bu kısımda kullanıcı ayarları yer alacak. Ayarlar menüsü oluştururken diğer menülerden farklı olarak bir navigasyon ekranı olarak değil, ayrı bir ekran olarak projeye eklendi. Bunu '_layout.tsx' dosyasında Profile Tabs.Screen etiketinin içerisinde tanımlayarak sağladım, ayrıca bunu yapabilmek için ilgili dosyaya expo-router içinden useRouter'ı import etmem gerekti "import { useRouter } from 'expo-router';" tanımlaması ile. 

## 3. Hafta: Ders Modülleri ve İçerik Tasarımı
**Tarih:** 26.04.2026

Bu hafta raporumda belirttiğim gibi ders modülleri ve içerik tasarımı aşamasına geçtim. Uygulamada modül olarak yer alacak programlama dili olarak Python'u seçtim. modal.tsx adında bir dosya oluşturarak bu dosya içerisine ders modüllerini ekledim. Bu dosyada bulunan LESSON_DATA sistemi sayesinde daha önce index.tsx dosyasında her bir konu için belirttiğim id sistemi sayesinde -örneğin id:1 Variables, id:2 Data Types gibi- bu konuların ayrı ayrı yönlendirmesini yapabildim.

Uygulama içerisinden Journey sayfasında Variables butonuna basarsak Variables konu anlatımı, Data Types butonuna basarsak Data Types konu anlatımı karşımıza geliyor. Aslında butonların yönlendirmeleri modal.tsx dosyası olmasına rağmen id ile belirlenen konuya yönlendirme sağlayabiliyorum.

Her bir konu için bir challange yer alıyor. Sıralama şu şekilde: Journey üzerinden konu seçimi -> Konu anlatımı -> Challange bilgisi -> Editör. Challange hakkında bilgileri kullanıcı okuduktan sonra editör sayfasına geçerek challange'ı tamamlamaya çalışıyor.

Editör sayfası editor.tsx dosyasında bulunuyor. Pyodide Webview kullanarak Python çalıştıracak bir sistemi uygulama içerisine ekledim. Uygulamanın içerisinde çalışması performansı biraz düşüyor olsa da python programının çıktıları anlamında daha stabil bir sonuç veriyor. Şu anda editor içinde hazır bir python kodu ile karşılanıyor kullanıcı, ilerleyen haftalarda bu kodun yönlendirilen challange'a uygun düzenlemesini yapmayı planlıyorum. 

## 4. Hafta: Ders Modül Sistemi, Video ve Ders İçeriği Güncellemesi
**Tarih:** 26.05.2026

Bu hafta Journey ekranında bulunan Checkpoint'lerin -yani her bir konunun- ders içeriği kısmına Youtube üzerinden linke yönlendirilen bir alan ekledim. Bu sayede öğrenciler videolara yönlendirilerek daha kaliteli bir öğrenme süreci içinde yer alacaklar. Her bir Checkpoint için uygulama içi Python editöründe çalışan özel olarak tasarlanmış challange'lar yer alıyor. Bu challange'ı yaparak kullanıcı kod pratiği yapmış oluyor.

Bu süreçte kullanılan video linkleri, kod editörü çalışmaları gibi özellikler projedeki Lessons.ts dosyası içinde PostgreSQL'e hızlıca aktarılabilecek şekilde tutuluyor, ilerleyen çalışmalarda veritabanına her biri Attribute olarak aktarılacak ve Veritabanı panelinden kontrol edilebilecek.

Checkpointlerin içinde yer alan sekme yapısı ve Youtube link yönlendirmeleri projedeki app klasörünün içindeki modal.tsx dosyasında yer alıyor.

## 5. Hafta: Ders Modül Sistemi, Video ve Ders İçeriği Tamamlanması
**Tarih:** 27.05.2026

Bu çalışmada uygulamamızdaki ders modülleri ve ders içerikleri tamamlandı, son kullanıcının kullanabileceği hale getirildi. Uygulama içindeki Python Konsolu çıktıları kontrol edilmiyordu, her bir modül challange'ının kullanıcı çıktıları artık kontrol edilerek buna göre işlem yapılıyor. Proje dosyalarında constants/ProgressStore.ts dosyası oluşturularak her bir modülün üç farklı durumda bulunulması sağlandı: completed, current, locked. Bu sisteme bağlı olarak modüller tamamlanarak bir sonraki modüle geçilebilir hale getirildi. Bu sistem doğrudan kullanıcının output'unu kontrol ederek sistemin çalışmasına imkan sağlıyor.

Modüllerdeki -checkpointlerdeki- yazılı konu anlatımları eksikti, çok daha detaylı yazılı ders içerikleri uygulama içine eklendi. Bu eklemeler henüz constant/Lessons.ts dosyasında saklansa da ilerleyen çalışmalarda doğrudan veri tabanına aktarılabilecek şekilde eklendi.

## 6. Hafta: Veritabanı Kurulumu
**Tarih:** 28.05.2026

Veritabanı için Django + PostgreSQL kullanmayı planlıyorum. Bu yüzden ilgili paketleri terminalde pip aracılığıyla kurdum:

djangorestframework -> REST API için

psycopg2-binary -> PostgreSQL bağlantısı için

djangorestframework-simplejwt -> kullanıcı girişi için

django-cors-headers -> mobil uygulamanın backend'e erişebilmesi için

Yerel dosyalarımda codyverse_backand diye bir klsaör açtım ve burada Django projesini başlattım ve içerisinde api klasörü oluştu. api klasörü içinde bulunan models.py dosyası içinde veritabanında bulunmasını istediğim 5 tabloyu ekledim; bu tablolar: User, Lesson, UserProgress, DailyChallange ve DailyChallengeLog tabloları. Bu tablolar için şimdilik belirli attribute'lar ekledim ancak ilerde eklemeler yapabilirim.

Daha sonra oluşturduğum tabloların admin panelinden kontrol edilebilmesi için yerel dosyalarımdaki api/admin.py dosyasına da ekledim. Admin paneli olarak Django'nun standart admin panelini kullanmayı planlıyorum. Bu çalışma sonucunda kendi bilgisayarımda tarayıcıda 'http://127.0.0.1:8000/admin/' adresine gidildiğinde admin panelimiz açılıyor.
