import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, Globe, RefreshCw, AlertCircle, ExternalLink, Languages, Shield } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

type Language = 'tr' | 'en';

interface Translations {
  [key: string]: {
    tr: string;
    en: string;
  };
}

const translations: Translations = {
  title: {
    tr: "URL Viewer",
    en: "URL Viewer"
  },
  subtitle: {
    tr: "Web sitelerini anında önizleyin ve mobil uyumlu görüntüleyin",
    en: "Preview websites instantly and view them in mobile-friendly format"
  },
  urlInput: {
    tr: "URL Girin",
    en: "Enter URL"
  },
  placeholder: {
    tr: "Örn: google.com, github.com, youtube.com",
    en: "e.g: google.com, github.com, youtube.com"
  },
  loading: {
    tr: "Yükleniyor...",
    en: "Loading..."
  },
  view: {
    tr: "Görüntüle",
    en: "View"
  },
  currentSite: {
    tr: "Görüntülenen Site",
    en: "Current Site"
  },
  loadingSite: {
    tr: "Site yükleniyor...",
    en: "Loading site..."
  },
  howToUseTitle: {
    tr: "🚀 Nasıl Kullanılır?",
    en: "🚀 How to Use?"
  },
  step1: {
    tr: "Yukarıdaki alana görüntülemek istediğiniz web sitesinin URL'sini yazın",
    en: "Enter the URL of the website you want to preview in the field above"
  },
  step2: {
    tr: "\"Görüntüle\" butonuna tıklayın veya Enter tuşuna basın",
    en: "Click the \"View\" button or press Enter"
  },
  step3: {
    tr: "Web sitesi aşağıda mobil uyumlu şekilde görüntülenecek",
    en: "The website will be displayed below in mobile-friendly format"
  },
  footer: {
    tr: "Made with ❤️ using React + TypeScript + TailwindCSS",
    en: "Made with ❤️ using React + TypeScript + TailwindCSS"
  },
  errorEmpty: {
    tr: "Lütfen bir URL girin",
    en: "Please enter a URL"
  },
  errorInvalid: {
    tr: "Geçerli bir URL girin (örn: google.com veya https://google.com)",
    en: "Enter a valid URL (e.g: google.com or https://google.com)"
  },
  errorIframe: {
    tr: "Bu site iframe içinde gösterilemiyor. Güvenlik nedeniyle bazı siteler bu özelliği desteklemez.",
    en: "This site cannot be displayed in iframe. Some sites don't support this feature for security reasons."
  },
  language: {
    tr: "Dil",
    en: "Language"
  },
  turkish: {
    tr: "Türkçe",
    en: "Turkish"
  },
  english: {
    tr: "İngilizce",
    en: "English"
  },
  privacyPolicy: {
    tr: "Gizlilik Politikası",
    en: "Privacy Policy"
  }
};

export default function URLViewer() {
  const [url, setUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState<Language>('tr');
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
      ? 'URL Viewer - Link Önizleyici' 
      : 'URL Viewer - Link Preview Tool';
  }, [language]);

  // Save language preference to localStorage
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('url-viewer-language', newLanguage);
  };

  // Get translation for current language
  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const isValidUrl = (string: string) => {
    try {
      const newUrl = new URL(string);
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const formatUrl = (inputUrl: string) => {
    if (!inputUrl) return "";
    if (inputUrl.startsWith('http://') || inputUrl.startsWith('https://')) {
      return inputUrl;
    }
    return `https://${inputUrl}`;
  };

  const loadUrl = () => {
    if (!url.trim()) {
      setError(t('errorEmpty'));
      return;
    }

    const formattedUrl = formatUrl(url.trim());
    
    if (!isValidUrl(formattedUrl)) {
      setError(t('errorInvalid'));
      return;
    }

    setError("");
    setIsLoading(true);
    setCurrentUrl(formattedUrl);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setError("");
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError(t('errorIframe'));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      loadUrl();
    }
  };

  const refreshPage = () => {
    if (currentUrl && iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = currentUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 rounded-full bg-primary/10">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t('title')}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            {t('subtitle')}
          </p>
          
          {/* Language Selector */}
          <div className="flex items-center justify-center gap-2 mt-6">
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

        {/* URL Input Section */}
        <Card className="mb-6 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Link className="h-5 w-5" />
              {t('urlInput')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder={t('placeholder')}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-12 text-base border-2 border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
              <Button 
                onClick={loadUrl} 
                disabled={isLoading}
                size="lg"
                className="h-12 px-8 gap-2 font-medium"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <ExternalLink className="h-4 w-4" />
                )}
                {isLoading ? t('loading') : t('view')}
              </Button>
            </div>
            
            {error && (
              <Alert className="mt-4 border-destructive/20 bg-destructive/10">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-destructive">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Current URL Display */}
        {currentUrl && (
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <Badge variant="secondary" className="w-fit px-3 py-1">
              <Globe className="h-3 w-3 mr-1" />
              {t('currentSite')}
            </Badge>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-sm text-muted-foreground truncate">
                {currentUrl}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshPage}
                className="shrink-0"
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Website Preview */}
        {currentUrl && (
          <Card className="shadow-xl border-0 overflow-hidden bg-card">
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                    <p className="text-muted-foreground">{t('loadingSite')}</p>
                  </div>
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={currentUrl}
                className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] border-0"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                title="Website Preview"
              />
            </div>
          </Card>
        )}

        {/* Getting Started */}
        {!currentUrl && (
          <Card className="mt-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 text-center">{t('howToUseTitle')}</h3>
              <div className="grid gap-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">1</span>
                  <span>{t('step1')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">2</span>
                  <span>{t('step2')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">3</span>
                  <span>{t('step3')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col items-center gap-4">
            <RouterLink to="/privacy">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <Shield className="h-4 w-4" />
                {t('privacyPolicy')}
              </Button>
            </RouterLink>
            <p className="text-xs text-muted-foreground">
              {t('footer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
