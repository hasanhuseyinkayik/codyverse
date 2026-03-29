# Codyverse
Hasan Hüseyin KAYIK - 21040523

---

## Video Linkleri

| Hafta | Tarih | Video Bağlantısı |
| :--- | :--- | :--- |
| **1. Hafta** | 23.03.2026 | [🔗 21040523-HasanHüseyinKayık-IOS2 Dersi-23032026-V1](https://www.youtube.com/watch?v=sEEcYnMdA-s) |
| **2. Hafta** | 29.03.2026 | [🔗 21040523-HasanHüseyinKayık-IOS2 Dersi-29032026-V2](https://www.youtube.com/watch?v=9QD9gnPqa7A) |

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
