import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'es' | 'pt';

export interface Translations {
  [key: string]: string | Translations;
}

const translations: Record<Language, Translations> = {
  en: {
    header: {
      features: 'Features',
      forManagers: 'For Managers',
      freeTools: 'Free Tools',
      pricing: 'Pricing',
      affiliate: 'Affiliate',
      login: 'Login',
      getStarted: 'Get Started'
    },
    home: {
      headline: 'Create and Automate your Media Kit in minutes -',
      headlineAccent: 'Ditch Manual Updates',
      subtext: 'One link. Live stats. Professional media kit. More YES from brands.',
      examples: 'Examples: instagram.com/janedoe • tiktok.com/@janedoe • @janedoe',
      continue: 'Continue',
      noCreditCard: 'No credit card required.',
      placeholder: 'Paste your profile URL or type your @handle'
    },
    features: {
      title: 'Platform Features',
      subtitle: 'Everything you need to grow your creator business',
      mediaKit: {
        title: 'Professional Media Kit',
        description: 'Create stunning media kits that showcase your stats, audience demographics, and past collaborations in one beautiful link.'
      },
      liveStats: {
        title: 'Live Statistics',
        description: 'Your media kit updates automatically every 24 hours with your latest follower count, engagement rate, and performance metrics.'
      },
      analytics: {
        title: 'Advanced Analytics',
        description: 'Deep dive into your audience demographics, engagement patterns, and content performance across all your social platforms.'
      },
      multiPlatform: {
        title: 'Multi-Platform Support',
        description: 'Connect Instagram, TikTok, YouTube, and more. Showcase all your social presence in one unified media kit.'
      },
      customization: {
        title: 'Full Customization',
        description: 'Personalize your media kit with custom colors, themes, and layouts that match your personal brand.'
      },
      sharing: {
        title: 'Easy Sharing',
        description: 'Share your media kit with a single link. Perfect for email signatures, link in bio, and brand outreach.'
      }
    },
    forManagers: {
      title: 'The Influencer CRM for Agencies and Talent Managers',
      subtitle: 'Centralize your creators, generate decks and media kits automatically, and track live campaign results, all in one platform.',
      startNow: 'Start Now',
      trusted: 'Trusted by agencies and talent managers worldwide.',
      rosters: {
        title: 'Creator Rosters',
        description: 'Centralize and manage all your creators in one dashboard. Group them by client, category, or project and access their performance data instantly.'
      },
      pitchDecks: {
        title: 'Pitch Decks',
        description: 'Generate branded pitch decks in seconds using real-time data from your roster. Perfect for presenting creators to clients or sponsors.'
      },
      mediaKits: {
        title: 'Media Kits',
        description: 'Create professional media kits for each creator, automatically updated with verified stats, top-performing content, and past collaborations.'
      },
      campaigns: {
        title: 'Campaign Reports',
        description: 'Track campaign performance in real time and share branded reports with clients. No more screenshots or manual tracking.'
      }
    },
    freeTools: {
      title: 'Free Creator Tools',
      subtitle: 'Powerful tools to help you grow your social media presence',
      urlShortener: {
        title: 'URL Shortener',
        description: 'Create short, memorable links for your content. Perfect for bio links and tracking clicks.',
        inputPlaceholder: 'Enter your long URL here...',
        shorten: 'Shorten URL',
        copy: 'Copy',
        copied: 'Copied!',
        error: 'Failed to shorten URL. Please try again.',
        result: 'Your shortened URL:'
      }
    },
    affiliate: {
      title: 'Earn money for life with CreatorsJet',
      subtitle: 'Refer people to CreatorsJet and earn 30% of monthly recurring revenue for life. There\'s no limit to how much you can earn.',
      becomeAffiliate: 'Become an Affiliate',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        social: 'Social Media Handle',
        followers: 'Total Followers',
        message: 'Why do you want to join our affiliate program?',
        submit: 'Submit Application',
        success: 'Thank you for your application! We\'ll be in touch soon.',
        namePlaceholder: 'John Doe',
        emailPlaceholder: 'john@example.com',
        socialPlaceholder: '@johndoe',
        followersPlaceholder: '10000'
      },
      benefits: {
        title: 'Why Join Our Affiliate Program?',
        commission: '30% Recurring Commission',
        commissionDesc: 'Earn 30% of every payment your referrals make, for life.',
        noLimit: 'No Earning Limit',
        noLimitDesc: 'There\'s no cap on how much you can earn. The more you refer, the more you make.',
        support: 'Dedicated Support',
        supportDesc: 'Get access to marketing materials, tracking tools, and a dedicated affiliate manager.'
      }
    },
    pricing: {
      title: 'Level up your creator business',
      subtitle: 'Showcase your value, prove your numbers, and close more deals.',
      monthly: 'Monthly',
      annually: 'Annually',
      saveUp: 'Save up to 20%',
      perMonth: '/ month',
      perYear: 'per year',
      getStarted: 'Get Started',
      subscribe: 'Subscribe Now',
      mostPopular: 'Most popular',
      free: {
        name: 'Free',
        price: '$0',
        yearlyPrice: '$0'
      },
      starter: {
        name: 'Starter',
        price: '$10',
        yearlyPrice: '$96'
      },
      pro: {
        name: 'Pro',
        price: '$19',
        yearlyPrice: '$182'
      },
      features: {
        mediaKits: 'Media Kits',
        socialAccounts: 'Connected Social Accounts',
        statsUpdates: 'Statistics Updates',
        analytics: 'Advanced Analytics',
        calculators: 'Money Calculators',
        autoUpdate: 'Auto-Updating Media Kits',
        pdf: 'Media kit PDF (auto-updated daily)',
        customization: 'Theme customization',
        verified: 'Verified badge',
        removeLogo: 'Remove CreatorsJet logo'
      }
    }
  },
  es: {
    header: {
      features: 'Funciones',
      forManagers: 'Para Managers',
      freeTools: 'Herramientas Gratis',
      pricing: 'Precios',
      affiliate: 'Afiliados',
      login: 'Iniciar Sesion',
      getStarted: 'Comenzar'
    },
    home: {
      headline: 'Crea y Automatiza tu Media Kit en minutos -',
      headlineAccent: 'Olvida las Actualizaciones Manuales',
      subtext: 'Un enlace. Estadisticas en vivo. Media kit profesional. Mas SI de las marcas.',
      examples: 'Ejemplos: instagram.com/janedoe • tiktok.com/@janedoe • @janedoe',
      continue: 'Continuar',
      noCreditCard: 'No se requiere tarjeta de credito.',
      placeholder: 'Pega la URL de tu perfil o escribe tu @usuario'
    },
    features: {
      title: 'Funciones de la Plataforma',
      subtitle: 'Todo lo que necesitas para hacer crecer tu negocio como creador',
      mediaKit: {
        title: 'Media Kit Profesional',
        description: 'Crea media kits impresionantes que muestren tus estadisticas, demografia de audiencia y colaboraciones pasadas en un solo enlace.'
      },
      liveStats: {
        title: 'Estadisticas en Vivo',
        description: 'Tu media kit se actualiza automaticamente cada 24 horas con tu ultimo conteo de seguidores, tasa de engagement y metricas de rendimiento.'
      },
      analytics: {
        title: 'Analiticas Avanzadas',
        description: 'Profundiza en la demografia de tu audiencia, patrones de engagement y rendimiento de contenido en todas tus plataformas sociales.'
      },
      multiPlatform: {
        title: 'Soporte Multi-Plataforma',
        description: 'Conecta Instagram, TikTok, YouTube y mas. Muestra toda tu presencia social en un media kit unificado.'
      },
      customization: {
        title: 'Personalizacion Completa',
        description: 'Personaliza tu media kit con colores, temas y disenos que coincidan con tu marca personal.'
      },
      sharing: {
        title: 'Compartir Facil',
        description: 'Comparte tu media kit con un solo enlace. Perfecto para firmas de email, link en bio y contacto con marcas.'
      }
    },
    forManagers: {
      title: 'El CRM de Influencers para Agencias y Managers de Talento',
      subtitle: 'Centraliza tus creadores, genera decks y media kits automaticamente, y rastrea resultados de campanas en vivo, todo en una plataforma.',
      startNow: 'Comenzar Ahora',
      trusted: 'Confiado por agencias y managers de talento en todo el mundo.',
      rosters: {
        title: 'Rosters de Creadores',
        description: 'Centraliza y gestiona todos tus creadores en un solo dashboard. Agrupalos por cliente, categoria o proyecto y accede a sus datos de rendimiento al instante.'
      },
      pitchDecks: {
        title: 'Pitch Decks',
        description: 'Genera pitch decks de marca en segundos usando datos en tiempo real de tu roster. Perfecto para presentar creadores a clientes o patrocinadores.'
      },
      mediaKits: {
        title: 'Media Kits',
        description: 'Crea media kits profesionales para cada creador, actualizados automaticamente con estadisticas verificadas, contenido de mejor rendimiento y colaboraciones pasadas.'
      },
      campaigns: {
        title: 'Reportes de Campanas',
        description: 'Rastrea el rendimiento de campanas en tiempo real y comparte reportes de marca con clientes. Sin mas capturas de pantalla o seguimiento manual.'
      }
    },
    freeTools: {
      title: 'Herramientas Gratis para Creadores',
      subtitle: 'Herramientas poderosas para ayudarte a crecer tu presencia en redes sociales',
      urlShortener: {
        title: 'Acortador de URL',
        description: 'Crea enlaces cortos y memorables para tu contenido. Perfecto para links en bio y rastreo de clics.',
        inputPlaceholder: 'Ingresa tu URL larga aqui...',
        shorten: 'Acortar URL',
        copy: 'Copiar',
        copied: 'Copiado!',
        error: 'Error al acortar URL. Por favor intenta de nuevo.',
        result: 'Tu URL acortada:'
      }
    },
    affiliate: {
      title: 'Gana dinero de por vida con CreatorsJet',
      subtitle: 'Refiere personas a CreatorsJet y gana 30% de ingresos recurrentes mensuales de por vida. No hay limite en cuanto puedes ganar.',
      becomeAffiliate: 'Convertirse en Afiliado',
      form: {
        name: 'Nombre Completo',
        email: 'Correo Electronico',
        social: 'Usuario de Redes Sociales',
        followers: 'Total de Seguidores',
        message: 'Por que quieres unirte a nuestro programa de afiliados?',
        submit: 'Enviar Solicitud',
        success: 'Gracias por tu solicitud! Nos pondremos en contacto pronto.',
        namePlaceholder: 'Juan Perez',
        emailPlaceholder: 'juan@ejemplo.com',
        socialPlaceholder: '@juanperez',
        followersPlaceholder: '10000'
      },
      benefits: {
        title: 'Por que Unirse a Nuestro Programa de Afiliados?',
        commission: '30% Comision Recurrente',
        commissionDesc: 'Gana 30% de cada pago que hagan tus referidos, de por vida.',
        noLimit: 'Sin Limite de Ganancias',
        noLimitDesc: 'No hay tope en cuanto puedes ganar. Mientras mas refieras, mas ganas.',
        support: 'Soporte Dedicado',
        supportDesc: 'Obtén acceso a materiales de marketing, herramientas de seguimiento y un manager de afiliados dedicado.'
      }
    },
    pricing: {
      title: 'Eleva tu negocio como creador',
      subtitle: 'Muestra tu valor, demuestra tus numeros y cierra mas tratos.',
      monthly: 'Mensual',
      annually: 'Anual',
      saveUp: 'Ahorra hasta 20%',
      perMonth: '/ mes',
      perYear: 'por ano',
      getStarted: 'Comenzar',
      subscribe: 'Suscribirse Ahora',
      mostPopular: 'Mas popular',
      free: {
        name: 'Gratis',
        price: '$0',
        yearlyPrice: '$0'
      },
      starter: {
        name: 'Inicial',
        price: '$10',
        yearlyPrice: '$96'
      },
      pro: {
        name: 'Pro',
        price: '$19',
        yearlyPrice: '$182'
      },
      features: {
        mediaKits: 'Media Kits',
        socialAccounts: 'Cuentas Sociales Conectadas',
        statsUpdates: 'Actualizaciones de Estadisticas',
        analytics: 'Analiticas Avanzadas',
        calculators: 'Calculadoras de Dinero',
        autoUpdate: 'Media Kits Auto-Actualizados',
        pdf: 'PDF de Media kit (actualizado diariamente)',
        customization: 'Personalizacion de tema',
        verified: 'Insignia verificada',
        removeLogo: 'Remover logo de CreatorsJet'
      }
    }
  },
  pt: {
    header: {
      features: 'Recursos',
      forManagers: 'Para Managers',
      freeTools: 'Ferramentas Gratis',
      pricing: 'Precos',
      affiliate: 'Afiliados',
      login: 'Entrar',
      getStarted: 'Comecar'
    },
    home: {
      headline: 'Crie e Automatize seu Media Kit em minutos -',
      headlineAccent: 'Abandone Atualizacoes Manuais',
      subtext: 'Um link. Estatisticas ao vivo. Media kit profissional. Mais SIM das marcas.',
      examples: 'Exemplos: instagram.com/janedoe • tiktok.com/@janedoe • @janedoe',
      continue: 'Continuar',
      noCreditCard: 'Nao e necessario cartao de credito.',
      placeholder: 'Cole a URL do seu perfil ou digite seu @usuario'
    },
    features: {
      title: 'Recursos da Plataforma',
      subtitle: 'Tudo que voce precisa para crescer seu negocio como criador',
      mediaKit: {
        title: 'Media Kit Profissional',
        description: 'Crie media kits impressionantes que mostrem suas estatisticas, demografia de audiencia e colaboracoes passadas em um unico link.'
      },
      liveStats: {
        title: 'Estatisticas ao Vivo',
        description: 'Seu media kit atualiza automaticamente a cada 24 horas com sua ultima contagem de seguidores, taxa de engajamento e metricas de desempenho.'
      },
      analytics: {
        title: 'Analiticas Avancadas',
        description: 'Aprofunde-se na demografia da sua audiencia, padroes de engajamento e desempenho de conteudo em todas as suas plataformas sociais.'
      },
      multiPlatform: {
        title: 'Suporte Multi-Plataforma',
        description: 'Conecte Instagram, TikTok, YouTube e mais. Mostre toda sua presenca social em um media kit unificado.'
      },
      customization: {
        title: 'Personalizacao Completa',
        description: 'Personalize seu media kit com cores, temas e layouts que combinem com sua marca pessoal.'
      },
      sharing: {
        title: 'Compartilhamento Facil',
        description: 'Compartilhe seu media kit com um unico link. Perfeito para assinaturas de email, link na bio e contato com marcas.'
      }
    },
    forManagers: {
      title: 'O CRM de Influenciadores para Agencias e Managers de Talento',
      subtitle: 'Centralize seus criadores, gere decks e media kits automaticamente, e acompanhe resultados de campanhas ao vivo, tudo em uma plataforma.',
      startNow: 'Comecar Agora',
      trusted: 'Confiado por agencias e managers de talento em todo o mundo.',
      rosters: {
        title: 'Rosters de Criadores',
        description: 'Centralize e gerencie todos os seus criadores em um unico dashboard. Agrupe-os por cliente, categoria ou projeto e acesse seus dados de desempenho instantaneamente.'
      },
      pitchDecks: {
        title: 'Pitch Decks',
        description: 'Gere pitch decks de marca em segundos usando dados em tempo real do seu roster. Perfeito para apresentar criadores a clientes ou patrocinadores.'
      },
      mediaKits: {
        title: 'Media Kits',
        description: 'Crie media kits profissionais para cada criador, atualizados automaticamente com estatisticas verificadas, conteudo de melhor desempenho e colaboracoes passadas.'
      },
      campaigns: {
        title: 'Relatorios de Campanhas',
        description: 'Acompanhe o desempenho de campanhas em tempo real e compartilhe relatorios de marca com clientes. Sem mais capturas de tela ou rastreamento manual.'
      }
    },
    freeTools: {
      title: 'Ferramentas Gratis para Criadores',
      subtitle: 'Ferramentas poderosas para ajuda-lo a crescer sua presenca nas redes sociais',
      urlShortener: {
        title: 'Encurtador de URL',
        description: 'Crie links curtos e memoraveis para seu conteudo. Perfeito para links na bio e rastreamento de cliques.',
        inputPlaceholder: 'Digite sua URL longa aqui...',
        shorten: 'Encurtar URL',
        copy: 'Copiar',
        copied: 'Copiado!',
        error: 'Falha ao encurtar URL. Por favor tente novamente.',
        result: 'Sua URL encurtada:'
      }
    },
    affiliate: {
      title: 'Ganhe dinheiro para sempre com CreatorsJet',
      subtitle: 'Indique pessoas para o CreatorsJet e ganhe 30% da receita recorrente mensal para sempre. Nao ha limite para quanto voce pode ganhar.',
      becomeAffiliate: 'Tornar-se Afiliado',
      form: {
        name: 'Nome Completo',
        email: 'Endereco de Email',
        social: 'Usuario de Redes Sociais',
        followers: 'Total de Seguidores',
        message: 'Por que voce quer se juntar ao nosso programa de afiliados?',
        submit: 'Enviar Aplicacao',
        success: 'Obrigado pela sua aplicacao! Entraremos em contato em breve.',
        namePlaceholder: 'Joao Silva',
        emailPlaceholder: 'joao@exemplo.com',
        socialPlaceholder: '@joaosilva',
        followersPlaceholder: '10000'
      },
      benefits: {
        title: 'Por que Participar do Nosso Programa de Afiliados?',
        commission: '30% Comissao Recorrente',
        commissionDesc: 'Ganhe 30% de cada pagamento que seus indicados fizerem, para sempre.',
        noLimit: 'Sem Limite de Ganhos',
        noLimitDesc: 'Nao ha teto para quanto voce pode ganhar. Quanto mais indicar, mais ganha.',
        support: 'Suporte Dedicado',
        supportDesc: 'Tenha acesso a materiais de marketing, ferramentas de rastreamento e um gerente de afiliados dedicado.'
      }
    },
    pricing: {
      title: 'Eleve seu negocio como criador',
      subtitle: 'Mostre seu valor, prove seus numeros e feche mais negocios.',
      monthly: 'Mensal',
      annually: 'Anual',
      saveUp: 'Economize ate 20%',
      perMonth: '/ mes',
      perYear: 'por ano',
      getStarted: 'Comecar',
      subscribe: 'Assinar Agora',
      mostPopular: 'Mais popular',
      free: {
        name: 'Gratis',
        price: '$0',
        yearlyPrice: '$0'
      },
      starter: {
        name: 'Inicial',
        price: '$10',
        yearlyPrice: '$96'
      },
      pro: {
        name: 'Pro',
        price: '$19',
        yearlyPrice: '$182'
      },
      features: {
        mediaKits: 'Media Kits',
        socialAccounts: 'Contas Sociais Conectadas',
        statsUpdates: 'Atualizacoes de Estatisticas',
        analytics: 'Analiticas Avancadas',
        calculators: 'Calculadoras de Dinheiro',
        autoUpdate: 'Media Kits Auto-Atualizados',
        pdf: 'PDF de Media kit (atualizado diariamente)',
        customization: 'Personalizacao de tema',
        verified: 'Selo verificado',
        removeLogo: 'Remover logo do CreatorsJet'
      }
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLanguage = signal<Language>(this.getStoredLanguage());
  
  language = this.currentLanguage.asReadonly();
  
  languageLabel = computed(() => {
    const labels: Record<Language, string> = {
      en: 'EN',
      es: 'ES',
      pt: 'PT'
    };
    return labels[this.currentLanguage()];
  });

  private getStoredLanguage(): Language {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('language') as Language;
      if (stored && ['en', 'es', 'pt'].includes(stored)) {
        return stored;
      }
    }
    return 'en';
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  }

  t(key: string): string {
    const keys = key.split('.');
    let result: Translations | string = translations[this.currentLanguage()];
    
    for (const k of keys) {
      if (typeof result === 'object' && result !== null && k in result) {
        result = result[k];
      } else {
        return key;
      }
    }
    
    return typeof result === 'string' ? result : key;
  }
}
