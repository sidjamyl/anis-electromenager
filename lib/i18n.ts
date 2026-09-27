export type Locale = 'fr' | 'ar';

export const locales: Locale[] = ['fr', 'ar'];
export const defaultLocale: Locale = 'ar';

export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      catalog: 'Catalogue',
      about: 'À propos',
      cart: 'Panier',
      contact: 'Contact',
      admin: 'Administration',
      myOrders: 'Mes Commandes',
    },
    // Hero Section
    hero: {
      title: 'DZ Shopping',
      subtitle: 'Tout ce dont vous avez besoin, au même endroit',
      viewCatalog: 'Voir le catalogue',
    },
    // Products
    products: {
      popular: 'Produits les plus populaires',
      addToCart: 'Ajouter au panier',
      orderNow: 'Commander maintenant',
      food: 'Électroménager',
      packaging: 'Électroménager',
      allProducts: 'Tous les produits',
      searchPlaceholder: 'Rechercher un produit...',
      filterByType: 'Filtrer par type',
      filterByPrice: 'Filtrer par prix',
      minPrice: 'Prix minimum',
      maxPrice: 'Prix maximum',
      noProducts: 'Aucun produit trouvé',
      selectVariant: 'Sélectionner une option',
      quantity: 'Quantité',
      price: 'Prix',
      new: 'Nouveau !',
    },
    // Cart
    cart: {
      title: 'Mon Panier',
      empty: 'Votre panier est vide',
      subtotal: 'Sous-total',
      shipping: 'Frais de livraison',
      total: 'Total',
      remove: 'Retirer',
      checkout: 'Finaliser la commande',
      continueToPayment: 'Continuer',
      fillInfo: 'Veuillez remplir vos informations avant de finaliser la commande.',
      continueShopping: 'Continuer mes achats',
      yourCart: 'Votre panier',
      items: 'article(s)',
      orderSuccess: 'Votre commande a été envoyée avec succès! Nous vous contacterons bientôt',
    },
    // Customer Info
    customer: {
      title: 'Informations de livraison',
      fullName: 'Nom complet',
      phone: 'Numéro de téléphone',
      email: 'Email',
      address: 'Adresse complète',
      wilaya: 'Wilaya',
      selectWilaya: 'Sélectionner une wilaya',
      municipality: 'Commune',
      selectMunicipality: 'Sélectionner une commune',
      deliveryType: 'Type de livraison',
      home: 'Livraison à domicile',
      stopdesk: 'Bureau',
    },
    // Reviews
    reviews: {
      title: 'Avis de nos clients',
      anonymous: 'Client anonyme',
    },
    // Contact
    contact: {
      title: 'Contactez-nous',
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      message: 'Message',
      send: 'Envoyer',
      whatsapp: 'WhatsApp',
      address: 'Adresse',
      success: 'Message envoyé avec succès !',
    },
    // About
    about: {
      title: 'À propos de DZ Shopping',
      description: 'DZ Shopping vous accompagne pour équiper votre maison avec des produits fiables.',
    },
    // Footer
    footer: {
      quickLinks: 'Liens rapides',
      legal: 'Mentions légales',
      rights: 'Tous droits réservés',
    },
    // Admin
    admin: {
      title: 'Administration',
      orders: 'Commandes',
      orderDetails: 'Détails de la commande',
      confirm: 'Confirmer',
      cancel: 'Annuler',
      confirmOrder: 'Confirmer cette commande ?',
      cancelOrder: 'Annuler cette commande ?',
      confirmMessage: 'Cette action confirme la commande.',
      cancelMessage: 'Cette action annulera définitivement la commande.',
      yes: 'Oui',
      no: 'Non',
      status: {
        DRAFT: 'Brouillon',
        CONFIRMED: 'Confirmée',
        CANCELLED: 'Annulée',
        DELIVERED: 'Livrée',
      },
    },
    // Common
    common: {
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      success: 'Succès',
      cancel: 'Annuler',
      save: 'Enregistrer',
      edit: 'Modifier',
      delete: 'Supprimer',
      close: 'Fermer',
    },
  },
  ar: {
    // Navigation
    nav: {
      home: 'الرئيسية',
      catalog: 'المنتجات',
      about: 'من نحن',
      cart: 'السلة',
      contact: 'اتصل بنا',
      admin: 'الإدارة',
      myOrders: 'طلباتي',
    },
    // Hero Section
    hero: {
      title: 'DZ Shopping',
      subtitle: 'كل ما تحتاجه لمنزلك في مكان واحد',
      viewCatalog: 'تصفّح المنتجات',
    },
    // Products
    products: {
      popular: 'الأكثر طلبًا',
      addToCart: 'أضف إلى السلة',
      orderNow: 'اطلب الآن',
      food: 'للمنزل',
      packaging: 'أجهزة كهرومنزلية',
      allProducts: 'جميع المنتجات',
      searchPlaceholder: 'ابحث عن منتج...',
      filterByType: 'تصفية حسب النوع',
      filterByPrice: 'تصفية حسب السعر',
      minPrice: 'السعر الأدنى',
      maxPrice: 'السعر الأقصى',
      noProducts: 'لم يتم العثور على منتجات',
      selectVariant: 'اختر خيارًا',
      quantity: 'الكمية',
      price: 'السعر',
      new: 'جديد',
    },
    // Cart
    cart: {
      title: 'سلة التسوق',
      empty: 'سلتك فارغة',
      subtotal: 'المجموع الفرعي',
      shipping: 'سعر التوصيل',
      total: 'الإجمالي',
      remove: 'إزالة',
      checkout: 'إتمام الطلب',
      continueToPayment: 'متابعة الطلب',
      fillInfo: 'أدخل بيانات التوصيل لإرسال طلبك.',
      continueShopping: 'متابعة التسوق',
      yourCart: 'سلة التسوق',
      items: 'منتجات',
      orderSuccess: 'تم إرسال طلبك. سنتواصل معك قريبًا لتأكيده.',
    },
    // Customer Info
    customer: {
      title: 'معلومات التوصيل',
      fullName: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      email: 'البريد الإلكتروني',
      address: 'العنوان الكامل',
      wilaya: 'الولاية',
      selectWilaya: 'اختر الولاية',
      municipality: 'البلدية',
      selectMunicipality: 'اختر البلدية',
      deliveryType: 'نوع التوصيل',
      home: 'التوصيل للمنزل',
      stopdesk: 'نقطة استلام',
    },
    // Reviews
    reviews: {
      title: 'آراء عملائنا',
      anonymous: 'عميل مجهول',
    },
    // Contact
    contact: {
      title: 'اتصل بنا',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      message: 'الرسالة',
      send: 'إرسال',
      whatsapp: 'واتساب',
      address: 'العنوان',
      success: 'تم إرسال رسالتك. سنرد عليك قريبًا.',
    },
    // About
    about: {
      title: 'عن DZ Shopping',
      description: 'نساعدك في تجهيز منزلك بمنتجات موثوقة وأسعار مناسبة.',
    },
    // Footer
    footer: {
      quickLinks: 'روابط سريعة',
      legal: 'الشروط القانونية',
      rights: 'جميع الحقوق محفوظة',
    },
    // Admin
    admin: {
      title: 'الإدارة',
      orders: 'الطلبات',
      orderDetails: 'تفاصيل الطلب',
      confirm: 'تأكيد',
      cancel: 'إلغاء',
      confirmOrder: 'تأكيد هذا الطلب؟',
      cancelOrder: 'إلغاء هذا الطلب؟',
      confirmMessage: 'سيُؤكَّد الطلب.',
      cancelMessage: 'سيُلغى الطلب نهائيًا.',
      yes: 'تأكيد',
      no: 'إلغاء',
      status: {
        DRAFT: 'مسودة',
        CONFIRMED: 'مؤكد',
        CANCELLED: 'ملغى',
        DELIVERED: 'تم التوصيل',
      },
    },
    // Common
    common: {
      loading: 'جاري التحميل...',
      error: 'تعذّر إتمام العملية. حاول مرة أخرى.',
      success: 'تم بنجاح',
      cancel: 'إلغاء',
      save: 'حفظ',
      edit: 'تعديل',
      delete: 'حذف',
      close: 'إغلاق',
    },
  },
};

export function getTranslation(locale: Locale = defaultLocale) {
  return translations[locale];
}
