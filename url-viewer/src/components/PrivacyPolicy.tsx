import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Shield, Languages } from "lucide-react";
import { Link } from "react-router-dom";

type Language = 'tr' | 'en';

interface PrivacyTranslations {
  [key: string]: {
    tr: string;
    en: string;
  };
}

const privacyTranslations: PrivacyTranslations = {
  title: {
    tr: "Gizlilik Politikası",
    en: "Privacy Policy"
  },
  lastUpdated: {
    tr: "Son Güncelleme: 12 Temmuz 2025",
    en: "Last Updated: July 12, 2025"
  },
  backToHome: {
    tr: "Ana Sayfaya Dön",
    en: "Back to Home"
  },
  introduction: {
    tr: "URL Viewer uygulamasını kullandığınız için teşekkür ederiz. Bu gizlilik politikası, uygulamımızı kullanırken kişisel bilgilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi vermektedir.",
    en: "Thank you for using the URL Viewer application. This privacy policy provides information about how your personal information is collected, used, and protected when using our application."
  },
  dataCollectionTitle: {
    tr: "1. Toplanan Veriler",
    en: "1. Data Collection"
  },
  dataCollectionContent: {
    tr: "URL Viewer uygulaması minimal veri toplama prensibini benimser:\n\n• Dil Tercihi: Seçtiğiniz dil bilgisi tarayıcınızın yerel deposunda (localStorage) saklanır\n• URL Geçmişi: Girdiğiniz URL'ler yalnızca geçici olarak tarayıcı belleğinde tutulur ve sunucularımıza gönderilmez\n• Teknik Veriler: Uygulama performansı için temel kullanım istatistikleri\n• Kişisel kimlik bilgilerinizi (ad, e-posta, telefon vb.) toplamayız",
    en: "The URL Viewer application follows a minimal data collection principle:\n\n• Language Preference: Your selected language is stored in your browser's local storage (localStorage)\n• URL History: URLs you enter are only temporarily stored in browser memory and are not sent to our servers\n• Technical Data: Basic usage statistics for application performance\n• We do not collect personal identification information (name, email, phone, etc.)"
  },
  dataUsageTitle: {
    tr: "2. Verilerin Kullanımı",
    en: "2. Data Usage"
  },
  dataUsageContent: {
    tr: "Toplanan veriler şu amaçlarla kullanılır:\n\n• Dil tercihlerinizi hatırlamak ve uygun dilde hizmet sunmak\n• Uygulama performansını iyileştirmek\n• Teknik sorunları tespit etmek ve çözmek\n• Kullanıcı deneyimini geliştirmek",
    en: "Collected data is used for:\n\n• Remembering your language preferences and providing service in the appropriate language\n• Improving application performance\n• Detecting and solving technical issues\n• Enhancing user experience"
  },
  thirdPartyTitle: {
    tr: "3. Üçüncü Taraf Siteler",
    en: "3. Third Party Websites"
  },
  thirdPartyContent: {
    tr: "URL Viewer, girdiğiniz web sitelerini iframe içinde görüntüler. Bu siteler:\n\n• Kendi gizlilik politikalarına tabidir\n• Bizim kontrolümüzde değildir\n• Kendi çerezlerini ve izleme sistemlerini kullanabilir\n• Bu sitelerin gizlilik uygulamalarından sorumlu değiliz",
    en: "URL Viewer displays websites you enter within an iframe. These websites:\n\n• Are subject to their own privacy policies\n• Are not under our control\n• May use their own cookies and tracking systems\n• We are not responsible for the privacy practices of these sites"
  },
  dataSecurityTitle: {
    tr: "4. Veri Güvenliği",
    en: "4. Data Security"
  },
  dataSecurityContent: {
    tr: "• Verilerinizi korumak için endüstri standardı güvenlik önlemleri alıyoruz\n• URL'ler sunucularımızda saklanmaz, yalnızca tarayıcınızda işlenir\n• HTTPS şifrelemesi kullanılarak güvenli bağlantı sağlanır\n• Hassas bilgilerinizi kaydetmeyiz veya üçüncü taraflarla paylaşmayız",
    en: "• We implement industry-standard security measures to protect your data\n• URLs are not stored on our servers, only processed in your browser\n• Secure connection is provided using HTTPS encryption\n• We do not record or share your sensitive information with third parties"
  },
  userRightsTitle: {
    tr: "5. Kullanıcı Hakları",
    en: "5. User Rights"
  },
  userRightsContent: {
    tr: "• Dil tercihlerinizi istediğiniz zaman değiştirebilirsiniz\n• Tarayıcı ayarlarından localStorage verilerini temizleyebilirsiniz\n• Uygulamayı kullanmayı bırakarak veri işlemeyi sonlandırabilirsiniz\n• Sorularınız için bizimle iletişime geçebilirsiniz",
    en: "• You can change your language preferences at any time\n• You can clear localStorage data from your browser settings\n• You can stop data processing by discontinuing use of the application\n• You can contact us with any questions"
  },
  contactTitle: {
    tr: "6. İletişim",
    en: "6. Contact"
  },
  contactContent: {
    tr: "Bu gizlilik politikası hakkında sorularınız varsa, lütfen bizimle iletişime geçin:\n\nE-posta: privacy@urlviewer.app\n\nBu politika gerektiğinde güncellenebilir. Değişiklikler bu sayfada yayınlanacaktır.",
    en: "If you have questions about this privacy policy, please contact us:\n\nEmail: privacy@urlviewer.app\n\nThis policy may be updated as necessary. Changes will be published on this page."
  },
  turkish: {
    tr: "Türkçe",
    en: "Turkish"
  },
  english: {
    tr: "İngilizce",
    en: "English"
  }
};

export default function PrivacyPolicy() {
  const [language, setLanguage] = useState<Language>('tr');

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('url-viewer-language') as Language;
    if (savedLanguage && (savedLanguage === 'tr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Update document title when language changes
  useEffect(() => {
    document.title = language === 'tr' 
      ? 'Gizlilik Politikası - URL Viewer' 
      : 'Privacy Policy - URL Viewer';
  }, [language]);

  // Save language preference to localStorage
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('url-viewer-language', newLanguage);
  };

  // Get translation for current language
  const t = (key: string): string => {
    return privacyTranslations[key]?.[language] || key;
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <div key={index} className={line.trim() === '' ? 'h-4' : ''}>
        {line}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t('backToHome')}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t('title')}
              </h1>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-muted-foreground" />
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tr">{t('turkish')}</SelectItem>
                <SelectItem value="en">{t('english')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground">{t('lastUpdated')}</p>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-6">
          {/* Introduction */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                {t('introduction')}
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">{t('dataCollectionTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                {formatContent(t('dataCollectionContent'))}
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">{t('dataUsageTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                {formatContent(t('dataUsageContent'))}
              </div>
            </CardContent>
          </Card>

          {/* Third Party */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">{t('thirdPartyTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                {formatContent(t('thirdPartyContent'))}
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">{t('dataSecurityTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                {formatContent(t('dataSecurityContent'))}
              </div>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">{t('userRightsTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                {formatContent(t('userRightsContent'))}
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">{t('contactTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                {formatContent(t('contactContent'))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border/50">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('backToHome')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}