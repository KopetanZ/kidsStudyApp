export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReaderMode: boolean;
  keyboardNavigation: boolean;
  colorBlindFriendly: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  focusIndicatorEnabled: boolean;
}

export interface AccessibilityPreferences {
  visualImpairment: boolean;
  hearingImpairment: boolean;
  motorImpairment: boolean;
  cognitiveSupport: boolean;
  readingDifficulties: boolean;
  attentionDifficulties: boolean;
}

export class AccessibilityManager {
  private static readonly STORAGE_KEY = 'accessibility_settings';
  private static readonly PREFERENCES_KEY = 'accessibility_preferences';

  // Default settings
  private static defaultSettings: AccessibilitySettings = {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReaderMode: false,
    keyboardNavigation: true,
    colorBlindFriendly: false,
    fontSize: 'medium',
    soundEnabled: true,
    vibrationEnabled: false,
    focusIndicatorEnabled: true
  };

  private static defaultPreferences: AccessibilityPreferences = {
    visualImpairment: false,
    hearingImpairment: false,
    motorImpairment: false,
    cognitiveSupport: false,
    readingDifficulties: false,
    attentionDifficulties: false
  };

  // Get current accessibility settings
  static getSettings(): AccessibilitySettings {
    if (typeof window === 'undefined') return this.defaultSettings;
    
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return { ...this.defaultSettings, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error('Error loading accessibility settings:', error);
    }
    
    return this.defaultSettings;
  }

  // Save accessibility settings
  static saveSettings(settings: Partial<AccessibilitySettings>): AccessibilitySettings {
    if (typeof window === 'undefined') return this.defaultSettings;
    
    const currentSettings = this.getSettings();
    const newSettings = { ...currentSettings, ...settings };
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newSettings));
      this.applySettings(newSettings);
    } catch (error) {
      console.error('Error saving accessibility settings:', error);
    }
    
    return newSettings;
  }

  // Get accessibility preferences
  static getPreferences(): AccessibilityPreferences {
    if (typeof window === 'undefined') return this.defaultPreferences;
    
    try {
      const saved = localStorage.getItem(this.PREFERENCES_KEY);
      if (saved) {
        return { ...this.defaultPreferences, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error('Error loading accessibility preferences:', error);
    }
    
    return this.defaultPreferences;
  }

  // Save accessibility preferences
  static savePreferences(preferences: Partial<AccessibilityPreferences>): AccessibilityPreferences {
    if (typeof window === 'undefined') return this.defaultPreferences;
    
    const currentPreferences = this.getPreferences();
    const newPreferences = { ...currentPreferences, ...preferences };
    
    try {
      localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(newPreferences));
    } catch (error) {
      console.error('Error saving accessibility preferences:', error);
    }
    
    return newPreferences;
  }

  // Apply settings to the DOM
  static applySettings(settings: AccessibilitySettings): void {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Color blind friendly
    if (settings.colorBlindFriendly) {
      root.classList.add('color-blind-friendly');
    } else {
      root.classList.remove('color-blind-friendly');
    }

    // Font size
    root.classList.remove('font-small', 'font-medium', 'font-large', 'font-extra-large');
    root.classList.add(`font-${settings.fontSize}`);

    // Focus indicators
    if (settings.focusIndicatorEnabled) {
      root.classList.add('focus-indicators');
    } else {
      root.classList.remove('focus-indicators');
    }

    // Update CSS custom properties for dynamic styling
    root.style.setProperty('--accessibility-high-contrast', settings.highContrast ? '1' : '0');
    root.style.setProperty('--accessibility-large-text', settings.largeText ? '1' : '0');
    root.style.setProperty('--accessibility-reduced-motion', settings.reducedMotion ? '1' : '0');
  }

  // Initialize accessibility features
  static initialize(): void {
    if (typeof window === 'undefined') return;

    // Apply saved settings
    const settings = this.getSettings();
    this.applySettings(settings);

    // Detect system preferences
    this.detectSystemPreferences();

    // Set up keyboard navigation
    this.setupKeyboardNavigation();

    // Set up screen reader announcements
    this.setupScreenReaderSupport();

    // Set up focus management
    this.setupFocusManagement();
  }

  // Detect system accessibility preferences
  private static detectSystemPreferences(): void {
    if (typeof window === 'undefined') return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.saveSettings({ reducedMotion: true });
    }

    // Check for high contrast preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      this.saveSettings({ highContrast: true });
    }

    // Check for color scheme preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Could implement dark mode here
    }
  }

  // Set up keyboard navigation
  private static setupKeyboardNavigation(): void {
    if (typeof window === 'undefined') return;

    // Skip to main content link
    this.createSkipLink();

    // Enhanced focus management
    document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));

    // Tab trap for modals
    document.addEventListener('keydown', this.handleModalTabTrap.bind(this));
  }

  // Create skip to main content link
  private static createSkipLink(): void {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'メインコンテンツへスキップ';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: fixed;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 10000;
      border-radius: 4px;
      transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // Handle keyboard navigation
  private static handleKeyboardNavigation(event: KeyboardEvent): void {
    const settings = this.getSettings();
    if (!settings.keyboardNavigation) return;

    // Escape key handling
    if (event.key === 'Escape') {
      // Close modals, dropdowns, etc.
      const modals = document.querySelectorAll('[data-modal="true"]');
      modals.forEach(modal => {
        if (modal instanceof HTMLElement) {
          modal.style.display = 'none';
        }
      });
    }

    // Arrow key navigation for custom components
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      this.handleArrowKeyNavigation(event);
    }

    // Enter and Space for button activation
    if ((event.key === 'Enter' || event.key === ' ') && 
        event.target instanceof HTMLElement && 
        event.target.getAttribute('role') === 'button') {
      event.preventDefault();
      event.target.click();
    }
  }

  // Handle arrow key navigation
  private static handleArrowKeyNavigation(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (!target) return;

    // Check if we're in a navigable container
    const container = target.closest('[data-keyboard-nav="true"]');
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const currentIndex = Array.from(focusableElements).indexOf(target);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowUp':
        nextIndex = Math.max(0, currentIndex - 1);
        break;
      case 'ArrowDown':
        nextIndex = Math.min(focusableElements.length - 1, currentIndex + 1);
        break;
      case 'ArrowLeft':
        nextIndex = Math.max(0, currentIndex - 1);
        break;
      case 'ArrowRight':
        nextIndex = Math.min(focusableElements.length - 1, currentIndex + 1);
        break;
    }

    if (nextIndex !== currentIndex) {
      event.preventDefault();
      (focusableElements[nextIndex] as HTMLElement).focus();
    }
  }

  // Handle modal tab trap
  private static handleModalTabTrap(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;

    const modal = document.querySelector('[data-modal="true"]:not([style*="display: none"])');
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  // Set up screen reader support
  private static setupScreenReaderSupport(): void {
    // Create live region for announcements
    this.createLiveRegion();

    // Set up ARIA labels and descriptions
    this.enhanceARIALabels();
  }

  // Create live region for screen reader announcements
  private static createLiveRegion(): void {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(liveRegion);
  }

  // Announce message to screen readers
  static announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (typeof window === 'undefined') return;

    const liveRegion = document.getElementById('live-region');
    if (!liveRegion) return;

    liveRegion.setAttribute('aria-live', priority);
    liveRegion.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }

  // Enhance ARIA labels
  private static enhanceARIALabels(): void {
    // Add labels to buttons without text
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
      if (!button.textContent?.trim()) {
        const icon = button.querySelector('svg, i, .icon');
        if (icon) {
          button.setAttribute('aria-label', 'ボタン');
        }
      }
    });

    // Add descriptions to form inputs
    const inputs = document.querySelectorAll('input:not([aria-describedby])');
    inputs.forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label && !input.getAttribute('aria-describedby')) {
        input.setAttribute('aria-describedby', `${input.id}-description`);
      }
    });
  }

  // Set up focus management
  private static setupFocusManagement(): void {
    // Track focus for better keyboard navigation
    let lastFocusedElement: HTMLElement | null = null;

    document.addEventListener('focusin', (event) => {
      lastFocusedElement = event.target as HTMLElement;
    });

    // Return focus when needed
    (window as any).returnFocus = () => {
      if (lastFocusedElement && document.contains(lastFocusedElement)) {
        lastFocusedElement.focus();
      }
    };
  }

  // Check if text is readable
  static checkTextReadability(text: string): {
    isSimple: boolean;
    complexWords: string[];
    suggestions: string[];
  } {
    const complexWordPatterns = [
      /[一-龯]{4,}/, // Long kanji words
      /[ァ-ヶー]{6,}/, // Long katakana words
      /[a-zA-Z]{8,}/ // Long English words
    ];

    const complexWords: string[] = [];
    const words = text.split(/\s+/);

    words.forEach(word => {
      complexWordPatterns.forEach(pattern => {
        if (pattern.test(word)) {
          complexWords.push(word);
        }
      });
    });

    const isSimple = complexWords.length < words.length * 0.2; // Less than 20% complex words

    const suggestions = [];
    if (!isSimple) {
      suggestions.push('より簡単な言葉を使用することを検討してください');
      suggestions.push('文章を短く分割することを検討してください');
    }

    return {
      isSimple,
      complexWords,
      suggestions
    };
  }

  // Generate alt text for images (simplified version)
  static generateAltText(context: string, type: 'math' | 'shape' | 'time' | 'general'): string {
    const templates = {
      math: '算数の問題を示す図',
      shape: '図形を示す画像',
      time: '時計の文字盤を示す画像',
      general: '学習に関連する画像'
    };

    let altText = templates[type] || templates.general;

    if (context) {
      altText += `：${context}`;
    }

    return altText;
  }

  // Color contrast checker (simplified)
  static checkColorContrast(foreground: string, background: string): {
    ratio: number;
    passes: {
      AA: boolean;
      AAA: boolean;
    };
  } {
    // This is a simplified version - in a real app, you'd use a proper color contrast library
    // For now, return mock data
    return {
      ratio: 4.5,
      passes: {
        AA: true,
        AAA: false
      }
    };
  }

  // Get recommended settings based on preferences
  static getRecommendedSettings(preferences: AccessibilityPreferences): Partial<AccessibilitySettings> {
    const recommendations: Partial<AccessibilitySettings> = {};

    if (preferences.visualImpairment) {
      recommendations.highContrast = true;
      recommendations.largeText = true;
      recommendations.fontSize = 'large';
      recommendations.screenReaderMode = true;
    }

    if (preferences.hearingImpairment) {
      recommendations.soundEnabled = false;
      recommendations.vibrationEnabled = true;
    }

    if (preferences.motorImpairment) {
      recommendations.largeText = true;
      recommendations.keyboardNavigation = true;
      recommendations.focusIndicatorEnabled = true;
    }

    if (preferences.cognitiveSupport) {
      recommendations.reducedMotion = true;
      recommendations.fontSize = 'large';
    }

    if (preferences.readingDifficulties) {
      recommendations.largeText = true;
      recommendations.fontSize = 'large';
      recommendations.soundEnabled = true;
    }

    if (preferences.attentionDifficulties) {
      recommendations.reducedMotion = true;
      recommendations.highContrast = true;
    }

    return recommendations;
  }
}