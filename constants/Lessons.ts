export const LESSON_DATA: Record<string, any> = {
  "1": {
    id: "1",
    title: "Print ve Ekrana Yazdırma",
    explanation: `Python'da ekrana çıktı vermek için print() fonksiyonu kullanılır. Parantez içine yazmak istediğiniz metni tırnak işaretleri arasında yazarsınız.

Örnek kullanımlar:

  print("Merhaba Dünya!")
  → Merhaba Dünya!

  print("Python öğrenmek eğlenceli!")
  → Python öğrenmek eğlenceli!

Tek tırnak da çift tırnak da kullanılabilir:

  print('Bu da çalışır')
  → Bu da çalışır

Birden fazla şeyi aynı anda yazdırmak için virgül kullanılır:

  print("Merhaba", "Dünya")
  → Merhaba Dünya`,
    challengeTitle: "Kendini Tanıt!",
    challengeText: "Ekrana tam olarak şunu yazdır:\nMerhaba, ben Python öğreniyorum!",
    starterCode: "# Ekrana 'Merhaba, ben Python öğreniyorum!' yazdır\nprint(?)\n",
    videoUrl: "https://www.youtube.com/embed/S0d0ma5q-iI",
    expectedOutput: "Merhaba, ben Python öğreniyorum!",
  },
  "2": {
    id: "2",
    title: "Değişkenler",
    explanation: `Değişkenler, verileri saklamak için kullandığımız isimlendirilmiş kutulardır. Python'da değişken oluşturmak için isim = değer yazmanız yeterlidir, önceden tip belirtmenize gerek yoktur.

Örnek kullanımlar:

  isim = "Ahmet"
  print(isim)
  → Ahmet

  puan = 100
  print(puan)
  → 100

Değişkenin değeri sonradan değiştirilebilir:

  puan = 100
  puan = 200
  print(puan)
  → 200

Değişken isimleri küçük harfle başlamalı, Türkçe karakter ve boşluk içermemelidir:

  dogru_kullanim = 42
  yanlis kullanim = 42  ← Hata verir!`,
    challengeTitle: "Yaşını Sakla!",
    challengeText: "'yas' adında bir değişken oluştur ve ona 20 değerini ata. Ardından bu değişkeni print() ile ekrana yazdır.",
    starterCode: "# 'yas' değişkenini oluştur ve 20 değerini ata\n\n\n# Ekrana yazdır\n",
    videoUrl: "https://www.youtube.com/embed/Uwq-YtI-T60",
    expectedOutput: "20",
  },
  "3": {
    id: "3",
    title: "Veri Tipleri",
    explanation: `Python'da dört temel veri tipi vardır. Hangi tipte veri sakladığınızı bilmek, programınızın doğru çalışması için önemlidir.

int — Tam sayılar:
  yas = 25
  print(type(yas))
  → <class 'int'>

float — Ondalıklı sayılar:
  agirlik = 72.5
  print(type(agirlik))
  → <class 'float'>

str — Metin (string):
  isim = "Python"
  print(type(isim))
  → <class 'str'>

bool — Doğru/Yanlış:
  aktif = True
  print(type(aktif))
  → <class 'bool'>

type() fonksiyonu bir değişkenin tipini öğrenmek için kullanılır:
  pi = 3.14
  print(type(pi))
  → <class 'float'>`,
    challengeTitle: "Veri Tipini Bul!",
    challengeText: "3.14 değerini 'pi' adlı bir değişkene ata ve type(pi) fonksiyonu ile tipini ekrana yazdır.",
    starterCode: "# 'pi' değişkenine 3.14 değerini ata\n\n\n# type() ile tipini yazdır\n",
    videoUrl: "https://www.youtube.com/embed/sJkyGixATl0",
    expectedOutput: "<class 'float'>",
  },
  "4": {
    id: "4",
    title: "Aritmetik Operatörler",
    explanation: `Python'da tüm temel matematik işlemlerini yapabilirsiniz. İşte kullanabileceğiniz operatörler:

Toplama ve Çıkarma:
  print(10 + 3)   → 13
  print(10 - 3)   → 7

Çarpma ve Bölme:
  print(10 * 3)   → 30
  print(10 / 3)   → 3.3333...

Tam sayı bölmesi (sonucun tam sayı kısmı):
  print(10 // 3)  → 3

Kalan bulma (modulo):
  print(10 % 3)   → 1

Üs alma:
  print(2 ** 8)   → 256

Modulo operatörü (%) özellikle bir sayının çift mi tek mi olduğunu anlamak için sık kullanılır:
  print(17 % 2)   → 1  (tek sayı)
  print(18 % 2)   → 0  (çift sayı)`,
    challengeTitle: "Hesap Makinesi!",
    challengeText: "17 sayısını 5'e böldüğünde kalan kaçtır? Sonucu print() ile ekrana yazdır.",
    starterCode: "# 17'yi 5'e böldüğünde kalanı yazdır\n# İpucu: % operatörünü kullan\n\n",
    videoUrl: "https://www.youtube.com/embed/ULT5JGh79Ag",
    expectedOutput: "2",
  },
  "5": {
    id: "5",
    title: "String İşlemleri",
    explanation: `String'ler metin verilerini tutar ve üzerlerinde birçok işlem yapılabilir.

İki string'i birleştirme (+):
  ad = "Python"
  soyadı = "Dili"
  print(ad + " " + soyadı)
  → Python Dili

String uzunluğu:
  print(len("Merhaba"))
  → 7

Büyük/küçük harf:
  metin = "python"
  print(metin.upper())   → PYTHON
  print(metin.capitalize()) → Python

Tekrarlama:
  print("Ha" * 3)
  → HaHaHa

String içinde arama:
  print("python" in "python dili")
  → True`,
    challengeTitle: "İsim Birleştir!",
    challengeText: "'isim' değişkenine 'Python', 'dil' değişkenine 'programlama' değerlerini ata. Bu iki değişkeni aralarında bir boşluk olacak şekilde birleştirip ekrana yazdır.",
    starterCode: "isim = 'Python'\ndil = 'programlama'\n\n# İki değişkeni aralarında boşluk olacak şekilde birleştir\n",
    videoUrl: "https://www.youtube.com/embed/dpyWdDf0Js4",
    expectedOutput: "Python programlama",
  },
  "6": {
    id: "6",
    title: "Kullanıcıdan Girdi Alma",
    explanation: `input() fonksiyonu kullanıcıdan veri almanızı sağlar. Ancak input() her zaman string döndürür.

Temel kullanım:
  isim = input()
  print("Merhaba", isim)

Sayı almak için dönüşüm gerekir:
  sayi = int(input())    # Tam sayı için
  fiyat = float(input()) # Ondalıklı için

Dönüşüm yapmazsak ne olur?
  sayi = input()
  print(sayi + 1)
  → TypeError: can only concatenate str (not "int") to str

Doğru kullanım:
  sayi = int(input())
  print(sayi * 2)
  # Girdi 7 ise → 14`,
    challengeTitle: "Sayıyı İkiye Katla!",
    challengeText: "Kullanıcıdan bir sayı al, bu sayıyı ikiye katla ve sonucu ekrana yazdır. Girdi olarak 7 girildiğinde çıktı 14 olmalı.",
    starterCode: "# Kullanıcıdan sayı al (int'e çevir)\nsayi = int(input())\n\n# İkiye katla ve yazdır\n",
    videoUrl: "https://www.youtube.com/embed/DJsYsm5-GtY",
    expectedOutput: "14",
  },
  "7": {
    id: "7",
    title: "Koşullu İfadeler (if/elif/else)",
    explanation: `Koşullu ifadeler, belirli durumlar gerçekleştiğinde farklı kod bloklarının çalışmasını sağlar.

Temel if kullanımı:
  yas = 18
  if yas >= 18:
      print("Ehliyet alabilirsin")
  → Ehliyet alabilirsin

if/else:
  sayi = 7
  if sayi % 2 == 0:
      print("Çift")
  else:
      print("Tek")
  → Tek

if/elif/else — Birden fazla koşul:
  not_ = 75
  if not_ >= 90:
      print("AA")
  elif not_ >= 70:
      print("BB")
  else:
      print("CC")
  → BB

Karşılaştırma operatörleri:
  >   büyüktür
  <   küçüktür
  >=  büyük eşit
  <=  küçük eşit
  ==  eşit
  !=  eşit değil`,
    challengeTitle: "Pozitif mi, Negatif mi?",
    challengeText: "'sayi' değişkenine -5 değerini ata. Eğer sayı 0'dan büyükse 'Pozitif', 0'a eşitse 'Sıfır', küçükse 'Negatif' yazdır.",
    starterCode: "sayi = -5\n\n# Koşullu ifadeni buraya yaz\n",
    videoUrl: "https://www.youtube.com/embed/ucrjAonOUAI",
    expectedOutput: "Negatif",
  },
  "8": {
    id: "8",
    title: "For Döngüsü",
    explanation: `for döngüsü, bir koleksiyon üzerindeki her eleman için aynı kodu tekrar çalıştırır.

Liste üzerinde döngü:
  meyveler = ["elma", "armut", "kiraz"]
  for meyve in meyveler:
      print(meyve)
  → elma
    armut
    kiraz

range() ile sayı aralığı:
  for i in range(5):       # 0,1,2,3,4
  for i in range(1, 6):    # 1,2,3,4,5
  for i in range(0, 10, 2): # 0,2,4,6,8

Örnek — 1'den 5'e kadar topla:
  toplam = 0
  for i in range(1, 6):
      toplam += i
  print(toplam)
  → 15

Çift sayıları yazdırma:
  for i in range(1, 11):
      if i % 2 == 0:
          print(i)
  → 2, 4, 6, 8, 10`,
    challengeTitle: "Çift Sayılar!",
    challengeText: "1'den 10'a kadar (10 dahil) olan çift sayıları her biri ayrı satırda olacak şekilde ekrana yazdır.",
    starterCode: "# 1'den 10'a kadar çift sayıları yazdır\nfor i in range(1, 11):\n    # Eğer i çift sayıysa yazdır\n",
    videoUrl: "https://www.youtube.com/embed/JUsemOXDvjY",
    expectedOutput: "2\n4\n6\n8\n10",
  },
  "9": {
    id: "9",
    title: "While Döngüsü",
    explanation: `while döngüsü, bir koşul doğru olduğu sürece çalışmaya devam eder.

Temel kullanım:
  sayac = 0
  while sayac < 3:
      print(sayac)
      sayac += 1
  → 0
    1
    2

Geri sayaç:
  sayi = 5
  while sayi > 0:
      print(sayi)
      sayi -= 1
  → 5, 4, 3, 2, 1

for ile while farkı:
  • for  → kaç kez döneceğini bildiğinizde
  • while → koşul sağlandığı sürece döndürmek istediğinizde

⚠️ Dikkat — Sonsuz döngü:
  while True:
      print("Dur!")   # Bu sonsuza kadar çalışır!

Döngüden çıkmak için break kullanılır:
  while True:
      print("Bir kez")
      break
  → Bir kez`,
    challengeTitle: "Geri Say!",
    challengeText: "5'ten 1'e kadar (1 dahil) geri sayan bir while döngüsü yaz. Her sayıyı ayrı satırda yazdır.",
    starterCode: "sayi = 5\n\n# while döngüsünü buraya yaz\n",
    videoUrl: "https://www.youtube.com/embed/JUsemOXDvjY",
    expectedOutput: "5\n4\n3\n2\n1",
  },
  "10": {
    id: "10",
    title: "Listeler",
    explanation: `Listeler, birden fazla veriyi tek bir değişkende saklar. Köşeli parantez [] ile oluşturulur.

Liste oluşturma ve erişim:
  sayilar = [10, 20, 30, 40]
  print(sayilar[0])   → 10  (ilk eleman)
  print(sayilar[-1])  → 40  (son eleman)

Eleman ekleme ve çıkarma:
  liste = [1, 2, 3]
  liste.append(4)     # Sona ekle → [1,2,3,4]
  liste.remove(2)     # Değere göre sil → [1,3,4]

Liste uzunluğu:
  print(len([10, 20, 30]))  → 3

Liste üzerinde döngü:
  for eleman in sayilar:
      print(eleman)

Koşulla filtreleme:
  for sayi in [3, 17, 8, 25]:
      if sayi > 10:
          print(sayi)
  → 17
    25`,
    challengeTitle: "Listeyi Filtrele!",
    challengeText: "Verilen sayılar listesindeki 10'dan büyük olan sayıları ayrı satırlarda ekrana yazdır.",
    starterCode: "sayilar = [3, 17, 8, 25, 1, 14, 6]\n\n# 10'dan büyük sayıları yazdır\nfor sayi in sayilar:\n    # Koşulu buraya yaz\n",
    videoUrl: "https://www.youtube.com/embed/OlSyO4O-GM8",
    expectedOutput: "17\n25\n14",
  },
  "11": {
    id: "11",
    title: "Fonksiyonlar",
    explanation: `Fonksiyonlar, tekrar kullanılabilir kod blokları oluşturmanızı sağlar. def anahtar kelimesiyle tanımlanır.

Temel fonksiyon:
  def selamla():
      print("Merhaba!")

  selamla()   → Merhaba!

Parametreli fonksiyon:
  def topla(a, b):
      return a + b

  print(topla(3, 5))   → 8

return değeri olmayan fonksiyon sonuç döndürmez:
  def yaz(metin):
      print(metin)

  yaz("Python")   → Python

Üs alma örneği:
  def us_al(taban, us):
      return taban ** us

  print(us_al(2, 8))   → 256
  print(us_al(3, 3))   → 27`,
    challengeTitle: "Üs Alma Fonksiyonu!",
    challengeText: "İki parametre alan bir 'us_al' fonksiyonu yaz: taban ve üs. Tabanın üssünü hesaplayıp döndürsün. us_al(2, 8) çağrıldığında 256 döndürmeli.",
    starterCode: "# 'us_al' fonksiyonunu tanımla\ndef us_al(taban, us):\n    # Sonucu hesaplayıp döndür\n\n\nprint(us_al(2, 8))\n",
    videoUrl: "https://www.youtube.com/embed/McUxTvOyZ1w",
    expectedOutput: "256",
  },
  "12": {
    id: "12",
    title: "Sözlükler (Dictionary)",
    explanation: `Sözlükler, anahtar-değer çiftleri halinde veri saklar. Gerçek hayatta bir rehber gibi düşünebilirsiniz.

Sözlük oluşturma:
  ogrenci = {
      "isim": "Ahmet",
      "yas": 20,
      "not": 85
  }

Değere erişim:
  print(ogrenci["isim"])   → Ahmet
  print(ogrenci["not"])    → 85

Değer güncelleme:
  ogrenci["not"] = 90
  print(ogrenci["not"])    → 90

Yeni anahtar ekleme:
  ogrenci["bolum"] = "Bilgisayar"

Tüm anahtarları listeleme:
  print(ogrenci.keys())
  → dict_keys(['isim', 'yas', 'not'])`,
    challengeTitle: "Sözlükten Veri Çek!",
    challengeText: "Verilen öğrenci sözlüğündeki 'not' anahtarının değerini ekrana yazdır.",
    starterCode: "ogrenci = {\n    'isim': 'Ahmet',\n    'yas': 20,\n    'not': 85\n}\n\n# 'not' anahtarının değerini yazdır\n",
    videoUrl: "https://www.youtube.com/embed/jt0hwCplgvU",
    expectedOutput: "85",
  },
  "13": {
    id: "13",
    title: "String Formatlama",
    explanation: `f-string, değişkenleri string içine kolayca yerleştirmenizi sağlar. String'in başına f harfi eklenir, değişkenler {} içine yazılır.

Temel f-string:
  isim = "Ahmet"
  print(f"Merhaba {isim}!")
  → Merhaba Ahmet!

Birden fazla değişken:
  isim = "Ayşe"
  yas = 22
  print(f"Benim adım {isim}, {yas} yaşındayım.")
  → Benim adım Ayşe, 22 yaşındayım.

Matematiksel işlem içinde:
  fiyat = 100
  kdv = 0.18
  print(f"KDV dahil fiyat: {fiyat * (1 + kdv)} TL")
  → KDV dahil fiyat: 118.0 TL

Ondalık basamak biçimlendirme:
  pi = 3.14159
  print(f"Pi sayısı: {pi:.2f}")
  → Pi sayısı: 3.14`,
    challengeTitle: "Tanıtım Yap!",
    challengeText: "Verilen 'isim' ve 'yas' değişkenlerini kullanarak f-string ile ekrana şunu yazdır:\nBenim adım Ayşe, 22 yaşındayım.",
    starterCode: "isim = 'Ayşe'\nyas = 22\n\n# f-string kullanarak yazdır\n",
    videoUrl: "https://www.youtube.com/embed/ORUYookacp4",
    expectedOutput: "Benim adım Ayşe, 22 yaşındayım.",
  },
  "14": {
    id: "14",
    title: "List Comprehension",
    explanation: `List comprehension, bir listeyi tek satırda oluşturmanın kısa ve Pythonic yoludur.

Normal yöntem vs list comprehension:
  # Normal yöntem
  kareler = []
  for i in range(1, 6):
      kareler.append(i ** 2)

  # List comprehension
  kareler = [i ** 2 for i in range(1, 6)]
  print(kareler)
  → [1, 4, 9, 16, 25]

Koşullu list comprehension:
  # Sadece çift sayıların kareleri
  cifter = [i ** 2 for i in range(1, 11) if i % 2 == 0]
  print(cifter)
  → [4, 16, 36, 64, 100]

String listesi üzerinde:
  meyveler = ["elma", "armut", "kiraz"]
  buyuk = [m.upper() for m in meyveler]
  print(buyuk)
  → ['ELMA', 'ARMUT', 'KİRAZ']`,
    challengeTitle: "Kareleri Bul!",
    challengeText: "List comprehension kullanarak 1'den 5'e kadar (5 dahil) olan sayıların karelerini içeren bir liste oluştur ve yazdır.",
    starterCode: "# List comprehension ile kareler listesi oluştur\nkareler = [? for i in range(1, 6)]\nprint(kareler)\n",
    videoUrl: "https://www.youtube.com/embed/cTwOePxFRXY",
    expectedOutput: "[1, 4, 9, 16, 25]",
  },
  "15": {
    id: "15",
    title: "Hata Yönetimi (try/except)",
    explanation: `try/except bloğu, kodunuzda oluşabilecek hataları yakalamanızı ve programın çökmesini engellemenizi sağlar.

Temel kullanım:
  try:
      sayi = int("abc")   # Hata verir
  except ValueError:
      print("Geçersiz değer!")
  → Geçersiz değer!

Sıfıra bölme hatası:
  try:
      sonuc = 10 / 0
  except ZeroDivisionError:
      print("Sıfıra bölme hatası!")
  → Sıfıra bölme hatası!

Birden fazla hata türü:
  try:
      x = int(input())
      print(10 / x)
  except ValueError:
      print("Sayı giriniz!")
  except ZeroDivisionError:
      print("Sıfır giremezsiniz!")

else ve finally:
  try:
      print(10 / 2)
  except ZeroDivisionError:
      print("Hata!")
  else:
      print("İşlem başarılı")   # Hata yoksa çalışır
  finally:
      print("Her zaman çalışır") # Hata olsa da olmasa da`,
    challengeTitle: "Güvenli Bölme!",
    challengeText: "Verilen kodu tamamla: 10'u 0'a bölmeye çalış, ZeroDivisionError hatasını yakala ve ekrana 'Sıfıra bölme hatası!' yazdır.",
    starterCode: "try:\n    sonuc = 10 / 0\n    print(sonuc)\nexcept ?:\n    print('Sıfıra bölme hatası!')\n",
    videoUrl: "https://www.youtube.com/embed/vKv5e_8rL10",
    expectedOutput: "Sıfıra bölme hatası!",
  },
  "16": {
    id: "16",
    title: "Dosya İşlemleri",
    explanation: `Python'da open() fonksiyonu ile dosya okuma ve yazma işlemleri yapılabilir.

Dosyaya yazma ('w' modu):
  with open('not.txt', 'w') as f:
      f.write('Merhaba Dünya')
  # Dosya otomatik kapanır

Dosyadan okuma ('r' modu):
  with open('not.txt', 'r') as f:
      icerik = f.read()
      print(icerik)
  → Merhaba Dünya

Dosyaya ekleme ('a' modu — üstüne yazmaz):
  with open('not.txt', 'a') as f:
      f.write('\\nYeni satır')

with bloğu neden kullanılır?
  • Dosyayı otomatik kapatır
  • Hata olsa bile dosya açık kalmaz
  • f.close() yazmaya gerek kalmaz

Satır satır okuma:
  with open('not.txt', 'r') as f:
      for satir in f:
          print(satir)`,
    challengeTitle: "Dosyaya Yaz, Oku!",
    challengeText: "Bir dosyaya 'Codyverse' yaz, ardından aynı dosyayı okuyup içeriğini ekrana yazdır.",
    starterCode: "# Dosyaya yaz\nwith open('test.txt', 'w') as f:\n    f.write(?)\n\n# Dosyayı oku ve yazdır\nwith open('test.txt', 'r') as f:\n    icerik = f.read()\n    print(icerik)\n",
    videoUrl: "https://www.youtube.com/embed/hO7IRvi2nyw",
    expectedOutput: "Codyverse",
  },
};